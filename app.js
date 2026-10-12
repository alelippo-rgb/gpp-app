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
const MOTIVI_CONV=["","NON DISPONIBILE","INFORTUNATO","MALATO","VIAGGIO","SCUOLA","FAMIGLIA","PERMESSO","ALTRO"];
const EV_LABEL={goal:"⚽ Gol",assist:"🎯 Assist",shot:"💥 Tiro",save:"🧤 Parata",goal_against:"🥅 Gol subito",yellow:"🟨 Ammonizione",red:"🟥 Espulsione",sub_out:"🔄 Esce / Sost."};
const MAX_SUBS=7;
const DOC_CSS=
".docWrap{width:100%;max-width:190mm;margin:0 auto;background:#fff;border:2px solid #000;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#000}"+
".docTop{display:flex;align-items:center;gap:6px;padding:6px}"+
".docTop .dlogo{height:30px;width:auto;flex:0 0 auto}"+
".docTop .dlogo-round{height:42px}"+
".docSocName{flex:1;min-width:0;text-align:center;font-weight:900;font-family:'Arial Black',Arial,sans-serif;color:#1e3a8a;font-size:clamp(12px,4vw,22px);line-height:1.1;letter-spacing:.5px}"+
".docContacts{font-size:9px;line-height:1.35;text-align:center;background:#eef2ff;color:#1e3a8a;padding:4px 6px;border-top:1px solid #cbd5e1}"+
".docBarGrey{background:#bfbfbf;text-align:center;font-weight:800;font-size:13px;padding:3px;border-top:2px solid #000;border-bottom:1px solid #000}"+
".docBarGrey.small{background:#d9d9d9;font-weight:600;font-size:10px}"+
".docMatchTitle{background:#d9d9d9;text-align:center;font-weight:900;font-size:14px;padding:5px;border-bottom:2px solid #000}"+
".docMetaRow{display:flex;flex-wrap:wrap;border-bottom:1px solid #000;font-size:10px}"+
".docMetaRow .lbl{background:#d9d9d9;font-weight:800;padding:3px 5px;border-right:1px solid #000;white-space:nowrap}"+
".docMetaRow .val{flex:1;min-width:60px;padding:3px 5px}"+
".docScroll{overflow-x:auto}"+
"table.docGrid{width:100%;border-collapse:collapse;table-layout:fixed}"+
"table.docGrid th{background:#d9d9d9;border:1px solid #000;font-size:9px;font-weight:800;padding:3px 2px}"+
"table.docGrid td{border:1px solid #000;font-size:10px;padding:2px 3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"+
"table.docGrid select{width:100%;font-size:10px;padding:3px 2px;border:1px solid #999;border-radius:3px;background:#fff}"+
".docBtns{display:flex;gap:8px;margin:10px 0}.docBtns .btn{margin:0}"+
".docNotes{font-size:8px;line-height:1.3;text-align:center;padding:4px 6px;border-top:2px solid #000}"+
".docSignRow{display:flex;border-top:2px solid #000}"+
".docSignRow div{flex:1;text-align:center;font-weight:800;font-size:10px;padding:8px 4px}"+
".docTopConv{display:flex;align-items:center;gap:8px;padding:6px;background:#dbe6f7}"+
".convLogoCol{display:flex;flex-direction:column;align-items:center;gap:2px;flex:0 0 auto}"+
".convLogoCol .dlogo-round{height:38px}"+
".convLogoCol .auto{height:9px}"+
".docYellow{background:#ffff00;text-align:center;font-weight:900;font-size:16px;letter-spacing:2px;padding:4px;border-top:3px solid #000;border-bottom:3px solid #000}"+
"@media (max-width:699px){.docWrap{font-size:10px}.docMetaRow{font-size:9px}table.docGrid th{font-size:7px;white-space:normal}table.docGrid td{font-size:8px;white-space:normal;line-height:1.2}table.docGrid select{font-size:9px;padding:2px 1px}.docTop .dlogo{height:24px}.docTop .dlogo-round{height:34px}.docContacts{font-size:8px}}"+
"@media (min-width:700px){.docWrap{font-size:11px}.docTop .dlogo{height:34px}.docTop .dlogo-round{height:46px}table.docGrid td{font-size:10px}}"+
"@media print{"+
".docWrap{width:190mm;max-width:none;font-size:9pt}"+
".docScroll{overflow:visible}"+
"table.docGrid{table-layout:auto}"+
"table.docGrid th{font-size:8pt}"+
"table.docGrid td{font-size:8.5pt;white-space:normal}"+
"table.docGrid select{font-size:8.5pt;border:none;background:transparent;padding:0}"+
".docTop .dlogo{height:13mm}.docTop .dlogo-round{height:18mm}"+
".docSocName{font-size:17pt}"+
".docContacts{font-size:7.5pt}"+
".docBarGrey{font-size:11pt}.docBarGrey.small{font-size:8.5pt}"+
".docMatchTitle{font-size:13pt}"+
".docMetaRow{font-size:8.5pt;flex-wrap:nowrap}"+
".docNotes{font-size:7pt}"+
".docYellow{font-size:15pt}"+
".docTopConv .dlogo-round{height:15mm}.docTopConv .auto{height:5mm}"+
".docSignRow div{font-size:9pt}"+
".noPrint{display:none!important}"+
"}";

