import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://htglhehtfubypwlgpyep.supabase.co";
const SUPABASE_ANON = "sb_publishable_9Zhmj-kaHyEmR55rIefPGw_SAqmFGg3";

const sb = createClient(SUPABASE_URL, SUPABASE_ANON);
let PLAYERS=[], CLUB_ID=null, CURRENT_SESSION=null, EDIT_ID=null, ATT_STATE={};
let FOTO_NP=null, FOTO_ED=null, SESSION_DATES=new Set(), SETTINGS={};
let CAL_VIEW={y:new Date().getFullYear(), m:new Date().getMonth()};
let SH_ID=null, SH_TMP=null;
const MESI=["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
const BEH=["Eccellente","Buono","Discreto","Insufficiente"];

const $=id=>document.getElementById(id);
function msg(id,txt,ok){const el=$(id);el.className="msg "+(ok?"ok":"err");el.textContent=txt;}
function isoOf(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
function normDate(s){s=String(s||"").trim();if(!s)return null;let m=s.match(/^(\d{4})-(\d{2})-(\d{2})/);if(m)return m[1]+"-"+m[2]+"-"+m[3];m=s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);if(m)return m[3]+"-"+("0"+m[2]).slice(-2)+"-"+("0"+m[1]).slice(-2);return null;}
function statoVisita(d){if(!d)return{txt:"senza visita",cls:"giallo"};const o=new Date();o.setHours(0,0,0,0);const gg=Math.round((new Date(d+"T00:00:00")-o)/86400000);if(gg<0)return{txt:"SCADUTA da "+(-gg)+" gg",cls:"rosso"};if(gg<=60)return{txt:"scade tra "+gg+" gg",cls:"giallo"};return{txt:"valida ancora "+gg+" gg",cls:"verde"};}
function compressFoto(f,cb){const r=new FileReader();r.onload=e=>{const img=new Image();img.onload=()=>{const M=400;let w=img.width,h=img.height;if(w>h){if(w>M){h=h*M/w;w=M;}}else{if(h>M){w=w*M/h;h=M;}}const c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);cb(c.toDataURL("image/jpeg",0.7));};img.src=e.target.result;};r.readAsDataURL(f);}
window.previewFoto=(p,id)=>{const f=$(p+"Foto").files[0];if(!f)return;compressFoto(f,d=>{$(id).style.backgroundImage="url("+d+")";$(id).textContent="";if(p==="np")FOTO_NP=d;else FOTO_ED=d;});};

window.doLogin=async()=>{const{error}=await sb.auth.signInWithPassword({email:$("logEmail").value.trim(),password:$("logPass").value});if(error){msg("logMsg","Errore: "+error.message,false);return;}boot();};
window.doRegister=async()=>{const e=$("regEmail").value.trim(),p=$("regPass").value,c=$("regClub").value.trim(),n=$("regName").value.trim();if(!e||!p||!c||!n){msg("regMsg","Compila tutti i campi",false);return;}const{data,error}=await sb.auth.signUp({email:e,password:p});if(error){msg("regMsg","Errore: "+error.message,false);return;}if(data.session){const{error:e2}=await sb.rpc("create_club_with_owner",{p_club:c,p_name:n});if(e2){msg("regMsg","Errore: "+e2.message,false);return;}boot();}else msg("regMsg","Account creato: conferma via email poi accedi.",true);};
window.doOnboard=async()=>{const{error}=await sb.rpc("create_club_with_owner",{p_club:$("obClub").value.trim(),p_name:$("obName").value.trim()});if(error){msg("obMsg","Errore: "+error.message,false);return;}boot();};
window.logout=async()=>{await sb.auth.signOut();location.reload();};

