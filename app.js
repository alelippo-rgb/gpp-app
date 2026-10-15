import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
const SUPABASE_URL="https://htglhehtfubypwlgpyep.supabase.co";
const SUPABASE_ANON="sb_publishable_9Zhmj-kaHyEmR55rIefPGw_SAqmFGg3";
const sb=createClient(SUPABASE_URL,SUPABASE_ANON);

function svgURI(s){return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(s);}
const BALL=svgURI('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#fff" stroke="#111" stroke-width="1.6"/><path d="M16 9l6 4.4-2.3 7h-7.4l-2.3-7z" fill="#111"/><path d="M16 1.2l3.4 4.4L16 8 12.6 5.6z" fill="#111"/><path d="M29.6 10.4l-4.6 1.4-.8-4.6 3-2.2z" fill="#111"/><path d="M2.4 10.4l4.6 1.4.8-4.6-3-2.2z" fill="#111"/><path d="M24.8 28.4l-3.2-3.4 3.4-3 3 2.4z" fill="#111"/><path d="M7.2 28.4l3.2-3.4-3.4-3-3 2.4z" fill="#111"/></svg>');
const LOGO_DEFAULT=svgURI('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="100" cy="100" r="96" fill="#fff" stroke="#c8963e" stroke-width="6"/><path d="M100 4a96 96 0 0 1 0 192z" fill="#14508c"/><path d="M52 52l6-10 6 8 6-10 6 8 6-10 6 8 6-10 6 10-4 8h-44z" fill="#c8963e"/><ellipse cx="76" cy="63" rx="22" ry="6" fill="#c8963e"/><path d="M56 72h40v32q0 12-20 18-20-6-20-18z" fill="#fff" stroke="#c8963e" stroke-width="3"/><g fill="#d22630"><rect x="60" y="78" width="32" height="5"/><rect x="60" y="92" width="32" height="5"/><rect x="60" y="106" width="32" height="5"/></g><text x="148" y="84" fill="#fff" font-family="Arial" font-size="13" font-weight="700" text-anchor="middle">A.S.D.</text><text x="148" y="106" fill="#fff" font-family="Arial Black,Arial" font-size="21" font-weight="900" text-anchor="middle">BORGARO</text><text x="148" y="122" fill="#fff" font-family="Arial" font-size="11" font-weight="700" text-anchor="middle">AUTOINGROS</text></svg>');
const LOGO_FIGC=svgURI('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 110"><g fill="#1e50a0"><path d="M30 10l4 8 9 1-6 6 1 9-8-4-8 4 1-9-6-6 9-1z"/><path d="M52 5l4 8 9 1-6 6 1 9-8-4-8 4 1-9-6-6 9-1z"/><path d="M74 5l4 8 9 1-6 6 1 9-8-4-8 4 1-9-6-6 9-1z"/><path d="M96 10l4 8 9 1-6 6 1 9-8-4-8 4 1-9-6-6 9-1z"/></g><circle cx="62" cy="62" r="34" fill="none" stroke="#1e50a0" stroke-width="7"/><rect x="46" y="36" width="10" height="18" fill="#009246"/><rect x="56" y="36" width="12" height="18" fill="#fff"/><rect x="68" y="36" width="10" height="18" fill="#ce2b37"/><rect x="46" y="70" width="10" height="18" fill="#009246"/><rect x="56" y="70" width="12" height="18" fill="#fff"/><rect x="68" y="70" width="10" height="18" fill="#ce2b37"/><text x="62" y="66" fill="#1e50a0" font-family="Arial Black,Arial" font-size="15" font-weight="900" text-anchor="middle">FIGC</text><text x="62" y="76" fill="#1e50a0" font-family="Arial" font-size="7" font-weight="700" text-anchor="middle">ITALIA</text><text x="24" y="102" fill="#1e50a0" font-family="Arial" font-size="9" font-weight="700">SETTORE GIOVANILE E SCOLASTICO</text><text x="150" y="42" fill="#1e50a0" font-family="Arial Black,Arial" font-size="27" font-weight="900">SETTORE</text><text x="150" y="72" fill="#1e50a0" font-family="Arial Black,Arial" font-size="27" font-weight="900">GIOVANILE</text><rect x="178" y="24" width="42" height="15" fill="#1e50a0"/><text x="199" y="35" fill="#fff" font-family="Arial" font-size="10" font-weight="700" text-anchor="middle">CLUB</text></svg>');
const LOGO_LND=svgURI('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 150"><path d="M60 4L112 20V70q0 40-52 74Q8 110 8 70V20z" fill="#1e50a0" stroke="#fff" stroke-width="5"/><path d="M60 11L105 25V70q0 35-45 64Q15 105 15 70V25z" fill="#1e50a0" stroke="#0d2f6b" stroke-width="2"/><rect x="32" y="15" width="18" height="6" fill="#009246"/><rect x="50" y="15" width="20" height="6" fill="#fff"/><rect x="70" y="15" width="18" height="6" fill="#ce2b37"/><text x="60" y="26" fill="#fff" font-family="Arial" font-size="9" font-weight="700" text-anchor="middle">FIGC</text><text x="60" y="64" fill="#fff" font-family="Arial Black,Arial" font-size="34" font-weight="900" text-anchor="middle">LND</text><text x="60" y="82" fill="#fff" font-family="Arial" font-size="9" font-weight="700" text-anchor="middle">LEGA NAZIONALE</text><text x="60" y="93" fill="#fff" font-family="Arial" font-size="9" font-weight="700" text-anchor="middle">DILETTANTI</text><circle cx="60" cy="114" r="13" fill="#fff"/></svg>');
const LOGO_AUTOINGROS=svgURI('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 60"><g transform="skewX(-14)"><rect x="14" y="6" width="9" height="48" fill="#009246"/><rect x="25" y="6" width="9" height="48" fill="#ce2b37"/></g><text x="44" y="47" fill="#1b2f55" font-family="Arial Black,Arial" font-size="42" font-weight="900" letter-spacing="3">AUTOINGROS</text></svg>');

const DEFAULT_CLUB={nome:"A.S.D. BORGARO AUTOINGROS",den:"A.S.D. Borgaro Autoingros",addr:"Via Santa Cristina 16 – 10071 – Borgaro Torinese (TO)",tel:"011 4703268",mail:"segreteria@fcborgaro1965.it",pec:"postmaster@pec.fcborgaro1965.it",piva:"P.IVA 039396940018",matricola:"78854",coni:"39272",logo:"",c1:"#1e3a8a",c2:"#c8102e",acc:"#facc15"};
const RUOLI_STAFF=["DIRIGENTE ACCOMPAGNATORE UFFICIALE","ALLENATORE","ALLENATORE IN SECONDA","MEDICO SOCIALE","OPERATORE SANITARIO AUSILIARIO","ASSISTENTE DI LINEA DI SOCIETA'","DIRIGENTE ADDETTO AGLI UFF. DI GARA"];
const STAFF_LAB={"MEDICO SOCIALE":["DOC o TESS. FIGC","TESS. O.D.M."],"DEFAULT":["TESS. FIGC","DOCUMENTO N."]};
const MOTIVI_CONV=["","NON DISPONIBILE","INFORTUNATO","MALATO","VIAGGIO","SCUOLA","FAMIGLIA","PERMESSO","ALTRO"];
const EV_LABEL={goal:"⚽ Gol",assist:"🎯 Assist",shot:"💥 Tiro",save:"🧤 Parata",goal_against:"🥅 Gol subito",yellow:"🟨 Ammonizione",red:"🟥 Espulsione",sub_out:"🔄 Esce / Sost.",sub_in:"🔄 Entra in campo"};
const ACT_ICON={assist:"🎯",shot:"💥",save:"🧤",goal_against:"🥅"};
const MAX_SUBS=7;
const MODULI={
  "4-4-2":[[1],[4],[4],[2]],
  "4-3-3":[[1],[4],[3],[3]],
  "3-5-2":[[1],[3],[5],[2]],
  "5-3-2":[[1],[5],[3],[2]],
  "4-2-3-1":[[1],[4],[2],[3],[1]],
  "4-1-4-1":[[1],[4],[1],[4],[1]]
};

const DOC_CSS=
".docWrap{width:100%;max-width:190mm;margin:0 auto;background:#fff;border:2px solid #000;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#000}"+
".distSpacer{height:8px}"+
".distBar{background:#c9c9c9;text-align:center;font-weight:800;font-size:13px;padding:4px;border:1px solid #000}"+
".distBarLight{background:#d9d9d9;text-align:center;font-weight:600;font-size:11px;padding:3px;border:1px solid #000}"+
".distBarLight.bold{font-weight:900;font-size:13px}"+
".distDecl{font-size:8px;text-align:center;padding:4px 6px;border:1px solid #000;line-height:1.3}"+
".distSign{display:flex;border:1px solid #000}"+
".distSign div{flex:1;text-align:center;font-weight:800;font-size:10px;padding:12px 4px}"+
".distSign div+div{border-left:1px solid #000}"+
".docMetaRow{display:flex;flex-wrap:wrap;border:1px solid #000;margin-top:-1px;font-size:10px}"+
".docMetaRow .lbl{background:#d9d9d9;font-weight:800;padding:3px 5px;border-right:1px solid #000;white-space:nowrap}"+
".docMetaRow .val{flex:1;min-width:60px;padding:3px 5px}"+
".docScroll{overflow-x:auto}"+
"table.docGrid{width:100%;min-width:600px;border-collapse:collapse;table-layout:fixed}"+
"table.docGrid th{background:#d9d9d9;border:1px solid #000;font-size:8px;font-weight:800;padding:2px}"+
"table.docGrid td{border:1px solid #000;font-size:10px;padding:2px 3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"+
"table.docGrid td.rl{background:#d9d9d9;font-weight:800;font-size:8px;white-space:normal}"+
"table.docGrid td.lb{background:#d9d9d9;font-weight:800;font-size:8px}"+
"table.docGrid select{width:100%;font-size:10px;padding:3px 2px;border:1px solid #999;border-radius:3px;background:#fff}"+
"table.docGrid input.capIn{width:100%;font-size:10px;padding:3px 2px;border:1px solid #999;border-radius:3px;background:#fff}"+
".col-matr,.col-tess{display:none}"+
".docBtns{display:flex;gap:8px;margin:10px 0}.docBtns .btn{margin:0}"+
".convWrap{border:2px solid #000}"+
".convHead{display:flex;align-items:stretch}"+
".convHead .logoBox{width:110px;padding:4px;background:#fff;border:2px solid #1f3864;border-bottom:none;display:flex;flex-direction:column;align-items:center;justify-content:center}"+
".convHead .logoBox img{width:74px;height:74px;object-fit:contain}"+
".convHead .logoBox .aut{font-size:8px;font-weight:900;color:#c00000;letter-spacing:1px;margin-top:2px}"+
".convHead .titleBox{flex:1;background:#b9c4ea;border:2px solid #1f3864;border-left:none;border-bottom:none;display:flex;align-items:center;justify-content:center;padding:8px;overflow:hidden}"+
".convHead .titleBox span{font-family:'Arial Black',Arial,sans-serif;color:#1f3864;font-size:clamp(13px,3.4vw,26px);letter-spacing:5px;font-weight:900;white-space:nowrap}"+
".convYellow{background:#ffff00;text-align:center;font-weight:900;font-size:clamp(14px,3vw,22px);letter-spacing:2px;padding:5px;border:3px solid #1f3864;color:#000}"+
"table.convMeta{width:100%;border-collapse:collapse;font-size:11px;border:1px solid #000}"+
".convMeta th{background:#d9d9d9;border:1px solid #000;text-align:left;font-size:9px;padding:3px 5px;width:82px;font-weight:800}"+
".convMeta td{border:1px solid #000;padding:3px 6px}"+
".convMeta .center{text-align:center}"+
"table.convGrid{width:100%;min-width:560px;border-collapse:collapse;font-size:11px}"+
".convGrid th{border:1px solid #000;padding:4px 2px;font-size:9px;background:#d9d9d9;font-weight:800}"+
".convGrid td{border:1px solid #000;padding:2px 4px;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"+
".convGrid select{width:100%;font-size:10px;border:1px solid #bbb;background:#ececec;border-radius:2px;padding:2px}"+
".convNote{border-top:3px solid #ffff00;border-bottom:3px solid #1f3864;padding:4px 6px;font-size:8.5px;text-align:center;line-height:1.4;color:#000}"+
".convSign{display:flex;border:1px solid #000;border-top:none}"+
".convSign div{padding:6px 8px;font-weight:800;font-size:11px}"+
".convSign .l{flex:1;border-right:1px solid #000}"+
".convSign .m{flex:1;border-right:1px solid #000}"+
".convSign .r{flex:1}"+
"@media (min-width:700px){.col-matr,.col-tess{display:table-cell}.docWrap{font-size:11px}}"+
"@media print{.docWrap{width:190mm;max-width:none;font-size:9pt}.docScroll{overflow:visible}table.docGrid{table-layout:auto;min-width:0}table.docGrid th{font-size:8pt}table.docGrid td{font-size:8.5pt;white-space:normal}table.docGrid select{font-size:8.5pt;border:none;background:transparent;padding:0}table.docGrid input.capIn{font-size:8.5pt;border:none;background:transparent;padding:0}.col-matr,.col-tess{display:table-cell}.docMetaRow{font-size:8.5pt;flex-wrap:nowrap}.distDecl{font-size:7pt}.distSign div{font-size:9pt}.convHead .titleBox span{font-size:17pt;letter-spacing:4px}.convYellow{font-size:15pt}.convNote{font-size:7pt}.convGrid td,.convGrid th{font-size:8.5pt}table.convGrid{min-width:0}.convMeta th,.convMeta td{font-size:8.5pt}.noPrint{display:none!important}.distSpacer{height:5px}}";

