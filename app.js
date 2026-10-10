import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
const SUPABASE_URL="https://htglhehtfubypwlgpyep.supabase.co";
const SUPABASE_ANON="sb_publishable_9Zhmj-kaHyEmR55rIefPGw_SAqmFGg3";
const sb=createClient(SUPABASE_URL,SUPABASE_ANON);

let ALL_PLAYERS=[],ROSA_DATA=[],PLAYERS=[],PARTITE=[],CLUB_ID=null,CURRENT_SESSION=null,EDIT_ID=null,ATT_STATE={},PART_STATE={},SETTINGS={},SESSION_DATES=new Set();
let CAL_VIEW={y:new Date().getFullYear(),m:new Date().getMonth()};
let PT_CAL={y:new Date().getFullYear(),m:new Date().getMonth()};
let FOTO_NP=null,FOTO_ED=null,SH_ID=null,CUR_PART=null,DOC_MODE="dist";
let LIVE=null,LIVE_TIMER=null,REAL_SEC=0,SUB_SLOTS=7,VIEW_STACK=[],LIVE_SEL=null;
const MESI=["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
const BEH=["Eccellente","Buono","Discreto","Insufficiente"];
const MOTIVI=["Malato","Infortunato","Viaggio","Scuola","Famiglia","Permesso","Altro"];
const DEFAULT_SOC=["Leinì","Venaria","Settimese","Chieri","Nichelino","Moncalieri","Bra","Fossano"];
const $=id=>document.getElementById(id);

function msg(id,t,ok){const e=$(id);if(e){e.className="msg "+(ok?"ok":"err");e.textContent=t;}}
function isoOf(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
function normDate(s){s=String(s||"").trim();if(!s)return null;let m=s.match(/^(\d{4})-(\d{2})-(\d{2})/);if(m)return m[1]+"-"+m[2]+"-"+m[3];m=s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);if(m)return m[3]+"-"+("0"+m[2]).slice(-2)+"-"+("0"+m[1]).slice(-2);return null;}
function statoVisita(d){if(!d)return{txt:"senza visita",cls:"giallo"};const o=new Date();o.setHours(0,0,0,0);const g=Math.round((new Date(d+"T00:00:00")-o)/86400000);if(g<0)return{txt:"SCADUTA da "+(-g)+" gg",cls:"rosso"};if(g<=60)return{txt:"scade tra "+g+" gg",cls:"giallo"};return{txt:"valida "+g+" gg",cls:"verde"};}
function nome(id){const p=ALL_PLAYERS.find(function(x){return x.id===id;})||PLAYERS.find(function(x){return x.id===id;});return p?(p.last_name+" "+p.first_name):"?";}
function compressFoto(f,cb){const r=new FileReader();r.onload=function(e){const i=new Image();i.onload=function(){const M=400;let w=i.width,h=i.height;if(w>h){if(w>M){h=h*M/w;w=M;}}else{if(h>M){w=w*M/h;h=M;}}const c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(i,0,0,w,h);cb(c.toDataURL("image/jpeg",0.7));};i.src=e.target.result;};r.readAsDataURL(f);}
window.previewFoto=function(p,id){const f=$(p+"Foto").files[0];if(!f)return;compressFoto(f,function(d){$(id).style.backgroundImage="url("+d+")";$(id).textContent="";if(p==="np"){FOTO_NP=d;}else{FOTO_ED=d;}});};

window.doLogin=async function(){const r=await sb.auth.signInWithPassword({email:$("logEmail").value.trim(),password:$("logPass").value});if(r.error){msg("logMsg","Errore: "+r.error.message,false);return;}boot();};
window.doRegister=async function(){const e=$("regEmail").value.trim(),p=$("regPass").value,c=$("regClub").value.trim(),n=$("regName").value.trim();if(!e||!p||!c||!n){msg("regMsg","Compila tutto",false);return;}const r=await sb.auth.signUp({email:e,password:p});if(r.error){msg("regMsg","Errore: "+r.error.message,false);return;}if(r.data.session){const r2=await sb.rpc("create_club_with_owner",{p_club:c,p_name:n});if(r2.error){msg("regMsg","Err: "+r2.error.message,false);return;}boot();}else{msg("regMsg","Conferma via email poi accedi",true);}};
window.doOnboard=async function(){const r=await sb.rpc("create_club_with_owner",{p_club:$("obClub").value.trim(),p_name:$("obName").value.trim()});if(r.error){msg("obMsg","Err: "+r.error.message,false);return;}boot();};
window.logout=async function(){await sb.auth.signOut();location.reload();};

async function boot(){
  try{
    const s=await sb.auth.getSession();
    if(!s.data.session){showView("auth");return;}
    const pr=await sb.from("profiles").select("*").eq("id",s.data.session.user.id).maybeSingle();
    if(!pr.data){showView("onboard");return;}
    CLUB_ID=pr.data.club_id;
    await loadSettingsRow();await loadSessionDates();await loadRosa();await loadAllPlayers();await loadPartite();
    showView("app");goHome();
  }catch(e){console.error(e);alert("Errore: "+e.message);}
}
async function loadSettingsRow(){
  const r=await sb.from("settings").select("*").eq("club_id",CLUB_ID).maybeSingle();
  SETTINGS=(r.data&&r.data.data)||{};
  if(!SETTINGS.luoghi)SETTINGS.luoghi=["Borgaro","Usseglio","Collegno Paradiso"];
  if(!SETTINGS.luogo_default)SETTINGS.luogo_default="Borgaro";
  if(!SETTINGS.societa)SETTINGS.societa=DEFAULT_SOC.slice();
  populateLuoghi();populateSoc();
  if(SETTINGS.live)LIVE=SETTINGS.live;
}
async function persistSettings(){await sb.from("settings").upsert({club_id:CLUB_ID,data:SETTINGS});}
function populateLuoghi(){const L=SETTINGS.luoghi;["attPlace","ptPlace","setDefault"].forEach(function(id){const e=$(id);if(e){e.innerHTML=L.map(function(x){return "<option>"+x+"</option>";}).join("");e.value=SETTINGS.luogo_default;}});
  $("luoghiList").innerHTML=L.map(function(x){return '<span class="vb blu">'+x+' <b style="cursor:pointer" onclick="removeLuogo(\''+x+'\')">✕</b></span>';}).join(" ");}
window.addLuogo=function(){const v=$("setLuogo").value.trim();if(!v)return;SETTINGS.luoghi.push(v);$("setLuogo").value="";populateLuoghi();};
window.removeLuogo=function(x){SETTINGS.luoghi=SETTINGS.luoghi.filter(function(y){return y!==x;});populateLuoghi();};
window.saveLuoghi=async function(){SETTINGS.luogo_default=$("setDefault").value;await persistSettings();alert("Luoghi salvati");};
function populateSoc(){const S=SETTINGS.societa;
  $("ptOpp").innerHTML=S.map(function(x){return "<option>"+x+"</option>";}).join("");
  $("socList").innerHTML=S.map(function(x){return '<span class="vb blu">'+x+' <b style="cursor:pointer" onclick="removeSoc(\''+x+'\')">✕</b></span>';}).join(" ");}
window.addSoc=function(){const v=$("setSoc").value.trim();if(!v)return;SETTINGS.societa.push(v);$("setSoc").value="";populateSoc();};
window.removeSoc=function(x){SETTINGS.societa=SETTINGS.societa.filter(function(y){return y!==x;});populateSoc();};
window.saveSoc=async function(){await persistSettings();populateLuoghi();alert("Società salvate");};

function showView(v){
  $("viewAuth").classList.toggle("hidden",v!=="auth");
  $("viewOnboard").classList.toggle("hidden",v!=="onboard");
  const app=(v==="app");
  $("nav").classList.toggle("hidden",!app);
  $("btnLogout").classList.toggle("hidden",!app);
  ["viewHome","viewLive","viewCal","viewRosa","viewPres","viewPart","viewForm","viewSub","viewDoc","viewFoto","viewSet","viewReg"].forEach(function(x){$(x).classList.add("hidden");});
}
function pushView(v){VIEW_STACK.push(v);}
window.goBack=function(){const prev=VIEW_STACK.pop();if(!prev||prev==="home"){goHome();return;}showTab(prev,true);};
window.goHome=function(){showView("app");VIEW_STACK=[];$("viewHome").classList.remove("hidden");setNav("nbHome");$("btnBack").classList.add("hidden");renderLiveBanner();};
window.showTab=function(t,fromBack){
  showView("app");
  if(!fromBack)pushView(currentView());
  const navMap={cal:"nbCal",pres:"nbPres",part:"nbPart",reg:"nbReg"};
  setNav(navMap[t]||"nbHome");
  const map={cal:"viewCal",live:"viewLive",rosa:"viewRosa",pres:"viewPres",part:"viewPart",form:"viewForm",sub:"viewSub",doc:"viewDoc",foto:"viewFoto",set:"viewSet",reg:"viewReg"};
  $(map[t]).classList.remove("hidden");
  $("btnBack").classList.remove("hidden");
  if(t==="cal")loadCal();
  if(t==="pres"){renderCal();}
  if(t==="part"){$("partDetail").classList.add("hidden");$("partListWrap").classList.remove("hidden");renderPtCal();loadPartite();}
  if(t==="live")renderLive();
  if(t==="form")populateMatchSelect("fmMatch");
  if(t==="sub"){populateMatchSelect("sbMatch",true);loadSubs();}
  if(t==="doc"){populateMatchSelect("docMatch",true);renderDoc();}
  if(t==="foto")renderFoto();
  if(t==="reg")loadRegistro();
  if(t==="set"){populateLuoghi();populateSoc();}
};
function currentView(){
  const ids=["viewLive","viewCal","viewRosa","viewPres","viewPart","viewForm","viewSub","viewDoc","viewFoto","viewSet","viewReg"];
  const names={viewLive:"live",viewCal:"cal",viewRosa:"rosa",viewPres:"pres",viewPart:"part",viewForm:"form",viewSub:"sub",viewDoc:"doc",viewFoto:"foto",viewSet:"set",viewReg:"reg"};
  for(const i of ids){if(!$(i).classList.contains("hidden"))return names[i];}
  return "home";
}
function setNav(id){["nbHome","nbCal","nbPres","nbPart","nbReg"].forEach(function(x){$(x).classList.toggle("on",x===id);});}

// ---------- ROSA ----------
async function loadRosa(){const r=await sb.from("players").select("*").eq("active",true).order("jersey_number");if(r.error)return;PLAYERS=r.data||[];$("rosaCount").textContent=PLAYERS.length;
  if(!PLAYERS.length){$("rosaList").innerHTML='<div class="spin">Nessun giocatore</div>';return;}
  $("rosaList").innerHTML=PLAYERS.map(function(p){const sv=statoVisita(p.medical_expiry);const iz=((p.first_name||"")[0]||"")+((p.last_name||"")[0]||"");const bg=p.photo_url?("background-image:url('"+p.photo_url+"')"):"";
    return '<div class="pitem" onclick="openEdit(\''+p.id+'\')"><div class="pavatar" style="'+bg+'">'+(p.photo_url?"":iz.toUpperCase())+'</div><div class="pmid"><div class="pname">'+p.last_name+' '+p.first_name+'</div><span class="vb '+sv.cls+'">'+sv.txt+'</span></div><button class="delBtn" onclick="event.stopPropagation();delPlayer(\''+p.id+'\')">🗑</button></div>';}).join("");}
async function loadAllPlayers(){const r=await sb.from("players").select("*").order("jersey_number");ALL_PLAYERS=r.data||[];}
function inRosa(p,d){if(!p)return false;if(p.joined_date&&d<p.joined_date)return false;if(p.left_date&&d>p.left_date)return false;if(!p.active&&!p.left_date)return false;return true;}
function leggiForm(p){return{jersey_number:parseInt($(p+"Num").value)||null,last_name:$(p+"Cogn").value.trim(),first_name:$(p+"Nome").value.trim(),birth_date:normDate($(p+"Birth").value),medical_expiry:normDate($(p+"Med").value),joined_date:normDate($(p+"Joined").value),left_date:normDate($(p+"Left").value),phone:$(p+"Tel").value.trim(),phone_mother:$(p+"TelM").value.trim(),phone_father:$(p+"TelP").value.trim(),figc_id:$(p+"Figc").value.trim(),doc_id:$(p+"Doc").value.trim(),card_number:$(p+"Card").value.trim(),notes:$(p+"Note").value.trim()};}
window.addPlayer=async function(){const o=leggiForm("np");if(!o.last_name||!o.first_name){msg("npMsg","Servono cognome e nome",false);return;}if(FOTO_NP)o.photo_url=FOTO_NP;o.club_id=CLUB_ID;const r=await sb.from("players").insert(o);if(r.error){msg("npMsg","Err: "+r.error.message,false);return;}["npNum","npCogn","npNome","npBirth","npMed","npJoined","npLeft","npTel","npTelM","npTelP","npFigc","npDoc","npCard","npNote","npFoto"].forEach(function(i){$(i).value="";});$("npFotoPrev").style.backgroundImage="";$("npFotoPrev").textContent="📷";FOTO_NP=null;msg("npMsg","Aggiunto!",true);loadRosa();loadAllPlayers();};
window.openEdit=function(id){const p=PLAYERS.find(function(x){return x.id===id;})||ALL_PLAYERS.find(function(x){return x.id===id;});if(!p)return;EDIT_ID=id;FOTO_ED=null;const K={Num:"jersey_number",Cogn:"last_name",Nome:"first_name",Birth:"birth_date",Med:"medical_expiry",Joined:"joined_date",Left:"left_date",Tel:"phone",TelM:"phone_mother",TelP:"phone_father",Figc:"figc_id",Doc:"doc_id",Card:"card_number",Note:"notes"};Object.keys(K).forEach(function(k){$("ed"+k).value=p[K[k]]||"";});if(p.photo_url){$("edFotoPrev").style.backgroundImage="url("+p.photo_url+")";$("edFotoPrev").textContent="";}else{$("edFotoPrev").style.backgroundImage="";$("edFotoPrev").textContent="📷";}$("editCard").classList.remove("hidden");};
window.closeEdit=function(){$("editCard").classList.add("hidden");EDIT_ID=null;};
window.saveEdit=async function(){if(!EDIT_ID)return;const o=leggiForm("ed");if(FOTO_ED)o.photo_url=FOTO_ED;const r=await sb.from("players").update(o).eq("id",EDIT_ID);if(r.error){msg("edMsg","Err: "+r.error.message,false);return;}msg("edMsg","Salvato!",true);closeEdit();loadRosa();loadAllPlayers();};
window.delPlayer=async function(id){if(confirm("Togliere giocatore?")){await sb.from("players").update({active:false}).eq("id",id);loadRosa();loadAllPlayers();}};
window.clearRosa=async function(){if(!confirm("Svuotare tutta la rosa?"))return;await sb.from("players").update({active:false}).eq("club_id",CLUB_ID).eq("active",true);loadRosa();loadAllPlayers();};

// ---------- PRESENZE ----------
async function loadSessionDates(){const r=await sb.from("sessions").select("date").eq("club_id",CLUB_ID);SESSION_DATES=new Set((r.data||[]).map(function(s){return s.date;}));}
function buildCal(view,wrapId,selId,datesSet){const y=view.y,m=view.m;const dow=(new Date(y,m,1).getDay()+6)%7;const days=new Date(y,m+1,0).getDate();let h="";["L","M","M","G","V","S","D"].forEach(function(d){h+='<div class="calDow">'+d+'</div>';});for(let i=0;i<dow;i++)h+='<div class="calCell empty"></div>';for(let d=1;d<=days;d++){const iso=y+"-"+String(m+1).padStart(2,"0")+"-"+String(d).padStart(2,"0");const sel=(iso===$(selId).value)?" sel":"";const dot=(datesSet&&datesSet.has(iso))?" dot":"";h+='<div class="calCell'+sel+dot+'" data-iso="'+iso+'">'+d+'</div>';}$(wrapId).innerHTML=h;
  $(wrapId).querySelectorAll(".calCell[data-iso]").forEach(function(c){c.onclick=function(){if(selId==="attDate"){selectDay(c.dataset.iso);}else{$(selId).value=c.dataset.iso;renderPtCal();}};});}
function renderCal(){$("calTitle").textContent=MESI[CAL_VIEW.m]+" "+CAL_VIEW.y;buildCal(CAL_VIEW,"calWrap","attDate",SESSION_DATES);}
window.calPrev=function(){CAL_VIEW.m--;if(CAL_VIEW.m<0){CAL_VIEW.m=11;CAL_VIEW.y--;}renderCal();};
window.calNext=function(){CAL_VIEW.m++;if(CAL_VIEW.m>11){CAL_VIEW.m=0;CAL_VIEW.y++;}renderCal();};
window.quickDay=function(o){const d=new Date();d.setDate(d.getDate()+o);selectDay(isoOf(d));};
window.selectDay=function(iso){$("attDate").value=iso;renderCal();loadAttendance();};
function renderPtCal(){$("ptCalTitle").textContent=MESI[PT_CAL.m]+" "+PT_CAL.y;buildCal(PT_CAL,"ptCalWrap","ptDate",null);}
window.ptCalPrev=function(){PT_CAL.m--;if(PT_CAL.m<0){PT_CAL.m=11;PT_CAL.y--;}renderPtCal();};
window.ptCalNext=function(){PT_CAL.m++;if(PT_CAL.m>11){PT_CAL.m=0;PT_CAL.y++;}renderPtCal();};
window.ptQuick=function(o){const d=new Date();d.setDate(d.getDate()+o);$("ptDate").value=isoOf(d);renderPtCal();};

async function loadAttendance(){const d=$("attDate").value;if(!d)return;const meta={kind:$("attKind").value,place:$("attPlace").value,time:$("attTime").value||null,notes:$("attNotes").value};
  let r=await sb.from("sessions").select("*").eq("date",d).maybeSingle();let sess=r.data;
  if(!sess){const ins=Object.assign({club_id:CLUB_ID,date:d},meta);const r2=await sb.from("sessions").insert(ins).select().single();if(r2.error){alert(r2.error.message);return;}sess=r2.data;}
  else{await sb.from("sessions").update(meta).eq("id",sess.id);}
  CURRENT_SESSION=sess;
  const ra=await sb.from("attendances").select("*").eq("session_id",sess.id);
  const map={};(ra.data||[]).forEach(function(a){map[a.player_id]=a;});
  ROSA_DATA=ALL_PLAYERS.filter(function(p){return inRosa(p,d);});
  ATT_STATE={};ROSA_DATA.forEach(function(p){const a=map[p.id];ATT_STATE[p.id]={present:a?a.present:false,with_team:a?a.with_team:true,behavior:a?(a.behavior||""):"",notes:a?(a.notes||""):"",reason:a?(a.reason||""):""};});
  $("attDateLbl").textContent=d.split("-").reverse().join("/");
  $("attCard").classList.remove("hidden");$("saveBarPres").classList.remove("hidden");renderGrid();}
function motivoSel(id,s){const isAlt=s.reason&&MOTIVI.indexOf(s.reason)===-1;const sv=isAlt?"Altro":(s.reason||"");let h='<select class="motivoSel" onclick="event.stopPropagation()" onchange="setReason(\''+id+'\',this.value)"><option value="">Motivo…</option>';MOTIVI.forEach(function(m){h+='<option'+(sv===m?' selected':'')+'>'+m+'</option>';});h+='</select>';if(isAlt)h+='<input class="noteIn" onclick="event.stopPropagation()" placeholder="Specifica" value="'+s.reason+'" onchange="setReason(\''+id+'\',this.value)">';return h;}
function renderGrid(){const n=ROSA_DATA.filter(function(p){return ATT_STATE[p.id]&&ATT_STATE[p.id].present;}).length;$("attCount").textContent="Presenti "+n+"/"+ROSA_DATA.length;
  $("attGrid").innerHTML=ROSA_DATA.map(function(p){const s=ATT_STATE[p.id];const iz=((p.first_name||"")[0]||"")+((p.last_name||"")[0]||"");const bg=p.photo_url?("background-image:url('"+p.photo_url+"')"):"";let ex;
    if(s.present){ex='<div class="miniRow"><button class="miniChip '+(s.with_team?"on":"")+'" onclick="event.stopPropagation();setTeamCard(\''+p.id+'\',true)">⭐</button><button class="miniChip ap '+(!s.with_team?"on":"")+'" onclick="event.stopPropagation();setTeamCard(\''+p.id+'\',false)">🔹</button></div>';}else{ex=motivoSel(p.id,s);}
    return '<div class="pcard '+(s.present?"on":"off")+'" onclick="tapCard(\''+p.id+'\')"><button class="gear" onclick="event.stopPropagation();openSheet(\''+p.id+'\')">⚙</button><div class="av" style="'+bg+'">'+(p.photo_url?"":iz.toUpperCase())+'</div><div class="nm">'+p.last_name+'<br>'+p.first_name+'</div><div class="st">'+(s.present?"PRESENTE":"ASSENTE")+'</div>'+ex+'</div>';}).join("");}
window.tapCard=function(id){ATT_STATE[id].present=!ATT_STATE[id].present;renderGrid();};
window.setAll=function(v){ROSA_DATA.forEach(function(p){ATT_STATE[p.id].present=v;});renderGrid();};
window.setTeamCard=function(id,v){ATT_STATE[id].with_team=v;renderGrid();};
window.setReason=function(id,v){ATT_STATE[id].reason=v;renderGrid();};
window.openSheet=function(id){SH_ID=id;const p=ROSA_DATA.find(function(x){return x.id===id;});$("shName").textContent=p.last_name+" "+p.first_name;
  $("sheetBody").innerHTML='<label>Comportamento</label><div class="chipRow" id="shBeh"></div><label>Note</label><textarea id="shNote">'+(ATT_STATE[id].notes||"")+'</textarea><button class="btn ok" onclick="saveSheet()">💾 Applica</button>';renderSheetBeh();$("sheetPres").classList.remove("hidden");};
function renderSheetBeh(){$("shBeh").innerHTML=BEH.map(function(b){return '<button class="chip '+(ATT_STATE[SH_ID].behavior===b?"on":"")+'" onclick="shSetBeh(\''+b+'\')">'+b+'</button>';}).join("");}
window.shSetBeh=function(b){ATT_STATE[SH_ID].behavior=(ATT_STATE[SH_ID].behavior===b?"":b);renderSheetBeh();};
window.closeSheet=function(){$("sheetPres").classList.add("hidden");SH_ID=null;};
window.saveSheet=function(){if(SH_ID)ATT_STATE[SH_ID].notes=$("shNote").value;closeSheet();renderGrid();};
window.saveAttendance=async function(){if(!CURRENT_SESSION)return;await sb.from("sessions").update({kind:$("attKind").value,place:$("attPlace").value,time:$("attTime").value||null,notes:$("attNotes").value}).eq("id",CURRENT_SESSION.id);
  const rows=ROSA_DATA.map(function(p){return{session_id:CURRENT_SESSION.id,player_id:p.id,present:ATT_STATE[p.id].present,with_team:ATT_STATE[p.id].with_team,behavior:ATT_STATE[p.id].behavior,notes:ATT_STATE[p.id].notes,reason:ATT_STATE[p.id].reason||null};});
  const r=await sb.from("attendances").upsert(rows,{onConflict:"session_id,player_id"});if(r.error){alert(r.error.message);return;}await loadSessionDates();renderCal();alert("Presenze salvate!");};
window.showPresReport=async function(){$("presRepCard").classList.remove("hidden");await loadReport();};
window.hidePresReport=function(){$("presRepCard").classList.add("hidden");};
async function loadReport(){const rs=await sb.from("sessions").select("*").eq("club_id",CLUB_ID).order("date");const sess=rs.data||[];if(!sess.length){$("repClass").innerHTML='<div class="spin">Nessuna seduta</div>';$("repMatrix").innerHTML="";return;}
  const ids=sess.map(function(s){return s.id;});const ra=await sb.from("attendances").select("*").in("session_id",ids);const map={};(ra.data||[]).forEach(function(a){if(!map[a.session_id])map[a.session_id]={};map[a.session_id][a.player_id]=a;});
  const lbl=function(s){const p=s.date.split("-");return p[2]+"/"+p[1];};
  const elenco=ALL_PLAYERS.filter(function(p){return p.active||p.left_date;});
  const rows=elenco.map(function(p){let pr=0,as=0;sess.forEach(function(s){const a=(map[s.id]||{})[p.id];if(a&&inRosa(p,s.date)){if(a.present){pr++;}else{as++;}}});const t=pr+as;const pc=t?Math.round(pr/t*100):0;let st,cl;if(pc===100){st="SEMPRE PRESENTE";cl="verde";}else if(pc>=85){st="ASSIDUO";cl="verde";}else if(pc>=50){st="A METÀ";cl="giallo";}else{st="ASSENTE";cl="rosso";}return{p:p,pr:pr,as:as,pc:pc,st:st,cl:cl};}).sort(function(a,b){return b.pc-a.pc;});
  let h="<table class='rep'><tr><th>#</th><th>Giocatore</th><th>P</th><th>A</th><th>%</th><th>Stato</th></tr>";rows.forEach(function(r,i){h+='<tr><td>'+(i+1)+'</td><td class="nome">'+r.p.last_name+' '+r.p.first_name+'</td><td class="ok">'+r.pr+'</td><td class="ko">'+r.as+'</td><td>'+r.pc+'%</td><td><span class="vb '+r.cl+'">'+r.st+'</span></td></tr>';});h+="</table>";$("repClass").innerHTML=h;
  let h2="<table class='rep'><tr><th class='nome'>Gioc.</th>";sess.forEach(function(s){h2+="<th>"+lbl(s)+"</th>";});h2+="</tr>";elenco.forEach(function(p){h2+='<tr><td class="nome">'+p.last_name+'</td>';sess.forEach(function(s){const a=(map[s.id]||{})[p.id];if(!a||!inRosa(p,s.date)){h2+='<td class="na">–</td>';}else{h2+=a.present?'<td class="ok">✔</td>':'<td class="ko">✖</td>';}});h2+="</tr>";});h2+="</table>";$("repMatrix").innerHTML=h2;}

// ---------- CALENDARIO ----------
async function loadCal(){const rs=await sb.from("sessions").select("*").eq("club_id",CLUB_ID);const rm=await sb.from("matches").select("*").eq("club_id",CLUB_ID);const items=[];
  (rs.data||[]).forEach(function(x){items.push({d:x.date,tipo:"Allenamento",txt:x.kind+" "+(x.place||""),cls:"blu"});});
  (rm.data||[]).forEach(function(x){items.push({d:x.date,tipo:"Partita",txt:"vs "+x.opponent,cls:"verde"});});
  items.sort(function(a,b){return a.d<b.d?1:-1;});
  if(!items.length){$("calList").innerHTML='<div class="spin">Nessun evento</div>';return;}
  $("calList").innerHTML=items.map(function(i){const p=i.d.split("-");return '<div class="calItem"><div class="d">'+p[2]+'/'+p[1]+'<small>'+p[0]+'</small></div><div><span class="vb '+i.cls+'">'+i.tipo+'</span> <b>'+i.txt+'</b></div></div>';}).join("");}

// ---------- PARTITE ----------
async function loadPartite(){const r=await sb.from("matches").select("*").eq("club_id",CLUB_ID).order("date",{ascending:false});PARTITE=r.data||[];
  if(!PARTITE.length){$("partList").innerHTML='<div class="spin">Nessuna partita</div>';return;}
  $("partList").innerHTML=PARTITE.map(function(m){const sc=(m.score_home!=null&&m.score_away!=null)?(m.score_home+"-"+m.score_away):"–";
    return '<div class="partCard" onclick="openPart(\''+m.id+'\')"><div class="pcTop"><span>'+m.date.split("-").reverse().join("/")+' '+(m.time||"")+'</span><span>'+m.competition+'</span></div><div class="pcTeams"><span>'+(m.home?"NOI":"AVV")+' vs '+m.opponent+'</span><span class="pcScore">'+sc+'</span></div><div><span class="vb '+(m.home?"verde":"giallo")+'">'+(m.home?"CASA":"TRASF")+'</span><span class="vb blu">'+(m.status||"")+'</span></div></div>';}).join("");}
window.newPart=async function(){let opp=$("ptOppFree").value.trim();if(!opp)opp=$("ptOpp").value;if(!opp){alert("Avversario?");return;}
  const ins={club_id:CLUB_ID,date:$("ptDate").value,time:$("ptTime").value||null,opponent:opp,home:$("ptHome").value==="true",competition:$("ptComp").value,place:$("ptPlace").value,category:"Under 14"};
  const r=await sb.from("matches").insert(ins).select().single();if(r.error){alert(r.error.message);return;}$("ptOppFree").value="";loadPartite();openPart(r.data.id);};
function populateMatchSelect(id){$(id).innerHTML=PARTITE.map(function(m){return '<option value="'+m.id+'">'+m.date.split("-").reverse().join("/")+' vs '+m.opponent+'</option>';}).join("");}
async function openPart(id){const m=PARTITE.find(function(x){return x.id===id;});if(!m)return;CUR_PART=m;
  const rmp=await sb.from("match_players").select("*").eq("match_id",id);const rev=await sb.from("match_events").select("*").eq("match_id",id);
  const mpM={};(rmp.data||[]).forEach(function(x){mpM[x.player_id]=x;});const gol={};(rev.data||[]).forEach(function(e){if(e.type==="goal"){gol[e.player_id]=(gol[e.player_id]||0)+1;}});
  PART_STATE={};PLAYERS.forEach(function(p){const x=mpM[p.id];PART_STATE[p.id]={starter:x?x.starter:false,convocated:x?x.convocated:true,gol:gol[p.id]||0};});
  $("partListWrap").classList.add("hidden");$("partDetail").classList.remove("hidden");
  $("pdTitle").textContent=(m.home?"Casa":"Trasf")+" vs "+m.opponent;
  $("pdGolHome").value=(m.score_home!=null?m.score_home:"");$("pdGolAway").value=(m.score_away!=null?m.score_away:"");
  $("pdTags").innerHTML='<span class="vb '+(m.home?"verde":"giallo")+'">'+(m.home?"CASA":"TRASF")+'</span><span class="vb blu">'+m.competition+'</span>';
  renderRoster();}
function renderRoster(){$("pdRoster").innerHTML=PLAYERS.map(function(p){const s=PART_STATE[p.id];
  return '<div class="formRow"><div class="num">'+(p.jersey_number||"-")+'</div><div class="fn">'+p.last_name+' '+p.first_name+'</div><div class="st3"><button class="'+(s.starter?"on":"")+'" onclick="setStato(\''+p.id+'\',\'T\')">Tit</button><button class="'+(!s.starter&&s.convocated?"on":"")+'" onclick="setStato(\''+p.id+'\',\'P\')">Pan</button><button class="'+(!s.convocated?"on":"")+'" onclick="setStato(\''+p.id+'\',\'F\')">Fuori</button></div><div class="stepper"><button onclick="addGol(\''+p.id+'\',-1)">−</button><span>⚽'+s.gol+'</span><button onclick="addGol(\''+p.id+'\',1)">+</button></div></div>';}).join("");}
window.setStato=function(id,v){const s=PART_STATE[id];if(v==="T"){s.starter=true;s.convocated=true;}if(v==="P"){s.starter=false;s.convocated=true;}if(v==="F"){s.starter=false;s.convocated=false;}renderRoster();};
window.addGol=function(id,d){PART_STATE[id].gol=Math.max(0,PART_STATE[id].gol+d);renderRoster();};
window.closePart=function(){$("partDetail").classList.add("hidden");$("partListWrap").classList.remove("hidden");loadPartite();};
window.savePart=async function(){if(!CUR_PART)return;await sb.from("matches").update({score_home:parseInt($("pdGolHome").value)||0,score_away:parseInt($("pdGolAway").value)||0}).eq("id",CUR_PART.id);
  const rows=PLAYERS.map(function(p){return{match_id:CUR_PART.id,player_id:p.id,starter:PART_STATE[p.id].starter,convocated:PART_STATE[p.id].convocated};});
  await sb.from("match_players").upsert(rows,{onConflict:"match_id,player_id"});
  for(const p of PLAYERS){await sb.from("match_events").delete().eq("match_id",CUR_PART.id).eq("player_id",p.id).eq("type","goal");const g=PART_STATE[p.id].gol;if(g>0){const evs=[];for(let i=0;i<g;i++){evs.push({match_id:CUR_PART.id,player_id:p.id,type:"goal",half:1});}await sb.from("match_events").insert(evs);}}
  alert("Partita salvata!");closePart();};

// ---------- FORMAZIONE ----------
window.openForm=async function(){const id=$("fmMatch").value;if(!id)return;CUR_PART=PARTITE.find(function(x){return x.id===id;});const r=await sb.from("match_players").select("*").eq("match_id",id);const mpM={};(r.data||[]).forEach(function(x){mpM[x.player_id]=x;});
  PART_STATE={};PLAYERS.forEach(function(p){const x=mpM[p.id];PART_STATE[p.id]={starter:x?x.starter:false,convocated:x?x.convocated:true,gol:0};});refreshForm();};
function refreshForm(){$("fmRoster").innerHTML=PLAYERS.map(function(p){const s=PART_STATE[p.id];
  return '<div class="formRow"><div class="num">'+(p.jersey_number||"-")+'</div><div class="fn">'+p.last_name+' '+p.first_name+'</div><div class="st3"><button class="'+(s.starter?"on":"")+'" onclick="setStato(\''+p.id+'\',\'T\');refreshForm()">Tit</button><button class="'+(!s.starter&&s.convocated?"on":"")+'" onclick="setStato(\''+p.id+'\',\'P\');refreshForm()">Pan</button><button class="'+(!s.convocated?"on":"")+'" onclick="setStato(\''+p.id+'\',\'F\');refreshForm()">Fuori</button></div></div>';}).join("");}
window.saveForm=async function(){if(!CUR_PART)return;const rows=PLAYERS.map(function(p){return{match_id:CUR_PART.id,player_id:p.id,starter:PART_STATE[p.id].starter,convocated:PART_STATE[p.id].convocated};});await sb.from("match_players").upsert(rows,{onConflict:"match_id,player_id"});alert("Formazione salvata!");};

// ---------- SOSTITUZIONI ----------
function playerOpts(){return PLAYERS.map(function(p){return '<option value="'+p.id+'">#'+(p.jersey_number||"-")+' '+p.last_name+' '+p.first_name+'</option>';}).join("");}
window.loadSubs=function(){const id=$("sbMatch").value;let h="";for(let i=0;i<SUB_SLOTS;i++){h+='<div class="subSlot"><div class="sn">Slot '+(i+1)+'</div><div class="row"><div><label>Min</label><input type="number" class="subMin" data-i="'+i+'"></div><div><label>Esce</label><select class="subOut" data-i="'+i+'">'+playerOpts()+'</select></div><div><label>Entra</label><select class="subIn" data-i="'+i+'">'+playerOpts()+'</select></div></div></div>';}
  $("subSlots").innerHTML=h;loadSubList();};
window.addSubSlot=function(){SUB_SLOTS++;loadSubs();};
window.saveSubs=async function(){const id=$("sbMatch").value;if(!id)return;await sb.from("match_events").delete().eq("match_id",id).in("type",["sub_in","sub_out"]);
  const ins=[];document.querySelectorAll("#subSlots .subSlot").forEach(function(sl){const min=parseInt(sl.querySelector(".subMin").value)||0;const out=sl.querySelector(".subOut").value;const inn=sl.querySelector(".subIn").value;if(min>0&&out&&inn&&out!==inn){ins.push({match_id:id,player_id:out,type:"sub_out",minute:min,half:1});ins.push({match_id:id,player_id:inn,type:"sub_in",minute:min,half:1});}});
  if(ins.length)await sb.from("match_events").insert(ins);alert("Sostituzioni salvate!");loadSubList();};
async function loadSubList(){const id=$("sbMatch").value;if(!id)return;const r=await sb.from("match_events").select("*").eq("match_id",id).eq("type","sub_in").order("minute");
  if(!r.data||!r.data.length){$("sbList").innerHTML='<div class="spin">Nessuna sostituzione</div>';return;}
  $("sbList").innerHTML=r.data.map(function(e){return '<div class="evItem"><span>🔄 entra '+nome(e.player_id)+'</span><span>'+e.minute+"'</span></div>";}).join("");}

// ---------- DISTINTA / CONVOCAZIONI ----------
window.showDoc=function(m){DOC_MODE=m;$("docTabD").className="btn "+(m==="dist"?"":"sec");$("docTabC").className="btn "+(m==="conv"?"":"sec");renderDoc();};
window.renderDoc=function(){const id=$("docMatch").value;const m=PARTITE.find(function(x){return x.id===id;});if(!m){$("docOut").innerHTML='<div class="spin">Nessuna partita</div>';return;}
  sb.from("match_players").select("*").eq("match_id",m.id).then(function(r){const conv=(r.data||[]).filter(function(x){return x.convocated;});
    const rows=PLAYERS.filter(function(p){return conv.find(function(c){return c.player_id===p.id;});}).sort(function(a,b){return (a.jersey_number||99)-(b.jersey_number||99);});
    let h='<h2>'+(DOC_MODE==="dist"?"DISTINTA":"CONVOCAZIONI")+' — '+m.opponent+'</h2><p style="font-size:13px;color:#475569">'+m.date.split("-").reverse().join("/")+' '+(m.time||"")+' — '+(m.place||"")+' ('+(m.home?"Casa":"Trasferta")+')</p>';
    h+='<table class="rep" style="margin-top:10px"><tr><th>N°</th><th>Giocatore</th><th>Nascita</th><th>Doc</th></tr>';
    rows.forEach(function(p){h+='<tr><td>'+(p.jersey_number||"")+'</td><td class="nome">'+p.last_name+' '+p.first_name+'</td><td>'+(p.birth_date||"")+'</td><td>'+(p.doc_id||"")+'</td></tr>';});
    h+='</table>';$("docOut").innerHTML=h;});};

// ---------- FOTO ----------
function renderFoto(){$("fotoGrid").innerHTML=PLAYERS.map(function(p){const iz=((p.first_name||"")[0]||"")+((p.last_name||"")[0]||"");const bg=p.photo_url?("background-image:url('"+p.photo_url+"')"):"";return '<div style="text-align:center"><div style="width:100%;aspect-ratio:1;border-radius:14px;background:#e2e8f0 '+bg+';background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;font-weight:800;color:#94a3b8;overflow:hidden">'+(p.photo_url?"":iz.toUpperCase())+'</div><div style="font-size:10px;font-weight:700;margin-top:4px">'+p.last_name+'</div></div>';}).join("");}

// ---------- LIVE ----------
function renderLiveBanner(){const b=$("liveBanner");if(LIVE&&LIVE.matchId){const m=PARTITE.find(function(x){return x.id===LIVE.matchId;});if(m){b.classList.remove("hidden");$("lbText").textContent="Partita in corso: "+m.opponent+" "+(LIVE.home||0)+"-"+(LIVE.away||0);return;}}b.classList.add("hidden");}
function renderLive(){populateMatchSelect("lvMatch");
  if(LIVE&&LIVE.matchId){$("liveStart").classList.add("hidden");$("liveBox").classList.remove("hidden");const m=PARTITE.find(function(x){return x.id===LIVE.matchId;});$("lvScore").textContent="BORGARO "+(LIVE.home||0)+"-"+(LIVE.away||0)+" "+(m?m.opponent:"");updateLiveUI();renderPitch();renderLiveEvents();$("lvPlay").textContent=LIVE.running?"⏸ PAUSA":"▶ AVVIA";}
  else{$("liveStart").classList.remove("hidden");$("liveBox").classList.add("hidden");}}
window.startLive=async function(){const id=$("lvMatch").value;if(!id)return;LIVE={matchId:id,clock:0,half:1,running:false,home:0,away:0,rec1:0,rec2:0};REAL_SEC=0;SETTINGS.live=LIVE;await persistSettings();await sb.from("matches").update({status:"live"}).eq("id",id);renderLive();renderLiveBanner();};
window.resumeLive=function(){showTab("live");};
window.toggleLive=async function(){if(!LIVE)return;LIVE.running=!LIVE.running;SETTINGS.live=LIVE;await persistSettings();
  if(LIVE.running){LIVE_TIMER=setInterval(function(){LIVE.clock++;REAL_SEC++;updateLiveUI();if(LIVE.clock%5===0){SETTINGS.live=LIVE;persistSettings();}},1000);}else{clearInterval(LIVE_TIMER);}
  $("lvPlay").textContent=LIVE.running?"⏸ PAUSA":"▶ AVVIA";};
window.resetLive=async function(){if(!LIVE)return;LIVE.clock=0;REAL_SEC=0;SETTINGS.live=LIVE;await persistSettings();updateLiveUI();};
function fmt(sec){const m=Math.floor(sec/60),s=sec%60;return String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");}
function updateLiveUI(){if(!LIVE)return;const dur=35*60;const rest=Math.max(0,dur-LIVE.clock);
  $("lvClock").textContent=fmt(LIVE.clock);$("lvRest").textContent="Restanti "+fmt(rest);$("lvHalf").textContent=(LIVE.half===1?"1°":"2°")+" Tempo";
  $("lvT1").textContent="1°T "+Math.floor(LIVE.clock/60)+"'";$("lvT2").textContent="2°T 0'";$("lvTot").textContent="TOT "+Math.floor(LIVE.clock/60)+"'";
  $("lvRec").textContent="Rec 1°T +"+(LIVE.rec1||0)+"' · Rec 2°T +"+(LIVE.rec2||0)+"'";$("lvReal").textContent="Tempo reale: "+fmt(REAL_SEC);}
function renderPitch(){if(!LIVE)return;
  $("lvPitch").innerHTML=PLAYERS.map(function(p){return '<div class="pall in" onclick="selectLivePlayer(\''+p.id+'\')"><div class="c">'+(p.jersey_number||"-")+'</div><div class="t">'+p.last_name.toUpperCase()+'</div></div>';}).join("");}
window.selectLivePlayer=function(id){LIVE_SEL=id;openEventSheet();};
window.openEventSheet=function(){if(!LIVE)return;$("shLiveName").textContent="Aggiungi evento";
  $("sheetLiveBody").innerHTML='<label>Giocatore</label><select id="lvEvPlayer">'+PLAYERS.map(function(p){return '<option value="'+p.id+'">#'+(p.jersey_number||"-")+' '+p.last_name+' '+p.first_name+'</option>';}).join("")+'</select><div class="chipRow" style="margin-top:8px">'+["goal","assist","save","yellow","red","shot","goal_against"].map(function(t){return '<button class="chip" onclick="liveEvent(\''+t+'\')">'+t+'</button>';}).join("")+'</div>';
  $("sheetLive").classList.remove("hidden");};
window.closeLiveSheet=function(){$("sheetLive").classList.add("hidden");};
window.openSubSheet=function(){if(!LIVE)return;$("shLiveName").textContent="Sostituzione";
  $("sheetLiveBody").innerHTML='<label>Esce</label><select id="shOut">'+playerOpts()+'</select><label>Entra</label><select id="shIn">'+playerOpts()+'</select><button class="btn ok" onclick="doLiveSub()">🔄 Conferma</button>';
  $("sheetLive").classList.remove("hidden");};
window.doLiveSub=async function(){const min=Math.floor(LIVE.clock/60);await sb.from("match_events").insert([{match_id:LIVE.matchId,player_id:$("shOut").value,type:"sub_out",minute:min,half:LIVE.half},{match_id:LIVE.matchId,player_id:$("shIn").value,type:"sub_in",minute:min,half:LIVE.half}]);closeLiveSheet();renderLiveEvents();};
window.liveEvent=async function(t){if(!LIVE)return;let pid=LIVE_SEL;if(!pid){const sel=$("lvEvPlayer");pid=sel?sel.value:PLAYERS[0].id;}const min=Math.floor(LIVE.clock/60);
  await sb.from("match_events").insert({match_id:LIVE.matchId,player_id:pid,type:t,minute:min,half:LIVE.half});
  if(t==="goal"){LIVE.home=(LIVE.home||0)+1;}if(t==="goal_against"){LIVE.away=(LIVE.away||0)+1;}
  SETTINGS.live=LIVE;await persistSettings();const m=PARTITE.find(function(x){return x.id===LIVE.matchId;});$("lvScore").textContent="BORGARO "+(LIVE.home||0)+"-"+(LIVE.away||0)+" "+(m?m.opponent:"");renderLiveEvents();renderLiveBanner();closeLiveSheet();};
async function renderLiveEvents(){if(!LIVE)return;const r=await sb.from("match_events").select("*").eq("match_id",LIVE.matchId).order("created_at",{ascending:false});
  const ic={goal:"⚽",assist:"🎯",save:"🧤",yellow:"🟨",red:"🟥",shot:"💥",goal_against:"🥅",sub_in:"🔄 entra",sub_out:"🔄 esce"};
  if(!r.data||!r.data.length){$("lvEvents").innerHTML='<div class="spin">Nessun evento</div>';$("lvGolList").textContent="Nessun gol";return;}
  $("lvEvents").innerHTML=r.data.map(function(e){return '<div class="evItem"><span>'+(ic[e.type]||"")+' '+nome(e.player_id)+'</span><span>'+(e.minute||0)+"' "+(e.half||1)+"°T</span></div>";}).join("");
  const gols=r.data.filter(function(e){return e.type==="goal";});$("lvGolList").textContent=gols.length?("Gol: "+gols.map(function(e){return nome(e.player_id)+" "+(e.minute||0)+"'";}).join(", ")):"Nessun gol";}
window.saveLiveToMatch=async function(){if(!LIVE)return;await sb.from("matches").update({score_home:LIVE.home,score_away:LIVE.away}).eq("id",LIVE.matchId);alert("Risultato salvato!");};
window.stopLive=async function(){if(!LIVE)return;if(!confirm("Terminare la partita live?"))return;clearInterval(LIVE_TIMER);
  await sb.from("matches").update({status:"completed",score_home:LIVE.home,score_away:LIVE.away}).eq("id",LIVE.matchId);LIVE=null;SETTINGS.live=null;await persistSettings();renderLive();renderLiveBanner();loadPartite();};

// ---------- REGISTRO ----------
async function loadRegistro(){const rm=await sb.from("matches").select("*").eq("club_id",CLUB_ID);const ms=rm.data||[];const ids=ms.map(function(m){return m.id;});let ev=[],mp=[];
  if(ids.length){ev=(await sb.from("match_events").select("*").in("match_id",ids)).data||[];mp=(await sb.from("match_players").select("*").in("match_id",ids)).data||[];}
  let V=0,P=0,S=0,GF=0,GS=0;ms.forEach(function(m){if(m.score_home==null)return;GF+=m.score_home;GS+=m.score_away;if(m.score_home>m.score_away){V++;}else if(m.score_home===m.score_away){P++;}else{S++;}});
  $("regKpi").innerHTML='<div><b>'+V+'</b><small>VITT</small></div><div><b>'+P+'</b><small>PAREG</small></div><div><b>'+S+'</b><small>SCONF</small></div><div><b>'+GF+'-'+GS+'</b><small>GOL</small></div>';
  const rs=await sb.from("sessions").select("*").eq("club_id",CLUB_ID);const sids=(rs.data||[]).map(function(s){return s.id;});let att=[];if(sids.length)att=(await sb.from("attendances").select("*").in("session_id",sids)).data||[];
  const pa={};att.forEach(function(a){if(a.present){pa[a.player_id]=(pa[a.player_id]||0)+1;}});
  const maxP=Math.max.apply(null,[1].concat(Object.keys(pa).map(function(k){return pa[k];})));
  $("regGrafPres").innerHTML=PLAYERS.map(function(p){const n=pa[p.id]||0;const w=Math.round(n/maxP*100);return '<div class="grow"><div class="gn">'+p.last_name+' '+p.first_name+'</div><div class="bar"><i style="width:'+w+'%"></i></div><div class="gv">'+n+'</div></div>';}).join("");
  const gol={};ev.forEach(function(e){if(e.type==="goal"){gol[e.player_id]=(gol[e.player_id]||0)+1;}});
  const maxG=Math.max.apply(null,[1].concat(Object.keys(gol).map(function(k){return gol[k];})));
  const gRows=Object.keys(gol).map(function(k){return{id:k,n:gol[k]};}).sort(function(a,b){return b.n-a.n;});
  $("regGrafGol").innerHTML=gRows.length?gRows.map(function(r){const w=Math.round(r.n/maxG*100);return '<div class="grow"><div class="gn">'+nome(r.id)+'</div><div class="bar gol"><i style="width:'+w+'%"></i></div><div class="gv">'+r.n+'</div></div>';}).join(""):'<div class="spin">Nessun gol</div>';
  const pp={};mp.forEach(function(x){if(x.convocated){pp[x.player_id]=(pp[x.player_id]||0)+1;}});
  const maxPP=Math.max.apply(null,[1].concat(Object.keys(pp).map(function(k){return pp[k];})));
  $("regGrafPart").innerHTML=PLAYERS.map(function(p){const n=pp[p.id]||0;const w=Math.round(n/maxPP*100);return '<div class="grow"><div class="gn">'+p.last_name+' '+p.first_name+'</div><div class="bar"><i style="width:'+w+'%"></i></div><div class="gv">'+n+'</div></div>';}).join("");}

$("attDate").value=isoOf(new Date());$("ptDate").value=isoOf(new Date());
boot();
if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").catch(function(){});