async function boot(){
  const{data:{session}}=await sb.auth.getSession();
  if(!session){show("auth");return;}
  const{data:prof}=await sb.from("profiles").select("*").eq("id",session.user.id).maybeSingle();
  if(!prof){show("onboard");return;}
  CLUB_ID=prof.club_id;
  await loadSettings(); await loadSessionDates();
  show("app"); loadRosa();
}
function show(v){
  $("viewAuth").classList.toggle("hidden",v!=="auth");$("viewOnboard").classList.toggle("hidden",v!=="onboard");
  $("viewRosa").classList.toggle("hidden",v!=="app");$("viewPres").classList.toggle("hidden",true);
  $("nav").classList.toggle("hidden",v!=="app");$("btnLogout").classList.toggle("hidden",v!=="app");
  $("saveBar").classList.add("hidden");
  if(v==="app")showTab("rosa");
}
window.showTab=t=>{
  $("tabRosa").classList.toggle("on",t==="rosa");$("tabPres").classList.toggle("on",t==="pres");
  $("viewRosa").classList.toggle("hidden",t!=="rosa");$("viewPres").classList.toggle("hidden",t!=="pres");
  if(t==="pres")showPres("compila"); else $("saveBar").classList.add("hidden");
};
window.showPres=t=>{
  $("subCompila").classList.toggle("on",t==="compila");$("subReport").classList.toggle("on",t==="report");
  $("presCompila").classList.toggle("hidden",t!=="compila");$("presReport").classList.toggle("hidden",t!=="report");
  if(t==="compila"){renderCal(); $("saveBar").classList.toggle("hidden",!CURRENT_SESSION);} else {$("saveBar").classList.add("hidden"); loadReport();}
};

// ---------- SETTINGS / LUOGHI ----------
async function loadSettings(){
  const{data}=await sb.from("settings").select("*").eq("club_id",CLUB_ID).maybeSingle();
  SETTINGS=(data&&data.data)||{luoghi:["Borgaro","Usseglio","Collegno Paradiso"],luogo_default:"Borgaro"};
  populateLuoghi();
}
function populateLuoghi(){
  const L=SETTINGS.luoghi||[];
  $("attPlace").innerHTML=L.map(x=>`<option>${x}</option>`).join("");
  if(SETTINGS.luogo_default)$("attPlace").value=SETTINGS.luogo_default;
  $("setDefault").innerHTML=L.map(x=>`<option>${x}</option>`).join("");
  if(SETTINGS.luogo_default)$("setDefault").value=SETTINGS.luogo_default;
  $("luoghiList").innerHTML=L.map(x=>`<span class="luogoChip">${x}<button onclick="removeLuogo('${x.replace(/'/g,"\\'")}')">✕</button></span>`).join("")||"<small>Nessun luogo</small>";
}
window.addLuogo=()=>{const v=$("setLuogo").value.trim();if(!v)return;SETTINGS.luoghi=SETTINGS.luoghi||[];if(!SETTINGS.luoghi.includes(v))SETTINGS.luoghi.push(v);$("setLuogo").value="";populateLuoghi();};
window.removeLuogo=x=>{SETTINGS.luoghi=(SETTINGS.luoghi||[]).filter(y=>y!==x);populateLuoghi();};
window.saveLuoghi=async()=>{SETTINGS.luogo_default=$("setDefault").value;await sb.from("settings").upsert({club_id:CLUB_ID,data:SETTINGS});populateLuoghi();};

// ---------- CALENDARIO ----------
async function loadSessionDates(){const{data}=await sb.from("sessions").select("date").eq("club_id",CLUB_ID);SESSION_DATES=new Set((data||[]).map(s=>s.date));}
function renderCal(){
  const y=CAL_VIEW.y,m=CAL_VIEW.m;
  $("calTitle").textContent=MESI[m]+" "+y;
  const dow=(new Date(y,m,1).getDay()+6)%7;
  const days=new Date(y,m+1,0).getDate();
  let h="";
  ["L","M","M","G","V","S","D"].forEach(d=>h+=`<div class="calDow">${d}</div>`);
  for(let i=0;i<dow;i++)h+="<div class='calCell empty'></div>";
  for(let d=1;d<=days;d++){
    const iso=y+"-"+String(m+1).padStart(2,"0")+"-"+String(d).padStart(2,"0");
    const sel=iso===$("attDate").value?" sel":"";
    const dot=SESSION_DATES.has(iso)?" dot":"";
    h+=`<div class="calCell${sel}${dot}" onclick="selectDay('${iso}')">${d}</div>`;
  }
  $("calWrap").innerHTML=h;
}
window.calPrev=()=>{CAL_VIEW.m--;if(CAL_VIEW.m<0){CAL_VIEW.m=11;CAL_VIEW.y--;}renderCal();};
window.calNext=()=>{CAL_VIEW.m++;if(CAL_VIEW.m>11){CAL_VIEW.m=0;CAL_VIEW.y++;}renderCal();};
window.quickDay=off=>{const d=new Date();d.setDate(d.getDate()+off);selectDay(isoOf(d));};
window.selectDay=iso=>{$("attDate").value=iso;renderCal();loadAttendance();};

