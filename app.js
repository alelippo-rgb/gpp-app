import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://htglhehtfubypwlgpyep.supabase.co";
const SUPABASE_ANON = "sb_publishable_9Zhmj-kaHyEmR55rIefPGw_SAqmFGg3";
const sb = createClient(SUPABASE_URL, SUPABASE_ANON);

let PLAYERS = [];
let PARTITE = [];
let CLUB_ID = null;
let CURRENT_SESSION = null;
let EDIT_ID = null;
let ATT_STATE = {};
let PART_STATE = {};
let SETTINGS = {};
let SESSION_DATES = new Set();
let CAL_VIEW = { y: new Date().getFullYear(), m: new Date().getMonth() };
let FOTO_NP = null;
let FOTO_ED = null;
let SH_ID = null;
let CUR_PART = null;
let LIVE = null;
let LIVE_TIMER = null;

const MESI = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
const BEH = ["Eccellente","Buono","Discreto","Insufficiente"];
const MOTIVI = ["Malato","Infortunato","Viaggio","Scuola","Famiglia","Permesso","Altro"];

const $ = id => document.getElementById(id);

function msg(id, txt, ok) {
  const el = $(id);
  if (el) { el.className = "msg " + (ok ? "ok" : "err"); el.textContent = txt; }
}

function isoOf(d) {
  return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
}

function normDate(s) {
  s = String(s || "").trim();
  if (!s) return null;
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return m[1] + "-" + m[2] + "-" + m[3];
  m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (m) return m[3] + "-" + ("0"+m[2]).slice(-2) + "-" + ("0"+m[1]).slice(-2);
  return null;
}

function statoVisita(d) {
  if (!d) return { txt: "senza visita", cls: "giallo" };
  const o = new Date(); o.setHours(0,0,0,0);
  const g = Math.round((new Date(d+"T00:00:00") - o) / 86400000);
  if (g < 0) return { txt: "SCADUTA da " + (-g) + " gg", cls: "rosso" };
  if (g <= 60) return { txt: "scade tra " + g + " gg", cls: "giallo" };
  return { txt: "valida " + g + " gg", cls: "verde" };
}

function compressFoto(f, cb) {
  const r = new FileReader();
  r.onload = function(e) {
    const i = new Image();
    i.onload = function() {
      const M = 400;
      let w = i.width, h = i.height;
      if (w > h) { if (w > M) { h = h*M/w; w = M; } }
      else { if (h > M) { w = w*M/h; h = M; } }
      const c = document.createElement("canvas");
      c.width = w; c.height = h;
      c.getContext("2d").drawImage(i, 0, 0, w, h);
      cb(c.toDataURL("image/jpeg", 0.7));
    };
    i.src = e.target.result;
  };
  r.readAsDataURL(f);
}

window.previewFoto = function(p, id) {
  const f = $(p + "Foto").files[0];
  if (!f) return;
  compressFoto(f, function(d) {
    $(id).style.backgroundImage = "url(" + d + ")";
    $(id).textContent = "";
    if (p === "np") FOTO_NP = d; else FOTO_ED = d;
  });
};

function nome(id) {
  const p = PLAYERS.find(function(x) { return x.id === id; });
  return p ? (p.last_name + " " + p.first_name) : "?";
}

window.doLogin = async function() {
  const email = $("logEmail").value.trim();
  const password = $("logPass").value;
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) { msg("logMsg", "Errore: " + error.message, false); return; }
  boot();
};

window.doRegister = async function() {
  const e = $("regEmail").value.trim();
  const p = $("regPass").value;
  const c = $("regClub").value.trim();
  const n = $("regName").value.trim();
  if (!e || !p || !c || !n) { msg("regMsg", "Compila tutto", false); return; }
  const { data, error } = await sb.auth.signUp({ email: e, password: p });
  if (error) { msg("regMsg", "Errore: " + error.message, false); return; }
  if (data.session) {
    const r2 = await sb.rpc("create_club_with_owner", { p_club: c, p_name: n });
    if (r2.error) { msg("regMsg", "Err: " + r2.error.message, false); return; }
    boot();
  } else {
    msg("regMsg", "Conferma via email poi accedi", true);
  }
};

window.doOnboard = async function() {
  const r = await sb.rpc("create_club_with_owner", { p_club: $("obClub").value.trim(), p_name: $("obName").value.trim() });
  if (r.error) { msg("obMsg", "Err: " + r.error.message, false); return; }
  boot();
};

window.logout = async function() { await sb.auth.signOut(); location.reload(); };

async function boot() {
  try {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) { showView("auth"); return; }
    const { data: prof } = await sb.from("profiles").select("*").eq("id", session.user.id).maybeSingle();
    if (!prof) { showView("onboard"); return; }
    CLUB_ID = prof.club_id;
    await loadSettingsRow();
    await loadSessionDates();
    await loadRosa();
    await loadPartite();
    showView("app");
    goHome();
  } catch (e) {
    console.error("Boot error:", e);
    alert("Errore caricamento: " + e.message);
  }
}

async function loadSettingsRow() {
  const { data } = await sb.from("settings").select("*").eq("club_id", CLUB_ID).maybeSingle();
  SETTINGS = (data && data.data) || { luoghi: ["Borgaro","Usseglio","Collegno Paradiso"], luogo_default: "Borgaro", live: null };
  if (!SETTINGS.luoghi) SETTINGS.luoghi = ["Borgaro"];
  populateLuoghi();
  if (SETTINGS.live) LIVE = SETTINGS.live;
}

async function persistSettings() {
  await sb.from("settings").upsert({ club_id: CLUB_ID, data: SETTINGS });
}