let ALL_PLAYERS=[],ROSA_DATA=[],PLAYERS=[],PARTITE=[],TEAMS=[],STAFF=[],CLUB_ID=null,CURRENT_SESSION=null,EDIT_ID=null,ATT_STATE={},PART_STATE={},SETTINGS={},SESSION_DATES=new Set(),CONV_STATE={},CONV_OVERRIDE=false,DOC_STAFF={},DOC_ROWS=[],DOC_ROWS_MATCH=null,DOC_CAPS={},DOC_ELENCO=[],CAL_ALL=null,LIVE_MP={},LIVE_EV=[];
let CAL_VIEW={y:new Date().getFullYear(),m:new Date().getMonth()};
let PM_CAL={y:new Date().getFullYear(),m:new Date().getMonth()};
let FOTO_NP=null,FOTO_ED=null,SH_ID=null,CUR_PART=null,CUR_DOC_MATCH=null,DOC_MODE="dist";
let LIVE=null,LIVE_UI_TIMER=null,REAL_SEC=0,PM_SUB_SLOTS=7,VIEW_STACK=[],LIVE_SEL=null,AUDIO_CTX=null;
let CALGEN={y:new Date().getFullYear(),m:new Date().getMonth()};
let CALGEN_DATA=null;
let CALGEN_SEL=null;
const MESI=["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
const BEH=["Eccellente","Buono","Discreto","Insufficiente"];
const MOTIVI=["Malato","Infortunato","Viaggio","Scuola","Famiglia","Permesso","Altro"];
const $=id=>document.getElementById(id);

function clubInfo(){return Object.assign({},DEFAULT_CLUB,SETTINGS.club||{});}
function clubLogo(){const ci=clubInfo();return ci.logo||LOGO_DEFAULT;}
function fmtTime(t){if(!t)return "";const s=String(t);return s.length>=5?s.slice(0,5):s;}
function msg(id,t,ok){const e=$(id);if(e){e.className="msg "+(ok?"ok":"err");e.textContent=t;}}
function isoOf(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
function normDate(s){s=String(s||"").trim();if(!s)return null;let m=s.match(/^(\d{4})-(\d{2})-(\d{2})/);if(m)return m[1]+"-"+m[2]+"-"+m[3];m=s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);if(m)return m[3]+"-"+("0"+m[2]).slice(-2)+"-"+("0"+m[1]).slice(-2);return null;}
function statoVisita(d){if(!d)return{txt:"senza visita",cls:"giallo"};const o=new Date();o.setHours(0,0,0,0);const g=Math.round((new Date(d+"T00:00:00")-o)/86400000);if(g<0)return{txt:"SCADUTA da "+(-g)+" gg",cls:"rosso"};if(g<=60)return{txt:"scade tra "+g+" gg",cls:"giallo"};return{txt:"valida "+g+" gg",cls:"verde"};}
function pById(id){return ALL_PLAYERS.find(function(x){return x.id===id;})||PLAYERS.find(function(x){return x.id===id;});}
function nome(id){const p=pById(id);return p?(p.last_name+" "+p.first_name):"?";}
function cognomeOf(id){const p=pById(id);return p?p.last_name:"?";}
function numDi(id){const p=pById(id);return p?(p.jersey_number||"-"):"-";}
function compressFoto(f,cb){const r=new FileReader();r.onload=function(e){const i=new Image();i.onload=function(){const M=400;let w=i.width,h=i.height;if(w>h){if(w>M){h=h*M/w;w=M;}}else{if(h>M){w=w*M/h;h=M;}}const c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(i,0,0,w,h);cb(c.toDataURL("image/jpeg",0.7));};i.src=e.target.result;};r.readAsDataURL(f);}
function compressLogo(f,cb){const r=new FileReader();r.onload=function(e){const i=new Image();i.onload=function(){const M=512;let w=i.width,h=i.height;if(w>h){if(w>M){h=h*M/w;w=M;}}else{if(h>M){w=w*M/h;h=M;}}const c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(i,0,0,w,h);cb(c.toDataURL("image/png"));};i.src=e.target.result;};r.readAsDataURL(f);}
window.previewFoto=function(p,id){const f=$(p+"Foto").files[0];if(!f)return;compressFoto(f,function(d){$(id).style.backgroundImage="url("+d+")";$(id).textContent="";if(p==="np"){FOTO_NP=d;}else{FOTO_ED=d;}});};
function playWhistle(){
  try{
    if(!AUDIO_CTX)AUDIO_CTX=new (window.AudioContext||window.webkitAudioContext)();
    const ctx=AUDIO_CTX;const t=ctx.currentTime;
    for(let b=0;b<2;b++){
      const o=ctx.createOscillator();const g=ctx.createGain();
      o.type="square";
      o.frequency.setValueAtTime(2300,t+b*0.35);
      o.frequency.setValueAtTime(2650,t+b*0.35+0.12);
      g.gain.setValueAtTime(0.0001,t+b*0.35);
      g.gain.exponentialRampToValueAtTime(0.35,t+b*0.35+0.02);
      g.gain.exponentialRampToValueAtTime(0.0001,t+b*0.35+0.3);
      o.connect(g);g.connect(ctx.destination);
      o.start(t+b*0.35);o.stop(t+b*0.35+0.32);
    }
  }catch(e){}
}
function vibrateNow(){try{if(navigator.vibrate)navigator.vibrate([250,120,250]);}catch(e){}}

function normalizeLive(){
  if(!LIVE)return;
  if(!Array.isArray(LIVE.halfDurations)||!LIVE.halfDurations.length)LIVE.halfDurations=[35*60,35*60];
  if(LIVE.half==null||LIVE.half<1)LIVE.half=1;
  if(LIVE.half>LIVE.halfDurations.length)LIVE.half=LIVE.halfDurations.length;
  if(!LIVE.phase)LIVE.phase="idle";
  if(LIVE.accumulated==null)LIVE.accumulated=0;
  if(LIVE.runStart===undefined)LIVE.runStart=null;
  if(LIVE.home==null)LIVE.home=0;
  if(LIVE.away==null)LIVE.away=0;
  if(!LIVE.source)LIVE.source="distinta";
  if(!Array.isArray(LIVE.manual))LIVE.manual=[];
  if(!LIVE.manualNum||typeof LIVE.manualNum!=="object")LIVE.manualNum={};
  if(LIVE.distOrder!=null&&!Array.isArray(LIVE.distOrder))LIVE.distOrder=null;
  if(!LIVE.positions||typeof LIVE.positions!=="object")LIVE.positions={};
  if(!LIVE.modulo)LIVE.modulo="4-4-2";
  if(LIVE.whistleHalf==null)LIVE.whistleHalf=0;
}

function applyPresColors(){
  const c=(SETTINGS.colors&&SETTINGS.colors.pres)||{};
  const r=document.documentElement.style;
  r.setProperty("--pres-present", c.present||"#16a34a");
  r.setProperty("--pres-absent", c.absent||"#dc2626");
  r.setProperty("--pres-outline", c.outline||"#0f172a");
  r.setProperty("--pres-badge-bg", c.badgeBg||"#0f172a");
  r.setProperty("--pres-badge-text", c.badgeText||"#ffffff");
  r.setProperty("--pres-group", c.group||"#16a34a");
  r.setProperty("--pres-apart", c.apart||"#d97706");
}

function ensureColorCard(){
  if($("colorsCard"))return;
  const vs=$("viewSet");
  if(!vs)return;
  SETTINGS.colors=SETTINGS.colors||{};
  const c=SETTINGS.colors.pres||{};
  const d=document.createElement("div");
  d.className="card";
  d.id="colorsCard";
  d.innerHTML=
    '<h2>🎨 Colori presenze e badge</h2>'+
    '<div class="row"><div><label>Presente</label><input type="color" id="colPresent" value="'+(c.present||"#16a34a")+'"></div><div><label>Assente</label><input type="color" id="colAbsent" value="'+(c.absent||"#dc2626")+'"></div></div>'+
    '<div class="row"><div><label>Contorno card</label><input type="color" id="colOutline" value="'+(c.outline||"#0f172a")+'"></div><div><label>Sfondo badge</label><input type="color" id="colBadgeBg" value="'+(c.badgeBg||"#0f172a")+'"></div></div>'+
    '<div class="row"><div><label>Bordo badge</label><input type="color" id="colBadgeTx" value="'+(c.badgeText||"#ffffff")+'"></div><div><label>In gruppo</label><input type="color" id="colGroup" value="'+(c.group||"#16a34a")+'"></div><div><label>A parte</label><input type="color" id="colApart" value="'+(c.apart||"#d97706")+'"></div></div>'+
    '<button class="btn ok" onclick="savePresColors()">💾 Salva colori</button>';
  vs.insertBefore(d, vs.firstChild);
  applyPresColors();
}

window.savePresColors=async function(){
  SETTINGS.colors=SETTINGS.colors||{};
  SETTINGS.colors.pres={
    present:$("colPresent").value,
    absent:$("colAbsent").value,
    outline:$("colOutline").value,
    badgeBg:$("colBadgeBg").value,
    badgeText:$("colBadgeTx").value,
    group:$("colGroup").value,
    apart:$("colApart").value
  };
  await persistSettings();
  applyPresColors();
  alert("Colori salvati.");
};

function injectLiveCss(){
  if(document.getElementById("liveCss"))return;
  const st=document.createElement("style");
  st.id="liveCss";
  st.textContent=
  ".liveTop{padding:6px!important}#lvClock,.liveClock{font-size:30px!important}.liveRest{font-size:11px!important;margin-top:1px}.liveInfo{font-size:9px!important;margin-top:4px}.liveScore{font-size:15px!important;margin-top:3px}.liveGol{font-size:10px}.liveBtns{margin-top:5px}.liveBtns button{padding:9px 4px!important;font-size:13px!important}"+
  ".srcLbl{color:#e2e8f0;font-size:10px;font-weight:800;text-align:center;margin:6px 0 4px;background:rgba(2,6,23,.55);border:1px solid rgba(255,255,255,.25);border-radius:8px;padding:4px 6px}"+
  ".pitch2{min-height:0;padding:10px 6px;position:relative;border-radius:14px;overflow:hidden;border:2px solid rgba(255,255,255,.75);box-shadow:inset 0 0 40px rgba(0,0,0,.4);background:repeating-linear-gradient(180deg,#15803d 0 24px,#16a34a 24px 48px)}"+
  ".pitch2::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 50% 50%,transparent 30px,rgba(255,255,255,.8) 30px,rgba(255,255,255,.8) 32px,transparent 32px),linear-gradient(rgba(255,255,255,.8),rgba(255,255,255,.8)) 0 50%/100% 2px no-repeat,linear-gradient(rgba(255,255,255,.8),rgba(255,255,255,.8)) 0 6%/100% 2px no-repeat,linear-gradient(rgba(255,255,255,.8),rgba(255,255,255,.8)) 0 94%/100% 2px no-repeat;opacity:.5}"+
  ".stand{height:8px;background:linear-gradient(180deg,#475569,#1e293b);border-radius:6px;margin:0 0 6px;display:flex;align-items:center;justify-content:center;gap:3px;overflow:hidden}"+
  ".stand i{width:3px;height:3px;border-radius:50%;background:#cbd5e1;flex:0 0 auto}"+
  ".pitchArea{position:relative;height:330px;z-index:1}"+
  ".benchGrid{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;padding:4px 0}"+
  ".futcard{position:relative;width:84px;margin:0 auto;padding:13px 4px 12px;text-align:center;cursor:pointer;color:#3a2f00;user-select:none;background:radial-gradient(circle at 50% 0%,rgba(255,255,255,.6),rgba(255,255,255,0) 62%),linear-gradient(165deg,#fff7cf 0%,#f3d34a 28%,#d4a017 55%,#8a6d1a 100%);clip-path:polygon(50% 0%,93% 6%,100% 28%,100% 74%,50% 100%,0% 74%,0% 28%,7% 6%);box-shadow:inset 0 0 0 2px rgba(255,255,255,.45),inset 0 -8px 14px rgba(0,0,0,.28);filter:drop-shadow(1.5px 0 0 #0f172a) drop-shadow(-1.5px 0 0 #0f172a) drop-shadow(0 1.5px 0 #0f172a) drop-shadow(0 -1.5px 0 #0f172a) drop-shadow(0 4px 8px rgba(0,0,0,.4))}"+
  ".futcard::before{content:'';position:absolute;inset:0;background:linear-gradient(115deg,transparent 32%,rgba(255,255,255,.5) 46%,transparent 60%);pointer-events:none}"+
  ".futcard.drag{position:absolute;transform:translate(-50%,-50%);margin:0;touch-action:none;cursor:grab}"+
  ".futcard.mini{width:56px;padding:7px 2px 7px}"+
  ".futcard.mini .num{font-size:14px}"+
  ".futcard.mini .nm{font-size:7px}"+
  ".futcard .crest{position:absolute;top:7px;left:9px;width:15px;height:15px;object-fit:contain;opacity:.95}"+
  ".futcard.mini .crest{width:10px;height:10px;top:4px;left:5px}"+
  ".futcard .num{display:block;font-size:22px;font-weight:900;line-height:1;text-shadow:0 1px 0 rgba(255,255,255,.55),0 2px 3px rgba(0,0,0,.35)}"+
  ".futcard .nm{display:block;font-size:9px;font-weight:800;text-transform:uppercase;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.3px}"+
  ".futcard .st{display:block;font-size:8px;font-weight:800;margin-top:2px}"+
  ".futcard .gols,.futcard .yell{position:absolute;top:7px;font-size:9px;font-weight:900;border-radius:999px;padding:1px 5px;line-height:1.2;box-shadow:0 2px 5px rgba(0,0,0,.4)}"+
  ".futcard .gols{right:7px;background:#c8102e;color:#fff}"+
  ".futcard .yell{left:26px;background:#facc15;color:#713f12}"+
  ".futcard .acts{position:absolute;bottom:5px;right:5px;font-size:8px;line-height:1;display:flex;gap:1px;align-items:center;color:#fff;text-shadow:0 1px 2px #000}"+
  ".futcard.c-blu{background:radial-gradient(circle at 50% 0%,rgba(255,255,255,.5),rgba(255,255,255,0) 60%),linear-gradient(165deg,#dbeafe 0%,#60a5fa 30%,#2563eb 60%,#1e3a8a 100%);color:#fff}"+
  ".futcard.c-grigio{background:radial-gradient(circle at 50% 0%,rgba(255,255,255,.5),rgba(255,255,255,0) 60%),linear-gradient(165deg,#f3f4f6 0%,#9ca3af 35%,#4b5563 75%,#374151 100%);color:#fff}"+
  ".futcard.c-giallo{background:radial-gradient(circle at 50% 0%,rgba(255,255,255,.55),rgba(255,255,255,0) 62%),linear-gradient(165deg,#fef9c3 0%,#facc15 35%,#ca8a04 75%,#854d0e 100%);color:#3a2f00}"+
  ".futcard.c-rosso{background:radial-gradient(circle at 50% 0%,rgba(255,255,255,.45),rgba(255,255,255,0) 60%),linear-gradient(165deg,#fee2e2 0%,#ef4444 35%,#b91c1c 75%,#7f1d1d 100%);color:#fff}"+
  ".futcard.on{background:radial-gradient(circle at 50% 0%,rgba(255,255,255,.55),rgba(255,255,255,0) 62%),linear-gradient(165deg,#d9f7e0 0%,#34c06a 35%,#0c7a3d 75%,#075c2e 100%);color:#04301a}"+
  ".futcard.off{background:radial-gradient(circle at 50% 0%,rgba(255,255,255,.5),rgba(255,255,255,0) 62%),linear-gradient(165deg,#ffe1e1 0%,#e57373 35%,#b02a2a 75%,#8c1d1d 100%);color:#fff}"+
  ".futcard.out{opacity:.5}"+
  ".futcard.exp{opacity:.4;filter:grayscale(.6)}"+
  ".pcwrap{width:100%;max-width:104px;margin:0 auto}"+
  ".pcctrl{display:flex;gap:6px;justify-content:center;align-items:center;margin-top:6px;flex-wrap:wrap}"+
  ".pbtn{width:36px;height:36px;border-radius:10px;border:1px solid #cbd5e1;background:#fff;font-size:17px;cursor:pointer}"+
  ".pbtn.on{background:#10b981;border-color:#10b981}"+
  ".pbtn.ap.on{background:#3b82f6;border-color:#3b82f6}"+
  ".pcctrl .msel{width:100%;font-size:12px;padding:6px;border-radius:8px;border:1px solid #fca5a5;color:#991b1b;background:#fff}"+
  ".ballimg{width:16px;height:16px;vertical-align:-3px;margin:0 1px}"+
  "#sheetLive,#sheetPres{position:fixed;inset:0;background:rgba(2,6,23,.6);z-index:90;display:flex;align-items:center;justify-content:center;padding:16px}"+
  "#sheetLive.hidden,#sheetPres.hidden{display:none}"+
  "#sheetLive .sheetIn2,#sheetPres .sheetIn2{background:#fff;border-radius:16px;max-width:430px;width:100%;max-height:82vh;overflow:auto;padding:14px;box-shadow:0 12px 44px rgba(0,0,0,.45)}"+
  ".evGrid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px}.evGrid button{padding:10px 4px;border:none;border-radius:10px;background:#eef2ff;color:#3730a3;font-weight:700;font-size:12px;cursor:pointer}"+
  ".chkRow{display:flex;align-items:center;gap:8px;padding:6px 2px;border-bottom:1px solid #f1f5f9;font-size:13px}.chkRow input{width:auto}"+
  ":root{--pres-present:#16a34a;--pres-absent:#dc2626;--pres-outline:#0f172a;--pres-badge-bg:#0f172a;--pres-badge-text:#ffffff;--pres-group:#16a34a;--pres-apart:#d97706}"+
  ".pcwrap{max-width:104px!important}"+
  ".pcctrl{display:flex!important;flex-wrap:nowrap!important;gap:4px!important;justify-content:center!important;align-items:center!important;margin-top:5px!important}"+
  ".pbtn.mini{width:34px;height:34px;min-width:34px;border-radius:10px;border:1px solid #cbd5e1;background:#fff;font-size:15px;cursor:pointer;padding:0;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 1px 2px rgba(15,23,42,.08)}"+
  ".pbtn.mini.grpOn{background:var(--pres-group);border-color:var(--pres-group);color:#fff}"+
  ".pbtn.mini.apaOn{background:var(--pres-apart);border-color:var(--pres-apart);color:#fff}"+
  ".futcard.presence{filter:drop-shadow(1.5px 0 0 var(--pres-outline)) drop-shadow(-1.5px 0 0 var(--pres-outline)) drop-shadow(0 1.5px 0 var(--pres-outline)) drop-shadow(0 -1.5px 0 var(--pres-outline)) drop-shadow(0 3px 7px rgba(0,0,0,.35))!important}"+
  ".futcard.presence.on{background:var(--pres-present)!important;color:#fff!important}"+
  ".futcard.presence.off{background:var(--pres-absent)!important;color:#fff!important}"+
  ".futcard.presence .crest{background:var(--pres-badge-bg);border-radius:50%;padding:1px;box-shadow:0 0 0 1px var(--pres-badge-text);box-sizing:border-box}"+
  ".futcard.presence .statsRow{position:absolute;bottom:4px;left:0;right:0;display:flex;justify-content:center;gap:4px;z-index:5}"+
  ".futcard.presence .statBtn{width:22px;height:22px;border-radius:6px;border:none;background:rgba(0,0,0,.35);color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(2px)}"+
  ".futcard.presence .statBtn.active{background:#fff;color:#000;font-weight:900;box-shadow:0 0 4px #fff}"+
  ".futcard.presence .statBtn.grp.on{background:#16a34a;color:#fff}"+
  ".futcard.presence .statBtn.apa.on{background:#d97706;color:#fff}"+
  ".pcLegendCompact{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;font-size:10px;font-weight:800;color:#334155;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:6px 8px;margin-bottom:8px}"+
  ".pcLegendCompact span{display:inline-flex;align-items:center;gap:4px}"+
  ".pcLegendCompact i{width:10px;height:10px;border-radius:3px;display:inline-block;border:1px solid rgba(0,0,0,.2)}"+
  ".subCard{border:1px solid #cbd5e1;border-radius:14px;padding:10px;margin-bottom:8px;background:linear-gradient(180deg,#fff,#f8fafc);box-shadow:0 1px 3px rgba(15,23,42,.06)}"+
  ".subCard .sn{font-size:12px;font-weight:900;color:#1e3a8a;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center}"+
  ".subGrid2{display:grid;grid-template-columns:1fr 1fr;gap:8px}"+
  ".subGrid3{display:grid;grid-template-columns:72px 1fr 1fr;gap:8px;align-items:end}"+
  ".subCard label{font-size:10px;font-weight:800;color:#475569;margin:0 0 3px}"+
  ".subCard select,.subCard input{padding:7px;font-size:12px;border-radius:9px}"+
  ".subOutWrap select{border:1px solid #fca5a5;background:#fff1f2}"+
  ".subInWrap select{border:1px solid #86efac;background:#f0fdf4}"+
  ".subDisabled{opacity:.45}"+
  ".calError{background:#fee2e2;border:1px solid #fca5a5;color:#991b1b;padding:10px;border-radius:12px;font-size:12px}"+
  DOC_CSS;
  document.head.appendChild(st);
}

function removeFotoCard(){const cards=document.querySelectorAll(".hcard");cards.forEach(function(c){if(c.textContent.indexOf("Foto")!==-1)c.remove();});}
function wrapSheetPres(){const sp=$("sheetPres");if(!sp)return;if(sp.querySelector(".sheetIn2"))return;const w=document.createElement("div");w.className="sheetIn2";while(sp.firstChild)w.appendChild(sp.firstChild);sp.appendChild(w);}
function addLiveBarBtns(){
  const lb=document.querySelector(".liveBar");if(!lb)return;
  const db=lb.querySelector('[onclick="openMatchOptions()"]');if(db)db.remove();
  if(!lb.querySelector("#btnRosa")){const b=document.createElement("button");b.id="btnRosa";b.textContent="👥 Rosa";b.onclick=function(){openSquadChoiceSheet();};lb.insertBefore(b,lb.firstChild);}
  if(!lb.querySelector("#btnShare")){const s=document.createElement("button");s.id="btnShare";s.textContent="📤 Msg";s.onclick=function(){shareMatchSummary();};lb.insertBefore(s,lb.children[2]||null);}
  if(!lb.querySelector("#btnModulo")){const mb=document.createElement("button");mb.id="btnModulo";mb.textContent="🧩 Modulo";mb.onclick=function(){cycleModulo();};lb.appendChild(mb);}
  const row=document.querySelector(".liveTop > div");
  if(row&&!row.querySelector("#topEsci")){
    const x=document.createElement("button");
    x.id="topEsci";x.textContent="✕";x.title="Esci (pausa)";
    x.style.cssText="width:34px;height:34px;border:none;border-radius:9px;background:#475569;color:#fff;font-size:15px;font-weight:900;cursor:pointer";
    x.onclick=function(){exitLiveNoClose();};
    row.appendChild(x);
  }
}

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
    showView("app");goHome();ensureColorCard();ensurePersonalCard();applyBrand();setupRosaUI();injectLiveCss();removeFotoCard();wrapSheetPres();addLiveBarBtns();
  }catch(e){console.error(e);alert("Errore: "+e.message);}
}
function applyBrand(){
  const ci=clubInfo();
  const hd=document.querySelector("header");
  if(hd)hd.style.background="linear-gradient(135deg,"+ci.c1+" 0%,#0b1035 100%)";
  const hl=$("hdrLogo");
  if(hl){hl.innerHTML='<img src="'+clubLogo()+'" style="width:100%;height:100%;object-fit:contain;border-radius:50%">';hl.style.background="#fff";hl.style.border="2px solid "+ci.acc;}
  const hn=$("hdrName");if(hn)hn.textContent=ci.nome;
  const hp=$("hdrSub");if(hp)hp.style.color=ci.acc;
}
async function loadSettingsRow(){
  const r=await sb.from("settings").select("*").eq("club_id",CLUB_ID).maybeSingle();
  SETTINGS=(r.data&&r.data.data)||{};
  if(!SETTINGS.luoghi)SETTINGS.luoghi=["Borgaro","Usseglio","Collegno Paradiso"];
  if(!SETTINGS.luogo_default)SETTINGS.luogo_default="Borgaro";
  populateLuoghi();
  if(SETTINGS.live){LIVE=SETTINGS.live;normalizeLive();}
  applyPresColors();
}
async function persistSettings(){await sb.from("settings").upsert({club_id:CLUB_ID,data:SETTINGS});}
function populateLuoghi(){
  let L=[...(SETTINGS.luoghi||[])];
  if(typeof TEAMS!=="undefined" && TEAMS.length){
    TEAMS.forEach(function(t){
      if(t.city && L.indexOf(t.city)===-1) L.push(t.city);
      else if(t.short_name && L.indexOf(t.short_name)===-1) L.push(t.short_name);
    });
  }
  ["attPlace","pmPlace","setDefault","lvPlace"].forEach(function(id){
    const e=$(id);
    if(e){
      e.innerHTML=L.map(function(x){return "<option>"+x+"</option>";}).join("");
      if(SETTINGS.luogo_default)e.value=SETTINGS.luogo_default;
    }
  });
  const ll=$("luoghiList");
  if(ll)ll.innerHTML=(SETTINGS.luoghi||[]).map(function(x){return '<span class="vb blu">'+x+' <b style="cursor:pointer" onclick="removeLuogo(\''+x+'\')">✕</b></span>';}).join(" ");
}
window.addLuogo=function(){const v=$("setLuogo").value.trim();if(!v)return;SETTINGS.luoghi.push(v);$("setLuogo").value="";populateLuoghi();};
window.removeLuogo=function(x){SETTINGS.luoghi=SETTINGS.luoghi.filter(function(y){return y!==x;});populateLuoghi();};
window.saveLuoghi=async function(){SETTINGS.luogo_default=$("setDefault").value;await persistSettings();alert("Luoghi salvati");};

