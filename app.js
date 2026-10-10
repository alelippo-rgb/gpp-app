import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://htglhehtfubypwlgpyep.supabase.co";
const SUPABASE_ANON = "sb_publishable_9Zhmj-kaHyEmR55rIefPGw_SAqmFGg3";

const sb = createClient(SUPABASE_URL, SUPABASE_ANON);
let PLAYERS = [], CLUB_ID = null, CURRENT_SESSION = null, EDIT_ID = null, ATT_STATE = {};
let FOTO_NP = null, FOTO_ED = null;

const $ = id => document.getElementById(id);
function msg(id, txt, ok){ const el=$(id); el.className="msg "+(ok?"ok":"err"); el.textContent=txt; }
function normDate(s){
  s=String(s||"").trim(); if(!s)return null;
  let m=s.match(/^(\d{4})-(\d{2})-(\d{2})/); if(m)return m[1]+"-"+m[2]+"-"+m[3];
  m=s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/); if(m)return m[3]+"-"+("0"+m[2]).slice(-2)+"-"+("0"+m[1]).slice(-2);
  return null;
}
function statoVisita(d){
  if(!d)return {txt:"senza visita",cls:"giallo"};
  const oggi=new Date(); oggi.setHours(0,0,0,0);
  const gg=Math.round((new Date(d+"T00:00:00")-oggi)/86400000);
  if(gg<0)return {txt:"SCADUTA da "+(-gg)+" gg",cls:"rosso"};
  if(gg<=60)return {txt:"scade tra "+gg+" gg",cls:"giallo"};
  return {txt:"valida ancora "+gg+" gg",cls:"verde"};
}
function compressFoto(file, cb){
  const r=new FileReader();
  r.onload=e=>{ const img=new Image(); img.onload=()=>{ const M=400; let w=img.width,h=img.height;
    if(w>h){if(w>M){h=h*M/w;w=M;}}else{if(h>M){w=w*M/h;h=M;}}
    const c=document.createElement("canvas"); c.width=w;c.height=h; c.getContext("2d").drawImage(img,0,0,w,h); cb(c.toDataURL("image/jpeg",0.7)); };
    img.src=e.target.result; };
  r.readAsDataURL(file);
}
window.previewFoto=(pref,prevId)=>{ const f=$(pref+"Foto").files[0]; if(!f)return;
  compressFoto(f,d=>{ $(prevId).style.backgroundImage="url("+d+")"; $(prevId).textContent=""; if(pref==="np")FOTO_NP=d; else FOTO_ED=d; }); };

window.doLogin = async () => { const { error } = await sb.auth.signInWithPassword({ email:$("logEmail").value.trim(), password:$("logPass").value }); if(error){ msg("logMsg","Errore: "+error.message,false); return; } boot(); };
window.doRegister = async () => { const email=$("regEmail").value.trim(),pass=$("regPass").value,club=$("regClub").value.trim(),name=$("regName").value.trim();
  if(!email||!pass||!club||!name){ msg("regMsg","Compila tutti i campi",false); return; }
  const { data, error } = await sb.auth.signUp({ email, password:pass }); if(error){ msg("regMsg","Errore: "+error.message,false); return; }
  if(data.session){ const { error:e2 } = await sb.rpc("create_club_with_owner",{ p_club:club, p_name:name }); if(e2){ msg("regMsg","Errore: "+e2.message,false); return; } boot(); } else msg("regMsg","Account creato: conferma via email poi accedi.",true); };
window.doOnboard = async () => { const { error } = await sb.rpc("create_club_with_owner",{ p_club:$("obClub").value.trim(), p_name:$("obName").value.trim() }); if(error){ msg("obMsg","Errore: "+error.message,false); return; } boot(); };
window.logout = async () => { await sb.auth.signOut(); location.reload(); };

