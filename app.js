import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
const SUPABASE_URL="https://htglhehtfubypwlgpyep.supabase.co";
const SUPABASE_ANON="sb_publishable_9Zhmj-kaHyEmR55rIefPGw_SAqmFGg3";
const sb=createClient(SUPABASE_URL,SUPABASE_ANON);

const CLUB_INFO={addr:"Via Santa Cristina 16 – 10071 – Borgaro Torinese (TO)",tel:"011 4703268",mail:"segreteria@fcborgaro1965.it",pec:"postmaster@pec.fcborgaro1965.it",piva:"P.IVA 039396940018",matricola:"78854",coni:"39272"};
const RUOLI_STAFF=["DIRIGENTE ACCOMPAGNATORE UFFICIALE","ALLENATORE","ALLENATORE IN SECONDA","MEDICO SOCIALE","OPERATORE SANITARIO AUSILIARIO","ASSISTENTE DI LINEA DI SOCIETA'","DIRIGENTE ADDETTO AGLI UFF. DI GARA"];
const MOTIVI_CONV=["","NON DISPONIBILE","INFORTUNATO","MALATO","VIAGGIO","SCUOLA","FAMIGLIA","PERMESSO","ALTRO"];

let ALL_PLAYERS=[],ROSA_DATA=[],PLAYERS=[],PARTITE=[],TEAMS=[],STAFF=[],CLUB_ID=null,CURRENT_SESSION=null,EDIT_ID=null,ATT_STATE={},PART_STATE={},SETTINGS={},SESSION_DATES=new Set(),CONV_STATE={},DOC_STAFF={},DOC_ROWS=[],DOC_ROWS_MATCH=null;
let CAL_VIEW={y:new Date().getFullYear(),m:new Date().getMonth()};
let PM_CAL={y:new Date().getFullYear(),m:new Date().getMonth()};
let FOTO_NP=null,FOTO_ED=null,SH_ID=null,CUR_PART=null,CUR_DOC_MATCH=null,DOC_MODE="dist";
let LIVE=null,LIVE_TIMER=null,REAL_SEC=0,PM_SUB_SLOTS=5,VIEW_STACK=[],LIVE_SEL=null;
const MESI=["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
const BEH=["Eccellente","Buono","Discreto","Insufficiente"];
const MOTIVI=["Malato","Infortunato","Viaggio","Scuola","Famiglia","Permesso","Altro"];
const $=id=>document.getElementById(id);

function fmtTime(t){if(!t)return "";const s=String(t);return s.length>=5?s.slice(0,5):s;}
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
    await loadSettingsRow();await loadSessionDates();await loadRosa();await loadAllPlayers();await loadPartite();await loadTeams();await loadStaff();
    showView("app");goHome();
  }catch(e){console.error(e);alert("Errore: "+e.message);}
}
async function loadSettingsRow(){
  const r=await sb.from("settings").select("*").eq("club_id",CLUB_ID).maybeSingle();
  SETTINGS=(r.data&&r.data.data)||{};
  if(!SETTINGS.luoghi)SETTINGS.luoghi=["Borgaro","Usseglio","Collegno Paradiso"];
  if(!SETTINGS.luogo_default)SETTINGS.luogo_default="Borgaro";
  populateLuoghi();
  if(SETTINGS.live)LIVE=SETTINGS.live;
}
async function persistSettings(){await sb.from("settings").upsert({club_id:CLUB_ID,data:SETTINGS});}
function populateLuoghi(){const L=SETTINGS.luoghi||[];["attPlace","pmPlace","setDefault"].forEach(function(id){const e=$(id);if(e){e.innerHTML=L.map(function(x){return "<option>"+x+"</option>";}).join("");if(SETTINGS.luogo_default)e.value=SETTINGS.luogo_default;}});
  const ll=$("luoghiList");if(ll)ll.innerHTML=L.map(function(x){return '<span class="vb blu">'+x+' <b style="cursor:pointer" onclick="removeLuogo(\''+x+'\')">✕</b></span>';}).join(" ");}
window.addLuogo=function(){const v=$("setLuogo").value.trim();if(!v)return;SETTINGS.luoghi.push(v);$("setLuogo").value="";populateLuoghi();};
window.removeLuogo=function(x){SETTINGS.luoghi=SETTINGS.luoghi.filter(function(y){return y!==x;});populateLuoghi();};
window.saveLuoghi=async function(){SETTINGS.luogo_default=$("setDefault").value;await persistSettings();alert("Luoghi salvati");};

async function loadTeams(){const r=await sb.from("teams").select("*").eq("club_id",CLUB_ID).order("short_name");TEAMS=r.data||[];renderTeamList();populateAvv();}
async function loadStaff(){const r=await sb.from("staff").select("*").eq("club_id",CLUB_ID).eq("active",true).order("role");STAFF=r.data||[];renderStaffList();}
function teamByName(n){return TEAMS.find(function(t){return t.short_name===n;});}
function teamOfficial(n){const t=teamByName(n);return t?(t.official_name||n):n;}
function getVia(n){const t=teamByName(n);if(!t)return "";return (t.address||"")+(t.city?(", "+t.city):"");}
window.addTeam=async function(){
  const sn=$("tsShort").value.trim().toUpperCase();
  if(!sn){msg("tsMsg","Serve il nome breve",false);return;}
  const r=await sb.from("teams").insert({club_id:CLUB_ID,short_name:sn,official_name:$("tsOff").value.trim(),address:$("tsAddr").value.trim(),city:$("tsCity").value.trim(),notes:$("tsNotes").value.trim()});
  if(r.error){msg("tsMsg","Err: "+r.error.message,false);return;}
  ["tsShort","tsOff","tsAddr","tsCity","tsNotes"].forEach(function(i){$(i).value="";});
  msg("tsMsg","Società aggiunta!",true);loadTeams();
};
window.renderTeamList=function(){
  const el=$("tsList");if(!el)return;
  const q=($("tsSearch").value||"").toUpperCase();
  const list=TEAMS.filter(function(t){return !q||t.short_name.indexOf(q)!==-1||(t.official_name||"").toUpperCase().indexOf(q)!==-1||(t.city||"").toUpperCase().indexOf(q)!==-1;});
  $("tsCount").textContent=TEAMS.length;
  el.innerHTML=list.length?list.map(function(t){return '<div class="teamRow"><div class="tn">'+t.short_name+(t.notes?' <span class="vb verde">'+t.notes+'</span>':'')+'</div><div class="td">'+(t.official_name||"")+' — '+(t.address||"")+' '+(t.city||"")+'</div></div>';}).join(""):'<div class="spin">Nessuna società</div>';
};
window.addStaff=async function(){
  const n=$("stName").value.trim();if(!n){msg("stMsg","Serve il nome",false);return;}
  const r=await sb.from("staff").insert({club_id:CLUB_ID,full_name:n,role:$("stRole").value,phone:$("stPhone").value.trim(),figc_id:$("stFigc").value.trim(),doc_id:$("stDoc").value.trim()});
  if(r.error){msg("stMsg","Err: "+r.error.message,false);return;}
  ["stName","stPhone","stFigc","stDoc"].forEach(function(i){$(i).value="";});
  msg("stMsg","Staff aggiunto!",true);loadStaff();
};
window.delStaff=async function(id){if(confirm("Rimuovere dallo staff?")){await sb.from("staff").update({active:false}).eq("id",id);loadStaff();}};
function renderStaffList(){const el=$("stList");if(!el)return;
  el.innerHTML=STAFF.length?STAFF.map(function(s){return '<div class="teamRow"><div class="tn">'+s.full_name+' <span class="vb blu">'+(s.role||"")+'</span></div><div class="td">TESS '+(s.figc_id||"—")+' · DOC '+(s.doc_id||"—")+' <b style="color:#991b1b;cursor:pointer" onclick="delStaff(\''+s.id+'\')">✕</b></div></div>';}).join(""):'<div class="spin">Nessuno staff: aggiungilo sopra</div>';}
function populateAvv(){const opts=TEAMS.map(function(t){return "<option>"+t.short_name+"</option>";}).join("");
  const a=$("pmOpp");if(a)a.innerHTML=opts;}

