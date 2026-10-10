import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
const SUPABASE_URL="https://htglhehtfubypwlgpyep.supabase.co";
const SUPABASE_ANON="sb_publishable_9Zhmj-kaHyEmR55rIefPGw_SAqmFGg3";
const sb=createClient(SUPABASE_URL,SUPABASE_ANON);
let PLAYERS=[],CLUB_ID=null,CURRENT_SESSION=null,EDIT_ID=null,ATT_STATE={},SETTINGS={},SESSION_DATES=new Set();
let FOTO_NP=null,FOTO_ED=null,CAL_VIEW={y:new Date().getFullYear(),m:new Date().getMonth()};
let SH_ID=null,PARTITE=[],CUR_PART=null,PART_STATE={},LIVE=null,LIVE_TIMER=null,SETTINGS_ROW=null;
const MESI=["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
const BEH=["Eccellente","Buono","Discreto","Insufficiente"],MOTIVI=["Malato","Infortunato","Viaggio","Scuola","Famiglia","Permesso","Altro"];
const $=id=>document.getElementById(id);
function msg(id,t,ok){const e=$(id);e.className="msg "+(ok?"ok":"err");e.textContent=t;}
function isoOf(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
function normDate(s){s=String(s||"").trim();if(!s)return null;let m=s.match(/^(\d{4})-(\d{2})-(\d{2})/);if(m)return m[1]+"-"+m[2]+"-"+m[3];m=s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);if(m)return m[3]+"-"+("0"+m[2]).slice(-2)+"-"+("0"+m[1]).slice(-2);return null;}
function statoVisita(d){if(!d)return{txt:"senza visita",cls:"giallo"};const o=new Date();o.setHours(0,0,0,0);const g=Math.round((new Date(d+"T00:00:00")-o)/86400000);if(g<0)return{txt:"SCADUTA da "+(-g)+" gg",cls:"rosso"};if(g<=60)return{txt:"scade tra "+g+" gg",cls:"giallo"};return{txt:"valida "+g+" gg",cls:"verde"};}
function compressFoto(f,cb){const r=new FileReader();r.onload=e=>{const i=new Image();i.onload=()=>{const M=400;let w=i.width,h=i.height;if(w>h){if(w>M){h=h*M/w;w=M}}else{if(h>M){w=w*M/h;h=M}}const c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(i,0,0,w,h);cb(c.toDataURL("image/jpeg",.7))};i.src=e.target.result};r.readAsDataURL(f)}
window.previewFoto=(p,id)=>{const f=$(p+"Foto").files[0];if(!f)return;compressFoto(f,d=>{$(id).style.backgroundImage="url("+d+")";$(id).textContent="";if(p==="np")FOTO_NP=d;else FOTO_ED=d})};

window.doLogin=async()=>{const{error}=await sb.auth.signInWithPassword({email:$("logEmail").value.trim(),password:$("logPass").value});if(error){msg("logMsg","Errore: "+error.message,false);return}boot()};
window.doRegister=async()=>{const e=$("regEmail").value.trim(),p=$("regPass").value,c=$("regClub").value.trim(),n=$("regName").value.trim();if(!e||!p||!c||!n){msg("regMsg","Compila tutto",false);return}const{data,error}=await sb.auth.signUp({email:e,password:p});if(error){msg("regMsg","Errore: "+error.message,false);return}if(data.session){const{error:e2}=await sb.rpc("create_club_with_owner",{p_club:c,p_name:n});if(e2){msg("regMsg","Err: "+e2.message,false);return}boot()}else msg("regMsg","Conferma via email poi accedi",true)};
window.doOnboard=async()=>{const{error}=await sb.rpc("create_club_with_owner",{p_club:$("obClub").value.trim(),p_name:$("obName").value.trim()});if(error){msg("obMsg","Err: "+error.message,false);return}boot()};
window.logout=async()=>{await sb.auth.signOut();location.reload()};

async function boot(){
  const{data:{session}}=await sb.auth.getSession();
  if(!session){showView("auth");return}
  const{data:prof}=await sb.from("profiles").select("*").eq("id",session.user.id).maybeSingle();
  if(!prof){showView("onboard");return}
  CLUB_ID=prof.club_id;
  await loadSettingsRow(); await loadSessionDates(); await loadRosa(); await loadPartite();
  showView("app"); goHome();
}
async function loadSettingsRow(){
  const{data}=await sb.from("settings").select("*").eq("club_id",CLUB_ID).maybeSingle();
  SETTINGS_ROW=data; SETTINGS=(data&&data.data)||{luoghi:["Borgaro","Usseglio","Collegno Paradiso"],luogo_default:"Borgaro",live:null};
  if(!SETTINGS.luoghi)SETTINGS.luoghi=["Borgaro"];
  populateLuoghi();
  if(SETTINGS.live)LIVE=SETTINGS.live;
}
async function persistSettings(){await sb.from("settings").upsert({club_id:CLUB_ID,data:SETTINGS});}
function populateLuoghi(){const L=SETTINGS.luoghi||[];
  ["attPlace","ptPlace","setDefault"].forEach(id=>{if($(id)){$(id).innerHTML=L.map(x=>`<option>${x}</option>`).join("");if(SETTINGS.luogo_default)$(id).value=SETTINGS.luogo_default;}});
  if($("luoghiList"))$("luoghiList").innerHTML=L.map(x=>`<span class="vb blu">${x} <b style="cursor:pointer" onclick="removeLuogo('${x.replace(/'/g,"\\'")}')">✕</b></span>`).join(" ");}
window.addLuogo=()=>{const v=$("setLuogo").value.trim();if(!v)return;SETTINGS.luoghi.push(v);$("setLuogo").value="";populateLuoghi()};
window.removeLuogo=x=>{SETTINGS.luoghi=SETTINGS.luoghi.filter(y=>y!==x);populateLuoghi()};
window.saveLuoghi=async()=>{SETTINGS.luogo_default=$("setDefault").value;await persistSettings();populateLuoghi();alert("Luoghi salvati")};

function showView(v){
  $("viewAuth").classList.toggle("hidden",v!=="auth");$("viewOnboard").classList.toggle("hidden",v!=="onboard");
  const app=v==="app";
  $("nav").classList.toggle("hidden",!app);$("btnLogout").classList.toggle("hidden",!app);
  ["viewHome","viewLive","viewCal","viewRosa","viewPres","viewPart","viewForm","viewSub","viewDist","viewConv","viewFoto","viewSet","viewReg"].forEach(x=>$(x).classList.add("hidden"));
  $("saveBar").classList.add("hidden");
}
window.goHome=()=>{showView("app");$("viewHome").classList.remove("hidden");setNav("nbHome");renderLiveBanner();};
window.showTab=t=>{
  showView("app");setNav({cal:"nbCal",pres:"nbPres",part:"nbPart",reg:"nbReg"}[t]||"nbHome");
  const map={cal:"viewCal",live:"viewLive",rosa:"viewRosa",pres:"viewPres",part:"viewPart",form:"viewForm",sub:"viewSub",dist:"viewDist",conv:"viewConv",foto:"viewFoto",set:"viewSet",reg:"viewReg"};
  $(map[t]).classList.remove("hidden");
  if(t==="cal")loadCal();if(t==="pres"){renderCal();}if(t==="part"){$("partDetail").classList.add("hidden");$("partListWrap").classList.remove("hidden");loadPartite();}
  if(t==="live")renderLive();if(t==="form")populateMatchSelect("fmMatch");if(t==="sub")populateMatchSelect("sbMatch",true);
  if(t==="dist")populateMatchSelect("dsMatch",true);if(t==="conv")populateMatchSelect("cvMatch",true);
  if(t==="foto")renderFoto();if(t==="reg")loadRegistro();if(t==="set")populateLuoghi();
};
function setNav(id){["nbHome","nbCal","nbPres","nbPart","nbReg"].forEach(x=>$(x).classList.toggle("on",x===id));}

// ROSA
async function loadRosa(){const{data,error}=await sb.from("players").select("*").eq("active",true).order("jersey_number");if(error)return;PLAYERS=data||[];$("rosaCount").textContent=PLAYERS.length;
  $("rosaList").innerHTML=PLAYERS.length?PLAYERS.map(p=>{const sv=statoVisita(p.medical_expiry);const iz=((p.first_name||"")[0]||"")+((p.last_name||"")[0]||"");const bg=p.photo_url?`background-image:url('${p.photo_url}')`:"";
  return `<div class="pitem" onclick="openEdit('${p.id}')"><div class="pavatar" style="${bg}">${p.photo_url?"":iz.toUpperCase()}</div><div class="pmid"><div class="pname">${p.last_name} ${p.first_name}</div><span class="vb ${sv.cls}">${sv.txt}</span></div><button class="delBtn" onclick="event.stopPropagation();delPlayer('${p.id}')">🗑</button></div>`}).join(""):'<div class="spin">Nessun giocatore</div>';}
function leggiForm(p){return{jersey_number:parseInt($(p+"Num").value)||null,last_name:$(p+"Cogn").value.trim(),first_name:$(p+"Nome").value.trim(),birth_date:normDate($(p+"Birth").value),medical_expiry:normDate($(p+"Med").value),phone:$(p+"Tel").value.trim(),phone_mother:$(p+"TelM").value.trim(),phone_father:$(p+"TelP").value.trim(),figc_id:$(p+"Figc").value.trim(),doc_id:$(p+"Doc").value.trim(),card_number:$(p+"Card").value.trim(),notes:$(p+"Note").value.trim()}}
window.addPlayer=async()=>{const o=leggiForm("np");if(!o.last_name||!o.first_name){msg("npMsg","Servono cognome e nome",false);return}if(FOTO_NP)o.photo_url=FOTO_NP;const{error}=await sb.from("players").insert(Object.assign({club_id:CLUB_ID},o));if(error){msg("npMsg","Err: "+error.message,false);return}["npNum","npCogn","npNome","npBirth","npMed","npTel","npTelM","npTelP","npFigc","npDoc","npCard","npNote","npFoto"].forEach(i=>$(i).value="");$("npFotoPrev").style.backgroundImage="";$("npFotoPrev").textContent="📷";FOTO_NP=null;msg("npMsg","Aggiunto!",true);loadRosa()};
window.openEdit=id=>{const p=PLAYERS.find(x=>x.id===id);if(!p)return;EDIT_ID=id;FOTO_ED=null;["Num","Cogn","Nome","Birth","Med","Tel","TelM","TelP","Figc","Doc","Card","Note"].forEach(k=>{$("ed"+k).value=p[{Num:"jersey_number",Cogn:"last_name",Nome:"first_name",Birth:"birth_date",Med:"medical_expiry",Tel:"phone",TelM:"phone_mother",TelP:"phone_father",Figc:"figc_id",Doc:"doc_id",Card:"card_number",Note:"notes"}[k]]||""});if(p.photo_url){$("edFotoPrev").style.backgroundImage="url("+p.photo_url+")";$("edFotoPrev").textContent=""}else{$("edFotoPrev").style.backgroundImage="";$("edFotoPrev").textContent="📷"}$("editCard").classList.remove("hidden")};
window.closeEdit=()=>{$("editCard").classList.add("hidden");EDIT_ID=null};
window.saveEdit=async()=>{if(!EDIT_ID)return;const o=leggiForm("ed");if(FOTO_ED)o.photo_url=FOTO_ED;const{error}=await sb.from("players").update(o).eq("id",EDIT_ID);if(error){msg("edMsg","Err: "+error.message,false);return}msg("edMsg","Salvato!",true);closeEdit();loadRosa()};
window.delPlayer=async id=>{if(confirm("Togliere giocatore?")){await sb.from("players").update({active:false}).eq("id",id);loadRosa()}};
window.clearRosa=async()=>{if(!confirm("Svuotare tutta la rosa?"))return;await sb.from("players").update({active:false}).eq("club_id",CLUB_ID).eq("active",true);loadRosa()};

// PRESENZE
async function loadSessionDates(){const{data}=await sb.from("sessions").select("date").eq("club_id",CLUB_ID);SESSION_DATES=new Set((data||[]).map(s=>s.date))}
function renderCal(){const y=CAL_VIEW.y,m=CAL_VIEW.m;$("calTitle").textContent=MESI[m]+" "+y;const dow=(new Date(y,m,1).getDay()+6)%7;const days=new Date(y,m+1,0).getDate();let h="";["L","M","M","G","V","S","D"].forEach(d=>h+=`<div class="calDow">${d}</div>`);for(let i=0;i<dow;i++)h+="<div class='calCell empty'></div>";for(let d=1;d<=days;d++){const iso=y+"-"+String(m+1).padStart(2,"0")+"-"+String(d).padStart(2,"0");h+=`<div class="calCell${iso===$("attDate").value?" sel":""}${SESSION_DATES.has(iso)?" dot":""}" onclick="selectDay('${iso}')">${d}</div>`}$("calWrap").innerHTML=h}
window.calPrev=()=>{CAL_VIEW.m--;if(CAL_VIEW.m<0){CAL_VIEW.m=11;CAL_VIEW.y--}renderCal()};
window.calNext=()=>{CAL_VIEW.m++;if(CAL_VIEW.m>11){CAL_VIEW.m=0;CAL_VIEW.y++}renderCal()};
window.quickDay=o=>{const d=new Date();d.setDate(d.getDate()+o);selectDay(isoOf(d))};
window.selectDay=iso=>{$("attDate").value=iso;renderCal();loadAttendance()};
async function loadAttendance(){const d=$("attDate").value;if(!d)return;const meta={kind:$("attKind").value,place:$("attPlace").value,time:$("attTime").value||null,notes:$("attNotes").value};
  let{data:sess}=await sb.from("sessions").select("*").eq("date",d).maybeSingle();
  if(!sess){const{data:ns,error}=await sb.from("sessions").insert(Object.assign({club_id:CLUB_ID,date:d},meta)).select().single();if(error){alert(error.message);return}sess=ns}else await sb.from("sessions").update(meta).eq("id",sess.id);
  CURRENT_SESSION=sess;const{data:att}=await sb.from("attendances").select("*").eq("session_id",sess.id);const map={};(att||[]).forEach(a=>map[a.player_id]=a);
  ATT_STATE={};PLAYERS.forEach(p=>{const a=map[p.id];ATT_STATE[p.id]={present:a?a.present:false,with_team:a?a.with_team:true,behavior:a?a.behavior||"",notes:a?a.notes||"",reason:a?a.reason||""}});
  $("attDateLbl").textContent=d.split("-").reverse().join("/");$("attCard").classList.remove("hidden");$("saveBar").classList.remove("hidden");$("saveBarBtn").onclick=saveAttendance;$("saveBarBtn").textContent="💾 Salva presenze";renderGrid()}
function motivoSel(id,s){const isAlt=s.reason&&MOTIVI.indexOf(s.reason)===-1;const sv=isAlt?"Altro":(s.reason||"");let h=`<select class="motivoSel" onclick="event.stopPropagation()" onchange="setReason('${id}',this.value)"><option value="">Motivo…</option>`;MOTIVI.forEach(m=>h+=`<option ${sv===m?"selected":""}>${m}</option>`);h+="</select>";if(isAlt)h+=`<input class="noteIn" onclick="event.stopPropagation()" placeholder="Specifica" value="${s.reason}" onchange="setReason('${id}',this.value)">`;return h}
function renderGrid(){const n=PLAYERS.filter(p=>ATT_STATE[p.id]&&ATT_STATE[p.id].present).length;$("attCount").textContent="Presenti "+n+"/"+PLAYERS.length;
  $("attGrid").innerHTML=PLAYERS.map(p=>{const s=ATT_STATE[p.id];const iz=((p.first_name||"")[0]||"")+((p.last_name||"")[0]||"");const bg=p.photo_url?`background-image:url('${p.photo_url}')`:"";
  const ex=s.present?`<div class="miniRow"><button class="miniChip ${s.with_team?"on":""}" onclick="event.stopPropagation();setTeamCard('${p.id}',true)">⭐</button><button class="miniChip ap ${!s.with_team?"on":""}" onclick="event.stopPropagation();setTeamCard('${p.id}',false)">🔹</button></div>`:motivoSel(p.id,s);
  return `<div class="pcard ${s.present?"on":"off"}" onclick="tapCard('${p.id}')"><button class="gear" onclick="event.stopPropagation();openSheet('${p.id}')">⚙</button><div class="av" style="${bg}">${p.photo_url?"":iz.toUpperCase()}</div><div class="nm">${p.last_name}<br>${p.first_name}</div><div class="st">${s.present?"PRESENTE":"ASSENTE"}</div>${ex}</div>`}).join("")}
window.tapCard=id=>{ATT_STATE[id].present=!ATT_STATE[id].present;renderGrid()};
window.setAll=v=>{PLAYERS.forEach(p=>ATT_STATE[p.id].present=v);renderGrid()};
window.setTeamCard=(id,v)=>{ATT_STATE[id].with_team=v;renderGrid()};
window.setReason=(id,v)=>{ATT_STATE[id].reason=v;renderGrid()};
window.openSheet=id=>{SH_ID=id;const p=PLAYERS.find(x=>x.id===id);$("shName").textContent=p.last_name+" "+p.first_name;
  $("sheetBody").innerHTML=`<label>Comportamento</label><div class="chipRow" id="shBeh"></div><label>Note</label><textarea id="shNote">${ATT_STATE[id].notes||""}</textarea><button class="btn ok" onclick="saveSheet()">💾 Applica</button>`;
  renderSheetBeh();$("sheet").classList.remove("hidden")};
function renderSheetBeh(){$("shBeh").innerHTML=BEH.map(b=>`<button class="chip ${ATT_STATE[SH_ID].behavior===b?"on":""}" onclick="shSetBeh('${b}')">${b}</button>`).join("")}
window.shSetBeh=b=>{ATT_STATE[SH_ID].behavior=(ATT_STATE[SH_ID].behavior===b?"":b);renderSheetBeh()};
window.closeSheet=()=>{$("sheet").classList.add("hidden");SH_ID=null};
window.saveSheet=()=>{if(SH_ID)ATT_STATE[SH_ID].notes=$("shNote").value;closeSheet();renderGrid()};
window.saveAttendance=async()=>{if(!CURRENT_SESSION)return;await sb.from("sessions").update({kind:$("attKind").value,place:$("attPlace").value,time:$("attTime").value||null,notes:$("attNotes").value}).eq("id",CURRENT_SESSION.id);
  const rows=PLAYERS.map(p=>({session_id:CURRENT_SESSION.id,player_id:p.id,present:ATT_STATE[p.id].present,with_team:ATT_STATE[p.id].with_team,behavior:ATT_STATE[p.id].behavior,notes:ATT_STATE[p.id].notes,reason:ATT_STATE[p.id].reason||null}));
  const{error}=await sb.from("attendances").upsert(rows,{onConflict:"session_id,player_id"});if(error){alert(error.message);return}await loadSessionDates();renderCal();alert("Presenze salvate!")};
window.showPresReport=async()=>{$("presRepCard").classList.remove("hidden");await loadReport()};
window.hidePresReport=()=>{$("presRepCard").classList.add("hidden")};
async function loadReport(){const{data:sess}=await sb.from("sessions").select("*").eq("club_id",CLUB_ID).order("date");if(!sess||!sess.length){$("repClass").innerHTML='<div class="spin">Nessuna seduta</div>';$("repMatrix").innerHTML="";return}
  const ids=sess.map(s=>s.id);const{data:att}=await sb.from("attendances").select("*").in("session_id",ids);const map={};(att||[]).forEach(a=>{(map[a.session_id]=map[a.session_id]||{})[a.player_id]=a});
  const lbl=s=>{const p=s.date.split("-");return p[2]+"/"+p[1]};
  const rows=PLAYERS.map(p=>{let pr=0,as=0;sess.forEach(s=>{const a=(map[s.id]||{})[p.id];if(a){a.present?pr++:as++}});const t=pr+as;const pc=t?Math.round(pr/t*100):0;let st,cl;if(pc===100){st="SEMPRE PRESENTE";cl="verde"}else if(pc>=85){st="ASSIDUO";cl="verde"}else if(pc>=50){st="A METÀ";cl="giallo"}else{st="ASSENTE";cl="rosso"}return{p,pr,as,pc,st,cl}}).sort((a,b)=>b.pc-a.pc);
  $("repClass").innerHTML="<table class='rep'><tr><th>#</th><th>Giocatore</th><th>P</th><th>A</th><th>%</th><th>Stato</th></tr>"+rows.map((r,i)=>`<tr><td>${i+1}</td><td class='nome'>${r.p.last_name} ${r.p.first_name}</td><td class='ok'>${r.pr}</td><td class='ko'>${r.as}</td><td>${r.pc}%</td><td><span class='vb ${r.cl}'>${r.st}</span></td></tr>`).join("")+"</table>";
  $("repMatrix").innerHTML="<table class='rep'><tr><th class='nome'>Gioc.</th>"+sess.map(s=>`<th>${lbl(s)}</th>`).join("")+"</tr>"+PLAYERS.map(p=>`<tr><td class='nome'>${p.last_name}</td>`+sess.map(s=>{const a=(map[s.id]||{})[p.id];if(!a)return"<td class='na'>–</td>";return a.present?"<td class='ok'>✔</td>":"<td class='ko'>✖</td>"}).join("")+"</tr>").join("")+"</table>"}

// CALENDARIO
async function loadCal(){const{data:s}=await sb.from("sessions").select("*").eq("club_id",CLUB_ID);const{data:m}=await sb.from("matches").select("*").eq("club_id",CLUB_ID);
  const items=[...(s||[]).map(x=>({d:x.date,t:x.time||"",tipo:"Allenamento",txt:x.kind+" "+(x.place||""),cls:"blu"})),...(m||[]).map(x=>({d:x.date,t:x.time||"",tipo:"Partita",txt:"vs "+x.opponent,cls:"verde"}))].sort((a,b)=>a.d<b.d?1:-1);
  $("calList").innerHTML=items.length?items.map(i=>{const p=i.d.split("-");return `<div class="calItem"><div class="d">${p[2]}/${p[1]}<small>${p[0]}</small></div><div><span class="vb ${i.cls}">${i.tipo}</span> <b>${i.txt}</b> ${i.t||""}</div></div>`}).join(""):'<div class="spin">Nessun evento</div>'}

// PARTITE
async function loadPartite(){const{data}=await sb.from("matches").select("*").eq("club_id",CLUB_ID).order("date",{ascending:false});PARTITE=data||[];
  $("partList").innerHTML=PARTITE.length?PARTITE.map(m=>{const sc=(m.score_home!=null&&m.score_away!=null)?(m.score_home+"-"+m.score_away):"–";return `<div class="partCard" onclick="openPart('${m.id}')"><div class="pcTop"><span>${m.date.split("-").reverse().join("/")} ${m.time||""}</span><span>${m.competition}</span></div><div class="pcTeams"><span>${m.home?"NOI":"AVV"} vs ${m.opponent}</span><span class="pcScore">${sc}</span></div><div><span class="vb ${m.home?"verde":"giallo"}">${m.home?"CASA":"TRASF"}</span><span class="vb blu">${m.status||""}</span></div></div>`}).join(""):'<div class="spin">Nessuna partita</div>'}
window.newPart=async()=>{const o=$("ptOpp").value.trim();if(!o){alert("Avversario?");return}const{data,error}=await sb.from("matches").insert({club_id:CLUB_ID,date:$("ptDate").value,time:$("ptTime").value||null,opponent:o,home:$("ptHome").value==="true",competition:$("ptComp").value,place:$("ptPlace").value,category:"Under 14"}).select().single();if(error){alert(error.message);return}$("ptOpp").value="";loadPartite();openPart(data.id)};
function populateMatchSelect(id,onlyPlayed){const list=onlyPlayed?PARTITE:PARTITE;$(id).innerHTML=list.map(m=>`<option value="${m.id}">${m.date.split("-").reverse().join("/")} vs ${m.opponent}</option>`).join("")}
async function openPart(id){const m=PARTITE.find(x=>x.id===id);CUR_PART=m;const{data:mp}=await sb.from("match_players").select("*").eq("match_id",id);const{data:ev}=await sb.from("match_events").select("*").eq("match_id",id);
  const mpM={};(mp||[]).forEach(x=>mpM[x.player_id]=x);const gol={};(ev||[]).forEach(e=>{if(e.type==="goal")gol[e.player_id]=(gol[e.player_id]||0)+1});
  PART_STATE={};PLAYERS.forEach(p=>{const x=mpM[p.id];PART_STATE[p.id]={starter:x?x.starter:false,convocated:x?x.convocated:true,gol:gol[p.id]||0}});
  $("partListWrap").classList.add("hidden");$("partDetail").classList.remove("hidden");
  $("pdTitle").textContent=(m.home?"Casa":"Trasf")+" vs "+m.opponent;$("pdGolHome").value=m.score_home!=null?m.score_home:"";$("pdGolAway").value=m.score_away!=null?m.score_away:"";
  $("pdTags").innerHTML=`<span class="vb ${m.home?"verde":"giallo"}">${m.home?"CASA":"TRASF"}</span><span class="vb blu">${m.competition}</span>`;renderRoster();
  $("saveBar").classList.remove("hidden");$("saveBarBtn").onclick=savePart;$("saveBarBtn").textContent="💾 Salva partita"}
function renderRoster(){$("pdRoster").innerHTML=PLAYERS.map(p=>{const s=PART_STATE[p.id];return `<div class="formRow"><div class="fn">${p.jersey_number?("#"+p.jersey_number+" "):""}${p.last_name} ${p.first_name}</div><div class="st3"><button class="${s.starter?"on":""}" onclick="setStato('${p.id}','T')">Tit</button><button class="${!s.starter&&s.convocated?"on":""}" onclick="setStato('${p.id}','P')">Pan</button><button class="${!s.convocated?"on":""}" onclick="setStato('${p.id}','F')">Fuori</button></div><div class="stepper"><button onclick="addGol('${p.id}',-1)">−</button><span>⚽${s.gol}</span><button onclick="addGol('${p.id}',1)">+</button></div></div>`}).join("")}
window.setStato=(id,v)=>{const s=PART_STATE[id];if(v==="T"){s.starter=true;s.convocated=true}if(v==="P"){s.starter=false;s.convocated=true}if(v==="F"){s.starter=false;s.convocated=false}renderRoster()};
window.addGol=(id,d)=>{PART_STATE[id].gol=Math.max(0,PART_STATE[id].gol+d);renderRoster()};
window.closePart=()=>{$("partDetail").classList.add("hidden");$("partListWrap").classList.remove("hidden");$("saveBar").classList.add("hidden");loadPartite()};
window.savePart=async()=>{if(!CUR_PART)return;await sb.from("matches").update({score_home:parseInt($("pdGolHome").value)||0,score_away:parseInt($("pdGolAway").value)||0}).eq("id",CUR_PART.id);
  await sb.from("match_players").upsert(PLAYERS.map(p=>({match_id:CUR_PART.id,player_id:p.id,starter:PART_STATE[p.id].starter,convocated:PART_STATE[p.id].convocated})),{onConflict:"match_id,player_id"});
  for(const p of PLAYERS){await sb.from("match_events").delete().eq("match_id",CUR_PART.id).eq("player_id",p.id).eq("type","goal");const g=PART_STATE[p.id].gol;if(g>0){const e=[];for(let i=0;i<g;i++)e.push({match_id:CUR_PART.id,player_id:p.id,type:"goal",half:1});await sb.from("match_events").insert(e)}}
  alert("Partita salvata!");closePart()};

// FORMAZIONE
window.openForm=async()=>{const id=$("fmMatch").value;if(!id)return;CUR_PART=PARTITE.find(x=>x.id===id);const{data:mp}=await sb.from("match_players").select("*").eq("match_id",id);const mpM={};(mp||[]).forEach(x=>mpM[x.player_id]=x);
  PART_STATE={};PLAYERS.forEach(p=>{const x=mpM[p.id];PART_STATE[p.id]={starter:x?x.starter:false,convocated:x?x.convocated:true,gol:0}});
  $("fmRoster").innerHTML=PLAYERS.map(p=>{const s=PART_STATE[p.id];return `<div class="formRow"><div class="fn">${p.last_name} ${p.first_name}</div><div class="st3"><button class="${s.starter?"on":""}" onclick="setStato('${p.id}','T');openFormRefresh()">Tit</button><button class="${!s.starter&&s.convocated?"on":""}" onclick="setStato('${p.id}','P');openFormRefresh()">Pan</button><button class="${!s.convocated?"on":""}" onclick="setStato('${p.id}','F');openFormRefresh()">Fuori</button></div></div>`}).join("")};
window.openFormRefresh=()=>{const id=$("fmMatch").value;CUR_PART=PARTITE.find(x=>x.id===id);$("fmRoster").innerHTML=PLAYERS.map(p=>{const s=PART_STATE[p.id];return `<div class="formRow"><div class="fn">${p.last_name} ${p.first_name}</div><div class="st3"><button class="${s.starter?"on":""}" onclick="setStato('${p.id}','T');openFormRefresh()">Tit</button><button class="${!s.starter&&s.convocated?"on":""}" onclick="setStato('${p.id}','P');openFormRefresh()">Pan</button><button class="${!s.convocated?"on":""}" onclick="setStato('${p.id}','F');openFormRefresh()">Fuori</button></div></div>`}).join("")};
window.saveForm=async()=>{if(!CUR_PART)return;await sb.from("match_players").upsert(PLAYERS.map(p=>({match_id:CUR_PART.id,player_id:p.id,starter:PART_STATE[p.id].starter,convocated:PART_STATE[p.id].convocated})),{onConflict:"match_id,player_id"});alert("Formazione salvata!")};

// SOSTITUZIONI
window.loadSubs=async()=>{const id=$("sbMatch").value;populatePlayersSelect("sbOut");populatePlayersSelect("sbIn");const{data}=await sb.from("match_events").select("*").eq("match_id",id).eq("type","sub_in").order("minute");
  $("sbList").innerHTML=(data||[]).map(e=>`<div class="evItem"><span>🔄 ${nome(e.player_id)} entra</span><span>${e.minute}' ${e.half}°T</span></div>`).join("")||"<div class='spin'>Nessuna sostituzione</div>"};
function populatePlayersSelect(id){$(id).innerHTML=PLAYERS.map(p=>`<option value="${p.id}">${p.last_name} ${p.first_name}</option>`).join("")}
window.addSub=async()=>{const id=$("sbMatch").value;if(!id)return;const min=parseInt($("sbMin").value)||0;const half=parseInt($("sbHalf").value);
  await sb.from("match_events").insert([{match_id:id,player_id:$("sbOut").value,type:"sub_out",minute:min,half},{match_id:id,player_id:$("sbIn").value,type:"sub_in",minute:min,half}]);loadSubs()};

// DISTINTA / CONVOCAZIONI
window.renderDist=()=>{const id=$("dsMatch").value;const m=PARTITE.find(x=>x.id===id);if(!m)return;
  sb.from("match_players").select("*").eq("match_id",id).eq("convocated",true).then(()=>{});
  buildDoc("dsOut",m,true)};
window.renderConv=()=>{const id=$("cvMatch").value;const m=PARTITE.find(x=>x.id===id);if(!m)return;buildDoc("cvOut",m,false)};
function buildDoc(el,m,isDistinta){sb.from("match_players").select("*").eq("match_id",m.id).then(({data})=>{
  const conv=(data||[]).filter(x=>x.convocated);
  const rows=PLAYERS.filter(p=>conv.find(c=>c.player_id===p.id)).sort((a,b)=>(a.jersey_number||99)-(b.jersey_number||99));
  $(el).innerHTML=`<h2>${isDistinta?"DISTINTA":"CONVOCAZIONI"} — ${m.opponent}</h2><p style="font-size:13px;color:#475569">${m.date.split("-").reverse().join("/")} ${m.time||""} — ${m.place||""} (${m.home?"Casa":"Trasferta"})</p>
  <table class="rep" style="margin-top:10px"><tr><th>N°</th><th>Giocatore</th><th>Doc</th></tr>${rows.map(p=>`<tr><td>${p.jersey_number||""}</td><td class="nome">${p.last_name} ${p.first_name}</td><td>${p.doc_id||""}</td></tr>`).join("")}</table>`;})}

// FOTO
function renderFoto(){$("fotoGrid").innerHTML=PLAYERS.map(p=>{const iz=((p.first_name||"")[0]||"")+((p.last_name||"")[0]||"");const bg=p.photo_url?`background-image:url('${p.photo_url}')`:"";return `<div class="fotoCell"><div class="f" style="${bg}">${p.photo_url?"":iz.toUpperCase()}</div><div class="n">${p.last_name}</div></div>`}).join("")}

// LIVE
function renderLiveBanner(){const b=$("liveBanner");if(LIVE&&LIVE.matchId){const m=PARTITE.find(x=>x.id===LIVE.matchId);if(m){b.classList.remove("hidden");$("lbText").textContent="Partita in corso: "+m.opponent+" "+(liveScore());return}}b.classList.add("hidden")}
function liveScore(){if(!LIVE)return"";return (LIVE.home||0)+"-"+(LIVE.away||0)}
function renderLive(){populateMatchSelect("lvMatch");
  if(LIVE&&LIVE.matchId){$("liveStart").classList.add("hidden");$("liveBox").classList.remove("hidden");const m=PARTITE.find(x=>x.id===LIVE.matchId);$("lvTitle").textContent="vs "+(m?m.opponent:"");populatePlayersSelect("lvPlayer");updateClock();renderLiveEvents();$("lvPlay").textContent=LIVE.running?"⏸ Pausa":"▶ Avvia";}
  else{$("liveStart").classList.remove("hidden");$("liveBox").classList.add("hidden")}}
window.startLive=async()=>{const id=$("lvMatch").value;if(!id)return;LIVE={matchId:id,clock:0,half:1,running:false,home:0,away:0};SETTINGS.live=LIVE;await persistSettings();await sb.from("matches").update({status:"live"}).eq("id",id);renderLive();renderLiveBanner()};
window.resumeLive=()=>{showTab("live")};
window.toggleLive=async()=>{if(!LIVE)return;LIVE.running=!LIVE.running;SETTINGS.live=LIVE;await persistSettings();
  if(LIVE.running){LIVE_TIMER=setInterval(()=>{LIVE.clock++;updateClock();if(LIVE.clock%5===0){SETTINGS.live=LIVE;persistSettings();}},1000)}else{clearInterval(LIVE_TIMER)}
  $("lvPlay").textContent=LIVE.running?"⏸ Pausa":"▶ Avvia"};
window.nextHalf=async()=>{if(!LIVE)return;LIVE.half=2;SETTINGS.live=LIVE;await persistSettings();$("lvHalf").textContent="2° Tempo"};
function updateClock(){if(!LIVE)return;const m=Math.floor(LIVE.clock/60),s=LIVE.clock%60;$("lvClock").textContent=String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");$("lvHalf").textContent=(LIVE.half===1?"1°":"2°")+" Tempo"}
window.liveEvent=async t=>{if(!LIVE)return;const pid=$("lvPlayer").value;const min=Math.floor(LIVE.clock/60);
  await sb.from("match_events").insert({match_id:LIVE.matchId,player_id:pid,type:t,minute:min,half:LIVE.half});
  if(t==="goal"){LIVE.home=(LIVE.home||0)+1}if(t==="goal_against"){LIVE.away=(LIVE.away||0)+1}
  SETTINGS.live=LIVE;await persistSettings();renderLiveEvents();renderLiveBanner()};
async function renderLiveEvents(){if(!LIVE)return;const{data}=await sb.from("match_events").select("*").eq("match_id",LIVE.matchId).order("created_at",{ascending:false});
  const ic={goal:"⚽",assist:"🎯",save:"🧤",yellow:"🟨",red:"🟥",shot:"💥",goal_against:"🥅",sub_in:"🔄 entra",sub_out:"🔄 esce"};
  $("lvEvents").innerHTML=(data||[]).map(e=>`<div class="evItem"><span>${ic[e.type]||""} ${nome(e.player_id)}</span><span>${e.minute||0}' ${e.half||1}°T</span></div>`).join("")||"<div class='spin'>Nessun evento</div>"}
window.openSubSheet=()=>{if(!LIVE)return;$("shName").textContent="Sostituzione";
  $("sheetBody").innerHTML=`<label>Esce</label><select id="shOut">${PLAYERS.map(p=>`<option value="${p.id}">${p.last_name} ${p.first_name}</option>`).join("")}</select><label>Entra</label><select id="shIn">${PLAYERS.map(p=>`<option value="${p.id}">${p.last_name} ${p.first_name}</option>`).join("")}</select><button class="btn ok" onclick="doLiveSub()">🔄 Conferma</button>`;
  $("sheet").classList.remove("hidden")};
window.doLiveSub=async()=>{const min=Math.floor(LIVE.clock/60);await sb.from("match_events").insert([{match_id:LIVE.matchId,player_id:$("shOut").value,type:"sub_out",minute:min,half:LIVE.half},{match_id:LIVE.matchId,player_id:$("shIn").value,type:"sub_in",minute:min,half:LIVE.half}]);closeSheet();renderLiveEvents()};
window.stopLive=async()=>{if(!LIVE)return;if(!confirm("Terminare la partita live?"))return;clearInterval(LIVE_TIMER);
  await sb.from("matches").update({status:"completed",score_home:LIVE.home,score_away:LIVE.away}).eq("id",LIVE.matchId);
  LIVE=null;SETTINGS.live=null;await persistSettings();renderLive();renderLiveBanner();loadPartite()};

// REGISTRO
function nome(id){const p=PLAYERS.find(x=>x.id===id);return p?(p.last_name+" "+p.first_name):"?"}
async function loadRegistro(){const{data:ms}=await sb.from("matches").select("*").eq("club_id",CLUB_ID);const ids=(ms||[]).map(m=>m.id);let ev=[],mp=[];
  if(ids.length){ev=(await sb.from("match_events").select("*").in("match_id",ids)).data||[];mp=(await sb.from("match_players").select("*").in("match_id",ids)).data||[]}
  let V=0,P=0,S=0,GF=0,GS=0;(ms||[]).forEach(m=>{if(m.score_home==null)return;GF+=m.score_home;GS+=m.score_away;if(m.score_home>m.score_away)V++;else if(m.score_home===m.score_away)P++;else S++});
  $("regKpi").innerHTML=`<div><b>${V}</b><small>VITT</small></div><div><b>${P}</b><small>PAREG</small></div><div><b>${S}</b><small>SCONF</small></div><div><b>${GF}-${GS}</b><small>GOL</small></div>`;
  const gol={};ev.forEach(e=>{if(e.type==="goal")gol[e.player_id]=(gol[e.player_id]||0)+1});
  $("regGol").innerHTML=Object.keys(gol).length?"<table class='rep'><tr><th>#</th><th>Giocatore</th><th>Gol</th></tr>"+Object.keys(gol).map(id=>({id,n:gol[id]})).sort((a,b)=>b.n-a.n).map((r,i)=>`<tr><td>${i+1}</td><td class='nome'>${nome(r.id)}</td><td class='ok'>${r.n}</td></tr>`).join("")+"</table>":'<div class="spin">Nessun gol</div>';
  const pres={};mp.forEach(x=>{if(x.convocated)pres[x.player_id]=(pres[x.player_id]||0)+1});
  $("regPresPart").innerHTML="<table class='rep'><tr><th>Giocatore</th><th>Pres</th></tr>"+PLAYERS.map(p=>({p,n:pres[p.id]||0})).sort((a,b)=>b.n-a.n).map(r=>`<tr><td class='nome'>${r.p.last_name} ${r.p.first_name}</td><td class='ok'>${r.n}</td></tr>`).join("")+"</table>";
  const{data:sess}=await sb.from("sessions").select("*").eq("club_id",CLUB_ID);const sids=(sess||[]).map(s=>s.id);let att=[];if(sids.length)att=(await sb.from("attendances").select("*").in("session_id",sids)).data||[];
  const pa={};att.forEach(a=>{if(a.present)pa[a.player_id]=(pa[a.player_id]||0)+1});
  $("regPresAll").innerHTML="<table class='rep'><tr><th>Giocatore</th><th>Pres</th></tr>"+PLAYERS.map(p=>({p,n:pa[p.id]||0})).sort((a,b)=>b.n-a.n).map(r=>`<tr><td class='nome'>${r.p.last_name} ${r.p.first_name}</td><td class='ok'>${r.n}</td></tr>`).join("")+"</table>"}

$("attDate").value=isoOf(new Date());$("ptDate").value=isoOf(new Date());
boot();
if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{});