import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://htglhehtfubypwlgpyep.supabase.co";
const SUPABASE_ANON = "sb_publishable_9Zhmj-kaHyEmR55rIefPGw_SAqmFGg3";

const sb = createClient(SUPABASE_URL, SUPABASE_ANON);
let PLAYERS = [], CLUB_ID = null, CURRENT_SESSION = null, EDIT_ID = null, BULK_ROWS = [];

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

window.doLogin = async () => {
  const { error } = await sb.auth.signInWithPassword({ email:$("logEmail").value.trim(), password:$("logPass").value });
  if(error){ msg("logMsg","Errore: "+error.message,false); return; } boot();
};
window.doRegister = async () => {
  const email=$("regEmail").value.trim(), pass=$("regPass").value, club=$("regClub").value.trim(), name=$("regName").value.trim();
  if(!email||!pass||!club||!name){ msg("regMsg","Compila tutti i campi",false); return; }
  const { data, error } = await sb.auth.signUp({ email, password:pass });
  if(error){ msg("regMsg","Errore: "+error.message,false); return; }
  if(data.session){ const { error:e2 } = await sb.rpc("create_club_with_owner",{ p_club:club, p_name:name }); if(e2){ msg("regMsg","Errore: "+e2.message,false); return; } boot(); }
  else msg("regMsg","Account creato: conferma via email poi accedi.",true);
};
window.doOnboard = async () => {
  const { error } = await sb.rpc("create_club_with_owner",{ p_club:$("obClub").value.trim(), p_name:$("obName").value.trim() });
  if(error){ msg("obMsg","Errore: "+error.message,false); return; } boot();
};
window.logout = async () => { await sb.auth.signOut(); location.reload(); };

async function boot(){
  const { data:{ session } } = await sb.auth.getSession();
  if(!session){ show("auth"); return; }
  const { data:prof } = await sb.from("profiles").select("*").eq("id", session.user.id).maybeSingle();
  if(!prof){ show("onboard"); return; }
  CLUB_ID = prof.club_id; show("app"); loadRosa();
}
function show(v){
  $("viewAuth").classList.toggle("hidden", v!=="auth");
  $("viewOnboard").classList.toggle("hidden", v!=="onboard");
  $("viewRosa").classList.toggle("hidden", v!=="app");
  $("viewPres").classList.toggle("hidden", true);
  $("nav").classList.toggle("hidden", v!=="app");
  $("btnLogout").classList.toggle("hidden", v!=="app");
  if(v==="app") showTab("rosa");
}
window.showTab = t => {
  $("tabRosa").classList.toggle("on", t==="rosa"); $("tabPres").classList.toggle("on", t==="pres");
  $("viewRosa").classList.toggle("hidden", t!=="rosa"); $("viewPres").classList.toggle("hidden", t!=="pres");
};