function showView(v){
  const va=$("viewAuth");if(va)va.classList.toggle("hidden",v!=="auth");
  const vo=$("viewOnboard");if(vo)vo.classList.toggle("hidden",v!=="onboard");
  const app=(v==="app");
  const nv=$("nav");if(nv)nv.classList.toggle("hidden",!app);
  const bl=$("btnLogout");if(bl)bl.classList.toggle("hidden",!app);
  ["viewHome","viewSoc","viewCal","viewRosa","viewPres","viewPart","viewForm","viewSub","viewDoc","viewFoto","viewSet","viewReg"].forEach(function(x){const e=$(x);if(e)e.classList.add("hidden");});
}
function pushView(v){VIEW_STACK.push(v);}
window.goBack=function(){const prev=VIEW_STACK.pop();if(!prev||prev==="home"){goHome();return;}showTab(prev,true);};
window.goHome=function(){showView("app");VIEW_STACK=[];const vh=$("viewHome");if(vh)vh.classList.remove("hidden");setNav("nbHome");const bb=$("btnBack");if(bb)bb.classList.add("hidden");};
window.showTab=function(t,fromBack){
  showView("app");
  if(!fromBack)pushView(currentView());
  const navMap={cal:"nbCal",pres:"nbPres",part:"nbPart",reg:"nbReg"};
  setNav(navMap[t]||"nbHome");
  const map={soc:"viewSoc",cal:"viewCal",rosa:"viewRosa",pres:"viewPres",part:"viewPart",form:"viewForm",sub:"viewSub",doc:"viewDoc",foto:"viewFoto",set:"viewSet",reg:"viewReg"};
  const e=$(map[t]);if(e)e.classList.remove("hidden");
  const bb=$("btnBack");if(bb)bb.classList.remove("hidden");
  if(t==="soc"){renderTeamList();renderStaffList();}
  if(t==="cal")loadCal();
  if(t==="pres"){renderCal();}
  if(t==="part"){showPartHub();}
  if(t==="form")populateMatchSelect("fmMatch");
  if(t==="sub"){populateMatchSelect("sbMatch",true);loadSubs();}
  if(t==="doc"){populateMatchSelect("docMatch",true);renderDoc();}
  if(t==="foto")renderFoto();
  if(t==="reg")loadRegistro();
  if(t==="set"){populateLuoghi();}
};
function currentView(){
  const ids=["viewSoc","viewCal","viewRosa","viewPres","viewPart","viewForm","viewSub","viewDoc","viewFoto","viewSet","viewReg"];
  const names={viewSoc:"soc",viewCal:"cal",viewRosa:"rosa",viewPres:"pres",viewPart:"part",viewForm:"form",viewSub:"sub",viewDoc:"doc",viewFoto:"foto",viewSet:"set",viewReg:"reg"};
  for(const i of ids){const e=$(i);if(e&&!e.classList.contains("hidden"))return names[i];}
  return "home";
}
function setNav(id){["nbHome","nbCal","nbPres","nbPart","nbReg"].forEach(function(x){const e=$(x);if(e)e.classList.toggle("on",x===id);});}

function ensureArchWrap(){let aw=$("archWrap");if(!aw){aw=document.createElement("div");aw.id="archWrap";aw.style.cssText="margin-top:12px;border-top:1px solid #e2e8f0;padding-top:10px";aw.innerHTML='<a class="linkPiccolo" onclick="toggleArch()">👁 Mostra archiviati</a><div id="archList" class="hidden"></div>';const rl=$("rosaList");if(rl&&rl.parentNode)rl.parentNode.insertBefore(aw,rl.nextSibling);}return aw;}
window.toggleArch=function(){const al=$("archList");if(!al)return;al.classList.toggle("hidden");const link=al.parentNode.querySelector("a");if(link)link.textContent=al.classList.contains("hidden")?"👁 Mostra archiviati":"🙈 Nascondi archiviati";};
async function loadRosa(){
  const r=await sb.from("players").select("*").eq("active",true).order("jersey_number");
  if(r.error)return;
  PLAYERS=r.data||[];
  const rc=$("rosaCount");if(rc)rc.textContent=PLAYERS.length;
  const rl=$("rosaList");
  if(rl){
    if(!PLAYERS.length){rl.innerHTML='<div class="spin">Nessun giocatore</div>';}
    else{rl.innerHTML=PLAYERS.map(function(p){const sv=statoVisita(p.medical_expiry);const iz=((p.first_name||"")[0]||"")+((p.last_name||"")[0]||"");const bg=p.photo_url?("background-image:url('"+p.photo_url+"')"):"";
      return '<div class="pitem" onclick="openEdit(\''+p.id+'\')"><div class="pavatar" style="'+bg+'">'+(p.photo_url?"":iz.toUpperCase())+'</div><div class="pmid"><div class="pname">'+p.last_name+' '+p.first_name+'</div><span class="vb '+sv.cls+'">'+sv.txt+'</span></div><button class="delBtn" onclick="event.stopPropagation();delPlayer(\''+p.id+'\')">🗑</button></div>';}).join("");}
  }
  const aw=ensureArchWrap();
  const ra=await sb.from("players").select("*").eq("active",false).order("last_name");
  const arch=ra.data||[];
  const al=$("archList");
  if(al){
    if(arch.length){al.innerHTML=arch.map(function(p){return '<div class="pitem"><div class="pmid"><div class="pname">'+p.last_name+' '+p.first_name+'</div><small style="color:#64748b">uscito: '+(p.left_date||"-")+'</small></div><button class="btn ok" style="width:auto;margin:0;padding:8px 12px" onclick="riattiva(\''+p.id+'\')">♻ Riattiva</button></div>';}).join("");aw.style.display="";}
    else{al.innerHTML="";aw.style.display="none";}
  }
}
window.riattiva=async function(id){await sb.from("players").update({active:true,left_date:null}).eq("id",id);await loadRosa();await loadAllPlayers();alert("Giocatore riattivato.");};
async function loadAllPlayers(){const r=await sb.from("players").select("*").order("jersey_number");ALL_PLAYERS=r.data||[];}
function inRosa(p,d){if(!p)return false;if(p.joined_date&&d<p.joined_date)return false;if(p.left_date&&d>p.left_date)return false;if(!p.active&&!p.left_date)return false;return true;}
function leggiForm(p){return{jersey_number:parseInt($(p+"Num").value)||null,last_name:$(p+"Cogn").value.trim(),first_name:$(p+"Nome").value.trim(),birth_date:normDate($(p+"Birth").value),medical_expiry:normDate($(p+"Med").value),joined_date:normDate($(p+"Joined").value),left_date:normDate($(p+"Left").value),phone:$(p+"Tel").value.trim(),phone_mother:$(p+"TelM").value.trim(),phone_father:$(p+"TelP").value.trim(),figc_id:$(p+"Figc").value.trim(),doc_id:$(p+"Doc").value.trim(),card_number:$(p+"Card").value.trim(),notes:$(p+"Note").value.trim()};}
window.addPlayer=async function(){const o=leggiForm("np");if(!o.last_name||!o.first_name){msg("npMsg","Servono cognome e nome",false);return;}if(FOTO_NP)o.photo_url=FOTO_NP;o.club_id=CLUB_ID;const r=await sb.from("players").insert(o);if(r.error){msg("npMsg","Err: "+r.error.message,false);return;}["npNum","npCogn","npNome","npBirth","npMed","npJoined","npLeft","npTel","npTelM","npTelP","npFigc","npDoc","npCard","npNote","npFoto"].forEach(function(i){const e=$(i);if(e)e.value="";});const fp=$("npFotoPrev");if(fp){fp.style.backgroundImage="";fp.textContent="📷";}FOTO_NP=null;msg("npMsg","Aggiunto!",true);loadRosa();loadAllPlayers();};
window.openEdit=function(id){const p=PLAYERS.find(function(x){return x.id===id;})||ALL_PLAYERS.find(function(x){return x.id===id;});if(!p)return;EDIT_ID=id;FOTO_ED=null;const K={Num:"jersey_number",Cogn:"last_name",Nome:"first_name",Birth:"birth_date",Med:"medical_expiry",Joined:"joined_date",Left:"left_date",Tel:"phone",TelM:"phone_mother",TelP:"phone_father",Figc:"figc_id",Doc:"doc_id",Card:"card_number",Note:"notes"};Object.keys(K).forEach(function(k){const e=$("ed"+k);if(e)e.value=p[K[k]]||"";});const ep=$("edFotoPrev");if(ep){if(p.photo_url){ep.style.backgroundImage="url("+p.photo_url+")";ep.textContent="";}else{ep.style.backgroundImage="";ep.textContent="📷";}}const ec=$("editCard");if(ec)ec.classList.remove("hidden");};
window.closeEdit=function(){const ec=$("editCard");if(ec)ec.classList.add("hidden");EDIT_ID=null;};
window.saveEdit=async function(){if(!EDIT_ID)return;const o=leggiForm("ed");if(FOTO_ED)o.photo_url=FOTO_ED;const r=await sb.from("players").update(o).eq("id",EDIT_ID);if(r.error){msg("edMsg","Err: "+r.error.message,false);return;}msg("edMsg","Salvato!",true);closeEdit();loadRosa();loadAllPlayers();};
window.delPlayer=async function(id){if(confirm("Togliere giocatore?")){await sb.from("players").update({active:false}).eq("id",id);loadRosa();loadAllPlayers();}};
window.clearRosa=async function(){if(!confirm("Svuotare tutta la rosa?"))return;await sb.from("players").update({active:false}).eq("club_id",CLUB_ID).eq("active",true);loadRosa();loadAllPlayers();};

async function loadSessionDates(){const r=await sb.from("sessions").select("date, attendances(id)").eq("club_id",CLUB_ID);const rows=r.data||[];SESSION_DATES=new Set(rows.filter(function(s){return s.attendances&&s.attendances.length>0;}).map(function(s){return s.date;}));}
function sessioneNumero(d){const arr=Array.from(SESSION_DATES).sort();const i=arr.indexOf(d);if(i>=0)return{n:i+1,tot:arr.length};return{n:arr.filter(function(x){return x<d;}).length+1,tot:arr.length+1};}
function buildCal(view,wrapId,selId,datesSet){const y=view.y,m=view.m;const dow=(new Date(y,m,1).getDay()+6)%7;const days=new Date(y,m+1,0).getDate();let h="";["L","M","M","G","V","S","D"].forEach(function(d){h+='<div class="calDow">'+d+'</div>';});for(let i=0;i<dow;i++)h+='<div class="calCell empty"></div>';for(let d=1;d<=days;d++){const iso=y+"-"+String(m+1).padStart(2,"0")+"-"+String(d).padStart(2,"0");const sel=(iso===$(selId).value)?" sel":"";const dot=(datesSet&&datesSet.has(iso))?" dot":"";h+='<div class="calCell'+sel+dot+'" data-iso="'+iso+'">'+d+'</div>';}$(wrapId).innerHTML=h;
  $(wrapId).querySelectorAll(".calCell[data-iso]").forEach(function(c){c.onclick=function(){const iso=c.dataset.iso;if(selId==="attDate"){selectDay(iso);}else if(selId==="pmDate"){$("pmDate").value=iso;renderPmCal();}else{$(selId).value=iso;}};});}