function ensurePersonalCard(){
  if($("persCard"))return;
  const vs=$("viewSet");if(!vs)return;
  const d=document.createElement("div");
  d.className="card";d.id="persCard";
  d.innerHTML='<h2>🎨 Personalizzazione società & grafica</h2>'+
    '<label>Logo società (carica il PNG/SVG originale)</label>'+
    '<div style="display:flex;gap:10px;align-items:center"><img id="persPrev" style="width:64px;height:64px;object-fit:contain;background:#f1f5f9;border-radius:12px;border:1px solid #e2e8f0"><input type="file" id="persLogo" accept="image/*" style="flex:1"></div>'+
    '<label>Nome società (intestazione)</label><input id="persNome">'+
    '<label>Denominazione (titolo gara)</label><input id="persDen">'+
    '<label>Indirizzo</label><input id="persAddr">'+
    '<div class="row"><div><label>Telefono</label><input id="persTel"></div><div><label>Email</label><input id="persMail"></div></div>'+
    '<div class="row"><div><label>PEC</label><input id="persPec"></div><div><label>P.IVA</label><input id="persPiva"></div></div>'+
    '<div class="row"><div><label>Matricola FIGC</label><input id="persMatr"></div><div><label>C.O.N.I. n°</label><input id="persConi"></div></div>'+
    '<div class="row"><div><label>Colore primario</label><input type="color" id="persC1"></div><div><label>Colore secondario</label><input type="color" id="persC2"></div><div><label>Colore accento</label><input type="color" id="persAcc"></div></div>'+
    '<button class="btn ok" onclick="savePersonal()">💾 Salva personalizzazione</button>';
  vs.insertBefore(d,vs.firstChild);
  populatePersonal();
}
function populatePersonal(){
  const ci=clubInfo();
  const set=function(id,v){const e=$(id);if(e)e.value=v||"";};
  set("persNome",ci.nome);set("persDen",ci.den);set("persAddr",ci.addr);set("persTel",ci.tel);set("persMail",ci.mail);set("persPec",ci.pec);set("persPiva",ci.piva);set("persMatr",ci.matricola);set("persConi",ci.coni);
  set("persC1",ci.c1);set("persC2",ci.c2);set("persAcc",ci.acc);
  const pv=$("persPrev");if(pv)pv.src=clubLogo();
}
window.savePersonal=async function(){
  const ci=clubInfo();
  const out={nome:$("persNome").value.trim()||ci.nome,den:$("persDen").value.trim()||ci.den,addr:$("persAddr").value.trim()||ci.addr,tel:$("persTel").value.trim()||ci.tel,mail:$("persMail").value.trim()||ci.mail,pec:$("persPec").value.trim()||ci.pec,piva:$("persPiva").value.trim()||ci.piva,matricola:$("persMatr").value.trim()||ci.matricola,coni:$("persConi").value.trim()||ci.coni,c1:$("persC1").value,c2:$("persC2").value,acc:$("persAcc").value,logo:ci.logo};
  const f=$("persLogo").files[0];
  if(f){compressLogo(f,function(d){out.logo=d;SETTINGS.club=out;persistSettings();applyBrand();populatePersonal();alert("Personalizzazione salvata con nuovo logo!");});}
  else{SETTINGS.club=out;await persistSettings();applyBrand();populatePersonal();alert("Personalizzazione salvata!");}
};

async function loadTeams(){const r=await sb.from("teams").select("*").eq("club_id",CLUB_ID).order("short_name");TEAMS=r.data||[];renderTeamList();populateAvv();populateLuoghi();}
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
  ["viewHome","viewSoc","viewCal","viewRosa","viewPres","viewPart","viewForm","viewSub","viewDoc","viewSet","viewReg"].forEach(function(x){const e=$(x);if(e)e.classList.add("hidden");});
}
function pushView(v){VIEW_STACK.push(v);}
window.goBack=function(){const prev=VIEW_STACK.pop();if(!prev||prev==="home"){goHome();return;}showTab(prev,true);};
window.goHome=function(){showView("app");VIEW_STACK=[];const vh=$("viewHome");if(vh)vh.classList.remove("hidden");setNav("nbHome");const bb=$("btnBack");if(bb)bb.classList.add("hidden");};
window.showTab=function(t,fromBack){
  showView("app");
  if(!fromBack)pushView(currentView());
  const navMap={cal:"nbCal",pres:"nbPres",part:"nbPart",reg:"nbReg"};
  setNav(navMap[t]||"nbHome");
  const map={soc:"viewSoc",cal:"viewCal",rosa:"viewRosa",pres:"viewPres",part:"viewPart",form:"viewForm",sub:"viewSub",doc:"viewDoc",set:"viewSet",reg:"viewReg"};
  const e=$(map[t]);if(e)e.classList.remove("hidden");
  const bb=$("btnBack");if(bb)bb.classList.remove("hidden");
  if(t==="soc"){renderTeamList();renderStaffList();}
  if(t==="cal"){renderCalView();}
  if(t==="pres"){renderCal();}
  if(t==="part"){showPartHub();}
  if(t==="rosa"){setupRosaUI();loadRosa();}
  if(t==="form")populateMatchSelect("fmMatch");
  if(t==="sub"){populateMatchSelect("sbMatch");loadSubs();}
  if(t==="doc"){populateMatchSelect("docMatch");renderDoc();}
  if(t==="reg")loadRegistro();
  if(t==="set"){populateLuoghi();ensureColorCard();ensurePersonalCard();populatePersonal();}
};
function currentView(){
  const ids=["viewSoc","viewCal","viewRosa","viewPres","viewPart","viewForm","viewSub","viewDoc","viewSet","viewReg"];
  const names={viewSoc:"soc",viewCal:"cal",viewRosa:"rosa",viewPres:"pres",viewPart:"part",viewForm:"form",viewSub:"sub",viewDoc:"doc",viewSet:"set",viewReg:"reg"};
  for(const i of ids){const e=$(i);if(e&&!e.classList.contains("hidden"))return names[i];}
  return "home";
}
function setNav(id){["nbHome","nbCal","nbPres","nbPart","nbReg"].forEach(function(x){const e=$(x);if(e)e.classList.toggle("on",x===id);});}

function setupRosaUI(){
  const vr=$("viewRosa");if(!vr)return;
  const cards=vr.querySelectorAll(".card");
  const addCard=cards[0];
  if(addCard&&!addCard.id)addCard.id="addCard";
  const rosaList=$("rosaList");
  const rosaCard=rosaList?rosaList.closest(".card"):null;
  if(rosaCard&&!$("btnShowAdd")){
    const b=document.createElement("button");
    b.className="btn";b.id="btnShowAdd";b.style.marginTop="0";b.style.marginBottom="10px";b.textContent="＋ Aggiungi giocatore";
    b.onclick=function(){const ac=$("addCard");if(ac){ac.classList.remove("hidden");ac.scrollIntoView({behavior:"smooth",block:"start"});}};
    const h2=rosaCard.querySelector("h2");
    if(h2&&h2.nextSibling)rosaCard.insertBefore(b,h2.nextSibling);else rosaCard.appendChild(b);
  }
}
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
  const ac=$("addCard");
  if(ac){ if(PLAYERS.length===0){ac.classList.remove("hidden");} else {ac.classList.add("hidden");} }
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
window.openEdit=function(id){const p=pById(id);if(!p)return;EDIT_ID=id;FOTO_ED=null;const K={Num:"jersey_number",Cogn:"last_name",Nome:"first_name",Birth:"birth_date",Med:"medical_expiry",Joined:"joined_date",Left:"left_date",Tel:"phone",TelM:"phone_mother",TelP:"phone_father",Figc:"figc_id",Doc:"doc_id",Card:"card_number",Note:"notes"};Object.keys(K).forEach(function(k){const e=$("ed"+k);if(e)e.value=p[K[k]]||"";});const ep=$("edFotoPrev");if(ep){if(p.photo_url){ep.style.backgroundImage="url("+p.photo_url+")";ep.textContent="";}else{ep.style.backgroundImage="";ep.textContent="📷";}}const ec=$("editCard");if(ec)ec.classList.remove("hidden");};
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
window.kindChanged=function(){const v=$("attKind").value;const free=$("attKindFree");if(free)free.classList.toggle("hidden",v!=="__altro");};
function kindValue(){const v=$("attKind").value;if(v==="__altro"){return $("attKindFree").value.trim()||"Altro";}return v;}

async function loadAttendance(){
  const d=$("attDate").value;if(!d)return;
  const r=await sb.from("sessions").select("*").eq("date",d).maybeSingle();
  const sess=r.data;CURRENT_SESSION=sess;
  const map={};
  if(sess){const ra=await sb.from("attendances").select("*").eq("session_id",sess.id);(ra.data||[]).forEach(function(a){map[a.player_id]=a;});}
  const std=["Tecnico","Tattico","Fisico","Partitella"];
  if(sess&&sess.kind&&std.indexOf(sess.kind)===-1){$("attKind").value="__altro";$("attKindFree").value=sess.kind;$("attKindFree").classList.remove("hidden");}
  else{if(sess&&sess.kind)$("attKind").value=sess.kind;$("attKindFree").classList.add("hidden");}
  if(sess&&sess.place)$("attPlace").value=sess.place;
  if(sess&&sess.time)$("attTime").value=sess.time;
  ROSA_DATA=ALL_PLAYERS.filter(function(p){return inRosa(p,d);});
  ATT_STATE={};ROSA_DATA.forEach(function(p){const a=map[p.id];ATT_STATE[p.id]={present:a?a.present:false,with_team:a?a.with_team:true,behavior:a?(a.behavior||""):"",notes:a?(a.notes||""):"",reason:a?(a.reason||""):""};});
  const sn=sessioneNumero(d);
  const adl=$("attDateLbl");if(adl)adl.textContent="Seduta "+d.split("-").reverse().join("/")+(sess&&sess.time?(" · ore "+fmtTime(sess.time)):"")+" · All. n° "+sn.n+" di "+sn.tot;
  const ac=$("attCard");if(ac)ac.classList.remove("hidden");
  const sbp=$("saveBarPres");if(sbp)sbp.classList.remove("hidden");
  renderGrid();
}
function motivoSel(id,s){const isAlt=s.reason&&MOTIVI.indexOf(s.reason)===-1;const sv=isAlt?"Altro":(s.reason||"");let h='<select class="msel" onclick="event.stopPropagation()" onchange="setReason(\''+id+'\',this.value)"><option value="">Motivo…</option>';MOTIVI.forEach(function(m){h+='<option'+(sv===m?' selected':'')+'>'+m+'</option>';});h+='</select>';return h;}
function renderGrid(){
  const pres=ROSA_DATA.filter(function(p){return ATT_STATE[p.id]&&ATT_STATE[p.id].present;});
  const ass=ROSA_DATA.length-pres.length;
  const aparte=pres.filter(function(p){return !ATT_STATE[p.id].with_team;}).length;
  const ac=$("attCount");
  if(ac)ac.textContent="✅ Presenti "+pres.length+" · ❌ Assenti "+ass+" · 🟧 A parte "+aparte;

  const leg=
    '<div class="pcLegendCompact">'+
      '<span><i style="background:var(--pres-present)"></i> Presente</span>'+
      '<span><i style="background:var(--pres-absent)"></i> Assente</span>'+
      '<span><i style="background:var(--pres-group)"></i> Gruppo</span>'+
      '<span><i style="background:var(--pres-apart)"></i> A parte</span>'+
      '<span>⚙ Note</span>'+
      '<span>👆 Tocca card = presente/assente</span>'+
    '</div>';

  const ag=$("attGrid");
  if(!ag)return;

  ag.innerHTML=leg+ROSA_DATA.map(function(p){
    const s=ATT_STATE[p.id];

    let statsHtml='';
    
    if(s.present){
      statsHtml='<div class="statsRow">'+
        '<button class="statBtn grp '+(s.with_team?"on":"")+'" title="Gruppo" onclick="event.stopPropagation();setTeamCard(\''+p.id+'\',true)">👥</button>'+
        '<button class="statBtn apa '+(!s.with_team?"on":"")+'" title="A Parte" onclick="event.stopPropagation();setTeamCard(\''+p.id+'\',false)">🚧</button>'+
        '<button class="statBtn" title="Note" onclick="event.stopPropagation();openSheet(\''+p.id+'\')">⚙</button>'+
      '</div>';
    } 
    else {
       statsHtml='<div class="statsRow"><span style="font-size:9px;color:rgba(255,255,255,.7);font-weight:800">MOTIVO SOTTO</span></div>';
    }

    const inner=
      '<img class="crest" src="'+clubLogo()+'" alt="">'+
      '<span class="num">'+(p.jersey_number||"-")+'</span>'+
      '<span class="nm">'+p.last_name+'</span>'+
      '<span class="st">'+(s.present?"PRESENTI":"ASSENTE")+'</span>'+
      statsHtml;

    let underCtrl = '';
    if(!s.present){
      underCtrl = '<div style="margin-top:4px;width:100%">' + motivoSel(p.id,s) + '</div>';
    }

    return '<div class="pcwrap">'+
      '<div class="futcard presence '+(s.present?"on":"off")+'" onclick="tapCard(\''+p.id+'\')">'+inner+'</div>'+
      underCtrl +
    '</div>';
  }).join("");
}
window.tapCard=function(id){ATT_STATE[id].present=!ATT_STATE[id].present;renderGrid();};
window.setAll=function(v){ROSA_DATA.forEach(function(p){ATT_STATE[p.id].present=v;});renderGrid();};
window.setTeamCard=function(id,v){ATT_STATE[id].with_team=v;renderGrid();};
window.setReason=function(id,v){ATT_STATE[id].reason=v;};
window.openSheet=function(id){SH_ID=id;const p=ROSA_DATA.find(function(x){return x.id===id;});if(!p)return;const sn=$("shName");if(sn)sn.textContent=p.last_name+" "+p.first_name;
  const sbd=$("sheetBody");if(sbd)sbd.innerHTML='<label>Comportamento</label><div class="chipRow" id="shBeh"></div><button class="btn ok" onclick="saveSheet()">💾 Applica</button>';renderSheetBeh();const sp=$("sheetPres");if(sp)sp.classList.remove("hidden");};
function renderSheetBeh(){const sbh=$("shBeh");if(!sbh)return;sbh.innerHTML=BEH.map(function(b){return '<button class="chip '+(ATT_STATE[SH_ID].behavior===b?"on":"")+'" onclick="shSetBeh(\''+b+'\')">'+b+'</button>';}).join("");}
window.shSetBeh=function(b){ATT_STATE[SH_ID].behavior=(ATT_STATE[SH_ID].behavior===b?"":b);renderSheetBeh();};
window.closeSheet=function(){const sp=$("sheetPres");if(sp)sp.classList.add("hidden");SH_ID=null;};
window.saveSheet=function(){closeSheet();renderGrid();};
window.saveAttendance=async function(){
  const d=$("attDate").value;if(!d){alert("Scegli una data");return;}
  const kind=kindValue();const place=$("attPlace").value;const time=$("attTime").value||null;
  let sess=CURRENT_SESSION;
  if(!sess){const ins={club_id:CLUB_ID,date:d,kind:kind,place:place,time:time,notes:null};const r2=await sb.from("sessions").insert(ins).select().single();if(r2.error){alert(r2.error.message);return;}sess=r2.data;CURRENT_SESSION=sess;}
  else{await sb.from("sessions").update({kind:kind,place:place,time:time,notes:null}).eq("id",sess.id);}
  const rows=ROSA_DATA.map(function(p){return{session_id:sess.id,player_id:p.id,present:ATT_STATE[p.id].present,with_team:ATT_STATE[p.id].with_team,behavior:ATT_STATE[p.id].behavior,notes:ATT_STATE[p.id].notes,reason:ATT_STATE[p.id].reason||null};});
  const r=await sb.from("attendances").upsert(rows,{onConflict:"session_id,player_id"});if(r.error){alert(r.error.message);return;}
  await loadSessionDates();renderCal();CAL_ALL=null;
  const sn=sessioneNumero(d);const adl=$("attDateLbl");if(adl)adl.textContent="Seduta "+d.split("-").reverse().join("/")+(time?(" · ore "+fmtTime(time)):"")+" · All. n° "+sn.n+" di "+sn.tot;
  alert("Presenze salvate!");
};
window.showPresReport=async function(){const prc=$("presRepCard");if(prc)prc.classList.remove("hidden");await loadReport();};
window.hidePresReport=function(){const prc=$("presRepCard");if(prc)prc.classList.add("hidden");};
async function loadReport(){const rs=await sb.from("sessions").select("*").eq("club_id",CLUB_ID).order("date");const sess=rs.data||[];
  const prc=$("presRepCard");if(prc){const h2el=prc.querySelector("h2");if(h2el)h2el.innerHTML='Riepilogo Presenze <span class="vb blu">Tot. allenamenti: '+sess.length+'</span>';}
  const rc=$("repClass"),rmx=$("repMatrix");
  if(!sess.length){if(rc)rc.innerHTML='<div class="spin">Nessuna seduta</div>';if(rmx)rmx.innerHTML="";return;}
  const ids=sess.map(function(s){return s.id;});const ra=await sb.from("attendances").select("*").in("session_id",ids);const map={};(ra.data||[]).forEach(function(a){if(!map[a.session_id])map[a.session_id]={};map[a.session_id][a.player_id]=a;});
  const lbl=function(s){const p=s.date.split("-");return p[2]+"/"+p[1]+(s.time?(" "+fmtTime(s.time)):"");};
  const elenco=ALL_PLAYERS.filter(function(p){return p.active;});
  const rows=elenco.map(function(p){let pr=0,as=0;sess.forEach(function(s){const a=(map[s.id]||{})[p.id];if(a&&inRosa(p,s.date)){if(a.present){pr++;}else{as++;}}});const t=pr+as;const pc=t?Math.round(pr/t*100):0;let st,cl;if(pc===100){st="SEMPRE PRESENTE";cl="verde";}else if(pc>=85){st="ASSIDUO";cl="verde";}else if(pc>=50){st="A METÀ";cl="giallo";}else{st="ASSENTE";cl="rosso";}return{p:p,pr:pr,as:as,pc:pc,st:st,cl:cl};}).sort(function(a,b){return b.pc-a.pc;});
  let h="<table class='rep'><tr><th># cron.</th><th>N° maglia</th><th>Giocatore</th><th>P</th><th>A</th><th>%</th><th>Stato</th></tr>";rows.forEach(function(r,i){h+='<tr><td>'+(i+1)+'</td><td><b>'+(r.p.jersey_number||"-")+'</b></td><td class="nome">'+r.p.last_name+' '+r.p.first_name+'</td><td class="ok">'+r.pr+'</td><td class="ko">'+r.as+'</td><td>'+r.pc+'%</td><td><span class="vb '+r.cl+'">'+r.st+'</span></td></tr>';});h+="</table>";if(rc)rc.innerHTML=h;
  let h2="<table class='rep'><tr><th style='width:34px'>N°</th><th class='nome'>Giocatore</th>";sess.forEach(function(s){h2+="<th>"+lbl(s)+"</th>";});h2+="</tr>";elenco.forEach(function(p){h2+='<tr><td><b>'+(p.jersey_number||"-")+'</b></td><td class="nome">'+p.last_name+'</td>';sess.forEach(function(s){if(!inRosa(p,s.date)){h2+='<td class="na"></td>';}else{const a=(map[s.id]||{})[p.id];if(!a){h2+='<td class="na">–</td>';}else{h2+=a.present?'<td class="ok">✔</td>':'<td class="ko">✖</td>';}}});h2+="</tr>";});h2+="</table>";if(rmx)rmx.innerHTML=h2;}