let ALL_PLAYERS=[],ROSA_DATA=[],PLAYERS=[],PARTITE=[],TEAMS=[],STAFF=[],CLUB_ID=null,CURRENT_SESSION=null,EDIT_ID=null,ATT_STATE={},PART_STATE={},SETTINGS={},SESSION_DATES=new Set(),CONV_STATE={},CONV_OVERRIDE=false,DOC_STAFF={},DOC_ROWS=[],DOC_ROWS_MATCH=null,CAL_ALL=null,LIVE_MP={},LIVE_EV=[];
let CAL_VIEW={y:new Date().getFullYear(),m:new Date().getMonth()};
let PM_CAL={y:new Date().getFullYear(),m:new Date().getMonth()};
let FOTO_NP=null,FOTO_ED=null,SH_ID=null,CUR_PART=null,CUR_DOC_MATCH=null,DOC_MODE="dist";
let LIVE=null,LIVE_UI_TIMER=null,REAL_SEC=0,PM_SUB_SLOTS=7,VIEW_STACK=[],LIVE_SEL=null,AUDIO_CTX=null;
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
function injectLiveCss(){if(document.getElementById("liveCss"))return;const ci=clubInfo();const st=document.createElement("style");st.id="liveCss";st.textContent=
".liveTop{padding:6px!important}"+
"#lvClock,.liveClock{font-size:34px!important}"+
".liveRest{font-size:12px!important;margin-top:1px}"+
".liveInfo{font-size:10px!important;margin-top:5px}"+
".liveScore{font-size:16px!important;margin-top:4px}"+
".liveGol{font-size:11px}"+
".srcLbl{color:#e2e8f0;font-size:10px;font-weight:800;text-align:center;margin:6px 0 4px;background:rgba(2,6,23,.55);border:1px solid rgba(255,255,255,.25);border-radius:8px;padding:4px 6px}"+
".pitch2{padding:12px 8px;position:relative;border-radius:14px;overflow:hidden;border:2px solid rgba(255,255,255,.75);box-shadow:inset 0 0 46px rgba(0,0,0,.4);background:repeating-linear-gradient(180deg,#15803d 0 26px,#16a34a 26px 52px)}"+
".pitch2::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 50% 50%,transparent 34px,rgba(255,255,255,.8) 34px,rgba(255,255,255,.8) 36px,transparent 36px),linear-gradient(rgba(255,255,255,.8),rgba(255,255,255,.8)) 0 50%/100% 2px no-repeat,linear-gradient(rgba(255,255,255,.8),rgba(255,255,255,.8)) 0 6%/100% 2px no-repeat,linear-gradient(rgba(255,255,255,.8),rgba(255,255,255,.8)) 0 94%/100% 2px no-repeat;opacity:.55}"+
".stand{height:8px;background:linear-gradient(180deg,#475569,#1e293b);border-radius:6px;margin:0 0 12px;display:flex;align-items:center;justify-content:center;gap:3px;overflow:hidden}"+
".stand i{width:3px;height:3px;border-radius:50%;background:#cbd5e1;flex:0 0 auto}"+
".pitchGrid{position:relative;z-index:1;display:flex;flex-direction:column;gap:14px;align-items:center;padding:4px 0}"+
".lineRow{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}"+
".benchGrid{flex-direction:row;flex-wrap:wrap;gap:8px}"+
".fifacard{position:relative;width:88px;padding:9px 4px 10px;border-radius:12px;text-align:center;cursor:pointer;background:linear-gradient(180deg,rgba(255,255,255,.20),rgba(2,6,23,.55) 45%,rgba(2,6,23,.78));border:1.5px solid rgba(255,255,255,.65);box-shadow:0 4px 10px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.35);backdrop-filter:blur(2px)}"+
".fifacard::after{content:'';position:absolute;left:12px;right:12px;bottom:4px;height:3px;border-radius:2px;background:"+ci.acc+"}"+
".fifacard .num{display:block;font-weight:900;color:#fff;font-size:23px;line-height:1;text-shadow:0 2px 3px rgba(0,0,0,.65)}"+
".fifacard .nm{display:block;font-size:10px;font-weight:800;color:#fff;text-transform:uppercase;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.3px}"+
".fifacard.gk{border-color:"+ci.acc+";background:linear-gradient(180deg,rgba(250,204,21,.35),rgba(60,40,0,.75))}"+
".fifacard.out{opacity:.45}"+
".fifacard.pan{border-style:dashed;opacity:.92}"+
".fifacard.exp{opacity:.35;border-color:#dc2626}"+
".fifacard .gols{position:absolute;top:-8px;right:-8px;background:"+ci.c2+";color:#fff;border:1.5px solid "+ci.acc+";border-radius:999px;font-size:10px;font-weight:900;padding:2px 6px;line-height:1.2;box-shadow:0 2px 5px rgba(0,0,0,.5)}"+
".fifacard .yell{position:absolute;top:-8px;left:-8px;background:#facc15;color:#713f12;border:1.5px solid #fff;border-radius:999px;font-size:10px;font-weight:900;padding:2px 5px;line-height:1.2;box-shadow:0 2px 5px rgba(0,0,0,.5)}"+
".ballimg{width:16px;height:16px;vertical-align:-3px;margin:0 1px}"+
"#sheetLive{position:fixed;inset:0;background:rgba(2,6,23,.6);z-index:90;display:flex;align-items:center;justify-content:center;padding:16px}"+
"#sheetLive.hidden{display:none}"+
"#sheetLive .sheetIn2{background:#fff;border-radius:16px;max-width:430px;width:100%;max-height:82vh;overflow:auto;padding:14px;box-shadow:0 12px 44px rgba(0,0,0,.45)}"+
".evGrid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px}.evGrid button{padding:10px 4px;border:none;border-radius:10px;background:#eef2ff;color:#3730a3;font-weight:700;font-size:12px;cursor:pointer}"+
".chkRow{display:flex;align-items:center;gap:8px;padding:6px 2px;border-bottom:1px solid #f1f5f9;font-size:13px}.chkRow input{width:auto}"+
DOC_CSS;
document.head.appendChild(st);}
function removeFotoCard(){const cards=document.querySelectorAll(".hcard");cards.forEach(function(c){if(c.textContent.indexOf("Foto")!==-1)c.remove();});}

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
    showView("app");goHome();ensurePersonalCard();applyBrand();setupRosaUI();injectLiveCss();removeFotoCard();
  }catch(e){console.error(e);alert("Errore: "+e.message);}
}
function applyBrand(){
  const ci=clubInfo();
  const hd=document.querySelector("header");
  if(hd)hd.style.background="linear-gradient(135deg,"+ci.c1+" 0%,#0b1035 100%)";
  const hl=document.querySelector("header .logo");
  if(hl){hl.innerHTML='<img src="'+clubLogo()+'" style="width:100%;height:100%;object-fit:contain;border-radius:50%">';hl.style.background="transparent";hl.style.border="2px solid "+ci.acc;}
  const hp=document.querySelector("header p");if(hp)hp.style.color=ci.acc;
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
function populateLuoghi(){const L=SETTINGS.luoghi||[];["attPlace","pmPlace","setDefault","lvPlace","docPlace"].forEach(function(id){const e=$(id);if(e){e.innerHTML=L.map(function(x){return "<option>"+x+"</option>";}).join("");if(SETTINGS.luogo_default)e.value=SETTINGS.luogo_default;}});
  const ll=$("luoghiList");if(ll)ll.innerHTML=L.map(function(x){return '<span class="vb blu">'+x+' <b style="cursor:pointer" onclick="removeLuogo(\''+x+'\')">✕</b></span>';}).join(" ");}
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
  if(t==="sub"){populateMatchSelect("sbMatch",true);loadSubs();}
  if(t==="doc"){populateMatchSelect("docMatch",true);renderDoc();}
  if(t==="reg")loadRegistro();
  if(t==="set"){populateLuoghi();ensurePersonalCard();populatePersonal();}
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

function calLegend(){return '<div style="display:flex;gap:12px;margin-top:10px;font-size:11px;font-weight:700;color:#475569;flex-wrap:wrap"><span><i style="display:inline-block;width:12px;height:12px;border-radius:4px;background:#dcfce7;border:1px solid #16a34a"></i> Allenamento</span><span><i style="display:inline-block;width:12px;height:12px;border-radius:4px;background:#fee2e2;border:1px solid #dc2626"></i> Partita</span><span><i style="display:inline-block;width:12px;height:12px;border-radius:4px;background:#fef3c7;border:1px solid #f59e0b"></i> Entrambi</span><span><i style="display:inline-block;width:12px;height:12px;border-radius:4px;background:#e5e7eb;border:1px solid #9ca3af"></i> Riposo</span></div>';}
window.renderCalView=function(){
  const vc=$("viewCal");if(!vc)return;
  vc.innerHTML='<div class="card"><h2>Calendario</h2>'+
    '<div class="quick"><button onclick="calQuick(-1)">Ieri</button><button onclick="calQuick(0)">Oggi</button><button onclick="calQuick(1)">Domani</button></div>'+
    '<div class="calHead"><button onclick="calViewPrev()">‹</button><span id="calViewTitle"></span><button onclick="calViewNext()">›</button></div>'+
    '<div class="calGrid" id="calGrid2"></div>'+calLegend()+
    '</div><div class="card hidden" id="calDetail"></div>';
  CAL_ALL=null;
  loadCalMonth();
};
window.calQuick=function(o){const d=new Date();d.setDate(d.getDate()+o);CAL_VIEW={y:d.getFullYear(),m:d.getMonth()};loadCalMonth().then(function(){selectCalDay(isoOf(d));});};
window.calViewPrev=function(){CAL_VIEW.m--;if(CAL_VIEW.m<0){CAL_VIEW.m=11;CAL_VIEW.y--;}loadCalMonth();};
window.calViewNext=function(){CAL_VIEW.m++;if(CAL_VIEW.m>11){CAL_VIEW.m=0;CAL_VIEW.y++;}loadCalMonth();};
async function loadCalMonth(){
  if(!CAL_ALL){
    const rs=await sb.from("sessions").select("*").eq("club_id",CLUB_ID);
    const rm=await sb.from("matches").select("*").eq("club_id",CLUB_ID);
    CAL_ALL={sessions:rs.data||[],matches:rm.data||[]};
  }
  renderCalGrid();
}
function calEventsFor(iso){
  const out={all:null,part:null};
  if(!CAL_ALL)return out;
  (CAL_ALL.sessions||[]).forEach(function(s){if(s.date===iso)out.all=s;});
  (CAL_ALL.matches||[]).forEach(function(x){if(x.date===iso)out.part=x;});
  return out;
}
function renderCalGrid(){
  const y=CAL_VIEW.y,m=CAL_VIEW.m;
  const t=$("calViewTitle");if(t)t.textContent=MESI[m]+" "+y;
  const dow=(new Date(y,m,1).getDay()+6)%7;
  const days=new Date(y,m+1,0).getDate();
  let h="";["L","M","M","G","V","S","D"].forEach(function(d){h+='<div class="calDow">'+d+'</div>';});
  for(let i=0;i<dow;i++)h+='<div class="calCell empty"></div>';
  for(let d=1;d<=days;d++){
    const iso=y+"-"+String(m+1).padStart(2,"0")+"-"+String(d).padStart(2,"0");
    const e=calEventsFor(iso);
    let bg="#e5e7eb",bd="#9ca3af",badge="";
    if(e.all&&e.part){bg="#fef3c7";bd="#f59e0b";badge="🔴";}
    else if(e.all){bg="#dcfce7";bd="#16a34a";badge="🟢";}
    else if(e.part){bg="#fee2e2";bd="#dc2626";badge="🔴";}
    h+='<div class="calCell" style="background:'+bg+';border:1px solid '+bd+'" onclick="selectCalDay(\''+iso+'\')">'+d+'<div style="font-size:8px;line-height:1">'+badge+'</div></div>';
  }
  const g=$("calGrid2");if(g)g.innerHTML=h;
}
window.selectCalDay=function(iso){renderCalGrid();renderCalDetail(iso);};
async function renderCalDetail(iso){
  const cd=$("calDetail");if(!cd)return;cd.classList.remove("hidden");
  const e=calEventsFor(iso);
  const dFmt=iso.split("-").reverse().join("/");
  let h='<h2>'+dFmt+'</h2>';
  if(!e.all&&!e.part){
    h+='<div style="background:#e5e7eb;border:1px solid #9ca3af;border-radius:12px;padding:18px;text-align:center;color:#4b5563;font-weight:800;font-size:15px">😴 RIPOSO — nessuna attività programmata</div>';
    cd.innerHTML=h;return;
  }
  if(e.all){
    const s=e.all;
    const ra=await sb.from("attendances").select("*").eq("session_id",s.id);
    const att=ra.data||[];
    const mAtt={};att.forEach(function(a){mAtt[a.player_id]=a;});
    const rosad=ALL_PLAYERS.filter(function(p){return inRosa(p,iso);});
    const pres=rosad.filter(function(p){return mAtt[p.id]&&mAtt[p.id].present;});
    const ass=rosad.filter(function(p){return !mAtt[p.id]||!mAtt[p.id].present;});
    const aparte=pres.filter(function(p){return mAtt[p.id]&&!mAtt[p.id].with_team;});
    h+='<div style="background:#dcfce7;border:1px solid #16a34a;border-radius:12px;padding:10px;margin-bottom:10px"><b>🟢 ALLENAMENTO</b> — '+s.kind+' · '+(s.place||"")+' · '+(s.time?fmtTime(s.time):"")+'<br><span style="font-size:13px;font-weight:700">✅ Presenti '+pres.length+' · ❌ Assenti '+ass.length+' · 🔹 A parte '+aparte.length+'</span></div>';
    if(ass.length){h+='<div style="font-size:12px;margin-bottom:6px"><b>❌ Assenti:</b> '+ass.map(function(p){const a=mAtt[p.id];return p.last_name+(a&&a.reason?(" ("+a.reason+")"):"");}).join(", ")+'</div>';}
    if(aparte.length){h+='<div style="font-size:12px;margin-bottom:6px"><b>🔹 A parte:</b> '+aparte.map(function(p){return p.last_name;}).join(", ")+'</div>';}
    h+='<button class="btn sec" onclick="openPresFromCal(\''+iso+'\')">✏️ Apri / modifica presenze</button>';
  }
  if(e.part){
    const m2=e.part;
    const rev=await sb.from("match_events").select("*").eq("match_id",m2.id).order("minute");
    const ev=rev.data||[];
    const gol=ev.filter(function(x){return x.type==="goal";});
    const subIn=ev.filter(function(x){return x.type==="sub_in";});
    const subOut=ev.filter(function(x){return x.type==="sub_out";});
    const amm=ev.filter(function(x){return x.type==="yellow"||x.type==="red";});
    const sc=(m2.score_home!=null&&m2.score_away!=null)?(m2.score_home+" - "+m2.score_away):"–";
    h+='<div style="background:#fee2e2;border:1px solid #dc2626;border-radius:12px;padding:10px;margin-bottom:10px;margin-top:'+(e.all?'12px':'0')+'"><b>🔴 PARTITA</b> — '+(m2.home?"Casa":"Trasferta")+' vs '+m2.opponent+' · '+m2.competition+' · '+(m2.place||"")+' · '+(m2.time?fmtTime(m2.time):"")+'<br><span style="font-size:22px;font-weight:900;color:#1e3a8a">'+sc+'</span></div>';
    h+='<div style="font-size:12px;margin-bottom:6px"><b>⚽ Marcatori:</b> '+golSummaryFrom(gol)+'</div>';
    if(subIn.length||subOut.length){h+='<div style="font-size:12px;margin-bottom:6px"><b>🔄 Sostituzioni:</b> '+subSummaryFrom(ev)+'</div>';}
    if(amm.length){h+='<div style="font-size:12px;margin-bottom:6px"><b>🟨/ Sanzioni:</b> '+amm.map(function(x){return (x.type==="yellow"?("🟨"+(x.detail==="2"?"🟨":"")):"🟥 ")+" "+cognomeOf(x.player_id)+" "+(x.minute||0)+"'";}).join(", ")+'</div>';}
    h+='<button class="btn sec" onclick="openPartFromCal(\''+m2.id+'\')">📋 Apri scheda partita</button>';
  }
  cd.innerHTML=h;
}
window.openPresFromCal=function(iso){showTab("pres",true);$("attDate").value=iso;renderCal();loadAttendance();};
window.openPartFromCal=function(id){showTab("part",true);openPart(id);};

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
  await loadSessionDates();renderCal();CAL_ALL=null;
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
window.openPart=function(id){const m=PARTITE.find(function(x){return x.id===id;});if(!m)return;if(m.status==="live"){openLiveFor(id);}else{openManual(id);}};
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
};
window.toggleManWrap=function(){
  const wrap=$("manWrap");if(!wrap)return;
  const sel=document.querySelector('input[name="lvSrc"]:checked');
  wrap.classList.toggle("hidden",!(sel&&sel.value==="manual"));
};
window.confirmStartLive=async function(){
  let opp=$("lvOppFree").value.trim();if(!opp)opp=$("lvOpp").value;if(!opp){alert("Avversario?");return;}
  const halfCount=parseInt($("lvHalves").value)||2;
  const halfMin=parseInt($("lvHalfMin").value)||35;
  const halfDurations=[];for(var i=0;i<halfCount;i++)halfDurations.push(halfMin*60);
  const srcEl=document.querySelector('input[name="lvSrc"]:checked');
  const src=srcEl?srcEl.value:"distinta";
  let manual=[],manualNum={};
  if(src==="manual"){
    document.querySelectorAll(".manChk").forEach(function(c){if(c.checked)manual.push(c.value);});
    document.querySelectorAll(".manNum").forEach(function(n){manualNum[n.dataset.id]=n.value;});
    if(!manual.length){alert("Seleziona almeno un giocatore o usa la distinta");return;}
  }
  const ins={club_id:CLUB_ID,date:isoOf(new Date()),time:null,opponent:opp,home:$("lvHome").value==="true",competition:"Campionato",place:$("lvPlace").value||SETTINGS.luogo_default,category:"Under 14",status:"live"};
  const r=await sb.from("matches").insert(ins).select().single();if(r.error){alert(r.error.message);return;}
  LIVE={matchId:r.data.id,clock:0,half:1,phase:"idle",halfDurations:halfDurations,runStart:null,accumulated:0,home:0,away:0,rec1:0,rec2:0,source:src,manual:manual,manualNum:manualNum,whistleHalf:0,distOrder:null};
  REAL_SEC=0;SETTINGS.live=LIVE;await persistSettings();
  await loadPartite();closeLiveSheet();openLiveFor(r.data.id);CAL_ALL=null;
};
async function loadLiveMp(id){
  const r=await sb.from("match_players").select("*").eq("match_id",id);
  LIVE_MP={};(r.data||[]).forEach(function(x){LIVE_MP[x.player_id]=x;});
}
async function loadDistOrder(id){
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
function displayNum(p){
  if(LIVE&&LIVE.source==="manual"&&LIVE.manualNum&&LIVE.manualNum[p.id]!=null&&LIVE.manualNum[p.id]!=="")return parseInt(LIVE.manualNum[p.id]);
  return p.jersey_number;
}
function baseList(){
  let list=[];
  if(LIVE&&LIVE.source==="manual"&&LIVE.manual&&LIVE.manual.length){
    list=LIVE.manual.map(function(id){return pById(id);}).filter(Boolean);
    list.sort(function(a,b){return (displayNum(a)||99)-(displayNum(b)||99);});
    return list;
  }
  list=PLAYERS.filter(function(p){const x=LIVE_MP[p.id];return x?x.convocated:true;});
  if(LIVE&&LIVE.distOrder&&LIVE.distOrder.length){
    const idx={};LIVE.distOrder.forEach(function(id,i){idx[id]=i;});
    list.sort(function(a,b){
      const ia=(idx[a.id]!=null)?idx[a.id]:9999;
      const ib=(idx[b.id]!=null)?idx[b.id]:9999;
      if(ia!==ib)return ia-ib;
      return (a.jersey_number||99)-(b.jersey_number||99);
    });
  }else{
    list.sort(function(a,b){return (a.jersey_number||99)-(b.jersey_number||99);});
  }
  return list;
}
function srcLabel(){
  if(!LIVE)return "";
  if(LIVE.source==="manual")return "✍️ Formazione scelta da te (numeri assegnati)";
  if(LIVE.distOrder&&LIVE.distOrder.length)return "📋 Formazione dall'ULTIMA DISTINTA SALVATA di questa partita (ordine righe 1-20)";
  return "🔢 Nessuna distinta salvata per questa partita: uso l'ordine dei numeri di maglia";
}
function liveClockSec(){
  if(!LIVE)return 0;
  if(LIVE.phase==="running"&&LIVE.runStart){return LIVE.accumulated+Math.floor((Date.now()-LIVE.runStart)/1000);}
  return LIVE.accumulated||0;
}
function openLiveFor(id){
  const m=PARTITE.find(function(x){return x.id===id;});if(!m)return;
  if(!LIVE||LIVE.matchId!==id){
    LIVE={matchId:id,clock:0,half:1,phase:"idle",halfDurations:[35*60,35*60],runStart:null,accumulated:0,home:(m.score_home||0),away:(m.score_away||0),rec1:0,rec2:0,source:"distinta",manual:[],manualNum:{},whistleHalf:0,distOrder:null};
    REAL_SEC=0;SETTINGS.live=LIVE;persistSettings();
  }
  if(!LIVE.source)LIVE.source="distinta";
  if(LIVE.whistleHalf==null)LIVE.whistleHalf=0;
  CUR_PART=m;
  Promise.all([loadLiveMp(id),refreshLiveEv(),loadDistOrder(id)]).then(function(){
    $("partHub").classList.add("hidden");$("partManual").classList.add("hidden");$("partLive").classList.remove("hidden");
    updateScoreLine();updateLiveUI();renderPitch();renderLiveEvents();updateLiveButtons();
    if(LIVE_UI_TIMER){clearInterval(LIVE_UI_TIMER);}
    LIVE_UI_TIMER=setInterval(function(){updateLiveUI();},1000);
  });
}
function updateScoreLine(){
  const m=PARTITE.find(function(x){return x.id===LIVE.matchId;});
  const sc=$("lvScore");if(sc)sc.textContent="BORGARO "+(LIVE.home||0)+"-"+(LIVE.away||0)+" "+(m?m.opponent:"");
}
function updateLiveButtons(){
  const lp=$("lvPlay");
  const lh=$("lvHalf");
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
  const card=function(p,cls){
    const g=golCountFor(p.id);
    const y=yellowCountFor(p.id);
    return '<div class="fifacard '+(isGk(p)?"gk ":"")+cls+'" onclick="openPlayerSheet(\''+p.id+'\')">'+(g>0?'<span class="gols">'+g+'</span>':'')+(y>0?'<span class="yell">'+y+'</span>':'')+'<span class="num">'+(displayNum(p)||"-")+'</span><span class="nm">'+p.last_name+'</span></div>';
  };
  const rows=[];
  if(inCampo.length){
    rows.push([inCampo[0]]);
    for(let i=1;i<inCampo.length;i+=4){rows.push(inCampo.slice(i,i+4));}
  }
  let stand='<div class="stand">';for(let i=0;i<26;i++)stand+='<i></i>';stand+='</div>';
  lp.innerHTML=stand+'<div class="pitchGrid">'+rows.map(function(rw){return '<div class="lineRow">'+rw.map(function(p){return card(p,"in");}).join("")+'</div>';}).join("")+'</div>';
  if(lb)lb.innerHTML=(panchina.length?'<div class="pitchGrid benchGrid">'+panchina.map(function(p){return card(p,subOutIds.indexOf(p.id)!==-1?"out":"pan");}).join("")+'</div>':'<div style="color:#94a3b8;font-size:11px;text-align:center;padding:6px">Nessuno in panchina</div>')+
    (espulsi.length?'<div style="color:#fca5a5;font-size:11px;font-weight:800;margin-top:8px;text-align:center">ESPULSI: '+espulsi.map(function(p){return "#"+(displayNum(p)||"-")+" "+p.last_name;}).join(", ")+' (fuori gioco, non sostituibili)</div>':'');
}
function isGk(p){const n=displayNum(p);return n===1||n===12||n===22;}
window.openPlayerSheet=function(pid){
  if(!LIVE)return;
  const p=pById(pid);if(!p)return;
  if(isExpelled(pid)){alert("Giocatore espulso: fuori gioco, non può essere sostituito né fare eventi.");return;}
  LIVE_SEL=pid;
  $("shLiveName").textContent="#"+(displayNum(p)||"-")+" "+p.last_name;
  const opts=isGk(p)?["save","goal_against","goal","assist","yellow","red","sub_out"]:["goal","assist","shot","yellow","red","sub_out"];
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
    const mates=baseList().filter(function(p){return p.id!==pid;});
    $("shLiveName").textContent="🎯 Assist a chi?";
    $("sheetLiveBody").innerHTML='<label>Compagno che ha segnato</label><select id="assistTo">'+mates.map(function(p){return '<option value="'+p.id+'">#'+(displayNum(p)||"-")+' '+p.last_name+'</option>';}).join("")+'</select><button class="btn ok" onclick="liveEventFor(\''+pid+'\',\'assist\',null,document.getElementById(\'assistTo\').value)">✅ Conferma assist</button>';
    return;
  }
  liveEventFor(pid,t);
};
window.liveEventFor=async function(pid,t,detail,secondId){
  if(!LIVE)return;
  if(t==="sub_out"){closeLiveSheet();openSubSheet();return;}
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
function subSummaryFrom(ev){
  const ins=ev.filter(function(e){return e.type==="sub_in";});
  if(!ins.length)return "—";
  return ins.map(function(si){
    const so=ev.find(function(o){return o.type==="sub_out"&&o.minute===si.minute&&o.half===si.half;});
    return "#"+numDi(so?so.player_id:"")+" "+cognomeOf(so?so.player_id:"")+" → #"+numDi(si.player_id)+" "+cognomeOf(si.player_id)+" <span style='font-size:10px'>("+(si.minute||0)+"' "+(si.half===1?"PT":"ST")+")</span>";
  }).join(", ");
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
  if(e.type==="yellow")return e.detail==="2"?"🟨🟨 2° giallo (espulso)":"🟨 1° giallo";
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
      return '<div class="evItem"><span>🔄 #'+numDi(so?so.player_id:"")+' '+cognomeOf(so?so.player_id:"")+' → #'+numDi(e.player_id)+' '+cognomeOf(e.player_id)+'</span><span>'+(e.minute||0)+"' "+(e.half===1?"PT":"ST")+'</span></div>';
    }
    return '<div class="evItem"><span>'+evLabel(e)+'</span><span>'+(e.minute||0)+"' "+(e.half===1?"PT":"ST")+'</span></div>';
  }).join("");
}
function evSubListHtml(){
  const ins=LIVE_EV.filter(function(e){return e.type==="sub_in";}).sort(function(a,b){return (a.minute||0)-(b.minute||0);});
  if(!ins.length)return '<div style="color:#64748b;font-size:12px;text-align:center;padding:8px">Nessuna sostituzione fatta</div>';
  return ins.map(function(si){
    const so=LIVE_EV.find(function(o){return o.type==="sub_out"&&o.minute===si.minute&&o.half===si.half;});
    return '<div class="evItem"><span>🔄 #'+numDi(so?so.player_id:"")+' '+cognomeOf(so?so.player_id:"")+' → #'+numDi(si.player_id)+' '+cognomeOf(si.player_id)+'</span><span>'+(si.minute||0)+"' "+(si.half===1?"PT":"ST")+'</span></div>';
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
window.openMatchOptions=async function(){
  if(!LIVE)return;
  const m=PARTITE.find(function(x){return x.id===LIVE.matchId;});if(!m)return;
  $("shLiveName").textContent="⚙ Dati partita";
  const sbd=$("sheetLiveBody");if(!sbd)return;
  sbd.innerHTML='<label>Avversario</label><input id="lvMOpp" value="'+m.opponent+'">'+
    '<div class="row"><div><label>Campo</label><select id="lvMHome"><option value="true"'+(m.home?" selected":"")+'>Casa</option><option value="false"'+(!m.home?" selected":"")+'>Trasferta</option></select></div><div><label>Orario</label><input type="time" id="lvMTime" value="'+(m.time||"")+'"></div></div>'+
    '<div class="row"><div><label>Luogo</label><select id="lvMPlace">'+(SETTINGS.luoghi||[]).map(function(x){return '<option'+(x===m.place?" selected":"")+'>'+x+'</option>';}).join("")+'</select></div><div><label>Competizione</label><select id="lvMComp"><option'+(m.competition==="Campionato"?" selected":"")+'>Campionato</option><option'+(m.competition==="Coppa"?" selected":"")+'>Coppa</option><option'+(m.competition==="Amichevole"?" selected":"")+'>Amichevole</option><option'+(m.competition==="Torneo"?" selected":"")+'>Torneo</option></select></div></div>'+
    '<label>Recupero 1°T (min)</label><input type="number" id="lvRec1" value="'+(LIVE.rec1||0)+'">'+
    '<label>Recupero 2°T (min)</label><input type="number" id="lvRec2" value="'+(LIVE.rec2||0)+'">'+
    '<button class="btn ok" onclick="saveMatchOptions()">💾 Salva dati</button>';
  $("sheetLive").classList.remove("hidden");
};
window.saveMatchOptions=async function(){
  if(!LIVE)return;
  LIVE.rec1=parseInt($("lvRec1").value)||0;
  LIVE.rec2=parseInt($("lvRec2").value)||0;
  SETTINGS.live=LIVE;await persistSettings();
  await sb.from("matches").update({opponent:$("lvMOpp").value.trim()||"?",home:$("lvMHome").value==="true",time:$("lvMTime").value||null,place:$("lvMPlace").value,competition:$("lvMComp").value}).eq("id",LIVE.matchId);
  await loadPartite();
  CUR_PART=PARTITE.find(function(x){return x.id===LIVE.matchId;});
  updateScoreLine();closeLiveSheet();
  alert("Dati partita aggiornati.");
};
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
  const inCampo=onFieldIds();
  const outOpts=PLAYERS.filter(function(p){return inCampo.indexOf(p.id)!==-1;});
  const inOpts=PLAYERS.filter(function(p){return inCampo.indexOf(p.id)===-1&&!isExpelled(p.id);});
  const optOut='<option value="">—</option>'+outOpts.map(function(p){return '<option value="'+p.id+'">#'+(displayNum(p)||"-")+' '+p.last_name+'</option>';}).join("");
  const optIn='<option value="">—</option>'+inOpts.map(function(p){return '<option value="'+p.id+'">#'+(displayNum(p)||"-")+' '+p.last_name+'</option>';}).join("");
  let slots="";
  for(let i=0;i<MAX_SUBS;i++){
    const disabled=i>=remaining;
    slots+='<div class="subSlot" style="'+(disabled?"opacity:.45":"")+'"><div class="sn">Slot '+(i+1)+(disabled?" · non disponibile":"")+'</div><div class="row"><div><label>Esce (in campo)</label><select class="lvSubOut" data-i="'+i+'" '+(disabled?"disabled":"")+'>'+optOut+'</select></div><div><label>Entra (panchina)</label><select class="lvSubIn" data-i="'+i+'" '+(disabled?"disabled":"")+'>'+optIn+'</select></div></div></div>';
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
  alert("Partita completa salvata!");showPartHub();CAL_ALL=null;};

function playerOpts(){return PLAYERS.map(function(p){return '<option value="'+p.id+'">#'+(p.jersey_number||"-")+' '+p.last_name+'</option>';}).join("");}
function populateMatchSelect(id){const e=$(id);if(!e)return;e.innerHTML=PARTITE.map(function(m){return '<option value="'+m.id+'">'+m.date.split("-").reverse().join("/")+' vs '+m.opponent+'</option>';}).join("");}
window.loadSubs=function(){const sm=$("sbMatch");if(!sm)return;let h="";for(let i=0;i<MAX_SUBS;i++){h+='<div class="subSlot"><div class="sn">Slot '+(i+1)+'</div><div class="row"><div><label>Min</label><input type="number" class="subMin"></div><div><label>Esce</label><select class="subOut">'+playerOpts()+'</select></div><div><label>Entra</label><select class="subIn">'+playerOpts()+'</select></div></div></div>';}
  const ss=$("subSlots");if(ss)ss.innerHTML=h;loadSubList();};
window.addSubSlot=function(){const ss=$("subSlots");if(!ss)return;const i=ss.querySelectorAll(".subSlot").length;ss.insertAdjacentHTML("beforeend",'<div class="subSlot"><div class="sn">Slot '+(i+1)+'</div><div class="row"><div><label>Min</label><input type="number" class="subMin"></div><div><label>Esce</label><select class="subOut">'+playerOpts()+'</select></div><div><label>Entra</label><select class="subIn">'+playerOpts()+'</select></div></div></div>');};
window.saveSubs=async function(){const sm=$("sbMatch");if(!sm||!sm.value)return;const id=sm.value;await sb.from("match_events").delete().eq("match_id",id).in("type",["sub_in","sub_out"]);
  const ins=[];document.querySelectorAll("#subSlots .subSlot").forEach(function(sl){const min=parseInt(sl.querySelector(".subMin").value)||0;const out=sl.querySelector(".subOut").value;const inn=sl.querySelector(".subIn").value;if(min>0&&out&&inn&&out!==inn){ins.push({match_id:id,player_id:out,type:"sub_out",minute:min,half:1});ins.push({match_id:id,player_id:inn,type:"sub_in",minute:min,half:1});}});
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
window.setDocRow=function(i,id){DOC_ROWS[i]=id;buildDoc();};
window.docSyncTime=function(which){
  const tIn=$("docTime"),tRit=$("docRitrovo");
  if(!tIn||!tRit)return;
  if(which==="start"&&tIn.value){tRit.value=minusMinuti(tIn.value,75);}
  if(which==="rit"&&tRit.value){tIn.value=plusMinuti(tRit.value,75);}
};
window.saveDocEdit=async function(){
  if(!CUR_DOC_MATCH)return;
  let opp=$("docOppFree").value.trim();if(!opp)opp=$("docOpp").value;
  await sb.from("matches").update({
    opponent:opp||CUR_DOC_MATCH.opponent,
    date:$("docDate").value,
    time:$("docTime").value||null,
    place:$("docPlace").value,
    competition:$("docComp").value,
    category:$("docCat").value.trim()||"Under 14",
    referee:$("docRef").value.trim()
  }).eq("id",CUR_DOC_MATCH.id);
  await loadPartite();
  CUR_DOC_MATCH=PARTITE.find(function(x){return x.id===CUR_DOC_MATCH.id;})||CUR_DOC_MATCH;
  populateMatchSelect("docMatch");$("docMatch").value=CUR_DOC_MATCH.id;
  renderDoc();
  alert("Dati documento salvati sulla partita.");
};
window.saveDist=async function(){
  if(!CUR_DOC_MATCH)return;
  const r=await sb.from("match_players").select("*").eq("match_id",CUR_DOC_MATCH.id);
  const mpM={};(r.data||[]).forEach(function(x){mpM[x.player_id]=x;});
  const elenco=PLAYERS.filter(function(p){return inRosa(p,CUR_DOC_MATCH.date);});
  const rows=elenco.map(function(p){
    const pos=DOC_ROWS.indexOf(p.id);
    return{match_id:CUR_DOC_MATCH.id,player_id:p.id,convocated:pos!==-1,dist_order:pos!==-1?(pos+1):null,conv_note:mpM[p.id]?mpM[p.id].conv_note:null,starter:mpM[p.id]?mpM[p.id].starter:false};
  });
  await sb.from("match_players").upsert(rows,{onConflict:"match_id,player_id"});
  const srows=Object.keys(DOC_STAFF).filter(function(k){return DOC_STAFF[k];}).map(function(k){return{match_id:CUR_DOC_MATCH.id,role:k,staff_id:DOC_STAFF[k]};});
  for(const s of srows){await sb.from("match_staff").upsert(s,{onConflict:"match_id,role"});}
  await sb.from("doc_history").insert({club_id:CLUB_ID,match_id:CUR_DOC_MATCH.id,doc_type:"dist",data:{rows:DOC_ROWS,staff:DOC_STAFF}});
  if(LIVE&&LIVE.matchId===CUR_DOC_MATCH.id){
    LIVE.distOrder=DOC_ROWS.filter(function(x){return x;});
    SETTINGS.live=LIVE;persistSettings();
    renderPitch();
  }
  alert("Distinta salvata! Ordine e nomi restano come li hai messi.");
  renderDoc();
};
window.saveConv=async function(){
  if(!CUR_DOC_MATCH)return;
  const rows=Object.keys(CONV_STATE).map(function(pid){return{match_id:CUR_DOC_MATCH.id,player_id:pid,convocated:CONV_STATE[pid].conv,conv_note:CONV_STATE[pid].note||null,starter:PART_STATE[pid]?PART_STATE[pid].starter:false};});
  if(rows.length){const r=await sb.from("match_players").upsert(rows,{onConflict:"match_id,player_id"});if(r.error){alert(r.error.message);return;}}
  await sb.from("doc_history").insert({club_id:CLUB_ID,match_id:CUR_DOC_MATCH.id,doc_type:"conv",data:{state:CONV_STATE}});
  CONV_OVERRIDE=true;
  alert("Convocazione salvata! La ritroverai aprendo questa partita e nello storico.");
  renderDoc();
};
window.loadDocHistory=async function(){
  const sel=$("docHistSel");if(!sel||!sel.value)return;
  const r=await sb.from("doc_history").select("*").eq("id",sel.value).maybeSingle();
  if(!r.data)return;
  if(DOC_MODE==="dist"){
    DOC_ROWS=(r.data.data.rows||[]).slice();
    while(DOC_ROWS.length<20)DOC_ROWS.push("");
    DOC_STAFF=r.data.data.staff||{};
    DOC_ROWS_MATCH=CUR_DOC_MATCH.id;
    buildDoc();
  }else{
    CONV_STATE=r.data.data.state||{};
    CONV_OVERRIDE=true;
    buildDoc();
  }
  alert("Versione storica caricata. Premi Salva per renderla quella corrente.");
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
  if(DOC_MODE==="dist"){
    sb.from("match_staff").select("*").eq("match_id",m.id).then(function(rs){
      DOC_STAFF={};
      (rs.data||[]).forEach(function(x){DOC_STAFF[x.role]=x.staff_id;});
      DOC_ROWS_MATCH=null;
      buildDoc();
    });
  }else{buildDoc();}
};
function docEditPanel(m,ritrovo,luogo){
  const isConv=(DOC_MODE==="conv");
  return '<div class="noPrint" style="border:2px dashed #1d4ed8;border-radius:12px;padding:10px;margin-bottom:12px;background:#f8fafc">'+
    '<b style="color:#1e3a8a">✏️ Compila dati documento (non stampato)</b>'+
    '<div class="row"><div><label>Avversario</label><select id="docOpp">'+TEAMS.map(function(t){return '<option'+(t.short_name===m.opponent?" selected":"")+'>'+t.short_name+'</option>';}).join("")+'</select></div><div><label>O altro</label><input id="docOppFree" placeholder="scrivi…"></div></div>'+
    '<div class="row"><div><label>Data</label><input type="date" id="docDate" value="'+m.date+'"></div><div><label>Luogo</label><select id="docPlace">'+(SETTINGS.luoghi||[]).map(function(x){return '<option'+(x===luogo?" selected":"")+'>'+x+'</option>';}).join("")+'</select></div></div>'+
    '<div class="row"><div><label style="'+(isConv?"":"font-weight:800;color:#1e3a8a")+'">Orario inizio</label><input type="time" id="docTime" value="'+(m.time||"")+'" onchange="docSyncTime(\'start\')"></div><div><label style="'+(isConv?"font-weight:800;color:#c8102e":"")+'">Orario ritrovo (−1h15)</label><input type="time" id="docRitrovo" value="'+ritrovo+'" onchange="docSyncTime(\'rit\')"></div></div>'+
    '<div class="row"><div><label>Competizione</label><select id="docComp"><option'+(m.competition==="Campionato"?" selected":"")+'>Campionato</option><option'+(m.competition==="Coppa"?" selected":"")+'>Coppa</option><option'+(m.competition==="Amichevole"?" selected":"")+'>Amichevole</option><option'+(m.competition==="Torneo"?" selected":"")+'>Torneo</option></select></div><div><label>Categoria</label><input id="docCat" value="'+(m.category||"Under 14")+'"></div></div>'+
    '<label>Arbitro</label><input id="docRef" value="'+(m.referee||"")+'" placeholder="nome arbitro">'+
    '<label>🕘 Storico '+(isConv?"convocazioni":"distinte")+'</label><div class="row"><select id="docHistSel"></select><button class="btn sec" style="margin:0" onclick="loadDocHistory()">Carica</button></div>'+
    '<button class="btn ok" onclick="saveDocEdit()">💾 Salva dati documento</button></div>';
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
  var dsb=$("docSaveBtn");if(dsb)dsb.classList.toggle("hidden",DOC_MODE!=="conv");
  sb.from("match_players").select("*").eq("match_id",m.id).then(function(r){
    var mpM={};(r.data||[]).forEach(function(x){mpM[x.player_id]=x;});
    var elenco=PLAYERS.filter(function(p){return inRosa(p,m.date);}).sort(function(a,b){return (a.jersey_number||99)-(b.jersey_number||99);});
    var h=docEditPanel(m,ritrovo,luogo);
    if(DOC_MODE==="dist"){
      if(DOC_ROWS_MATCH!==m.id){
        DOC_ROWS_MATCH=m.id;
        var ordArr=elenco.filter(function(p){var x=mpM[p.id];return x&&x.convocated&&x.dist_order!=null;}).sort(function(a,b){return (mpM[a.id].dist_order||0)-(mpM[b.id].dist_order||0);}).map(function(p){return p.id;});
        if(ordArr.length){DOC_ROWS=ordArr.slice(0,20);}
        else{DOC_ROWS=elenco.filter(function(p){var x=mpM[p.id];return !x||x.convocated;}).slice(0,20).map(function(p){return p.id;});}
        while(DOC_ROWS.length<20)DOC_ROWS.push("");
      }
      var cnt={};DOC_ROWS.forEach(function(id){if(id){cnt[id]=(cnt[id]||0)+1;}});
      var scnt={};Object.keys(DOC_STAFF).forEach(function(rl){var id=DOC_STAFF[rl];if(id){scnt[id]=(scnt[id]||0)+1;}});
      var esclusi=elenco.filter(function(p){return DOC_ROWS.indexOf(p.id)===-1;});
      var opts='<option value="">—</option>'+elenco.map(function(p){return '<option value="'+p.id+'">'+p.last_name+' '+p.first_name+'</option>';}).join("");
      h+='<div class="docWrap">';
      h+='<div class="docTop"><img class="dlogo" src="'+LOGO_FIGC+'" alt="FIGC"><img class="dlogo" src="'+LOGO_LND+'" alt="LND"><div class="docSocName">'+ci.nome+'</div><img class="dlogo dlogo-round" src="'+logo+'" alt="logo"></div>';
      h+='<div class="docContacts">'+ci.addr+' – Tel. '+ci.tel+' · '+ci.mail+' - PEC: '+ci.pec+' · '+ci.piva+' - MATRICOLA FIGC '+ci.matricola+' - C.O.N.I. n° '+ci.coni+'</div>';
      h+='<div class="docBarGrey">DISTINTA GIOCATORI</div>';
      h+='<div class="docBarGrey small">INCONTRO di '+m.competition+'</div>';
      h+='<div class="docMatchTitle">'+gara+'</div>';
      h+='<div class="docMetaRow"><span class="lbl">VALEVOLE PER:</span><span class="val">'+m.competition+' '+(m.category||"Under 14")+'</span><span class="lbl">DATA:</span><span class="val">'+dataFmt+'</span><span class="lbl">ORARIO:</span><span class="val">'+(m.time?fmtTime(m.time):"")+'</span></div>';
      h+='<div class="docMetaRow"><span class="lbl">CAMPO:</span><span class="val">'+luogo+(viaLuogo?(" "+viaLuogo):"")+'</span><span class="lbl">ARBITRO:</span><span class="val">'+(m.referee||"")+'</span></div>';
      h+='<div class="docScroll"><table class="docGrid"><tr><th style="width:6%">N°</th><th style="width:30%">COGNOME e NOME</th><th class="col-cap" style="width:10%">CAP/V.CAP</th><th class="col-matr" style="width:14%">MATRICOLA</th><th style="width:14%">DATA NASCITA</th><th class="col-tess" style="width:14%">TESSERA/DOC.</th></tr>';
      for(var i=0;i<20;i++){
        var pid=DOC_ROWS[i];
        var p=elenco.find(function(x){return x.id===pid;});
        var dup=pid&&cnt[pid]>1;
        h+='<tr'+(dup?' style="background:#fee2e2"':'')+'><td>'+(i+1)+'</td><td><select onchange="setDocRow('+i+',this.value)">'+opts.replace('value="'+pid+'"','value="'+pid+'" selected')+'</select>'+(dup?' <b style="color:#991b1b">⚠</b>':'')+'</td><td class="col-cap"></td><td class="col-matr">'+(p?(p.figc_id||""):"")+'</td><td>'+(p?birthFmt(p.birth_date):"")+'</td><td class="col-tess">'+(p?(p.card_number||""):"")+'</td></tr>';
      }
      h+='</table></div>';
      h+='<div class="docScroll"><table class="docGrid"><tr><th style="width:34%">RUOLO STAFF</th><th>NOME</th><th style="width:14%">TESS. FIGC</th><th style="width:16%">DOCUMENTO N.</th></tr>';
      RUOLI_STAFF.forEach(function(rl){
        var sel=DOC_STAFF[rl]||((STAFF.find(function(x){return (x.role||"").toUpperCase()===rl;})||{}).id)||"";
        var dupS=sel&&scnt[sel]>1;
        h+='<tr'+(dupS?' style="background:#fee2e2"':'')+'><td class="rl">'+rl+'</td><td><select onchange="setDocStaff(\''+rl.replace(/'/g,"\\'")+'\',this.value)"><option value="">— scegli —</option>'+STAFF.map(function(s){return '<option value="'+s.id+'"'+(sel===s.id?" selected":"")+'>'+s.full_name+'</option>';}).join("")+'</select></td><td>'+staffField(sel,"figc_id")+'</td><td>'+staffField(sel,"doc_id")+'</td></tr>';
      });
      h+='</table></div>';
      h+='<div class="docBtns noPrint"><button class="btn ok" onclick="saveDist()">💾 Salva distinta</button></div>';
      h+='<div class="docNotes">Il sottoscritto Dirigente accompagnatore ufficiale dichiara che il presente elenco è redatto in ottemperanza a quanto stabilito dagli artt. 61 e 66 delle N.O.I.F.</div>';
      h+='<div class="docSignRow"><div>L\'ARBITRO<br><br></div><div>IL DIRIGENTE ACCOMPAGNATORE UFFICIALE<br><br></div></div>';
      h+='</div>';
      h+='<div class="noPrint" style="margin-top:14px;border:2px dashed #f59e0b;border-radius:12px;padding:10px;background:#fffbeb">';
      h+='<b style="color:#92400e">🔎 CONTROLLO (non stampato):</b> ';
      h+='<div style="font-size:12px;margin-top:6px">In distinta: <b>'+DOC_ROWS.filter(function(x){return x;}).length+'</b> su 20 posti. ';
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
      h+='<div class="docWrap">';
      h+='<div class="docTopConv"><div class="convLogoCol"><img class="dlogo dlogo-round" src="'+logo+'" alt="logo"><img class="dlogo auto" src="'+LOGO_AUTOINGROS+'" alt="sponsor"></div><div class="docSocName">'+ci.nome+'</div></div>';
      h+='<div class="docYellow">CONVOCAZIONE</div>';
      h+='<div class="docMetaRow"><span class="lbl">CATEGORIA</span><span class="val" style="font-weight:900;text-align:center">'+(m.category||"Under14")+'</span></div>';
      h+='<div class="docMetaRow"><span class="lbl">PARTITA</span><span class="val" style="font-weight:800;text-align:center">'+gara+'</span></div>';
      h+='<div class="docMetaRow"><span class="lbl">VALEVOLE PER</span><span class="val">'+m.competition+'</span></div>';
      h+='<div class="docMetaRow"><span class="lbl">DATA</span><span class="val">'+dataFmt+'</span><span class="lbl">ORARIO RITROVO</span><span class="val" style="font-weight:800">'+ritrovo+'</span></div>';
      h+='<div class="docMetaRow"><span class="lbl">INDIRIZZO</span><span class="val">'+(m.home?(luogo+(viaLuogo?(" "+viaLuogo):"")):(viaAvv||luogo))+'</span></div>';
      h+='<div class="docScroll"><table class="docGrid"><tr><th style="width:8%">N°</th><th style="width:26%">COGNOME</th><th style="width:26%">NOME</th><th style="width:18%">CONVOCATO</th><th style="width:22%">MOTIVAZIONE/NOTE</th></tr>';
      elenco.forEach(function(p){var s=CONV_STATE[p.id]||{conv:true,note:""};
        h+='<tr><td>'+(p.jersey_number||"")+'</td><td>'+p.last_name+'</td><td>'+p.first_name+'</td>'+
        '<td><select onchange="convSet(\''+p.id+'\',\'conv\',this.value)"><option value="1"'+(s.conv?" selected":"")+'>SI</option><option value="0"'+(!s.conv?" selected":"")+'>NO</option></select></td>'+
        '<td><select onchange="convSet(\''+p.id+'\',\'note\',this.value)">'+MOTIVI_CONV.map(function(o){return '<option'+(s.note===o?" selected":"")+'>'+o+'</option>';}).join("")+'</select></td></tr>';});
      h+='</table></div>';
      h+='<div class="docNotes">E OBBLIGATORIO PRESENTARSI IN DIVISA DI RAPPRESENTANZA e BORSONE UFFICIALE DELLA SOCIETA · SI RACCOMANDA LA PUNTUALITA · IN CASO DI RITARDO E/O PROBLEMI AVVISARE TEMPESTIVAMENTE IL DIRIGENTE · SE RICHIESTO PORTARE UN DOCUMENTO DI IDENTITA SEMPRE IN ORIGINALE · IL MANCATO RISPETTO E DA CONSIDERARSI UN GRAVE INADEMPIMENTO DISCIPLINARE SALVO VALIDI E GIUSTIFICATI MOTIVI VALUTATI DALLO STAFF TECNICO E SOCIETARIO</div>';
      h+='<div class="docSignRow"><div>IL DIRIGENTE:</div><div>DATA: '+dataFmt+'</div></div>';
      h+='</div>';
    }
    out.innerHTML=h;
    populateDocHistory(m);
  });
}
window.convSet=function(id,field,val){if(!CONV_STATE[id])CONV_STATE[id]={conv:true,note:""};CONV_STATE[id][field]=(field==="conv")?(val==="1"):val;};

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
if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").catch(function(){});