function populateLuoghi() {
  const L = SETTINGS.luoghi || [];
  ["attPlace","ptPlace","setDefault"].forEach(function(id) {
    const el = $(id);
    if (el) {
      el.innerHTML = L.map(function(x) { return "<option>" + x + "</option>"; }).join("");
      if (SETTINGS.luogo_default) el.value = SETTINGS.luogo_default;
    }
  });
  const ll = $("luoghiList");
  if (ll) {
    ll.innerHTML = L.map(function(x) {
      return '<span class="vb blu">' + x + ' <b style="cursor:pointer" onclick="removeLuogo(\'' + x.replace(/'/g,"\\'") + '\')">✕</b></span>';
    }).join(" ");
  }
}

window.addLuogo = function() {
  const v = $("setLuogo").value.trim();
  if (!v) return;
  SETTINGS.luoghi.push(v);
  $("setLuogo").value = "";
  populateLuoghi();
};

window.removeLuogo = function(x) {
  SETTINGS.luoghi = SETTINGS.luoghi.filter(function(y) { return y !== x; });
  populateLuoghi();
};

window.saveLuoghi = async function() {
  SETTINGS.luogo_default = $("setDefault").value;
  await persistSettings();
  populateLuoghi();
  alert("Luoghi salvati");
};

function showView(v) {
  $("viewAuth").classList.toggle("hidden", v !== "auth");
  $("viewOnboard").classList.toggle("hidden", v !== "onboard");
  const app = v === "app";
  $("nav").classList.toggle("hidden", !app);
  $("btnLogout").classList.toggle("hidden", !app);
  ["viewHome","viewLive","viewCal","viewRosa","viewPres","viewPart","viewForm","viewSub","viewDist","viewConv","viewFoto","viewSet","viewReg"].forEach(function(x) { $(x).classList.add("hidden"); });
  $("saveBar").classList.add("hidden");
}

window.goHome = function() {
  showView("app");
  $("viewHome").classList.remove("hidden");
  setNav("nbHome");
  renderLiveBanner();
};

window.showTab = function(t) {
  showView("app");
  const navMap = { cal: "nbCal", pres: "nbPres", part: "nbPart", reg: "nbReg" };
  setNav(navMap[t] || "nbHome");
  const map = {
    cal: "viewCal", live: "viewLive", rosa: "viewRosa", pres: "viewPres",
    part: "viewPart", form: "viewForm", sub: "viewSub", dist: "viewDist",
    conv: "viewConv", foto: "viewFoto", set: "viewSet", reg: "viewReg"
  };
  $(map[t]).classList.remove("hidden");
  if (t === "cal") loadCal();
  if (t === "pres") renderCal();
  if (t === "part") { $("partDetail").classList.add("hidden"); $("partListWrap").classList.remove("hidden"); loadPartite(); }
  if (t === "live") renderLive();
  if (t === "form") populateMatchSelect("fmMatch");
  if (t === "sub") populateMatchSelect("sbMatch", true);
  if (t === "dist") populateMatchSelect("dsMatch", true);
  if (t === "conv") populateMatchSelect("cvMatch", true);
  if (t === "foto") renderFoto();
  if (t === "reg") loadRegistro();
  if (t === "set") populateLuoghi();
};

function setNav(id) {
  ["nbHome","nbCal","nbPres","nbPart","nbReg"].forEach(function(x) { $(x).classList.toggle("on", x === id); });
}

async function loadRosa() {
  const { data, error } = await sb.from("players").select("*").eq("active", true).order("jersey_number");
  if (error) return;
  PLAYERS = data || [];
  $("rosaCount").textContent = PLAYERS.length;
  if (!PLAYERS.length) { $("rosaList").innerHTML = '<div class="spin">Nessun giocatore</div>'; return; }
  $("rosaList").innerHTML = PLAYERS.map(function(p) {
    const sv = statoVisita(p.medical_expiry);
    const iz = ((p.first_name||"")[0]||"") + ((p.last_name||"")[0]||"");
    const bg = p.photo_url ? "background-image:url('" + p.photo_url + "')" : "";
    return '<div class="pitem" onclick="openEdit(\'' + p.id + '\')">' +
      '<div class="pavatar" style="' + bg + '">' + (p.photo_url ? "" : iz.toUpperCase()) + '</div>' +
      '<div class="pmid"><div class="pname">' + p.last_name + ' ' + p.first_name + '</div>' +
      '<span class="vb ' + sv.cls + '">' + sv.txt + '</span></div>' +
      '<button class="delBtn" onclick="event.stopPropagation();delPlayer(\'' + p.id + '\')">🗑</button></div>';
  }).join("");
}

function leggiForm(p) {
  return {
    jersey_number: parseInt($(p+"Num").value) || null,
    last_name: $(p+"Cogn").value.trim(),
    first_name: $(p+"Nome").value.trim(),
    birth_date: normDate($(p+"Birth").value),
    medical_expiry: normDate($(p+"Med").value),
    phone: $(p+"Tel").value.trim(),
    phone_mother: $(p+"TelM").value.trim(),
    phone_father: $(p+"TelP").value.trim(),
    figc_id: $(p+"Figc").value.trim(),
    doc_id: $(p+"Doc").value.trim(),
    card_number: $(p+"Card").value.trim(),
    notes: $(p+"Note").value.trim()
  };
}

window.addPlayer = async function() {
  const o = leggiForm("np");
  if (!o.last_name || !o.first_name) { msg("npMsg", "Servono cognome e nome", false); return; }
  if (FOTO_NP) o.photo_url = FOTO_NP;
  o.club_id = CLUB_ID;
  const { error } = await sb.from("players").insert(o);
  if (error) { msg("npMsg", "Err: " + error.message, false); return; }
  ["npNum","npCogn","npNome","npBirth","npMed","npTel","npTelM","npTelP","npFigc","npDoc","npCard","npNote","npFoto"].forEach(function(i) { $(i).value = ""; });
  $("npFotoPrev").style.backgroundImage = ""; $("npFotoPrev").textContent = "📷"; FOTO_NP = null;
  msg("npMsg", "Aggiunto!", true); loadRosa();
};

window.openEdit = function(id) {
  const p = PLAYERS.find(function(x) { return x.id === id; });
  if (!p) return;
  EDIT_ID = id; FOTO_ED = null;
  const keys = {Num:"jersey_number",Cogn:"last_name",Nome:"first_name",Birth:"birth_date",Med:"medical_expiry",Tel:"phone",TelM:"phone_mother",TelP:"phone_father",Figc:"figc_id",Doc:"doc_id",Card:"card_number",Note:"notes"};
  Object.keys(keys).forEach(function(k) { $("ed"+k).value = p[keys[k]] || ""; });
  if (p.photo_url) { $("edFotoPrev").style.backgroundImage = "url(" + p.photo_url + ")"; $("edFotoPrev").textContent = ""; }
  else { $("edFotoPrev").style.backgroundImage = ""; $("edFotoPrev").textContent = "📷"; }
  $("editCard").classList.remove("hidden");
};

window.closeEdit = function() { $("editCard").classList.add("hidden"); EDIT_ID = null; };

window.saveEdit = async function() {
  if (!EDIT_ID) return;
  const o = leggiForm("ed");
  if (FOTO_ED) o.photo_url = FOTO_ED;
  const { error } = await sb.from("players").update(o).eq("id", EDIT_ID);
  if (error) { msg("edMsg", "Err: " + error.message, false); return; }
  msg("edMsg", "Salvato!", true); closeEdit(); loadRosa();
};

window.delPlayer = async function(id) {
  if (confirm("Togliere giocatore?")) { await sb.from("players").update({ active: false }).eq("id", id); loadRosa(); }
};

window.clearRosa = async function() {
  if (!confirm("Svuotare tutta la rosa?")) return;
  await sb.from("players").update({ active: false }).eq("club_id", CLUB_ID).eq("active", true);
  loadRosa();
};

async function loadSessionDates() {
  const { data } = await sb.from("sessions").select("date").eq("club_id", CLUB_ID);
  SESSION_DATES = new Set((data || []).map(function(s) { return s.date; }));
}

function renderCal() {
  const y = CAL_VIEW.y, m = CAL_VIEW.m;
  $("calTitle").textContent = MESI[m] + " " + y;
  const dow = (new Date(y, m, 1).getDay() + 6) % 7;
  const days = new Date(y, m+1, 0).getDate();
  let h = "";
  ["L","M","M","G","V","S","D"].forEach(function(d) { h += '<div class="calDow">' + d + '</div>'; });
  for (let i = 0; i < dow; i++) h += '<div class="calCell empty"></div>';
  for (let d = 1; d <= days; d++) {
    const iso = y + "-" + String(m+1).padStart(2,"0") + "-" + String(d).padStart(2,"0");
    const sel = iso === $("attDate").value ? " sel" : "";
    const dot = SESSION_DATES.has(iso) ? " dot" : "";
    h += '<div class="calCell' + sel + dot + '" onclick="selectDay(\'' + iso + '\')">' + d + '</div>';
  }
  $("calWrap").innerHTML = h;
}

window.calPrev = function() { CAL_VIEW.m--; if (CAL_VIEW.m < 0) { CAL_VIEW.m = 11; CAL_VIEW.y--; } renderCal(); };
window.calNext = function() { CAL_VIEW.m++; if (CAL_VIEW.m > 11) { CAL_VIEW.m = 0; CAL_VIEW.y++; } renderCal(); };
window.quickDay = function(o) { const d = new Date(); d.setDate(d.getDate()+o); selectDay(isoOf(d)); };
window.selectDay = function(iso) { $("attDate").value = iso; renderCal(); loadAttendance(); };

async function loadAttendance() {
  const d = $("attDate").value;
  if (!d) return;
  const meta = { kind: $("attKind").value, place: $("attPlace").value, time: $("attTime").value || null, notes: $("attNotes").value };
  let { data: sess } = await sb.from("sessions").select("*").eq("date", d).maybeSingle();
  if (!sess) {
    const ins = Object.assign({ club_id: CLUB_ID, date: d }, meta);
    const r = await sb.from("sessions").insert(ins).select().single();
    if (r.error) { alert(r.error.message); return; }
    sess = r.data;
  } else {
    await sb.from("sessions").update(meta).eq("id", sess.id);
  }
  CURRENT_SESSION = sess;
  const { data: att } = await sb.from("attendances").select("*").eq("session_id", sess.id);
  const map = {};
  (att || []).forEach(function(a) { map[a.player_id] = a; });
  ATT_STATE = {};
  PLAYERS.forEach(function(p) {
    const a = map[p.id];
    ATT_STATE[p.id] = {
      present: a ? a.present : false,
      with_team: a ? a.with_team : true,
      behavior: a ? (a.behavior || "") : "",
      notes: a ? (a.notes || "") : "",
      reason: a ? (a.reason || "") : ""
    };
  });
  $("attDateLbl").textContent = d.split("-").reverse().join("/");
  $("attCard").classList.remove("hidden");
  $("saveBar").classList.remove("hidden");
  $("saveBarBtn").onclick = saveAttendance;
  $("saveBarBtn").textContent = "💾 Salva presenze";
  renderGrid();
}

function motivoSel(id, s) {
  const isAlt = s.reason && MOTIVI.indexOf(s.reason) === -1;
  const sv = isAlt ? "Altro" : (s.reason || "");
  let h = '<select class="motivoSel" onclick="event.stopPropagation()" onchange="setReason(\'' + id + '\',this.value)"><option value="">Motivo…</option>';
  MOTIVI.forEach(function(m) { h += '<option' + (sv === m ? ' selected' : '') + '>' + m + '</option>'; });
  h += '</select>';
  if (isAlt) h += '<input class="noteIn" onclick="event.stopPropagation()" placeholder="Specifica" value="' + s.reason + '" onchange="setReason(\'' + id + '\',this.value)">';
  return h;
}

function renderGrid() {
  const n = PLAYERS.filter(function(p) { return ATT_STATE[p.id] && ATT_STATE[p.id].present; }).length;
  $("attCount").textContent = "Presenti " + n + "/" + PLAYERS.length;
  $("attGrid").innerHTML = PLAYERS.map(function(p) {
    const s = ATT_STATE[p.id];
    const iz = ((p.first_name||"")[0]||"") + ((p.last_name||"")[0]||"");
    const bg = p.photo_url ? "background-image:url('" + p.photo_url + "')" : "";
    let ex;
    if (s.present) {
      ex = '<div class="miniRow">' +
        '<button class="miniChip ' + (s.with_team ? "on" : "") + '" onclick="event.stopPropagation();setTeamCard(\'' + p.id + '\',true)">⭐</button>' +
        '<button class="miniChip ap ' + (!s.with_team ? "on" : "") + '" onclick="event.stopPropagation();setTeamCard(\'' + p.id + '\',false)">🔹</button>' +
        '</div>';
    } else {
      ex = motivoSel(p.id, s);
    }
    return '<div class="pcard ' + (s.present ? "on" : "off") + '" onclick="tapCard(\'' + p.id + '\')">' +
      '<button class="gear" onclick="event.stopPropagation();openSheet(\'' + p.id + '\')">⚙</button>' +
      '<div class="av" style="' + bg + '">' + (p.photo_url ? "" : iz.toUpperCase()) + '</div>' +
      '<div class="nm">' + p.last_name + '<br>' + p.first_name + '</div>' +
      '<div class="st">' + (s.present ? "PRESENTE" : "ASSENTE") + '</div>' +
      ex + '</div>';
  }).join("");
}

window.tapCard = function(id) { ATT_STATE[id].present = !ATT_STATE[id].present; renderGrid(); };
window.setAll = function(v) { PLAYERS.forEach(function(p) { ATT_STATE[p.id].present = v; }); renderGrid(); };
window.setTeamCard = function(id, v) { ATT_STATE[id].with_team = v; renderGrid(); };
window.setReason = function(id, v) { ATT_STATE[id].reason = v; renderGrid(); };

window.openSheet = function(id) {
  SH_ID = id;
  const p = PLAYERS.find(function(x) { return x.id === id; });
  $("shName").textContent = p.last_name + " " + p.first_name;
  $("sheetBody").innerHTML = '<label>Comportamento</label><div class="chipRow" id="shBeh"></div><label>Note</label><textarea id="shNote">' + (ATT_STATE[id].notes || "") + '</textarea><button class="btn ok" onclick="saveSheet()">💾 Applica</button>';
  renderSheetBeh();
  $("sheet").classList.remove("hidden");
};

function renderSheetBeh() {
  $("shBeh").innerHTML = BEH.map(function(b) {
    return '<button class="chip ' + (ATT_STATE[SH_ID].behavior === b ? "on" : "") + '" onclick="shSetBeh(\'' + b + '\')">' + b + '</button>';
  }).join("");
}

window.shSetBeh = function(b) {
  ATT_STATE[SH_ID].behavior = (ATT_STATE[SH_ID].behavior === b ? "" : b);
  renderSheetBeh();
};

window.closeSheet = function() { $("sheet").classList.add("hidden"); SH_ID = null; };

window.saveSheet = function() {
  if (SH_ID) ATT_STATE[SH_ID].notes = $("shNote").value;
  closeSheet(); renderGrid();
};

window.saveAttendance = async function() {
  if (!CURRENT_SESSION) return;
  await sb.from("sessions").update({ kind: $("attKind").value, place: $("attPlace").value, time: $("attTime").value || null, notes: $("attNotes").value }).eq("id", CURRENT_SESSION.id);
  const rows = PLAYERS.map(function(p) {
    return {
      session_id: CURRENT_SESSION.id,
      player_id: p.id,
      present: ATT_STATE[p.id].present,
      with_team: ATT_STATE[p.id].with_team,
      behavior: ATT_STATE[p.id].behavior,
      notes: ATT_STATE[p.id].notes,
      reason: ATT_STATE[p.id].reason || null
    };
  });
  const { error } = await sb.from("attendances").upsert(rows, { onConflict: "session_id,player_id" });
  if (error) { alert(error.message); return; }
  await loadSessionDates(); renderCal();
  alert("Presenze salvate!");
};

window.showPresReport = async function() { $("presRepCard").classList.remove("hidden"); await loadReport(); };
window.hidePresReport = function() { $("presRepCard").classList.add("hidden"); };

async function loadReport() {
  const { data: sess } = await sb.from("sessions").select("*").eq("club_id", CLUB_ID).order("date");
  if (!sess || !sess.length) { $("repClass").innerHTML = '<div class="spin">Nessuna seduta</div>'; $("repMatrix").innerHTML = ""; return; }
  const ids = sess.map(function(s) { return s.id; });
  const { data: att } = await sb.from("attendances").select("*").in("session_id", ids);
  const map = {};
  (att || []).forEach(function(a) {
    if (!map[a.session_id]) map[a.session_id] = {};
    map[a.session_id][a.player_id] = a;
  });
  const lbl = function(s) { const p = s.date.split("-"); return p[2] + "/" + p[1]; };
  const rows = PLAYERS.map(function(p) {
    let pr = 0, as = 0;
    sess.forEach(function(s) {
      const a = (map[s.id] || {})[p.id];
      if (a) { if (a.present) pr++; else as++; }
    });
    const t = pr + as;
    const pc = t ? Math.round(pr/t*100) : 0;
    let st, cl;
    if (pc === 100) { st = "SEMPRE PRESENTE"; cl = "verde"; }
    else if (pc >= 85) { st = "ASSIDUO"; cl = "verde"; }
    else if (pc >= 50) { st = "A METÀ"; cl = "giallo"; }
    else { st = "ASSENTE"; cl = "rosso"; }
    return { p: p, pr: pr, as: as, pc: pc, st: st, cl: cl };
  }).sort(function(a, b) { return b.pc - a.pc; });
  let html = "<table class='rep'><tr><th>#</th><th>Giocatore</th><th>P</th><th>A</th><th>%</th><th>Stato</th></tr>";
  rows.forEach(function(r, i) {
    html += '<tr><td>' + (i+1) + '</td><td class="nome">' + r.p.last_name + ' ' + r.p.first_name + '</td><td class="ok">' + r.pr + '</td><td class="ko">' + r.as + '</td><td>' + r.pc + '%</td><td><span class="vb ' + r.cl + '">' + r.st + '</span></td></tr>';
  });
  html += "</table>";
  $("repClass").innerHTML = html;
  let html2 = "<table class='rep'><tr><th class='nome'>Gioc.</th>";
  sess.forEach(function(s) { html2 += "<th>" + lbl(s) + "</th>"; });
  html2 += "</tr>";
  PLAYERS.forEach(function(p) {
    html2 += '<tr><td class="nome">' + p.last_name + '</td>';
    sess.forEach(function(s) {
      const a = (map[s.id] || {})[p.id];
      if (!a) html2 += '<td class="na">–</td>';
      else html2 += a.present ? '<td class="ok">✔</td>' : '<td class="ko">✖</td>';
    });
    html2 += "</tr>";
  });
  html2 += "</table>";
  $("repMatrix").innerHTML = html2;
}

async function loadCal() {
  const { data: s } = await sb.from("sessions").select("*").eq("club_id", CLUB_ID);
  const { data: m } = await sb.from("matches").select("*").eq("club_id", CLUB_ID);
  const items = [];
  (s || []).forEach(function(x) { items.push({ d: x.date, t: x.time || "", tipo: "Allenamento", txt: x.kind + " " + (x.place || ""), cls: "blu" }); });
  (m || []).forEach(function(x) { items.push({ d: x.date, t: x.time || "", tipo: "Partita", txt: "vs " + x.opponent, cls: "verde" }); });
  items.sort(function(a, b) { return a.d < b.d ? 1 : -1; });
  if (!items.length) { $("calList").innerHTML = '<div class="spin">Nessun evento</div>'; return; }
  $("calList").innerHTML = items.map(function(i) {
    const p = i.d.split("-");
    return '<div class="calItem"><div class="d">' + p[2] + '/' + p[1] + '<small>' + p[0] + '</small></div><div><span class="vb ' + i.cls + '">' + i.tipo + '</span> <b>' + i.txt + '</b> ' + (i.t || '') + '</div></div>';
  }).join("");
}

async function loadPartite() {
  const { data } = await sb.from("matches").select("*").eq("club_id", CLUB_ID).order("date", { ascending: false });
  PARTITE = data || [];
  if (!PARTITE.length) { $("partList").innerHTML = '<div class="spin">Nessuna partita</div>'; return; }
  $("partList").innerHTML = PARTITE.map(function(m) {
    const sc = (m.score_home != null && m.score_away != null) ? (m.score_home + "-" + m.score_away) : "–";
    return '<div class="partCard" onclick="openPart(\'' + m.id + '\')">' +
      '<div class="pcTop"><span>' + m.date.split("-").reverse().join("/") + ' ' + (m.time || "") + '</span><span>' + m.competition + '</span></div>' +
      '<div class="pcTeams"><span>' + (m.home ? "NOI" : "AVV") + ' vs ' + m.opponent + '</span><span class="pcScore">' + sc + '</span></div>' +
      '<div><span class="vb ' + (m.home ? "verde" : "giallo") + '">' + (m.home ? "CASA" : "TRASF") + '</span><span class="vb blu">' + (m.status || "") + '</span></div></div>';
  }).join("");
}

window.newPart = async function() {
  const o = $("ptOpp").value.trim();
  if (!o) { alert("Avversario?"); return; }
  const ins = {
    club_id: CLUB_ID,
    date: $("ptDate").value,
    time: $("ptTime").value || null,
    opponent: o,
    home: $("ptHome").value === "true",
    competition: $("ptComp").value,
    place: $("ptPlace").value,
    category: "Under 14"
  };
  const { data, error } = await sb.from("matches").insert(ins).select().single();
  if (error) { alert(error.message); return; }
  $("ptOpp").value = "";
  loadPartite();
  openPart(data.id);
};

function populateMatchSelect(id) {
  $(id).innerHTML = PARTITE.map(function(m) {
    return '<option value="' + m.id + '">' + m.date.split("-").reverse().join("/") + ' vs ' + m.opponent + '</option>';
  }).join("");
}

async function openPart(id) {
  const m = PARTITE.find(function(x) { return x.id === id; });
  CUR_PART = m;
  const { data: mp } = await sb.from("match_players").select("*").eq("match_id", id);
  const { data: ev } = await sb.from("match_events").select("*").eq("match_id", id);
  const mpM = {};
  (mp || []).forEach(function(x) { mpM[x.player_id] = x; });
  const gol = {};
  (ev || []).forEach(function(e) { if (e.type === "goal") gol[e.player_id] = (gol[e.player_id] || 0) + 1; });
  PART_STATE = {};
  PLAYERS.forEach(function(p) {
    const x = mpM[p.id];
    PART_STATE[p.id] = {
      starter: x ? x.starter : false,
      convocated: x ? x.convocated : true,
      gol: gol[p.id] || 0
    };
  });
  $("partListWrap").classList.add("hidden");
  $("partDetail").classList.remove("hidden");
  $("pdTitle").textContent = (m.home ? "Casa" : "Trasf") + " vs " + m.opponent;
  $("pdGolHome").value = m.score_home != null ? m.score_home : "";
  $("pdGolAway").value = m.score_away != null ? m.score_away : "";
  $("pdTags").innerHTML = '<span class="vb ' + (m.home ? "verde" : "giallo") + '">' + (m.home ? "CASA" : "TRASF") + '</span><span class="vb blu">' + m.competition + '</span>';
  renderRoster();
  $("saveBar").classList.remove("hidden");
  $("saveBarBtn").onclick = savePart;
  $("saveBarBtn").textContent = "💾 Salva partita";
}

function renderRoster() {
  $("pdRoster").innerHTML = PLAYERS.map(function(p) {
    const s = PART_STATE[p.id];
    return '<div class="formRow"><div class="fn">' + (p.jersey_number ? "#" + p.jersey_number + " " : "") + p.last_name + ' ' + p.first_name + '</div>' +
      '<div class="st3">' +
      '<button class="' + (s.starter ? "on" : "") + '" onclick="setStato(\'' + p.id + '\',\'T\')">Tit</button>' +
      '<button class="' + (!s.starter && s.convocated ? "on" : "") + '" onclick="setStato(\'' + p.id + '\',\'P\')">Pan</button>' +
      '<button class="' + (!s.convocated ? "on" : "") + '" onclick="setStato(\'' + p.id + '\',\'F\')">Fuori</button>' +
      '</div><div class="stepper">' +
      '<button onclick="addGol(\'' + p.id + '\',-1)">−</button>' +
      '<span>⚽' + s.gol + '</span>' +
      '<button onclick="addGol(\'' + p.id + '\',1)">+</button>' +
      '</div></div>';
  }).join("");
}

window.setStato = function(id, v) {
  const s = PART_STATE[id];
  if (v === "T") { s.starter = true; s.convocated = true; }
  if (v === "P") { s.starter = false; s.convocated = true; }
  if (v === "F") { s.starter = false; s.convocated = false; }
  renderRoster();
};

window.addGol = function(id, d) { PART_STATE[id].gol = Math.max(0, PART_STATE[id].gol + d); renderRoster(); };

window.closePart = function() {
  $("partDetail").classList.add("hidden");
  $("partListWrap").classList.remove("hidden");
  $("saveBar").classList.add("hidden");
  loadPartite();
};

window.savePart = async function() {
  if (!CUR_PART) return;
  await sb.from("matches").update({ score_home: parseInt($("pdGolHome").value) || 0, score_away: parseInt($("pdGolAway").value) || 0 }).eq("id", CUR_PART.id);
  const rows = PLAYERS.map(function(p) {
    return { match_id: CUR_PART.id, player_id: p.id, starter: PART_STATE[p.id].starter, convocated: PART_STATE[p.id].convocated };
  });
  await sb.from("match_players").upsert(rows, { onConflict: "match_id,player_id" });
  for (const p of PLAYERS) {
    await sb.from("match_events").delete().eq("match_id", CUR_PART.id).eq("player_id", p.id).eq("type", "goal");
    const g = PART_STATE[p.id].gol;
    if (g > 0) {
      const evs = [];
      for (let i = 0; i < g; i++) evs.push({ match_id: CUR_PART.id, player_id: p.id, type: "goal", half: 1 });
      await sb.from("match_events").insert(evs);
    }
  }
  alert("Partita salvata!");
  closePart();
};

window.openForm = async function() {
  const id = $("fmMatch").value;
  if (!id) return;
  CUR_PART = PARTITE.find(function(x) { return x.id === id; });
  const { data: mp } = await sb.from("match_players").select("*").eq("match_id", id);
  const mpM = {};
  (mp || []).forEach(function(x) { mpM[x.player_id] = x; });
  PART_STATE = {};
  PLAYERS.forEach(function(p) {
    const x = mpM[p.id];
    PART_STATE[p.id] = { starter: x ? x.starter : false, convocated: x ? x.convocated : true, gol: 0 };
  });
  refreshForm();
};

function refreshForm() {
  $("fmRoster").innerHTML = PLAYERS.map(function(p) {
    const s = PART_STATE[p.id];
    return '<div class="formRow"><div class="fn">' + p.last_name + ' ' + p.first_name + '</div>' +
      '<div class="st3">' +
      '<button class="' + (s.starter ? "on" : "") + '" onclick="setStato(\'' + p.id + '\',\'T\');refreshForm()">Tit</button>' +
      '<button class="' + (!s.starter && s.convocated ? "on" : "") + '" onclick="setStato(\'' + p.id + '\',\'P\');refreshForm()">Pan</button>' +
      '<button class="' + (!s.convocated ? "on" : "") + '" onclick="setStato(\'' + p.id + '\',\'F\');refreshForm()">Fuori</button>' +
      '</div></div>';
  }).join("");
}
window.openFormRefresh = refreshForm;

window.saveForm = async function() {
  if (!CUR_PART) return;
  const rows = PLAYERS.map(function(p) {
    return { match_id: CUR_PART.id, player_id: p.id, starter: PART_STATE[p.id].starter, convocated: PART_STATE[p.id].convocated };
  });
  await sb.from("match_players").upsert(rows, { onConflict: "match_id,player_id" });
  alert("Formazione salvata!");
};

window.loadSubs = async function() {
  const id = $("sbMatch").value;
  populatePlayersSelect("sbOut");
  populatePlayersSelect("sbIn");
  const { data } = await sb.from("match_events").select("*").eq("match_id", id).eq("type", "sub_in").order("minute");
  if (!data || !data.length) { $("sbList").innerHTML = '<div class="spin">Nessuna sostituzione</div>'; return; }
  $("sbList").innerHTML = data.map(function(e) {
    return '<div class="evItem"><span>🔄 ' + nome(e.player_id) + ' entra</span><span>' + e.minute + "' " + e.half + '°T</span></div>';
  }).join("");
};

function populatePlayersSelect(id) {
  $(id).innerHTML = PLAYERS.map(function(p) { return '<option value="' + p.id + '">' + p.last_name + ' ' + p.first_name + '</option>'; }).join("");
}

window.addSub = async function() {
  const id = $("sbMatch").value;
  if (!id) return;
  const min = parseInt($("sbMin").value) || 0;
  const half = parseInt($("sbHalf").value);
  await sb.from("match_events").insert([
    { match_id: id, player_id: $("sbOut").value, type: "sub_out", minute: min, half: half },
    { match_id: id, player_id: $("sbIn").value, type: "sub_in", minute: min, half: half }
  ]);
  loadSubs();
};

window.renderDist = function() { const id = $("dsMatch").value; const m = PARTITE.find(function(x) { return x.id === id; }); if (m) buildDoc("dsOut", m, true); };
window.renderConv = function() { const id = $("cvMatch").value; const m = PARTITE.find(function(x) { return x.id === id; }); if (m) buildDoc("cvOut", m, false); };

function buildDoc(el, m, isDistinta) {
  sb.from("match_players").select("*").eq("match_id", m.id).then(function(r) {
    const conv = (r.data || []).filter(function(x) { return x.convocated; });
    const rows = PLAYERS.filter(function(p) { return conv.find(function(c) { return c.player_id === p.id; }); }).sort(function(a, b) { return (a.jersey_number || 99) - (b.jersey_number || 99); });
    let html = '<h2>' + (isDistinta ? "DISTINTA" : "CONVOCAZIONI") + ' — ' + m.opponent + '</h2>';
    html += '<p style="font-size:13px;color:#475569">' + m.date.split("-").reverse().join("/") + ' ' + (m.time || "") + ' — ' + (m.place || "") + ' (' + (m.home ? "Casa" : "Trasferta") + ')</p>';
    html += '<table class="rep" style="margin-top:10px"><tr><th>N°</th><th>Giocatore</th><th>Doc</th></tr>';
    rows.forEach(function(p) { html += '<tr><td>' + (p.jersey_number || "") + '</td><td class="nome">' + p.last_name + ' ' + p.first_name + '</td><td>' + (p.doc_id || "") + '</td></tr>'; });
    html += '</table>';
    $(el).innerHTML = html;
  });
}

function renderFoto() {
  $("fotoGrid").innerHTML = PLAYERS.map(function(p) {
    const iz = ((p.first_name||"")[0]||"") + ((p.last_name||"")[0]||"");
    const bg = p.photo_url ? "background-image:url('" + p.photo_url + "')" : "";
    return '<div class="fotoCell"><div class="f" style="' + bg + '">' + (p.photo_url ? "" : iz.toUpperCase()) + '</div><div class="n">' + p.last_name + '</div></div>';
  }).join("");
}

function renderLiveBanner() {
  const b = $("liveBanner");
  if (LIVE && LIVE.matchId) {
    const m = PARTITE.find(function(x) { return x.id === LIVE.matchId; });
    if (m) { b.classList.remove("hidden"); $("lbText").textContent = "Partita in corso: " + m.opponent + " " + liveScore(); return; }
  }
  b.classList.add("hidden");
}

function liveScore() { if (!LIVE) return ""; return (LIVE.home || 0) + "-" + (LIVE.away || 0); }

function renderLive() {
  populateMatchSelect("lvMatch");
  if (LIVE && LIVE.matchId) {
    $("liveStart").classList.add("hidden");
    $("liveBox").classList.remove("hidden");
    const m = PARTITE.find(function(x) { return x.id === LIVE.matchId; });
    $("lvTitle").textContent = "vs " + (m ? m.opponent : "");
    populatePlayersSelect("lvPlayer");
    updateClock();
    renderLiveEvents();
    $("lvPlay").textContent = LIVE.running ? "⏸ Pausa" : "▶ Avvia";
  } else {
    $("liveStart").classList.remove("hidden");
    $("liveBox").classList.add("hidden");
  }
}

window.startLive = async function() {
  const id = $("lvMatch").value;
  if (!id) return;
  LIVE = { matchId: id, clock: 0, half: 1, running: false, home: 0, away: 0 };
  SETTINGS.live = LIVE;
  await persistSettings();
  await sb.from("matches").update({ status: "live" }).eq("id", id);
  renderLive();
  renderLiveBanner();
};

window.resumeLive = function() { showTab("live"); };

window.toggleLive = async function() {
  if (!LIVE) return;
  LIVE.running = !LIVE.running;
  SETTINGS.live = LIVE;
  await persistSettings();
  if (LIVE.running) {
    LIVE_TIMER = setInterval(function() {
      LIVE.clock++;
      updateClock();
      if (LIVE.clock % 5 === 0) { SETTINGS.live = LIVE; persistSettings(); }
    }, 1000);
  } else {
    clearInterval(LIVE_TIMER);
  }
  $("lvPlay").textContent = LIVE.running ? "⏸ Pausa" : "▶ Avvia";
};

window.nextHalf = async function() {
  if (!LIVE) return;
  LIVE.half = 2;
  SETTINGS.live = LIVE;
  await persistSettings();
  $("lvHalf").textContent = "2° Tempo";
};

function updateClock() {
  if (!LIVE) return;
  const m = Math.floor(LIVE.clock / 60), s = LIVE.clock % 60;
  $("lvClock").textContent = String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0");
  $("lvHalf").textContent = (LIVE.half === 1 ? "1°" : "2°") + " Tempo";
}

window.liveEvent = async function(t) {
  if (!LIVE) return;
  const pid = $("lvPlayer").value;
  const min = Math.floor(LIVE.clock / 60);
  await sb.from("match_events").insert({ match_id: LIVE.matchId, player_id: pid, type: t, minute: min, half: LIVE.half });
  if (t === "goal") LIVE.home = (LIVE.home || 0) + 1;
  if (t === "goal_against") LIVE.away = (LIVE.away || 0) + 1;
  SETTINGS.live = LIVE;
  await persistSettings();
  renderLiveEvents();
  renderLiveBanner();
};

async function renderLiveEvents() {
  if (!LIVE) return;
  const { data } = await sb.from("match_events").select("*").eq("match_id", LIVE.matchId).order("created_at", { ascending: false });
  const ic = { goal: "⚽", assist: "🎯", save: "🧤", yellow: "🟨", red: "🟥", shot: "💥", goal_against: "🥅", sub_in: "🔄 entra", sub_out: "🔄 esce" };
  if (!data || !data.length) { $("lvEvents").innerHTML = '<div class="spin">Nessun evento</div>'; return; }
  $("lvEvents").innerHTML = data.map(function(e) {
    return '<div class="evItem"><span>' + (ic[e.type] || "") + ' ' + nome(e.player_id) + '</span><span>' + (e.minute || 0) + "' " + (e.half || 1) + '°T</span></div>';
  }).join("");
}

window.openSubSheet = function() {
  if (!LIVE) return;
  $("shName").textContent = "Sostituzione";
  $("sheetBody").innerHTML = '<label>Esce</label><select id="shOut">' + PLAYERS.map(function(p) { return '<option value="' + p.id + '">' + p.last_name + ' ' + p.first_name + '</option>'; }).join("") + '</select>' +
    '<label>Entra</label><select id="shIn">' + PLAYERS.map(function(p) { return '<option value="' + p.id + '">' + p.last_name + ' ' + p.first_name + '</option>'; }).join("") + '</select>' +
    '<button class="btn ok" onclick="doLiveSub()">🔄 Conferma</button>';
  $("sheet").classList.remove("hidden");
};

window.doLiveSub = async function() {
  const min = Math.floor(LIVE.clock / 60);
  await sb.from("match_events").insert([
    { match_id: LIVE.matchId, player_id: $("shOut").value, type: "sub_out", minute: min, half: LIVE.half },
    { match_id: LIVE.matchId, player_id: $("shIn").value, type: "sub_in", minute: min, half: LIVE.half }
  ]);
  closeSheet();
  renderLiveEvents();
};

window.stopLive = async function() {
  if (!LIVE) return;
  if (!confirm("Terminare la partita live?")) return;
  clearInterval(LIVE_TIMER);
  await sb.from("matches").update({ status: "completed", score_home: LIVE.home, score_away: LIVE.away }).eq("id", LIVE.matchId);
  LIVE = null;
  SETTINGS.live = null;
  await persistSettings();
  renderLive();
  renderLiveBanner();
  loadPartite();
};

async function loadRegistro() {
  const { data: ms } = await sb.from("matches").select("*").eq("club_id", CLUB_ID);
  const ids = (ms || []).map(function(m) { return m.id; });
  let ev = [], mp = [];
  if (ids.length) {
    ev = (await sb.from("match_events").select("*").in("match_id", ids)).data || [];
    mp = (await sb.from("match_players").select("*").in("match_id", ids)).data || [];
  }
  let V = 0, P = 0, S = 0, GF = 0, GS = 0;
  (ms || []).forEach(function(m) {
    if (m.score_home == null) return;
    GF += m.score_home; GS += m.score_away;
    if (m.score_home > m.score_away) V++;
    else if (m.score_home === m.score_away) P++;
    else S++;
  });
  $("regKpi").innerHTML = '<div><b>' + V + '</b><small>VITT</small></div><div><b>' + P + '</b><small>PAREG</small></div><div><b>' + S + '</b><small>SCONF</small></div><div><b>' + GF + '-' + GS + '</b><small>GOL</small></div>';
  const gol = {};
  ev.forEach(function(e) { if (e.type === "goal") gol[e.player_id] = (gol[e.player_id] || 0) + 1; });
  const gRows = Object.keys(gol).map(function(id) { return { id: id, n: gol[id] }; }).sort(function(a, b) { return b.n - a.n; });
  if (gRows.length) {
    let html = "<table class='rep'><tr><th>#</th><th>Giocatore</th><th>Gol</th></tr>";
    gRows.forEach(function(r, i) { html += '<tr><td>' + (i+1) + '</td><td class="nome">' + nome(r.id) + '</td><td class="ok">' + r.n + '</td></tr>'; });
    html += "</table>";
    $("regGol").innerHTML = html;
  } else {
    $("regGol").innerHTML = '<div class="spin">Nessun gol</div>';
  }
  const pres = {};
  mp.forEach(function(x) { if (x.convocated) pres[x.player_id] = (pres[x.player_id] || 0) + 1; });
  let html2 = "<table class='rep'><tr><th>Giocatore</th><th>Pres</th></tr>";
  PLAYERS.map(function(p) { return { p: p, n: pres[p.id] || 0 }; }).sort(function(a, b) { return b.n - a.n; }).forEach(function(r) {
    html2 += '<tr><td class="nome">' + r.p.last_name + ' ' + r.p.first_name + '</td><td class="ok">' + r.n + '</td></tr>';
  });
  html2 += "</table>";
  $("regPresPart").innerHTML = html2;
  const { data: sess } = await sb.from("sessions").select("*").eq("club_id", CLUB_ID);
  const sids = (sess || []).map(function(s) { return s.id; });
  let att = [];
  if (sids.length) att = (await sb.from("attendances").select("*").in("session_id", sids)).data || [];
  const pa = {};
  att.forEach(function(a) { if (a.present) pa[a.player_id] = (pa[a.player_id] || 0) + 1; });
  let html3 = "<table class='rep'><tr><th>Giocatore</th><th>Pres</th></tr>";
  PLAYERS.map(function(p) { return { p: p, n: pa[p.id] || 0 }; }).sort(function(a, b) { return b.n - a.n; }).forEach(function(r) {
    html3 += '<tr><td class="nome">' + r.p.last_name + ' ' + r.p.first_name + '</td><td class="ok">' + r.n + '</td></tr>';
  });
  html3 += "</table>";
  $("regPresAll").innerHTML = html3;
}

$("attDate").value = isoOf(new Date());
$("ptDate").value = isoOf(new Date());
boot();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(function(){});