// ---------- ROSA ----------
async function loadRosa(){
  const{data,error}=await sb.from("players").select("*").eq("active",true).order("jersey_number");
  if(error){$("rosaList").innerHTML='<div class="msg err">'+error.message+'</div>';return;}
  PLAYERS=data||[];$("rosaCount").textContent=PLAYERS.length;
  if(!PLAYERS.length){$("rosaList").innerHTML='<div class="spin">Nessun giocatore.</div>';return;}
  $("rosaList").innerHTML=PLAYERS.map(p=>{const sv=statoVisita(p.medical_expiry);const iz=((p.first_name||"")[0]||"")+((p.last_name||"")[0]||"");const bg=p.photo_url?"background-image:url('"+p.photo_url+"')":"";
    return `<div class="pitem" onclick="openEdit('${p.id}')"><div class="pavatar" style="${bg}">${p.photo_url?"":iz.toUpperCase()}</div><div class="pmid"><div class="pname">${p.last_name} ${p.first_name}</div><span class="vb ${sv.cls}">${sv.txt}</span></div><button class="delBtn" onclick="event.stopPropagation();delPlayer('${p.id}')">🗑</button></div>`;}).join("");
}
function leggiForm(p){return{jersey_number:parseInt($(p+"Num").value)||null,last_name:$(p+"Cogn").value.trim(),first_name:$(p+"Nome").value.trim(),birth_date:normDate($(p+"Birth").value),medical_expiry:normDate($(p+"Med").value),phone:$(p+"Tel").value.trim(),phone_mother:$(p+"TelM").value.trim(),phone_father:$(p+"TelP").value.trim(),figc_id:$(p+"Figc").value.trim(),doc_id:$(p+"Doc").value.trim(),card_number:$(p+"Card").value.trim(),notes:$(p+"Note").value.trim()};}
window.addPlayer=async()=>{const o=leggiForm("np");if(!o.last_name||!o.first_name){msg("npMsg","Servono cognome e nome",false);return;}if(FOTO_NP)o.photo_url=FOTO_NP;const{error}=await sb.from("players").insert(Object.assign({club_id:CLUB_ID},o));if(error){msg("npMsg","Errore: "+error.message,false);return;}["npNum","npCogn","npNome","npBirth","npMed","npTel","npTelM","npTelP","npFigc","npDoc","npCard","npNote","npFoto"].forEach(i=>$(i).value="");$("npFotoPrev").style.backgroundImage="";$("npFotoPrev").textContent="📷";FOTO_NP=null;msg("npMsg","Aggiunto!",true);loadRosa();};
window.openEdit=id=>{const p=PLAYERS.find(x=>x.id===id);if(!p)return;EDIT_ID=id;FOTO_ED=null;$("edNum").value=p.jersey_number||"";$("edCogn").value=p.last_name||"";$("edNome").value=p.first_name||"";$("edBirth").value=p.birth_date||"";$("edMed").value=p.medical_expiry||"";$("edTel").value=p.phone||"";$("edTelM").value=p.phone_mother||"";$("edTelP").value=p.phone_father||"";$("edFigc").value=p.figc_id||"";$("edDoc").value=p.doc_id||"";$("edCard").value=p.card_number||"";$("edNote").value=p.notes||"";if(p.photo_url){$("edFotoPrev").style.backgroundImage="url("+p.photo_url+")";$("edFotoPrev").textContent="";}else{$("edFotoPrev").style.backgroundImage="";$("edFotoPrev").textContent="📷";}$("editCard").classList.remove("hidden");$("editCard").scrollIntoView({behavior:"smooth"});};
window.closeEdit=()=>{$("editCard").classList.add("hidden");EDIT_ID=null;FOTO_ED=null;};
window.saveEdit=async()=>{if(!EDIT_ID)return;const o=leggiForm("ed");if(FOTO_ED)o.photo_url=FOTO_ED;const{error}=await sb.from("players").update(o).eq("id",EDIT_ID);if(error){msg("edMsg","Errore: "+error.message,false);return;}msg("edMsg","Salvato!",true);closeEdit();loadRosa();};
window.delPlayer=async id=>{if(confirm("Togliere questo giocatore?")){await sb.from("players").update({active:false}).eq("id",id);loadRosa();}};
window.clearRosa=async()=>{if(!confirm("SVUOTARE TUTTA LA ROSA? Le presenze NON si toccano."))return;const{error}=await sb.from("players").update({active:false}).eq("club_id",CLUB_ID).eq("active",true);if(error){alert(error.message);return;}loadRosa();};