async function boot(){
  const { data:{ session } } = await sb.auth.getSession();
  if(!session){ show("auth"); return; }
  const { data:prof } = await sb.from("profiles").select("*").eq("id", session.user.id).maybeSingle();
  if(!prof){ show("onboard"); return; }
  CLUB_ID = prof.club_id; show("app"); loadRosa();
}
function show(v){
  $("viewAuth").classList.toggle("hidden", v!=="auth"); $("viewOnboard").classList.toggle("hidden", v!=="onboard");
  $("viewRosa").classList.toggle("hidden", v!=="app"); $("viewPres").classList.toggle("hidden", true);
  $("nav").classList.toggle("hidden", v!=="app"); $("btnLogout").classList.toggle("hidden", v!=="app");
  if(v==="app") showTab("rosa");
}
window.showTab = t => {
  $("tabRosa").classList.toggle("on", t==="rosa"); $("tabPres").classList.toggle("on", t==="pres");
  $("viewRosa").classList.toggle("hidden", t!=="rosa"); $("viewPres").classList.toggle("hidden", t!=="pres");
  if(t==="pres") showPres("compila");
};
window.showPres = t => {
  $("subCompila").classList.toggle("on", t==="compila"); $("subReport").classList.toggle("on", t==="report");
  $("presCompila").classList.toggle("hidden", t!=="compila"); $("presReport").classList.toggle("hidden", t!=="report");
  if(t==="report") loadReport();
};

// ---------- ROSA ----------
async function loadRosa(){
  const { data, error } = await sb.from("players").select("*").eq("active",true).order("jersey_number");
  if(error){ $("rosaList").innerHTML='<div class="msg err">'+error.message+'</div>'; return; }
  PLAYERS = data||[]; $("rosaCount").textContent = PLAYERS.length;
  if(!PLAYERS.length){ $("rosaList").innerHTML='<div class="spin">Nessun giocatore.</div>'; return; }
  $("rosaList").innerHTML = PLAYERS.map(p=>{ const sv=statoVisita(p.medical_expiry);
    const iniz=((p.first_name||"")[0]||"")+((p.last_name||"")[0]||"");
    const bg=p.photo_url?"background-image:url('"+p.photo_url+"')":"";
    return `<div class="pitem" onclick="openEdit('${p.id}')"><div class="pavatar" style="${bg}">${p.photo_url?"":iniz.toUpperCase()}</div>
      <div class="pmid"><div class="pname">${p.last_name} ${p.first_name}</div><span class="vb ${sv.cls}">${sv.txt}</span></div>
      <button class="delBtn" onclick="event.stopPropagation();delPlayer('${p.id}')">🗑</button></div>`; }).join("");
}
function leggiForm(pref){ return { jersey_number:parseInt($(pref+"Num").value)||null, last_name:$(pref+"Cogn").value.trim(), first_name:$(pref+"Nome").value.trim(),
  birth_date:normDate($(pref+"Birth").value), medical_expiry:normDate($(pref+"Med").value), phone:$(pref+"Tel").value.trim(), phone_mother:$(pref+"TelM").value.trim(),
  phone_father:$(pref+"TelP").value.trim(), figc_id:$(pref+"Figc").value.trim(), doc_id:$(pref+"Doc").value.trim(), card_number:$(pref+"Card").value.trim(), notes:$(pref+"Note").value.trim() }; }
window.addPlayer = async () => { const o=leggiForm("np"); if(!o.last_name||!o.first_name){ msg("npMsg","Servono cognome e nome",false); return; }
  if(FOTO_NP)o.photo_url=FOTO_NP;
  const { error } = await sb.from("players").insert(Object.assign({ club_id: CLUB_ID }, o)); if(error){ msg("npMsg","Errore: "+error.message,false); return; }
  ["npNum","npCogn","npNome","npBirth","npMed","npTel","npTelM","npTelP","npFigc","npDoc","npCard","npNote","npFoto"].forEach(i=>$(i).value="");
  $("npFotoPrev").style.backgroundImage="";$("npFotoPrev").textContent="📷";FOTO_NP=null; msg("npMsg","Aggiunto!",true); loadRosa(); };
window.openEdit = id => { const p=PLAYERS.find(x=>x.id===id); if(!p)return; EDIT_ID=id; FOTO_ED=null;
  $("edNum").value=p.jersey_number||"";$("edCogn").value=p.last_name||"";$("edNome").value=p.first_name||"";$("edBirth").value=p.birth_date||"";$("edMed").value=p.medical_expiry||"";
  $("edTel").value=p.phone||"";$("edTelM").value=p.phone_mother||"";$("edTelP").value=p.phone_father||"";$("edFigc").value=p.figc_id||"";$("edDoc").value=p.doc_id||"";$("edCard").value=p.card_number||"";$("edNote").value=p.notes||"";
  if(p.photo_url){$("edFotoPrev").style.backgroundImage="url("+p.photo_url+")";$("edFotoPrev").textContent="";}else{$("edFotoPrev").style.backgroundImage="";$("edFotoPrev").textContent="📷";}
  $("editCard").classList.remove("hidden"); $("editCard").scrollIntoView({behavior:"smooth"}); };