async function loadPartite(){const r=await sb.from("matches").select("*").eq("club_id",CLUB_ID).order("date",{ascending:false});PARTITE=r.data||[];}
function renderPartList(){const pl=$("partList");if(!pl)return;
  if(!PARTITE.length){pl.innerHTML='<div class="spin">Nessuna partita</div>';return;}
  pl.innerHTML=PARTITE.map(function(m){const sc=(m.score_home!=null&&m.score_away!=null)?(m.score_home+"-"+m.score_away):"–";const isLive=(m.status==="live");
    return '<div class="partCard'+(isLive?" live":"")+'" onclick="openPart(\''+m.id+'\')"><div class="pcTop"><span>'+m.date.split("-").reverse().join("/")+' '+(m.time?fmtTime(m.time):"")+'</span><span>'+m.competition+' <b style="color:#991b1b;cursor:pointer" onclick="event.stopPropagation();deleteMatch(\''+m.id+'\')">🗑</b></span></div><div class="pcTeams"><span>'+(m.home?"NOI":"AVV")+' vs '+m.opponent+'</span><span class="pcScore">'+(isLive?"🔴 LIVE":sc)+'</span></div><div><span class="vb '+(m.home?"verde":"giallo")+'">'+(m.home?"CASA":"TRASF")+'</span><span class="vb '+(isLive?"rosso":"blu")+'">'+(isLive?"IN CORSO":(m.status||""))+'</span></div></div>';}).join("");}