async function loadRosa(){
  const { data, error } = await sb.from("players").select("*").eq("active",true).order("jersey_number");
  if(error){ $("rosaList").innerHTML='<div class="msg err">'+error.message+'</div>'; return; }
  PLAYERS = data||[]; $("rosaCount").textContent = PLAYERS.length;
  if(!PLAYERS.length){ $("rosaList").innerHTML='<div class="spin">Nessun giocatore.</div>'; return; }
  $("rosaList").innerHTML = PLAYERS.map(p=>{
    const sv=statoVisita(p.medical_expiry);
    return `<div class="pitem" onclick="openEdit('${p.id}')">
      <div class="pnum">${p.jersey_number||"-"}</div>
      <div class="pmid"><div class="pname">${p.last_name} ${p.first_name}</div><span class="vb ${sv.cls}">${sv.txt}</span></div>
      <button onclick="event.stopPropagation();delPlayer('${p.id}')">🗑</button>
    </div>`;
  }).join("");
}
function leggiForm(pref){
  return { jersey_number:parseInt($(pref+"Num").value)||null, last_name:$(pref+"Cogn").value.trim(), first_name:$(pref+"Nome").value.trim(),
    birth_date:normDate($(pref+"Birth").value), medical_expiry:normDate($(pref+"Med").value), phone:$(pref+"Tel").value.trim(),
    phone_mother:$(pref+"TelM").value.trim(), phone_father:$(pref+"TelP").value.trim(), figc_id:$(pref+"Figc").value.trim(),
    doc_id:$(pref+"Doc").value.trim(), card_number:$(pref+"Card").value.trim(), notes:$(pref+"Note").value.trim() };
}
window.addPlayer = async () => {
  const o=leggiForm("np");
  if(!o.last_name||!o.first_name){ msg("npMsg","Servono cognome e nome",false); return; }
  const { error } = await sb.from("players").insert(Object.assign({ club_id: CLUB_ID }, o));
  if(error){ msg("npMsg","Errore: "+error.message,false); return; }
  ["npNum","npCogn","npNome","npBirth","npMed","npTel","npTelM","npTelP","npFigc","npDoc","npCard","npNote"].forEach(i=>$(i).value="");
  msg("npMsg","Aggiunto!",true); loadRosa();
};
window.openEdit = id => {
  const p=PLAYERS.find(x=>x.id===id); if(!p)return; EDIT_ID=id;
  $("edNum").value=p.jersey_number||""; $("edCogn").value=p.last_name||""; $("edNome").value=p.first_name||"";
  $("edBirth").value=p.birth_date||""; $("edMed").value=p.medical_expiry||""; $("edTel").value=p.phone||"";
  $("edTelM").value=p.phone_mother||""; $("edTelP").value=p.phone_father||""; $("edFigc").value=p.figc_id||"";
  $("edDoc").value=p.doc_id||""; $("edCard").value=p.card_number||""; $("edNote").value=p.notes||"";
  $("editCard").classList.remove("hidden"); $("editCard").scrollIntoView({behavior:"smooth"});
};
window.closeEdit = () => { $("editCard").classList.add("hidden"); EDIT_ID=null; };
window.saveEdit = async () => {
  if(!EDIT_ID)return;
  const { error } = await sb.from("players").update(leggiForm("ed")).eq("id",EDIT_ID);
  if(error){ msg("edMsg","Errore: "+error.message,false); return; }
  msg("edMsg","Salvato!",true); closeEdit(); loadRosa();
};
window.delPlayer = async id => { if(confirm("Togliere questo giocatore?")){ await sb.from("players").update({active:false}).eq("id",id); loadRosa(); } };
window.clearRosa = async () => {
  if(!confirm("SVUOTARE TUTTA LA ROSA? Potrai re-importarla dopo. Le presenze salvate NON si toccano."))return;
  const { error } = await sb.from("players").update({active:false}).eq("club_id",CLUB_ID).eq("active",true);
  if(error){ alert("Errore: "+error.message); return; } loadRosa();
};