window.closeEdit = () => { $("editCard").classList.add("hidden"); EDIT_ID=null; FOTO_ED=null; };
window.saveEdit = async () => { if(!EDIT_ID)return; const o=leggiForm("ed"); if(FOTO_ED)o.photo_url=FOTO_ED;
  const { error } = await sb.from("players").update(o).eq("id",EDIT_ID); if(error){ msg("edMsg","Errore: "+error.message,false); return; }
  msg("edMsg","Salvato!",true); closeEdit(); loadRosa(); };
window.delPlayer = async id => { if(confirm("Togliere questo giocatore?")){ await sb.from("players").update({active:false}).eq("id",id); loadRosa(); } };
window.clearRosa = async () => { if(!confirm("SVUOTARE TUTTA LA ROSA? Le presenze NON si toccano."))return;
  const { error } = await sb.from("players").update({active:false}).eq("club_id",CLUB_ID).eq("active",true); if(error){ alert(error.message); return; } loadRosa(); };

// ---------- PRESENZE: COMPILA ----------
window.loadAttendance = async () => {
  const d=$("attDate").value; if(!d){ alert("Scegli una data"); return; }
  if(!CLUB_ID){ alert("Ricarica la pagina"); return; }
  let { data:sess } = await sb.from("sessions").select("*").eq("date",d).maybeSingle();
  if(!sess){ const { data:ns, error } = await sb.from("sessions").insert({ club_id:CLUB_ID, date:d, kind:$("attKind").value, place:$("attPlace").value, time:$("attTime").value||null, notes:$("attNotes").value }).select().single(); if(error){ alert("Errore: "+error.message); return; } sess=ns; }
  else { await sb.from("sessions").update({ kind:$("attKind").value, place:$("attPlace").value, time:$("attTime").value||null, notes:$("attNotes").value }).eq("id",sess.id); }
  CURRENT_SESSION=sess;
  const { data:att } = await sb.from("attendances").select("*").eq("session_id",sess.id);
  const map={}; (att||[]).forEach(a=>map[a.player_id]=a);
  if(!PLAYERS.length) await loadRosa();
  ATT_STATE={};
  $("attDateLbl").textContent=d.split("-").reverse().join("/");
  $("attList").innerHTML=PLAYERS.map(p=>{
    const a=map[p.id]; const pres=a?a.present:false;
    ATT_STATE[p.id]={ with_team:a?a.with_team:true, behavior:a?a.behavior||"":"", notes:a?a.notes||"":"" };
    return `<div class="att">
      <div class="attTop"><input type="checkbox" id="att_${p.id}" ${pres?"checked":""} onchange="toggleExtra('${p.id}')">
      <label for="att_${p.id}">${p.jersey_number?("#"+p.jersey_number+" "):""}${p.last_name} ${p.first_name}</label></div>
      <div class="attExtra ${pres?"":"hidden"}" id="ex_${p.id}">
        <button class="chip ${ATT_STATE[p.id].with_team?"on":""}" id="tm_${p.id}" onclick="setTeam('${p.id}',true)">⭐ Con squadra</button>
        <button class="chip ap ${!ATT_STATE[p.id].with_team?"on":""}" id="ap_${p.id}" onclick="setTeam('${p.id}',false)">🔹 A parte</button>
        <select id="bh_${p.id}" onchange="ATT_STATE['${p.id}'].behavior=this.value"><option value="">Comportamento…</option><option>Eccellente</option><option>Buono</option><option>Discreto</option><option>Insufficiente</option></select>
        <input id="nt_${p.id}" placeholder="Note" value="${ATT_STATE[p.id].notes||""}" onchange="ATT_STATE['${p.id}'].notes=this.value">
      </div></div>`; }).join("");
  PLAYERS.forEach(p=>{ const a=map[p.id]; if(a&&a.behavior){ const s=$("bh_"+p.id); if(s)s.value=a.behavior; } });
  $("attCard").classList.remove("hidden"); $("attMsg").innerHTML="";
};
window.toggleExtra = id => { $("ex_"+id).classList.toggle("hidden", !$("att_"+id).checked); };
window.setTeam = (id,v) => { ATT_STATE[id].with_team=v; $("tm_"+id).classList.toggle("on",v); $("ap_"+id).classList.toggle("on",!v); };
window.setAll = v => { PLAYERS.forEach(p=>{ const c=$("att_"+p.id); if(c){ c.checked=v; toggleExtra(p.id); } }); };
window.saveAttendance = async () => {
  if(!CURRENT_SESSION){ alert("Carica prima una data"); return; }
  const rows=PLAYERS.map(p=>({ session_id:CURRENT_SESSION.id, player_id:p.id, present:$("att_"+p.id).checked,
    with_team:ATT_STATE[p.id]?ATT_STATE[p.id].with_team:true, behavior:ATT_STATE[p.id]?ATT_STATE[p.id].behavior:"", notes:ATT_STATE[p.id]?ATT_STATE[p.id].notes:"" }));
  const { error } = await sb.from("attendances").upsert(rows,{ onConflict:"session_id,player_id" });
  if(error){ msg("attMsg","Errore: "+error.message,false); return; }
  msg("attMsg","Salvate! Presenti "+rows.filter(r=>r.present).length+" / "+rows.length,true);
};

