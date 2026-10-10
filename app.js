import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// ====== INCOLLA QUI I TUOI DATI SUPABASE ======
const SUPABASE_URL = "https://htglhehtfubypwlgpyep.supabase.co";
const SUPABASE_ANON = "sb_publishable_9Zhmj-kaHyEmR55rIefPGw_SAqmFGg3";
// =============================================

const sb = createClient(SUPABASE_URL, SUPABASE_ANON);
let PLAYERS = [];
let CURRENT_SESSION = null;

const $ = id => document.getElementById(id);
function msg(id, txt, ok){ const el=$(id); el.className="msg "+(ok?"ok":"err"); el.textContent=txt; }

// ---------- AUTH ----------
window.doLogin = async () => {
  const { error } = await sb.auth.signInWithPassword({ email:$("logEmail").value.trim(), password:$("logPass").value });
  if(error){ msg("logMsg","Errore: "+error.message,false); return; }
  boot();
};
window.doRegister = async () => {
  const email=$("regEmail").value.trim(), pass=$("regPass").value;
  const club=$("regClub").value.trim(), name=$("regName").value.trim();
  if(!email||!pass||!club||!name){ msg("regMsg","Compila tutti i campi",false); return; }
  const { data, error } = await sb.auth.signUp({ email, password:pass });
  if(error){ msg("regMsg","Errore: "+error.message,false); return; }
  if(data.session){
    const { error:e2 } = await sb.rpc("create_club_with_owner",{ p_club:club, p_name:name });
    if(e2){ msg("regMsg","Errore club: "+e2.message,false); return; }
    msg("regMsg","Società creata! Entrata in corso…",true);
    boot();
  } else {
    msg("regMsg","Account creato: controlla la email per confermare, poi accedi.",true);
  }
};
window.doOnboard = async () => {
  const { error } = await sb.rpc("create_club_with_owner",{ p_club:$("obClub").value.trim(), p_name:$("obName").value.trim() });
  if(error){ msg("obMsg","Errore: "+error.message,false); return; }
  boot();
};
window.logout = async () => { await sb.auth.signOut(); location.reload(); };

// ---------- BOOT ----------
async function boot(){
  const { data:{ session } } = await sb.auth.getSession();
  if(!session){ show("auth"); return; }
  const { data:prof } = await sb.from("profiles").select("*").eq("id", session.user.id).maybeSingle();
  if(!prof){ show("onboard"); return; }
  show("app");
  loadRosa();
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
  $("tabRosa").classList.toggle("on", t==="rosa");
  $("tabPres").classList.toggle("on", t==="pres");
  $("viewRosa").classList.toggle("hidden", t!=="rosa");
  $("viewPres").classList.toggle("hidden", t!=="pres");
};

// ---------- ROSA ----------
async function loadRosa(){
  const { data, error } = await sb.from("players").select("*").eq("active",true).order("jersey_number");
  if(error){ $("rosaList").innerHTML='<div class="msg err">'+error.message+'</div>'; return; }
  PLAYERS = data||[];
  $("rosaCount").textContent = PLAYERS.length;
  if(!PLAYERS.length){ $("rosaList").innerHTML='<div class="spin">Nessun giocatore: aggiungine uno sopra.</div>'; return; }
  $("rosaList").innerHTML = PLAYERS.map(p=>`
    <div class="pitem">
      <div class="pnum">${p.jersey_number||"-"}</div>
      <div class="pname">${p.last_name} ${p.first_name}${p.medical_expiry?` <small style="color:#b45309">visita ${p.medical_expiry}</small>`:""}</div>
      <button onclick="delPlayer('${p.id}')">🗑</button>
    </div>`).join("");
}
window.addPlayer = async () => {
  const full = $("npName").value.trim();
  if(!full){ msg("npMsg","Scrivi cognome e nome",false); return; }
  const parts = full.split(/\s+/);
  const { error } = await sb.from("players").insert({
    jersey_number: parseInt($("npNum").value)||null,
    last_name: parts[0], first_name: parts.slice(1).join(" "),
    birth_date: $("npBirth").value||null,
    medical_expiry: $("npMed").value||null
  });
  if(error){ msg("npMsg","Errore: "+error.message,false); return; }
  $("npName").value=""; $("npNum").value="";
  msg("npMsg","Aggiunto!",true);
  loadRosa();
};
window.delPlayer = async id => {
  if(!confirm("Togliere questo giocatore dalla rosa?")) return;
  await sb.from("players").update({active:false}).eq("id",id);
  loadRosa();
};

// ---------- PRESENZE ----------
window.loadAttendance = async () => {
  const d = $("attDate").value;
  if(!d){ alert("Scegli una data"); return; }
  let { data:sess } = await sb.from("sessions").select("*").eq("date",d).maybeSingle();
  if(!sess){
    const { data:ns, error } = await sb.from("sessions").insert({ date:d, kind:$("attKind").value, place:$("attPlace").value }).select().single();
    if(error){ alert("Errore: "+error.message); return; }
    sess = ns;
  }
  CURRENT_SESSION = sess;
  const { data:att } = await sb.from("attendances").select("*").eq("session_id",sess.id);
  const map = {}; (att||[]).forEach(a=>map[a.player_id]=a);
  if(!PLAYERS.length) await loadRosa();
  $("attDateLbl").textContent = d.split("-").reverse().join("/");
  $("attList").innerHTML = PLAYERS.map(p=>`
    <div class="att">
      <input type="checkbox" id="att_${p.id}" ${map[p.id]?.present?"checked":""}>
      <label for="att_${p.id}">${p.jersey_number?("#"+p.jersey_number+" "):""}${p.last_name} ${p.first_name}</label>
    </div>`).join("");
  $("attCard").classList.remove("hidden");
  $("attMsg").innerHTML="";
};
window.setAll = v => { PLAYERS.forEach(p=>{ const c=$("att_"+p.id); if(c)c.checked=v; }); };
window.saveAttendance = async () => {
  if(!CURRENT_SESSION){ alert("Carica prima una data"); return; }
  const rows = PLAYERS.map(p=>({
    session_id: CURRENT_SESSION.id, player_id: p.id,
    present: $("att_"+p.id).checked, with_team: true
  }));
  const { error } = await sb.from("attendances").upsert(rows, { onConflict:"session_id,player_id" });
  if(error){ msg("attMsg","Errore: "+error.message,false); return; }
  const n = rows.filter(r=>r.present).length;
  msg("attMsg",`Salvate! Presenti ${n} / ${rows.length}`,true);
};

// ---------- AVVIO ----------
$("attDate").valueAsDate = new Date();
boot();
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});