// ---------- PRESENZE: GRIGLIA SCHEDE ----------
async function loadAttendance(){
  const d=$("attDate").value; if(!d)return;
  if(!CLUB_ID){alert("Ricarica la pagina");return;}
  const meta={kind:$("attKind").value,place:$("attPlace").value,time:$("attTime").value||null,notes:$("attNotes").value};
  let{data:sess}=await sb.from("sessions").select("*").eq("date",d).maybeSingle();
  if(!sess){const{data:ns,error}=await sb.from("sessions").insert(Object.assign({club_id:CLUB_ID,date:d},meta)).select().single();if(error){alert("Errore: "+error.message);return;}sess=ns;}
  else{await sb.from("sessions").update(meta).eq("id",sess.id);}
  CURRENT_SESSION=sess;
  const{data:att}=await sb.from("attendances").select("*").eq("session_id",sess.id);
  const map={};(att||[]).forEach(a=>map[a.player_id]=a);
  if(!PLAYERS.length)await loadRosa();
  ATT_STATE={};
  PLAYERS.forEach(p=>{const a=map[p.id];ATT_STATE[p.id]={present:a?a.present:false,with_team:a?a.with_team:true,behavior:a?a.behavior||"",notes:a?a.notes||""};});
  $("attDateLbl").textContent=d.split("-").reverse().join("/");
  $("attCard").classList.remove("hidden");
  $("saveBar").classList.remove("hidden");
  renderGrid();
}
function renderGrid(){
  const n=PLAYERS.filter(p=>ATT_STATE[p.id]&&ATT_STATE[p.id].present).length;
  $("attCount").textContent="Presenti "+n+" / "+PLAYERS.length;
  $("attGrid").innerHTML=PLAYERS.map(p=>{
    const s=ATT_STATE[p.id]||{present:false};
    const iz=((p.first_name||"")[0]||"")+((p.last_name||"")[0]||"");
    const bg=p.photo_url?"background-image:url('"+p.photo_url+"')":"";
    return `<div class="pcard ${s.present?"on":"off"}" onclick="tapCard('${p.id}')">
      <button class="gear" onclick="event.stopPropagation();openSheet('${p.id}')">⚙</button>
      <div class="av" style="${bg}">${p.photo_url?"":iz.toUpperCase()}</div>
      <div class="nm">${p.last_name}<br>${p.first_name}</div>
      <div class="st">${s.present?"PRESENTE":"ASSENTE"}</div>
    </div>`;}).join("");
}
window.tapCard=id=>{ATT_STATE[id].present=!ATT_STATE[id].present;renderGrid();};
window.setAll=v=>{PLAYERS.forEach(p=>{ATT_STATE[p.id].present=v;});renderGrid();};

// ---------- BOTTOM SHEET ----------
window.openSheet=id=>{
  SH_ID=id; const p=PLAYERS.find(x=>x.id===id); const s=ATT_STATE[id];
  SH_TMP={present:s.present,with_team:s.with_team,behavior:s.behavior,notes:s.notes};
  $("shName").textContent=p.last_name+" "+p.first_name;
  $("shNote").value=s.notes||"";
  renderSheet();
  $("sheet").classList.remove("hidden");
};
function renderSheet(){
  $("shPres").classList.toggle("on",SH_TMP.present); $("shAss").classList.toggle("on",!SH_TMP.present);
  $("shTeam").classList.toggle("on",SH_TMP.with_team); $("shAp").classList.toggle("on",!SH_TMP.with_team);
  $("shBeh").innerHTML=BEH.map(b=>`<button class="chip ${SH_TMP.behavior===b?"on":""}" onclick="shSetBeh('${b}')">${b}</button>`).join("");
}
window.shSetPres=v=>{SH_TMP.present=v;renderSheet();};
window.shSetTeam=v=>{SH_TMP.with_team=v;renderSheet();};
window.shSetBeh=b=>{SH_TMP.behavior=(SH_TMP.behavior===b?"":b);renderSheet();};
window.closeSheet=()=>{$("sheet").classList.add("hidden");SH_ID=null;};
window.saveSheet=()=>{
  if(!SH_ID)return;
  SH_TMP.notes=$("shNote").value;
  ATT_STATE[SH_ID]=Object.assign({},SH_TMP);
  closeSheet(); renderGrid();
};