// ---------- PRESENZE: REPORT ----------
async function loadReport(){
  const { data:sess } = await sb.from("sessions").select("*").eq("club_id",CLUB_ID).order("date");
  if(!sess||!sess.length){ $("repClass").innerHTML='<div class="spin">Nessuna seduta.</div>'; $("repMatrix").innerHTML=""; return; }
  const ids=sess.map(s=>s.id);
  const { data:att } = await sb.from("attendances").select("*").in("session_id",ids);
  const map={}; (att||[]).forEach(a=>{ (map[a.session_id]=map[a.session_id]||{})[a.player_id]=a; });
  if(!PLAYERS.length) await loadRosa();
  const dateLbl=s=>{ const p=s.date.split("-"); return p[2]+"/"+p[1]; };
  let rows=PLAYERS.map(p=>{
    let pr=0,as=0;
    sess.forEach(s=>{ const a=(map[s.id]||{})[p.id]; if(a){ if(a.present)pr++; else as++; } });
    const tot=pr+as; const pct=tot?Math.round(pr/tot*100):0;
    let stato,cls;
    if(pct===100){stato="SEMPRE PRESENTE";cls="verde";} else if(pct>=85){stato="ASSIDUO";cls="verde";} else if(pct>=50){stato="PRESENTE A METÀ";cls="giallo";} else {stato="ASSENTE";cls="rosso";}
    return {p,pr,as,pct,stato,cls};
  }).sort((a,b)=>b.pct-a.pct||b.pr-a.pr);
  $("repClass").innerHTML="<table class='rep'><tr><th>#</th><th>Giocatore</th><th>Presenze</th><th>Assenze</th><th>%</th><th>Stato</th></tr>"+
    rows.map((r,i)=>`<tr><td>${i+1}</td><td class="nome">${r.p.last_name} ${r.p.first_name}</td><td class="ok">${r.pr}</td><td class="ko">${r.as}</td><td>${r.pct}%</td><td><span class="vb ${r.cls}">${r.stato}</span></td></tr>`).join("")+"</table>";
  $("repMatrix").innerHTML="<table class='rep'><tr><th class='nome'>Giocatore</th>"+sess.map(s=>`<th>${dateLbl(s)}</th>`).join("")+"</tr>"+
    PLAYERS.map(p=>`<tr><td class="nome">${p.last_name} ${p.first_name}</td>`+sess.map(s=>{ const a=(map[s.id]||{})[p.id];
      if(!a)return "<td class='na'>–</td>"; return a.present?"<td class='ok'>✔</td>":"<td class='ko'>✖</td>"; }).join("")+"</tr>").join("")+"</table>";
}

$("attDate").valueAsDate = new Date();
boot();
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});