function renderCal(){const ct=$("calTitle");if(ct)ct.textContent=MESI[CAL_VIEW.m]+" "+CAL_VIEW.y;buildCal(CAL_VIEW,"calWrap","attDate",SESSION_DATES);}
window.calPrev=function(){CAL_VIEW.m--;if(CAL_VIEW.m<0){CAL_VIEW.m=11;CAL_VIEW.y--;}renderCal();};
window.calNext=function(){CAL_VIEW.m++;if(CAL_VIEW.m>11){CAL_VIEW.m=0;CAL_VIEW.y++;}renderCal();};
window.quickDay=function(o){const d=new Date();d.setDate(d.getDate()+o);selectDay(isoOf(d));};
window.selectDay=function(iso){$("attDate").value=iso;renderCal();loadAttendance();};

async function loadAttendance(){
  const d=$("attDate").value;if(!d)return;
  const r=await sb.from("sessions").select("*").eq("date",d).maybeSingle();
  const sess=r.data;CURRENT_SESSION=sess;
  const map={};
  if(sess){const ra=await sb.from("attendances").select("*").eq("session_id",sess.id);(ra.data||[]).forEach(function(a){map[a.player_id]=a;});}
  ROSA_DATA=ALL_PLAYERS.filter(function(p){return inRosa(p,d);});
  ATT_STATE={};ROSA_DATA.forEach(function(p){const a=map[p.id];ATT_STATE[p.id]={present:a?a.present:false,with_team:a?a.with_team:true,behavior:a?(a.behavior||""):"",notes:a?(a.notes||""):"",reason:a?(a.reason||""):""};});
  const sn=sessioneNumero(d);
  const adl=$("attDateLbl");if(adl)adl.textContent=d.split("-").reverse().join("/")+(sess&&sess.time?(" · ore "+fmtTime(sess.time)):"")+" · All. n° "+sn.n+" di "+sn.tot;
  const ac=$("attCard");if(ac)ac.classList.remove("hidden");
  const sbp=$("saveBarPres");if(sbp)sbp.classList.remove("hidden");
  renderGrid();
}
function motivoSel(id,s){const isAlt=s.reason&&MOTIVI.indexOf(s.reason)===-1;const sv=isAlt?"Altro":(s.reason||"");let h='<select class="motivoSel" onclick="event.stopPropagation()" onchange="setReason(\''+id+'\',this.value)"><option value="">Motivo…</option>';MOTIVI.forEach(function(m){h+='<option'+(sv===m?' selected':'')+'>'+m+'</option>';});h+='</select>';if(isAlt)h+='<input class="noteIn" onclick="event.stopPropagation()" placeholder="Specifica" value="'+s.reason+'" onchange="setReason(\''+id+'\',this.value)">';return h;}
function renderGrid(){
  const pres=ROSA_DATA.filter(function(p){return ATT_STATE[p.id]&&ATT_STATE[p.id].present;});
  const ass=ROSA_DATA.length-pres.length;
  const aparte=pres.filter(function(p){return !ATT_STATE[p.id].with_team;}).length;
  const ac=$("attCount");if(ac)ac.innerHTML='✅ '+pres.length+' &nbsp; ❌ '+ass+' &nbsp; 🔹 a parte: '+aparte;
  const ag=$("attGrid");if(ag)ag.innerHTML=ROSA_DATA.map(function(p){const s=ATT_STATE[p.id];const iz=((p.first_name||"")[0]||"")+((p.last_name||"")[0]||"");const bg=p.photo_url?("background-image:url('"+p.photo_url+"')"):"";let ex;
    if(s.present){ex='<div class="miniRow"><button class="miniChip '+(s.with_team?"on":"")+'" onclick="event.stopPropagation();setTeamCard(\''+p.id+'\',true)">⭐</button><button class="miniChip ap '+(!s.with_team?"on":"")+'" onclick="event.stopPropagation();setTeamCard(\''+p.id+'\',false)">🔹</button></div>';}else{ex=motivoSel(p.id,s);}
    return '<div class="pcard '+(s.present?"on":"off")+'" onclick="tapCard(\''+p.id+'\')"><button class="gear" onclick="event.stopPropagation();openSheet(\''+p.id+'\')">⚙</button><div class="av" style="'+bg+'">'+(p.photo_url?"":iz.toUpperCase())+'</div><div class="nm">'+p.last_name+'<br>'+p.first_name+'</div><div class="st">'+(s.present?"PRESENTE":"ASSENTE")+'</div>'+ex+'</div>';}).join("");}
window.tapCard=function(id){ATT_STATE[id].present=!ATT_STATE[id].present;renderGrid();};
window.setAll=function(v){ROSA_DATA.forEach(function(p){ATT_STATE[p.id].present=v;});renderGrid();};
window.setTeamCard=function(id,v){ATT_STATE[id].with_team=v;renderGrid();};
window.setReason=function(id,v){ATT_STATE[id].reason=v;renderGrid();};
window.openSheet=function(id){SH_ID=id;const p=ROSA_DATA.find(function(x){return x.id===id;});if(!p)return;const sn=$("shName");if(sn)sn.textContent=p.last_name+" "+p.first_name;
  const sbd=$("sheetBody");if(sbd)sbd.innerHTML='<label>Comportamento</label><div class="chipRow" id="shBeh"></div><label>Note</label><textarea id="shNote">'+(ATT_STATE[id].notes||"")+'</textarea><button class="btn ok" onclick="saveSheet()">💾 Applica</button>';renderSheetBeh();const sp=$("sheetPres");if(sp)sp.classList.remove("hidden");};
function renderSheetBeh(){const sbh=$("shBeh");if(!sbh)return;sbh.innerHTML=BEH.map(function(b){return '<button class="chip '+(ATT_STATE[SH_ID].behavior===b?"on":"")+'" onclick="shSetBeh(\''+b+'\')">'+b+'</button>';}).join("");}
window.shSetBeh=function(b){ATT_STATE[SH_ID].behavior=(ATT_STATE[SH_ID].behavior===b?"":b);renderSheetBeh();};
window.closeSheet=function(){const sp=$("sheetPres");if(sp)sp.classList.add("hidden");SH_ID=null;};
window.saveSheet=function(){if(SH_ID){const sn=$("shNote");if(sn)ATT_STATE[SH_ID].notes=sn.value;}closeSheet();renderGrid();};
window.saveAttendance=async function(){
  const d=$("attDate").value;if(!d){alert("Scegli una data");return;}
  let sess=CURRENT_SESSION;
  if(!sess){const ins={club_id:CLUB_ID,date:d,kind:$("attKind").value,place:$("attPlace").value,time:$("attTime").value||null,notes:$("attNotes").value};const r2=await sb.from("sessions").insert(ins).select().single();if(r2.error){alert(r2.error.message);return;}sess=r2.data;CURRENT_SESSION=sess;}
  else{await sb.from("sessions").update({kind:$("attKind").value,place:$("attPlace").value,time:$("attTime").value||null,notes:$("attNotes").value}).eq("id",sess.id);}
  const rows=ROSA_DATA.map(function(p){return{session_id:sess.id,player_id:p.id,present:ATT_STATE[p.id].present,with_team:ATT_STATE[p.id].with_team,behavior:ATT_STATE[p.id].behavior,notes:ATT_STATE[p.id].notes,reason:ATT_STATE[p.id].reason||null};});
  const r=await sb.from("attendances").upsert(rows,{onConflict:"session_id,player_id"});if(r.error){alert(r.error.message);return;}
  await loadSessionDates();renderCal();
  const sn=sessioneNumero(d);const adl=$("attDateLbl");if(adl)adl.textContent=d.split("-").reverse().join("/")+(sess.time?(" · ore "+fmtTime(sess.time)):"")+" · All. n° "+sn.n+" di "+sn.tot;
  alert("Presenze salvate!");
};
window.showPresReport=async function(){const prc=$("presRepCard");if(prc)prc.classList.remove("hidden");await loadReport();};
window.hidePresReport=function(){const prc=$("presRepCard");if(prc)prc.classList.add("hidden");};
async function loadReport(){const rs=await sb.from("sessions").select("*").eq("club_id",CLUB_ID).order("date");const sess=rs.data||[];
  const prc=$("presRepCard");if(prc){const h2el=prc.querySelector("h2");if(h2el)h2el.innerHTML='Classifica + Matrice <span class="vb blu">Tot. allenamenti: '+sess.length+'</span>';}
  const rc=$("repClass"),rmx=$("repMatrix");
  if(!sess.length){if(rc)rc.innerHTML='<div class="spin">Nessuna seduta</div>';if(rmx)rmx.innerHTML="";return;}
  const ids=sess.map(function(s){return s.id;});const ra=await sb.from("attendances").select("*").in("session_id",ids);const map={};(ra.data||[]).forEach(function(a){if(!map[a.session_id])map[a.session_id]={};map[a.session_id][a.player_id]=a;});
  const lbl=function(s){const p=s.date.split("-");return p[2]+"/"+p[1]+(s.time?(" "+fmtTime(s.time)):"");};
  const elenco=ALL_PLAYERS.filter(function(p){return p.active;});
  const rows=elenco.map(function(p){let pr=0,as=0;sess.forEach(function(s){const a=(map[s.id]||{})[p.id];if(a&&inRosa(p,s.date)){if(a.present){pr++;}else{as++;}}});const t=pr+as;const pc=t?Math.round(pr/t*100):0;let st,cl;if(pc===100){st="SEMPRE PRESENTE";cl="verde";}else if(pc>=85){st="ASSIDUO";cl="verde";}else if(pc>=50){st="A METÀ";cl="giallo";}else{st="ASSENTE";cl="rosso";}return{p:p,pr:pr,as:as,pc:pc,st:st,cl:cl};}).sort(function(a,b){return b.pc-a.pc;});
  let h="<table class='rep'><tr><th>#</th><th>N°</th><th>Giocatore</th><th>P</th><th>A</th><th>%</th><th>Stato</th></tr>";rows.forEach(function(r,i){h+='<tr><td>'+(i+1)+'</td><td><b>'+(r.p.jersey_number||"-")+'</b></td><td class="nome">'+r.p.last_name+' '+r.p.first_name+'</td><td class="ok">'+r.pr+'</td><td class="ko">'+r.as+'</td><td>'+r.pc+'%</td><td><span class="vb '+r.cl+'">'+r.st+'</span></td></tr>';});h+="</table>";if(rc)rc.innerHTML=h;
  let h2="<table class='rep'><tr><th class='nome'>N° Gioc.</th>";sess.forEach(function(s){h2+="<th>"+lbl(s)+"</th>";});h2+="</tr>";elenco.forEach(function(p){h2+='<tr><td class="nome"><b>'+(p.jersey_number||"-")+'</b> '+p.last_name+'</td>';sess.forEach(function(s){if(!inRosa(p,s.date)){h2+='<td class="na"></td>';}else{const a=(map[s.id]||{})[p.id];if(!a){h2+='<td class="na">–</td>';}else{h2+=a.present?'<td class="ok">✔</td>':'<td class="ko">✖</td>';}}});h2+="</tr>";});h2+="</table>";if(rmx)rmx.innerHTML=h2;}

