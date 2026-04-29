import { useState } from "react";

// ─── Theme ────────────────────────────────────────────────────────────────────
const T = {
  bg:"#080B10",bgCard:"#0D1117",bgPanel:"#111520",bgDeep:"#070A0F",
  border:"#1A2133",borderHi:"#222D42",
  accent:"#F59E0B",accentGlow:"#F59E0B18",accentSoft:"#FCD34D",
  blue:"#3B82F6",blueGlow:"#3B82F618",
  green:"#10B981",greenGlow:"#10B98118",
  red:"#EF4444",redGlow:"#EF444418",
  orange:"#F97316",orangeGlow:"#F9731618",
  purple:"#8B5CF6",purpleGlow:"#8B5CF618",
  cyan:"#06B6D4",cyanGlow:"#06B6D418",
  text:"#F1F5F9",textSub:"#94A3B8",textMuted:"#3D4F6A",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:${T.bg};font-family:'DM Sans',sans-serif;color:${T.text};font-size:14px;}
::-webkit-scrollbar{width:4px;height:4px;}
::-webkit-scrollbar-track{background:${T.bg};}
::-webkit-scrollbar-thumb{background:${T.border};border-radius:2px;}
.rj{font-family:'Rajdhani',sans-serif;}
.mono{font-family:'JetBrains Mono',monospace;}
.app{display:flex;min-height:100vh;}
.sidebar{background:${T.bgCard};border-right:1px solid ${T.border};width:232px;min-height:100vh;flex-shrink:0;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow-y:auto;}
.main{flex:1;overflow-y:auto;min-height:100vh;}
.pad{padding:24px 28px;}
.nav-section{font-size:9px;font-weight:700;letter-spacing:.12em;color:${T.textMuted};padding:14px 16px 4px;text-transform:uppercase;}
.nav-item{display:flex;align-items:center;gap:10px;padding:8px 14px;cursor:pointer;font-size:12.5px;color:${T.textSub};border-radius:8px;margin:1px 6px;transition:all .15s;}
.nav-item:hover{background:${T.bgPanel};color:${T.text};}
.nav-item.active{background:${T.accentGlow};color:${T.accent};border:1px solid ${T.accent}33;}
.nav-badge{margin-left:auto;background:${T.red}22;color:${T.red};font-size:10px;padding:1px 7px;border-radius:10px;font-weight:700;}
.nav-badge-o{margin-left:auto;background:${T.orange}22;color:${T.orange};font-size:10px;padding:1px 7px;border-radius:10px;font-weight:700;}
.card{background:${T.bgCard};border:1px solid ${T.border};border-radius:12px;padding:18px;}
.card-sm{background:${T.bgCard};border:1px solid ${T.border};border-radius:10px;padding:12px 14px;}
.stat{background:${T.bgCard};border:1px solid ${T.border};border-radius:12px;padding:16px;}
.stat-v{font-family:'Rajdhani',sans-serif;font-size:30px;font-weight:700;line-height:1;}
.stat-l{font-size:10px;color:${T.textSub};margin-top:3px;text-transform:uppercase;letter-spacing:.07em;}
.badge{display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:600;}
.bg{background:${T.green}20;color:${T.green};}
.br{background:${T.red}20;color:${T.red};}
.ba{background:${T.accent}20;color:${T.accent};}
.bb{background:${T.blue}20;color:${T.blue};}
.bp{background:${T.purple}20;color:${T.purple};}
.bo{background:${T.orange}20;color:${T.orange};}
.bc{background:${T.cyan}20;color:${T.cyan};}
.btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;font-size:12.5px;font-weight:500;cursor:pointer;border:none;transition:all .15s;font-family:'DM Sans',sans-serif;}
.btn-p{background:${T.accent};color:#080B10;font-weight:600;}
.btn-p:hover{background:${T.accentSoft};}
.btn-g{background:${T.green}20;color:${T.green};border:1px solid ${T.green}30;}
.btn-b{background:${T.blue}20;color:${T.blue};border:1px solid ${T.blue}30;}
.btn-r{background:${T.red}20;color:${T.red};border:1px solid ${T.red}30;}
.btn-o{background:${T.orange}20;color:${T.orange};border:1px solid ${T.orange}30;}
.btn-c{background:${T.cyan}20;color:${T.cyan};border:1px solid ${T.cyan}30;}
.btn-gh{background:transparent;color:${T.textSub};border:1px solid ${T.border};}
.btn-gh:hover{background:${T.bgPanel};color:${T.text};}
.tbl{width:100%;border-collapse:collapse;}
.tbl th{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:${T.textMuted};padding:9px 12px;text-align:left;border-bottom:1px solid ${T.border};background:${T.bgPanel};}
.tbl td{padding:10px 12px;font-size:12.5px;color:${T.textSub};border-bottom:1px solid ${T.border}18;}
.tbl tr:hover td{background:${T.bgPanel};color:${T.text};}
.tbl tr:last-child td{border-bottom:none;}
.pbar{height:4px;background:${T.border};border-radius:4px;overflow:hidden;}
.pfill{height:100%;border-radius:4px;transition:width .4s;}
input,select,textarea{background:${T.bgPanel};border:1px solid ${T.border};border-radius:8px;color:${T.text};padding:7px 11px;font-size:12.5px;font-family:'DM Sans',sans-serif;outline:none;width:100%;}
input:focus,select:focus,textarea:focus{border-color:${T.accent}55;}
select option{background:${T.bgPanel};}
textarea{resize:vertical;}
.flabel{font-size:10px;font-weight:700;color:${T.textSub};text-transform:uppercase;letter-spacing:.07em;margin-bottom:5px;display:block;}
.frow{display:grid;gap:12px;margin-bottom:14px;}
.fr2{grid-template-columns:1fr 1fr;}
.fr3{grid-template-columns:1fr 1fr 1fr;}
.fr4{grid-template-columns:1fr 1fr 1fr 1fr;}
.ov{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(8px);}
.modal{background:${T.bgCard};border:1px solid ${T.borderHi};border-radius:16px;width:100%;max-width:900px;max-height:92vh;overflow-y:auto;}
.mhdr{padding:16px 22px;border-radius:16px 16px 0 0;display:flex;align-items:center;justify-content:space-between;}
.mbdy{padding:22px;}
.tabs{display:flex;gap:2px;border-bottom:1px solid ${T.border};margin-bottom:18px;}
.tab{padding:8px 14px;font-size:12.5px;cursor:pointer;color:${T.textMuted};border-bottom:2px solid transparent;transition:all .15s;}
.tab.on{color:${T.accent};border-bottom-color:${T.accent};}
.tab:hover{color:${T.text};}
.arow{display:flex;align-items:center;gap:12px;padding:9px 12px;background:${T.bgPanel};border-radius:8px;border-left:3px solid;margin-bottom:6px;}
.kpi-row{display:grid;gap:12px;margin-bottom:18px;}
.kpi4{grid-template-columns:repeat(4,1fr);}
.kpi3{grid-template-columns:repeat(3,1fr);}
.kpi2{grid-template-columns:1fr 1fr;}
.sep{height:1px;background:${T.border};margin:14px 0;}
.ledger-dr{color:${T.red};font-weight:600;}
.ledger-cr{color:${T.green};font-weight:600;}
.section-title{font-size:11px;font-weight:700;color:${T.textMuted};text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px;}
.grd2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.grd3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}
.risk-high{color:${T.red};background:${T.red}15;border:1px solid ${T.red}30;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;}
.risk-med{color:${T.orange};background:${T.orange}15;border:1px solid ${T.orange}30;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;}
.risk-low{color:${T.green};background:${T.green}15;border:1px solid ${T.green}30;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;}
.toggle-pill{display:flex;background:${T.bgPanel};border:1px solid ${T.border};border-radius:20px;padding:2px;gap:2px;}
.toggle-opt{padding:4px 14px;border-radius:16px;font-size:12px;cursor:pointer;font-weight:500;transition:all .15s;color:${T.textSub};}
.toggle-opt.on{background:${T.accent};color:#080B10;font-weight:700;}
/* Trip-specific */
.kanban-col{background:${T.bgPanel};border:1px solid ${T.border};border-radius:12px;min-width:190px;padding:12px;}
.kanban-card{background:${T.bgCard};border:1px solid ${T.border};border-radius:8px;padding:11px;margin-bottom:8px;cursor:pointer;transition:border-color .15s;}
.kanban-card:hover{border-color:${T.accent}55;}
.vtype-btn{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:10px;cursor:pointer;border:1px solid ${T.border};background:${T.bgPanel};transition:all .15s;}
.vtype-btn:hover{border-color:${T.accent}55;background:${T.accentGlow};}
.vtype-btn.sel{border-color:${T.accent};background:${T.accentGlow};}
.vsubtype-btn{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:8px;cursor:pointer;border:1px solid ${T.border};background:${T.bgPanel};transition:all .15s;font-size:12px;color:${T.textSub};}
.vsubtype-btn:hover{border-color:${T.blue}55;background:${T.blueGlow};}
.vsubtype-btn.sel{border-color:${T.blue};background:${T.blueGlow};color:${T.blue};}
.truck-card{padding:10px 14px;border-radius:10px;cursor:pointer;border:1px solid ${T.border};background:${T.bgPanel};display:flex;align-items:center;justify-content:space-between;transition:all .15s;margin-bottom:8px;}
.truck-card:hover{border-color:${T.accent}66;}
.truck-card.sel{border-color:${T.accent};background:${T.accentGlow};}
.truck-card.unavail{opacity:.45;cursor:not-allowed;}
.journey-card{padding:13px 15px;border-radius:12px;cursor:pointer;border:1px solid ${T.border};background:${T.bgPanel};transition:all .15s;}
.journey-card:hover{border-color:${T.accent}55;}
.journey-card.sel{border-color:${T.accent};background:${T.accentGlow};}
.leg-block{background:${T.bgPanel};border:1px solid ${T.border};border-radius:10px;padding:14px;margin-bottom:12px;}
.leg-conn{text-align:center;padding:4px 0;color:${T.textMuted};font-size:11px;}
.inspect-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px;}
.inspect-item{display:flex;align-items:center;justify-content:space-between;padding:8px 11px;background:${T.bgPanel};border-radius:8px;border:1px solid ${T.border};}
.inspect-item.pass{border-color:${T.green}44;background:${T.green}08;}
.inspect-item.fail{border-color:${T.red}44;background:${T.red}08;}
.step-dot{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;}
.step-line{flex:1;height:2px;}
.lifecycle-bar{display:flex;border-radius:10px;overflow:hidden;border:1px solid ${T.border};margin-bottom:18px;}
.lc-step{flex:1;padding:8px 4px;text-align:center;border-right:1px solid ${T.border};}
.lc-step:last-child{border-right:none;}
.lc-step.active{background:${T.accentGlow};}
.pulse{animation:pulse 2s ease-in-out infinite;}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}
.dot{width:8px;height:8px;border-radius:50%;display:inline-block;}
`;

// ─── Icons ────────────────────────────────────────────────────────────────────
const Ic = ({ n, s = 15, c = "currentColor" }) => {
  const d = {
    x:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    plus:<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    check:<><polyline points="20 6 9 17 4 12"/></>,
    arrow:<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    wallet:<><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>,
    truck:<><path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/></>,
    driver:<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></>,
    tyre:<><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="2" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="22" y2="12"/></>,
    agent:<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>,
    fleet:<><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    finance:<><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></>,
    chart:<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    shield:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    bell:<><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    trips:<><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></>,
    dash:<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    eye:<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    edit:<><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    rotate:<><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></>,
    recycle:<><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></>,
    alert:<><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    doc:<><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
    percent:<><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></>,
    phone:<><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></>,
    wrench:<><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></>,
    parts:<><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2"/></>,
    brain:<><path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-2.5 2.5H7a2.5 2.5 0 01-2.5-2.5V7A2.5 2.5 0 017 4.5M14.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 002.5 2.5H17a2.5 2.5 0 002.5-2.5V7A2.5 2.5 0 0017 4.5"/></>,
    vendor:<><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    fuel:<><path d="M3 22V8l7-6 7 6v14"/><path d="M17 22v-4M17 14V8M17 8l3 2M3 12h14"/></>,
    map:<><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>,
    cpu:<><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></>,
    pretrip:<><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></>,
    posttrip:<><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></>,
    clipboard:<><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></>,
    route:<><circle cx="5" cy="6" r="3"/><path d="M5 9v12"/><circle cx="5" cy="21" r="3"/><path d="M13 6h4a2 2 0 012 2v8a2 2 0 01-2 2h-4"/></>,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{d[n]||null}</svg>;
};

// ═══════════════════════════════════════════════════════════════════════════════
// VEHICLE SCHEMA (from v2)
// ═══════════════════════════════════════════════════════════════════════════════
const VEHICLE_SCHEMA = [
  { id:"tripper", label:"Tripper", icon:"🚛", desc:"Tipping body for bulk material (sand, gravel, coal)", color:"#F59E0B",
    subtypes:[{ id:"tripper_live", label:"Live Axle", wheels:["12 Wheelers","14 Wheelers","16 Wheelers"], capacity:"10–20T" },{ id:"tripper_lift", label:"Lift Axle", wheels:["14 Wheelers","16 Wheelers"], capacity:"15–25T" }],
    specs:{ make:"Tata / Ashok Leyland / BharatBenz", fuelEconomy:"4–5 km/l", avgSpeed:"55–65 kmph" } },
  { id:"openbody", label:"Open Body", icon:"🚚", desc:"Flatbed open carrier for general goods, machinery", color:"#3B82F6",
    subtypes:[{ id:"openbody_std", label:"Standard", wheels:["12 Wheelers","14 Wheelers","16 Wheelers"], capacity:"10–24T" },{ id:"openbody_liftaxle", label:"Lift Axle", wheels:["14 Wheelers","16 Wheelers"], capacity:"18–28T" }],
    specs:{ make:"Tata / EICHER / Mahindra", fuelEconomy:"5–7 km/l", avgSpeed:"60 kmph" } },
  { id:"trailer", label:"Trailer", icon:"🚜", desc:"Long-haul semi-trailer for heavy/oversized loads", color:"#8B5CF6",
    subtypes:[{ id:"trailer_single", label:"Single Trailer", wheels:["2 Axle","3 Axle"], capacity:"20–30T" },{ id:"trailer_double", label:"Double Trailer", wheels:["4 Axle","5 Axle"], capacity:"30–45T" }],
    specs:{ make:"Tata Prima / Volvo / Scania", fuelEconomy:"3–4 km/l", avgSpeed:"55 kmph" } },
  { id:"flatbed", label:"Flatbed", icon:"🛻", desc:"Low-deck flatbed for steel coils, pipes, heavy cargo", color:"#10B981",
    subtypes:[{ id:"flatbed_std", label:"Standard", wheels:["12 Wheelers","14 Wheelers","16 Wheelers"], capacity:"15–30T" },{ id:"flatbed_lowbed", label:"Low Bed", wheels:["6 Axle","8 Axle"], capacity:"30–80T" }],
    specs:{ make:"Tata / KAMA / BharatBenz", fuelEconomy:"4–5 km/l", avgSpeed:"55 kmph" } },
  { id:"container", label:"Container", icon:"📦", desc:"Enclosed container for finished goods, FMCG", color:"#F97316",
    subtypes:[{ id:"container_20ft", label:"20 FT", wheels:["6 Wheeler","10 Wheeler"], capacity:"15–18T" },{ id:"container_32ft", label:"32 FT", wheels:["12 Wheeler","14 Wheeler"], capacity:"20–25T" },{ id:"container_40ft", label:"40 FT HQ", wheels:["16 Wheeler","18 Wheeler"], capacity:"25–30T" }],
    specs:{ make:"Tata / VECV / MAN", fuelEconomy:"6–8 km/l", avgSpeed:"65 kmph" } },
  { id:"lcv", label:"LCV / SCV", icon:"🚐", desc:"Light/small commercial vehicle for last-mile delivery", color:"#94A3B8",
    subtypes:[{ id:"lcv_mini", label:"Mini Truck", wheels:["4 Wheeler"], capacity:"1–2T" },{ id:"lcv_pickup", label:"Pickup", wheels:["4 Wheeler"], capacity:"0.5–1T" }],
    specs:{ make:"Tata Ace / Mahindra Jeeto / Force", fuelEconomy:"12–18 km/l", avgSpeed:"60 kmph" } },
];

const JOURNEY_TYPES = [
  { id:"oneway", label:"One-Way Load", icon:"→", color:"#3B82F6", desc:"Truck goes A→B with load. Returns empty or on its own.", legs:["Origin → Destination"], tag:"Single Leg" },
  { id:"roundtrip", label:"Round Trip", icon:"⇄", color:"#10B981", desc:"A→B with load, B→A with return load from another party.", legs:["Origin → Destination","Destination → Origin (Return Load)"], tag:"2 Legs" },
  { id:"multileg", label:"Multi-Leg (Hub & Spoke)", icon:"⟳", color:"#F59E0B", desc:"A→B→C. Deliver at B, pick new load to C, then return.", legs:["Origin → Stop 1","Stop 1 → Stop 2","Stop 2 → Origin"], tag:"3 Legs" },
  { id:"crossregion", label:"Cross-Region Relay", icon:"↬", color:"#8B5CF6", desc:"Long-haul trip with driver relay handoff at midpoint depot.", legs:["Origin → Relay Point","Relay Point → Destination"], tag:"Driver Relay" },
  { id:"dedicated", label:"Dedicated Fleet Run", icon:"∞", color:"#F97316", desc:"Fixed route, recurring trips for one customer.", legs:["Fixed Route (Repeating)"], tag:"Recurring" },
];

const INSPECTION_ITEMS = [
  "Brakes","Lights","Fuel Level","Windshield Wipers","Flashlight","Muffler",
  "Oil Pressure","Engine","Battery Water Level","Engine Oil","Gear Box Oil",
  "Electricals","Horn","Radiator","Air Filter","Steering System",
  "Suspension","Emergency Equipment","Belts","Radiator Water Level",
  "Crown Oil","Filter Cleaning","Tyre (FL)","Tyre (FR)","Tyre (RL)","Tyre (RR)",
];

const CUSTOMERS = ["Ramco Cements","TVS Motors","Asian Paints","Pepsico India","Godrej Industries","Raj Textiles","SKS Logistics","Global Freight","Deccan Traders","North India Corp"];

// ─── Seed Data ────────────────────────────────────────────────────────────────
const DRIVERS_DATA = [
  { id:"DRV-001", name:"Mani Kumar", phone:"+91 98765 43210", cdl:"Class A", score:88, status:"Available", advanceBalance:4500, totalTrips:34, kmDriven:284000, licenseExp:"2027-03-15" },
  { id:"DRV-002", name:"Selvam R", phone:"+91 87654 32109", cdl:"Class B", score:76, status:"On Settlement", advanceBalance:0, totalTrips:21, kmDriven:168000, licenseExp:"2026-07-22" },
  { id:"DRV-003", name:"Ramesh P", phone:"+91 76543 21098", cdl:"Class A", score:62, status:"On Trip", advanceBalance:8000, totalTrips:18, kmDriven:142000, licenseExp:"2025-12-31" },
  { id:"DRV-004", name:"Arjun D", phone:"+91 65432 10987", cdl:"Class A", score:94, status:"Available", advanceBalance:2300, totalTrips:28, kmDriven:231000, licenseExp:"2028-11-10" },
  { id:"DRV-005", name:"Vinoth S", phone:"+91 54321 09876", cdl:"Class B", score:71, status:"On Trip", advanceBalance:6700, totalTrips:15, kmDriven:118000, licenseExp:"2029-04-05" },
  { id:"DRV-006", name:"Karthik M", phone:"+91 43210 98765", cdl:"Class A", score:85, status:"Available", advanceBalance:1200, totalTrips:22, kmDriven:195000, licenseExp:"2028-08-20" },
];

const FLEET_DATA = [
  { id:"VH-001", num:"TN69 GH4789", typeId:"tripper", subtypeId:"tripper_live", wheels:"16 Wheelers", model:"Tata LPT 2518", make:"Tata", year:2017, status:"Active", health:87, ownership:"Owned", purchaseCost:2800000, purchaseDate:"2017-04-10", insurance:"Valid", fc:"Valid", tax:"Due in 12d", km:74875, revenue:4820000, cost:3640000, fuel:"5.2 km/l", speed:"60 kmph" },
  { id:"VH-002", num:"TN59 AB1234", typeId:"openbody", subtypeId:"openbody_std", wheels:"14 Wheelers", model:"Ashok Leyland 2518", make:"Ashok Leyland", year:2019, status:"Active", health:73, ownership:"Owned", purchaseCost:2600000, purchaseDate:"2019-08-15", insurance:"Expiring in 7d", fc:"Valid", tax:"Paid", km:92340, revenue:3950000, cost:3120000, fuel:"4.8 km/l", speed:"58 kmph" },
  { id:"VH-003", num:"TN45 CD5678", typeId:"trailer", subtypeId:"trailer_single", wheels:"3 Axle", model:"Tata Prima 4928", make:"Tata Prima", year:2016, status:"Maintenance", health:45, ownership:"Leased", purchaseCost:4200000, purchaseDate:"2016-02-20", insurance:"Valid", fc:"Expired", tax:"Paid", km:124000, revenue:6200000, cost:5800000, fuel:"4.1 km/l", speed:"55 kmph" },
  { id:"VH-004", num:"TN38 EF9012", typeId:"flatbed", subtypeId:"flatbed_std", wheels:"12 Wheelers", model:"BharatBenz 3523", make:"BharatBenz", year:2020, status:"Active", health:91, ownership:"Owned", purchaseCost:3100000, purchaseDate:"2020-11-05", insurance:"Valid", fc:"Valid", tax:"Paid", km:54220, revenue:2870000, cost:1950000, fuel:"5.8 km/l", speed:"60 kmph" },
  { id:"VH-005", num:"TN71 GH3456", typeId:"container", subtypeId:"container_32ft", wheels:"14 Wheeler", model:"VECV Eicher 6016", make:"VECV", year:2018, status:"On Trip", health:68, ownership:"Owned", purchaseCost:2200000, purchaseDate:"2018-06-22", insurance:"Valid", fc:"Valid", tax:"Due in 45d", km:88910, revenue:5100000, cost:3980000, fuel:"7.5 km/l", speed:"65 kmph" },
  { id:"VH-006", num:"TN22 IJ7890", typeId:"lcv", subtypeId:"lcv_mini", wheels:"4 Wheeler", model:"Tata Ace Gold", make:"Tata", year:2021, status:"Active", health:82, ownership:"Owned", purchaseCost:680000, purchaseDate:"2021-03-10", insurance:"Valid", fc:"Valid", tax:"Paid", km:31440, revenue:820000, cost:560000, fuel:"15 km/l", speed:"60 kmph" },
];

const VENDORS = [
  { id:"VND-001", name:"Sri Murugan Transport", contact:"Vijay K", phone:"+91 99001 23456", city:"Coimbatore", vehicles:3, rating:4.2, status:"Active", totalTrips:18, totalFreight:890000, ratePerKm:42, kycDone:true },
  { id:"VND-002", name:"Annamalai Lorry Service", contact:"Selvam A", phone:"+91 98002 34567", city:"Salem", vehicles:2, rating:3.8, status:"Active", totalTrips:12, totalFreight:540000, ratePerKm:38, kycDone:true },
  { id:"VND-003", name:"KPR Fleet Solutions", contact:"Krishnan P", phone:"+91 97003 45678", city:"Madurai", vehicles:5, rating:4.5, status:"Active", totalTrips:29, totalFreight:1450000, ratePerKm:44, kycDone:true },
];

const VENDOR_VEHICLES = [
  { id:"VVH-001", vendor:"Sri Murugan Transport", num:"TN32 XY7821", model:"Tata LPT 2518", type:"Tripper", status:"Available", ratePerKm:42 },
  { id:"VVH-002", vendor:"KPR Fleet Solutions", num:"TN58 AB1100", model:"Tata Prima", type:"Trailer", status:"Available", ratePerKm:44 },
  { id:"VVH-003", vendor:"Annamalai Lorry Service", num:"TN72 CD4400", model:"BharatBenz", type:"Flatbed", status:"Available", ratePerKm:38 },
];

const AGENTS = [
  { id:"AGT-001", name:"Raja Broker", company:"Raja Transport Agency", city:"Chennai", commType:"percent", commValue:5, status:"Active", totalTrips:34, totalFreight:1820000 },
  { id:"AGT-002", name:"Suresh Agency", company:"Suresh Logistics", city:"Coimbatore", commType:"fixed", commValue:3000, status:"Active", totalTrips:21, totalFreight:980000 },
  { id:"AGT-003", name:"Kumar Freight", company:"Kumar Freight Solutions", city:"Madurai", commType:"percent", commValue:4, status:"Active", totalTrips:18, totalFreight:762000 },
];

// TIN = Tyre Identification Number — manufacturer's unique serial stamped on sidewall
// Format: [Brand prefix 3 chars][Plant code 2][Week 2][Year 2][Seq 4] e.g. MRF-CH-17-23-0042
const TYRES = [
  { id:"TYR-001", tin:"MRF-CH-17-23-0042", code:"QR88201", brand:"MRF", size:"315/80 R22.5", pattern:"STEEL MUSCLE", purchaseCost:28000, purchaseDate:"2023-01-10", status:"active", vehicle:"TN69 GH4789", position:"FL", fitOdo:68000, currentOdo:74875, retreads:0, condition:"Good", warrantyKm:80000 },
  { id:"TYR-002", tin:"CEA-MA-08-23-1187", code:"QR88202", brand:"CEAT", size:"315/80 R22.5", pattern:"WINMILE", purchaseCost:25000, purchaseDate:"2023-01-10", status:"active", vehicle:"TN69 GH4789", position:"FR", fitOdo:68000, currentOdo:74875, retreads:0, condition:"Good", warrantyKm:80000 },
  { id:"TYR-003", tin:"APL-NA-32-22-0891", code:"QR77301", brand:"Apollo", size:"295/80 R22.5", pattern:"ENDURE TH", purchaseCost:22000, purchaseDate:"2022-08-15", status:"retread", vehicle:null, position:null, fitOdo:null, currentOdo:92000, retreads:1, condition:"Worn", warrantyKm:60000 },
  { id:"TYR-004", tin:"MRF-CH-21-23-0318", code:"QR77302", brand:"MRF", size:"315/80 R22.5", pattern:"STEEL MUSCLE", purchaseCost:28000, purchaseDate:"2023-05-20", status:"active", vehicle:"TN59 AB1234", position:"RL1", fitOdo:85000, currentOdo:92340, retreads:0, condition:"Good", warrantyKm:80000 },
  { id:"TYR-005", tin:"BRG-PU-06-24-0077", code:"QR55102", brand:"Bridgestone", size:"315/80 R22.5", pattern:"M788", purchaseCost:32000, purchaseDate:"2024-02-14", status:"inventory", vehicle:null, position:null, fitOdo:null, currentOdo:0, retreads:0, condition:"New", warrantyKm:100000 },
];

const WORK_ORDERS = [
  { id:"WO-001", vehicle:"TN45 CD5678", workshop:"Ganesh Auto Works", type:"Corrective", category:"Engine", issue:"Engine overheating during long haul", odometer:124000, status:"In Progress", created:"2025-04-10", partsUsed:[{name:"Radiator Hose",cost:2800},{name:"Coolant 5L",cost:1200}], labourCost:4500, totalCost:8500, invoiceStatus:"Pending" },
  { id:"WO-002", vehicle:"TN59 AB1234", workshop:"Power Electricals", type:"Corrective", category:"Electrical", issue:"Battery not charging — alternator fault", odometer:92340, status:"Open", created:"2025-04-14", partsUsed:[{name:"Alternator",cost:8500}], labourCost:2500, totalCost:11000, invoiceStatus:"Pending" },
  { id:"WO-003", vehicle:"TN69 GH4789", workshop:"Sri Ram Tyre Centre", type:"Preventive", category:"Tyre System", issue:"Scheduled tyre rotation & alignment", odometer:74875, status:"Completed", created:"2025-04-08", partsUsed:[{name:"Alignment",cost:800}], labourCost:1200, totalCost:2000, invoiceStatus:"Paid" },
];

const SPARE_PARTS = [
  { id:"SP-001", name:"Engine Oil 20W-50 (5L)", category:"Engine", quantity:24, unit:"Can", unitCost:1200, reorderLevel:10, vendor:"Castrol India" },
  { id:"SP-002", name:"Brake Pads (Axle Set)", category:"Brake System", quantity:4, unit:"Set", unitCost:6500, reorderLevel:2, vendor:"TVS Brakes" },
  { id:"SP-003", name:"Alternator", category:"Electrical", quantity:1, unit:"Pcs", unitCost:8500, reorderLevel:1, vendor:"Bosch India" },
  { id:"SP-004", name:"Clutch Plate Kit", category:"Gearbox", quantity:3, unit:"Set", unitCost:12000, reorderLevel:2, vendor:"Valeo India" },
  { id:"SP-005", name:"Air Filter", category:"Engine", quantity:2, unit:"Pcs", unitCost:850, reorderLevel:3, vendor:"Mann Filter" },
];

const AI_PREDICTIONS = [
  { vehicle:"TN45 CD5678", riskScore:"HIGH", riskValue:84, predictions:[{ component:"Clutch", type:"failure", inDays:6, kmLeft:null, confidence:0.83 },{ component:"Brake System", type:"maintenance", inDays:12, kmLeft:null, confidence:0.77 }], expectedCost30d:28000 },
  { vehicle:"TN59 AB1234", riskScore:"HIGH", riskValue:72, predictions:[{ component:"Alternator", type:"failure", inDays:3, kmLeft:null, confidence:0.91 },{ component:"Tyre (RL1)", type:"replacement", inDays:null, kmLeft:5200, confidence:0.78 }], expectedCost30d:18000 },
  { vehicle:"TN69 GH4789", riskScore:"MEDIUM", riskValue:48, predictions:[{ component:"Engine Oil", type:"maintenance", inDays:18, kmLeft:null, confidence:0.95 }], expectedCost30d:8000 },
  { vehicle:"TN38 EF9012", riskScore:"LOW", riskValue:22, predictions:[{ component:"All Systems", type:"ok", inDays:null, kmLeft:null, confidence:0.92 }], expectedCost30d:4000 },
];

// ─── Trip Status Config ───────────────────────────────────────────────────────
const STATUS_COLORS = {
  "Pre-Trip Pending":T.orange, "Pre-Trip Done":T.blue,
  "Started":T.green, "In Transit":T.blue, "Arrived":T.accent,
  "Post-Trip Pending":T.orange, "Post-Trip Done":T.purple,
  "Invoiced":T.orange, "Closed":T.green, "In Maintenance":T.purple,
  "Settled":T.green, "Pending Settlement":T.orange, "Booked":T.cyan,
};
const TRIP_LIFECYCLE = ["Pre-Trip Pending","Pre-Trip Done","Started","In Transit","Arrived","Post-Trip Pending","Post-Trip Done","Invoiced","Closed"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
const pct = (a, b) => b > 0 ? ((a / b) * 100).toFixed(1) + "%" : "0%";
const tripExpTotal = (exp) => Object.values(exp).reduce((s, v) => s + v, 0);
const riskBadge = (r) => {
  if (r === "HIGH") return <span className="risk-high">HIGH RISK</span>;
  if (r === "MEDIUM") return <span className="risk-med">MEDIUM</span>;
  return <span className="risk-low">LOW RISK</span>;
};

// ═══════════════════════════════════════════════════════════════════════════════
// VEHICLE TYPE SELECTOR (from v2)
// ═══════════════════════════════════════════════════════════════════════════════
const VehicleTypeSelector = ({ form, set }) => {
  const selected = VEHICLE_SCHEMA.find(v => v.id === form.vehicleCategoryId);
  const selectedSubtype = selected?.subtypes.find(s => s.id === form.vehicleSubtypeId);
  const availFleet = FLEET_DATA.filter(t =>
    t.typeId === form.vehicleCategoryId &&
    t.status === "Active" &&
    (!form.vehicleSubtypeId || t.subtypeId === form.vehicleSubtypeId) &&
    (!form.vehicleWheels || t.wheels === form.vehicleWheels)
  );

  return (
    <div>
      <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:14 }}>🚛 Select Vehicle Category</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:18 }}>
        {VEHICLE_SCHEMA.map(vt => (
          <div key={vt.id} className={`vtype-btn ${form.vehicleCategoryId===vt.id?"sel":""}`}
            style={{ borderColor:form.vehicleCategoryId===vt.id?vt.color:undefined, background:form.vehicleCategoryId===vt.id?vt.color+"18":undefined }}
            onClick={() => { set("vehicleCategoryId",vt.id); set("vehicleSubtypeId",""); set("vehicleWheels",""); set("vehicle",""); }}>
            <span style={{ fontSize:22 }}>{vt.icon}</span>
            <div><div style={{ fontSize:12, fontWeight:600, color:form.vehicleCategoryId===vt.id?vt.color:T.text }}>{vt.label}</div><div style={{ fontSize:10, color:T.textMuted }}>{vt.subtypes[0].capacity}</div></div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:12, padding:16, marginBottom:16 }}>
          <div style={{ fontSize:12, fontWeight:600, color:selected.color, marginBottom:12 }}>{selected.icon} {selected.label} — Select Configuration</div>
          <div style={{ marginBottom:12 }}>
            <div className="flabel">Body Type</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {selected.subtypes.map(st => (
                <div key={st.id} className={`vsubtype-btn ${form.vehicleSubtypeId===st.id?"sel":""}`}
                  onClick={() => { set("vehicleSubtypeId",st.id); set("vehicleWheels",""); set("vehicle",""); }}>{st.label}</div>
              ))}
            </div>
          </div>
          {selectedSubtype && (
            <div style={{ marginBottom:12 }}>
              <div className="flabel">Wheel / Axle Config</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {selectedSubtype.wheels.map(w => (
                  <div key={w} className={`vsubtype-btn ${form.vehicleWheels===w?"sel":""}`}
                    style={{ borderColor:form.vehicleWheels===w?selected.color:undefined, color:form.vehicleWheels===w?selected.color:undefined }}
                    onClick={() => { set("vehicleWheels",w); set("vehicle",""); }}>{w}</div>
                ))}
              </div>
            </div>
          )}
          {selectedSubtype && (
            <div style={{ display:"flex", gap:16, paddingTop:10, borderTop:`1px solid ${T.border}`, flexWrap:"wrap" }}>
              {[{ label:"Make", val:selected.specs.make },{ label:"Fuel Economy", val:selected.specs.fuelEconomy, color:T.green },{ label:"Avg Speed", val:selected.specs.avgSpeed },{ label:"Capacity", val:selectedSubtype.capacity }].map(s => (
                <div key={s.label} style={{ minWidth:100 }}>
                  <div style={{ fontSize:10, color:T.textMuted, textTransform:"uppercase", letterSpacing:"0.05em" }}>{s.label}</div>
                  <div style={{ fontSize:12, fontWeight:600, color:s.color||T.textSub, marginTop:2 }}>{s.val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {form.vehicleCategoryId && (
        <div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
            <div className="flabel" style={{ margin:0 }}>Matching Fleet Vehicles</div>
            <div style={{ background:availFleet.length>0?T.green+"20":T.red+"20", color:availFleet.length>0?T.green:T.red, fontSize:13, fontWeight:700, fontFamily:"Rajdhani", padding:"3px 14px", borderRadius:20, border:`1px solid ${availFleet.length>0?T.green:T.red}33` }}>
              Available: {availFleet.length}
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", maxHeight:240, overflowY:"auto" }}>
            {FLEET_DATA.filter(t =>
              t.typeId===form.vehicleCategoryId &&
              (!form.vehicleSubtypeId||t.subtypeId===form.vehicleSubtypeId) &&
              (!form.vehicleWheels||t.wheels===form.vehicleWheels)
            ).map(t => {
              const vtype = VEHICLE_SCHEMA.find(v => v.id===t.typeId);
              const isUnavail = t.status !== "Active";
              return (
                <div key={t.id} className={`truck-card ${form.vehicle===t.num?"sel":""} ${isUnavail?"unavail":""}`}
                  onClick={() => !isUnavail && set("vehicle", t.num)}>
                  <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                    <div style={{ width:40, height:40, borderRadius:8, background:T.bgCard, border:`1px solid ${vtype?.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{vtype?.icon}</div>
                    <div>
                      <div className="mono" style={{ fontSize:12, fontWeight:700, color:form.vehicle===t.num?T.accent:T.text }}>{t.num}</div>
                      <div style={{ fontSize:11, color:T.textSub }}>{t.wheels} · {t.make} {t.year}</div>
                      <div style={{ fontSize:10, color:T.textMuted }}>⛽ {t.fuel} · {t.speed} · {t.km.toLocaleString()} km</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:11, color:t.health>80?T.green:t.health>60?T.accent:T.red, fontWeight:600 }}>{t.health}%</div>
                      <div style={{ fontSize:10, color:T.textMuted }}>health</div>
                    </div>
                    <span className={`badge ${t.status==="Active"?"bg":t.status==="On Trip"?"bb":"bo"}`}>{t.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {form.vehicle && (
            <div style={{ marginTop:12 }}>
              <label className="flabel">Starting Odometer Reading (km)</label>
              <input value={form.startOdometer} onChange={e => set("startOdometer",e.target.value)} placeholder="e.g. 74875" style={{ width:200 }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// JOURNEY TYPE SELECTOR (from v2)
// ═══════════════════════════════════════════════════════════════════════════════
const JourneyTypeSelector = ({ form, set }) => {
  const selected = JOURNEY_TYPES.find(j => j.id === form.journeyType);
  return (
    <div>
      <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:6 }}>🗺️ Trip Journey Type</div>
      <div style={{ fontSize:12, color:T.textSub, marginBottom:14 }}>Choose how the truck will operate for this assignment</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
        {JOURNEY_TYPES.map(jt => (
          <div key={jt.id} className={`journey-card ${form.journeyType===jt.id?"sel":""}`}
            style={{ borderColor:form.journeyType===jt.id?jt.color:undefined, background:form.journeyType===jt.id?jt.color+"12":undefined }}
            onClick={() => set("journeyType",jt.id)}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:18, lineHeight:1 }}>{jt.icon}</span>
                <div style={{ fontSize:13, fontWeight:700, color:form.journeyType===jt.id?jt.color:T.text }}>{jt.label}</div>
              </div>
              <span className="badge" style={{ background:jt.color+"20", color:jt.color, fontSize:10 }}>{jt.tag}</span>
            </div>
            <div style={{ fontSize:11, color:T.textSub, marginBottom:8 }}>{jt.desc}</div>
            {jt.legs.map((leg,i) => <div key={i} style={{ fontSize:10, color:form.journeyType===jt.id?jt.color+"cc":T.textMuted, fontFamily:"JetBrains Mono" }}>{i+1}. {leg}</div>)}
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ background:T.bgPanel, border:`1px solid ${selected.color}44`, borderRadius:12, padding:16 }}>
          <div style={{ fontSize:12, fontWeight:600, color:selected.color, marginBottom:14 }}>{selected.icon} {selected.label} — Route Builder</div>

          {form.journeyType === "oneway" && (
            <div>
              <div className="leg-block">
                <div style={{ fontSize:11, color:T.accent, fontWeight:600, marginBottom:10 }}>LEG 1 — Loaded Run</div>
                <div className="frow fr2">
                  <div><label className="flabel">From (Origin)</label><input value={form.from} onChange={e=>set("from",e.target.value)} placeholder="Chennai" /></div>
                  <div><label className="flabel">To (Destination)</label><input value={form.to} onChange={e=>set("to",e.target.value)} placeholder="Coimbatore" /></div>
                </div>
                <div className="frow fr2">
                  <div><label className="flabel">Start Date/Time</label><input type="datetime-local" value={form.startDate} onChange={e=>set("startDate",e.target.value)} /></div>
                  <div><label className="flabel">Customer</label><select value={form.customer} onChange={e=>set("customer",e.target.value)}><option value="">Select</option>{CUSTOMERS.map(c=><option key={c}>{c}</option>)}</select></div>
                </div>
              </div>
              <div style={{ background:T.blueGlow, border:`1px solid ${T.blue}33`, borderRadius:8, padding:10, fontSize:12, color:T.textSub }}>ℹ️ Truck returns empty. Switch to <strong style={{ color:T.green }}>Round Trip</strong> to book a return load.</div>
            </div>
          )}

          {form.journeyType === "roundtrip" && (
            <div>
              <div className="leg-block">
                <div style={{ fontSize:11, color:T.green, fontWeight:600, marginBottom:10 }}>LEG 1 — Forward Loaded Run</div>
                <div className="frow fr3">
                  <div><label className="flabel">From</label><input value={form.from} onChange={e=>set("from",e.target.value)} placeholder="Chennai" /></div>
                  <div><label className="flabel">To</label><input value={form.to} onChange={e=>set("to",e.target.value)} placeholder="Mumbai" /></div>
                  <div><label className="flabel">Customer</label><select value={form.customer} onChange={e=>set("customer",e.target.value)}><option value="">Select</option>{CUSTOMERS.map(c=><option key={c}>{c}</option>)}</select></div>
                </div>
                <div className="frow fr2">
                  <div><label className="flabel">Start Date/Time</label><input type="datetime-local" value={form.startDate} onChange={e=>set("startDate",e.target.value)} /></div>
                  <div><label className="flabel">Freight (₹)</label><input value={form.freightAmount} onChange={e=>set("freightAmount",e.target.value)} placeholder="45000" /></div>
                </div>
              </div>
              <div className="leg-conn">↕ Return leg (truck picks up load at destination)</div>
              <div className="leg-block" style={{ borderColor:T.green+"55" }}>
                <div style={{ fontSize:11, color:T.green, fontWeight:600, marginBottom:10 }}>LEG 2 — Return Loaded Run</div>
                <div className="frow fr3">
                  <div><label className="flabel">From</label><input value={form.returnFrom||form.to} onChange={e=>set("returnFrom",e.target.value)} placeholder={form.to||"Mumbai"} /></div>
                  <div><label className="flabel">To (Return)</label><input value={form.returnTo||form.from} onChange={e=>set("returnTo",e.target.value)} placeholder={form.from||"Chennai"} /></div>
                  <div><label className="flabel">Return Customer</label><select value={form.returnCustomer||""} onChange={e=>set("returnCustomer",e.target.value)}><option value="">TBD at destination</option>{CUSTOMERS.map(c=><option key={c}>{c}</option>)}</select></div>
                </div>
                <div className="frow fr2">
                  <div><label className="flabel">Return Freight (₹)</label><input value={form.returnFreight||""} onChange={e=>set("returnFreight",e.target.value)} placeholder="0 if not yet booked" /></div>
                  <div style={{ display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
                    <div style={{ fontSize:11, color:T.green }}>Combined revenue:</div>
                    <div className="rj" style={{ fontSize:20, fontWeight:700, color:T.green }}>₹{((parseInt(form.freightAmount||0)+parseInt(form.returnFreight||0))).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {form.journeyType === "multileg" && (
            <div>
              {[
                { num:1, fromKey:"from", toKey:"to", custKey:"customer", label:"Loaded Run A→B", color:T.accent },
                { num:2, fromKey:"leg2From", toKey:"leg2To", custKey:"leg2Customer", label:"Cross-Load B→C", color:T.orange },
                { num:3, fromKey:"leg3From", toKey:"leg3To", custKey:"leg3Customer", label:"Return C→A", color:T.blue },
              ].map(leg => (
                <div key={leg.num}>
                  <div className="leg-block" style={{ borderColor:leg.color+"55" }}>
                    <div style={{ fontSize:11, fontWeight:600, color:leg.color, marginBottom:10 }}>LEG {leg.num} — {leg.label}</div>
                    <div className="frow fr3">
                      <div><label className="flabel">From</label><input value={form[leg.fromKey]||""} onChange={e=>set(leg.fromKey,e.target.value)} placeholder="City" /></div>
                      <div><label className="flabel">To</label><input value={form[leg.toKey]||""} onChange={e=>set(leg.toKey,e.target.value)} placeholder="City" /></div>
                      <div><label className="flabel">Customer</label><select value={form[leg.custKey]||""} onChange={e=>set(leg.custKey,e.target.value)}><option value="">Select</option>{CUSTOMERS.map(c=><option key={c}>{c}</option>)}</select></div>
                    </div>
                  </div>
                  {leg.num<3 && <div className="leg-conn">↓ Continues to next leg</div>}
                </div>
              ))}
              <div><label className="flabel">Trip Start</label><input type="datetime-local" value={form.startDate} onChange={e=>set("startDate",e.target.value)} style={{ width:240 }} /></div>
            </div>
          )}

          {form.journeyType === "crossregion" && (
            <div>
              <div className="leg-block">
                <div style={{ fontSize:11, color:T.purple, fontWeight:600, marginBottom:10 }}>LEG 1 — Origin to Relay Point (Driver 1)</div>
                <div className="frow fr3">
                  <div><label className="flabel">Origin</label><input value={form.from} onChange={e=>set("from",e.target.value)} placeholder="Chennai" /></div>
                  <div><label className="flabel">Relay Depot</label><input value={form.relayPoint||""} onChange={e=>set("relayPoint",e.target.value)} placeholder="Nagpur" /></div>
                  <div><label className="flabel">Est. KM</label><input value={form.leg1Km||""} onChange={e=>set("leg1Km",e.target.value)} placeholder="900 km" /></div>
                </div>
              </div>
              <div className="leg-conn" style={{ color:T.purple }}>🔄 Driver handoff at relay point — fresh driver takes over</div>
              <div className="leg-block" style={{ borderColor:T.purple+"55" }}>
                <div style={{ fontSize:11, color:T.purple, fontWeight:600, marginBottom:10 }}>LEG 2 — Relay to Destination (Driver 2)</div>
                <div className="frow fr3">
                  <div><label className="flabel">From Relay</label><input value={form.relayPoint||""} readOnly placeholder="Auto-filled" style={{ opacity:.7 }} /></div>
                  <div><label className="flabel">Destination</label><input value={form.to} onChange={e=>set("to",e.target.value)} placeholder="Delhi" /></div>
                  <div><label className="flabel">Relay Driver</label><select value={form.relayDriver||""} onChange={e=>set("relayDriver",e.target.value)}><option value="">Assign later</option>{DRIVERS_DATA.filter(d=>d.status==="Available").map(d=><option key={d.id}>{d.name}</option>)}</select></div>
                </div>
              </div>
              <div className="frow fr2">
                <div><label className="flabel">Customer</label><select value={form.customer} onChange={e=>set("customer",e.target.value)}><option value="">Select</option>{CUSTOMERS.map(c=><option key={c}>{c}</option>)}</select></div>
                <div><label className="flabel">Start Date/Time</label><input type="datetime-local" value={form.startDate} onChange={e=>set("startDate",e.target.value)} /></div>
              </div>
            </div>
          )}

          {form.journeyType === "dedicated" && (
            <div>
              <div className="leg-block">
                <div style={{ fontSize:11, color:T.orange, fontWeight:600, marginBottom:10 }}>Fixed Route Configuration</div>
                <div className="frow fr2">
                  <div><label className="flabel">Fixed Origin</label><input value={form.from} onChange={e=>set("from",e.target.value)} placeholder="Chennai Port" /></div>
                  <div><label className="flabel">Fixed Destination</label><input value={form.to} onChange={e=>set("to",e.target.value)} placeholder="Coimbatore Warehouse" /></div>
                </div>
                <div className="frow fr3">
                  <div><label className="flabel">Dedicated Customer</label><select value={form.customer} onChange={e=>set("customer",e.target.value)}><option value="">Select</option>{CUSTOMERS.map(c=><option key={c}>{c}</option>)}</select></div>
                  <div><label className="flabel">Frequency</label><select value={form.frequency||""} onChange={e=>set("frequency",e.target.value)}><option value="">Select</option><option>Daily</option><option>Alternate Days</option><option>2× per week</option><option>Weekly</option></select></div>
                  <div><label className="flabel">Contract Period</label><select value={form.contractPeriod||""} onChange={e=>set("contractPeriod",e.target.value)}><option value="">Select</option><option>1 Month</option><option>3 Months</option><option>6 Months</option><option>Annual</option></select></div>
                </div>
                <div className="frow fr2">
                  <div><label className="flabel">Rate per Trip (₹)</label><input value={form.freightAmount} onChange={e=>set("freightAmount",e.target.value)} placeholder="8000" /></div>
                  <div><label className="flabel">Start Date</label><input type="date" value={(form.startDate||"").split("T")[0]} onChange={e=>set("startDate",e.target.value)} /></div>
                </div>
              </div>
              {form.freightAmount && form.frequency && (
                <div style={{ background:T.orangeGlow, border:`1px solid ${T.orange}33`, borderRadius:8, padding:12, fontSize:12 }}>
                  <div style={{ color:T.orange, fontWeight:600, marginBottom:4 }}>Revenue Projection</div>
                  <div style={{ color:T.textSub }}>{form.frequency} runs at ₹{parseInt(form.freightAmount||0).toLocaleString()} per trip →{" "}
                    <strong style={{ color:T.green }}>~₹{(parseInt(form.freightAmount||0)*(form.frequency==="Daily"?26:form.frequency==="Alternate Days"?13:form.frequency==="2× per week"?8:4)).toLocaleString()} / month</strong>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// TRIP GENERATOR MODAL — 6-step wizard (from v2, styled for v4)
// ═══════════════════════════════════════════════════════════════════════════════
// ─── Trip asset type definitions ─────────────────────────────────────────────


// ═══════════════════════════════════════════════════════════════════════════════
// FLEET CONTRACT ENGINE
// Unified contract model for Truck / Equipment / Bus
// Contract → Trip Sheet pre-fill → Billing → Settlement
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Contract type definitions per asset ─────────────────────────────────────
const CONTRACT_TYPE_DEFS = {
  truck: [
    { id:"DEDICATED_FLEET",    label:"Dedicated Fleet",      icon:"🚛", color:"#3B82F6", desc:"Specific vehicles + drivers exclusively assigned to one client. Monthly retainer + per-trip rate.", billingFields:["monthlyRetainer","ratePerKm","includedKm","extraKmRate"] },
    { id:"RATE_CONTRACT",      label:"Rate Contract",        icon:"📋", color:"#F59E0B", desc:"Agreed per-trip rates for specified routes. Pay per trip completed. Most common in India.", billingFields:["ratePerTrip","ratePerKm","loadType","routes"] },
    { id:"MONTHLY_RETAINER",   label:"Monthly Retainer",     icon:"📅", color:"#10B981", desc:"Fixed monthly payment regardless of trips. Client guarantees minimum business volume.", billingFields:["monthlyRate","includedTrips","extraTripRate"] },
    { id:"SPOT_RATE",          label:"Spot / Ad-hoc Rate",   icon:"⚡", color:"#8B5CF6", desc:"One-off rate agreed per trip. No long-term commitment. Higher rate for flexibility.", billingFields:["ratePerTrip"] },
  ],
  equipment: [
    { id:"HOURLY",   label:"Hourly Rate",      icon:"⏱️", color:"#3B82F6", desc:"Charge per running hour. Minimum hours per day applies. Best for short jobs.", billingFields:["hourlyRate","minHoursPerDay","idleChargeable"] },
    { id:"DAILY",    label:"Daily / Shift",    icon:"📅", color:"#F59E0B", desc:"Fixed daily rate + overtime beyond shift hours. Site-based work.", billingFields:["dailyRate","shiftHours","overtimeRate"] },
    { id:"MONTHLY",  label:"Monthly Contract", icon:"📆", color:"#10B981", desc:"Fixed monthly rent includes X running hours. Extra hours charged separately.", billingFields:["monthlyRate","includedHours","overtimeRate"] },
    { id:"HYBRID",   label:"Hybrid (Best)",    icon:"🔁", color:"#F97316", desc:"Min guarantee hours at hourly rate + overtime premium. Protects both parties.", billingFields:["hourlyRate","minGuarantee","includedHours","overtimeRate"] },
  ],
  bus: [
    { id:"MONTHLY_CONTRACT",  label:"Monthly Contract",  icon:"📅", color:"#10B981", desc:"Fixed monthly payment for staff/school transport. Fixed routes, fixed schedule.", billingFields:["monthlyRate","includedTrips","routeKm"] },
    { id:"PER_TRIP",          label:"Per Trip Rate",     icon:"🎫", color:"#3B82F6", desc:"Charge per completed trip. Suitable for one-time and regular contract carriage.", billingFields:["ratePerTrip","perSeatRate","minPax"] },
    { id:"ANNUAL_CONTRACT",   label:"Annual Contract",   icon:"📆", color:"#8B5CF6", desc:"Annual agreement with fixed payment. Schools, corporates. Best rate for client.", billingFields:["annualRate","monthlyBreakdown","includedTrips"] },
    { id:"SPOT_BOOKING",      label:"Spot Booking",      icon:"⚡", color:"#F59E0B", desc:"One-off trip rate. Tourist, event, emergency transport. Premium pricing.", billingFields:["ratePerTrip","perKmRate"] },
  ],
};

// ─── Fleet contract seed data — all 3 asset types ────────────────────────────
const FLEET_CONTRACTS_DATA_INIT = [
  // ── TRUCK CONTRACTS ──
  {
    id:"FC-001", assetType:"truck", contractTypeId:"DEDICATED_FLEET",
    client:"Ramco Cement Ltd", clientPhone:"044-28510000",
    vehicles:["TN69 GH4789","TN59 AB1234"], drivers:["Mani Kumar","Selvam R"],
    routes:[{ from:"Chennai", to:"Coimbatore", km:500 },{ from:"Chennai", to:"Madurai", km:460 }],
    startDate:"2025-01-01", endDate:"2025-12-31",
    monthlyRetainer:120000, ratePerKm:null, ratePerTrip:null,
    includedKm:8000, extraKmRate:22,
    includedTrips:null, extraTripRate:null,
    monthlyRate:null, annualRate:null,
    advanceCollected:240000, totalBilled:480000, totalTrips:42,
    status:"ACTIVE", billingCycle:"MONTHLY", paymentTerms:"30 days net",
    notes:"2 dedicated trucks for cement distribution Tamil Nadu circuit",
  },
  {
    id:"FC-002", assetType:"truck", contractTypeId:"RATE_CONTRACT",
    client:"Blue Dart Express", clientPhone:"1800-111-345",
    vehicles:[], drivers:[],
    routes:[{ from:"Chennai", to:"Bangalore", km:350 },{ from:"Chennai", to:"Hyderabad", km:630 }],
    startDate:"2025-02-01", endDate:"2025-07-31",
    monthlyRetainer:null, ratePerKm:45, ratePerTrip:null,
    includedKm:null, extraKmRate:null,
    includedTrips:null, extraTripRate:null,
    monthlyRate:null, annualRate:null,
    advanceCollected:50000, totalBilled:218000, totalTrips:18,
    status:"ACTIVE", billingCycle:"WEEKLY", paymentTerms:"15 days",
    notes:"Express courier loads Chennai hub. Any available vehicle.",
  },
  {
    id:"FC-003", assetType:"truck", contractTypeId:"MONTHLY_RETAINER",
    client:"Ashok Leyland Spare Parts", clientPhone:"044-25361000",
    vehicles:["TN45 CD5678"], drivers:["Ramesh P"],
    routes:[{ from:"Chennai", to:"Pan Tamil Nadu", km:null }],
    startDate:"2025-03-01", endDate:"2025-08-31",
    monthlyRetainer:null, ratePerKm:null, ratePerTrip:null,
    includedKm:null, extraKmRate:null,
    includedTrips:12, extraTripRate:3500,
    monthlyRate:38000, annualRate:null,
    advanceCollected:76000, totalBilled:152000, totalTrips:28,
    status:"ACTIVE", billingCycle:"MONTHLY", paymentTerms:"30 days",
    notes:"Parts distribution across TN. 12 trips included, extra at ₹3,500/trip",
  },
  // ── EQUIPMENT CONTRACTS ──
  {
    id:"FC-004", assetType:"equipment", contractTypeId:"HYBRID",
    client:"NHAI Road Works", clientPhone:"011-23400100",
    vehicles:["EQ-001"], drivers:["Kannan S"],
    routes:[{ from:"Madurai", to:"Madurai Bypass NH7", km:14 }],
    startDate:"2025-03-01", endDate:"2025-05-31",
    monthlyRetainer:null, ratePerKm:null, ratePerTrip:null,
    hourlyRate:900, dailyRate:null, monthlyRate:null,
    minGuaranteeHours:180, includedHours:180, overtimeRate:1200,
    shiftHours:8, idleChargeable:false, fuelIncluded:false,
    advanceCollected:100000, totalBilled:287000, totalTrips:null,
    totalHoursRun:310, status:"ACTIVE", billingCycle:"MONTHLY",
    paymentTerms:"30 days net",
    notes:"JCB 3DX for highway trench excavation. Min 180 hrs/month guarantee.",
  },
  {
    id:"FC-005", assetType:"equipment", contractTypeId:"MONTHLY",
    client:"L&T Construction", clientPhone:"044-71770770",
    vehicles:["EQ-003"], drivers:["Murugan V"],
    routes:[{ from:"Chennai", to:"Chennai Port Road", km:8 }],
    startDate:"2025-02-15", endDate:"2025-06-15",
    monthlyRetainer:null, ratePerKm:null, ratePerTrip:null,
    hourlyRate:700, dailyRate:null, monthlyRate:140000,
    minGuaranteeHours:null, includedHours:200, overtimeRate:900,
    shiftHours:8, idleChargeable:false, fuelIncluded:false,
    advanceCollected:80000, totalBilled:196000, totalTrips:null,
    totalHoursRun:218, status:"ACTIVE", billingCycle:"MONTHLY",
    paymentTerms:"30 days",
    notes:"JCB Roller for road compaction. ₹1.4L/month includes 200 hrs.",
  },
  // ── BUS CONTRACTS ──
  {
    id:"FC-006", assetType:"bus", contractTypeId:"MONTHLY_CONTRACT",
    client:"Cognizant Technology Solutions", clientPhone:"044-42096000",
    vehicles:["TN22 IJ7890"], drivers:["Arjun D"],
    routes:[{ from:"Sholinganallur", to:"Siruseri IT Park", km:18 }],
    startDate:"2025-01-01", endDate:"2025-12-31",
    monthlyRetainer:null, ratePerKm:null, ratePerTrip:null,
    monthlyRate:52000, includedTrips:46, extraTripRate:1200,
    annualRate:null, routeKm:18, minPax:null, perSeatRate:null,
    advanceCollected:104000, totalBilled:208000, totalTrips:89,
    passengerCount:32, status:"ACTIVE", billingCycle:"MONTHLY",
    paymentTerms:"30 days",
    notes:"Corporate shuttle. AM/PM shift. 46 trips/month included (Mon-Sat).",
  },
];

// ─── Contract revenue projector ───────────────────────────────────────────────
function monthlyRevProj(contract) {
  if (contract.assetType==="truck") {
    if (contract.contractTypeId==="DEDICATED_FLEET") return contract.monthlyRetainer||0;
    if (contract.contractTypeId==="MONTHLY_RETAINER") return contract.monthlyRate||0;
    if (contract.contractTypeId==="RATE_CONTRACT") return (contract.ratePerKm||0)*(contract.includedKm||5000);
    return 0;
  }
  if (contract.assetType==="equipment") {
    if (contract.contractTypeId==="MONTHLY") return contract.monthlyRate||0;
    if (contract.contractTypeId==="HYBRID"||contract.contractTypeId==="HOURLY") return (contract.hourlyRate||0)*(contract.minGuaranteeHours||contract.includedHours||180);
    if (contract.contractTypeId==="DAILY") return (contract.dailyRate||0)*26;
    return 0;
  }
  if (contract.assetType==="bus") {
    if (contract.contractTypeId==="MONTHLY_CONTRACT") return contract.monthlyRate||0;
    if (contract.contractTypeId==="PER_TRIP") return (contract.ratePerTrip||0)*(contract.includedTrips||20);
    if (contract.contractTypeId==="ANNUAL_CONTRACT") return Math.round((contract.annualRate||0)/12);
    return 0;
  }
  return 0;
}

// ═══════════════════════════════════════════════════════════════════════════════
// FLEET CONTRACT WIZARD — 6-step, asset-type adaptive
// ═══════════════════════════════════════════════════════════════════════════════
const FleetContractWizard = ({ initialAssetType="truck", onClose, onSave }) => {
  const [step, setStep] = useState(0); // 0 = asset type picker
  const [assetType, setAssetType] = useState(initialAssetType);
  const [contractTypeId, setContractTypeId] = useState("");
  const [form, setForm] = useState({
    client:"", clientPhone:"", clientGST:"",
    startDate:"", endDate:"", billingCycle:"MONTHLY", paymentTerms:"30 days net",
    // truck fields
    monthlyRetainer:"", ratePerKm:"", ratePerTrip:"",
    includedKm:"", extraKmRate:"", includedTrips:"", extraTripRate:"",
    monthlyRate:"", annualRate:"",
    // equipment fields
    hourlyRate:"", dailyRate:"", eqMonthlyRate:"",
    minGuarantee:"", includedHours:"", overtimeRate:"", shiftHours:"8",
    idleChargeable:false, fuelIncluded:false,
    // bus fields
    busMonthlyRate:"", busIncludedTrips:"", busExtraTripRate:"",
    busRatePerTrip:"", perSeatRate:"", routeKm:"",
    // assignment
    selectedVehicles:[], selectedDrivers:[], selectedEquipment:[],
    routes:[{ from:"", to:"", km:"" }],
    advanceAmount:"",
    notes:"",
  });
  const rf = (k,v) => setForm(f=>({...f,[k]:v}));
  const contractTypes = CONTRACT_TYPE_DEFS[assetType]||[];
  const ctDef = contractTypes.find(c=>c.id===contractTypeId);

  const assetColor = { truck:T.blue, equipment:T.orange, bus:T.green };
  const STEPS_LABELS = ["Client & Terms","Billing Model","Pricing","Assets & Crew","Routes & SLA","Review & Activate"];

  const StepDot = ({ n, label }) => {
    const ac = assetColor[assetType];
    return (
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
        <div style={{ display:"flex", alignItems:"center", width:"100%" }}>
          {n>1 && <div style={{ flex:1, height:2, background:step>n-1?ac:T.border }} />}
          <div style={{ width:26, height:26, borderRadius:"50%", background:step===n?ac:step>n?"#065F46":T.bgPanel, border:`2px solid ${step===n?ac:step>n?T.green:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:"#fff", margin:"0 auto" }}>{step>n?"✓":n}</div>
          {n<6 && <div style={{ flex:1, height:2, background:step>n?T.green:T.border }} />}
        </div>
        <div style={{ fontSize:8, color:step===n?ac:T.textMuted, textAlign:"center", whiteSpace:"nowrap" }}>{label}</div>
      </div>
    );
  };

  const addRoute = () => rf("routes",[...form.routes,{ from:"", to:"", km:"" }]);
  const updateRoute = (i,k,v) => rf("routes", form.routes.map((r,ri)=>ri===i?{...r,[k]:v}:r));
  const removeRoute = (i) => rf("routes", form.routes.filter((_,ri)=>ri!==i));

  const projRevenue = monthlyRevProj({
    ...form, assetType, contractTypeId,
    monthlyRetainer:parseInt(form.monthlyRetainer)||0,
    monthlyRate:parseInt(form.monthlyRate||form.eqMonthlyRate||form.busMonthlyRate)||0,
    hourlyRate:parseInt(form.hourlyRate)||0,
    dailyRate:parseInt(form.dailyRate)||0,
    ratePerKm:parseInt(form.ratePerKm)||0,
    includedKm:parseInt(form.includedKm)||5000,
    ratePerTrip:parseInt(form.ratePerTrip||form.busRatePerTrip)||0,
    includedTrips:parseInt(form.includedTrips||form.busIncludedTrips)||20,
    minGuaranteeHours:parseInt(form.minGuarantee)||0,
    includedHours:parseInt(form.includedHours)||0,
    annualRate:parseInt(form.annualRate)||0,
  });

  // ── Step 0: Asset type + contract type picker ──────────────────────────────
  if (step===0) return (
    <div className="ov" style={{ alignItems:"flex-start", paddingTop:20, overflowY:"auto" }}>
      <div className="modal" style={{ maxWidth:660, width:"100%", margin:"0 auto" }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#080B10,#111520,#F59E0B22)", borderBottom:`1px solid ${T.accent}33` }}>
          <div>
            <div className="rj" style={{ fontSize:22, fontWeight:700, color:T.accent }}>📋 New Fleet Contract</div>
            <div style={{ fontSize:12, color:T.textSub, marginTop:2 }}>Select asset type and contract model to begin</div>
          </div>
          <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
        </div>
        <div className="mbdy">
          {/* Asset type selector */}
          <div style={{ marginBottom:20 }}>
            <label className="flabel">Asset Type</label>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginTop:8 }}>
              {[["truck","🚛","Truck / Lorry","Freight transport"],["equipment","🏗️","Heavy Equipment","Site deployment"],["bus","🚌","Bus / Passenger","Passenger transport"]].map(([id,ic,lb,dc])=>(
                <div key={id} onClick={()=>{ setAssetType(id); setContractTypeId(""); }} style={{ padding:"14px 12px", borderRadius:10, cursor:"pointer", border:`2px solid ${assetType===id?assetColor[id]:T.border}`, background:assetType===id?assetColor[id]+"14":T.bgPanel, textAlign:"center" }}>
                  <div style={{ fontSize:28, marginBottom:6 }}>{ic}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:assetType===id?assetColor[id]:T.text }}>{lb}</div>
                  <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>{dc}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Contract type selector */}
          <div style={{ marginBottom:16 }}>
            <label className="flabel">Contract Model *</label>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginTop:8 }}>
              {contractTypes.map(ct=>(
                <div key={ct.id} onClick={()=>setContractTypeId(ct.id)} style={{ padding:"12px 14px", borderRadius:10, cursor:"pointer", border:`2px solid ${contractTypeId===ct.id?ct.color:T.border}`, background:contractTypeId===ct.id?ct.color+"14":T.bgPanel, display:"flex", gap:12, alignItems:"center" }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:contractTypeId===ct.id?ct.color+"22":T.bgCard, border:`2px solid ${contractTypeId===ct.id?ct.color:T.border}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{ct.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:contractTypeId===ct.id?ct.color:T.text }}>{ct.label}</div>
                    <div style={{ fontSize:11, color:T.textSub, marginTop:2 }}>{ct.desc}</div>
                  </div>
                  {contractTypeId===ct.id && <span style={{ fontSize:20 }}>✅</span>}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"flex-end", gap:8, paddingTop:14, borderTop:`1px solid ${T.border}` }}>
            <button className="btn btn-gh" onClick={onClose}>Cancel</button>
            <button className="btn btn-p" disabled={!contractTypeId} onClick={()=>setStep(1)} style={{ opacity:contractTypeId?1:0.5 }}>
              Continue → {ctDef?.icon} {ctDef?.label}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ac = assetColor[assetType];
  const bgHeader = assetType==="truck"?"linear-gradient(135deg,#1746A2,#0F2D7A)":assetType==="equipment"?"linear-gradient(135deg,#1C1000,#3D2200,#F9731644)":"linear-gradient(135deg,#064E3B,#065F46,#10B98133)";

  // ── Steps 1-6 ──────────────────────────────────────────────────────────────
  return (
    <div className="ov" style={{ alignItems:"flex-start", paddingTop:20, overflowY:"auto" }}>
      <div className="modal" style={{ maxWidth:680, width:"100%", margin:"0 auto" }}>
        <div className="mhdr" style={{ background:bgHeader, borderBottom:`1px solid ${ac}33` }}>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <span style={{ fontSize:24 }}>{ctDef?.icon}</span>
            <div>
              <div className="rj" style={{ fontSize:20, fontWeight:700, color:"#fff" }}>{ctDef?.label} Contract</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,.6)", marginTop:2 }}>
                {assetType==="truck"?"Truck / Lorry":assetType==="equipment"?"Heavy Equipment":"Bus / Passenger"} · Step {step} of 6
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <button className="btn" style={{ background:"rgba(255,255,255,.12)", color:"rgba(255,255,255,.7)", fontSize:11 }} onClick={()=>setStep(0)}>← Change Type</button>
            <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:"rgba(255,255,255,.6)", padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c="rgba(255,255,255,.6)" /></button>
          </div>
        </div>
        <div className="mbdy">
          <div style={{ display:"flex", marginBottom:22 }}>{STEPS_LABELS.map((s,i)=><StepDot key={s} n={i+1} label={s} />)}</div>

          {/* ── STEP 1: Client & Terms ── */}
          {step===1 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:ac, marginBottom:16 }}>Step 1 — Client Details & Contract Terms</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
                <div><label className="flabel">Client / Company Name *</label><input value={form.client} onChange={e=>rf("client",e.target.value)} placeholder="Company name or individual" /></div>
                <div><label className="flabel">Client Phone / Contact</label><input value={form.clientPhone} onChange={e=>rf("clientPhone",e.target.value)} placeholder="+91 98765 43210" /></div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:12 }}>
                <div><label className="flabel">GST Number (optional)</label><input value={form.clientGST} onChange={e=>rf("clientGST",e.target.value.toUpperCase())} placeholder="33XXXXX1234Z5" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11 }} /></div>
                <div><label className="flabel">Contract Start Date *</label><input type="date" value={form.startDate} onChange={e=>rf("startDate",e.target.value)} /></div>
                <div><label className="flabel">Contract End Date *</label><input type="date" value={form.endDate} onChange={e=>rf("endDate",e.target.value)} /></div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
                <div><label className="flabel">Billing Cycle</label><select value={form.billingCycle} onChange={e=>rf("billingCycle",e.target.value)}><option value="MONTHLY">Monthly</option><option value="WEEKLY">Weekly</option><option value="DAILY">Daily (per completed trip)</option></select></div>
                <div><label className="flabel">Payment Terms</label><select value={form.paymentTerms} onChange={e=>rf("paymentTerms",e.target.value)}><option>30 days net</option><option>15 days net</option><option>7 days</option><option>Advance payment</option><option>On delivery</option></select></div>
              </div>
              <div><label className="flabel">Contract Notes / Special Terms</label><textarea value={form.notes} onChange={e=>rf("notes",e.target.value)} placeholder="Any special conditions, exclusions, SLA terms..." style={{ height:65 }} /></div>
            </div>
          )}

          {/* ── STEP 2: Billing Model Info ── */}
          {step===2 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:ac, marginBottom:16 }}>Step 2 — Billing Model Confirmation</div>
              {/* Model detail card */}
              <div style={{ background:ac+"14", border:`2px solid ${ac}44`, borderRadius:12, padding:18, marginBottom:16 }}>
                <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:12 }}>
                  <span style={{ fontSize:36 }}>{ctDef?.icon}</span>
                  <div>
                    <div style={{ fontSize:16, fontWeight:700, color:ac }}>{ctDef?.label}</div>
                    <div style={{ fontSize:12, color:T.textSub, marginTop:4, lineHeight:1.5 }}>{ctDef?.desc}</div>
                  </div>
                </div>
                {/* What this model means in practice */}
                <div style={{ background:T.bgPanel, borderRadius:8, padding:12 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.textSub, marginBottom:8 }}>📌 How billing works with this model:</div>
                  {assetType==="truck" && contractTypeId==="DEDICATED_FLEET" && <div style={{ fontSize:11, color:T.textSub }}>Monthly retainer paid regardless of trips. Per-km rate applies above included km threshold. Invoice = Retainer + (extra km × per-km rate). Best for clients needing guaranteed truck availability.</div>}
                  {assetType==="truck" && contractTypeId==="RATE_CONTRACT" && <div style={{ fontSize:11, color:T.textSub }}>Each completed trip → invoice raised at agreed rate. No fixed monthly charge. Billing cycle determines when invoices are raised — weekly or monthly. Best for predictable volume clients.</div>}
                  {assetType==="truck" && contractTypeId==="MONTHLY_RETAINER" && <div style={{ fontSize:11, color:T.textSub }}>Fixed monthly payment includes X trips. Additional trips at per-trip rate. Guaranteed monthly income. Best for regular, moderate-volume clients.</div>}
                  {assetType==="truck" && contractTypeId==="SPOT_RATE" && <div style={{ fontSize:11, color:T.textSub }}>One-off negotiated rate per trip. No long-term commitment. Higher rate reflects flexibility premium. No retainer. Invoice per trip.</div>}
                  {assetType==="equipment" && contractTypeId==="HYBRID" && <div style={{ fontSize:11, color:T.textSub }}>Minimum guarantee hours billed even if machine runs fewer hours. Once actual hours exceed included hours → overtime rate kicks in. Best protection for both parties in India.</div>}
                  {assetType==="equipment" && contractTypeId==="MONTHLY" && <div style={{ fontSize:11, color:T.textSub }}>Fixed monthly rent includes X running hours. If machine exceeds included hours → per-hour overtime rate applies. Stable and predictable for both parties.</div>}
                  {assetType==="equipment" && contractTypeId==="HOURLY" && <div style={{ fontSize:11, color:T.textSub }}>Charge per running hour from engine start to stop. Minimum daily hours enforced — client billed for minimum even if machine runs fewer hours. Simple and transparent.</div>}
                  {assetType==="equipment" && contractTypeId==="DAILY" && <div style={{ fontSize:11, color:T.textSub }}>Fixed rate per working day (shift hours). Overtime charged per hour beyond shift. Days without machine operation not billed. Good for project-based site work.</div>}
                  {assetType==="bus" && <div style={{ fontSize:11, color:T.textSub }}>{ctDef?.desc}</div>}
                </div>
              </div>
              {/* Key difference from standard trip */}
              <div style={{ background:T.blueGlow, border:`1px solid ${T.blue}33`, borderRadius:8, padding:12, fontSize:11, color:T.textSub }}>
                <strong style={{ color:T.blue }}>⚡ Trip sheet integration: </strong>
                When you create a trip from this contract, all rates, vehicle, driver, and route are pre-filled automatically. The trip logs against this contract and updates the billing ledger.
              </div>
            </div>
          )}

          {/* ── STEP 3: Pricing ── */}
          {step===3 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:ac, marginBottom:16 }}>Step 3 — Pricing & Rates</div>

              {/* TRUCK pricing */}
              {assetType==="truck" && contractTypeId==="DEDICATED_FLEET" && (
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                    <div><label className="flabel">Monthly Retainer (₹)</label><input value={form.monthlyRetainer} onChange={e=>rf("monthlyRetainer",e.target.value)} placeholder="120000" /></div>
                    <div><label className="flabel">Included KM / month</label><input value={form.includedKm} onChange={e=>rf("includedKm",e.target.value)} placeholder="8000" /></div>
                  </div>
                  <div><label className="flabel">Extra KM Rate (₹/km beyond included)</label><input value={form.extraKmRate} onChange={e=>rf("extraKmRate",e.target.value)} placeholder="22" /></div>
                </div>
              )}
              {assetType==="truck" && contractTypeId==="RATE_CONTRACT" && (
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    <div><label className="flabel">Rate per KM (₹)</label><input value={form.ratePerKm} onChange={e=>rf("ratePerKm",e.target.value)} placeholder="45" /></div>
                    <div><label className="flabel">Advance Amount (₹)</label><input value={form.advanceAmount} onChange={e=>rf("advanceAmount",e.target.value)} placeholder="50000" /></div>
                  </div>
                </div>
              )}
              {assetType==="truck" && contractTypeId==="MONTHLY_RETAINER" && (
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                    <div><label className="flabel">Monthly Rate (₹)</label><input value={form.monthlyRate} onChange={e=>rf("monthlyRate",e.target.value)} placeholder="38000" /></div>
                    <div><label className="flabel">Included Trips / month</label><input value={form.includedTrips} onChange={e=>rf("includedTrips",e.target.value)} placeholder="12" /></div>
                    <div><label className="flabel">Extra Trip Rate (₹)</label><input value={form.extraTripRate} onChange={e=>rf("extraTripRate",e.target.value)} placeholder="3500" /></div>
                  </div>
                </div>
              )}
              {assetType==="truck" && contractTypeId==="SPOT_RATE" && (
                <div><label className="flabel">Agreed Rate per Trip (₹)</label><input value={form.ratePerTrip} onChange={e=>rf("ratePerTrip",e.target.value)} placeholder="18000" /></div>
              )}

              {/* EQUIPMENT pricing */}
              {assetType==="equipment" && (contractTypeId==="HOURLY"||contractTypeId==="HYBRID") && (
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                    <div><label className="flabel">Rate per Hour (₹) *</label><input value={form.hourlyRate} onChange={e=>rf("hourlyRate",e.target.value)} placeholder="900" /></div>
                    <div><label className="flabel">{contractTypeId==="HYBRID"?"Min Guarantee Hours/Month":"Min Hours / Day"}</label><input value={form.minGuarantee} onChange={e=>rf("minGuarantee",e.target.value)} placeholder={contractTypeId==="HYBRID"?"180":"8"} /></div>
                  </div>
                  {contractTypeId==="HYBRID" && (
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                      <div><label className="flabel">Included Hours (before overtime)</label><input value={form.includedHours} onChange={e=>rf("includedHours",e.target.value)} placeholder="180" /></div>
                      <div><label className="flabel">Overtime Rate (₹/hr)</label><input value={form.overtimeRate} onChange={e=>rf("overtimeRate",e.target.value)} placeholder="1200" /></div>
                    </div>
                  )}
                </div>
              )}
              {assetType==="equipment" && contractTypeId==="DAILY" && (
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                    <div><label className="flabel">Daily Rate (₹)</label><input value={form.dailyRate} onChange={e=>rf("dailyRate",e.target.value)} placeholder="7200" /></div>
                    <div><label className="flabel">Shift Hours / Day</label><input value={form.shiftHours} onChange={e=>rf("shiftHours",e.target.value)} placeholder="8" /></div>
                    <div><label className="flabel">Overtime Rate (₹/hr)</label><input value={form.overtimeRate} onChange={e=>rf("overtimeRate",e.target.value)} placeholder="1500" /></div>
                  </div>
                </div>
              )}
              {assetType==="equipment" && contractTypeId==="MONTHLY" && (
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                    <div><label className="flabel">Monthly Rate (₹)</label><input value={form.eqMonthlyRate} onChange={e=>rf("eqMonthlyRate",e.target.value)} placeholder="140000" /></div>
                    <div><label className="flabel">Included Hours / Month</label><input value={form.includedHours} onChange={e=>rf("includedHours",e.target.value)} placeholder="200" /></div>
                    <div><label className="flabel">Overtime Rate (₹/hr)</label><input value={form.overtimeRate} onChange={e=>rf("overtimeRate",e.target.value)} placeholder="900" /></div>
                  </div>
                </div>
              )}
              {assetType==="equipment" && (
                <div style={{ display:"flex", gap:12, marginTop:12 }}>
                  <label style={{ display:"flex", gap:6, alignItems:"center", cursor:"pointer", fontSize:12 }}><input type="checkbox" checked={form.idleChargeable} onChange={e=>rf("idleChargeable",e.target.checked)} /><span>Idle time chargeable</span></label>
                  <label style={{ display:"flex", gap:6, alignItems:"center", cursor:"pointer", fontSize:12 }}><input type="checkbox" checked={form.fuelIncluded} onChange={e=>rf("fuelIncluded",e.target.checked)} /><span>Fuel included in rate</span></label>
                </div>
              )}

              {/* BUS pricing */}
              {assetType==="bus" && contractTypeId==="MONTHLY_CONTRACT" && (
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                    <div><label className="flabel">Monthly Rate (₹)</label><input value={form.busMonthlyRate} onChange={e=>rf("busMonthlyRate",e.target.value)} placeholder="52000" /></div>
                    <div><label className="flabel">Included Trips / Month</label><input value={form.busIncludedTrips} onChange={e=>rf("busIncludedTrips",e.target.value)} placeholder="46" /></div>
                    <div><label className="flabel">Extra Trip Rate (₹)</label><input value={form.busExtraTripRate} onChange={e=>rf("busExtraTripRate",e.target.value)} placeholder="1200" /></div>
                  </div>
                </div>
              )}
              {assetType==="bus" && contractTypeId==="PER_TRIP" && (
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                    <div><label className="flabel">Rate per Trip (₹)</label><input value={form.busRatePerTrip} onChange={e=>rf("busRatePerTrip",e.target.value)} placeholder="2800" /></div>
                    <div><label className="flabel">Per Seat Rate (₹, optional)</label><input value={form.perSeatRate} onChange={e=>rf("perSeatRate",e.target.value)} placeholder="375" /></div>
                    <div><label className="flabel">Min Passengers</label><input value={form.minPax} onChange={e=>rf("minPax",e.target.value)} placeholder="20" /></div>
                  </div>
                </div>
              )}
              {assetType==="bus" && contractTypeId==="ANNUAL_CONTRACT" && (
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    <div><label className="flabel">Annual Contract Value (₹)</label><input value={form.annualRate} onChange={e=>rf("annualRate",e.target.value)} placeholder="600000" /></div>
                    <div><label className="flabel">Monthly Breakdown (₹)</label><div style={{ padding:"7px 10px", background:T.bgPanel, borderRadius:7, fontSize:12, fontWeight:700, color:T.green }}>{form.annualRate?`₹${Math.round(parseInt(form.annualRate)/12).toLocaleString()}/mo`:"—"}</div></div>
                  </div>
                </div>
              )}
              {assetType==="bus" && contractTypeId==="SPOT_BOOKING" && (
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    <div><label className="flabel">Rate per Trip (₹)</label><input value={form.busRatePerTrip} onChange={e=>rf("busRatePerTrip",e.target.value)} placeholder="12000" /></div>
                    <div><label className="flabel">Per KM Rate (₹) if applicable</label><input value={form.perKmRate} onChange={e=>rf("perKmRate",e.target.value)} placeholder="65" /></div>
                  </div>
                </div>
              )}

              {/* Revenue projection */}
              {projRevenue > 0 && (
                <div style={{ background:T.greenGlow, border:`1px solid ${T.green}33`, borderRadius:10, padding:12, marginTop:14 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.green, marginBottom:6 }}>🤖 Monthly Revenue Projection</div>
                  <div style={{ display:"flex", gap:16, fontSize:12 }}>
                    <div><span style={{ color:T.textMuted }}>Monthly: </span><strong style={{ color:T.green }}>{fmt(projRevenue)}</strong></div>
                    <div><span style={{ color:T.textMuted }}>Quarterly: </span><strong style={{ color:T.accent }}>{fmt(projRevenue*3)}</strong></div>
                    <div><span style={{ color:T.textMuted }}>Annual: </span><strong style={{ color:T.blue }}>{fmt(projRevenue*12)}</strong></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 4: Asset & Crew Assignment ── */}
          {step===4 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:ac, marginBottom:16 }}>Step 4 — Assign Assets & Crew</div>
              {assetType==="truck" && (
                <>
                  <div style={{ marginBottom:14 }}>
                    <label className="flabel">Assign Vehicles to this Contract</label>
                    <div style={{ display:"flex", flexDirection:"column", gap:6, marginTop:6 }}>
                      {FLEET_DATA.map(v=>{
                        const sel = form.selectedVehicles.includes(v.num);
                        return (
                          <div key={v.id} onClick={()=>rf("selectedVehicles", sel ? form.selectedVehicles.filter(x=>x!==v.num) : [...form.selectedVehicles, v.num])} style={{ padding:"9px 12px", borderRadius:8, cursor:"pointer", border:`2px solid ${sel?T.blue:T.border}`, background:sel?T.blueGlow:T.bgPanel, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                              <span style={{ fontSize:14 }}>🚛</span>
                              <div>
                                <div style={{ fontSize:12, fontWeight:600 }}>{v.num} — {v.model}</div>
                                <div style={{ fontSize:10, color:T.textMuted }}>Status: {v.status} · Health: {v.health}%</div>
                              </div>
                            </div>
                            {sel && <span style={{ fontSize:14 }}>✅</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div style={{ marginBottom:14 }}>
                    <label className="flabel">Assign Drivers</label>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginTop:6 }}>
                      {DRIVERS_DATA.map(d=>{
                        const sel = form.selectedDrivers.includes(d.name);
                        return (
                          <div key={d.id} onClick={()=>rf("selectedDrivers", sel ? form.selectedDrivers.filter(x=>x!==d.name) : [...form.selectedDrivers, d.name])} style={{ padding:"8px 10px", borderRadius:8, cursor:"pointer", border:`2px solid ${sel?T.blue:T.border}`, background:sel?T.blueGlow:T.bgPanel, display:"flex", gap:8, alignItems:"center" }}>
                            <div style={{ width:28, height:28, borderRadius:"50%", background:T.bgPanel, border:`1px solid ${T.blue}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:T.blue }}>{d.name[0]}</div>
                            <div>
                              <div style={{ fontSize:11, fontWeight:600 }}>{d.name}</div>
                              <div style={{ fontSize:10, color:T.textMuted }}>Score {d.score} · CDL {d.cdl}</div>
                            </div>
                            {sel && <span style={{ marginLeft:"auto", fontSize:14 }}>✅</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
              {assetType==="equipment" && (
                <div style={{ marginBottom:14 }}>
                  <label className="flabel">Assign Equipment</label>
                  <div style={{ display:"flex", flexDirection:"column", gap:6, marginTop:6 }}>
                    {EQUIPMENT_DATA.map(eq=>{
                      const spec = EQUIPMENT_TYPES[eq.type];
                      const sel = form.selectedEquipment.includes(eq.id);
                      return (
                        <div key={eq.id} onClick={()=>rf("selectedEquipment", sel ? form.selectedEquipment.filter(x=>x!==eq.id) : [...form.selectedEquipment, eq.id])} style={{ padding:"9px 12px", borderRadius:8, cursor:"pointer", border:`2px solid ${sel?T.orange:T.border}`, background:sel?T.orangeGlow:T.bgPanel, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                            <span style={{ fontSize:18 }}>{spec?.icon}</span>
                            <div>
                              <div style={{ fontSize:12, fontWeight:600 }}>{eq.model} · {eq.regNo}</div>
                              <div style={{ fontSize:10, color:T.textMuted }}>{eq.engineHours.toLocaleString()} hrs run · Status: {eq.status}</div>
                            </div>
                          </div>
                          {sel && <span style={{ fontSize:14 }}>✅</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {assetType==="bus" && (
                <div style={{ marginBottom:14 }}>
                  <label className="flabel">Assign Bus & Driver</label>
                  <div style={{ display:"flex", flexDirection:"column", gap:6, marginTop:6 }}>
                    {FLEET_DATA.map(v=>{
                      const sel = form.selectedVehicles.includes(v.num);
                      return (
                        <div key={v.id} onClick={()=>rf("selectedVehicles", sel?form.selectedVehicles.filter(x=>x!==v.num):[...form.selectedVehicles,v.num])} style={{ padding:"9px 12px", borderRadius:8, cursor:"pointer", border:`2px solid ${sel?T.green:T.border}`, background:sel?T.greenGlow:T.bgPanel, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                          <div><div style={{ fontSize:12, fontWeight:600 }}>🚌 {v.num} — {v.model}</div><div style={{ fontSize:10, color:T.textMuted }}>Status: {v.status}</div></div>
                          {sel && <span style={{ fontSize:14 }}>✅</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <div><label className="flabel">Advance Amount (₹)</label><input value={form.advanceAmount} onChange={e=>rf("advanceAmount",e.target.value)} placeholder="50000" /></div>
            </div>
          )}

          {/* ── STEP 5: Routes & SLA ── */}
          {step===5 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:ac, marginBottom:16 }}>Step 5 — Routes, Scope & SLA</div>
              {assetType!=="equipment" && (
                <div style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <label className="flabel" style={{ margin:0 }}>Route(s) covered by this contract</label>
                    <button className="btn btn-gh" style={{ fontSize:10 }} onClick={addRoute}>+ Add Route</button>
                  </div>
                  {form.routes.map((r,i)=>(
                    <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 80px 30px", gap:8, marginBottom:8, alignItems:"center" }}>
                      <input value={r.from} onChange={e=>updateRoute(i,"from",e.target.value)} placeholder="From city" style={{ fontSize:12 }} />
                      <input value={r.to} onChange={e=>updateRoute(i,"to",e.target.value)} placeholder="To city" style={{ fontSize:12 }} />
                      <input value={r.km} onChange={e=>updateRoute(i,"km",e.target.value)} placeholder="KM" type="number" style={{ fontSize:12 }} />
                      <button onClick={()=>removeRoute(i)} style={{ background:"none", border:"none", color:T.red, cursor:"pointer", fontSize:14 }}>✕</button>
                    </div>
                  ))}
                </div>
              )}
              {assetType==="equipment" && (
                <div style={{ marginBottom:14 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    <div><label className="flabel">Deployment Site</label><input placeholder="Site name, location" onChange={e=>rf("site",e.target.value)} /></div>
                    <div><label className="flabel">Work Scope</label><input placeholder="Excavation / Compaction / Lifting..." onChange={e=>rf("workScope",e.target.value)} /></div>
                  </div>
                </div>
              )}
              {/* SLA / Special conditions */}
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14 }}>
                <div style={{ fontSize:12, fontWeight:600, color:T.textSub, marginBottom:10 }}>📋 SLA & Conditions</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  <div><label className="flabel">Vehicle availability guarantee</label><select onChange={e=>rf("availabilityGuarantee",e.target.value)}><option>24/7 availability</option><option>Business hours only</option><option>On-call basis</option></select></div>
                  <div><label className="flabel">Breakdown response time</label><select onChange={e=>rf("breakdownSLA",e.target.value)}><option>4 hours</option><option>8 hours</option><option>Next working day</option></select></div>
                  <div><label className="flabel">Loading / unloading by</label><select onChange={e=>rf("loadingBy",e.target.value)}><option>Client</option><option>Transporter</option><option>Shared</option></select></div>
                  <div><label className="flabel">Fuel responsibility</label><select onChange={e=>rf("fuelBy",e.target.value)}><option>Transporter (included)</option><option>Client provides fuel</option><option>Client reimburses separately</option></select></div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 6: Review & Activate ── */}
          {step===6 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:16 }}>Step 6 — Review & Activate Contract</div>
              {/* Summary cards */}
              <div style={{ background:T.bgPanel, border:`1px solid ${ac}33`, borderRadius:10, padding:14, marginBottom:12 }}>
                <div style={{ fontSize:11, fontWeight:700, color:ac, marginBottom:10 }}>📋 Contract Summary</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                  {[
                    { l:"Asset Type", v:assetType==="truck"?"Truck/Lorry":assetType==="equipment"?"Heavy Equipment":"Bus/Passenger" },
                    { l:"Contract Model", v:ctDef?.label||"—" },
                    { l:"Client", v:form.client||"—" },
                    { l:"Duration", v:form.startDate&&form.endDate?`${form.startDate} → ${form.endDate}`:"—" },
                    { l:"Billing Cycle", v:form.billingCycle },
                    { l:"Payment Terms", v:form.paymentTerms },
                    { l:"Monthly Revenue", v:projRevenue?fmt(projRevenue):"—" },
                    { l:"Annual Projection", v:projRevenue?fmt(projRevenue*12):"—" },
                    { l:"Advance", v:form.advanceAmount?fmt(parseInt(form.advanceAmount)):"—" },
                  ].map(k=>(
                    <div key={k.l} style={{ background:T.bgCard, borderRadius:7, padding:"7px 10px" }}>
                      <div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div>
                      <div style={{ fontSize:11, fontWeight:600, marginTop:2 }}>{k.v}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Assets assigned */}
              {(form.selectedVehicles.length>0||form.selectedEquipment.length>0||form.selectedDrivers.length>0) && (
                <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:12, marginBottom:12 }}>
                  <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:8 }}>Assigned Assets</div>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {form.selectedVehicles.map(v=><span key={v} className="badge bb" style={{ fontSize:11 }}>🚛 {v}</span>)}
                    {form.selectedEquipment.map(e=><span key={e} className="badge ba" style={{ fontSize:11 }}>🏗️ {EQUIPMENT_DATA.find(x=>x.id===e)?.model||e}</span>)}
                    {form.selectedDrivers.map(d=><span key={d} className="badge bg" style={{ fontSize:11 }}>👤 {d}</span>)}
                  </div>
                </div>
              )}
              {/* What gets created */}
              <div style={{ background:T.greenGlow, border:`1px solid ${T.green}33`, borderRadius:10, padding:12, marginBottom:12 }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.green, marginBottom:8 }}>⚡ On Activation:</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, fontSize:11, color:T.textSub }}>
                  {[
                    "✅ Contract record created & activated",
                    "✅ Billing ledger initialized",
                    assetType==="equipment"?"✅ Usage log tracking enabled":"✅ Trip counter started",
                    "✅ Revenue tracking against contract",
                    "✅ Available in trip sheet — 'From Contract'",
                    assetType==="equipment"?"✅ Billing engine connected":"✅ Invoice auto-generation enabled",
                  ].map((t,i)=><div key={i}>{t}</div>)}
                </div>
              </div>
              <div style={{ background:T.blueGlow, border:`1px solid ${T.blue}33`, borderRadius:8, padding:10, fontSize:11, color:T.blue }}>
                💡 After activation — click "New Trip" in the trips module and select "📋 From Contract" to auto-fill all details from this contract.
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:22, paddingTop:14, borderTop:`1px solid ${T.border}` }}>
            <button className="btn btn-gh" onClick={()=>step>1?setStep(s=>s-1):setStep(0)}>{step===1?"← Change Type":"← Back"}</button>
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ fontSize:11, color:T.textMuted, alignSelf:"center" }}>Step {step} of 6</div>
              <button
                className="btn"
                style={{ background:step===6?T.green:ac, color:"#080B10", fontWeight:700 }}
                onClick={()=>{
                  if(step<6) setStep(s=>s+1);
                  else {
                    const id = `FC-${String(Math.floor(Math.random()*900)+100).padStart(3,"0")}`;
                    onSave&&onSave({ id, assetType, contractTypeId, ...form,
                      monthlyRetainer:parseInt(form.monthlyRetainer)||null,
                      ratePerKm:parseInt(form.ratePerKm)||null,
                      ratePerTrip:parseInt(form.ratePerTrip||form.busRatePerTrip)||null,
                      monthlyRate:parseInt(form.monthlyRate||form.eqMonthlyRate||form.busMonthlyRate)||null,
                      hourlyRate:parseInt(form.hourlyRate)||null,
                      dailyRate:parseInt(form.dailyRate)||null,
                      overtimeRate:parseInt(form.overtimeRate)||null,
                      minGuaranteeHours:parseInt(form.minGuarantee)||null,
                      includedHoursPerMonth:parseInt(form.includedHours)||null,
                      advanceCollected:parseInt(form.advanceAmount)||0,
                      totalBilled:0, totalTrips:0, totalHoursRun:0,
                      status:"ACTIVE",
                    });
                    onClose();
                  }
                }}
              >
                {step===6?"✅ Activate Contract":"Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// FLEET CONTRACTS PAGE — master register for all contract types
// ═══════════════════════════════════════════════════════════════════════════════
const FleetContractsPage = () => {
  const [contracts, setContracts] = useState(FLEET_CONTRACTS_DATA_INIT);
  const [showWizard, setShowWizard] = useState(false);
  const [wizardAsset, setWizardAsset] = useState("truck");
  const [selContract, setSelContract] = useState(null);
  const [filterAsset, setFilterAsset] = useState("all");
  const [filterStatus, setFilterStatus] = useState("ACTIVE");

  const typeColor = { DEDICATED_FLEET:T.blue, RATE_CONTRACT:T.accent, MONTHLY_RETAINER:T.green, SPOT_RATE:T.purple, HOURLY:T.blue, DAILY:T.accent, MONTHLY:T.green, HYBRID:T.orange, MONTHLY_CONTRACT:T.green, PER_TRIP:T.blue, ANNUAL_CONTRACT:T.purple, SPOT_BOOKING:T.accent };
  const assetColor = { truck:T.blue, equipment:T.orange, bus:T.green };
  const assetIcon  = { truck:"🚛", equipment:"🏗️", bus:"🚌" };

  const filtered = contracts.filter(c=>(filterAsset==="all"||c.assetType===filterAsset)&&(filterStatus==="all"||c.status===filterStatus));
  const totalMthRevenue = contracts.filter(c=>c.status==="ACTIVE").reduce((s,c)=>s+monthlyRevProj(c),0);

  return (
    <div>
      {showWizard && <FleetContractWizard initialAssetType={wizardAsset} onClose={()=>setShowWizard(false)} onSave={c=>setContracts(cs=>[...cs,c])} />}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Fleet Contracts</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>Unified contract engine · Truck / Equipment / Bus · Pre-fills trip sheets automatically</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {["truck","equipment","bus"].map(at=>(
            <button key={at} className="btn" style={{ fontSize:11, background:assetColor[at]+"22", color:assetColor[at], border:`1px solid ${assetColor[at]}44` }} onClick={()=>{ setWizardAsset(at); setShowWizard(true); }}>
              {assetIcon[at]} New {at==="truck"?"Truck":at==="equipment"?"Equipment":"Bus"} Contract
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(6,1fr)", marginBottom:18 }}>
        {[
          { l:"Total Contracts",  v:contracts.length,                                  c:T.blue   },
          { l:"Active",          v:contracts.filter(c=>c.status==="ACTIVE").length,    c:T.green  },
          { l:"Truck Contracts", v:contracts.filter(c=>c.assetType==="truck").length,  c:T.blue   },
          { l:"Equip Contracts", v:contracts.filter(c=>c.assetType==="equipment").length, c:T.orange },
          { l:"Bus Contracts",   v:contracts.filter(c=>c.assetType==="bus").length,    c:T.green  },
          { l:"MTD Revenue",     v:fmt(totalMthRevenue),                              c:T.accent },
        ].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}>
            <div className="stat-v" style={{ color:k.c }}>{k.v}</div>
            <div className="stat-l">{k.l}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
        <div className="tabs" style={{ marginBottom:0 }}>
          {["all","truck","equipment","bus"].map(t=>(
            <div key={t} className={`tab ${filterAsset===t?"on":""}`} onClick={()=>setFilterAsset(t)} style={{ fontSize:11, textTransform:"capitalize" }}>
              {t==="all"?"All Assets":assetIcon[t]+" "+t.charAt(0).toUpperCase()+t.slice(1)}
            </div>
          ))}
        </div>
        <div className="toggle-pill" style={{ marginLeft:"auto" }}>
          {["ACTIVE","COMPLETED","all"].map(s=>(
            <div key={s} className={`toggle-opt ${filterStatus===s?"on":""}`} onClick={()=>setFilterStatus(s)} style={{ fontSize:11 }}>{s==="all"?"All":s==="ACTIVE"?"Active":"Completed"}</div>
          ))}
        </div>
      </div>

      {/* Contract cards */}
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {filtered.map(c => {
          const ctDef = CONTRACT_TYPE_DEFS[c.assetType]?.find(x=>x.id===c.contractTypeId);
          const ac = assetColor[c.assetType];
          const mthRev = monthlyRevProj(c);
          return (
            <div key={c.id} className="card" style={{ border:`1px solid ${ac}22`, cursor:"pointer" }} onClick={()=>setSelContract(c)}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                  <div style={{ width:44, height:44, borderRadius:10, background:ac+"18", border:`2px solid ${ac}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{assetIcon[c.assetType]}</div>
                  <div>
                    <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:3 }}>
                      <span className="mono" style={{ fontSize:12, fontWeight:700, color:T.accent }}>{c.id}</span>
                      <span className="badge" style={{ background:(typeColor[c.contractTypeId]||T.textMuted)+"22", color:typeColor[c.contractTypeId]||T.textMuted, fontSize:10 }}>{ctDef?.label||c.contractTypeId}</span>
                      <span className={`badge ${c.status==="ACTIVE"?"bg":"ba"}`} style={{ fontSize:10 }}>{c.status}</span>
                    </div>
                    <div style={{ fontSize:14, fontWeight:700 }}>{c.client}</div>
                    <div style={{ fontSize:11, color:T.textSub }}>{c.startDate} → {c.endDate} · {c.billingCycle} billing · {c.paymentTerms}</div>
                  </div>
                </div>
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:T.green }}>{fmt(mthRev)}<span style={{ fontSize:10, color:T.textMuted }}>/mo</span></div>
                  <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>Billed: {fmt(c.totalBilled)}</div>
                  <div style={{ fontSize:10, color:T.textMuted }}>Adv: {fmt(c.advanceCollected)}</div>
                </div>
              </div>

              {/* Contract terms pills */}
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
                {c.monthlyRetainer && <span style={{ fontSize:11, background:T.bgPanel, padding:"3px 8px", borderRadius:6 }}>Retainer: ₹{(c.monthlyRetainer/1000).toFixed(0)}k/mo</span>}
                {c.hourlyRate && <span style={{ fontSize:11, background:T.bgPanel, padding:"3px 8px", borderRadius:6 }}>₹{c.hourlyRate}/hr</span>}
                {c.dailyRate && <span style={{ fontSize:11, background:T.bgPanel, padding:"3px 8px", borderRadius:6 }}>₹{c.dailyRate}/day</span>}
                {c.monthlyRate && <span style={{ fontSize:11, background:T.bgPanel, padding:"3px 8px", borderRadius:6 }}>₹{(c.monthlyRate/1000).toFixed(0)}k/mo</span>}
                {c.ratePerKm && <span style={{ fontSize:11, background:T.bgPanel, padding:"3px 8px", borderRadius:6 }}>₹{c.ratePerKm}/km</span>}
                {c.includedKm && <span style={{ fontSize:11, background:T.bgPanel, padding:"3px 8px", borderRadius:6 }}>{c.includedKm.toLocaleString()} km incl.</span>}
                {c.minGuaranteeHours && <span style={{ fontSize:11, background:T.orange+"18", color:T.orange, padding:"3px 8px", borderRadius:6 }}>Min {c.minGuaranteeHours} hrs</span>}
                {c.includedHours && <span style={{ fontSize:11, background:T.green+"18", color:T.green, padding:"3px 8px", borderRadius:6 }}>{c.includedHours} hrs incl.</span>}
                {c.overtimeRate && <span style={{ fontSize:11, background:T.red+"18", color:T.red, padding:"3px 8px", borderRadius:6 }}>OT ₹{c.overtimeRate}/hr</span>}
                {c.includedTrips && <span style={{ fontSize:11, background:T.green+"18", color:T.green, padding:"3px 8px", borderRadius:6 }}>{c.includedTrips} trips incl.</span>}
                {c.idleChargeable && <span style={{ fontSize:11, background:T.textMuted+"18", color:T.textMuted, padding:"3px 8px", borderRadius:6 }}>Idle chargeable</span>}
              </div>

              {/* Assigned assets */}
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
                {(c.vehicles||[]).map(v=><span key={v} className="badge bb" style={{ fontSize:10 }}>🚛 {v}</span>)}
                {(c.drivers||[]).map(d=><span key={d} className="badge bg" style={{ fontSize:10 }}>👤 {d}</span>)}
              </div>

              {/* Revenue progress bar */}
              {c.totalBilled>0 && (
                <div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:T.textMuted, marginBottom:3 }}>
                    <span>Revenue collected: {fmt(c.totalBilled)}</span>
                    <span>{c.totalTrips?`${c.totalTrips} trips`:c.totalHoursRun?`${c.totalHoursRun} hrs run`:""}</span>
                  </div>
                  <div className="pbar" style={{ height:4 }}><div className="pfill" style={{ width:`${Math.min((c.totalBilled/Math.max(mthRev*6,1))*100,100)}%` }} /></div>
                </div>
              )}

              {/* Quick actions */}
              <div style={{ display:"flex", gap:6, marginTop:10 }} onClick={e=>e.stopPropagation()}>
                <button className="btn btn-p" style={{ fontSize:10, padding:"4px 10px" }} onClick={()=>{ /* trigger trip generator from contract */ }}>
                  🚀 Create Trip from Contract
                </button>
                <button className="btn btn-b" style={{ fontSize:10, padding:"4px 10px" }}>📄 Invoice</button>
                <button className="btn btn-gh" style={{ fontSize:10, padding:"4px 10px" }}>Edit</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};



// ═══════════════════════════════════════════════════════════════════════════════
// TRIP REVENUE MODEL ENGINE
// 3 Models: TRANSPORT_ONLY | MATERIAL_SALE | MULTI_CONSIGNMENT
// Digital delivery confirmation: Truck + Equipment (hours sheet) + Bus (manifest)
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Revenue model definitions ───────────────────────────────────────────────
const REVENUE_MODELS = {
  TRANSPORT_ONLY: {
    label:"Transport Only",    icon:"🚛", color:"#3B82F6",
    desc:"You are the transporter. One client pays a fixed trip charge. Single invoice.",
    useCase:"Standard freight movement. Party hires your truck for a fixed rate.",
  },
  MATERIAL_SALE: {
    label:"Material + Transport", icon:"⛏️", color:"#F59E0B",
    desc:"You own and sell the material AND transport it. Revenue = material margin + transport charge.",
    useCase:"Sand, blue metal, gravel, aggregate dealers who own trucks. Two revenue streams per trip.",
  },
  MULTI_CONSIGNMENT: {
    label:"Multi-Consignment (LCL)", icon:"📦", color:"#10B981",
    desc:"One truck, multiple parties. Each consignment billed separately. Separate POD per party.",
    useCase:"Part-load (LTL/LCL) trips. Multiple small shippers share a truck. Common for retail distribution.",
  },
};

// ─── Seed consignment data (linked to trips) ─────────────────────────────────
const CONSIGNMENTS_INIT = [
  // TRP-2025-0041 — TRANSPORT_ONLY
  { id:"CSG-001", tripId:"TRP-2025-0041", revenueModel:"TRANSPORT_ONLY", consignor:"Ramco Cements Ltd", consignee:"Coimbatore Cement Depot", material:"Portland Cement (53 Grade)", qty:18, unit:"MT", rateType:"PER_TON", rate:2333, billingParty:"Ramco Cements Ltd", revenueAmount:42000, costPrice:null, sellingPrice:null, transportCharge:42000, status:"DELIVERED", podId:"POD-001", invoiceId:"INV-2025-001", paidAmount:20000, balanceDue:22000 },
  // TRP-2025-0042 — MATERIAL_SALE
  { id:"CSG-002", tripId:"TRP-2025-0042", revenueModel:"MATERIAL_SALE", consignor:"Own Stock", consignee:"Godrej Industries — Madurai", material:"M-Sand (Manufactured Sand)", qty:22, unit:"MT", rateType:"PER_TON", rate:1727, billingParty:"Godrej Industries", revenueAmount:38000, costPrice:950, sellingPrice:1727, transportCharge:8000, status:"IN_TRANSIT", podId:null, invoiceId:null, paidAmount:18000, balanceDue:20000 },
  // TRP-2025-0044 — MULTI_CONSIGNMENT (3 parties)
  { id:"CSG-003", tripId:"TRP-2025-0044", revenueModel:"MULTI_CONSIGNMENT", consignor:"Pepsico Warehouse, Salem", consignee:"Metro Cash & Carry, Hyderabad", material:"FMCG Beverages", qty:8, unit:"MT", rateType:"PER_TON", rate:1500, billingParty:"Pepsico India", revenueAmount:12000, costPrice:null, sellingPrice:null, transportCharge:12000, status:"BILLED", podId:"POD-003", invoiceId:"INV-2025-003", paidAmount:12000, balanceDue:0 },
  { id:"CSG-004", tripId:"TRP-2025-0044", revenueModel:"MULTI_CONSIGNMENT", consignor:"D-Mart Salem", consignee:"D-Mart Hyderabad Hub", material:"FMCG Dry Goods", qty:3, unit:"MT", rateType:"PER_TON", rate:1667, billingParty:"Avenue Supermarts Ltd", revenueAmount:5000, costPrice:null, sellingPrice:null, transportCharge:5000, status:"BILLED", podId:"POD-004", invoiceId:"INV-2025-004", paidAmount:0, balanceDue:5000 },
  { id:"CSG-005", tripId:"TRP-2025-0044", revenueModel:"MULTI_CONSIGNMENT", consignor:"ITC Ltd Salem Depot", consignee:"ITC Distributor Hyderabad", material:"ITC Packaged Foods", qty:3, unit:"MT", rateType:"PER_TON", rate:2667, billingParty:"ITC Limited", revenueAmount:8000, costPrice:null, sellingPrice:null, transportCharge:8000, status:"PENDING", podId:null, invoiceId:null, paidAmount:0, balanceDue:8000 },
];

// ─── Equipment hours sheet / work confirmation ────────────────────────────────
const EQ_WORK_CONFIRMATIONS_INIT = [
  { id:"EWC-001", eqId:"EQ-001", contractId:"FC-004", date:"2025-04-15", siteManager:"Ravi Shankar", siteManagerPhone:"9876543210", startHours:4277, endHours:4286.5, workingHours:9.5, idleHours:1.0, workDone:"Trench excavation — 200m pipeline route, hard laterite soil. Depth: 2.8m avg.", minHours:8, billedHours:9.5, ratePerHour:900, billAmount:8550, otp:"7421", otpVerified:true, signatureCaptured:true, locked:true, gpsLat:9.9252, gpsLng:78.1198 },
  { id:"EWC-002", eqId:"EQ-003", contractId:"FC-005", date:"2025-04-15", siteManager:"Narayanan K", siteManagerPhone:"9944332211", startHours:6110, endHours:6120, workingHours:10, idleHours:1.0, workDone:"Road compaction — WBM layer km 4.0 to 4.8", minHours:8, billedHours:10, ratePerHour:700, billAmount:7000, otp:"", otpVerified:false, signatureCaptured:false, locked:false, gpsLat:13.0827, gpsLng:80.2707 },
];

// ─── Bus trip manifest / passenger confirmation ───────────────────────────────
const BUS_CONFIRMATIONS_INIT = [
  { id:"BMF-001", contractId:"FC-006", date:"2025-04-15", tripType:"Morning Shift", busNo:"TN22 IJ7890", driver:"Arjun D", route:"Sholinganallur → Siruseri IT Park", scheduledPax:35, actualPax:32, noShows:3, reportingManager:"Priya S", rmPhone:"9811223344", departTime:"08:45", arrivalTime:"09:22", otpVerified:true, signatureCaptured:true, locked:true, notes:"3 employees on leave. On-time arrival." },
  { id:"BMF-002", contractId:"FC-006", date:"2025-04-15", tripType:"Evening Shift", busNo:"TN22 IJ7890", driver:"Arjun D", route:"Siruseri IT Park → Sholinganallur", scheduledPax:32, actualPax:30, noShows:2, reportingManager:"Priya S", rmPhone:"9811223344", departTime:"18:15", arrivalTime:"18:58", otpVerified:false, signatureCaptured:false, locked:false, notes:"" },
];

// ─── Revenue model engine functions ──────────────────────────────────────────
function calcTripRevenue(trip, consignments) {
  const csgList = consignments.filter(c=>c.tripId===trip.id);
  if (!csgList.length) return { total:trip.freight||0, profit:0, consignments:[] };
  const totalRevenue   = csgList.reduce((s,c)=>s+c.revenueAmount,0);
  const totalTransport = csgList.reduce((s,c)=>s+(c.transportCharge||0),0);
  const totalCost      = csgList.reduce((s,c)=>s+((c.costPrice||0)*(c.qty||1)),0);
  const totalExpenses  = Object.values(trip.expenses||{}).reduce((s,v)=>s+v,0);
  const profit         = totalRevenue - totalCost - totalExpenses;
  return { total:totalRevenue, transport:totalTransport, materialMargin:totalRevenue-totalTransport-totalCost, expenses:totalExpenses, profit, consignments:csgList };
}

// ─── Consignment Entry Form (used inside TripGeneratorModal step 2/3) ─────────
const ConsignmentForm = ({ tripId, revenueModel, onAdd, onClose }) => {
  const [entries, setEntries] = useState([{ consignor:"", consignee:"", material:"", qty:"", unit:"MT", rateType:"PER_TON", rate:"", billingParty:"", costPrice:"", sellingPrice:"", transportCharge:"" }]);
  const addEntry = () => setEntries(e=>[...e,{ consignor:"", consignee:"", material:"", qty:"", unit:"MT", rateType:"PER_TON", rate:"", billingParty:"", costPrice:"", sellingPrice:"", transportCharge:"" }]);
  const ue = (i,k,v) => setEntries(e=>e.map((x,xi)=>xi===i?{...x,[k]:v}:x));

  return (
    <div className="ov" style={{ alignItems:"flex-start", paddingTop:20, overflowY:"auto" }}>
      <div className="modal" style={{ maxWidth:680, width:"100%", margin:"0 auto" }}>
        <div className="mhdr" style={{ background:`linear-gradient(135deg,${REVENUE_MODELS[revenueModel]?.color}22,#080B10)`, borderBottom:`1px solid ${REVENUE_MODELS[revenueModel]?.color}44` }}>
          <div>
            <div className="rj" style={{ fontSize:18, fontWeight:700, color:REVENUE_MODELS[revenueModel]?.color }}>{REVENUE_MODELS[revenueModel]?.icon} Add Consignments — {REVENUE_MODELS[revenueModel]?.label}</div>
            <div style={{ fontSize:11, color:T.textSub, marginTop:2 }}>Trip: {tripId}</div>
          </div>
          <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
        </div>
        <div className="mbdy">
          {entries.map((e, i) => {
            const revenue = e.rateType==="PER_TON"?parseFloat(e.qty||0)*parseFloat(e.rate||0):e.rateType==="PER_TRIP"?parseFloat(e.rate||0):parseFloat(e.qty||0)*parseFloat(e.rate||0);
            const materialProfit = revenueModel==="MATERIAL_SALE"&&e.qty&&e.costPrice&&e.sellingPrice ? (parseFloat(e.sellingPrice)-parseFloat(e.costPrice))*parseFloat(e.qty) : 0;
            return (
              <div key={i} style={{ background:T.bgPanel, border:`1px solid ${REVENUE_MODELS[revenueModel]?.color}33`, borderRadius:10, padding:14, marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:REVENUE_MODELS[revenueModel]?.color }}>
                    {revenueModel==="MULTI_CONSIGNMENT" ? `📦 Consignment ${i+1}` : revenueModel==="MATERIAL_SALE" ? "⛏️ Material Details" : "🚛 Consignment"}
                  </div>
                  {i>0&&<button onClick={()=>setEntries(e=>e.filter((_,xi)=>xi!==i))} style={{ background:"none",border:"none",cursor:"pointer",color:T.red,fontSize:12 }}>✕ Remove</button>}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                  <div><label className="flabel">Consignor (Sender) *</label><input value={e.consignor} onChange={x=>ue(i,"consignor",x.target.value)} placeholder="Company / party sending the goods" /></div>
                  <div><label className="flabel">Consignee (Receiver) *</label><input value={e.consignee} onChange={x=>ue(i,"consignee",x.target.value)} placeholder="Company / party receiving goods" /></div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:10 }}>
                  <div><label className="flabel">Material / Goods *</label><input value={e.material} onChange={x=>ue(i,"material",x.target.value)} placeholder="Cement, Sand, Electronics..." /></div>
                  <div><label className="flabel">Quantity *</label><input type="number" value={e.qty} onChange={x=>ue(i,"qty",x.target.value)} placeholder="10" /></div>
                  <div><label className="flabel">Unit</label><select value={e.unit} onChange={x=>ue(i,"unit",x.target.value)}><option>MT</option><option>KG</option><option>Bags</option><option>Units</option><option>Cases</option><option>Pallets</option><option>CBM</option></select></div>
                </div>
                {revenueModel==="MATERIAL_SALE" && (
                  <div style={{ background:T.accentGlow, border:`1px solid ${T.accent}33`, borderRadius:8, padding:10, marginBottom:10 }}>
                    <div style={{ fontSize:11, fontWeight:600, color:T.accent, marginBottom:6 }}>⛏️ Material Trading — Cost vs Selling Price</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                      <div><label className="flabel">Cost Price (₹/unit)</label><input type="number" value={e.costPrice} onChange={x=>ue(i,"costPrice",x.target.value)} placeholder="800" /></div>
                      <div><label className="flabel">Selling Price (₹/unit)</label><input type="number" value={e.sellingPrice} onChange={x=>ue(i,"sellingPrice",x.target.value)} placeholder="1200" /></div>
                      <div>
                        <label className="flabel">Material Margin</label>
                        <div style={{ padding:"7px 10px", background:T.bgCard, borderRadius:7, fontSize:13, fontWeight:700, color:materialProfit>0?T.green:T.textMuted }}>
                          {materialProfit>0?fmt(materialProfit):"—"}
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop:8 }}><label className="flabel">Separate Transport Charge (₹)</label><input type="number" value={e.transportCharge} onChange={x=>ue(i,"transportCharge",x.target.value)} placeholder="5000" /></div>
                  </div>
                )}
                {revenueModel!=="MATERIAL_SALE" && (
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:10 }}>
                    <div><label className="flabel">Rate Type</label><select value={e.rateType} onChange={x=>ue(i,"rateType",x.target.value)}><option value="PER_TON">Per Ton</option><option value="PER_TRIP">Per Trip</option><option value="PER_UNIT">Per Unit</option></select></div>
                    <div><label className="flabel">Rate (₹)</label><input type="number" value={e.rate} onChange={x=>ue(i,"rate",x.target.value)} placeholder={e.rateType==="PER_TRIP"?"12000":"1500"} /></div>
                    <div>
                      <label className="flabel">Revenue Amount</label>
                      <div style={{ padding:"7px 10px", background:T.bgCard, borderRadius:7, fontSize:13, fontWeight:700, color:revenue>0?T.green:T.textMuted }}>{revenue>0?fmt(revenue):"—"}</div>
                    </div>
                  </div>
                )}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  <div><label className="flabel">Billing Party (who pays)</label><input value={e.billingParty} onChange={x=>ue(i,"billingParty",x.target.value)} placeholder="Usually the consignor or contract party" /></div>
                  <div>
                    <label className="flabel">Total Revenue this Consignment</label>
                    <div style={{ padding:"8px 12px", background:REVENUE_MODELS[revenueModel]?.color+"18", border:`1px solid ${REVENUE_MODELS[revenueModel]?.color}33`, borderRadius:7, fontSize:15, fontWeight:700, color:REVENUE_MODELS[revenueModel]?.color }}>
                      {revenueModel==="MATERIAL_SALE" ? fmt(parseFloat(e.qty||0)*parseFloat(e.sellingPrice||0)+(parseFloat(e.transportCharge||0))) : fmt(revenue)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {revenueModel==="MULTI_CONSIGNMENT" && (
            <button className="btn btn-gh" style={{ width:"100%", marginBottom:14, fontSize:12 }} onClick={addEntry}>+ Add Another Consignment / Party</button>
          )}
          {/* Summary */}
          <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginBottom:14 }}>
            <div style={{ fontSize:12, fontWeight:700, color:T.textSub, marginBottom:10 }}>📊 Revenue Summary</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
              {revenueModel==="MULTI_CONSIGNMENT" && entries.map((e,i)=>{
                const rev = e.rateType==="PER_TON"?parseFloat(e.qty||0)*parseFloat(e.rate||0):parseFloat(e.rate||0);
                return rev>0?<div key={i} style={{ background:T.bgCard, borderRadius:7, padding:"7px 10px" }}><div style={{ fontSize:9, color:T.textMuted }}>Party {i+1}{e.billingParty?`: ${e.billingParty.split(" ")[0]}`:""}</div><div style={{ fontSize:13, fontWeight:700, color:T.green }}>{fmt(rev)}</div></div>:null;
              })}
              <div style={{ background:T.green+"18", border:`1px solid ${T.green}33`, borderRadius:7, padding:"7px 10px" }}>
                <div style={{ fontSize:9, color:T.textMuted }}>Total Trip Revenue</div>
                <div style={{ fontSize:15, fontWeight:700, color:T.green }}>
                  {fmt(entries.reduce((s,e)=>s+(revenueModel==="MATERIAL_SALE"?parseFloat(e.qty||0)*parseFloat(e.sellingPrice||0)+parseFloat(e.transportCharge||0):e.rateType==="PER_TON"?parseFloat(e.qty||0)*parseFloat(e.rate||0):parseFloat(e.rate||0)),0))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", justifyContent:"flex-end", gap:8 }}>
            <button className="btn btn-gh" onClick={onClose}>Cancel</button>
            <button className="btn btn-p" onClick={()=>{ onAdd(entries); onClose(); }}>✅ Confirm Consignments</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Delivery Confirmation Modal — TRUCK (digital POD + consignment sign-off) ─
const TruckDeliveryConfirmModal = ({ trip, consignments, onClose, onConfirm }) => {
  const [dcStep, setDcStep] = useState(1);
  const [selectedCsg, setSelectedCsg] = useState(consignments[0]?.id||"");
  const [dcForms, setDcForms] = useState(
    Object.fromEntries(consignments.map(c=>[c.id,{ deliveredQty:c.qty, shortage:0, damaged:false, receiverName:"", receiverPhone:"", otp:"", otpSent:false, otpVerified:false, signatureCaptured:false, deliveryTime:new Date().toTimeString().slice(0,5), notes:"" }]))
  );
  const df = (csgId,k,v) => setDcForms(f=>({...f,[csgId]:{...f[csgId],[k]:v}}));
  const csg = consignments.find(c=>c.id===selectedCsg);
  const form = dcForms[selectedCsg]||{};
  const allSigned = consignments.every(c=>dcForms[c.id]?.signatureCaptured&&dcForms[c.id]?.otpVerified);
  const rmColor = REVENUE_MODELS[trip.revenueModel]?.color || T.accent;

  return (
    <div className="ov" style={{ alignItems:"flex-start", paddingTop:20, overflowY:"auto" }}>
      <div className="modal" style={{ maxWidth:600, width:"100%", margin:"0 auto" }}>
        <div className="mhdr" style={{ background:`linear-gradient(135deg,#064E3B,#065F46)`, borderBottom:`1px solid ${T.green}33` }}>
          <div>
            <div className="rj" style={{ fontSize:18, fontWeight:700, color:T.green }}>✅ Delivery Confirmation — {trip.id}</div>
            <div style={{ fontSize:11, color:T.textSub }}>{trip.route} · {REVENUE_MODELS[trip.revenueModel]?.icon} {REVENUE_MODELS[trip.revenueModel]?.label||"Transport Only"}</div>
          </div>
          <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
        </div>
        <div className="mbdy">
          {/* Consignment selector for multi-consignment */}
          {consignments.length > 1 && (
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:6 }}>Select consignment to confirm delivery:</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {consignments.map(c=>(
                  <div key={c.id} onClick={()=>setSelectedCsg(c.id)} style={{ padding:"7px 12px", borderRadius:8, cursor:"pointer", border:`2px solid ${selectedCsg===c.id?rmColor:T.border}`, background:selectedCsg===c.id?rmColor+"14":T.bgPanel, fontSize:11 }}>
                    <div style={{ fontWeight:600, color:selectedCsg===c.id?rmColor:T.text }}>{c.consignee?.split("—")[0]||c.id}</div>
                    <div style={{ fontSize:10, color:T.textMuted }}>{c.material} · {c.qty}{c.unit}</div>
                    {dcForms[c.id]?.otpVerified&&dcForms[c.id]?.signatureCaptured && <div style={{ fontSize:10, color:T.green }}>✅ Confirmed</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {csg && (
            <>
              {/* Consignment header */}
              <div style={{ background:rmColor+"10", border:`1px solid ${rmColor}33`, borderRadius:8, padding:10, marginBottom:14 }}>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, fontSize:11 }}>
                  {[{ l:"Material", v:csg.material },{ l:"Dispatched", v:`${csg.qty} ${csg.unit}` },{ l:"Billing Party", v:csg.billingParty }].map(k=>(
                    <div key={k.l}><div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div><div style={{ fontWeight:600, marginTop:1 }}>{k.v}</div></div>
                  ))}
                </div>
              </div>

              {/* Step 1: Quantity check */}
              {dcStep===1 && (
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:14 }}>Step 1 — Delivered Quantity & Condition</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
                    <div>
                      <label className="flabel">Delivered Quantity *</label>
                      <input type="number" value={form.deliveredQty} onChange={e=>df(selectedCsg,"deliveredQty",e.target.value)} style={{ fontSize:16, fontWeight:700, textAlign:"center" }} />
                      <div style={{ fontSize:10, color:T.textMuted, marginTop:3 }}>Dispatched: {csg.qty} {csg.unit}</div>
                      {parseFloat(form.deliveredQty)<parseFloat(csg.qty) && (
                        <div style={{ fontSize:11, color:T.red, fontWeight:700, marginTop:4 }}>⚠️ Shortage: {(csg.qty-parseFloat(form.deliveredQty)).toFixed(2)} {csg.unit}</div>
                      )}
                    </div>
                    <div>
                      <label className="flabel">Delivery Time</label>
                      <input type="time" value={form.deliveryTime} onChange={e=>df(selectedCsg,"deliveryTime",e.target.value)} />
                    </div>
                  </div>
                  <div style={{ marginBottom:12 }}>
                    <label className="flabel">Condition on Delivery</label>
                    <div style={{ display:"flex", gap:10, marginTop:6 }}>
                      {[["No Damage ✅",false],["Damaged ❌",true]].map(([l,v])=>(
                        <div key={l} onClick={()=>df(selectedCsg,"damaged",v)} style={{ flex:1, padding:"9px 12px", borderRadius:8, cursor:"pointer", border:`2px solid ${form.damaged===v?v?T.red:T.green:T.border}`, background:form.damaged===v?v?T.redGlow:T.greenGlow:T.bgPanel, textAlign:"center", fontSize:12, fontWeight:600, color:form.damaged===v?v?T.red:T.green:T.textSub }}>{l}</div>
                      ))}
                    </div>
                  </div>
                  {form.damaged && (
                    <div style={{ background:T.redGlow, border:`1px solid ${T.red}33`, borderRadius:8, padding:10, marginBottom:12 }}>
                      <label className="flabel">Damage Type</label>
                      <select style={{ marginBottom:6 }} onChange={e=>df(selectedCsg,"damageType",e.target.value)}><option>Minor</option><option>Major</option><option>Water Damage</option><option>Transit Breakage</option></select>
                      <label className="flabel">Damage Remarks</label>
                      <textarea value={form.damageNotes||""} onChange={e=>df(selectedCsg,"damageNotes",e.target.value)} placeholder="Describe damage..." style={{ height:50 }} />
                    </div>
                  )}
                  <label className="flabel">Delivery Notes</label>
                  <input value={form.notes||""} onChange={e=>df(selectedCsg,"notes",e.target.value)} placeholder="Remarks at delivery point..." />
                </div>
              )}

              {/* Step 2: Receiver details */}
              {dcStep===2 && (
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:14 }}>Step 2 — Receiver Details & OTP Verification</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
                    <div><label className="flabel">Receiver Name *</label><input value={form.receiverName} onChange={e=>df(selectedCsg,"receiverName",e.target.value)} placeholder="Full name of receiver" /></div>
                    <div><label className="flabel">Receiver Phone * (OTP)</label><input type="tel" value={form.receiverPhone} onChange={e=>df(selectedCsg,"receiverPhone",e.target.value)} placeholder="+91 98765 43210" style={{ fontFamily:"'JetBrains Mono',monospace", letterSpacing:1 }} /></div>
                  </div>
                  <div style={{ background:T.bgPanel, border:`1px solid ${form.otpVerified?T.green:T.border}`, borderRadius:10, padding:12, marginBottom:12 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:form.otpVerified?T.green:T.textSub, marginBottom:8 }}>{form.otpVerified?"✅ OTP Verified":"📱 OTP Verification"}</div>
                    {!form.otpVerified && (
                      !form.otpSent
                        ? <button className="btn" style={{ background:T.blue, color:"#fff" }} onClick={()=>df(selectedCsg,"otpSent",true)}>📱 Send OTP to {form.receiverPhone||"receiver"}</button>
                        : <div style={{ display:"flex", gap:8 }}>
                            <input value={form.otp} onChange={e=>df(selectedCsg,"otp",e.target.value)} placeholder="Enter OTP" maxLength={6} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:18, letterSpacing:6, flex:1, textAlign:"center" }} />
                            <button className="btn" style={{ background:T.green, color:"#fff" }} onClick={()=>{ if(form.otp.length>=4) df(selectedCsg,"otpVerified",true); }}>Verify</button>
                          </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Signature */}
              {dcStep===3 && (
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:14 }}>Step 3 — Digital Signature</div>
                  <div style={{ background:T.bgPanel, border:`1px solid ${form.signatureCaptured?T.green:T.border}`, borderRadius:10, padding:14, marginBottom:12 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:form.signatureCaptured?T.green:T.textSub, marginBottom:8 }}>{form.signatureCaptured?"✅ Signature Captured":"✍️ Receiver Digital Signature"}</div>
                    {!form.signatureCaptured ? (
                      <div>
                        <div style={{ background:T.bgCard, border:`2px dashed ${T.border}`, borderRadius:8, height:120, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10, cursor:"crosshair" }} onClick={()=>df(selectedCsg,"signatureCaptured",true)}>
                          <div style={{ textAlign:"center", color:T.textMuted }}><div style={{ fontSize:28, marginBottom:4 }}>✍️</div><div style={{ fontSize:12 }}>{form.receiverName||"Receiver"} — sign here</div><div style={{ fontSize:10, marginTop:2 }}>Touch / click to capture</div></div>
                        </div>
                        <div style={{ fontSize:10, color:T.textMuted }}>Signing as: <strong>{form.receiverName}</strong> · {form.receiverPhone} · {new Date().toLocaleString()}</div>
                      </div>
                    ) : (
                      <div style={{ background:T.greenGlow, borderRadius:8, padding:10 }}>
                        <div style={{ fontSize:12, color:T.green }}>✅ Signed by <strong>{form.receiverName}</strong></div>
                        <div style={{ fontSize:10, color:T.textMuted, marginTop:3 }}>Phone: {form.receiverPhone} · {new Date().toLocaleString()}</div>
                        {form.otpVerified && <div style={{ fontSize:10, color:T.green, marginTop:2 }}>📱 OTP Verified · 📍 GPS Stamped · 🕐 Timestamped</div>}
                        <button className="btn btn-gh" style={{ marginTop:6, fontSize:10 }} onClick={()=>df(selectedCsg,"signatureCaptured",false)}>Re-sign</button>
                      </div>
                    )}
                  </div>
                  {form.signatureCaptured && form.otpVerified && (
                    <div style={{ background:`linear-gradient(135deg,${T.green}18,${T.cyan}12)`, border:`1px solid ${T.green}44`, borderRadius:10, padding:12, textAlign:"center" }}>
                      <div style={{ fontSize:20, marginBottom:4 }}>🏆</div>
                      <div className="rj" style={{ fontSize:14, fontWeight:700, color:T.green }}>Verified Delivery — {csg.id}</div>
                      <div style={{ fontSize:11, color:T.textSub, marginTop:4 }}>✔ Signed · ✔ OTP · ✔ GPS · ✔ Timestamped</div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:16, paddingTop:14, borderTop:`1px solid ${T.border}` }}>
            <button className="btn btn-gh" onClick={()=>dcStep>1?setDcStep(s=>s-1):onClose()}>{dcStep===1?"Cancel":"← Back"}</button>
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ fontSize:11, color:T.textMuted, alignSelf:"center" }}>Step {dcStep} of 3</div>
              <button className="btn" style={{ background:dcStep===3?T.green:T.accent, color:"#080B10", fontWeight:700 }}
                onClick={()=>{
                  if(dcStep<3) setDcStep(s=>s+1);
                  else if(allSigned) { onConfirm(dcForms); onClose(); }
                }}>
                {dcStep===3 ? (allSigned?"🔒 Lock & Complete":"Sign all consignments") : "Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Equipment Hours Sheet Confirmation Modal ─────────────────────────────────
const EquipmentHoursConfirmModal = ({ eq, contractId, onClose, onSave }) => {
  const [hcStep, setHcStep] = useState(1);
  const [hcForm, setHcForm] = useState({ date:new Date().toISOString().split("T")[0], startHours:"", endHours:"", idleHours:"0", workDone:"", siteManager:"", smPhone:"", otp:"", otpSent:false, otpVerified:false, signatureCaptured:false, breakdown:false });
  const hf = (k,v) => setHcForm(f=>({...f,[k]:v}));
  const workingHours = hcForm.startHours&&hcForm.endHours ? Math.max(0,parseFloat(hcForm.endHours)-parseFloat(hcForm.startHours)-parseFloat(hcForm.idleHours||0)) : 0;
  const contract = EQ_CONTRACTS_INIT.find(c=>c.id===contractId);
  const billedHours = Math.max(workingHours, contract?.shiftHoursPerDay||8);
  const billAmt = billedHours * (contract?.hourlyRate||900);

  return (
    <div className="ov" style={{ alignItems:"flex-start", paddingTop:20, overflowY:"auto" }}>
      <div className="modal" style={{ maxWidth:560, width:"100%", margin:"0 auto" }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#1C1000,#3D2200,#F9731633)", borderBottom:`1px solid ${T.orange}33` }}>
          <div>
            <div className="rj" style={{ fontSize:18, fontWeight:700, color:T.orange }}>⏱️ Equipment Hours Sheet — {eq?.regNo||eq?.id}</div>
            <div style={{ fontSize:11, color:T.textSub }}>{eq?.model} · {eq?.site||"Site"} · Site manager OTP confirmation required</div>
          </div>
          <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
        </div>
        <div className="mbdy">
          {hcStep===1 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.orange, marginBottom:14 }}>Step 1 — Running Hours for the Day</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:12 }}>
                <div><label className="flabel">Date</label><input type="date" value={hcForm.date} onChange={e=>hf("date",e.target.value)} /></div>
                <div><label className="flabel">Engine Hours — Start</label><input type="number" value={hcForm.startHours} onChange={e=>hf("startHours",e.target.value)} placeholder={eq?.engineHours||4277} /></div>
                <div><label className="flabel">Engine Hours — End</label><input type="number" value={hcForm.endHours} onChange={e=>hf("endHours",e.target.value)} placeholder={(eq?.engineHours||4277)+9.5} /></div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
                <div><label className="flabel">Idle Hours (deduct)</label><input type="number" value={hcForm.idleHours} onChange={e=>hf("idleHours",e.target.value)} placeholder="0" /></div>
                <div>
                  <label className="flabel">Breakdown Today?</label>
                  <div style={{ display:"flex", gap:8, marginTop:6 }}>
                    {[["No",false],["Yes",true]].map(([l,v])=>(
                      <div key={l} onClick={()=>hf("breakdown",v)} style={{ flex:1, padding:"7px 10px", borderRadius:7, cursor:"pointer", border:`2px solid ${hcForm.breakdown===v?v?T.red:T.green:T.border}`, background:hcForm.breakdown===v?v?T.redGlow:T.greenGlow:T.bgPanel, textAlign:"center", fontSize:12, fontWeight:600 }}>{l}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ marginBottom:12 }}>
                <label className="flabel">Work Done Today</label>
                <textarea value={hcForm.workDone} onChange={e=>hf("workDone",e.target.value)} placeholder="Describe work performed — e.g. Trench excavation 180m, hard laterite soil, 2.5m depth, pipeline route km 4.0–4.2..." style={{ height:65 }} />
              </div>
              {workingHours > 0 && (
                <div style={{ background:T.orangeGlow, border:`1px solid ${T.orange}33`, borderRadius:10, padding:12 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.orange, marginBottom:8 }}>📋 Daily Hours Summary</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
                    {[["Working Hrs",`${workingHours.toFixed(1)}h`,T.text],["Min Applied",`${billedHours.toFixed(1)}h`,billedHours>workingHours?T.orange:T.green],["Rate",`₹${contract?.hourlyRate||900}/hr`,T.accent],["Bill Amount",fmt(billAmt),T.green]].map(([l,v,c])=>(
                      <div key={l} style={{ background:T.bgPanel, borderRadius:7, padding:"7px 10px" }}><div style={{ fontSize:9, color:T.textMuted }}>{l}</div><div style={{ fontSize:12, fontWeight:700, color:c, marginTop:2 }}>{v}</div></div>
                    ))}
                  </div>
                  {billedHours>workingHours && <div style={{ fontSize:11, color:T.orange, marginTop:8 }}>⚠️ Daily minimum {contract?.shiftHoursPerDay||8}h applied — client billed for {billedHours}h, machine ran {workingHours.toFixed(1)}h.</div>}
                </div>
              )}
            </div>
          )}

          {hcStep===2 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.orange, marginBottom:14 }}>Step 2 — Site Manager Verification & OTP</div>
              <div style={{ background:T.blueGlow, border:`1px solid ${T.blue}33`, borderRadius:8, padding:10, marginBottom:14, fontSize:11, color:T.textSub }}>
                📋 The site manager or engineer-in-charge must verify and sign the daily hours sheet. OTP is sent to their registered mobile number. This creates a legally binding equipment usage record.
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
                <div><label className="flabel">Site Manager Name *</label><input value={hcForm.siteManager} onChange={e=>hf("siteManager",e.target.value)} placeholder="Engineer-in-charge at site" /></div>
                <div><label className="flabel">Site Manager Phone (OTP) *</label><input type="tel" value={hcForm.smPhone} onChange={e=>hf("smPhone",e.target.value)} placeholder="+91 98765..." style={{ fontFamily:"'JetBrains Mono',monospace", letterSpacing:1 }} /></div>
              </div>
              <div style={{ background:T.bgPanel, border:`1px solid ${hcForm.otpVerified?T.green:T.border}`, borderRadius:10, padding:12, marginBottom:12 }}>
                <div style={{ fontSize:12, fontWeight:700, color:hcForm.otpVerified?T.green:T.textSub, marginBottom:8 }}>{hcForm.otpVerified?"✅ OTP Verified — Hours confirmed by site":"📱 OTP Verification Required"}</div>
                {!hcForm.otpVerified && (
                  !hcForm.otpSent
                    ? <button className="btn" style={{ background:T.blue, color:"#fff" }} onClick={()=>hf("otpSent",true)}>📱 Send OTP to Site Manager</button>
                    : <div style={{ display:"flex", gap:8 }}>
                        <input value={hcForm.otp} onChange={e=>hf("otp",e.target.value)} placeholder="Enter 6-digit OTP" maxLength={6} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:18, letterSpacing:6, flex:1, textAlign:"center" }} />
                        <button className="btn" style={{ background:T.green, color:"#fff" }} onClick={()=>{ if(hcForm.otp.length>=4) hf("otpVerified",true); }}>Verify</button>
                      </div>
                )}
              </div>
              <div style={{ background:T.bgPanel, border:`1px solid ${hcForm.signatureCaptured?T.green:T.border}`, borderRadius:10, padding:12 }}>
                <div style={{ fontSize:12, fontWeight:700, color:hcForm.signatureCaptured?T.green:T.textSub, marginBottom:8 }}>{hcForm.signatureCaptured?"✅ Site Manager Signature Captured":"✍️ Equipment Hours Sheet — Site Sign-off"}</div>
                {!hcForm.signatureCaptured ? (
                  <div style={{ background:T.bgCard, border:`2px dashed ${T.border}`, borderRadius:8, height:100, display:"flex", alignItems:"center", justifyContent:"center", cursor:"crosshair" }} onClick={()=>hcForm.otpVerified&&hf("signatureCaptured",true)}>
                    <div style={{ textAlign:"center", color:hcForm.otpVerified?T.textMuted:T.red }}>
                      <div style={{ fontSize:24, marginBottom:4 }}>{hcForm.otpVerified?"✍️":"🔒"}</div>
                      <div style={{ fontSize:12 }}>{hcForm.otpVerified?`${hcForm.siteManager||"Site manager"} — sign here`:"Verify OTP first before signing"}</div>
                    </div>
                  </div>
                ) : (
                  <div style={{ background:T.greenGlow, borderRadius:8, padding:10 }}>
                    <div style={{ fontSize:12, color:T.green }}>✅ Signed by <strong>{hcForm.siteManager}</strong></div>
                    <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>{new Date().toLocaleString()} · Hours: {workingHours.toFixed(1)}h working · Billed: {billedHours.toFixed(1)}h · Amount: {fmt(billAmt)}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {hcStep===3 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:14 }}>Step 3 — Confirm & Lock Hours Sheet</div>
              <div style={{ background:T.bgPanel, border:`1px solid ${T.orange}33`, borderRadius:10, padding:14, marginBottom:12 }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.orange, marginBottom:10 }}>📋 Locked Hours Sheet — {hcForm.date}</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                  {[["Equipment",eq?.model||eq?.id],["Date",hcForm.date],["Working Hrs",`${workingHours.toFixed(1)}h`],["Billed Hrs",`${billedHours.toFixed(1)}h`],["Bill Amount",fmt(billAmt)],["Site Manager",hcForm.siteManager||"—"],["OTP Verified",hcForm.otpVerified?"✅ Yes":"❌ No"],["Signed",hcForm.signatureCaptured?"✅ Yes":"❌ No"],["GPS","✅ Auto"]].map(([l,v])=>(
                    <div key={l} style={{ background:T.bgCard, borderRadius:7, padding:"7px 10px" }}><div style={{ fontSize:9, color:T.textMuted }}>{l}</div><div style={{ fontSize:11, fontWeight:600, marginTop:2 }}>{v}</div></div>
                  ))}
                </div>
              </div>
              <div style={{ background:T.bgPanel, borderRadius:8, padding:10, fontSize:11, color:T.textSub }}>
                <strong>Work done:</strong> {hcForm.workDone||"—"}
              </div>
              {hcForm.otpVerified && hcForm.signatureCaptured && (
                <div style={{ background:`linear-gradient(135deg,${T.orange}14,${T.accent}10)`, border:`1px solid ${T.orange}44`, borderRadius:10, padding:12, textAlign:"center", marginTop:12 }}>
                  <div style={{ fontSize:20, marginBottom:4 }}>🏆</div>
                  <div className="rj" style={{ fontSize:14, fontWeight:700, color:T.orange }}>Verified Equipment Hours Sheet</div>
                  <div style={{ fontSize:11, color:T.textSub, marginTop:4 }}>✔ Signed by site manager · ✔ OTP verified · ✔ GPS stamped · ✔ Timestamped · ✔ Locked</div>
                </div>
              )}
            </div>
          )}

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:16, paddingTop:14, borderTop:`1px solid ${T.border}` }}>
            <button className="btn btn-gh" onClick={()=>hcStep>1?setHcStep(s=>s-1):onClose()}>{hcStep===1?"Cancel":"← Back"}</button>
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ fontSize:11, color:T.textMuted, alignSelf:"center" }}>Step {hcStep} of 3</div>
              <button className="btn" style={{ background:hcStep===3?T.orange:T.orange, color:"#080B10", fontWeight:700 }}
                onClick={()=>{
                  if(hcStep<3) setHcStep(s=>s+1);
                  else { onSave({...hcForm, workingHours, billedHours, billAmt, eqId:eq?.id, contractId }); onClose(); }
                }}>
                {hcStep===3?"🔒 Lock Hours Sheet":"Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Bus Trip Completion Modal ────────────────────────────────────────────────
const BusTripConfirmModal = ({ bus, contractId, onClose, onSave }) => {
  const [bcStep, setBcStep] = useState(1);
  const [bcForm, setBcForm] = useState({ date:new Date().toISOString().split("T")[0], tripType:"Morning Shift", departTime:"", arrivalTime:"", scheduledPax:"", actualPax:"", noShows:"0", reportingManager:"", rmPhone:"", otp:"", otpSent:false, otpVerified:false, signatureCaptured:false, onTime:true, incidentOccurred:false, incidentNote:"", notes:"" });
  const bf = (k,v) => setBcForm(f=>({...f,[k]:v}));

  return (
    <div className="ov" style={{ alignItems:"flex-start", paddingTop:20, overflowY:"auto" }}>
      <div className="modal" style={{ maxWidth:540, width:"100%", margin:"0 auto" }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#064E3B,#065F46,#10B98133)", borderBottom:`1px solid ${T.green}33` }}>
          <div>
            <div className="rj" style={{ fontSize:18, fontWeight:700, color:T.green }}>🚌 Bus Trip Confirmation — {bus?.busNo||"Bus"}</div>
            <div style={{ fontSize:11, color:T.textSub }}>HR/Admin sign-off required · Passenger count verification · On-time record</div>
          </div>
          <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
        </div>
        <div className="mbdy">
          {bcStep===1 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:14 }}>Step 1 — Trip Details & Passenger Count</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:12 }}>
                <div><label className="flabel">Date</label><input type="date" value={bcForm.date} onChange={e=>bf("date",e.target.value)} /></div>
                <div><label className="flabel">Trip Type</label><select value={bcForm.tripType} onChange={e=>bf("tripType",e.target.value)}><option>Morning Shift</option><option>Evening Shift</option><option>Night Shift</option><option>Special Trip</option></select></div>
                <div><label className="flabel">Scheduled Passengers</label><input type="number" value={bcForm.scheduledPax} onChange={e=>bf("scheduledPax",e.target.value)} placeholder="35" /></div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:12 }}>
                <div><label className="flabel">Actual Boarded</label><input type="number" value={bcForm.actualPax} onChange={e=>bf("actualPax",e.target.value)} placeholder="32" style={{ borderColor:bcForm.actualPax&&parseInt(bcForm.actualPax)<parseInt(bcForm.scheduledPax)?T.orange+"88":undefined }} /></div>
                <div><label className="flabel">No-Shows</label><div style={{ padding:"7px 10px", background:T.bgPanel, borderRadius:7, fontSize:13, fontWeight:700, color:T.orange }}>{Math.max(0,(parseInt(bcForm.scheduledPax)||0)-(parseInt(bcForm.actualPax)||0))}</div></div>
                <div><label className="flabel">Departure Time</label><input type="time" value={bcForm.departTime} onChange={e=>bf("departTime",e.target.value)} /></div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
                <div><label className="flabel">Arrival Time</label><input type="time" value={bcForm.arrivalTime} onChange={e=>bf("arrivalTime",e.target.value)} /></div>
                <div>
                  <label className="flabel">On-Time Arrival?</label>
                  <div style={{ display:"flex", gap:8, marginTop:6 }}>
                    {[["✅ On Time",true],["❌ Delayed",false]].map(([l,v])=>(
                      <div key={l} onClick={()=>bf("onTime",v)} style={{ flex:1, padding:"7px 10px", borderRadius:7, cursor:"pointer", border:`2px solid ${bcForm.onTime===v?v?T.green:T.red:T.border}`, background:bcForm.onTime===v?v?T.greenGlow:T.redGlow:T.bgPanel, textAlign:"center", fontSize:11, fontWeight:600 }}>{l}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ marginBottom:10 }}>
                <label style={{ display:"flex", gap:6, alignItems:"center", cursor:"pointer", fontSize:12 }}><input type="checkbox" checked={bcForm.incidentOccurred} onChange={e=>bf("incidentOccurred",e.target.checked)} /><span>Incident / Complaint occurred during this trip</span></label>
                {bcForm.incidentOccurred && <textarea value={bcForm.incidentNote} onChange={e=>bf("incidentNote",e.target.value)} placeholder="Describe incident..." style={{ height:50, marginTop:6 }} />}
              </div>
              <div><label className="flabel">Driver / Route Notes</label><input value={bcForm.notes} onChange={e=>bf("notes",e.target.value)} placeholder="Any notes about traffic, route, special stops..." /></div>
            </div>
          )}

          {bcStep===2 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:14 }}>Step 2 — Client HR/Admin Sign-Off</div>
              <div style={{ background:T.blueGlow, border:`1px solid ${T.blue}33`, borderRadius:8, padding:10, marginBottom:14, fontSize:11, color:T.textSub }}>
                🏢 The client's HR manager or designated transport coordinator must confirm and sign the daily trip sheet. OTP sent to their registered mobile. This validates the trip for billing purposes.
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
                <div><label className="flabel">HR / Transport Coordinator Name *</label><input value={bcForm.reportingManager} onChange={e=>bf("reportingManager",e.target.value)} placeholder="Client contact name" /></div>
                <div><label className="flabel">Phone (OTP) *</label><input type="tel" value={bcForm.rmPhone} onChange={e=>bf("rmPhone",e.target.value)} placeholder="+91 98765..." style={{ fontFamily:"'JetBrains Mono',monospace" }} /></div>
              </div>
              <div style={{ background:T.bgPanel, border:`1px solid ${bcForm.otpVerified?T.green:T.border}`, borderRadius:10, padding:12, marginBottom:12 }}>
                <div style={{ fontSize:11, fontWeight:700, color:bcForm.otpVerified?T.green:T.textSub, marginBottom:8 }}>{bcForm.otpVerified?"✅ HR Verified":"📱 Send OTP to HR/Admin"}</div>
                {!bcForm.otpVerified && (
                  !bcForm.otpSent
                    ? <button className="btn" style={{ background:T.blue, color:"#fff" }} onClick={()=>bf("otpSent",true)}>📱 Send OTP</button>
                    : <div style={{ display:"flex", gap:8 }}>
                        <input value={bcForm.otp} onChange={e=>bf("otp",e.target.value)} placeholder="OTP" maxLength={6} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:18, letterSpacing:6, flex:1, textAlign:"center" }} />
                        <button className="btn" style={{ background:T.green, color:"#fff" }} onClick={()=>{ if(bcForm.otp.length>=4) bf("otpVerified",true); }}>Verify</button>
                      </div>
                )}
              </div>
              <div style={{ background:T.bgPanel, border:`1px solid ${bcForm.signatureCaptured?T.green:T.border}`, borderRadius:10, padding:12 }}>
                <div style={{ fontSize:11, fontWeight:700, color:bcForm.signatureCaptured?T.green:T.textSub, marginBottom:8 }}>{bcForm.signatureCaptured?"✅ HR Signature Captured":"✍️ Daily Trip Sheet Sign-off"}</div>
                {!bcForm.signatureCaptured ? (
                  <div style={{ background:T.bgCard, border:`2px dashed ${T.border}`, borderRadius:8, height:90, display:"flex", alignItems:"center", justifyContent:"center", cursor:"crosshair" }} onClick={()=>bcForm.otpVerified&&bf("signatureCaptured",true)}>
                    <div style={{ textAlign:"center", color:bcForm.otpVerified?T.textMuted:T.red }}>
                      <div style={{ fontSize:20, marginBottom:2 }}>{bcForm.otpVerified?"✍️":"🔒"}</div>
                      <div style={{ fontSize:11 }}>{bcForm.otpVerified?`${bcForm.reportingManager||"HR"} — sign to confirm trip`:"Verify OTP first"}</div>
                    </div>
                  </div>
                ) : (
                  <div style={{ background:T.greenGlow, borderRadius:8, padding:10 }}>
                    <div style={{ fontSize:12, color:T.green }}>✅ {bcForm.reportingManager} confirmed this trip</div>
                    <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>Pax: {bcForm.actualPax}/{bcForm.scheduledPax} · {bcForm.onTime?"On time":"Delayed"} · {new Date().toLocaleString()}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:16, paddingTop:14, borderTop:`1px solid ${T.border}` }}>
            <button className="btn btn-gh" onClick={()=>bcStep>1?setBcStep(s=>s-1):onClose()}>{bcStep===1?"Cancel":"← Back"}</button>
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ fontSize:11, color:T.textMuted, alignSelf:"center" }}>Step {bcStep} of 2</div>
              <button className="btn" style={{ background:bcStep===2?T.green:T.green, color:"#fff", fontWeight:700 }} onClick={()=>{ if(bcStep<2) setBcStep(s=>s+1); else { onSave(bcForm); onClose(); } }}>
                {bcStep===2?"🔒 Lock Trip Sheet":"Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const TRIP_ASSET_TYPES = {
  truck: {
    label:"Truck / Lorry",   icon:"🚛", color:"#3B82F6",
    desc:"6–18 wheeler, trailer, container, LCV — freight transport",
    steps:["Journey Type","Vehicle","Load & Freight","Driver & Crew","Costs & P&L","Review"],
    loadTypes:["FTL","LTL","ODC","Bulk","Liquid","Hazmat","Perishable"],
    billingBasis:"Per trip / per km / contract rate",
  },
  equipment: {
    label:"Heavy Equipment",  icon:"🏗️", color:"#F97316",
    desc:"JCB, Excavator, Crane, Roller, Grader — site deployment",
    steps:["Deployment Info","Equipment Select","Operator & Crew","Hours & Billing","Site Costs","Review"],
    loadTypes:["Earthmoving","Excavation","Compaction","Lifting","Grading","Concrete","Demolition"],
    billingBasis:"Per hour / daily minimum hours",
  },
  bus: {
    label:"Bus / Passenger",  icon:"🚌", color:"#10B981",
    desc:"Staff bus, school bus, contract carriage — passenger transport",
    steps:["Route Info","Bus Select","Driver & Crew","Passenger Details","Costs & Revenue","Review"],
    loadTypes:["Staff Transport","School Runs","Contract Carriage","Tourist","Daily Commute","Special Event"],
    billingBasis:"Per trip / monthly contract / per seat",
  },
};

const TripGeneratorModal = ({ onClose, onCreated, vehicleSource = "own", prefilledContractId = null }) => {
  const [assetType, setAssetType] = useState("truck");
  const [step, setStep] = useState(0);
  const [fleetSource, setFleetSource] = useState(vehicleSource);
  const [tripMode, setTripMode] = useState("new");          // "new" | "from_contract"
  const [selContractId, setSelContractId] = useState(prefilledContractId||"");
  const [form, setForm] = useState({
    // Common
    from:"", to:"", startDate:"", customer:"", notes:"",
    revenueModel:"TRANSPORT_ONLY",
    // Truck fields
    journeyType:"", loadType:"FTL",
    vehicleCategoryId:"", vehicleSubtypeId:"", vehicleWheels:"", vehicle:"", startOdometer:"",
    vendorId:"", vendorVehicle:"",
    driver:"", driverAdvance:"", driverAdvanceType:"Cash",
    secondDriver:"", d2Advance:"", d2AdvanceMode:"Cash", d2Role:"Co-Driver",
    cleanerName:"", cleanerPhone:"", cleanerAllowance:"", cleanerDays:"", rent:"",
    commodity:"", weight:"", freightAmount:"", advanceAmount:"", paymentType:"Account",
    dieselLitres:"", dieselAmount:"", tollCharges:"", loadingCharges:"", unloadingCharges:"",
    commission:"", commissionTo:"", miscCharges:"",
    returnFrom:"", returnTo:"", returnCustomer:"", returnFreight:"",
    relayPoint:"", relayDriver:"", leg1Km:"",
    leg2From:"", leg2To:"", leg2Customer:"",
    leg3From:"", leg3To:"", leg3Customer:"",
    frequency:"", contractPeriod:"",
    // Equipment-specific fields
    equipmentId:"", equipmentSite:"", equipmentClient:"", contractType:"Daily",
    plannedHours:"8", dailyMinHours:"8", mobilizationCharge:"", equipmentOperator:"",
    startEngineHours:"", workDescription:"", expectedDays:"1",
    // Bus-specific fields
    busId:"", passengerCount:"", routeStops:"", tripFrequency:"One-time",
    contractFare:"", perSeatFare:"", busDriver:"", busHelper:"", busHelperPay:"",
    busAdvance:"", busAdvanceMode:"Cash", pickupTime:"", dropTime:"",
    pax_organisation:"",
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // ── Contract prefill logic ─────────────────────────────────────────────────
  const activeContracts = FLEET_CONTRACTS_DATA_INIT; // use state in real app
  const selContract = activeContracts.find(c=>c.id===selContractId);

  const applyContractPrefill = (contract) => {
    if (!contract) return;
    const ctDef = CONTRACT_TYPE_DEFS[contract.assetType]?.find(x=>x.id===contract.contractTypeId);
    setAssetType(contract.assetType);
    const firstVehicle = (contract.vehicles||[])[0]||"";
    const firstDriver  = (contract.drivers||[])[0]||"";
    const firstRoute   = (contract.routes||[])[0]||{};
    const firstEq      = (contract.vehicles||[])[0]||""; // equipment stored as eq IDs for eq contracts
    setForm(f=>({
      ...f,
      // common
      customer:    contract.client||"",
      from:        firstRoute.from||"",
      to:          firstRoute.to||"",
      // truck
      vehicle:     firstVehicle,
      driver:      firstDriver,
      freightAmount: contract.ratePerTrip ? String(contract.ratePerTrip) : contract.monthlyRetainer ? String(contract.monthlyRetainer) : "",
      // equipment
      equipmentId: contract.selectedEquipment?.[0]||"",
      equipmentSite: contract.site||firstRoute.to||"",
      equipmentClient: contract.client||"",
      dailyMinHours: contract.shiftHours ? String(contract.shiftHours) : "8",
      mobilizationCharge: "",
      // bus
      busDriver:   firstDriver,
      pax_organisation: contract.client||"",
      contractFare: contract.ratePerTrip ? String(contract.ratePerTrip) : contract.monthlyRate ? String(contract.monthlyRate) : "",
      // contract link
      linkedContractId: contract.id,
      linkedContractType: contract.contractTypeId,
    }));
  };

  const atDef = TRIP_ASSET_TYPES[assetType];
  const steps = atDef.steps;
  const totalSteps = steps.length;

  const headerColors = {
    truck:"linear-gradient(135deg,#1746A2,#0F2D7A)",
    equipment:"linear-gradient(135deg,#1C1000,#3D2200,#F9731644)",
    bus:"linear-gradient(135deg,#064E3B,#065F46,#10B98133)",
  };

  const handleCreate = () => {
    const id = `TRP-2025-${String(Math.floor(Math.random()*900)+50).padStart(4,"0")}`;
    if (assetType === "equipment") {
      const eq = EQUIPMENT_DATA.find(e=>e.id===form.equipmentId);
      const billAmt = parseInt(form.plannedHours||8) * (eq?.hourlyRate||900);
      onCreated({
        id, vehicleType:"equipment", assetType:"equipment",
        route: form.equipmentSite || "Site Deployment",
        fromCity: form.from, toCity: form.equipmentSite,
        vehicle: eq?.regNo || form.equipmentId,
        driver: form.equipmentOperator || "—",
        customer: form.equipmentClient || form.customer,
        freight: billAmt,
        advance: 0,
        expenses:{ diesel: Math.round((parseInt(form.plannedHours)||8)*(eq?.fuelPerHour||8)*96), toll:0, loading:parseInt(form.mobilizationCharge||0), unloading:0, misc:0 },
        status:"Pre-Trip Pending",
        loadType: form.loadType || "Earthmoving",
        weight:"—",
        journeyType:"site-deployment",
        vehicleLabel: eq ? `${eq.model} · ${EQUIPMENT_TYPES[eq.type]?.label}` : "—",
        agent:"Direct",
        dateCreated:"2025-04-15",
        distanceKm: null,
        eqHours: parseInt(form.plannedHours||8),
        hourlyRate: eq?.hourlyRate||900,
        startEngineHours: parseInt(form.startEngineHours||eq?.engineHours||0),
      });
    } else if (assetType === "bus") {
      const fare = parseInt(form.contractFare||0) || parseInt(form.perSeatFare||0)*parseInt(form.passengerCount||1);
      onCreated({
        id, vehicleType:"bus", assetType:"bus",
        route: form.from && form.to ? `${form.from} → ${form.to}` : form.from,
        fromCity:form.from, toCity:form.to,
        vehicle: form.busId || "—",
        driver: form.busDriver || "—",
        customer: form.pax_organisation || form.customer,
        freight: fare,
        advance: parseInt(form.busAdvance||0),
        expenses:{ diesel:0, toll:parseInt(form.tollCharges||0), loading:0, unloading:0, misc:parseInt(form.miscCharges||0) },
        status:"Pre-Trip Pending",
        loadType: form.loadType || "Contract Carriage",
        weight: `${form.passengerCount||0} pax`,
        journeyType:"passenger",
        vehicleLabel:"Bus · Passenger",
        agent:"Direct",
        dateCreated:"2025-04-15",
        distanceKm:280,
        passengerCount:parseInt(form.passengerCount||0),
      });
    } else {
      const vtype = VEHICLE_SCHEMA.find(v => v.id===form.vehicleCategoryId);
      const totalCost = parseInt(form.dieselAmount||0)+parseInt(form.tollCharges||0)+parseInt(form.loadingCharges||0)+parseInt(form.unloadingCharges||0);
      onCreated({
        id, vehicleType:fleetSource, assetType:"truck",
        route:`${form.from} → ${form.to}`,
        fromCity:form.from, toCity:form.to,
        vehicle:fleetSource==="own"?form.vehicle:null,
        vendorVehicle:fleetSource==="vendor"?form.vendorVehicle:null,
        vendor:fleetSource==="vendor"?(VENDORS.find(v=>v.id===form.vendorId)?.name||null):null,
        driver:fleetSource==="own"?form.driver:"External Driver",
        driverId:fleetSource==="own"?(DRIVERS_DATA.find(d=>d.name===form.driver)?.id||null):null,
        customer:form.customer,
        freight:parseInt(form.freightAmount)||0,
        advance:parseInt(form.driverAdvance)||0,
        expenses:{ diesel:parseInt(form.dieselAmount)||0, toll:parseInt(form.tollCharges)||0, loading:parseInt(form.loadingCharges)||0, unloading:parseInt(form.unloadingCharges)||0, misc:parseInt(form.miscCharges)||0 },
        vendorCost:fleetSource==="vendor"?parseInt(form.freightAmount||0):undefined,
        status:"Pre-Trip Pending",
        loadType:form.loadType,
        weight:form.weight+"T",
        journeyType:form.journeyType,
        vehicleLabel:vtype?`${vtype.label} · ${form.vehicleWheels}`:"",
        agent:form.commissionTo||"Direct",
        dateCreated:"2025-04-15",
        distanceKm:480,
      });
    }
    onClose();
  };

  // ── ASSET TYPE SELECTOR (step 0) ──
  if (step === 0) {
    return (
      <div className="ov">
        <div className="modal" style={{ maxWidth:680 }}>
          <div className="mhdr" style={{ background:"linear-gradient(135deg,#080B10,#111520,#F59E0B22)", borderBottom:`1px solid ${T.accent}33` }}>
            <div>
              <div className="rj" style={{ fontSize:22, fontWeight:700, color:T.accent, letterSpacing:1 }}>📋 New Trip / Deployment</div>
              <div style={{ fontSize:12, color:T.textSub, marginTop:2 }}>Create from an active contract or start a new one-off trip</div>
            </div>
            <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
          </div>
          <div className="mbdy">
            {/* Mode selector */}
            <div className="toggle-pill" style={{ marginBottom:20, width:"100%" }}>
              <div className={`toggle-opt ${tripMode==="from_contract"?"on":""}`} style={{ flex:1, textAlign:"center" }} onClick={()=>setTripMode("from_contract")}>📋 From Contract</div>
              <div className={`toggle-opt ${tripMode==="new"?"on":""}`} style={{ flex:1, textAlign:"center" }} onClick={()=>setTripMode("new")}>✏️ New Ad-hoc Trip</div>
            </div>

            {/* FROM CONTRACT mode */}
            {tripMode==="from_contract" && (
              <div>
                <div style={{ fontSize:12, color:T.textSub, marginBottom:12 }}>Select an active contract — all rates, vehicle, driver, and route will be pre-filled in the trip sheet.</div>
                <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
                  {activeContracts.filter(c=>c.status==="ACTIVE").map(c=>{
                    const ctDef = CONTRACT_TYPE_DEFS[c.assetType]?.find(x=>x.id===c.contractTypeId);
                    const ac = { truck:T.blue, equipment:T.orange, bus:T.green }[c.assetType];
                    const ai = { truck:"🚛", equipment:"🏗️", bus:"🚌" }[c.assetType];
                    const sel = selContractId===c.id;
                    return (
                      <div key={c.id} onClick={()=>{ setSelContractId(c.id); applyContractPrefill(c); }} style={{ padding:"12px 14px", borderRadius:10, cursor:"pointer", border:`2px solid ${sel?ac:T.border}`, background:sel?ac+"14":T.bgPanel, display:"flex", gap:12, alignItems:"center", transition:"all .12s" }}>
                        <div style={{ width:40, height:40, borderRadius:8, background:sel?ac+"22":T.bgCard, border:`2px solid ${sel?ac:T.border}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{ai}</div>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:3 }}>
                            <span className="mono" style={{ fontSize:11, color:T.accent, fontWeight:700 }}>{c.id}</span>
                            <span className="badge" style={{ background:ac+"22", color:ac, fontSize:10 }}>{ctDef?.label||c.contractTypeId}</span>
                          </div>
                          <div style={{ fontSize:13, fontWeight:700, marginBottom:2 }}>{c.client}</div>
                          <div style={{ fontSize:11, color:T.textSub }}>
                            {c.routes?.[0]?.from&&c.routes?.[0]?.to?`${c.routes[0].from} → ${c.routes[0].to}`:c.site||"—"}
                            {c.hourlyRate?` · ₹${c.hourlyRate}/hr`:c.monthlyRetainer?` · ₹${(c.monthlyRetainer/1000).toFixed(0)}k/mo retainer`:c.monthlyRate?` · ₹${(c.monthlyRate/1000).toFixed(0)}k/mo`:""}
                            {c.vehicles?.length?` · ${c.vehicles.join(", ")}`:""}
                          </div>
                        </div>
                        {sel && <span style={{ fontSize:22, flexShrink:0 }}>✅</span>}
                      </div>
                    );
                  })}
                </div>
                {selContract && (
                  <div style={{ background:T.greenGlow, border:`1px solid ${T.green}33`, borderRadius:8, padding:10, fontSize:11, color:T.textSub, marginBottom:14 }}>
                    ✅ <strong style={{ color:T.green }}>Contract selected:</strong> Trip sheet will be pre-filled with {selContract.client}'s rates, routes, and assigned vehicles/drivers.
                    {selContract.assetType==="equipment" && " Equipment hours will be logged against this contract."}
                  </div>
                )}
              </div>
            )}

            {/* NEW AD-HOC TRIP mode — asset type selector */}
            {tripMode==="new" && (
              <div>
                <div style={{ fontSize:12, color:T.textSub, marginBottom:12 }}>What type of asset are you booking?</div>
                <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
                  {Object.entries(TRIP_ASSET_TYPES).map(([id, def]) => (
                    <div key={id} onClick={()=>setAssetType(id)}
                      style={{ padding:"14px 16px", borderRadius:12, cursor:"pointer", border:`2px solid ${assetType===id?def.color:T.border}`, background:assetType===id?def.color+"14":T.bgPanel, display:"flex", gap:16, alignItems:"center", transition:"all .15s" }}>
                      <div style={{ width:48, height:48, borderRadius:"50%", background:assetType===id?def.color+"22":T.bgCard, border:`2px solid ${assetType===id?def.color:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{def.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:14, fontWeight:700, color:assetType===id?def.color:T.text, marginBottom:3 }}>{def.label}</div>
                        <div style={{ fontSize:12, color:T.textSub, marginBottom:4 }}>{def.desc}</div>
                        <div style={{ fontSize:10, color:T.textMuted }}>Billing: {def.billingBasis}</div>
                      </div>
                      {assetType===id && <div style={{ fontSize:22 }}>✅</div>}
                    </div>
                  ))}
                </div>
                {(assetType==="truck"||assetType==="bus") && (
                  <div style={{ marginBottom:14 }}>
                    <label className="flabel">Fleet Source</label>
                    <div className="toggle-pill" style={{ width:"fit-content" }}>
                      <div className={`toggle-opt ${fleetSource==="own"?"on":""}`} onClick={()=>setFleetSource("own")}>🚚 Own Fleet</div>
                      <div className={`toggle-opt ${fleetSource==="vendor"?"on":""}`} onClick={()=>setFleetSource("vendor")}>🤝 Vendor</div>
                    </div>
                  </div>
                )}
                {assetType==="equipment" && (
                  <div style={{ background:T.orangeGlow, border:`1px solid ${T.orange}33`, borderRadius:8, padding:10, fontSize:11, color:T.textSub, marginBottom:14 }}>
                    🏗️ Equipment trip = Site deployment. Billing per running hour with daily minimum. Log engine hours daily from the site.
                  </div>
                )}
              </div>
            )}

            <div style={{ display:"flex", justifyContent:"flex-end", gap:8, paddingTop:14, borderTop:`1px solid ${T.border}` }}>
              <button className="btn btn-gh" onClick={onClose}>Cancel</button>
              {tripMode==="from_contract" ? (
                <button className="btn btn-p" disabled={!selContractId} style={{ opacity:selContractId?1:0.5 }} onClick={()=>setStep(1)}>
                  Continue with {selContract?.assetType==="equipment"?"🏗️ Equipment Deployment":selContract?.assetType==="bus"?"🚌 Bus Trip":"🚛 Truck Trip"} →
                </button>
              ) : (
                <button className="btn btn-p" onClick={()=>setStep(1)}>
                  Continue → {TRIP_ASSET_TYPES[assetType].icon} {TRIP_ASSET_TYPES[assetType].label}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── TRIP STEPS (step 1 onwards) ──
    if (step === 1) {
  return (
    <div className="ov">
      <div className="modal">
        <div className="mhdr" style={{ background:headerColors[assetType] }}>
          <div>
            <div className="rj" style={{ fontSize:22, fontWeight:700, color:"#fff", letterSpacing:1 }}>{atDef.icon} {atDef.label} — Trip Sheet</div>
            {form.linkedContractId && (
              <div style={{ display:"flex", gap:6, alignItems:"center", marginTop:4 }}>
                <span style={{ fontSize:11, background:"rgba(255,255,255,.15)", color:"#fff", padding:"2px 8px", borderRadius:12 }}>📋 Contract: {form.linkedContractId}</span>
                <span style={{ fontSize:11, color:"rgba(255,255,255,.7)" }}>{form.customer}</span>
              </div>
            )}
            <div style={{ fontSize:12, color:"rgba(255,255,255,.65)", marginTop:2 }}>Step {step} of {totalSteps} — {steps[step-1]}</div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {(assetType==="truck"||assetType==="bus") && (
              <div className="toggle-pill" style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.15)" }}>
                <div className={`toggle-opt ${fleetSource==="own"?"on":""}`} style={{ fontSize:11 }} onClick={()=>setFleetSource("own")}>🚚 Own</div>
                <div className={`toggle-opt ${fleetSource==="vendor"?"on":""}`} style={{ fontSize:11 }} onClick={()=>setFleetSource("vendor")}>🤝 Vendor</div>
              </div>
            )}
            <button className="btn" style={{ background:"rgba(255,255,255,.1)", color:"#fff", padding:"5px 9px" }} onClick={()=>{setStep(0);}}><Ic n="x" s={14} c="#fff" /></button>
          </div>
        </div>

        {/* Step bar */}
        <div style={{ padding:"14px 22px 0", background:T.bgPanel, borderBottom:`1px solid ${T.border}` }}>
          <div style={{ display:"flex", alignItems:"center", marginBottom:14 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", width:"100%" }}>
                  {i > 0 && <div className="step-line" style={{ background:step>i?atDef.color:T.border }} />}
                  <div className="step-dot" style={{ background:step===i+1?atDef.color:step>i+1?T.green:T.bgCard, border:`2px solid ${step===i+1?atDef.color:step>i+1?T.green:T.border}`, color:step>i+1?"#fff":step===i+1?"#080B10":T.textMuted, margin:"0 auto" }}>
                    {step > i+1 ? "✓" : i+1}
                  </div>
                  {i < totalSteps-1 && <div className="step-line" style={{ background:step>i+1?atDef.color:T.border }} />}
                </div>
                <div style={{ fontSize:9, color:step===i+1?atDef.color:T.textMuted, marginTop:4, whiteSpace:"nowrap" }}>{s}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mbdy">

          {/* ═══════ TRUCK STEPS ═══════ */}
          {assetType==="truck" && step===1 && (
            <div>
              <JourneyTypeSelector form={form} set={set} />
              {/* Revenue Model Selector */}
              <div style={{ marginTop:18, paddingTop:16, borderTop:`1px solid ${T.border}33` }}>
                <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:4 }}>Revenue Model *</div>
                <div style={{ fontSize:11, color:T.textMuted, marginBottom:10 }}>How will this trip generate revenue? This determines consignment structure, invoice type, and POD workflow.</div>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {Object.entries(REVENUE_MODELS).map(([id,rm])=>(
                    <div key={id} onClick={()=>set("revenueModel",id)} style={{ padding:"12px 14px", borderRadius:10, cursor:"pointer", border:`2px solid ${form.revenueModel===id?rm.color:T.border}`, background:form.revenueModel===id?rm.color+"12":T.bgPanel, display:"flex", gap:12, alignItems:"center", transition:"all .12s" }}>
                      <span style={{ fontSize:22, flexShrink:0 }}>{rm.icon}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:form.revenueModel===id?rm.color:T.text }}>{rm.label}</div>
                        <div style={{ fontSize:11, color:T.textSub, marginTop:2 }}>{rm.desc}</div>
                        <div style={{ fontSize:10, color:T.textMuted, marginTop:2, fontStyle:"italic" }}>{rm.useCase}</div>
                      </div>
                      {form.revenueModel===id && <span style={{ fontSize:18 }}>✅</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {assetType==="truck" && step===2 && (
            fleetSource==="own" ? <VehicleTypeSelector form={form} set={set} /> : (
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:T.purple, marginBottom:14 }}>🤝 Vendor Vehicle Selection</div>
                <div style={{ padding:12, background:T.purpleGlow, border:`1px solid ${T.purple}33`, borderRadius:8, marginBottom:14, fontSize:12, color:T.textSub }}>💡 No driver advance or diesel expense needed — vendor manages their own driver and fuel</div>
                <div className="frow fr2">
                  <div><label className="flabel">Select Vendor</label><select value={form.vendorId} onChange={e=>set("vendorId",e.target.value)}><option value="">Choose vendor</option>{VENDORS.map(v=><option key={v.id} value={v.id}>{v.name} (★{v.rating}) — ₹{v.ratePerKm}/km</option>)}</select></div>
                  <div><label className="flabel">Vendor Vehicle</label><select value={form.vendorVehicle} onChange={e=>set("vendorVehicle",e.target.value)}><option value="">Choose vehicle</option>{VENDOR_VEHICLES.map(v=><option key={v.id}>{v.regNo} — {v.type}</option>)}</select></div>
                </div>
              </div>
            )
          )}
          {assetType==="truck" && step===3 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:14 }}>📦 Load & Freight Details</div>
              <div className="frow fr3">
                <div><label className="flabel">Load Type</label><select value={form.loadType} onChange={e=>set("loadType",e.target.value)}>{atDef.loadTypes.map(l=><option key={l}>{l}</option>)}</select></div>
                <div><label className="flabel">Commodity</label><input value={form.commodity} onChange={e=>set("commodity",e.target.value)} placeholder="Steel coils, cement bags..." /></div>
                <div><label className="flabel">Weight (T)</label><input value={form.weight} onChange={e=>set("weight",e.target.value)} placeholder="22" /></div>
              </div>
              <div className="frow fr2">
                <div><label className="flabel">Customer / Consignee</label><input value={form.customer} onChange={e=>set("customer",e.target.value)} placeholder="Client name" /></div>
                <div><label className="flabel">Freight Amount (₹)</label><input value={form.freightAmount} onChange={e=>set("freightAmount",e.target.value)} placeholder="45000" /></div>
              </div>
              <div className="frow fr3">
                <div><label className="flabel">Payment Type</label><select value={form.paymentType} onChange={e=>set("paymentType",e.target.value)}><option>Account</option><option>Cash</option><option>Credit 30d</option><option>Credit 60d</option></select></div>
                <div><label className="flabel">Advance Amount (₹)</label><input value={form.advanceAmount} onChange={e=>set("advanceAmount",e.target.value)} placeholder="20000" /></div>
                <div><label className="flabel">Start Date</label><input type="date" value={form.startDate} onChange={e=>set("startDate",e.target.value)} /></div>
              </div>
            </div>
          )}
          {assetType==="truck" && step===4 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:4 }}>👤 Driver & Crew Assignment</div>
              <div style={{ fontSize:11, color:T.textSub, marginBottom:14 }}>Assign primary driver, optional co-driver for long haul, and cleaner/khalasi for loading assistance.</div>
              {fleetSource==="own" ? (
                <>
                  {/* PRIMARY DRIVER */}
                  <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginBottom:12 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:T.accent, textTransform:"uppercase", letterSpacing:".06em", marginBottom:8 }}>🚛 Driver 1 — Primary (Mandatory)</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:10 }}>
                      {DRIVERS_DATA.filter(d=>d.status==="Available").map(d=>(
                        <div key={d.id} onClick={()=>set("driver",d.name)} style={{ padding:"9px 12px", borderRadius:8, cursor:"pointer", border:`2px solid ${form.driver===d.name?T.accent:T.border}`, background:form.driver===d.name?T.accentGlow:T.bgCard, display:"flex", alignItems:"center", justifyContent:"space-between", transition:"all .12s" }}>
                          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                            <div style={{ width:32, height:32, borderRadius:"50%", background:T.bgPanel, border:`1px solid ${T.accent}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:T.accent }}>{d.name[0]}</div>
                            <div><div style={{ fontSize:13, fontWeight:600 }}>{d.name}</div><div style={{ fontSize:11, color:T.textSub }}>{d.phone} · CDL {d.cdl}</div></div>
                          </div>
                          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                            <div style={{ textAlign:"right" }}><div style={{ fontSize:12, color:d.score>80?T.green:T.accent, fontWeight:700 }}>⭐ {d.score}</div></div>
                            {form.driver===d.name && <span style={{ fontSize:16 }}>✅</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                      <div><label className="flabel">Driver 1 Advance (₹)</label><input value={form.driverAdvance} onChange={e=>set("driverAdvance",e.target.value)} placeholder="5000" /></div>
                      <div><label className="flabel">Payment Mode</label><select value={form.driverAdvanceType} onChange={e=>set("driverAdvanceType",e.target.value)}><option>Cash</option><option>UPI</option><option>Account Transfer</option></select></div>
                      <div><label className="flabel">Driver Rental (₹)</label><input value={form.rent} onChange={e=>set("rent",e.target.value)} placeholder="0" /></div>
                    </div>
                  </div>
                  {/* SECOND DRIVER */}
                  <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginBottom:12 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:T.blue, textTransform:"uppercase", letterSpacing:".06em", marginBottom:4 }}>🔄 Driver 2 — Co-Driver <span style={{ fontSize:10, color:T.textMuted, fontWeight:400, textTransform:"none" }}>(Optional — for 800+ km routes)</span></div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:7, marginBottom:8 }}>
                      <div onClick={()=>set("secondDriver","")} style={{ padding:"7px 10px", borderRadius:7, cursor:"pointer", border:`2px solid ${form.secondDriver===""?T.textMuted:T.border}`, background:form.secondDriver===""?T.bgCard:T.bgPanel, fontSize:11, color:T.textMuted, textAlign:"center" }}>✕ None</div>
                      {DRIVERS_DATA.filter(d=>d.status!=="On Trip"&&d.name!==form.driver).map(d=>(
                        <div key={d.id} onClick={()=>set("secondDriver",d.name)} style={{ padding:"8px 10px", borderRadius:8, cursor:"pointer", border:`2px solid ${form.secondDriver===d.name?T.blue:T.border}`, background:form.secondDriver===d.name?T.blueGlow:T.bgCard, display:"flex", gap:8, alignItems:"center", transition:"all .12s" }}>
                          <div style={{ width:26,height:26,borderRadius:"50%",background:T.bgPanel,border:`1px solid ${T.blue}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:T.blue }}>{d.name[0]}</div>
                          <div><div style={{ fontSize:11, fontWeight:600 }}>{d.name}</div><div style={{ fontSize:10, color:T.textMuted }}>CDL {d.cdl}</div></div>
                          {form.secondDriver===d.name && <span style={{ marginLeft:"auto", fontSize:14 }}>✅</span>}
                        </div>
                      ))}
                    </div>
                    {form.secondDriver && (
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                        <div><label className="flabel">Driver 2 Advance (₹)</label><input value={form.d2Advance||""} onChange={e=>set("d2Advance",e.target.value)} placeholder="3000" /></div>
                        <div><label className="flabel">Payment Mode</label><select value={form.d2AdvanceMode||"Cash"} onChange={e=>set("d2AdvanceMode",e.target.value)}><option>Cash</option><option>UPI</option><option>Account Transfer</option></select></div>
                        <div><label className="flabel">Role</label><select value={form.d2Role||"Co-Driver"} onChange={e=>set("d2Role",e.target.value)}><option>Co-Driver</option><option>Relief Driver</option><option>Relay Handoff</option><option>Trainee</option></select></div>
                      </div>
                    )}
                  </div>
                  {/* CLEANER */}
                  <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:T.purple, textTransform:"uppercase", letterSpacing:".06em", marginBottom:8 }}>🧹 Cleaner / Khalasi <span style={{ fontSize:10, color:T.textMuted, fontWeight:400, textTransform:"none" }}>(Optional)</span></div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:8 }}>
                      <div><label className="flabel">Cleaner Name</label><input value={form.cleanerName||""} onChange={e=>set("cleanerName",e.target.value)} placeholder="Name (if assigned)" /></div>
                      <div><label className="flabel">Cleaner Phone</label><input value={form.cleanerPhone||""} onChange={e=>set("cleanerPhone",e.target.value)} placeholder="+91 99999 00000" /></div>
                    </div>
                    {form.cleanerName && (
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                        <div><label className="flabel">Daily Allowance (₹/day)</label><input value={form.cleanerAllowance||""} onChange={e=>set("cleanerAllowance",e.target.value)} placeholder="500" /></div>
                        <div><label className="flabel">Trip Duration (days)</label><input value={form.cleanerDays||""} onChange={e=>set("cleanerDays",e.target.value)} placeholder="3" /></div>
                        <div><label className="flabel">Total Cleaner Cost</label><div style={{ padding:"7px 10px", background:T.bgCard, borderRadius:7, fontSize:12, fontWeight:700, color:T.purple }}>{form.cleanerAllowance&&form.cleanerDays?fmt(parseInt(form.cleanerAllowance)*parseInt(form.cleanerDays)):"₹ —"}</div></div>
                      </div>
                    )}
                  </div>
                  {(form.driver||form.secondDriver||form.cleanerName) && (
                    <div style={{ background:T.accentGlow, border:`1px solid ${T.accent}33`, borderRadius:8, padding:10, marginTop:10 }}>
                      <div style={{ fontSize:11, fontWeight:700, color:T.accent, marginBottom:6 }}>👥 Crew Summary</div>
                      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                        {form.driver && <div style={{ background:T.bgCard, borderRadius:7, padding:"5px 10px", fontSize:11 }}><span style={{ color:T.textMuted }}>Driver 1: </span><strong>{form.driver}</strong>{form.driverAdvance?<span style={{ color:T.accent }}> · ₹{parseInt(form.driverAdvance).toLocaleString()} adv</span>:""}</div>}
                        {form.secondDriver && <div style={{ background:T.bgCard, borderRadius:7, padding:"5px 10px", fontSize:11 }}><span style={{ color:T.textMuted }}>Driver 2: </span><strong>{form.secondDriver}</strong></div>}
                        {form.cleanerName && <div style={{ background:T.bgCard, borderRadius:7, padding:"5px 10px", fontSize:11 }}><span style={{ color:T.textMuted }}>Cleaner: </span><strong>{form.cleanerName}</strong></div>}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ padding:20, background:T.purpleGlow, border:`1px solid ${T.purple}33`, borderRadius:10, textAlign:"center" }}>
                  <div style={{ fontSize:14, fontWeight:600, color:T.purple, marginBottom:8 }}>🤝 Vendor Trip — Driver Managed by Vendor</div>
                  <div style={{ fontSize:12, color:T.textSub }}>The vendor ({VENDORS.find(v=>v.id===form.vendorId)?.name||"selected vendor"}) assigns their own driver and handles fuel & crew expenses.</div>
                </div>
              )}
            </div>
          )}
          {assetType==="truck" && step===5 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:14 }}>💰 Costs & P&L Projection</div>
              {fleetSource==="own" ? (
                <>
                  <div className="frow fr3">
                    <div><label className="flabel">Diesel (Litres)</label><input value={form.dieselLitres} onChange={e=>set("dieselLitres",e.target.value)} placeholder="200" /></div>
                    <div><label className="flabel">Diesel Amount (₹)</label><input value={form.dieselAmount} onChange={e=>set("dieselAmount",e.target.value)} placeholder="19200" /></div>
                    <div><label className="flabel">Toll Charges (₹)</label><input value={form.tollCharges} onChange={e=>set("tollCharges",e.target.value)} placeholder="2500" /></div>
                  </div>
                  <div className="frow fr3">
                    <div><label className="flabel">Loading (₹)</label><input value={form.loadingCharges} onChange={e=>set("loadingCharges",e.target.value)} placeholder="1500" /></div>
                    <div><label className="flabel">Unloading (₹)</label><input value={form.unloadingCharges} onChange={e=>set("unloadingCharges",e.target.value)} placeholder="1500" /></div>
                    <div><label className="flabel">Misc (₹)</label><input value={form.miscCharges} onChange={e=>set("miscCharges",e.target.value)} placeholder="500" /></div>
                  </div>
                  <div className="frow fr2">
                    <div><label className="flabel">Agent Commission (₹)</label><input value={form.commission} onChange={e=>set("commission",e.target.value)} placeholder="2000" /></div>
                    <div><label className="flabel">Commission To</label><input value={form.commissionTo} onChange={e=>set("commissionTo",e.target.value)} placeholder="Agent / broker name" /></div>
                  </div>
                  {form.freightAmount && (
                    <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginTop:8 }}>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                        {[
                          { label:"Freight", val:parseInt(form.freightAmount||0), c:T.green },
                          { label:"Total Cost", val:parseInt(form.dieselAmount||0)+parseInt(form.tollCharges||0)+parseInt(form.loadingCharges||0)+parseInt(form.unloadingCharges||0)+parseInt(form.commission||0)+parseInt(form.miscCharges||0), c:T.red },
                          { label:"Est. Margin", val:parseInt(form.freightAmount||0)-parseInt(form.dieselAmount||0)-parseInt(form.tollCharges||0)-parseInt(form.loadingCharges||0)-parseInt(form.unloadingCharges||0)-parseInt(form.commission||0)-parseInt(form.miscCharges||0), c:T.accent },
                        ].map(k=><div key={k.label}><div style={{ fontSize:10, color:T.textSub }}>{k.label}</div><div className="rj" style={{ fontSize:22, fontWeight:700, color:k.c }}>₹{k.val.toLocaleString()}</div></div>)}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ padding:14, background:T.purpleGlow, border:`1px solid ${T.purple}33`, borderRadius:10 }}>
                  <div style={{ fontSize:12, color:T.textSub }}>Vendor trip — Total freight: <strong style={{ color:T.green }}>₹{parseInt(form.freightAmount||0).toLocaleString()}</strong></div>
                </div>
              )}
            </div>
          )}
          {assetType==="truck" && step===6 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:16 }}>✅ Review & Confirm — Truck Trip</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
                {[
                  { label:"Journey Type", value:JOURNEY_TYPES.find(j=>j.id===form.journeyType)?.label||"—" },
                  { label:"Route", value:form.from&&form.to?`${form.from} → ${form.to}`:"—" },
                  { label:"Fleet Source", value:fleetSource==="own"?"Own Fleet":"Vendor" },
                  { label:"Vehicle", value:fleetSource==="own"?(form.vehicle||"—"):(form.vendorVehicle||"—") },
                  { label:"Driver 1", value:fleetSource==="own"?(form.driver||"—"):"Vendor-assigned" },
                  { label:"Driver 2", value:fleetSource==="own"?(form.secondDriver||"Not assigned"):"—" },
                  { label:"Cleaner", value:fleetSource==="own"?(form.cleanerName||"Not assigned"):"—" },
                  { label:"Customer", value:form.customer||"—" },
                  { label:"Load", value:`${form.loadType} · ${form.weight||"—"}T` },
                  { label:"Freight", value:form.freightAmount?`₹${parseInt(form.freightAmount).toLocaleString()}`:"—" },
                ].map(r=>(
                  <div key={r.label} style={{ background:T.bgPanel, borderRadius:8, padding:"10px 14px" }}>
                    <div style={{ fontSize:10, color:T.textMuted, textTransform:"uppercase", letterSpacing:"0.06em" }}>{r.label}</div>
                    <div style={{ fontSize:13, fontWeight:500, marginTop:2 }}>{r.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:T.accentGlow, border:`1px solid ${T.accent}33`, borderRadius:10, padding:12, fontSize:12, color:T.textSub }}>
                <strong style={{ color:T.accent }}>Next Step:</strong> Trip created as <strong style={{ color:T.orange }}>Pre-Trip Pending</strong>. {fleetSource==="own"?"Driver must complete vehicle inspection before departure.":"Vendor confirms pickup and driver assignment."}
              </div>
            </div>
          )}

          {/* ═══════ HEAVY EQUIPMENT STEPS ═══════ */}
          {assetType==="equipment" && step===1 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.orange, marginBottom:16 }}>Step 1 — Deployment & Site Information</div>
              <div style={{ background:T.orangeGlow, border:`1px solid ${T.orange}33`, borderRadius:8, padding:10, marginBottom:14, fontSize:11, color:T.textSub }}>
                🏗️ Equipment deployments are site-based. Every day at the site, engine hours are logged and billed to the client based on the contract rate.
              </div>
              <div className="frow fr2">
                <div><label className="flabel">Deployment Site / Project Name *</label><input value={form.equipmentSite} onChange={e=>set("equipmentSite",e.target.value)} placeholder="Madurai Bypass NH7, km 14–18" /></div>
                <div><label className="flabel">Client / Contractor *</label><input value={form.equipmentClient} onChange={e=>set("equipmentClient",e.target.value)} placeholder="NHAI / L&T / TIDCO..." /></div>
              </div>
              <div className="frow fr2">
                <div><label className="flabel">Deployment Start Date</label><input type="date" value={form.startDate} onChange={e=>set("startDate",e.target.value)} /></div>
                <div><label className="flabel">Expected Duration (days)</label><input value={form.expectedDays} onChange={e=>set("expectedDays",e.target.value)} placeholder="30" /></div>
              </div>
              <div className="frow fr2">
                <div><label className="flabel">Work Type</label><select value={form.loadType} onChange={e=>set("loadType",e.target.value)}>{atDef.loadTypes.map(l=><option key={l}>{l}</option>)}</select></div>
                <div><label className="flabel">Contract Type</label><select value={form.contractType} onChange={e=>set("contractType",e.target.value)}><option>Daily</option><option>Monthly</option><option>Per Hour</option><option>Per KM</option></select></div>
              </div>
              <div><label className="flabel">Work Description</label><textarea value={form.workDescription} onChange={e=>set("workDescription",e.target.value)} placeholder="e.g. Trench excavation for underground pipeline, hard soil, 320m route..." style={{ height:60 }} /></div>
            </div>
          )}
          {assetType==="equipment" && step===2 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.orange, marginBottom:16 }}>Step 2 — Select Equipment</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
                {EQUIPMENT_DATA.map(eq=>{
                  const espec = EQUIPMENT_TYPES[eq.type];
                  const hrsToSvc = eq.nextServiceHours - eq.engineHours;
                  const isAvail = eq.status==="Available";
                  return (
                    <div key={eq.id} onClick={()=>{ if(isAvail) set("equipmentId",eq.id); }}
                      style={{ padding:"12px 14px", borderRadius:10, cursor:isAvail?"pointer":"not-allowed", border:`2px solid ${form.equipmentId===eq.id?T.orange:isAvail?T.border:T.border+"55"}`, background:form.equipmentId===eq.id?T.orangeGlow:isAvail?T.bgPanel:T.bgPanel+"88", display:"flex", gap:12, alignItems:"center", opacity:isAvail?1:0.5, transition:"all .12s" }}>
                      <span style={{ fontSize:26 }}>{espec?.icon||"🏗️"}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:3 }}>
                          <span style={{ fontSize:13, fontWeight:700 }}>{eq.regNo}</span>
                          <span style={{ fontSize:11, color:T.textSub }}>— {eq.model}</span>
                          <span className={`badge ${isAvail?"bg":"bo"}`}>{eq.status}</span>
                        </div>
                        <div style={{ display:"flex", gap:14, fontSize:11, color:T.textMuted }}>
                          <span>⏱ {eq.engineHours.toLocaleString()} hrs</span>
                          <span>💰 ₹{eq.hourlyRate}/hr</span>
                          <span>⛽ {eq.fuelPerHour}L/hr</span>
                          <span style={{ color:hrsToSvc<100?T.red:T.green }}>🔧 PM in {hrsToSvc} hrs</span>
                        </div>
                      </div>
                      {form.equipmentId===eq.id && <span style={{ fontSize:20 }}>✅</span>}
                      {!isAvail && <span style={{ fontSize:11, color:T.orange }}>On Site</span>}
                    </div>
                  );
                })}
              </div>
              {form.equipmentId && (
                <div style={{ background:T.orangeGlow, border:`1px solid ${T.orange}33`, borderRadius:8, padding:10, fontSize:11 }}>
                  <div style={{ color:T.orange, fontWeight:700, marginBottom:4 }}>🤖 AI Billing Preview</div>
                  {(() => {
                    const eq = EQUIPMENT_DATA.find(e=>e.id===form.equipmentId);
                    const days = parseInt(form.expectedDays||1);
                    const hrs = days * parseInt(form.dailyMinHours||8);
                    const bill = hrs * (eq?.hourlyRate||900);
                    const fuel = hrs * (eq?.fuelPerHour||8) * 96;
                    return (
                      <div style={{ display:"flex", gap:16 }}>
                        <span style={{ color:T.textSub }}>{days} days × {form.dailyMinHours||8} hrs min = <strong style={{ color:T.orange }}>{hrs} hrs</strong></span>
                        <span style={{ color:T.textSub }}>Billing: <strong style={{ color:T.green }}>₹{bill.toLocaleString()}</strong></span>
                        <span style={{ color:T.textSub }}>Fuel est.: <strong style={{ color:T.accent }}>₹{fuel.toLocaleString()}</strong></span>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
          {assetType==="equipment" && step===3 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.orange, marginBottom:16 }}>Step 3 — Operator, Crew & Pre-Deployment Check</div>
              {/* Crew section */}
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginBottom:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.orange, marginBottom:10 }}>👷 Crew Assignment</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                  <div><label className="flabel">Equipment Operator *</label><select value={form.equipmentOperator} onChange={e=>set("equipmentOperator",e.target.value)}><option value="">Select operator</option>{DRIVERS_DATA.map(d=><option key={d.id}>{d.name}</option>)}<option>Site-supplied operator</option></select></div>
                  <div><label className="flabel">Operator Daily Wage (₹)</label><input placeholder="600" onChange={e=>set("operatorWage",e.target.value)} /></div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  <div><label className="flabel">Helper / Oiler (Lubrication Attendant)</label><input placeholder="Name" onChange={e=>set("equipHelper",e.target.value)} /></div>
                  <div><label className="flabel">Helper Daily Wage (₹)</label><input placeholder="450" onChange={e=>set("equipHelperWage",e.target.value)} /></div>
                </div>
              </div>
              {/* Pre-deployment check */}
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.cyan, marginBottom:4 }}>🔍 Pre-Deployment Equipment Check</div>
                <div style={{ fontSize:11, color:T.textMuted, marginBottom:10 }}>Confirm machine readiness before dispatch to site. All critical items must be OK to proceed.</div>
                {(() => {
                  const selEqData = EQUIPMENT_DATA.find(e=>e.id===form.equipmentId);
                  const spec2 = selEqData ? EQUIPMENT_TYPES[selEqData.type] : null;
                  const isTracks = ["excavator","miniexcav"].includes(selEqData?.type||"");
                  const checks = [
                    { key:"chk_engine",    label:"Engine oil level checked",           cat:"engine"   },
                    { key:"chk_hydraulic", label:"Hydraulic oil & fluid levels OK",    cat:"engine"   },
                    { key:"chk_cooling",   label:"Coolant / radiator water level OK",  cat:"engine"   },
                    { key:"chk_battery",   label:`Battery voltage OK (||"12":"12"V system)`, cat:"electrical" },
                    { key:"chk_lights",    label:"Beacon / work lights functional",    cat:"electrical"},
                    ...(isTracks ? [
                      { key:"chk_tracks",  label:"Track tension & condition checked",  cat:"undercarriage" },
                      { key:"chk_sprocket",label:"Sprockets & idlers inspected",       cat:"undercarriage" },
                    ] : [
                      { key:"chk_tyres",   label:"Tyre pressure & condition OK",       cat:"tyres"    },
                    ]),
                    { key:"chk_bucket",    label:"Attachment (bucket/blade) secured",  cat:"attachment"},
                    { key:"chk_safety",    label:"Seat belt, ROPS/FOPS cage intact",   cat:"safety"   },
                    { key:"chk_fire",      label:"Fire extinguisher on board",         cat:"safety"   },
                    { key:"chk_docs",      label:"Insurance & permit documents in cab", cat:"compliance"},
                    { key:"chk_fuel",      label:"Fuel tank filled, fuel card issued", cat:"fuel"     },
                  ];
                  const catColors = { engine:T.blue, electrical:T.accent, tyres:T.cyan, undercarriage:T.cyan, attachment:T.orange, safety:T.red, compliance:T.purple, fuel:T.green };
                  return (
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                      {checks.map(c => {
                        const val = form[c.key];
                        return (
                          <div key={c.key} onClick={()=>set(c.key, val==="ok"?"issue":val==="issue"?"na":"ok")} style={{ display:"flex", gap:8, alignItems:"center", padding:"7px 10px", borderRadius:7, cursor:"pointer", background:val==="ok"?T.greenGlow:val==="issue"?T.redGlow:T.bgCard, border:`1px solid ${val==="ok"?T.green:val==="issue"?T.red:T.border}33`, transition:"all .12s" }}>
                            <span style={{ fontSize:16, flexShrink:0 }}>
                              {val==="ok"?"✅":val==="issue"?"❌":"⬜"}
                            </span>
                            <div>
                              <div style={{ fontSize:11, color:val==="ok"?T.green:val==="issue"?T.red:T.text }}>{c.label}</div>
                              <div style={{ fontSize:9, color:catColors[c.cat]||T.textMuted }}>{c.cat.toUpperCase()}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
                <div style={{ marginTop:10, fontSize:11, color:T.textMuted }}>Tap each item: ⬜ unchecked → ✅ OK → ❌ Issue → ⬜</div>
                {/* Work description */}
                <div style={{ marginTop:12 }}>
                  <label className="flabel">Planned Work / Task Description</label>
                  <textarea value={form.workDescription||""} onChange={e=>set("workDescription",e.target.value)} placeholder="e.g. Trench excavation for 500m pipeline route, hard soil conditions, 3m depth..." style={{ height:55 }} />
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:10 }}>
                  <div><label className="flabel">Site Safety Officer</label><input placeholder="Name / contact" onChange={e=>set("safetyOfficer",e.target.value)} /></div>
                  <div><label className="flabel">Mobilization / Transport Charge (₹)</label><input value={form.mobilizationCharge||""} onChange={e=>set("mobilizationCharge",e.target.value)} placeholder="25000" /></div>
                </div>
              </div>
            </div>
          )}
          {assetType==="equipment" && step===4 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.orange, marginBottom:16 }}>Step 4 — Hours & Billing Setup</div>
              <div className="frow fr3">
                <div><label className="flabel">Daily Minimum Hours *</label><input value={form.dailyMinHours} onChange={e=>set("dailyMinHours",e.target.value)} placeholder="8" /></div>
                <div><label className="flabel">Planned Hours/Day</label><input value={form.plannedHours} onChange={e=>set("plannedHours",e.target.value)} placeholder="8" /></div>
                <div><label className="flabel">Start Engine Hours</label><input value={form.startEngineHours} onChange={e=>set("startEngineHours",e.target.value)} placeholder={(EQUIPMENT_DATA.find(e=>e.id===form.equipmentId)?.engineHours||0)} /></div>
              </div>
              {/* Billing summary */}
              {form.equipmentId && (
                <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginTop:4 }}>
                  <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:10 }}>💰 Billing Contract Preview</div>
                  {(() => {
                    const eq = EQUIPMENT_DATA.find(e=>e.id===form.equipmentId);
                    const days = parseInt(form.expectedDays||1);
                    const minHrs = parseInt(form.dailyMinHours||8);
                    const totalBillHrs = days * minHrs;
                    const totalBill = totalBillHrs * (eq?.hourlyRate||900);
                    const fuelCost = totalBillHrs * (eq?.fuelPerHour||8) * 96;
                    const mobil = parseInt(form.mobilizationCharge||0);
                    const margin = totalBill - fuelCost - mobil;
                    return (
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
                        {[{ l:"Total Billed Hrs",v:`${totalBillHrs} hrs`,c:T.orange },{ l:"Billing Amount",v:fmt(totalBill),c:T.green },{ l:"Fuel Cost",v:fmt(fuelCost),c:T.red },{ l:"Estimated Margin",v:fmt(margin),c:T.accent }].map(k=>(
                          <div key={k.l} style={{ background:T.bgCard, borderRadius:8, padding:"9px 10px" }}><div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div><div style={{ fontSize:13, fontWeight:700, color:k.c, marginTop:2 }}>{k.v}</div></div>
                        ))}
                      </div>
                    );
                  })()}
                  <div style={{ fontSize:10, color:T.orange, marginTop:8 }}>⚠️ Daily minimum {form.dailyMinHours||8} hrs enforced — client billed for minimum even if machine runs fewer hours.</div>
                </div>
              )}
            </div>
          )}
          {assetType==="equipment" && step===5 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.orange, marginBottom:16 }}>Step 5 — Site Costs</div>
              <div className="frow fr3">
                <div><label className="flabel">Transport / Mobilization (₹)</label><input value={form.mobilizationCharge} onChange={e=>set("mobilizationCharge",e.target.value)} placeholder="25000" /></div>
                <div><label className="flabel">Toll / Permit (₹)</label><input value={form.tollCharges} onChange={e=>set("tollCharges",e.target.value)} placeholder="3500" /></div>
                <div><label className="flabel">Misc / Camp Expenses (₹)</label><input value={form.miscCharges} onChange={e=>set("miscCharges",e.target.value)} placeholder="5000" /></div>
              </div>
            </div>
          )}
          {assetType==="equipment" && step===6 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:16 }}>✅ Review — Equipment Deployment Sheet</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                {(() => {
                  const eq = EQUIPMENT_DATA.find(e=>e.id===form.equipmentId);
                  return [
                    { label:"Equipment", value:eq?`${eq.model} (${eq.regNo})`:"—" },
                    { label:"Deployment Site", value:form.equipmentSite||"—" },
                    { label:"Client", value:form.equipmentClient||"—" },
                    { label:"Work Type", value:form.loadType },
                    { label:"Daily Min Hours", value:`${form.dailyMinHours||8} hrs/day` },
                    { label:"Billing Rate", value:eq?`₹${eq.hourlyRate}/hr`:"—" },
                    { label:"Expected Days", value:`${form.expectedDays||"—"} days` },
                    { label:"Mobilization", value:form.mobilizationCharge?fmt(parseInt(form.mobilizationCharge)):"—" },
                    { label:"Operator", value:form.equipmentOperator||"—" },
                    { label:"Start Engine Hours", value:`${form.startEngineHours||eq?.engineHours||0} hrs` },
                  ].map(r=>(
                    <div key={r.label} style={{ background:T.bgPanel, borderRadius:8, padding:"10px 14px" }}>
                      <div style={{ fontSize:10, color:T.textMuted, textTransform:"uppercase", letterSpacing:"0.06em" }}>{r.label}</div>
                      <div style={{ fontSize:13, fontWeight:500, marginTop:2 }}>{r.value}</div>
                    </div>
                  ));
                })()}
              </div>
              <div style={{ background:T.orangeGlow, border:`1px solid ${T.orange}33`, borderRadius:10, padding:12, fontSize:12, color:T.textSub }}>
                <strong style={{ color:T.orange }}>Next Step:</strong> Deployment sheet created as <strong>Active Site</strong>. Log engine hours daily from Heavy Equipment → Hours Log tab.
              </div>
            </div>
          )}

          {/* ═══════ BUS / PASSENGER STEPS ═══════ */}
          {assetType==="bus" && step===1 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:16 }}>Step 1 — Route & Passenger Details</div>
              <div style={{ background:T.greenGlow, border:`1px solid ${T.green}33`, borderRadius:8, padding:10, marginBottom:14, fontSize:11, color:T.textSub }}>
                🚌 Passenger transport — enter pickup/drop points, passenger count, and client organisation. Freight/weight fields are replaced by passenger and fare details.
              </div>
              <div className="frow fr2">
                <div><label className="flabel">From / Pickup Point *</label><input value={form.from} onChange={e=>set("from",e.target.value)} placeholder="Madurai Bus Stand" /></div>
                <div><label className="flabel">To / Drop Point *</label><input value={form.to} onChange={e=>set("to",e.target.value)} placeholder="Chennai Central" /></div>
              </div>
              <div className="frow fr3">
                <div><label className="flabel">Client / Organisation *</label><input value={form.pax_organisation} onChange={e=>set("pax_organisation",e.target.value)} placeholder="ABC Pvt Ltd, School name..." /></div>
                <div><label className="flabel">Service Type</label><select value={form.loadType} onChange={e=>set("loadType",e.target.value)}>{atDef.loadTypes.map(l=><option key={l}>{l}</option>)}</select></div>
                <div><label className="flabel">Trip Frequency</label><select value={form.tripFrequency} onChange={e=>set("tripFrequency",e.target.value)}><option>One-time</option><option>Daily</option><option>Weekly</option><option>Monthly Contract</option></select></div>
              </div>
              <div className="frow fr3">
                <div><label className="flabel">Travel Date</label><input type="date" value={form.startDate} onChange={e=>set("startDate",e.target.value)} /></div>
                <div><label className="flabel">Pickup Time</label><input type="time" value={form.pickupTime} onChange={e=>set("pickupTime",e.target.value)} /></div>
                <div><label className="flabel">Expected Drop Time</label><input type="time" value={form.dropTime} onChange={e=>set("dropTime",e.target.value)} /></div>
              </div>
              <div><label className="flabel">Route Stops (comma separated)</label><input value={form.routeStops} onChange={e=>set("routeStops",e.target.value)} placeholder="Bus Stand, Anna Nagar, T.Nagar, Koyambedu" /></div>
            </div>
          )}
          {assetType==="bus" && step===2 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:16 }}>Step 2 — Select Bus</div>
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginBottom:14 }}>
                <label className="flabel">Select Bus / Vehicle</label>
                <select value={form.busId} onChange={e=>set("busId",e.target.value)}>
                  <option value="">— Select bus —</option>
                  {FLEET_DATA.map(v=><option key={v.id} value={v.id}>{v.num} — {v.model} ({v.wheels})</option>)}
                </select>
              </div>
              <div className="frow fr2">
                <div><label className="flabel">Passenger Count *</label><input type="number" value={form.passengerCount} onChange={e=>set("passengerCount",e.target.value)} placeholder="32" /></div>
                <div><label className="flabel">Seating Capacity</label><input placeholder="40 seats" readOnly style={{ background:T.bgPanel, color:T.textSub }} /></div>
              </div>
              <div className="frow fr2">
                <div><label className="flabel">Contract Fare (₹ total)</label><input value={form.contractFare} onChange={e=>set("contractFare",e.target.value)} placeholder="12000" /></div>
                <div><label className="flabel">Per Seat Fare (₹) — if applicable</label><input value={form.perSeatFare} onChange={e=>set("perSeatFare",e.target.value)} placeholder="375" /></div>
              </div>
              {(form.contractFare||form.perSeatFare) && (
                <div style={{ background:T.greenGlow, border:`1px solid ${T.green}33`, borderRadius:8, padding:10, marginTop:4, fontSize:11 }}>
                  <span style={{ color:T.textMuted }}>Total Fare: </span>
                  <strong style={{ color:T.green }}>₹{(parseInt(form.contractFare||0)||parseInt(form.perSeatFare||0)*parseInt(form.passengerCount||0)).toLocaleString()}</strong>
                </div>
              )}
            </div>
          )}
          {assetType==="bus" && step===3 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:16 }}>Step 3 — Driver, Conductor & Pre-Trip Safety Check</div>
              {/* Driver */}
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginBottom:12 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.green, marginBottom:8 }}>🚌 Bus Driver (Primary) *</div>
                <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:10 }}>
                  {DRIVERS_DATA.filter(d=>d.status==="Available").map(d=>(
                    <div key={d.id} onClick={()=>set("busDriver",d.name)} style={{ padding:"8px 12px", borderRadius:8, cursor:"pointer", border:`2px solid ${form.busDriver===d.name?T.green:T.border}`, background:form.busDriver===d.name?T.greenGlow:T.bgCard, display:"flex", alignItems:"center", justifyContent:"space-between", transition:"all .12s" }}>
                      <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                        <div style={{ width:30,height:30,borderRadius:"50%",background:T.bgPanel,border:`1px solid ${T.green}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:T.green }}>{d.name[0]}</div>
                        <div><div style={{ fontSize:12, fontWeight:600 }}>{d.name}</div><div style={{ fontSize:10, color:T.textMuted }}>CDL {d.cdl} · Score {d.score} · {d.kmDriven.toLocaleString()} km</div></div>
                      </div>
                      {form.busDriver===d.name && <span>✅</span>}
                    </div>
                  ))}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  <div><label className="flabel">Driver Advance (₹)</label><input value={form.busAdvance} onChange={e=>set("busAdvance",e.target.value)} placeholder="2000" /></div>
                  <div><label className="flabel">Payment Mode</label><select value={form.busAdvanceMode} onChange={e=>set("busAdvanceMode",e.target.value)}><option>Cash</option><option>UPI</option><option>Account Transfer</option></select></div>
                </div>
              </div>
              {/* Conductor / Helper */}
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginBottom:12 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.cyan, marginBottom:8 }}>🎫 Conductor / Bus Helper <span style={{ fontWeight:400, fontSize:10, color:T.textMuted }}>(Optional but recommended for 30+ pax)</span></div>
                <div style={{ fontSize:11, color:T.textMuted, marginBottom:10 }}>Conductor manages passenger boarding, ticket collection, announcements and helps driver with route compliance.</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                  <div><label className="flabel">Conductor Name</label><input value={form.busHelper} onChange={e=>set("busHelper",e.target.value)} placeholder="Name" /></div>
                  <div><label className="flabel">Phone</label><input placeholder="+91 98765..." onChange={e=>set("busHelperPhone",e.target.value)} /></div>
                  <div><label className="flabel">Daily Pay / Trip Pay (₹)</label><input value={form.busHelperPay} onChange={e=>set("busHelperPay",e.target.value)} placeholder="450" /></div>
                </div>
              </div>
              {/* Bus pre-trip check */}
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.cyan, marginBottom:4 }}>🔍 Bus Pre-Trip Safety Check <span style={{ fontSize:10, color:T.red, fontWeight:400 }}>(Mandatory — MV Act compliance)</span></div>
                <div style={{ fontSize:11, color:T.textMuted, marginBottom:10 }}>All safety items must be verified before passenger boarding. Tap each item to mark status.</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                  {[
                    { key:"bchk_brake",    label:"Brake system functional — foot + hand", cat:"safety" },
                    { key:"bchk_horn",     label:"Horn, headlights & indicators OK",      cat:"electrical" },
                    { key:"bchk_doors",    label:"Passenger doors open/close properly",   cat:"safety" },
                    { key:"bchk_tyres",    label:"All tyre pressure & condition checked",  cat:"tyres" },
                    { key:"bchk_fire",     label:"Fire extinguisher present & charged",   cat:"safety" },
                    { key:"bchk_firstaid", label:"First aid kit on board",                cat:"safety" },
                    { key:"bchk_permits",  label:"Route permit & fitness cert in cabin",  cat:"compliance" },
                    { key:"bchk_seats",    label:"Seat count matches manifest / roster",  cat:"compliance" },
                    { key:"bchk_fuel",     label:"Fuel tank filled / sufficient for route",cat:"fuel" },
                    { key:"bchk_emergency",label:"Emergency exit clear & marked",         cat:"safety" },
                  ].map(c => {
                    const val = form[c.key];
                    const catC = { safety:T.red, electrical:T.accent, tyres:T.cyan, compliance:T.purple, fuel:T.green };
                    return (
                      <div key={c.key} onClick={()=>set(c.key, val==="ok"?"issue":val==="issue"?"na":"ok")} style={{ display:"flex", gap:8, alignItems:"center", padding:"7px 10px", borderRadius:7, cursor:"pointer", background:val==="ok"?T.greenGlow:val==="issue"?T.redGlow:T.bgCard, border:`1px solid ${val==="ok"?T.green:val==="issue"?T.red:T.border}33`, transition:"all .12s" }}>
                        <span style={{ fontSize:16, flexShrink:0 }}>{val==="ok"?"✅":val==="issue"?"❌":"⬜"}</span>
                        <div>
                          <div style={{ fontSize:11, color:val==="ok"?T.green:val==="issue"?T.red:T.text }}>{c.label}</div>
                          <div style={{ fontSize:9, color:catC[c.cat]||T.textMuted }}>{c.cat.toUpperCase()}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop:8, fontSize:10, color:T.textMuted }}>Tap each: ⬜ → ✅ OK → ❌ Issue</div>
              </div>
            </div>
          )}
          {assetType==="bus" && step===4 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:16 }}>Step 4 — Passenger Details & Manifest</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:12 }}>
                <div><label className="flabel">Confirmed Passenger Count *</label><input type="number" value={form.passengerCount} onChange={e=>set("passengerCount",e.target.value)} placeholder="32" /></div>
                <div><label className="flabel">Bus Seating Capacity</label><input placeholder="40 seats" onChange={e=>set("busCapacity",e.target.value)} /></div>
                <div><label className="flabel">Luggage Allowed</label><select onChange={e=>set("luggagePolicy",e.target.value)}><option>Yes — standard luggage</option><option>Yes — overhead only</option><option>No luggage</option><option>Special cargo arrangement</option></select></div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
                <div><label className="flabel">Special Needs / Accessibility</label><input placeholder="e.g. 2 wheelchair passengers, senior citizens..." onChange={e=>set("accessibility",e.target.value)} /></div>
                <div><label className="flabel">Contact Person for this Trip</label><input placeholder="Name + mobile of responsible person" onChange={e=>set("busContactPerson",e.target.value)} /></div>
              </div>
              {/* Route stop-wise boarding */}
              {form.routeStops && (
                <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginBottom:12 }}>
                  <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:8 }}>📍 Boarding Point-wise Passenger Count</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                    {form.routeStops.split(",").map((stop,i) => (
                      <div key={i} style={{ background:T.bgCard, borderRadius:7, padding:"7px 10px" }}>
                        <div style={{ fontSize:10, color:T.textMuted, marginBottom:4 }}>{stop.trim()}</div>
                        <input type="number" placeholder="Pax" style={{ width:"100%", fontSize:11 }} onChange={e=>set(`paxStop_${i}`,e.target.value)} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div><label className="flabel">Onboard Instructions / Special Notes</label><textarea placeholder="Pickup time confirmations, no-standing rule, client special requests, luggage restrictions..." style={{ height:65 }} onChange={e=>set("busNotes",e.target.value)} /></div>
              {/* Summary */}
              <div style={{ background:T.greenGlow, border:`1px solid ${T.green}33`, borderRadius:8, padding:10, marginTop:10, fontSize:11 }}>
                <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                  <span><span style={{ color:T.textMuted }}>Route: </span><strong>{form.from||"—"} → {form.to||"—"}</strong></span>
                  <span><span style={{ color:T.textMuted }}>Passengers: </span><strong style={{ color:T.green }}>{form.passengerCount||0}</strong></span>
                  <span><span style={{ color:T.textMuted }}>Fare: </span><strong style={{ color:T.green }}>₹{(parseInt(form.contractFare||0)||parseInt(form.perSeatFare||0)*parseInt(form.passengerCount||0)).toLocaleString()}</strong></span>
                  {form.busDriver && <span><span style={{ color:T.textMuted }}>Driver: </span><strong>{form.busDriver}</strong></span>}
                  {form.busHelper && <span><span style={{ color:T.textMuted }}>Conductor: </span><strong>{form.busHelper}</strong></span>}
                </div>
              </div>
            </div>
          )}
          {assetType==="bus" && step===5 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:16 }}>Step 5 — Costs & Revenue</div>
              <div className="frow fr3">
                <div><label className="flabel">Diesel / Fuel (₹)</label><input value={form.dieselAmount} onChange={e=>set("dieselAmount",e.target.value)} placeholder="4500" /></div>
                <div><label className="flabel">Toll Charges (₹)</label><input value={form.tollCharges} onChange={e=>set("tollCharges",e.target.value)} placeholder="800" /></div>
                <div><label className="flabel">Misc (₹)</label><input value={form.miscCharges} onChange={e=>set("miscCharges",e.target.value)} placeholder="300" /></div>
              </div>
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginTop:8 }}>
                {(() => {
                  const fare = parseInt(form.contractFare||0)||parseInt(form.perSeatFare||0)*parseInt(form.passengerCount||0);
                  const cost = parseInt(form.dieselAmount||0)+parseInt(form.tollCharges||0)+parseInt(form.busAdvance||0)+parseInt(form.miscCharges||0);
                  return (
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                      {[{ label:"Total Fare", val:fare, c:T.green },{ label:"Total Cost", val:cost, c:T.red },{ label:"Margin", val:fare-cost, c:T.accent }].map(k=>(
                        <div key={k.label}><div style={{ fontSize:10, color:T.textSub }}>{k.label}</div><div className="rj" style={{ fontSize:22, fontWeight:700, color:k.c }}>₹{k.val.toLocaleString()}</div></div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
          {assetType==="bus" && step===6 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:16 }}>✅ Review — Bus / Passenger Trip</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                {[
                  { label:"Route", value:form.from&&form.to?`${form.from} → ${form.to}`:"—" },
                  { label:"Organisation", value:form.pax_organisation||form.customer||"—" },
                  { label:"Service Type", value:form.loadType },
                  { label:"Bus", value:FLEET_DATA.find(v=>v.id===form.busId)?.num||"—" },
                  { label:"Driver", value:form.busDriver||"—" },
                  { label:"Helper", value:form.busHelper||"Not assigned" },
                  { label:"Passengers", value:`${form.passengerCount||0} pax` },
                  { label:"Date", value:form.startDate||"—" },
                  { label:"Pickup Time", value:form.pickupTime||"—" },
                  { label:"Total Fare", value:form.contractFare?`₹${parseInt(form.contractFare).toLocaleString()}`:"—" },
                ].map(r=>(
                  <div key={r.label} style={{ background:T.bgPanel, borderRadius:8, padding:"10px 14px" }}>
                    <div style={{ fontSize:10, color:T.textMuted, textTransform:"uppercase", letterSpacing:"0.06em" }}>{r.label}</div>
                    <div style={{ fontSize:13, fontWeight:500, marginTop:2 }}>{r.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:T.greenGlow, border:`1px solid ${T.green}33`, borderRadius:10, padding:12, fontSize:12, color:T.textSub }}>
                <strong style={{ color:T.green }}>Next Step:</strong> Trip created as <strong>Pre-Trip Pending</strong>. Driver must complete pre-trip bus check before departure.
              </div>
            </div>
          )}

          {/* Nav */}
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:20 }}>
            <button className="btn btn-gh" onClick={()=>step>1?setStep(s=>s-1):setStep(0)}>{step===1?"← Change Type":"← Back"}</button>
            <button className="btn btn-p" style={{ background:step===totalSteps?T.green:undefined }} onClick={()=>step<totalSteps?setStep(s=>s+1):handleCreate()}>
              {step===totalSteps?`🚀 Create ${assetType==="equipment"?"Deployment":assetType==="bus"?"Bus Trip":"Trip"}`:"Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

    if (step === 2) {
      return(
       <div className="ov">
      <div className="modal">
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#1746A2,#0F2D7A)" }}>
          <div>
            <div className="rj" style={{ fontSize:22, fontWeight:700, color:"#fff", letterSpacing:1 }}>🚛 New Trip Booking</div>
            <div style={{ fontSize:12, color:"#93C5FD", marginTop:2 }}>Step {step} of 6 — {steps[step-1].label}</div>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            {/* Fleet Source Toggle in header */}
            <div className="toggle-pill" style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.15)" }}>
              <div className={`toggle-opt ${fleetSource==="own"?"on":""}`} style={{ fontSize:11 }} onClick={() => setFleetSource("own")}>🚚 Own Fleet</div>
              <div className={`toggle-opt ${fleetSource==="vendor"?"on":""}`} style={{ fontSize:11 }} onClick={() => setFleetSource("vendor")}>🤝 Vendor</div>
            </div>
            <button className="btn" style={{ background:"rgba(255,255,255,.1)", color:"#fff", padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c="#fff" /></button>
          </div>
        </div>

        {/* Step Bar */}
        <div style={{ padding:"14px 22px 0", background:T.bgPanel, borderBottom:`1px solid ${T.border}` }}>
          <div style={{ display:"flex", alignItems:"center", marginBottom:14 }}>
            {steps.map((s, i) => (
              <div key={s.n} style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", width:"100%" }}>
                  {i > 0 && <div className="step-line" style={{ background:step>i?T.accent:T.border }} />}
                  <div className="step-dot" style={{ background:step===s.n?T.accent:step>s.n?T.green:T.bgCard, border:`2px solid ${step===s.n?T.accent:step>s.n?T.green:T.border}`, color:step>s.n?"#fff":step===s.n?"#080B10":T.textMuted, margin:"0 auto" }}>
                    {step > s.n ? "✓" : s.n}
                  </div>
                  {i < steps.length-1 && <div className="step-line" style={{ background:step>s.n?T.accent:T.border }} />}
                </div>
                <div style={{ fontSize:9, color:step===s.n?T.accent:T.textMuted, marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mbdy">
          {step === 1 && <JourneyTypeSelector form={form} set={set} />}

          {step === 2 && (
            fleetSource === "own" ? (
              <VehicleTypeSelector form={form} set={set} />
            ) : (
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:T.purple, marginBottom:14 }}>🤝 Vendor Vehicle Selection</div>
                <div style={{ padding:12, background:T.purpleGlow, border:`1px solid ${T.purple}33`, borderRadius:8, marginBottom:14, fontSize:12, color:T.textSub }}>
                  💡 No driver advance or diesel expense needed — vendor manages their own driver and fuel
                </div>
                <div className="frow fr2">
                  <div><label className="flabel">Select Vendor</label>
                    <select value={form.vendorId} onChange={e=>set("vendorId",e.target.value)}>
                      <option value="">Choose vendor</option>
                      {VENDORS.map(v=><option key={v.id} value={v.id}>{v.name} (★{v.rating}) — ₹{v.ratePerKm}/km</option>)}
                    </select>
                  </div>
                  <div><label className="flabel">Vendor Vehicle</label>
                    <select value={form.vendorVehicle} onChange={e=>set("vendorVehicle",e.target.value)}>
                      <option value="">Choose vehicle</option>
                      {VENDOR_VEHICLES.map(v=><option key={v.id}>{v.num} — {v.model}</option>)}
                    </select>
                  </div>
                </div>
                <div className="frow fr2">
                  <div><label className="flabel">Rate per KM (₹)</label><input value={form.vendorRate||""} onChange={e=>set("vendorRate",e.target.value)} placeholder="42" /></div>
                  <div><label className="flabel">Est. Distance (km)</label><input value={form.estDistance||""} onChange={e=>set("estDistance",e.target.value)} placeholder="480" /></div>
                </div>
                {form.vendorRate && form.estDistance && (
                  <div style={{ padding:12, background:T.accentGlow, border:`1px solid ${T.accent}33`, borderRadius:8, fontSize:12 }}>
                    <span style={{ color:T.textMuted }}>Estimated Vendor Cost: </span>
                    <span className="rj" style={{ fontSize:18, fontWeight:700, color:T.accent }}>₹{(parseInt(form.vendorRate||0)*parseInt(form.estDistance||0)).toLocaleString()}</span>
                  </div>
                )}
              </div>
            )
          )}

          {step === 3 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:16 }}>📦 Load & Freight Details</div>
              <div className="frow fr2">
                <div><label className="flabel">Commodity / Material</label><input value={form.commodity} onChange={e=>set("commodity",e.target.value)} placeholder="e.g. Textile, Steel, Cement" /></div>
                <div><label className="flabel">Weight (Tonnes)</label><input value={form.weight} onChange={e=>set("weight",e.target.value)} placeholder="e.g. 18" /></div>
              </div>
              <div className="frow fr2">
                <div><label className="flabel">Freight Amount (₹)</label><input value={form.freightAmount} onChange={e=>set("freightAmount",e.target.value)} placeholder="e.g. 42000" /></div>
                <div><label className="flabel">Advance from Party (₹)</label><input value={form.advanceAmount} onChange={e=>set("advanceAmount",e.target.value)} placeholder="e.g. 10000" /></div>
              </div>
              <div className="frow fr3">
                <div><label className="flabel">Load Type</label><select value={form.loadType} onChange={e=>set("loadType",e.target.value)}><option>FTL</option><option>LTL</option><option>ODC</option><option>Part Load</option></select></div>
                <div><label className="flabel">Payment Type</label><select value={form.paymentType} onChange={e=>set("paymentType",e.target.value)}><option>Account</option><option>Cash</option><option>NEFT</option><option>Cheque</option></select></div>
                <div><label className="flabel">Customer</label><select value={form.customer} onChange={e=>set("customer",e.target.value)}><option value="">Select</option>{CUSTOMERS.map(c=><option key={c}>{c}</option>)}</select></div>
              </div>
              <div className="frow fr2">
                <div><label className="flabel">Agent / Broker</label><select value={form.commissionTo} onChange={e=>set("commissionTo",e.target.value)}><option value="">Direct (No Agent)</option>{AGENTS.map(a=><option key={a.id}>{a.name}</option>)}</select></div>
                <div><label className="flabel">LR / Bilti Number</label><input value={form.lrNumber||""} onChange={e=>set("lrNumber",e.target.value)} placeholder="LR-2025-XXXX" /></div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              {fleetSource === "own" ? (
                <>
                  <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:4 }}>👤 Driver & Crew Assignment</div>
                  <div style={{ fontSize:11, color:T.textSub, marginBottom:14 }}>Long-haul trucks require a primary driver, optional second driver for relay/rest, and optional cleaner/khalasi for loading assistance.</div>

                  {/* PRIMARY DRIVER */}
                  <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginBottom:12 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                      <div style={{ fontSize:12, fontWeight:700, color:T.accent, textTransform:"uppercase", letterSpacing:".06em" }}>
                        🚛 Driver 1 — Primary (Mandatory)
                      </div>
                      {form.driver && <span className="badge bg" style={{ fontSize:10 }}>Selected: {form.driver}</span>}
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:12 }}>
                      {DRIVERS_DATA.filter(d => d.status === "Available").map(d => (
                        <div key={d.id} onClick={() => set("driver", d.name)}
                          style={{ padding:"10px 14px", borderRadius:8, cursor:"pointer", border:`2px solid ${form.driver===d.name?T.accent:T.border}`, background:form.driver===d.name?T.accentGlow:T.bgCard, display:"flex", alignItems:"center", justifyContent:"space-between", transition:"all .12s" }}>
                          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                            <div style={{ width:34, height:34, borderRadius:"50%", background:form.driver===d.name?T.accent+"33":T.bgPanel, border:`2px solid ${form.driver===d.name?T.accent:T.border}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:T.accent }}>{d.name[0]}</div>
                            <div>
                              <div style={{ fontSize:13, fontWeight:600 }}>{d.name}</div>
                              <div style={{ fontSize:11, color:T.textSub }}>{d.phone} · CDL {d.cdl} · Exp: {d.totalTrips} trips</div>
                            </div>
                          </div>
                          <div style={{ textAlign:"right", display:"flex", gap:8, alignItems:"center" }}>
                            <div>
                              <div style={{ fontSize:12, color:d.score>80?T.green:d.score>65?T.accent:T.orange, fontWeight:700 }}>⭐ {d.score}</div>
                              <div style={{ fontSize:10, color:T.textMuted }}>{d.kmDriven.toLocaleString()} km</div>
                            </div>
                            {form.driver===d.name && <div style={{ fontSize:18 }}>✅</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                      <div><label className="flabel">Driver 1 Advance (₹)</label><input value={form.driverAdvance} onChange={e=>set("driverAdvance",e.target.value)} placeholder="5000" /></div>
                      <div><label className="flabel">Payment Mode</label><select value={form.driverAdvanceType} onChange={e=>set("driverAdvanceType",e.target.value)}><option>Cash</option><option>UPI</option><option>Account Transfer</option></select></div>
                      <div><label className="flabel">Driver Rental / Hire (₹)</label><input value={form.rent} onChange={e=>set("rent",e.target.value)} placeholder="0" /></div>
                    </div>
                  </div>

                  {/* SECOND DRIVER */}
                  <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginBottom:12 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                      <div>
                        <div style={{ fontSize:12, fontWeight:700, color:T.blue, textTransform:"uppercase", letterSpacing:".06em" }}>
                          🔄 Driver 2 — Second Driver / Co-Driver <span style={{ fontSize:10, color:T.textMuted, fontWeight:400, textTransform:"none", letterSpacing:"normal" }}>(Optional)</span>
                        </div>
                        <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>Required for: long haul (800+ km), overnight trips, relay handoff points</div>
                      </div>
                      {form.secondDriver && <span className="badge bb" style={{ fontSize:10 }}>Selected: {form.secondDriver}</span>}
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:7, marginBottom:10 }}>
                      <div onClick={()=>set("secondDriver","")} style={{ padding:"7px 10px", borderRadius:7, cursor:"pointer", border:`2px solid ${form.secondDriver===""?T.textMuted:T.border}`, background:form.secondDriver===""?T.bgCard:T.bgPanel, fontSize:11, color:T.textMuted, textAlign:"center" }}>
                        ✕ None / Not required
                      </div>
                      {DRIVERS_DATA.filter(d=>d.status!=="On Trip"&&d.name!==form.driver).map(d=>(
                        <div key={d.id} onClick={()=>set("secondDriver",d.name)}
                          style={{ padding:"8px 10px", borderRadius:8, cursor:"pointer", border:`2px solid ${form.secondDriver===d.name?T.blue:T.border}`, background:form.secondDriver===d.name?T.blueGlow:T.bgCard, display:"flex", gap:8, alignItems:"center", transition:"all .12s" }}>
                          <div style={{ width:28, height:28, borderRadius:"50%", background:T.bgPanel, border:`1px solid ${T.blue}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:T.blue }}>{d.name[0]}</div>
                          <div>
                            <div style={{ fontSize:11, fontWeight:600 }}>{d.name}</div>
                            <div style={{ fontSize:10, color:T.textMuted }}>CDL {d.cdl} · Score {d.score}</div>
                          </div>
                          {form.secondDriver===d.name && <div style={{ marginLeft:"auto", fontSize:14 }}>✅</div>}
                        </div>
                      ))}
                    </div>
                    {form.secondDriver && (
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                        <div><label className="flabel">Driver 2 Advance (₹)</label><input value={form.d2Advance||""} onChange={e=>set("d2Advance",e.target.value)} placeholder="3000" /></div>
                        <div><label className="flabel">Payment Mode</label><select value={form.d2AdvanceMode||"Cash"} onChange={e=>set("d2AdvanceMode",e.target.value)}><option>Cash</option><option>UPI</option><option>Account Transfer</option></select></div>
                        <div><label className="flabel">Role on this Trip</label><select value={form.d2Role||"Co-Driver"} onChange={e=>set("d2Role",e.target.value)}><option>Co-Driver</option><option>Relief Driver</option><option>Relay Handoff</option><option>Trainee</option></select></div>
                      </div>
                    )}
                  </div>

                  {/* CLEANER / KHALASI */}
                  <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                      <div>
                        <div style={{ fontSize:12, fontWeight:700, color:T.purple, textTransform:"uppercase", letterSpacing:".06em" }}>
                          🧹 Cleaner / Khalasi <span style={{ fontSize:10, color:T.textMuted, fontWeight:400, textTransform:"none", letterSpacing:"normal" }}>(Optional)</span>
                        </div>
                        <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>Helps with loading/unloading, paperwork at check-posts, truck maintenance on road</div>
                      </div>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10, marginBottom:10 }}>
                      <div><label className="flabel">Cleaner Name</label><input value={form.cleanerName||""} onChange={e=>set("cleanerName",e.target.value)} placeholder="Name (if assigned)" /></div>
                      <div><label className="flabel">Cleaner Phone</label><input value={form.cleanerPhone||""} onChange={e=>set("cleanerPhone",e.target.value)} placeholder="+91 99999 00000" /></div>
                    </div>
                    {(form.cleanerName) && (
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                        <div><label className="flabel">Daily Allowance (₹/day)</label><input value={form.cleanerAllowance||""} onChange={e=>set("cleanerAllowance",e.target.value)} placeholder="500" /></div>
                        <div><label className="flabel">Trip Duration (days)</label><input value={form.cleanerDays||""} onChange={e=>set("cleanerDays",e.target.value)} placeholder="3" /></div>
                        <div>
                          <label className="flabel">Total Cleaner Cost</label>
                          <div style={{ padding:"7px 10px", background:T.bgCard, borderRadius:7, fontSize:12, fontWeight:700, color:T.purple }}>
                            {form.cleanerAllowance && form.cleanerDays ? fmt(parseInt(form.cleanerAllowance)*parseInt(form.cleanerDays)) : "₹ —"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Crew summary strip */}
                  {(form.driver||form.secondDriver||form.cleanerName) && (
                    <div style={{ background:T.accentGlow, border:`1px solid ${T.accent}33`, borderRadius:8, padding:10, marginTop:10 }}>
                      <div style={{ fontSize:11, fontWeight:700, color:T.accent, marginBottom:6 }}>👥 Crew Summary</div>
                      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                        {form.driver && <div style={{ background:T.bgCard, borderRadius:7, padding:"5px 10px", fontSize:11 }}><span style={{ color:T.textMuted }}>Driver 1: </span><strong>{form.driver}</strong>{form.driverAdvance?<span style={{ color:T.accent }}> · ₹{parseInt(form.driverAdvance).toLocaleString()} adv</span>:""}</div>}
                        {form.secondDriver && <div style={{ background:T.bgCard, borderRadius:7, padding:"5px 10px", fontSize:11 }}><span style={{ color:T.textMuted }}>Driver 2: </span><strong>{form.secondDriver}</strong><span style={{ color:T.textMuted }}> ({form.d2Role||"Co-Driver"})</span>{form.d2Advance?<span style={{ color:T.blue }}> · ₹{parseInt(form.d2Advance).toLocaleString()} adv</span>:""}</div>}
                        {form.cleanerName && <div style={{ background:T.bgCard, borderRadius:7, padding:"5px 10px", fontSize:11 }}><span style={{ color:T.textMuted }}>Cleaner: </span><strong>{form.cleanerName}</strong>{form.cleanerAllowance?<span style={{ color:T.purple }}> · ₹{form.cleanerAllowance}/day</span>:""}</div>}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ padding:20, background:T.purpleGlow, border:`1px solid ${T.purple}33`, borderRadius:10, textAlign:"center" }}>
                  <div style={{ fontSize:14, fontWeight:600, color:T.purple, marginBottom:8 }}>🤝 Vendor Trip — Driver Managed by Vendor</div>
                  <div style={{ fontSize:12, color:T.textSub }}>No driver advance required. The vendor ({VENDORS.find(v=>v.id===form.vendorId)?.name || "selected vendor"}) assigns their own driver and handles fuel & crew expenses.</div>
                </div>
              )}
            </div>
          )}

          {step === 5 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:14 }}>💰 Cost Breakdown & P&L</div>
              {fleetSource === "own" ? (
                <>
                  <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginBottom:14 }}>
                    <div style={{ fontSize:11, color:T.textSub, marginBottom:8 }}>⛽ Diesel</div>
                    <div className="frow fr2">
                      <div><label className="flabel">Litres</label><input value={form.dieselLitres} onChange={e=>set("dieselLitres",e.target.value)} placeholder="120 L" /></div>
                      <div><label className="flabel">Amount (₹)</label><input value={form.dieselAmount} onChange={e=>set("dieselAmount",e.target.value)} placeholder="12000" /></div>
                    </div>
                  </div>
                  <div className="frow fr3">
                    <div><label className="flabel">Toll (₹)</label><input value={form.tollCharges} onChange={e=>set("tollCharges",e.target.value)} placeholder="0" /></div>
                    <div><label className="flabel">Loading (₹)</label><input value={form.loadingCharges} onChange={e=>set("loadingCharges",e.target.value)} placeholder="0" /></div>
                    <div><label className="flabel">Unloading (₹)</label><input value={form.unloadingCharges} onChange={e=>set("unloadingCharges",e.target.value)} placeholder="0" /></div>
                  </div>
                  <div className="frow fr2">
                    <div><label className="flabel">Commission (₹)</label><input value={form.commission} onChange={e=>set("commission",e.target.value)} placeholder="0" /></div>
                    <div><label className="flabel">Misc Charges (₹)</label><input value={form.miscCharges} onChange={e=>set("miscCharges",e.target.value)} placeholder="0" /></div>
                  </div>
                </>
              ) : (
                <div className="frow fr2">
                  <div><label className="flabel">Toll to Vendor (₹)</label><input value={form.tollCharges} onChange={e=>set("tollCharges",e.target.value)} placeholder="3000" /></div>
                  <div><label className="flabel">Misc (₹)</label><input value={form.miscCharges} onChange={e=>set("miscCharges",e.target.value)} placeholder="0" /></div>
                </div>
              )}
              {form.freightAmount && (
                <div style={{ background:T.accentGlow, border:`1px solid ${T.accent}33`, borderRadius:10, padding:14, marginTop:8 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:T.accent, marginBottom:8 }}>Live P&L Preview</div>
                  <div style={{ display:"flex", gap:24, flexWrap:"wrap" }}>
                    {[
                      { label:"Freight", val:parseInt(form.freightAmount||0), c:T.green },
                      { label:"Total Cost", val:parseInt(form.dieselAmount||0)+parseInt(form.tollCharges||0)+parseInt(form.loadingCharges||0)+parseInt(form.unloadingCharges||0)+parseInt(form.commission||0)+parseInt(form.miscCharges||0), c:T.red },
                      { label:"Est. Margin", val:parseInt(form.freightAmount||0)-parseInt(form.dieselAmount||0)-parseInt(form.tollCharges||0)-parseInt(form.loadingCharges||0)-parseInt(form.unloadingCharges||0)-parseInt(form.commission||0)-parseInt(form.miscCharges||0), c:T.accent },
                    ].map(k => (
                      <div key={k.label}><div style={{ fontSize:10, color:T.textSub }}>{k.label}</div><div className="rj" style={{ fontSize:22, fontWeight:700, color:k.c }}>₹{k.val.toLocaleString()}</div></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 6 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:16 }}>✅ Review & Confirm</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
                {[
                  { label:"Journey Type", value:JOURNEY_TYPES.find(j=>j.id===form.journeyType)?.label||"—" },
                  { label:"Route", value:form.from&&form.to?`${form.from} → ${form.to}`:"—" },
                  { label:"Fleet Source", value:fleetSource==="own"?"Own Fleet":"Vendor Vehicle" },
                  { label:fleetSource==="own"?"Vehicle":"Vendor Vehicle", value:fleetSource==="own"?(form.vehicle||"—"):(form.vendorVehicle||"—") },
                  { label:"Driver 1 (Primary)", value:fleetSource==="own"?(form.driver||"—"):"Vendor-assigned" },
                  { label:"Driver 2 / Co-Driver", value:fleetSource==="own"?(form.secondDriver||"Not assigned"):"—" },
                  { label:"Cleaner / Khalasi", value:fleetSource==="own"?(form.cleanerName||"Not assigned"):"—" },
                  { label:"Customer", value:form.customer||"—" },
                  { label:"Load Type", value:form.loadType },
                  { label:"Freight", value:form.freightAmount?`₹${parseInt(form.freightAmount).toLocaleString()}`:"—" },
                ].map(r => (
                  <div key={r.label} style={{ background:T.bgPanel, borderRadius:8, padding:"10px 14px" }}>
                    <div style={{ fontSize:10, color:T.textMuted, textTransform:"uppercase", letterSpacing:"0.06em" }}>{r.label}</div>
                    <div style={{ fontSize:13, fontWeight:500, marginTop:2 }}>{r.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:T.accentGlow, border:`1px solid ${T.accent}33`, borderRadius:10, padding:12, fontSize:12, color:T.textSub }}>
                <strong style={{ color:T.accent }}>Next Step:</strong> Trip created as <strong style={{ color:T.orange }}>Pre-Trip Pending</strong>. {fleetSource==="own"?"Driver must complete vehicle inspection before departure.":"Vendor confirms pickup and driver assignment."}
              </div>
            </div>
          )}

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:20 }}>
            <button className="btn btn-gh" onClick={() => step>1?setStep(s=>s-1):onClose()}>{step===1?"Cancel":"← Back"}</button>
            <button className="btn btn-p" onClick={() => step<6?setStep(s=>s+1):handleCreate()}>{step===6?"🚀 Create Trip":"Next →"}</button>
          </div>
        </div>
      </div>
    </div>
    )}
};

  // const handleCreate = () => {
  //   const id = `TRP-2025-${String(Math.floor(Math.random()*900)+50).padStart(4,"0")}`;
  //   const vtype = VEHICLE_SCHEMA.find(v => v.id===form.vehicleCategoryId);
  //   const totalCost = parseInt(form.dieselAmount||0)+parseInt(form.tollCharges||0)+parseInt(form.loadingCharges||0)+parseInt(form.unloadingCharges||0);
  //   onCreated({
  //     id, vehicleType:fleetSource,
  //     route:`${form.from} → ${form.to}`,
  //     fromCity:form.from, toCity:form.to,
  //     vehicle:fleetSource==="own"?form.vehicle:null,
  //     vendorVehicle:fleetSource==="vendor"?form.vendorVehicle:null,
  //     vendor:fleetSource==="vendor"?(VENDORS.find(v=>v.id===form.vendorId)?.name||null):null,
  //     driver:fleetSource==="own"?form.driver:"External Driver",
  //     driverId:fleetSource==="own"?(DRIVERS_DATA.find(d=>d.name===form.driver)?.id||null):null,
  //     customer:form.customer,
  //     freight:parseInt(form.freightAmount)||0,
  //     advance:parseInt(form.driverAdvance)||0,
  //     expenses:{ diesel:parseInt(form.dieselAmount)||0, toll:parseInt(form.tollCharges)||0, loading:parseInt(form.loadingCharges)||0, unloading:parseInt(form.unloadingCharges)||0, misc:parseInt(form.miscCharges)||0 },
  //     vendorCost:fleetSource==="vendor"?parseInt(form.freightAmount||0):undefined,
  //     status:"Pre-Trip Pending",
  //     loadType:form.loadType,
  //     weight:form.weight+"T",
  //     journeyType:form.journeyType,
  //     vehicleLabel:vtype?`${vtype.label} · ${form.vehicleWheels}`:"",
  //     agent:form.commissionTo||"Direct",
  //     dateCreated:"2025-04-15",
  //     distanceKm:480,
  //   });
  //   onClose();
  // };



// ═══════════════════════════════════════════════════════════════════════════════
// INSPECTION MODAL — Pre-Trip & Post-Trip (from v2)
// ═══════════════════════════════════════════════════════════════════════════════
const InspectionModal = ({ trip, type, onClose, onComplete }) => {
  const [checks, setChecks] = useState(() => Object.fromEntries(INSPECTION_ITEMS.map(i => [i, null])));
  const [odometer, setOdometer] = useState("");
  const [fuelLevel, setFuelLevel] = useState("");
  const [remarks, setRemarks] = useState("");
  const [signed, setSigned] = useState(false);
  const [decision, setDecision] = useState("approve");

  const toggle = (item, val) => setChecks(c => ({ ...c, [item]: val }));
  const passCount = Object.values(checks).filter(v => v === "pass").length;
  const failCount = Object.values(checks).filter(v => v === "fail").length;
  const allChecked = Object.values(checks).every(v => v !== null);
  const hasDefects = failCount > 0;
  const isPost = type === "post";

  return (
    <div className="ov">
      <div className="modal" style={{ maxWidth:900 }}>
        <div className="mhdr" style={{ background:isPost?"#312E81":"#064E3B" }}>
          <div>
            <div className="rj" style={{ fontSize:20, fontWeight:700, color:"#fff" }}>
              {isPost ? "📋 Post-Trip Inspection" : "✅ Pre-Trip Inspection"} — {trip.id}
            </div>
            <div style={{ fontSize:12, color:isPost?"#C7D2FE":"#6EE7B7", marginTop:2 }}>
              {trip.vehicleType==="vendor"?"Vendor: "+trip.vendor:trip.vehicle} · {trip.route} · {trip.driver}
            </div>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <span style={{ fontSize:12, color:isPost?"#C7D2FE":"#6EE7B7" }}>{passCount}/{INSPECTION_ITEMS.length} checked</span>
            <button className="btn" style={{ background:"rgba(255,255,255,.1)", color:"#fff", padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c="#fff" /></button>
          </div>
        </div>
        <div className="mbdy">
          <div style={{ marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:T.textSub, marginBottom:6 }}>
              <span>Inspection Progress</span>
              <span>{passCount} Pass · <span style={{ color:T.red }}>{failCount} Fail</span> · {INSPECTION_ITEMS.length-passCount-failCount} Pending</span>
            </div>
            <div className="pbar" style={{ height:6 }}>
              <div className="pfill" style={{ width:`${((passCount+failCount)/INSPECTION_ITEMS.length)*100}%`, background:hasDefects?T.red:isPost?T.purple:T.green }} />
            </div>
          </div>

          <div className="inspect-grid" style={{ marginBottom:18 }}>
            {INSPECTION_ITEMS.map(item => (
              <div key={item} className={`inspect-item ${checks[item]==="pass"?"pass":checks[item]==="fail"?"fail":""}`}>
                <span style={{ fontSize:12 }}>{item}</span>
                <div style={{ display:"flex", gap:5 }}>
                  <button onClick={() => toggle(item,"pass")} className="btn" style={{ padding:"3px 9px", fontSize:12, background:checks[item]==="pass"?T.green:T.bgCard, color:checks[item]==="pass"?"#fff":T.textSub, border:`1px solid ${checks[item]==="pass"?T.green:T.border}` }}>✓</button>
                  <button onClick={() => toggle(item,"fail")} className="btn" style={{ padding:"3px 9px", fontSize:12, background:checks[item]==="fail"?T.red:T.bgCard, color:checks[item]==="fail"?"#fff":T.textSub, border:`1px solid ${checks[item]==="fail"?T.red:T.border}` }}>✗</button>
                </div>
              </div>
            ))}
          </div>

          <div className="frow fr3" style={{ marginBottom:12 }}>
            <div><label className="flabel">Odometer (km)</label><input value={odometer} onChange={e=>setOdometer(e.target.value)} placeholder="74875" /></div>
            <div><label className="flabel">Fuel Level</label><select value={fuelLevel} onChange={e=>setFuelLevel(e.target.value)}><option value="">Select</option><option>Full</option><option>3/4</option><option>1/2</option><option>1/4</option><option>Low</option></select></div>
            <div><label className="flabel">Driver Sign</label><div onClick={()=>setSigned(s=>!s)} style={{ padding:"7px 12px", border:`1px solid ${signed?T.green:T.border}`, borderRadius:8, background:signed?T.greenGlow:T.bgPanel, cursor:"pointer", fontSize:12, color:signed?T.green:T.textSub }}>{signed?"✓ Signed":"Tap to Sign"}</div></div>
          </div>
          <div style={{ marginBottom:14 }}><label className="flabel">Remarks / Observations</label><textarea value={remarks} onChange={e=>setRemarks(e.target.value)} placeholder="Defects, issues, notes..." style={{ height:60 }} /></div>

          {hasDefects && (
            <div style={{ background:T.redGlow, border:`1px solid ${T.red}33`, borderRadius:8, padding:10, marginBottom:12, fontSize:12, color:T.red }}>
              ⚠️ {failCount} defect(s) found. Admin must decide action before proceeding.
            </div>
          )}

          {isPost && (
            <div style={{ marginBottom:16 }}>
              <label className="flabel">Admin Decision</label>
              <div style={{ display:"flex", gap:8 }}>
                {[["approve","✓ Approve",T.green],["maintenance","🔧 Maintenance",T.orange],["hold","⏸ Hold",T.red]].map(([val,lbl,col]) => (
                  <button key={val} onClick={()=>setDecision(val)} className="btn" style={{ border:`1px solid ${decision===val?col:T.border}`, background:decision===val?col+"20":T.bgPanel, color:decision===val?col:T.textSub, fontSize:12 }}>{lbl}</button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display:"flex", justifyContent:"space-between" }}>
            <button className="btn btn-gh" onClick={onClose}>Close</button>
            <div style={{ display:"flex", gap:8 }}>
              {hasDefects && !isPost && (
                <button className="btn btn-o" onClick={() => { onComplete(trip.id, type, checks, remarks, "maintenance"); onClose(); }}>Send to Maintenance</button>
              )}
              <button className="btn btn-p" style={{ opacity:(!allChecked||!signed)?.5:1 }}
                onClick={() => { if (allChecked && signed) { onComplete(trip.id, type, checks, remarks, isPost?decision:"approved"); onClose(); } }}>
                {isPost ? "Submit Post-Trip" : "✓ Approve & Dispatch"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// TRIPS PAGE — Full merged module
// ═══════════════════════════════════════════════════════════════════════════════
const TripsPage = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showInspect, setShowInspect] = useState(null);
  const [showTripDetail, setShowTripDetail] = useState(null);
  const [viewMode, setViewMode] = useState("kanban");
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  const [consignments, setConsignments] = useState(CONSIGNMENTS_INIT);
  const [showDeliveryConfirm, setShowDeliveryConfirm] = useState(null);
  const [showConsignmentForm, setShowConsignmentForm] = useState(null);
  const [showEqConfirm, setShowEqConfirm] = useState(null);
  const [showBusConfirm, setShowBusConfirm] = useState(null);

  const [trips, setTrips] = useState([
    { id:"TRP-2025-0041", revenueModel:"TRANSPORT_ONLY",    vehicleType:"own", driver:"Mani Kumar", driverId:"DRV-001", vehicle:"TN69 GH4789", vendorVehicle:null, vendor:null, route:"Chennai → Coimbatore", fromCity:"Chennai", toCity:"Coimbatore", distanceKm:480, freight:42000, advance:20000, expenses:{ diesel:12000, toll:3000, loading:500, unloading:500, misc:500 }, status:"In Transit", agent:"Raja Broker", loadType:"FTL", customer:"Ramco Cements", dateCreated:"2025-04-10", weight:"18T", journeyType:"oneway", vehicleLabel:"Tripper · 16 Wheelers" },
    { id:"TRP-2025-0042", revenueModel:"MATERIAL_SALE",     vehicleType:"own", driver:"Selvam R", driverId:"DRV-002", vehicle:"TN59 AB1234", vendorVehicle:null, vendor:null, route:"Madurai → Bangalore", fromCity:"Madurai", toCity:"Bangalore", distanceKm:440, freight:38000, advance:18000, expenses:{ diesel:11000, toll:2500, loading:500, unloading:500, misc:200 }, status:"Post-Trip Pending", agent:"Suresh Agency", loadType:"FTL", customer:"Godrej Industries", dateCreated:"2025-04-12", weight:"22T", journeyType:"roundtrip", vehicleLabel:"Open Body · 14 Wheelers" },
    { id:"TRP-2025-0043", revenueModel:"TRANSPORT_ONLY",    vehicleType:"vendor", driver:"External Driver", driverId:null, vehicle:null, vendorVehicle:"TN32 XY7821", vendor:"Sri Murugan Transport", route:"Trichy → Mumbai", fromCity:"Trichy", toCity:"Mumbai", distanceKm:1280, freight:75000, advance:0, expenses:{ diesel:0, toll:5000, loading:1000, unloading:1000, misc:1000 }, vendorCost:53760, status:"Pre-Trip Pending", agent:"Direct", loadType:"FTL", customer:"TVS Motors", dateCreated:"2025-04-13", weight:"28T", journeyType:"oneway", vehicleLabel:"Vendor Tripper" },
    { id:"TRP-2025-0044", revenueModel:"MULTI_CONSIGNMENT", vehicleType:"own", driver:"Arjun D", driverId:"DRV-004", vehicle:"TN38 EF9012", vendorVehicle:null, vendor:null, route:"Salem → Hyderabad", fromCity:"Salem", toCity:"Hyderabad", distanceKm:520, freight:33000, advance:15000, expenses:{ diesel:9000, toll:2000, loading:400, unloading:400, misc:300 }, status:"Invoiced", agent:"Kumar Freight", loadType:"LTL", customer:"Pepsico India", dateCreated:"2025-04-14", weight:"12T", journeyType:"crossregion", vehicleLabel:"Flatbed · 12 Wheelers" },
    { id:"TRP-2025-0045", revenueModel:"TRANSPORT_ONLY",    vehicleType:"vendor", driver:"External Driver", driverId:null, vehicle:null, vendorVehicle:"TN58 AB1100", vendor:"KPR Fleet Solutions", route:"Coimbatore → Delhi", fromCity:"Coimbatore", toCity:"Delhi", distanceKm:2100, freight:92000, advance:0, expenses:{ diesel:0, toll:7000, loading:1500, unloading:1500, misc:500 }, vendorCost:92400, status:"Booked", agent:"Raja Broker", loadType:"FTL", customer:"Asian Paints", dateCreated:"2025-04-15", weight:"24T", journeyType:"dedicated", vehicleLabel:"Vendor Trailer" },
    { id:"TRP-2025-0046", revenueModel:"TRANSPORT_ONLY",    vehicleType:"own", driver:"Karthik M", driverId:"DRV-006", vehicle:"TN22 IJ7890", vendorVehicle:null, vendor:null, route:"Chennai → Pune", fromCity:"Chennai", toCity:"Pune", distanceKm:1200, freight:55000, advance:25000, expenses:{ diesel:14000, toll:4000, loading:800, unloading:800, misc:400 }, status:"Pre-Trip Done", agent:"Suresh Agency", loadType:"FTL", customer:"Raj Textiles", dateCreated:"2025-04-09", weight:"20T", journeyType:"multileg", vehicleLabel:"LCV · 4 Wheeler" },
    { id:"TRP-2025-0047", revenueModel:"TRANSPORT_ONLY",    vehicleType:"own", driver:"Mani Kumar", driverId:"DRV-001", vehicle:"TN71 GH3456", vendorVehicle:null, vendor:null, route:"Coimbatore → Hyderabad", fromCity:"Coimbatore", toCity:"Hyderabad", distanceKm:680, freight:47000, advance:22000, expenses:{ diesel:15000, toll:3500, loading:600, unloading:600, misc:400 }, status:"Closed", agent:"Raja Broker", loadType:"FTL", customer:"SKS Logistics", dateCreated:"2025-04-01", weight:"20T", journeyType:"oneway", vehicleLabel:"Container · 14 Wheeler" },
  ]);

  const handleCreated = (trip) => setTrips(t => [trip, ...t]);
  const handleInspectionComplete = (tripId, type, checks, remarks, decision) => {
    setTrips(ts => ts.map(t => {
      if (t.id !== tripId) return t;
      if (type === "pre") return { ...t, status: decision==="maintenance"?"In Maintenance":"Pre-Trip Done" };
      return { ...t, status: decision==="approve"?"Post-Trip Done":decision==="maintenance"?"In Maintenance":"Invoiced" };
    }));
  };

  const filtered = trips.filter(t => {
    const matchSearch = t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.route.toLowerCase().includes(search.toLowerCase()) ||
      (t.customer||"").toLowerCase().includes(search.toLowerCase()) ||
      (t.vehicle||"").toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (filterTab==="own") return t.vehicleType==="own";
    if (filterTab==="vendor") return t.vehicleType==="vendor";
    if (filterTab==="active") return ["Pre-Trip Pending","Pre-Trip Done","Started","In Transit","Arrived","Post-Trip Pending"].includes(t.status);
    if (filterTab==="pending") return ["Pre-Trip Pending","Post-Trip Pending"].includes(t.status);
    return true;
  });

  const pendingInspections = trips.filter(t => t.status==="Pre-Trip Pending"||t.status==="Post-Trip Pending");

  return (
    <div>
      {showCreate && <TripGeneratorModal onClose={() => setShowCreate(false)} onCreated={handleCreated} />}
      {showInspect && <InspectionModal trip={showInspect.trip} type={showInspect.type} onClose={() => setShowInspect(null)} onComplete={handleInspectionComplete} />}
      {showDeliveryConfirm && (
        <TruckDeliveryConfirmModal
          trip={showDeliveryConfirm}
          consignments={consignments.filter(c=>c.tripId===showDeliveryConfirm.id)}
          onClose={()=>setShowDeliveryConfirm(null)}
          onConfirm={(dcForms)=>{
            setConsignments(cs=>cs.map(c=>dcForms[c.id]?{...c,...dcForms[c.id],status:"DELIVERED"}:c));
            setTrips(ts=>ts.map(t=>t.id===showDeliveryConfirm.id?{...t,status:"Post-Trip Pending"}:t));
          }}
        />
      )}
      {showConsignmentForm && (
        <ConsignmentForm
          tripId={showConsignmentForm.id}
          revenueModel={showConsignmentForm.revenueModel}
          onClose={()=>setShowConsignmentForm(null)}
          onAdd={(entries)=>{
            const newCsgs = entries.map((e,i)=>({ id:`CSG-${Date.now()}-${i}`, tripId:showConsignmentForm.id, revenueModel:showConsignmentForm.revenueModel, ...e, revenueAmount:e.rateType==="PER_TON"?parseFloat(e.qty||0)*parseFloat(e.rate||0):parseFloat(e.rate||0), status:"PENDING", podId:null, invoiceId:null, paidAmount:0, balanceDue:0 }));
            setConsignments(cs=>[...cs,...newCsgs]);
          }}
        />
      )}
      {showEqConfirm && (
        <EquipmentHoursConfirmModal
          eq={EQUIPMENT_DATA.find(e=>e.site===showEqConfirm.site)||EQUIPMENT_DATA[0]}
          contractId={showEqConfirm.linkedContractId||"EC-001"}
          onClose={()=>setShowEqConfirm(null)}
          onSave={(data)=>{ console.log("Eq hours logged:", data); }}
        />
      )}
      {showBusConfirm && (
        <BusTripConfirmModal
          bus={{ busNo:showBusConfirm.vehicle||"Bus" }}
          contractId={showBusConfirm.linkedContractId||"FC-006"}
          onClose={()=>setShowBusConfirm(null)}
          onSave={(data)=>{ setTrips(ts=>ts.map(t=>t.id===showBusConfirm.id?{...t,status:"Post-Trip Pending"}:t)); }}
        />
      )}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Trip Management</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>{trips.length} trips · ₹{trips.reduce((s,t)=>s+t.freight,0).toLocaleString()} freight · Own fleet + vendor vehicles</p>
        </div>
        <button className="btn btn-p" onClick={() => setShowCreate(true)}><Ic n="plus" s={14} c="#080B10" /> New Trip Booking</button>
      </div>

      {/* KPIs */}
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(5,1fr)", marginBottom:18 }}>
        {[
          { l:"Total Trips", v:trips.length, c:T.blue },
          { l:"Own Fleet", v:trips.filter(t=>t.vehicleType==="own").length, c:T.green },
          { l:"Vendor Trips", v:trips.filter(t=>t.vehicleType==="vendor").length, c:T.purple },
          { l:"Inspection Pending", v:pendingInspections.length, c:T.orange },
          { l:"Total Freight", v:"₹"+trips.reduce((s,t)=>s+t.freight,0).toLocaleString(), c:T.accent },
        ].map(k => <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>)}
      </div>

      {/* Lifecycle Bar */}
      <div className="lifecycle-bar">
        {TRIP_LIFECYCLE.map((ls, i) => {
          const count = trips.filter(t => t.status===ls).length;
          return (
            <div key={ls} className={`lc-step ${count>0?"active":""}`}>
              <div style={{ fontSize:9, color:count>0?T.accent:T.textMuted, fontWeight:600, letterSpacing:"0.04em" }}>{ls}</div>
              {count > 0 && <div className="rj" style={{ fontSize:16, fontWeight:700, color:T.accent }}>{count}</div>}
            </div>
          );
        })}
      </div>

      {/* Action Required Banner */}
      {pendingInspections.length > 0 && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.orange}44`, background:T.orangeGlow }}>
          <div className="section-title" style={{ color:T.orange }}>⚡ Inspection Action Required — {pendingInspections.length} trip(s)</div>
          {trips.filter(t=>t.status==="Pre-Trip Pending").map(t => (
            <div key={t.id} className="arow" style={{ borderLeftColor:T.green }}>
              <Ic n="pretrip" s={13} c={T.green} />
              <div style={{ flex:1 }}>
                <span className="mono" style={{ fontSize:12, color:T.accent }}>{t.id}</span>
                <span style={{ fontSize:12, color:T.textSub, marginLeft:10 }}>{t.route} · {t.vehicleType==="vendor"?t.vendor:t.vehicle} · {t.vehicleLabel}</span>
              </div>
              <button className="btn btn-g" style={{ fontSize:11 }} onClick={() => setShowInspect({ trip:t, type:"pre" })}>✅ Pre-Trip Inspect</button>
            </div>
          ))}
          {trips.filter(t=>t.status==="Post-Trip Pending").map(t => (
            <div key={t.id} className="arow" style={{ borderLeftColor:T.blue }}>
              <Ic n="posttrip" s={13} c={T.blue} />
              <div style={{ flex:1 }}>
                <span className="mono" style={{ fontSize:12, color:T.accent }}>{t.id}</span>
                <span style={{ fontSize:12, color:T.textSub, marginLeft:10 }}>{t.route} · {t.vehicle}</span>
              </div>
              <button className="btn btn-b" style={{ fontSize:11 }} onClick={() => setShowInspect({ trip:t, type:"post" })}>📋 Post-Trip Inspect</button>
            </div>
          ))}
        </div>
      )}

      {/* Search + View Toggle + Filter Tabs */}
      <div style={{ display:"flex", gap:10, marginBottom:14, alignItems:"center", flexWrap:"wrap" }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search trips, vehicle, customer…" style={{ width:260 }} />
        <div style={{ display:"flex", background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:8, overflow:"hidden" }}>
          {["kanban","list"].map(v => (
            <button key={v} onClick={()=>setViewMode(v)} className="btn" style={{ padding:"6px 14px", background:viewMode===v?T.accentGlow:"transparent", color:viewMode===v?T.accent:T.textSub, borderRadius:0, fontSize:12, textTransform:"capitalize" }}>{v}</button>
          ))}
        </div>
        <div className="toggle-pill">
          {["all","own","vendor","active","pending"].map(f => (
            <div key={f} className={`toggle-opt ${filterTab===f?"on":""}`} style={{ fontSize:11 }} onClick={()=>setFilterTab(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</div>
          ))}
        </div>
      </div>

      {/* KANBAN VIEW */}
      {viewMode === "kanban" && (
        <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:12 }}>
          {TRIP_LIFECYCLE.map(col => {
            const ct = filtered.filter(t => t.status===col);
            const jtype = JOURNEY_TYPES;
            return (
              <div key={col} className="kanban-col">
                <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", color:STATUS_COLORS[col]||T.textMuted, marginBottom:10, display:"flex", justifyContent:"space-between" }}>
                  {col} <span style={{ color:T.textSub }}>{ct.length}</span>
                </div>
                {ct.map(t => {
                  const jt = jtype.find(j => j.id===t.journeyType);
                  return (
                    <div key={t.id} className="kanban-card" onClick={() => setShowTripDetail(t)}>
                      {/* Revenue model badge */}
                      {t.revenueModel && (
                        <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:6 }}>
                          <span style={{ fontSize:9, background:REVENUE_MODELS[t.revenueModel]?.color+"22", color:REVENUE_MODELS[t.revenueModel]?.color, padding:"2px 7px", borderRadius:10, fontWeight:700 }}>
                            {REVENUE_MODELS[t.revenueModel]?.icon} {REVENUE_MODELS[t.revenueModel]?.label}
                          </span>
                          {consignments.filter(c=>c.tripId===t.id).length > 0 && (
                            <span style={{ fontSize:9, color:T.textMuted }}>· {consignments.filter(c=>c.tripId===t.id).length} consignment{consignments.filter(c=>c.tripId===t.id).length>1?"s":""}</span>
                          )}
                        </div>
                      )}
                      <div className="mono" style={{ fontSize:10, color:T.textMuted }}>{t.id}</div>
                      <div style={{ fontSize:12, fontWeight:600, margin:"4px 0" }}>{t.route}</div>
                      {jt && <div style={{ fontSize:10, color:jt.color, marginBottom:4 }}>{jt.icon} {jt.label}</div>}
                      <div style={{ display:"flex", gap:6, marginBottom:6, flexWrap:"wrap" }}>
                        <span className={`badge ${t.vehicleType==="own"?"bg":"bp"}`} style={{ fontSize:9 }}>{t.vehicleType==="own"?"Own":"Vendor"}</span>
                        <span className="badge bc" style={{ fontSize:9 }}>{t.loadType}</span>
                      </div>
                      <div style={{ fontSize:11, color:T.textSub, marginBottom:6 }}>{t.vehicleType==="own"?t.vehicle:t.vendor}</div>
                      {t.status === "Pre-Trip Pending" && (
                        <button className="btn btn-g" style={{ fontSize:11, padding:"4px 8px", width:"100%" }} onClick={e=>{e.stopPropagation();setShowInspect({trip:t,type:"pre"})}}>Pre-Trip Inspect</button>
                      )}
                      {t.status === "Post-Trip Pending" && (
                        <button className="btn btn-b" style={{ fontSize:11, padding:"4px 8px", width:"100%" }} onClick={e=>{e.stopPropagation();setShowInspect({trip:t,type:"post"})}}>Post-Trip Inspect</button>
                      )}
                      {!["Pre-Trip Pending","Post-Trip Pending"].includes(t.status) && (
                        <div style={{ display:"flex", justifyContent:"space-between" }}>
                          <span style={{ fontSize:11, color:T.accent, fontWeight:600 }}>₹{t.freight.toLocaleString()}</span>
                          <span style={{ fontSize:11, color:T.green }}>+₹{(t.freight-tripExpTotal(t.expenses)-(t.vendorCost||0)).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
                {ct.length === 0 && <div style={{ fontSize:11, color:T.textMuted, textAlign:"center", padding:"18px 0" }}>Empty</div>}
              </div>
            );
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === "list" && (
        <div className="card" style={{ padding:0 }}>
          <table className="tbl">
            <thead><tr><th>Trip ID</th><th>Type</th><th>Route</th><th>Journey</th><th>Vehicle/Vendor</th><th>Driver</th><th>Customer</th><th>Freight</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {filtered.map(t => {
                const jt = JOURNEY_TYPES.find(j => j.id===t.journeyType);
                return (
                  <tr key={t.id} style={{ cursor:"pointer" }} onClick={()=>setShowTripDetail(t)}>
                    <td className="mono" style={{ fontSize:11, color:T.accent }}>{t.id}</td>
                    <td>{t.vehicleType==="own"?<span className="badge bg">Own</span>:<span className="badge bp">Vendor</span>}</td>
                    <td style={{ fontWeight:500, fontSize:12 }}>{t.route}</td>
                    <td>{jt && <span className="badge" style={{ background:jt.color+"20", color:jt.color, fontSize:10 }}>{jt.icon} {jt.tag}</span>}</td>
                    <td className="mono" style={{ fontSize:11 }}>{t.vehicleType==="own"?t.vehicle:t.vendor}</td>
                    <td style={{ fontSize:12 }}>{t.driver}</td>
                    <td style={{ fontSize:12 }}>{t.customer}</td>
                    <td style={{ color:T.green, fontWeight:600 }}>₹{t.freight.toLocaleString()}</td>
                    <td><span className="badge" style={{ background:(STATUS_COLORS[t.status]||T.textSub)+"22", color:STATUS_COLORS[t.status]||T.textSub }}>{t.status}</span></td>
                    <td onClick={e=>e.stopPropagation()}>
                      {t.status==="Pre-Trip Pending" && <button className="btn btn-g" style={{ fontSize:11, padding:"4px 8px" }} onClick={()=>setShowInspect({trip:t,type:"pre"})}>Pre-Trip</button>}
                      {t.status==="Post-Trip Pending" && <button className="btn btn-b" style={{ fontSize:11, padding:"4px 8px" }} onClick={()=>setShowInspect({trip:t,type:"post"})}>Post-Trip</button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Trip Detail Modal */}
      {/* ── TRIP SHEET MODAL ─────────────────────────────────────────────── */}
      {showTripDetail && (() => {
        const t = showTripDetail;
        const jt = JOURNEY_TYPES.find(j => j.id === t.journeyType);
        const isOwn = t.vehicleType === "own";
        const totalExp = tripExpTotal(t.expenses) + (isOwn ? 0 : (t.vendorCost||0));
        const profit   = t.freight - totalExp;
        const margin   = t.freight > 0 ? ((profit/t.freight)*100).toFixed(1) : "0.0";
        const driverBalance = isOwn ? (t.advance - tripExpTotal(t.expenses)) : 0;
        const driverOwes    = driverBalance > 0;
        const statusSeq = ["Pre-Trip Pending","Pre-Trip Done","Started","In Transit","Arrived","Post-Trip Pending","Post-Trip Done","Invoiced","Closed"];
        const statusIdx = statusSeq.indexOf(t.status);
        return (
          <div className="ov" style={{ alignItems:"flex-start", paddingTop:20, overflowY:"auto" }}>
            <div style={{ background:T.bgCard, border:`1px solid ${T.borderHi}`, borderRadius:16, width:"100%", maxWidth:1020 }}>

              {/* ── SHEET HEADER ── */}
              <div style={{ background:`linear-gradient(135deg,${isOwn?"#052E16,#064E3B":"#1E1B4B,#2E1065"})`, borderRadius:"16px 16px 0 0", padding:"20px 26px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:6 }}>
                      <div className="rj" style={{ fontSize:26, fontWeight:700, color:"#fff", letterSpacing:1 }}>
                        {isOwn?"🚚":"🤝"} TRIP SHEET
                      </div>
                      <span className="badge" style={{ background:"rgba(255,255,255,.15)", color:"#fff", fontSize:13, fontFamily:"JetBrains Mono" }}>{t.id}</span>
                    </div>
                    <div style={{ fontSize:15, color:"rgba(255,255,255,.85)", fontWeight:600, marginBottom:4 }}>{t.route}</div>
                    <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                      {jt && <span className="badge" style={{ background:jt.color+"33", color:jt.color }}>{jt.icon} {jt.label}</span>}
                      <span className="badge" style={{ background:isOwn?T.green+"33":T.purple+"33", color:isOwn?T.green:T.purple }}>{isOwn?"Own Fleet":"Vendor Trip"}</span>
                      <span className="badge" style={{ background:"rgba(255,255,255,.1)", color:"rgba(255,255,255,.7)" }}>{t.loadType}</span>
                      <span className="badge" style={{ background:"rgba(255,255,255,.1)", color:"rgba(255,255,255,.7)" }}>{t.weight}</span>
                      <span className="badge" style={{ background:(STATUS_COLORS[t.status]||T.textSub)+"44", color:STATUS_COLORS[t.status]||"#fff" }}>{t.status}</span>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <div style={{ textAlign:"right", marginRight:8 }}>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,.5)", textTransform:"uppercase", letterSpacing:".08em" }}>Date Created</div>
                      <div style={{ fontSize:13, color:"rgba(255,255,255,.8)", fontWeight:600, marginTop:2 }}>{t.dateCreated}</div>
                    </div>
                    <button className="btn" style={{ background:"rgba(255,255,255,.12)", color:"#fff", padding:"7px 11px", border:"1px solid rgba(255,255,255,.2)" }} onClick={()=>setShowTripDetail(null)}><Ic n="x" s={14} c="#fff" /></button>
                  </div>
                </div>
              </div>

              {/* ── STATUS TIMELINE ── */}
              <div style={{ padding:"14px 26px", borderBottom:`1px solid ${T.border}`, background:T.bgPanel, overflowX:"auto" }}>
                <div style={{ display:"flex", alignItems:"center", minWidth:700 }}>
                  {statusSeq.map((s, i) => {
                    const done = i < statusIdx;
                    const curr = i === statusIdx;
                    const col  = done ? T.green : curr ? T.accent : T.textMuted;
                    return (
                      <div key={s} style={{ display:"flex", alignItems:"center", flex:1 }}>
                        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                          <div style={{ width:22, height:22, borderRadius:"50%", background:curr?T.accent:done?T.green:T.bgCard, border:`2px solid ${col}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:done?"#fff":curr?"#080B10":T.textMuted }}>
                            {done ? "✓" : i+1}
                          </div>
                          <div style={{ fontSize:8, color:col, fontWeight:curr?700:400, textAlign:"center", width:60, lineHeight:1.3 }}>{s}</div>
                        </div>
                        {i < statusSeq.length-1 && <div style={{ flex:1, height:2, background:done?T.green:T.border, margin:"0 2px", marginBottom:14 }} />}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ padding:"22px 26px" }}>

                {/* ── P&L HERO STRIP ── */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10, marginBottom:20 }}>
                  {[
                    { l:"Freight Revenue", v:fmt(t.freight), c:T.green, border:T.green },
                    { l:isOwn?"Total Expenses":"Vendor + Extras", v:fmt(totalExp), c:T.red, border:T.red },
                    { l:"Net Profit", v:fmt(profit), c:profit>=0?T.green:T.red, border:profit>=0?T.green:T.red },
                    { l:"Margin %", v:`${margin}%`, c:parseFloat(margin)>20?T.green:parseFloat(margin)>5?T.accent:T.red, border:T.accent },
                    { l:isOwn?"Advance Given":"Vendor Cost", v:isOwn?fmt(t.advance):fmt(t.vendorCost||0), c:T.orange, border:T.orange },
                  ].map(k => (
                    <div key={k.l} style={{ background:T.bgPanel, border:`1px solid ${k.border}22`, borderTop:`3px solid ${k.border}`, borderRadius:10, padding:"12px 14px" }}>
                      <div style={{ fontSize:9, color:T.textMuted, textTransform:"uppercase", letterSpacing:".07em" }}>{k.l}</div>
                      <div className="rj" style={{ fontSize:22, fontWeight:700, color:k.c, marginTop:4 }}>{k.v}</div>
                    </div>
                  ))}
                </div>

                {/* ── MAIN BODY: 3 columns ── */}
                <div style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr 1fr", gap:14, marginBottom:16 }}>

                  {/* Col 1 — Trip Info */}
                  <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14 }}>
                    <div className="section-title">📋 Trip Information</div>
                    {[
                      ["Trip ID", t.id],
                      ["Route", t.route],
                      ["Distance", `${t.distanceKm||"—"} km`],
                      ["Journey Type", jt?.label||"—"],
                      ["Load Type", t.loadType],
                      ["Weight", t.weight],
                      ["Customer", t.customer],
                      ["Agent / Broker", t.agent],
                      ["LR Number", t.lrNumber||"—"],
                      ["Date Created", t.dateCreated],
                    ].map(([k,v]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${T.border}18`, fontSize:12 }}>
                        <span style={{ color:T.textMuted }}>{k}</span>
                        <span style={{ fontWeight:500, color:k==="Trip ID"?"transparent":k==="Customer"?T.accent:"inherit", fontFamily:k==="Trip ID"?"JetBrains Mono":"inherit", fontSize:k==="Trip ID"?11:12 }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Col 2 — Vehicle / Vendor */}
                  <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14 }}>
                    <div className="section-title">{isOwn?"🚛 Vehicle & Driver":"🤝 Vendor Details"}</div>
                    {(isOwn ? [
                      ["Vehicle No.", t.vehicle||"—"],
                      ["Vehicle Type", t.vehicleLabel||"—"],
                      ["Driver", t.driver||"—"],
                      ["Driver ID", t.driverId||"—"],
                      ["Advance Given", fmt(t.advance)],
                      ["Diesel (litres)", `${Math.round((t.expenses?.diesel||0)/100)} L`],
                      ["Start Odometer", t.startOdometer||"—"],
                      ["End Odometer", "—"],
                    ] : [
                      ["Vendor Name", t.vendor||"—"],
                      ["Vendor Vehicle", t.vendorVehicle||"—"],
                      ["Vendor Rate/km", t.vendorRatePerKm ? `₹${t.vendorRatePerKm}/km` : "—"],
                      ["Vendor Cost", fmt(t.vendorCost||0)],
                      ["Driver", "Vendor-assigned"],
                      ["Advance Given", "None"],
                      ["KYC Status", "Verified ✓"],
                      ["Contact", "—"],
                    ]).map(([k,v]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:`1px solid ${T.border}18`, fontSize:12 }}>
                        <span style={{ color:T.textMuted }}>{k}</span>
                        <span style={{ fontWeight:500, fontFamily:["Vehicle No.","Driver ID"].includes(k)?"JetBrains Mono":"inherit", fontSize:["Vehicle No.","Driver ID"].includes(k)?11:12, color:k==="Vendor Name"?T.purple:k==="Vendor Cost"?T.red:"inherit" }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Col 3 — Expense Ledger */}
                  <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14 }}>
                    <div className="section-title">💰 Expense Ledger</div>

                    {/* Income */}
                    <div style={{ fontSize:10, color:T.green, fontWeight:700, textTransform:"uppercase", letterSpacing:".06em", marginBottom:6 }}>INCOME</div>
                    {[
                      ["Freight Revenue", t.freight, T.green],
                      ["Advance Received", t.advance||0, T.green],
                    ].map(([k,v,c]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", borderBottom:`1px solid ${T.border}18`, fontSize:12 }}>
                        <span style={{ color:T.textSub }}>{k}</span>
                        <span className="ledger-cr">{fmt(v)}</span>
                      </div>
                    ))}

                    <div style={{ height:1, background:T.border, margin:"10px 0" }} />

                    {/* Expenses */}
                    <div style={{ fontSize:10, color:T.red, fontWeight:700, textTransform:"uppercase", letterSpacing:".06em", marginBottom:6 }}>EXPENSES</div>
                    {(isOwn ? [
                      ["Diesel / Fuel", t.expenses?.diesel||0],
                      ["Toll Charges", t.expenses?.toll||0],
                      ["Loading Charges", t.expenses?.loading||0],
                      ["Unloading Charges", t.expenses?.unloading||0],
                      ["Misc / Others", t.expenses?.misc||0],
                    ] : [
                      ["Vendor Cost", t.vendorCost||0],
                      ["Toll (our share)", t.expenses?.toll||0],
                      ["Loading", t.expenses?.loading||0],
                      ["Unloading", t.expenses?.unloading||0],
                      ["Misc", t.expenses?.misc||0],
                    ]).map(([k,v]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", borderBottom:`1px solid ${T.border}18`, fontSize:12 }}>
                        <span style={{ color:T.textSub }}>{k}</span>
                        <span className="ledger-dr">{v > 0 ? fmt(v) : <span style={{ color:T.textMuted }}>—</span>}</span>
                      </div>
                    ))}

                    <div style={{ height:1, background:T.border, margin:"10px 0" }} />

                    {/* Net */}
                    <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", fontSize:13 }}>
                      <span style={{ fontWeight:700, color:T.text }}>NET PROFIT</span>
                      <span className="rj" style={{ fontSize:18, fontWeight:700, color:profit>=0?T.green:T.red }}>{fmt(profit)}</span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", padding:"2px 0", fontSize:12 }}>
                      <span style={{ color:T.textMuted }}>Margin</span>
                      <span style={{ fontWeight:700, color:parseFloat(margin)>20?T.green:parseFloat(margin)>5?T.accent:T.red }}>{margin}%</span>
                    </div>
                  </div>
                </div>

                {/* ── DRIVER SETTLEMENT SNAPSHOT (own fleet only) ── */}
                {isOwn && (
                  <div style={{ background:driverOwes?T.redGlow:T.greenGlow, border:`1px solid ${driverOwes?T.red:T.green}33`, borderRadius:10, padding:14, marginBottom:16 }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div>
                        <div style={{ fontSize:12, fontWeight:700, color:T.text, marginBottom:4 }}>👤 Driver Settlement — {t.driver}</div>
                        <div style={{ display:"flex", gap:20, fontSize:12 }}>
                          {[
                            ["Advance Given", fmt(t.advance), T.orange],
                            ["Total Expenses", fmt(tripExpTotal(t.expenses)), T.red],
                            [driverOwes?"Driver Returns":"Pay Driver", fmt(Math.abs(driverBalance)), driverOwes?T.red:T.green],
                          ].map(([k,v,c]) => (
                            <div key={k}><span style={{ color:T.textMuted }}>{k}: </span><span style={{ color:c, fontWeight:700 }}>{v}</span></div>
                          ))}
                        </div>
                      </div>
                      <button className="btn btn-o" style={{ fontSize:12 }}><Ic n="wallet" s={13} /> Settle Now</button>
                    </div>
                  </div>
                )}

                {/* ── DOCS & POD ROW ── */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:16 }}>
                  {[
                    { icon:"doc", label:"Lorry Receipt (LR)", value:t.lrNumber||"Pending", color:T.blue, done:!!t.lrNumber },
                    { icon:"clipboard", label:"POD — Proof of Delivery", value:"Not Uploaded", color:T.orange, done:false },
                    { icon:"finance", label:"Invoice Status", value:t.status==="Invoiced"||t.status==="Closed"?"Invoiced":"Not Raised", color:t.status==="Invoiced"||t.status==="Closed"?T.green:T.textMuted, done:t.status==="Invoiced"||t.status==="Closed" },
                  ].map(d => (
                    <div key={d.label} style={{ background:T.bgPanel, border:`1px solid ${d.done?d.color+"44":T.border}`, borderRadius:10, padding:"12px 14px", display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:36, height:36, borderRadius:8, background:d.color+"18", border:`1px solid ${d.color}33`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Ic n={d.icon} s={16} c={d.color} />
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:10, color:T.textMuted, textTransform:"uppercase", letterSpacing:".06em" }}>{d.label}</div>
                        <div style={{ fontSize:12, fontWeight:600, color:d.color, marginTop:2 }}>{d.value}</div>
                      </div>
                      {!d.done && <button className="btn" style={{ fontSize:10, padding:"3px 9px", background:d.color+"20", color:d.color, border:`1px solid ${d.color}33` }}>Upload</button>}
                      {d.done && <span style={{ fontSize:14 }}>✓</span>}
                    </div>
                  ))}
                </div>

                {/* ── INSPECTION HISTORY ── */}
                <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginBottom:16 }}>
                  <div className="section-title">🔍 Inspection History</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    {[
                      { type:"Pre-Trip", status:["Pre-Trip Done","Started","In Transit","Arrived","Post-Trip Pending","Post-Trip Done","Invoiced","Closed"].includes(t.status)?"Completed":"Pending", icon:"pretrip", color:["Pre-Trip Done","Started","In Transit","Arrived","Post-Trip Pending","Post-Trip Done","Invoiced","Closed"].includes(t.status)?T.green:T.orange },
                      { type:"Post-Trip", status:["Post-Trip Done","Invoiced","Closed"].includes(t.status)?"Completed":t.status==="Post-Trip Pending"?"Pending — Action Required":"Not Yet", icon:"posttrip", color:["Post-Trip Done","Invoiced","Closed"].includes(t.status)?T.green:t.status==="Post-Trip Pending"?T.orange:T.textMuted },
                    ].map(ins => (
                      <div key={ins.type} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", background:T.bgCard, borderRadius:8, border:`1px solid ${ins.color}33` }}>
                        <div style={{ width:34, height:34, borderRadius:8, background:ins.color+"18", border:`1px solid ${ins.color}33`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <Ic n={ins.icon} s={15} c={ins.color} />
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:12, fontWeight:700 }}>{ins.type} Inspection</div>
                          <div style={{ fontSize:11, color:ins.color, marginTop:2 }}>{ins.status}</div>
                        </div>
                        {ins.status.includes("Pending") && (
                          <button className="btn" style={{ fontSize:11, padding:"4px 10px", background:ins.color+"20", color:ins.color, border:`1px solid ${ins.color}33` }}
                            onClick={() => { setShowTripDetail(null); setShowInspect({ trip:t, type:ins.type==="Pre-Trip"?"pre":"post" }); }}>
                            Start
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── ACTIONS FOOTER ── */}
                <div style={{ display:"flex", gap:8, flexWrap:"wrap", paddingTop:4 }}>
                  {t.status==="Pre-Trip Pending" && <button className="btn btn-g" onClick={()=>{setShowTripDetail(null);setShowInspect({trip:t,type:"pre"})}}><Ic n="pretrip" s={13} /> Pre-Trip Inspect</button>}
                  {t.status==="Post-Trip Pending" && <button className="btn btn-b" onClick={()=>{setShowTripDetail(null);setShowInspect({trip:t,type:"post"})}}><Ic n="posttrip" s={13} /> Post-Trip Inspect</button>}
                  {t.status==="In Transit" && t.revenueModel && (
                    <button className="btn" style={{ background:T.green+"22", color:T.green, border:`1px solid ${T.green}33`, fontSize:11 }} onClick={()=>{ setShowTripDetail(null); setShowDeliveryConfirm(t); }}>
                      ✅ Confirm Delivery
                    </button>
                  )}
                  {["Started","In Transit"].includes(t.status) && <button className="btn btn-g" onClick={()=>setTrips(ts=>ts.map(x=>x.id===t.id?{...x,status:"Arrived"}:x))}><Ic n="check" s={13} /> Mark Arrived</button>}
                  {t.status==="Arrived" && <button className="btn btn-g" onClick={()=>setTrips(ts=>ts.map(x=>x.id===t.id?{...x,status:"Post-Trip Pending"}:x))}><Ic n="check" s={13} /> Mark Delivered → Post-Trip</button>}
                  {t.status==="Post-Trip Done" && <button className="btn btn-c" onClick={()=>setTrips(ts=>ts.map(x=>x.id===t.id?{...x,status:"Invoiced"}:x))}><Ic n="finance" s={13} /> Raise Invoice</button>}
                  <button className="btn btn-b"><Ic n="doc" s={13} /> Upload POD</button>
                  {isOwn && <button className="btn btn-o"><Ic n="wallet" s={13} /> Settle Driver</button>}
                  <button className="btn btn-gh" style={{ marginLeft:"auto" }} onClick={()=>setShowTripDetail(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PRE-TRIP PAGE — full v2 layout
// ═══════════════════════════════════════════════════════════════════════════════
const PreTripPage = () => {
  const vehicleTypes = [
    { name:"Open body 14 wheeler Pre-trip inspection", vehicles:18, submissions:12, color:T.blue },
    { name:"Flatbed 14 wheeler Pre-trip inspection", vehicles:18, submissions:12, color:T.green },
    { name:"Flatbed 16 wheeler Pre-trip inspection", vehicles:18, submissions:16, color:T.accent },
    { name:"Open body 18 wheeler Pre-trip inspection", vehicles:18, submissions:12, color:T.orange },
    { name:"Open body Lift axle Pre-trip inspection", vehicles:18, submissions:8, color:T.purple },
    { name:"Open body Live axle Pre-trip inspection", vehicles:18, submissions:14, color:T.cyan },
    { name:"Trailer Double wheeler Pre-trip inspection", vehicles:18, submissions:10, color:T.red },
    { name:"Trailer Double Pre-trip inspection", vehicles:18, submissions:12, color:T.orange },
  ];

  // Richer submission data per v2 — now 10 records with 3-col grid
  const submissionsByType = {
    "Open body Lift axle Pre-trip inspection": [
      { plate:"TN69GH4563", time:"Mani @ 2:00 11/4/2024", defects:0, status:"Passed" },
      { plate:"TN69SH4563", time:"Mani @ 2:00 11/4/2024", defects:0, status:"Passed" },
      { plate:"TN69WH4563", time:"Mani @ 2:00 11/4/2024", defects:0, status:"Passed" },
      { plate:"TN69IH4563", time:"Mani @ 2:00 11/4/2024", defects:0, status:"Passed" },
      { plate:"TN69FH4563", time:"Mani @ 2:00 11/4/2024", defects:0, status:"Passed" },
      { plate:"TN69GH4563", time:"Mani @ 2:00 11/4/2024", defects:0, status:"Passed" },
      { plate:"TN69CH4563", time:"Mani @ 2:00 11/4/2024", defects:0, status:"Passed" },
      { plate:"TN69DH4563", time:"Mani @ 2:00 11/4/2024", defects:0, status:"Passed" },
      { plate:"TN69FH4563", time:"Mani @ 2:00 11/4/2024", defects:0, status:"Passed" },
      { plate:"TN69RH4563", time:"Mani @ 2:00 11/4/2024", defects:3, status:"Failed" },
    ],
  };
  const defaultSubs = [
    { plate:"TN69 GH4789", time:"Mani Kumar @ 08:00 · 15 Apr", defects:0, status:"Passed" },
    { plate:"TN59 AB1234", time:"Selvam R @ 07:30 · 15 Apr", defects:1, status:"Failed" },
    { plate:"TN38 EF9012", time:"Arjun D @ 08:15 · 15 Apr", defects:0, status:"Passed" },
    { plate:"TN22 IJ7890", time:"Karthik M @ 07:45 · 15 Apr", defects:0, status:"Passed" },
    { plate:"TN77 KL1234", time:"Babu S @ 09:00 · 15 Apr", defects:0, status:"Passed" },
    { plate:"TN30 MN5678", time:"Rajan K @ 08:45 · 15 Apr", defects:2, status:"Failed" },
    { plate:"TN45 CD5678", time:"Ramesh P @ 09:30 · 15 Apr", defects:0, status:"Passed" },
    { plate:"TN71 GH3456", time:"Vinoth S @ 06:50 · 15 Apr", defects:0, status:"Passed" },
    { plate:"TN33 PQ9988", time:"Pending — not submitted yet", defects:null, status:"Pending" },
  ];

  const [selectedType, setSelectedType] = useState(vehicleTypes[4].name);
  const [plateSearch, setPlateSearch] = useState("");
  const [showInspectLaunch, setShowInspectLaunch] = useState(null);

  const subs = (submissionsByType[selectedType] || defaultSubs).filter(r =>
    !plateSearch || r.plate.toLowerCase().includes(plateSearch.toLowerCase())
  );

  return (
    <div>
      {showInspectLaunch && (
        <InspectionModal
          trip={{ id:`INSPECT-${Date.now()}`, vehicle:showInspectLaunch, route:"—", driver:"—", vehicleType:"own", vendor:null }}
          type="pre"
          onClose={() => setShowInspectLaunch(null)}
          onComplete={() => setShowInspectLaunch(null)}
        />
      )}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Pre-Trip Inspection</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>Drivers to fill out before they begin their shift</p>
        </div>
        <button className="btn btn-p" onClick={() => setShowInspectLaunch("Manual")}><Ic n="plus" s={14} c="#080B10" /> Start Inspection</button>
      </div>

      <div className="kpi-row kpi4" style={{ marginBottom:20 }}>
        {[
          { label:"Due Today", value:"8", color:T.orange },
          { label:"Completed", value:"5", color:T.green },
          { label:"Defects Found", value:"2", color:T.red },
          { label:"Pending", value:"3", color:T.accent },
        ].map(s => <div key={s.label} className="stat"><div className="stat-v" style={{ color:s.color }}>{s.value}</div><div className="stat-l">{s.label}</div></div>)}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:16 }}>
        {/* Left — 8-type vehicle category grid (3 columns, matches v2 screenshot) */}
        <div>
          <div className="section-title">Vehicle Type Categories</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
            {vehicleTypes.map((vt, i) => (
              <div key={i}
                className="card-sm"
                style={{
                  borderLeft:`3px solid ${vt.color}`,
                  cursor:"pointer",
                  border: selectedType===vt.name ? `1px solid ${vt.color}` : `1px solid ${T.border}`,
                  borderLeft: `3px solid ${vt.color}`,
                  background: selectedType===vt.name ? vt.color+"10" : T.bgCard,
                  transition:"all .15s",
                }}
                onClick={() => setSelectedType(vt.name)}>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:vt.color, flexShrink:0 }} />
                  <div style={{ fontSize:11, fontWeight:600, color:T.text, lineHeight:1.3 }}>{vt.name}</div>
                </div>
                <div style={{ fontSize:10, color:T.textSub, marginBottom:8 }}>Drivers to fill out before they begin their shift</div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11 }}>
                  <span style={{ color:T.textMuted }}>Vehicles</span>
                  <span className="mono" style={{ fontWeight:600 }}>{vt.vehicles}</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginTop:3 }}>
                  <span style={{ color:T.textMuted }}>Submissions</span>
                  <span className="mono" style={{ fontWeight:600, color:vt.submissions<vt.vehicles?T.orange:T.green }}>{vt.submissions}</span>
                </div>
                <div className="pbar" style={{ marginTop:8 }}>
                  <div className="pfill" style={{ width:`${(vt.submissions/vt.vehicles)*100}%`, background:vt.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — 3-col card grid exactly matching v2 screenshot */}
        <div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
            <div style={{ fontSize:13, fontWeight:600, color:T.text, maxWidth:200, lineHeight:1.3 }}>{selectedType}</div>
            <input value={plateSearch} onChange={e=>setPlateSearch(e.target.value)} placeholder="Search plate no..." style={{ width:160, fontSize:11 }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
            {subs.map((r, i) => (
              <div key={i} className="card-sm" style={{ padding:12, cursor:"pointer",
                border:`1px solid ${r.status==="Passed"?T.green+"44":r.status==="Failed"?T.red+"44":r.status==="Pending"?T.border:T.orange+"44"}`,
                background:r.status==="Pending"?T.bgPanel:T.bgCard }}
                onClick={() => r.status==="Pending" && setShowInspectLaunch(r.plate)}>
                <div className="mono" style={{ fontSize:12, fontWeight:600, color:r.status==="Pending"?T.textMuted:T.text }}>{r.plate}</div>
                <div style={{ fontSize:10, color:T.textMuted, margin:"4px 0" }}>Completed by:</div>
                <div style={{ fontSize:11, color:T.textSub, marginBottom:8, lineHeight:1.4 }}>{r.time}</div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ fontSize:11 }}>
                    <span style={{ color:T.textMuted }}>Defects: </span>
                    <span style={{ color:r.defects>0?T.red:r.defects===null?T.textMuted:T.green, fontWeight:600 }}>{r.defects??"-"}</span>
                  </div>
                  <div style={{ width:12, height:12, borderRadius:"50%", background:r.status==="Passed"?T.green:r.status==="Failed"?T.red:r.status==="Pending"?T.textMuted:T.orange }} />
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:6, fontSize:11 }}>
                  {r.status==="Pending"
                    ? <button style={{ background:"none", border:"none", color:T.orange, cursor:"pointer", fontSize:11, padding:0, fontWeight:600 }}>▶ Start</button>
                    : <button style={{ background:"none", border:"none", color:T.blue, cursor:"pointer", fontSize:11, padding:0 }}>Details</button>
                  }
                  <span style={{ color:r.status==="Passed"?T.green:r.status==="Failed"?T.red:r.status==="Pending"?T.orange:T.accent, fontWeight:600 }}>{r.status}</span>
                </div>
              </div>
            ))}
            {subs.length === 0 && (
              <div style={{ gridColumn:"1/-1", textAlign:"center", color:T.textMuted, fontSize:12, padding:"28px 0" }}>No records match</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// POST-TRIP PAGE — full v2 layout
// ═══════════════════════════════════════════════════════════════════════════════
const PostTripPage = () => {
  const [showInspectLaunch, setShowInspectLaunch] = useState(null);

  const postSubmissions = [
    { plate:"TN69 GH4789", driver:"Mani Kumar", tripId:"TRP-2025-0041", time:"Mani @ 18:00 · 10 Apr", defects:0, odo:"74,875", decision:"Approved" },
    { plate:"TN59 AB1234", driver:"Selvam R", tripId:"TRP-2025-0039", time:"Selvam @ 19:30 · 09 Apr", defects:1, odo:"92,340", decision:"Maintenance" },
    { plate:"TN38 EF9012", driver:"Arjun D", tripId:"TRP-2025-0044", time:"Arjun @ 17:45 · 08 Apr", defects:0, odo:"54,220", decision:"Approved" },
    { plate:"TN71 GH3456", driver:"Vinoth S", tripId:"TRP-2025-0038", time:"Vinoth @ 20:00 · 07 Apr", defects:2, odo:"88,910", decision:"Maintenance" },
    { plate:"TN22 IJ7890", driver:"Karthik M", tripId:"TRP-2025-0036", time:"Karthik @ 16:30 · 06 Apr", defects:0, odo:"31,440", decision:"Approved" },
    { plate:"TN45 CD5678", driver:"Ramesh P", tripId:"TRP-2025-0035", time:"Ramesh @ 21:15 · 05 Apr", defects:3, odo:"124,000", decision:"Maintenance" },
    { plate:"TN30 MN5678", driver:"Rajan K", tripId:"TRP-2025-0034", time:"Rajan @ 18:45 · 04 Apr", defects:0, odo:"108,200", decision:"Approved" },
    { plate:"TN77 KL1234", driver:"Babu S", tripId:"TRP-2025-0033", time:"Pending — in transit", defects:null, odo:null, decision:"Pending" },
    { plate:"TN59 AB1234", driver:"Selvam R", tripId:"TRP-2025-0042", time:"Pending — just arrived", defects:null, odo:null, decision:"Pending" },
  ];

  return (
    <div>
      {showInspectLaunch && (
        <InspectionModal
          trip={{ id:`INSPECT-${Date.now()}`, vehicle:showInspectLaunch, route:"—", driver:"—", vehicleType:"own", vendor:null }}
          type="post"
          onClose={() => setShowInspectLaunch(null)}
          onComplete={() => setShowInspectLaunch(null)}
        />
      )}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Post-Trip Inspection</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>Vehicle inspection after every trip return — defects auto-create work orders</p>
        </div>
        <button className="btn btn-p" onClick={() => setShowInspectLaunch("Manual")}><Ic n="plus" s={14} c="#080B10" /> Start Post-Trip</button>
      </div>

      <div className="kpi-row kpi4" style={{ marginBottom:20 }}>
        {[
          { label:"Pending Review", value:"2", color:T.orange },
          { label:"Approved", value:"7", color:T.green },
          { label:"Sent to Maintenance", value:"3", color:T.red },
          { label:"Avg KM / Trip", value:"566", color:T.blue },
        ].map(s => <div key={s.label} className="stat"><div className="stat-v" style={{ color:s.color }}>{s.value}</div><div className="stat-l">{s.label}</div></div>)}
      </div>

      {/* Pending action banner */}
      {postSubmissions.some(r => r.decision==="Pending") && (
        <div className="card" style={{ marginBottom:16, border:`1px solid ${T.orange}44`, background:T.orangeGlow }}>
          <div className="section-title" style={{ color:T.orange }}>⚡ Post-Trip Pending — Vehicles Just Returned</div>
          {postSubmissions.filter(r => r.decision==="Pending").map((r,i) => (
            <div key={i} className="arow" style={{ borderLeftColor:T.orange }}>
              <Ic n="posttrip" s={13} c={T.orange} />
              <div style={{ flex:1 }}>
                <span className="mono" style={{ fontSize:12, color:T.accent }}>{r.plate}</span>
                <span style={{ fontSize:12, color:T.textSub, marginLeft:10 }}>{r.driver} · {r.tripId}</span>
              </div>
              <button className="btn btn-p" style={{ fontSize:11 }} onClick={() => setShowInspectLaunch(r.plate)}>📋 Start Inspection</button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:16, marginBottom:16 }}>
        {/* Left — 3-col card grid */}
        <div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
            <div className="section-title" style={{ margin:0 }}>All Submissions</div>
            <input placeholder="Search plate..." style={{ width:160, fontSize:11 }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
            {postSubmissions.map((r, i) => (
              <div key={i} className="card-sm" style={{ padding:12, cursor:"pointer",
                border:`1px solid ${r.decision==="Approved"?T.green+"44":r.decision==="Maintenance"?T.red+"44":r.decision==="Pending"?T.orange+"44":T.border}`,
                background:r.decision==="Pending"?T.orangeGlow:T.bgCard }}
                onClick={() => r.decision==="Pending" && setShowInspectLaunch(r.plate)}>
                <div className="mono" style={{ fontSize:12, fontWeight:600 }}>{r.plate}</div>
                <div style={{ fontSize:10, color:T.textMuted, margin:"4px 0" }}>Completed by:</div>
                <div style={{ fontSize:11, color:T.textSub, marginBottom:8, lineHeight:1.4 }}>{r.time}</div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ fontSize:11 }}>
                    <span style={{ color:T.textMuted }}>Defects: </span>
                    <span style={{ color:r.defects>0?T.red:r.defects===null?T.textMuted:T.green, fontWeight:600 }}>{r.defects??"-"}</span>
                  </div>
                  <div style={{ width:12, height:12, borderRadius:"50%", background:r.decision==="Approved"?T.green:r.decision==="Maintenance"?T.red:r.decision==="Pending"?T.orange:T.textMuted }} />
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:6, fontSize:11 }}>
                  {r.decision==="Pending"
                    ? <button style={{ background:"none", border:"none", color:T.orange, cursor:"pointer", fontSize:11, padding:0, fontWeight:600 }}>▶ Start</button>
                    : <button style={{ background:"none", border:"none", color:T.blue, cursor:"pointer", fontSize:11, padding:0 }}>Details</button>
                  }
                  <span style={{ color:r.decision==="Approved"?T.green:r.decision==="Maintenance"?T.red:r.decision==="Pending"?T.orange:T.accent, fontWeight:600 }}>{r.decision}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — defects + maintenance */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div className="card">
            <div className="section-title">Top Defects This Month</div>
            {[["Tyre pressure",8],["Engine oil",5],["Brakes",4],["Lights",3],["Radiator",2]].map(([item,count]) => (
              <div key={item} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:3 }}>
                  <span style={{ color:T.textSub }}>{item}</span>
                  <span style={{ color:T.red, fontWeight:600 }}>{count}x</span>
                </div>
                <div className="pbar"><div className="pfill" style={{ width:`${(count/8)*100}%`, background:T.red }} /></div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="section-title">Maintenance Auto-Triggered</div>
            {[
              { id:"MJC-022", issue:"Brake pad wear", truck:"TN59 AB1234", status:"In Progress" },
              { id:"MJC-023", issue:"Oil leak", truck:"TN69 GH4789", status:"Scheduled" },
              { id:"MJC-024", issue:"Tyre damage (RL)", truck:"TN22 IJ7890", status:"Done" },
              { id:"MJC-025", issue:"Alternator fault", truck:"TN38 EF9012", status:"In Progress" },
            ].map(m => (
              <div key={m.id} className="card-sm" style={{ marginBottom:8 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div className="mono" style={{ fontSize:10, color:T.textMuted }}>{m.id}</div>
                    <div style={{ fontSize:13, fontWeight:600 }}>{m.issue}</div>
                    <div style={{ fontSize:11, color:T.textSub }}>{m.truck}</div>
                  </div>
                  <span className={`badge ${m.status==="Done"?"bg":m.status==="In Progress"?"bo":"bb"}`}>{m.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History table */}
      <div className="card">
        <div className="section-title">Recent Post-Trip Submissions</div>
        <table className="tbl">
          <thead><tr><th>Trip ID</th><th>Vehicle</th><th>Driver</th><th>Odometer</th><th>Defects</th><th>Decision</th><th>Date</th></tr></thead>
          <tbody>
            {postSubmissions.filter(r=>r.decision!=="Pending").map((r, i) => (
              <tr key={i}>
                <td className="mono" style={{ fontSize:11, color:T.accent }}>{r.tripId}</td>
                <td className="mono" style={{ fontSize:11 }}>{r.plate}</td>
                <td style={{ fontSize:12 }}>{r.driver}</td>
                <td className="mono" style={{ fontSize:11 }}>{r.odo ? r.odo+" km" : "—"}</td>
                <td style={{ color:r.defects>0?T.red:T.green, fontWeight:600 }}>{r.defects}</td>
                <td><span className={`badge ${r.decision==="Approved"?"bg":"bo"}`}>{r.decision}</span></td>
                <td style={{ fontSize:11, color:T.textMuted }}>{r.time.split("·")[1]?.trim()||"—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ALL OTHER MODULES (carried from v4)
// ═══════════════════════════════════════════════════════════════════════════════
const VendorPage = () => {
  const [tab, setTab] = useState("vendors");
  const [sel, setSel] = useState(null);
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Vendor Fleet</h1><p style={{ color:T.textSub, fontSize:12 }}>KYC, rate contracts, vehicle pool & performance</p></div>
        <button className="btn btn-p"><Ic n="plus" s={14} c="#080B10" /> Onboard Vendor</button>
      </div>
      <div className="kpi-row kpi4" style={{ marginBottom:18 }}>
        {[
          { l:"Active Vendors", v:VENDORS.length, c:T.green },
          { l:"Vendor Vehicles", v:VENDOR_VEHICLES.length, c:T.blue },
          { l:"Available Now", v:VENDOR_VEHICLES.filter(v=>v.status==="Available").length, c:T.cyan },
          { l:"Vendor Trips", v:2, c:T.purple },
        ].map(k => <div key={k.l} className="stat"><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>)}
      </div>
      <div className="tabs">{["vendors","vehicles","rates"].map(t=><div key={t} className={`tab ${tab===t?"on":""}`} onClick={()=>setTab(t)} style={{ textTransform:"capitalize" }}>{t}</div>)}</div>
      {tab === "vendors" && (
        <div className="grd2">
          {VENDORS.map(v => (
            <div key={v.id} className="card" style={{ cursor:"pointer" }} onClick={()=>setSel(v)}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                <div><div style={{ fontWeight:700, fontSize:14 }}>{v.name}</div><div style={{ fontSize:11, color:T.textSub }}>{v.contact} · {v.city}</div></div>
                <div style={{ textAlign:"right" }}><div className="rj" style={{ fontSize:20, fontWeight:700, color:T.accent }}>★ {v.rating}</div><span className="badge bg">Active</span></div>
              </div>
              <div style={{ display:"flex", gap:16, fontSize:12, color:T.textSub }}>
                <div><span style={{ color:T.blue, fontWeight:600 }}>{v.vehicles}</span> vehicles</div>
                <div><span style={{ color:T.green, fontWeight:600 }}>{v.totalTrips}</span> trips</div>
                <div><span style={{ color:T.purple, fontWeight:600 }}>₹{v.ratePerKm}/km</span></div>
                <div><span className="badge bg">KYC ✓</span></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "vehicles" && (
        <div className="card" style={{ padding:0 }}>
          <table className="tbl">
            <thead><tr><th>Vehicle No</th><th>Vendor</th><th>Model</th><th>Type</th><th>Rate/km</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {VENDOR_VEHICLES.map(v => (
                <tr key={v.id}>
                  <td className="mono" style={{ fontSize:11, color:T.purple }}>{v.num}</td>
                  <td>{v.vendor}</td>
                  <td>{v.model}</td>
                  <td><span className="badge bb">{v.type}</span></td>
                  <td style={{ fontWeight:600, color:T.accent }}>₹{v.ratePerKm}/km</td>
                  <td><span className={`badge ${v.status==="Available"?"bg":"bo"}`}>{v.status}</span></td>
                  <td><button className="btn btn-p" style={{ fontSize:10, padding:"3px 10px" }}>Assign Trip</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === "rates" && (
        <div className="card">
          <div className="section-title">Rate Comparison Engine</div>
          <div className="frow fr3" style={{ marginBottom:14 }}>
            <div><label className="flabel">From City</label><input placeholder="Coimbatore" /></div>
            <div><label className="flabel">To City</label><input placeholder="Mumbai" /></div>
            <div><label className="flabel">Distance (km)</label><input placeholder="1280" /></div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            {[{ label:"Own Fleet (est.)", cost:"₹52,480", color:T.green, rec:true },
              ...VENDORS.map(v => ({ label:v.name, cost:fmt(v.ratePerKm*1280), color:T.purple, rec:false }))
            ].map((opt,i) => (
              <div key={i} style={{ flex:1, background:T.bgPanel, border:`1px solid ${opt.color}33`, borderRadius:10, padding:14, textAlign:"center" }}>
                <div style={{ fontSize:11, color:T.textMuted, marginBottom:4 }}>{opt.label}</div>
                <div className="rj" style={{ fontSize:22, fontWeight:700, color:opt.color }}>{opt.cost}</div>
                {opt.rec && <div style={{ marginTop:8 }}><span className="badge bg">Recommended</span></div>}
              </div>
            ))}
          </div>
        </div>
      )}
      {sel && (
        <div className="ov">
          <div className="modal" style={{ maxWidth:500 }}>
            <div className="mhdr" style={{ background:"linear-gradient(135deg,#2E1065,#4C1D95)" }}>
              <div><div className="rj" style={{ fontSize:18, fontWeight:700, color:"#fff" }}>{sel.name}</div><div style={{ fontSize:12, color:"#DDD6FE" }}>{sel.contact} · {sel.city}</div></div>
              <button className="btn" style={{ background:"rgba(255,255,255,.1)", color:"#fff", padding:"5px 9px" }} onClick={()=>setSel(null)}><Ic n="x" s={14} c="#fff" /></button>
            </div>
            <div className="mbdy">
              <div className="grd3" style={{ marginBottom:14 }}>
                {[{ l:"Rating", v:`★ ${sel.rating}`, c:T.accent },{ l:"Trips", v:sel.totalTrips, c:T.blue },{ l:"Freight", v:fmt(sel.totalFreight), c:T.green }].map(k => (
                  <div key={k.l} style={{ background:T.bgPanel, borderRadius:8, padding:"10px 12px" }}><div style={{ fontSize:10, color:T.textMuted }}>{k.l}</div><div className="rj" style={{ fontSize:16, fontWeight:700, color:k.c }}>{k.v}</div></div>
                ))}
              </div>
              <div style={{ display:"flex", gap:8 }}><button className="btn btn-p"><Ic n="trips" s={13} c="#080B10" /> Create Trip</button><button className="btn btn-gh" onClick={()=>setSel(null)}>Close</button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// WORKSHOP & MAINTENANCE — AI WORK ORDER INTELLIGENCE SYSTEM v2
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Extended Work Order Seed Data ───────────────────────────────────────────
const WO_DATA_INIT = [
  { id:"WO-001", vehicle:"TN45 CD5678", workshop:"Ganesh Auto Works, Nagpur", workshopType:"Mechanical", type:"Corrective", category:"Engine", subCategory:"Cooling System", source:"Breakdown", priority:"CRITICAL", issue:"Engine overheating during long haul — radiator hose burst", odometer:124000, status:"In Progress", waitReason:null, created:"2025-04-10", approvedBy:"Fleet Manager", approvalLevel:"Manager", estimatedCost:9500, partsUsed:[{name:"Radiator Hose",qty:1,unitCost:2800,total:2800},{name:"Coolant 5L",qty:2,unitCost:600,total:1200}], labourCost:4500, totalCost:8500, invoiceStatus:"Pending", breakdownRef:"BRK-001", duplicateFlag:false, aiCostDeviation:null, gstAmount:1530 },
  { id:"WO-002", vehicle:"TN59 AB1234", workshop:"Power Electricals, Chennai", workshopType:"Electrical", type:"Corrective", category:"Electrical", subCategory:"Charging System", source:"AI Prediction", priority:"HIGH", issue:"Battery not charging — alternator fault predicted by AI 3 days before failure", odometer:92340, status:"Open", waitReason:"Waiting for Parts", created:"2025-04-14", approvedBy:"Auto-Approved", approvalLevel:"Auto", estimatedCost:11500, partsUsed:[{name:"Alternator",qty:1,unitCost:8500,total:8500}], labourCost:2500, totalCost:11000, invoiceStatus:"Pending", breakdownRef:null, duplicateFlag:false, aiCostDeviation:null, gstAmount:1980 },
  { id:"WO-003", vehicle:"TN69 GH4789", workshop:"Sri Ram Tyre Centre, Chennai", workshopType:"Tyre", type:"Preventive", category:"Tyre System", subCategory:"Rotation & Alignment", source:"Scheduled", priority:"LOW", issue:"Scheduled tyre rotation & wheel alignment at 74,000 km mark", odometer:74875, status:"Completed", waitReason:null, created:"2025-04-08", approvedBy:"Auto-Approved", approvalLevel:"Auto", estimatedCost:2200, partsUsed:[{name:"Alignment",qty:1,unitCost:800,total:800}], labourCost:1200, totalCost:2000, invoiceStatus:"Paid", breakdownRef:null, duplicateFlag:false, aiCostDeviation:null, gstAmount:360 },
  { id:"WO-004", vehicle:"TN45 CD5678", workshop:"Ganesh Auto Works, Nagpur", workshopType:"Mechanical", type:"Corrective", category:"Engine", subCategory:"Cooling System", source:"Inspection", priority:"HIGH", issue:"Radiator leak — REPEAT ISSUE (same vehicle, same system, 20 days apart)", odometer:124800, status:"Open", waitReason:null, created:"2025-04-14", approvedBy:"Pending", approvalLevel:"Senior", estimatedCost:18000, partsUsed:[], labourCost:0, totalCost:0, invoiceStatus:"Pending", breakdownRef:null, duplicateFlag:true, aiCostDeviation:null, gstAmount:0 },
  { id:"WO-005", vehicle:"TN38 EF9012", workshop:"BharatBenz Service, Hyderabad", workshopType:"Mechanical", type:"Preventive", category:"Brake System", subCategory:"Brake Pads", source:"Scheduled", priority:"MEDIUM", issue:"Brake pad replacement — front axle at 54,000 km scheduled service", odometer:54220, status:"Completed", waitReason:null, created:"2025-04-06", approvedBy:"Auto-Approved", approvalLevel:"Auto", estimatedCost:7000, partsUsed:[{name:"Brake Pads (Front Axle Set)",qty:1,unitCost:6500,total:6500}], labourCost:1200, totalCost:7700, invoiceStatus:"Paid", breakdownRef:null, duplicateFlag:false, aiCostDeviation:10, gstAmount:1386 },
];

// ─── AI Classification Engine ─────────────────────────────────────────────────
const ISSUE_CATEGORIES = {
  "Engine": { sub:["Overheating","Oil Leak","Engine Noise","Starting Issue","Power Loss","Turbo Fault"], icon:"🔧", color:"#EF4444", workshop:"Mechanical Workshop" },
  "Electrical": { sub:["Battery","Alternator","Wiring Fault","ECU Error","Sensor Failure","Lighting"], icon:"⚡", color:"#F59E0B", workshop:"Electrical Workshop" },
  "Tyre System": { sub:["Rotation","Alignment","Puncture Repair","Tyre Burst","Balancing"], icon:"🛞", color:"#3B82F6", workshop:"Tyre Shop" },
  "Brake System": { sub:["Brake Pads","Air Brake","ABS Fault","Brake Drum","Brake Fluid"], icon:"🛑", color:"#8B5CF6", workshop:"Mechanical Workshop" },
  "Gearbox": { sub:["Clutch Replacement","Gear Oil","Gear Slip","Differential","Transmission Noise"], icon:"⚙️", color:"#F97316", workshop:"Specialized Workshop" },
  "Suspension": { sub:["Shock Absorbers","Leaf Spring","Steering","Axle","Ball Joint"], icon:"🔩", color:"#06B6D4", workshop:"Mechanical Workshop" },
  "Cooling System": { sub:["Radiator","Coolant Flush","Water Pump","Thermostat","Fan Belt"], icon:"🌡️", color:"#10B981", workshop:"Mechanical Workshop" },
  "Body & Cabin": { sub:["Denting","Painting","Windshield","Door","Bumper"], icon:"🪵", color:"#94A3B8", workshop:"Body Shop" },
};

const WORKSHOP_VENDORS = [
  { id:"WV-001", name:"Ganesh Auto Works",      city:"Nagpur",   type:"Mechanical",  rating:4.3, avgTAT:"1.5 days", costIndex:0.9,  distance:3,  speciality:"Engine & Gearbox" },
  { id:"WV-002", name:"Power Electricals",       city:"Chennai",  type:"Electrical",  rating:4.6, avgTAT:"0.5 days", costIndex:1.0,  distance:8,  speciality:"ECU, Alternator, Wiring" },
  { id:"WV-003", name:"Sri Ram Tyre Centre",     city:"Chennai",  type:"Tyre",        rating:4.2, avgTAT:"0.3 days", costIndex:0.85, distance:5,  speciality:"Alignment, Rotation, Balancing" },
  { id:"WV-004", name:"BharatBenz Service",      city:"Hyderabad",type:"Mechanical",  rating:4.7, avgTAT:"2 days",   costIndex:1.2,  distance:12, speciality:"OEM authorized, all systems" },
  { id:"WV-005", name:"Chennai Body Works",      city:"Chennai",  type:"Body Shop",   rating:4.1, avgTAT:"3 days",   costIndex:1.0,  distance:10, speciality:"Denting, painting, cabin" },
  { id:"WV-006", name:"Singh Gear Specialists",  city:"Delhi",    type:"Specialized", rating:4.8, avgTAT:"1 day",    costIndex:1.3,  distance:28, speciality:"Gearbox rebuild, differential" },
];

const WO_STATUS_PIPELINE = [
  { id:"Created",             color:"#94A3B8", icon:"📋" },
  { id:"Pending Approval",    color:"#F59E0B", icon:"⏳" },
  { id:"Approved",            color:"#3B82F6", icon:"✅" },
  { id:"Sent to Workshop",    color:"#8B5CF6", icon:"📤" },
  { id:"In Progress",         color:"#F97316", icon:"🔧" },
  { id:"Waiting for Parts",   color:"#EF4444", icon:"📦" },
  { id:"Pending Approval (Cost Overrun)",color:"#EF4444",icon:"⚠️" },
  { id:"Completed",           color:"#10B981", icon:"✅" },
];

// AI Cost Prediction Engine
function aiCostPredict(category, subCategory, vehicleKm) {
  const baseCosts = {
    "Engine":        { parts:8000, labour:4000 },
    "Electrical":    { parts:6000, labour:2500 },
    "Tyre System":   { parts:2000, labour:1200 },
    "Brake System":  { parts:6500, labour:1500 },
    "Gearbox":       { parts:14000, labour:5000 },
    "Suspension":    { parts:5000, labour:2500 },
    "Cooling System":{ parts:3500, labour:2000 },
    "Body & Cabin":  { parts:4000, labour:6000 },
  };
  const base = baseCosts[category] || { parts:5000, labour:2500 };
  const ageFactor = vehicleKm > 100000 ? 1.2 : vehicleKm > 50000 ? 1.0 : 0.9;
  const parts = Math.round(base.parts * ageFactor);
  const labour = base.labour;
  const total = parts + labour;
  const gst = Math.round(total * 0.18);
  return { parts, labour, total, gst, confidence: vehicleKm > 100000 ? "high" : "medium" };
}

// Duplicate check engine
function checkDuplicate(vehicle, category, existingWOs) {
  const recent = existingWOs.filter(wo =>
    wo.vehicle === vehicle &&
    wo.category === category &&
    wo.status !== "Cancelled"
  );
  if (recent.length === 0) return null;
  const last = recent[recent.length - 1];
  const daysDiff = Math.floor((new Date() - new Date(last.created)) / 86400000);
  if (daysDiff < 30) return { flag:true, lastWO:last.id, daysDiff, warning:`Same category repaired ${daysDiff} days ago. Root cause analysis required.` };
  return null;
}

// Approval level logic
function getApprovalLevel(estimatedCost) {
  if (estimatedCost < 5000)  return { level:"Auto", approver:"System Auto-Approved", badge:"bg" };
  if (estimatedCost < 20000) return { level:"Manager", approver:"Fleet Manager approval required", badge:"ba" };
  return                             { level:"Senior", approver:"Senior / Owner approval required", badge:"br" };
}

// ─── Create Work Order Wizard ─────────────────────────────────────────────────
const CreateWOWizard = ({ prefill, onClose, onSave }) => {
  const STEPS = ["Issue Source","Category & Issue","Workshop","Cost Estimate","Review & Approve"];
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    vehicle:    prefill?.vehicle || "",
    source:     prefill?.source  || "Manual",
    category:   prefill?.category || "",
    subCat:     "",
    issue:      prefill?.issue || "",
    priority:   prefill?.priority || "MEDIUM",
    odometer:   "",
    type:       "Corrective",
    workshopId: "",
    notes:      "",
    scheduleDate:"",
    breakdownRef: prefill?.breakdownRef || "",
    aiPredRef:    prefill?.aiPredRef    || "",
  });
  const rf = (k,v) => setForm(f=>({...f,[k]:v}));

  const catSpec    = ISSUE_CATEGORIES[form.category];
  const vehicle    = FLEET_DATA.find(v=>v.num===form.vehicle);
  const aiCost     = form.category ? aiCostPredict(form.category, form.subCat, parseInt(form.odometer)||vehicle?.km||50000) : null;
  const dupCheck   = form.vehicle && form.category ? checkDuplicate(form.vehicle, form.category, WO_DATA_INIT) : null;
  const approval   = aiCost ? getApprovalLevel(aiCost.total) : null;
  const recVendors = WORKSHOP_VENDORS.filter(w => w.type === catSpec?.workshop?.split(" ")[0] || w.type === "Mechanical").slice(0,3);
  const selWorkshop = WORKSHOP_VENDORS.find(w=>w.id===form.workshopId);

  const StepDot = ({ n, label }) => (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
      <div style={{ display:"flex", alignItems:"center", width:"100%" }}>
        {n>1 && <div style={{ flex:1, height:2, background:step>n-1?T.orange:T.border }} />}
        <div style={{ width:26, height:26, borderRadius:"50%", background:step===n?T.orange:step>n?T.green:T.bgPanel, border:`2px solid ${step===n?T.orange:step>n?T.green:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:"#fff", margin:"0 auto" }}>
          {step>n?"✓":n}
        </div>
        {n<5 && <div style={{ flex:1, height:2, background:step>n?T.green:T.border }} />}
      </div>
      <div style={{ fontSize:8, color:step===n?T.orange:T.textMuted, textAlign:"center", whiteSpace:"nowrap" }}>{label}</div>
    </div>
  );
  const FR = ({children,cols=2}) => (<div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap:12, marginBottom:12 }}>{children}</div>);
  const F = ({label,children,hint}) => (<div><label className="flabel">{label}</label>{children}{hint&&<div style={{ fontSize:10, color:T.textMuted, marginTop:3 }}>{hint}</div>}</div>);

  return (
    <div className="ov" style={{ alignItems:"flex-start", paddingTop:20, overflowY:"auto" }}>
      <div className="modal" style={{ maxWidth:680, width:"100%", margin:"0 auto" }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#1C0A00,#431407,#F9731622)", borderBottom:`1px solid ${T.orange}33` }}>
          <div>
            <div className="rj" style={{ fontSize:19, fontWeight:700, color:T.orange }}>🔧 Create Work Order</div>
            <div style={{ fontSize:11, color:T.textSub, marginTop:2 }}>AI cost prediction · duplicate check · auto approval · vendor suggestion</div>
          </div>
          <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
        </div>
        <div className="mbdy">
          <div style={{ display:"flex", marginBottom:22 }}>
            {STEPS.map((s,i) => <StepDot key={s} n={i+1} label={s} />)}
          </div>

          {/* STEP 1 — Issue Source */}
          {step===1 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.orange, marginBottom:16 }}>Step 1 — Issue Source & Vehicle</div>
              <F label="Vehicle *">
                <select value={form.vehicle} onChange={e=>rf("vehicle",e.target.value)}>
                  <option value="">— Select Vehicle —</option>
                  {FLEET_DATA.map(v=><option key={v.id}>{v.num} — {v.model}</option>)}
                </select>
              </F>
              {vehicle && (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:12 }}>
                  {[{ l:"KM", v:vehicle.km.toLocaleString() },{ l:"Health", v:`${vehicle.health}%` },{ l:"Status", v:vehicle.status },{ l:"Make", v:vehicle.make }].map(k=>(
                    <div key={k.l} style={{ background:T.bgPanel, borderRadius:7, padding:"7px 10px" }}><div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div><div style={{ fontSize:11, fontWeight:600, marginTop:2 }}>{k.v}</div></div>
                  ))}
                </div>
              )}
              <div style={{ marginBottom:14 }}>
                <label className="flabel">Issue Source — How was this issue detected?</label>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginTop:6 }}>
                  {[
                    { id:"Manual",         icon:"✍️",  desc:"Fleet manager / owner creates manually" },
                    { id:"Driver Report",  icon:"📱",  desc:"Driver reported via app" },
                    { id:"AI Prediction",  icon:"🤖",  desc:"AI flagged future failure" },
                    { id:"Inspection",     icon:"🔍",  desc:"Pre/post trip inspection failure" },
                    { id:"Breakdown",      icon:"🚨",  desc:"Vehicle broke down on road" },
                    { id:"Scheduled",      icon:"📅",  desc:"Preventive maintenance schedule" },
                  ].map(s=>(
                    <div key={s.id} onClick={()=>rf("source",s.id)} style={{ padding:"9px 10px", borderRadius:9, cursor:"pointer", border:`2px solid ${form.source===s.id?T.orange:T.border}`, background:form.source===s.id?T.orangeGlow:T.bgPanel, transition:"all .15s" }}>
                      <div style={{ fontSize:16, marginBottom:3 }}>{s.icon}</div>
                      <div style={{ fontSize:11, fontWeight:600, color:form.source===s.id?T.orange:T.text }}>{s.id}</div>
                      <div style={{ fontSize:9, color:T.textMuted, marginTop:1 }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              {form.source==="Breakdown" && (
                <F label="Breakdown Reference ID" hint="Links this WO to the breakdown record"><input value={form.breakdownRef} onChange={e=>rf("breakdownRef",e.target.value)} placeholder="BRK-001" /></F>
              )}
              {form.source==="AI Prediction" && (
                <F label="AI Prediction Reference" hint="From AI Predictions module"><input value={form.aiPredRef} onChange={e=>rf("aiPredRef",e.target.value)} placeholder="PRED-TN45-001" /></F>
              )}
              <FR cols={2}>
                <F label="Maintenance Type"><select value={form.type} onChange={e=>rf("type",e.target.value)}><option>Corrective</option><option>Preventive</option><option>Predictive</option><option>Emergency</option><option>Compliance</option></select></F>
                <F label="Current Odometer (km)"><input value={form.odometer} onChange={e=>rf("odometer",e.target.value)} placeholder={vehicle?.km||"74875"} /></F>
              </FR>
            </div>
          )}

          {/* STEP 2 — Category & Issue */}
          {step===2 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.orange, marginBottom:16 }}>Step 2 — Issue Classification</div>
              <div style={{ marginBottom:14 }}>
                <label className="flabel">System Category *</label>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginTop:6 }}>
                  {Object.entries(ISSUE_CATEGORIES).map(([cat,spec])=>(
                    <div key={cat} onClick={()=>rf("category",cat)} style={{ padding:"10px 8px", borderRadius:9, cursor:"pointer", border:`2px solid ${form.category===cat?spec.color:T.border}`, background:form.category===cat?spec.color+"18":T.bgPanel, textAlign:"center", transition:"all .15s" }}>
                      <div style={{ fontSize:20, marginBottom:3 }}>{spec.icon}</div>
                      <div style={{ fontSize:10, fontWeight:600, color:form.category===cat?spec.color:T.textSub }}>{cat}</div>
                    </div>
                  ))}
                </div>
              </div>
              {catSpec && (
                <FR cols={2}>
                  <F label="Sub-Category">
                    <select value={form.subCat} onChange={e=>rf("subCat",e.target.value)}>
                      <option value="">— Select sub-category —</option>
                      {catSpec.sub.map(s=><option key={s}>{s}</option>)}
                    </select>
                  </F>
                  <F label="Priority">
                    <select value={form.priority} onChange={e=>rf("priority",e.target.value)}>
                      <option>CRITICAL</option><option>HIGH</option><option>MEDIUM</option><option>LOW</option>
                    </select>
                  </F>
                </FR>
              )}
              <F label="Issue Description *">
                <textarea value={form.issue} onChange={e=>rf("issue",e.target.value)} placeholder="Describe the issue clearly — what was heard, seen, or detected..." style={{ height:65 }} />
              </F>
              {/* Duplicate check alert */}
              {dupCheck && dupCheck.flag && (
                <div style={{ background:T.redGlow, border:`1px solid ${T.red}44`, borderRadius:8, padding:12, marginTop:4 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:T.red, marginBottom:4 }}>🚨 Duplicate Issue Alert — AI Detected Repeat</div>
                  <div style={{ fontSize:11, color:T.textSub }}>{dupCheck.warning}</div>
                  <div style={{ fontSize:11, color:T.textMuted, marginTop:4 }}>Last WO: <strong style={{ color:T.red }}>{dupCheck.lastWO}</strong> · {dupCheck.daysDiff} days ago</div>
                  <div style={{ fontSize:11, color:T.orange, marginTop:4 }}>⚠️ Possible root cause not resolved. This will be escalated for Senior approval.</div>
                </div>
              )}
              {/* AI recommended action */}
              {form.category && (
                <div style={{ background:T.orangeGlow, border:`1px solid ${T.orange}33`, borderRadius:8, padding:10, marginTop:10 }}>
                  <div style={{ fontSize:11, color:T.orange, fontWeight:700, marginBottom:4 }}>🤖 AI Recommended Actions — {form.category}</div>
                  <div style={{ fontSize:11, color:T.textSub }}>
                    {form.category==="Engine" ? "Check radiator, coolant level, oil pressure. Inspect belts and hoses. Run diagnostic scan for fault codes."
                     : form.category==="Electrical" ? "Check battery voltage (min 12.4V). Test alternator output. Inspect wiring harness and fuse box."
                     : form.category==="Tyre System" ? "Inspect tread depth, tyre pressure, sidewall condition. Check alignment and wheel balance."
                     : form.category==="Brake System" ? "Check brake pad thickness, brake fluid level, air pressure in air brake system."
                     : form.category==="Gearbox" ? "Check gear oil level, clutch play, gearbox noise under load. Inspect differential."
                     : "Inspect component, document findings, capture photos."}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 — Workshop Selection */}
          {step===3 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.orange, marginBottom:16 }}>Step 3 — Workshop / Vendor Selection</div>
              <div style={{ background:T.accentGlow, border:`1px solid ${T.accent}33`, borderRadius:8, padding:10, marginBottom:14, fontSize:11, color:T.textSub }}>
                🤖 AI recommends vendors based on: speciality match · cost index · past rating · distance · average turnaround time
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
                {WORKSHOP_VENDORS.map(w=>(
                  <div key={w.id} onClick={()=>rf("workshopId",w.id)} style={{ padding:"12px 14px", borderRadius:10, cursor:"pointer", border:`2px solid ${form.workshopId===w.id?T.accent:T.border}`, background:form.workshopId===w.id?T.accentGlow:T.bgPanel, display:"flex", gap:12, alignItems:"center", transition:"all .15s" }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4 }}>
                        <span style={{ fontSize:13, fontWeight:700, color:form.workshopId===w.id?T.accent:T.text }}>{w.name}</span>
                        <span style={{ fontSize:9, background:T.blue+"18", color:T.blue, padding:"1px 7px", borderRadius:10, fontWeight:600 }}>{w.type}</span>
                        {catSpec && w.type===catSpec.workshop.split(" ")[0] && <span style={{ fontSize:9, background:T.green+"18", color:T.green, padding:"1px 7px", borderRadius:10, fontWeight:600 }}>✓ Speciality Match</span>}
                      </div>
                      <div style={{ display:"flex", gap:12, fontSize:11, color:T.textSub }}>
                        <span>📍 {w.city}</span>
                        <span>⭐ {w.rating}</span>
                        <span>⏱ TAT: {w.avgTAT}</span>
                        <span>📏 {w.distance} km away</span>
                        <span>💰 Cost: {w.costIndex<1?"Below avg":w.costIndex===1?"Avg":"Above avg"}</span>
                      </div>
                    </div>
                    {form.workshopId===w.id && <div style={{ fontSize:20 }}>✅</div>}
                  </div>
                ))}
              </div>
              <FR cols={2}>
                <F label="Preferred Schedule Date"><input type="date" value={form.scheduleDate} onChange={e=>rf("scheduleDate",e.target.value)} /></F>
                <F label="Additional Notes"><input value={form.notes} onChange={e=>rf("notes",e.target.value)} placeholder="Any special instructions for workshop" /></F>
              </FR>
            </div>
          )}

          {/* STEP 4 — Cost Estimate */}
          {step===4 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.orange, marginBottom:16 }}>Step 4 — AI Cost Estimate & Approval</div>
              {aiCost && (
                <div style={{ background:`linear-gradient(135deg,${T.bgPanel},${T.orange}08)`, border:`1px solid ${T.orange}33`, borderRadius:12, padding:16, marginBottom:16 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:T.orange, marginBottom:10 }}>🤖 AI Cost Prediction — {form.category} / {form.subCat||"General"}</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:10 }}>
                    {[{ l:"Parts Cost", v:fmt(aiCost.parts), c:T.red },{ l:"Labour Cost", v:fmt(aiCost.labour), c:T.orange },{ l:"GST (18%)", v:fmt(aiCost.gst), c:T.textMuted },{ l:"Total Estimate", v:fmt(aiCost.total+aiCost.gst), c:T.accent }].map(k=>(
                      <div key={k.l} style={{ background:T.bgCard, borderRadius:8, padding:"10px 12px" }}>
                        <div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div>
                        <div style={{ fontSize:14, fontWeight:700, color:k.c, marginTop:3 }}>{k.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <span style={{ fontSize:11, color:T.textMuted }}>Confidence:</span>
                    <span className={`badge ${aiCost.confidence==="high"?"bg":"ba"}`}>{aiCost.confidence}</span>
                    <span style={{ fontSize:11, color:T.textMuted, marginLeft:8 }}>Based on {form.vehicle} history · {form.category} avg costs</span>
                  </div>
                </div>
              )}
              {/* Approval level */}
              {approval && (
                <div style={{ background:approval.level==="Auto"?T.greenGlow:approval.level==="Manager"?T.accentGlow:T.redGlow, border:`1px solid ${approval.level==="Auto"?T.green:approval.level==="Manager"?T.accent:T.red}44`, borderRadius:10, padding:14, marginBottom:14 }}>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <span style={{ fontSize:24 }}>{approval.level==="Auto"?"⚡":approval.level==="Manager"?"👤":"🔐"}</span>
                    <div>
                      <div style={{ fontSize:12, fontWeight:700, color:approval.level==="Auto"?T.green:approval.level==="Manager"?T.accent:T.red }}>Approval Level: {approval.level}</div>
                      <div style={{ fontSize:11, color:T.textSub, marginTop:2 }}>{approval.approver}</div>
                      <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>
                        {approval.level==="Auto" ? "< ₹5,000 — auto-approved, sent directly to workshop"
                         : approval.level==="Manager" ? "₹5,000–₹20,000 — fleet manager approval in app"
                         : "₹20,000+ — senior / owner approval required before execution"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Duplicate flag warning in cost step */}
              {dupCheck?.flag && (
                <div style={{ background:T.redGlow, border:`1px solid ${T.red}44`, borderRadius:8, padding:10, marginBottom:10 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.red }}>🚨 Duplicate Issue — Cost Leakage Alert</div>
                  <div style={{ fontSize:11, color:T.textSub, marginTop:3 }}>This is a repeat repair. Industry data: repeat repairs cost 2–4x more than root-cause fixes. Senior approval required to prevent cost leakage.</div>
                </div>
              )}
              {/* Cost by category breakdown */}
              {form.category && (
                <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14 }}>
                  <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:8 }}>Historical Cost Intelligence — {form.category}</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {[
                      { label:"Avg past WO cost (same category)", v:fmt(aiCost?.total||8000) },
                      { label:"Highest WO on this vehicle", v:fmt((aiCost?.total||8000)*1.4) },
                      { label:"Recommended max budget", v:fmt((aiCost?.total||8000)*1.2) },
                    ].map(r=>(
                      <div key={r.label} style={{ display:"flex", justifyContent:"space-between", fontSize:12, padding:"4px 0", borderBottom:`1px solid ${T.border}22` }}>
                        <span style={{ color:T.textSub }}>{r.label}</span>
                        <span style={{ fontWeight:600 }}>{r.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5 — Review & Approve */}
          {step===5 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:16 }}>Step 5 — Final Review & Submit</div>
              {/* WO Preview card */}
              <div style={{ background:`linear-gradient(135deg,${T.bgPanel},${T.bgCard})`, border:`1px solid ${T.accent}44`, borderRadius:12, padding:16, marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                  <div>
                    <div className="rj mono" style={{ fontSize:16, fontWeight:700, color:T.accent }}>🔧 WORK ORDER DRAFT</div>
                    <div style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>ID will be assigned on save</div>
                  </div>
                  <div style={{ display:"flex", gap:6 }}>
                    <span className={`badge ${form.priority==="CRITICAL"?"br":form.priority==="HIGH"?"bo":form.priority==="MEDIUM"?"ba":"bg"}`}>{form.priority}</span>
                    <span className="badge bc">{form.type}</span>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                  {[
                    { l:"Vehicle",     v:form.vehicle||"—" },
                    { l:"Source",      v:form.source },
                    { l:"Category",    v:form.category||"—" },
                    { l:"Sub-Cat",     v:form.subCat||"—" },
                    { l:"Workshop",    v:selWorkshop?.name||"—" },
                    { l:"Est. Cost",   v:aiCost?fmt(aiCost.total+aiCost.gst):"—" },
                    { l:"Approval",    v:approval?.level||"—" },
                    { l:"Breakdown Ref",v:form.breakdownRef||"—" },
                    { l:"Schedule",    v:form.scheduleDate||"ASAP" },
                  ].map(k=>(
                    <div key={k.l} style={{ background:T.bgCard, borderRadius:7, padding:"7px 10px" }}>
                      <div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div>
                      <div style={{ fontSize:11, fontWeight:600, marginTop:2 }}>{k.v}</div>
                    </div>
                  ))}
                </div>
                {form.issue && (
                  <div style={{ marginTop:10, padding:"8px 10px", background:T.bgPanel, borderRadius:7 }}>
                    <div style={{ fontSize:9, color:T.textMuted, marginBottom:3 }}>Issue</div>
                    <div style={{ fontSize:11 }}>{form.issue}</div>
                  </div>
                )}
              </div>
              {dupCheck?.flag && (
                <div style={{ background:T.redGlow, border:`1px solid ${T.red}44`, borderRadius:8, padding:10, marginBottom:10, fontSize:11, color:T.red }}>
                  🚨 <strong>Repeat Issue Detected</strong> — This WO will be auto-escalated to Senior approval for root cause review.
                </div>
              )}
              {approval && (
                <div style={{ background:T.accentGlow, border:`1px solid ${T.accent}33`, borderRadius:8, padding:10, fontSize:11, color:T.textSub }}>
                  📤 After submission, WO will be: <strong style={{ color:T.accent }}>{approval.level==="Auto"?"auto-approved and sent to workshop immediately":approval.level==="Manager"?"sent to fleet manager for approval":"sent to senior/owner for approval"}</strong>
                </div>
              )}
            </div>
          )}

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:22, paddingTop:14, borderTop:`1px solid ${T.border}` }}>
            <button className="btn btn-gh" onClick={()=>step>1?setStep(s=>s-1):onClose()}>{step===1?"Cancel":"← Back"}</button>
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ fontSize:11, color:T.textMuted, alignSelf:"center" }}>Step {step} of 5</div>
              <button className="btn" style={{ background:step===5?T.green:T.orange, color:"#080B10", fontWeight:700 }} onClick={()=>step<5?setStep(s=>s+1):(onSave&&onSave({...form,aiCost,approval,selWorkshop,dupFlag:dupCheck?.flag}),onClose())}>
                {step===5?"🔧 Submit Work Order":"Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── WO Detail Panel ──────────────────────────────────────────────────────────
const WODetailPanel = ({ wo, onClose }) => {
  const statusC = { Completed:T.green, "In Progress":T.orange, Open:T.blue, "Waiting for Parts":T.red };
  const pipeline = WO_STATUS_PIPELINE;
  const curIdx = pipeline.findIndex(s=>s.id===wo.status);

  return (
    <div className="ov">
      <div className="modal" style={{ maxWidth:640 }}>
        <div className="mhdr" style={{ background:`linear-gradient(135deg,#1C0A00,#431407)`, borderBottom:`1px solid ${T.orange}33` }}>
          <div>
            <div className="rj mono" style={{ fontSize:18, fontWeight:700, color:T.orange }}>{wo.id}</div>
            <div style={{ fontSize:11, color:T.textSub }}>{wo.vehicle} · {wo.category} · {wo.type}</div>
          </div>
          <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
        </div>
        <div className="mbdy">
          {/* Status pipeline */}
          <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:12, marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:10 }}>Work Order Status Pipeline</div>
            <div style={{ display:"flex", overflowX:"auto", gap:0 }}>
              {["Created","Approved","Sent to Workshop","In Progress","Completed"].map((s,i)=>{
                const done = i <= Math.min(curIdx, 4);
                const current = s === wo.status;
                return (
                  <div key={s} style={{ display:"flex", alignItems:"center", flexShrink:0 }}>
                    <div style={{ textAlign:"center", width:90 }}>
                      <div style={{ width:28, height:28, borderRadius:"50%", background:done?T.orange:T.bgCard, border:`2px solid ${done?T.orange:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 4px", fontSize:10 }}>
                        {done ? (current ? "●" : "✓") : i+1}
                      </div>
                      <div style={{ fontSize:9, color:done?T.orange:T.textMuted, fontWeight:done?600:400, lineHeight:1.3 }}>{s}</div>
                    </div>
                    {i<4 && <div style={{ width:20, height:2, background:done&&i<curIdx?T.orange:T.border, flexShrink:0 }} />}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Flags */}
          {wo.duplicateFlag && (
            <div style={{ background:T.redGlow, border:`1px solid ${T.red}44`, borderRadius:8, padding:10, marginBottom:10 }}>
              <div style={{ fontSize:12, fontWeight:700, color:T.red }}>🚨 Duplicate Issue Flag — Root Cause Not Resolved</div>
              <div style={{ fontSize:11, color:T.textSub, marginTop:3 }}>Same system repaired recently. Cost leakage risk HIGH. Senior approval required.</div>
            </div>
          )}
          {wo.waitReason && (
            <div style={{ background:T.orangeGlow, border:`1px solid ${T.orange}33`, borderRadius:8, padding:10, marginBottom:10 }}>
              <div style={{ fontSize:11, color:T.orange, fontWeight:700 }}>⏳ Wait Reason: {wo.waitReason}</div>
            </div>
          )}
          {/* KPIs */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:14 }}>
            {[{ l:"Parts Cost", v:fmt(wo.partsUsed.reduce((s,p)=>s+p.total,0)), c:T.red },{ l:"Labour Cost", v:fmt(wo.labourCost), c:T.orange },{ l:"GST", v:fmt(wo.gstAmount||0), c:T.textMuted },{ l:"Total", v:fmt(wo.totalCost), c:T.accent }].map(k=>(
              <div key={k.l} style={{ background:T.bgPanel, borderRadius:8, padding:"8px 10px" }}><div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div><div style={{ fontSize:14, fontWeight:700, color:k.c, marginTop:2 }}>{k.v}</div></div>
            ))}
          </div>
          {/* Cost deviation alert */}
          {wo.aiCostDeviation && wo.aiCostDeviation > 15 && (
            <div style={{ background:T.redGlow, border:`1px solid ${T.red}33`, borderRadius:8, padding:10, marginBottom:10 }}>
              <div style={{ fontSize:11, fontWeight:700, color:T.red }}>💸 Cost Overrun: +{wo.aiCostDeviation}% above AI estimate</div>
              <div style={{ fontSize:11, color:T.textSub, marginTop:3 }}>Actual cost exceeded estimate by >{wo.aiCostDeviation}%. Flagged for review.</div>
            </div>
          )}
          {/* Parts table */}
          {wo.partsUsed.length > 0 && (
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:8 }}>Parts Used</div>
              <div style={{ background:T.bgPanel, borderRadius:8, overflow:"hidden" }}>
                {wo.partsUsed.map((p,i)=>(
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 12px", borderBottom:i<wo.partsUsed.length-1?`1px solid ${T.border}22`:"none", fontSize:12 }}>
                    <span>{p.name} {p.qty && p.qty>1 ? `× ${p.qty}` : ""}</span>
                    <span style={{ fontWeight:600, color:T.red }}>{fmt(p.total)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ display:"flex", gap:6, fontSize:11, color:T.textMuted, flexWrap:"wrap", marginBottom:12 }}>
            <span>Workshop: <strong style={{ color:T.text }}>{wo.workshop}</strong></span>
            <span>·</span>
            <span>Approval: <strong style={{ color:T.text }}>{wo.approvedBy}</strong></span>
            {wo.breakdownRef && <><span>·</span><span>Breakdown: <strong style={{ color:T.red }}>{wo.breakdownRef}</strong></span></>}
          </div>
          <div style={{ display:"flex", gap:8 }}>
            {wo.status!=="Completed" && <button className="btn btn-p" style={{ fontSize:11 }}>Update Status</button>}
            <button className="btn btn-g" style={{ fontSize:11 }}>View Invoice</button>
            <button className="btn btn-gh" style={{ fontSize:11 }} onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Workshop Page ───────────────────────────────────────────────────────


// ═══════════════════════════════════════════════════════════════════════════════
// PREVENTIVE MAINTENANCE SETTINGS ENGINE
// Per-vehicle-type service intervals, grease packing, oil change, brake, consumables
// Research-backed intervals from Tata PRIMA service manual + industry standards
// ═══════════════════════════════════════════════════════════════════════════════

// ─── PM Task Categories ───────────────────────────────────────────────────────
const PM_CATEGORIES = {
  grease:    { label:"Grease & Lubrication", icon:"🟡", color:"#F59E0B", desc:"Grease packing, nipple lubrication, bearing repacking, leaf spring greasing" },
  engine_oil:{ label:"Engine Oil & Fluids",  icon:"🛢️", color:"#3B82F6", desc:"Engine oil change, oil filter, gearbox oil, differential oil, power steering" },
  brake:     { label:"Brake System",         icon:"🔴", color:"#EF4444", desc:"Brake pads/shoes, brake drums, brake fluid, slack adjusters, brake lining" },
  cooling:   { label:"Cooling System",       icon:"🔵", color:"#06B6D4", desc:"Coolant flush, radiator, thermostat, water pump, hoses" },
  filter:    { label:"Filters",              icon:"⬜", color:"#94A3B8", desc:"Air filter, fuel filter, oil filter, AC filter replacement" },
  electrical:{ label:"Electrical",           icon:"⚡", color:"#8B5CF6", desc:"Battery check, alternator, wiring, lights, sensors" },
  drivetrain:{ label:"Drivetrain",           icon:"⚙️", color:"#10B981", desc:"Clutch, gearbox, propeller shaft, axle, wheel bearing" },
  body:      { label:"Body & Structure",     icon:"🚛", color:"#6366F1", desc:"Chassis bolts, body mounting, cab tilt, fifth wheel" },
  consumable:{ label:"Consumables",          icon:"📦", color:"#F97316", desc:"Wiper blades, belts, bulbs, cabin air filter" },
};

// ─── Grease packing master — all grease points per lorry type ─────────────────
// Source: Tata PRIMA SC/2019/56 service manual + industry best practice
const GREASE_PACKING_MASTER = {
  // task_id: { label, category, grease_type, quantity_grams, interval_km, interval_months, interval_hours, procedure, stock_item, notes }
  "GP-001": { label:"Front Wheel Hub Bearing — Re-pack",       cat:"grease", greaseType:"Lithium Complex EP2 / Shell Gadus S3 V220C",    qty:250, intervalKm:40000, intervalMonths:12, intervalHrs:1000, procedure:"Remove hub, dismantle, clean with solvent, inspect bearings for pitting, re-pack rollers by hand, fill hub cavity 1/3 full, replace seal, reassemble, adjust hub play", notes:"Critical — overheating/noise = bearing failure. Monthly inspection for HCV. Replace bearings in pairs." },
  "GP-002": { label:"Rear Hub Bearing — Re-pack (Drive Axle)", cat:"grease", greaseType:"Lithium Complex EP2 / Shell Gadus",               qty:300, intervalKm:60000, intervalMonths:18, intervalHrs:1500, procedure:"Same as front but drive axle — only use oil for driven axles per TMC standard. Check seal for leaks. Torque axle nuts to spec.", notes:"Drive axles: use oil-bath lubricant, not grease. Non-driven: either is acceptable." },
  "GP-003": { label:"Front Leaf Spring — Graphite Grease",     cat:"grease", greaseType:"Graphite Grease",                                 qty:100, intervalKm:10000, intervalMonths:3,  intervalHrs:250,  procedure:"Clean leaf surfaces with wire brush, apply graphite grease between leaves evenly, wipe excess, check U-bolts", notes:"Prevents inter-leaf friction squeak and corrosion. Crucial for loaded trucks on rough roads." },
  "GP-004": { label:"Rear Leaf Spring — Graphite Grease",      cat:"grease", greaseType:"Graphite Grease",                                 qty:150, intervalKm:10000, intervalMonths:3,  intervalHrs:250,  procedure:"Similar to front. Extra attention at shackle pins and spring eye bushes", notes:"Always do front and rear together." },
  "GP-005": { label:"Steering Linkage Nipples (All Points)",   cat:"grease", greaseType:"Lithium EP2 Multipurpose Grease",                 qty:30,  intervalKm:5000,  intervalMonths:1,  intervalHrs:100,  procedure:"Use grease gun on all nipple points — tie rod ends, king pins, drag link ball joints, steering box. Wipe excess.", notes:"Monthly for heavily loaded trucks. Count nipple points per model — PRIMA has 18+ nipple points." },
  "GP-006": { label:"King Pin & Stub Axle Grease",             cat:"grease", greaseType:"Lithium EP2 / Molykote Paste",                    qty:80,  intervalKm:15000, intervalMonths:3,  intervalHrs:400,  procedure:"Pump grease gun on king pin nipple until old grease purges. Check king pin play — max 1.5mm acceptable.", notes:"King pin wear causes tyre feathering, instability at speed, shimmy. Critical safety item." },
  "GP-007": { label:"Propeller Shaft Universal Joints",        cat:"grease", greaseType:"Lithium Complex EP2",                             qty:50,  intervalKm:10000, intervalMonths:3,  intervalHrs:250,  procedure:"Grease nipple on each UJ spider. Pump until slight purge. Check for dry/cracked UJ boots.", notes:"Neglect causes vibration, driveshaft failure at speed. Very common failure in India." },
  "GP-008": { label:"Fifth Wheel Plate — Trailer Coupling",    cat:"grease", greaseType:"Fifth Wheel Grease / Lithium Soap Thickened",     qty:500, intervalKm:10000, intervalMonths:2,  intervalHrs:250,  procedure:"Clean coupling plate thoroughly, apply thick even layer of fifth wheel grease, check jaw lock mechanism", notes:"Critical for artic trucks. Insufficient grease causes premature coupling wear and king pin cracking." },
  "GP-009": { label:"Chassis Nipple Points — Full Set",        cat:"grease", greaseType:"Lithium EP2 Multipurpose",                        qty:200, intervalKm:5000,  intervalMonths:1,  intervalHrs:125,  procedure:"Systematic nipple-by-nipple greasing. Tata LPT: 24 nipple points. Tata Prima: 32+. Use grease schedule diagram.", notes:"Most neglected job in India. Should be done every 5,000 km without exception." },
  "GP-010": { label:"Bogie Suspension — Centre Bearing Grease",cat:"grease", greaseType:"EP2 Bearing Grease",                              qty:120, intervalKm:20000, intervalMonths:6,  intervalHrs:500,  procedure:"Jack axle, remove bogie centre pin, clean, repack bearing, replace O-ring seals", notes:"Multi-axle trucks only. Missing this = premature bogie failure." },
};

// ─── Engine Oil & Fluid Master ────────────────────────────────────────────────
const ENGINE_OIL_MASTER = {
  "OIL-001": { label:"Engine Oil Change + Oil Filter",         cat:"engine_oil", grade:"15W-40 CI-4 / CK-4 (BS6: FA-4)", qtyLitres:12, intervalKm:15000, intervalMonths:3,  procedure:"Warm engine, drain hot, replace drain plug gasket, replace oil filter with new O-ring, fill to dipstick mark, run engine, recheck level", notes:"Tata Prima: 12L. Tata LPT 1613: 9L. AL Boss: 10L. BS6 engines: use CK-4 or FA-4 only. Never mix mineral with synthetic." },
  "OIL-002": { label:"Gearbox Oil Change",                     cat:"engine_oil", grade:"SAE 80W-90 GL-4 / GL-5",          qtyLitres:8,  intervalKm:60000, intervalMonths:12, procedure:"Drain from bottom plug, refill from level plug until it starts draining. Manual gearbox: GL-4. Transfer case: check OEM spec.", notes:"Tata G-700 gearbox: 8L. Use OEM-specified grade — wrong grade can strip synchromesh rings." },
  "OIL-003": { label:"Front Axle Differential Oil",            cat:"engine_oil", grade:"SAE 85W-140 GL-5 or 80W-90",      qtyLitres:4,  intervalKm:60000, intervalMonths:12, procedure:"Drain and fill level plug. Check for water contamination (milky appearance = seal failure).", notes:"Contaminated diff oil causes gear scoring. Very common after river crossing or flood." },
  "OIL-004": { label:"Rear Axle Differential Oil",             cat:"engine_oil", grade:"SAE 85W-140 GL-5",                qtyLitres:8,  intervalKm:60000, intervalMonths:12, procedure:"Rear diff is larger — check OEM spec for tandem axle trucks. Fill from level plug.", notes:"Tandem rear axles: check both housings independently." },
  "OIL-005": { label:"Power Steering Fluid",                   cat:"engine_oil", grade:"ATF Dexron III / OEM spec",       qtyLitres:2,  intervalKm:40000, intervalMonths:12, procedure:"Drain from hose at gear box. Flush system with fresh fluid before refilling. Check pump belt tension.", notes:"Contaminated power steering fluid causes stiff steering and pump failure." },
  "OIL-006": { label:"Brake Fluid Top-Up / Change",            cat:"engine_oil", grade:"DOT 3 or DOT 4 (air brakes: not applicable)",qtyLitres:0.5, intervalKm:30000, intervalMonths:12, procedure:"Check reservoir level. Full flush every 2 years — hygroscopic fluid absorbs moisture and lowers boiling point.", notes:"Many Indian trucks have air brakes — no fluid brake system. Check vehicle spec." },
  "OIL-007": { label:"Hydraulic Oil Change (Cab Tilt / Crane)",cat:"engine_oil", grade:"ISO VG 46 Hydraulic Oil",         qtyLitres:4,  intervalKm:60000, intervalMonths:18, procedure:"Use dedicated suction/fill pump. Do not allow air into system. Bleed any air pockets after fill.", notes:"Tata Prima tilt cab: 2L. Separate from crane/body hydraulic systems." },
  "OIL-008": { label:"Coolant Flush & Refill",                 cat:"cooling",    grade:"OAT or HOAT Coolant — 1:1 mix",   qtyLitres:14, intervalKm:60000, intervalMonths:24, procedure:"Cold engine only. Drain from petcock, flush with clean water, drain again, refill with pre-mixed coolant. Bleed air from system.", notes:"Tata Prima: 14L coolant system. Ashok Leyland: 12L. Indian conditions: use summer-spec coolant year-round." },
};

// ─── Brake System Master ──────────────────────────────────────────────────────
const BRAKE_MASTER = {
  "BRK-001": { label:"Front Brake Shoe / Lining — Inspect & Replace", cat:"brake", intervalKm:40000, intervalMonths:18, specification:"Min lining thickness: 4mm (replace at 5mm). Lining material: Asbestos-free grade P", procedure:"Remove drum, measure lining thickness with gauge, inspect for glazing/oil contamination, check drum out-of-round (max 0.3mm), re-rivet or replace lining, deglaze drum surface", notes:"Front brakes do 70% of braking work. Never replace one side only — always replace both sides of same axle." },
  "BRK-002": { label:"Rear Brake Shoe / Lining — Inspect & Replace",  cat:"brake", intervalKm:60000, intervalMonths:24, specification:"Min lining thickness: 4mm. Rear brakes see less work but air-actuated — check S-cam", procedure:"Check S-cam bushes for wear. Check spring brakes (parking) for proper stroke. Lubricate cam bushes with EP2 grease.", notes:"S-cam wear causes brake imbalance and pull to one side." },
  "BRK-003": { label:"Brake Drum — Inspection & Replacement",         cat:"brake", intervalKm:80000, intervalMonths:36, specification:"Max drum bore: OD + 2mm from new. Typical new drum bore: 410mm (Tata). Max machining: 2mm", procedure:"Measure drum ID at 4 points with vernier. Check for heat cracks, score marks, hot spots (blue discoloration). Machine if within limit, replace if exceeds.", notes:"Cracked drums = catastrophic brake failure at highway speed. Replace — don't repair." },
  "BRK-004": { label:"Slack Adjuster — Check & Adjust",               cat:"brake", intervalKm:10000, intervalMonths:3,  specification:"Brake push rod stroke: 38-51mm (free travel). Auto slack adjuster: verify self-adjustment", procedure:"Apply/release parking brake several times. Measure pushrod stroke. If stroke > 51mm: manual adjustment needed (S-cam type). Auto adjusters: verify pawl mechanism.", notes:"Incorrect adjustment causes brake fade, uneven wear, or dragging. Checked every 10,000 km." },
  "BRK-005": { label:"Air Brake System — Leakage Test",               cat:"brake", intervalKm:15000, intervalMonths:6,  specification:"System pressure: 6.5-7 bar. Leakage: max 5 PSI per minute static", procedure:"Build full pressure, shut engine, monitor pressure drop over 3 minutes with engine off. Check all joints with soapy water. Drain all air tanks — remove condensate water.", notes:"Water in air tanks causes compressor damage and corrosion. Drain tanks DAILY in monsoon season." },
  "BRK-006": { label:"Brake Drum Dedusting — Air Blow",               cat:"brake", intervalKm:10000, intervalMonths:3,  specification:"Asbestos-free brake dust procedure: wet or vacuum removal only", procedure:"Remove wheel, use vacuum or damp cloth — never blow with dry air. Clean inside drum and backing plate thoroughly.", notes:"Brake dust removal before lining inspection. Health and safety requirement." },
  "BRK-007": { label:"Wheel Cylinder / Brake Chamber — Inspect",      cat:"brake", intervalKm:30000, intervalMonths:12, specification:"Check for oil/fluid leaks, cracked diaphragm, stuck pistons", procedure:"With brakes released, check stroke of each chamber. Visual check for grease/oil contamination. Diaphragm failure: replace immediately.", notes:"Failed brake chamber = total loss of braking on that axle. CRITICAL." },
};

// ─── Filter Master ────────────────────────────────────────────────────────────
const FILTER_MASTER = {
  "FLT-001": { label:"Air Filter — Primary Element",       cat:"filter", intervalKm:20000, intervalMonths:6,  notes:"Clean with compressed air every 10,000 km. Replace at 20,000 km or when indicator shows. Dusty routes: replace every 10,000 km." },
  "FLT-002": { label:"Fuel Filter / Sedimenter",           cat:"filter", intervalKm:10000, intervalMonths:3,  notes:"Drain water from sedimenter weekly. Replace filter at 10,000 km. Critical for injector protection." },
  "FLT-003": { label:"Oil Filter (Engine)",                cat:"filter", intervalKm:15000, intervalMonths:3,  notes:"Always replace with each engine oil change. Never re-use oil filter." },
  "FLT-004": { label:"Cabin Air Filter",                   cat:"filter", intervalKm:20000, intervalMonths:6,  notes:"AC performance drops with clogged cabin filter. Low cost item — replace regularly." },
};

// ─── Per-vehicle-type PM schedules ────────────────────────────────────────────
// Keys match FLEET_DATA model types + TRUCK_MODEL_DB entries
const VEHICLE_PM_PROFILES = {
  "Tata LPT 2518": {
    label:"Tata LPT 2518 — 10-Wheeler",
    axleConfig:"6×4", gvw:25, totalNipples:28,
    greaseSchedule:["GP-001","GP-002","GP-003","GP-004","GP-005","GP-006","GP-007","GP-009"],
    oilSchedule:["OIL-001","OIL-002","OIL-003","OIL-004","OIL-005","OIL-008"],
    brakeSchedule:["BRK-001","BRK-002","BRK-003","BRK-004","BRK-005","BRK-006"],
    filterSchedule:["FLT-001","FLT-002","FLT-003"],
    engineOilCapacityL:12, coolantL:14, gearboxOilL:8, diffOilL:8,
    oilGrade:"15W-40 CI-4+",
  },
  "Ashok Leyland 2518": {
    label:"Ashok Leyland 2518 — 10-Wheeler",
    axleConfig:"6×4", gvw:25, totalNipples:26,
    greaseSchedule:["GP-001","GP-002","GP-003","GP-004","GP-005","GP-006","GP-007","GP-009"],
    oilSchedule:["OIL-001","OIL-002","OIL-003","OIL-004","OIL-005","OIL-008"],
    brakeSchedule:["BRK-001","BRK-002","BRK-003","BRK-004","BRK-005","BRK-006"],
    filterSchedule:["FLT-001","FLT-002","FLT-003"],
    engineOilCapacityL:10, coolantL:12, gearboxOilL:7, diffOilL:7,
    oilGrade:"15W-40 CI-4+",
  },
  "Tata Prima 4028": {
    label:"Tata PRIMA 4028 — 12-Wheeler Heavy",
    axleConfig:"6×4", gvw:40, totalNipples:32,
    greaseSchedule:["GP-001","GP-002","GP-003","GP-004","GP-005","GP-006","GP-007","GP-008","GP-009","GP-010"],
    oilSchedule:["OIL-001","OIL-002","OIL-003","OIL-004","OIL-005","OIL-007","OIL-008"],
    brakeSchedule:["BRK-001","BRK-002","BRK-003","BRK-004","BRK-005","BRK-006","BRK-007"],
    filterSchedule:["FLT-001","FLT-002","FLT-003","FLT-004"],
    engineOilCapacityL:16, coolantL:14, gearboxOilL:10, diffOilL:10,
    oilGrade:"15W-40 CK-4 (BS6 compliance)",
    hasFifthWheel:true,
  },
  "BharatBenz 2523": {
    label:"BharatBenz 2523 — 10-Wheeler",
    axleConfig:"6×4", gvw:25, totalNipples:24,
    greaseSchedule:["GP-001","GP-002","GP-003","GP-004","GP-005","GP-006","GP-007","GP-009"],
    oilSchedule:["OIL-001","OIL-002","OIL-003","OIL-004","OIL-005","OIL-008"],
    brakeSchedule:["BRK-001","BRK-002","BRK-003","BRK-004","BRK-005"],
    filterSchedule:["FLT-001","FLT-002","FLT-003"],
    engineOilCapacityL:11, coolantL:13, gearboxOilL:8, diffOilL:8,
    oilGrade:"15W-40 CK-4",
  },
  "Tata Ace": {
    label:"Tata Ace — Mini Truck (LCV)",
    axleConfig:"4×2", gvw:1.5, totalNipples:12,
    greaseSchedule:["GP-001","GP-003","GP-005","GP-006","GP-007","GP-009"],
    oilSchedule:["OIL-001","OIL-002","OIL-003","OIL-008"],
    brakeSchedule:["BRK-001","BRK-002","BRK-004"],
    filterSchedule:["FLT-001","FLT-002","FLT-003"],
    engineOilCapacityL:4, coolantL:5, gearboxOilL:2, diffOilL:2,
    oilGrade:"15W-40 CI-4",
  },
};

// ─── PM Task status data (vehicle-wise completion history) ────────────────────
const PM_LOG_INIT = [
  { id:"PM-001", vehicleNo:"TN69 GH4789", taskId:"GP-001", taskLabel:"Front Wheel Hub — Grease Pack", doneKm:68000, doneDate:"2025-01-15", nextKm:108000, nextDate:"2026-01-15", techName:"Rajan", cost:850,  parts:"Shell Gadus S3 EP2 (250g)", status:"OK" },
  { id:"PM-002", vehicleNo:"TN69 GH4789", taskId:"GP-009", taskLabel:"Chassis Nipple Greasing",        doneKm:72000, doneDate:"2025-03-01", nextKm:77000,  nextDate:"2025-04-01", techName:"Rajan", cost:200,  parts:"Lithium EP2 200g",           status:"DUE_SOON" },
  { id:"PM-003", vehicleNo:"TN69 GH4789", taskId:"OIL-001", taskLabel:"Engine Oil Change",             doneKm:70000, doneDate:"2025-02-14", nextKm:85000,  nextDate:"2025-05-14", techName:"Rajan", cost:3200, parts:"15W-40 CI-4 12L + Filter",  status:"OK" },
  { id:"PM-004", vehicleNo:"TN69 GH4789", taskId:"BRK-004", taskLabel:"Slack Adjuster Check",          doneKm:70000, doneDate:"2025-02-14", nextKm:80000,  nextDate:"2025-05-14", techName:"Rajan", cost:0,    parts:"Labour only",               status:"DUE_SOON" },
  { id:"PM-005", vehicleNo:"TN59 AB1234", taskId:"OIL-001", taskLabel:"Engine Oil Change",             doneKm:85000, doneDate:"2025-03-20", nextKm:100000, nextDate:"2025-06-20", techName:"Kumar", cost:2800, parts:"15W-40 CI-4 10L + Filter",  status:"OK" },
  { id:"PM-006", vehicleNo:"TN59 AB1234", taskId:"GP-005", taskLabel:"Steering Nipple Greasing",       doneKm:86000, doneDate:"2025-03-22", nextKm:91000,  nextDate:"2025-04-22", techName:"Kumar", cost:300,  parts:"EP2 grease 30g",            status:"OVERDUE" },
  { id:"PM-007", vehicleNo:"TN45 CD5678", taskId:"BRK-001", taskLabel:"Front Brake Lining",            doneKm:96000, doneDate:"2025-01-10", nextKm:136000, nextDate:"2026-07-10", techName:"Suresh", cost:4200, parts:"Asbestos-free lining set",  status:"OK" },
];

// ─── Grease & Oil Inventory (Stock items) ─────────────────────────────────────
const LUBE_STOCK_INIT = [
  { id:"LB-001", name:"Lithium Complex EP2 Grease (Drum)",  type:"grease",     unit:"kg",     qtyOnHand:8,   minStock:4,   costPerUnit:180, brand:"Shell Gadus S3 V220C",   usedFor:["GP-001","GP-002","GP-005","GP-006","GP-007","GP-009","GP-010"] },
  { id:"LB-002", name:"Graphite Grease (Tube 1kg)",         type:"grease",     unit:"tube",   qtyOnHand:3,   minStock:2,   costPerUnit:250, brand:"Waxoyl / Fuchs",          usedFor:["GP-003","GP-004"] },
  { id:"LB-003", name:"Fifth Wheel Grease (1kg tube)",      type:"grease",     unit:"tube",   qtyOnHand:1,   minStock:2,   costPerUnit:320, brand:"Trailor Grip",           usedFor:["GP-008"] },
  { id:"LB-004", name:"Engine Oil 15W-40 CI-4 (20L drum)", type:"engine_oil", unit:"litre",  qtyOnHand:45,  minStock:30,  costPerUnit:195, brand:"Castrol CRB TURBOMAX",   usedFor:["OIL-001"] },
  { id:"LB-005", name:"Gearbox Oil SAE 80W-90 (5L can)",   type:"engine_oil", unit:"litre",  qtyOnHand:12,  minStock:10,  costPerUnit:210, brand:"Shell Spirax S3 GX",     usedFor:["OIL-002"] },
  { id:"LB-006", name:"Diff Oil SAE 85W-140 (5L can)",     type:"engine_oil", unit:"litre",  qtyOnHand:10,  minStock:8,   costPerUnit:220, brand:"Castrol Hypoy C",        usedFor:["OIL-003","OIL-004"] },
  { id:"LB-007", name:"Coolant OAT (5L concentrated)",     type:"coolant",    unit:"litre",  qtyOnHand:20,  minStock:10,  costPerUnit:350, brand:"Ashok Leyland / Tata",   usedFor:["OIL-008"] },
  { id:"LB-008", name:"Brake Lining Set (Front Axle)",     type:"brake",      unit:"set",    qtyOnHand:4,   minStock:3,   costPerUnit:2100, brand:"Rane / Allied Nippon",  usedFor:["BRK-001"] },
  { id:"LB-009", name:"Brake Lining Set (Rear Axle)",      type:"brake",      unit:"set",    qtyOnHand:2,   minStock:2,   costPerUnit:1800, brand:"Rane / Allied Nippon",  usedFor:["BRK-002"] },
  { id:"LB-010", name:"Oil Filter (Tata / AL Compatible)", type:"filter",     unit:"pcs",    qtyOnHand:12,  minStock:6,   costPerUnit:320, brand:"Mann / Fleetguard",      usedFor:["FLT-003","OIL-001"] },
  { id:"LB-011", name:"Air Filter Primary Element",        type:"filter",     unit:"pcs",    qtyOnHand:4,   minStock:3,   costPerUnit:850, brand:"Fleetguard AF4735",       usedFor:["FLT-001"] },
  { id:"LB-012", name:"Fuel Filter / Sedimenter Element",  type:"filter",     unit:"pcs",    qtyOnHand:6,   minStock:4,   costPerUnit:450, brand:"Fleetguard FS1212",       usedFor:["FLT-002"] },
];

// ─── PM Settings Page ─────────────────────────────────────────────────────────
const PMSettingsPage = () => {
  const [tab, setTab] = useState("schedule");
  const [selVehicle, setSelVehicle] = useState("TN69 GH4789");
  const [lubeStock, setLubeStock] = useState(LUBE_STOCK_INIT);
  const [pmLogs, setPmLogs] = useState(PM_LOG_INIT);
  const [expandedTask, setExpandedTask] = useState(null);
  const [showAddGrease, setShowAddGrease] = useState(false);
  const [addForm, setAddForm] = useState({ vehicleNo:"", taskId:"", doneKm:"", techName:"", cost:"", parts:"", notes:"" });

  // Derive vehicle profile from fleet data
  const vehicle = FLEET_DATA.find(v=>v.num===selVehicle);
  const modelKey = vehicle?.model?.includes("Tata Ace")?"Tata Ace":vehicle?.model?.includes("Prima")?"Tata Prima 4028":vehicle?.model?.includes("LPT")?"Tata LPT 2518":vehicle?.model?.includes("Ashok")?"Ashok Leyland 2518":vehicle?.model?.includes("BharatBenz")?"BharatBenz 2523":"Tata LPT 2518";
  const profile = VEHICLE_PM_PROFILES[modelKey] || VEHICLE_PM_PROFILES["Tata LPT 2518"];

  const catColors = { grease:T.accent, engine_oil:T.blue, cooling:T.cyan, brake:T.red, filter:T.textMuted, electrical:T.purple, drivetrain:T.green };

  // Compute overdue/due-soon for current vehicle
  const vehicleLogs = pmLogs.filter(l=>l.vehicleNo===selVehicle);
  const curOdo = vehicle?.odometer || 74875;
  const overdueTasks = vehicleLogs.filter(l=>l.nextKm && curOdo > l.nextKm);
  const dueSoonTasks = vehicleLogs.filter(l=>l.nextKm && curOdo > l.nextKm - 2000 && curOdo <= l.nextKm);

  const allTasks = [
    ...profile.greaseSchedule.map(id=>({ id, ...GREASE_PACKING_MASTER[id], cat:"grease" })),
    ...profile.oilSchedule.map(id=>({ id, ...ENGINE_OIL_MASTER[id] })),
    ...(profile.brakeSchedule||[]).map(id=>({ id, ...BRAKE_MASTER[id] })),
    ...(profile.filterSchedule||[]).map(id=>({ id, ...FILTER_MASTER[id] })),
  ].filter(t=>t.label);

  const stockLow = lubeStock.filter(s=>s.qtyOnHand <= s.minStock);

  const LogPMModal = () => (
    <div className="ov">
      <div className="modal" style={{ maxWidth:520 }}>
        <div className="mhdr" style={{ background:`linear-gradient(135deg,#064E3B,#065F46)`, borderBottom:`1px solid ${T.green}33` }}>
          <div className="rj" style={{ fontSize:18, fontWeight:700, color:T.green }}>✅ Log PM Task Complete</div>
          <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={()=>setShowAddGrease(false)}><Ic n="x" s={14} c={T.textSub} /></button>
        </div>
        <div className="mbdy">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
            <div><label className="flabel">Vehicle</label><select value={addForm.vehicleNo} onChange={e=>setAddForm(f=>({...f,vehicleNo:e.target.value}))}>{FLEET_DATA.map(v=><option key={v.id}>{v.num}</option>)}</select></div>
            <div><label className="flabel">PM Task</label><select value={addForm.taskId} onChange={e=>setAddForm(f=>({...f,taskId:e.target.value}))}>
              <option value="">-- Select Task --</option>
              {Object.entries({...GREASE_PACKING_MASTER,...ENGINE_OIL_MASTER,...BRAKE_MASTER,...FILTER_MASTER}).map(([id,t])=><option key={id} value={id}>{t.label}</option>)}
            </select></div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:12 }}>
            <div><label className="flabel">Current Odometer (km)</label><input value={addForm.doneKm} onChange={e=>setAddForm(f=>({...f,doneKm:e.target.value}))} placeholder="74875" /></div>
            <div><label className="flabel">Technician Name</label><input value={addForm.techName} onChange={e=>setAddForm(f=>({...f,techName:e.target.value}))} placeholder="Mechanic name" /></div>
            <div><label className="flabel">Labour + Parts Cost (₹)</label><input value={addForm.cost} onChange={e=>setAddForm(f=>({...f,cost:e.target.value}))} placeholder="850" /></div>
          </div>
          <div><label className="flabel">Parts / Lubricants Used</label><input value={addForm.parts} onChange={e=>setAddForm(f=>({...f,parts:e.target.value}))} placeholder="Shell EP2 250g, Oil filter × 1..." /></div>
          <div style={{ marginTop:10 }}><label className="flabel">Notes</label><input value={addForm.notes} onChange={e=>setAddForm(f=>({...f,notes:e.target.value}))} placeholder="Any observations, conditions found..." /></div>
          <div style={{ display:"flex", justifyContent:"flex-end", gap:8, marginTop:16, paddingTop:14, borderTop:`1px solid ${T.border}` }}>
            <button className="btn btn-gh" onClick={()=>setShowAddGrease(false)}>Cancel</button>
            <button className="btn" style={{ background:T.green, color:"#fff", fontWeight:700 }} onClick={()=>{
              const taskDef = {...GREASE_PACKING_MASTER,...ENGINE_OIL_MASTER,...BRAKE_MASTER,...FILTER_MASTER}[addForm.taskId]||{};
              const nextKm = parseInt(addForm.doneKm)+(taskDef.intervalKm||10000);
              const nextDate = new Date(Date.now()+(taskDef.intervalMonths||3)*30*86400000).toISOString().split("T")[0];
              const id = `PM-${String(pmLogs.length+1).padStart(3,"0")}`;
              setPmLogs(l=>[...l,{ id, vehicleNo:addForm.vehicleNo, taskId:addForm.taskId, taskLabel:taskDef.label||addForm.taskId, doneKm:parseInt(addForm.doneKm), doneDate:new Date().toISOString().split("T")[0], nextKm, nextDate, techName:addForm.techName, cost:parseInt(addForm.cost)||0, parts:addForm.parts, status:"OK" }]);
              setShowAddGrease(false);
            }}>✅ Log Complete</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {showAddGrease && <LogPMModal />}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Preventive Maintenance Settings</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>Grease packing · Engine oil · Brake components · Per-vehicle-type service intervals · Stock management</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button className="btn btn-g" style={{ fontSize:11 }} onClick={()=>setShowAddGrease(true)}>✅ Log PM Done</button>
        </div>
      </div>

      {/* Vehicle selector */}
      <div className="card" style={{ marginBottom:14, padding:"12px 16px" }}>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
          <div style={{ fontSize:11, color:T.textMuted, flexShrink:0 }}>Vehicle:</div>
          {FLEET_DATA.map(v=>(
            <div key={v.id} onClick={()=>setSelVehicle(v.num)} style={{ padding:"6px 14px", borderRadius:8, cursor:"pointer", border:`2px solid ${selVehicle===v.num?T.accent:T.border}`, background:selVehicle===v.num?T.accentGlow:T.bgPanel, fontSize:12, fontWeight:selVehicle===v.num?700:400, color:selVehicle===v.num?T.accent:T.textSub }}>
              {v.num}
            </div>
          ))}
        </div>
        {vehicle && (
          <div style={{ marginTop:10, display:"flex", gap:16, fontSize:11, color:T.textSub }}>
            <span>Model: <strong style={{ color:T.text }}>{profile.label}</strong></span>
            <span>Axle: <strong>{profile.axleConfig}</strong></span>
            <span>GVW: <strong>{profile.gvw}T</strong></span>
            <span>Grease nipples: <strong style={{ color:T.accent }}>{profile.totalNipples} points</strong></span>
            <span>Odometer: <strong style={{ color:T.blue }}>{curOdo.toLocaleString()} km</strong></span>
            <span>Oil grade: <strong style={{ color:T.green }}>{profile.oilGrade}</strong></span>
          </div>
        )}
      </div>

      {/* Overdue alerts */}
      {overdueTasks.length > 0 && (
        <div className="card" style={{ marginBottom:12, border:`1px solid ${T.red}44`, background:T.redGlow }}>
          <div className="section-title" style={{ color:T.red }}>🚨 OVERDUE — {overdueTasks.length} PM Tasks Past Due</div>
          {overdueTasks.map(t=>(
            <div key={t.id} className="arow" style={{ borderLeftColor:T.red }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.red }}>{t.taskLabel}</div>
                <div style={{ fontSize:11, color:T.textSub }}>Due at {t.nextKm.toLocaleString()} km · Current: {curOdo.toLocaleString()} km · <strong style={{ color:T.red }}>+{(curOdo-t.nextKm).toLocaleString()} km overdue</strong></div>
              </div>
              <button className="btn btn-p" style={{ fontSize:10 }} onClick={()=>setShowAddGrease(true)}>Log Done →</button>
            </div>
          ))}
        </div>
      )}
      {dueSoonTasks.length > 0 && (
        <div className="card" style={{ marginBottom:12, border:`1px solid ${T.orange}44`, background:T.orangeGlow }}>
          <div className="section-title" style={{ color:T.orange }}>⚠️ Due Soon — {dueSoonTasks.length} Tasks within 2,000 km</div>
          {dueSoonTasks.map(t=>(
            <div key={t.id} className="arow" style={{ borderLeftColor:T.orange }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:600 }}>{t.taskLabel}</div>
                <div style={{ fontSize:11, color:T.textSub }}>Due at {t.nextKm.toLocaleString()} km · {(t.nextKm-curOdo).toLocaleString()} km remaining</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stock low alerts */}
      {stockLow.length > 0 && (
        <div className="card" style={{ marginBottom:12, border:`1px solid ${T.cyan}44`, background:T.cyanGlow }}>
          <div className="section-title" style={{ color:T.cyan }}>📦 Low Lube/Parts Stock — {stockLow.length} items below minimum</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {stockLow.map(s=>(
              <div key={s.id} style={{ background:T.bgCard, border:`1px solid ${T.cyan}33`, borderRadius:8, padding:"6px 12px", fontSize:11 }}>
                <strong style={{ color:T.cyan }}>{s.name}</strong> <span style={{ color:T.textMuted }}>— {s.qtyOnHand} {s.unit} (min: {s.minStock})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="tabs">
        {["schedule","grease","engine-oil","brakes","stock","history"].map(t=>(
          <div key={t} className={`tab ${tab===t?"on":""}`} onClick={()=>setTab(t)} style={{ textTransform:"capitalize", fontSize:12 }}>
            {t==="engine-oil"?"Engine Oil & Fluids":t.charAt(0).toUpperCase()+t.slice(1)}
          </div>
        ))}
      </div>

      {/* ── SCHEDULE TAB — full PM card per task ── */}
      {tab==="schedule" && (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {allTasks.map(task => {
            const lastLog = vehicleLogs.filter(l=>l.taskId===task.id).sort((a,b)=>b.doneKm-a.doneKm)[0];
            const nextKm = lastLog ? lastLog.nextKm : (curOdo + (task.intervalKm||10000));
            const kmLeft = nextKm - curOdo;
            const pct = lastLog ? Math.min(((curOdo - lastLog.doneKm) / (task.intervalKm||10000)) * 100, 100) : 0;
            const status = kmLeft < 0 ? "overdue" : kmLeft < 2000 ? "due_soon" : "ok";
            const catC = catColors[task.cat] || T.textMuted;
            const isExpanded = expandedTask===task.id;
            return (
              <div key={task.id} className="card" style={{ border:`1px solid ${status==="overdue"?T.red:status==="due_soon"?T.orange:T.border}22`, padding:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                  <div style={{ display:"flex", gap:10, alignItems:"flex-start", flex:1, cursor:"pointer" }} onClick={()=>setExpandedTask(isExpanded?null:task.id)}>
                    <div style={{ width:36, height:36, borderRadius:8, background:catC+"18", border:`1px solid ${catC}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{PM_CATEGORIES[task.cat]?.icon||"🔧"}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:3 }}>
                        <span style={{ fontSize:12, fontWeight:700 }}>{task.label}</span>
                        <span className="badge" style={{ background:catC+"18", color:catC, fontSize:9 }}>{PM_CATEGORIES[task.cat]?.label||task.cat}</span>
                        {status==="overdue" && <span className="badge br" style={{ fontSize:9 }}>OVERDUE</span>}
                        {status==="due_soon" && <span className="badge bo" style={{ fontSize:9 }}>DUE SOON</span>}
                      </div>
                      {task.greaseType && <div style={{ fontSize:10, color:T.textMuted }}>Grease: <strong style={{ color:T.accent }}>{task.greaseType}</strong>{task.qty?` · ${task.qty}g per service`:""}</div>}
                      {task.grade && <div style={{ fontSize:10, color:T.textMuted }}>Grade: <strong style={{ color:T.blue }}>{task.grade}</strong>{task.qtyLitres?` · ${task.qtyLitres}L`:""}</div>}
                    </div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:status==="overdue"?T.red:status==="due_soon"?T.orange:T.green }}>
                      {status==="overdue"?`+${Math.abs(kmLeft).toLocaleString()} km overdue`:`${kmLeft.toLocaleString()} km left`}
                    </div>
                    <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>Every {task.intervalKm?.toLocaleString()||"—"} km / {task.intervalMonths||"—"} mo</div>
                    {lastLog && <div style={{ fontSize:10, color:T.textMuted }}>Last: {lastLog.doneDate} @ {lastLog.doneKm.toLocaleString()} km</div>}
                  </div>
                </div>
                {/* Progress bar */}
                <div className="pbar" style={{ height:5, marginBottom:isExpanded?12:0 }}>
                  <div className="pfill" style={{ width:`${pct}%`, background:status==="overdue"?T.red:status==="due_soon"?T.orange:T.green }} />
                </div>
                {/* Expanded detail */}
                {isExpanded && (
                  <div style={{ marginTop:10, borderTop:`1px solid ${T.border}33`, paddingTop:12 }}>
                    {task.procedure && (
                      <div style={{ marginBottom:10 }}>
                        <div style={{ fontSize:11, fontWeight:700, color:T.textSub, marginBottom:4 }}>📋 Procedure</div>
                        <div style={{ fontSize:11, color:T.text, background:T.bgPanel, borderRadius:7, padding:10, lineHeight:1.6 }}>{task.procedure}</div>
                      </div>
                    )}
                    {task.specification && (
                      <div style={{ marginBottom:10 }}>
                        <div style={{ fontSize:11, fontWeight:700, color:T.textSub, marginBottom:4 }}>📐 Specification</div>
                        <div style={{ fontSize:11, color:T.cyan, background:T.cyanGlow, borderRadius:7, padding:8 }}>{task.specification}</div>
                      </div>
                    )}
                    {task.notes && (
                      <div style={{ background:T.orangeGlow, border:`1px solid ${T.orange}33`, borderRadius:7, padding:8, fontSize:11, color:T.textSub, marginBottom:10 }}>
                        ⚠️ {task.notes}
                      </div>
                    )}
                    <div style={{ display:"flex", gap:8 }}>
                      <button className="btn" style={{ fontSize:11, background:T.green+"22", color:T.green, border:`1px solid ${T.green}33` }} onClick={()=>{ setAddForm(f=>({...f,vehicleNo:selVehicle,taskId:task.id})); setShowAddGrease(true); }}>
                        ✅ Mark as Done
                      </button>
                      <button className="btn btn-b" style={{ fontSize:11 }} onClick={()=>{/* create WO */}}>Create Work Order</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── GREASE TAB ── */}
      {tab==="grease" && (
        <div>
          <div style={{ background:T.accentGlow, border:`1px solid ${T.accent}33`, borderRadius:10, padding:14, marginBottom:14 }}>
            <div style={{ fontSize:13, fontWeight:700, color:T.accent, marginBottom:6 }}>🟡 Grease Packing — What it is & why it matters</div>
            <div style={{ fontSize:11, color:T.textSub, lineHeight:1.6 }}>
              Grease packing is the process of pushing fresh high-pressure grease into wheel bearings, steering linkages, leaf spring joints, propeller shaft UJs, and chassis nipple points. Indian trucks run on rough roads under overload — grease washes out faster than in any other country. Neglecting grease causes wheel bearing failure (hub seizure at speed), king pin wear (unstable steering), leaf spring breakage, and UJ failure (driveshaft collapse). <strong style={{ color:T.accent }}>Total grease cost per service: ₹200–500. Cost of a wheel bearing seizure: ₹15,000–40,000 + downtime.</strong>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {profile.greaseSchedule.map(id => {
              const task = GREASE_PACKING_MASTER[id];
              if (!task) return null;
              const lastLog = vehicleLogs.filter(l=>l.taskId===id).sort((a,b)=>b.doneKm-a.doneKm)[0];
              const nextKm = lastLog ? lastLog.nextKm : curOdo + task.intervalKm;
              const kmLeft = nextKm - curOdo;
              const status = kmLeft < 0 ? "overdue" : kmLeft < task.intervalKm * 0.2 ? "due_soon" : "ok";
              const stock = lubeStock.find(s=>s.usedFor?.includes(id));
              return (
                <div key={id} className="card" style={{ border:`1px solid ${status==="overdue"?T.red:status==="due_soon"?T.orange:T.accent}22`, padding:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4 }}>
                        <span style={{ fontSize:14 }}>🟡</span>
                        <span style={{ fontSize:13, fontWeight:700 }}>{task.label}</span>
                        {status==="overdue" && <span className="badge br" style={{ fontSize:9 }}>OVERDUE</span>}
                        {status==="due_soon" && <span className="badge bo" style={{ fontSize:9 }}>DUE SOON</span>}
                      </div>
                      <div style={{ fontSize:11, color:T.textMuted }}>Grease: <strong style={{ color:T.accent }}>{task.greaseType}</strong> · Qty: {task.qty}g per service</div>
                      <div style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>Interval: every {task.intervalKm.toLocaleString()} km or {task.intervalMonths} months</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:13, fontWeight:700, color:status==="overdue"?T.red:status==="due_soon"?T.orange:T.green }}>
                        {kmLeft < 0 ? `⚠️ ${Math.abs(kmLeft).toLocaleString()} km overdue` : `${kmLeft.toLocaleString()} km`}
                      </div>
                      {stock && <div style={{ fontSize:10, color:stock.qtyOnHand<=stock.minStock?T.red:T.green, marginTop:2 }}>Stock: {stock.qtyOnHand} {stock.unit} {stock.qtyOnHand<=stock.minStock?"⚠️ LOW":""}</div>}
                    </div>
                  </div>
                  <div style={{ fontSize:11, color:T.textSub, background:T.bgPanel, borderRadius:7, padding:8, marginBottom:8, lineHeight:1.5 }}>
                    <strong>Procedure:</strong> {task.procedure}
                  </div>
                  <div style={{ fontSize:10, color:T.orange }}>⚠️ {task.notes}</div>
                  <div style={{ marginTop:8, display:"flex", gap:6 }}>
                    <button className="btn" style={{ fontSize:10, background:T.accent+"22", color:T.accent, border:`1px solid ${T.accent}33` }} onClick={()=>{ setAddForm(f=>({...f,vehicleNo:selVehicle,taskId:id})); setShowAddGrease(true); }}>✅ Log Done</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── ENGINE OIL TAB ── */}
      {tab==="engine-oil" && (
        <div>
          <div style={{ background:T.blueGlow, border:`1px solid ${T.blue}33`, borderRadius:10, padding:14, marginBottom:14 }}>
            <div style={{ fontSize:13, fontWeight:700, color:T.blue, marginBottom:6 }}>🛢️ Engine Oil Schedule — {profile.label}</div>
            <div style={{ display:"flex", gap:16, fontSize:11, color:T.textSub }}>
              <span>Engine oil capacity: <strong style={{ color:T.accent }}>{profile.engineOilCapacityL}L</strong></span>
              <span>Coolant: <strong>{profile.coolantL}L</strong></span>
              <span>Gearbox oil: <strong>{profile.gearboxOilL}L</strong></span>
              <span>Diff oil: <strong>{profile.diffOilL}L (each)</strong></span>
              <span>Grade: <strong style={{ color:T.green }}>{profile.oilGrade}</strong></span>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {[...profile.oilSchedule].map(id => {
              const task = ENGINE_OIL_MASTER[id];
              if (!task) return null;
              const lastLog = vehicleLogs.filter(l=>l.taskId===id).sort((a,b)=>b.doneKm-a.doneKm)[0];
              const nextKm = lastLog ? lastLog.nextKm : curOdo + task.intervalKm;
              const kmLeft = nextKm - curOdo;
              const status = kmLeft < 0 ? "overdue" : kmLeft < task.intervalKm * 0.1 ? "due_soon" : "ok";
              const stock = lubeStock.find(s=>s.usedFor?.includes(id));
              return (
                <div key={id} className="card" style={{ border:`1px solid ${status==="overdue"?T.red:T.blue}22`, padding:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4 }}>
                        <span style={{ fontSize:14 }}>🛢️</span>
                        <span style={{ fontSize:13, fontWeight:700 }}>{task.label}</span>
                        {status==="overdue" && <span className="badge br" style={{ fontSize:9 }}>OVERDUE</span>}
                        {status==="due_soon" && <span className="badge bo" style={{ fontSize:9 }}>DUE SOON</span>}
                      </div>
                      <div style={{ fontSize:11, color:T.textMuted }}>Grade: <strong style={{ color:T.blue }}>{task.grade}</strong>{task.qtyLitres?` · ${task.qtyLitres}L`:""}</div>
                      <div style={{ fontSize:11, color:T.textMuted }}>Interval: every {task.intervalKm.toLocaleString()} km / {task.intervalMonths} months</div>
                      {lastLog && <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>Last done: {lastLog.doneDate} @ {lastLog.doneKm.toLocaleString()} km · by {lastLog.techName}</div>}
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:13, fontWeight:700, color:status==="overdue"?T.red:status==="due_soon"?T.orange:T.green }}>
                        {kmLeft < 0 ? `${Math.abs(kmLeft).toLocaleString()} km OVER` : `${kmLeft.toLocaleString()} km left`}
                      </div>
                      {stock && <div style={{ fontSize:10, color:stock.qtyOnHand<=stock.minStock?T.red:T.green, marginTop:2 }}>Stock: {stock.qtyOnHand} {stock.unit}</div>}
                    </div>
                  </div>
                  {task.procedure && (
                    <div style={{ fontSize:11, color:T.textSub, background:T.bgPanel, borderRadius:7, padding:8, marginBottom:6, lineHeight:1.5 }}>{task.procedure}</div>
                  )}
                  <div style={{ fontSize:10, color:T.orange }}>ℹ️ {task.notes}</div>
                  <button className="btn" style={{ marginTop:8, fontSize:10, background:T.blue+"22", color:T.blue, border:`1px solid ${T.blue}33` }} onClick={()=>{ setAddForm(f=>({...f,vehicleNo:selVehicle,taskId:id})); setShowAddGrease(true); }}>✅ Log Done</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── BRAKES TAB ── */}
      {tab==="brakes" && (
        <div>
          <div style={{ background:T.redGlow, border:`1px solid ${T.red}33`, borderRadius:10, padding:14, marginBottom:14 }}>
            <div style={{ fontSize:13, fontWeight:700, color:T.red, marginBottom:6 }}>🔴 Brake System Maintenance — Safety Critical</div>
            <div style={{ fontSize:11, color:T.textSub, lineHeight:1.6 }}>
              All brake components are safety-critical. Brake failures cause fatalities. Replace lining in pairs (same axle). Never mix lining brands on same axle. Drum inspection mandatory every lining change. Air brake tanks drain daily — water causes compressor failure and corrosion.
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {Object.entries(BRAKE_MASTER).map(([id, task]) => {
              const lastLog = vehicleLogs.filter(l=>l.taskId===id).sort((a,b)=>b.doneKm-a.doneKm)[0];
              const nextKm = lastLog ? lastLog.nextKm : curOdo + task.intervalKm;
              const kmLeft = nextKm - curOdo;
              const status = kmLeft < 0 ? "overdue" : kmLeft < task.intervalKm * 0.1 ? "due_soon" : "ok";
              const stock = lubeStock.find(s=>s.usedFor?.includes(id));
              return (
                <div key={id} className="card" style={{ border:`2px solid ${status==="overdue"?T.red:status==="due_soon"?T.orange:T.border}`, padding:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4 }}>
                        <span style={{ fontSize:14 }}>🔴</span>
                        <span style={{ fontSize:13, fontWeight:700 }}>{task.label}</span>
                        {status==="overdue" && <span className="badge br" style={{ fontSize:10, fontWeight:700 }}>⚠️ OVERDUE</span>}
                        {status==="due_soon" && <span className="badge bo" style={{ fontSize:10 }}>DUE SOON</span>}
                      </div>
                      <div style={{ fontSize:11, color:T.textMuted }}>Interval: every {task.intervalKm.toLocaleString()} km / {task.intervalMonths} months</div>
                      {task.specification && <div style={{ fontSize:11, color:T.cyan, marginTop:3 }}>Spec: {task.specification}</div>}
                      {lastLog && <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>Last: {lastLog.doneDate} @ {lastLog.doneKm.toLocaleString()} km</div>}
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:13, fontWeight:700, color:status==="overdue"?T.red:status==="due_soon"?T.orange:T.green }}>
                        {kmLeft < 0 ? `${Math.abs(kmLeft).toLocaleString()} km OVER` : `${kmLeft.toLocaleString()} km left`}
                      </div>
                      {stock && <div style={{ fontSize:10, color:stock.qtyOnHand<=stock.minStock?T.red:T.green, marginTop:2 }}>Stock: {stock.qtyOnHand} {stock.unit}</div>}
                    </div>
                  </div>
                  {task.procedure && (
                    <div style={{ fontSize:11, color:T.textSub, background:T.bgPanel, borderRadius:7, padding:8, marginBottom:6, lineHeight:1.5 }}>
                      <strong>Procedure:</strong> {task.procedure}
                    </div>
                  )}
                  {task.notes && <div style={{ fontSize:10, color:T.red, fontWeight:600 }}>🚨 {task.notes}</div>}
                  <button className="btn" style={{ marginTop:8, fontSize:10, background:T.red+"22", color:T.red, border:`1px solid ${T.red}33` }} onClick={()=>{ setAddForm(f=>({...f,vehicleNo:selVehicle,taskId:id})); setShowAddGrease(true); }}>✅ Log Done</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── STOCK TAB ── */}
      {tab==="stock" && (
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div style={{ fontSize:12, color:T.textSub }}>Lubricants, grease, brake parts, and filters inventory. Linked to PM tasks — low stock triggers alert.</div>
          </div>
          <div className="card" style={{ padding:0 }}>
            <table className="tbl">
              <thead><tr><th>ID</th><th>Item</th><th>Type</th><th>Brand</th><th>Unit</th><th>On Hand</th><th>Min Stock</th><th>Status</th><th>Cost/Unit</th><th>Used For</th></tr></thead>
              <tbody>
                {lubeStock.map(s => {
                  const low = s.qtyOnHand <= s.minStock;
                  return (
                    <tr key={s.id} style={{ background:low?T.redGlow:"" }}>
                      <td className="mono" style={{ fontSize:11, color:T.accent }}>{s.id}</td>
                      <td style={{ fontSize:11, fontWeight:600 }}>{s.name}</td>
                      <td><span className="badge" style={{ background:(catColors[s.type]||T.textMuted)+"22", color:catColors[s.type]||T.textMuted, fontSize:10, textTransform:"capitalize" }}>{PM_CATEGORIES[s.type]?.label||s.type}</span></td>
                      <td style={{ fontSize:11 }}>{s.brand}</td>
                      <td style={{ fontSize:11 }}>{s.unit}</td>
                      <td style={{ fontWeight:700, color:low?T.red:T.green }}>{s.qtyOnHand}</td>
                      <td style={{ color:T.textMuted }}>{s.minStock}</td>
                      <td>{low ? <span className="badge br" style={{ fontSize:10 }}>⚠️ LOW</span> : <span className="badge bg" style={{ fontSize:10 }}>OK</span>}</td>
                      <td>₹{s.costPerUnit}</td>
                      <td style={{ fontSize:10, color:T.textMuted }}>{(s.usedFor||[]).join(", ")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── HISTORY TAB ── */}
      {tab==="history" && (
        <div className="card" style={{ padding:0 }}>
          <table className="tbl">
            <thead><tr><th>Log ID</th><th>Vehicle</th><th>Task</th><th>Done Date</th><th>Done KM</th><th>Next KM</th><th>Technician</th><th>Cost</th><th>Parts Used</th><th>Status</th></tr></thead>
            <tbody>
              {pmLogs.sort((a,b)=>b.doneKm-a.doneKm).map(l=>(
                <tr key={l.id}>
                  <td className="mono" style={{ fontSize:11, color:T.accent }}>{l.id}</td>
                  <td className="mono" style={{ fontSize:11 }}>{l.vehicleNo}</td>
                  <td style={{ fontSize:11, fontWeight:600, maxWidth:180, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{l.taskLabel}</td>
                  <td style={{ fontSize:11 }}>{l.doneDate}</td>
                  <td className="mono" style={{ fontSize:11 }}>{l.doneKm.toLocaleString()}</td>
                  <td className="mono" style={{ fontSize:11, color:T.orange }}>{l.nextKm?.toLocaleString()||"—"}</td>
                  <td style={{ fontSize:11 }}>{l.techName}</td>
                  <td style={{ color:T.red, fontWeight:600 }}>₹{l.cost.toLocaleString()}</td>
                  <td style={{ fontSize:10, color:T.textSub, maxWidth:140, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{l.parts}</td>
                  <td><span className={`badge ${l.status==="OK"?"bg":l.status==="OVERDUE"?"br":"bo"}`} style={{ fontSize:9 }}>{l.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const WorkshopPage = () => {
  const [tab, setTab]             = useState("workorders");
  const [showCreateWO, setShowCreateWO] = useState(false);
  const [woPrefill, setWoPrefill]       = useState(null);
  const [woList, setWoList]             = useState(WO_DATA_INIT);
  const [selWO, setSelWO]               = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  const handleCreateWO = (form) => {
    const id = `WO-${String(woList.length+1).padStart(3,"0")}`;
    const newWO = {
      id, vehicle:form.vehicle, workshop:form.selWorkshop?.name||"TBD",
      workshopType:form.selWorkshop?.type||"Mechanical",
      type:form.type, category:form.category, subCategory:form.subCat,
      source:form.source, priority:form.priority,
      issue:form.issue, odometer:parseInt(form.odometer)||0,
      status:form.approval?.level==="Auto"?"Approved":"Pending Approval",
      waitReason:null, created:new Date().toISOString().split("T")[0],
      approvedBy:form.approval?.level==="Auto"?"Auto-Approved":"Pending",
      approvalLevel:form.approval?.level||"Manager",
      estimatedCost:(form.aiCost?.total||0)+(form.aiCost?.gst||0),
      partsUsed:[], labourCost:0, totalCost:0, invoiceStatus:"Pending",
      breakdownRef:form.breakdownRef||null,
      duplicateFlag:form.dupFlag||false,
      aiCostDeviation:null, gstAmount:0,
    };
    setWoList(l=>[newWO,...l]);
  };

  const openWizard = (prefill=null) => { setWoPrefill(prefill); setShowCreateWO(true); };
  const woStatusColor = (s) => s==="Completed"?T.green:s==="In Progress"?T.orange:s==="Open"?T.blue:s.includes("Waiting")?T.red:s.includes("Pending")?T.accent:T.textMuted;
  const filtered = filterStatus==="All" ? woList : woList.filter(w=>w.status===filterStatus||w.priority===filterStatus);

  const mtdSpend = woList.filter(w=>w.status==="Completed").reduce((s,w)=>s+w.totalCost,0);
  const duplicates = woList.filter(w=>w.duplicateFlag);
  const overruns = woList.filter(w=>w.aiCostDeviation && w.aiCostDeviation>15);

  // AI predictions → WO suggestions
  const aiWOSuggestions = AI_PREDICTIONS.flatMap(p =>
    p.predictions.filter(pr=>pr.type!=="ok"&&pr.confidence>0.7).map(pr=>({
      vehicle:p.vehicle, component:pr.component, type:pr.type,
      inDays:pr.inDays, kmLeft:pr.kmLeft, confidence:pr.confidence,
      riskScore:p.riskScore,
    }))
  );

  return (
    <div>
      {showCreateWO && <CreateWOWizard prefill={woPrefill} onClose={()=>setShowCreateWO(false)} onSave={handleCreateWO} />}
      {selWO && <WODetailPanel wo={selWO} onClose={()=>setSelWO(null)} />}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Workshop & Maintenance</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>AI work orders · duplicate detection · cost control · vendor intelligence</p>
        </div>
        <button className="btn btn-p" onClick={()=>openWizard()}><Ic n="plus" s={14} c="#080B10" /> Create Work Order</button>
      </div>

      {/* KPIs */}
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(6,1fr)", marginBottom:18 }}>
        {[
          { l:"Open WOs",       v:woList.filter(w=>w.status==="Open"||w.status==="Pending Approval").length, c:T.blue   },
          { l:"In Progress",    v:woList.filter(w=>w.status==="In Progress").length,                         c:T.orange },
          { l:"Waiting Parts",  v:woList.filter(w=>w.status==="Waiting for Parts").length,                   c:T.red    },
          { l:"Completed",      v:woList.filter(w=>w.status==="Completed").length,                           c:T.green  },
          { l:"Duplicate Flags",v:duplicates.length,                                                         c:T.red    },
          { l:"MTD Spend",      v:fmt(mtdSpend),                                                             c:T.accent },
        ].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}>
            <div className="stat-v" style={{ color:k.c }}>{k.v}</div>
            <div className="stat-l">{k.l}</div>
          </div>
        ))}
      </div>

      {/* Duplicate / Cost Leakage Alerts */}
      {(duplicates.length>0 || overruns.length>0) && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.red}44`, background:T.redGlow }}>
          <div className="section-title" style={{ color:T.red }}>💸 Cost Leakage & Fraud Alerts</div>
          {duplicates.map(w=>(
            <div key={w.id} className="arow" style={{ borderLeftColor:T.red }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.red }}>🚨 Duplicate Issue — {w.id} · {w.vehicle}</div>
                <div style={{ fontSize:11, color:T.textSub }}>{w.issue} · Same system repaired recently — root cause analysis needed</div>
              </div>
              <button className="btn" style={{ fontSize:10, background:T.redGlow, color:T.red, border:`1px solid ${T.red}33` }} onClick={()=>setSelWO(w)}>View →</button>
            </div>
          ))}
        </div>
      )}

      {/* AI→WO suggestions from predictions */}
      {aiWOSuggestions.length > 0 && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.purple}44`, background:T.purpleGlow }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <div className="section-title" style={{ color:T.purple, margin:0 }}>🤖 AI Predictions → Suggested Work Orders</div>
            <span style={{ fontSize:11, color:T.textMuted }}>Create WOs now to prevent breakdowns</span>
          </div>
          {aiWOSuggestions.slice(0,4).map((s,i)=>(
            <div key={i} className="arow" style={{ borderLeftColor:s.riskScore==="HIGH"?T.red:T.orange }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:700 }}>{s.vehicle} — <span style={{ color:T.purple }}>{s.component}</span></div>
                <div style={{ fontSize:11, color:T.textSub }}>
                  {s.type==="failure" ? `Predicted failure in ${s.inDays} days — confidence ${Math.round(s.confidence*100)}%`
                   : s.kmLeft ? `Replacement in ${s.kmLeft.toLocaleString()} km — confidence ${Math.round(s.confidence*100)}%`
                   : `Maintenance due in ${s.inDays} days — ${Math.round(s.confidence*100)}% confidence`}
                </div>
              </div>
              <button className="btn btn-p" style={{ fontSize:10, padding:"4px 10px" }} onClick={()=>openWizard({ vehicle:s.vehicle, source:"AI Prediction", issue:`AI predicted ${s.component} ${s.type} — preventive action`, category:s.component.includes("Tyre")?"Tyre System":s.component.includes("Brake")?"Brake System":s.component.includes("Alternator")?"Electrical":"Engine", priority:s.riskScore==="HIGH"?"HIGH":"MEDIUM" })}>
                Create WO
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="tabs">
        {["workorders","schedule","cost-analysis","vendors"].map(t=>(
          <div key={t} className={`tab ${tab===t?"on":""}`} onClick={()=>setTab(t)}>
            {t==="workorders"?"Work Orders":t==="cost-analysis"?"Cost Analysis":t.charAt(0).toUpperCase()+t.slice(1)}
          </div>
        ))}
      </div>

      {tab==="workorders" && (
        <div>
          <div style={{ display:"flex", gap:8, marginBottom:10 }}>
            <div className="tabs" style={{ marginBottom:0 }}>
              {["All","Open","In Progress","Waiting for Parts","Completed"].map(s=>(
                <div key={s} className={`tab ${filterStatus===s?"on":""}`} onClick={()=>setFilterStatus(s)} style={{ fontSize:11 }}>{s}</div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding:0 }}>
            <table className="tbl">
              <thead><tr><th>WO ID</th><th>Vehicle</th><th>Source</th><th>Category</th><th>Priority</th><th>Issue</th><th>Workshop</th><th>Est. Cost</th><th>Actual</th><th>Approval</th><th>Flag</th><th>Status</th></tr></thead>
              <tbody>
                {filtered.map(wo=>(
                  <tr key={wo.id} style={{ cursor:"pointer" }} onClick={()=>setSelWO(wo)}>
                    <td className="mono" style={{ fontSize:11, color:T.accent }}>{wo.id}</td>
                    <td className="mono" style={{ fontSize:11 }}>{wo.vehicle}</td>
                    <td><span className={`badge ${wo.source==="AI Prediction"?"bp":wo.source==="Breakdown"?"br":wo.source==="Scheduled"?"bg":"ba"}`} style={{ fontSize:10 }}>{wo.source}</span></td>
                    <td><span className="badge bc" style={{ fontSize:10 }}>{wo.category}</span></td>
                    <td><span className={`badge ${wo.priority==="CRITICAL"?"br":wo.priority==="HIGH"?"bo":wo.priority==="MEDIUM"?"ba":"bg"}`} style={{ fontSize:10 }}>{wo.priority}</span></td>
                    <td style={{ fontSize:11, maxWidth:140, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{wo.issue}</td>
                    <td style={{ fontSize:11 }}>{wo.workshop?.split(",")[0]}</td>
                    <td style={{ fontSize:11, color:T.textMuted }}>{wo.estimatedCost>0?fmt(wo.estimatedCost):"—"}</td>
                    <td style={{ fontWeight:700, color:T.accent }}>{wo.totalCost>0?fmt(wo.totalCost):"—"}</td>
                    <td><span className={`badge ${wo.approvalLevel==="Auto"?"bg":wo.approvalLevel==="Manager"?"ba":"br"}`} style={{ fontSize:10 }}>{wo.approvalLevel}</span></td>
                    <td>{wo.duplicateFlag?<span style={{ fontSize:16 }} title="Duplicate Issue">🚨</span>:"—"}</td>
                    <td><span className="badge" style={{ background:woStatusColor(wo.status)+"22", color:woStatusColor(wo.status), fontSize:10 }}>{wo.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab==="schedule" && (
        <div className="card">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div className="section-title" style={{ margin:0 }}>Preventive Maintenance Schedule</div>
            <button className="btn btn-b" style={{ fontSize:11 }} onClick={()=>openWizard({ source:"Scheduled", type:"Preventive" })}>+ Schedule WO</button>
          </div>
          {[
            { vehicle:"TN69 GH4789", component:"Engine Oil Change",  nextDueKm:80000, currentKm:74875, lastDoneKm:70000, interval:"10,000 km", estCost:1800 },
            { vehicle:"TN59 AB1234", component:"Clutch Inspection",  nextDueKm:90000, currentKm:92340, lastDoneKm:80000, interval:"80,000 km", estCost:12000 },
            { vehicle:"TN38 EF9012", component:"Air Filter",         nextDueKm:60000, currentKm:54220, lastDoneKm:50000, interval:"20,000 km", estCost:1000 },
            { vehicle:"TN45 CD5678", component:"Gear Box Oil",       nextDueKm:130000,currentKm:124000,lastDoneKm:120000,interval:"40,000 km", estCost:2500 },
            { vehicle:"TN71 GH3456", component:"Brake Adjustment",   nextDueKm:90000, currentKm:88910, lastDoneKm:75000, interval:"15,000 km", estCost:3500 },
          ].map((s,i)=>{
            const progress = ((s.currentKm-s.lastDoneKm)/(s.nextDueKm-s.lastDoneKm))*100;
            const kmLeft = s.nextDueKm - s.currentKm;
            const overdue = kmLeft < 0;
            return (
              <div key={i} style={{ padding:"12px 0", borderBottom:`1px solid ${T.border}22`, display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <div><span className="mono" style={{ fontSize:12, color:T.accent }}>{s.vehicle}</span><span style={{ fontSize:12, marginLeft:10, fontWeight:500 }}>{s.component}</span><span style={{ fontSize:10, color:T.textMuted, marginLeft:8 }}>Every {s.interval}</span></div>
                    <span style={{ fontSize:12, color:overdue?T.red:kmLeft<3000?T.red:kmLeft<8000?T.orange:T.green, fontWeight:600 }}>{overdue?`OVERDUE ${Math.abs(kmLeft).toLocaleString()} km`:`${kmLeft.toLocaleString()} km left`}</span>
                  </div>
                  <div className="pbar" style={{ height:6 }}><div className="pfill" style={{ width:`${Math.min(Math.max(progress,0),100)}%`, background:progress>90||overdue?T.red:progress>70?T.orange:T.green }} /></div>
                </div>
                <div style={{ textAlign:"right", minWidth:80 }}>
                  <div style={{ fontSize:11, color:T.textSub }}>{fmt(s.estCost)}</div>
                  <button className="btn btn-p" style={{ fontSize:10, padding:"3px 8px", marginTop:4 }} onClick={()=>openWizard({ vehicle:s.vehicle, source:"Scheduled", type:"Preventive", issue:`Scheduled ${s.component} — due at ${s.nextDueKm.toLocaleString()} km` })}>Create WO</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab==="cost-analysis" && (
        <div>
          <div className="grd2" style={{ marginBottom:14 }}>
            <div className="card">
              <div className="section-title">Maintenance Cost by Category</div>
              {[
                { cat:"Engine",        cost:45000, pct:32, trend:"↑" },
                { cat:"Electrical",    cost:28000, pct:20, trend:"→" },
                { cat:"Brake System",  cost:22000, pct:16, trend:"↓" },
                { cat:"Tyre System",   cost:18000, pct:13, trend:"↑" },
                { cat:"Gearbox",       cost:14000, pct:10, trend:"→" },
                { cat:"Other",         cost:12600, pct:9,  trend:"→" },
              ].map(c=>(
                <div key={c.cat} style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}>
                    <span>{c.cat} <span style={{ color:c.trend==="↑"?T.red:c.trend==="↓"?T.green:T.textMuted, fontSize:11 }}>{c.trend}</span></span>
                    <span style={{ color:T.accent, fontWeight:600 }}>{fmt(c.cost)} ({c.pct}%)</span>
                  </div>
                  <div className="pbar" style={{ height:7 }}><div className="pfill" style={{ width:`${c.pct}%`, background:c.pct>25?T.red:c.pct>15?T.orange:T.accent }} /></div>
                </div>
              ))}
            </div>
            <div className="card">
              <div className="section-title">Preventive vs Breakdown Cost</div>
              {[
                { type:"Preventive",  cost:48000, wos:8,  cpw:6000,  col:T.green },
                { type:"Corrective",  cost:68000, wos:11, cpw:6182,  col:T.orange },
                { type:"Emergency",   cost:42000, wos:3,  cpw:14000, col:T.red },
                { type:"Predictive",  cost:18000, wos:4,  cpw:4500,  col:T.blue },
              ].map(r=>(
                <div key={r.type} style={{ padding:"9px 0", borderBottom:`1px solid ${T.border}22` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}>
                    <span style={{ fontWeight:600, color:r.col }}>{r.type}</span>
                    <span style={{ fontWeight:700 }}>{fmt(r.cost)}</span>
                  </div>
                  <div style={{ display:"flex", gap:12, fontSize:11, color:T.textSub }}>
                    <span>{r.wos} WOs</span>
                    <span>Avg/WO: <strong style={{ color:r.cpw>10000?T.red:T.text }}>{fmt(r.cpw)}</strong></span>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:10, background:T.orangeGlow, borderRadius:8, padding:8, fontSize:11, color:T.orange }}>
                ⚠️ Emergency repair avg (₹14,000) = 2.3× preventive cost (₹6,000). Increase preventive %!
              </div>
            </div>
          </div>
          <div className="card">
            <div className="section-title">Cost Leakage Analysis</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
              {[
                { issue:"Repeat repairs (same vehicle, same issue < 30 days)", amount:24000, flag:"duplicate", severity:"high" },
                { issue:"Cost overruns > 20% above AI estimate", amount:18500, flag:"deviation", severity:"high" },
                { issue:"Emergency repairs (could have been preventive)", amount:42000, flag:"emergency", severity:"medium" },
                { issue:"Unplanned downtime cost (trips delayed)", amount:35000, flag:"downtime", severity:"high" },
                { issue:"Overpriced vendor invoices (vs market rate)", amount:11200, flag:"overpricing", severity:"medium" },
                { issue:"Parts marked used but not in WO line items", amount:8400, flag:"parts", severity:"medium" },
              ].map((l,i)=>(
                <div key={i} style={{ background:T.bgPanel, border:`1px solid ${l.severity==="high"?T.red:T.orange}33`, borderRadius:8, padding:"10px 12px" }}>
                  <div style={{ fontSize:11, color:T.textSub, marginBottom:6 }}>{l.issue}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:T.red }}>{fmt(l.amount)}</div>
                  <span className={`badge ${l.severity==="high"?"br":"bo"}`} style={{ fontSize:10, marginTop:4 }}>{l.severity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab==="vendors" && (
        <div className="card">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div className="section-title" style={{ margin:0 }}>Workshop Vendor Performance</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {WORKSHOP_VENDORS.map(w=>(
              <div key={w.id} style={{ padding:"12px 14px", background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4 }}>
                    <span style={{ fontWeight:700, fontSize:13 }}>{w.name}</span>
                    <span className="badge bb" style={{ fontSize:10 }}>{w.type}</span>
                    <span style={{ fontSize:11, color:T.textMuted }}>📍 {w.city}</span>
                  </div>
                  <div style={{ display:"flex", gap:12, fontSize:11, color:T.textSub }}>
                    <span>⭐ {w.rating}/5</span>
                    <span>⏱ TAT: {w.avgTAT}</span>
                    <span>📏 {w.distance} km</span>
                    <span>💡 {w.speciality}</span>
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:12, color:w.costIndex<1?T.green:w.costIndex===1?T.accent:T.orange, fontWeight:600 }}>
                    {w.costIndex<1?"Below avg cost":w.costIndex===1?"Avg cost":"Above avg cost"}
                  </div>
                  <div style={{ display:"flex", gap:4, marginTop:4 }}>
                    {[1,2,3,4,5].map(star=>(
                      <div key={star} style={{ width:8, height:8, borderRadius:"50%", background:star<=Math.round(w.rating)?T.accent:T.border }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SparePartsPage = () => {
  const lowStock = SPARE_PARTS.filter(p => p.quantity <= p.reorderLevel);
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Spare Parts</h1><p style={{ color:T.textSub, fontSize:12 }}>Stock, reorder alerts, issue against work orders</p></div>
        <button className="btn btn-p"><Ic n="plus" s={14} c="#080B10" /> Add Parts</button>
      </div>
      {lowStock.length > 0 && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.red}44`, background:T.redGlow }}>
          <div className="section-title" style={{ color:T.red }}>🔴 Low Stock — {lowStock.length} items below reorder level</div>
          {lowStock.map(p => (
            <div key={p.id} className="arow" style={{ borderLeftColor:T.red }}>
              <div style={{ flex:1 }}><div style={{ fontSize:12, fontWeight:600 }}>{p.name}</div><div style={{ fontSize:11, color:T.textSub }}>Only {p.quantity} {p.unit} left · Reorder at {p.reorderLevel}</div></div>
              <button className="btn btn-p" style={{ fontSize:10, padding:"3px 10px" }}>Reorder</button>
            </div>
          ))}
        </div>
      )}
      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>ID</th><th>Name</th><th>Category</th><th>Qty</th><th>Unit Cost</th><th>Stock Value</th><th>Status</th></tr></thead>
          <tbody>
            {SPARE_PARTS.map(p => (
              <tr key={p.id}>
                <td className="mono" style={{ fontSize:11, color:T.accent }}>{p.id}</td>
                <td style={{ fontWeight:600 }}>{p.name}</td>
                <td><span className="badge bc">{p.category}</span></td>
                <td style={{ fontWeight:700, color:p.quantity<=p.reorderLevel?T.red:T.green }}>{p.quantity} {p.unit}</td>
                <td>{fmt(p.unitCost)}</td>
                <td style={{ color:T.blue, fontWeight:600 }}>{fmt(p.quantity*p.unitCost)}</td>
                <td><span className={`badge ${p.quantity>p.reorderLevel?"bg":"br"}`}>{p.quantity>p.reorderLevel?"OK":"Low"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AIPredictionPage = () => {
  const [tab, setTab] = useState("fleet-view");
  const [sel, setSel] = useState(null);
  const highRisk = AI_PREDICTIONS.filter(p => p.riskScore==="HIGH");
  const totalExpected = AI_PREDICTIONS.reduce((s,p)=>s+p.expectedCost30d,0);
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28, fontWeight:700 }}><span style={{ color:T.purple }}>AI</span> Prediction Engine</h1><p style={{ color:T.textSub, fontSize:12 }}>Risk scoring, failure prediction, 30-day cost forecast</p></div>
        <div style={{ display:"flex", gap:8 }}><button className="btn btn-b"><Ic n="cpu" s={14} c={T.blue} /> Run Fleet Scan</button></div>
      </div>
      <div className="kpi-row kpi4" style={{ marginBottom:18 }}>
        {[
          { l:"High Risk Vehicles", v:highRisk.length, c:T.red },
          { l:"Predicted Failures (30d)", v:AI_PREDICTIONS.reduce((s,p)=>s+p.predictions.filter(x=>x.type==="failure").length,0), c:T.orange },
          { l:"Expected Spend (30d)", v:fmt(totalExpected), c:T.purple },
          { l:"Model Accuracy", v:"84%", c:T.green },
        ].map(k => <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>)}
      </div>
      {highRisk.length > 0 && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.red}44`, background:T.redGlow }}>
          <div className="section-title" style={{ color:T.red }}>🚨 Immediate Attention</div>
          {highRisk.map(p => (
            <div key={p.vehicle} className="arow" style={{ borderLeftColor:T.red }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.red }}>{p.vehicle} — Score: {p.riskValue}/100</div>
                <div style={{ fontSize:11, color:T.textSub }}>{p.predictions.map(pr=>`${pr.component} (${pr.inDays?`in ${pr.inDays}d`:`${pr.kmLeft}km`})`).join(" · ")}</div>
              </div>
              <span className="risk-high">HIGH</span>
              <button className="btn btn-r" style={{ fontSize:10, padding:"3px 10px" }} onClick={()=>setSel(p)}>View →</button>
            </div>
          ))}
        </div>
      )}
      <div className="tabs">{["fleet-view","predictions","upcoming","cost-forecast"].map(t=><div key={t} className={`tab ${tab===t?"on":""}`} onClick={()=>setTab(t)}>{t==="fleet-view"?"Fleet View":t==="cost-forecast"?"Cost Forecast":t.charAt(0).toUpperCase()+t.slice(1)}</div>)}</div>
      {tab === "fleet-view" && (
        <div className="grd2">
          {AI_PREDICTIONS.map(p => (
            <div key={p.vehicle} className="card" style={{ cursor:"pointer", border:`1px solid ${p.riskScore==="HIGH"?T.red+"44":p.riskScore==="MEDIUM"?T.orange+"33":T.border}` }} onClick={()=>setSel(p)}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                <div><div className="mono" style={{ fontWeight:700, fontSize:13, color:T.accent }}>{p.vehicle}</div></div>
                {riskBadge(p.riskScore)}
              </div>
              <div style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:4 }}>
                  <span style={{ color:T.textMuted }}>Risk Score</span>
                  <span style={{ fontWeight:600, color:p.riskValue>70?T.red:p.riskValue>40?T.orange:T.green }}>{p.riskValue}/100</span>
                </div>
                <div className="pbar" style={{ height:6 }}><div className="pfill" style={{ width:`${p.riskValue}%`, background:p.riskValue>70?T.red:p.riskValue>40?T.orange:T.green }} /></div>
              </div>
              {p.predictions.filter(x=>x.type!=="ok").map((pr,i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", fontSize:11, padding:"2px 0" }}>
                  <span style={{ color:T.textSub }}>{pr.component}</span>
                  <span style={{ color:pr.confidence>0.8?T.red:T.orange }}>{pr.inDays?`~${pr.inDays}d`:pr.kmLeft?`~${pr.kmLeft}km`:"OK"} <span style={{ color:T.textMuted }}>({Math.round(pr.confidence*100)}%)</span></span>
                </div>
              ))}
              <div className="sep" />
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:11 }}>
                <span style={{ color:T.textMuted }}>Expected cost (30d)</span>
                <span style={{ color:T.purple, fontWeight:600 }}>{fmt(p.expectedCost30d)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "predictions" && (
        <div className="card" style={{ padding:0 }}>
          <table className="tbl">
            <thead><tr><th>Vehicle</th><th>Component</th><th>Type</th><th>Timeline</th><th>Confidence</th><th>Action</th></tr></thead>
            <tbody>
              {AI_PREDICTIONS.flatMap(p => p.predictions.map((pr,i) => (
                <tr key={`${p.vehicle}-${i}`}>
                  <td className="mono" style={{ fontSize:11, color:T.accent }}>{p.vehicle}</td>
                  <td style={{ fontWeight:600 }}>{pr.component}</td>
                  <td><span className={`badge ${pr.type==="failure"?"br":pr.type==="maintenance"?"ba":"bg"}`}>{pr.type}</span></td>
                  <td style={{ color:pr.confidence>0.8?T.red:T.orange, fontWeight:600 }}>{pr.inDays?`In ${pr.inDays} days`:pr.kmLeft?`In ${pr.kmLeft} km`:"—"}</td>
                  <td>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div className="pbar" style={{ width:60 }}><div className="pfill" style={{ width:`${pr.confidence*100}%`, background:pr.confidence>0.8?T.green:T.orange }} /></div>
                      <span style={{ fontSize:11, color:T.textSub }}>{Math.round(pr.confidence*100)}%</span>
                    </div>
                  </td>
                  <td>{pr.type!=="ok"&&<button className="btn btn-p" style={{ fontSize:10, padding:"3px 10px" }}>Create WO</button>}</td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      )}
      {tab === "upcoming" && (
        <div className="card">
          <div className="section-title">Upcoming Maintenance — Next 30 Days</div>
          {AI_PREDICTIONS.flatMap(p=>p.predictions.filter(pr=>pr.inDays&&pr.inDays<=30).map(pr=>({...pr,vehicle:p.vehicle}))).sort((a,b)=>a.inDays-b.inDays).map((item,i) => (
            <div key={i} style={{ display:"flex", gap:14, padding:"10px 0", borderBottom:`1px solid ${T.border}22` }}>
              <div style={{ width:40, height:40, borderRadius:8, background:item.inDays<=7?T.red+"18":T.orange+"18", border:`1px solid ${item.inDays<=7?T.red:T.orange}33`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                <div className="rj" style={{ fontSize:16, fontWeight:700, color:item.inDays<=7?T.red:T.orange }}>{item.inDays}</div>
                <div style={{ fontSize:8, color:T.textMuted }}>days</div>
              </div>
              <div style={{ flex:1 }}><div style={{ fontSize:12, fontWeight:600 }}>{item.component} — {item.type}</div><div style={{ fontSize:11, color:T.textSub }}>{item.vehicle}</div></div>
              <span className={`badge ${item.inDays<=7?"br":"ba"}`}>{item.inDays<=7?"Urgent":"Plan"}</span>
            </div>
          ))}
        </div>
      )}
      {tab === "cost-forecast" && (
        <div className="grd2">
          <div className="card">
            <div className="section-title">30-Day Cost Forecast by Vehicle</div>
            {AI_PREDICTIONS.sort((a,b)=>b.expectedCost30d-a.expectedCost30d).map(p => (
              <div key={p.vehicle} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:5 }}><span className="mono" style={{ color:T.accent }}>{p.vehicle}</span><span style={{ color:T.purple, fontWeight:600 }}>{fmt(p.expectedCost30d)}</span></div>
                <div className="pbar"><div className="pfill" style={{ width:`${(p.expectedCost30d/totalExpected)*100}%`, background:T.purple }} /></div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="section-title">Fleet Budget Breakdown</div>
            {[{ l:"Preventive (planned)", v:fmt(18000), c:T.green },{ l:"Corrective (breakdown)", v:fmt(36000), c:T.orange },{ l:"Emergency reserve", v:fmt(16000), c:T.red },{ l:"Total 30-day budget", v:fmt(totalExpected), c:T.purple }].map(k => (
              <div key={k.l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${T.border}22`, fontSize:12 }}>
                <span style={{ color:T.textSub }}>{k.l}</span><span style={{ fontWeight:700, color:k.c }}>{k.v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {sel && (
        <div className="ov">
          <div className="modal" style={{ maxWidth:600 }}>
            <div className="mhdr" style={{ background:`linear-gradient(135deg,${sel.riskScore==="HIGH"?"#450A0A,#7F1D1D":"#1C1917,#292524"})` }}>
              <div><div className="rj" style={{ fontSize:20, fontWeight:700, color:sel.riskScore==="HIGH"?T.red:T.accent }}>{sel.riskScore==="HIGH"?"🚨":"🔮"} AI Report — {sel.vehicle}</div></div>
              <button className="btn" style={{ background:"rgba(255,255,255,.1)", color:"#fff", padding:"5px 9px" }} onClick={()=>setSel(null)}><Ic n="x" s={14} c="#fff" /></button>
            </div>
            <div className="mbdy">
              <div style={{ marginBottom:18 }}>
                <div style={{ fontSize:11, color:T.textMuted, marginBottom:4 }}>RISK SCORE</div>
                <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                  <div style={{ flex:1 }}><div className="pbar" style={{ height:10 }}><div className="pfill" style={{ width:`${sel.riskValue}%`, background:sel.riskValue>70?T.red:sel.riskValue>40?T.orange:T.green }} /></div></div>
                  <div className="rj" style={{ fontSize:36, fontWeight:700, color:sel.riskValue>70?T.red:sel.riskValue>40?T.orange:T.green }}>{sel.riskValue}<span style={{ fontSize:16, color:T.textMuted }}>/100</span></div>
                </div>
              </div>
              {sel.predictions.map((pr,i) => (
                <div key={i} style={{ background:T.bgPanel, borderRadius:10, padding:14, marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ fontWeight:600 }}>{pr.component}</span>
                    <span className={`badge ${pr.type==="failure"?"br":pr.type==="maintenance"?"ba":"bg"}`}>{pr.type}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}>
                    <span style={{ color:T.textSub }}>{pr.inDays?`In ${pr.inDays} days`:pr.kmLeft?`In ${pr.kmLeft} km`:"All clear"}</span>
                    <span style={{ color:T.purple, fontWeight:600 }}>{Math.round(pr.confidence*100)}% confidence</span>
                  </div>
                </div>
              ))}
              <div style={{ display:"flex", gap:8, marginTop:14 }}>
                <button className="btn btn-p"><Ic n="plus" s={13} c="#080B10" /> Create Work Order</button>
                <button className="btn btn-gh" onClick={()=>setSel(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DriverSettlementPage = () => {
  const [tab, setTab] = useState("overview");
  const [showSettle, setShowSettle] = useState(null);
  const pendingTrips = [{id:"TRP-2025-0042",driver:"Selvam R",route:"Madurai → Bangalore",advance:18000,expenses:{diesel:11000,toll:2500,loading:500,unloading:500,misc:200},status:"Pending Settlement"},{id:"TRP-2025-0044",driver:"Arjun D",route:"Salem → Hyderabad",advance:15000,expenses:{diesel:9000,toll:2000,loading:400,unloading:400,misc:300},status:"Pending Settlement"}];
  const totalAdv = DRIVERS_DATA.reduce((s,d)=>s+d.advanceBalance,0);
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Driver Settlement</h1><p style={{ color:T.textSub, fontSize:12 }}>Advance tracking, expense reconciliation, wallet & payout</p></div>
        <button className="btn btn-p"><Ic n="wallet" s={14} c="#080B10" /> New Settlement</button>
      </div>
      <div className="kpi-row kpi4" style={{ marginBottom:18 }}>
        {[{ l:"Pending Settlements", v:pendingTrips.length, c:T.orange },{ l:"Total Advance Outstanding", v:fmt(totalAdv), c:T.red },{ l:"Settled This Month", v:"12", c:T.green },{ l:"Cash Returned MTD", v:fmt(62500), c:T.blue }].map(k => <div key={k.l} className="stat"><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>)}
      </div>
      <div className="tabs">{["overview","advances","ledger"].map(t=><div key={t} className={`tab ${tab===t?"on":""}`} onClick={()=>setTab(t)} style={{ textTransform:"capitalize" }}>{t}</div>)}</div>
      {tab==="overview" && (
        <div>
          <div className="card" style={{ marginBottom:14, border:`1px solid ${T.orange}44`, background:T.orangeGlow }}>
            <div className="section-title" style={{ color:T.orange }}>⚡ {pendingTrips.length} settlements pending</div>
            {pendingTrips.map(t => {
              const exp = tripExpTotal(t.expenses);
              const bal = t.advance - exp;
              return (
                <div key={t.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderBottom:`1px solid ${T.border}22` }}>
                  <div><span className="mono" style={{ fontSize:12, color:T.accent }}>{t.id}</span><span style={{ fontSize:12, color:T.textSub, marginLeft:8 }}>{t.driver} · {t.route}</span></div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <div className="rj" style={{ fontSize:16, fontWeight:700, color:bal>=0?T.red:T.green }}>{bal>=0?`Driver returns ${fmt(bal)}`:`Pay ${fmt(Math.abs(bal))}`}</div>
                    <button className="btn btn-p" style={{ fontSize:11 }} onClick={()=>setShowSettle(t)}>Settle →</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grd2">
            <div className="card">
              <div className="section-title">Driver Wallet Balances</div>
              {DRIVERS_DATA.map(d => (
                <div key={d.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"7px 0", borderBottom:`1px solid ${T.border}22` }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <div style={{ width:30, height:30, borderRadius:"50%", background:T.accentGlow, border:`1px solid ${T.accent}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:T.accent }}>{d.name[0]}</div>
                    <div><div style={{ fontSize:12, fontWeight:600 }}>{d.name}</div><div style={{ fontSize:11, color:T.textSub }}>{d.status}</div></div>
                  </div>
                  <div className="rj" style={{ fontSize:16, fontWeight:700, color:d.advanceBalance>5000?T.red:d.advanceBalance>0?T.orange:T.green }}>{fmt(d.advanceBalance)}</div>
                </div>
              ))}
            </div>
            <div className="card">
              <div className="section-title">Driver Performance Scores</div>
              {DRIVERS_DATA.map(d => (
                <div key={d.id} style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:3 }}>
                    <span style={{ fontWeight:600 }}>{d.name}</span>
                    <span style={{ color:d.score>80?T.green:d.score>65?T.orange:T.red, fontWeight:600 }}>{d.score}/100</span>
                  </div>
                  <div className="pbar"><div className="pfill" style={{ width:`${d.score}%`, background:d.score>80?T.green:d.score>65?T.orange:T.red }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {tab==="advances" && (
        <div className="card" style={{ padding:0 }}>
          <table className="tbl">
            <thead><tr><th>Date</th><th>Driver</th><th>Trip</th><th>Amount</th><th>Mode</th><th>Purpose</th></tr></thead>
            <tbody>
              {pendingTrips.map((t,i) => <tr key={i}><td className="mono" style={{ fontSize:11 }}>14 Apr</td><td style={{ fontWeight:600 }}>{t.driver}</td><td className="mono" style={{ fontSize:11, color:T.accent }}>{t.id}</td><td style={{ color:T.orange, fontWeight:600 }}>{fmt(t.advance)}</td><td><span className="badge ba">Cash</span></td><td style={{ fontSize:11, color:T.textSub }}>Trip advance</td></tr>)}
            </tbody>
          </table>
        </div>
      )}
      {showSettle && (() => {
        const exp = tripExpTotal(showSettle.expenses);
        const bal = showSettle.advance - exp;
        return (
          <div className="ov">
            <div className="modal" style={{ maxWidth:640 }}>
              <div className="mhdr" style={{ background:"linear-gradient(135deg,#064E3B,#065F46)" }}>
                <div><div className="rj" style={{ fontSize:20, fontWeight:700, color:"#fff" }}>💰 Settlement — {showSettle.id}</div><div style={{ fontSize:12, color:"#A7F3D0" }}>{showSettle.driver} · {showSettle.route}</div></div>
                <button className="btn" style={{ background:"rgba(255,255,255,.1)", color:"#fff", padding:"5px 9px" }} onClick={()=>setShowSettle(null)}><Ic n="x" s={14} c="#fff" /></button>
              </div>
              <div className="mbdy">
                <div className="grd3" style={{ marginBottom:14 }}>
                  {[{ l:"Advance", v:fmt(showSettle.advance), c:T.orange },{ l:"Expenses", v:fmt(exp), c:T.red },{ l:"Balance", v:bal>=0?`Returns ${fmt(bal)}`:`Pay ${fmt(Math.abs(bal))}`, c:bal>=0?T.red:T.green }].map(k => <div key={k.l} style={{ background:T.bgPanel, borderRadius:8, padding:"10px 12px" }}><div style={{ fontSize:10, color:T.textMuted }}>{k.l}</div><div style={{ fontSize:13, fontWeight:700, color:k.c, marginTop:4 }}>{k.v}</div></div>)}
                </div>
                <div className="grd2" style={{ marginBottom:14 }}>
                  {Object.entries(showSettle.expenses).map(([k,v]) => <div key={k} style={{ background:T.bgPanel, borderRadius:8, padding:"8px 12px", display:"flex", justifyContent:"space-between" }}><span style={{ textTransform:"capitalize", color:T.textSub }}>{k}</span><span style={{ fontWeight:600 }}>{fmt(v)}</span></div>)}
                </div>
                <div style={{ display:"flex", justifyContent:"flex-end", gap:8 }}>
                  <button className="btn btn-gh" onClick={()=>setShowSettle(null)}>Cancel</button>
                  <button className="btn btn-p" onClick={()=>setShowSettle(null)}><Ic n="check" s={13} c="#080B10" /> Approve & Close</button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

// ─── Tyre Axle Diagram Component ─────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
// TYRE INTELLIGENCE MODULE v2 — FULL ROTATION + AI + LIFECYCLE SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Master Tyre Data ─────────────────────────────────────────────────────────
const ALL_TYRE_POSITIONS = {
  "TN69 GH4789": [
    { pos:"FL",  risk:"healthy",  kmLeft:8200, tread:7.2, brand:"MRF",         wear:"even",   id:"TYR-001", tin:"MRF-CH-17-23-0042", size:"315/80 R22.5", pattern:"RIB",  retreads:0, purchaseCost:28000, fitOdo:46000,  currentOdo:74875 },
    { pos:"FR",  risk:"warning",  kmLeft:1800, tread:3.8, brand:"CEAT",        wear:"uneven", id:"TYR-002", tin:"CEA-MA-08-23-1187", size:"315/80 R22.5", pattern:"RIB",  retreads:1, purchaseCost:25000, fitOdo:67000,  currentOdo:74875 },
    { pos:"RL1", risk:"critical", kmLeft:420,  tread:2.1, brand:"Apollo",      wear:"uneven", id:"TYR-X01", tin:"APL-NA-32-22-0891", size:"295/80 R22.5", pattern:"LUG",  retreads:2, purchaseCost:22000, fitOdo:118000, currentOdo:124420 },
    { pos:"RR1", risk:"healthy",  kmLeft:7100, tread:6.9, brand:"MRF",         wear:"even",   id:"TYR-X02", tin:"MRF-CH-21-22-0318", size:"295/80 R22.5", pattern:"LUG",  retreads:0, purchaseCost:26000, fitOdo:55000,  currentOdo:74875 },
    { pos:"RL2", risk:"retread",  kmLeft:2800, tread:4.5, brand:"Apollo",      wear:"even",   id:"TYR-X03", tin:"APL-NA-14-22-0556", size:"295/80 R22.5", pattern:"LUG",  retreads:1, purchaseCost:22000, fitOdo:60000,  currentOdo:74875 },
    { pos:"RR2", risk:"warning",  kmLeft:1400, tread:3.2, brand:"CEAT",        wear:"uneven", id:"TYR-X04", tin:"CEA-MA-27-23-0834", size:"315/80 R22.5", pattern:"LUG",  retreads:0, purchaseCost:25000, fitOdo:67000,  currentOdo:74875 },
    { pos:"RL3", risk:"healthy",  kmLeft:6800, tread:7.0, brand:"Bridgestone", wear:"even",   id:"TYR-X05", tin:"BRG-PU-06-23-0077", size:"315/80 R22.5", pattern:"LUG",  retreads:0, purchaseCost:32000, fitOdo:58000,  currentOdo:74875 },
    { pos:"RR3", risk:"healthy",  kmLeft:5900, tread:6.4, brand:"MRF",         wear:"even",   id:"TYR-X06", tin:"MRF-CH-09-23-0719", size:"315/80 R22.5", pattern:"LUG",  retreads:0, purchaseCost:28000, fitOdo:62000,  currentOdo:74875 },
    { pos:"Spare", risk:"healthy",kmLeft:9800, tread:8.8, brand:"MRF",         wear:"even",   id:"TYR-SP1", tin:"MRF-CH-01-24-0003", size:"315/80 R22.5", pattern:"LUG",  retreads:0, purchaseCost:28000, fitOdo:null,   currentOdo:null },
  ],
  "TN59 AB1234": [
    { pos:"FL",  risk:"healthy",  kmLeft:6200, tread:6.8, brand:"Bridgestone", wear:"even",   id:"TYR-B01", tin:"BRG-PU-44-22-0112", size:"315/80 R22.5", pattern:"RIB",  retreads:0, purchaseCost:32000, fitOdo:34000,  currentOdo:92340 },
    { pos:"FR",  risk:"healthy",  kmLeft:5800, tread:6.1, brand:"Bridgestone", wear:"even",   id:"TYR-B02", tin:"BRG-PU-44-22-0113", size:"315/80 R22.5", pattern:"RIB",  retreads:0, purchaseCost:32000, fitOdo:36000,  currentOdo:92340 },
    { pos:"RL1", risk:"warning",  kmLeft:2200, tread:3.6, brand:"MRF",         wear:"uneven", id:"TYR-B03", tin:"MRF-CH-29-22-0481", size:"295/80 R22.5", pattern:"LUG",  retreads:1, purchaseCost:26000, fitOdo:72000,  currentOdo:92340 },
    { pos:"RR1", risk:"healthy",  kmLeft:4100, tread:5.2, brand:"MRF",         wear:"even",   id:"TYR-B04", tin:"MRF-CH-29-22-0482", size:"295/80 R22.5", pattern:"LUG",  retreads:0, purchaseCost:26000, fitOdo:64000,  currentOdo:92340 },
  ],
};

const MOVEMENT_HISTORY = [
  { id:"MOV-001", tyreId:"TYR-X01", date:"2024-12-10", type:"Rotation",         fromV:"TN69 GH4789", fromP:"FL",  toV:"TN69 GH4789", toP:"RL1", reason:"KM-based rotation (12,000 km trigger)", by:"Fleet Manager", kmSaved:1200 },
  { id:"MOV-002", tyreId:"TYR-X03", date:"2025-01-22", type:"Cross-Vehicle",    fromV:"TN59 AB1234", fromP:"RL2", toV:"TN69 GH4789", toP:"RL2", reason:"TN59 idle — tyre shifted to high-usage vehicle", by:"AI Suggestion", kmSaved:3800 },
  { id:"MOV-003", tyreId:"TYR-002", date:"2025-02-15", type:"Retread",          fromV:"TN69 GH4789", fromP:"FL",  toV:"Workshop",    toP:"—",   reason:"Tread < 4mm — sent for retread", by:"Workshop",  kmSaved:null },
  { id:"MOV-004", tyreId:"TYR-B03", date:"2025-03-08", type:"Rotation",         fromV:"TN59 AB1234", fromP:"FL",  toV:"TN59 AB1234", toP:"RL1", reason:"Uneven wear on front axle", by:"AI Suggestion", kmSaved:800 },
  { id:"MOV-005", tyreId:"TYR-X05", date:"2025-04-01", type:"Transfer (Refit)", fromV:"Workshop",    fromP:"—",  toV:"TN69 GH4789", toP:"RL3", reason:"Post-retread fitment", by:"Fleet Manager",  kmSaved:null },
];

const AI_ROTATION_SUGGESTIONS = [
  { id:"SUG-001", tyreId:"TYR-X01", vehicle:"TN69 GH4789", pos:"RL1", action:"REPLACE",          urgency:"critical", reason:"Tread 2.1mm — below safe limit. High burst risk at current axle load.", impact:"Prevent ₹45,000+ breakdown cost", kmSave:null,  confidence:97 },
  { id:"SUG-002", tyreId:"TYR-002", vehicle:"TN69 GH4789", pos:"FR",  action:"ROTATE_TO_REAR",   urgency:"high",     reason:"Uneven shoulder wear detected. Front axle wearing this tyre 22% faster than rear.", impact:"+2,400 km estimated life extension", kmSave:2400, confidence:88 },
  { id:"SUG-003", tyreId:"TYR-X04", vehicle:"TN69 GH4789", pos:"RR2", action:"ROTATE_TO_REAR",   urgency:"medium",   reason:"Warning level — move to trailer axle where wear rate is 18% lower.", impact:"+1,800 km estimated life extension", kmSave:1800, confidence:81 },
  { id:"SUG-004", tyreId:"TYR-B03", vehicle:"TN59 AB1234", pos:"RL1", action:"MOVE_TO_TRAILER",  urgency:"medium",   reason:"Drive axle usage on TN59 is intensive. Trailer position will extend remaining life.", impact:"+2,200 km estimated life extension", kmSave:2200, confidence:79 },
  { id:"SUG-005", tyreId:"TYR-X03", vehicle:"TN69 GH4789", pos:"RL2", action:"RETREAD",          urgency:"low",      reason:"Tyre at 58% lifecycle. Retread now for max casing strength. 2nd retread viable.", impact:"Save ₹18,000 vs new tyre purchase", kmSave:null, confidence:84 },
];

const VALIDATION_RULES = [
  { rule:"No worn tyre on front axle",    check:(t,p)=>!(p==="FL"||p==="FR") || t.tread >= 4.0, fail:"Tread < 4mm — unsafe for steer axle" },
  { rule:"No critical tyre on drive axle",check:(t,p)=>!(p==="RL1"||p==="RR1"||p==="RL2"||p==="RR2") || t.risk!=="critical", fail:"Critical tyre not allowed on drive axle" },
  { rule:"Max 2 retreads per tyre",       check:(t)=>t.retreads < 3, fail:"Exceeded max retread limit (2)" },
  { rule:"Size compatibility",            check:(t,p,targetV)=>true, fail:"Tyre size mismatch for target vehicle" },
  { rule:"Thread pattern check",          check:(t,p)=>!(p==="FL"||p==="FR") || t.pattern==="RIB", fail:"LUG pattern not recommended for steer axle" },
];

const LIFECYCLE_EVENTS = [
  { tyreId:"TYR-001", stage:"Purchase",   date:"2022-06-01", km:0,      cost:28000, note:"New MRF Steel Muscle — vendor MRF Dealer, Chennai" },
  { tyreId:"TYR-001", stage:"Fitment",    date:"2022-06-02", km:46000,  cost:500,   note:"Fitted at FL — TN69 GH4789 · Odometer 46,000 km" },
  { tyreId:"TYR-001", stage:"Inspection", date:"2023-02-10", km:62000,  cost:0,     note:"Tread 6.2mm · Wear even · No damage" },
  { tyreId:"TYR-001", stage:"Rotation",   date:"2023-08-15", km:70000,  cost:800,   note:"FL → RL3 (KM-based rotation). Labour ₹800" },
  { tyreId:"TYR-001", stage:"Inspection", date:"2024-01-20", km:78000,  cost:0,     note:"Tread 5.8mm · Wear even · Good condition" },
  { tyreId:"TYR-001", stage:"Alert",      date:"2024-04-15", km:74875,  cost:0,     note:"AI: 8,200 km remaining — plan replacement in 60 days" },
];

// ─── Enhanced Axle Diagram with Drag-to-Rotate ────────────────────────────────
const TyreAxleDiagram = ({ vehicleNum, tyreState, onTyreClick, rotateMode, setRotateMode, selectedForRotate, setSelectedForRotate, onRotateConfirm }) => {
  const tyres = tyreState[vehicleNum] || ALL_TYRE_POSITIONS[vehicleNum] || [];
  const statusC = { healthy:T.green, warning:T.orange, critical:T.red, retread:T.blue };

  const handleTyreDot = (t) => {
    if (rotateMode) {
      if (!selectedForRotate) {
        setSelectedForRotate(t);
      } else if (selectedForRotate.pos !== t.pos) {
        onRotateConfirm(selectedForRotate, t);
        setSelectedForRotate(null);
      }
    } else {
      onTyreClick(t);
    }
  };

  const TyreDot = ({ t }) => {
    const isSelected = selectedForRotate?.pos === t.pos;
    const isTarget = rotateMode && selectedForRotate && selectedForRotate.pos !== t.pos;
    const col = statusC[t.risk] || T.textMuted;
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
        <div
          onClick={() => handleTyreDot(t)}
          draggable={rotateMode}
          style={{
            width:44, height:44, borderRadius:"50%",
            background: isSelected ? col+"55" : rotateMode && isTarget ? T.accent+"22" : col+"18",
            border:`${isSelected ? 3 : 2}px solid ${isSelected ? col : rotateMode && isTarget ? T.accent : col}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", fontSize:9, fontWeight:700, color: isSelected ? "#fff" : col,
            transition:"all .15s", flexShrink:0,
            boxShadow: isSelected ? `0 0 12px ${col}88` : rotateMode ? `0 0 6px ${T.accent}44` : "none",
            animation: isSelected ? "pulse 1s ease-in-out infinite" : "none",
          }}
          title={`${t.pos} — ${t.brand} — ${t.kmLeft}km left`}
        >
          {t.pos}
        </div>
        <div style={{ fontSize:8, color:T.textMuted, fontFamily:"'JetBrains Mono',monospace" }}>{(t.kmLeft/1000).toFixed(1)}k</div>
      </div>
    );
  };

  const AxleRow = ({ label, positions, sublabel }) => (
    <div style={{ display:"flex", alignItems:"center", marginBottom:18 }}>
      <div style={{ width:100, flexShrink:0, textAlign:"right", paddingRight:12 }}>
        <div style={{ fontSize:9, color:T.textMuted, textTransform:"uppercase", letterSpacing:".06em" }}>{label}</div>
        {sublabel && <div style={{ fontSize:8, color:T.textMuted, opacity:.6 }}>{sublabel}</div>}
      </div>
      {/* Axle shaft */}
      <div style={{ flex:1, height:4, background:`linear-gradient(90deg, ${T.border}, ${T.borderHi}, ${T.border})`, borderRadius:2, position:"relative" }}>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
          {positions.map(p => {
            const t = tyres.find(x => x.pos === p);
            return t ? <TyreDot key={p} t={t} /> : (
              <div key={p} style={{ width:44, height:44, borderRadius:"50%", background:T.bgPanel, border:`2px dashed ${T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color:T.textMuted }}>{p}</div>
            );
          })}
        </div>
      </div>
      <div style={{ width:20 }} />
    </div>
  );

  const riskCounts = Object.entries({critical:T.red,warning:T.orange,retread:T.blue,healthy:T.green}).map(([k,c])=>({ k, c, n: tyres.filter(t=>t.risk===k).length })).filter(x=>x.n>0);

  return (
    <div style={{ background:T.bgPanel, border:`1px solid ${rotateMode ? T.accent+"66" : T.border}`, borderRadius:12, padding:20, transition:"border-color .2s" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div>
          <div className="section-title" style={{ margin:0 }}>🚛 {vehicleNum}</div>
          {rotateMode && <div style={{ fontSize:11, color:T.accent, marginTop:2 }}>
            {selectedForRotate ? `✋ Selected: ${selectedForRotate.pos} — now click target position to swap` : "Click source tyre, then click target position to rotate"}
          </div>}
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <div style={{ display:"flex", gap:6, fontSize:10 }}>
            {[["🟢","Healthy"],["🟡","Warn"],["🔴","Critical"],["🔵","Retread"]].map(([e,l])=><span key={l} style={{ color:T.textMuted }}>{e}{l}</span>)}
          </div>
          <button
            className="btn"
            style={{ background:rotateMode?T.accent:T.bgCard, color:rotateMode?"#080B10":T.textSub, border:`1px solid ${rotateMode?T.accent:T.border}`, fontSize:11 }}
            onClick={()=>{ setRotateMode(!rotateMode); setSelectedForRotate(null); }}
          >
            🔄 {rotateMode ? "Exit Rotate" : "Rotate Mode"}
          </button>
        </div>
      </div>

      {/* Truck body silhouette hint */}
      <div style={{ position:"relative", marginBottom:8 }}>
        <div style={{ position:"absolute", top:0, left:100, right:20, bottom:0, background:`linear-gradient(180deg, ${T.bgCard}22, transparent)`, borderRadius:8, pointerEvents:"none" }} />
        <AxleRow label="Front Axle" sublabel="Steer" positions={["FL","FR"]} />
        <AxleRow label="Rear Axle 1" sublabel="Drive" positions={["RL1","RR1","RL2","RR2"]} />
        <AxleRow label="Rear Axle 2" sublabel="Trailer" positions={["RL3","RR3","RL4","RR4"]} />
        {/* Spare */}
        <div style={{ display:"flex", alignItems:"center", marginTop:8, paddingTop:12, borderTop:`1px dashed ${T.border}` }}>
          <div style={{ width:100, textAlign:"right", paddingRight:12, fontSize:9, color:T.textMuted }}>SPARE</div>
          <div style={{ paddingLeft:12 }}>
            {(() => { const sp = tyres.find(t=>t.pos==="Spare"); return sp ? (
              <TyreDot t={sp} />
            ) : <div style={{ width:44, height:44, borderRadius:"50%", background:T.bgPanel, border:`2px dashed ${T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color:T.textMuted }}>—</div>; })()}
          </div>
        </div>
      </div>

      <div style={{ display:"flex", gap:8, marginTop:12 }}>
        {riskCounts.map(({k,c,n})=><div key={k} style={{ background:c+"18", border:`1px solid ${c}33`, borderRadius:8, padding:"3px 10px", fontSize:11, color:c, fontWeight:600 }}>{n} {k}</div>)}
      </div>
    </div>
  );
};

// ─── Rotation Order Wizard ────────────────────────────────────────────────────
const RotationWizard = ({ prefill, onClose, onExecute }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    tyreId: prefill?.tyreId || "",
    fromV:  prefill?.vehicle || "TN69 GH4789",
    fromP:  prefill?.pos || "",
    toV:    prefill?.vehicle || "TN69 GH4789",
    toP:    "",
    action: prefill?.action || "ROTATE_SAME_VEHICLE",
    reason: prefill?.reason || "",
    notes:  "",
  });
  const rf = (k,v) => setForm(f=>({...f,[k]:v}));

  const POSITIONS = ["FL","FR","RL1","RR1","RL2","RR2","RL3","RR3","Spare"];
  const ACTIONS = [
    { id:"ROTATE_SAME_VEHICLE", label:"Same Vehicle Rotation",  icon:"🔁", desc:"Move tyre to different position on same truck" },
    { id:"CROSS_VEHICLE",       label:"Cross-Vehicle Transfer", icon:"🚛", desc:"Move tyre to another vehicle in the fleet" },
    { id:"WORKSHOP_RETREAD",    label:"Send for Retread",       icon:"🏭", desc:"Send tyre to retread vendor for new life cycle" },
    { id:"SCRAP",               label:"Scrap Tyre",             icon:"🗑️", desc:"End of life — remove from fleet permanently" },
  ];

  // Validate fitment
  const tyre = Object.values(ALL_TYRE_POSITIONS).flat().find(t=>t.id===form.tyreId||t.pos===form.fromP);
  const validations = tyre ? VALIDATION_RULES.map(r=>({ ...r, pass:r.check(tyre, form.toP, form.toV) })) : [];
  const allValid = validations.every(v=>v.pass);

  return (
    <div className="ov">
      <div className="modal" style={{ maxWidth:660 }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#14532D,#166534)" }}>
          <div>
            <div className="rj" style={{ fontSize:18, fontWeight:700, color:"#fff" }}>🔄 Rotation Order — Step {step}/4</div>
            <div style={{ fontSize:12, color:"#A7F3D0" }}>Action → Target → Validate → Confirm</div>
          </div>
          <button className="btn" style={{ background:"rgba(255,255,255,.1)", color:"#fff", padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c="#fff" /></button>
        </div>
        <div className="mbdy">
          {/* Step bar */}
          <div style={{ display:"flex", gap:0, marginBottom:20 }}>
            {["Action","Target","Validate","Confirm"].map((s,i)=>(
              <div key={s} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                <div style={{ display:"flex", alignItems:"center", width:"100%" }}>
                  {i>0 && <div style={{ flex:1, height:2, background:step>i?T.green:T.border }} />}
                  <div style={{ width:26, height:26, borderRadius:"50%", background:step===i+1?T.accent:step>i+1?T.green:T.bgPanel, border:`2px solid ${step===i+1?T.accent:step>i+1?T.green:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:step>0?"#fff":T.textMuted, margin:"0 auto" }}>
                    {step>i+1?"✓":i+1}
                  </div>
                  {i<3 && <div style={{ flex:1, height:2, background:step>i+1?T.green:T.border }} />}
                </div>
                <div style={{ fontSize:9, color:step===i+1?T.accent:T.textMuted }}>{s}</div>
              </div>
            ))}
          </div>

          {step===1 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:14 }}>Select Action Type</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
                {ACTIONS.map(a=>(
                  <div key={a.id} onClick={()=>rf("action",a.id)} style={{ padding:12, borderRadius:10, cursor:"pointer", border:`2px solid ${form.action===a.id?T.accent:T.border}`, background:form.action===a.id?T.accentGlow:T.bgPanel, transition:"all .15s" }}>
                    <div style={{ fontSize:18, marginBottom:4 }}>{a.icon}</div>
                    <div style={{ fontSize:12, fontWeight:600, color:form.action===a.id?T.accent:T.text }}>{a.label}</div>
                    <div style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>{a.desc}</div>
                  </div>
                ))}
              </div>
              <div className="frow fr2">
                <div><label className="flabel">From Vehicle</label><select value={form.fromV} onChange={e=>rf("fromV",e.target.value)}>{FLEET_DATA.map(v=><option key={v.id}>{v.num}</option>)}</select></div>
                <div><label className="flabel">From Position</label><select value={form.fromP} onChange={e=>rf("fromP",e.target.value)}><option value="">Select</option>{POSITIONS.map(p=><option key={p}>{p}</option>)}</select></div>
              </div>
            </div>
          )}

          {step===2 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:14 }}>
                {form.action==="ROTATE_SAME_VEHICLE" ? "Select Target Position" : form.action==="CROSS_VEHICLE" ? "Select Target Vehicle & Position" : form.action==="WORKSHOP_RETREAD" ? "Retread Details" : "Scrap Confirmation"}
              </div>
              {(form.action==="ROTATE_SAME_VEHICLE"||form.action==="CROSS_VEHICLE") && (
                <>
                  {form.action==="CROSS_VEHICLE" && <div className="frow" style={{ marginBottom:14 }}><label className="flabel">Target Vehicle</label><select value={form.toV} onChange={e=>rf("toV",e.target.value)}>{FLEET_DATA.map(v=><option key={v.id}>{v.num}</option>)}</select></div>}
                  <div style={{ marginBottom:8, fontSize:12, color:T.textSub }}>Select target axle position:</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8 }}>
                    {POSITIONS.map(p=>(
                      <div key={p} onClick={()=>rf("toP",p)} style={{ padding:"10px 8px", borderRadius:8, cursor:"pointer", textAlign:"center", border:`2px solid ${form.toP===p?T.accent:p===form.fromP?T.red:T.border}`, background:form.toP===p?T.accentGlow:p===form.fromP?T.redGlow:T.bgPanel }}>
                        <div className="mono" style={{ fontSize:12, fontWeight:700, color:form.toP===p?T.accent:p===form.fromP?T.red:T.text }}>{p}</div>
                        {p===form.fromP && <div style={{ fontSize:9, color:T.red }}>current</div>}
                      </div>
                    ))}
                  </div>
                </>
              )}
              {form.action==="WORKSHOP_RETREAD" && (
                <div>
                  <div className="frow fr2">
                    <div><label className="flabel">Retread Vendor</label><input placeholder="KPR Tyre Retreading, Chennai" /></div>
                    <div><label className="flabel">Est. Cost (₹)</label><input placeholder="6500" /></div>
                  </div>
                  <div><label className="flabel">Reason / Notes</label><textarea placeholder="Tread < 4mm, casing in good condition, retread recommended" style={{ height:60 }} /></div>
                </div>
              )}
              {form.action==="SCRAP" && (
                <div style={{ background:T.redGlow, border:`1px solid ${T.red}44`, borderRadius:10, padding:14 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:T.red, marginBottom:8 }}>⚠️ Scrap Approval Required</div>
                  <div style={{ fontSize:12, color:T.textSub, marginBottom:12 }}>This action permanently removes the tyre from the fleet. A scrap approval is logged for audit. Confirm the reason below:</div>
                  <div><label className="flabel">Scrap Reason</label><select><option>End of lifecycle — tread exhausted</option><option>Burst damage — casing compromised</option><option>Accident damage</option><option>Max retreads reached</option></select></div>
                </div>
              )}
              <div style={{ marginTop:14 }}><label className="flabel">Rotation Reason</label><select value={form.reason} onChange={e=>rf("reason",e.target.value)}><option value="">Select reason</option><option>KM-based rotation</option><option>Uneven wear detected</option><option>AI recommendation</option><option>Post-breakdown rotation</option><option>Pre-trip optimization</option></select></div>
            </div>
          )}

          {step===3 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:14 }}>🔒 Validation Check</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:14 }}>
                {validations.map((v,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", borderRadius:8, background:v.pass?T.greenGlow:T.redGlow, border:`1px solid ${v.pass?T.green:T.red}33` }}>
                    <div style={{ fontSize:14 }}>{v.pass?"✅":"❌"}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:v.pass?T.green:T.red }}>{v.rule}</div>
                      {!v.pass && <div style={{ fontSize:11, color:T.red, marginTop:2 }}>{v.fail}</div>}
                    </div>
                  </div>
                ))}
                {tyre && (
                  <div style={{ background:T.accentGlow, border:`1px solid ${T.accent}33`, borderRadius:8, padding:10, marginTop:6 }}>
                    <div style={{ fontSize:11, color:T.accent, fontWeight:700 }}>🤖 AI Impact Forecast</div>
                    <div style={{ fontSize:12, color:T.textSub, marginTop:4 }}>
                      {form.action==="ROTATE_SAME_VEHICLE" ? `Rotating ${tyre.pos} → ${form.toP||"target"}: estimated +${Math.round(tyre.kmLeft * 0.18).toLocaleString()} km life extension. Rear/trailer positions wear 15–22% slower.`
                       : form.action==="CROSS_VEHICLE" ? `Transfer to ${form.toV}: tyre utilization will improve. High-usage vehicles need better condition tyres at drive axle.`
                       : form.action==="WORKSHOP_RETREAD" ? `Retread ROI: saves ₹${fmt ? fmt(tyre.purchaseCost - 7000) : "21,000+"} vs new purchase. Success rate for ${tyre.retreads+1}st retread: 87%.`
                       : "Scrapping this tyre. Cost logged for lifecycle analysis."}
                    </div>
                  </div>
                )}
              </div>
              {!allValid && <div style={{ background:T.redGlow, border:`1px solid ${T.red}33`, borderRadius:8, padding:10, fontSize:12, color:T.red }}>⚠️ Validation failed — review above issues before proceeding.</div>}
            </div>
          )}

          {step===4 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:14 }}>✅ Confirm Rotation Order</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
                {[
                  ["Action", ACTIONS.find(a=>a.id===form.action)?.label],
                  ["From Vehicle", form.fromV],
                  ["From Position", form.fromP||"—"],
                  ["To Vehicle", form.action==="ROTATE_SAME_VEHICLE"?form.fromV:form.toV],
                  ["To Position", form.toP||"—"],
                  ["Reason", form.reason||"—"],
                ].map(([k,v])=>(
                  <div key={k} style={{ background:T.bgPanel, borderRadius:8, padding:"8px 12px" }}>
                    <div style={{ fontSize:10, color:T.textMuted }}>{k}</div>
                    <div style={{ fontSize:12, fontWeight:600, marginTop:2, color:T.text }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:T.greenGlow, border:`1px solid ${T.green}33`, borderRadius:8, padding:10, fontSize:12, color:T.textSub }}>
                This rotation order will be logged in the movement history and tyre lifecycle record. Workshop will be notified.
              </div>
            </div>
          )}

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:20 }}>
            <button className="btn btn-gh" onClick={()=>step>1?setStep(s=>s-1):onClose()}>{step===1?"Cancel":"← Back"}</button>
            <button
              className="btn"
              style={{ background:step===4?T.green:T.accent, color:"#080B10" }}
              disabled={step===3 && !allValid}
              onClick={()=>{
                if(step<4) setStep(s=>s+1);
                else { onExecute(form); onClose(); }
              }}
            >
              {step===4?"✅ Execute Order":"Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Tyre Management Page ────────────────────────────────────────────────
const TyreManagementPage = () => {
  const [tab, setTab] = useState("dashboard");
  const [sel, setSel] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState("TN69 GH4789");
  const [showAddTyre, setShowAddTyre] = useState(false);
  const [addStep, setAddStep] = useState(1);
  const [tyreForm, setTyreForm] = useState({ tin:"", brand:"MRF", type:"tubeless", pattern:"lug", size:"315/80 R22.5", cost:"", vendor:"", invoiceNo:"", warrantyKm:"80000", vehicle:"", position:"FL" });
  const [rotateMode, setRotateMode] = useState(false);
  const [selectedForRotate, setSelectedForRotate] = useState(null);
  const [showRotationWizard, setShowRotationWizard] = useState(false);
  const [wizardPrefill, setWizardPrefill] = useState(null);
  const [tyreState, setTyreState] = useState({});
  const [movementLog, setMovementLog] = useState(MOVEMENT_HISTORY);

  const allTyres = Object.values(ALL_TYRE_POSITIONS).flat();
  const TYRES_RICH = [
    ...TYRES,
    ...allTyres.filter(t=>!TYRES.find(x=>x.id===t.id)),
  ];
  const aiAlerts = allTyres.filter(t => t.risk === "critical" || t.risk === "warning");

  const brandPerf = [
    { brand:"Bridgestone", avgKm:92000, costPerKm:0.35, retreads:0.4, rating:"A+", positions:"Front/Trailer" },
    { brand:"MRF",         avgKm:88000, costPerKm:0.32, retreads:0.6, rating:"A",  positions:"All-round"    },
    { brand:"Apollo",      avgKm:76000, costPerKm:0.29, retreads:0.9, rating:"B+", positions:"Drive axle"   },
    { brand:"CEAT",        avgKm:72000, costPerKm:0.35, retreads:1.1, rating:"B",  positions:"Trailer only" },
  ];

  const POSITION_PERF = [
    { axle:"Front (Steer)",  avgLife:85000, wearRate:"High",   bestBrand:"Bridgestone RIB", note:"Stability critical — RIB pattern only" },
    { axle:"Drive (Rear 1)", avgLife:72000, wearRate:"Highest",bestBrand:"MRF SUPER LUG",   note:"Max traction load — replace at 3mm" },
    { axle:"Trailer (Rear 2)",avgLife:98000,wearRate:"Low",    bestBrand:"Apollo ENDURANCE", note:"+18% life vs drive axle position" },
    { axle:"Spare",          avgLife:null,  wearRate:"None",    bestBrand:"MRF any",         note:"Keep at 7mm+ — emergency ready" },
  ];

  const DRIVER_IMPACT = [
    { driver:"Selvam R",  wearIndex:1.22, harshBraking:8,  overloads:2, tyreLife:"12% below avg", recommendation:"Braking pattern coaching needed" },
    { driver:"Mani Kumar",wearIndex:0.91, harshBraking:2,  overloads:0, tyreLife:"8% above avg",  recommendation:"Excellent — tyre-friendly driving style" },
    { driver:"Ramesh P",  wearIndex:1.35, harshBraking:14, overloads:5, tyreLife:"22% below avg", recommendation:"Overloading + harsh braking — intervention required" },
    { driver:"Arjun D",   wearIndex:1.05, harshBraking:4,  overloads:1, tyreLife:"2% below avg",  recommendation:"Minor coaching on load management" },
    { driver:"Karthik M", wearIndex:0.97, harshBraking:3,  overloads:0, tyreLife:"3% above avg",  recommendation:"Good performance — maintain" },
    { driver:"Vinoth S",  wearIndex:1.18, harshBraking:11, overloads:3, tyreLife:"15% below avg", recommendation:"Harsh braking on highway — driver training" },
  ];

  const handleRotateConfirm = (fromTyre, toTyre) => {
    const vehicleTyres = [...(tyreState[selectedVehicle] || ALL_TYRE_POSITIONS[selectedVehicle] || [])];
    const updated = vehicleTyres.map(t => {
      if (t.pos === fromTyre.pos) return { ...t, pos: toTyre.pos };
      if (t.pos === toTyre.pos) return { ...t, pos: fromTyre.pos };
      return t;
    });
    setTyreState(s => ({ ...s, [selectedVehicle]: updated }));
    const newMove = { id:`MOV-${String(movementLog.length+1).padStart(3,"0")}`, tyreId:fromTyre.id, date:new Date().toISOString().split("T")[0], type:"Rotation", fromV:selectedVehicle, fromP:fromTyre.pos, toV:selectedVehicle, toP:toTyre.pos, reason:`Quick rotate via Axle UI`, by:"Fleet Manager", kmSaved:Math.round(fromTyre.kmLeft*0.15) };
    setMovementLog(l => [newMove, ...l]);
  };

  const handleWizardExecute = (form) => {
    const newMove = { id:`MOV-${String(movementLog.length+1).padStart(3,"0")}`, tyreId:form.tyreId||form.fromP, date:new Date().toISOString().split("T")[0], type:form.action==="ROTATE_SAME_VEHICLE"?"Rotation":form.action==="CROSS_VEHICLE"?"Cross-Vehicle":form.action==="WORKSHOP_RETREAD"?"Retread":"Scrap", fromV:form.fromV, fromP:form.fromP, toV:form.action==="ROTATE_SAME_VEHICLE"?form.fromV:form.toV, toP:form.toP||"—", reason:form.reason, by:"Fleet Manager", kmSaved:null };
    setMovementLog(l => [newMove, ...l]);
  };

  const openWizard = (prefill=null) => { setWizardPrefill(prefill); setShowRotationWizard(true); };

  return (
    <div>
      {/* Modals */}
      {showRotationWizard && <RotationWizard prefill={wizardPrefill} onClose={()=>setShowRotationWizard(false)} onExecute={handleWizardExecute} />}

      {/* Add Tyre Wizard */}
      {showAddTyre && (
        <div className="ov">
          <div className="modal" style={{ maxWidth:620 }}>
            <div className="mhdr" style={{ background:"linear-gradient(135deg,#1E3A5F,#1E40AF)" }}>
              <div><div className="rj" style={{ fontSize:18, fontWeight:700, color:"#fff" }}>🛞 Add New Tyre — Step {addStep}/4</div><div style={{ fontSize:12, color:"#BFDBFE" }}>Purchase → Specification → Fitment → Confirm</div></div>
              <button className="btn" style={{ background:"rgba(255,255,255,.1)", color:"#fff", padding:"5px 9px" }} onClick={()=>{setShowAddTyre(false);setAddStep(1)}}><Ic n="x" s={14} c="#fff" /></button>
            </div>
            <div className="mbdy">
              <div style={{ display:"flex", gap:0, marginBottom:20 }}>
                {["Purchase","Spec","Fitment","Review"].map((s,i)=>(
                  <div key={s} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                    <div style={{ display:"flex", alignItems:"center", width:"100%" }}>
                      {i>0 && <div style={{ flex:1, height:2, background:addStep>i?T.blue:T.border }} />}
                      <div style={{ width:26,height:26,borderRadius:"50%",background:addStep===i+1?T.blue:addStep>i+1?T.green:T.bgPanel,border:`2px solid ${addStep===i+1?T.blue:addStep>i+1?T.green:T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#fff",margin:"0 auto" }}>{addStep>i+1?"✓":i+1}</div>
                      {i<3&&<div style={{ flex:1,height:2,background:addStep>i+1?T.green:T.border }} />}
                    </div>
                    <div style={{ fontSize:9,color:addStep===i+1?T.blue:T.textMuted }}>{s}</div>
                  </div>
                ))}
              </div>
              {addStep===1 && <div>
                <div style={{ fontSize:13,fontWeight:600,color:T.blue,marginBottom:14 }}>📦 Purchase Details</div>
                {/* TIN — most important field */}
                <div style={{ marginBottom:12 }}>
                  <label className="flabel">Tyre Identification Number (TIN) * <span style={{ fontSize:10, color:T.cyan, fontWeight:400 }}>— stamped on tyre sidewall</span></label>
                  <input value={tyreForm.tin} onChange={e=>setTyreForm(f=>({...f,tin:e.target.value.toUpperCase()}))} placeholder="MRF-CH-17-23-0042" style={{ fontFamily:"'JetBrains Mono',monospace", letterSpacing:1, fontSize:13, borderColor:tyreForm.tin?T.cyan+"66":undefined }} />
                  {tyreForm.tin && <div style={{ fontSize:10, color:T.cyan, marginTop:3 }}>✅ TIN recorded — this tyre is now uniquely identifiable across the entire fleet</div>}
                  {!tyreForm.tin && <div style={{ fontSize:10, color:T.orange, marginTop:3 }}>⚠️ TIN is mandatory — check the tyre sidewall for the DOT/TIN code (e.g. MRF-CH-17-23-0042)</div>}
                </div>
                <div style={{ background:T.cyanGlow, border:`1px solid ${T.cyan}33`, borderRadius:8, padding:10, marginBottom:12, fontSize:11, color:T.textSub }}>
                  <strong style={{ color:T.cyan }}>What is a TIN?</strong> Every tyre has a Tyre Identification Number moulded into the sidewall. It encodes: Brand · Plant code · Week of manufacture · Year · Batch. Format varies by brand — look for DOT code or Brand serial near the rim.
                </div>
                <div className="frow fr2">
                  <div><label className="flabel">Brand</label><select value={tyreForm.brand} onChange={e=>setTyreForm(f=>({...f,brand:e.target.value}))}><option>MRF</option><option>Apollo</option><option>Bridgestone</option><option>CEAT</option><option>Michelin</option><option>JK Tyre</option><option>Goodyear</option></select></div>
                  <div><label className="flabel">Purchase Cost (₹)</label><input value={tyreForm.cost} onChange={e=>setTyreForm(f=>({...f,cost:e.target.value}))} placeholder="28000" /></div>
                </div>
                <div className="frow fr3">
                  <div><label className="flabel">Vendor / Dealer</label><input value={tyreForm.vendor} onChange={e=>setTyreForm(f=>({...f,vendor:e.target.value}))} placeholder="MRF Tyre Dealer, Chennai" /></div>
                  <div><label className="flabel">Invoice Number</label><input value={tyreForm.invoiceNo} onChange={e=>setTyreForm(f=>({...f,invoiceNo:e.target.value}))} placeholder="INV-2025-0421" /></div>
                  <div><label className="flabel">Warranty (km)</label><input value={tyreForm.warrantyKm} onChange={e=>setTyreForm(f=>({...f,warrantyKm:e.target.value}))} /></div>
                </div>
              </div>}
              {addStep===2 && <div><div style={{ fontSize:13,fontWeight:600,color:T.blue,marginBottom:14 }}>⚙️ Tyre Specification</div><div className="frow fr3"><div><label className="flabel">Type</label><select value={tyreForm.type} onChange={e=>setTyreForm(f=>({...f,type:e.target.value}))}><option value="tubeless">Tubeless</option><option value="tube">Tube Type</option></select></div><div><label className="flabel">Thread Pattern</label><select value={tyreForm.pattern} onChange={e=>setTyreForm(f=>({...f,pattern:e.target.value}))}><option value="lug">Lug (Drive/Rear)</option><option value="rib">Rib (Front/Steer)</option><option value="block">Block (Mixed)</option></select></div><div><label className="flabel">Size</label><select value={tyreForm.size} onChange={e=>setTyreForm(f=>({...f,size:e.target.value}))}><option>315/80 R22.5</option><option>295/80 R22.5</option><option>295/90 R20</option><option>225/75 R17.5</option></select></div></div><div style={{ background:T.blue+"12",border:`1px solid ${T.blue}33`,borderRadius:8,padding:12,marginTop:8 }}><div style={{ fontSize:11,color:T.blue,fontWeight:700,marginBottom:4 }}>🤖 AI Recommendation</div><div style={{ fontSize:12,color:T.textSub }}>Based on your highway route pattern, <strong style={{ color:T.accent }}>Lug pattern + MRF</strong> gives 12% better life on drive axle.</div></div></div>}
              {addStep===3 && <div><div style={{ fontSize:13,fontWeight:600,color:T.blue,marginBottom:14 }}>🔗 Fitment Assignment</div><div className="frow fr2"><div><label className="flabel">Assign to Vehicle</label><select value={tyreForm.vehicle} onChange={e=>setTyreForm(f=>({...f,vehicle:e.target.value}))}><option value="">Inventory (no vehicle yet)</option>{FLEET_DATA.map(v=><option key={v.id}>{v.num}</option>)}</select></div><div><label className="flabel">Axle Position</label><select value={tyreForm.position} onChange={e=>setTyreForm(f=>({...f,position:e.target.value}))}>{["FL","FR","RL1","RR1","RL2","RR2","RL3","RR3","Spare"].map(p=><option key={p}>{p}</option>)}</select></div></div>{tyreForm.vehicle && <div style={{ background:T.greenGlow,border:`1px solid ${T.green}33`,borderRadius:8,padding:10,fontSize:12,color:T.textSub }}>✅ Position <strong style={{ color:T.accent }}>{tyreForm.position}</strong> on <strong style={{ color:T.accent }}>{tyreForm.vehicle}</strong> is compatible.</div>}</div>}
              {addStep===4 && <div><div style={{ fontSize:13,fontWeight:600,color:T.green,marginBottom:14 }}>✅ Review & Confirm</div><div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>{[["TIN (Sidewall)",tyreForm.tin||"⚠️ NOT ENTERED"],["Brand",tyreForm.brand],["Pattern",tyreForm.pattern],["Size",tyreForm.size],["Cost",tyreForm.cost?`₹${parseInt(tyreForm.cost).toLocaleString()}`:"—"],["Invoice No",tyreForm.invoiceNo||"—"],["Vendor",tyreForm.vendor||"—"],["Warranty",tyreForm.warrantyKm+" km"],["Vehicle",tyreForm.vehicle||"Inventory"],["Position",tyreForm.position]].map(([k,v])=><div key={k} style={{ background:T.bgPanel,borderRadius:8,padding:"8px 12px",borderLeft:k==="TIN (Sidewall)"?`3px solid ${T.cyan}`:"none" }}><div style={{ fontSize:10,color:T.textMuted }}>{k}</div><div style={{ fontSize:11,fontWeight:600,marginTop:2,fontFamily:k==="TIN (Sidewall)"?"JetBrains Mono,monospace":"inherit",color:k==="TIN (Sidewall)"?(tyreForm.tin?T.cyan:T.orange):T.text }}>{v}</div></div>)}</div></div>}
              <div style={{ display:"flex",justifyContent:"space-between",marginTop:20 }}>
                <button className="btn btn-gh" onClick={()=>addStep>1?setAddStep(s=>s-1):(setShowAddTyre(false),setAddStep(1))}>{addStep===1?"Cancel":"← Back"}</button>
                <button className="btn" style={{ background:T.blue,color:"#fff" }} onClick={()=>addStep<4?setAddStep(s=>s+1):(setShowAddTyre(false),setAddStep(1))}>{addStep===4?"✅ Add Tyre":"Next →"}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tyre Detail Panel */}
      {sel && (
        <div className="ov">
          <div className="modal" style={{ maxWidth:560 }}>
            <div className="mhdr" style={{ background:`linear-gradient(135deg,${sel.risk==="critical"?"#450A0A,#7F1D1D":sel.risk==="warning"?"#431407,#7C2D12":"#1E3A5F,#1E40AF"})` }}>
              <div><div className="rj" style={{ fontSize:18,fontWeight:700,color:"#fff" }}>🛞 {sel.id} — {sel.brand} {sel.size}</div><div style={{ fontSize:12,color:"rgba(255,255,255,.7)" }}>{sel.pos||sel.position} · {sel.vehicle||"Inventory"}</div></div>
              <button className="btn" style={{ background:"rgba(255,255,255,.1)",color:"#fff",padding:"5px 9px" }} onClick={()=>setSel(null)}><Ic n="x" s={14} c="#fff" /></button>
            </div>
            <div className="mbdy">
              {(sel.risk==="critical"||sel.risk==="warning") && (
                <div style={{ background:sel.risk==="critical"?T.redGlow:T.orangeGlow,border:`1px solid ${sel.risk==="critical"?T.red:T.orange}44`,borderRadius:8,padding:10,marginBottom:14 }}>
                  <div style={{ fontSize:12,fontWeight:700,color:sel.risk==="critical"?T.red:T.orange }}>🤖 AI Alert — {sel.risk==="critical"?"Replace Immediately":"Replace Soon"}</div>
                  <div style={{ fontSize:12,color:T.textSub,marginTop:4 }}>{sel.risk==="critical"?`Only ${sel.kmLeft} km estimated remaining. Tread ${sel.tread}mm — CRITICAL. High burst risk.`:`~${sel.kmLeft} km remaining. Plan replacement within 7–10 days.`}</div>
                </div>
              )}
              <div className="grd3" style={{ marginBottom:14 }}>
                {[
                  { l:"TIN (Sidewall)", v:sel.tin||"Not recorded" },
                  { l:"System ID", v:sel.id },
                  { l:"Purchase Cost", v:`₹${(sel.purchaseCost||0).toLocaleString()}` },
                  { l:"KM Left", v:`${(sel.kmLeft||0).toLocaleString()} km` },
                  { l:"Tread Depth", v:`${sel.tread||"—"} mm` },
                  { l:"Wear Pattern", v:sel.wear||"—" },
                  { l:"Retreads", v:sel.retreads||0 },
                  { l:"Pattern", v:sel.pattern||"—" },
                  { l:"Size", v:sel.size||"—" },
                ].map(s=><div key={s.l} style={{ background:T.bgPanel,borderRadius:8,padding:"8px 10px" }}><div style={{ fontSize:10,color:T.textMuted }}>{s.l}</div><div style={{ fontSize:s.l==="TIN (Sidewall)"?11:12, fontWeight:600,marginTop:2, color:s.l==="TIN (Sidewall)"?T.cyan:T.text, fontFamily:s.l==="TIN (Sidewall)"?"'JetBrains Mono',monospace":"inherit" }}>{s.v}</div></div>)}
              </div>
              {/* Lifecycle bar */}
              <div style={{ marginBottom:14 }}>
                <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4 }}>
                  <span style={{ color:T.textMuted }}>Lifecycle progress</span>
                  <span style={{ color:T.textSub }}>{((sel.currentOdo||0)-(sel.fitOdo||0)).toLocaleString()} / {(sel.warrantyKm||80000).toLocaleString()} km</span>
                </div>
                <div className="pbar" style={{ height:8 }}><div className="pfill" style={{ width:`${Math.min((((sel.currentOdo||0)-(sel.fitOdo||0))/(sel.warrantyKm||80000))*100,100)}%`, background:sel.risk==="critical"?T.red:sel.risk==="warning"?T.orange:T.green }} /></div>
              </div>
              <div style={{ display:"flex",gap:8 }}>
                <button className="btn btn-r" onClick={()=>{setSel(null);openWizard({ vehicle:sel.vehicle, pos:sel.pos||sel.position, action:"ROTATE_SAME_VEHICLE", reason:"Manual rotation" });}}>🔄 Rotate</button>
                <button className="btn btn-b" onClick={()=>{setSel(null);openWizard({ vehicle:sel.vehicle, pos:sel.pos||sel.position, action:"WORKSHOP_RETREAD" });}}>♻️ Retread</button>
                <button className="btn btn-r" style={{ background:T.red+"22",color:T.red }} onClick={()=>{setSel(null);openWizard({ vehicle:sel.vehicle, pos:sel.pos||sel.position, action:"SCRAP" });}}>🗑️ Scrap</button>
                <button className="btn btn-gh" onClick={()=>setSel(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28,fontWeight:700 }}>Tyre Intelligence</h1><p style={{ color:T.textSub,fontSize:12 }}>Lifecycle · Rotation · AI Engine · Cost Analytics · Driver Impact</p></div>
        <div style={{ display:"flex",gap:8 }}>
          <button className="btn btn-b" onClick={()=>openWizard()}><Ic n="rotate" s={13} c={T.blue} /> Rotation Order</button>
          <button className="btn btn-p" onClick={()=>setShowAddTyre(true)}><Ic n="plus" s={14} c="#080B10" /> Add Tyre</button>
        </div>
      </div>

      {/* KPI row */}
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(6,1fr)",marginBottom:18 }}>
        {[
          { l:"Total Active", v:allTyres.filter(t=>t.risk!=="scrap").length, c:T.green },
          { l:"Critical Alert", v:allTyres.filter(t=>t.risk==="critical").length, c:T.red },
          { l:"Warning", v:allTyres.filter(t=>t.risk==="warning").length, c:T.orange },
          { l:"Retread",  v:allTyres.filter(t=>t.risk==="retread").length, c:T.blue },
          { l:"Avg Cost/KM", v:"₹2.4", c:T.accent },
          { l:"Mtd Spend", v:"₹4.2L", c:T.purple },
        ].map(k=><div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>)}
      </div>

      {/* AI Alerts strip */}
      {aiAlerts.length > 0 && (
        <div className="card" style={{ marginBottom:14,border:`1px solid ${T.red}44`,background:T.redGlow }}>
          <div className="section-title" style={{ color:T.red }}>🤖 AI Alerts — {aiAlerts.length} tyres need attention</div>
          {aiAlerts.slice(0,3).map(t=>(
            <div key={t.id} className="arow" style={{ borderLeftColor:t.risk==="critical"?T.red:T.orange }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12,fontWeight:700,color:t.risk==="critical"?T.red:T.orange }}>{t.id} — {t.brand} · {t.pos}</div>
                <div style={{ fontSize:11,color:T.textSub }}>{t.risk==="critical"?`🚨 ${t.kmLeft} km left, tread ${t.tread}mm — REPLACE NOW`:`⚠️ ${t.kmLeft} km remaining — plan replacement`}</div>
              </div>
              <button className="btn" style={{ fontSize:11,background:T.redGlow,color:T.red,border:`1px solid ${T.red}33` }} onClick={()=>setSel(t)}>View →</button>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="tabs">
        {["dashboard","axle-view","rotation","lifecycle","ai-engine","analytics","driver-impact","movement"].map(t=>(
          <div key={t} className={`tab ${tab===t?"on":""}`} onClick={()=>setTab(t)} style={{ textTransform:"capitalize",whiteSpace:"nowrap" }}>
            {t==="axle-view"?"Axle View":t==="ai-engine"?"AI Engine":t==="driver-impact"?"Driver Impact":t.charAt(0).toUpperCase()+t.slice(1)}
          </div>
        ))}
      </div>

      {/* ── TAB: dashboard ── */}
      {tab==="dashboard" && (
        <div>
          <div className="grd2" style={{ marginBottom:14 }}>
            {Object.keys(ALL_TYRE_POSITIONS).map(veh=>{
              const tyres = tyreState[veh] || ALL_TYRE_POSITIONS[veh];
              const critical = tyres.filter(t=>t.risk==="critical").length;
              const warning = tyres.filter(t=>t.risk==="warning").length;
              return (
                <div key={veh} className="card" style={{ cursor:"pointer",border:`1px solid ${critical>0?T.red:warning>0?T.orange:T.border}` }} onClick={()=>{setSelectedVehicle(veh);setTab("axle-view");}}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:10 }}>
                    <div className="mono" style={{ fontSize:14,fontWeight:700,color:T.accent }}>{veh}</div>
                    <div style={{ display:"flex",gap:5 }}>
                      {critical>0 && <span className="badge br">{critical} critical</span>}
                      {warning>0 && <span className="badge bo">{warning} warning</span>}
                    </div>
                  </div>
                  <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                    {tyres.map(t=>(
                      <div key={t.pos} style={{ width:36,height:36,borderRadius:"50%",background:{healthy:T.green,warning:T.orange,critical:T.red,retread:T.blue}[t.risk]+"22",border:`2px solid ${{healthy:T.green,warning:T.orange,critical:T.red,retread:T.blue}[t.risk]}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:{healthy:T.green,warning:T.orange,critical:T.red,retread:T.blue}[t.risk] }}>{t.pos}</div>
                    ))}
                  </div>
                  <div style={{ fontSize:11,color:T.textMuted,marginTop:8 }}>Click to view axle diagram →</div>
                </div>
              );
            })}
          </div>
          <div className="card" style={{ padding:0 }}>
            <table className="tbl">
              <thead><tr><th>Sys ID</th><th>TIN (Sidewall)</th><th>Brand</th><th>Size</th><th>Position</th><th>Vehicle</th><th>Risk</th><th>KM Left</th><th>Tread</th><th>Wear</th><th>Retreads</th><th>Actions</th></tr></thead>
              <tbody>
                {allTyres.map(t=>(
                  <tr key={t.id} style={{ cursor:"pointer" }} onClick={()=>setSel(t)}>
                    <td className="mono" style={{ fontSize:11,color:T.accent }}>{t.id}</td>
                    <td className="mono" style={{ fontSize:10, color:T.cyan, letterSpacing:".02em" }}>{t.tin||<span style={{ color:T.textMuted }}>—</span>}</td>
                    <td style={{ fontWeight:600 }}>{t.brand}</td>
                    <td style={{ fontSize:11 }}>{t.size}</td>
                    <td><span className="badge bc">{t.pos}</span></td>
                    <td className="mono" style={{ fontSize:11 }}>{Object.keys(ALL_TYRE_POSITIONS).find(v=>ALL_TYRE_POSITIONS[v].find(x=>x.id===t.id))||"—"}</td>
                    <td><span className={`badge ${t.risk==="critical"?"br":t.risk==="warning"?"bo":t.risk==="retread"?"bb":"bg"}`}>{t.risk}</span></td>
                    <td className="mono" style={{ fontSize:11,color:t.risk==="critical"?T.red:t.risk==="warning"?T.orange:T.text }}>{t.kmLeft.toLocaleString()}</td>
                    <td style={{ color:t.tread<3?T.red:t.tread<4.5?T.orange:T.green,fontWeight:600 }}>{t.tread}mm</td>
                    <td><span className={`badge ${t.wear==="uneven"?"bo":"bg"}`}>{t.wear}</span></td>
                    <td style={{ textAlign:"center" }}>{t.retreads}</td>
                    <td onClick={e=>e.stopPropagation()}><button className="btn" style={{ fontSize:10,padding:"3px 8px",background:T.accentGlow,color:T.accent,border:`1px solid ${T.accent}33` }} onClick={()=>openWizard({ vehicle:Object.keys(ALL_TYRE_POSITIONS).find(v=>ALL_TYRE_POSITIONS[v].find(x=>x.id===t.id)), pos:t.pos, action:"ROTATE_SAME_VEHICLE" })}>Rotate</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB: axle-view ── */}
      {tab==="axle-view" && (
        <div>
          <div style={{ display:"flex",gap:10,marginBottom:14,alignItems:"center" }}>
            <label className="flabel" style={{ margin:0 }}>Vehicle:</label>
            <select value={selectedVehicle} onChange={e=>setSelectedVehicle(e.target.value)} style={{ width:200 }}>
              {Object.keys(ALL_TYRE_POSITIONS).map(v=><option key={v}>{v}</option>)}
            </select>
            <button className="btn btn-b" style={{ fontSize:11 }} onClick={()=>openWizard({ vehicle:selectedVehicle, action:"ROTATE_SAME_VEHICLE" })}>+ Rotation Order</button>
          </div>
          <TyreAxleDiagram vehicleNum={selectedVehicle} tyreState={tyreState} onTyreClick={setSel} rotateMode={rotateMode} setRotateMode={setRotateMode} selectedForRotate={selectedForRotate} setSelectedForRotate={setSelectedForRotate} onRotateConfirm={handleRotateConfirm} />
          {/* Position intelligence */}
          <div className="card" style={{ marginTop:14 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
              <div className="section-title" style={{ margin:0 }}>Position Intelligence</div>
              <div style={{ fontSize:11,color:T.textMuted }}>Click tyre above to view detail · Enable Rotate Mode to quick-swap</div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8 }}>
              {(tyreState[selectedVehicle]||ALL_TYRE_POSITIONS[selectedVehicle]||[]).filter(t=>t.pos!=="Spare").map(t=>{
                const rC={healthy:T.green,warning:T.orange,critical:T.red,retread:T.blue};
                return (
                  <div key={t.pos} style={{ background:T.bgPanel,border:`1px solid ${rC[t.risk]||T.border}33`,borderRadius:8,padding:"10px 12px",cursor:"pointer" }} onClick={()=>setSel(t)}>
                    <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                      <span className="mono" style={{ fontWeight:700,fontSize:12 }}>{t.pos}</span>
                      <span style={{ fontSize:10,fontWeight:700,color:rC[t.risk],textTransform:"capitalize" }}>{t.risk}</span>
                    </div>
                    <div style={{ fontSize:11,color:T.textSub,marginBottom:4 }}>{t.brand} · {t.tread}mm</div>
                    <div style={{ fontSize:10,color:T.textMuted }}>{t.kmLeft.toLocaleString()} km left</div>
                    <div className="pbar" style={{ marginTop:6,height:3 }}><div className="pfill" style={{ width:`${Math.min((t.kmLeft/10000)*100,100)}%`,background:rC[t.risk] }} /></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: rotation ── */}
      {tab==="rotation" && (
        <div>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
            <div className="section-title" style={{ margin:0 }}>Pending Rotation Orders</div>
            <button className="btn btn-p" onClick={()=>openWizard()}><Ic n="plus" s={13} c="#080B10" /> New Order</button>
          </div>
          {/* Pending AI suggestions as rotation orders */}
          <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:20 }}>
            {AI_ROTATION_SUGGESTIONS.map(s=>(
              <div key={s.id} className="card" style={{ border:`1px solid ${s.urgency==="critical"?T.red:s.urgency==="high"?T.orange:T.border}33` }}>
                <div style={{ display:"flex",gap:14,alignItems:"flex-start" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex",gap:8,alignItems:"center",marginBottom:6 }}>
                      <span className="mono" style={{ fontSize:11,color:T.accent }}>{s.id}</span>
                      <span className="mono" style={{ fontSize:11 }}>{s.tyreId}</span>
                      <span style={{ fontSize:12,fontWeight:600 }}>→ {s.vehicle} / {s.pos}</span>
                      <span className={`badge ${s.urgency==="critical"?"br":s.urgency==="high"?"bo":s.urgency==="medium"?"ba":"bg"}`}>{s.urgency}</span>
                    </div>
                    <div style={{ fontSize:12,color:T.text,marginBottom:4 }}><strong style={{ color:T.blue }}>Action:</strong> {s.action.replace(/_/g," ")}</div>
                    <div style={{ fontSize:11,color:T.textSub,marginBottom:4 }}>{s.reason}</div>
                    <div style={{ fontSize:11,color:T.green }}>💰 {s.impact} · Confidence: {s.confidence}%</div>
                  </div>
                  <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                    <button className="btn btn-p" style={{ fontSize:11 }} onClick={()=>openWizard(s)}>Execute →</button>
                    <button className="btn btn-gh" style={{ fontSize:11 }}>Dismiss</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Validation rules panel */}
          <div className="card">
            <div className="section-title">🔒 Rotation Validation Rules</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
              {VALIDATION_RULES.map((r,i)=>(
                <div key={i} style={{ background:T.bgPanel,border:`1px solid ${T.green}33`,borderRadius:8,padding:"10px 12px",display:"flex",gap:10,alignItems:"flex-start" }}>
                  <div style={{ fontSize:16,marginTop:2 }}>🔒</div>
                  <div>
                    <div style={{ fontSize:12,fontWeight:600,color:T.green }}>{r.rule}</div>
                    <div style={{ fontSize:11,color:T.textMuted,marginTop:2 }}>Violation: {r.fail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: lifecycle ── */}
      {tab==="lifecycle" && (
        <div>
          <div style={{ marginBottom:14 }}>
            <label className="flabel">Select Tyre for Lifecycle View</label>
            <select style={{ width:280 }} defaultValue="TYR-001">
              {allTyres.map(t=><option key={t.id} value={t.id}>{t.id} — {t.brand} {t.pos}</option>)}
            </select>
          </div>
          {/* Timeline */}
          <div className="card" style={{ marginBottom:14 }}>
            <div className="section-title">🕐 Tyre Lifecycle Timeline — TYR-001</div>
            <div style={{ position:"relative",padding:"10px 0 0 30px" }}>
              {/* Vertical line */}
              <div style={{ position:"absolute",left:14,top:0,bottom:0,width:2,background:T.border }} />
              {LIFECYCLE_EVENTS.map((ev,i)=>{
                const stageC = { Purchase:T.accent, Fitment:T.blue, Inspection:T.cyan, Rotation:T.green, Retread:T.orange, Alert:T.red };
                const col = stageC[ev.stage]||T.textMuted;
                return (
                  <div key={i} style={{ position:"relative",marginBottom:18 }}>
                    <div style={{ position:"absolute",left:-23,top:2,width:14,height:14,borderRadius:"50%",background:col+"22",border:`2px solid ${col}`,display:"flex",alignItems:"center",justifyContent:"center" }} />
                    <div style={{ display:"flex",gap:12,alignItems:"flex-start" }}>
                      <div style={{ width:80,flexShrink:0 }}>
                        <div style={{ fontSize:10,color:T.textMuted }}>{ev.date}</div>
                        <div style={{ fontSize:10,fontWeight:600,color:col }}>{ev.stage}</div>
                      </div>
                      <div>
                        <div style={{ fontSize:12,color:T.text }}>{ev.note}</div>
                        {ev.cost>0 && <div style={{ fontSize:11,color:T.orange,marginTop:2 }}>₹{ev.cost.toLocaleString()}</div>}
                        {ev.km>0 && <div style={{ fontSize:10,color:T.textMuted,marginTop:1 }}>Odometer: {ev.km.toLocaleString()} km</div>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Lifecycle cost table */}
          <div className="card">
            <div className="section-title">Lifecycle Cost Summary</div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8 }}>
              {[
                { l:"Purchase Cost", v:"₹28,000", c:T.accent },
                { l:"Total Labour", v:"₹1,300", c:T.orange },
                { l:"Retread Cost", v:"₹6,500", c:T.blue },
                { l:"Total Lifecycle", v:"₹35,800", c:T.red },
                { l:"KM Run", v:"28,875 km", c:T.green },
                { l:"Cost / KM", v:"₹1.24/km", c:T.accent },
                { l:"Remaining Life", v:"8,200 km", c:T.green },
                { l:"Projected Total", v:"₹39,400", c:T.purple },
              ].map(k=><div key={k.l} style={{ background:T.bgPanel,borderRadius:8,padding:"10px 12px" }}><div style={{ fontSize:10,color:T.textMuted }}>{k.l}</div><div style={{ fontSize:14,fontWeight:700,marginTop:2,color:k.c }}>{k.v}</div></div>)}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: ai-engine ── */}
      {tab==="ai-engine" && (
        <div>
          <div className="card" style={{ marginBottom:14,border:`1px solid ${T.purple}44`,background:T.purpleGlow }}>
            <div className="section-title" style={{ color:T.purple }}>🤖 AI Rotation Engine — Phase 1 (Rule-Based)</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
              {[
                { rule:"IF tread < 3mm", action:"→ REPLACE IMMEDIATELY", col:T.red },
                { rule:"IF wear = uneven AND pos = FRONT", action:"→ ROTATE TO REAR/TRAILER", col:T.orange },
                { rule:"IF pos = FRONT AND condition = mid-life", action:"→ MOVE TO TRAILER AXLE", col:T.accent },
                { rule:"IF retreads > 2", action:"→ SCRAP (max reached)", col:T.red },
                { rule:"IF vehicle_utilization < 50%", action:"→ TRANSFER TO HIGH-USAGE VEHICLE", col:T.blue },
                { rule:"IF kmLeft < 2000 AND route = heavy", action:"→ URGENT REPLACE ALERT", col:T.orange },
              ].map((r,i)=>(
                <div key={i} style={{ background:T.bgPanel,borderRadius:8,padding:"10px 12px",borderLeft:`3px solid ${r.col}` }}>
                  <div style={{ fontSize:11,color:T.textMuted,fontFamily:"'JetBrains Mono',monospace" }}>{r.rule}</div>
                  <div style={{ fontSize:12,fontWeight:600,color:r.col,marginTop:4 }}>{r.action}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grd2">
            <div className="card">
              <div className="section-title">🎯 AI Suggestions — Execute Now</div>
              {AI_ROTATION_SUGGESTIONS.map(s=>(
                <div key={s.id} style={{ padding:"10px 0",borderBottom:`1px solid ${T.border}22`,display:"flex",gap:10,alignItems:"center" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex",gap:6,alignItems:"center",marginBottom:3 }}>
                      <span className="mono" style={{ fontSize:11,color:T.accent }}>{s.tyreId}</span>
                      <span className={`badge ${s.urgency==="critical"?"br":s.urgency==="high"?"bo":s.urgency==="medium"?"ba":"bg"}`}>{s.urgency}</span>
                    </div>
                    <div style={{ fontSize:11,color:T.textSub }}>{s.action.replace(/_/g," ")} · {s.confidence}% confidence</div>
                    <div style={{ fontSize:11,color:T.green }}>{s.impact}</div>
                  </div>
                  <button className="btn btn-p" style={{ fontSize:11 }} onClick={()=>openWizard(s)}>Execute</button>
                </div>
              ))}
            </div>
            <div className="card">
              <div className="section-title">📊 Fleet AI Insights</div>
              {[
                { insight:"3 tyres at Front axle with LUG pattern — should be RIB. Switch to save 8% wear.", severity:"medium", saving:"₹12,000" },
                { insight:"Bridgestone performs 18% better than CEAT on your highway routes. Prioritize Bridgestone restocking.", severity:"info", saving:"₹28,000/yr" },
                { insight:"Driver Ramesh P causing 22% above-avg tyre wear. Coaching can save ₹45,000/year in tyre costs.", severity:"high", saving:"₹45,000/yr" },
                { insight:"Move 2 tyres from TN22 IJ7890 (idle vehicle) to TN69 GH4789 (high load). Better utilization.", severity:"medium", saving:"₹18,000" },
              ].map((ins,i)=>(
                <div key={i} style={{ padding:"9px 0",borderBottom:`1px solid ${T.border}22` }}>
                  <div style={{ fontSize:12,color:T.text,marginBottom:3 }}>{ins.insight}</div>
                  <div style={{ display:"flex",gap:8,alignItems:"center" }}>
                    <span className={`badge ${ins.severity==="high"?"br":ins.severity==="medium"?"bo":"bc"}`}>{ins.severity}</span>
                    <span style={{ fontSize:11,color:T.green,fontWeight:600 }}>Potential save: {ins.saving}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: analytics ── */}
      {tab==="analytics" && (
        <div>
          <div className="grd2" style={{ marginBottom:14 }}>
            <div className="card">
              <div className="section-title">Brand Performance (KM Life)</div>
              {brandPerf.map(b=>(
                <div key={b.brand} style={{ marginBottom:12 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:12 }}>
                    <span style={{ fontWeight:600 }}>{b.brand}</span>
                    <div style={{ display:"flex",gap:10 }}>
                      <span style={{ color:T.textMuted }}>Avg: <span style={{ color:T.green,fontWeight:700 }}>{b.avgKm.toLocaleString()} km</span></span>
                      <span style={{ color:T.textMuted }}>₹/km: <span style={{ color:T.accent,fontWeight:700 }}>{b.costPerKm}</span></span>
                      <span className={`badge ${b.rating==="A+"?"bg":b.rating==="A"?"bb":"ba"}`}>{b.rating}</span>
                    </div>
                  </div>
                  <div className="pbar"><div className="pfill" style={{ width:`${(b.avgKm/92000)*100}%`,background:b.rating==="A+"?T.green:b.rating==="A"?T.blue:T.orange }} /></div>
                  <div style={{ fontSize:10,color:T.textMuted,marginTop:2 }}>Best for: {b.positions}</div>
                </div>
              ))}
            </div>
            <div className="card">
              <div className="section-title">Axle Position Performance</div>
              {POSITION_PERF.map(p=>(
                <div key={p.axle} style={{ padding:"10px 0",borderBottom:`1px solid ${T.border}22` }}>
                  <div style={{ display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3 }}>
                    <span style={{ fontWeight:600 }}>{p.axle}</span>
                    <span style={{ color:T.accent,fontWeight:600 }}>{p.avgLife?p.avgLife.toLocaleString()+" km avg":"—"}</span>
                  </div>
                  <div style={{ fontSize:11,color:T.textSub }}>Wear rate: {p.wearRate} · Best: {p.bestBrand}</div>
                  <div style={{ fontSize:10,color:T.textMuted,marginTop:2 }}>{p.note}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="section-title">Vehicle-wise Tyre Cost Analysis</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8 }}>
              {[
                { v:"TN69 GH4789", tyreCount:9, totalCost:224000, cpkm:2.8, bestBrand:"MRF" },
                { v:"TN59 AB1234", tyreCount:4, totalCost:116000, cpkm:1.9, bestBrand:"Bridgestone" },
              ].map(v=>(
                <div key={v.v} style={{ background:T.bgPanel,borderRadius:8,padding:"12px 14px" }}>
                  <div className="mono" style={{ fontSize:12,color:T.accent,marginBottom:6 }}>{v.v}</div>
                  {[["Tyres",v.tyreCount],["Total Cost",`₹${v.totalCost.toLocaleString()}`],["Cost/KM",`₹${v.cpkm}`],["Best Brand",v.bestBrand]].map(([k,val])=>(
                    <div key={k} style={{ display:"flex",justifyContent:"space-between",fontSize:11,padding:"2px 0" }}>
                      <span style={{ color:T.textMuted }}>{k}</span><span style={{ fontWeight:600 }}>{val}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: driver-impact ── */}
      {tab==="driver-impact" && (
        <div>
          <div className="card" style={{ marginBottom:14,border:`1px solid ${T.orange}44`,background:T.orangeGlow }}>
            <div className="section-title" style={{ color:T.orange }}>⚠️ Driver Tyre Impact — High Risk Drivers</div>
            {DRIVER_IMPACT.filter(d=>d.wearIndex>1.1).map(d=>(
              <div key={d.driver} className="arow" style={{ borderLeftColor:d.wearIndex>1.3?T.red:T.orange }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12,fontWeight:700 }}>{d.driver} — Wear Index: <span style={{ color:d.wearIndex>1.3?T.red:T.orange }}>{d.wearIndex}x</span></div>
                  <div style={{ fontSize:11,color:T.textSub }}>{d.recommendation}</div>
                  <div style={{ fontSize:11,color:T.textMuted,marginTop:2 }}>Harsh braking: {d.harshBraking}/month · Overloads: {d.overloads}/month</div>
                </div>
                <span className="badge bo">{d.tyreLife}</span>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding:0 }}>
            <table className="tbl">
              <thead><tr><th>Driver</th><th>Wear Index</th><th>Harsh Braking/mo</th><th>Overloads/mo</th><th>Tyre Life Impact</th><th>Recommendation</th></tr></thead>
              <tbody>
                {DRIVER_IMPACT.map(d=>(
                  <tr key={d.driver}>
                    <td style={{ fontWeight:600 }}>{d.driver}</td>
                    <td style={{ fontWeight:700,color:d.wearIndex>1.2?T.red:d.wearIndex>1.0?T.orange:T.green }}>{d.wearIndex}x</td>
                    <td style={{ color:d.harshBraking>10?T.red:d.harshBraking>5?T.orange:T.green }}>{d.harshBraking}</td>
                    <td style={{ color:d.overloads>3?T.red:d.overloads>1?T.orange:T.green }}>{d.overloads}</td>
                    <td><span className={`badge ${d.wearIndex>1.2?"br":d.wearIndex>1.0?"bo":"bg"}`}>{d.tyreLife}</span></td>
                    <td style={{ fontSize:11,color:T.textSub }}>{d.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB: movement ── */}
      {tab==="movement" && (
        <div>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
            <div className="section-title" style={{ margin:0 }}>🔄 Tyre Movement Audit Log</div>
            <div style={{ fontSize:11,color:T.textMuted }}>{movementLog.length} movements recorded</div>
          </div>
          <div className="card" style={{ padding:0 }}>
            <table className="tbl">
              <thead><tr><th>ID</th><th>Tyre</th><th>Date</th><th>Type</th><th>From</th><th>To</th><th>Reason</th><th>By</th><th>KM Saved</th></tr></thead>
              <tbody>
                {movementLog.map(m=>(
                  <tr key={m.id}>
                    <td className="mono" style={{ fontSize:11,color:T.accent }}>{m.id}</td>
                    <td className="mono" style={{ fontSize:11 }}>{m.tyreId}</td>
                    <td style={{ fontSize:11,color:T.textMuted }}>{m.date}</td>
                    <td><span className={`badge ${m.type==="Cross-Vehicle"?"bp":m.type==="Retread"?"bo":m.type==="Scrap"?"br":"bg"}`}>{m.type}</span></td>
                    <td style={{ fontSize:11 }}>{m.fromV} / <span className="mono">{m.fromP}</span></td>
                    <td style={{ fontSize:11 }}>{m.toV} / <span className="mono">{m.toP}</span></td>
                    <td style={{ fontSize:11,color:T.textSub }}>{m.reason}</td>
                    <td style={{ fontSize:11 }}>{m.by}</td>
                    <td style={{ color:T.green,fontWeight:600 }}>{m.kmSaved ? `+${m.kmSaved.toLocaleString()} km` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const AgentPage = () => {
  const [sel, setSel] = useState(null);
  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Agents & Commission</h1><p style={{ color:T.textSub, fontSize:12 }}>Freight brokers, commission ledger & payouts</p></div>
        <button className="btn btn-p"><Ic n="plus" s={14} c="#080B10" /> Add Agent</button>
      </div>
      <div className="kpi-row kpi3" style={{ marginBottom:18 }}>
        {[{ l:"Active Agents", v:AGENTS.length, c:T.green },{ l:"Commission Pending", v:fmt(AGENTS.reduce((s,a)=>s+(a.commType==="percent"?0:a.commValue),0)), c:T.orange },{ l:"Total Freight Sourced", v:fmt(AGENTS.reduce((s,a)=>s+a.totalFreight,0)), c:T.blue }].map(k => <div key={k.l} className="stat"><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>)}
      </div>
      <div className="grd2">
        {AGENTS.map(a => (
          <div key={a.id} className="card" style={{ cursor:"pointer" }} onClick={()=>setSel(a)}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <div><div style={{ fontWeight:700, fontSize:14 }}>{a.name}</div><div style={{ fontSize:11, color:T.textSub }}>{a.company} · {a.city}</div></div>
              <span className="badge bg">Active</span>
            </div>
            <div style={{ display:"flex", gap:14, fontSize:12, color:T.textSub }}>
              <div><span style={{ color:T.accent }}>{a.commType==="percent"?`${a.commValue}%`:fmt(a.commValue)}</span> comm.</div>
              <div><span style={{ color:T.green, fontWeight:600 }}>{a.totalTrips}</span> trips</div>
              <div style={{ marginLeft:"auto", color:T.green, fontWeight:700 }}>{fmt(a.totalFreight)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Smart Truck Onboarding AI Engine ────────────────────────────────────────
const TRUCK_MODEL_DB = {
  "Tata LPT 2518":    { make:"Tata",         gvw:25000, axles:3, tyres:10, category:"heavy",  fuel:"5.2 km/l", maxSpeed:"62 kmph", engineCC:5883,  body:["openbody","container","tipper"], tyreSizes:["295/80 R22.5","315/80 R22.5"], tyrePattern:{ front:"RIB", rear:"LUG" }, aiInsights:["Best for medium-haul (200–600 km)","Rear axle: use LUG pattern for traction","Rotate tyres every 12,000 km","Scheduled service every 20,000 km"] },
  "Tata LPT 3118":    { make:"Tata",         gvw:31000, axles:3, tyres:12, category:"heavy",  fuel:"4.8 km/l", maxSpeed:"58 kmph", engineCC:5883,  body:["tripper","flatbed"],              tyreSizes:["295/80 R22.5"],               tyrePattern:{ front:"RIB", rear:"LUG" }, aiInsights:["High-payload — avoid overloading beyond GVW 31T","Check air brake system daily","Suitable for quarry/mining operations"] },
  "Tata Prima 4928":  { make:"Tata Prima",   gvw:49000, axles:5, tyres:18, category:"heavy",  fuel:"3.8 km/l", maxSpeed:"55 kmph", engineCC:12000, body:["trailer","flatbed"],              tyreSizes:["315/80 R22.5","295/80 R22.5"],tyrePattern:{ front:"RIB", rear:"LUG" }, aiInsights:["Long-haul king — best for 800+ km routes","Use Bridgestone or MRF for drive axle","Retread trailer axle tyres after 90,000 km"] },
  "Ashok Leyland 2518":{ make:"Ashok Leyland",gvw:25000, axles:3, tyres:10, category:"heavy", fuel:"4.9 km/l", maxSpeed:"60 kmph", engineCC:5660,  body:["openbody","container"],           tyreSizes:["295/80 R22.5","315/80 R22.5"],tyrePattern:{ front:"RIB", rear:"LUG" }, aiInsights:["Reliable for NH routes","Monitor clutch health — avg life 80,000 km","Check steering alignment every 40,000 km"] },
  "Ashok Leyland 4923":{ make:"Ashok Leyland",gvw:47000, axles:5, tyres:18, category:"heavy", fuel:"3.5 km/l", maxSpeed:"55 kmph", engineCC:8300,  body:["trailer"],                        tyreSizes:["315/80 R22.5"],               tyrePattern:{ front:"RIB", rear:"LUG" }, aiInsights:["Full trailer spec — verify trailer coupling compatibility","Fuel efficiency improves by 8% with aerodynamic front guard"] },
  "BharatBenz 3523":  { make:"BharatBenz",   gvw:35000, axles:3, tyres:12, category:"heavy",  fuel:"5.4 km/l", maxSpeed:"60 kmph", engineCC:7200,  body:["flatbed","container","openbody"], tyreSizes:["315/80 R22.5"],               tyrePattern:{ front:"RIB", rear:"LUG" }, aiInsights:["Premium efficiency — monitor AdBlue levels","Telematics-ready — connect GPS immediately","Best for steel/coil transport on flatbed"] },
  "VECV Eicher 6016": { make:"VECV",         gvw:16000, axles:2, tyres:6,  category:"medium", fuel:"7.2 km/l", maxSpeed:"68 kmph", engineCC:3800,  body:["container","openbody"],           tyreSizes:["225/75 R17.5","215/75 R17.5"],tyrePattern:{ front:"RIB", rear:"LUG" }, aiInsights:["Ideal for FMCG distribution","6-tyre config — check tyre balance monthly","High fuel efficiency — monitor if drops below 6.5 km/l"] },
  "Tata Ace Gold":    { make:"Tata",         gvw:1700,  axles:2, tyres:4,  category:"LCV",    fuel:"17 km/l",  maxSpeed:"70 kmph", engineCC:700,   body:["lcv"],                            tyreSizes:["155/80 R13"],                 tyrePattern:{ front:"RIB", rear:"RIB" }, aiInsights:["Last-mile delivery specialist","4-tyre — rotate F-R every 8,000 km","Check clutch cable every 30,000 km"] },
  "Mahindra Bolero Pikup":{ make:"Mahindra", gvw:2000,  axles:2, tyres:4,  category:"LCV",    fuel:"14 km/l",  maxSpeed:"75 kmph", engineCC:2498,  body:["lcv"],                            tyreSizes:["195/65 R15"],                 tyrePattern:{ front:"RIB", rear:"RIB" }, aiInsights:["Excellent pick-up payload per ₹","Rear leaf spring — check every 30,000 km"] },
};

const USAGE_LOAD_MAP = {
  cement:    { loadType:"bulk-powder", bodyRec:"tipper",    tyreSuffix:"Dusty/abrasive roads — replace front tyres every 60,000 km" },
  steel:     { loadType:"heavy-dense", bodyRec:"flatbed",   tyreSuffix:"Heavy axle load — use max rated LUG tyres on drive axle" },
  fmcg:      { loadType:"light-volumetric", bodyRec:"container", tyreSuffix:"High trip frequency — rotate every 10,000 km" },
  chemicals: { loadType:"liquid-bulk", bodyRec:"tanker",    tyreSuffix:"Tanker load — check weight distribution every trip" },
  sand:      { loadType:"bulk-loose",  bodyRec:"tipper",    tyreSuffix:"Abrasive cargo — replace rear tyres more frequently" },
  general:   { loadType:"general",     bodyRec:"openbody",  tyreSuffix:"Mixed loads — standard rotation schedule applies" },
  machinery: { loadType:"heavy-dense", bodyRec:"flatbed",   tyreSuffix:"Low clearance loads — check bed strapping and tyre pressure" },
  ecommerce: { loadType:"light-volumetric", bodyRec:"container", tyreSuffix:"Multiple drops per day — monitor tyre wear on city routes" },
};

const AXLE_TYRE_CONFIG = {
  4:  [{ axle:"Front Axle (Steer)", positions:["FL","FR"] }, { axle:"Rear Axle", positions:["RL1","RR1"] }],
  6:  [{ axle:"Front Axle (Steer)", positions:["FL","FR"] }, { axle:"Rear Axle", positions:["RL1","RR1","RL2","RR2"] }],
  10: [{ axle:"Front Axle (Steer)", positions:["FL","FR"] }, { axle:"Rear Axle 1 (Drive)", positions:["RL1","RR1","RL2","RR2"] }, { axle:"Rear Axle 2 (Bogie)", positions:["RL3","RR3","RL4","RR4"] }],
  12: [{ axle:"Front Axle (Steer)", positions:["FL","FR"] }, { axle:"Rear Axle 1 (Drive)", positions:["RL1","RR1","RL2","RR2"] }, { axle:"Rear Axle 2 (Drive 2)", positions:["RL3","RR3","RL4","RR4"] }, { axle:"Rear Axle 3 (Bogie)", positions:["RL5","RR5","RL6","RR6"] }],
  18: [{ axle:"Steer Axle", positions:["FL","FR"] }, { axle:"Drive Axle 1", positions:["RL1","RR1","RL2","RR2"] }, { axle:"Drive Axle 2", positions:["RL3","RR3","RL4","RR4"] }, { axle:"Trailer Axle 1", positions:["TL1","TR1","TL2","TR2"] }, { axle:"Trailer Axle 2", positions:["TL3","TR3","TL4","TR4"] }],
};

function aiDetectFromRegNo(regNo) {
  // Indian number plate → state detection
  const stateMap = { "TN":"Tamil Nadu","KA":"Karnataka","AP":"Andhra Pradesh","MH":"Maharashtra","DL":"Delhi","UP":"Uttar Pradesh","RJ":"Rajasthan","GJ":"Gujarat","WB":"West Bengal","MP":"Madhya Pradesh" };
  const parts = regNo.replace(/\s/g,"").toUpperCase();
  const state = stateMap[parts.substring(0,2)] || "Unknown State";
  const distCode = parts.substring(2,4);
  return { state, distCode, valid: parts.length >= 6 };
}

function aiDetectBodyType(modelSpec, usage) {
  if (!modelSpec) return null;
  const usageMap = USAGE_LOAD_MAP[usage];
  if (usageMap && modelSpec.body.includes(usageMap.bodyRec)) return usageMap.bodyRec;
  return modelSpec.body[0];
}

function detectCondition(km) {
  if (!km || km < 2000)  return { label:"New",           color:T.green,  desc:"Brand new — 0 maintenance baseline" };
  if (km < 50000)        return { label:"Good",          color:T.blue,   desc:"Well within first service lifecycle" };
  if (km < 150000)       return { label:"Used — Active", color:T.accent, desc:"Standard operational range for Indian highways" };
  if (km < 300000)       return { label:"High Mileage",  color:T.orange, desc:"Increased maintenance frequency recommended" };
  return                        { label:"Critical Age",  color:T.red,    desc:"Full vehicle health audit required before ops" };
}

// ─── Add Vehicle Wizard (Smart Onboarding) ────────────────────────────────────
const AddVehicleWizard = ({ onClose, onSave }) => {
  const STEPS = ["Identity","Specifications","Tyre Setup","Ownership","Compliance","Review & Init"];
  const TOTAL_STEPS = 6;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    regNo:"", make:"Tata", model:"", usage:"general", ownership:"Owned",
    bodyType:"", tyreSize:"", axles:"", tyreCount:"", gvw:"", category:"", fuel:"", engineCC:"", maxSpeed:"",
    tyrePatternFront:"RIB", tyrePatternRear:"LUG",
    tyreSource:"new", tyreBrand:"MRF", tyreVendor:"", tyreInvoiceNo:"", tyrePurchaseCost:"", tyreWarrantyKm:"80000", tyreNotes:"",
    purchaseCost:"", purchaseDate:"", odometer:"0", financed:"No", financier:"", emiAmount:"",
    insuranceExp:"", fcExp:"", taxPaidDate:"", permitType:"National", pollutionExp:"",
  });
  const rf = (k,v) => setForm(f => ({ ...f, [k]:v }));
  const modelSpec = TRUCK_MODEL_DB[form.model];
  const regInfo   = form.regNo.length >= 4 ? aiDetectFromRegNo(form.regNo) : null;
  const condition = detectCondition(parseInt(form.odometer)||0);
  const usageSpec = USAGE_LOAD_MAP[form.usage] || USAGE_LOAD_MAP.general;
  const axleConfig = modelSpec ? (AXLE_TYRE_CONFIG[modelSpec.tyres] || AXLE_TYRE_CONFIG[10]) : null;
  const tyrePositions = axleConfig ? axleConfig.flatMap(row => row.positions) : ["FL","FR","RL1","RR1","RL2","RR2","RL3","RR3"];

  const applyAIFill = (model) => {
    const spec = TRUCK_MODEL_DB[model];
    if (!spec) return;
    setForm(f => ({ ...f, model, axles:String(spec.axles), tyreCount:String(spec.tyres), gvw:String(spec.gvw), category:spec.category, fuel:spec.fuel, engineCC:String(spec.engineCC), maxSpeed:spec.maxSpeed, tyreSize:spec.tyreSizes[0], tyrePatternFront:spec.tyrePattern.front, tyrePatternRear:spec.tyrePattern.rear, bodyType:spec.body[0], tyreBrand:"MRF" }));
  };

  const ownershipTyreLogic = {
    "Owned":   { label:"Own Truck",               tyreSourceOptions:["new","existing","to-be-fitted"],        note:"You own this truck. New truck = enter new tyre purchase details. Used truck = record current tyre state." },
    "Leased":  { label:"Leased Vehicle",           tyreSourceOptions:["existing","vendor-supplied","to-be-fitted"], note:"Leased vehicle — tyres may be included in lease. Mark vendor-supplied or record existing tyres." },
    "Hired":   { label:"Hired / Attached Vehicle", tyreSourceOptions:["vendor-supplied","to-be-fitted"],      note:"Hired truck — tyres belong to vehicle owner. Mark as vendor-supplied. No cost allocation to your fleet." },
    "Financed":{ label:"Financed Truck",            tyreSourceOptions:["new","existing","to-be-fitted"],        note:"Financed vehicle — you own the tyres. Enter purchase details during vehicle induction." },
  };
  const oLogic = ownershipTyreLogic[form.ownership] || ownershipTyreLogic["Owned"];
  const tyreSourceLabels = { new:"New Tyres (purchased with vehicle)", existing:"Existing Tyres (used vehicle, record current state)", "vendor-supplied":"Vendor-Supplied (lease/hire — not your tyres)", "to-be-fitted":"To Be Fitted Later" };

  const StepDot = ({ n, label }) => (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
      <div style={{ display:"flex", alignItems:"center", width:"100%" }}>
        {n>1 && <div style={{ flex:1, height:2, background:step>n-1?T.accent:T.border }} />}
        <div style={{ width:26, height:26, borderRadius:"50%", background:step===n?T.accent:step>n?T.green:T.bgPanel, border:`2px solid ${step===n?T.accent:step>n?T.green:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:step>=n?"#080B10":"#fff", margin:"0 auto", transition:"all .2s" }}>
          {step>n ? "✓" : n}
        </div>
        {n<TOTAL_STEPS && <div style={{ flex:1, height:2, background:step>n?T.accent:T.border }} />}
      </div>
      <div style={{ fontSize:8, color:step===n?T.accent:T.textMuted, textAlign:"center", whiteSpace:"nowrap" }}>{label}</div>
    </div>
  );
  const FieldRow = ({ children, cols=2 }) => (<div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap:12, marginBottom:12 }}>{children}</div>);
  const Field = ({ label, children, hint }) => (<div><label className="flabel">{label}</label>{children}{hint && <div style={{ fontSize:10, color:T.textMuted, marginTop:3 }}>{hint}</div>}</div>);

  return (
    <div className="ov" style={{ alignItems:"flex-start", paddingTop:20, overflowY:"auto" }}>
      <div className="modal" style={{ maxWidth:720, width:"100%", margin:"0 auto" }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#1a1200,#3d2800,#F59E0B22)", borderBottom:`1px solid ${T.accent}33` }}>
          <div>
            <div className="rj" style={{ fontSize:20, fontWeight:700, color:T.accent }}>🚛 Smart Truck Onboarding</div>
            <div style={{ fontSize:11, color:T.textSub, marginTop:2 }}>AI-powered — specs · tyre setup · compliance · module init · {TOTAL_STEPS} steps</div>
          </div>
          <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
        </div>
        <div className="mbdy">
          <div style={{ display:"flex", marginBottom:24 }}>
            {STEPS.map((s,i) => <StepDot key={s} n={i+1} label={s} />)}
          </div>

          {/* STEP 1 — Identity */}
          {step===1 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:16 }}>Step 1 — Vehicle Identity & Basic Info</div>
              <div style={{ marginBottom:16 }}>
                <label className="flabel">Vehicle Registration Number *</label>
                <input value={form.regNo} onChange={e=>rf("regNo",e.target.value.toUpperCase())} placeholder="TN 69 GH 4789" style={{ fontSize:16, fontFamily:"'JetBrains Mono',monospace", letterSpacing:2, fontWeight:700 }} />
                {regInfo && regInfo.valid && (
                  <div style={{ display:"flex", gap:8, marginTop:6, fontSize:11 }}>
                    <span style={{ background:T.blue+"22", color:T.blue, padding:"2px 8px", borderRadius:6, fontWeight:600 }}>📍 {regInfo.state}</span>
                    <span style={{ background:T.green+"22", color:T.green, padding:"2px 8px", borderRadius:6 }}>✓ Valid Indian format</span>
                  </div>
                )}
              </div>
              <FieldRow cols={2}>
                <Field label="Manufacturer"><select value={form.make} onChange={e=>rf("make",e.target.value)}>{["Tata","Tata Prima","Ashok Leyland","BharatBenz","VECV","Mahindra","Volvo","Scania","MAN"].map(m=><option key={m}>{m}</option>)}</select></Field>
                <Field label="Model" hint="AI auto-fills all specs on selection"><select value={form.model} onChange={e=>applyAIFill(e.target.value)}><option value="">— Select Model —</option>{Object.keys(TRUCK_MODEL_DB).map(m=><option key={m}>{m}</option>)}</select></Field>
              </FieldRow>
              <FieldRow cols={2}>
                <Field label="Primary Usage / Industry"><select value={form.usage} onChange={e=>rf("usage",e.target.value)}>{Object.keys(USAGE_LOAD_MAP).map(u=><option key={u}>{u.charAt(0).toUpperCase()+u.slice(1)}</option>)}</select></Field>
                <Field label="Ownership Type" hint="Determines tyre onboarding mode in Step 3"><select value={form.ownership} onChange={e=>rf("ownership",e.target.value)}>{["Owned","Leased","Hired","Financed"].map(o=><option key={o}>{o}</option>)}</select></Field>
              </FieldRow>
              {modelSpec && (
                <div style={{ background:`linear-gradient(135deg,${T.accent}10,${T.accent}05)`, border:`1px solid ${T.accent}44`, borderRadius:10, padding:14, marginTop:4 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:T.accent }}>🤖 AI Auto-Detected — {form.model}</div>
                    <span className="badge ba">Auto-filled</span>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
                    {[{ l:"GVW", v:`${(modelSpec.gvw/1000).toFixed(0)}T` },{ l:"Axles", v:modelSpec.axles },{ l:"Tyres", v:modelSpec.tyres },{ l:"Fuel Eff.", v:modelSpec.fuel },{ l:"Category", v:modelSpec.category },{ l:"Engine CC", v:modelSpec.engineCC.toLocaleString() },{ l:"Top Speed", v:modelSpec.maxSpeed },{ l:"Body Rec.", v:modelSpec.body[0] }].map(k=>(
                      <div key={k.l} style={{ background:T.bgPanel, borderRadius:7, padding:"7px 10px" }}><div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div><div style={{ fontSize:12, fontWeight:700, marginTop:2, color:T.text }}>{k.v}</div></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2 — Specifications */}
          {step===2 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:16 }}>Step 2 — Vehicle Specifications <span style={{ fontSize:11, color:T.textMuted, fontWeight:400 }}>(AI pre-filled — review & adjust)</span></div>
              <FieldRow cols={3}>
                <Field label="Body Type"><select value={form.bodyType} onChange={e=>rf("bodyType",e.target.value)}>{["openbody","container","tipper","flatbed","trailer","tanker","lcv"].map(b=><option key={b}>{b}</option>)}</select></Field>
                <Field label="Axle Count"><select value={form.axles} onChange={e=>rf("axles",e.target.value)}>{["2","3","4","5","6"].map(a=><option key={a}>{a}</option>)}</select></Field>
                <Field label="Tyre Count"><select value={form.tyreCount} onChange={e=>rf("tyreCount",e.target.value)}>{["4","6","10","12","14","16","18","22"].map(t=><option key={t}>{t}</option>)}</select></Field>
              </FieldRow>
              <FieldRow cols={3}>
                <Field label="GVW (kg)"><input value={form.gvw} onChange={e=>rf("gvw",e.target.value)} placeholder="25000" /></Field>
                <Field label="Tyre Size"><select value={form.tyreSize} onChange={e=>rf("tyreSize",e.target.value)}>{["315/80 R22.5","295/80 R22.5","295/90 R20","225/75 R17.5","215/75 R17.5","155/80 R13"].map(s=><option key={s}>{s}</option>)}</select></Field>
                <Field label="Fuel Economy"><input value={form.fuel} onChange={e=>rf("fuel",e.target.value)} placeholder="5.2 km/l" /></Field>
              </FieldRow>
              <FieldRow cols={2}>
                <Field label="Front Tyre Pattern"><select value={form.tyrePatternFront} onChange={e=>rf("tyrePatternFront",e.target.value)}>{["RIB","LUG","BLOCK"].map(p=><option key={p}>{p}</option>)}</select></Field>
                <Field label="Rear Tyre Pattern"><select value={form.tyrePatternRear} onChange={e=>rf("tyrePatternRear",e.target.value)}>{["LUG","RIB","BLOCK"].map(p=><option key={p}>{p}</option>)}</select></Field>
              </FieldRow>
              {axleConfig && (
                <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginTop:4 }}>
                  <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:10 }}>🚛 Generated Axle Layout — {form.tyreCount}-Tyre Config</div>
                  {axleConfig.map((row,ri)=>(
                    <div key={ri} style={{ display:"flex", alignItems:"center", marginBottom:10 }}>
                      <div style={{ fontSize:9, color:T.textMuted, width:110, textAlign:"right", paddingRight:10 }}>{row.axle}</div>
                      <div style={{ flex:1, height:3, background:T.border, position:"relative" }}>
                        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                          {row.positions.map(pos=><div key={pos} style={{ width:32, height:32, borderRadius:"50%", background:T.blue+"18", border:`2px solid ${T.blue}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:700, color:T.blue }}>{pos}</div>)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ background:T.purpleGlow, border:`1px solid ${T.purple}33`, borderRadius:8, padding:10, marginTop:10 }}>
                <div style={{ fontSize:11, color:T.purple, fontWeight:700, marginBottom:4 }}>🤖 Usage Intelligence — {form.usage.charAt(0).toUpperCase()+form.usage.slice(1)}</div>
                <div style={{ fontSize:12, color:T.textSub }}>{usageSpec.tyreSuffix}</div>
                <div style={{ fontSize:11, color:T.textMuted, marginTop:3 }}>Recommended body: <strong style={{ color:T.accent }}>{usageSpec.bodyRec}</strong> · Load type: <strong style={{ color:T.accent }}>{usageSpec.loadType}</strong></div>
              </div>
            </div>
          )}

          {/* STEP 3 — Tyre Setup */}
          {step===3 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:6 }}>Step 3 — Tyre Setup & Initial Fitment</div>
              <div style={{ fontSize:11, color:T.textMuted, marginBottom:14 }}>Configure tyre state for every position — from day one, every KM is tracked.</div>
              <div style={{ background:T.accentGlow, border:`1px solid ${T.accent}33`, borderRadius:8, padding:12, marginBottom:16, display:"flex", gap:10, alignItems:"flex-start" }}>
                <span style={{ fontSize:22 }}>{form.ownership==="Owned"?"🚛":form.ownership==="Leased"?"📋":form.ownership==="Hired"?"🤝":"💳"}</span>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:T.accent }}>{oLogic.label} — {form.ownership}</div>
                  <div style={{ fontSize:11, color:T.textSub, marginTop:3 }}>{oLogic.note}</div>
                </div>
              </div>
              <div style={{ marginBottom:16 }}>
                <label className="flabel">How are tyres being set up?</label>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:8, marginTop:6 }}>
                  {oLogic.tyreSourceOptions.map(src=>(
                    <div key={src} onClick={()=>rf("tyreSource",src)} style={{ padding:"10px 12px", borderRadius:9, cursor:"pointer", border:`2px solid ${form.tyreSource===src?T.accent:T.border}`, background:form.tyreSource===src?T.accentGlow:T.bgPanel, transition:"all .15s" }}>
                      <div style={{ fontSize:14, marginBottom:3 }}>{src==="new"?"🆕":src==="existing"?"♻️":src==="vendor-supplied"?"🤝":"⏳"}</div>
                      <div style={{ fontSize:11, fontWeight:600, color:form.tyreSource===src?T.accent:T.text }}>{tyreSourceLabels[src]}</div>
                    </div>
                  ))}
                </div>
              </div>

              {form.tyreSource==="new" && (
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:T.green, marginBottom:10 }}>🆕 New Tyre Purchase Details</div>
                  <FieldRow cols={3}>
                    <Field label="Brand"><select value={form.tyreBrand} onChange={e=>rf("tyreBrand",e.target.value)}>{["MRF","Apollo","Bridgestone","CEAT","Michelin","JK Tyre","Goodyear"].map(b=><option key={b}>{b}</option>)}</select></Field>
                    <Field label="Cost per Tyre (₹)"><input value={form.tyrePurchaseCost} onChange={e=>rf("tyrePurchaseCost",e.target.value)} placeholder="28000" /></Field>
                    <Field label="Warranty (km)"><input value={form.tyreWarrantyKm} onChange={e=>rf("tyreWarrantyKm",e.target.value)} placeholder="80000" /></Field>
                  </FieldRow>
                  <FieldRow cols={2}>
                    <Field label="Tyre Vendor / Dealer"><input value={form.tyreVendor} onChange={e=>rf("tyreVendor",e.target.value)} placeholder="MRF Dealer, Chennai" /></Field>
                    <Field label="Purchase Invoice No."><input value={form.tyreInvoiceNo} onChange={e=>rf("tyreInvoiceNo",e.target.value)} placeholder="INV-2025-0421" /></Field>
                  </FieldRow>
                  <div style={{ background:T.blue+"12", border:`1px solid ${T.blue}33`, borderRadius:8, padding:12, marginBottom:12 }}>
                    <div style={{ fontSize:11, color:T.blue, fontWeight:700, marginBottom:5 }}>🤖 AI Tyre Recommendation for {form.model||"this vehicle"}</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, fontSize:11 }}>
                      <div><span style={{ color:T.textMuted }}>Front axle: </span><strong style={{ color:T.accent }}>{form.tyrePatternFront} · {form.tyreSize}</strong></div>
                      <div><span style={{ color:T.textMuted }}>Drive axle: </span><strong style={{ color:T.accent }}>{form.tyrePatternRear} · {form.tyreSize}</strong></div>
                      <div><span style={{ color:T.textMuted }}>Best brand: </span><strong style={{ color:T.accent }}>MRF / Bridgestone for highway</strong></div>
                      <div><span style={{ color:T.textMuted }}>Total tyre cost: </span><strong style={{ color:T.green }}>₹{form.tyrePurchaseCost?((parseInt(form.tyrePurchaseCost)||28000)*(parseInt(form.tyreCount)||10)).toLocaleString():"—"}</strong></div>
                    </div>
                  </div>
                  <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:8 }}>Tyre Position Assignment</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
                    {tyrePositions.slice(0,parseInt(form.tyreCount)||8).map(pos=>{
                      const isF = pos==="FL"||pos==="FR";
                      return (
                        <div key={pos} style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:8, padding:"10px 10px" }}>
                          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                            <span className="mono" style={{ fontSize:11, fontWeight:700, color:T.accent }}>{pos}</span>
                            <span style={{ fontSize:9, color:T.textMuted }}>{isF?"Steer":"Drive"}</span>
                          </div>
                          <div style={{ fontSize:10, color:T.textMuted, marginBottom:4 }}>Pattern: <strong style={{ color:T.text }}>{isF?form.tyrePatternFront:form.tyrePatternRear}</strong></div>
                          <input placeholder="Serial / Tyre ID (opt)" value={form[`tyrePos_${pos}`]||""} onChange={e=>rf(`tyrePos_${pos}`,e.target.value)} style={{ fontSize:10, padding:"4px 7px", width:"100%", fontFamily:"'JetBrains Mono',monospace" }} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {form.tyreSource==="existing" && (
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:T.orange, marginBottom:10 }}>♻️ Record Existing Tyre State (Used Vehicle)</div>
                  <div style={{ background:T.orangeGlow, border:`1px solid ${T.orange}33`, borderRadius:8, padding:10, marginBottom:12, fontSize:11, color:T.textSub }}>
                    ⚠️ Enter tread depth & condition per position — AI will establish a predictive baseline from day one.
                  </div>
                  <FieldRow cols={3}>
                    <Field label="Brand (current)"><select value={form.tyreBrand} onChange={e=>rf("tyreBrand",e.target.value)}>{["MRF","Apollo","Bridgestone","CEAT","Mixed"].map(b=><option key={b}>{b}</option>)}</select></Field>
                    <Field label="Tyre Size"><input value={form.tyreSize} readOnly style={{ background:T.bgPanel, color:T.textSub }} /></Field>
                    <Field label="KM on current tyres" hint="Km run on these existing tyres"><input placeholder="42000" onChange={e=>rf("existingTyreKm",e.target.value)} /></Field>
                  </FieldRow>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
                    {tyrePositions.slice(0,parseInt(form.tyreCount)||8).map(pos=>{
                      const isF = pos==="FL"||pos==="FR";
                      return (
                        <div key={pos} style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:8, padding:"10px 10px" }}>
                          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                            <span className="mono" style={{ fontSize:11, fontWeight:700, color:T.accent }}>{pos}</span>
                            <span style={{ fontSize:9, color:T.textMuted }}>{isF?"Steer":"Drive"}</span>
                          </div>
                          <div style={{ marginBottom:4 }}>
                            <div style={{ fontSize:9, color:T.cyan, marginBottom:2, fontWeight:600 }}>TIN (sidewall)</div>
                            <input placeholder="e.g. MRF-CH-17-23-0042" onChange={e=>rf(`tyreTin_${pos}`,e.target.value)} style={{ fontSize:9, padding:"3px 6px", width:"100%", fontFamily:"'JetBrains Mono',monospace", borderColor:T.cyan+"44" }} />
                          </div>
                          <div style={{ marginBottom:4 }}>
                            <div style={{ fontSize:9, color:T.textMuted, marginBottom:2 }}>Tread depth (mm)</div>
                            <select style={{ fontSize:10, padding:"3px 6px", width:"100%" }} onChange={e=>rf(`tyreTread_${pos}`,e.target.value)}><option value="">—</option>{["9+","8","7","6","5","4","3","<3"].map(d=><option key={d}>{d}</option>)}</select>
                          </div>
                          <div>
                            <div style={{ fontSize:9, color:T.textMuted, marginBottom:2 }}>Condition</div>
                            <select style={{ fontSize:10, padding:"3px 6px", width:"100%" }} onChange={e=>rf(`tyreCond_${pos}`,e.target.value)}>{["New","Good","Worn","Critical","Retread"].map(c=><option key={c}>{c}</option>)}</select>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {form.tyreSource==="vendor-supplied" && (
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:T.blue, marginBottom:10 }}>🤝 Vendor / Lease — Tyres Not Owned by Fleet</div>
                  <div style={{ background:T.blueGlow, border:`1px solid ${T.blue}33`, borderRadius:8, padding:12, marginBottom:12, fontSize:11, color:T.textSub }}>
                    Tyres belong to the vehicle owner. System will track wear for reporting only. No tyre cost will be added to your fleet P&L.
                  </div>
                  <FieldRow cols={2}>
                    <Field label="Vehicle Owner / Lessor"><input placeholder="KPR Fleet Solutions, Madurai" onChange={e=>rf("tyreVendor",e.target.value)} /></Field>
                    <Field label="Lease / Hire Agreement No."><input placeholder="LEASE-2025-KPR-018" /></Field>
                  </FieldRow>
                  <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:8, padding:12 }}>
                    <div style={{ fontSize:11, color:T.textSub, marginBottom:8 }}>Tyre slots created as <strong style={{ color:T.blue }}>Vendor-Owned</strong> — track-only mode.</div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {tyrePositions.slice(0,parseInt(form.tyreCount)||8).map(pos=>(
                        <div key={pos} style={{ width:38, height:38, borderRadius:"50%", background:T.blue+"12", border:`2px solid ${T.blue}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, color:T.blue, fontWeight:700 }}>{pos}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {form.tyreSource==="to-be-fitted" && (
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:T.purple, marginBottom:10 }}>⏳ Tyres Will Be Added Later</div>
                  <div style={{ background:T.purpleGlow, border:`1px solid ${T.purple}33`, borderRadius:8, padding:12, marginBottom:12, fontSize:11, color:T.textSub }}>
                    Vehicle registered now. Tyre slots created as "Empty". Assign tyres from Tyre Intelligence → Axle View after procurement.
                  </div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {tyrePositions.slice(0,parseInt(form.tyreCount)||8).map(pos=>(
                      <div key={pos} style={{ width:42, height:42, borderRadius:"50%", background:T.bgPanel, border:`2px dashed ${T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, color:T.textMuted }}>{pos}</div>
                    ))}
                  </div>
                  <div style={{ fontSize:10, color:T.textMuted, marginTop:8 }}>{form.tyreCount||"—"} empty tyre slots will be created</div>
                </div>
              )}

              <div style={{ marginTop:14 }}>
                <label className="flabel">Tyre Notes (optional)</label>
                <textarea value={form.tyreNotes} onChange={e=>rf("tyreNotes",e.target.value)} placeholder="e.g. All tyres replaced before purchase, spare in cabin, two retreaded tyres on trailer axle..." style={{ height:50 }} />
              </div>
            </div>
          )}

          {/* STEP 4 — Ownership */}
          {step===4 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:16 }}>Step 4 — Ownership & Purchase Details</div>
              <FieldRow cols={2}>
                <Field label="Purchase / Induction Cost (₹)"><input value={form.purchaseCost} onChange={e=>rf("purchaseCost",e.target.value)} placeholder="2800000" /></Field>
                <Field label="Purchase / Induction Date"><input type="date" value={form.purchaseDate} onChange={e=>rf("purchaseDate",e.target.value)} /></Field>
              </FieldRow>
              <FieldRow cols={2}>
                <Field label="Current Odometer (km)" hint="Detects New vs Used condition"><input value={form.odometer} onChange={e=>rf("odometer",e.target.value)} placeholder="0" /></Field>
                <Field label="Vehicle Condition (AI Detected)">
                  <div style={{ display:"flex", alignItems:"center", gap:10, height:36, padding:"0 10px", background:T.bgPanel, borderRadius:7, border:`1px solid ${condition.color}44` }}>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:condition.color }} />
                    <span style={{ fontSize:12, fontWeight:700, color:condition.color }}>{condition.label}</span>
                    <span style={{ fontSize:10, color:T.textMuted }}>— {condition.desc}</span>
                  </div>
                </Field>
              </FieldRow>
              <FieldRow cols={2}>
                <Field label="Financed?"><select value={form.financed} onChange={e=>rf("financed",e.target.value)}><option>No</option><option>Yes — Bank Loan</option><option>Yes — NBFC</option><option>Yes — Dealer Finance</option></select></Field>
                {form.financed!=="No" && <Field label="Financier Name"><input value={form.financier} onChange={e=>rf("financier",e.target.value)} placeholder="SBI, HDFC, Shriram Finance..." /></Field>}
              </FieldRow>
              {form.financed!=="No" && (
                <FieldRow cols={2}>
                  <Field label="EMI Amount (₹/month)"><input value={form.emiAmount} onChange={e=>rf("emiAmount",e.target.value)} placeholder="45000" /></Field>
                  <Field label="EMI Due Date"><select><option>1st</option><option>5th</option><option>10th</option><option>15th</option><option>20th</option></select></Field>
                </FieldRow>
              )}
              {form.purchaseCost && (
                <div style={{ background:T.greenGlow, border:`1px solid ${T.green}33`, borderRadius:10, padding:14, marginTop:4 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.green, marginBottom:8 }}>🤖 AI Cost Baseline</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                    {[{ l:"Break-even KM", v:`${Math.round(parseInt(form.purchaseCost||0)/22).toLocaleString()} km` },{ l:"Target Revenue/trip", v:`₹${Math.round(parseInt(form.purchaseCost||0)/200).toLocaleString()}` },{ l:"Est. Annual Depreciation", v:`₹${Math.round(parseInt(form.purchaseCost||0)*0.15/1000)}k` }].map(k=>(
                      <div key={k.l} style={{ background:T.bgPanel, borderRadius:7, padding:"8px 10px" }}><div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div><div style={{ fontSize:13, fontWeight:700, color:T.green, marginTop:2 }}>{k.v}</div></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5 — Compliance */}
          {step===5 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.accent, marginBottom:16 }}>Step 5 — Compliance & Documents</div>
              <div style={{ background:T.orangeGlow, border:`1px solid ${T.orange}33`, borderRadius:8, padding:10, marginBottom:14, fontSize:12, color:T.textSub }}>
                ⚠️ All documents required for commercial operation under MV Act 1988. Expired docs trigger automated alerts.
              </div>
              <FieldRow cols={2}>
                <Field label="Insurance Expiry Date" hint="30-day pre-expiry alert will be set"><input type="date" value={form.insuranceExp} onChange={e=>rf("insuranceExp",e.target.value)} /></Field>
                <Field label="Fitness Certificate (FC) Expiry"><input type="date" value={form.fcExp} onChange={e=>rf("fcExp",e.target.value)} /></Field>
              </FieldRow>
              <FieldRow cols={2}>
                <Field label="Road Tax Paid Date"><input type="date" value={form.taxPaidDate} onChange={e=>rf("taxPaidDate",e.target.value)} /></Field>
                <Field label="Pollution Certificate Expiry"><input type="date" value={form.pollutionExp} onChange={e=>rf("pollutionExp",e.target.value)} /></Field>
              </FieldRow>
              <FieldRow cols={2}>
                <Field label="Permit Type"><select value={form.permitType} onChange={e=>rf("permitType",e.target.value)}><option>National</option><option>State</option><option>Inter-State</option><option>Local</option></select></Field>
                <Field label="Year of Manufacture"><select>{Array.from({length:20},(_,i)=>2025-i).map(y=><option key={y}>{y}</option>)}</select></Field>
              </FieldRow>
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginTop:4 }}>
                <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:8 }}>Document Status Preview</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                  {[{ doc:"RC Book", status:form.regNo?"Entered":"Pending" },{ doc:"Insurance", status:form.insuranceExp?"Entered":"Pending" },{ doc:"FC Certificate", status:form.fcExp?"Entered":"Pending" },{ doc:"Road Tax", status:form.taxPaidDate?"Entered":"Pending" },{ doc:"Pollution Cert", status:form.pollutionExp?"Entered":"Pending" },{ doc:"National Permit", status:"Entered" }].map(d=>(
                    <div key={d.doc} style={{ display:"flex", gap:6, alignItems:"center", padding:"6px 8px", borderRadius:6, background:d.status==="Entered"?T.greenGlow:T.bgCard }}>
                      <span style={{ fontSize:12 }}>{d.status==="Entered"?"✅":"⬜"}</span>
                      <span style={{ fontSize:11, color:d.status==="Entered"?T.green:T.textMuted }}>{d.doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 6 — Review & Init */}
          {step===6 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:16 }}>Step 6 — AI Review, Validation & Initialize</div>
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:8 }}>🔍 System Validation</div>
                <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                  {[
                    { check:"Vehicle number entered", pass:form.regNo.length>=6 },
                    { check:"Model selected — specs auto-filled", pass:!!form.model },
                    { check:"Tyre setup configured — "+tyreSourceLabels[form.tyreSource]?.split(" (")[0], pass:!!form.tyreSource },
                    { check:`Tyre positions mapped (${tyrePositions.slice(0,parseInt(form.tyreCount)||8).length} slots)`, pass:true },
                    { check:"Ownership & purchase details captured", pass:!!form.purchaseCost },
                    { check:"Insurance document date entered", pass:!!form.insuranceExp },
                    { check:"FC Certificate date entered", pass:!!form.fcExp },
                    { check:form.financed!=="No"?"EMI details captured":"Ownership: no finance", pass:true },
                  ].map((v,i)=>(
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 10px", borderRadius:6, background:v.pass?T.greenGlow:T.orangeGlow }}>
                      <span style={{ fontSize:12 }}>{v.pass?"✅":"⚠️"}</span>
                      <span style={{ fontSize:12, color:v.pass?T.green:T.orange }}>{v.check}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background:T.bgPanel, border:`1px solid ${T.accent}33`, borderRadius:10, padding:14, marginBottom:12 }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.accent, marginBottom:10 }}>📋 Vehicle Summary</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:7 }}>
                  {[{ l:"Reg. No", v:form.regNo||"—" },{ l:"Model", v:form.model||"—" },{ l:"Condition", v:condition.label },{ l:"Body Type", v:form.bodyType||"—" },{ l:"Axles / Tyres", v:`${form.axles||"—"} axles · ${form.tyreCount||"—"} tyres` },{ l:"GVW", v:form.gvw?`${(parseInt(form.gvw)/1000).toFixed(0)}T`:"—" },{ l:"Tyre Setup", v:tyreSourceLabels[form.tyreSource]?.split(" (")[0]||"—" },{ l:"Tyre Brand", v:form.tyreSource!=="vendor-supplied"?form.tyreBrand:"Vendor-owned" },{ l:"Ownership", v:form.ownership }].map(k=>(
                    <div key={k.l} style={{ background:T.bgCard, borderRadius:7, padding:"7px 10px" }}><div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div><div style={{ fontSize:11, fontWeight:600, marginTop:2 }}>{k.v}</div></div>
                  ))}
                </div>
              </div>
              {modelSpec && (
                <div style={{ background:T.purpleGlow, border:`1px solid ${T.purple}33`, borderRadius:10, padding:14, marginBottom:12 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.purple, marginBottom:6 }}>🤖 AI Insights — {form.model}</div>
                  {modelSpec.aiInsights.map((ins,i)=><div key={i} style={{ display:"flex", gap:8, marginBottom:4 }}><span style={{ color:T.purple }}>•</span><span style={{ fontSize:12, color:T.textSub }}>{ins}</span></div>)}
                </div>
              )}
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14 }}>
                <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:8 }}>⚙️ Modules to be Initialized on Save</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                  {[{ mod:"Tyre Intelligence", desc:`${form.tyreCount||"—"} slots · ${form.tyreSource}`, icon:"🛞", ready:!!form.tyreCount },{ mod:"GPS Tracking", desc:"Added to live fleet", icon:"📍", ready:true },{ mod:"Maintenance", desc:"Service baseline set", icon:"🔧", ready:!!form.model },{ mod:"Compliance Alerts", desc:"Document alerts set", icon:"📄", ready:!!form.insuranceExp },{ mod:"P&L Tracking", desc:"Cost centre created", icon:"💰", ready:!!form.purchaseCost },{ mod:"Trip Assignment", desc:"Ready for trips", icon:"🚛", ready:!!form.regNo }].map(m=>(
                    <div key={m.mod} style={{ background:m.ready?T.greenGlow:T.bgCard, border:`1px solid ${m.ready?T.green:T.border}33`, borderRadius:8, padding:"10px 10px" }}>
                      <div style={{ fontSize:16, marginBottom:4 }}>{m.icon}</div>
                      <div style={{ fontSize:11, fontWeight:600, color:m.ready?T.green:T.textMuted }}>{m.mod}</div>
                      <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:22, paddingTop:14, borderTop:`1px solid ${T.border}` }}>
            <button className="btn btn-gh" onClick={()=>step>1?setStep(s=>s-1):onClose()}>{step===1?"Cancel":"← Back"}</button>
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ fontSize:11, color:T.textMuted, alignSelf:"center" }}>Step {step} of {TOTAL_STEPS}</div>
              <button className="btn" style={{ background:step===TOTAL_STEPS?T.green:T.accent, color:"#080B10", fontWeight:700 }} onClick={()=>step<TOTAL_STEPS?setStep(s=>s+1):(onSave&&onSave(form),onClose())}>
                {step===TOTAL_STEPS?"🚛 Save & Initialize Vehicle":"Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Vehicle Detail Panel ─────────────────────────────────────────────────────
const VehicleDetailPanel = ({ v, onClose }) => {
  const [dtab, setDtab] = useState("overview");
  const vtype = VEHICLE_SCHEMA.find(x => x.id===v.typeId);
  const complianceColor = (s) => s==="Valid"||s==="Paid"?T.green:s==="Expired"?T.red:T.orange;

  const MAINT_SCHEDULE = [
    { service:"Engine Oil Change",     due:`${(v.km+3200).toLocaleString()} km`,  interval:"10,000 km", status:"due-soon" },
    { service:"Air Filter",            due:`${(v.km+8400).toLocaleString()} km`,  interval:"20,000 km", status:"ok" },
    { service:"Gear Box Oil",          due:`${(v.km+22000).toLocaleString()} km`, interval:"40,000 km", status:"ok" },
    { service:"Tyre Rotation",         due:`${(v.km+2100).toLocaleString()} km`,  interval:"12,000 km", status:"due-soon" },
    { service:"Brake Adjustment",      due:`${(v.km+6300).toLocaleString()} km`,  interval:"15,000 km", status:"ok" },
    { service:"Clutch Inspection",     due:`${(v.km+44000).toLocaleString()} km`, interval:"80,000 km", status:"ok" },
  ];

  const pnl = { revenue: v.revenue||0, cost: v.cost||0 };
  const profit = pnl.revenue - pnl.cost;

  return (
    <div className="ov">
      <div className="modal" style={{ maxWidth:700, width:"100%" }}>
        <div className="mhdr" style={{ background:`linear-gradient(135deg,#0D1117,${vtype?.color||T.accent}22)`, borderBottom:`1px solid ${T.border}` }}>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <div style={{ fontSize:32 }}>{vtype?.icon}</div>
            <div>
              <div className="rj mono" style={{ fontSize:20, fontWeight:700, color:T.accent }}>{v.num}</div>
              <div style={{ fontSize:12, color:T.textSub }}>{v.model} · {v.make} {v.year} · {v.wheels}</div>
            </div>
          </div>
          <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
        </div>
        <div className="mbdy">
          {/* Status bar */}
          <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
            <span className={`badge ${v.status==="Active"?"bg":v.status==="On Trip"?"bb":"ba"}`}>{v.status}</span>
            <span className="badge" style={{ background:T.textMuted+"18", color:T.textMuted }}>{v.ownership}</span>
            <span className="badge" style={{ background:v.health>80?T.green+"18":T.orange+"18", color:v.health>80?T.green:T.orange }}>Health {v.health}%</span>
            <span className="badge bc">{v.km.toLocaleString()} km</span>
          </div>

          <div className="tabs" style={{ marginBottom:14 }}>
            {["overview","compliance","maintenance","financials"].map(t=>(
              <div key={t} className={`tab ${dtab===t?"on":""}`} onClick={()=>setDtab(t)} style={{ textTransform:"capitalize",fontSize:12 }}>{t}</div>
            ))}
          </div>

          {dtab==="overview" && (
            <div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:12 }}>
                {[
                  { l:"Make/Model", v:`${v.make} · ${v.model}` },
                  { l:"Year", v:v.year },
                  { l:"Wheels", v:v.wheels },
                  { l:"Fuel Eff.", v:v.fuel||"—" },
                  { l:"Purchase Cost", v:v.purchaseCost?`₹${(v.purchaseCost/100000).toFixed(1)}L`:"—" },
                  { l:"Purchase Date", v:v.purchaseDate||"—" },
                  { l:"Avg Speed", v:v.speed||"—" },
                  { l:"Odometer", v:`${v.km.toLocaleString()} km` },
                ].map(k => (
                  <div key={k.l} style={{ background:T.bgPanel, borderRadius:8, padding:"8px 10px" }}>
                    <div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div>
                    <div style={{ fontSize:11, fontWeight:600, marginTop:2 }}>{k.v}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:6 }}>Vehicle Health</div>
                <div className="pbar" style={{ height:10, marginBottom:6 }}>
                  <div className="pfill" style={{ width:`${v.health}%`, background:v.health>80?T.green:v.health>60?T.accent:T.red }} />
                </div>
              </div>
            </div>
          )}

          {dtab==="compliance" && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
              {[
                { doc:"🛡️ Insurance", status:v.insurance, note:"Renew 30 days before expiry" },
                { doc:"📋 FC Certificate", status:v.fc, note:"Mandatory for commercial ops" },
                { doc:"💰 Road Tax", status:v.tax, note:"Annual / lifetime as applicable" },
                { doc:"🌿 Pollution Cert.", status:"Valid", note:"Renew every 6 months" },
                { doc:"📜 National Permit", status:"Valid", note:"All-India permit" },
                { doc:"🔑 RC Book", status:"Valid", note:"Permanent registration document" },
              ].map(d => (
                <div key={d.doc} style={{ background:T.bgPanel, border:`1px solid ${complianceColor(d.status)}33`, borderRadius:8, padding:"10px 12px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontSize:12, fontWeight:600 }}>{d.doc}</span>
                    <span style={{ fontSize:11, fontWeight:700, color:complianceColor(d.status) }}>{d.status}</span>
                  </div>
                  <div style={{ fontSize:10, color:T.textMuted }}>{d.note}</div>
                </div>
              ))}
            </div>
          )}

          {dtab==="maintenance" && (
            <div>
              {MAINT_SCHEDULE.map(s => (
                <div key={s.service} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${T.border}22`, alignItems:"center" }}>
                  <div>
                    <div style={{ fontSize:12, fontWeight:500 }}>{s.service}</div>
                    <div style={{ fontSize:10, color:T.textMuted }}>Every {s.interval}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:11, color:T.textSub }}>Due at: {s.due}</div>
                    <span className={`badge ${s.status==="due-soon"?"bo":"bg"}`} style={{ fontSize:10 }}>{s.status==="due-soon"?"Due Soon":"OK"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {dtab==="financials" && (
            <div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:12 }}>
                {[
                  { l:"Total Revenue", v:`₹${(pnl.revenue/100000).toFixed(1)}L`, c:T.green },
                  { l:"Total Cost",    v:`₹${(pnl.cost/100000).toFixed(1)}L`,    c:T.red },
                  { l:"Net Profit",    v:`₹${(profit/100000).toFixed(1)}L`,       c:profit>0?T.accent:T.red },
                  { l:"Margin",        v:`${((profit/pnl.revenue)*100).toFixed(1)}%`, c:T.blue },
                  { l:"Cost per KM",   v:`₹${(pnl.cost/v.km).toFixed(2)}`,       c:T.orange },
                  { l:"Rev per KM",    v:`₹${(pnl.revenue/v.km).toFixed(2)}`,    c:T.green },
                ].map(k => (
                  <div key={k.l} style={{ background:T.bgPanel, borderRadius:8, padding:"10px 12px" }}>
                    <div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div>
                    <div style={{ fontSize:14, fontWeight:700, color:k.c, marginTop:2 }}>{k.v}</div>
                  </div>
                ))}
              </div>
              <div className="pbar" style={{ height:10 }}>
                <div className="pfill" style={{ width:`${(pnl.cost/pnl.revenue)*100}%`, background:T.red+"88" }} title="Cost" />
              </div>
              <div style={{ fontSize:10, color:T.textMuted, marginTop:4 }}>Cost vs Revenue ratio: {((pnl.cost/pnl.revenue)*100).toFixed(1)}%</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Vehicle Master Page ──────────────────────────────────────────────────────
const VehicleMasterPage = () => {
  const [showAdd, setShowAdd]   = useState(false);
  const [selVeh, setSelVeh]     = useState(null);
  const [fleet, setFleet]       = useState(FLEET_DATA);
  const [filterStatus, setFilterStatus] = useState("All");
  const complianceColor = (s) => s==="Valid"||s==="Paid"?T.green:s==="Expired"?T.red:T.orange;

  const handleSave = (form) => {
    const newVeh = {
      id:`VH-${String(fleet.length+1).padStart(3,"0")}`,
      num:form.regNo, typeId:"openbody", subtypeId:"openbody_std",
      wheels:`${form.tyreCount||"—"} Wheeler`,
      model:form.model, make:form.make, year:new Date(form.purchaseDate||Date.now()).getFullYear(),
      status:"Active", health:100, ownership:form.ownership,
      purchaseCost:parseInt(form.purchaseCost)||0,
      purchaseDate:form.purchaseDate,
      insurance:form.insuranceExp?"Valid":"Pending",
      fc:form.fcExp?"Valid":"Pending",
      tax:form.taxPaidDate?"Paid":"Pending",
      km:parseInt(form.odometer)||0,
      revenue:0, cost:0, fuel:form.fuel||"—", speed:"—",
    };
    setFleet(f => [newVeh, ...f]);
  };

  const filtered = filterStatus==="All" ? fleet : fleet.filter(v=>v.status===filterStatus);

  const complianceAlerts = fleet.filter(v =>
    v.insurance!=="Valid"||v.fc==="Expired"||v.tax!=="Paid"
  );

  return (
    <div>
      {showAdd   && <AddVehicleWizard  onClose={()=>setShowAdd(false)} onSave={handleSave} />}
      {selVeh    && <VehicleDetailPanel v={selVeh} onClose={()=>setSelVeh(null)} />}

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Vehicle Master & Compliance</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>Every lorry as a profit asset — smart onboarding · lifecycle · compliance · P&L</p>
        </div>
        <button className="btn btn-p" onClick={()=>setShowAdd(true)}><Ic n="plus" s={14} c="#080B10" /> Add Vehicle</button>
      </div>

      {/* KPI row */}
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(5,1fr)", marginBottom:18 }}>
        {[
          { l:"Total Fleet",    v:fleet.length,                              c:T.blue   },
          { l:"Active",         v:fleet.filter(v=>v.status==="Active").length, c:T.green  },
          { l:"On Trip",        v:fleet.filter(v=>v.status==="On Trip").length, c:T.accent },
          { l:"Maintenance",    v:fleet.filter(v=>v.status==="Maintenance").length, c:T.orange },
          { l:"Compliance Issues",v:complianceAlerts.length,                 c:T.red    },
        ].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}>
            <div className="stat-v" style={{ color:k.c }}>{k.v}</div>
            <div className="stat-l">{k.l}</div>
          </div>
        ))}
      </div>

      {/* Compliance alerts */}
      {complianceAlerts.length > 0 && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.orange}44`, background:T.orangeGlow }}>
          <div className="section-title" style={{ color:T.orange }}>🔔 Compliance Alerts — {complianceAlerts.length} vehicles need attention</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
            {[
              { veh:"TN59 AB1234", doc:"Insurance",    exp:"Expiring in 7d",  color:T.orange },
              { veh:"TN45 CD5678", doc:"FC Certificate",exp:"EXPIRED",        color:T.red    },
              { veh:"TN69 GH4789", doc:"Road Tax",     exp:"Due in 12d",      color:T.orange },
            ].map((a,i)=>(
              <div key={i} style={{ padding:10, background:T.bgCard, borderRadius:8, borderLeft:`3px solid ${a.color}`, cursor:"pointer" }}>
                <div className="mono" style={{ fontSize:11, color:T.accent }}>{a.veh}</div>
                <div style={{ fontSize:11, fontWeight:600, marginTop:2 }}>{a.doc}</div>
                <div style={{ fontSize:10, color:a.color, fontWeight:600, marginTop:2 }}>{a.exp}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter bar */}
      <div style={{ display:"flex", gap:8, marginBottom:12, alignItems:"center" }}>
        <div className="tabs" style={{ marginBottom:0 }}>
          {["All","Active","On Trip","Maintenance"].map(s=>(
            <div key={s} className={`tab ${filterStatus===s?"on":""}`} onClick={()=>setFilterStatus(s)} style={{ fontSize:12 }}>{s}</div>
          ))}
        </div>
      </div>

      {/* Fleet table */}
      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead>
            <tr>
              <th>Vehicle No</th><th>Type</th><th>Config</th><th>Make / Year</th>
              <th>KM</th><th>Health</th><th>Insurance</th><th>FC</th><th>Tax</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(v => {
              const vtype = VEHICLE_SCHEMA.find(x=>x.id===v.typeId);
              return (
                <tr key={v.id} style={{ cursor:"pointer" }} onClick={()=>setSelVeh(v)}>
                  <td className="mono" style={{ fontSize:11, color:T.accent, fontWeight:700 }}>{v.num}</td>
                  <td><span style={{ fontSize:18 }}>{vtype?.icon||"🚛"}</span></td>
                  <td style={{ fontSize:11 }}>{vtype?.label||"—"} · {v.wheels}</td>
                  <td style={{ fontSize:11 }}>{v.make} {v.year}</td>
                  <td className="mono" style={{ fontSize:11 }}>{v.km.toLocaleString()}</td>
                  <td>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <div className="pbar" style={{ width:46 }}><div className="pfill" style={{ width:`${v.health}%`, background:v.health>80?T.green:v.health>60?T.accent:T.red }} /></div>
                      <span style={{ fontSize:11, color:v.health>80?T.green:v.health>60?T.accent:T.red }}>{v.health}%</span>
                    </div>
                  </td>
                  <td><span style={{ fontSize:11, fontWeight:600, color:complianceColor(v.insurance) }}>{v.insurance}</span></td>
                  <td><span style={{ fontSize:11, fontWeight:600, color:complianceColor(v.fc) }}>{v.fc}</span></td>
                  <td><span style={{ fontSize:11, fontWeight:600, color:complianceColor(v.tax) }}>{v.tax}</span></td>
                  <td><span className={`badge ${v.status==="Active"?"bg":v.status==="On Trip"?"bb":"ba"}`}>{v.status}</span></td>
                  <td onClick={e=>e.stopPropagation()}>
                    <button className="btn" style={{ fontSize:10, padding:"3px 8px", background:T.accentGlow, color:T.accent, border:`1px solid ${T.accent}33` }} onClick={()=>setSelVeh(v)}>View →</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════════════════════
// DRIVER ONBOARDING — AI-POWERED 5-STEP WIZARD + FULL DRIVERS PAGE
// ═══════════════════════════════════════════════════════════════════════════════

const CDL_CATEGORIES = [
  { id:"LMV",   label:"LMV — Light Motor Vehicle",     icon:"🚗", vehicles:"Cars, LCVs, pickups up to 7.5T",         minExp:0  },
  { id:"MCWG",  label:"MCWG — Motorcycle with Gear",   icon:"🏍️", vehicles:"Motorcycles and 3-wheelers",             minExp:0  },
  { id:"HMV",   label:"HMV — Heavy Motor Vehicle",     icon:"🚛", vehicles:"Trucks, buses, heavy vehicles > 12T",    minExp:2  },
  { id:"HTV",   label:"HTV — Heavy Transport Vehicle", icon:"🚚", vehicles:"Tankers, trailers, multi-axle trucks",   minExp:3  },
  { id:"TRANS", label:"Transport Vehicle",             icon:"🚌", vehicles:"Commercial transport, school bus",        minExp:1  },
];

const ROUTE_EXPERTISE = [
  "Chennai — Bangalore (NH-48)",
  "Chennai — Mumbai (NH-44)",
  "Chennai — Hyderabad (NH-65)",
  "Coimbatore — Bangalore (NH-948)",
  "Chennai — Delhi (long haul)",
  "Tamil Nadu state routes",
  "Karnataka state routes",
  "Rajasthan / Gujarat desert routes",
  "Himalayan / mountain routes",
];

const LOAD_EXPERTISE = [
  { id:"fmcg",      label:"FMCG / Consumer Goods", icon:"📦" },
  { id:"cement",    label:"Cement / Sand / Bulk",   icon:"🏗️" },
  { id:"steel",     label:"Steel / Metals",         icon:"⚙️" },
  { id:"chemicals", label:"Chemicals / Hazmat",     icon:"⚗️" },
  { id:"perishable",label:"Perishable / Cold Chain", icon:"❄️" },
  { id:"machinery", label:"Heavy Machinery",        icon:"🏭" },
];

function aiDriverRiskScore(form) {
  let risk = "low"; let score = 100; let flags = [];
  const exp = parseInt(form.expYears)||0;
  const licenseExp = new Date(form.licenseExp);
  const today = new Date();
  const daysToExp = Math.floor((licenseExp - today) / 86400000);
  if (exp < 1)  { score -= 30; flags.push("Less than 1 year experience"); }
  else if (exp < 2) { score -= 15; flags.push("Under 2 years experience"); }
  if (daysToExp < 0)  { score -= 40; flags.push("License EXPIRED"); }
  else if (daysToExp < 90) { score -= 20; flags.push("License expiring within 90 days"); }
  if (form.accidentHistory==="Yes — 1") { score -= 15; flags.push("1 prior accident on record"); }
  if (form.accidentHistory==="Yes — 2+") { score -= 30; flags.push("2+ accidents — high risk"); }
  if (!form.mobileVerified) { score -= 10; flags.push("Mobile not yet verified"); }
  if (score >= 80) risk = "low";
  else if (score >= 55) risk = "medium";
  else risk = "high";
  return { risk, score: Math.max(score, 0), flags };
}

const AddDriverWizard = ({ onClose, onSave }) => {
  const STEPS = ["Identity","License & Docs","Skill & Category","Risk Profile","Review & Activate"];
  const [step, setStep] = useState(1);
  const [mobileOtp, setMobileOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [form, setForm] = useState({
    name:"", dob:"", mobile:"", altMobile:"", emergencyContact:"", emergencyName:"",
    mobileVerified:false,
    licenseNo:"", licenseType:"HMV", licenseExp:"", licenseState:"Tamil Nadu",
    aadharNo:"", address:"", city:"", state:"Tamil Nadu", pincode:"",
    accidentHistory:"None", prevEmployer:"", yearsWithPrev:"",
    category:"HMV", expYears:"", knownRoutes:[], loadExpertise:[],
    vehiclePref:"Truck", nightDriving:"Yes", longHaul:"Yes",
    assignedVehicle:"", poolDriver:false, driverType:"Permanent",
    // Document uploads — store {name, size, type} from File objects
    docLicFront:null, docLicBack:null, docAadhaar:null, docMedical:null, docPhoto:null, docExperience:null,
  });
  const rf = (k,v) => setForm(f=>({...f,[k]:v}));
  const toggleArr = (k, val) => setForm(f=>({ ...f, [k]: f[k].includes(val) ? f[k].filter(x=>x!==val) : [...f[k],val] }));

  const aiRisk = aiDriverRiskScore(form);
  const licExpColor = form.licenseExp ? (new Date(form.licenseExp) < new Date() ? T.red : (new Date(form.licenseExp) - new Date() < 90*86400000 ? T.orange : T.green)) : T.textMuted;
  const selCDL = CDL_CATEGORIES.find(c=>c.id===form.licenseType);

  const StepDot = ({ n, label }) => (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
      <div style={{ display:"flex", alignItems:"center", width:"100%" }}>
        {n>1 && <div style={{ flex:1, height:2, background:step>n-1?T.green:T.border }} />}
        <div style={{ width:26, height:26, borderRadius:"50%", background:step===n?"#1D4ED8":step>n?T.green:T.bgPanel, border:`2px solid ${step===n?"#1D4ED8":step>n?T.green:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:"#fff", margin:"0 auto", transition:"all .2s" }}>
          {step>n?"✓":n}
        </div>
        {n<5 && <div style={{ flex:1, height:2, background:step>n?T.green:T.border }} />}
      </div>
      <div style={{ fontSize:8, color:step===n?T.blue:T.textMuted, textAlign:"center", whiteSpace:"nowrap" }}>{label}</div>
    </div>
  );
  const FR = ({ children, cols=2 }) => (<div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap:12, marginBottom:12 }}>{children}</div>);
  const F = ({ label, children, hint }) => (<div><label className="flabel">{label}</label>{children}{hint&&<div style={{ fontSize:10, color:T.textMuted, marginTop:3 }}>{hint}</div>}</div>);

  return (
    <div className="ov" style={{ alignItems:"flex-start", paddingTop:20, overflowY:"auto" }}>
      <div className="modal" style={{ maxWidth:680, width:"100%", margin:"0 auto" }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#0C1220,#1E3A5F,#1D4ED822)", borderBottom:`1px solid ${T.blue}33` }}>
          <div>
            <div className="rj" style={{ fontSize:20, fontWeight:700, color:T.blue }}>👤 Driver Onboarding</div>
            <div style={{ fontSize:11, color:T.textSub, marginTop:2 }}>Identity · License · Skills · AI Risk Profile · Activate</div>
          </div>
          <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
        </div>
        <div className="mbdy">
          <div style={{ display:"flex", marginBottom:22 }}>
            {STEPS.map((s,i) => <StepDot key={s} n={i+1} label={s} />)}
          </div>

          {/* STEP 1 — Identity */}
          {step===1 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.blue, marginBottom:16 }}>Step 1 — Basic Identity Details</div>
              <FR cols={2}>
                <F label="Full Name *"><input value={form.name} onChange={e=>rf("name",e.target.value)} placeholder="Mani Kumar" /></F>
                <F label="Date of Birth *"><input type="date" value={form.dob} onChange={e=>rf("dob",e.target.value)} /></F>
              </FR>
              <FR cols={2}>
                <F label="Mobile Number *" hint="OTP verification required">
                  <div style={{ display:"flex", gap:8 }}>
                    <input value={form.mobile} onChange={e=>rf("mobile",e.target.value)} placeholder="+91 98765 43210" style={{ flex:1 }} />
                    {!form.mobileVerified && <button className="btn bb" style={{ fontSize:11, padding:"5px 10px", whiteSpace:"nowrap" }} onClick={()=>setOtpSent(true)}>Send OTP</button>}
                    {form.mobileVerified && <span style={{ fontSize:11, color:T.green, alignSelf:"center" }}>✅ Verified</span>}
                  </div>
                </F>
                <F label="Alternate Number"><input value={form.altMobile} onChange={e=>rf("altMobile",e.target.value)} placeholder="+91 87654 32109" /></F>
              </FR>
              {otpSent && !form.mobileVerified && (
                <div style={{ background:T.blueGlow, border:`1px solid ${T.blue}33`, borderRadius:8, padding:12, marginBottom:12 }}>
                  <div style={{ fontSize:11, color:T.blue, marginBottom:8 }}>📲 OTP sent to {form.mobile}. Enter 6-digit code:</div>
                  <div style={{ display:"flex", gap:8 }}>
                    <input value={mobileOtp} onChange={e=>setMobileOtp(e.target.value)} placeholder="_ _ _ _ _ _" style={{ width:140, fontFamily:"'JetBrains Mono',monospace", letterSpacing:8, fontSize:16, fontWeight:700 }} maxLength={6} />
                    <button className="btn" style={{ background:T.green, color:"#fff" }} onClick={()=>{ if(mobileOtp.length===6){ rf("mobileVerified",true); setOtpSent(false); } }}>Verify</button>
                  </div>
                  <div style={{ fontSize:10, color:T.textMuted, marginTop:6 }}>Demo: enter any 6-digit code to verify</div>
                </div>
              )}
              <FR cols={2}>
                <F label="Emergency Contact Name"><input value={form.emergencyName} onChange={e=>rf("emergencyName",e.target.value)} placeholder="Wife / Brother" /></F>
                <F label="Emergency Contact Number"><input value={form.emergencyContact} onChange={e=>rf("emergencyContact",e.target.value)} placeholder="+91 77777 88888" /></F>
              </FR>
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:8, padding:12 }}>
                <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:8 }}>Current Address</div>
                <FR cols={1}>
                  <F label="Address"><input value={form.address} onChange={e=>rf("address",e.target.value)} placeholder="123, Anna Nagar, Chennai" /></F>
                </FR>
                <FR cols={3}>
                  <F label="City"><input value={form.city} onChange={e=>rf("city",e.target.value)} placeholder="Chennai" /></F>
                  <F label="State"><select value={form.state} onChange={e=>rf("state",e.target.value)}>{["Tamil Nadu","Karnataka","Andhra Pradesh","Maharashtra","Delhi","Gujarat","Rajasthan","UP","West Bengal","MP"].map(s=><option key={s}>{s}</option>)}</select></F>
                  <F label="PIN Code"><input value={form.pincode} onChange={e=>rf("pincode",e.target.value)} placeholder="600001" maxLength={6} /></F>
                </FR>
              </div>
            </div>
          )}

          {/* STEP 2 — License & Documents */}
          {step===2 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.blue, marginBottom:16 }}>Step 2 — Driving License, Identity & Document Upload</div>

              {/* License Number + State */}
              <FR cols={2}>
                <F label="License Number *"><input value={form.licenseNo} onChange={e=>rf("licenseNo",e.target.value.toUpperCase())} placeholder="TN2020 1234567" style={{ fontFamily:"'JetBrains Mono',monospace", letterSpacing:1 }} /></F>
                <F label="Issuing State"><select value={form.licenseState} onChange={e=>rf("licenseState",e.target.value)}>{["Tamil Nadu","Karnataka","Andhra Pradesh","Maharashtra","Delhi","Gujarat","Rajasthan","UP","West Bengal","MP"].map(s=><option key={s}>{s}</option>)}</select></F>
              </FR>

              {/* License Class */}
              <div style={{ marginBottom:12 }}>
                <label className="flabel">License Type / Class *</label>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:6 }}>
                  {CDL_CATEGORIES.map(c=>(
                    <div key={c.id} onClick={()=>rf("licenseType",c.id)} style={{ padding:"10px 12px", borderRadius:9, cursor:"pointer", border:`2px solid ${form.licenseType===c.id?T.blue:T.border}`, background:form.licenseType===c.id?T.blueGlow:T.bgPanel }}>
                      <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                        <span style={{ fontSize:18 }}>{c.icon}</span>
                        <div>
                          <div style={{ fontSize:11, fontWeight:700, color:form.licenseType===c.id?T.blue:T.text }}>{c.label}</div>
                          <div style={{ fontSize:10, color:T.textMuted }}>{c.vehicles}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expiry + Aadhaar */}
              <FR cols={2}>
                <F label="License Expiry Date *">
                  <div>
                    <input type="date" value={form.licenseExp} onChange={e=>rf("licenseExp",e.target.value)} style={{ borderColor:licExpColor+"66" }} />
                    {form.licenseExp && (
                      <div style={{ fontSize:11, color:licExpColor, marginTop:4, fontWeight:600 }}>
                        {new Date(form.licenseExp) < new Date() ? "❌ EXPIRED — cannot onboard"
                          : (new Date(form.licenseExp)-new Date()) < 90*86400000 ? "⚠️ Expiring within 90 days"
                          : "✅ Valid"}
                      </div>
                    )}
                  </div>
                </F>
                <F label="Aadhaar Number" hint="Last 4 digits used for verification"><input value={form.aadharNo} onChange={e=>rf("aadharNo",e.target.value)} placeholder="XXXX XXXX 1234" maxLength={14} /></F>
              </FR>

              {/* ── Document Upload Section ── */}
              <div style={{ background:T.bgPanel, border:`1px solid ${T.blue}33`, borderRadius:10, padding:14, marginBottom:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.blue, marginBottom:4 }}>📎 Document Upload</div>
                <div style={{ fontSize:11, color:T.textMuted, marginBottom:12 }}>Upload clear photos or scanned copies. Supported: JPG, PNG, PDF. Max 5MB per file.</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {[
                    { key:"docLicFront",   label:"Driving License — Front *", icon:"🪪", required:true,  hint:"Front side showing name, photo, validity" },
                    { key:"docLicBack",    label:"Driving License — Back",    icon:"🪪", required:false, hint:"Back side showing vehicle classes" },
                    { key:"docAadhaar",    label:"Aadhaar Card",              icon:"🆔", required:true,  hint:"Front or both sides" },
                    { key:"docMedical",    label:"Medical Fitness Certificate",icon:"🏥", required:false, hint:"Form 1A or equivalent fitness cert" },
                    { key:"docPhoto",      label:"Passport Size Photo",       icon:"👤", required:true,  hint:"Recent colour photo, white background" },
                    { key:"docExperience", label:"Experience / NOC Letter",   icon:"📄", required:false, hint:"From previous employer (if available)" },
                  ].map(doc => {
                    const uploaded = form[doc.key];
                    return (
                      <div key={doc.key} style={{ background:T.bgCard, border:`1px solid ${uploaded?T.green:doc.required?T.border:T.border}`, borderRadius:8, padding:"10px 12px", transition:"border-color .15s" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                          <div>
                            <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                              <span style={{ fontSize:14 }}>{doc.icon}</span>
                              <span style={{ fontSize:11, fontWeight:600 }}>{doc.label}</span>
                              {doc.required && <span style={{ fontSize:9, color:T.red, background:T.red+"18", padding:"1px 5px", borderRadius:10, fontWeight:700 }}>REQ</span>}
                            </div>
                            <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>{doc.hint}</div>
                          </div>
                          {uploaded && (
                            <button onClick={()=>rf(doc.key,null)} style={{ background:"none", border:"none", cursor:"pointer", color:T.red, fontSize:14, padding:0 }}>✕</button>
                          )}
                        </div>
                        {uploaded ? (
                          <div style={{ display:"flex", gap:6, alignItems:"center", padding:"6px 8px", background:T.greenGlow, borderRadius:6 }}>
                            <span style={{ fontSize:14 }}>✅</span>
                            <div>
                              <div style={{ fontSize:11, color:T.green, fontWeight:600 }}>{uploaded.name}</div>
                              <div style={{ fontSize:10, color:T.textMuted }}>{uploaded.size ? `${(uploaded.size/1024).toFixed(0)} KB` : "Uploaded"}</div>
                            </div>
                          </div>
                        ) : (
                          <label style={{ display:"block", cursor:"pointer" }}>
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png,.pdf"
                              style={{ display:"none" }}
                              onChange={e => {
                                const file = e.target.files?.[0];
                                if (file) rf(doc.key, { name:file.name, size:file.size, type:file.type });
                              }}
                            />
                            <div style={{ border:`2px dashed ${T.border}`, borderRadius:6, padding:"8px 10px", textAlign:"center", fontSize:11, color:T.textMuted, cursor:"pointer" }}
                              onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderColor=T.blue;}}
                              onDragLeave={e=>{e.currentTarget.style.borderColor=T.border;}}
                              onDrop={e=>{
                                e.preventDefault();
                                e.currentTarget.style.borderColor=T.border;
                                const file = e.dataTransfer.files?.[0];
                                if (file) rf(doc.key, { name:file.name, size:file.size, type:file.type });
                              }}
                            >
                              <div style={{ fontSize:18, marginBottom:2 }}>📁</div>
                              <div>Click or drag to upload</div>
                              <div style={{ fontSize:9, marginTop:1 }}>JPG · PNG · PDF</div>
                            </div>
                          </label>
                        )}
                      </div>
                    );
                  })}
                </div>
                {/* Upload completeness */}
                <div style={{ marginTop:12, display:"flex", gap:8, alignItems:"center" }}>
                  {(() => {
                    const required = ["docLicFront","docAadhaar","docPhoto"];
                    const done = required.filter(k=>form[k]).length;
                    const pct = Math.round((done/required.length)*100);
                    return (
                      <>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:T.textMuted, marginBottom:4 }}>
                            <span>Mandatory docs uploaded</span>
                            <span>{done}/{required.length}</span>
                          </div>
                          <div className="pbar" style={{ height:5 }}><div className="pfill" style={{ width:`${pct}%`, background:pct===100?T.green:T.orange }} /></div>
                        </div>
                        <span className={`badge ${pct===100?"bg":"bo"}`} style={{ fontSize:10 }}>{pct===100?"All done":"Pending"}</span>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Work history */}
              <FR cols={2}>
                <F label="Previous Employer (if any)"><input value={form.prevEmployer} onChange={e=>rf("prevEmployer",e.target.value)} placeholder="ABC Transport, Chennai" /></F>
                <F label="Years with Previous Employer"><input value={form.yearsWithPrev} onChange={e=>rf("yearsWithPrev",e.target.value)} placeholder="3" /></F>
              </FR>
              <F label="Accident History">
                <select value={form.accidentHistory} onChange={e=>rf("accidentHistory",e.target.value)}>
                  <option>None</option>
                  <option>Yes — 1</option>
                  <option>Yes — 2+</option>
                </select>
              </F>

              {/* AI license check */}
              {form.licenseNo && form.licenseExp && (
                <div style={{ background:T.blue+"12", border:`1px solid ${T.blue}33`, borderRadius:8, padding:10, marginTop:10 }}>
                  <div style={{ fontSize:11, color:T.blue, fontWeight:700 }}>🤖 License Validation Preview</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8, fontSize:11 }}>
                    <div>Format: <strong style={{ color:T.text }}>{form.licenseNo.length >= 10 ? "✅ Looks valid" : "⚠️ Check format"}</strong></div>
                    <div>Class: <strong style={{ color:T.text }}>{selCDL?.label||"—"}</strong></div>
                    <div>Min. experience required: <strong style={{ color:T.accent }}>{selCDL?.minExp||0} years</strong></div>
                    <div>Expiry status: <strong style={{ color:licExpColor }}>{form.licenseExp ? (new Date(form.licenseExp)>new Date()?"✅ Valid":"❌ Expired") : "Not entered"}</strong></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3 — Skill & Category */}
          {step===3 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.blue, marginBottom:16 }}>Step 3 — Driver Skills, Category & Assignment</div>
              <FR cols={3}>
                <F label="Years of Experience *"><input value={form.expYears} onChange={e=>rf("expYears",e.target.value)} placeholder="5" type="number" /></F>
                <F label="Driver Category (AI Suggested)"><select value={form.category} onChange={e=>rf("category",e.target.value)}><option>LCV</option><option>HCV</option><option>HTV</option><option>Tanker</option><option>Trailer</option></select></F>
                <F label="Vehicle Preference"><select value={form.vehiclePref} onChange={e=>rf("vehiclePref",e.target.value)}><option>Truck</option><option>Trailer</option><option>Tanker</option><option>Container</option><option>LCV</option></select></F>
              </FR>
              <FR cols={2}>
                <F label="Night Driving"><select value={form.nightDriving} onChange={e=>rf("nightDriving",e.target.value)}><option>Yes</option><option>No</option></select></F>
                <F label="Long Haul (800+ km)"><select value={form.longHaul} onChange={e=>rf("longHaul",e.target.value)}><option>Yes</option><option>No</option></select></F>
              </FR>
              <div style={{ marginBottom:14 }}>
                <label className="flabel">Known Routes (select all that apply)</label>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:6 }}>
                  {ROUTE_EXPERTISE.map(r=>(
                    <div key={r} onClick={()=>toggleArr("knownRoutes",r)} style={{ padding:"5px 10px", borderRadius:20, cursor:"pointer", fontSize:11, border:`1.5px solid ${form.knownRoutes.includes(r)?T.accent:T.border}`, background:form.knownRoutes.includes(r)?T.accentGlow:T.bgPanel, color:form.knownRoutes.includes(r)?T.accent:T.textSub, transition:"all .12s" }}>
                      {form.knownRoutes.includes(r)?"✓ ":""}{r}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom:14 }}>
                <label className="flabel">Load Handling Expertise</label>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginTop:6 }}>
                  {LOAD_EXPERTISE.map(l=>(
                    <div key={l.id} onClick={()=>toggleArr("loadExpertise",l.id)} style={{ padding:"8px 10px", borderRadius:8, cursor:"pointer", border:`2px solid ${form.loadExpertise.includes(l.id)?T.accent:T.border}`, background:form.loadExpertise.includes(l.id)?T.accentGlow:T.bgPanel, transition:"all .12s", display:"flex", gap:8, alignItems:"center" }}>
                      <span style={{ fontSize:16 }}>{l.icon}</span>
                      <span style={{ fontSize:11, fontWeight:form.loadExpertise.includes(l.id)?600:400, color:form.loadExpertise.includes(l.id)?T.accent:T.text }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <FR cols={2}>
                <F label="Assign Primary Vehicle (optional)"><select value={form.assignedVehicle} onChange={e=>rf("assignedVehicle",e.target.value)}><option value="">Pool Driver (no fixed vehicle)</option>{FLEET_DATA.map(v=><option key={v.id}>{v.num} — {v.model}</option>)}</select></F>
                <F label="Driver Type"><div style={{ display:"flex", gap:10, marginTop:4 }}>{[["Permanent","🏆"],["Contract","📋"],["Daily Wage","💰"]].map(([t,e])=><div key={t} onClick={()=>rf("driverType",t)} style={{ flex:1, padding:"8px 10px", borderRadius:8, cursor:"pointer", textAlign:"center", border:`2px solid ${form.driverType===t?T.accent:T.border}`, background:form.driverType===t?T.accentGlow:T.bgPanel, fontSize:11, fontWeight:form.driverType===t?600:400, color:form.driverType===t?T.accent:T.text }}>{e} {t}</div>)}</div></F>
              </FR>
            </div>
          )}

          {/* STEP 4 — AI Risk Profile */}
          {step===4 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.blue, marginBottom:16 }}>Step 4 — AI Risk Profile & Scoring</div>
              <div style={{ background:aiRisk.risk==="low"?T.greenGlow:aiRisk.risk==="medium"?T.orangeGlow:T.redGlow, border:`1px solid ${aiRisk.risk==="low"?T.green:aiRisk.risk==="medium"?T.orange:T.red}44`, borderRadius:12, padding:18, marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:aiRisk.risk==="low"?T.green:aiRisk.risk==="medium"?T.orange:T.red }}>
                      {aiRisk.risk==="low"?"✅":"aiRisk.risk"==="medium"?"⚠️":"🚨"} Risk Level: {aiRisk.risk.toUpperCase()}
                    </div>
                    <div style={{ fontSize:11, color:T.textSub, marginTop:3 }}>AI Onboarding Score: {aiRisk.score}/100</div>
                  </div>
                  <div style={{ width:60, height:60, borderRadius:"50%", background:T.bgCard, border:`4px solid ${aiRisk.risk==="low"?T.green:aiRisk.risk==="medium"?T.orange:T.red}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span className="rj" style={{ fontSize:20, fontWeight:700, color:aiRisk.risk==="low"?T.green:aiRisk.risk==="medium"?T.orange:T.red }}>{aiRisk.score}</span>
                  </div>
                </div>
                <div className="pbar" style={{ height:8, marginBottom:10 }}>
                  <div className="pfill" style={{ width:`${aiRisk.score}%`, background:aiRisk.risk==="low"?T.green:aiRisk.risk==="medium"?T.orange:T.red }} />
                </div>
                {aiRisk.flags.length > 0 && (
                  <div>
                    <div style={{ fontSize:11, color:T.textSub, marginBottom:6 }}>Risk Flags:</div>
                    {aiRisk.flags.map((f,i)=>(
                      <div key={i} style={{ display:"flex", gap:6, alignItems:"center", marginBottom:4 }}>
                        <span style={{ color:T.orange }}>⚠️</span>
                        <span style={{ fontSize:11, color:T.textSub }}>{f}</span>
                      </div>
                    ))}
                  </div>
                )}
                {aiRisk.flags.length === 0 && <div style={{ fontSize:12, color:T.green }}>✅ No risk flags — clean profile</div>}
              </div>

              {/* Category suitability */}
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginBottom:12 }}>
                <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:8 }}>🤖 AI Category Suitability</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  {[
                    { label:"Long Haul Trips",        suitable:form.longHaul==="Yes" && parseInt(form.expYears)>=2, reason:"Requires 2+ years + night driving" },
                    { label:"Night Driving",            suitable:form.nightDriving==="Yes",                           reason:"Self-declared night driving capable" },
                    { label:"Heavy Load (HCV/HTV)",    suitable:["HMV","HTV"].includes(form.licenseType),            reason:"License class must be HMV or HTV" },
                    { label:"Hazmat / Chemical Load",  suitable:form.loadExpertise.includes("chemicals"),           reason:"Requires hazmat handling experience" },
                  ].map(s=>(
                    <div key={s.label} style={{ background:T.bgCard, border:`1px solid ${s.suitable?T.green:T.border}33`, borderRadius:8, padding:"8px 10px" }}>
                      <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:3 }}>
                        <span style={{ fontSize:12 }}>{s.suitable?"✅":"❌"}</span>
                        <span style={{ fontSize:12, fontWeight:600, color:s.suitable?T.green:T.textMuted }}>{s.label}</span>
                      </div>
                      <div style={{ fontSize:10, color:T.textMuted }}>{s.reason}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scoring breakdown */}
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14 }}>
                <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:8 }}>Scoring Factors</div>
                {[
                  { factor:"Experience", score:Math.min((parseInt(form.expYears)||0)*10,30), max:30 },
                  { factor:"Mobile Verification", score:form.mobileVerified?15:0, max:15 },
                  { factor:"License Validity", score:form.licenseExp&&new Date(form.licenseExp)>new Date()?25:0, max:25 },
                  { factor:"Clean Accident History", score:form.accidentHistory==="None"?20:form.accidentHistory==="Yes — 1"?10:0, max:20 },
                  { factor:"Route Expertise", score:Math.min(form.knownRoutes.length*2,10), max:10 },
                ].map(s=>(
                  <div key={s.factor} style={{ marginBottom:8 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:3 }}>
                      <span style={{ color:T.textSub }}>{s.factor}</span>
                      <span style={{ color:T.accent }}>{s.score}/{s.max}</span>
                    </div>
                    <div className="pbar" style={{ height:4 }}><div className="pfill" style={{ width:`${(s.score/s.max)*100}%`, background:s.score>=s.max*0.8?T.green:s.score>=s.max*0.5?T.orange:T.red }} /></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5 — Review & Activate */}
          {step===5 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:16 }}>Step 5 — Review & Activate Driver</div>
              {/* Validation */}
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:8 }}>🔍 Onboarding Validation</div>
                <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                  {[
                    { check:"Full name entered", pass:form.name.length>=2 },
                    { check:`Mobile ${form.mobileVerified?"verified ✅":"not yet verified — OTP required"}`, pass:form.mobileVerified },
                    { check:"License number entered", pass:form.licenseNo.length>=8 },
                    { check:`License expiry — ${form.licenseExp?new Date(form.licenseExp)>new Date()?"Valid":"EXPIRED (cannot activate)":"Not entered"}`, pass:!!form.licenseExp&&new Date(form.licenseExp)>new Date() },
                    { check:`License front photo ${form.docLicFront?"uploaded ✅":"not uploaded — required"}`, pass:!!form.docLicFront },
                    { check:`Aadhaar card ${form.docAadhaar?"uploaded ✅":"not uploaded — required"}`, pass:!!form.docAadhaar },
                    { check:`Passport photo ${form.docPhoto?"uploaded ✅":"not uploaded — required"}`, pass:!!form.docPhoto },
                    { check:"Address captured", pass:!!form.address },
                    { check:"Experience years entered", pass:!!form.expYears },
                    { check:`AI risk score: ${aiRisk.score}/100 — ${aiRisk.risk.toUpperCase()}`, pass:aiRisk.risk!=="high" },
                  ].map((v,i)=>(
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"5px 10px", borderRadius:6, background:v.pass?T.greenGlow:T.redGlow }}>
                      <span style={{ fontSize:12 }}>{v.pass?"✅":"❌"}</span>
                      <span style={{ fontSize:12, color:v.pass?T.green:T.red }}>{v.check}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Profile summary card */}
              <div style={{ background:T.bgPanel, border:`1px solid ${T.blue}33`, borderRadius:12, padding:16, marginBottom:12 }}>
                <div style={{ display:"flex", gap:14, alignItems:"flex-start", marginBottom:14 }}>
                  <div style={{ width:52, height:52, borderRadius:"50%", background:T.blue+"22", border:`2px solid ${T.blue}44`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span className="rj" style={{ fontSize:22, color:T.blue }}>{form.name.charAt(0)||"D"}</span>
                  </div>
                  <div>
                    <div className="rj" style={{ fontSize:18, fontWeight:700 }}>{form.name||"Driver Name"}</div>
                    <div style={{ fontSize:12, color:T.textSub, marginTop:2 }}>{form.mobile} {form.mobileVerified?"📱✅":""} · {form.city||"—"}, {form.state}</div>
                    <div style={{ display:"flex", gap:6, marginTop:5 }}>
                      <span className={`badge ${aiRisk.risk==="low"?"bg":aiRisk.risk==="medium"?"bo":"br"}`}>Risk: {aiRisk.risk}</span>
                      <span className="badge bb">{form.licenseType||"HMV"}</span>
                      <span className="badge ba">{form.category||"HCV"} Driver</span>
                      {form.longHaul==="Yes" && <span className="badge bc">Long Haul</span>}
                    </div>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:7 }}>
                  {[
                    { l:"License No", v:form.licenseNo||"—" },
                    { l:"License Expiry", v:form.licenseExp||"—" },
                    { l:"Experience", v:form.expYears?(form.expYears+" years"):"—" },
                    { l:"Known Routes", v:form.knownRoutes.length+" routes" },
                    { l:"Load Expertise", v:form.loadExpertise.length+" types" },
                    { l:"Assigned Vehicle", v:form.assignedVehicle||"Pool" },
                    { l:"Docs Uploaded", v:`${[form.docLicFront,form.docLicBack,form.docAadhaar,form.docMedical,form.docPhoto,form.docExperience].filter(Boolean).length}/6 files` },
                    { l:"Mandatory Docs", v:[form.docLicFront,form.docAadhaar,form.docPhoto].every(Boolean)?"✅ Complete":"⚠️ Pending" },
                    { l:"Driver Type", v:form.driverType||"Permanent" },
                  ].map(k=>(
                    <div key={k.l} style={{ background:T.bgCard, borderRadius:7, padding:"7px 10px" }}>
                      <div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div>
                      <div style={{ fontSize:11, fontWeight:600, marginTop:2, color:k.l==="Mandatory Docs"?(k.v.includes("✅")?T.green:T.orange):T.text }}>{k.v}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Modules initialized */}
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14 }}>
                <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:8 }}>⚙️ Modules Activated on Save</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                  {[
                    { mod:"Driver Profile",    icon:"👤", ready:!!form.name },
                    { mod:"Mobile Alerts",     icon:"📱", ready:form.mobileVerified },
                    { mod:"GPS Assignment",    icon:"📍", ready:!!form.assignedVehicle },
                    { mod:"Trip Eligibility",  icon:"🚛", ready:!!form.licenseExp&&new Date(form.licenseExp)>new Date() },
                    { mod:"Scoring Engine",    icon:"⭐", ready:true },
                    { mod:"Settlement Module", icon:"💰", ready:true },
                  ].map(m=>(
                    <div key={m.mod} style={{ background:m.ready?T.greenGlow:T.bgCard, border:`1px solid ${m.ready?T.green:T.border}33`, borderRadius:8, padding:"9px 10px" }}>
                      <div style={{ fontSize:16, marginBottom:3 }}>{m.icon}</div>
                      <div style={{ fontSize:11, fontWeight:600, color:m.ready?T.green:T.textMuted }}>{m.mod}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:22, paddingTop:14, borderTop:`1px solid ${T.border}` }}>
            <button className="btn btn-gh" onClick={()=>step>1?setStep(s=>s-1):onClose()}>{step===1?"Cancel":"← Back"}</button>
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ fontSize:11, color:T.textMuted, alignSelf:"center" }}>Step {step} of 5</div>
              <button className="btn" style={{ background:step===5?T.green:T.blue, color:"#fff", fontWeight:700 }} onClick={()=>step<5?setStep(s=>s+1):(onSave&&onSave(form),onClose())}>
                {step===5?"👤 Activate Driver":"Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DriversPage = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [selDriver, setSelDriver] = useState(null);
  const [drivers, setDrivers] = useState(DRIVERS_DATA);
  const [filterStatus, setFilterStatus] = useState("All");

  const handleSave = (form) => {
    const newD = {
      id:`DRV-${String(drivers.length+1).padStart(3,"0")}`,
      name:form.name, phone:form.mobile, cdl:form.licenseType||"HMV",
      score:aiDriverRiskScore(form).score,
      status:"Available", advanceBalance:0, totalTrips:0,
      kmDriven:0, licenseExp:form.licenseExp,
      category:form.category, expYears:form.expYears,
      risk:aiDriverRiskScore(form).risk,
      routes:form.knownRoutes, loads:form.loadExpertise,
      vehicle:form.assignedVehicle||"Pool",
      docLicFront:form.docLicFront, docLicBack:form.docLicBack,
      docAadhaar:form.docAadhaar, docMedical:form.docMedical,
      docPhoto:form.docPhoto, docExperience:form.docExperience,
    };
    setDrivers(d=>[newD,...d]);
  };

  const filtered = filterStatus==="All" ? drivers : drivers.filter(d=>d.status===filterStatus);
  const highRisk = drivers.filter(d=>d.score<65);
  const licExpiring = drivers.filter(d=>new Date(d.licenseExp)<new Date(Date.now()+90*86400000));

  return (
    <div>
      {showAdd && <AddDriverWizard onClose={()=>setShowAdd(false)} onSave={handleSave} />}

      {selDriver && (
        <div className="ov">
          <div className="modal" style={{ maxWidth:640 }}>
            <div className="mhdr" style={{ background:`linear-gradient(135deg,#0C1220,#1E3A5F,${T.blue}18)`, borderBottom:`1px solid ${T.blue}33` }}>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ width:48, height:48, borderRadius:"50%", background:T.blue+"22", border:`2px solid ${T.blue}55`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span className="rj" style={{ fontSize:22, color:T.blue }}>{selDriver.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="rj" style={{ fontSize:18, fontWeight:700 }}>{selDriver.name}</div>
                  <div style={{ fontSize:11, color:T.textSub }}>{selDriver.phone} · {selDriver.cdl} · {selDriver.category||"HCV"} Driver</div>
                </div>
              </div>
              <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={()=>setSelDriver(null)}><Ic n="x" s={14} c={T.textSub} /></button>
            </div>
            <div className="mbdy">
              {/* Top badge row + score ring */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                  <span className={`badge ${selDriver.status==="Available"?"bg":selDriver.status==="On Trip"?"bb":"ba"}`}>{selDriver.status}</span>
                  <span className={`badge ${selDriver.score>80?"bg":selDriver.score>65?"bo":"br"}`}>Score {selDriver.score}/100</span>
                  <span className="badge bb">{selDriver.cdl}</span>
                  {selDriver.risk && <span className={`badge ${selDriver.risk==="low"?"bg":selDriver.risk==="medium"?"bo":"br"}`}>Risk: {selDriver.risk}</span>}
                </div>
                <div style={{ width:54, height:54, borderRadius:"50%", background:T.bgPanel, border:`4px solid ${selDriver.score>80?T.green:selDriver.score>65?T.orange:T.red}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span className="rj" style={{ fontSize:18, fontWeight:700, color:selDriver.score>80?T.green:selDriver.score>65?T.orange:T.red }}>{selDriver.score}</span>
                </div>
              </div>

              {/* Stats grid */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:14 }}>
                {[
                  { l:"Total Trips",      v:selDriver.totalTrips },
                  { l:"KM Driven",        v:`${(selDriver.kmDriven||0).toLocaleString()} km` },
                  { l:"License Exp",      v:selDriver.licenseExp, warn:new Date(selDriver.licenseExp)<new Date(Date.now()+90*86400000) },
                  { l:"Advance Balance",  v:fmt(selDriver.advanceBalance), warn:(selDriver.advanceBalance||0)>5000 },
                  { l:"Category",         v:selDriver.category||selDriver.cdl },
                  { l:"Assigned Vehicle", v:selDriver.vehicle||"Pool" },
                ].map(k=>(
                  <div key={k.l} style={{ background:T.bgPanel, borderRadius:8, padding:"8px 10px", border:k.warn?`1px solid ${T.orange}33`:"none" }}>
                    <div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div>
                    <div style={{ fontSize:12, fontWeight:600, marginTop:2, color:k.warn?T.orange:T.text }}>{k.v}</div>
                  </div>
                ))}
              </div>

              {/* Documents section */}
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:12, marginBottom:14 }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.blue, marginBottom:8 }}>📎 Uploaded Documents</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6 }}>
                  {[
                    { label:"DL Front",   key:"docLicFront",   icon:"🪪", required:true  },
                    { label:"DL Back",    key:"docLicBack",    icon:"🪪", required:false },
                    { label:"Aadhaar",    key:"docAadhaar",    icon:"🆔", required:true  },
                    { label:"Medical",    key:"docMedical",    icon:"🏥", required:false },
                    { label:"Photo",      key:"docPhoto",      icon:"👤", required:true  },
                    { label:"Experience", key:"docExperience", icon:"📄", required:false },
                  ].map(d=>{
                    const uploaded = selDriver[d.key];
                    return (
                      <div key={d.key} style={{ display:"flex", gap:6, alignItems:"center", padding:"6px 8px", background:uploaded?T.greenGlow:d.required?T.redGlow:T.bgCard, border:`1px solid ${uploaded?T.green:d.required?T.red:T.border}33`, borderRadius:7 }}>
                        <span style={{ fontSize:14 }}>{d.icon}</span>
                        <div>
                          <div style={{ fontSize:10, fontWeight:600, color:uploaded?T.green:d.required?T.red:T.textMuted }}>{d.label}</div>
                          <div style={{ fontSize:9, color:T.textMuted }}>{uploaded?uploaded.name||"Uploaded":d.required?"Required":"Optional"}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display:"flex", gap:8 }}>
                <button className="btn btn-p" style={{ fontSize:11 }}>Assign Trip</button>
                <button className="btn btn-b" style={{ fontSize:11 }}>Settlement</button>
                <button className="btn btn-gh" style={{ fontSize:11 }}>Edit Profile</button>
                <button className="btn btn-gh" style={{ fontSize:11 }} onClick={()=>setSelDriver(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Drivers</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>Identity-verified · license-validated · AI risk-scored · skill-mapped</p>
        </div>
        <button className="btn" style={{ background:T.blue, color:"#fff", fontWeight:600 }} onClick={()=>setShowAdd(true)}><Ic n="plus" s={14} c="#fff" /> Add Driver</button>
      </div>

      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(5,1fr)", marginBottom:18 }}>
        {[
          { l:"Total Drivers", v:drivers.length, c:T.blue },
          { l:"Available",     v:drivers.filter(d=>d.status==="Available").length, c:T.green },
          { l:"On Trip",       v:drivers.filter(d=>d.status==="On Trip").length,   c:T.accent },
          { l:"High Risk",     v:highRisk.length,  c:T.red },
          { l:"License Expiring", v:licExpiring.length, c:T.orange },
        ].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}>
            <div className="stat-v" style={{ color:k.c }}>{k.v}</div>
            <div className="stat-l">{k.l}</div>
          </div>
        ))}
      </div>

      {(highRisk.length>0||licExpiring.length>0) && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.orange}44`, background:T.orangeGlow }}>
          <div className="section-title" style={{ color:T.orange }}>⚠️ Driver Alerts</div>
          {licExpiring.map(d=>(
            <div key={d.id} className="arow" style={{ borderLeftColor:new Date(d.licenseExp)<new Date()?T.red:T.orange }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:600 }}>{d.name}</div>
                <div style={{ fontSize:11, color:T.textSub }}>License expiry: {d.licenseExp} · {new Date(d.licenseExp)<new Date()?"EXPIRED":"Expiring soon"}</div>
              </div>
              <span className={`badge ${new Date(d.licenseExp)<new Date()?"br":"bo"}`}>{new Date(d.licenseExp)<new Date()?"Expired":"Due"}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display:"flex", gap:8, marginBottom:12 }}>
        <div className="tabs" style={{ marginBottom:0 }}>
          {["All","Available","On Trip","On Settlement"].map(s=>(
            <div key={s} className={`tab ${filterStatus===s?"on":""}`} onClick={()=>setFilterStatus(s)} style={{ fontSize:12 }}>{s}</div>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>ID</th><th>Name</th><th>Phone</th><th>CDL</th><th>License Exp</th><th>Score</th><th>Trips</th><th>KM</th><th>Status</th><th>Advance</th></tr></thead>
          <tbody>
            {filtered.map(d=>(
              <tr key={d.id} style={{ cursor:"pointer" }} onClick={()=>setSelDriver(d)}>
                <td className="mono" style={{ fontSize:11, color:T.textMuted }}>{d.id}</td>
                <td style={{ fontWeight:600 }}>{d.name}</td>
                <td style={{ fontSize:12 }}>{d.phone}</td>
                <td><span className="badge bb">{d.cdl}</span></td>
                <td style={{ fontSize:11, color:new Date(d.licenseExp)<new Date()?T.red:new Date(d.licenseExp)<new Date(Date.now()+90*86400000)?T.orange:T.textSub }}>{d.licenseExp}</td>
                <td style={{ color:d.score>80?T.green:d.score>65?T.orange:T.red, fontWeight:600 }}>{d.score}</td>
                <td>{d.totalTrips}</td>
                <td className="mono" style={{ fontSize:11 }}>{(d.kmDriven||0).toLocaleString()}</td>
                <td><span className={`badge ${d.status==="Available"?"bg":d.status==="On Trip"?"bb":"ba"}`}>{d.status}</span></td>
                <td style={{ fontWeight:700, color:(d.advanceBalance||0)>5000?T.red:(d.advanceBalance||0)>0?T.orange:T.green }}>{fmt(d.advanceBalance||0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FinancePage = () => {
  const allTrips = [
    { id:"TRP-2025-0041", vehicleType:"own", driver:"Mani Kumar", freight:42000, exp:16500, agent:"Raja Broker" },
    { id:"TRP-2025-0042", vehicleType:"own", driver:"Selvam R", freight:38000, exp:14700, agent:"Suresh Agency" },
    { id:"TRP-2025-0043", vehicleType:"vendor", driver:"Sri Murugan Transport", freight:75000, exp:61760, agent:"Direct" },
    { id:"TRP-2025-0044", vehicleType:"own", driver:"Arjun D", freight:33000, exp:12100, agent:"Kumar Freight" },
    { id:"TRP-2025-0045", vehicleType:"vendor", driver:"KPR Fleet Solutions", freight:92000, exp:102400, agent:"Raja Broker" },
  ];
  const totalRev = allTrips.reduce((s,t)=>s+t.freight,0);
  const totalExp = allTrips.reduce((s,t)=>s+t.exp,0);
  return (
    <div>
      <h1 className="rj" style={{ fontSize:28, fontWeight:700, marginBottom:6 }}>Finance & P&L</h1>
      <p style={{ color:T.textSub, fontSize:12, marginBottom:20 }}>Trip-level profitability — own fleet vs vendor analysis</p>
      <div className="kpi-row kpi3" style={{ marginBottom:18 }}>
        {[{ l:"Total Freight Revenue", v:fmt(totalRev), c:T.green },{ l:"Total Expenses", v:fmt(totalExp), c:T.red },{ l:"Net Profit (MTD)", v:fmt(totalRev-totalExp), c:T.accent }].map(k => <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>)}
      </div>
      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>Trip</th><th>Type</th><th>Party</th><th>Freight</th><th>Expenses</th><th>Net Profit</th><th>Margin</th></tr></thead>
          <tbody>
            {allTrips.map(t => {
              const profit = t.freight-t.exp;
              return <tr key={t.id}>
                <td className="mono" style={{ fontSize:11, color:T.accent }}>{t.id}</td>
                <td>{t.vehicleType==="own"?<span className="badge bg">Own</span>:<span className="badge bp">Vendor</span>}</td>
                <td style={{ fontSize:12 }}>{t.driver}</td>
                <td style={{ color:T.green, fontWeight:600 }}>{fmt(t.freight)}</td>
                <td style={{ color:T.red }}>{fmt(t.exp)}</td>
                <td style={{ fontWeight:700, color:profit>0?T.green:T.red }}>{fmt(profit)}</td>
                <td style={{ fontSize:11, color:T.textSub }}>{pct(profit,t.freight)}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
const Dashboard = ({ setPage }) => {
  const highRisk = AI_PREDICTIONS.filter(p => p.riskScore==="HIGH");
  return (
    <div>
      <div style={{ marginBottom:22 }}>
        <h1 className="rj" style={{ fontSize:30, fontWeight:700, letterSpacing:.5 }}>Control Tower</h1>
        <p style={{ color:T.textSub, fontSize:12 }}>Wednesday, 15 April 2026 — Fleet Business OS Overview</p>
      </div>
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(5,1fr)", marginBottom:18 }}>
        {[
          { l:"Today Revenue", v:"₹2,83,000", c:T.green },
          { l:"Active Trips", v:3, c:T.blue },
          { l:"Inspection Pending", v:2, c:T.orange },
          { l:"High Risk Vehicles", v:highRisk.length, c:T.red },
          { l:"Open Work Orders", v:WORK_ORDERS.filter(w=>w.status!=="Completed").length, c:T.purple },
        ].map(k => <div key={k.l} className="stat"><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>)}
      </div>
      <div className="grd2" style={{ marginBottom:16 }}>
        <div className="card">
          <div className="section-title" style={{ color:T.orange }}>⚡ Pending Actions</div>
          {[
            { icon:"pretrip", label:"Pre-Trip Pending — TRP-2025-0043", sub:"Trichy → Mumbai · Sri Murugan Transport", color:T.green, page:"trips" },
            { icon:"posttrip", label:"Post-Trip Pending — TRP-2025-0042", sub:"Madurai → Bangalore · Selvam R", color:T.blue, page:"trips" },
            { icon:"alert", label:`${highRisk.length} Vehicles HIGH Risk`, sub:highRisk.map(p=>p.vehicle).join(", "), color:T.red, page:"ai" },
            { icon:"wrench", label:"Work Order Open — TN59 AB1234", sub:"Alternator fault — Power Electricals", color:T.orange, page:"workshop" },
            { icon:"shield", label:"Insurance Expiring — TN59 AB1234", sub:"7 days remaining", color:T.red, page:"fleet" },
          ].map((a,i) => (
            <div key={i} className="arow" style={{ borderLeftColor:a.color }}>
              <Ic n={a.icon} s={13} c={a.color} />
              <div style={{ flex:1 }}><div style={{ fontSize:12, fontWeight:600, color:a.color }}>{a.label}</div><div style={{ fontSize:11, color:T.textSub }}>{a.sub}</div></div>
              <button className="btn btn-gh" style={{ fontSize:10, padding:"3px 10px" }} onClick={()=>setPage(a.page)}>Fix →</button>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="section-title">Fleet Health Overview</div>
          {FLEET_DATA.map(v => {
            const vt = VEHICLE_SCHEMA.find(x=>x.id===v.typeId);
            return (
              <div key={v.id} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:3 }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <span style={{ fontSize:14 }}>{vt?.icon}</span>
                    <span className="mono" style={{ fontWeight:700, color:T.accent }}>{v.num}</span>
                  </div>
                  <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                    <span className={`badge ${v.status==="Active"?"bg":v.status==="On Trip"?"bb":"ba"}`} style={{ fontSize:9 }}>{v.status}</span>
                    <span style={{ color:v.health>80?T.green:v.health>60?T.accent:T.red, fontWeight:600 }}>{v.health}%</span>
                  </div>
                </div>
                <div className="pbar"><div className="pfill" style={{ width:`${v.health}%`, background:v.health>80?T.green:v.health>60?T.accent:T.red }} /></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grd3">
        <div className="card">
          <div className="section-title">Journey Types Active</div>
          {JOURNEY_TYPES.map(jt => (
            <div key={jt.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${T.border}11` }}>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}><span style={{ color:jt.color, fontSize:16 }}>{jt.icon}</span><span style={{ fontSize:12 }}>{jt.label}</span></div>
              <span className="badge" style={{ background:jt.color+"20", color:jt.color, fontSize:9 }}>{jt.tag}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="section-title">AI Risk Summary</div>
          {AI_PREDICTIONS.map(p => (
            <div key={p.vehicle} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${T.border}22` }}>
              <span className="mono" style={{ fontSize:11, color:T.accent }}>{p.vehicle}</span>
              {riskBadge(p.riskScore)}
            </div>
          ))}
        </div>
        <div className="card">
          <div className="section-title">Work Orders</div>
          {WORK_ORDERS.map(wo => (
            <div key={wo.id} style={{ padding:"6px 0", borderBottom:`1px solid ${T.border}22` }}>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <div><div className="mono" style={{ fontSize:11, color:T.accent }}>{wo.id}</div><div style={{ fontSize:11, color:T.textSub }}>{wo.vehicle} · {wo.category}</div></div>
                <span className="badge" style={{ background:(wo.status==="Completed"?T.green:wo.status==="In Progress"?T.orange:T.blue)+"20", color:wo.status==="Completed"?T.green:wo.status==="In Progress"?T.orange:T.blue, fontSize:9 }}>{wo.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// BREAKDOWN & RECOVERY MODULE
// ═══════════════════════════════════════════════════════════════════════════════
const BREAKDOWN_DATA = [
  { id:"BRK-001", vehicle:"TN45 CD5678", driver:"Ramesh P", route:"Nagpur → Pune", location:"NH-44, Wardha", issue:"Engine overheating", severity:"critical", status:"Recovery in Progress", reported:"2025-04-15 14:32", eta:"2h 15m", recovery:"Vendor — KPR Recovery", cost:18500 },
  { id:"BRK-002", vehicle:"TN59 AB1234", driver:"Selvam R", route:"Madurai → Bangalore", location:"NH-7, Krishnagiri", issue:"Tyre burst (RL2)", severity:"medium", status:"On-Site Fix", reported:"2025-04-15 11:20", eta:"45m", recovery:"On-site mechanic", cost:4200 },
  { id:"BRK-003", vehicle:"TN22 IJ7890", driver:"Karthik M", route:"Chennai → Coimbatore", location:"Vellore bypass", issue:"Battery failure", severity:"minor", status:"Resolved", reported:"2025-04-14 09:15", eta:"—", recovery:"Own vehicle dispatch", cost:2800 },
];

const BreakdownPage = () => {
  const [showReport, setShowReport] = useState(false);
  const [reportStep, setReportStep] = useState(1);
  const [sel, setSel] = useState(null);
  const [rForm, setRForm] = useState({ vehicle:"", driver:"", issue:"", severity:"medium", location:"", notes:"" });
  const rf = (k,v) => setRForm(f=>({...f,[k]:v}));

  const severityColor = { critical:T.red, medium:T.orange, minor:T.green };
  const statusColor = { "Recovery in Progress":T.orange, "On-Site Fix":T.blue, "Resolved":T.green, "Reported":T.red, "Assigned":T.accent };

  const PROCESS_STEPS = [
    { step:1, label:"Breakdown Reported", icon:"alert", color:T.red, desc:"Driver reports via app — vehicle, location, issue type" },
    { step:2, label:"Severity Detection", icon:"cpu", color:T.orange, desc:"System classifies: Minor / Medium / Critical based on issue type" },
    { step:3, label:"Dispatch Decision", icon:"dash", color:T.accent, desc:"AI recommends: Own recovery / Vendor tow / On-site fix" },
    { step:4, label:"Recovery Execution", icon:"truck", color:T.blue, desc:"Assign recovery, track ETA, dispatch mechanic/tow" },
    { step:5, label:"Site Inspection", icon:"eye", color:T.purple, desc:"Inspector confirms actual issue, photos, cost estimate" },
    { step:6, label:"Workshop / On-Site Fix", icon:"wrench", color:T.cyan, desc:"Auto-create Work Order, parts, labour, invoice" },
    { step:7, label:"Trip Resumed / Closed", icon:"check", color:T.green, desc:"Vehicle cleared, trip status updated, cost logged" },
  ];

  return (
    <div>
      {/* Report Breakdown Wizard */}
      {showReport && (
        <div className="ov">
          <div className="modal" style={{ maxWidth:580 }}>
            <div className="mhdr" style={{ background:"linear-gradient(135deg,#450A0A,#7F1D1D)" }}>
              <div><div className="rj" style={{ fontSize:18, fontWeight:700, color:"#fff" }}>🚨 Report Breakdown — Step {reportStep}/3</div><div style={{ fontSize:12, color:"#FCA5A5" }}>Quick entry — 3 steps, under 60 seconds</div></div>
              <button className="btn" style={{ background:"rgba(255,255,255,.1)", color:"#fff", padding:"5px 9px" }} onClick={()=>{setShowReport(false);setReportStep(1)}}><Ic n="x" s={14} c="#fff" /></button>
            </div>
            <div className="mbdy">
              {reportStep===1 && (
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:T.red, marginBottom:14 }}>Step 1 — Vehicle & Driver</div>
                  <div className="frow fr2">
                    <div><label className="flabel">Vehicle</label><select value={rForm.vehicle} onChange={e=>rf("vehicle",e.target.value)}><option value="">Select</option>{FLEET_DATA.map(v=><option key={v.id}>{v.num}</option>)}</select></div>
                    <div><label className="flabel">Driver</label><select value={rForm.driver} onChange={e=>rf("driver",e.target.value)}><option value="">Select</option>{DRIVERS_DATA.map(d=><option key={d.id}>{d.name}</option>)}</select></div>
                  </div>
                  <div><label className="flabel">Last Known Location / Route</label><input value={rForm.location} onChange={e=>rf("location",e.target.value)} placeholder="NH-44, Wardha bypass, 12km before Nagpur" /></div>
                </div>
              )}
              {reportStep===2 && (
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:T.red, marginBottom:14 }}>Step 2 — Issue & Severity</div>
                  <div><label className="flabel">Issue Type</label>
                    <select value={rForm.issue} onChange={e=>rf("issue",e.target.value)}>
                      <option value="">Select issue</option>
                      <option>Engine failure / overheating</option><option>Tyre burst / flat</option><option>Battery / electrical failure</option><option>Clutch failure</option><option>Brake failure</option><option>Fuel issue</option><option>Accident</option><option>Other</option>
                    </select>
                  </div>
                  <div style={{ marginTop:14 }}>
                    <label className="flabel">Severity — Auto-Detected</label>
                    <div style={{ display:"flex", gap:10, marginTop:6 }}>
                      {[["minor","Level 1 — Minor","Tyre, battery",T.green],["medium","Level 2 — Medium","Clutch, electrical",T.orange],["critical","Level 3 — Critical","Engine, accident",T.red]].map(([val,lbl,sub,col])=>(
                        <div key={val} onClick={()=>rf("severity",val)} style={{ flex:1, padding:10, borderRadius:8, cursor:"pointer", border:`2px solid ${rForm.severity===val?col:T.border}`, background:rForm.severity===val?col+"18":T.bgPanel }}>
                          <div style={{ fontSize:12, fontWeight:700, color:rForm.severity===val?col:T.text }}>{lbl}</div>
                          <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>{sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* AI Dispatch Recommendation */}
                  <div style={{ background:T.accentGlow, border:`1px solid ${T.accent}33`, borderRadius:8, padding:12, marginTop:14 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:T.accent, marginBottom:4 }}>🤖 AI Dispatch Recommendation</div>
                    <div style={{ fontSize:12, color:T.textSub }}>
                      {rForm.severity==="critical" ? "🚛 Dispatch vendor recovery + tow. Alert load consignee of delay."
                       : rForm.severity==="medium" ? "🔧 Send on-site mechanic from nearest depot. ETA estimation: 45 min."
                       : "🛠️ On-site fix possible. Driver can manage with roadside support."}
                    </div>
                  </div>
                </div>
              )}
              {reportStep===3 && (
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:14 }}>Step 3 — Additional Notes & Submit</div>
                  <div style={{ marginBottom:12 }}><label className="flabel">Remarks / Observations</label><textarea value={rForm.notes} onChange={e=>rf("notes",e.target.value)} placeholder="Driver description of the issue, road conditions, load status..." style={{ height:70 }} /></div>
                  <div style={{ background:T.bgPanel, borderRadius:10, padding:14 }}>
                    <div className="section-title" style={{ marginBottom:8 }}>Breakdown Summary</div>
                    {[["Vehicle",rForm.vehicle],["Driver",rForm.driver],["Location",rForm.location],["Issue",rForm.issue],["Severity",rForm.severity]].map(([k,v])=>(
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"3px 0", fontSize:12 }}>
                        <span style={{ color:T.textMuted }}>{k}</span><span style={{ fontWeight:500 }}>{v||"—"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:20 }}>
                <button className="btn btn-gh" onClick={()=>reportStep>1?setReportStep(s=>s-1):(setShowReport(false),setReportStep(1))}>{reportStep===1?"Cancel":"← Back"}</button>
                <button className="btn" style={{ background:T.red, color:"#fff" }} onClick={()=>reportStep<3?setReportStep(s=>s+1):(setShowReport(false),setReportStep(1))}>{reportStep===3?"🚨 Report Breakdown":"Next →"}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Breakdown & Recovery</h1><p style={{ color:T.textSub, fontSize:12 }}>Smart Breakdown Command Center — Report → Dispatch → Fix → Resume</p></div>
        <button className="btn" style={{ background:T.red, color:"#fff" }} onClick={()=>setShowReport(true)}><Ic n="alert" s={14} c="#fff" /> Report Breakdown</button>
      </div>

      <div className="kpi-row kpi4" style={{ marginBottom:18 }}>
        {[
          { l:"Active Breakdowns", v:BREAKDOWN_DATA.filter(b=>b.status!=="Resolved").length, c:T.red },
          { l:"This Month", v:7, c:T.orange },
          { l:"Avg Recovery Time", v:"3.2h", c:T.blue },
          { l:"Total Recovery Cost", v:fmt(BREAKDOWN_DATA.reduce((s,b)=>s+b.cost,0)), c:T.purple },
        ].map(k => <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>)}
      </div>

      {/* Active breakdowns */}
      {BREAKDOWN_DATA.filter(b=>b.status!=="Resolved").length > 0 && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.red}44`, background:T.redGlow }}>
          <div className="section-title" style={{ color:T.red }}>🚨 Live Breakdowns</div>
          {BREAKDOWN_DATA.filter(b=>b.status!=="Resolved").map(b => (
            <div key={b.id} className="arow" style={{ borderLeftColor:severityColor[b.severity] }}>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:3 }}>
                  <span className="mono" style={{ fontSize:12, color:T.accent }}>{b.id}</span>
                  <span style={{ fontSize:12, fontWeight:600 }}>{b.vehicle} · {b.driver}</span>
                  <span className={`badge ${b.severity==="critical"?"br":b.severity==="medium"?"bo":"bg"}`}>{b.severity}</span>
                </div>
                <div style={{ fontSize:11, color:T.textSub }}>{b.location} · {b.issue}</div>
                <div style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>Recovery: {b.recovery} · ETA: {b.eta}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <span className="badge" style={{ background:(statusColor[b.status]||T.textSub)+"22", color:statusColor[b.status]||T.textSub }}>{b.status}</span>
                <div style={{ fontSize:11, color:T.orange, fontWeight:600, marginTop:4 }}>{fmt(b.cost)}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Process Steps */}
      <div className="card" style={{ marginBottom:14 }}>
        <div className="section-title">🔁 Breakdown Recovery Process</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:8 }}>
          {PROCESS_STEPS.map((s, i) => (
            <div key={s.step} style={{ textAlign:"center" }}>
              <div style={{ display:"flex", justifyContent:"center", marginBottom:6 }}>
                {i > 0 && <div style={{ position:"absolute", width:"100%", height:2, background:T.border, top:"50%" }} />}
                <div style={{ width:36, height:36, borderRadius:"50%", background:s.color+"18", border:`2px solid ${s.color}`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                  <Ic n={s.icon} s={14} c={s.color} />
                </div>
              </div>
              <div style={{ fontSize:10, fontWeight:600, color:s.color, lineHeight:1.3 }}>{s.label}</div>
              <div style={{ fontSize:9, color:T.textMuted, marginTop:3, lineHeight:1.4 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* History table */}
      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>ID</th><th>Vehicle</th><th>Issue</th><th>Severity</th><th>Location</th><th>Recovery Mode</th><th>Cost</th><th>Status</th><th>Reported</th></tr></thead>
          <tbody>
            {BREAKDOWN_DATA.map(b => (
              <tr key={b.id} style={{ cursor:"pointer" }} onClick={()=>setSel(b)}>
                <td className="mono" style={{ fontSize:11, color:T.accent }}>{b.id}</td>
                <td className="mono" style={{ fontSize:11 }}>{b.vehicle}</td>
                <td style={{ fontSize:12 }}>{b.issue}</td>
                <td><span className={`badge ${b.severity==="critical"?"br":b.severity==="medium"?"bo":"bg"}`}>{b.severity}</span></td>
                <td style={{ fontSize:11 }}>{b.location}</td>
                <td style={{ fontSize:11 }}>{b.recovery}</td>
                <td style={{ color:T.red, fontWeight:600 }}>{fmt(b.cost)}</td>
                <td><span className="badge" style={{ background:(statusColor[b.status]||T.textSub)+"22", color:statusColor[b.status]||T.textSub }}>{b.status}</span></td>
                <td style={{ fontSize:10, color:T.textMuted }}>{b.reported}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// FUEL CONTROL MODULE
// ═══════════════════════════════════════════════════════════════════════════════
const FuelControlPage = () => {
  const [tab, setTab] = useState("log");
  const [showAdd, setShowAdd] = useState(false);
  const [fForm, setFForm] = useState({ vehicle:"", driver:"", litres:"", rate:"", amount:"", odometer:"", station:"", tripId:"", mode:"diesel" });
  const ff = (k,v) => setFForm(f=>({...f,[k]:v}));

  const FUEL_LOGS = [
    { id:"FUEL-001", vehicle:"TN69 GH4789", driver:"Mani Kumar", tripId:"TRP-2025-0041", date:"15 Apr", litres:120, rate:95, amount:11400, odometer:74875, station:"IOCL Nagpur", efficiency:4.8, expected:5.2, flag:null },
    { id:"FUEL-002", vehicle:"TN59 AB1234", driver:"Selvam R", tripId:"TRP-2025-0042", date:"14 Apr", litres:95, rate:96, amount:9120, odometer:92340, station:"BPCL Chennai", efficiency:3.8, expected:4.8, flag:"suspicious" },
    { id:"FUEL-003", vehicle:"TN45 CD5678", driver:"Ramesh P", tripId:"TRP-2025-0043", date:"13 Apr", litres:145, rate:95, amount:13775, odometer:124000, station:"HPCL Pune", efficiency:4.1, expected:4.0, flag:null },
    { id:"FUEL-004", vehicle:"TN38 EF9012", driver:"Arjun D", tripId:"TRP-2025-0044", date:"12 Apr", litres:88, rate:96, amount:8448, odometer:54220, station:"IOCL Hyderabad", efficiency:5.8, expected:5.5, flag:null },
    { id:"FUEL-005", vehicle:"TN71 GH3456", driver:"Vinoth S", tripId:"TRP-2025-0045", date:"11 Apr", litres:62, rate:97, amount:6014, odometer:88910, station:"BPCL Coimbatore", efficiency:2.8, expected:6.5, flag:"theft_risk" },
  ];

  const flagColor = { suspicious:T.orange, theft_risk:T.red };
  const totalFuel = FUEL_LOGS.reduce((s,f)=>s+f.amount,0);
  const suspicious = FUEL_LOGS.filter(f=>f.flag);

  return (
    <div>
      {showAdd && (
        <div className="ov">
          <div className="modal" style={{ maxWidth:560 }}>
            <div className="mhdr" style={{ background:"linear-gradient(135deg,#064E3B,#065F46)" }}>
              <div><div className="rj" style={{ fontSize:18, fontWeight:700, color:"#fff" }}>⛽ Log Fuel Entry</div><div style={{ fontSize:12, color:"#A7F3D0" }}>Quick 4-field entry — takes 30 seconds</div></div>
              <button className="btn" style={{ background:"rgba(255,255,255,.1)", color:"#fff", padding:"5px 9px" }} onClick={()=>setShowAdd(false)}><Ic n="x" s={14} c="#fff" /></button>
            </div>
            <div className="mbdy">
              <div className="frow fr2">
                <div><label className="flabel">Vehicle</label><select value={fForm.vehicle} onChange={e=>ff("vehicle",e.target.value)}><option value="">Select</option>{FLEET_DATA.map(v=><option key={v.id}>{v.num}</option>)}</select></div>
                <div><label className="flabel">Driver</label><select value={fForm.driver} onChange={e=>ff("driver",e.target.value)}><option value="">Select</option>{DRIVERS_DATA.map(d=><option key={d.id}>{d.name}</option>)}</select></div>
              </div>
              <div className="frow fr3">
                <div><label className="flabel">Litres</label><input value={fForm.litres} onChange={e=>ff("litres",e.target.value)} placeholder="120" /></div>
                <div><label className="flabel">Rate (₹/L)</label><input value={fForm.rate} onChange={e=>ff("rate",e.target.value)} placeholder="95" /></div>
                <div><label className="flabel">Amount (₹)</label><input value={fForm.amount || (parseInt(fForm.litres||0)*parseInt(fForm.rate||0))||""} onChange={e=>ff("amount",e.target.value)} placeholder="Auto-calculated" /></div>
              </div>
              <div className="frow fr2">
                <div><label className="flabel">Current Odometer (km)</label><input value={fForm.odometer} onChange={e=>ff("odometer",e.target.value)} placeholder="74875" /></div>
                <div><label className="flabel">Fuel Station</label><input value={fForm.station} onChange={e=>ff("station",e.target.value)} placeholder="IOCL, Nagpur" /></div>
              </div>
              <div><label className="flabel">Linked Trip (optional)</label><input value={fForm.tripId} onChange={e=>ff("tripId",e.target.value)} placeholder="TRP-2025-XXXX" /></div>
              {fForm.litres && fForm.odometer && (
                <div style={{ background:T.accentGlow, border:`1px solid ${T.accent}33`, borderRadius:8, padding:10, marginTop:10 }}>
                  <div style={{ fontSize:11, color:T.accent, fontWeight:700 }}>🤖 AI Efficiency Check</div>
                  <div style={{ fontSize:12, color:T.textSub, marginTop:3 }}>Expected: 5.2 km/l · Your entry suggests: {(parseInt(fForm.odometer)-74000)/parseInt(fForm.litres||1)|0} km/l. {(parseInt(fForm.odometer)-74000)/parseInt(fForm.litres||1) < 3 ? "⚠️ Below expected — flagging for review" : "✅ Within normal range"}</div>
                </div>
              )}
              <div style={{ display:"flex", justifyContent:"flex-end", gap:8, marginTop:16 }}>
                <button className="btn btn-gh" onClick={()=>setShowAdd(false)}>Cancel</button>
                <button className="btn btn-p" onClick={()=>setShowAdd(false)}>⛽ Log Fuel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Fuel Control</h1><p style={{ color:T.textSub, fontSize:12 }}>Consumption tracking, theft detection & efficiency analytics</p></div>
        <button className="btn btn-p" onClick={()=>setShowAdd(true)}><Ic n="plus" s={14} c="#080B10" /> Log Fuel</button>
      </div>

      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(5,1fr)", marginBottom:18 }}>
        {[
          { l:"MTD Fuel Spend", v:fmt(totalFuel), c:T.orange },
          { l:"Total Litres", v:FUEL_LOGS.reduce((s,f)=>s+f.litres,0)+"L", c:T.blue },
          { l:"Fleet Avg Efficiency", v:"4.5 km/l", c:T.green },
          { l:"Suspicious Entries", v:suspicious.length, c:T.red },
          { l:"Avg Rate", v:"₹95.8/L", c:T.accent },
        ].map(k=><div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>)}
      </div>

      {suspicious.length > 0 && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.red}44`, background:T.redGlow }}>
          <div className="section-title" style={{ color:T.red }}>🚨 AI Fuel Anomaly Detection — {suspicious.length} suspicious entries</div>
          {suspicious.map(f => (
            <div key={f.id} className="arow" style={{ borderLeftColor:flagColor[f.flag] }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:700, color:flagColor[f.flag] }}>{f.id} — {f.vehicle} · {f.driver}</div>
                <div style={{ fontSize:11, color:T.textSub }}>
                  {f.flag==="theft_risk" ? `⚠️ Efficiency ${f.efficiency} km/l vs expected ${f.expected} km/l — possible fuel theft` : `Anomalous fill at ${f.station} — below expected by 21%`}
                </div>
              </div>
              <span className={`badge ${f.flag==="theft_risk"?"br":"bo"}`}>{f.flag==="theft_risk"?"Theft Risk":"Suspicious"}</span>
            </div>
          ))}
        </div>
      )}

      <div className="tabs">{["log","efficiency","vehicle-wise"].map(t=><div key={t} className={`tab ${tab===t?"on":""}`} onClick={()=>setTab(t)}>{t==="vehicle-wise"?"Vehicle-wise":t.charAt(0).toUpperCase()+t.slice(1)}</div>)}</div>

      {tab==="log" && (
        <div className="card" style={{ padding:0 }}>
          <table className="tbl">
            <thead><tr><th>ID</th><th>Vehicle</th><th>Driver</th><th>Date</th><th>Litres</th><th>Rate</th><th>Amount</th><th>Odometer</th><th>Efficiency</th><th>Expected</th><th>Flag</th></tr></thead>
            <tbody>
              {FUEL_LOGS.map(f => (
                <tr key={f.id}>
                  <td className="mono" style={{ fontSize:11, color:T.accent }}>{f.id}</td>
                  <td className="mono" style={{ fontSize:11 }}>{f.vehicle}</td>
                  <td style={{ fontSize:12 }}>{f.driver}</td>
                  <td style={{ fontSize:11 }}>{f.date}</td>
                  <td style={{ fontWeight:600 }}>{f.litres}L</td>
                  <td>₹{f.rate}/L</td>
                  <td style={{ color:T.orange, fontWeight:600 }}>{fmt(f.amount)}</td>
                  <td className="mono" style={{ fontSize:11 }}>{f.odometer.toLocaleString()}</td>
                  <td style={{ color:f.efficiency<f.expected*0.8?T.red:f.efficiency>=f.expected?T.green:T.orange, fontWeight:600 }}>{f.efficiency} km/l</td>
                  <td style={{ color:T.textMuted, fontSize:11 }}>{f.expected} km/l</td>
                  <td>{f.flag ? <span className={`badge ${f.flag==="theft_risk"?"br":"bo"}`}>{f.flag.replace("_"," ")}</span> : <span style={{ color:T.textMuted, fontSize:11 }}>—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab==="efficiency" && (
        <div className="card">
          <div className="section-title">Vehicle Efficiency vs Target</div>
          {FLEET_DATA.map(v => {
            const log = FUEL_LOGS.find(f=>f.vehicle===v.num);
            if (!log) return null;
            const pct = (log.efficiency/log.expected)*100;
            return (
              <div key={v.id} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}>
                  <span className="mono" style={{ color:T.accent }}>{v.num}</span>
                  <span style={{ color:pct>=90?T.green:pct>=70?T.orange:T.red, fontWeight:600 }}>{log.efficiency} / {log.expected} km/l ({pct.toFixed(0)}%)</span>
                </div>
                <div className="pbar" style={{ height:7 }}><div className="pfill" style={{ width:`${Math.min(pct,100)}%`, background:pct>=90?T.green:pct>=70?T.orange:T.red }} /></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// GPS LIVE TRACKING (SIMULATED)
// ═══════════════════════════════════════════════════════════════════════════════
const LiveTrackingPage = () => {
  const [selVehicle, setSelVehicle] = useState(null);

  const LIVE_FLEET = [
    { id:"TN69 GH4789", status:"En Route", speed:68, lastPing:"2m ago", location:"NH-44, 42km before Nagpur", lat:21.14, lng:79.08, driver:"Mani Kumar", trip:"TRP-2025-0041", battery:87, route:"Chennai → Coimbatore", eta:"6h 20m", load:"18T FTL", kmCovered:340, kmTotal:480 },
    { id:"TN59 AB1234", status:"Planned Stop", speed:0, lastPing:"5m ago", location:"HPCL, Krishnagiri, TN-38", lat:12.51, lng:78.21, driver:"Selvam R", trip:"TRP-2025-0042", battery:72, route:"Madurai → Bangalore", eta:"3h 45m", load:"22T FTL", kmCovered:220, kmTotal:440 },
    { id:"TN71 GH3456", status:"En Route", speed:55, lastPing:"1m ago", location:"NH-7, 180km from Delhi", lat:28.67, lng:77.22, driver:"Vinoth S", trip:"TRP-2025-0045", battery:68, route:"Coimbatore → Delhi", eta:"18h 30m", load:"24T FTL", kmCovered:1920, kmTotal:2100 },
    { id:"TN45 CD5678", status:"In Maintenance", speed:0, lastPing:"3h ago", location:"Ganesh Auto Works, Nagpur", lat:21.14, lng:79.09, driver:"Ramesh P", trip:"—", battery:45, route:"Workshop", eta:"—", load:"—", kmCovered:0, kmTotal:0 },
    { id:"TN38 EF9012", status:"Idle", speed:0, lastPing:"12m ago", location:"Yard, Chennai HQ", lat:13.08, lng:80.27, driver:"Arjun D", trip:"—", battery:91, route:"—", eta:"—", load:"—", kmCovered:0, kmTotal:0 },
    { id:"TN22 IJ7890", status:"En Route", speed:42, lastPing:"3m ago", location:"NH-48, Vellore", lat:12.91, lng:79.13, driver:"Karthik M", trip:"TRP-2025-0046", battery:82, route:"Chennai → Pune", eta:"32h 10m", load:"20T FTL", kmCovered:85, kmTotal:1200 },
  ];

  const statusColors2 = { "En Route":T.blue, "Planned Stop":T.green, "Idle":T.textMuted, "In Maintenance":T.purple, "Unplanned Stop":T.red, "Disconnected":T.red };

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div><h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Live GPS Tracking</h1><p style={{ color:T.textSub, fontSize:12 }}>Real-time fleet visibility — every vehicle, every moment</p></div>
        <div style={{ display:"flex", gap:8 }}>
          <button className="btn btn-b"><Ic n="rotate" s={13} c={T.blue} /> Refresh All</button>
        </div>
      </div>

      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(6,1fr)", marginBottom:18 }}>
        {[
          { l:"En Route", v:LIVE_FLEET.filter(v=>v.status==="En Route").length, c:T.blue },
          { l:"Planned Stop", v:LIVE_FLEET.filter(v=>v.status==="Planned Stop").length, c:T.green },
          { l:"Idle", v:LIVE_FLEET.filter(v=>v.status==="Idle").length, c:T.textMuted },
          { l:"Maintenance", v:LIVE_FLEET.filter(v=>v.status==="In Maintenance").length, c:T.purple },
          { l:"Unplanned Stop", v:0, c:T.orange },
          { l:"Disconnected", v:0, c:T.red },
        ].map(k=><div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>)}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:14 }}>
        {/* Vehicle list panel */}
        <div className="card" style={{ padding:0 }}>
          <div style={{ padding:"12px 14px", borderBottom:`1px solid ${T.border}`, fontWeight:600, fontSize:12 }}>Fleet ({LIVE_FLEET.length} vehicles)</div>
          {LIVE_FLEET.map(v => (
            <div key={v.id} onClick={()=>setSelVehicle(v)} style={{ padding:"11px 14px", borderBottom:`1px solid ${T.border}18`, cursor:"pointer", background:selVehicle?.id===v.id?T.accentGlow:T.bgCard, transition:"all .15s" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span className="mono" style={{ fontSize:12, fontWeight:700, color:selVehicle?.id===v.id?T.accent:T.text }}>{v.id}</span>
                <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                  <div className="dot pulse" style={{ background:statusColors2[v.status] }} />
                  <span style={{ fontSize:10, color:statusColors2[v.status], fontWeight:600 }}>{v.status}</span>
                </div>
              </div>
              <div style={{ fontSize:11, color:T.textSub }}>{v.driver}</div>
              <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>{v.location}</div>
              {v.speed > 0 && <div style={{ fontSize:10, color:T.blue, marginTop:2 }}>🏎️ {v.speed} km/h · {v.lastPing}</div>}
            </div>
          ))}
        </div>

        {/* Map + detail panel */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {/* Map placeholder */}
          <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:12, height:280, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", position:"relative" }}>
            {/* Stylized map grid */}
            <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${T.border}44 1px, transparent 1px), linear-gradient(90deg, ${T.border}44 1px, transparent 1px)`, backgroundSize:"40px 40px" }} />
            {/* Vehicle dots */}
            {LIVE_FLEET.map((v, i) => (
              <div key={v.id} onClick={()=>setSelVehicle(v)} style={{ position:"absolute", left:`${15+i*13}%`, top:`${25+Math.sin(i)*30}%`, cursor:"pointer" }}>
                <div style={{ width:14, height:14, borderRadius:"50%", background:statusColors2[v.status], border:"2px solid #fff", animation:"pulse 2s ease-in-out infinite" }} />
                <div style={{ fontSize:8, color:"#fff", background:statusColors2[v.status]+"cc", borderRadius:4, padding:"1px 4px", marginTop:2, whiteSpace:"nowrap" }}>{v.id.split(" ")[0]}</div>
              </div>
            ))}
            <div style={{ zIndex:1, textAlign:"center", color:T.textMuted, fontSize:11 }}>
              <Ic n="map" s={32} c={T.textMuted} />
              <div style={{ marginTop:8 }}>Live GPS Map View</div>
              <div style={{ fontSize:10, marginTop:2 }}>GPS integration required for live tracking</div>
            </div>
          </div>

          {/* Selected vehicle detail */}
          {selVehicle ? (
            <div className="card">
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                <div>
                  <div className="mono" style={{ fontSize:16, fontWeight:700, color:T.accent }}>{selVehicle.id}</div>
                  <div style={{ fontSize:12, color:T.textSub }}>{selVehicle.driver} · {selVehicle.trip!=="—"?selVehicle.trip:"Not on trip"}</div>
                </div>
                <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                  <div className="dot pulse" style={{ background:statusColors2[selVehicle.status] }} />
                  <span style={{ fontWeight:600, color:statusColors2[selVehicle.status] }}>{selVehicle.status}</span>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:12 }}>
                {[
                  { l:"Speed", v:`${selVehicle.speed} km/h` },
                  { l:"ETA", v:selVehicle.eta },
                  { l:"Load", v:selVehicle.load },
                  { l:"KM Covered", v:`${selVehicle.kmCovered}/${selVehicle.kmTotal} km` },
                  { l:"Last Ping", v:selVehicle.lastPing },
                  { l:"Battery", v:`${selVehicle.battery}%` },
                ].map(k=>(
                  <div key={k.l} style={{ background:T.bgPanel, borderRadius:8, padding:"8px 10px" }}>
                    <div style={{ fontSize:10, color:T.textMuted }}>{k.l}</div>
                    <div style={{ fontSize:12, fontWeight:600, marginTop:2 }}>{k.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize:12, color:T.textSub }}><span style={{ color:T.textMuted }}>Location: </span>{selVehicle.location}</div>
              {selVehicle.route!=="—" && (
                <div style={{ marginTop:8 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:4 }}>
                    <span style={{ color:T.textMuted }}>Route progress</span>
                    <span style={{ color:T.accent }}>{selVehicle.kmCovered} / {selVehicle.kmTotal} km</span>
                  </div>
                  <div className="pbar" style={{ height:6 }}><div className="pfill" style={{ width:`${(selVehicle.kmCovered/selVehicle.kmTotal)*100}%`, background:T.blue }} /></div>
                </div>
              )}
            </div>
          ) : (
            <div className="card" style={{ textAlign:"center", padding:"30px 20px", color:T.textMuted }}>
              <Ic n="truck" s={28} c={T.textMuted} />
              <div style={{ marginTop:8, fontSize:12 }}>Click a vehicle to see live details</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PROFITABILITY COMMAND CENTER
// ═══════════════════════════════════════════════════════════════════════════════
const ProfitabilityPage = () => {
  const [tab, setTab] = useState("overview");

  const VEHICLE_PNL = [
    { num:"TN69 GH4789", type:"Tripper", trips:34, revenue:4820000, maintenance:420000, fuel:380000, tyre:224000, driver:210000, other:65000, totalCost:1299000, kmRun:74875 },
    { num:"TN59 AB1234", type:"Open Body", trips:21, revenue:3950000, maintenance:350000, fuel:312000, tyre:196000, driver:168000, other:52000, totalCost:1078000, kmRun:92340 },
    { num:"TN38 EF9012", type:"Flatbed", trips:28, revenue:2870000, maintenance:180000, fuel:210000, tyre:108000, driver:196000, other:38000, totalCost:732000, kmRun:54220 },
    { num:"TN71 GH3456", type:"Container", trips:22, revenue:5100000, maintenance:290000, fuel:420000, tyre:176000, driver:168000, other:48000, totalCost:1102000, kmRun:88910 },
    { num:"TN22 IJ7890", type:"LCV", trips:15, revenue:820000, maintenance:62000, fuel:42000, tyre:28000, driver:112000, other:18000, totalCost:262000, kmRun:31440 },
    { num:"TN45 CD5678", type:"Trailer", trips:18, revenue:6200000, maintenance:980000, fuel:580000, tyre:162000, driver:144000, other:88000, totalCost:1954000, kmRun:124000 },
  ];

  const totalRev = VEHICLE_PNL.reduce((s,v)=>s+v.revenue,0);
  const totalCost = VEHICLE_PNL.reduce((s,v)=>s+v.totalCost,0);
  const totalProfit = totalRev - totalCost;

  const PROFITABILITY_LEAKS = [
    { issue:"Vehicle TN45 CD5678 — maintenance cost 31% of revenue", severity:"high", potential:280000 },
    { issue:"Fuel efficiency below target on 2 vehicles — est. 12% fuel waste", severity:"medium", potential:85000 },
    { issue:"2 vendor trips with negative margin (cost > freight)", severity:"high", potential:46400 },
    { issue:"Driver advances outstanding > 30d — cash flow impact", severity:"medium", potential:22700 },
    { issue:"Tyre replacement due on 3 vehicles — cost if breakdown: 3x", severity:"medium", potential:15000 },
  ];

  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Profitability Command Center</h1>
        <p style={{ color:T.textSub, fontSize:12 }}>Vehicle-wise P&L, cost breakdown, margin analytics & leak detection</p>
      </div>

      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(5,1fr)", marginBottom:18 }}>
        {[
          { l:"Total Revenue", v:fmt(totalRev), c:T.green },
          { l:"Total Cost", v:fmt(totalCost), c:T.red },
          { l:"Net Profit", v:fmt(totalProfit), c:T.accent },
          { l:"Overall Margin", v:`${((totalProfit/totalRev)*100).toFixed(1)}%`, c:T.blue },
          { l:"Cost Leaks Found", v:PROFITABILITY_LEAKS.filter(l=>l.severity==="high").length, c:T.orange },
        ].map(k=><div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}><div className="stat-v" style={{ color:k.c }}>{k.v}</div><div className="stat-l">{k.l}</div></div>)}
      </div>

      {/* Profit leak alerts */}
      <div className="card" style={{ marginBottom:14, border:`1px solid ${T.orange}44`, background:T.orangeGlow }}>
        <div className="section-title" style={{ color:T.orange }}>💰 Profitability Leak Detection — {fmt(PROFITABILITY_LEAKS.reduce((s,l)=>s+l.potential,0))} at risk</div>
        {PROFITABILITY_LEAKS.map((l,i)=>(
          <div key={i} className="arow" style={{ borderLeftColor:l.severity==="high"?T.red:T.orange }}>
            <div style={{ flex:1 }}><div style={{ fontSize:12, color:T.text }}>{l.issue}</div></div>
            <div style={{ textAlign:"right" }}>
              <span className={`badge ${l.severity==="high"?"br":"bo"}`}>{l.severity}</span>
              <div style={{ fontSize:11, color:T.green, fontWeight:600, marginTop:3 }}>Save {fmt(l.potential)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="tabs">{["overview","vehicle-pnl","cost-breakdown","benchmarks"].map(t=><div key={t} className={`tab ${tab===t?"on":""}`} onClick={()=>setTab(t)}>{t==="vehicle-pnl"?"Vehicle P&L":t==="cost-breakdown"?"Cost Breakdown":t.charAt(0).toUpperCase()+t.slice(1)}</div>)}</div>

      {tab==="overview" && (
        <div className="grd2">
          <div className="card">
            <div className="section-title">Revenue vs Cost by Vehicle</div>
            {VEHICLE_PNL.map(v => {
              const profit = v.revenue - v.totalCost;
              const margin = ((profit/v.revenue)*100).toFixed(1);
              return (
                <div key={v.num} style={{ marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}>
                    <span className="mono" style={{ color:T.accent }}>{v.num}</span>
                    <div style={{ display:"flex", gap:10 }}>
                      <span style={{ color:T.green }}>{fmt(v.revenue)}</span>
                      <span style={{ color:T.red }}>- {fmt(v.totalCost)}</span>
                      <span style={{ color:profit>0?T.accent:T.red, fontWeight:700 }}>= {fmt(profit)} ({margin}%)</span>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:2, height:6, borderRadius:4, overflow:"hidden" }}>
                    <div style={{ width:`${(v.totalCost/v.revenue)*100}%`, background:T.red+"88" }} />
                    <div style={{ flex:1, background:T.green+"88" }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="card">
            <div className="section-title">Cost per KM by Vehicle</div>
            {VEHICLE_PNL.map(v => {
              const cpkm = (v.totalCost/v.kmRun).toFixed(2);
              return (
                <div key={v.num} style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:3 }}>
                    <span className="mono" style={{ color:T.accent }}>{v.num}</span>
                    <span style={{ fontWeight:700, color:parseFloat(cpkm)<15?T.green:parseFloat(cpkm)<20?T.orange:T.red }}>₹{cpkm}/km</span>
                  </div>
                  <div className="pbar"><div className="pfill" style={{ width:`${Math.min((parseFloat(cpkm)/25)*100,100)}%`, background:parseFloat(cpkm)<15?T.green:parseFloat(cpkm)<20?T.orange:T.red }} /></div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab==="vehicle-pnl" && (
        <div className="card" style={{ padding:0 }}>
          <table className="tbl">
            <thead><tr><th>Vehicle</th><th>Type</th><th>Trips</th><th>Revenue</th><th>Maintenance</th><th>Fuel</th><th>Tyre</th><th>Driver</th><th>Total Cost</th><th>Profit</th><th>Margin</th></tr></thead>
            <tbody>
              {VEHICLE_PNL.map(v => {
                const profit = v.revenue-v.totalCost;
                const margin = ((profit/v.revenue)*100).toFixed(1);
                return <tr key={v.num}>
                  <td className="mono" style={{ fontSize:11, color:T.accent }}>{v.num}</td>
                  <td style={{ fontSize:11 }}>{v.type}</td>
                  <td style={{ textAlign:"center" }}>{v.trips}</td>
                  <td style={{ color:T.green, fontWeight:600 }}>{fmt(v.revenue)}</td>
                  <td style={{ color:T.orange }}>{fmt(v.maintenance)}</td>
                  <td style={{ color:T.orange }}>{fmt(v.fuel)}</td>
                  <td style={{ color:T.blue }}>{fmt(v.tyre)}</td>
                  <td>{fmt(v.driver)}</td>
                  <td style={{ color:T.red }}>{fmt(v.totalCost)}</td>
                  <td style={{ fontWeight:700, color:profit>0?T.green:T.red }}>{fmt(profit)}</td>
                  <td><span className={`badge ${parseFloat(margin)>25?"bg":parseFloat(margin)>10?"ba":"br"}`}>{margin}%</span></td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab==="cost-breakdown" && (
        <div className="grd2">
          <div className="card">
            <div className="section-title">Fleet-wide Cost Split</div>
            {[
              { cat:"Fuel", v:VEHICLE_PNL.reduce((s,v)=>s+v.fuel,0), c:T.orange },
              { cat:"Maintenance", v:VEHICLE_PNL.reduce((s,v)=>s+v.maintenance,0), c:T.red },
              { cat:"Driver", v:VEHICLE_PNL.reduce((s,v)=>s+v.driver,0), c:T.blue },
              { cat:"Tyre", v:VEHICLE_PNL.reduce((s,v)=>s+v.tyre,0), c:T.purple },
              { cat:"Other", v:VEHICLE_PNL.reduce((s,v)=>s+v.other,0), c:T.textSub },
            ].map(c=>{
              const pctVal = (c.v/totalCost*100).toFixed(1);
              return <div key={c.cat} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}>
                  <span style={{ color:T.text }}>{c.cat}</span>
                  <span style={{ color:c.c, fontWeight:600 }}>{fmt(c.v)} ({pctVal}%)</span>
                </div>
                <div className="pbar" style={{ height:8 }}><div className="pfill" style={{ width:`${pctVal}%`, background:c.c }} /></div>
              </div>;
            })}
          </div>
          <div className="card">
            <div className="section-title">Industry Benchmarks</div>
            {[
              { metric:"Fuel cost % of revenue", yours:"18.4%", benchmark:"15–20%", status:"good" },
              { metric:"Maintenance % of revenue", yours:"14.2%", benchmark:"8–12%", status:"bad" },
              { metric:"Driver cost % of revenue", yours:"11.2%", benchmark:"12–15%", status:"good" },
              { metric:"Overall margin", yours:`${((totalProfit/totalRev)*100).toFixed(1)}%`, benchmark:"20–30%", status:"watch" },
              { metric:"Breakdown cost % of maint.", yours:"24%", benchmark:"<15%", status:"bad" },
            ].map(b=>(
              <div key={b.metric} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:`1px solid ${T.border}22`, fontSize:12 }}>
                <span style={{ color:T.textSub }}>{b.metric}</span>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <span style={{ fontWeight:600 }}>{b.yours}</span>
                  <span style={{ fontSize:10, color:T.textMuted }}>/ {b.benchmark}</span>
                  <span className={`badge ${b.status==="good"?"bg":b.status==="bad"?"br":"ba"}`}>{b.status==="good"?"✓":b.status==="bad"?"⚠":"~"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
// ═══════════════════════════════════════════════════════════════════════════════
// APP SHELL

// ═══════════════════════════════════════════════════════════════════════════════
// HEAVY EQUIPMENT MODULE — JCB, Excavator, Crane, Roller, etc.
// Hours-based tracking · Site billing · Transportation · AI maintenance
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Equipment Master Data ────────────────────────────────────────────────────
const EQUIPMENT_TYPES = {
  backhoe:    { label:"Backhoe Loader",      icon:"🟡", brands:["JCB 3DX","JCB 4DX","CAT 424"],              billingUnit:"hour",  avgRate:900,  avgFuel:5,  serviceInterval:250,  lifeHours:12000, category:"earthmoving" },
  excavator:  { label:"Hydraulic Excavator", icon:"🦾", brands:["JCB NXT 215","CAT 320","Tata Hitachi 200"],  billingUnit:"hour",  avgRate:1400, avgFuel:15, serviceInterval:500,  lifeHours:15000, category:"earthmoving" },
  miniexcav:  { label:"Mini Excavator",      icon:"🔶", brands:["JCB 30Plus","CAT 308","Komatsu PC35"],        billingUnit:"hour",  avgRate:600,  avgFuel:4,  serviceInterval:250,  lifeHours:10000, category:"earthmoving" },
  roller:     { label:"Vibratory Roller",    icon:"🔵", brands:["JCB VM115","HAMM HD90","Dynapac CA250"],      billingUnit:"hour",  avgRate:700,  avgFuel:8,  serviceInterval:300,  lifeHours:12000, category:"compaction"  },
  crane:      { label:"Hydraulic Crane",     icon:"🏗️", brands:["SANY 50T","Escorts 30T","Tadano"],            billingUnit:"hour",  avgRate:3500, avgFuel:22, serviceInterval:200,  lifeHours:20000, category:"lifting"     },
  telehandler:{ label:"Telehandler",         icon:"🔧", brands:["JCB 540-170","Manitou MT 625"],               billingUnit:"hour",  avgRate:1100, avgFuel:7,  serviceInterval:300,  lifeHours:12000, category:"handling"    },
  grader:     { label:"Motor Grader",        icon:"⚙️", brands:["JCB 140G","CAT 140","Mahindra"],              billingUnit:"hour",  avgRate:1600, avgFuel:18, serviceInterval:250,  lifeHours:15000, category:"earthmoving" },
  concrete:   { label:"Concrete Mixer",      icon:"🔘", brands:["Ajax Fiori","Schwing Stetter"],               billingUnit:"m3",    avgRate:450,  avgFuel:6,  serviceInterval:500,  lifeHours:8000,  category:"concrete"    },
  transit:    { label:"Transit Mixer",       icon:"🔵", brands:["BharatBenz TM","Tata 1616"],                  billingUnit:"trip",  avgRate:2800, avgFuel:20, serviceInterval:500,  lifeHours:null,  category:"concrete"    },
};

const EQUIPMENT_DATA = [
  { id:"EQ-001", regNo:"TN69 JCB001", type:"backhoe",    model:"JCB 3DX",         make:"JCB",         year:2021, serialNo:"JCB3DX2021TN001", purchaseCost:2800000, ownership:"Owned",    status:"On Site",       site:"Madurai Bypass NH7",    operator:"Kannan S",  engineHours:4286,  lastServiceHours:4000, nextServiceHours:4250, fuelPerHour:5,  hourlyRate:900,  dailyMin:8, monthlyHours:180, odomKm:null, deployed:true,  transportCost:25000 },
  { id:"EQ-002", regNo:"TN45 EXC01",  type:"excavator",  model:"JCB NXT 215",     make:"JCB",         year:2022, serialNo:"JCBNXT2022001",    purchaseCost:5200000, ownership:"Owned",    status:"Available",     site:null,                    operator:null,        engineHours:2841,  lastServiceHours:2500, nextServiceHours:3000, fuelPerHour:15, hourlyRate:1400, dailyMin:7, monthlyHours:150, odomKm:null, deployed:false, transportCost:45000 },
  { id:"EQ-003", regNo:"TN22 RLL01",  type:"roller",     model:"JCB VM115",       make:"JCB",         year:2020, serialNo:"JCBVM1152020001",  purchaseCost:1600000, ownership:"Owned",    status:"On Site",       site:"Chennai Port Road",     operator:"Murugan V", engineHours:6120,  lastServiceHours:6000, nextServiceHours:6300, fuelPerHour:8,  hourlyRate:700,  dailyMin:8, monthlyHours:200, odomKm:null, deployed:true,  transportCost:18000 },
  { id:"EQ-004", regNo:"TN38 CRN01",  type:"crane",      model:"SANY STC500T",    make:"SANY",        year:2023, serialNo:"SANY500T2023001",  purchaseCost:12000000,ownership:"Financed", status:"On Site",       site:"Trichy Industrial Park",operator:"Raj Kumar", engineHours:1204,  lastServiceHours:1000, nextServiceHours:1400, fuelPerHour:22, hourlyRate:3500, dailyMin:6, monthlyHours:120, odomKm:null, deployed:true,  transportCost:85000 },
  { id:"EQ-005", regNo:"TN71 MXC01",  type:"miniexcav",  model:"JCB 30Plus",      make:"JCB",         year:2023, serialNo:"JCB30P2023001",    purchaseCost:1400000, ownership:"Owned",    status:"Maintenance",   site:null,                    operator:null,        engineHours:890,   lastServiceHours:750,  nextServiceHours:1000, fuelPerHour:4,  hourlyRate:600,  dailyMin:7, monthlyHours:160, odomKm:null, deployed:false, transportCost:15000 },
  { id:"EQ-006", regNo:"TN59 GRD01",  type:"grader",     model:"JCB 140G",        make:"JCB",         year:2021, serialNo:"JCB140G2021001",   purchaseCost:5800000, ownership:"Owned",    status:"Available",     site:null,                    operator:null,        engineHours:3340,  lastServiceHours:3000, nextServiceHours:3500, fuelPerHour:18, hourlyRate:1600, dailyMin:8, monthlyHours:160, odomKm:null, deployed:false, transportCost:55000 },
];

const SITE_LOG_DATA = [
  { id:"SL-001", eqId:"EQ-001", site:"Madurai Bypass NH7",    client:"NHAI Road Works",   date:"2025-04-15", hoursWorked:9.5, shift:"Day",   operator:"Kannan S",  fuel:48,  work:"Trench excavation — 320m pipeline route", status:"Billed",   billAmount:8550,  approved:true  },
  { id:"SL-002", eqId:"EQ-001", site:"Madurai Bypass NH7",    client:"NHAI Road Works",   date:"2025-04-14", hoursWorked:8.0, shift:"Day",   operator:"Kannan S",  fuel:40,  work:"Foundation trench continuation",         status:"Billed",   billAmount:7200,  approved:true  },
  { id:"SL-003", eqId:"EQ-003", site:"Chennai Port Road",     client:"L&T Construction",  date:"2025-04-15", hoursWorked:10,  shift:"Day",   operator:"Murugan V", fuel:80,  work:"Road compaction — 1.5km WBM layer",      status:"Pending",  billAmount:7000,  approved:false },
  { id:"SL-004", eqId:"EQ-004", site:"Trichy Industrial Park",client:"TIDCO Projects",    date:"2025-04-15", hoursWorked:6.5, shift:"Night", operator:"Raj Kumar", fuel:143, work:"Structural steel lifting — floor 3",     status:"Pending",  billAmount:22750, approved:false },
  { id:"SL-005", eqId:"EQ-001", site:"Madurai Bypass NH7",    client:"NHAI Road Works",   date:"2025-04-13", hoursWorked:7.5, shift:"Day",   operator:"Kannan S",  fuel:38,  work:"Box culvert excavation",                 status:"Billed",   billAmount:6750,  approved:true  },
  { id:"SL-006", eqId:"EQ-003", site:"Chennai Port Road",     client:"L&T Construction",  date:"2025-04-14", hoursWorked:8,   shift:"Day",   operator:"Murugan V", fuel:64,  work:"Sub-grade preparation km 4–6",           status:"Billed",   billAmount:5600,  approved:true  },
];

const SITE_CONTRACTS = [
  { id:"SC-001", eqId:"EQ-001", client:"NHAI Road Works",    site:"Madurai Bypass NH7",    contractType:"Monthly",   minHours:180, ratePerHour:900,  mobilization:25000, startDate:"2025-03-01", endDate:"2025-05-31", advancePaid:100000, totalBilled:287000 },
  { id:"SC-002", eqId:"EQ-003", client:"L&T Construction",   site:"Chennai Port Road",     contractType:"Monthly",   minHours:200, ratePerHour:700,  mobilization:18000, startDate:"2025-02-15", endDate:"2025-06-15", advancePaid:80000,  totalBilled:196000 },
  { id:"SC-003", eqId:"EQ-004", client:"TIDCO Projects",     site:"Trichy Industrial Park",contractType:"Hourly",    minHours:null,ratePerHour:3500, mobilization:85000, startDate:"2025-04-01", endDate:"2025-07-31", advancePaid:300000, totalBilled:98000  },
];

// ─── Hourly Rate Calculator ───────────────────────────────────────────────────
function calcEquipmentHourlyRate(eq) {
  const spec = EQUIPMENT_TYPES[eq.type];
  if (!spec) return null;
  const lifeHours = spec.lifeHours || 12000;
  const purchaseCost = eq.purchaseCost || 2800000;
  const annualHours = eq.monthlyHours * 12;
  const depreciationPerHour = purchaseCost / lifeHours;
  const annualOwnershipCost = purchaseCost * 0.10; // insurance + tax ≈ 10%/yr
  const ownershipPerHour = annualOwnershipCost / annualHours;
  const fuelCostPerHour = (eq.fuelPerHour || spec.avgFuel) * 96; // ₹96/L diesel
  const maintenancePerHour = purchaseCost * 0.08 / annualHours; // 8% of cost/yr
  const operatorPerHour = 15000 / (annualHours / 12); // ₹15k/mo operator
  const overhead = (depreciationPerHour + ownershipPerHour + fuelCostPerHour + maintenancePerHour + operatorPerHour) * 0.15;
  const costPerHour = Math.round(depreciationPerHour + ownershipPerHour + fuelCostPerHour + maintenancePerHour + operatorPerHour + overhead);
  const suggestedRate = Math.round(costPerHour * 1.25); // 25% margin
  return { depreciationPerHour: Math.round(depreciationPerHour), ownershipPerHour: Math.round(ownershipPerHour), fuelCostPerHour: Math.round(fuelCostPerHour), maintenancePerHour: Math.round(maintenancePerHour), operatorPerHour: Math.round(operatorPerHour), overhead: Math.round(overhead), costPerHour, suggestedRate };
}

function calcTransportCost(eq, distKm) {
  const spec = EQUIPMENT_TYPES[eq.type];
  const wt = { backhoe:8.5, excavator:22, miniexcav:3.2, roller:9, crane:38, telehandler:14, grader:18, concrete:10, transit:null }[eq.type] || 10;
  const trucksNeeded = wt > 25 ? 2 : 1;
  const truckRate = wt > 20 ? 85 : 65; // ₹/km for heavy flatbed
  const routePermit = wt > 16 ? 8000 : 3500;
  const escortCost = wt > 25 ? 12000 : 0;
  const loadingCost = wt > 20 ? 8000 : 4000;
  const transport = Math.round(trucksNeeded * truckRate * distKm + routePermit + escortCost + loadingCost);
  return { trucksNeeded, truckRate, routePermit, escortCost, loadingCost, transport, distKm };
}

// ─── Add Equipment Wizard ─────────────────────────────────────────────────────
const AddEquipmentWizard = ({ onClose, onSave }) => {
  const STEPS = ["Identity & Type","Specifications","Tyre & Battery","Site & Billing","Ownership","Review"];
  const TOTAL_STEPS = 6;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    type:"backhoe", model:"", make:"JCB", year:"2023", serialNo:"", regNo:"", purchaseCost:"",
    engineHours:"0", fuelPerHour:"", serviceInterval:"", hourlyRate:"", dailyMin:"8",
    ownership:"Owned", financed:"No", financier:"", emiAmount:"",
    site:"", client:"", contractType:"Monthly", minHours:"", mobilization:"",
    operator:"", insuranceExp:"", notes:"",
    // ── Tyre fields ──────────────────────────────────────────────────
    eqTyreType:"pneumatic",   // pneumatic | solid-rubber | tracks | none
    eqTyreCount:"4",          // how many tyres this equipment has
    eqTyreBrand:"MRF",
    eqTyreSize:"",            // e.g. 14.00-24 (backhoe front), 17.5-25 (loader)
    eqTyrePatternFront:"RIB",
    eqTyrePatternRear:"LUG",
    eqTyreSource:"new",       // new | existing | to-be-fitted
    eqTyrePurchaseCost:"",
    eqTyreWarrantyHours:"3000",
    eqTyreVendor:"",
    eqTyreInvoiceNo:"",
    eqTyreNotes:"",
    // per-position TIN capture
    // eq_tyreTin_FL etc. via rf()
    // ── Battery fields ──────────────────────────────────────────────
    eqBatteryVoltage:"12",    // 12V | 24V | 48V
    eqBatteryCount:"1",
    eqBatteryBrand:"Exide",
    eqBatteryCCA:"800",
    eqBatteryAh:"180",
    eqBatteryPurchaseCost:"",
    eqBatteryInstallDate:"",
    eqBatteryWarrantyMonths:"18",
    eqBatterySource:"new",    // new | existing
    eqBatteryNotes:"",
  });
  const rf = (k,v) => setForm(f=>({...f,[k]:v}));
  const spec = EQUIPMENT_TYPES[form.type];
  const calcRate = form.purchaseCost ? calcEquipmentHourlyRate({ ...form, type:form.type, purchaseCost:parseInt(form.purchaseCost), fuelPerHour:parseInt(form.fuelPerHour||spec?.avgFuel), monthlyHours:parseInt(form.minHours)||160 }) : null;

  // ── Equipment-specific tyre config ─────────────────────────────────────────
  const EQ_TYRE_CONFIGS = {
    backhoe:    { tyreType:"pneumatic", count:4, sizes:["12.5/80-18","14.00-24","17.5L-24"], voltBattery:"12", batteryCCA:800, batteryAh:180, batteryCount:2, note:"Backhoe loaders: 2 front (RIB/ribbed for steering stability) + 2 rear (LUG/traction) pneumatic tyres" },
    excavator:  { tyreType:"tracks",    count:0, sizes:[],              voltBattery:"24", batteryCCA:900, batteryAh:200, batteryCount:2, note:"Excavators run on steel tracks — no tyres. Battery: 24V dual-battery system for hydraulic starters" },
    miniexcav:  { tyreType:"tracks",    count:0, sizes:[],              voltBattery:"12", batteryCCA:600, batteryAh:100, batteryCount:1, note:"Mini excavators use rubber tracks. Battery: 12V single-battery system" },
    roller:     { tyreType:"solid-rubber",count:4, sizes:["23.1-26"],   voltBattery:"12", batteryCCA:700, batteryAh:150, batteryCount:2, note:"Vibratory rollers: solid rubber tyres (no pneumatic — avoids vibration interference). Dual battery 12V" },
    crane:      { tyreType:"pneumatic", count:6, sizes:["20.5R25","23.5R25","26.5R25"], voltBattery:"24", batteryCCA:1000, batteryAh:220, batteryCount:4, note:"Cranes: heavy-duty OTR (Off-The-Road) pneumatic tyres rated for outrigger loads. 24V quad-battery for large diesels" },
    telehandler:{ tyreType:"pneumatic", count:4, sizes:["17.5-25","405/70-24"], voltBattery:"12", batteryCCA:750, batteryAh:165, batteryCount:2, note:"Telehandlers: foam-filled or pneumatic industrial tyres. 12V dual battery" },
    grader:     { tyreType:"pneumatic", count:6, sizes:["17.5R25","20.5R25"], voltBattery:"24", batteryCCA:850, batteryAh:200, batteryCount:2, note:"Motor graders: 6-tyre pneumatic with tandem rear axle. Front 2 steer, rear 4 drive. 24V system" },
    concrete:   { tyreType:"pneumatic", count:4, sizes:["10.00-20"],    voltBattery:"12", batteryCCA:650, batteryAh:140, batteryCount:1, note:"Concrete mixer: standard truck tyres. 12V system" },
    transit:    { tyreType:"pneumatic", count:6, sizes:["10.00-20","295/80 R22.5"], voltBattery:"12", batteryCCA:700, batteryAh:150, batteryCount:2, note:"Transit mixer: truck chassis tyres. Standard truck battery system" },
  };
  const eqTyreCfg = EQ_TYRE_CONFIGS[form.type] || EQ_TYRE_CONFIGS.backhoe;

  // Tyre position labels per equipment type
  const EQ_TYRE_POSITIONS = {
    backhoe:    ["FL","FR","RL","RR"],
    roller:     ["FL","FR","RL","RR"],
    crane:      ["FL","FR","ML","MR","RL","RR"],
    telehandler:["FL","FR","RL","RR"],
    grader:     ["FL","FR","RL1","RR1","RL2","RR2"],
    concrete:   ["FL","FR","RL","RR"],
    transit:    ["FL","FR","RL1","RR1","RL2","RR2"],
  };
  const tyrePositions = EQ_TYRE_POSITIONS[form.type] || [];

  const StepDot = ({ n, label }) => (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
      <div style={{ display:"flex", alignItems:"center", width:"100%" }}>
        {n>1 && <div style={{ flex:1, height:2, background:step>n-1?T.orange:T.border }} />}
        <div style={{ width:26, height:26, borderRadius:"50%", background:step===n?T.orange:step>n?T.green:T.bgPanel, border:`2px solid ${step===n?T.orange:step>n?T.green:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:"#fff", margin:"0 auto" }}>{step>n?"✓":n}</div>
        {n<TOTAL_STEPS && <div style={{ flex:1, height:2, background:step>n?T.green:T.border }} />}
      </div>
      <div style={{ fontSize:8, color:step===n?T.orange:T.textMuted, textAlign:"center", whiteSpace:"nowrap" }}>{label}</div>
    </div>
  );
  const FR = ({children,cols=2}) => (<div style={{ display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap:12, marginBottom:12 }}>{children}</div>);
  const F = ({label,children,hint}) => (<div><label className="flabel">{label}</label>{children}{hint&&<div style={{ fontSize:10, color:T.textMuted, marginTop:3 }}>{hint}</div>}</div>);

  return (
    <div className="ov" style={{ alignItems:"flex-start", paddingTop:20, overflowY:"auto" }}>
      <div className="modal" style={{ maxWidth:700, width:"100%", margin:"0 auto" }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#1C1000,#3D2200,#F9731622)", borderBottom:`1px solid ${T.orange}33` }}>
          <div>
            <div className="rj" style={{ fontSize:20, fontWeight:700, color:T.orange }}>🏗️ Add Heavy Equipment</div>
            <div style={{ fontSize:11, color:T.textSub, marginTop:2 }}>Hours-based tracking · Tyre & Battery master · AI billing · Site deployment</div>
          </div>
          <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
        </div>
        <div className="mbdy">
          <div style={{ display:"flex", marginBottom:22 }}>{STEPS.map((s,i)=><StepDot key={s} n={i+1} label={s} />)}</div>

          {/* ── STEP 1 ── */}
          {step===1 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.orange, marginBottom:16 }}>Step 1 — Equipment Identity & Type</div>
              <div style={{ marginBottom:14 }}>
                <label className="flabel">Equipment Type *</label>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginTop:6 }}>
                  {Object.entries(EQUIPMENT_TYPES).map(([id,t])=>(
                    <div key={id} onClick={()=>{ rf("type",id); rf("fuelPerHour",String(t.avgFuel)); rf("hourlyRate",String(t.avgRate)); rf("serviceInterval",String(t.serviceInterval)); rf("eqTyreType",EQ_TYRE_CONFIGS[id]?.tyreType||"pneumatic"); rf("eqTyreCount",String(EQ_TYRE_CONFIGS[id]?.count||4)); rf("eqBatteryVoltage",EQ_TYRE_CONFIGS[id]?.voltBattery||"12"); rf("eqBatteryCCA",String(EQ_TYRE_CONFIGS[id]?.batteryCCA||750)); rf("eqBatteryAh",String(EQ_TYRE_CONFIGS[id]?.batteryAh||150)); rf("eqBatteryCount",String(EQ_TYRE_CONFIGS[id]?.batteryCount||1)); }}
                      style={{ padding:"9px 10px", borderRadius:9, cursor:"pointer", border:`2px solid ${form.type===id?T.orange:T.border}`, background:form.type===id?T.orangeGlow:T.bgPanel, textAlign:"center", transition:"all .12s" }}>
                      <div style={{ fontSize:20, marginBottom:3 }}>{t.icon}</div>
                      <div style={{ fontSize:10, fontWeight:600, color:form.type===id?T.orange:T.textSub }}>{t.label}</div>
                      <div style={{ fontSize:9, color:T.textMuted, marginTop:1 }}>{t.billingUnit==="hour"?"Hourly billing":t.billingUnit==="m3"?"Per m³":"Per trip"}</div>
                    </div>
                  ))}
                </div>
              </div>
              <FR cols={2}>
                <F label="Make / Brand"><select value={form.make} onChange={e=>rf("make",e.target.value)}><option>JCB</option><option>CAT</option><option>Tata Hitachi</option><option>SANY</option><option>Komatsu</option><option>Volvo CE</option><option>Escorts</option><option>CASE</option><option>Manitou</option></select></F>
                <F label="Model" hint="e.g. JCB 3DX, NXT 215, VM115"><input value={form.model} onChange={e=>rf("model",e.target.value)} placeholder={spec?.brands[0]||"Model name"} /></F>
              </FR>
              <FR cols={3}>
                <F label="Year of Manufacture"><select value={form.year} onChange={e=>rf("year",e.target.value)}>{Array.from({length:15},(_,i)=>2025-i).map(y=><option key={y}>{y}</option>)}</select></F>
                <F label="Serial / Chassis No." hint="OEM serial on chassis plate"><input value={form.serialNo} onChange={e=>rf("serialNo",e.target.value.toUpperCase())} placeholder="JCB3DX2021TN001" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11 }} /></F>
                <F label="Fleet / Reg. No."><input value={form.regNo} onChange={e=>rf("regNo",e.target.value.toUpperCase())} placeholder="TN69 JCB001" style={{ fontFamily:"'JetBrains Mono',monospace" }} /></F>
              </FR>
              {spec && (
                <div style={{ background:T.orangeGlow, border:`1px solid ${T.orange}33`, borderRadius:8, padding:10 }}>
                  <div style={{ fontSize:11, color:T.orange, fontWeight:700, marginBottom:4 }}>🤖 Auto-Detected: {spec.label}</div>
                  <div style={{ display:"flex", gap:16, fontSize:11, color:T.textSub, flexWrap:"wrap" }}>
                    <span>Avg rate: <strong style={{ color:T.accent }}>₹{spec.avgRate}/hr</strong></span>
                    <span>Fuel: <strong style={{ color:T.accent }}>{spec.avgFuel}L/hr</strong></span>
                    <span>Service: <strong style={{ color:T.accent }}>every {spec.serviceInterval} hrs</strong></span>
                    <span>Tyre type: <strong style={{ color:T.cyan }}>{eqTyreCfg.tyreType}</strong></span>
                    <span>Battery: <strong style={{ color:T.cyan }}>{eqTyreCfg.voltBattery}V × {eqTyreCfg.batteryCount}</strong></span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 2 ── Specifications */}
          {step===2 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.orange, marginBottom:16 }}>Step 2 — Technical Specifications & Billing Rate</div>
              <FR cols={3}>
                <F label="Current Engine Hours" hint="Odometer equivalent"><input value={form.engineHours} onChange={e=>rf("engineHours",e.target.value)} placeholder="0" /></F>
                <F label="Fuel Consumption (L/hr)"><input value={form.fuelPerHour} onChange={e=>rf("fuelPerHour",e.target.value)} placeholder={spec?.avgFuel} /></F>
                <F label="Service Interval (hrs)"><input value={form.serviceInterval} onChange={e=>rf("serviceInterval",e.target.value)} placeholder={spec?.serviceInterval} /></F>
              </FR>
              <FR cols={3}>
                <F label="Hourly Billing Rate (₹)"><input value={form.hourlyRate} onChange={e=>rf("hourlyRate",e.target.value)} placeholder={spec?.avgRate} /></F>
                <F label="Daily Minimum Hours"><input value={form.dailyMin} onChange={e=>rf("dailyMin",e.target.value)} placeholder="8" /></F>
                <F label="Purchase Cost (₹)"><input value={form.purchaseCost} onChange={e=>rf("purchaseCost",e.target.value)} placeholder="2800000" /></F>
              </FR>
              {calcRate && (
                <div style={{ background:T.bgPanel, border:`1px solid ${T.orange}44`, borderRadius:10, padding:14 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.orange, marginBottom:10 }}>🤖 AI Hourly Rate Breakdown</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:8 }}>
                    {[{ l:"Depreciation/hr",v:`₹${calcRate.depreciationPerHour}`,c:T.red },{ l:"Ownership/hr",v:`₹${calcRate.ownershipPerHour}`,c:T.orange },{ l:"Fuel cost/hr",v:`₹${calcRate.fuelCostPerHour}`,c:T.accent },{ l:"Maintenance/hr",v:`₹${calcRate.maintenancePerHour}`,c:T.blue },{ l:"Operator/hr",v:`₹${calcRate.operatorPerHour}`,c:T.purple },{ l:"Overhead 15%",v:`₹${calcRate.overhead}`,c:T.textMuted }].map(k=>(
                      <div key={k.l} style={{ background:T.bgCard, borderRadius:7, padding:"7px 10px" }}><div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div><div style={{ fontSize:12, fontWeight:700, color:k.c, marginTop:2 }}>{k.v}</div></div>
                    ))}
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 12px", background:T.bgCard, borderRadius:8 }}>
                    <div><span style={{ color:T.textMuted, fontSize:11 }}>Cost/hr: </span><strong style={{ fontSize:13, color:T.red }}>₹{calcRate.costPerHour}</strong></div>
                    <div><span style={{ color:T.textMuted, fontSize:11 }}>Suggested rate: </span><strong style={{ fontSize:13, color:T.green }}>₹{calcRate.suggestedRate}/hr</strong></div>
                    <div><span style={{ color:T.textMuted, fontSize:11 }}>Margin: </span><strong style={{ fontSize:13, color:T.accent }}>25%</strong></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 3 (NEW) — Tyre & Battery Master ── */}
          {step===3 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.cyan, marginBottom:6 }}>Step 3 — Tyre & Battery Master Setup</div>
              <div style={{ fontSize:11, color:T.textMuted, marginBottom:14 }}>Every tyre and battery is tracked from day 1 — hours-based life, not km-based. These feed into Tyre Intelligence and Maintenance modules automatically.</div>

              {/* Type auto-detected banner */}
              <div style={{ background:T.cyanGlow, border:`1px solid ${T.cyan}33`, borderRadius:8, padding:10, marginBottom:16, display:"flex", gap:10, alignItems:"flex-start" }}>
                <span style={{ fontSize:20 }}>{form.type==="excavator"||form.type==="miniexcav"?"🔗":"🛞"}</span>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:T.cyan }}>{spec?.label} — {eqTyreCfg.tyreType.replace("-"," ").replace(/\b\w/g,c=>c.toUpperCase())} Tyres · {eqTyreCfg.voltBattery}V × {eqTyreCfg.batteryCount} Battery</div>
                  <div style={{ fontSize:11, color:T.textSub, marginTop:3 }}>{eqTyreCfg.note}</div>
                </div>
              </div>

              {/* ═══ TYRE SECTION ═══ */}
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginBottom:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.accent, marginBottom:12 }}>🛞 Tyre Configuration</div>

                {eqTyreCfg.tyreType==="tracks" ? (
                  <div style={{ background:T.bgCard, borderRadius:8, padding:12 }}>
                    <div style={{ fontSize:12, fontWeight:600, color:T.textSub, marginBottom:4 }}>🔗 Track-Based Machine — No Conventional Tyres</div>
                    <div style={{ fontSize:11, color:T.textMuted, marginBottom:10 }}>{form.type==="excavator"?"Hydraulic excavators and mini excavators use steel or rubber undercarriage tracks. Track life is measured in engine hours, not km.":" This machine uses track/crawler undercarriage."}</div>
                    <FR cols={3}>
                      <F label="Track Type"><select onChange={e=>rf("eqTrackType",e.target.value)}><option>Rubber Tracks</option><option>Steel Tracks</option></select></F>
                      <F label="Track Width (mm)"><input onChange={e=>rf("eqTrackWidth",e.target.value)} placeholder="400" /></F>
                      <F label="Estimated Track Life (hrs)"><input onChange={e=>rf("eqTrackLifeHrs",e.target.value)} placeholder="2500" /></F>
                    </FR>
                    <FR cols={2}>
                      <F label="Track Brand / Supplier"><input onChange={e=>rf("eqTrackBrand",e.target.value)} placeholder="Bridgestone, ITR, Berco..." /></F>
                      <F label="Purchase Cost per Track (₹)"><input onChange={e=>rf("eqTrackCost",e.target.value)} placeholder="45000" /></F>
                    </FR>
                  </div>
                ) : (
                  <div>
                    <FR cols={3}>
                      <F label="Tyre Count *"><select value={form.eqTyreCount} onChange={e=>rf("eqTyreCount",e.target.value)}>{["2","4","6","8","10","12"].map(n=><option key={n}>{n}</option>)}</select></F>
                      <F label="Tyre Size *" hint="OTR / industrial sizes"><select value={form.eqTyreSize} onChange={e=>rf("eqTyreSize",e.target.value)}><option value="">— Select size —</option>{eqTyreCfg.sizes.map(s=><option key={s}>{s}</option>)}<option>Custom (enter below)</option></select></F>
                      <F label="Brand"><select value={form.eqTyreBrand} onChange={e=>rf("eqTyreBrand",e.target.value)}>{["MRF","BKT","Apollo","Bridgestone","CEAT","Alliance","Trelleborg","Galaxy"].map(b=><option key={b}>{b}</option>)}</select></F>
                    </FR>
                    <FR cols={3}>
                      <F label="Front Pattern"><select value={form.eqTyrePatternFront} onChange={e=>rf("eqTyrePatternFront",e.target.value)}><option>RIB</option><option>LUG</option><option>BLOCK</option></select></F>
                      <F label="Rear/Drive Pattern"><select value={form.eqTyrePatternRear} onChange={e=>rf("eqTyrePatternRear",e.target.value)}><option>LUG</option><option>RIB</option><option>BLOCK</option></select></F>
                      <F label="Warranty (engine hours)" hint="Equipment tyres tracked by hours"><input value={form.eqTyreWarrantyHours} onChange={e=>rf("eqTyreWarrantyHours",e.target.value)} placeholder="3000" /></F>
                    </FR>
                    {/* Tyre source */}
                    <div style={{ marginBottom:12 }}>
                      <label className="flabel">Tyre Setup Mode</label>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginTop:6 }}>
                        {[["new","🆕","New Tyres Purchased"],["existing","♻️","Existing (Record State)"],["to-be-fitted","⏳","Fit Later"]].map(([v,e,l])=>(
                          <div key={v} onClick={()=>rf("eqTyreSource",v)} style={{ padding:"9px 10px", borderRadius:8, cursor:"pointer", border:`2px solid ${form.eqTyreSource===v?T.cyan:T.border}`, background:form.eqTyreSource===v?T.cyanGlow:T.bgPanel, textAlign:"center" }}>
                            <div style={{ fontSize:16, marginBottom:3 }}>{e}</div>
                            <div style={{ fontSize:10, fontWeight:600, color:form.eqTyreSource===v?T.cyan:T.textSub }}>{l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {form.eqTyreSource==="new" && (
                      <div>
                        <FR cols={3}>
                          <F label="Cost per Tyre (₹)"><input value={form.eqTyrePurchaseCost} onChange={e=>rf("eqTyrePurchaseCost",e.target.value)} placeholder="18000" /></F>
                          <F label="Vendor / Dealer"><input value={form.eqTyreVendor} onChange={e=>rf("eqTyreVendor",e.target.value)} placeholder="BKT Dealer / MRF" /></F>
                          <F label="Invoice No."><input value={form.eqTyreInvoiceNo} onChange={e=>rf("eqTyreInvoiceNo",e.target.value)} placeholder="INV-2025-001" /></F>
                        </FR>
                        {/* Per-position TIN capture */}
                        {tyrePositions.length > 0 && (
                          <div>
                            <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:8 }}>🏷️ Tyre ID (TIN) per Position — stamped on sidewall</div>
                            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
                              {tyrePositions.map(pos => {
                                const isF = pos==="FL"||pos==="FR";
                                return (
                                  <div key={pos} style={{ background:T.bgCard, border:`1px solid ${T.border}`, borderRadius:8, padding:"9px 10px" }}>
                                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                                      <span className="mono" style={{ fontSize:11, fontWeight:700, color:T.orange }}>{pos}</span>
                                      <span style={{ fontSize:9, color:T.textMuted }}>{isF?"Front":"Rear"}</span>
                                    </div>
                                    <div style={{ fontSize:9, color:T.cyan, marginBottom:3 }}>TIN (sidewall)</div>
                                    <input placeholder="e.g. BKT-PU-14-24-0087" value={form[`eq_tyreTin_${pos}`]||""} onChange={e=>rf(`eq_tyreTin_${pos}`,e.target.value)} style={{ fontSize:9, padding:"3px 6px", width:"100%", fontFamily:"'JetBrains Mono',monospace", borderColor:T.cyan+"44" }} />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        {form.eqTyrePurchaseCost && form.eqTyreCount && (
                          <div style={{ background:T.greenGlow, border:`1px solid ${T.green}33`, borderRadius:8, padding:8, marginTop:10, fontSize:11, color:T.textSub }}>
                            Total tyre cost: <strong style={{ color:T.green }}>₹{(parseInt(form.eqTyrePurchaseCost)*parseInt(form.eqTyreCount)).toLocaleString()}</strong> ({form.eqTyreCount} tyres × ₹{parseInt(form.eqTyrePurchaseCost).toLocaleString()})
                          </div>
                        )}
                      </div>
                    )}
                    {form.eqTyreSource==="existing" && (
                      <div style={{ background:T.orangeGlow, border:`1px solid ${T.orange}33`, borderRadius:8, padding:10 }}>
                        <div style={{ fontSize:11, fontWeight:600, color:T.orange, marginBottom:6 }}>♻️ Record Current Tyre State</div>
                        <FR cols={2}>
                          <F label="Hours on current tyres"><input placeholder="1200 hrs" onChange={e=>rf("eqTyreCurrentHrs",e.target.value)} /></F>
                          <F label="Overall condition"><select onChange={e=>rf("eqTyreCond",e.target.value)}><option>Good</option><option>Fair</option><option>Worn</option><option>Critical</option></select></F>
                        </FR>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ═══ BATTERY SECTION ═══ */}
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.yellow||T.accent, marginBottom:12 }}>🔋 Battery Configuration</div>
                <div style={{ background:T.bgCard, border:`1px solid ${T.border}`, borderRadius:8, padding:10, marginBottom:12, fontSize:11, color:T.textSub }}>
                  <strong style={{ color:T.accent }}>{form.make} {form.model||spec?.label}</strong> uses a <strong style={{ color:T.cyan }}>{eqTyreCfg.voltBattery}V system</strong> with <strong style={{ color:T.cyan }}>{eqTyreCfg.batteryCount} battery/batteries</strong>. Recommended: {eqTyreCfg.batteryCCA}+ CCA, {eqTyreCfg.batteryAh}+ Ah for reliable hydraulic system starts.
                </div>
                <FR cols={3}>
                  <F label="Voltage System"><select value={form.eqBatteryVoltage} onChange={e=>rf("eqBatteryVoltage",e.target.value)}><option>12</option><option>24</option><option>48</option></select></F>
                  <F label="Number of Batteries"><select value={form.eqBatteryCount} onChange={e=>rf("eqBatteryCount",e.target.value)}>{["1","2","3","4"].map(n=><option key={n}>{n}</option>)}</select></F>
                  <F label="Brand"><select value={form.eqBatteryBrand} onChange={e=>rf("eqBatteryBrand",e.target.value)}>{["Exide","Amaron","SF Sonic","Luminous","Okaya","Tata Green","Bosch"].map(b=><option key={b}>{b}</option>)}</select></F>
                </FR>
                <FR cols={3}>
                  <F label="CCA (Cold Cranking Amps)" hint="Min. recommended for starters"><input value={form.eqBatteryCCA} onChange={e=>rf("eqBatteryCCA",e.target.value)} placeholder={eqTyreCfg.batteryCCA} /></F>
                  <F label="Capacity (Ah)"><input value={form.eqBatteryAh} onChange={e=>rf("eqBatteryAh",e.target.value)} placeholder={eqTyreCfg.batteryAh} /></F>
                  <F label="Warranty (months)"><input value={form.eqBatteryWarrantyMonths} onChange={e=>rf("eqBatteryWarrantyMonths",e.target.value)} placeholder="18" /></F>
                </FR>
                <FR cols={3}>
                  <F label="Purchase Cost (₹/battery)"><input value={form.eqBatteryPurchaseCost} onChange={e=>rf("eqBatteryPurchaseCost",e.target.value)} placeholder="8500" /></F>
                  <F label="Installation Date"><input type="date" value={form.eqBatteryInstallDate} onChange={e=>rf("eqBatteryInstallDate",e.target.value)} /></F>
                  <F label="Setup Mode"><select value={form.eqBatterySource} onChange={e=>rf("eqBatterySource",e.target.value)}><option value="new">New Battery</option><option value="existing">Existing (record state)</option></select></F>
                </FR>
                {form.eqBatterySource==="existing" && (
                  <div style={{ background:T.orangeGlow, border:`1px solid ${T.orange}33`, borderRadius:8, padding:10, marginTop:4 }}>
                    <FR cols={2}>
                      <F label="Battery install date (approx)"><input type="date" onChange={e=>rf("eqBatteryExistingDate",e.target.value)} /></F>
                      <F label="Current condition"><select onChange={e=>rf("eqBatteryExistingCond",e.target.value)}><option>Good</option><option>Fair</option><option>Weak — needs replacement soon</option></select></F>
                    </FR>
                  </div>
                )}
                {form.eqBatteryPurchaseCost && form.eqBatteryCount && (
                  <div style={{ background:T.greenGlow, border:`1px solid ${T.green}33`, borderRadius:8, padding:8, marginTop:8, fontSize:11, color:T.textSub }}>
                    Total battery cost: <strong style={{ color:T.green }}>₹{(parseInt(form.eqBatteryPurchaseCost)*parseInt(form.eqBatteryCount)).toLocaleString()}</strong> · Replacement alert set at {form.eqBatteryWarrantyMonths} months
                  </div>
                )}
                <div style={{ marginTop:10 }}>
                  <label className="flabel">Battery Notes</label>
                  <textarea value={form.eqBatteryNotes} onChange={e=>rf("eqBatteryNotes",e.target.value)} placeholder="e.g. Replaced both batteries 3 months ago, weak cranking in cold mornings..." style={{ height:45 }} />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 4 — Site & Billing (was step 3) ── */}
          {step===4 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.orange, marginBottom:16 }}>Step 4 — Site Deployment & Contract</div>
              <div style={{ background:T.orangeGlow, border:`1px solid ${T.orange}33`, borderRadius:8, padding:10, marginBottom:14, fontSize:11, color:T.textSub }}>
                💡 Equipment billing is site-based. Each deployment creates a contract with minimum hours and daily hour logs — not trip-based like trucks.
              </div>
              <FR cols={2}>
                <F label="Current Deployment Site"><input value={form.site} onChange={e=>rf("site",e.target.value)} placeholder="Madurai Bypass NH7, km 14–18" /></F>
                <F label="Client / Contractor"><input value={form.client} onChange={e=>rf("client",e.target.value)} placeholder="NHAI / L&T / TIDCO" /></F>
              </FR>
              <FR cols={3}>
                <F label="Contract Type"><select value={form.contractType} onChange={e=>rf("contractType",e.target.value)}><option>Monthly</option><option>Hourly</option><option>Per Day</option><option>Per KM (transport)</option></select></F>
                <F label={form.contractType==="Monthly"?"Monthly Min Hours":"Min Hours/Day"}><input value={form.minHours} onChange={e=>rf("minHours",e.target.value)} placeholder={form.contractType==="Monthly"?"180":"8"} /></F>
                <F label="Mobilization Charge (₹)"><input value={form.mobilization} onChange={e=>rf("mobilization",e.target.value)} placeholder="25000" /></F>
              </FR>
              <FR cols={2}>
                <F label="Assigned Operator"><input value={form.operator} onChange={e=>rf("operator",e.target.value)} placeholder="Operator name" /></F>
                <F label="Insurance Expiry Date"><input type="date" value={form.insuranceExp} onChange={e=>rf("insuranceExp",e.target.value)} /></F>
              </FR>
              {form.purchaseCost && (
                <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.textSub, marginBottom:8 }}>🚛 Transport Cost Estimate to Site</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                    {[30, 80, 200].map(dist => {
                      const c = calcTransportCost({type:form.type, purchaseCost:parseInt(form.purchaseCost)}, dist);
                      return (
                        <div key={dist} style={{ background:T.bgCard, borderRadius:8, padding:"10px 12px" }}>
                          <div style={{ fontSize:10, color:T.textMuted, marginBottom:4 }}>To {dist} km site</div>
                          <div style={{ fontSize:14, fontWeight:700, color:T.orange }}>₹{c.transport.toLocaleString()}</div>
                          <div style={{ fontSize:10, color:T.textMuted, marginTop:3 }}>{c.trucksNeeded} truck{c.trucksNeeded>1?"s":""} · Permit ₹{c.routePermit.toLocaleString()}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 5 — Ownership (was step 4) ── */}
          {step===5 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.orange, marginBottom:16 }}>Step 5 — Ownership & Finance</div>
              <FR cols={2}>
                <F label="Ownership Type"><select value={form.ownership} onChange={e=>rf("ownership",e.target.value)}><option>Owned</option><option>Financed</option><option>Leased</option><option>Hired</option></select></F>
                <F label="Financed?"><select value={form.financed} onChange={e=>rf("financed",e.target.value)}><option>No</option><option>Yes — Bank Loan</option><option>Yes — NBFC</option><option>Yes — Manufacturer Finance</option></select></F>
              </FR>
              {form.financed!=="No" && (
                <FR cols={2}>
                  <F label="Financier"><input value={form.financier} onChange={e=>rf("financier",e.target.value)} placeholder="HDFC, Shriram, Tata Capital..." /></F>
                  <F label="EMI Amount (₹/month)"><input value={form.emiAmount} onChange={e=>rf("emiAmount",e.target.value)} placeholder="85000" /></F>
                </FR>
              )}
              {form.purchaseCost && (
                <div style={{ background:T.greenGlow, border:`1px solid ${T.green}33`, borderRadius:10, padding:14 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.green, marginBottom:8 }}>🤖 Break-even Analysis</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
                    {[
                      { l:"Purchase Cost", v:`₹${(parseInt(form.purchaseCost)/100000).toFixed(1)}L` },
                      { l:"Break-even Hours", v:`${Math.round(parseInt(form.purchaseCost)/(parseInt(form.hourlyRate||spec?.avgRate||900)*0.4)).toLocaleString()} hrs` },
                      { l:"Break-even Months", v:`${Math.round(parseInt(form.purchaseCost)/(parseInt(form.hourlyRate||spec?.avgRate||900)*0.4*(parseInt(form.minHours)||160)))} mo` },
                      { l:"Annual Revenue", v:`₹${((parseInt(form.hourlyRate||spec?.avgRate||900))*(parseInt(form.minHours)||160)*12/100000).toFixed(1)}L` },
                    ].map(k=>(
                      <div key={k.l} style={{ background:T.bgPanel, borderRadius:7, padding:"8px 10px" }}><div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div><div style={{ fontSize:13, fontWeight:700, color:T.green, marginTop:2 }}>{k.v}</div></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 6 — Review (was step 5) ── */}
          {step===6 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:16 }}>Step 6 — Review & Add Equipment</div>
              <div style={{ background:T.bgPanel, border:`1px solid ${T.orange}33`, borderRadius:10, padding:14, marginBottom:12 }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.orange, marginBottom:10 }}>🏗️ Equipment Summary</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:7 }}>
                  {[
                    { l:"Type", v:spec?.label||form.type },{ l:"Model", v:form.model||"—" },{ l:"Make", v:form.make },
                    { l:"Serial No", v:form.serialNo||"—" },{ l:"Fleet No", v:form.regNo||"—" },{ l:"Year", v:form.year },
                    { l:"Engine Hours", v:form.engineHours+" hrs" },{ l:"Hourly Rate", v:`₹${form.hourlyRate||spec?.avgRate}/hr` },
                    { l:"Site", v:form.site||"Not deployed" },
                  ].map(k=>(
                    <div key={k.l} style={{ background:T.bgCard, borderRadius:7, padding:"7px 10px" }}>
                      <div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div>
                      <div style={{ fontSize:11, fontWeight:600, marginTop:2 }}>{k.v}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Tyre & Battery summary */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
                <div style={{ background:T.bgPanel, border:`1px solid ${T.cyan}33`, borderRadius:10, padding:12 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.cyan, marginBottom:8 }}>🛞 Tyre Summary</div>
                  {eqTyreCfg.tyreType==="tracks" ? (
                    <div style={{ fontSize:11, color:T.textSub }}>{form.eqTrackType||"Rubber"} tracks · {form.eqTrackLifeHrs||2500} hrs life</div>
                  ) : (
                    <div style={{ display:"flex", flexDirection:"column", gap:4, fontSize:11 }}>
                      <div><span style={{ color:T.textMuted }}>Count: </span><strong>{form.eqTyreCount}</strong></div>
                      <div><span style={{ color:T.textMuted }}>Brand: </span><strong>{form.eqTyreBrand}</strong></div>
                      <div><span style={{ color:T.textMuted }}>Size: </span><strong>{form.eqTyreSize||"—"}</strong></div>
                      <div><span style={{ color:T.textMuted }}>Setup: </span><strong>{form.eqTyreSource==="new"?"New purchase":form.eqTyreSource==="existing"?"Existing recorded":"Fit later"}</strong></div>
                      {form.eqTyrePurchaseCost && <div><span style={{ color:T.textMuted }}>Total cost: </span><strong style={{ color:T.green }}>₹{(parseInt(form.eqTyrePurchaseCost)*parseInt(form.eqTyreCount)).toLocaleString()}</strong></div>}
                    </div>
                  )}
                </div>
                <div style={{ background:T.bgPanel, border:`1px solid ${T.accent}33`, borderRadius:10, padding:12 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:T.accent, marginBottom:8 }}>🔋 Battery Summary</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:4, fontSize:11 }}>
                    <div><span style={{ color:T.textMuted }}>System: </span><strong>{form.eqBatteryVoltage}V × {form.eqBatteryCount}</strong></div>
                    <div><span style={{ color:T.textMuted }}>Brand: </span><strong>{form.eqBatteryBrand}</strong></div>
                    <div><span style={{ color:T.textMuted }}>Specs: </span><strong>{form.eqBatteryCCA}A CCA · {form.eqBatteryAh}Ah</strong></div>
                    <div><span style={{ color:T.textMuted }}>Warranty: </span><strong>{form.eqBatteryWarrantyMonths} months</strong></div>
                    {form.eqBatteryPurchaseCost && <div><span style={{ color:T.textMuted }}>Total cost: </span><strong style={{ color:T.green }}>₹{(parseInt(form.eqBatteryPurchaseCost)*parseInt(form.eqBatteryCount)).toLocaleString()}</strong></div>}
                  </div>
                </div>
              </div>
              <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:12 }}>
                <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:8 }}>⚙️ Modules Initialized on Save</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                  {[
                    { mod:"Engine Hours Log", icon:"⏱️", ready:true },
                    { mod:"Site Billing",     icon:"🧾", ready:!!form.site },
                    { mod:"PM Schedule",      icon:"🔧", ready:!!form.serviceInterval },
                    { mod:"Tyre Master",      icon:"🛞", ready:eqTyreCfg.tyreType==="tracks"||form.eqTyreCount>0 },
                    { mod:"Battery Monitor",  icon:"🔋", ready:!!form.eqBatteryBrand },
                    { mod:"Fuel Tracking",    icon:"⛽", ready:!!form.fuelPerHour },
                    { mod:"GPS Monitoring",   icon:"📍", ready:true },
                    { mod:"P&L Account",      icon:"💰", ready:!!form.purchaseCost },
                    { mod:"Compliance Alerts",icon:"📄", ready:!!form.insuranceExp },
                  ].map(m=>(
                    <div key={m.mod} style={{ background:m.ready?T.greenGlow:T.bgCard, border:`1px solid ${m.ready?T.green:T.border}33`, borderRadius:8, padding:"8px 10px" }}>
                      <div style={{ fontSize:14, marginBottom:3 }}>{m.icon}</div>
                      <div style={{ fontSize:10, fontWeight:600, color:m.ready?T.green:T.textMuted }}>{m.mod}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:22, paddingTop:14, borderTop:`1px solid ${T.border}` }}>
            <button className="btn btn-gh" onClick={()=>step>1?setStep(s=>s-1):onClose()}>{step===1?"Cancel":"← Back"}</button>
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ fontSize:11, color:T.textMuted, alignSelf:"center" }}>Step {step} of {TOTAL_STEPS}</div>
              <button className="btn" style={{ background:step===TOTAL_STEPS?T.green:T.orange, color:"#080B10", fontWeight:700 }} onClick={()=>step<TOTAL_STEPS?setStep(s=>s+1):(onSave&&onSave(form),onClose())}>
                {step===TOTAL_STEPS?"🏗️ Add Equipment":"Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const HoursLogModal = ({ eq, onClose, onSave }) => {
  const [logForm, setLogForm] = useState({ date:new Date().toISOString().split("T")[0], startHours:"", endHours:"", shift:"Day", operator:eq.operator||"", work:"", fuel:"", breakdown:false, breakdownHours:"0", idleHours:"0" });
  const lf = (k,v) => setLogForm(f=>({...f,[k]:v}));
  const spec = EQUIPMENT_TYPES[eq.type];
  const contract = SITE_CONTRACTS.find(c=>c.eqId===eq.id);
  const workedHrs = logForm.startHours && logForm.endHours ? parseFloat(logForm.endHours)-parseFloat(logForm.startHours)-parseFloat(logForm.idleHours||0) : 0;
  const billedHrs = Math.max(workedHrs, parseInt(eq.dailyMin||8));
  const billAmount = billedHrs * (contract?.ratePerHour || eq.hourlyRate || spec?.avgRate || 900);
  const fuelEst = Math.round(workedHrs * (eq.fuelPerHour || spec?.avgFuel || 8));
  return (
    <div className="ov">
      <div className="modal" style={{ maxWidth:580 }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#0D1A00,#1A3300,#10B98118)", borderBottom:`1px solid ${T.green}33` }}>
          <div>
            <div className="rj" style={{ fontSize:18, fontWeight:700, color:T.green }}>⏱️ Log Engine Hours — {eq.regNo}</div>
            <div style={{ fontSize:11, color:T.textSub, marginTop:2 }}>{eq.model} · Site: {eq.site||"Not deployed"}</div>
          </div>
          <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
        </div>
        <div className="mbdy">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:12 }}>
            <div><label className="flabel">Date</label><input type="date" value={logForm.date} onChange={e=>lf("date",e.target.value)} /></div>
            <div><label className="flabel">Start Engine Hours</label><input type="number" value={logForm.startHours} onChange={e=>lf("startHours",e.target.value)} placeholder={eq.engineHours} /></div>
            <div><label className="flabel">End Engine Hours</label><input type="number" value={logForm.endHours} onChange={e=>lf("endHours",e.target.value)} placeholder={(eq.engineHours+8)} /></div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:12 }}>
            <div><label className="flabel">Shift</label><select value={logForm.shift} onChange={e=>lf("shift",e.target.value)}><option>Day</option><option>Night</option><option>Full Day</option></select></div>
            <div><label className="flabel">Idle Hours (deduct)</label><input type="number" value={logForm.idleHours} onChange={e=>lf("idleHours",e.target.value)} placeholder="0" /></div>
            <div><label className="flabel">Actual Fuel (litres)</label><input type="number" value={logForm.fuel} onChange={e=>lf("fuel",e.target.value)} placeholder={fuelEst} /></div>
          </div>
          <div style={{ marginBottom:12 }}>
            <label className="flabel">Work Description</label>
            <textarea value={logForm.work} onChange={e=>lf("work",e.target.value)} placeholder="e.g. Trench excavation 200m, pipeline route km 4–5, hard soil conditions..." style={{ height:55 }} />
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:14 }}>
            <label style={{ display:"flex", gap:6, alignItems:"center", cursor:"pointer", fontSize:12 }}>
              <input type="checkbox" checked={logForm.breakdown} onChange={e=>lf("breakdown",e.target.checked)} />
              <span>Breakdown occurred today</span>
            </label>
            {logForm.breakdown && (
              <div style={{ flex:1 }}>
                <label className="flabel" style={{ margin:0 }}>Breakdown Hours (deducted)</label>
                <input type="number" value={logForm.breakdownHours} onChange={e=>lf("breakdownHours",e.target.value)} style={{ width:80 }} />
              </div>
            )}
          </div>
          {/* Bill preview */}
          {workedHrs > 0 && (
            <div style={{ background:`linear-gradient(135deg,${T.green}10,${T.accent}08)`, border:`1px solid ${T.green}44`, borderRadius:10, padding:14, marginBottom:12 }}>
              <div style={{ fontSize:11, fontWeight:700, color:T.green, marginBottom:10 }}>💰 Today's Billing Preview</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
                {[
                  { l:"Hours Worked",   v:`${workedHrs.toFixed(1)} hrs`,     c:T.text   },
                  { l:"Hours Billed",   v:`${billedHrs.toFixed(1)} hrs`,     c:billedHrs>workedHrs?T.orange:T.green },
                  { l:"Fuel Used",      v:`${logForm.fuel||fuelEst} L`,      c:T.accent },
                  { l:"Bill Amount",    v:fmt(billAmount),                   c:T.green  },
                ].map(k=>(
                  <div key={k.l} style={{ background:T.bgPanel, borderRadius:8, padding:"9px 10px" }}>
                    <div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:k.c, marginTop:2 }}>{k.v}</div>
                  </div>
                ))}
              </div>
              {billedHrs > workedHrs && (
                <div style={{ marginTop:8, fontSize:11, color:T.orange }}>
                  ⚠️ Daily minimum {eq.dailyMin} hrs applied — client billed for {billedHrs} hrs even though machine ran {workedHrs.toFixed(1)} hrs.
                </div>
              )}
              <div style={{ marginTop:8, fontSize:11, color:T.textMuted }}>Rate: ₹{contract?.ratePerHour||eq.hourlyRate}/hr · Contract: {contract?.contractType||"Hourly"} · Client: {contract?.client||eq.site}</div>
            </div>
          )}
          <div style={{ display:"flex", justifyContent:"flex-end", gap:8 }}>
            <button className="btn btn-gh" onClick={onClose}>Cancel</button>
            <button className="btn" style={{ background:T.green, color:"#fff", fontWeight:600 }} onClick={()=>{ onSave&&onSave({...logForm, workedHrs, billedHrs, billAmount, eqId:eq.id }); onClose(); }}>✅ Save Hours Log</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Heavy Equipment Page ────────────────────────────────────────────────
const HeavyEquipmentPage = () => {
  const [tab, setTab] = useState("fleet");
  const [showAdd, setShowAdd] = useState(false);
  const [showLog, setShowLog] = useState(null);
  const [selEq, setSelEq] = useState(null);
  const [equipment, setEquipment] = useState(EQUIPMENT_DATA);
  const [siteLogs, setSiteLogs] = useState(SITE_LOG_DATA);

  const totalRevenue = siteLogs.filter(l=>l.status==="Billed").reduce((s,l)=>s+l.billAmount,0);
  const pendingBill  = siteLogs.filter(l=>l.status==="Pending").reduce((s,l)=>s+l.billAmount,0);
  const deployed     = equipment.filter(e=>e.deployed);
  const nearService  = equipment.filter(e=>e.nextServiceHours - e.engineHours <= 100);

  const handleSaveLog = (log) => { const id = `SL-${String(siteLogs.length+1).padStart(3,"0")}`; setSiteLogs(l=>[{...log,id,status:"Pending"},...l]); };

  return (
    <div>
      {showAdd && <AddEquipmentWizard onClose={()=>setShowAdd(false)} onSave={e=>setEquipment(q=>[{ id:`EQ-${String(q.length+1).padStart(3,"0")}`, ...e, status:"Available", engineHours:parseInt(e.engineHours)||0, deployed:!!e.site, hourlyRate:parseInt(e.hourlyRate)||900, fuelPerHour:parseInt(e.fuelPerHour)||8, dailyMin:parseInt(e.dailyMin)||8 },...q])} />}
      {showLog && <HoursLogModal eq={showLog} onClose={()=>setShowLog(null)} onSave={handleSaveLog} />}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Heavy Equipment</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>JCB · Excavator · Crane · Roller — hours-based tracking · site billing · AI maintenance</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button className="btn btn-g" onClick={()=>setTab("billing")} style={{ fontSize:12 }}>📋 Pending Bills</button>
          <button className="btn btn-p" onClick={()=>setShowAdd(true)}><Ic n="plus" s={14} c="#080B10" /> Add Equipment</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(6,1fr)", marginBottom:18 }}>
        {[
          { l:"Total Machines", v:equipment.length,                                     c:T.blue   },
          { l:"On Site",        v:deployed.length,                                      c:T.green  },
          { l:"Available",      v:equipment.filter(e=>e.status==="Available").length,   c:T.cyan   },
          { l:"Maintenance",    v:equipment.filter(e=>e.status==="Maintenance").length, c:T.orange },
          { l:"Service Due",    v:nearService.length,                                   c:T.red    },
          { l:"MTD Billed",     v:fmt(totalRevenue),                                   c:T.accent },
        ].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}>
            <div className="stat-v" style={{ color:k.c }}>{k.v}</div>
            <div className="stat-l">{k.l}</div>
          </div>
        ))}
      </div>

      {/* Service due alerts */}
      {nearService.length > 0 && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.red}44`, background:T.redGlow }}>
          <div className="section-title" style={{ color:T.red }}>🔧 Preventive Maintenance Due — {nearService.length} machines</div>
          {nearService.map(e => {
            const spec = EQUIPMENT_TYPES[e.type];
            const hrsLeft = e.nextServiceHours - e.engineHours;
            return (
              <div key={e.id} className="arow" style={{ borderLeftColor:hrsLeft<0?T.red:T.orange }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:3 }}>
                    <span style={{ fontSize:18 }}>{spec?.icon}</span>
                    <span style={{ fontWeight:600, fontSize:12 }}>{e.regNo} — {e.model}</span>
                    <span className={`badge ${hrsLeft<0?"br":"bo"}`}>{hrsLeft<0?`OVERDUE ${Math.abs(hrsLeft)} hrs`:`${hrsLeft} hrs to service`}</span>
                  </div>
                  <div style={{ fontSize:11, color:T.textSub }}>Current: {e.engineHours.toLocaleString()} hrs · Next service at: {e.nextServiceHours.toLocaleString()} hrs · Site: {e.site||"Depot"}</div>
                </div>
                <button className="btn btn-p" style={{ fontSize:10 }} onClick={()=>setTab("maintenance")}>Schedule →</button>
              </div>
            );
          })}
        </div>
      )}

      <div className="tabs">
        {["fleet","hours-log","billing","site-contracts","rate-calculator","maintenance"].map(t=>(
          <div key={t} className={`tab ${tab===t?"on":""}`} onClick={()=>setTab(t)} style={{ textTransform:"capitalize", whiteSpace:"nowrap" }}>
            {t==="hours-log"?"Hours Log":t==="site-contracts"?"Site Contracts":t==="rate-calculator"?"Rate Calculator":t.charAt(0).toUpperCase()+t.slice(1)}
          </div>
        ))}
      </div>

      {/* ── FLEET TAB ── */}
      {tab==="fleet" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            {equipment.map(eq => {
              const spec = EQUIPMENT_TYPES[eq.type];
              const hrsToService = eq.nextServiceHours - eq.engineHours;
              const serviceUrgent = hrsToService < 100;
              const lifeUsedPct = spec?.lifeHours ? Math.round((eq.engineHours/spec.lifeHours)*100) : null;
              return (
                <div key={eq.id} className="card" style={{ border:`1px solid ${serviceUrgent?T.orange:T.border}`, cursor:"pointer", padding:14 }} onClick={()=>setSelEq(eq)}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      <span style={{ fontSize:24 }}>{spec?.icon||"🏗️"}</span>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, color:T.accent, fontFamily:"'JetBrains Mono',monospace" }}>{eq.regNo}</div>
                        <div style={{ fontSize:11, color:T.textSub }}>{eq.model}</div>
                      </div>
                    </div>
                    <span className={`badge ${eq.status==="On Site"?"bg":eq.status==="Available"?"bb":eq.status==="Maintenance"?"bo":"ba"}`}>{eq.status}</span>
                  </div>
                  {/* Engine hours progress */}
                  <div style={{ marginBottom:10 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, marginBottom:3 }}>
                      <span style={{ color:T.textMuted }}>Engine Hours</span>
                      <span style={{ color:T.accent, fontWeight:700 }}>{eq.engineHours.toLocaleString()} hrs</span>
                    </div>
                    <div className="pbar" style={{ height:5 }}>
                      <div className="pfill" style={{ width:`${Math.min(lifeUsedPct||0,100)}%`, background:lifeUsedPct>80?T.red:lifeUsedPct>60?T.orange:T.green }} />
                    </div>
                    <div style={{ fontSize:9, color:T.textMuted, marginTop:2 }}>{lifeUsedPct}% of life used {spec?.lifeHours?`(${(spec.lifeHours-eq.engineHours).toLocaleString()} hrs remaining)`:""}  </div>
                  </div>
                  {/* Service indicator */}
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8, padding:"5px 8px", background:serviceUrgent?T.orangeGlow:T.bgPanel, borderRadius:6 }}>
                    <span style={{ fontSize:10, color:T.textMuted }}>Next PM service</span>
                    <span style={{ fontSize:10, fontWeight:700, color:hrsToService<0?T.red:serviceUrgent?T.orange:T.green }}>
                      {hrsToService<0?`OVERDUE ${Math.abs(hrsToService)} hrs`:`in ${hrsToService} hrs`}
                    </span>
                  </div>
                  {/* Site + billing */}
                  {eq.deployed ? (
                    <div style={{ background:T.green+"12", borderRadius:7, padding:"6px 8px", marginBottom:8 }}>
                      <div style={{ fontSize:10, color:T.green, fontWeight:600 }}>📍 {eq.site}</div>
                      <div style={{ fontSize:10, color:T.textMuted, marginTop:1 }}>₹{eq.hourlyRate}/hr · Min {eq.dailyMin} hrs/day</div>
                    </div>
                  ) : (
                    <div style={{ background:T.blue+"12", borderRadius:7, padding:"6px 8px", marginBottom:8 }}>
                      <div style={{ fontSize:10, color:T.blue }}>📦 At Depot — Ready to deploy</div>
                    </div>
                  )}
                  <div style={{ display:"flex", gap:6 }}>
                    <button className="btn" style={{ flex:1, fontSize:10, background:T.green+"22", color:T.green, border:`1px solid ${T.green}33`, padding:"5px 0" }} onClick={e=>{e.stopPropagation();setShowLog(eq);}}>⏱ Log Hours</button>
                    <button className="btn btn-gh" style={{ flex:1, fontSize:10, padding:"5px 0" }} onClick={e=>{e.stopPropagation();setSelEq(eq);}}>View →</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── HOURS LOG TAB ── */}
      {tab==="hours-log" && (
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <div style={{ fontSize:12, color:T.textSub }}>Daily engine hours log — every running hour is billed to client</div>
            <div style={{ display:"flex", gap:8 }}>
              {equipment.filter(e=>e.deployed).map(e=>(
                <button key={e.id} className="btn btn-g" style={{ fontSize:11 }} onClick={()=>setShowLog(e)}>⏱ Log {e.regNo.split(" ")[1]}</button>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding:0 }}>
            <table className="tbl">
              <thead><tr><th>Log ID</th><th>Equipment</th><th>Date</th><th>Site / Client</th><th>Shift</th><th>Hrs Worked</th><th>Min Applied</th><th>Fuel (L)</th><th>Bill Amt</th><th>Status</th></tr></thead>
              <tbody>
                {siteLogs.map(l => {
                  const eq = equipment.find(e=>e.id===l.eqId);
                  const spec = eq ? EQUIPMENT_TYPES[eq.type] : null;
                  const minHrs = eq?.dailyMin||8;
                  const billedHrs = Math.max(l.hoursWorked, minHrs);
                  return (
                    <tr key={l.id}>
                      <td className="mono" style={{ fontSize:11, color:T.accent }}>{l.id}</td>
                      <td style={{ fontSize:11 }}><span style={{ fontSize:14 }}>{spec?.icon}</span> {eq?.model||l.eqId}</td>
                      <td style={{ fontSize:11 }}>{l.date}</td>
                      <td style={{ fontSize:11 }}>{l.site?.split(",")[0]} · <span style={{ color:T.textMuted }}>{l.client}</span></td>
                      <td><span className={`badge ${l.shift==="Night"?"bb":"bg"}`}>{l.shift}</span></td>
                      <td style={{ fontWeight:600, color:T.text }}>{l.hoursWorked}h</td>
                      <td style={{ color:billedHrs>l.hoursWorked?T.orange:T.green, fontWeight:600 }}>{billedHrs}h {billedHrs>l.hoursWorked?"(min)":""}</td>
                      <td style={{ color:T.accent }}>{l.fuel}L</td>
                      <td style={{ fontWeight:700, color:T.green }}>{fmt(l.billAmount)}</td>
                      <td><span className={`badge ${l.status==="Billed"?"bg":"ba"}`}>{l.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── BILLING TAB ── */}
      {tab==="billing" && (
        <div>
          <div className="grd2" style={{ marginBottom:14 }}>
            <div className="card">
              <div className="section-title">MTD Billing Summary</div>
              {SITE_CONTRACTS.map(sc => {
                const logs = siteLogs.filter(l=>l.eqId===sc.eqId);
                const totalHrs = logs.reduce((s,l)=>s+l.hoursWorked,0);
                const billedAmt = logs.reduce((s,l)=>s+l.billAmount,0);
                const eq = equipment.find(e=>e.id===sc.eqId);
                return (
                  <div key={sc.id} style={{ padding:"10px 0", borderBottom:`1px solid ${T.border}22` }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <div>
                        <div style={{ fontSize:12, fontWeight:600 }}>{eq?.model||sc.eqId}</div>
                        <div style={{ fontSize:11, color:T.textSub }}>{sc.client} · {sc.site?.split(",")[0]}</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontWeight:700, color:T.green }}>{fmt(billedAmt)}</div>
                        <div style={{ fontSize:10, color:T.textMuted }}>{totalHrs.toFixed(1)} hrs · ₹{sc.ratePerHour}/hr</div>
                      </div>
                    </div>
                    <div className="pbar" style={{ height:5 }}><div className="pfill" style={{ width:`${Math.min((totalHrs/(sc.minHours||180))*100,100)}%` }} /></div>
                    <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>{totalHrs.toFixed(1)} / {sc.minHours||"—"} hrs {sc.contractType==="Monthly"?"(monthly min)":"(target)"}</div>
                  </div>
                );
              })}
            </div>
            <div className="card">
              <div className="section-title">Pending Client Bills</div>
              {siteLogs.filter(l=>l.status==="Pending").map(l => {
                const eq = equipment.find(e=>e.id===l.eqId);
                const spec = eq ? EQUIPMENT_TYPES[eq.type] : null;
                return (
                  <div key={l.id} className="arow" style={{ borderLeftColor:T.orange }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12, fontWeight:600 }}>{spec?.icon} {eq?.model} — {l.date}</div>
                      <div style={{ fontSize:11, color:T.textSub }}>{l.client} · {l.hoursWorked} hrs · {l.work?.slice(0,60)}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontWeight:700, color:T.orange }}>{fmt(l.billAmount)}</div>
                      <button className="btn btn-g" style={{ fontSize:10, marginTop:4 }}>Approve →</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── SITE CONTRACTS TAB ── */}
      {tab==="site-contracts" && (
        <div className="card" style={{ padding:0 }}>
          <table className="tbl">
            <thead><tr><th>Contract</th><th>Equipment</th><th>Client</th><th>Site</th><th>Type</th><th>Min Hrs</th><th>Rate/Hr</th><th>Mobilization</th><th>Advance Paid</th><th>MTD Billed</th></tr></thead>
            <tbody>
              {SITE_CONTRACTS.map(sc => {
                const eq = equipment.find(e=>e.id===sc.eqId);
                const spec = eq ? EQUIPMENT_TYPES[eq.type] : null;
                return (
                  <tr key={sc.id}>
                    <td className="mono" style={{ fontSize:11, color:T.accent }}>{sc.id}</td>
                    <td style={{ fontSize:11 }}>{spec?.icon} {eq?.model||sc.eqId}</td>
                    <td style={{ fontSize:11 }}>{sc.client}</td>
                    <td style={{ fontSize:11 }}>{sc.site?.split(",")[0]}</td>
                    <td><span className="badge ba">{sc.contractType}</span></td>
                    <td style={{ fontWeight:600 }}>{sc.minHours||"—"}</td>
                    <td style={{ color:T.green, fontWeight:600 }}>₹{sc.ratePerHour}/hr</td>
                    <td style={{ color:T.orange }}>{fmt(sc.mobilization)}</td>
                    <td style={{ color:T.blue }}>{fmt(sc.advancePaid)}</td>
                    <td style={{ fontWeight:700, color:T.accent }}>{fmt(sc.totalBilled)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── RATE CALCULATOR TAB ── */}
      {tab==="rate-calculator" && (
        <div>
          <div className="card" style={{ marginBottom:14 }}>
            <div className="section-title">🤖 Hourly Rate Cost Analysis — All Equipment</div>
            <div style={{ fontSize:11, color:T.textSub, marginBottom:12 }}>Formula: Depreciation + Ownership Cost + Fuel + Maintenance + Operator + 15% Overhead = Cost/hr → ×1.25 = Billing Rate</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {equipment.map(eq => {
                const rate = calcEquipmentHourlyRate(eq);
                const spec = EQUIPMENT_TYPES[eq.type];
                if (!rate) return null;
                const margin = Math.round(((eq.hourlyRate - rate.costPerHour)/eq.hourlyRate)*100);
                return (
                  <div key={eq.id} style={{ background:T.bgPanel, border:`1px solid ${margin<15?T.red:T.border}`, borderRadius:10, padding:14 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                      <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                        <span style={{ fontSize:20 }}>{spec?.icon}</span>
                        <div>
                          <div style={{ fontSize:13, fontWeight:700 }}>{eq.model}</div>
                          <div style={{ fontSize:11, color:T.textSub }}>{eq.regNo} · {eq.engineHours.toLocaleString()} hrs run</div>
                        </div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontSize:13, fontWeight:700, color:T.red }}>Cost: ₹{rate.costPerHour}/hr</div>
                        <div style={{ fontSize:13, fontWeight:700, color:T.green }}>Billing: ₹{eq.hourlyRate}/hr</div>
                        <div style={{ fontSize:11, color:margin<15?T.red:margin<25?T.orange:T.green }}>Margin: {margin}%</div>
                      </div>
                    </div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {[["Deprec",rate.depreciationPerHour,T.red],["Ownership",rate.ownershipPerHour,T.orange],["Fuel",rate.fuelCostPerHour,T.accent],["Maint.",rate.maintenancePerHour,T.blue],["Operator",rate.operatorPerHour,T.purple],["Overhead",rate.overhead,T.textMuted]].map(([l,v,c])=>(
                        <div key={l} style={{ background:T.bgCard, borderRadius:6, padding:"4px 8px", fontSize:10 }}>
                          <span style={{ color:T.textMuted }}>{l}: </span><span style={{ color:c, fontWeight:600 }}>₹{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card">
            <div className="section-title">Transportation Cost Estimator</div>
            <div style={{ fontSize:11, color:T.textSub, marginBottom:12 }}>Heavy equipment transport requires flatbed trailers, overload permits, and sometimes police escort. Cost varies by weight, distance, and state.</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
              {equipment.slice(0,3).map(eq=>{
                const spec = EQUIPMENT_TYPES[eq.type];
                const dist80 = calcTransportCost(eq, 80);
                const dist200 = calcTransportCost(eq, 200);
                return (
                  <div key={eq.id} style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:12 }}>
                    <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:8 }}>
                      <span style={{ fontSize:18 }}>{spec?.icon}</span>
                      <div><div style={{ fontSize:12, fontWeight:600 }}>{eq.model}</div><div style={{ fontSize:10, color:T.textMuted }}>{dist80.trucksNeeded} truck{dist80.trucksNeeded>1?"s":""} needed</div></div>
                    </div>
                    {[["30 km", calcTransportCost(eq,30).transport],["80 km", dist80.transport],["200 km", dist200.transport]].map(([d,cost])=>(
                      <div key={d} style={{ display:"flex", justifyContent:"space-between", fontSize:11, padding:"4px 0", borderBottom:`1px solid ${T.border}22` }}>
                        <span style={{ color:T.textSub }}>{d}</span>
                        <span style={{ fontWeight:700, color:T.orange }}>₹{cost.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── MAINTENANCE TAB ── */}
      {tab==="maintenance" && (
        <div className="card">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div className="section-title" style={{ margin:0 }}>Preventive Maintenance Schedule — Hours Based</div>
          </div>
          {equipment.map(eq => {
            const spec = EQUIPMENT_TYPES[eq.type];
            const hrsToService = eq.nextServiceHours - eq.engineHours;
            const pct = ((eq.engineHours-eq.lastServiceHours)/(eq.nextServiceHours-eq.lastServiceHours))*100;
            return (
              <div key={eq.id} style={{ padding:"12px 0", borderBottom:`1px solid ${T.border}22`, display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ fontSize:22, flexShrink:0 }}>{spec?.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <div><span style={{ fontWeight:700, fontSize:13 }}>{eq.model}</span> <span className="mono" style={{ fontSize:11, color:T.textMuted }}>{eq.regNo}</span></div>
                    <span style={{ fontSize:12, color:hrsToService<0?T.red:hrsToService<100?T.orange:T.green, fontWeight:700 }}>{hrsToService<0?`OVERDUE ${Math.abs(hrsToService)} hrs`:`${hrsToService} hrs remaining`}</span>
                  </div>
                  <div className="pbar" style={{ height:6, marginBottom:4 }}><div className="pfill" style={{ width:`${Math.min(Math.max(pct,0),100)}%`, background:pct>90?T.red:pct>70?T.orange:T.green }} /></div>
                  <div style={{ display:"flex", gap:16, fontSize:10, color:T.textMuted }}>
                    <span>Last service: {eq.lastServiceHours.toLocaleString()} hrs</span>
                    <span>Next due: {eq.nextServiceHours.toLocaleString()} hrs</span>
                    <span>Current: {eq.engineHours.toLocaleString()} hrs</span>
                    <span>Interval: {spec?.serviceInterval} hrs</span>
                  </div>
                </div>
                <button className="btn btn-p" style={{ fontSize:10, padding:"4px 10px" }} onClick={()=>setTab("fleet")}>Create WO</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Equipment Detail Modal */}
      {selEq && (
        <div className="ov">
          <div className="modal" style={{ maxWidth:620 }}>
            <div className="mhdr" style={{ background:`linear-gradient(135deg,#1C1000,#3D2200)`, borderBottom:`1px solid ${T.orange}33` }}>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <span style={{ fontSize:32 }}>{EQUIPMENT_TYPES[selEq.type]?.icon}</span>
                <div>
                  <div className="rj mono" style={{ fontSize:18, fontWeight:700, color:T.orange }}>{selEq.regNo}</div>
                  <div style={{ fontSize:11, color:T.textSub }}>{selEq.model} · {selEq.make} {selEq.year} · {selEq.serialNo}</div>
                </div>
              </div>
              <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={()=>setSelEq(null)}><Ic n="x" s={14} c={T.textSub} /></button>
            </div>
            <div className="mbdy">
              <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
                <span className={`badge ${selEq.status==="On Site"?"bg":selEq.status==="Available"?"bb":"ba"}`}>{selEq.status}</span>
                <span className="badge ba">{selEq.ownership}</span>
                <span className="badge bc">{EQUIPMENT_TYPES[selEq.type]?.label}</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:14 }}>
                {[
                  { l:"Engine Hours",    v:`${selEq.engineHours.toLocaleString()} hrs` },
                  { l:"Hourly Rate",     v:`₹${selEq.hourlyRate}/hr` },
                  { l:"Fuel Use",        v:`${selEq.fuelPerHour}L/hr` },
                  { l:"Daily Minimum",   v:`${selEq.dailyMin} hrs/day` },
                  { l:"Purchase Cost",   v:`₹${(selEq.purchaseCost/100000).toFixed(1)}L` },
                  { l:"Transport Cost",  v:`₹${selEq.transportCost?.toLocaleString()||"—"}` },
                  { l:"Operator",        v:selEq.operator||"—" },
                  { l:"Site",            v:selEq.site||"At Depot" },
                  { l:"Next PM",         v:`in ${selEq.nextServiceHours-selEq.engineHours} hrs` },
                ].map(k=>(
                  <div key={k.l} style={{ background:T.bgPanel, borderRadius:8, padding:"8px 10px" }}>
                    <div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div>
                    <div style={{ fontSize:11, fontWeight:600, marginTop:2 }}>{k.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button className="btn" style={{ background:T.green+"22", color:T.green, border:`1px solid ${T.green}33`, fontSize:11 }} onClick={()=>{setSelEq(null);setShowLog(selEq);}}>⏱ Log Hours</button>
                <button className="btn btn-b" style={{ fontSize:11 }}>📋 Site Contract</button>
                <button className="btn btn-p" style={{ fontSize:11 }}>🔧 Work Order</button>
                <button className="btn btn-gh" style={{ fontSize:11 }} onClick={()=>setSelEq(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// ═══════════════════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════════════════
// POD — PROOF OF DELIVERY MODULE
// 3-party verified: Consignor → Transporter → Consignee
// ═══════════════════════════════════════════════════════════════════════════════

const POD_DATA_INIT = [
  { id:"POD-001", tripId:"TRP-2025-0041", lrNo:"LR-2025-4891", status:"Delivered & Signed", vehicle:"TN69 GH4789", driver:"Mani Kumar", consignor:"Steel Corp India Ltd", consignorPhone:"044-23456789", consignee:"Ramesh Enterprises", consigneePhone:"9876543210", from:"Chennai", to:"Coimbatore", date:"2025-04-15", dispatchTime:"06:30", deliveryTime:"14:15", material:"HR Coils", qty:22, unit:"MT", deliveredQty:22, shortage:0, damaged:false, receiverName:"Vijay Kumar", receiverPhone:"9876543210", otpVerified:true, gpsLat:11.0168, gpsLng:76.9558, notes:"Delivered in good condition", signatureCaptured:true, photoUploaded:true, locked:true },
  { id:"POD-002", tripId:"TRP-2025-0042", lrNo:"LR-2025-4892", status:"In Transit", vehicle:"TN59 AB1234", driver:"Selvam R", consignor:"Reliance Industries", consignorPhone:"022-12345678", consignee:"Madurai Distributors", consigneePhone:"9944332211", from:"Mumbai", to:"Madurai", date:"2025-04-15", dispatchTime:"08:00", deliveryTime:null, material:"FMCG Goods", qty:18, unit:"MT", deliveredQty:null, shortage:null, damaged:null, receiverName:null, receiverPhone:null, otpVerified:false, gpsLat:null, gpsLng:null, notes:"", signatureCaptured:false, photoUploaded:false, locked:false },
  { id:"POD-003", tripId:"TRP-2025-0043", lrNo:"LR-2025-4893", status:"Delivered — Shortage", vehicle:"TN45 CD5678", driver:"Ramesh P", consignor:"Ambuja Cement", consignorPhone:"079-87654321", consignee:"Nagpur Infra Pvt Ltd", consigneePhone:"9988776655", from:"Pune", to:"Nagpur", date:"2025-04-14", dispatchTime:"05:00", deliveryTime:"13:30", material:"Cement Bags", qty:240, unit:"Bags", deliveredQty:232, shortage:8, damaged:true, receiverName:"Suresh Patel", receiverPhone:"9988776655", otpVerified:true, gpsLat:21.1458, gpsLng:79.0882, notes:"8 bags damaged in transit — wet patch on load floor", signatureCaptured:true, photoUploaded:true, locked:true },
  { id:"POD-004", tripId:"TRP-2025-0044", lrNo:"LR-2025-4894", status:"Pending Delivery", vehicle:"TN71 GH3456", driver:"Vinoth S", consignor:"Tata Steel", consignorPhone:"033-44556677", consignee:"Delhi Steel Traders", consigneePhone:"9911223344", from:"Jamshedpur", to:"Delhi", date:"2025-04-15", dispatchTime:"07:00", deliveryTime:null, material:"Steel Rods", qty:30, unit:"MT", deliveredQty:null, shortage:null, damaged:null, receiverName:null, receiverPhone:null, otpVerified:false, gpsLat:null, gpsLng:null, notes:"", signatureCaptured:false, photoUploaded:false, locked:false },
];

// ─── Delivery Completion Modal ────────────────────────────────────────────────
const DeliveryCompletionModal = ({ pod, onClose, onSave }) => {
  const [dlvStep, setDlvStep] = useState(1);
  const [dlvForm, setDlvForm] = useState({
    deliveredQty: pod.qty || "",
    shortage: "0",
    damaged: false,
    damageType: "Minor",
    damageNotes: "",
    receiverName: "",
    receiverPhone: "",
    otp: "",
    otpSent: false,
    otpVerified: false,
    signatureCaptured: false,
    photoUploaded: false,
    gpsAuto: true,
    notes: "",
    deliveryTime: new Date().toTimeString().slice(0,5),
  });
  const df = (k,v) => setDlvForm(f=>({...f,[k]:v}));

  const shortage = parseInt(dlvForm.deliveredQty||0) < parseInt(pod.qty||0) ? pod.qty - parseInt(dlvForm.deliveredQty||0) : 0;
  const allDone = dlvForm.receiverName && dlvForm.receiverPhone.length>=10 && dlvForm.otpVerified && dlvForm.signatureCaptured;

  const steps = ["Delivery Details","Receiver Info","OTP & Signature","Confirm & Lock"];

  const StepDot = ({ n, label }) => (
    <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
      <div style={{ display:"flex", alignItems:"center", width:"100%" }}>
        {n>1 && <div style={{ flex:1, height:2, background:dlvStep>n-1?T.green:T.border }} />}
        <div style={{ width:26, height:26, borderRadius:"50%", background:dlvStep===n?T.green:dlvStep>n?"#065F46":T.bgPanel, border:`2px solid ${dlvStep===n?T.green:dlvStep>n?T.green:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:"#fff", margin:"0 auto" }}>{dlvStep>n?"✓":n}</div>
        {n<4 && <div style={{ flex:1, height:2, background:dlvStep>n?T.green:T.border }} />}
      </div>
      <div style={{ fontSize:8, color:dlvStep===n?T.green:T.textMuted, textAlign:"center", whiteSpace:"nowrap" }}>{label}</div>
    </div>
  );

  return (
    <div className="ov" style={{ alignItems:"flex-start", paddingTop:20, overflowY:"auto" }}>
      <div className="modal" style={{ maxWidth:580, width:"100%", margin:"0 auto" }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#064E3B,#065F46,#10B98122)", borderBottom:`1px solid ${T.green}33` }}>
          <div>
            <div className="rj" style={{ fontSize:18, fontWeight:700, color:T.green }}>✅ Complete Delivery</div>
            <div style={{ fontSize:11, color:T.textSub }}>{pod.lrNo} · {pod.vehicle} → {pod.to}</div>
          </div>
          <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
        </div>
        <div className="mbdy">
          <div style={{ display:"flex", marginBottom:20 }}>{steps.map((s,i)=><StepDot key={s} n={i+1} label={s} />)}</div>

          {/* STEP 1 — Delivery Details */}
          {dlvStep===1 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:14 }}>Step 1 — What was delivered?</div>
              {/* Pre-filled dispatch info */}
              <div style={{ background:T.bgPanel, borderRadius:8, padding:12, marginBottom:14 }}>
                <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:8 }}>📦 Dispatched Consignment</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, fontSize:11 }}>
                  {[{ l:"Material", v:pod.material },{ l:"Dispatched", v:`${pod.qty} ${pod.unit}` },{ l:"From", v:pod.from }].map(k=>(
                    <div key={k.l}><div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div><div style={{ fontWeight:600, marginTop:1 }}>{k.v}</div></div>
                  ))}
                </div>
                <div style={{ marginTop:8, fontSize:11 }}>
                  <span style={{ color:T.textMuted }}>Consignor: </span><strong>{pod.consignor}</strong>
                  <span style={{ color:T.textMuted, marginLeft:12 }}>Consignee: </span><strong>{pod.consignee}</strong>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
                <div>
                  <label className="flabel">Delivered Quantity *</label>
                  <input type="number" value={dlvForm.deliveredQty} onChange={e=>df("deliveredQty",e.target.value)} style={{ fontSize:16, fontWeight:700, textAlign:"center" }} />
                  <div style={{ fontSize:10, color:T.textMuted, marginTop:3 }}>Unit: {pod.unit}</div>
                </div>
                <div>
                  <label className="flabel">Delivery Time</label>
                  <input type="time" value={dlvForm.deliveryTime} onChange={e=>df("deliveryTime",e.target.value)} />
                  {shortage > 0 && <div style={{ marginTop:6, fontSize:11, color:T.red, fontWeight:700 }}>⚠️ Shortage: {shortage} {pod.unit}</div>}
                </div>
              </div>
              {/* Damage section */}
              <div style={{ marginBottom:12 }}>
                <label className="flabel">Damage / Shortage</label>
                <div style={{ display:"flex", gap:10, marginTop:6 }}>
                  {[["No Damage","✅",false],["Yes — Damaged","❌",true]].map(([l,e,v])=>(
                    <div key={l} onClick={()=>df("damaged",v)} style={{ flex:1, padding:"10px 12px", borderRadius:8, cursor:"pointer", border:`2px solid ${dlvForm.damaged===v?v?T.red:T.green:T.border}`, background:dlvForm.damaged===v?v?T.redGlow:T.greenGlow:T.bgPanel, textAlign:"center", fontSize:12, fontWeight:600, color:dlvForm.damaged===v?v?T.red:T.green:T.textSub }}>
                      {e} {l}
                    </div>
                  ))}
                </div>
              </div>
              {dlvForm.damaged && (
                <div style={{ background:T.redGlow, border:`1px solid ${T.red}33`, borderRadius:8, padding:12 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:8 }}>
                    <div><label className="flabel">Damage Type</label><select value={dlvForm.damageType} onChange={e=>df("damageType",e.target.value)}><option>Minor</option><option>Major</option><option>Partial — some goods</option><option>Water Damage</option><option>Transit Breakage</option></select></div>
                    <div><label className="flabel">📸 Upload Damage Photo</label>
                      <label style={{ display:"block", cursor:"pointer" }}>
                        <input type="file" accept="image/*" style={{ display:"none" }} onChange={e=>{ if(e.target.files?.[0]) df("damagePhoto",e.target.files[0].name); }} />
                        <div style={{ border:`2px dashed ${T.red}44`, borderRadius:7, padding:"6px 10px", textAlign:"center", fontSize:11, color:T.red }}>
                          {dlvForm.damagePhoto ? `✅ ${dlvForm.damagePhoto}` : "📷 Click to upload photo"}
                        </div>
                      </label>
                    </div>
                  </div>
                  <div><label className="flabel">Damage Remarks</label><textarea value={dlvForm.damageNotes} onChange={e=>df("damageNotes",e.target.value)} placeholder="Describe damage in detail..." style={{ height:55 }} /></div>
                </div>
              )}
              <div><label className="flabel">Delivery Notes (optional)</label><input value={dlvForm.notes} onChange={e=>df("notes",e.target.value)} placeholder="Any remarks, special delivery conditions..." /></div>
            </div>
          )}

          {/* STEP 2 — Receiver Info */}
          {dlvStep===2 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:14 }}>Step 2 — Who received the goods?</div>
              <div style={{ background:T.blueGlow, border:`1px solid ${T.blue}33`, borderRadius:8, padding:10, marginBottom:14, fontSize:11, color:T.textSub }}>
                📱 Enter receiver's mobile number — OTP will be sent for digital signature verification. This makes the POD legally defensible.
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
                <div>
                  <label className="flabel">Receiver Name *</label>
                  <input value={dlvForm.receiverName} onChange={e=>df("receiverName",e.target.value)} placeholder="Full name of person receiving goods" style={{ fontSize:13 }} />
                </div>
                <div>
                  <label className="flabel">Receiver Phone * (for OTP)</label>
                  <input type="tel" value={dlvForm.receiverPhone} onChange={e=>df("receiverPhone",e.target.value)} placeholder="+91 98765 43210" maxLength={13} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13, letterSpacing:1 }} />
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <div>
                  <label className="flabel">Receiver Designation</label>
                  <input value={dlvForm.receiverDesig||""} onChange={e=>df("receiverDesig",e.target.value)} placeholder="Store Manager, Supervisor..." />
                </div>
                <div>
                  <label className="flabel">📸 Upload POD Photo</label>
                  <label style={{ display:"block", cursor:"pointer" }}>
                    <input type="file" accept="image/*" style={{ display:"none" }} onChange={e=>{ if(e.target.files?.[0]) df("photoUploaded",true); df("photoName",e.target.files?.[0]?.name||"photo.jpg"); }} />
                    <div style={{ border:`2px dashed ${T.border}`, borderRadius:7, padding:"7px 10px", textAlign:"center", fontSize:11, color:dlvForm.photoUploaded?T.green:T.textMuted }}>
                      {dlvForm.photoUploaded ? `✅ ${dlvForm.photoName}` : "📷 Capture delivery photo (optional)"}
                    </div>
                  </label>
                </div>
              </div>
              {/* GPS auto-stamp */}
              <div style={{ marginTop:12, display:"flex", gap:8, alignItems:"center", padding:"8px 12px", background:T.bgPanel, borderRadius:8 }}>
                <span style={{ fontSize:16 }}>📍</span>
                <div style={{ flex:1, fontSize:11 }}>
                  <div style={{ fontWeight:600 }}>GPS Location Stamp</div>
                  <div style={{ color:T.textMuted, marginTop:1 }}>Location will be auto-captured at time of POD submission</div>
                </div>
                <span style={{ fontSize:11, color:T.green }}>✅ Auto</span>
              </div>
            </div>
          )}

          {/* STEP 3 — OTP + Signature */}
          {dlvStep===3 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:14 }}>Step 3 — OTP Verification & Digital Signature</div>

              {/* OTP section */}
              <div style={{ background:T.bgPanel, border:`1px solid ${dlvForm.otpVerified?T.green:T.border}`, borderRadius:10, padding:14, marginBottom:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:dlvForm.otpVerified?T.green:T.textSub, marginBottom:8 }}>
                  {dlvForm.otpVerified ? "✅ OTP Verified — Receiver identity confirmed" : "📱 OTP Verification"}
                </div>
                {!dlvForm.otpVerified && (
                  <>
                    <div style={{ fontSize:11, color:T.textSub, marginBottom:10 }}>Sending OTP to: <strong style={{ color:T.blue }}>{dlvForm.receiverPhone}</strong> for <strong>{dlvForm.receiverName}</strong></div>
                    {!dlvForm.otpSent ? (
                      <button className="btn" style={{ background:T.blue, color:"#fff" }} onClick={()=>df("otpSent",true)}>📱 Send OTP</button>
                    ) : (
                      <div>
                        <div style={{ display:"flex", gap:10, marginBottom:8 }}>
                          <input value={dlvForm.otp} onChange={e=>df("otp",e.target.value)} placeholder="Enter 6-digit OTP" maxLength={6} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:18, letterSpacing:6, fontWeight:700, textAlign:"center", flex:1 }} />
                          <button className="btn" style={{ background:T.green, color:"#fff", padding:"0 16px" }} onClick={()=>{ if(dlvForm.otp.length>=4) df("otpVerified",true); }}>Verify</button>
                        </div>
                        <div style={{ fontSize:10, color:T.textMuted }}>OTP sent to {dlvForm.receiverPhone} · Demo: enter any 4+ digits</div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Signature pad */}
              <div style={{ background:T.bgPanel, border:`1px solid ${dlvForm.signatureCaptured?T.green:T.border}`, borderRadius:10, padding:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:dlvForm.signatureCaptured?T.green:T.textSub, marginBottom:8 }}>
                  {dlvForm.signatureCaptured ? "✅ Signature Captured" : "✍️ Digital Signature Pad"}
                </div>
                {!dlvForm.signatureCaptured ? (
                  <div>
                    <div style={{ background:T.bgCard, border:`2px dashed ${T.border}`, borderRadius:8, height:120, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10, cursor:"crosshair", position:"relative", overflow:"hidden" }}
                      onClick={()=>df("signatureCaptured",true)}>
                      <div style={{ textAlign:"center", color:T.textMuted }}>
                        <div style={{ fontSize:28, marginBottom:4 }}>✍️</div>
                        <div style={{ fontSize:12 }}>Draw signature here</div>
                        <div style={{ fontSize:10, marginTop:2 }}>Finger / stylus · Click to simulate capture</div>
                      </div>
                    </div>
                    <div style={{ fontSize:10, color:T.textMuted }}>Receiver: <strong>{dlvForm.receiverName}</strong> · {new Date().toLocaleString()}</div>
                  </div>
                ) : (
                  <div style={{ background:T.greenGlow, borderRadius:8, padding:12 }}>
                    <div style={{ fontSize:12, color:T.green }}>Signature captured for <strong>{dlvForm.receiverName}</strong></div>
                    <div style={{ fontSize:10, color:T.textMuted, marginTop:3 }}>{new Date().toLocaleString()} · GPS: auto-stamped</div>
                    <button className="btn btn-gh" style={{ marginTop:8, fontSize:10 }} onClick={()=>df("signatureCaptured",false)}>Re-sign</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4 — Confirm & Lock */}
          {dlvStep===4 && (
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:T.green, marginBottom:14 }}>Step 4 — Final Review & Lock POD</div>
              {/* Verification badges */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
                {[
                  { label:"Delivery Details",    done:!!dlvForm.deliveredQty, icon:"📦" },
                  { label:"Receiver Info",        done:!!dlvForm.receiverName&&dlvForm.receiverPhone.length>=10, icon:"👤" },
                  { label:"OTP Verified",         done:dlvForm.otpVerified,   icon:"📱" },
                  { label:"Signature Captured",   done:dlvForm.signatureCaptured, icon:"✍️" },
                  { label:"GPS Location",         done:dlvForm.gpsAuto,       icon:"📍" },
                  { label:"Timestamp",            done:true,                  icon:"🕐" },
                ].map(v=>(
                  <div key={v.label} style={{ display:"flex", gap:8, alignItems:"center", padding:"8px 10px", background:v.done?T.greenGlow:T.bgPanel, border:`1px solid ${v.done?T.green:T.border}33`, borderRadius:8 }}>
                    <span style={{ fontSize:16 }}>{v.done?"✅":"⬜"}</span>
                    <div>
                      <div style={{ fontSize:12, fontWeight:600, color:v.done?T.green:T.textMuted }}>{v.icon} {v.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* POD Summary card */}
              <div style={{ background:T.bgPanel, border:`1px solid ${T.accent}33`, borderRadius:10, padding:14, marginBottom:14 }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.accent, marginBottom:10 }}>📄 POD Summary — {pod.lrNo}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, fontSize:11 }}>
                  {[
                    { l:"Consignor", v:pod.consignor },{ l:"Consignee", v:pod.consignee },
                    { l:"Material", v:pod.material },{ l:"Dispatched", v:`${pod.qty} ${pod.unit}` },
                    { l:"Delivered", v:`${dlvForm.deliveredQty} ${pod.unit}` },
                    { l:"Shortage", v:shortage>0?`${shortage} ${pod.unit} ⚠️`:"None ✅" },
                    { l:"Damaged", v:dlvForm.damaged?"Yes — "+dlvForm.damageType:"No" },
                    { l:"Receiver", v:dlvForm.receiverName||"—" },
                    { l:"Delivery Time", v:dlvForm.deliveryTime },
                    { l:"Vehicle", v:pod.vehicle },
                  ].map(k=>(
                    <div key={k.l} style={{ background:T.bgCard, borderRadius:6, padding:"6px 8px" }}>
                      <div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div>
                      <div style={{ fontSize:11, fontWeight:600, marginTop:1 }}>{k.v}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Verified badge */}
              {allDone && (
                <div style={{ background:`linear-gradient(135deg,${T.green}18,${T.cyan}12)`, border:`1px solid ${T.green}44`, borderRadius:10, padding:14, textAlign:"center" }}>
                  <div style={{ fontSize:24, marginBottom:6 }}>🏆</div>
                  <div className="rj" style={{ fontSize:16, fontWeight:700, color:T.green }}>Verified Delivery Badge</div>
                  <div style={{ fontSize:11, color:T.textSub, marginTop:4 }}>✔ Signed · ✔ OTP Verified · ✔ GPS Stamped · ✔ Time Stamped</div>
                  <div style={{ fontSize:10, color:T.textMuted, marginTop:4 }}>Once locked — document cannot be edited. PDF will be generated and shared.</div>
                </div>
              )}
            </div>
          )}

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:20, paddingTop:14, borderTop:`1px solid ${T.border}` }}>
            <button className="btn btn-gh" onClick={()=>dlvStep>1?setDlvStep(s=>s-1):onClose()}>{dlvStep===1?"Cancel":"← Back"}</button>
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ fontSize:11, color:T.textMuted, alignSelf:"center" }}>Step {dlvStep} of 4</div>
              <button
                className="btn"
                style={{ background:dlvStep===4?T.green:T.accent, color:"#080B10", fontWeight:700 }}
                disabled={dlvStep===4&&!allDone}
                onClick={()=>{
                  if(dlvStep<4) setDlvStep(s=>s+1);
                  else {
                    onSave({ ...pod, ...dlvForm, shortage, status:shortage>0?"Delivered — Shortage":"Delivered & Signed", locked:true, otpVerified:dlvForm.otpVerified, signatureCaptured:dlvForm.signatureCaptured });
                    onClose();
                  }
                }}
              >
                {dlvStep===4 ? (allDone?"🔒 Lock & Generate POD":"Complete steps above") : "Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── POD Detail View Modal ────────────────────────────────────────────────────
const PODDetailModal = ({ pod, onClose }) => {
  const statusColor = { "Delivered & Signed":T.green, "In Transit":T.blue, "Delivered — Shortage":T.orange, "Pending Delivery":T.textMuted };
  return (
    <div className="ov">
      <div className="modal" style={{ maxWidth:600 }}>
        <div className="mhdr" style={{ background:`linear-gradient(135deg,#064E3B,#065F46)`, borderBottom:`1px solid ${T.green}33` }}>
          <div>
            <div className="rj mono" style={{ fontSize:18, fontWeight:700, color:T.green }}>{pod.lrNo}</div>
            <div style={{ fontSize:11, color:T.textSub }}>{pod.vehicle} · {pod.from} → {pod.to}</div>
          </div>
          <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
        </div>
        <div className="mbdy">
          {/* Status + verified badge */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <span className="badge" style={{ background:(statusColor[pod.status]||T.textMuted)+"22", color:statusColor[pod.status]||T.textMuted }}>{pod.status}</span>
            {pod.locked && (
              <div style={{ display:"flex", gap:6, alignItems:"center", background:T.green+"18", border:`1px solid ${T.green}33`, borderRadius:8, padding:"4px 10px" }}>
                <span style={{ fontSize:12 }}>🏆</span>
                <span style={{ fontSize:11, color:T.green, fontWeight:700 }}>Verified Delivery</span>
              </div>
            )}
          </div>
          {/* 3-party section */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:14 }}>
            {[
              { role:"📤 Consignor (Sender)", name:pod.consignor, phone:pod.consignorPhone, col:T.blue },
              { role:"🚛 Transporter", name:pod.vehicle+" · "+pod.driver, phone:"—", col:T.accent },
              { role:"📥 Consignee (Receiver)", name:pod.consignee, phone:pod.consigneePhone, col:T.green },
            ].map(p=>(
              <div key={p.role} style={{ background:T.bgPanel, border:`1px solid ${p.col}22`, borderRadius:8, padding:"10px 10px" }}>
                <div style={{ fontSize:9, color:p.col, fontWeight:700, marginBottom:4 }}>{p.role}</div>
                <div style={{ fontSize:11, fontWeight:600 }}>{p.name}</div>
                <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>{p.phone}</div>
              </div>
            ))}
          </div>
          {/* Consignment details */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:14 }}>
            {[
              { l:"Material", v:pod.material },
              { l:"Dispatched", v:`${pod.qty} ${pod.unit}` },
              { l:"Delivered", v:pod.deliveredQty!=null?`${pod.deliveredQty} ${pod.unit}`:"—" },
              { l:"Shortage", v:pod.shortage!=null?(pod.shortage>0?`⚠️ ${pod.shortage} ${pod.unit}`:"None ✅"):"—" },
            ].map(k=>(
              <div key={k.l} style={{ background:T.bgPanel, borderRadius:7, padding:"8px 10px" }}>
                <div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div>
                <div style={{ fontSize:12, fontWeight:600, marginTop:2 }}>{k.v}</div>
              </div>
            ))}
          </div>
          {/* Timeline */}
          <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:10 }}>📋 Delivery Timeline</div>
            {[
              { event:"POD Created", time:pod.date+" "+pod.dispatchTime, done:true, icon:"📄" },
              { event:"Dispatched from "+pod.from, time:pod.date+" "+pod.dispatchTime, done:true, icon:"🚛" },
              { event:"In Transit", time:"Live GPS", done:pod.status!=="Pending Delivery", icon:"📍" },
              { event:"Delivered at "+pod.to, time:pod.deliveryTime?pod.date+" "+pod.deliveryTime:"Pending", done:!!pod.deliveryTime, icon:"📦" },
              { event:"OTP Verified", time:pod.otpVerified?"Verified":"Pending", done:pod.otpVerified, icon:"📱" },
              { event:"Signature Captured", time:pod.signatureCaptured?"Signed":"Pending", done:pod.signatureCaptured, icon:"✍️" },
              { event:"POD Locked & PDF Generated", time:pod.locked?"Completed":"Pending", done:pod.locked, icon:"🔒" },
            ].map((ev,i)=>(
              <div key={i} style={{ display:"flex", gap:10, marginBottom:8, alignItems:"flex-start" }}>
                <div style={{ width:20, height:20, borderRadius:"50%", background:ev.done?T.greenGlow:T.bgCard, border:`2px solid ${ev.done?T.green:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, flexShrink:0, marginTop:1 }}>
                  {ev.done?"✓":""}
                </div>
                <div>
                  <div style={{ fontSize:12, fontWeight:500, color:ev.done?T.text:T.textMuted }}>{ev.icon} {ev.event}</div>
                  <div style={{ fontSize:10, color:T.textMuted, marginTop:1 }}>{ev.time}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Receiver + signature info */}
          {pod.receiverName && (
            <div style={{ background:T.greenGlow, border:`1px solid ${T.green}33`, borderRadius:8, padding:12, marginBottom:12 }}>
              <div style={{ fontSize:11, fontWeight:700, color:T.green, marginBottom:6 }}>✅ Received By</div>
              <div style={{ display:"flex", gap:16, fontSize:11 }}>
                <span><span style={{ color:T.textMuted }}>Name: </span><strong>{pod.receiverName}</strong></span>
                <span><span style={{ color:T.textMuted }}>Phone: </span><strong>{pod.receiverPhone}</strong></span>
                {pod.otpVerified && <span style={{ color:T.green }}>📱 OTP Verified</span>}
                {pod.signatureCaptured && <span style={{ color:T.green }}>✍️ Signed</span>}
              </div>
              {pod.gpsLat && <div style={{ fontSize:10, color:T.textMuted, marginTop:4 }}>📍 GPS: {pod.gpsLat.toFixed(4)}, {pod.gpsLng.toFixed(4)}</div>}
            </div>
          )}
          {pod.damaged && (
            <div style={{ background:T.redGlow, border:`1px solid ${T.red}33`, borderRadius:8, padding:12, marginBottom:12 }}>
              <div style={{ fontSize:11, fontWeight:700, color:T.red, marginBottom:4 }}>⚠️ Damage Recorded</div>
              <div style={{ fontSize:11, color:T.textSub }}>{pod.notes}</div>
            </div>
          )}
          <div style={{ display:"flex", gap:8 }}>
            {pod.locked && <button className="btn btn-p" style={{ fontSize:11 }}>📄 Download PDF</button>}
            {pod.locked && <button className="btn btn-g" style={{ fontSize:11 }}>📤 Share via WhatsApp</button>}
            {pod.locked && <button className="btn btn-b" style={{ fontSize:11 }}>📧 Email POD</button>}
            <button className="btn btn-gh" style={{ fontSize:11 }} onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── POD Main Page ────────────────────────────────────────────────────────────
const PODPage = () => {
  const [pods, setPods] = useState(POD_DATA_INIT);
  const [showComplete, setShowComplete] = useState(null);
  const [showDetail, setShowDetail] = useState(null);
  const [tab, setTab] = useState("all");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleSavePOD = (updated) => setPods(p=>p.map(pod=>pod.id===updated.id?updated:pod));
  const statusColor = { "Delivered & Signed":T.green, "In Transit":T.blue, "Delivered — Shortage":T.orange, "Pending Delivery":T.textMuted };
  const filtered = filterStatus==="All" ? pods : pods.filter(p=>p.status===filterStatus);
  const pending = pods.filter(p=>!p.locked);
  const delivered = pods.filter(p=>p.locked);
  const shortage = pods.filter(p=>p.shortage>0);

  return (
    <div>
      {showComplete && <DeliveryCompletionModal pod={showComplete} onClose={()=>setShowComplete(null)} onSave={handleSavePOD} />}
      {showDetail && <PODDetailModal pod={showDetail} onClose={()=>setShowDetail(null)} />}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Proof of Delivery (POD)</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>3-party verified · OTP signature · GPS stamped · legally defensible delivery records</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button className="btn btn-b" style={{ fontSize:11 }}>📄 Bulk Download</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(5,1fr)", marginBottom:18 }}>
        {[
          { l:"Total PODs",   v:pods.length,                              c:T.blue   },
          { l:"Verified & Locked",v:delivered.length,                    c:T.green  },
          { l:"Pending",      v:pending.length,                          c:T.orange },
          { l:"Shortage Cases",v:shortage.length,                        c:T.red    },
          { l:"Verified Badge",v:delivered.filter(p=>p.otpVerified).length,c:T.cyan },
        ].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}>
            <div className="stat-v" style={{ color:k.c }}>{k.v}</div>
            <div className="stat-l">{k.l}</div>
          </div>
        ))}
      </div>

      {/* Pending action alerts */}
      {pending.length > 0 && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.orange}44`, background:T.orangeGlow }}>
          <div className="section-title" style={{ color:T.orange }}>⏳ Awaiting Delivery Completion — {pending.length} trips</div>
          {pending.map(p=>(
            <div key={p.id} className="arow" style={{ borderLeftColor:T.orange }}>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:3 }}>
                  <span className="mono" style={{ fontSize:12, color:T.accent, fontWeight:700 }}>{p.lrNo}</span>
                  <span style={{ fontSize:12 }}>{p.vehicle} · {p.driver}</span>
                  <span className="badge" style={{ background:(statusColor[p.status]||T.textMuted)+"22", color:statusColor[p.status]||T.textMuted }}>{p.status}</span>
                </div>
                <div style={{ fontSize:11, color:T.textSub }}>{p.consignor} → {p.consignee} · {p.material} · {p.qty} {p.unit}</div>
                <div style={{ fontSize:11, color:T.textMuted }}>{p.from} → {p.to}</div>
              </div>
              <button className="btn" style={{ background:T.green+"22", color:T.green, border:`1px solid ${T.green}33`, fontSize:11 }} onClick={()=>setShowComplete(p)}>
                ✅ Complete Delivery
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Shortage alerts */}
      {shortage.length > 0 && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.red}44`, background:T.redGlow }}>
          <div className="section-title" style={{ color:T.red }}>⚠️ Shortage / Damage Cases — {shortage.length} PODs</div>
          {shortage.map(p=>(
            <div key={p.id} className="arow" style={{ borderLeftColor:T.red }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.red }}>{p.lrNo} · {p.consignee}</div>
                <div style={{ fontSize:11, color:T.textSub }}>Shortage: {p.shortage} {p.unit} · {p.damaged?"Damage reported":"No damage"}</div>
                <div style={{ fontSize:11, color:T.textMuted }}>{p.notes?.slice(0,80)}</div>
              </div>
              <button className="btn" style={{ fontSize:10, background:T.redGlow, color:T.red, border:`1px solid ${T.red}33` }} onClick={()=>setShowDetail(p)}>View →</button>
            </div>
          ))}
        </div>
      )}

      {/* Filter tabs */}
      <div style={{ display:"flex", gap:8, marginBottom:12 }}>
        <div className="tabs" style={{ marginBottom:0 }}>
          {["All","In Transit","Pending Delivery","Delivered & Signed","Delivered — Shortage"].map(s=>(
            <div key={s} className={`tab ${filterStatus===s?"on":""}`} onClick={()=>setFilterStatus(s)} style={{ fontSize:11 }}>{s}</div>
          ))}
        </div>
      </div>

      {/* POD table */}
      <div className="card" style={{ padding:0 }}>
        <table className="tbl">
          <thead><tr><th>LR No</th><th>Date</th><th>Consignor</th><th>Consignee</th><th>Vehicle</th><th>Material</th><th>Qty</th><th>Delivered</th><th>OTP</th><th>Signature</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {filtered.map(p=>(
              <tr key={p.id} style={{ cursor:"pointer" }} onClick={()=>setShowDetail(p)}>
                <td className="mono" style={{ fontSize:11, color:T.accent, fontWeight:700 }}>{p.lrNo}</td>
                <td style={{ fontSize:11 }}>{p.date}</td>
                <td style={{ fontSize:11 }}>{p.consignor?.split(" ").slice(0,2).join(" ")}</td>
                <td style={{ fontSize:11 }}>{p.consignee?.split(" ").slice(0,2).join(" ")}</td>
                <td className="mono" style={{ fontSize:11 }}>{p.vehicle}</td>
                <td style={{ fontSize:11 }}>{p.material}</td>
                <td style={{ fontWeight:600 }}>{p.qty} {p.unit}</td>
                <td style={{ color:p.shortage>0?T.red:T.green, fontWeight:600 }}>{p.deliveredQty!=null?`${p.deliveredQty} ${p.unit}`:"—"}</td>
                <td>{p.otpVerified?<span className="badge bg" style={{ fontSize:10 }}>✅ Yes</span>:<span style={{ color:T.textMuted, fontSize:11 }}>—</span>}</td>
                <td>{p.signatureCaptured?<span className="badge bg" style={{ fontSize:10 }}>✅ Signed</span>:<span style={{ color:T.textMuted, fontSize:11 }}>—</span>}</td>
                <td><span className="badge" style={{ background:(statusColor[p.status]||T.textMuted)+"22", color:statusColor[p.status]||T.textMuted, fontSize:10 }}>{p.status}</span></td>
                <td onClick={e=>e.stopPropagation()}>
                  {!p.locked
                    ? <button className="btn" style={{ fontSize:10, background:T.green+"22", color:T.green, border:`1px solid ${T.green}33`, padding:"3px 8px" }} onClick={()=>setShowComplete(p)}>Complete</button>
                    : <button className="btn" style={{ fontSize:10, padding:"3px 8px", background:T.accentGlow, color:T.accent, border:`1px solid ${T.accent}33` }} onClick={()=>setShowDetail(p)}>View POD →</button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// EQUIPMENT BILLING ENGINE MODULE
// Contract → Usage Logs → Billing → Invoice
// ═══════════════════════════════════════════════════════════════════════════════

const EQ_CONTRACTS_INIT = [
  { id:"EC-001", eqId:"EQ-001", client:"NHAI Road Works",    site:"Madurai Bypass NH7",     type:"HYBRID",  startDate:"2025-03-01", endDate:"2025-05-31", hourlyRate:900,  dailyRate:null, monthlyRate:null, includedHoursPerMonth:180, minGuaranteeHours:180, overtimeRate:1200, shiftHoursPerDay:8, idleChargeable:false, fuelIncluded:false, status:"ACTIVE"  },
  { id:"EC-002", eqId:"EQ-003", client:"L&T Construction",   site:"Chennai Port Road",      type:"MONTHLY", startDate:"2025-02-15", endDate:"2025-06-15", hourlyRate:700,  dailyRate:null, monthlyRate:140000, includedHoursPerMonth:200, minGuaranteeHours:null, overtimeRate:900, shiftHoursPerDay:8, idleChargeable:false, fuelIncluded:false, status:"ACTIVE"  },
  { id:"EC-003", eqId:"EQ-004", client:"TIDCO Projects",     site:"Trichy Industrial Park", type:"HOURLY",  startDate:"2025-04-01", endDate:"2025-07-31", hourlyRate:3500, dailyRate:null, monthlyRate:null, includedHoursPerMonth:null, minGuaranteeHours:null, overtimeRate:null, shiftHoursPerDay:null, idleChargeable:true, fuelIncluded:false, status:"ACTIVE"  },
  { id:"EC-004", eqId:"EQ-006", client:"PWD Tamil Nadu",     site:"Madurai Ring Road",      type:"DAILY",   startDate:"2025-04-10", endDate:"2025-05-10", hourlyRate:null, dailyRate:11000, monthlyRate:null, includedHoursPerMonth:null, minGuaranteeHours:null, overtimeRate:1500, shiftHoursPerDay:8, idleChargeable:false, fuelIncluded:true, status:"ACTIVE" },
];

const USAGE_LOGS_INIT = [
  { id:"UL-001", contractId:"EC-001", eqId:"EQ-001", operatorId:"Kannan S",  date:"2025-04-15", startTime:"07:00", endTime:"17:30", workingHours:9.5, idleHours:1.0, location:"Madurai Bypass km 14", remarks:"Trench excavation — hard soil",       verified:true  },
  { id:"UL-002", contractId:"EC-001", eqId:"EQ-001", operatorId:"Kannan S",  date:"2025-04-14", startTime:"07:00", endTime:"16:00", workingHours:8.0, idleHours:0.5, location:"Madurai Bypass km 13", remarks:"Box culvert excavation",              verified:true  },
  { id:"UL-003", contractId:"EC-001", eqId:"EQ-001", operatorId:"Kannan S",  date:"2025-04-13", startTime:"07:30", endTime:"15:30", workingHours:7.5, idleHours:0.5, location:"Madurai Bypass km 12", remarks:"Foundation pit — WBM layer",          verified:true  },
  { id:"UL-004", contractId:"EC-002", eqId:"EQ-003", operatorId:"Murugan V", date:"2025-04-15", startTime:"06:00", endTime:"17:00", workingHours:10,  idleHours:1.0, location:"Chennai Port Road km 4", remarks:"Road compaction WBM layer",          verified:false },
  { id:"UL-005", contractId:"EC-002", eqId:"EQ-003", operatorId:"Murugan V", date:"2025-04-14", startTime:"06:00", endTime:"15:00", workingHours:8.0, idleHours:0,   location:"Chennai Port Road km 3", remarks:"Sub-grade compaction",               verified:true  },
  { id:"UL-006", contractId:"EC-003", eqId:"EQ-004", operatorId:"Raj Kumar", date:"2025-04-15", startTime:"19:00", endTime:"01:30", workingHours:5.5, idleHours:1.0, location:"Trichy Industrial — floor 3", remarks:"Steel beam lifting — night shift", verified:true  },
  { id:"UL-007", contractId:"EC-004", eqId:"EQ-006", operatorId:"—",         date:"2025-04-15", startTime:"07:00", endTime:"16:00", workingHours:8.0, idleHours:0,   location:"Madurai Ring Road km 2", remarks:"Road grading — first pass",          verified:true  },
  { id:"UL-008", contractId:"EC-004", eqId:"EQ-006", operatorId:"—",         date:"2025-04-14", startTime:"07:00", endTime:"18:00", workingHours:10,  idleHours:0,   location:"Madurai Ring Road km 1", remarks:"Road grading — camber formation",     verified:true  },
];

// ── Billing Engine Core ───────────────────────────────────────────────────────
function calculateBilling(contract, logs) {
  const totalWorkingHours = logs.reduce((s,l)=>s+l.workingHours,0);
  const totalIdleHours = logs.reduce((s,l)=>s+l.idleHours,0);
  const daysWorked = new Set(logs.map(l=>l.date)).size;

  let billableHours = 0, baseAmount = 0, overtimeAmount = 0, extraHours = 0;

  if (contract.type === "HOURLY") {
    billableHours = totalWorkingHours + (contract.idleChargeable ? totalIdleHours : 0);
    baseAmount = billableHours * contract.hourlyRate;
    overtimeAmount = 0;
  } else if (contract.type === "DAILY") {
    const shiftHrs = contract.shiftHoursPerDay || 8;
    billableHours = daysWorked * shiftHrs;
    baseAmount = daysWorked * contract.dailyRate;
    if (totalWorkingHours > billableHours) {
      extraHours = totalWorkingHours - billableHours;
      overtimeAmount = extraHours * (contract.overtimeRate || 0);
    }
  } else if (contract.type === "MONTHLY") {
    billableHours = totalWorkingHours;
    baseAmount = contract.monthlyRate;
    if (totalWorkingHours > (contract.includedHoursPerMonth||0)) {
      extraHours = totalWorkingHours - contract.includedHoursPerMonth;
      overtimeAmount = extraHours * (contract.overtimeRate || 0);
    }
  } else if (contract.type === "HYBRID") {
    billableHours = Math.max(totalWorkingHours, contract.minGuaranteeHours || 0);
    baseAmount = billableHours * contract.hourlyRate;
    if (contract.includedHoursPerMonth && totalWorkingHours > contract.includedHoursPerMonth) {
      extraHours = totalWorkingHours - contract.includedHoursPerMonth;
      overtimeAmount = extraHours * (contract.overtimeRate || 0);
    }
  }

  const totalAmount = baseAmount + overtimeAmount;
  const utilization = contract.includedHoursPerMonth ? Math.round((totalWorkingHours / contract.includedHoursPerMonth) * 100) : Math.round((totalWorkingHours / ((contract.minGuaranteeHours||180))) * 100);
  const idleLoss = totalIdleHours * (contract.hourlyRate || contract.dailyRate/8 || 0);

  return { totalWorkingHours, totalIdleHours, daysWorked, billableHours, extraHours, baseAmount, overtimeAmount, totalAmount, utilization, idleLoss };
}

// ─── Equipment Contract Form Modal ───────────────────────────────────────────
const EquipmentContractModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ eqId:"EQ-001", client:"", site:"", type:"HYBRID", startDate:"", endDate:"", hourlyRate:"", dailyRate:"", monthlyRate:"", includedHours:"", minGuarantee:"", overtimeRate:"", shiftHours:"8", idleChargeable:false, fuelIncluded:false });
  const rf = (k,v) => setForm(f=>({...f,[k]:v}));
  const eq = EQUIPMENT_DATA.find(e=>e.id===form.eqId);
  const spec = eq ? EQUIPMENT_TYPES[eq.type] : null;
  const contractTypeDetails = {
    HOURLY:  { desc:"Charge per hour worked. Minimum hours per day applies.", fields:["hourlyRate","minGuarantee"] },
    DAILY:   { desc:"Fixed daily rate + overtime beyond shift hours.", fields:["dailyRate","shiftHours","overtimeRate"] },
    MONTHLY: { desc:"Fixed monthly rent includes X hours. Extra hours charged separately.", fields:["monthlyRate","includedHours","overtimeRate"] },
    HYBRID:  { desc:"RECOMMENDED: Minimum guarantee hours at hourly rate. Extra hours at premium. Best for both parties.", fields:["hourlyRate","minGuarantee","includedHours","overtimeRate"] },
  };

  return (
    <div className="ov">
      <div className="modal" style={{ maxWidth:600 }}>
        <div className="mhdr" style={{ background:"linear-gradient(135deg,#1C1000,#3D2200,#F9731622)", borderBottom:`1px solid ${T.orange}33` }}>
          <div>
            <div className="rj" style={{ fontSize:18, fontWeight:700, color:T.orange }}>📋 Create Equipment Contract</div>
            <div style={{ fontSize:11, color:T.textSub }}>Define billing terms — contract drives all usage logs and invoices</div>
          </div>
          <button className="btn" style={{ background:"rgba(255,255,255,.08)", color:T.textSub, padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
        </div>
        <div className="mbdy">
          {/* Equipment + client */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
            <div><label className="flabel">Equipment *</label><select value={form.eqId} onChange={e=>rf("eqId",e.target.value)}>{EQUIPMENT_DATA.map(e=><option key={e.id} value={e.id}>{e.model} ({e.regNo})</option>)}</select></div>
            <div><label className="flabel">Client / Contractor *</label><input value={form.client} onChange={e=>rf("client",e.target.value)} placeholder="NHAI / L&T / TIDCO..." /></div>
          </div>
          <div style={{ marginBottom:12 }}><label className="flabel">Deployment Site</label><input value={form.site} onChange={e=>rf("site",e.target.value)} placeholder="Site name, location, km marker" /></div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
            <div><label className="flabel">Contract Start Date</label><input type="date" value={form.startDate} onChange={e=>rf("startDate",e.target.value)} /></div>
            <div><label className="flabel">Contract End Date</label><input type="date" value={form.endDate} onChange={e=>rf("endDate",e.target.value)} /></div>
          </div>

          {/* Contract type selector */}
          <div style={{ marginBottom:14 }}>
            <label className="flabel">Contract Type *</label>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginTop:6 }}>
              {[["HOURLY","⏱️","Flexible"],["DAILY","📅","Per Day"],["MONTHLY","📆","Stable"],["HYBRID","🔁","Best"]].map(([t,e,l])=>(
                <div key={t} onClick={()=>rf("type",t)} style={{ padding:"10px 8px", borderRadius:9, cursor:"pointer", border:`2px solid ${form.type===t?T.orange:T.border}`, background:form.type===t?T.orangeGlow:T.bgPanel, textAlign:"center" }}>
                  <div style={{ fontSize:18, marginBottom:3 }}>{e}</div>
                  <div style={{ fontSize:10, fontWeight:700, color:form.type===t?T.orange:T.textSub }}>{t}</div>
                  <div style={{ fontSize:9, color:T.textMuted }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:8, background:T.accentGlow, border:`1px solid ${T.accent}33`, borderRadius:7, padding:"7px 10px", fontSize:11, color:T.textSub }}>
              💡 {contractTypeDetails[form.type]?.desc}
            </div>
          </div>

          {/* Dynamic pricing fields */}
          <div style={{ background:T.bgPanel, border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginBottom:12 }}>
            <div style={{ fontSize:12, fontWeight:700, color:T.orange, marginBottom:10 }}>💰 Pricing Terms — {form.type}</div>
            {(form.type==="HOURLY"||form.type==="HYBRID") && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:8 }}>
                <div><label className="flabel">Rate per Hour (₹)</label><input value={form.hourlyRate} onChange={e=>rf("hourlyRate",e.target.value)} placeholder={spec?.avgRate||900} /></div>
                <div><label className="flabel">Min. Guarantee Hours/Month</label><input value={form.minGuarantee} onChange={e=>rf("minGuarantee",e.target.value)} placeholder="180" /></div>
              </div>
            )}
            {form.type==="DAILY" && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:8 }}>
                <div><label className="flabel">Daily Rate (₹)</label><input value={form.dailyRate} onChange={e=>rf("dailyRate",e.target.value)} placeholder="7200" /></div>
                <div><label className="flabel">Shift Hours/Day</label><input value={form.shiftHours} onChange={e=>rf("shiftHours",e.target.value)} placeholder="8" /></div>
              </div>
            )}
            {form.type==="MONTHLY" && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:8 }}>
                <div><label className="flabel">Monthly Rate (₹)</label><input value={form.monthlyRate} onChange={e=>rf("monthlyRate",e.target.value)} placeholder="162000" /></div>
                <div><label className="flabel">Included Hours/Month</label><input value={form.includedHours} onChange={e=>rf("includedHours",e.target.value)} placeholder="180" /></div>
              </div>
            )}
            {(form.type==="HYBRID"||form.type==="MONTHLY") && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:8 }}>
                {form.type==="HYBRID" && <div><label className="flabel">Included Hours (before overtime)</label><input value={form.includedHours} onChange={e=>rf("includedHours",e.target.value)} placeholder="180" /></div>}
                <div><label className="flabel">Overtime Rate (₹/hr)</label><input value={form.overtimeRate} onChange={e=>rf("overtimeRate",e.target.value)} placeholder="1200" /></div>
              </div>
            )}
            {form.type==="DAILY" && (
              <div><label className="flabel">Overtime Rate (₹/hr beyond shift)</label><input value={form.overtimeRate} onChange={e=>rf("overtimeRate",e.target.value)} placeholder="1500" /></div>
            )}
          </div>

          {/* Policy toggles */}
          <div style={{ display:"flex", gap:12, marginBottom:14 }}>
            <label style={{ display:"flex", gap:6, alignItems:"center", cursor:"pointer", fontSize:12 }}>
              <input type="checkbox" checked={form.idleChargeable} onChange={e=>rf("idleChargeable",e.target.checked)} />
              <span>Idle time chargeable</span>
            </label>
            <label style={{ display:"flex", gap:6, alignItems:"center", cursor:"pointer", fontSize:12 }}>
              <input type="checkbox" checked={form.fuelIncluded} onChange={e=>rf("fuelIncluded",e.target.checked)} />
              <span>Fuel included in rate</span>
            </label>
          </div>

          {/* Revenue preview */}
          {(form.hourlyRate||form.dailyRate||form.monthlyRate) && (
            <div style={{ background:T.greenGlow, border:`1px solid ${T.green}33`, borderRadius:10, padding:14 }}>
              <div style={{ fontSize:11, fontWeight:700, color:T.green, marginBottom:8 }}>🤖 Revenue Projection</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, fontSize:11 }}>
                {form.type==="HOURLY"&&[["Daily (8 hrs)",fmt(parseInt(form.hourlyRate||0)*8)],["Weekly (48 hrs)",fmt(parseInt(form.hourlyRate||0)*48)],["Monthly (180 hrs)",fmt(parseInt(form.hourlyRate||0)*180)]].map(([l,v])=><div key={l} style={{ background:T.bgPanel, borderRadius:7, padding:"8px 10px" }}><div style={{ fontSize:9, color:T.textMuted }}>{l}</div><div style={{ fontSize:13, fontWeight:700, color:T.green, marginTop:2 }}>{v}</div></div>)}
                {form.type==="DAILY"&&[["Per Day",fmt(parseInt(form.dailyRate||0))],["Weekly",fmt(parseInt(form.dailyRate||0)*6)],["Monthly",fmt(parseInt(form.dailyRate||0)*26)]].map(([l,v])=><div key={l} style={{ background:T.bgPanel, borderRadius:7, padding:"8px 10px" }}><div style={{ fontSize:9, color:T.textMuted }}>{l}</div><div style={{ fontSize:13, fontWeight:700, color:T.green, marginTop:2 }}>{v}</div></div>)}
                {form.type==="MONTHLY"&&[["Base/Month",fmt(parseInt(form.monthlyRate||0))],["Included hrs",`${form.includedHours||0} hrs`],["Extra rate",`₹${form.overtimeRate||0}/hr`]].map(([l,v])=><div key={l} style={{ background:T.bgPanel, borderRadius:7, padding:"8px 10px" }}><div style={{ fontSize:9, color:T.textMuted }}>{l}</div><div style={{ fontSize:13, fontWeight:700, color:T.green, marginTop:2 }}>{v}</div></div>)}
                {form.type==="HYBRID"&&[["Min guarantee",fmt(parseInt(form.hourlyRate||0)*parseInt(form.minGuarantee||180))],["Incl. hrs",`${form.includedHours||0} hrs`],["OT rate",`₹${form.overtimeRate||0}/hr`]].map(([l,v])=><div key={l} style={{ background:T.bgPanel, borderRadius:7, padding:"8px 10px" }}><div style={{ fontSize:9, color:T.textMuted }}>{l}</div><div style={{ fontSize:13, fontWeight:700, color:T.green, marginTop:2 }}>{v}</div></div>)}
              </div>
            </div>
          )}

          <div style={{ display:"flex", justifyContent:"flex-end", gap:8, marginTop:16, paddingTop:14, borderTop:`1px solid ${T.border}` }}>
            <button className="btn btn-gh" onClick={onClose}>Cancel</button>
            <button className="btn" style={{ background:T.orange, color:"#080B10", fontWeight:700 }} onClick={()=>{ onSave&&onSave(form); onClose(); }}>📋 Create Contract</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Equipment Billing Engine Page ────────────────────────────────────────────
const EquipmentBillingPage = () => {
  const [tab, setTab] = useState("contracts");
  const [contracts, setContracts] = useState(EQ_CONTRACTS_INIT);
  const [usageLogs, setUsageLogs] = useState(USAGE_LOGS_INIT);
  const [showCreateContract, setShowCreateContract] = useState(false);
  const [selContract, setSelContract] = useState(null);
  const [showLogHours, setShowLogHours] = useState(null);

  const typeColor = { HOURLY:T.blue, DAILY:T.accent, MONTHLY:T.green, HYBRID:T.orange };

  const getBilling = (contractId) => {
    const c = contracts.find(x=>x.id===contractId);
    const logs = usageLogs.filter(l=>l.contractId===contractId);
    if (!c || !logs.length) return null;
    return calculateBilling(c, logs);
  };

  const totalRevenue = contracts.filter(c=>c.status==="ACTIVE").reduce((s,c)=>{
    const b = getBilling(c.id);
    return s + (b?.totalAmount||0);
  }, 0);

  return (
    <div>
      {showCreateContract && <EquipmentContractModal onClose={()=>setShowCreateContract(false)} onSave={f=>{
        const id = `EC-${String(contracts.length+1).padStart(3,"0")}`;
        setContracts(cs=>[...cs,{ id, ...f, eqId:f.eqId, hourlyRate:parseInt(f.hourlyRate)||null, dailyRate:parseInt(f.dailyRate)||null, monthlyRate:parseInt(f.monthlyRate)||null, includedHoursPerMonth:parseInt(f.includedHours)||null, minGuaranteeHours:parseInt(f.minGuarantee)||null, overtimeRate:parseInt(f.overtimeRate)||null, shiftHoursPerDay:parseInt(f.shiftHours)||8, status:"ACTIVE" }]);
      }} />}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Equipment Billing Engine</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>Contract → Usage Logs → Auto Billing → Invoice · Hourly / Daily / Monthly / Hybrid</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button className="btn btn-b" style={{ fontSize:11 }} onClick={()=>setTab("generate")}>⚡ Generate Bills</button>
          <button className="btn btn-p" onClick={()=>setShowCreateContract(true)}><Ic n="plus" s={14} c="#080B10" /> New Contract</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(5,1fr)", marginBottom:18 }}>
        {[
          { l:"Active Contracts", v:contracts.filter(c=>c.status==="ACTIVE").length, c:T.green  },
          { l:"MTD Billed",      v:fmt(totalRevenue),                               c:T.accent },
          { l:"Pending Bills",   v:contracts.filter(c=>getBilling(c.id)?.totalAmount>0).length, c:T.orange },
          { l:"Total Logs",      v:usageLogs.length,                               c:T.blue   },
          { l:"Unverified Logs", v:usageLogs.filter(l=>!l.verified).length,        c:T.red    },
        ].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}>
            <div className="stat-v" style={{ color:k.c }}>{k.v}</div>
            <div className="stat-l">{k.l}</div>
          </div>
        ))}
      </div>

      <div className="tabs">
        {["contracts","usage-logs","billing","analytics"].map(t=>(
          <div key={t} className={`tab ${tab===t?"on":""}`} onClick={()=>setTab(t)} style={{ textTransform:"capitalize" }}>
            {t==="usage-logs"?"Usage Logs":t.charAt(0).toUpperCase()+t.slice(1)}
          </div>
        ))}
      </div>

      {/* ── CONTRACTS TAB ── */}
      {tab==="contracts" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {contracts.map(c => {
            const eq = EQUIPMENT_DATA.find(e=>e.id===c.eqId);
            const spec = eq ? EQUIPMENT_TYPES[eq.type] : null;
            const billing = getBilling(c.id);
            return (
              <div key={c.id} className="card" style={{ border:`1px solid ${typeColor[c.type]||T.border}33` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                  <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                    <span style={{ fontSize:24 }}>{spec?.icon||"🏗️"}</span>
                    <div>
                      <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:3 }}>
                        <span className="mono" style={{ fontSize:13, fontWeight:700, color:T.accent }}>{c.id}</span>
                        <span className="badge" style={{ background:(typeColor[c.type]||T.textMuted)+"22", color:typeColor[c.type]||T.textMuted, fontSize:10 }}>{c.type}</span>
                        <span className="badge bg" style={{ fontSize:10 }}>{c.status}</span>
                      </div>
                      <div style={{ fontSize:13, fontWeight:600 }}>{eq?.model||c.eqId}</div>
                      <div style={{ fontSize:11, color:T.textSub }}>{c.client} · {c.site}</div>
                    </div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:11, color:T.textMuted }}>{c.startDate} → {c.endDate}</div>
                    {billing && <div style={{ fontSize:14, fontWeight:700, color:T.green, marginTop:3 }}>{fmt(billing.totalAmount)}</div>}
                  </div>
                </div>
                {/* Contract terms */}
                <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:10 }}>
                  {c.hourlyRate && <span style={{ fontSize:11, background:T.bgPanel, padding:"3px 8px", borderRadius:6 }}>₹{c.hourlyRate}/hr</span>}
                  {c.dailyRate && <span style={{ fontSize:11, background:T.bgPanel, padding:"3px 8px", borderRadius:6 }}>₹{c.dailyRate}/day</span>}
                  {c.monthlyRate && <span style={{ fontSize:11, background:T.bgPanel, padding:"3px 8px", borderRadius:6 }}>₹{(c.monthlyRate/1000).toFixed(0)}k/mo</span>}
                  {c.minGuaranteeHours && <span style={{ fontSize:11, background:T.orange+"18", color:T.orange, padding:"3px 8px", borderRadius:6 }}>Min {c.minGuaranteeHours} hrs guarantee</span>}
                  {c.includedHoursPerMonth && <span style={{ fontSize:11, background:T.green+"18", color:T.green, padding:"3px 8px", borderRadius:6 }}>{c.includedHoursPerMonth} hrs included</span>}
                  {c.overtimeRate && <span style={{ fontSize:11, background:T.red+"18", color:T.red, padding:"3px 8px", borderRadius:6 }}>OT ₹{c.overtimeRate}/hr</span>}
                  {c.idleChargeable && <span style={{ fontSize:11, background:T.textMuted+"18", color:T.textMuted, padding:"3px 8px", borderRadius:6 }}>Idle chargeable</span>}
                  {c.fuelIncluded && <span style={{ fontSize:11, background:T.blue+"18", color:T.blue, padding:"3px 8px", borderRadius:6 }}>Fuel included</span>}
                </div>
                {/* Mini billing preview */}
                {billing && (
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8 }}>
                    {[{ l:"Hours Worked",v:`${billing.totalWorkingHours}h`,c:T.text },{ l:"Billable Hrs",v:`${billing.billableHours}h`,c:T.orange },{ l:"Extra Hrs",v:billing.extraHours>0?`+${billing.extraHours}h`:"—",c:T.red },{ l:"Utilization",v:`${billing.utilization}%`,c:billing.utilization>=80?T.green:billing.utilization>=50?T.orange:T.red },{ l:"Bill Amount",v:fmt(billing.totalAmount),c:T.green }].map(k=>(
                      <div key={k.l} style={{ background:T.bgPanel, borderRadius:7, padding:"7px 10px" }}><div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div><div style={{ fontSize:12, fontWeight:700, color:k.c, marginTop:2 }}>{k.v}</div></div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── USAGE LOGS TAB ── */}
      {tab==="usage-logs" && (
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <div style={{ fontSize:12, color:T.textSub }}>Every log feeds the billing engine. Unverified logs shown in orange.</div>
          </div>
          <div className="card" style={{ padding:0 }}>
            <table className="tbl">
              <thead><tr><th>Log ID</th><th>Equipment</th><th>Contract</th><th>Date</th><th>Start</th><th>End</th><th>Working Hrs</th><th>Idle Hrs</th><th>Billable</th><th>Remarks</th><th>Verified</th></tr></thead>
              <tbody>
                {usageLogs.map(l => {
                  const c = contracts.find(x=>x.id===l.contractId);
                  const eq = EQUIPMENT_DATA.find(e=>e.id===l.eqId);
                  const spec = eq ? EQUIPMENT_TYPES[eq.type] : null;
                  const billable = l.workingHours + (c?.idleChargeable?l.idleHours:0);
                  return (
                    <tr key={l.id} style={{ opacity:l.verified?1:0.8 }}>
                      <td className="mono" style={{ fontSize:11, color:T.accent }}>{l.id}</td>
                      <td style={{ fontSize:11 }}><span style={{ fontSize:14 }}>{spec?.icon}</span> {eq?.model||l.eqId}</td>
                      <td><span className="badge" style={{ background:(typeColor[c?.type]||T.textMuted)+"22", color:typeColor[c?.type]||T.textMuted, fontSize:10 }}>{c?.type}</span></td>
                      <td style={{ fontSize:11 }}>{l.date}</td>
                      <td style={{ fontSize:11 }}>{l.startTime}</td>
                      <td style={{ fontSize:11 }}>{l.endTime}</td>
                      <td style={{ fontWeight:700, color:T.orange }}>{l.workingHours}h</td>
                      <td style={{ color:T.textMuted }}>{l.idleHours}h</td>
                      <td style={{ fontWeight:700, color:T.green }}>{billable}h</td>
                      <td style={{ fontSize:10, color:T.textSub, maxWidth:140, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{l.remarks}</td>
                      <td>{l.verified?<span className="badge bg" style={{ fontSize:10 }}>✅ Verified</span>:<span className="badge bo" style={{ fontSize:10 }}>⏳ Pending</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── BILLING TAB ── */}
      {tab==="billing" && (
        <div>
          <div className="card" style={{ marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <div className="section-title" style={{ margin:0 }}>Auto-Generated Billing — Current Period</div>
              <button className="btn btn-p" style={{ fontSize:11 }}>⚡ Generate All Invoices</button>
            </div>
            {contracts.filter(c=>c.status==="ACTIVE").map(c => {
              const eq = EQUIPMENT_DATA.find(e=>e.id===c.eqId);
              const spec = eq ? EQUIPMENT_TYPES[eq.type] : null;
              const b = getBilling(c.id);
              if (!b) return null;
              const gst = Math.round(b.totalAmount * 0.18);
              const total = b.totalAmount + gst;
              return (
                <div key={c.id} style={{ border:`1px solid ${T.border}`, borderRadius:10, padding:14, marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      <span style={{ fontSize:20 }}>{spec?.icon}</span>
                      <div><div style={{ fontWeight:600, fontSize:13 }}>{eq?.model}</div><div style={{ fontSize:11, color:T.textSub }}>{c.client} · {c.type}</div></div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:16, fontWeight:700, color:T.green }}>{fmt(total)}</div>
                      <div style={{ fontSize:10, color:T.textMuted }}>incl. GST 18%</div>
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, marginBottom:10 }}>
                    {[
                      { l:"Working Hrs", v:`${b.totalWorkingHours}h` },
                      { l:"Billable Hrs", v:`${b.billableHours}h`, note:b.billableHours>b.totalWorkingHours?"(min guarantee applied)":"" },
                      { l:"Base Amount", v:fmt(b.baseAmount) },
                      { l:"Overtime", v:b.overtimeAmount>0?`+${fmt(b.overtimeAmount)}`:"—" },
                      { l:"Idle Loss", v:b.idleLoss>0?fmt(b.idleLoss):"—" },
                    ].map(k=>(
                      <div key={k.l} style={{ background:T.bgPanel, borderRadius:7, padding:"7px 10px" }}>
                        <div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div>
                        <div style={{ fontSize:11, fontWeight:600, marginTop:1 }}>{k.v}</div>
                        {k.note && <div style={{ fontSize:9, color:T.orange, marginTop:1 }}>{k.note}</div>}
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button className="btn btn-p" style={{ fontSize:11 }}>📄 Generate Invoice</button>
                    <button className="btn btn-b" style={{ fontSize:11 }}>📤 Send to Client</button>
                    <button className="btn btn-gh" style={{ fontSize:11 }}>Edit Billable Hrs</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── ANALYTICS TAB ── */}
      {tab==="analytics" && (
        <div>
          <div className="grd2">
            <div className="card">
              <div className="section-title">Equipment Utilization</div>
              {contracts.filter(c=>c.status==="ACTIVE").map(c => {
                const eq = EQUIPMENT_DATA.find(e=>e.id===c.eqId);
                const spec = eq ? EQUIPMENT_TYPES[eq.type] : null;
                const b = getBilling(c.id);
                if (!b) return null;
                return (
                  <div key={c.id} style={{ marginBottom:12 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}>
                      <span>{spec?.icon} {eq?.model}</span>
                      <span style={{ color:b.utilization>=80?T.green:b.utilization>=50?T.orange:T.red, fontWeight:700 }}>{b.utilization}%</span>
                    </div>
                    <div className="pbar" style={{ height:7 }}><div className="pfill" style={{ width:`${Math.min(b.utilization,100)}%`, background:b.utilization>=80?T.green:b.utilization>=50?T.orange:T.red }} /></div>
                    <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>{b.totalWorkingHours}h worked / {c.minGuaranteeHours||c.includedHoursPerMonth||180}h target · Idle: {b.totalIdleHours}h</div>
                  </div>
                );
              })}
            </div>
            <div className="card">
              <div className="section-title">Idle Time Loss Analysis</div>
              {contracts.filter(c=>c.status==="ACTIVE").map(c => {
                const eq = EQUIPMENT_DATA.find(e=>e.id===c.eqId);
                const b = getBilling(c.id);
                if (!b) return null;
                return (
                  <div key={c.id} style={{ padding:"8px 0", borderBottom:`1px solid ${T.border}22` }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:2 }}>
                      <span>{eq?.model}</span>
                      <span style={{ color:b.idleLoss>0?T.red:T.green }}>{b.idleLoss>0?`-${fmt(b.idleLoss)} idle loss`:"No idle loss"}</span>
                    </div>
                    <div style={{ fontSize:10, color:T.textMuted }}>Idle hours: {b.totalIdleHours}h · Policy: {c.idleChargeable?"Chargeable":"Non-chargeable"}</div>
                  </div>
                );
              })}
              <div style={{ marginTop:10, background:T.orangeGlow, borderRadius:8, padding:8, fontSize:11, color:T.orange }}>
                ⚠️ Industry average: 15–25% idle time on construction sites. Each idle hour = direct revenue loss at hourly rate.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



// ═══════════════════════════════════════════════════════════════════════════════
// BUS FLEET MANAGEMENT — COMPREHENSIVE MODULE
// Bus Types · Daily Operations · Compliance · Seat Check · Permits · Driver Check
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Bus Fleet Types ──────────────────────────────────────────────────────────
const BUS_FLEET_TYPES = {
  CORPORATE_SHUTTLE:  { label:"Corporate Shuttle",   icon:"🏢", color:"#3B82F6",  billing:"MONTHLY_CONTRACT",  desc:"Daily employee pickup/drop, fixed routes, monthly billing to company HR" },
  SCHOOL_BUS:         { label:"School Bus",           icon:"🏫", color:"#F59E0B",  billing:"MONTHLY_CONTRACT",  desc:"School routes AM/PM, student roster, parent notifications, safety critical" },
  TOURISM_CHARTER:    { label:"Tourism / Charter",    icon:"🗺️", color:"#10B981",  billing:"PER_TRIP",          desc:"One-off tourist groups, outstation tours, temple circuits, multi-day trips" },
  STAFF_TRANSPORT:    { label:"Hospital / Staff",     icon:"🏥", color:"#8B5CF6",  billing:"MONTHLY_CONTRACT",  desc:"3-shift hospital transport, shift-based scheduling, 24/7 operations" },
  CONTRACT_CARRIAGE:  { label:"Contract Carriage",    icon:"📋", color:"#F97316",  billing:"RATE_CONTRACT",     desc:"Dedicated bus to one company/institution under Stage Carriage Permit" },
  LOCAL_STAGE:        { label:"Local Stage / City",   icon:"🏙️", color:"#06B6D4",  billing:"TICKET_BASED",      desc:"City route running, daily ticket collection, conductor-based operations" },
  INTER_CITY:         { label:"Inter-City Express",   icon:"🛣️", color:"#EF4444",  billing:"TICKET_BASED",      desc:"Express coach between cities, advance booking, online ticketing" },
  EVENT_TRANSPORT:    { label:"Event Transport",      icon:"🎪", color:"#EC4899",  billing:"PER_TRIP",          desc:"Wedding, function, conference — one-time contract" },
};

// ─── Bus Master Data ──────────────────────────────────────────────────────────
const BUS_MASTER_DATA = [
  { id:"BS-001", regNo:"TN22 IJ7890", type:"CORPORATE_SHUTTLE", make:"Tata",   model:"Starbus Ultra 40",  seatingCapacity:40, standingCapacity:0,  year:2022, acType:"AC", fuelType:"Diesel", color:"White/Blue", insuranceExpiry:"2026-01-15", fcExpiry:"2026-03-20", permitType:"Contract Carriage", permitExpiry:"2026-11-30", mvTaxDue:"2025-07-01", pucExpiry:"2025-08-10", fitnessScore:88, status:"Active", assignedRoute:"Sholinganallur–Siruseri", client:"Cognizant Technology" },
  { id:"BS-002", regNo:"TN45 KL4321", type:"SCHOOL_BUS",        make:"Ashok",  model:"Leyland LYNX 32",   seatingCapacity:32, standingCapacity:0,  year:2020, acType:"Non-AC", fuelType:"Diesel", color:"Yellow", insuranceExpiry:"2025-09-30", fcExpiry:"2025-12-15", permitType:"School Bus Permit", permitExpiry:"2025-12-31", mvTaxDue:"2025-10-01", pucExpiry:"2025-06-30", fitnessScore:72, status:"Active", assignedRoute:"Koramangala–CBSE School", client:"Greenfield School" },
  { id:"BS-003", regNo:"TN69 MN8765", type:"TOURISM_CHARTER",   make:"Volvo",  model:"9400 Club Class",   seatingCapacity:45, standingCapacity:0,  year:2023, acType:"AC", fuelType:"Diesel", color:"White/Red", insuranceExpiry:"2026-06-20", fcExpiry:"2026-08-10", permitType:"Tourist Vehicle Permit", permitExpiry:"2027-03-15", mvTaxDue:"2026-01-01", pucExpiry:"2025-11-20", fitnessScore:95, status:"Available", assignedRoute:null, client:null },
  { id:"BS-004", regNo:"TN38 PQ2345", type:"LOCAL_STAGE",       make:"Tata",   model:"Starbus 4x2",       seatingCapacity:52, standingCapacity:20, year:2019, acType:"Non-AC", fuelType:"Diesel", color:"Red/Cream", insuranceExpiry:"2025-05-15", fcExpiry:"2025-04-30", permitType:"Stage Carriage Permit", permitExpiry:"2025-07-31", mvTaxDue:"2025-04-01", pucExpiry:"2025-04-25", fitnessScore:61, status:"Overdue Compliance", assignedRoute:"Route 47C Tambaram–Velachery", client:"CMTU Contract" },
];

// ─── Bus Compliance Tracker (per bus) ─────────────────────────────────────────
const BUS_COMPLIANCE_DOCS = [
  // Insurance
  { id:"BC-001", busId:"BS-001", docType:"Insurance",           docNo:"POL-2024-1182945", issuer:"New India Assurance",  issueDate:"2025-01-15", expiryDate:"2026-01-15", daysLeft:266, status:"Valid",   fine:"₹2,000–₹5,000/day",    renewalURL:"https://newindia.co.in" },
  { id:"BC-002", busId:"BS-001", docType:"Fitness Certificate", docNo:"FC/TN-22/2025/881", issuer:"RTO Chennai South",   issueDate:"2025-03-20", expiryDate:"2026-03-20", daysLeft:331, status:"Valid",   fine:"₹2,000 first offence",  renewalURL:"https://parivahan.gov.in" },
  { id:"BC-003", busId:"BS-001", docType:"Permit (Contract)",   docNo:"PCP/TN/2021/5541",  issuer:"RTO Chennai Central", issueDate:"2021-11-30", expiryDate:"2026-11-30", daysLeft:585, status:"Valid",   fine:"Permit cancellation",    renewalURL:"https://parivahan.gov.in" },
  { id:"BC-004", busId:"BS-001", docType:"PUC Certificate",     docNo:"PUC-2025-884421",   issuer:"TNPCB Authorised",    issueDate:"2025-02-10", expiryDate:"2025-08-10", daysLeft:108, status:"Valid",   fine:"₹1,000",                 renewalURL:"https://vaahan.tn.gov.in" },
  { id:"BC-005", busId:"BS-001", docType:"Motor Vehicle Tax",   docNo:"MVT-TN22-2025",     issuer:"RTO Chennai South",   issueDate:"2025-01-01", expiryDate:"2025-07-01", daysLeft:68,  status:"Due Soon","fine":"Penalty + tax",        renewalURL:"https://tn.echallan.gov.in" },
  { id:"BC-006", busId:"BS-002", docType:"Insurance",           docNo:"POL-2024-0987321",  issuer:"HDFC Ergo",           issueDate:"2024-09-30", expiryDate:"2025-09-30", daysLeft:159, status:"Valid",   fine:"₹2,000–₹5,000/day",    renewalURL:"" },
  { id:"BC-007", busId:"BS-002", docType:"Fitness Certificate", docNo:"FC/TN-45/2024/330", issuer:"RTO Bangalore South", issueDate:"2024-12-15", expiryDate:"2025-12-15", daysLeft:235, status:"Valid",   fine:"₹2,000 first offence",  renewalURL:"" },
  { id:"BC-008", busId:"BS-002", docType:"PUC Certificate",     docNo:"PUC-2025-221133",   issuer:"TNPCB Authorised",    issueDate:"2025-03-30", expiryDate:"2025-06-30", daysLeft:67,  status:"Due Soon","fine":"₹1,000",               renewalURL:"" },
  { id:"BC-009", busId:"BS-004", docType:"Insurance",           docNo:"POL-2024-0045221",  issuer:"United India",        issueDate:"2024-05-15", expiryDate:"2025-05-15", daysLeft:21,  status:"Critical","fine":"₹2,000–₹5,000/day",   renewalURL:"" },
  { id:"BC-010", busId:"BS-004", docType:"Fitness Certificate", docNo:"FC/TN-38/2024/117", issuer:"RTO Chennai Central", issueDate:"2024-04-30", expiryDate:"2025-04-30", daysLeft:-7,  status:"Expired", "fine":"₹10,000 + seizure",   renewalURL:"" },
  { id:"BC-011", busId:"BS-004", docType:"PUC Certificate",     docNo:"PUC-2025-009441",   issuer:"TNPCB Authorised",    issueDate:"2025-01-25", expiryDate:"2025-04-25", daysLeft:-8,  status:"Expired", "fine":"₹1,000",               renewalURL:"" },
];

// ─── Driver Compliance ─────────────────────────────────────────────────────────
const DRIVER_COMPLIANCE_DATA = [
  { driverId:"DRV-001", name:"Mani Kumar",  dlNo:"TN202012345678", dlClass:"PSV/HMV", dlExpiry:"2027-04-10", badgeNo:"TN-PSV-2024-18821", badgeExpiry:"2026-04-10", medFitExpiry:"2025-10-15", policeVerification:"2024-08-20", aadharLinked:true,  mobileVerified:true,  trainingCert:"2023-11-01", status:"Valid"    },
  { driverId:"DRV-002", name:"Selvam R",    dlNo:"TN20190044122",  dlClass:"PSV/HMV", dlExpiry:"2025-06-30", badgeNo:"TN-PSV-2023-09821", badgeExpiry:"2025-06-30", medFitExpiry:"2025-05-20", policeVerification:"2023-06-15", aadharLinked:true,  mobileVerified:true,  trainingCert:"2022-09-15", status:"Expiring" },
  { driverId:"DRV-004", name:"Arjun D",     dlNo:"KA2022079988",   dlClass:"PSV/HMV", dlExpiry:"2028-02-28", badgeNo:"KA-PSV-2024-55210", badgeExpiry:"2026-02-28", medFitExpiry:"2026-01-10", policeVerification:"2024-12-01", aadharLinked:true,  mobileVerified:true,  trainingCert:"2024-01-20", status:"Valid"    },
  { driverId:"DRV-005", name:"Karthik M",   dlNo:"TN20200054321",  dlClass:"HMV",     dlExpiry:"2025-05-15", badgeNo:null,                badgeExpiry:null,          medFitExpiry:"2024-12-01", policeVerification:"2023-01-10", aadharLinked:false, mobileVerified:false, trainingCert:null,         status:"Non-Compliant" },
];

// ─── Seat Condition Checklist ─────────────────────────────────────────────────
const SEAT_CHECK_TEMPLATE = [
  { id:"SC-CL", label:"Seat Cover / Upholstery",     check:"No tears, stains, or missing covers" },
  { id:"SC-FR", label:"Seat Frame & Recliner",        check:"No wobble, recliner works if applicable" },
  { id:"SC-BL", label:"Seat Belt — Buckle Lock",      check:"Click-lock mechanism works on all seats" },
  { id:"SC-BR", label:"Seat Belt — Retractor",        check:"Belt retracts smoothly, no fraying" },
  { id:"SC-WN", label:"Window — Open/Close",          check:"Slides or cranks open, latches closed" },
  { id:"SC-WG", label:"Window — Glass Condition",     check:"No cracks, chips, or obstructed visibility" },
  { id:"SC-OV", label:"Overhead Rack / Luggage Bay",  check:"No sharp edges, latches secure" },
  { id:"SC-AC", label:"AC Vent at Seat",              check:"Airflow present, directional fin moves" },
  { id:"SC-LT", label:"Reading Light at Seat",        check:"Light switch works, bulb not blown" },
  { id:"SC-ES", label:"Emergency Exit Row — Clear",   check:"Aisle/exit unobstructed, signage visible" },
];

// ─── Bus Pre-Trip Safety Check ─────────────────────────────────────────────────
const BUS_PRETRIP_CHECKS = {
  safety_critical: [
    { id:"PT-BK", label:"Brake system — foot + hand",      cat:"safety",    critical:true  },
    { id:"PT-TR", label:"Tyre pressure all 6 wheels",       cat:"tyres",     critical:true  },
    { id:"PT-TT", label:"Tyre tread & sidewall condition",  cat:"tyres",     critical:true  },
    { id:"PT-DR", label:"All passenger doors open/close",   cat:"safety",    critical:true  },
    { id:"PT-EX", label:"Emergency exit — clear & marked",  cat:"safety",    critical:true  },
    { id:"PT-FE", label:"Fire extinguisher — charged",      cat:"safety",    critical:true  },
    { id:"PT-FA", label:"First aid kit — complete",         cat:"safety",    critical:true  },
    { id:"PT-SB", label:"Sample seat belt test (3 seats)",  cat:"safety",    critical:true  },
  ],
  electrical: [
    { id:"PT-HL", label:"Headlights + high beam",           cat:"electrical", critical:true  },
    { id:"PT-IN", label:"Indicators (all 4)",               cat:"electrical", critical:true  },
    { id:"PT-BL", label:"Brake lights",                     cat:"electrical", critical:true  },
    { id:"PT-HR", label:"Horn",                             cat:"electrical", critical:false },
    { id:"PT-WP", label:"Windshield wipers",                cat:"electrical", critical:false },
    { id:"PT-AC", label:"AC / heater operational",          cat:"electrical", critical:false },
    { id:"PT-RL", label:"Interior ceiling lights",          cat:"electrical", critical:false },
  ],
  mechanical: [
    { id:"PT-EN", label:"Engine oil level",                 cat:"engine",    critical:false },
    { id:"PT-CL", label:"Coolant level",                    cat:"engine",    critical:false },
    { id:"PT-FL", label:"Fuel level (min 1/4 tank)",        cat:"engine",    critical:true  },
    { id:"PT-WS", label:"Windshield — no cracks",           cat:"body",      critical:true  },
    { id:"PT-MR", label:"Mirrors — adjusted, uncracked",    cat:"body",      critical:true  },
    { id:"PT-RT", label:"Retro-reflective tape — intact",   cat:"compliance",critical:false },
  ],
  compliance: [
    { id:"PT-RC", label:"RC + Fitness Cert in cabin",       cat:"compliance",critical:true  },
    { id:"PT-PM", label:"Permit document in cabin",         cat:"compliance",critical:true  },
    { id:"PT-IN2",label:"Insurance document in cabin",      cat:"compliance",critical:true  },
    { id:"PT-PU", label:"PUC certificate valid",            cat:"compliance",critical:true  },
    { id:"PT-DL", label:"Driver DL valid (check card)",     cat:"compliance",critical:true  },
    { id:"PT-BD", label:"Driver PSV badge worn",            cat:"compliance",critical:true  },
  ],
};

// ─── Daily Route Schedule Data ────────────────────────────────────────────────
const ROUTE_SCHEDULES = [
  { id:"RS-001", busId:"BS-001", contractId:"FC-006", routeName:"Corporate Shuttle Route A", type:"CORPORATE_SHUTTLE", client:"Cognizant Technology", stops:[ { name:"Sholinganallur OMR",    time:"08:25", pax:8  }, { name:"Perungudi Tollgate",     time:"08:38", pax:12 }, { name:"Elcot SEZ Gate",         time:"08:49", pax:6  }, { name:"Siruseri IT Park",       time:"09:05", pax:0  } ], totalPax:26, amShift:"08:25–09:05", pmShift:"18:15–18:55", driver:"Arjun D", conductor:null, daysOfWeek:["Mon","Tue","Wed","Thu","Fri"], monthlyRate:52000 },
  { id:"RS-002", busId:"BS-002", contractId:null,      routeName:"School Route — Morning AM", type:"SCHOOL_BUS",        client:"Greenfield School",    stops:[ { name:"HSR Layout 7th Sector", time:"07:10", pax:6  }, { name:"Koramangala 4th Block",  time:"07:22", pax:10 }, { name:"BTM 2nd Stage",          time:"07:35", pax:8  }, { name:"School Gate",            time:"07:50", pax:0  } ], totalPax:24, amShift:"07:10–07:50", pmShift:"13:30–14:15", driver:"Mani Kumar", conductor:"Raju K", daysOfWeek:["Mon","Tue","Wed","Thu","Fri","Sat"], monthlyRate:38000 },
  { id:"RS-003", busId:"BS-004", contractId:null,      routeName:"Route 47C Stage Service",   type:"LOCAL_STAGE",        client:"CMTU",                 stops:[ { name:"Tambaram Bus Stand",     time:"06:00", pax:20 }, { name:"Pallavaram",             time:"06:18", pax:14 }, { name:"Guindy",                 time:"06:38", pax:18 }, { name:"Velachery Bus Stop",     time:"07:00", pax:0  } ], totalPax:52, frequency:"Every 30 min", driver:"Selvam R", conductor:"Murugan K", daysOfWeek:["Daily"], ticketRate:12, dailyRevTarget:3600 },
];

// ─── Ticket Collection Data (Local Stage) ─────────────────────────────────────
const TICKET_LOG_INIT = [
  { id:"TK-001", routeId:"RS-003", date:"2025-04-15", shift:"AM", tripNo:1, boardedPax:48, ticketsSold:48, cashCollected:576,  conductorName:"Murugan K", verified:true  },
  { id:"TK-002", routeId:"RS-003", date:"2025-04-15", shift:"AM", tripNo:2, boardedPax:52, ticketsSold:52, cashCollected:624,  conductorName:"Murugan K", verified:true  },
  { id:"TK-003", routeId:"RS-003", date:"2025-04-15", shift:"PM", tripNo:3, boardedPax:35, ticketsSold:35, cashCollected:420,  conductorName:"Murugan K", verified:false },
  { id:"TK-004", routeId:"RS-003", date:"2025-04-15", shift:"PM", tripNo:4, boardedPax:41, ticketsSold:39, cashCollected:468,  conductorName:"Murugan K", verified:false },
];

// ─── Bus Operations Page ──────────────────────────────────────────────────────
const BusOperationsPage = () => {
  const [tab, setTab] = useState("fleet");
  const [selBus, setSelBus] = useState(null);
  const [showSeatCheck, setShowSeatCheck] = useState(null);
  const [showPreTrip, setShowPreTrip] = useState(null);
  const [showCompliance, setShowCompliance] = useState(null);
  const [seatCheckData, setSeatCheckData] = useState({});
  const [preTripData, setPreTripData] = useState({});
  const [ticketLogs, setTicketLogs] = useState(TICKET_LOG_INIT);
  const [showAddTicket, setShowAddTicket] = useState(null);
  const [addTicketForm, setAddTicketForm] = useState({ tripNo:"", boardedPax:"", ticketsSold:"", cashCollected:"", conductorName:"", shift:"AM" });

  const today = "2025-04-15";
  const expiredDocs  = BUS_COMPLIANCE_DOCS.filter(d=>d.daysLeft<0);
  const criticalDocs = BUS_COMPLIANCE_DOCS.filter(d=>d.daysLeft>=0&&d.daysLeft<=30);
  const dueSoonDocs  = BUS_COMPLIANCE_DOCS.filter(d=>d.daysLeft>30&&d.daysLeft<=90);
  const nonCompliantDrivers = DRIVER_COMPLIANCE_DATA.filter(d=>d.status!=="Valid");

  const docStatusColor = (d) => d.daysLeft<0?T.red:d.daysLeft<=30?T.red:d.daysLeft<=90?T.orange:T.green;
  const docStatusLabel = (d) => d.daysLeft<0?`EXPIRED ${Math.abs(d.daysLeft)}d ago`:d.daysLeft<=30?`${d.daysLeft}d left`:d.daysLeft<=90?`${d.daysLeft}d left`:`Valid ${d.daysLeft}d`;

  const toggleSeat = (busId, seatId, checkId, val) => setSeatCheckData(s=>({...s,[`${busId}_${seatId}_${checkId}`]:val}));
  const togglePT = (busId, checkId, val) => setPreTripData(s=>({...s,[`${busId}_${checkId}`]:val}));

  // ── Seat Check Modal ─────────────────────────────────────────────────────────
  const SeatCheckModal = ({ bus, onClose }) => {
    const rows = Math.ceil(bus.seatingCapacity / 4);
    const seats = Array.from({length:bus.seatingCapacity},(_,i)=>`${Math.floor(i/4)+1}${["A","B","C","D"][i%4]}`);
    const [selSeat, setSelSeat] = useState(seats[0]);
    return (
      <div className="ov" style={{ alignItems:"flex-start", paddingTop:20, overflowY:"auto" }}>
        <div className="modal" style={{ maxWidth:680, width:"100%", margin:"0 auto" }}>
          <div className="mhdr" style={{ background:`linear-gradient(135deg,#0C1220,${T.blue}22)`, borderBottom:`1px solid ${T.blue}33` }}>
            <div>
              <div className="rj" style={{ fontSize:18, fontWeight:700, color:T.blue }}>💺 Seat Condition Check — {bus.regNo}</div>
              <div style={{ fontSize:11, color:T.textSub }}>{bus.seatingCapacity} seats · {bus.model} · Tap seat to inspect</div>
            </div>
            <button className="btn" style={{ background:"rgba(255,255,255,.08)", padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
          </div>
          <div className="mbdy">
            {/* Seat grid */}
            <div style={{ background:T.bgPanel, borderRadius:10, padding:14, marginBottom:14 }}>
              <div style={{ fontSize:11, fontWeight:600, color:T.textSub, marginBottom:8 }}>Seat Layout — Click a seat to inspect</div>
              <div style={{ display:"flex", gap:6, marginBottom:8 }}>
                {[["🟢","All OK"],["🟡","Issue"],["⬜","Unchecked"]].map(([e,l])=><span key={l} style={{ fontSize:11, color:T.textMuted }}>{e} {l}</span>)}
              </div>
              <div style={{ overflowX:"auto" }}>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(40px,1fr))", gap:4, maxWidth:600 }}>
                  {seats.map(seat => {
                    const checks = SEAT_CHECK_TEMPLATE.map(c=>seatCheckData[`${bus.id}_${seat}_${c.id}`]);
                    const hasIssue = checks.some(v=>v==="issue");
                    const allDone = checks.every(v=>v==="ok"||v==="na");
                    return (
                      <div key={seat} onClick={()=>setSelSeat(seat)} style={{ width:38, height:34, borderRadius:6, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, border:`2px solid ${selSeat===seat?T.blue:T.border}`, background:selSeat===seat?T.blueGlow:hasIssue?T.redGlow:allDone?T.greenGlow:T.bgPanel, color:hasIssue?T.red:allDone?T.green:T.textSub }}>
                        {seat}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Check items for selected seat */}
            {selSeat && (
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:T.blue, marginBottom:10 }}>Checking Seat {selSeat}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {SEAT_CHECK_TEMPLATE.map(chk => {
                    const val = seatCheckData[`${bus.id}_${selSeat}_${chk.id}`]||"unchecked";
                    return (
                      <div key={chk.id} style={{ display:"flex", gap:10, alignItems:"center", padding:"8px 12px", borderRadius:8, background:val==="ok"?T.greenGlow:val==="issue"?T.redGlow:T.bgPanel, border:`1px solid ${val==="ok"?T.green:val==="issue"?T.red:T.border}33`, cursor:"pointer", justifyContent:"space-between" }}>
                        <div>
                          <div style={{ fontSize:12, fontWeight:600 }}>{chk.label}</div>
                          <div style={{ fontSize:10, color:T.textMuted }}>{chk.check}</div>
                        </div>
                        <div style={{ display:"flex", gap:6 }}>
                          {[["ok","✅","OK"],["issue","❌","Issue"],["na","⬜","N/A"]].map(([v,e,l])=>(
                            <button key={v} onClick={()=>toggleSeat(bus.id,selSeat,chk.id,v)} style={{ background:val===v?v==="ok"?T.green:v==="issue"?T.red:T.textMuted+"44":"rgba(255,255,255,.05)", border:`1px solid ${val===v?v==="ok"?T.green:v==="issue"?T.red:T.border:T.border}`, borderRadius:7, padding:"3px 8px", fontSize:11, cursor:"pointer", color:val===v?"#fff":T.textMuted }}>
                              {e} {l}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {/* Summary */}
            <div style={{ marginTop:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ fontSize:11, color:T.textMuted }}>
                Issues: <strong style={{ color:T.red }}>{Object.values(seatCheckData).filter(v=>v==="issue").length}</strong> · OK: <strong style={{ color:T.green }}>{Object.values(seatCheckData).filter(v=>v==="ok").length}</strong>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button className="btn btn-gh" onClick={onClose}>Close</button>
                <button className="btn btn-p" style={{ fontSize:11 }}>📄 Generate Seat Report</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── Pre-Trip Check Modal ─────────────────────────────────────────────────────
  const PreTripBusModal = ({ bus, onClose }) => {
    const allChecks = [...BUS_PRETRIP_CHECKS.safety_critical,...BUS_PRETRIP_CHECKS.electrical,...BUS_PRETRIP_CHECKS.mechanical,...BUS_PRETRIP_CHECKS.compliance];
    const criticalChecks = allChecks.filter(c=>c.critical);
    const criticalIssues = criticalChecks.filter(c=>preTripData[`${bus.id}_${c.id}`]==="issue");
    const allCriticalDone = criticalChecks.every(c=>preTripData[`${bus.id}_${c.id}`]==="ok"||preTripData[`${bus.id}_${c.id}`]==="na");
    return (
      <div className="ov" style={{ alignItems:"flex-start", paddingTop:20, overflowY:"auto" }}>
        <div className="modal" style={{ maxWidth:640, width:"100%", margin:"0 auto" }}>
          <div className="mhdr" style={{ background:`linear-gradient(135deg,#064E3B,#065F46)`, borderBottom:`1px solid ${T.green}33` }}>
            <div>
              <div className="rj" style={{ fontSize:18, fontWeight:700, color:T.green }}>🔍 Bus Pre-Trip Safety Check — {bus.regNo}</div>
              <div style={{ fontSize:11, color:T.textSub }}>MV Act compliance · {allChecks.length} checks · {criticalChecks.length} critical items</div>
            </div>
            <button className="btn" style={{ background:"rgba(255,255,255,.08)", padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
          </div>
          <div className="mbdy">
            {criticalIssues.length > 0 && (
              <div style={{ background:T.redGlow, border:`1px solid ${T.red}44`, borderRadius:8, padding:10, marginBottom:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.red }}>🚨 {criticalIssues.length} Critical Issue(s) — Bus CANNOT depart</div>
                {criticalIssues.map(c=><div key={c.id} style={{ fontSize:11, color:T.red, marginTop:2 }}>• {c.label}</div>)}
              </div>
            )}
            {Object.entries({ "🚨 Safety Critical":BUS_PRETRIP_CHECKS.safety_critical, "⚡ Electrical & Lights":BUS_PRETRIP_CHECKS.electrical, "🔧 Mechanical":BUS_PRETRIP_CHECKS.mechanical, "📋 Documents & Compliance":BUS_PRETRIP_CHECKS.compliance }).map(([section,checks])=>(
              <div key={section} style={{ marginBottom:14 }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.textSub, marginBottom:8 }}>{section}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  {checks.map(chk => {
                    const val = preTripData[`${bus.id}_${chk.id}`]||"unchecked";
                    return (
                      <div key={chk.id} onClick={()=>togglePT(bus.id,chk.id,val==="ok"?"issue":val==="issue"?"na":"ok")} style={{ display:"flex", gap:8, alignItems:"center", padding:"7px 10px", borderRadius:7, cursor:"pointer", background:val==="ok"?T.greenGlow:val==="issue"?T.redGlow:T.bgPanel, border:`1px solid ${val==="ok"?T.green:val==="issue"?T.red:T.border}22`, transition:"all .1s" }}>
                        <span style={{ fontSize:16, flexShrink:0 }}>{val==="ok"?"✅":val==="issue"?"❌":"⬜"}</span>
                        <div style={{ flex:1 }}>
                          <span style={{ fontSize:12, color:val==="ok"?T.green:val==="issue"?T.red:T.text }}>{chk.label}</span>
                          {chk.critical && <span className="badge br" style={{ fontSize:8, marginLeft:6 }}>CRITICAL</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {/* Summary and depart button */}
            <div style={{ background:allCriticalDone&&criticalIssues.length===0?T.greenGlow:T.bgPanel, border:`1px solid ${allCriticalDone&&criticalIssues.length===0?T.green:T.border}`, borderRadius:10, padding:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:allCriticalDone&&criticalIssues.length===0?T.green:T.textSub }}>
                    {allCriticalDone&&criticalIssues.length===0?"✅ All critical checks passed — Ready to depart":criticalIssues.length>0?"🚨 Cannot depart — resolve critical issues":"⏳ Complete all critical checks"}
                  </div>
                  <div style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>
                    {Object.values(preTripData).filter(v=>v==="ok").length}/{allChecks.length} checks passed
                  </div>
                </div>
                <button className="btn" style={{ background:allCriticalDone&&criticalIssues.length===0?T.green:"rgba(255,255,255,.05)", color:allCriticalDone&&criticalIssues.length===0?"#fff":T.textMuted, fontWeight:600 }} disabled={!(allCriticalDone&&criticalIssues.length===0)}>
                  🚌 Clear for Departure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── Compliance Detail Modal ──────────────────────────────────────────────────
  const ComplianceModal = ({ bus, onClose }) => {
    const docs = BUS_COMPLIANCE_DOCS.filter(d=>d.busId===bus.id);
    return (
      <div className="ov">
        <div className="modal" style={{ maxWidth:600 }}>
          <div className="mhdr" style={{ background:"linear-gradient(135deg,#1C0000,#3D1000,#EF444422)", borderBottom:`1px solid ${T.red}33` }}>
            <div>
              <div className="rj" style={{ fontSize:18, fontWeight:700, color:T.red }}>📋 Compliance Documents — {bus.regNo}</div>
              <div style={{ fontSize:11, color:T.textSub }}>{bus.type.replace(/_/g," ")} · {bus.model}</div>
            </div>
            <button className="btn" style={{ background:"rgba(255,255,255,.08)", padding:"5px 9px" }} onClick={onClose}><Ic n="x" s={14} c={T.textSub} /></button>
          </div>
          <div className="mbdy">
            {docs.map(doc => (
              <div key={doc.id} style={{ padding:"12px 0", borderBottom:`1px solid ${T.border}22` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:3 }}>
                      <span style={{ fontSize:12, fontWeight:700 }}>{doc.docType}</span>
                      <span className="badge" style={{ background:docStatusColor(doc)+"22", color:docStatusColor(doc), fontSize:10 }}>{docStatusLabel(doc)}</span>
                    </div>
                    <div style={{ fontSize:11, color:T.textMuted }}>No: <strong>{doc.docNo}</strong> · Issuer: {doc.issuer}</div>
                    <div style={{ fontSize:11, color:T.textMuted }}>Issue: {doc.issueDate} · Expiry: <strong style={{ color:docStatusColor(doc) }}>{doc.expiryDate}</strong></div>
                    {doc.daysLeft < 0 && <div style={{ fontSize:11, color:T.red, fontWeight:700, marginTop:2 }}>⚠️ Penalty: {doc.fine}</div>}
                  </div>
                  {doc.daysLeft < 90 && (
                    <button className="btn" style={{ fontSize:10, background:T.blue+"22", color:T.blue, border:`1px solid ${T.blue}33` }}>
                      Renew →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {showSeatCheck && <SeatCheckModal bus={showSeatCheck} onClose={()=>setShowSeatCheck(null)} />}
      {showPreTrip && <PreTripBusModal bus={showPreTrip} onClose={()=>setShowPreTrip(null)} />}
      {showCompliance && <ComplianceModal bus={showCompliance} onClose={()=>setShowCompliance(null)} />}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <h1 className="rj" style={{ fontSize:28, fontWeight:700 }}>Bus Operations</h1>
          <p style={{ color:T.textSub, fontSize:12 }}>Corporate · School · Tourism · Stage · Compliance · Seat Check · Driver Verification</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button className="btn" style={{ fontSize:11, background:T.red+"22", color:T.red, border:`1px solid ${T.red}33` }}>⚠️ {expiredDocs.length} Expired Docs</button>
        </div>
      </div>

      {/* Compliance KPIs */}
      <div className="kpi-row" style={{ gridTemplateColumns:"repeat(6,1fr)", marginBottom:18 }}>
        {[
          { l:"Total Buses",          v:BUS_MASTER_DATA.length,              c:T.blue   },
          { l:"Active",              v:BUS_MASTER_DATA.filter(b=>b.status==="Active").length, c:T.green },
          { l:"Expired Docs",        v:expiredDocs.length,                   c:T.red    },
          { l:"Critical (< 30d)",    v:criticalDocs.length,                  c:T.red    },
          { l:"Due Soon (30–90d)",   v:dueSoonDocs.length,                   c:T.orange },
          { l:"Non-Compliant Drivers",v:nonCompliantDrivers.length,          c:T.orange },
        ].map(k=>(
          <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}>
            <div className="stat-v" style={{ color:k.c }}>{k.v}</div>
            <div className="stat-l">{k.l}</div>
          </div>
        ))}
      </div>

      {/* Critical Compliance Alerts */}
      {(expiredDocs.length>0||criticalDocs.length>0) && (
        <div className="card" style={{ marginBottom:14, border:`1px solid ${T.red}44`, background:T.redGlow }}>
          <div className="section-title" style={{ color:T.red }}>🚨 Compliance Violations — Immediate Action Required</div>
          {[...expiredDocs,...criticalDocs].map(doc => {
            const bus = BUS_MASTER_DATA.find(b=>b.id===doc.busId);
            return (
              <div key={doc.id} className="arow" style={{ borderLeftColor:T.red }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:T.red }}>{bus?.regNo} — {doc.docType}</div>
                  <div style={{ fontSize:11, color:T.textSub }}>{doc.daysLeft<0?`Expired ${Math.abs(doc.daysLeft)} days ago`:`Expires in ${doc.daysLeft} days`} · Fine: {doc.fine}</div>
                  {doc.daysLeft<0 && <div style={{ fontSize:11, color:T.red }}>⛔ Bus must NOT operate without valid {doc.docType}</div>}
                </div>
                <button className="btn" style={{ fontSize:10, background:T.red+"22", color:T.red, border:`1px solid ${T.red}33` }} onClick={()=>setShowCompliance(bus)}>View →</button>
              </div>
            );
          })}
        </div>
      )}

      <div className="tabs">
        {["fleet","compliance","driver-check","seat-check","routes","tickets"].map(t=>(
          <div key={t} className={`tab ${tab===t?"on":""}`} onClick={()=>setTab(t)} style={{ fontSize:11, textTransform:"capitalize", whiteSpace:"nowrap" }}>
            {t==="driver-check"?"Driver Check":t==="seat-check"?"Seat Check":t.charAt(0).toUpperCase()+t.slice(1)}
          </div>
        ))}
      </div>

      {/* ── FLEET TAB ── */}
      {tab==="fleet" && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
          {BUS_MASTER_DATA.map(bus => {
            const docs = BUS_COMPLIANCE_DOCS.filter(d=>d.busId===bus.id);
            const expDocs = docs.filter(d=>d.daysLeft<0);
            const critDocs = docs.filter(d=>d.daysLeft>=0&&d.daysLeft<=30);
            const busType = BUS_FLEET_TYPES[bus.type];
            return (
              <div key={bus.id} className="card" style={{ border:`1px solid ${expDocs.length>0?T.red:critDocs.length>0?T.orange:T.border}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                  <div>
                    <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4 }}>
                      <span style={{ fontSize:16 }}>{busType?.icon}</span>
                      <span className="mono" style={{ fontSize:13, fontWeight:700, color:T.accent }}>{bus.regNo}</span>
                      <span className={`badge ${bus.status==="Active"?"bg":bus.status==="Available"?"bb":"br"}`} style={{ fontSize:10 }}>{bus.status}</span>
                    </div>
                    <div style={{ fontSize:11, color:T.textSub }}>{bus.model} · {bus.seatingCapacity} seats · {bus.acType}</div>
                    <div style={{ fontSize:11, color:busType?.color||T.textMuted }}>{busType?.label}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:12, fontWeight:700, color:expDocs.length>0?T.red:critDocs.length>0?T.orange:T.green }}>
                      {expDocs.length>0?`${expDocs.length} EXPIRED`:critDocs.length>0?`${critDocs.length} critical`:"Compliant ✅"}
                    </div>
                    <div style={{ fontSize:10, color:T.textMuted }}>FC: {bus.fcExpiry}</div>
                    <div style={{ fontSize:10, color:T.textMuted }}>Insurance: {bus.insuranceExpiry}</div>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6, marginBottom:10 }}>
                  {[{ l:"Fitness",    v:`${bus.fitnessScore}%`, c:bus.fitnessScore>80?T.green:bus.fitnessScore>60?T.orange:T.red },{ l:"Permit",    v:bus.permitType?.split(" ")[0], c:T.blue },{ l:"Client", v:bus.client?.split(" ")[0]||"—", c:T.text }].map(k=>(
                    <div key={k.l} style={{ background:T.bgPanel, borderRadius:7, padding:"5px 8px" }}>
                      <div style={{ fontSize:9, color:T.textMuted }}>{k.l}</div>
                      <div style={{ fontSize:11, fontWeight:600, color:k.c, marginTop:1 }}>{k.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <button className="btn" style={{ flex:1, fontSize:10, background:T.green+"22", color:T.green, border:`1px solid ${T.green}33`, padding:"5px 0" }} onClick={()=>setShowPreTrip(bus)}>🔍 Pre-Trip</button>
                  <button className="btn" style={{ flex:1, fontSize:10, background:T.blue+"22", color:T.blue, border:`1px solid ${T.blue}33`, padding:"5px 0" }} onClick={()=>setShowSeatCheck(bus)}>💺 Seats</button>
                  <button className="btn" style={{ flex:1, fontSize:10, background:T.red+"22", color:T.red, border:`1px solid ${T.red}33`, padding:"5px 0" }} onClick={()=>setShowCompliance(bus)}>📋 Docs</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── COMPLIANCE TAB ── */}
      {tab==="compliance" && (
        <div>
          <div className="card" style={{ padding:0 }}>
            <table className="tbl">
              <thead><tr><th>Bus</th><th>Document</th><th>Doc No</th><th>Issuer</th><th>Expiry</th><th>Status</th><th>Fine if Defaulted</th><th></th></tr></thead>
              <tbody>
                {BUS_COMPLIANCE_DOCS.map(doc => {
                  const bus = BUS_MASTER_DATA.find(b=>b.id===doc.busId);
                  return (
                    <tr key={doc.id} style={{ background:doc.daysLeft<0?T.redGlow:doc.daysLeft<=30?T.orangeGlow:"" }}>
                      <td className="mono" style={{ fontSize:11, color:T.accent }}>{bus?.regNo||doc.busId}</td>
                      <td style={{ fontSize:11, fontWeight:600 }}>{doc.docType}</td>
                      <td className="mono" style={{ fontSize:10 }}>{doc.docNo}</td>
                      <td style={{ fontSize:11 }}>{doc.issuer}</td>
                      <td style={{ fontSize:11, color:docStatusColor(doc), fontWeight:600 }}>{doc.expiryDate}</td>
                      <td><span className="badge" style={{ background:docStatusColor(doc)+"22", color:docStatusColor(doc), fontSize:10 }}>{docStatusLabel(doc)}</span></td>
                      <td style={{ fontSize:11, color:doc.daysLeft<0?T.red:T.textMuted }}>{doc.fine}</td>
                      <td>{doc.daysLeft<90&&<button className="btn" style={{ fontSize:10, padding:"3px 8px", background:T.blue+"22", color:T.blue, border:`1px solid ${T.blue}33` }}>Renew</button>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* MV Act Penalty Reference */}
          <div className="card" style={{ marginTop:14 }}>
            <div className="section-title">📖 MV Act 2019 — Commercial Vehicle Penalty Reference</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginTop:8 }}>
              {[
                { doc:"Insurance",           val1:"₹2,000",  val2:"₹4,000",  days:"3 months imprisonment possible" },
                { doc:"Fitness Certificate", val1:"₹2,000",  val2:"₹10,000", days:"₹50/day continuing default" },
                { doc:"Permit",              val1:"₹10,000", val2:"₹25,000", days:"Permit cancellation" },
                { doc:"PUC Certificate",     val1:"₹1,000",  val2:"₹2,000",  days:"Vehicle seizure possible" },
                { doc:"Motor Vehicle Tax",   val1:"Tax + 10% penalty", val2:"2× penalty", days:"Vehicle detention" },
                { doc:"Driver DL (Passenger)",val1:"₹5,000", val2:"₹10,000", days:"DL suspension" },
              ].map(p=>(
                <div key={p.doc} style={{ background:T.bgPanel, borderRadius:8, padding:"9px 12px" }}>
                  <div style={{ fontSize:11, fontWeight:700, marginBottom:4 }}>{p.doc}</div>
                  <div style={{ fontSize:10, color:T.textMuted }}>1st offence: <strong style={{ color:T.orange }}>{p.val1}</strong></div>
                  <div style={{ fontSize:10, color:T.textMuted }}>Repeat: <strong style={{ color:T.red }}>{p.val2}</strong></div>
                  <div style={{ fontSize:10, color:T.red, marginTop:2 }}>{p.days}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── DRIVER CHECK TAB ── */}
      {tab==="driver-check" && (
        <div>
          <div className="card" style={{ marginBottom:14 }}>
            <div className="section-title" style={{ marginBottom:10 }}>PSV Driver Compliance — 6 Required Documents & Checks</div>
            <div style={{ fontSize:11, color:T.textSub, marginBottom:12, lineHeight:1.6 }}>
              For buses (passenger service vehicles), drivers must hold a <strong>PSV endorsement</strong> on HMV licence + a separate <strong>PSV Badge</strong> (issued by RTO) + annual <strong>Medical Fitness Certificate (Form 1A)</strong> + <strong>Police Verification</strong>. Driving a PSV without a badge is a punishable offence — ₹5,000 penalty + licence suspension.
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {DRIVER_COMPLIANCE_DATA.map(drv => {
                const statusC = drv.status==="Valid"?T.green:drv.status==="Expiring"?T.orange:T.red;
                const checks = [
                  { l:"DL Class",          v:drv.dlClass,               ok:drv.dlClass?.includes("PSV"),  icon:"📄" },
                  { l:"DL Expiry",         v:drv.dlExpiry,              ok:new Date(drv.dlExpiry)>new Date(), icon:"📅" },
                  { l:"PSV Badge",         v:drv.badgeNo||"NOT ISSUED", ok:!!drv.badgeNo,                 icon:"🏷️" },
                  { l:"Badge Expiry",      v:drv.badgeExpiry||"—",      ok:drv.badgeExpiry&&new Date(drv.badgeExpiry)>new Date(), icon:"📅" },
                  { l:"Med Fitness (1A)",  v:drv.medFitExpiry,          ok:drv.medFitExpiry&&new Date(drv.medFitExpiry)>new Date(), icon:"🏥" },
                  { l:"Police Verification",v:drv.policeVerification,   ok:!!drv.policeVerification,     icon:"🚔" },
                  { l:"Aadhaar Linked",    v:drv.aadharLinked?"Yes":"No",ok:drv.aadharLinked,             icon:"🆔" },
                  { l:"Training Cert",     v:drv.trainingCert||"None",  ok:!!drv.trainingCert,            icon:"🎓" },
                ];
                return (
                  <div key={drv.driverId} className="card" style={{ border:`1px solid ${statusC}33`, padding:14 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                        <div style={{ width:40, height:40, borderRadius:"50%", background:statusC+"22", border:`2px solid ${statusC}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:statusC }}>{drv.name[0]}</div>
                        <div>
                          <div style={{ fontSize:13, fontWeight:700 }}>{drv.name}</div>
                          <div className="mono" style={{ fontSize:11, color:T.textMuted }}>DL: {drv.dlNo}</div>
                        </div>
                      </div>
                      <span className="badge" style={{ background:statusC+"22", color:statusC }}>{drv.status}</span>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:6 }}>
                      {checks.map(chk=>(
                        <div key={chk.l} style={{ background:chk.ok?T.greenGlow:T.redGlow, border:`1px solid ${chk.ok?T.green:T.red}33`, borderRadius:7, padding:"6px 8px" }}>
                          <div style={{ fontSize:9, color:T.textMuted, marginBottom:2 }}>{chk.icon} {chk.l}</div>
                          <div style={{ fontSize:11, fontWeight:600, color:chk.ok?T.green:T.red }}>{chk.ok?"✅":"❌"} {chk.v}</div>
                        </div>
                      ))}
                    </div>
                    {drv.status!=="Valid" && (
                      <div style={{ background:T.orangeGlow, border:`1px solid ${T.orange}33`, borderRadius:7, padding:8, marginTop:8, fontSize:11, color:T.orange }}>
                        ⚠️ This driver has non-compliant documents. Cannot be assigned to PSV operations until resolved.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── SEAT CHECK TAB ── */}
      {tab==="seat-check" && (
        <div>
          <div style={{ fontSize:12, color:T.textSub, marginBottom:12, lineHeight:1.6 }}>
            Monthly seat condition check ensures all seats, belts, windows, and AC vents are functional. Issues found in seat checks must be raised as Work Orders before the bus is dispatched. Select a bus to begin the check.
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10 }}>
            {BUS_MASTER_DATA.map(bus=>(
              <div key={bus.id} className="card" style={{ padding:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <div>
                    <div className="mono" style={{ fontSize:13, fontWeight:700, color:T.accent }}>{bus.regNo}</div>
                    <div style={{ fontSize:11, color:T.textSub }}>{bus.model} · {bus.seatingCapacity} seats</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:6, marginBottom:8 }}>
                  {["AC","Seat Belts","Windows","Lighting"].map(f=>(
                    <span key={f} style={{ fontSize:10, background:T.bgPanel, padding:"3px 8px", borderRadius:6, color:T.textMuted }}>{f}</span>
                  ))}
                </div>
                <button className="btn btn-b" style={{ width:"100%", fontSize:11 }} onClick={()=>setShowSeatCheck(bus)}>
                  💺 Start Seat Check — {bus.seatingCapacity} seats
                </button>
              </div>
            ))}
          </div>
          {/* Seat check items reference */}
          <div className="card" style={{ marginTop:14 }}>
            <div className="section-title">Seat Check Checklist — 10 Items per Seat</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8 }}>
              {SEAT_CHECK_TEMPLATE.map(c=>(
                <div key={c.id} style={{ background:T.bgPanel, borderRadius:7, padding:"7px 10px" }}>
                  <div style={{ fontSize:11, fontWeight:600 }}>{c.label}</div>
                  <div style={{ fontSize:10, color:T.textMuted }}>{c.check}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── ROUTES TAB ── */}
      {tab==="routes" && (
        <div>
          {ROUTE_SCHEDULES.map(route => {
            const bus = BUS_MASTER_DATA.find(b=>b.id===route.busId);
            const busType = BUS_FLEET_TYPES[route.type];
            return (
              <div key={route.id} className="card" style={{ marginBottom:12, border:`1px solid ${busType?.color||T.border}22` }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                  <div>
                    <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4 }}>
                      <span style={{ fontSize:16 }}>{busType?.icon}</span>
                      <span style={{ fontSize:13, fontWeight:700 }}>{route.routeName}</span>
                      <span className="badge" style={{ background:(busType?.color||T.textMuted)+"22", color:busType?.color||T.textMuted, fontSize:10 }}>{busType?.label}</span>
                    </div>
                    <div style={{ fontSize:11, color:T.textSub }}>Bus: {bus?.regNo} · Driver: {route.driver} {route.conductor?`· Conductor: ${route.conductor}`:""}</div>
                    <div style={{ fontSize:11, color:T.textMuted }}>Runs: {route.daysOfWeek?.join(", ")}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    {route.monthlyRate && <div style={{ fontSize:13, fontWeight:700, color:T.green }}>{fmt(route.monthlyRate)}/mo</div>}
                    {route.dailyRevTarget && <div style={{ fontSize:12, color:T.accent }}>Target: {fmt(route.dailyRevTarget)}/day</div>}
                    <div style={{ fontSize:10, color:T.textMuted }}>{route.client}</div>
                  </div>
                </div>
                {/* Route stops */}
                <div style={{ display:"flex", gap:0, overflow:"auto" }}>
                  {route.stops.map((stop,i)=>(
                    <div key={i} style={{ display:"flex", alignItems:"center" }}>
                      <div style={{ background:T.bgPanel, border:`1px solid ${busType?.color||T.border}44`, borderRadius:8, padding:"7px 10px", minWidth:130 }}>
                        <div style={{ fontSize:10, color:T.textMuted }}>{stop.time}</div>
                        <div style={{ fontSize:11, fontWeight:600 }}>{stop.name.split(" ").slice(0,2).join(" ")}</div>
                        {stop.pax>0 && <div style={{ fontSize:10, color:busType?.color||T.accent }}>↑ {stop.pax} pax</div>}
                      </div>
                      {i<route.stops.length-1 && <div style={{ padding:"0 6px", color:T.textMuted, fontSize:12 }}>→</div>}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── TICKETS TAB ── */}
      {tab==="tickets" && (
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, alignItems:"center" }}>
            <div style={{ fontSize:12, color:T.textSub }}>Daily ticket collection log for Stage Carriage / City routes. Conductor submits trip-wise collections.</div>
            <button className="btn btn-p" style={{ fontSize:11 }} onClick={()=>setShowAddTicket(true)}>+ Log Trip Collection</button>
          </div>
          {/* Daily total */}
          <div className="card" style={{ marginBottom:14 }}>
            <div className="section-title">Daily Collection Summary — {today}</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
              {[
                { l:"Total Trips",    v:ticketLogs.length,                                          c:T.blue   },
                { l:"Total Pax",      v:ticketLogs.reduce((s,t)=>s+t.boardedPax,0),                c:T.green  },
                { l:"Tickets Sold",   v:ticketLogs.reduce((s,t)=>s+t.ticketsSold,0),               c:T.accent },
                { l:"Cash Collected", v:fmt(ticketLogs.reduce((s,t)=>s+t.cashCollected,0)),        c:T.green  },
              ].map(k=>(
                <div key={k.l} className="stat" style={{ borderTop:`3px solid ${k.c}` }}>
                  <div className="stat-v" style={{ color:k.c }}>{k.v}</div>
                  <div className="stat-l">{k.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding:0 }}>
            <table className="tbl">
              <thead><tr><th>Log ID</th><th>Date</th><th>Shift</th><th>Trip #</th><th>Boarded Pax</th><th>Tickets Sold</th><th>Cash (₹)</th><th>Conductor</th><th>Verified</th></tr></thead>
              <tbody>
                {ticketLogs.map(t=>(
                  <tr key={t.id}>
                    <td className="mono" style={{ fontSize:11, color:T.accent }}>{t.id}</td>
                    <td style={{ fontSize:11 }}>{t.date}</td>
                    <td><span className={`badge ${t.shift==="AM"?"bg":"bb"}`} style={{ fontSize:10 }}>{t.shift}</span></td>
                    <td style={{ fontWeight:600 }}>{t.tripNo}</td>
                    <td style={{ color:T.orange }}>{t.boardedPax}</td>
                    <td style={{ color:t.ticketsSold<t.boardedPax?T.red:T.green, fontWeight:600 }}>{t.ticketsSold}{t.ticketsSold<t.boardedPax&&<span style={{ fontSize:10, color:T.red }}> (-{t.boardedPax-t.ticketsSold})</span>}</td>
                    <td style={{ fontWeight:700, color:T.green }}>₹{t.cashCollected.toLocaleString()}</td>
                    <td style={{ fontSize:11 }}>{t.conductorName}</td>
                    <td>{t.verified?<span className="badge bg" style={{ fontSize:10 }}>✅</span>:<button className="btn" style={{ fontSize:9, padding:"2px 6px" }}>Verify</button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showAddTicket && (
            <div className="ov">
              <div className="modal" style={{ maxWidth:480 }}>
                <div className="mhdr" style={{ background:"linear-gradient(135deg,#0D1A00,#1A3300)", borderBottom:`1px solid ${T.green}33` }}>
                  <div className="rj" style={{ fontSize:16, fontWeight:700, color:T.green }}>🎫 Log Trip Ticket Collection</div>
                  <button className="btn" style={{ padding:"5px 9px" }} onClick={()=>setShowAddTicket(null)}><Ic n="x" s={14} c={T.textSub} /></button>
                </div>
                <div className="mbdy">
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                    <div><label className="flabel">Shift</label><select value={addTicketForm.shift} onChange={e=>setAddTicketForm(f=>({...f,shift:e.target.value}))}><option>AM</option><option>PM</option></select></div>
                    <div><label className="flabel">Trip Number</label><input type="number" value={addTicketForm.tripNo} onChange={e=>setAddTicketForm(f=>({...f,tripNo:e.target.value}))} placeholder="1" /></div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                    <div><label className="flabel">Passengers Boarded</label><input type="number" value={addTicketForm.boardedPax} onChange={e=>setAddTicketForm(f=>({...f,boardedPax:e.target.value}))} placeholder="48" /></div>
                    <div><label className="flabel">Tickets Sold</label><input type="number" value={addTicketForm.ticketsSold} onChange={e=>setAddTicketForm(f=>({...f,ticketsSold:e.target.value}))} placeholder="48" /></div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                    <div><label className="flabel">Cash Collected (₹)</label><input type="number" value={addTicketForm.cashCollected} onChange={e=>setAddTicketForm(f=>({...f,cashCollected:e.target.value}))} placeholder="576" /></div>
                    <div><label className="flabel">Conductor Name</label><input value={addTicketForm.conductorName} onChange={e=>setAddTicketForm(f=>({...f,conductorName:e.target.value}))} placeholder="Conductor" /></div>
                  </div>
                  {addTicketForm.boardedPax&&addTicketForm.ticketsSold&&parseInt(addTicketForm.ticketsSold)<parseInt(addTicketForm.boardedPax)&&(
                    <div style={{ background:T.orangeGlow, borderRadius:7, padding:8, fontSize:11, color:T.orange, marginBottom:10 }}>
                      ⚠️ {parseInt(addTicketForm.boardedPax)-parseInt(addTicketForm.ticketsSold)} passengers without tickets. Flag for conductor review.
                    </div>
                  )}
                  <div style={{ display:"flex", justifyContent:"flex-end", gap:8 }}>
                    <button className="btn btn-gh" onClick={()=>setShowAddTicket(null)}>Cancel</button>
                    <button className="btn btn-p" onClick={()=>{
                      const id=`TK-${String(ticketLogs.length+1).padStart(3,"0")}`;
                      setTicketLogs(l=>[...l,{ id, routeId:"RS-003", date:today, shift:addTicketForm.shift, tripNo:parseInt(addTicketForm.tripNo)||ticketLogs.length+1, boardedPax:parseInt(addTicketForm.boardedPax)||0, ticketsSold:parseInt(addTicketForm.ticketsSold)||0, cashCollected:parseInt(addTicketForm.cashCollected)||0, conductorName:addTicketForm.conductorName, verified:false }]);
                      setShowAddTicket(null);
                    }}>✅ Log Collection</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const NAV = [
  { id:"dash",      l:"Control Tower",        i:"dash",    section:"Command"      },
  { id:"tracking",  l:"Live GPS Tracking",    i:"map",     section:"Command"      },
  { id:"trips",     l:"All Trips",            i:"trips",   section:"Operations"   },
  { id:"contracts", l:"Fleet Contracts",      i:"doc",     badge:3, section:"Operations" },
  { id:"pod",       l:"Proof of Delivery",    i:"doc",     badge:2, section:"Operations" },
  { id:"pretrip",   l:"Pre-Trip Inspection",  i:"pretrip", badge:3, section:"Operations" },
  { id:"posttrip",  l:"Post-Trip Inspection", i:"posttrip",badge:2, section:"Operations" },
  { id:"breakdown", l:"Breakdown & Recovery", i:"alert",   badge:2, section:"Operations" },
  { id:"settlement",l:"Driver Settlement",    i:"wallet",  badge:2, section:"Operations" },
  { id:"agents",    l:"Agents & Commission",  i:"agent",           section:"Operations" },
  { id:"vendors",   l:"Vendor Fleet",         i:"vendor",          section:"Operations" },
  { id:"fleet",     l:"Vehicle Master",       i:"fleet",           section:"Fleet"      },
  { id:"heavy",     l:"Heavy Equipment",      i:"wrench",  badge:2, section:"Fleet"      },
  { id:"busops",    l:"Bus Operations",       i:"bus",     badge:3, section:"Fleet"      },
  { id:"tyre",      l:"Tyre Intelligence",    i:"tyre",    badge:2, section:"Fleet"      },
  { id:"drivers",   l:"Drivers",              i:"driver",          section:"Fleet"      },
  { id:"fuel",      l:"Fuel Control",         i:"fuel",    badge:2, section:"Fleet"      },
  { id:"workshop",  l:"Workshop & WOs",       i:"wrench",  badge:2, section:"Maintenance"},
  { id:"pmsettings",l:"PM Settings",          i:"wrench",          section:"Maintenance"},
  { id:"parts",     l:"Spare Parts",          i:"parts",           section:"Maintenance"},
  { id:"eqbilling", l:"Equipment Billing",    i:"finance", badge:1, section:"Billing"    },
  { id:"ai",        l:"AI Predictions",       i:"brain",           section:"Intelligence"},
  { id:"profitability",l:"Profitability",     i:"chart",           section:"Intelligence"},
  { id:"finance",   l:"Finance & P&L",        i:"finance",         section:"Finance"    },
];

const sections = [...new Set(NAV.map(n => n.section))];

export default function Tranzoop() {
  const [page, setPage] = useState("dash");

  const pages = {
    dash: <Dashboard setPage={setPage} />,
    tracking: <LiveTrackingPage />,
    trips: <TripsPage />,
    contracts: <FleetContractsPage />,
    pod: <PODPage />,
    pretrip: <PreTripPage />,
    posttrip: <PostTripPage />,
    breakdown: <BreakdownPage />,
    settlement: <DriverSettlementPage />,
    agents: <AgentPage />,
    vendors: <VendorPage />,
    fleet: <VehicleMasterPage />,
    heavy: <HeavyEquipmentPage />,
    busops: <BusOperationsPage />,
    tyre: <TyreManagementPage />,
    drivers: <DriversPage />,
    fuel: <FuelControlPage />,
    workshop: <WorkshopPage />,
    pmsettings: <PMSettingsPage />,
    parts: <SparePartsPage />,
    eqbilling: <EquipmentBillingPage />,
    ai: <AIPredictionPage />,
    profitability: <ProfitabilityPage />,
    finance: <FinancePage />,
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className="sidebar">
          <div style={{ padding:"18px 16px 14px", borderBottom:`1px solid ${T.border}`, flexShrink:0 }}>
            <div className="rj" style={{ fontSize:21, fontWeight:700, letterSpacing:2, color:T.accent }}>TRANZOOP</div>
            <div style={{ fontSize:9, color:T.textMuted, letterSpacing:".12em", marginTop:1 }}>TRANSPORT OS v15 · Bus Operations + Compliance</div>
          </div>
          <nav style={{ flex:1, padding:"8px 0" }}>
            {sections.map(sec => (
              <div key={sec}>
                <div className="nav-section">{sec}</div>
                {NAV.filter(n => n.section===sec).map(n => (
                  <div key={n.id} className={`nav-item ${page===n.id?"active":""}`} onClick={() => setPage(n.id)}>
                    <Ic n={n.i} s={14} />
                    {n.l}
                    {n.badge && <span className="nav-badge">{n.badge}</span>}
                  </div>
                ))}
              </div>
            ))}
          </nav>
          <div style={{ padding:"10px 14px", borderTop:`1px solid ${T.border}`, flexShrink:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", background:T.accentGlow, border:`1px solid ${T.accent}33`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span className="rj" style={{ fontSize:12, color:T.accent }}>S</span>
              </div>
              <div><div style={{ fontSize:12, fontWeight:600 }}>Super Admin</div><div style={{ fontSize:10, color:T.textMuted }}>owner@tranzoop.in</div></div>
            </div>
          </div>
        </div>
        <div className="main">
          <div className="pad">{pages[page] || <Dashboard setPage={setPage} />}</div>
        </div>
      </div>
    </>
  );
}