// ---------- SALVA ----------
window.saveAttendance=async()=>{
  if(!CURRENT_SESSION){alert("Seleziona prima un giorno");return;}
  await sb.from("sessions").update({kind:$("attKind").value,place:$("attPlace").value,time:$("attTime").value||null,notes:$("attNotes").value}).eq("id",CURRENT_SESSION.id);
  const rows=PLAYERS.map(p=>({session_id:CURRENT_SESSION.id,player_id:p.id,present:ATT_STATE[p.id].present,with_team:ATT_STATE[p.id].with_team,behavior:ATT_STATE[p.id].behavior,notes:ATT_STATE[p.id].notes}));
  const{error}=await sb.from("attendances").upsert(rows,{onConflict:"session_id,player_id"});
  if(error){alert("Errore: "+error.message);return;}
  await loadSessionDates(); renderCal();
  msg("attMsg","Salvate! Presenti "+rows.filter(r=>r.present).length+" / "+rows.length,true);
};

// ---------- REPORT ----------
async function loadReport(){
  const{data:sess}=await sb.from("sessions").select("*").eq("club_id",CLUB_ID).order("date");
  if(!sess||!sess.length){$("repClass").innerHTML='<div class="spin">Nessuna seduta.</div>';$("repMatrix").innerHTML="";return;}
  const ids=sess.map(s=>s.id);
  const{data:att}=await sb.from("attendances").select("*").in("session_id",ids);
  const map={};(att||[]).forEach(a=>{(map[a.session_id]=map[a.session_id]||{})[a.player_id]=a;});
  if(!PLAYERS.length)await loadRosa();
  const lbl=s=>{const p=s.date.split("-");return p[2]+"/"+p[1];};
  const rows=PLAYERS.map(p=>{let pr=0,as=0;sess.forEach(s=>{const a=(map[s.id]||{})[p.id];if(a){if(a.present)pr++;else as++;}});const tot=pr+as;const pct=tot?Math.round(pr/tot*100):0;let st,cl;if(pct===100){st="SEMPRE PRESENTE";cl="verde";}else if(pct>=85){st="ASSIDUO";cl="verde";}else if(pct>=50){st="PRESENTE A METÀ";cl="giallo";}else{st="ASSENTE";cl="rosso";}return{p,pr,as,pct,st,cl};}).sort((a,b)=>b.pct-a.pct||b.pr-a.pr);
  $("repClass").innerHTML="<table class='rep'><tr><th>#</th><th>Giocatore</th><th>Pres</th><th>Ass</th><th>%</th><th>Stato</th></tr>"+rows.map((r,i)=>`<tr><td>${i+1}</td><td class="nome">${r.p.last_name} ${r.p.first_name}</td><td class="ok">${r.pr}</td><td class="ko">${r.as}</td><td>${r.pct}%</td><td><span class="vb ${r.cl}">${r.st}</span></td></tr>`).join("")+"</table>";
  $("repMatrix").innerHTML="<table class='rep'><tr><th class='nome'>Giocatore</th>"+sess.map(s=>`<th>${lbl(s)}</th>`).join("")+"</tr>"+PLAYERS.map(p=>`<tr><td class="nome">${p.last_name} ${p.first_name}</td>`+sess.map(s=>{const a=(map[s.id]||{})[p.id];if(!a)return"<td class='na'>–</td>";return a.present?"<td class='ok'>✔</td>":"<td class='ko'>✖</td>";}).join("")+"</tr>").join("")+"</table>";
}

$("attDate").value=isoOf(new Date());
boot();
if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{});