async function loadCal(){const rs=await sb.from("sessions").select("*").eq("club_id",CLUB_ID);const rm=await sb.from("matches").select("*").eq("club_id",CLUB_ID);const items=[];
  (rs.data||[]).forEach(function(x){items.push({d:x.date,tipo:"Allenamento",txt:x.kind+" "+(x.place||"")+(x.time?(" ore "+fmtTime(x.time)):""),cls:"blu"});});
  (rm.data||[]).forEach(function(x){items.push({d:x.date,tipo:"Partita",txt:"vs "+x.opponent+(x.time?(" ore "+fmtTime(x.time)):""),cls:"verde"});});
  items.sort(function(a,b){return a.d<b.d?1:-1;});
  const cl=$("calList");if(!cl)return;
  if(!items.length){cl.innerHTML='<div class="spin">Nessun evento</div>';return;}
  cl.innerHTML=items.map(function(i){const p=i.d.split("-");return '<div class="calItem"><div class="d">'+p[2]+'/'+p[1]+'<small>'+p[0]+'</small></div><div><span class="vb '+i.cls+'">'+i.tipo+'</span> <b>'+i.txt+'</b></div></div>';}).join("");}

async function loadPartite(){const r=await sb.from("matches").select("*").eq("club_id",CLUB_ID).order("date",{ascending:false});PARTITE=r.data||[];}
function renderPartList(){const pl=$("partList");if(!pl)return;
  if(!PARTITE.length){pl.innerHTML='<div class="spin">Nessuna partita</div>';return;}
  pl.innerHTML=PARTITE.map(function(m){const sc=(m.score_home!=null&&m.score_away!=null)?(m.score_home+"-"+m.score_away):"–";const isLive=(m.status==="live");
    return '<div class="partCard'+(isLive?" live":"")+'" onclick="openPart(\''+m.id+'\')"><div class="pcTop"><span>'+m.date.split("-").reverse().join("/")+' '+(m.time?fmtTime(m.time):"")+'</span><span>'+m.competition+'</span></div><div class="pcTeams"><span>'+(m.home?"NOI":"AVV")+' vs '+m.opponent+'</span><span class="pcScore">'+(isLive?"🔴 LIVE":sc)+'</span></div><div><span class="vb '+(m.home?"verde":"giallo")+'">'+(m.home?"CASA":"TRASF")+'</span><span class="vb '+(isLive?"rosso":"blu")+'">'+(isLive?"IN CORSO":(m.status||""))+'</span></div></div>';}).join("");}
window.showPartHub=function(){
  $("partHub").classList.remove("hidden");$("partLive").classList.add("hidden");$("partManual").classList.add("hidden");
  renderPartList();
  const hb=$("hubLive");
  if(LIVE&&LIVE.matchId){const m=PARTITE.find(function(x){return x.id===LIVE.matchId;});if(m){hb.classList.remove("hidden");$("hubLiveTxt").textContent="Partita in corso: "+m.opponent+" "+(LIVE.home||0)+"-"+(LIVE.away||0);}}
  else hb.classList.add("hidden");
};
window.resumeHubLive=function(){if(LIVE&&LIVE.matchId)openLiveFor(LIVE.matchId);};
window.openPart=function(id){const m=PARTITE.find(function(x){return x.id===id;});if(!m)return;if(m.status==="live"){openLiveFor(id);}else{openManual(id);}};
window.openLivePicker=function(){
  $("partLive").classList.remove("hidden");$("partHub").classList.add("hidden");
  const sbd=$("sheetLiveBody");if(!sbd)return;
  $("shLiveName").textContent="Avvia partita LIVE";
  sbd.innerHTML='<label>Avversario</label><select id="lvOpp">'+TEAMS.map(function(t){return "<option>"+t.short_name+"</option>";}).join("")+'</select><label>O altro avversario</label><input type="text" id="lvOppFree"><label>Campo</label><select id="lvHome"><option value="true">Casa</option><option value="false">Trasferta</option></select><button class="btn danger" onclick="confirmStartLive()">🔴 Avvia LIVE</button>';
  $("sheetLive").classList.remove("hidden");
};
window.confirmStartLive=async function(){
  let opp=$("lvOppFree").value.trim();if(!opp)opp=$("lvOpp").value;if(!opp){alert("Avversario?");return;}
  const ins={club_id:CLUB_ID,date:isoOf(new Date()),time:null,opponent:opp,home:$("lvHome").value==="true",competition:"Campionato",place:SETTINGS.luogo_default,category:"Under 14",status:"live"};
  const r=await sb.from("matches").insert(ins).select().single();if(r.error){alert(r.error.message);return;}
  LIVE={matchId:r.data.id,clock:0,half:1,running:false,home:0,away:0,rec1:0,rec2:0};REAL_SEC=0;SETTINGS.live=LIVE;await persistSettings();
  await loadPartite();closeLiveSheet();openLiveFor(r.data.id);
};
function openLiveFor(id){
  const m=PARTITE.find(function(x){return x.id===id;});if(!m)return;
  if(!LIVE||LIVE.matchId!==id){LIVE={matchId:id,clock:0,half:1,running:false,home:(m.score_home||0),away:(m.score_away||0),rec1:0,rec2:0};REAL_SEC=0;SETTINGS.live=LIVE;persistSettings();}
  CUR_PART=m;
  $("partHub").classList.add("hidden");$("partManual").classList.add("hidden");$("partLive").classList.remove("hidden");
  const sc=$("lvScore");if(sc)sc.textContent="BORGARO "+(LIVE.home||0)+"-"+(LIVE.away||0)+" "+m.opponent;
  updateLiveUI();renderPitch();renderLiveEvents();
  const lp=$("lvPlay");if(lp)lp.textContent=LIVE.running?"⏸ PAUSA":"▶ AVVIA";
}
window.toggleLive=async function(){if(!LIVE)return;LIVE.running=!LIVE.running;SETTINGS.live=LIVE;await persistSettings();
  if(LIVE.running){LIVE_TIMER=setInterval(function(){LIVE.clock++;REAL_SEC++;updateLiveUI();if(LIVE.clock%5===0){SETTINGS.live=LIVE;persistSettings();}},1000);}else{clearInterval(LIVE_TIMER);}
  const lp=$("lvPlay");if(lp)lp.textContent=LIVE.running?"⏸ PAUSA":"▶ AVVIA";};