// ---------- IMPORT CON ANTEPRIMA ----------
window.bulkParse = () => {
  const righe=$("bulkText").value.split("\n").map(r=>r.trim()).filter(Boolean);
  if(!righe.length){ msg("bulkMsg","Incolla prima i dati",false); return; }
  let start=0, idx=null;
  const prima=righe[0].split(/[;\t]/).map(x=>x.toLowerCase().trim());
  const col=s=>{ for(let i=0;i<prima.length;i++){ for(const k of s){ if(prima[i].indexOf(k)!==-1)return i; } } return -1; };
  if(prima.some(c=>c.indexOf("nome")!==-1||c.indexOf("numero")!==-1||c.indexOf("giocatore")!==-1)){
    idx={ num:col(["numero","maglia"]), cogn:col(["cognome"]), nome:col(["nome","giocatore"]), nasc:col(["nascita","nato"]),
          vis:col(["visita","medica"]), tel:col(["telefono","cell"]), telm:col(["madre","mamma"]), telp:col(["padre"]),
          figc:col(["figc","matricola"]), doc:col(["documento"]), card:col(["tessera"]), note:col(["note"]) };
    start=1;
  }
  BULK_ROWS=[];
  for(let i=start;i<righe.length;i++){
    const p=righe[i].split(/[;\t]/).map(x=>x.trim());
    const g=j=>j>=0?(p[j]||""):"";
    let num,cogn,nome;
    if(idx){
      num=parseInt(g(idx.num))||null;
      if(idx.cogn>=0 && idx.nome>=0 && idx.cogn!==idx.nome){ cogn=g(idx.cogn); nome=g(idx.nome); }
      else { const full=(idx.nome>=0?g(idx.nome):g(idx.cogn))||""; const nn=full.split(/\s+/); cogn=nn[0]||""; nome=nn.slice(1).join(" "); }
    } else { num=parseInt(p[0])||null; const nn=(p[1]||"").split(/\s+/); cogn=nn[0]||""; nome=nn.slice(1).join(" "); }
    if(!cogn&&!nome)continue;
    const get=k=>idx?g(idx[k]):"";
    const raw=k=>idx?g(idx[k]):p[{num:0,nasc:2,vis:3,tel:4,telm:5,telp:6,figc:7,doc:8,card:9,note:10}[k]]||"";
    BULK_ROWS.push({ club_id:CLUB_ID, jersey_number:num, last_name:cogn, first_name:nome,
      birth_date:normDate(idx?g(idx.nasc):p[2]), medical_expiry:normDate(idx?g(idx.vis):p[3]),
      phone:idx?g(idx.tel):p[4]||"", phone_mother:idx?g(idx.telm):p[5]||"", phone_father:idx?g(idx.telp):p[6]||"",
      figc_id:idx?g(idx.figc):p[7]||"", doc_id:idx?g(idx.doc):p[8]||"", card_number:idx?g(idx.card):p[9]||"", notes:idx?g(idx.note):p[10]||"" });
  }
  if(!BULK_ROWS.length){ msg("bulkMsg","Nessuna riga valida",false); $("bulkOk").classList.add("hidden"); $("bulkPrev").innerHTML=""; return; }
  $("bulkPrev").innerHTML = "<table class='prev'><tr><th>N°</th><th>Cognome</th><th>Nome</th><th>Nascita</th><th>Visita</th><th>Tel</th></tr>" +
    BULK_ROWS.slice(0,6).map(r=>`<tr><td>${r.jersey_number||""}</td><td>${r.last_name}</td><td>${r.first_name}</td><td>${r.birth_date||""}</td><td>${r.medical_expiry||""}</td><td>${r.phone||""}</td></tr>`).join("") +
    `</table><div class="msg ok">Righe riconosciute: ${BULK_ROWS.length}. Controlla qui sopra: se i dati sono giusti, conferma.</div>`;
  $("bulkOk").classList.remove("hidden");
  $("bulkMsg").innerHTML="";
};
window.bulkConfirm = async () => {
  if(!BULK_ROWS.length){ msg("bulkMsg","Prima analizza",false); return; }
  const { error } = await sb.from("players").insert(BULK_ROWS);
  if(error){ msg("bulkMsg","Errore: "+error.message,false); return; }
  msg("bulkMsg","Importati "+BULK_ROWS.length+" giocatori!",true);
  BULK_ROWS=[]; $("bulkText").value=""; $("bulkPrev").innerHTML=""; $("bulkOk").classList.add("hidden");
  loadRosa();
};

// ---------- PRESENZE ----------
window.loadAttendance = async () => {
  const d=$("attDate").value; if(!d){ alert("Scegli una data"); return; }
  if(!CLUB_ID){ alert("Ricarica la pagina"); return; }
  let { data:sess } = await sb.from("sessions").select("*").eq("date",d).maybeSingle();
  if(!sess){ const { data:ns, error } = await sb.from("sessions").insert({ club_id:CLUB_ID, date:d, kind:$("attKind").value, place:$("attPlace").value }).select().single(); if(error){ alert("Errore: "+error.message); return; } sess=ns; }
  CURRENT_SESSION=sess;
  const { data:att } = await sb.from("attendances").select("*").eq("session_id",sess.id);
  const map={}; (att||[]).forEach(a=>map[a.player_id]=a);
  if(!PLAYERS.length) await loadRosa();
  $("attDateLbl").textContent=d.split("-").reverse().join("/");
  $("attList").innerHTML=PLAYERS.map(p=>`<div class="att"><input type="checkbox" id="att_${p.id}" ${map[p.id]?.present?"checked":""}><label for="att_${p.id}">${p.jersey_number?("#"+p.jersey_number+" "):""}${p.last_name} ${p.first_name}</label></div>`).join("");
  $("attCard").classList.remove("hidden"); $("attMsg").innerHTML="";
};
window.setAll = v => { PLAYERS.forEach(p=>{ const c=$("att_"+p.id); if(c)c.checked=v; }); };
window.saveAttendance = async () => {
  if(!CURRENT_SESSION){ alert("Carica prima una data"); return; }
  const rows=PLAYERS.map(p=>({ session_id:CURRENT_SESSION.id, player_id:p.id, present:$("att_"+p.id).checked, with_team:true }));
  const { error } = await sb.from("attendances").upsert(rows,{ onConflict:"session_id,player_id" });
  if(error){ msg("attMsg","Errore: "+error.message,false); return; }
  msg("attMsg","Salvate! Presenti "+rows.filter(r=>r.present).length+" / "+rows.length,true);
};

$("attDate").valueAsDate = new Date();
boot();
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});