window.deleteMatch=async function(id){
  if(!confirm("Eliminare definitivamente questa partita e tutti i suoi dati?"))return;
  if(LIVE&&LIVE.matchId===id){LIVE=null;SETTINGS.live=null;await persistSettings();}
  await sb.from("matches").delete().eq("id",id);
  await loadPartite();renderPartList();CAL_ALL=null;
  alert("Partita eliminata.");
};
window.deleteLiveFromHub=async function(){if(!LIVE||!LIVE.matchId)return;await deleteMatch(LIVE.matchId);};
window.showPartHub=function(){
  $("partHub").classList.remove("hidden");$("partLive").classList.add("hidden");$("partManual").classList.add("hidden");
  if(LIVE_UI_TIMER){clearInterval(LIVE_UI_TIMER);LIVE_UI_TIMER=null;}
  renderPartList();
  const hb=$("hubLive");
  if(LIVE&&LIVE.matchId){const m=PARTITE.find(function(x){return x.id===LIVE.matchId;});if(m){hb.classList.remove("hidden");$("hubLiveTxt").textContent="Partita in corso: "+m.opponent+" "+(LIVE.home||0)+"-"+(LIVE.away||0)+" · "+(LIVE.phase==="running"?"▶ in gioco":LIVE.phase==="paused"?"⏸ in pausa":"⏹ ferma");}}
  else hb.classList.add("hidden");
};
window.resumeHubLive=function(){if(LIVE&&LIVE.matchId)openLiveFor(LIVE.matchId);};
window.openPart=function(id){
  if(currentView()!=="part")showTab("part",true);
  const m=PARTITE.find(function(x){return x.id===id;});if(!m)return;
  if(m.status==="live"){openLiveFor(id);}else{openManual(id);}
};
window.openLivePicker=function(){
  $("partLive").classList.remove("hidden");$("partHub").classList.add("hidden");
  const sbd=$("sheetLiveBody");if(!sbd)return;
  $("shLiveName").textContent="Avvia partita LIVE";
  sbd.innerHTML='<label>Avversario</label><select id="lvOpp">'+TEAMS.map(function(t){return "<option>"+t.short_name+"</option>";}).join("")+'</select><label>O altro avversario</label><input type="text" id="lvOppFree">'+
    '<div class="row"><div><label>Campo</label><select id="lvHome"><option value="true">Casa</option><option value="false">Trasferta</option></select></div><div><label>Luogo</label><select id="lvPlace"></select></div></div>'+
    '<div class="row"><div><label>N° tempi</label><select id="lvHalves"><option value="1">1</option><option value="2" selected>2</option><option value="3">3</option><option value="4">4</option></select></div><div><label>Durata (min)</label><input type="number" id="lvHalfMin" value="35" min="1" max="90"></div></div>'+
    '<label>Formazione in campo</label>'+
    '<div style="display:flex;gap:8px"><label style="flex:1;display:flex;gap:6px;align-items:center;border:1px solid #cbd5e1;border-radius:10px;padding:8px;font-size:13px"><input type="radio" name="lvSrc" value="distinta" checked onchange="toggleManWrap()"> 📋 Dalla distinta</label>'+
    '<label style="flex:1;display:flex;gap:6px;align-items:center;border:1px solid #cbd5e1;border-radius:10px;padding:8px;font-size:13px"><input type="radio" name="lvSrc" value="manual" onchange="toggleManWrap()"> ✍️ Li scelgo io</label></div>'+
    '<div id="manWrap" class="hidden" style="max-height:170px;overflow:auto;margin-top:8px;border:1px solid #e2e8f0;border-radius:10px;padding:6px">'+PLAYERS.map(function(p){
      return '<label class="chkRow"><input type="checkbox" class="manChk" value="'+p.id+'"><input type="number" class="manNum" data-id="'+p.id+'" value="'+(p.jersey_number||"")+'" min="1" max="99" style="width:54px;padding:3px;font-size:12px"> '+p.last_name+'</label>';
    }).join("")+'</div>'+
    '<button class="btn danger" onclick="confirmStartLive()">🔴 Avvia LIVE</button>';
  populateLuoghi();
  $("sheetLive").classList.remove("hidden");
  toggleManWrap();
};
window.toggleManWrap=function(){
  const sbd=$("sheetLiveBody");if(!sbd)return;
  let dw=$("distWrap");
  if(!dw){
    dw=document.createElement("div");dw.id="distWrap";dw.style.cssText="margin-top:8px";
    dw.innerHTML='<label style="font-size:12px;font-weight:800;color:#1e3a8a">Scegli la distinta da usare</label><select id="lvDistPick" style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:10px;margin-top:4px"><option value="">caricamento…</option></select>';
    const mw=$("manWrap");
    if(mw) sbd.insertBefore(dw,mw); else sbd.appendChild(dw);
    lvPopulateDist();
  }
  const sel=document.querySelector('input[name="lvSrc"]:checked');
  const isManual=sel&&sel.value==="manual";
  dw.classList.toggle("hidden",isManual);
  const mw=$("manWrap");if(mw) mw.classList.toggle("hidden",!isManual);
};
function lvPopulateDist(){
  const sel=$("lvDistPick");if(!sel)return;
  sb.from("doc_history").select("id,created_at,matches(date,opponent)").eq("club_id",CLUB_ID).eq("doc_type","dist").order("created_at",{ascending:false}).limit(20).then(function(r){
    const rows=r.data||[];
    if(!rows.length){sel.innerHTML='<option value="">Nessuna distinta salvata — usa «Li scelgo io»</option>';return;}
    sel.innerHTML='<option value="">— scegli distinta —</option>'+rows.map(function(x){const m=x.matches||{};const d=new Date(x.created_at);return '<option value="'+x.id+'">'+(m.date?m.date.split("-").reverse().join("/"):"")+' vs '+(m.opponent||"?")+' · salvata '+d.toLocaleDateString()+'</option>';}).join("");
  });
}
window.confirmStartLive=async function(){
  let opp=$("lvOppFree").value.trim();if(!opp)opp=$("lvOpp").value;if(!opp){alert("Avversario?");return;}
  const halfCount=parseInt($("lvHalves").value)||2;
  const halfMin=parseInt($("lvHalfMin").value)||35;
  const halfDurations=[];for(var i=0;i<halfCount;i++)halfDurations.push(halfMin*60);
  const srcEl=document.querySelector('input[name="lvSrc"]:checked');
  const src=srcEl?srcEl.value:"distinta";
  let manual=[],manualNum={},distRows=null;
  if(src==="manual"){
    document.querySelectorAll(".manChk").forEach(function(c){if(c.checked)manual.push(c.value);});
    document.querySelectorAll(".manNum").forEach(function(n){manualNum[n.dataset.id]=n.value;});
    if(manual.length<11){alert("Per il LIVE servono almeno 11 giocatori.");return;}
  }else{
    const dp=$("lvDistPick");
    if(!dp||!dp.value){alert("Scegli una distinta salvata, oppure passa a «Li scelgo io».");return;}
    const dr=await sb.from("doc_history").select("data").eq("id",dp.value).maybeSingle();
    const rr=(dr.data&&dr.data.data&&dr.data.data.rows)?dr.data.data.rows.filter(function(x){return x;}):[];
    if(rr.length<11){alert("La distinta ha meno di 11 giocatori.");return;}
    distRows=rr;
  }
  const ins={club_id:CLUB_ID,date:isoOf(new Date()),time:null,opponent:opp,home:$("lvHome").value==="true",competition:"Campionato",place:$("lvPlace").value||SETTINGS.luogo_default,category:"Under 14",status:"live"};
  const r=await sb.from("matches").insert(ins).select().single();if(r.error){alert(r.error.message);return;}
  LIVE={matchId:r.data.id,clock:0,half:1,phase:"idle",halfDurations:halfDurations,runStart:null,accumulated:0,home:0,away:0,rec1:0,rec2:0,source:src,manual:manual,manualNum:manualNum,whistleHalf:0,distOrder:distRows,positions:{},modulo:"4-4-2"};
  normalizeLive();
  REAL_SEC=0;SETTINGS.live=LIVE;await persistSettings();
  await loadPartite();closeLiveSheet();openLiveFor(r.data.id);CAL_ALL=null;
};
async function loadLiveMp(id){
  const r=await sb.from("match_players").select("*").eq("match_id",id);
  LIVE_MP={};(r.data||[]).forEach(function(x){LIVE_MP[x.player_id]=x;});
}
async function loadDistOrder(id){
  if(LIVE&&LIVE.distOrder&&LIVE.distOrder.length)return;
  try{
    const r=await sb.from("doc_history").select("data").eq("match_id",id).eq("doc_type","dist").order("created_at",{ascending:false}).limit(1);
    if(r.data&&r.data.length&&r.data[0].data&&r.data[0].data.rows&&r.data[0].data.rows.length){LIVE.distOrder=r.data[0].data.rows.filter(function(x){return x;});}
    else LIVE.distOrder=null;
  }catch(e){LIVE.distOrder=null;}
}
async function refreshLiveEv(){
  if(!LIVE)return;
  const r=await sb.from("match_events").select("*").eq("match_id",LIVE.matchId);
  LIVE_EV=r.data||[];
}
function golCountFor(pid){return LIVE_EV.filter(function(e){return e.type==="goal"&&e.player_id===pid;}).length;}
function yellowCountFor(pid){return LIVE_EV.filter(function(e){return e.type==="yellow"&&e.player_id===pid;}).length;}
function isExpelled(pid){return LIVE_EV.some(function(e){return e.player_id===pid&&(e.type==="red"||(e.type==="yellow"&&e.detail==="2"));});}
function actsFor(pid){
  let s="";
  for(const k in ACT_ICON){
    const n=LIVE_EV.filter(function(e){return e.player_id===pid&&e.type===k;}).length;
    if(n)s+=ACT_ICON[k]+(n>1?n:"");
  }
  return s;
}
function displayNum(p){
  if(LIVE){
    if(LIVE.source==="manual"&&LIVE.manualNum&&LIVE.manualNum[p.id]!=null&&LIVE.manualNum[p.id]!=="")return parseInt(LIVE.manualNum[p.id]);
    if(LIVE.source==="distinta"&&LIVE.distOrder&&LIVE.distOrder.length){
      const i=LIVE.distOrder.indexOf(p.id);
      if(i!==-1)return i+1;
    }
  }
  return p.jersey_number;
}
function baseList(){
  let list=[];
  if(LIVE&&LIVE.source==="manual"&&LIVE.manual&&LIVE.manual.length){
    list=LIVE.manual.map(function(id){return pById(id);}).filter(Boolean);
    list.sort(function(a,b){return (displayNum(a)||99)-(displayNum(b)||99);});
    return list;
  }
  if(LIVE&&LIVE.distOrder&&LIVE.distOrder.length){
    list=LIVE.distOrder.map(function(id){return pById(id);}).filter(Boolean);
    return list;
  }
  list=PLAYERS.filter(function(p){const x=LIVE_MP[p.id];return x?x.convocated:true;});
  list.sort(function(a,b){return (a.jersey_number||99)-(b.jersey_number||99);});
  return list;
}
function srcLabel(){
  if(!LIVE)return "";
  if(LIVE.source==="manual")return "✍️ Formazione scelta da te · trascina le card per spostarle";
  if(LIVE.distOrder&&LIVE.distOrder.length)return "📋 Formazione dall'ultima distinta salvata · trascina le card per spostarle";
  return "🔢 Nessuna distinta caricata: premi 👥 Rosa e scegli quale usare";
}
function liveClockSec(){
  if(!LIVE)return 0;
  if(LIVE.phase==="running"&&LIVE.runStart){return LIVE.accumulated+Math.floor((Date.now()-LIVE.runStart)/1000);}
  return LIVE.accumulated||0;
}
function openLiveFor(id){
  const m=PARTITE.find(function(x){return x.id===id;});if(!m)return;
  if(!LIVE||LIVE.matchId!==id){
    LIVE={matchId:id,clock:0,half:1,phase:"idle",halfDurations:[35*60,35*60],runStart:null,accumulated:0,home:(m.score_home||0),away:(m.score_away||0),rec1:0,rec2:0,source:"distinta",manual:[],manualNum:{},whistleHalf:0,distOrder:null,positions:{},modulo:"4-4-2"};
    normalizeLive();
    REAL_SEC=0;SETTINGS.live=LIVE;persistSettings();
  }
  normalizeLive();
  CUR_PART=m;
  Promise.all([loadLiveMp(id),refreshLiveEv(),loadDistOrder(id)]).then(function(){
    $("partHub").classList.add("hidden");$("partManual").classList.add("hidden");$("partLive").classList.remove("hidden");
    updateScoreLine();updateLiveUI();renderPitch();renderLiveEvents();updateLiveButtons();
    if(LIVE_UI_TIMER){clearInterval(LIVE_UI_TIMER);}
    LIVE_UI_TIMER=setInterval(function(){updateLiveUI();},1000);
  });
}
window.openSquadChoiceSheet=function(){
  if(!LIVE)return;
  $("shLiveName").textContent="👥 Da dove prendo la formazione?";
  const sbd=$("sheetLiveBody");if(!sbd)return;
  sbd.innerHTML='<p style="font-size:13px;color:#475569">Scegli una distinta salvata oppure componi la formazione a mano.</p>'+
    '<label>Distinte salvate</label><select id="distPick"><option value="">caricamento…</option></select>'+
    '<button class="btn" onclick="setSquadDistinta()">📋 Usa questa distinta</button>'+
    '<button class="btn sec" onclick="openManualSquadSheet()">✍️ Li scelgo io (con numeri miei)</button>';
  $("sheetLive").classList.remove("hidden");
  populateDistPick();
};
function populateDistPick(){
  sb.from("doc_history").select("id,match_id,created_at,matches(date,opponent)").eq("club_id",CLUB_ID).eq("doc_type","dist").order("created_at",{ascending:false}).limit(15).then(function(r){
    const sel=$("distPick");if(!sel)return;
    const rows=r.data||[];
    if(!rows.length){sel.innerHTML='<option value="">Nessuna distinta salvata</option>';return;}
    sel.innerHTML=rows.map(function(x){const m=x.matches||{};return '<option value="'+x.id+'">'+(m.date?m.date.split("-").reverse().join("/"):"")+' vs '+(m.opponent||"?")+'</option>';}).join("");
    const cur=rows.find(function(x){return x.match_id===LIVE.matchId;});
    if(cur)sel.value=cur.id;
  });
}
window.setSquadDistinta=async function(){
  if(!LIVE)return;
  const sel=$("distPick");
  if(!sel||!sel.value){alert("Nessuna distinta selezionata: salvane una dalla sezione Distinta.");return;}
  const r=await sb.from("doc_history").select("data").eq("id",sel.value).maybeSingle();
  if(!r.data||!r.data.data||!r.data.data.rows||!r.data.data.rows.length){alert("Distinta vuota.");return;}
  LIVE.source="distinta";
  LIVE.distOrder=r.data.data.rows.filter(function(x){return x;});
  LIVE.positions={};
  normalizeLive();
  SETTINGS.live=LIVE;await persistSettings();
  closeLiveSheet();renderPitch();
};
window.openManualSquadSheet=function(){
  if(!LIVE)return;
  $("shLiveName").textContent="✍️ Scegli giocatori e numeri";
  const sbd=$("sheetLiveBody");if(!sbd)return;
  const cur=LIVE.manual&&LIVE.manual.length?LIVE.manual:PLAYERS.map(function(p){return p.id;});
  sbd.innerHTML='<p style="font-size:11px;color:#64748b">Spunta chi portare e assegna il numero. I primi 11 (in ordine di numero) vanno in campo; potrai trascinarli dove vuoi.</p><div style="max-height:220px;overflow:auto;border:1px solid #e2e8f0;border-radius:10px;padding:6px">'+PLAYERS.map(function(p){
    const chk=cur.indexOf(p.id)!==-1;
    const num=(LIVE.manualNum&&LIVE.manualNum[p.id]!=null&&LIVE.manualNum[p.id]!=="")?LIVE.manualNum[p.id]:(p.jersey_number||"");
    return '<label class="chkRow"><input type="checkbox" class="manChk2" value="'+p.id+'"'+(chk?" checked":"")+'><input type="number" class="manNum2" data-id="'+p.id+'" value="'+num+'" min="1" max="99" style="width:54px;padding:3px;font-size:12px"> '+p.last_name+'</label>';
  }).join("")+'</div><button class="btn ok" onclick="confirmManualSquad()">✅ Conferma</button>';
  $("sheetLive").classList.remove("hidden");
};
window.confirmManualSquad=async function(){
  if(!LIVE)return;
  const ids=[];const nums={};
  document.querySelectorAll(".manChk2").forEach(function(c){if(c.checked)ids.push(c.value);});
  document.querySelectorAll(".manNum2").forEach(function(n){nums[n.dataset.id]=n.value;});
  if(ids.length<11){alert("Seleziona almeno 11 giocatori");return;}
  LIVE.source="manual";LIVE.manual=ids;LIVE.manualNum=nums;LIVE.positions={};
  normalizeLive();
  SETTINGS.live=LIVE;await persistSettings();
  closeLiveSheet();renderPitch();
};
function updateScoreLine(){
  const m=PARTITE.find(function(x){return x.id===LIVE.matchId;});
  const sc=$("lvScore");if(sc)sc.textContent="BORGARO "+(LIVE.home||0)+"-"+(LIVE.away||0)+" "+(m?m.opponent:"");
}
function updateLiveButtons(){
  const lp=$("lvPlay");
  const lh=$("lvHalf");
  const bm=$("btnModulo");
  if(bm&&LIVE)bm.textContent="🧩 "+(LIVE.modulo||"4-4-2");
  if(!LIVE||!lp)return;
  if(lh)lh.textContent=LIVE.half+"° Tempo"+(LIVE.halfDurations&&LIVE.halfDurations.length>1?" (di "+LIVE.halfDurations.length+")":"");
  if(LIVE.phase==="idle"||LIVE.phase==="halftime"){lp.textContent="▶ AVVIA";lp.style.background="#16a34a";lp.disabled=false;lp.onclick=liveStart;}
  else if(LIVE.phase==="running"){lp.textContent="⏸ PAUSA";lp.style.background="#64748b";lp.disabled=false;lp.onclick=livePause;}
  else if(LIVE.phase==="paused"){lp.textContent="▶ RIPRENDI";lp.style.background="#16a34a";lp.disabled=false;lp.onclick=liveResume;}
}
window.liveStart=async function(){
  if(!LIVE)return;
  LIVE.phase="running";LIVE.runStart=Date.now();
  SETTINGS.live=LIVE;await persistSettings();
  updateLiveButtons();
};
window.livePause=async function(){
  if(!LIVE||LIVE.phase!=="running")return;
  LIVE.accumulated=(LIVE.accumulated||0)+Math.floor((Date.now()-LIVE.runStart)/1000);
  LIVE.runStart=null;LIVE.phase="paused";
  SETTINGS.live=LIVE;await persistSettings();
  updateLiveButtons();updateLiveUI();
};
window.liveResume=async function(){
  if(!LIVE||LIVE.phase!=="paused")return;
  LIVE.phase="running";LIVE.runStart=Date.now();
  SETTINGS.live=LIVE;await persistSettings();
  updateLiveButtons();
};
window.liveStop=async function(){
  if(!LIVE)return;
  if(LIVE.phase==="running"){LIVE.accumulated=(LIVE.accumulated||0)+Math.floor((Date.now()-LIVE.runStart)/1000);LIVE.runStart=null;}
  LIVE.phase="paused";
  SETTINGS.live=LIVE;await persistSettings();
  updateLiveButtons();updateLiveUI();
};
window.liveSetHalf=async function(d){
  if(!LIVE)return;
  const max=LIVE.halfDurations.length;
  let nh=LIVE.half+d;
  if(nh<1)nh=1;if(nh>max)nh=max;
  if(nh===LIVE.half)return;
  if(LIVE.phase==="running"){LIVE.accumulated=(LIVE.accumulated||0)+Math.floor((Date.now()-LIVE.runStart)/1000);LIVE.runStart=null;}
  LIVE.half=nh;LIVE.accumulated=0;LIVE.phase="idle";LIVE.whistleHalf=0;
  SETTINGS.live=LIVE;await persistSettings();
  updateLiveButtons();updateLiveUI();
};
function fmt(sec){const m=Math.floor(sec/60),s=sec%60;return String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");}
function updateLiveUI(){
  if(!LIVE)return;
  const clock=liveClockSec();
  const halfDur=(LIVE.halfDurations&&LIVE.halfDurations[LIVE.half-1])||2100;
  const rest=Math.max(0,halfDur-clock);
  const lc=$("lvClock");if(lc){lc.textContent=fmt(clock);lc.style.color=(clock>halfDur?"#f87171":"#4ade80");}
  const lr=$("lvRest");if(lr)lr.textContent=(clock>halfDur?"Extra +":"Restanti ")+fmt(clock>halfDur?clock-halfDur:rest);
  const t1=$("lvT1");if(t1)t1.textContent=LIVE.half+"°T "+Math.floor(clock/60)+"'";
  const t2=$("lvT2");if(t2)t2.textContent="Tempi: "+LIVE.half+"/"+LIVE.halfDurations.length;
  const tt=$("lvTot");if(tt)tt.textContent="Fase: "+(LIVE.phase==="running"?"in gioco":LIVE.phase==="paused"?"pausa":"ferma");
  const rc=$("lvRec");if(rc)rc.textContent="Rec 1°T +"+(LIVE.rec1||0)+"' · Rec 2°T +"+(LIVE.rec2||0)+"'";
  const rl=$("lvReal");if(rl){REAL_SEC++;rl.textContent="Tempo reale: "+fmt(REAL_SEC);}
  if(LIVE.phase==="running"&&clock>=halfDur&&LIVE.whistleHalf!==LIVE.half){
    LIVE.whistleHalf=LIVE.half;
    playWhistle();vibrateNow();
  }
}
function attachDrag(el,pid){
  let sx=null,sy=null,ox=0,oy=0,moved=false;
  el.addEventListener("pointerdown",function(e){
    sx=e.clientX;sy=e.clientY;moved=false;
    const pr=el.offsetParent.getBoundingClientRect();
    const r=el.getBoundingClientRect();
    ox=(r.left+r.width/2-pr.left)/pr.width*100;
    oy=(r.top+r.height/2-pr.top)/pr.height*100;
    el.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  el.addEventListener("pointermove",function(e){
    if(sx==null)return;
    const dx=e.clientX-sx,dy=e.clientY-sy;
    if(!moved&&Math.abs(dx)+Math.abs(dy)<8)return;
    moved=true;
    const pr=el.offsetParent.getBoundingClientRect();
    let nx=ox+dx/pr.width*100, ny=oy+dy/pr.height*100;
    nx=Math.max(5,Math.min(95,nx)); ny=Math.max(4,Math.min(96,ny));
    el.style.left=nx+"%"; el.style.top=ny+"%";
    if(!LIVE.positions)LIVE.positions={};
    LIVE.positions[pid]={x:nx,y:ny};
  });
  el.addEventListener("pointerup",function(e){
    if(moved){persistSettings();}
    else{openPlayerSheet(pid);}
    sx=sy=null;
  });
  el.addEventListener("pointercancel",function(){sx=sy=null;});
}
function renderPitch(){
  const lp=$("lvPitch"),lb=$("lvBench");if(!lp)return;
  lp.className="pitch2";
  let sl=$("lvSrcLbl");
  if(!sl&&lp.parentNode){sl=document.createElement("div");sl.id="lvSrcLbl";sl.className="srcLbl";lp.parentNode.insertBefore(sl,lp);}
  if(sl)sl.textContent=srcLabel();
  const base=baseList();
  const subInIds=LIVE_EV.filter(function(e){return e.type==="sub_in";}).map(function(e){return e.player_id;});
  const subOutIds=LIVE_EV.filter(function(e){return e.type==="sub_out";}).map(function(e){return e.player_id;});
  const start11=base.slice(0,11);
  let inCampo=start11.filter(function(p){return subOutIds.indexOf(p.id)===-1&&!isExpelled(p.id);}).concat(subInIds.map(function(id){return pById(id);}).filter(function(p){return p&&!isExpelled(p.id);}));
  if(inCampo.length>11)inCampo=inCampo.slice(0,11);
  const inIds=inCampo.map(function(p){return p.id;});
  const panchina=base.filter(function(p){return inIds.indexOf(p.id)===-1&&!isExpelled(p.id);});
  const espulsi=base.filter(function(p){return isExpelled(p.id);});

  const plan=MODULI[(LIVE&&LIVE.modulo)||"4-4-2"]||MODULI["4-4-2"];
  const defPos={};
  let idx=0;
  plan.forEach(function(row,r){
    row.forEach(function(count,c){
      if(idx<inCampo.length){
        const p=inCampo[idx++];
        const x=50+(c-(count-1)/2)*17;
        const y=8+r*(80/Math.max(1,plan.length-1));
        defPos[p.id]={
          x:Math.max(6,Math.min(94,x)),
          y:Math.max(5,Math.min(94,y))
        };
      }
    });
  });

  const cardHtml=function(p,cls,drag,pos,mini){
    const g=golCountFor(p.id);
    const y=yellowCountFor(p.id);
    const acts=actsFor(p.id);
    const style=drag?('style="left:'+pos.x+'%;top:'+pos.y+'%"'):"";
    return '<div class="futcard '+cls+(mini?" mini":"")+(drag?" drag":"")+'" data-pid="'+p.id+'" '+style+' '+(drag?"":'onclick="openPlayerSheet(\''+p.id+'\')"')+'>'+
      '<img class="crest" src="'+clubLogo()+'" alt="">'+
      (g>0?'<span class="gols">'+g+'</span>':'')+(y>0?'<span class="yell">'+y+'</span>':'')+
      '<span class="num">'+(displayNum(p)||"-")+'</span><span class="nm">'+p.last_name+'</span>'+
      (acts?'<span class="acts">'+acts+'</span>':'')+'</div>';
  };
  let area='<div class="pitchArea">';
  inCampo.forEach(function(p){
    const pos=(LIVE.positions&&LIVE.positions[p.id])||defPos[p.id]||{x:50,y:50};
    const cls=(isGk(p)?"c-grigio":"c-blu");
    area+=cardHtml(p,cls,true,pos,false);
  });
  area+='</div>';
  let stand='<div class="stand">';for(let i=0;i<26;i++)stand+='<i></i>';stand+='</div>';
  lp.innerHTML=stand+area;
  lp.querySelectorAll(".futcard.drag").forEach(function(el){attachDrag(el,el.dataset.pid);});
  if(lb)lb.innerHTML=(panchina.length?'<div class="benchGrid">'+panchina.map(function(p){return cardHtml(p,(isGk(p)?"c-rosso":"c-giallo")+(subOutIds.indexOf(p.id)!==-1?" out":""),false,null,true);}).join("")+'</div>':'<div style="color:#94a3b8;font-size:11px;text-align:center;padding:6px">Nessuno in panchina</div>')+
    (espulsi.length?'<div style="color:#fca5a5;font-size:11px;font-weight:800;margin-top:8px;text-align:center">ESPULSI: '+espulsi.map(function(p){return "#"+(displayNum(p)||"-")+" "+p.last_name;}).join(", ")+' (fuori gioco)</div>':'');
}
window.cycleModulo=function(){
  if(!LIVE)return;
  const keys=Object.keys(MODULI);
  const i=keys.indexOf(LIVE.modulo||"4-4-2");
  LIVE.modulo=keys[(i+1)%keys.length];
  LIVE.positions={};
  persistSettings();
  renderPitch();
  updateLiveButtons();
};
function isGk(p){const n=displayNum(p);return n===1||n===12;}
window.openPlayerSheet=function(pid){
  if(!LIVE)return;
  const p=pById(pid);if(!p)return;
  if(isExpelled(pid)){alert("Giocatore espulso: fuori gioco, non può essere sostituito né fare eventi.");return;}
  LIVE_SEL=pid;
  const inCampo=onFieldIds().indexOf(pid)!==-1;
  $("shLiveName").textContent="#"+(displayNum(p)||"-")+" "+p.last_name+(inCampo?" (in campo)":" (panchina)");
  let opts=[];
  if(!inCampo)opts.push("sub_in");
  if(isGk(p)){opts=opts.concat(["save","goal_against","goal","assist","yellow","red"]);}
  else{opts=opts.concat(["goal","assist","shot","yellow","red"]);}
  if(inCampo)opts.push("sub_out");
  const sbd=$("sheetLiveBody");if(!sbd)return;
  sbd.innerHTML='<div class="evGrid">'+opts.map(function(t){return '<button onclick="eventPick(\''+pid+'\',\''+t+'\')">'+EV_LABEL[t]+'</button>';}).join("")+'</div>';
  $("sheetLive").classList.remove("hidden");
};
window.eventPick=function(pid,t){
  if(t==="shot"){
    $("shLiveName").textContent="💥 Esito del tiro";
    $("sheetLiveBody").innerHTML='<div class="evGrid"><button onclick="liveEventFor(\''+pid+'\',\'shot\',\'parato\')">🧤 Parato</button><button onclick="liveEventFor(\''+pid+'\',\'shot\',\'fuori\')">❌ Fuori</button></div>';
    return;
  }
  if(t==="yellow"){
    $("shLiveName").textContent="🟨 Quale ammonizione?";
    $("sheetLiveBody").innerHTML='<div class="evGrid"><button onclick="liveEventFor(\''+pid+'\',\'yellow\',\'1\')">1° giallo</button><button onclick="liveEventFor(\''+pid+'\',\'yellow\',\'2\')">2° giallo (espulsione)</button></div>';
    return;
  }
  if(t==="assist"){
    const mates=onFieldIds().filter(function(id){return id!==pid;}).map(function(id){return pById(id);}).filter(Boolean);
    $("shLiveName").textContent="🎯 Assist a chi? (solo in campo)";
    $("sheetLiveBody").innerHTML='<label>Compagno in campo che ha segnato</label><select id="assistTo">'+mates.map(function(p){return '<option value="'+p.id+'">#'+(displayNum(p)||"-")+' '+p.last_name+'</option>';}).join("")+'</select><button class="btn ok" onclick="liveEventFor(\''+pid+'\',\'assist\',null,document.getElementById(\'assistTo\').value)">✅ Conferma assist</button>';
    return;
  }
  if(t==="sub_in"||t==="sub_out"){closeLiveSheet();openSubSheet();return;}
  liveEventFor(pid,t);
};
window.liveEventFor=async function(pid,t,detail,secondId){
  if(!LIVE)return;
  const min=Math.floor(liveClockSec()/60);
  await sb.from("match_events").insert({match_id:LIVE.matchId,player_id:pid,type:t,minute:min,half:LIVE.half,detail:detail||null,second_player_id:secondId||null});
  if(t==="goal")LIVE.home=(LIVE.home||0)+1;
  if(t==="goal_against")LIVE.away=(LIVE.away||0)+1;
  SETTINGS.live=LIVE;await persistSettings();
  await refreshLiveEv();
  updateScoreLine();renderPitch();renderLiveEvents();closeLiveSheet();
};
function golSummaryFrom(golEvts){
  const by={};
  golEvts.forEach(function(e){if(!by[e.player_id])by[e.player_id]=[];by[e.player_id].push((e.minute||0)+"' "+(e.half===1?"PT":"ST"));});
  const ids=Object.keys(by);
  if(!ids.length)return "nessuno";
  return ids.map(function(id){
    let balls="";for(let i=0;i<by[id].length;i++)balls+='<img class="ballimg" src="'+BALL+'" alt="gol">';
    return "<b>"+cognomeOf(id)+"</b> "+balls+" <span style='font-size:10px'>("+by[id].join(", ")+")</span>";
  }).join(" · ");
}
window.toggleEventsPanel=function(){
  const p=$("liveEventsPanel");if(!p)return;
  p.classList.toggle("hidden");
  if(!p.classList.contains("hidden")){const ep=$("evListPanel");if(ep)ep.innerHTML=evListHtml();}
};
function matchSummaryText(){
  if(!LIVE)return "";
  const m=PARTITE.find(function(x){return x.id===LIVE.matchId;});
  const dateFmt=m?m.date.split("-").reverse().join("/"):"";
  const comp=m?m.competition:"";
  const avv=m?m.opponent:"";
  const campo=m?(m.home?"casa":"trasferta"):"";
  let t="🏟️ *"+(clubInfo().den||"BORGARO")+" vs "+avv+"*\n";
  t+="📅 "+dateFmt+" · "+comp+" ("+campo+")\n";
  t+="⚽ Risultato: "+(LIVE.home||0)+"-"+(LIVE.away||0)+"\n\n";
  const golEvs=LIVE_EV.filter(function(e){return e.type==="goal";});
  t+="⚽ *MARCATORI*\n";
  if(!golEvs.length)t+="_nessuno_\n";
  else golEvs.forEach(function(e){t+="• "+(e.minute||0)+"' "+(e.half===1?"PT":"ST")+" "+cognomeOf(e.player_id)+"\n";});
  t+="\n🔄 *SOSTITUZIONI*\n";
  const subs=LIVE_EV.filter(function(e){return e.type==="sub_in";});
  if(!subs.length)t+="_nessuna_\n";
  else subs.forEach(function(si){
    const so=LIVE_EV.find(function(o){return o.type==="sub_out"&&o.minute===si.minute&&o.half===si.half;});
    t+="• "+(si.minute||0)+"' "+(si.half===1?"PT":"ST")+" "+cognomeOf(so?so.player_id:null)+" → "+cognomeOf(si.player_id)+"\n";
  });
  const amm=LIVE_EV.filter(function(e){return e.type==="yellow"||e.type==="red";});
  if(amm.length){
    t+="\n🟨 *SANZIONI*\n";
    amm.forEach(function(e){
      if(e.type==="red")t+="• "+(e.minute||0)+"' "+(e.half===1?"PT":"ST")+" 🟥 "+cognomeOf(e.player_id)+" (espulso)\n";
      else t+="• "+(e.minute||0)+"' "+(e.half===1?"PT":"ST")+" 🟨"+(e.detail==="2"?"🟨":"")+" "+cognomeOf(e.player_id)+(e.detail==="2"?" (espulso)":"")+"\n";
    });
  }
  const altri=LIVE_EV.filter(function(e){return e.type==="shot"||e.type==="save"||e.type==="assist";});
  if(altri.length){
    t+="\n📌 *ALTRI EVENTI*\n";
    altri.forEach(function(e){t+="• "+(e.minute||0)+"' "+(e.half===1?"PT":"ST")+" "+evLabel(e)+"\n";});
  }
  t+="\n🕒 "+LIVE.half+"° Tempo · "+fmt(liveClockSec());
  return t;
}
function subsSummaryText(){
  if(!LIVE)return "";
  const m=PARTITE.find(function(x){return x.id===LIVE.matchId;});
  const dateFmt=m?m.date.split("-").reverse().join("/"):"";
  const avv=m?m.opponent:"";
  let t="🏟️ *"+(clubInfo().den||"BORGARO")+" vs "+avv+"* — "+dateFmt+"\n";
  t+="⚽ Risultato: "+(LIVE.home||0)+"-"+(LIVE.away||0)+"\n\n";
  const golEvs=LIVE_EV.filter(function(e){return e.type==="goal";});
  t+="⚽ *MARCATORI*\n";
  if(!golEvs.length)t+="_nessuno_\n";
  else golEvs.forEach(function(e){t+="• "+(e.minute||0)+"' "+(e.half===1?"PT":"ST")+" "+cognomeOf(e.player_id)+"\n";});
  t+="\n🔄 *SOSTITUZIONI*\n";
  const subs=LIVE_EV.filter(function(e){return e.type==="sub_in";});
  if(!subs.length)t+="_nessuna_\n";
  else subs.forEach(function(si){
    const so=LIVE_EV.find(function(o){return o.type==="sub_out"&&o.minute===si.minute&&o.half===si.half;});
    t+="• "+(si.minute||0)+"' "+(si.half===1?"PT":"ST")+" "+cognomeOf(so?so.player_id:null)+" → "+cognomeOf(si.player_id)+"\n";
  });
  return t;
}
window.shareMatchSummary=async function(){
  const txt=matchSummaryText();
  if(!txt){alert("Nessun dato");return;}
  try{
    if(navigator.share){await navigator.share({text:txt});return;}
    await navigator.clipboard.writeText(txt);
    alert("✅ Riepilogo copiato! Incollalo in WhatsApp/Telegram.");
  }catch(e){prompt("Copia il testo qui sotto:",txt);}
};
window.shareSubsSummary=async function(){
  const txt=subsSummaryText();
  if(!txt){alert("Nessun dato");return;}
  try{
    if(navigator.share){await navigator.share({text:txt});return;}
    await navigator.clipboard.writeText(txt);
    alert("✅ Riepilogo copiato! Incollalo in WhatsApp/Telegram.");
  }catch(e){prompt("Copia il testo qui sotto:",txt);}
};
function evLabel(e){
  if(e.type==="shot")return "💥 Tiro "+(e.detail==="parato"?"parato":e.detail==="fuori"?"fuori":"");
  if(e.type==="assist")return "🎯 Assist a "+cognomeOf(e.second_player_id);
  if(e.type==="yellow")return e.detail==="2"?"🟨 2° giallo (espulso)":"🟨 1° giallo";
  if(e.type==="red")return "🟥 Espulso";
  const ic={goal:"⚽",save:"🧤",goal_against:"🥅",sub_in:"🔄 entra",sub_out:"🔄 esce"};
  return (ic[e.type]||e.type)+" "+cognomeOf(e.player_id);
}
function evListHtml(){
  if(!LIVE_EV.length)return '<div class="spin">Nessun evento</div>';
  const sorted=LIVE_EV.slice().sort(function(a,b){return (b.minute||0)-(a.minute||0);});
  return sorted.map(function(e){
    if(e.type==="sub_out")return "";
    if(e.type==="sub_in"){
      const so=LIVE_EV.find(function(o){return o.type==="sub_out"&&o.minute===e.minute&&o.half===e.half;});
      return '<div class="evItem"><span>🔄 #'+(so?displayNum(pById(so.player_id)):"")+' '+cognomeOf(so?so.player_id:"")+' → #'+displayNum(pById(e.player_id))+' '+cognomeOf(e.player_id)+'</span><span>'+(e.minute||0)+"' "+(e.half===1?"PT":"ST")+'</span></div>';
    }
    return '<div class="evItem"><span>'+evLabel(e)+'</span><span>'+(e.minute||0)+"' "+(e.half===1?"PT":"ST")+'</span></div>';
  }).join("");
}
function evSubListHtml(){
  const ins=LIVE_EV.filter(function(e){return e.type==="sub_in";}).sort(function(a,b){return (a.minute||0)-(b.minute||0);});
  if(!ins.length)return '<div style="color:#64748b;font-size:12px;text-align:center;padding:8px">Nessuna sostituzione fatta</div>';
  return ins.map(function(si){
    const so=LIVE_EV.find(function(o){return o.type==="sub_out"&&o.minute===si.minute&&o.half===si.half;});
    return '<div class="evItem"><span>🔄 #'+(so?displayNum(pById(so.player_id)):"")+' '+cognomeOf(so?so.player_id:"")+' → #'+displayNum(pById(si.player_id))+' '+cognomeOf(si.player_id)+'</span><span>'+(si.minute||0)+"' "+(si.half===1?"PT":"ST")+'</span></div>';
  }).join("");
}
function subsMade(){return LIVE_EV.filter(function(e){return e.type==="sub_in";}).length;}
function renderLiveEvents(){
  const lg=$("lvGolList");if(lg)lg.innerHTML=golSummaryFrom(LIVE_EV.filter(function(e){return e.type==="goal";}));
  const panel=$("liveEventsPanel");
  if(panel&&!panel.classList.contains("hidden")){
    const head='<div style="display:flex;justify-content:flex-end;margin-bottom:6px"><button class="btn ok" style="margin:0;width:auto;padding:8px 12px;font-size:12px" onclick="shareMatchSummary()">📤 Condividi</button></div>';
    const ep=$("evListPanel");if(ep)ep.innerHTML=head+evListHtml();
  }
}
window.closeLiveSheet=function(){const sl=$("sheetLive");if(sl)sl.classList.add("hidden");};
function onFieldIds(){
  const base=baseList();
  const subInIds=LIVE_EV.filter(function(e){return e.type==="sub_in";}).map(function(e){return e.player_id;});
  const subOutIds=LIVE_EV.filter(function(e){return e.type==="sub_out";}).map(function(e){return e.player_id;});
  const start11=base.slice(0,11).map(function(p){return p.id;});
  let inCampo=start11.filter(function(id){return subOutIds.indexOf(id)===-1&&!isExpelled(id);}).concat(subInIds.filter(function(id){return !isExpelled(id);}));
  if(inCampo.length>11)inCampo=inCampo.slice(0,11);
  return inCampo;
}
window.openSubSheet=function(){
  if(!LIVE)return;
  const made=subsMade();
  const remaining=Math.max(0,MAX_SUBS-made);
  $("shLiveName").textContent="🔄 Sostituzioni ("+made+"/"+MAX_SUBS+" fatte)";
  const pool=baseList();
  const subOutIds=LIVE_EV.filter(function(e){return e.type==="sub_out";}).map(function(e){return e.player_id;});
  const inCampo=onFieldIds();
  const outOpts=pool.filter(function(p){return inCampo.indexOf(p.id)!==-1;});
  const inOpts=pool.filter(function(p){return inCampo.indexOf(p.id)===-1&&subOutIds.indexOf(p.id)===-1&&!isExpelled(p.id);});
  const optOut='<option value="">—</option>'+outOpts.map(function(p){return '<option value="'+p.id+'">#'+(displayNum(p)||"-")+' '+p.last_name+'</option>';}).join("");
  const optIn='<option value="">—</option>'+inOpts.map(function(p){return '<option value="'+p.id+'">#'+(displayNum(p)||"-")+' '+p.last_name+'</option>';}).join("");
  let slots="";
  for(let i=0;i<MAX_SUBS;i++){
    const disabled=i>=remaining;
    slots+=
      '<div class="subCard '+(disabled?"subDisabled":"")+'">'+
        '<div class="sn"><span>Slot '+(i+1)+'</span><span>'+(disabled?"non disponibile":"disponibile")+'</span></div>'+
        '<div class="subGrid2">'+
          '<div class="subOutWrap"><label>Esce (in campo)</label><select class="lvSubOut" data-i="'+i+'" '+(disabled?"disabled":"")+'>'+optOut+'</select></div>'+
          '<div class="subInWrap"><label>Entra (panchina)</label><select class="lvSubIn" data-i="'+i+'" '+(disabled?"disabled":"")+'>'+optIn+'</select></div>'+
        '</div>'+
      '</div>';
  }
  const sbd=$("sheetLiveBody");if(!sbd)return;
  sbd.innerHTML='<div style="font-size:12px;font-weight:800;color:#1e3a8a;margin-bottom:6px">✍️ Da fare ora (ne restano '+remaining+')</div>'+slots+
    '<button class="btn ok" onclick="doLiveSubs()">💾 Salva sostituzioni</button>'+
    '<div style="font-size:12px;font-weight:800;color:#1e3a8a;margin:12px 0 4px">✅ Già fatte ('+made+'/'+MAX_SUBS+')</div>'+evSubListHtml()+
    '<div style="margin-top:10px"><button class="btn sec" onclick="shareSubsSummary()">📤 Riepilogo gol + sostituzioni</button></div>';
  $("sheetLive").classList.remove("hidden");
};
window.doLiveSubs=async function(){
  if(!LIVE)return;
  const made=subsMade();
  const remaining=MAX_SUBS-made;
  const outs=document.querySelectorAll("#sheetLiveBody .lvSubOut");
  const ins=document.querySelectorAll("#sheetLiveBody .lvSubIn");
  const min=Math.floor(liveClockSec()/60);
  const pairs=[];
  for(let i=0;i<outs.length&&i<remaining;i++){
    const out=outs[i].value;
    const inn=ins[i]?ins[i].value:"";
    if(out&&inn&&out!==inn)pairs.push([out,inn]);
  }
  if(!pairs.length){alert("Compila almeno una sostituzione (Esce + Entra).");return;}
  const evs=[];
  pairs.forEach(function(pr){
    evs.push({match_id:LIVE.matchId,player_id:pr[0],type:"sub_out",minute:min,half:LIVE.half});
    evs.push({match_id:LIVE.matchId,player_id:pr[1],type:"sub_in",minute:min,half:LIVE.half});
  });
  await sb.from("match_events").insert(evs);
  await refreshLiveEv();
  renderPitch();renderLiveEvents();
  openSubSheet();
  alert("Salvate "+pairs.length+" sostituzione/i.");
};
window.saveLiveToMatch=async function(){if(!LIVE)return;await sb.from("matches").update({score_home:LIVE.home,score_away:LIVE.away}).eq("id",LIVE.matchId);alert("Risultato salvato (partita ancora in corso).");};
window.finalizeLive=async function(){
  if(!LIVE)return;
  if(!confirm("Concludere definitivamente la partita e salvarla come completata?"))return;
  if(LIVE_UI_TIMER){clearInterval(LIVE_UI_TIMER);LIVE_UI_TIMER=null;}
  await sb.from("matches").update({status:"completed",score_home:LIVE.home,score_away:LIVE.away}).eq("id",LIVE.matchId);
  LIVE=null;SETTINGS.live=null;await persistSettings();await loadPartite();showPartHub();CAL_ALL=null;
};
window.exitLiveNoClose=async function(){
  if(LIVE&&LIVE.phase==="running"){await liveStop();}
  if(LIVE_UI_TIMER){clearInterval(LIVE_UI_TIMER);LIVE_UI_TIMER=null;}
  showPartHub();
};

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
  await loadPartite();await loadPartState(CUR_PART.id);CAL_ALL=null;
  $("pmTitle").textContent=(CUR_PART.home?"Casa":"Trasf")+" vs "+CUR_PART.opponent;
  renderPmRoster();renderPmSubs();
  alert("Dati salvati: ora formazione, marcatori e sostituzioni.");
};
function renderPmRoster(){const pr=$("pmRoster");if(!pr)return;if(!CUR_PART){pr.innerHTML='<div class="spin">Salva prima i dati partita</div>';return;}
  pr.innerHTML=PLAYERS.map(function(p){const s=PART_STATE[p.id];
    return '<div class="formRow"><div class="num">'+(p.jersey_number||"-")+'</div><div class="fn">'+p.last_name+' '+p.first_name+'</div><div class="st3"><button class="'+(s.starter?"on":"")+'" onclick="pmSetStato(\''+p.id+'\',\'T\')">Tit</button><button class="'+(!s.starter&&s.convocated?"on":"")+'" onclick="pmSetStato(\''+p.id+'\',\'P\')">Pan</button><button class="'+(!s.convocated?"on":"")+'" onclick="pmSetStato(\''+p.id+'\',\'F\')">Fuori</button></div><div class="stepper"><button onclick="pmAddGol(\''+p.id+'\',-1)">−</button><span>⚽'+s.gol+'</span><button onclick="pmAddGol(\''+p.id+'\',1)">+</button></div></div>';}).join("");}
window.pmSetStato=function(id,v){const s=PART_STATE[id];if(v==="T"){s.starter=true;s.convocated=true;}if(v==="P"){s.starter=false;s.convocated=true;}if(v==="F"){s.starter=false;s.convocated=false;}renderPmRoster();};
window.pmAddGol=function(id,d){PART_STATE[id].gol=Math.max(0,PART_STATE[id].gol+d);renderPmRoster();};
function renderPmSubs(){
  const ps=$("pmSubs");
  if(!ps)return;
  if(!CUR_PART){ps.innerHTML="";return;}

  let h="";
  for(let i=0;i<PM_SUB_SLOTS;i++){
    h+=
      '<div class="subCard">'+
        '<div class="sn"><span>Slot '+(i+1)+'</span><span>minuto + cambio</span></div>'+
        '<div class="subGrid3">'+
          '<div><label>Min</label><input type="number" class="pmSubMin"></div>'+
          '<div class="subOutWrap"><label>Esce</label><select class="pmSubOut">'+playerOpts()+'</select></div>'+
          '<div class="subInWrap"><label>Entra</label><select class="pmSubIn">'+playerOpts()+'</select></div>'+
        '</div>'+
      '</div>';
  }
  ps.innerHTML=h;
}
window.addPmSubSlot=function(){PM_SUB_SLOTS++;renderPmSubs();};
window.pmSaveSubs=async function(){if(!CUR_PART){alert("Salva prima i dati partita");return;}
  await sb.from("match_events").delete().eq("match_id",CUR_PART.id).in("type",["sub_in","sub_out"]);
  const ins=[];document.querySelectorAll("#pmSubs .subCard").forEach(function(sl){const min=parseInt(sl.querySelector(".pmSubMin").value)||0;const out=sl.querySelector(".pmSubOut").value;const inn=sl.querySelector(".pmSubIn").value;if(min>0&&out&&inn&&out!==inn){ins.push({match_id:CUR_PART.id,player_id:out,type:"sub_out",minute:min,half:1});ins.push({match_id:CUR_PART.id,player_id:inn,type:"sub_in",minute:min,half:1});}});
  if(ins.length)await sb.from("match_events").insert(ins);
  alert("Sostituzioni salvate!");};
window.pmSaveAll=async function(){
  if(!CUR_PART){alert("Salva prima i dati partita");return;}
  await sb.from("matches").update({score_home:parseInt($("pmGolHome").value)||0,score_away:parseInt($("pmGolAway").value)||0}).eq("id",CUR_PART.id);
  const rows=PLAYERS.map(function(p){return{match_id:CUR_PART.id,player_id:p.id,starter:PART_STATE[p.id].starter,convocated:PART_STATE[p.id].convocated};});
  await sb.from("match_players").upsert(rows,{onConflict:"match_id,player_id"});
  for(const p of PLAYERS){await sb.from("match_events").delete().eq("match_id",CUR_PART.id).eq("player_id",p.id).eq("type","goal");const g=PART_STATE[p.id].gol;if(g>0){const evs=[];for(let i=0;i<g;i++){evs.push({match_id:CUR_PART.id,player_id:p.id,type:"goal",half:1});}await sb.from("match_events").insert(evs);}}
  alert("Partita completa salvata!");showPartHub();CAL_ALL=null;};

function playerOpts(){return PLAYERS.map(function(p){return '<option value="'+p.id+'">'+p.last_name+' '+p.first_name+'</option>';}).join("");}
function populateMatchSelect(id){const e=$(id);if(!e)return;e.innerHTML=PARTITE.map(function(m){return '<option value="'+m.id+'">'+m.date.split("-").reverse().join("/")+' vs '+m.opponent+'</option>';}).join("");}
window.loadSubs=function(){
  const sm=$("sbMatch");
  if(!sm)return;

  let h="";
  for(let i=0;i<MAX_SUBS;i++){
    h+=
      '<div class="subCard">'+
        '<div class="sn"><span>Slot '+(i+1)+'</span><span>minuto + cambio</span></div>'+
        '<div class="subGrid3">'+
          '<div><label>Min</label><input type="number" class="subMin"></div>'+
          '<div class="subOutWrap"><label>Esce</label><select class="subOut">'+playerOpts()+'</select></div>'+
          '<div class="subInWrap"><label>Entra</label><select class="subIn">'+playerOpts()+'</select></div>'+
        '</div>'+
      '</div>';
  }

  const ss=$("subSlots");
  if(ss)ss.innerHTML=h;
  loadSubList();
};
window.addSubSlot=function(){
  const ss=$("subSlots");
  if(!ss)return;
  const i=ss.querySelectorAll(".subCard").length;
  ss.insertAdjacentHTML("beforeend",
    '<div class="subCard">'+
      '<div class="sn"><span>Slot '+(i+1)+'</span><span>minuto + cambio</span></div>'+
      '<div class="subGrid3">'+
        '<div><label>Min</label><input type="number" class="subMin"></div>'+
        '<div class="subOutWrap"><label>Esce</label><select class="subOut">'+playerOpts()+'</select></div>'+
        '<div class="subInWrap"><label>Entra</label><select class="subIn">'+playerOpts()+'</select></div>'+
      '</div>'+
    '</div>'
  );
};
window.saveSubs=async function(){const sm=$("sbMatch");if(!sm||!sm.value)return;const id=sm.value;await sb.from("match_events").delete().eq("match_id",id).in("type",["sub_in","sub_out"]);
  const ins=[];document.querySelectorAll("#subSlots .subCard").forEach(function(sl){const min=parseInt(sl.querySelector(".subMin").value)||0;const out=sl.querySelector(".subOut").value;const inn=sl.querySelector(".subIn").value;if(min>0&&out&&inn&&out!==inn){ins.push({match_id:id,player_id:out,type:"sub_out",minute:min,half:1});ins.push({match_id:id,player_id:inn,type:"sub_in",minute:min,half:1});}});
  if(ins.length)await sb.from("match_events").insert(ins);alert("Sostituzioni salvate!");loadSubList();};
async function loadSubList(){const sm=$("sbMatch");if(!sm||!sm.value)return;const r=await sb.from("match_events").select("*").eq("match_id",sm.value).eq("type","sub_in").order("minute");
  const sl=$("sbList");if(!sl)return;
  const made=(r.data||[]).length;
  const head='<div style="font-size:12px;font-weight:800;color:#1e3a8a;margin-bottom:6px">✅ Fatte '+made+'/'+MAX_SUBS+' · 🔁 Restanti '+Math.max(0,MAX_SUBS-made)+'</div>';
  if(!made){sl.innerHTML=head+'<div class="spin">Nessuna sostituzione</div>';return;}
  sl.innerHTML=head+r.data.map(function(e){return '<div class="evItem"><span>🔄 entra #'+numDi(e.player_id)+' '+cognomeOf(e.player_id)+'</span><span>'+e.minute+"'</span></div>";}).join("");}

window.openForm=async function(){const fm=$("fmMatch");if(!fm||!fm.value)return;CUR_PART=PARTITE.find(function(x){return x.id===fm.value;});await loadPartState(fm.value);refreshForm();};
function refreshForm(){const fr=$("fmRoster");if(!fr)return;fr.innerHTML=PLAYERS.map(function(p){const s=PART_STATE[p.id];
  return '<div class="formRow"><div class="num">'+(p.jersey_number||"-")+'</div><div class="fn">'+p.last_name+' '+p.first_name+'</div><div class="st3"><button class="'+(s.starter?"on":"")+'" onclick="fmSet(\''+p.id+'\',\'T\')">Tit</button><button class="'+(!s.starter&&s.convocated?"on":"")+'" onclick="fmSet(\''+p.id+'\',\'P\')">Pan</button><button class="'+(!s.convocated?"on":"")+'" onclick="fmSet(\''+p.id+'\',\'F\')">Fuori</button></div></div>';}).join("");}
window.fmSet=function(id,v){const s=PART_STATE[id];if(v==="T"){s.starter=true;s.convocated=true;}if(v==="P"){s.starter=false;s.convocated=true;}if(v==="F"){s.starter=false;s.convocated=false;}refreshForm();};
window.saveForm=async function(){if(!CUR_PART)return;const rows=PLAYERS.map(function(p){return{match_id:CUR_PART.id,player_id:p.id,starter:PART_STATE[p.id].starter,convocated:PART_STATE[p.id].convocated};});await sb.from("match_players").upsert(rows,{onConflict:"match_id,player_id"});alert("Formazione salvata!");};

function minusMinuti(hm,min){if(!hm)return "";var p=String(hm).split(":");var tot=parseInt(p[0])*60+parseInt(p[1])-min;if(tot<0)tot+=1440;return String(Math.floor(tot/60)).padStart(2,"0")+":"+String(tot%60).padStart(2,"0");}
function plusMinuti(hm,min){if(!hm)return "";var p=String(hm).split(":");var tot=parseInt(p[0])*60+parseInt(p[1])+min;if(tot<0)tot+=1440;tot=tot%1440;return String(Math.floor(tot/60)).padStart(2,"0")+":"+String(tot%60).padStart(2,"0");}
function birthFmt(d){return d?d.split("-").reverse().join("/"):"";}
function staffField(id,f){if(!id)return "";var s=STAFF.find(function(x){return x.id===id;});return s?(s[f]||""):"";}
window.showDoc=function(m){DOC_MODE=m;CONV_OVERRIDE=false;var dd=$("docTabD"),dc=$("docTabC");if(dd)dd.className="btn "+(m==="dist"?"":"sec");if(dc)dc.className="btn "+(m==="conv"?"":"sec");renderDoc();};
window.setDocStaff=function(role,id){DOC_STAFF[role]=id;buildDoc();};
window.setDocRow=function(i,id){DOC_ROWS[i]=id||"";refreshDistSelects();};
window.setDocCap=function(pid,v){if(pid)DOC_CAPS[pid]=v;};
window.docSyncTime=function(which){
  const tIn=$("docTime"),tRit=$("docRitrovo");
  if(!tIn||!tRit)return;
  if(which==="start"&&tIn.value){tRit.value=minusMinuti(tIn.value,75);}
  if(which==="rit"&&tRit.value){tIn.value=plusMinuti(tRit.value,75);}
};
function placeValue(){
  const sel=$("docPlace");if(!sel)return "";
  if(sel.value==="__altro"){return ($("docPlaceFree").value.trim()||"");}
  return sel.value;
}
function setPlaceSelect(v){
  const sel=$("docPlace");if(!sel)return;
  const vals=Array.from(sel.options).map(function(o){return o.value;});
  const free=$("docPlaceFree");
  if(vals.indexOf(v)!==-1){sel.value=v;if(free)free.classList.add("hidden");}
  else{sel.value="__altro";if(free){free.value=v;free.classList.remove("hidden");}}
}
window.docPlaceChange=function(){
  const sel=$("docPlace");const free=$("docPlaceFree");if(!sel||!free)return;
  if(sel.value==="__altro"){free.classList.remove("hidden");}
  else{free.classList.add("hidden");}
};
window.docOppChange=function(){
  const homeEl=$("docHome");if(!homeEl)return;
  const home=homeEl.value==="true";
  const t=teamByName($("docOpp").value);
  if(!home&&t){setPlaceSelect(t.short_name);}
};
window.docHomeChange=function(){
  const home=$("docHome").value==="true";
  if(home){setPlaceSelect(SETTINGS.luogo_default||(SETTINGS.luoghi&&SETTINGS.luoghi[0])||"");}
  else{const t=teamByName($("docOpp").value);if(t)setPlaceSelect(t.short_name);}
};
async function updateMatchMeta(){
  if(!CUR_DOC_MATCH)return;
  let opp=$("docOppFree").value.trim();if(!opp)opp=$("docOpp").value;
  await sb.from("matches").update({
    opponent:opp||CUR_DOC_MATCH.opponent,
    home:$("docHome").value==="true",
    date:$("docDate").value,
    time:$("docTime").value||null,
    place:placeValue()||CUR_DOC_MATCH.place,
    competition:$("docComp").value,
    category:$("docCat").value.trim()||"Under 14",
    referee:$("docRef").value.trim()
  }).eq("id",CUR_DOC_MATCH.id);
  await loadPartite();
  CUR_DOC_MATCH=PARTITE.find(function(x){return x.id===CUR_DOC_MATCH.id;})||CUR_DOC_MATCH;
}
window.saveDist=async function(){
  if(!CUR_DOC_MATCH)return;
  await updateMatchMeta();
  const r=await sb.from("match_players").select("*").eq("match_id",CUR_DOC_MATCH.id);
  const mpM={};(r.data||[]).forEach(function(x){mpM[x.player_id]=x;});
  const elenco=PLAYERS.filter(function(p){return inRosa(p,CUR_DOC_MATCH.date);});
  const rows=elenco.map(function(p){
    const pos=DOC_ROWS.indexOf(p.id);
    return{match_id:CUR_DOC_MATCH.id,player_id:p.id,convocated:pos!==-1,dist_order:pos!==-1?(pos+1):null,conv_note:mpM[p.id]?mpM[p.id].conv_note:null,starter:mpM[p.id]?mpM[p.id].starter:false};
  });
  let up=await sb.from("match_players").upsert(rows,{onConflict:"match_id,player_id"});
  if(up.error){
    const rows2=rows.map(function(x){const c={};for(const k in x){if(k!=="dist_order")c[k]=x[k];}return c;});
    up=await sb.from("match_players").upsert(rows2,{onConflict:"match_id,player_id"});
    if(up.error){alert("Errore salvataggio distinta: "+up.error.message);return;}
  }
  const srows=Object.keys(DOC_STAFF).filter(function(k){return DOC_STAFF[k];}).map(function(k){return{match_id:CUR_DOC_MATCH.id,role:k,staff_id:DOC_STAFF[k]};});
  for(const s of srows){await sb.from("match_staff").upsert(s,{onConflict:"match_id,role"});}
  const cleanRows=DOC_ROWS.slice(0,20);
  const cleanCaps={};
  cleanRows.forEach(function(id){if(id && DOC_CAPS[id]!=null) cleanCaps[id]=DOC_CAPS[id];});
  await sb.from("doc_history").insert({club_id:CLUB_ID,match_id:CUR_DOC_MATCH.id,doc_type:"dist",data:{rows:cleanRows,staff:DOC_STAFF,caps:cleanCaps}});
  if(LIVE&&LIVE.matchId===CUR_DOC_MATCH.id){
    LIVE.distOrder=cleanRows.filter(function(x){return x;});
    SETTINGS.live=LIVE;persistSettings();
    renderPitch();
  }
  alert("✅ DISTINTA SALVATA COMPLETA:\ndati intestazione + giocatori (ordine, numeri, CAP/V.CAP) + staff.");
  populateMatchSelect("docMatch");$("docMatch").value=CUR_DOC_MATCH.id;
  renderDoc();
};
window.saveConv=async function(){
  if(!CUR_DOC_MATCH)return;
  await updateMatchMeta();
  const rows=Object.keys(CONV_STATE).map(function(pid){return{match_id:CUR_DOC_MATCH.id,player_id:pid,convocated:CONV_STATE[pid].conv,conv_note:CONV_STATE[pid].note||null};});
  if(rows.length){const r=await sb.from("match_players").upsert(rows,{onConflict:"match_id,player_id"});if(r.error){alert("Errore salvataggio convocazione: "+r.error.message);return;}}
  await sb.from("doc_history").insert({club_id:CLUB_ID,match_id:CUR_DOC_MATCH.id,doc_type:"conv",data:{state:CONV_STATE}});
  CONV_OVERRIDE=true;
  alert("✅ CONVOCAZIONE SALVATA COMPLETA:\ndati intestazione + SI/NO e motivazioni.");
  populateMatchSelect("docMatch");$("docMatch").value=CUR_DOC_MATCH.id;
  renderDoc();
};
window.loadDocHistory=async function(){
  const sel=$("docHistSel");if(!sel||!sel.value)return;
  const r=await sb.from("doc_history").select("*").eq("id",sel.value).maybeSingle();
  if(!r.data)return;
  if(DOC_MODE==="dist"){
    DOC_ROWS=uniqRows(r.data.data.rows||[]).slice(0,20);
    while(DOC_ROWS.length<20)DOC_ROWS.push("");
    DOC_STAFF=r.data.data.staff||{};
    DOC_CAPS=r.data.data.caps||{};
    DOC_ROWS_MATCH=CUR_DOC_MATCH.id;
    buildDoc();
  }else{
    CONV_STATE=r.data.data.state||{};
    CONV_OVERRIDE=true;
    buildDoc();
  }
  alert("Versione storica caricata nel foglio. Premi SALVA per renderla quella corrente.");
};
function populateDocHistory(m){
  const sel=$("docHistSel");if(!sel)return;
  sb.from("doc_history").select("*").eq("match_id",m.id).eq("doc_type",DOC_MODE).order("created_at",{ascending:false}).limit(10).then(function(r){
    const rows=r.data||[];
    sel.innerHTML=rows.length?rows.map(function(x){const d=new Date(x.created_at);return '<option value="'+x.id+'">'+d.toLocaleDateString()+" "+d.toLocaleTimeString().slice(0,5)+'</option>';}).join(""):'<option value="">Nessuno storico</option>';
  });
}
window.renderDoc=function(){
  var dm=$("docMatch"),out=$("docOut");if(!dm||!out)return;
  var m=PARTITE.find(function(x){return x.id===dm.value;});
  CUR_DOC_MATCH=m||null;
  CONV_OVERRIDE=false;
  if(!m){out.innerHTML='<div class="spin">Nessuna partita</div>';return;}
  var dsb=$("docSaveBtn");if(dsb)dsb.classList.add("hidden");
  if(DOC_MODE==="dist"){
    Promise.all([
      sb.from("match_staff").select("*").eq("match_id",m.id),
      sb.from("doc_history").select("data").eq("match_id",m.id).eq("doc_type","dist").order("created_at",{ascending:false}).limit(1)
    ]).then(function(res){
      DOC_STAFF={};
      (res[0].data||[]).forEach(function(x){DOC_STAFF[x.role]=x.staff_id;});
      DOC_CAPS=(res[1].data&&res[1].data[0]&&res[1].data[0].data&&res[1].data[0].data.caps)||{};
      DOC_ROWS_MATCH=null;
      buildDoc();
    });
  }else{buildDoc();}
};
function docEditPanel(m,ritrovo,luogo){
  const isConv=(DOC_MODE==="conv");
  const luoghi=SETTINGS.luoghi||[];
  const isOtherPlace=luogo&&luoghi.indexOf(luogo)===-1&&!teamByName(luogo);
  const placeOpts=luoghi.map(function(x){return '<option value="'+x+'"'+(x===luogo?" selected":"")+'>'+x+'</option>';}).join("")+
    TEAMS.map(function(t){const addr=(t.address||"")+(t.city?(" – "+t.city):"");return '<option value="'+t.short_name+'"'+(t.short_name===luogo?" selected":"")+'>'+t.short_name+(addr?(" — "+addr):"")+'</option>';}).join("")+
    '<option value="__altro"'+(isOtherPlace?" selected":"")+'>Altro luogo…</option>';
  return '<div class="noPrint" style="border:2px dashed #1d4ed8;border-radius:12px;padding:10px;margin-bottom:12px;background:#f8fafc">'+
    '<b style="color:#1e3a8a">✏️ Dati documento — si salvano TUTTI insieme con il pulsante SALVA in fondo al foglio</b>'+
    '<div class="row"><div><label>Campo</label><select id="docHome" onchange="docHomeChange()"><option value="true"'+(m.home?" selected":"")+'>🏠 Casa</option><option value="false"'+(!m.home?" selected":"")+'>🚌 Trasferta</option></select></div><div><label>Avversario (società registrate)</label><select id="docOpp" onchange="docOppChange()">'+TEAMS.map(function(t){return '<option'+(t.short_name===m.opponent?" selected":"")+'>'+t.short_name+'</option>';}).join("")+'</select></div></div>'+
    '<div class="row"><div><label>O altro avversario (sovrascrive)</label><input id="docOppFree" placeholder="scrivi se non in elenco"></div><div><label>Luogo / campo</label><select id="docPlace" onchange="docPlaceChange()">'+placeOpts+'</select></div></div>'+
    '<div class="row"><div><label>Altro luogo (se "Altro luogo…")</label><input id="docPlaceFree" class="'+(isOtherPlace?"":"hidden")+'" value="'+(isOtherPlace?luogo:"")+'"></div><div><label>Arbitro (opzionale)</label><input id="docRef" value="'+(m.referee||"")+'" placeholder="non obbligatorio"></div></div>'+
    '<div class="row"><div><label>Data</label><input type="date" id="docDate" value="'+m.date+'"></div><div><label style="'+(isConv?"font-weight:800;color:#c8102e":"")+'">Orario inizio</label><input type="time" id="docTime" value="'+(m.time||"")+'" onchange="docSyncTime(\'start\')"></div></div>'+
    '<div class="row"><div><label style="'+(isConv?"font-weight:800;color:#c8102e":"")+'">Orario ritrovo (−1h15)</label><input type="time" id="docRitrovo" value="'+ritrovo+'" onchange="docSyncTime(\'rit\')"></div><div><label>Competizione</label><select id="docComp"><option'+(m.competition==="Campionato"?" selected":"")+'>Campionato</option><option'+(m.competition==="Coppa"?" selected":"")+'>Coppa</option><option'+(m.competition==="Amichevole"?" selected":"")+'>Amichevole</option><option'+(m.competition==="Torneo"?" selected":"")+'>Torneo</option></select></div></div>'+
    '<div class="row"><div><label>Categoria</label><input id="docCat" value="'+(m.category||"Under 14")+'"></div><div><label>🕘 Storico</label><select id="docHistSel"></select></div></div>'+
    '<button class="btn sec" onclick="loadDocHistory()">Carica versione storica</button></div>';
}
function convNoteText(){
  return "E' OBBLIGATORIO PRESENTARSI IN DIVISA DI RAPPRESENTANZA e BORSONE UFFICIALE DELLA SOCIETA'<br>"+
         "SI RACCOMANDA LA PUNTUALITA', IN CASO DI RITARDO E/O PROBLEMI, AVVISARE TEMPESTIVAMENTE IL DIRIGENTE<br>"+
         "SE RICHIESTO DAL DIRIGENTE, PORTARE CON SE UN DOCUMENTO DI IDENTITA' SEMPRE IN ORIGINALE<br>"+
         "IL MANCATO RISPETTO DI QUANTO SOPRA INDICATO E' DA CONSIDERARSI UN GRAVE INADEMPIMENTO DISCIPLINARE<br>"+
         "SALVO PER VALIDI E GIUSTIFICATI MOTIVI CHE SARANNO VALUTATI DALLO STAFF TECNICO e SOCIETARIO";
}
function uniqRows(arr){
  const seen={};
  return (arr||[]).filter(function(id){
    if(!id || seen[id]) return false;
    seen[id]=1;
    return true;
  });
}
function distOptions(pid){
  const used=DOC_ROWS.filter(function(id){return id && id!==pid;});
  const arr=DOC_ELENCO.filter(function(p){return used.indexOf(p.id)===-1;});
  if(pid){
    const cur=pById(pid);
    if(cur && arr.indexOf(cur)===-1) arr.unshift(cur);
  }
  return '<option value="">— scegli —</option>'+arr.map(function(p){
    return '<option value="'+p.id+'"'+(p.id===pid?' selected':'')+'>'+p.last_name+' '+p.first_name+'</option>';
  }).join("");
}
function refreshDistSelects(){
  const cnt={};DOC_ROWS.forEach(function(id){if(id){cnt[id]=(cnt[id]||0)+1;}});
  for(var i=0;i<20;i++){
    const pid=DOC_ROWS[i]||"";
    const p=pid?pById(pid):null;
    const sel=document.querySelector('#docOut select[data-row="'+i+'"]');
    if(sel) sel.innerHTML=distOptions(pid);
    const capTd=document.querySelector('#docOut td[data-cap-cell="'+i+'"]');
    if(capTd){const capVal=pid?(DOC_CAPS[pid]||""):"";capTd.innerHTML=pid?'<input class="capIn" value="'+capVal+'" onchange="setDocCap(\''+pid+'\',this.value)">':'';}
    const mTd=document.querySelector('#docOut td[data-matr="'+i+'"]');if(mTd)mTd.textContent=p?(p.figc_id||""):"";
    const dTd=document.querySelector('#docOut td[data-data="'+i+'"]');if(dTd)dTd.textContent=p?birthFmt(p.birth_date):"";
    const tTd=document.querySelector('#docOut td[data-tess="'+i+'"]');if(tTd)tTd.textContent=p?(p.card_number||""):"";
    const tr=document.querySelector('#docOut tr[data-tr="'+i+'"]');
    if(tr){const dup=pid&&cnt[pid]>1;tr.style.background=dup?"#fee2e2":"";}
  }
  const c=$("distCount");if(c)c.textContent=DOC_ROWS.filter(function(x){return x;}).length;
}
function buildDoc(){
  var m=CUR_DOC_MATCH,out=$("docOut");if(!m||!out)return;
  var ci=clubInfo(),logo=clubLogo();
  var ritrovo=minusMinuti(m.time,75);
  var luogo=m.place||SETTINGS.luogo_default;
  var viaLuogo=getVia(luogo);
  var viaAvv=getVia(m.opponent);
  var dataFmt=m.date.split("-").reverse().join("/");
  var gara=(ci.den+" VS "+teamOfficial(m.opponent));
  var titoloSoc=(ci.nome||"").replace(/\./g,"");
  var campoStampa=m.home?(luogo+(viaLuogo?(" "+viaLuogo):"")):(viaAvv||luogo+(viaLuogo?(" "+viaLuogo):""));
  sb.from("match_players").select("*").eq("match_id",m.id).then(function(r){
    var mpM={};(r.data||[]).forEach(function(x){mpM[x.player_id]=x;});
    var elenco=PLAYERS.filter(function(p){return inRosa(p,m.date);}).sort(function(a,b){return (a.jersey_number||99)-(b.jersey_number||99);});
    DOC_ELENCO=elenco;
    var h=docEditPanel(m,ritrovo,luogo);
    if(DOC_MODE==="dist"){
      var savedRows=elenco.filter(function(p){var x=mpM[p.id];return x&&x.convocated&&x.dist_order!=null;});
      var distSaved=savedRows.length>0;
      if(DOC_ROWS_MATCH!==m.id){
        DOC_ROWS_MATCH=m.id;
        if(distSaved){
          savedRows.sort(function(a,b){return (mpM[a.id].dist_order||0)-(mpM[b.id].dist_order||0);});
          DOC_ROWS=uniqRows(savedRows.map(function(p){return p.id;})).slice(0,20);
        }else{
          DOC_ROWS=[];
        }
        while(DOC_ROWS.length<20)DOC_ROWS.push("");
      }
      h+='<div class="noPrint" style="font-size:11px;font-weight:800;margin-bottom:6px;color:'+(distSaved?'#166534':'#92400e')+'">'+(distSaved?'📄 Distinta caricata dall\'ultimo salvataggio: nomi e CAP/V.CAP già compilati.':'🆕 Nuova distinta vuota: compila tu le righe. I giocatori già scelti non ricompariranno nelle altre tendine.')+'</div>';
      var cnt={};DOC_ROWS.forEach(function(id){if(id){cnt[id]=(cnt[id]||0)+1;}});
      var esclusi=elenco.filter(function(p){return DOC_ROWS.indexOf(p.id)===-1;});
      h+='<div class="docWrap">';
      h+='<div class="distSpacer"></div>';
      h+='<div class="distBar">DISTINTA GIOCATORI</div>';
      h+='<div class="distBarLight">INCONTRO di '+m.competition+'</div>';
      h+='<div class="distBarLight bold">'+gara+'</div>';
      h+='<div class="distSpacer"></div>';
      h+='<div class="docMetaRow"><span class="lbl">VALEVOLE PER:</span><span class="val">'+(m.competition||"Campionato")+' '+(m.category||"Under 14")+'</span></div>';
      h+='<div class="docMetaRow"><span class="lbl">DATA:</span><span class="val">'+dataFmt+'</span><span class="lbl">ORARIO:</span><span class="val">'+(m.time?fmtTime(m.time):"")+'</span><span class="lbl">CAMPO:</span><span class="val">'+campoStampa+'</span></div>';
      h+='<div class="distSpacer"></div>';
      h+='<div class="docScroll"><table class="docGrid">';
      h+='<tr><th rowspan="3" style="width:6%">N°</th><th rowspan="3">COGNOME e NOME</th><th style="width:11%">CAP</th><th rowspan="3" class="col-matr" style="width:13%">MATRICOLA</th><th style="width:14%">DATA</th><th class="col-tess" style="width:15%">TESSERA F.I.G.C.</th></tr>';
      h+='<tr><th>---</th><th>DI</th><th class="col-tess">o</th></tr>';
      h+='<tr><th>V.CAP</th><th>NASCITA</th><th class="col-tess">DOCUMENTO</th></tr>';
      for(var i=0;i<20;i++){
        var pid=DOC_ROWS[i];
        var p=elenco.find(function(x){return x.id===pid;});
        var dup=pid&&cnt[pid]>1;
        var capVal=pid?(DOC_CAPS[pid]||""):"";
        h+='<tr data-tr="'+i+'"'+(dup?' style="background:#fee2e2"':'')+'><td>'+(i+1)+'</td>'+
           '<td><select data-row="'+i+'" onchange="setDocRow('+i+',this.value)">'+distOptions(pid)+'</select>'+
           (dup?' <b style="color:#991b1b">⚠</b>':'')+'</td>'+
           '<td data-cap-cell="'+i+'">'+(pid?'<input class="capIn" value="'+capVal+'" onchange="setDocCap(\''+pid+'\',this.value)">':'')+'</td>'+
           '<td class="col-matr" data-matr="'+i+'">'+(p?(p.figc_id||""):"")+'</td>'+
           '<td data-data="'+i+'">'+(p?birthFmt(p.birth_date):"")+'</td>'+
           '<td class="col-tess" data-tess="'+i+'">'+(p?(p.card_number||""):"")+'</td></tr>';
      }
      h+='</table></div>';
      h+='<div class="distSpacer"></div>';
      h+='<div class="docScroll"><table class="docGrid">';
      RUOLI_STAFF.forEach(function(rl){
        var sel=DOC_STAFF[rl]||((STAFF.find(function(x){return (x.role||"").toUpperCase()===rl;})||{}).id)||"";
        var labs=STAFF_LAB[rl]||STAFF_LAB.DEFAULT;
        var sid=sel||"";
        h+='<tr><td class="rl" rowspan="2" style="width:32%">'+rl+'</td><td rowspan="2"><select onchange="setDocStaff(\''+rl.replace(/'/g,"\\'")+'\',this.value)"><option value="">— scegli —</option>'+STAFF.map(function(s){return '<option value="'+s.id+'"'+(sel===s.id?" selected":"")+'>'+s.full_name+'</option>';}).join("")+'</select></td><td class="lb" style="width:16%">'+labs[0]+'</td><td style="width:18%">'+staffField(sid,"figc_id")+'</td></tr>';
        h+='<tr><td class="lb">'+labs[1]+'</td><td>'+staffField(sid,"doc_id")+'</td></tr>';
      });
      h+='</table></div>';
      h+='<div class="distSpacer"></div>';
      h+='<div class="distDecl">Il sottoscritto Dirigente accompagnatore ufficiale dichiara che il presente elenco è redatto in ottemperanza a quanto stabilito dagli artt. 61 e 66 delle N.O.I.F.</div>';
      h+='<div class="distSpacer"></div>';
      h+='<div class="distSign"><div>L\'ARBITRO</div><div>IL DIRIGENTE ACCOMPAGNATORE UFFICIALE</div></div>';
      h+='</div>';
      h+='<div class="docBtns noPrint"><button class="btn ok" onclick="saveDist()">💾 SALVA DISTINTA (dati + giocatori + staff)</button></div>';
      h+='<div class="noPrint" style="margin-top:10px;border:2px dashed #f59e0b;border-radius:12px;padding:10px;background:#fffbeb">';
      h+='<b style="color:#92400e">🔎 CONTROLLO (non stampato):</b> ';
      h+='<div style="font-size:12px;margin-top:6px">In distinta: <b id="distCount">'+DOC_ROWS.filter(function(x){return x;}).length+'</b> su 20 posti. ';
      var dupN=Object.keys(cnt).filter(function(k){return cnt[k]>1;}).length;
      if(dupN>0)h+='<span class="vb rosso">⚠ '+dupN+' giocatore/i RIPETUTO/I!</span> ';
      h+='</div>';
      h+='<div style="font-size:12px;margin-top:6px"><b>NON inseriti ('+esclusi.length+'):</b> '+(esclusi.length?esclusi.map(function(p){return p.last_name+" "+p.first_name;}).join(", "):"nessuno, tutti considerati ✔")+'</div>';
      h+='</div>';
    }else{
      if(!CONV_OVERRIDE){
        CONV_STATE={};
        elenco.forEach(function(p){var x=mpM[p.id];CONV_STATE[p.id]={conv:x?x.convocated:true,note:x?(x.conv_note||""):""};});
      }
      var indirizzo=campoStampa;
      var totRighe=Math.max(26,elenco.length);
      h+='<div class="docWrap convWrap">';
      h+='<div class="convHead"><div class="logoBox"><img src="'+logo+'" alt="logo"><div class="aut">AUTOINGROS</div></div><div class="titleBox"><span>'+titoloSoc+'</span></div></div>';
      h+='<div class="convYellow">CONVOCAZIONE</div>';
      h+='<table class="convMeta">';
      h+='<tr><th>CATEGORIA</th><td class="center" colspan="3" style="font-size:16px;font-weight:900">'+(m.category||"Under14")+'</td></tr>';
      h+='<tr><th>PARTITA</th><td class="center" colspan="3" style="font-size:13px;font-weight:800">'+gara+'</td></tr>';
      h+='<tr><th>VALEVOLE PER</th><td colspan="3" style="font-size:9px">'+(m.competition||"Campionato")+' Regionale U14</td></tr>';
      h+='<tr><th>DATA</th><td style="width:32%">'+dataFmt+'</td><th style="width:110px">ORARIO RITROVO</th><td style="width:20%">'+ritrovo+'</td></tr>';
      h+='<tr><th>INDIRIZZO</th><td colspan="3">'+indirizzo+'</td></tr>';
      h+='</table>';
      h+='<table class="convGrid"><tr><th style="width:5%">N°</th><th style="width:27%">COGNOME</th><th style="width:27%">NOME</th><th style="width:16%">CONVOCATO SI/NO</th><th style="width:25%">MOTIVAZIONE E/O NOTE</th></tr>';
      for(var j=0;j<totRighe;j++){
        var pl=elenco[j];
        if(pl){
          var s=CONV_STATE[pl.id]||{conv:true,note:""};
          h+='<tr><td>'+(j+1)+'</td><td>'+pl.last_name+'</td><td>'+pl.first_name+'</td>'+
             '<td><select onchange="convSet(\''+pl.id+'\',\'conv\',this.value)"><option value="1"'+(s.conv?" selected":"")+'>SI</option><option value="0"'+(!s.conv?" selected":"")+'>NO</option></select></td>'+
             '<td><select onchange="convSet(\''+pl.id+'\',\'note\',this.value)">'+MOTIVI_CONV.map(function(o){return '<option'+(s.note===o?" selected":"")+'>'+o+'</option>';}).join("")+'</select></td></tr>';
        }else{
          h+='<tr><td>'+(j+1)+'</td><td></td><td></td><td></td><td></td></tr>';
        }
      }
      h+='</table>';
      h+='<div class="convNote">'+convNoteText()+'</div>';
      h+='<div class="convSign"><div class="l">IL DIRIGENTE:</div><div class="m"></div><div class="r">DATA: '+dataFmt+'</div></div>';
      h+='</div>';
      h+='<div class="docBtns noPrint"><button class="btn ok" onclick="saveConv()">💾 SALVA CONVOCAZIONE (dati + SI/NO)</button></div>';
    }
    out.innerHTML=h;
    populateDocHistory(m);
  });
}
window.convSet=function(id,field,val){if(!CONV_STATE[id])CONV_STATE[id]={conv:true,note:""};CONV_STATE[id][field]=(field==="conv")?(val==="1"):val;};

/* ===== CALENDARIO GENERALE ROBUSTO ===== */
async function loadCalGen(){
  try{
    const rs=await sb.from("sessions").select("*").eq("club_id",CLUB_ID).order("date");
    const rm=await sb.from("matches").select("*").eq("club_id",CLUB_ID).order("date");
    CALGEN_DATA={sessions:rs.data||[],matches:rm.data||[]};
  }catch(e){
    console.error("Errore carico calendario:",e);
    CALGEN_DATA={sessions:[],matches:[]};
  }
}

window.renderCalView=async function(){
  const vc=$("viewCal");
  if(!vc)return;

  try{
    await loadCalGen();

    if(!$("calGenCard")){
      vc.innerHTML=
        '<div class="card cgCard" id="calGenCard">'+
          '<div class="cgHead">'+
            '<button class="cgNav" onclick="calGenPrev()">‹</button>'+
            '<div class="cgTitleWrap">'+
              '<div class="cgMonth" id="calGenTitle"></div>'+
              '<div class="cgSub">Tocca un giorno per i dettagli</div>'+
            '</div>'+
            '<button class="cgNav" onclick="calGenNext()">›</button>'+
          '</div>'+
          '<div class="cgWeek"><div>Lun</div><div>Mar</div><div>Mer</div><div>Gio</div><div>Ven</div><div>Sab</div><div>Dom</div></div>'+
          '<div class="cgGrid" id="calGenWrap"></div>'+
          '<div class="cgLegend">'+
            '<span><i style="background:#16a34a"></i> Allenamento</span>'+
            '<span><i style="background:#2563eb"></i> Partita</span>'+
            '<span><i style="background:#dc2626"></i> Live</span>'+
          '</div>'+
          '<div class="cgPanel" id="calGenList"></div>'+
        '</div>';
    }

    if(!CALGEN_SEL||!/^\d{4}-\d{2}-\d{2}$/.test(CALGEN_SEL)){
      CALGEN_SEL=isoOf(new Date());
    }

    const cur=new Date(CALGEN_SEL+"T00:00:00");
    if(!isNaN(cur.getTime())){
      CALGEN.y=cur.getFullYear();
      CALGEN.m=cur.getMonth();
    }

    $("calGenTitle").textContent=MESI[CALGEN.m]+" "+CALGEN.y;
    renderCalGenGrid();
    showDayList(CALGEN_SEL);
  }catch(e){
    console.error(e);
    vc.innerHTML='<div class="card"><h2>📅 Calendario</h2><div class="calError">Errore calendario: '+String(e.message||e)+'</div></div>';
  }
};

function renderCalGenGrid(){
  const wrap=$("calGenWrap");
  if(!wrap||!CALGEN_DATA)return;

  const y=CALGEN.y,m=CALGEN.m;
  const dow=(new Date(y,m,1).getDay()+6)%7;
  const days=new Date(y,m+1,0).getDate();
  const today=isoOf(new Date());

  const sMap={},mMap={};
  CALGEN_DATA.sessions.forEach(function(s){
    if(!s||!s.date)return;
    (sMap[s.date]=sMap[s.date]||[]).push(s);
  });
  CALGEN_DATA.matches.forEach(function(mm){
    if(!mm||!mm.date)return;
    (mMap[mm.date]=mMap[mm.date]||[]).push(mm);
  });

  let h="";
  for(let i=0;i<dow;i++) h+='<div class="cgCell empty"></div>';

  for(let d=1;d<=days;d++){
    const iso=y+"-"+String(m+1).padStart(2,"0")+"-"+String(d).padStart(2,"0");
    const ses=sMap[iso]||[];
    const mat=mMap[iso]||[];
    const live=mat.filter(function(x){return x.status==="live";}).length;
    const normal=mat.length-live;

    let dots="";
    if(ses.length) dots+='<i class="cgDot train">'+ses.length+'</i>';
    if(normal) dots+='<i class="cgDot match">'+normal+'</i>';
    if(live) dots+='<i class="cgDot live">'+live+'</i>';

    h+='<div class="cgCell'+(iso===today?' today':'')+(iso===CALGEN_SEL?' sel':'')+'" data-iso="'+iso+'">'+
       '<span class="cgNum">'+d+'</span>'+
       '<div class="cgDots">'+dots+'</div>'+
       '</div>';
  }

  wrap.innerHTML=h;
  wrap.querySelectorAll(".cgCell[data-iso]").forEach(function(c){
    c.onclick=function(){showDayList(c.dataset.iso);};
  });
}

window.calGenPrev=function(){
  CALGEN.m--;
  if(CALGEN.m<0){CALGEN.m=11;CALGEN.y--;}
  CALGEN_SEL=isoOf(new Date(CALGEN.y,CALGEN.m,1));
  $("calGenTitle").textContent=MESI[CALGEN.m]+" "+CALGEN.y;
  renderCalGenGrid();
  showDayList(CALGEN_SEL);
};

window.calGenNext=function(){
  CALGEN.m++;
  if(CALGEN.m>11){CALGEN.m=0;CALGEN.y++;}
  CALGEN_SEL=isoOf(new Date(CALGEN.y,CALGEN.m,1));
  $("calGenTitle").textContent=MESI[CALGEN.m]+" "+CALGEN.y;
  renderCalGenGrid();
  showDayList(CALGEN_SEL);
};

function showDayList(iso){
  CALGEN_SEL=iso;
  renderCalGenGrid();

  const el=$("calGenList");
  if(!el||!CALGEN_DATA)return;

  const ses=CALGEN_DATA.sessions.filter(function(s){return s&&s.date===iso;});
  const mat=CALGEN_DATA.matches.filter(function(mm){return mm&&mm.date===iso;});

  let h='<div class="cgDayTitle">📌 '+iso.split("-").reverse().join("/")+'</div>';

  if(!ses.length && !mat.length){
    h+='<div class="cgEmpty">Nessun impegno in questa giornata.</div>';
  }

  ses.forEach(function(s){
    h+='<div class="cgItem">'+
       '<div class="cgIcon train">🏋️</div>'+
       '<div class="cgInfo">'+
       '<b>'+(s.kind||"Allenamento")+'</b>'+
       '<small>'+(s.time?fmtTime(s.time):"—")+(s.place?(" · "+s.place):"")+'</small>'+
       '<div class="cgActions"><button onclick="gotoPres(\''+iso+'\')">Apri presenze</button></div>'+
       '</div></div>';
  });

  mat.forEach(function(mm){
    const live=mm.status==="live";
    const sc=(mm.score_home!=null&&mm.score_away!=null)?(" · "+mm.score_home+"-"+mm.score_away):"";
    h+='<div class="cgItem">'+
       '<div class="cgIcon '+(live?'live':'match')+'">⚽</div>'+
       '<div class="cgInfo">'+
       '<b>'+(mm.home?"Casa":"Trasferta")+' vs '+(mm.opponent||"?")+'</b>'+
       '<small>'+(mm.competition||"")+(mm.time?(" · "+fmtTime(mm.time)):"")+(mm.place?(" · "+mm.place):"")+sc+(live?" · LIVE":"")+'</small>'+
       '<div class="cgActions">'+
       '<button onclick="gotoDoc(\''+mm.id+'\')">Documenti</button>'+
       '<button onclick="openPart(\''+mm.id+'\')">Apri partita</button>'+
       '</div></div></div>';
  });

  el.innerHTML=h;
}

window.gotoPres=function(iso){
  showTab("pres",true);
  const a=$("attDate");
  if(a)a.value=iso;
  renderCal();
  loadAttendance();
};

window.gotoDoc=function(id){
  showTab("doc",true);
  const d=$("docMatch");
  if(d)d.value=id;
  renderDoc();
};
/* ===== FINE CALENDARIO ROBUSTO ===== */

async function loadRegistro(){const rm=await sb.from("matches").select("*").eq("club_id",CLUB_ID);const ms=rm.data||[];const ids=ms.map(function(m){return m.id;});let ev=[],mp=[];
  if(ids.length){ev=(await sb.from("match_events").select("*").in("match_id",ids)).data||[];mp=(await sb.from("match_players").select("*").in("match_id",ids)).data||[];}
  let V=0,P=0,S=0,GF=0,GS=0;ms.forEach(function(m){if(m.score_home==null)return;GF+=m.score_home;GS+=m.score_away;if(m.score_home>m.score_away){V++;}else if(m.score_home===m.score_away){P++;}else{S++;}});
  const kp=$("regKpi");if(kp)kp.innerHTML='<div><b>'+V+'</b><small>VITT</small></div><div><b>'+P+'</b><small>PAREG</small></div><div><b>'+S+'</b><small>SCONF</small></div><div><b>'+GF+'-'+GS+'</b><small>GOL</small></div>';
  const rs=await sb.from("sessions").select("*").eq("club_id",CLUB_ID);const sids=(rs.data||[]).map(function(s){return s.id;});let att=[];if(sids.length)att=(await sb.from("attendances").select("*").in("session_id",sids)).data||[];
  const pa={};att.forEach(function(a){if(a.present){pa[a.player_id]=(pa[a.player_id]||0)+1;}});
  const maxP=Math.max.apply(null,[1].concat(Object.keys(pa).map(function(k){return pa[k];})));
  const gp=$("regGrafPres");if(gp)gp.innerHTML=PLAYERS.map(function(p){const n=pa[p.id]||0;const w=Math.round(n/maxP*100);return '<div class="grow"><div class="gn"><b>'+(p.jersey_number||"-")+'</b> '+p.last_name+'</div><div class="bar"><i style="width:'+w+'%"></i></div><div class="gv">'+n+'</div></div>';}).join("");
  const gol={};ev.forEach(function(e){if(e.type==="goal"){gol[e.player_id]=(gol[e.player_id]||0)+1;}});
  const maxG=Math.max.apply(null,[1].concat(Object.keys(gol).map(function(k){return gol[k];})));
  const gRows=Object.keys(gol).map(function(k){return{id:k,n:gol[k]};}).sort(function(a,b){return b.n-a.n;});
  const gg=$("regGrafGol");if(gg)gg.innerHTML=gRows.length?gRows.map(function(r){const p=pById(r.id);const w=Math.round(r.n/maxG*100);return '<div class="grow"><div class="gn"><b>'+(p?(p.jersey_number||"-"):"-")+'</b> '+cognomeOf(r.id)+'</div><div class="bar gol"><i style="width:'+w+'%"></i></div><div class="gv">'+r.n+'</div></div>';}).join(""):'<div class="spin">Nessun gol</div>';
  const pp={};mp.forEach(function(x){if(x.convocated){pp[x.player_id]=(pp[x.player_id]||0)+1;}});
  const maxPP=Math.max.apply(null,[1].concat(Object.keys(pp).map(function(k){return pp[k];})));
  const gpp=$("regGrafPart");if(gpp)gpp.innerHTML=PLAYERS.map(function(p){const n=pp[p.id]||0;const w=Math.round(n/maxPP*100);return '<div class="grow"><div class="gn"><b>'+(p.jersey_number||"-")+'</b> '+p.last_name+'</div><div class="bar"><i style="width:'+w+'%"></i></div><div class="gv">'+n+'</div></div>';}).join("");}

const ad=document.getElementById("attDate");if(ad)ad.value=isoOf(new Date());
const pmd=document.getElementById("pmDate");if(pmd)pmd.value=isoOf(new Date());
boot();