window.nextHalfLive=async function(){if(!LIVE)return;LIVE.half=2;SETTINGS.live=LIVE;await persistSettings();updateLiveUI();};
function fmt(sec){const m=Math.floor(sec/60),s=sec%60;return String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");}
function updateLiveUI(){if(!LIVE)return;const dur=35*60;const rest=Math.max(0,dur-LIVE.clock);
  const lc=$("lvClock");if(lc)lc.textContent=fmt(LIVE.clock);
  const lr=$("lvRest");if(lr)lr.textContent="Restanti "+fmt(rest);
  const lh=$("lvHalf");if(lh)lh.textContent=(LIVE.half===1?"1°":"2°")+" Tempo";
  const t1=$("lvT1");if(t1)t1.textContent="1°T "+Math.floor(LIVE.clock/60)+"'";
  const t2=$("lvT2");if(t2)t2.textContent="2°T 0'";
  const tt=$("lvTot");if(tt)tt.textContent="TOT "+Math.floor(LIVE.clock/60)+"'";
  const rc=$("lvRec");if(rc)rc.textContent="Rec 1°T +"+(LIVE.rec1||0)+"' · Rec 2°T +"+(LIVE.rec2||0)+"'";
  const rl=$("lvReal");if(rl)rl.textContent="Tempo reale: "+fmt(REAL_SEC);}
function renderPitch(){if(!LIVE)return;const lp=$("lvPitch");if(!lp)return;
  lp.innerHTML=PLAYERS.map(function(p){return '<div class="pall in" onclick="selectLivePlayer(\''+p.id+'\')"><div class="c">'+(p.jersey_number||"-")+'</div><div class="t">'+p.last_name.toUpperCase()+'</div></div>';}).join("");}
window.selectLivePlayer=function(id){LIVE_SEL=id;openEventSheet();};
window.openEventSheet=function(){if(!LIVE)return;$("shLiveName").textContent="Aggiungi evento";
  const sbd=$("sheetLiveBody");if(!sbd)return;
  sbd.innerHTML='<label>Giocatore</label><select id="lvEvPlayer">'+PLAYERS.map(function(p){return '<option value="'+p.id+'">#'+(p.jersey_number||"-")+' '+p.last_name+' '+p.first_name+'</option>';}).join("")+'</select><div class="chipRow" style="margin-top:8px">'+["goal","assist","save","yellow","red","shot","goal_against"].map(function(t){return '<button class="chip" onclick="liveEvent(\''+t+'\')">'+t+'</button>';}).join("")+'</div>';
  $("sheetLive").classList.remove("hidden");};
window.closeLiveSheet=function(){const sl=$("sheetLive");if(sl)sl.classList.add("hidden");};
window.openSubSheet=function(){if(!LIVE)return;$("shLiveName").textContent="Sostituzione";
  const sbd=$("sheetLiveBody");if(!sbd)return;
  sbd.innerHTML='<label>Esce</label><select id="shOut">'+playerOpts()+'</select><label>Entra</label><select id="shIn">'+playerOpts()+'</select><button class="btn ok" onclick="doLiveSub()">🔄 Conferma</button>';
  $("sheetLive").classList.remove("hidden");};
window.doLiveSub=async function(){const min=Math.floor(LIVE.clock/60);await sb.from("match_events").insert([{match_id:LIVE.matchId,player_id:$("shOut").value,type:"sub_out",minute:min,half:LIVE.half},{match_id:LIVE.matchId,player_id:$("shIn").value,type:"sub_in",minute:min,half:LIVE.half}]);closeLiveSheet();renderLiveEvents();};
window.liveEvent=async function(t){if(!LIVE)return;let pid=LIVE_SEL;if(!pid){const sel=$("lvEvPlayer");pid=sel?sel.value:PLAYERS[0].id;}const min=Math.floor(LIVE.clock/60);
  await sb.from("match_events").insert({match_id:LIVE.matchId,player_id:pid,type:t,minute:min,half:LIVE.half});
  if(t==="goal"){LIVE.home=(LIVE.home||0)+1;}if(t==="goal_against"){LIVE.away=(LIVE.away||0)+1;}
  SETTINGS.live=LIVE;await persistSettings();const m=PARTITE.find(function(x){return x.id===LIVE.matchId;});const sc=$("lvScore");if(sc)sc.textContent="BORGARO "+(LIVE.home||0)+"-"+(LIVE.away||0)+" "+(m?m.opponent:"");renderLiveEvents();closeLiveSheet();};
async function renderLiveEvents(){if(!LIVE)return;const r=await sb.from("match_events").select("*").eq("match_id",LIVE.matchId).order("created_at",{ascending:false});
  const ic={goal:"⚽",assist:"🎯",save:"🧤",yellow:"🟨",red:"🟥",shot:"💥",goal_against:"🥅",sub_in:"🔄 entra",sub_out:"🔄 esce"};
  const le=$("lvEvents"),lg=$("lvGolList");
  if(!r.data||!r.data.length){if(le)le.innerHTML='<div class="spin">Nessun evento</div>';if(lg)lg.textContent="Nessun gol";return;}
  if(le)le.innerHTML=r.data.map(function(e){return '<div class="evItem"><span>'+(ic[e.type]||"")+' '+nome(e.player_id)+'</span><span>'+(e.minute||0)+"' "+(e.half||1)+"°T</span></div>";}).join("");
  const gols=r.data.filter(function(e){return e.type==="goal";});if(lg)lg.textContent=gols.length?("Gol: "+gols.map(function(e){return nome(e.player_id)+" "+(e.minute||0)+"'";}).join(", ")):"Nessun gol";}
window.saveLiveToMatch=async function(){if(!LIVE)return;await sb.from("matches").update({score_home:LIVE.home,score_away:LIVE.away}).eq("id",LIVE.matchId);alert("Risultato salvato!");};
window.stopLive=async function(){if(!LIVE)return;if(!confirm("Terminare la partita live?"))return;clearInterval(LIVE_TIMER);
  await sb.from("matches").update({status:"completed",score_home:LIVE.home,score_away:LIVE.away}).eq("id",LIVE.matchId);LIVE=null;SETTINGS.live=null;await persistSettings();await loadPartite();showPartHub();};

function renderPmCal(){const ct=$("pmCalTitle");if(ct)ct.textContent=MESI[PM_CAL.m]+" "+PM_CAL.y;buildCal(PM_CAL,"pmCalWrap","pmDate",null);}
window.pmCalPrev=function(){PM_CAL.m--;if(PM_CAL.m<0){PM_CAL.m=11;PM_CAL.y--;}renderPmCal();};
window.pmCalNext=function(){PM_CAL.m++;if(PM_CAL.m>11){PM_CAL.m=0;PM_CAL.y++;}renderPmCal();};
window.pmQuick=function(o){const d=new Date();d.setDate(d.getDate()+o);$("pmDate").value=isoOf(d);renderPmCal();};
window.openManualNew=function(){
  CUR_PART=null;PART_STATE={};
  $("pmTitle").textContent="Inserisci partita precedente";
  $("pmDate").value=isoOf(new Date());renderPmCal();
  $("pmOppFree").value="";$("pmGolHome").value="";$("pmGolAway").value="";$("pmTime").value="";
  $("pmRoster").innerHTML='<div class="spin">Salva prima i dati partita</div>';
  $("pmSubs").innerHTML="";
  $("partHub").classList.add("hidden");$("partLive").classList.add("hidden");$("partManual").classList.remove("hidden");
};
async function openManual(id){
  const m=PARTITE.find(function(x){return x.id===id;});if(!m)return;CUR_PART=m;
  $("pmTitle").textContent=(m.home?"Casa":"Trasf")+" vs "+m.opponent;
  $("pmDate").value=m.date;renderPmCal();
  $("pmTime").value=m.time||"";$("pmGolHome").value=(m.score_home!=null?m.score_home:"");$("pmGolAway").value=(m.score_away!=null?m.score_away:"");
  $("pmHome").value=m.home?"true":"false";$("pmComp").value=m.competition;$("pmPlace").value=m.place||SETTINGS.luogo_default;
  await loadPartState(id);renderPmRoster();renderPmSubs();
  $("partHub").classList.add("hidden");$("partLive").classList.add("hidden");$("partManual").classList.remove("hidden");
}
async function loadPartState(id){
  const rmp=await sb.from("match_players").select("*").eq("match_id",id);
  const rev=await sb.from("match_events").select("*").eq("match_id",id);
  const mpM={};(rmp.data||[]).forEach(function(x){mpM[x.player_id]=x;});
  const gol={};(rev.data||[]).forEach(function(e){if(e.type==="goal"){gol[e.player_id]=(gol[e.player_id]||0)+1;}});
  PART_STATE={};PLAYERS.forEach(function(p){const x=mpM[p.id];PART_STATE[p.id]={starter:x?x.starter:false,convocated:x?x.convocated:true,conv_note:x?(x.conv_note||""):"",gol:gol[p.id]||0};});
}
window.pmSaveBase=async function(){
  let opp=$("pmOppFree").value.trim();if(!opp)opp=$("pmOpp").value;if(!opp){alert("Avversario?");return;}
  const data={club_id:CLUB_ID,date:$("pmDate").value,time:$("pmTime").value||null,opponent:opp,home:$("pmHome").value==="true",competition:$("pmComp").value,place:$("pmPlace").value,category:"Under 14",score_home:parseInt($("pmGolHome").value)||0,score_away:parseInt($("pmGolAway").value)||0,status:"completed"};
  if(!CUR_PART){const r=await sb.from("matches").insert(data).select().single();if(r.error){alert(r.error.message);return;}CUR_PART=r.data;}
  else{await sb.from("matches").update(data).eq("id",CUR_PART.id);}
  await loadPartite();await loadPartState(CUR_PART.id);
  $("pmTitle").textContent=(CUR_PART.home?"Casa":"Trasf")+" vs "+CUR_PART.opponent;
  renderPmRoster();renderPmSubs();
  alert("Dati salvati: ora formazione, marcatori e sostituzioni.");
};
function renderPmRoster(){const pr=$("pmRoster");if(!pr)return;if(!CUR_PART){pr.innerHTML='<div class="spin">Salva prima i dati partita</div>';return;}
  pr.innerHTML=PLAYERS.map(function(p){const s=PART_STATE[p.id];
    return '<div class="formRow"><div class="num">'+(p.jersey_number||"-")+'</div><div class="fn">'+p.last_name+' '+p.first_name+'</div><div class="st3"><button class="'+(s.starter?"on":"")+'" onclick="pmSetStato(\''+p.id+'\',\'T\')">Tit</button><button class="'+(!s.starter&&s.convocated?"on":"")+'" onclick="pmSetStato(\''+p.id+'\',\'P\')">Pan</button><button class="'+(!s.convocated?"on":"")+'" onclick="pmSetStato(\''+p.id+'\',\'F\')">Fuori</button></div><div class="stepper"><button onclick="pmAddGol(\''+p.id+'\',-1)">−</button><span>⚽'+s.gol+'</span><button onclick="pmAddGol(\''+p.id+'\',1)">+</button></div></div>';}).join("");}
window.pmSetStato=function(id,v){const s=PART_STATE[id];if(v==="T"){s.starter=true;s.convocated=true;}if(v==="P"){s.starter=false;s.convocated=true;}if(v==="F"){s.starter=false;s.convocated=false;}renderPmRoster();};
window.pmAddGol=function(id,d){PART_STATE[id].gol=Math.max(0,PART_STATE[id].gol+d);renderPmRoster();};
function renderPmSubs(){const ps=$("pmSubs");if(!ps)return;if(!CUR_PART){ps.innerHTML="";return;}
  let h="";for(let i=0;i<PM_SUB_SLOTS;i++){h+='<div class="subSlot"><div class="sn">Slot '+(i+1)+'</div><div class="row"><div><label>Min</label><input type="number" class="pmSubMin"></div><div><label>Esce</label><select class="pmSubOut">'+playerOpts()+'</select></div><div><label>Entra</label><select class="pmSubIn">'+playerOpts()+'</select></div></div></div>';}
  ps.innerHTML=h;}
window.addPmSubSlot=function(){PM_SUB_SLOTS++;renderPmSubs();};
window.pmSaveSubs=async function(){if(!CUR_PART){alert("Salva prima i dati partita");return;}
  await sb.from("match_events").delete().eq("match_id",CUR_PART.id).in("type",["sub_in","sub_out"]);
  const ins=[];document.querySelectorAll("#pmSubs .subSlot").forEach(function(sl){const min=parseInt(sl.querySelector(".pmSubMin").value)||0;const out=sl.querySelector(".pmSubOut").value;const inn=sl.querySelector(".pmSubIn").value;if(min>0&&out&&inn&&out!==inn){ins.push({match_id:CUR_PART.id,player_id:out,type:"sub_out",minute:min,half:1});ins.push({match_id:CUR_PART.id,player_id:inn,type:"sub_in",minute:min,half:1});}});
  if(ins.length)await sb.from("match_events").insert(ins);
  alert("Sostituzioni salvate!");};
window.pmSaveAll=async function(){
  if(!CUR_PART){alert("Salva prima i dati partita");return;}
  await sb.from("matches").update({score_home:parseInt($("pmGolHome").value)||0,score_away:parseInt($("pmGolAway").value)||0}).eq("id",CUR_PART.id);
  const rows=PLAYERS.map(function(p){return{match_id:CUR_PART.id,player_id:p.id,starter:PART_STATE[p.id].starter,convocated:PART_STATE[p.id].convocated};});
  await sb.from("match_players").upsert(rows,{onConflict:"match_id,player_id"});
  for(const p of PLAYERS){await sb.from("match_events").delete().eq("match_id",CUR_PART.id).eq("player_id",p.id).eq("type","goal");const g=PART_STATE[p.id].gol;if(g>0){const evs=[];for(let i=0;i<g;i++){evs.push({match_id:CUR_PART.id,player_id:p.id,type:"goal",half:1});}await sb.from("match_events").insert(evs);}}
  alert("Partita completa salvata!");showPartHub();};

function playerOpts(){return PLAYERS.map(function(p){return '<option value="'+p.id+'">#'+(p.jersey_number||"-")+' '+p.last_name+' '+p.first_name+'</option>';}).join("");}
function populateMatchSelect(id){const e=$(id);if(!e)return;e.innerHTML=PARTITE.map(function(m){return '<option value="'+m.id+'">'+m.date.split("-").reverse().join("/")+' vs '+m.opponent+'</option>';}).join("");}
window.loadSubs=function(){const sm=$("sbMatch");if(!sm)return;let h="";for(let i=0;i<5;i++){h+='<div class="subSlot"><div class="sn">Slot '+(i+1)+'</div><div class="row"><div><label>Min</label><input type="number" class="subMin"></div><div><label>Esce</label><select class="subOut">'+playerOpts()+'</select></div><div><label>Entra</label><select class="subIn">'+playerOpts()+'</select></div></div></div>';}
  const ss=$("subSlots");if(ss)ss.innerHTML=h;loadSubList();};
window.addSubSlot=function(){const ss=$("subSlots");if(!ss)return;const i=ss.querySelectorAll(".subSlot").length;ss.insertAdjacentHTML("beforeend",'<div class="subSlot"><div class="sn">Slot '+(i+1)+'</div><div class="row"><div><label>Min</label><input type="number" class="subMin"></div><div><label>Esce</label><select class="subOut">'+playerOpts()+'</select></div><div><label>Entra</label><select class="subIn">'+playerOpts()+'</select></div></div></div>');};
window.saveSubs=async function(){const sm=$("sbMatch");if(!sm||!sm.value)return;const id=sm.value;await sb.from("match_events").delete().eq("match_id",id).in("type",["sub_in","sub_out"]);
  const ins=[];document.querySelectorAll("#subSlots .subSlot").forEach(function(sl){const min=parseInt(sl.querySelector(".subMin").value)||0;const out=sl.querySelector(".subOut").value;const inn=sl.querySelector(".subIn").value;if(min>0&&out&&inn&&out!==inn){ins.push({match_id:id,player_id:out,type:"sub_out",minute:min,half:1});ins.push({match_id:id,player_id:inn,type:"sub_in",minute:min,half:1});}});
  if(ins.length)await sb.from("match_events").insert(ins);alert("Sostituzioni salvate!");loadSubList();};
async function loadSubList(){const sm=$("sbMatch");if(!sm||!sm.value)return;const r=await sb.from("match_events").select("*").eq("match_id",sm.value).eq("type","sub_in").order("minute");
  const sl=$("sbList");if(!sl)return;
  if(!r.data||!r.data.length){sl.innerHTML='<div class="spin">Nessuna sostituzione</div>';return;}
  sl.innerHTML=r.data.map(function(e){return '<div class="evItem"><span>🔄 entra '+nome(e.player_id)+'</span><span>'+e.minute+"'</span></div>";}).join("");}

window.openForm=async function(){const fm=$("fmMatch");if(!fm||!fm.value)return;CUR_PART=PARTITE.find(function(x){return x.id===fm.value;});await loadPartState(fm.value);refreshForm();};
function refreshForm(){const fr=$("fmRoster");if(!fr)return;fr.innerHTML=PLAYERS.map(function(p){const s=PART_STATE[p.id];
  return '<div class="formRow"><div class="num">'+(p.jersey_number||"-")+'</div><div class="fn">'+p.last_name+' '+p.first_name+'</div><div class="st3"><button class="'+(s.starter?"on":"")+'" onclick="fmSet(\''+p.id+'\',\'T\')">Tit</button><button class="'+(!s.starter&&s.convocated?"on":"")+'" onclick="fmSet(\''+p.id+'\',\'P\')">Pan</button><button class="'+(!s.convocated?"on":"")+'" onclick="fmSet(\''+p.id+'\',\'F\')">Fuori</button></div></div>';}).join("");}
window.fmSet=function(id,v){const s=PART_STATE[id];if(v==="T"){s.starter=true;s.convocated=true;}if(v==="P"){s.starter=false;s.convocated=true;}if(v==="F"){s.starter=false;s.convocated=false;}refreshForm();};
window.saveForm=async function(){if(!CUR_PART)return;const rows=PLAYERS.map(function(p){return{match_id:CUR_PART.id,player_id:p.id,starter:PART_STATE[p.id].starter,convocated:PART_STATE[p.id].convocated};});await sb.from("match_players").upsert(rows,{onConflict:"match_id,player_id"});alert("Formazione salvata!");};

// ---------- DOCUMENTI FEDELI A4 ----------
function minusMinuti(hm,min){if(!hm)return "";var p=String(hm).split(":");var tot=parseInt(p[0])*60+parseInt(p[1])-min;if(tot<0)tot+=1440;return String(Math.floor(tot/60)).padStart(2,"0")+":"+String(tot%60).padStart(2,"0");}
function birthFmt(d){return d?d.split("-").reverse().join("/"):"";}
function staffField(id,f){if(!id)return "";var s=STAFF.find(function(x){return x.id===id;});return s?(s[f]||""):"";}
window.showDoc=function(m){DOC_MODE=m;var dd=$("docTabD"),dc=$("docTabC");if(dd)dd.className="btn "+(m==="dist"?"":"sec");if(dc)dc.className="btn "+(m==="conv"?"":"sec");renderDoc();};
window.setDocStaff=function(role,id){DOC_STAFF[role]=id;buildDoc();};
window.setDocRow=function(i,id){DOC_ROWS[i]=id;buildDoc();};
window.saveDist=async function(){
  if(!CUR_DOC_MATCH)return;
  const r=await sb.from("match_players").select("*").eq("match_id",CUR_DOC_MATCH.id);
  const mpM={};(r.data||[]).forEach(function(x){mpM[x.player_id]=x;});
  const elenco=PLAYERS.filter(function(p){return inRosa(p,CUR_DOC_MATCH.date);});
  const rows=elenco.map(function(p){return{match_id:CUR_DOC_MATCH.id,player_id:p.id,convocated:DOC_ROWS.indexOf(p.id)!==-1,conv_note:mpM[p.id]?mpM[p.id].conv_note:null,starter:mpM[p.id]?mpM[p.id].starter:false};});
  await sb.from("match_players").upsert(rows,{onConflict:"match_id,player_id"});
  const srows=Object.keys(DOC_STAFF).filter(function(k){return DOC_STAFF[k];}).map(function(k){return{match_id:CUR_DOC_MATCH.id,role:k,staff_id:DOC_STAFF[k]};});
  for(const s of srows){await sb.from("match_staff").upsert(s,{onConflict:"match_id,role"});}
  alert("Distinta salvata (giocatori + staff).");
};
window.saveConv=async function(){
  if(!CUR_DOC_MATCH)return;
  const rows=Object.keys(CONV_STATE).map(function(pid){return{match_id:CUR_DOC_MATCH.id,player_id:pid,convocated:CONV_STATE[pid].conv,conv_note:CONV_STATE[pid].note||null,starter:PART_STATE[pid]?PART_STATE[pid].starter:false};});
  if(rows.length){const r=await sb.from("match_players").upsert(rows,{onConflict:"match_id,player_id"});if(r.error){alert(r.error.message);return;}}
  alert("Convocazione salvata!");
};
window.renderDoc=function(){
  var dm=$("docMatch"),out=$("docOut");if(!dm||!out)return;
  var m=PARTITE.find(function(x){return x.id===dm.value;});
  CUR_DOC_MATCH=m||null;
  if(!m){out.innerHTML='<div class="spin">Nessuna partita</div>';return;}
  if(DOC_MODE==="dist"){
    sb.from("match_staff").select("*").eq("match_id",m.id).then(function(rs){
      DOC_STAFF={};
      (rs.data||[]).forEach(function(x){DOC_STAFF[x.role]=x.staff_id;});
      DOC_ROWS_MATCH=null;
      buildDoc();
    });
  }else{buildDoc();}
};
function buildDoc(){
  var m=CUR_DOC_MATCH,out=$("docOut");if(!m||!out)return;
  var ritrovo=minusMinuti(m.time,75);
  var luogo=m.place||SETTINGS.luogo_default;
  var viaLuogo=getVia(luogo);
  var viaAvv=getVia(m.opponent);
  var dataFmt=m.date.split("-").reverse().join("/");
  var gara=("A.S.D. Borgaro Autoingros VS "+teamOfficial(m.opponent));
  var dsb=$("docSaveBtn");if(dsb)dsb.classList.toggle("hidden",DOC_MODE!=="conv");
  sb.from("match_players").select("*").eq("match_id",m.id).then(function(r){
    var mpM={};(r.data||[]).forEach(function(x){mpM[x.player_id]=x;});
    var elenco=PLAYERS.filter(function(p){return inRosa(p,m.date);}).sort(function(a,b){return (a.jersey_number||99)-(b.jersey_number||99);});
    var h='';
    if(DOC_MODE==="dist"){
      if(DOC_ROWS_MATCH!==m.id){
        DOC_ROWS_MATCH=m.id;
        DOC_ROWS=elenco.filter(function(p){var x=mpM[p.id];return !x||x.convocated;}).slice(0,20).map(function(p){return p.id;});
        while(DOC_ROWS.length<20)DOC_ROWS.push("");
      }
      var cnt={};DOC_ROWS.forEach(function(id){if(id){cnt[id]=(cnt[id]||0)+1;}});
      var scnt={};Object.keys(DOC_STAFF).forEach(function(rl){var id=DOC_STAFF[rl];if(id){scnt[id]=(scnt[id]||0)+1;}});
      var esclusi=elenco.filter(function(p){return DOC_ROWS.indexOf(p.id)===-1;});
      var opts='<option value="">—</option>'+elenco.map(function(p){return '<option value="'+p.id+'">'+(p.jersey_number||"-")+' '+p.last_name+' '+p.first_name+'</option>';}).join("");
      h+='<div class="docWrap" style="width:190mm;margin:0 auto;font-size:10pt">';
      h+='<div class="docTop"><div class="docLogos"><img src="img/logo-figc-sg.svg" style="height:15mm" alt="FIGC"><img src="img/logo-lnd.svg" style="height:15mm" alt="LND"></div><div class="docSocName" style="font-size:19pt">A.S.D. BORGARO AUTOINGROS</div><div class="docLogos"><img src="img/logo-borgaro.svg" style="height:20mm" alt="Borgaro"></div></div>';
      h+='<div class="docContacts" style="font-size:8pt">'+CLUB_INFO.addr+' – Tel. '+CLUB_INFO.tel+'<br>E-mail: '+CLUB_INFO.mail+' - PEC: '+CLUB_INFO.pec+'<br>'+CLUB_INFO.piva+' - MATRICOLA FIGC '+CLUB_INFO.matricola+' - ISCRIZIONE REGISTRO C.O.N.I. n° '+CLUB_INFO.coni+'</div>';
      h+='<div class="docBarGrey">DISTINTA GIOCATORI</div>';
      h+='<div class="docBarGrey small">INCONTRO di '+m.competition+'</div>';
      h+='<div class="docMatchTitle" style="font-size:15pt">'+gara+'</div>';
      h+='<div class="docMetaRow"><span class="lbl">VALEVOLE PER:</span><span class="val">'+m.competition+' Regionale U14</span></div>';
      h+='<div class="docMetaRow"><span class="lbl">DATA:</span><span class="val">'+dataFmt+'</span><span class="lbl">ORARIO:</span><span class="val">'+(m.time?fmtTime(m.time):"")+'</span><span class="lbl">CAMPO:</span><span class="val">'+luogo+(viaLuogo?(" "+viaLuogo):"")+'</span></div>';
      h+='<table class="docGrid"><tr><th style="width:6%">N°</th><th>COGNOME e NOME</th><th style="width:10%">CAP ---- V.CAP</th><th style="width:14%">MATRICOLA</th><th style="width:14%">DATA DI NASCITA</th><th style="width:16%">TESSERA F.I.G.C. o DOCUMENTO</th></tr>';
      for(var i=0;i<20;i++){
        var pid=DOC_ROWS[i];
        var p=elenco.find(function(x){return x.id===pid;});
        var dup=pid&&cnt[pid]>1;
        h+='<tr'+(dup?' style="background:#fee2e2"':'')+'><td>'+(i+1)+'</td><td><select style="width:100%;font-size:9pt" onchange="setDocRow('+i+',this.value)">'+opts.replace('value="'+pid+'"','value="'+pid+'" selected')+'</select>'+(dup?' <b style="color:#991b1b">⚠ RIPETUTO</b>':'')+'</td><td></td><td>'+(p?(p.figc_id||""):"")+'</td><td>'+(p?birthFmt(p.birth_date):"")+'</td><td>'+(p?(p.card_number||""):"")+'</td></tr>';
      }
      h+='</table>';
      h+='<table class="docGrid">';
      RUOLI_STAFF.forEach(function(rl){
        var sel=DOC_STAFF[rl]||((STAFF.find(function(x){return (x.role||"").toUpperCase()===rl;})||{}).id)||"";
        var dupS=sel&&scnt[sel]>1;
        h+='<tr'+(dupS?' style="background:#fee2e2"':'')+'><td class="rl" style="width:36%;font-size:9pt">'+rl+'</td><td><select style="width:100%;font-size:9pt" onchange="setDocStaff(\''+rl.replace(/'/g,"\\'")+'\',this.value)"><option value="">— scegli —</option>'+STAFF.map(function(s){return '<option value="'+s.id+'"'+(sel===s.id?" selected":"")+'>'+s.full_name+'</option>';}).join("")+'</select></td><td style="width:30%"><table style="width:100%;border:none;font-size:8pt"><tr><td style="border:1px solid #000;background:#eee;font-weight:700">TESS. FIGC</td><td style="border:1px solid #000">'+staffField(sel,"figc_id")+'</td></tr><tr><td style="border:1px solid #000;background:#eee;font-weight:700">DOCUMENTO N.</td><td style="border:1px solid #000">'+staffField(sel,"doc_id")+'</td></tr></table></td></tr>';
      });
      h+='</table>';
      h+='<div class="docBtns noPrint"><button class="btn ok" onclick="saveDist()">💾 Salva distinta</button></div>';
      h+='<div class="docNotes" style="font-size:7.5pt">Il sottoscritto Dirigente accompagnatore ufficiale dichiara che il presente elenco è redatto in ottemperanza a quanto stabilito dagli artt. 61 e 66 delle N.O.I.F.</div>';
      h+='<div class="docSignRow"><div>L\'ARBITRO<br><br><br></div><div>IL DIRIGENTE ACCOMPAGNATORE UFFICIALE<br><br><br></div></div>';
      h+='</div>';
      // FUORI DAL FOGLIO (solo schermo, non stampa)
      h+='<div class="noPrint" style="margin-top:14px;border:2px dashed #f59e0b;border-radius:12px;padding:10px;background:#fffbeb">';
      h+='<b style="color:#92400e">🔎 CONTROLLO (non viene stampato):</b> ';
      h+='<div style="font-size:12px;margin-top:6px">In distinta: <b>'+DOC_ROWS.filter(function(x){return x;}).length+'</b> su 20 posti. ';
      var dupN=Object.keys(cnt).filter(function(k){return cnt[k]>1;}).length;
      if(dupN>0)h+='<span class="vb rosso">⚠ '+dupN+' giocatore/i RIPETUTO/I!</span> ';
      h+='</div>';
      h+='<div style="font-size:12px;margin-top:6px"><b>NON inseriti ('+esclusi.length+'):</b> '+ (esclusi.length? esclusi.map(function(p){return p.last_name+" "+p.first_name;}).join(", ") : "nessuno, tutti considerati ✔") +'</div>';
      h+='</div>';
    }else{
      CONV_STATE={};
      elenco.forEach(function(p){var x=mpM[p.id];CONV_STATE[p.id]={conv:x?x.convocated:true,note:x?(x.conv_note||""):""};});
      h+='<div class="docWrap" style="width:190mm;margin:0 auto;font-size:10pt">';
      h+='<div class="docTopConv" style="background:#c9d6f2"><div class="docLogoConv" style="text-align:center"><img src="img/logo-borgaro.svg" style="height:16mm" alt="Borgaro"><br><img src="img/logo-autoingros.svg" style="height:6mm;margin-top:1mm" alt="Autoingros"></div><div class="docSocConv" style="font-size:18pt">ASD BORGARO AUTOINGROS</div></div>';
      h+='<div class="docYellow" style="font-size:16pt">CONVOCAZIONE</div>';
      h+='<div class="docMetaRow"><span class="lbl">CATEGORIA</span><span class="val" style="font-weight:900;font-size:13pt;text-align:center">Under14</span></div>';
      h+='<div class="docMetaRow"><span class="lbl">PARTITA</span><span class="val" style="font-weight:800;text-align:center">'+gara+'</span></div>';
      h+='<div class="docMetaRow"><span class="lbl">VALEVOLE PER</span><span class="val">'+m.competition+' Regionale U14</span></div>';
      h+='<div class="docMetaRow"><span class="lbl">DATA</span><span class="val">'+dataFmt+'</span><span class="lbl">ORARIO RITROVO</span><span class="val" style="font-weight:800">'+ritrovo+'</span></div>';
      h+='<div class="docMetaRow"><span class="lbl">INDIRIZZO</span><span class="val">'+(m.home?(luogo+(viaLuogo?(" "+viaLuogo):"")):(viaAvv||luogo))+'</span></div>';
      h+='<table class="docGrid"><tr><th style="width:6%">N°</th><th>COGNOME</th><th>NOME</th><th style="width:16%">CONVOCATO SI/NO</th><th style="width:26%">MOTIVAZIONE E/O NOTE</th></tr>';
      elenco.forEach(function(p,i){var s=CONV_STATE[p.id];
        h+='<tr><td>'+(p.jersey_number||"")+'</td><td>'+p.last_name+'</td><td>'+p.first_name+'</td>'+
        '<td><select style="font-size:9pt" onchange="convSet(\''+p.id+'\',\'conv\',this.value)"><option value="1"'+(s.conv?" selected":"")+'>SI</option><option value="0"'+(!s.conv?" selected":"")+'>NO</option></select></td>'+
        '<td><select style="font-size:9pt" onchange="convSet(\''+p.id+'\',\'note\',this.value)">'+MOTIVI_CONV.map(function(o){return '<option'+(s.note===o?" selected":"")+'>'+o+'</option>';}).join("")+'</select></td></tr>';});
      h+='</table>';
      h+='<div class="docNotes" style="font-size:7.5pt">E OBBLIGATORIO PRESENTARSI IN DIVISA DI RAPPRESENTANZA e BORSONE UFFICIALE DELLA SOCIETA<br>SI RACCOMANDA LA PUNTUALITA. IN CASO DI RITARDO E/O PROBLEMI, AVVISARE TEMPESTIVAMENTE IL DIRIGENTE<br>SE RICHIESTO DAL DIRIGENTE, PORTARE CON SE UN DOCUMENTO DI IDENTITA. SEMPRE IN ORIGINALE<br>IL MANCATO RISPETTO DI QUANTO SOPRA INDICATO E DA CONSIDERARSI UN GRAVE INADEMPIMENTO DISCIPLINARE<br>SALVO PER VALIDI e GIUSTIFICATI MOTIVI CHE SARANNO VALUTATI DALLO STAFF TECNICO e SOCIETARIO</div>';
      h+='<div class="docSignRow"><div>IL DIRIGENTE:</div><div>DATA: '+dataFmt+'</div></div>';
      h+='</div>';
    }
    out.innerHTML=h;
  });
}

function renderFoto(){const fg=$("fotoGrid");if(!fg)return;fg.innerHTML=PLAYERS.map(function(p){const iz=((p.first_name||"")[0]||"")+((p.last_name||"")[0]||"");const bg=p.photo_url?("background-image:url('"+p.photo_url+"')"):"";return '<div style="text-align:center"><div style="width:100%;aspect-ratio:1;border-radius:14px;background:#e2e8f0 '+bg+';background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;font-weight:800;color:#94a3b8;overflow:hidden">'+(p.photo_url?"":iz.toUpperCase())+'</div><div style="font-size:10px;font-weight:700;margin-top:4px">'+p.last_name+'</div></div>';}).join("");}

async function loadRegistro(){const rm=await sb.from("matches").select("*").eq("club_id",CLUB_ID);const ms=rm.data||[];const ids=ms.map(function(m){return m.id;});let ev=[],mp=[];
  if(ids.length){ev=(await sb.from("match_events").select("*").in("match_id",ids)).data||[];mp=(await sb.from("match_players").select("*").in("match_id",ids)).data||[];}
  let V=0,P=0,S=0,GF=0,GS=0;ms.forEach(function(m){if(m.score_home==null)return;GF+=m.score_home;GS+=m.score_away;if(m.score_home>m.score_away){V++;}else if(m.score_home===m.score_away){P++;}else{S++;}});
  const kp=$("regKpi");if(kp)kp.innerHTML='<div><b>'+V+'</b><small>VITT</small></div><div><b>'+P+'</b><small>PAREG</small></div><div><b>'+S+'</b><small>SCONF</small></div><div><b>'+GF+'-'+GS+'</b><small>GOL</small></div>';
  const rs=await sb.from("sessions").select("*").eq("club_id",CLUB_ID);const sids=(rs.data||[]).map(function(s){return s.id;});let att=[];if(sids.length)att=(await sb.from("attendances").select("*").in("session_id",sids)).data||[];
  const pa={};att.forEach(function(a){if(a.present){pa[a.player_id]=(pa[a.player_id]||0)+1;}});
  const maxP=Math.max.apply(null,[1].concat(Object.keys(pa).map(function(k){return pa[k];})));
  const gp=$("regGrafPres");if(gp)gp.innerHTML=PLAYERS.map(function(p){const n=pa[p.id]||0;const w=Math.round(n/maxP*100);return '<div class="grow"><div class="gn"><b>'+(p.jersey_number||"-")+'</b> '+p.last_name+' '+p.first_name+'</div><div class="bar"><i style="width:'+w+'%"></i></div><div class="gv">'+n+'</div></div>';}).join("");
  const gol={};ev.forEach(function(e){if(e.type==="goal"){gol[e.player_id]=(gol[e.player_id]||0)+1;}});
  const maxG=Math.max.apply(null,[1].concat(Object.keys(gol).map(function(k){return gol[k];})));
  const gRows=Object.keys(gol).map(function(k){return{id:k,n:gol[k]};}).sort(function(a,b){return b.n-a.n;});
  const gg=$("regGrafGol");if(gg)gg.innerHTML=gRows.length?gRows.map(function(r){const p=ALL_PLAYERS.find(function(x){return x.id===r.id;});const w=Math.round(r.n/maxG*100);return '<div class="grow"><div class="gn"><b>'+(p?(p.jersey_number||"-"):"-")+'</b> '+nome(r.id)+'</div><div class="bar gol"><i style="width:'+w+'%"></i></div><div class="gv">'+r.n+'</div></div>';}).join(""):'<div class="spin">Nessun gol</div>';
  const pp={};mp.forEach(function(x){if(x.convocated){pp[x.player_id]=(pp[x.player_id]||0)+1;}});
  const maxPP=Math.max.apply(null,[1].concat(Object.keys(pp).map(function(k){return pp[k];})));
  const gpp=$("regGrafPart");if(gpp)gpp.innerHTML=PLAYERS.map(function(p){const n=pp[p.id]||0;const w=Math.round(n/maxPP*100);return '<div class="grow"><div class="gn"><b>'+(p.jersey_number||"-")+'</b> '+p.last_name+' '+p.first_name+'</div><div class="bar"><i style="width:'+w+'%"></i></div><div class="gv">'+n+'</div></div>';}).join("");}

const ad=document.getElementById("attDate");if(ad)ad.value=isoOf(new Date());
const pmd=document.getElementById("pmDate");if(pmd)pmd.value=isoOf(new Date());
boot();
if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").catch(function(){});