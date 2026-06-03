// AirvanaMaker v2 — Icons (compact stroke set)

const ic = {
  home: <><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></>,
  calendar: <><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></>,
  spark: <><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></>,
  box: <><path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></>,
  send: <><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></>,
  wallet: <><path d="M3 7h18v12H3z"/><path d="M3 7l3-3h12l3 3"/><circle cx="17" cy="13" r="1.5" fill="currentColor"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>,
  bell: <><path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
  arrow_r: <><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>,
  arrow_u: <><path d="M12 19V5"/><path d="M6 11l6-6 6 6"/></>,
  arrow_d: <><path d="M12 5v14"/><path d="M6 13l6 6 6-6"/></>,
  chev_r: <><path d="M9 6l6 6-6 6"/></>,
  chev_d: <><path d="M6 9l6 6 6-6"/></>,
  plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
  check: <><path d="M5 12l5 5L20 6"/></>,
  x: <><path d="M6 6l12 12"/><path d="M18 6L6 18"/></>,
  more: <><circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/></>,
  filter: <><path d="M3 5h18"/><path d="M6 12h12"/><path d="M10 19h4"/></>,
  bolt: <><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor"/></>,
  play: <><polygon points="6,4 20,12 6,20" fill="currentColor" stroke="none"/></>,
  pause: <><rect x="6" y="5" width="4" height="14" fill="currentColor"/><rect x="14" y="5" width="4" height="14" fill="currentColor"/></>,
  coins: <><ellipse cx="9" cy="8" rx="6" ry="3"/><path d="M3 8v4c0 1.7 2.7 3 6 3"/><path d="M3 12v4c0 1.7 2.7 3 6 3"/><ellipse cx="15" cy="16" rx="6" ry="3"/></>,
  fire: <><path d="M12 22a7 7 0 0 0 4-13c0 2-2 3-2 6-1 0-2-2-2-4 0-3 0-5-3-8 0 4-3 5-3 9a6 6 0 0 0 6 10z"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></>,
  chart: <><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-7"/></>,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>,
  heart: <><path d="M12 21s-7-4-7-11a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 7-7 11-7 11z"/></>,
  comment: <><path d="M21 12a8 8 0 0 1-12 7l-5 1 1-5a8 8 0 1 1 16-3z"/></>,
  share: <><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8 11l8-5"/><path d="M8 13l8 5"/></>,
  brain: <><path d="M9.5 4a3 3 0 0 0-3 3v1a3 3 0 0 0-2 5.5A3 3 0 0 0 6.5 19a3 3 0 0 0 3 1c.8 0 1.5-.3 2-1V4z"/><path d="M14.5 4a3 3 0 0 1 3 3v1a3 3 0 0 1 2 5.5 3 3 0 0 1-2 5.5 3 3 0 0 1-3 1c-.8 0-1.5-.3-2-1V4z"/></>,
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></>,
  crown: <><path d="M3 7l4 4 5-7 5 7 4-4v11H3z"/></>,
  flow: <><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6h10"/><path d="M5 8v8"/><path d="M19 8v8"/></>,
  layers: <><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 18l9 5 9-5"/></>,
  trend: <><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></>,
  rocket: <><path d="M5 19l4-4"/><path d="M14 4l6 6-8 8H6v-6z"/><path d="M14 10l-4 4"/></>,
  upload: <><path d="M12 17V4"/><path d="M6 10l6-6 6 6"/><path d="M4 20h16"/></>,
  download: <><path d="M12 4v13"/><path d="M6 11l6 6 6-6"/><path d="M4 20h16"/></>,
  star: <><path d="M12 3l2.6 6 6.4.6-5 4.4 1.6 6.4L12 17l-5.6 3.4L8 14l-5-4.4 6.4-.6z"/></>,
  msg: <><path d="M3 5h18v12H7l-4 4z"/></>,
  refresh: <><path d="M3 12a9 9 0 0 1 15-7l3 3"/><path d="M21 4v6h-6"/><path d="M21 12a9 9 0 0 1-15 7l-3-3"/><path d="M3 20v-6h6"/></>,
  copy: <><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.3l2-1.6-2-3.4-2.4.9a7 7 0 0 0-2.2-1.3L14 3h-4l-.3 2.3a7 7 0 0 0-2.2 1.3l-2.4-.9-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .9.1 1.3l-2 1.6 2 3.4 2.4-.9a7 7 0 0 0 2.2 1.3L10 21h4l.3-2.3a7 7 0 0 0 2.2-1.3l2.4.9 2-3.4-2-1.6c.1-.4.1-.9.1-1.3z"/></>,
  link: <><path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6L11.5 7"/><path d="M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6L12.5 17"/></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  undo: <><path d="M9 14L4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/></>,
};

const Icon = ({ name, size = 16, color = "currentColor", strokeWidth = 1.7, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke={color} strokeWidth={strokeWidth}
       strokeLinecap="round" strokeLinejoin="round"
       style={{ flexShrink: 0, ...style }} className="ic">
    {ic[name] || ic.box}
  </svg>
);

/* ── Brand glyph (TikTok/IG/YT/X stand-ins) ─────── */
const Brand = ({ name, size = 18, color }) => {
  const g = {
    tiktok: <g><path d="M14 3v9.5a4 4 0 1 1-3-3.9V12a1.5 1.5 0 1 0 1.5 1.5V3z" fill={color || "#111"}/><path d="M14 3c.4 1.7 1.7 3 3.5 3.2V8.6c-1.4 0-2.5-.4-3.5-1V3z" fill={color || "#111"}/></g>,
    ins:    <g><rect x="3" y="3" width="18" height="18" rx="5" stroke={color || "#111"} strokeWidth="1.8" fill="none"/><circle cx="12" cy="12" r="4" stroke={color || "#111"} strokeWidth="1.8" fill="none"/><circle cx="17" cy="7" r="1" fill={color || "#111"}/></g>,
    yt:     <g><rect x="3" y="6" width="18" height="12" rx="3" fill={color || "#111"}/><polygon points="11,9 16,12 11,15" fill="#fff"/></g>,
    x:      <g><path d="M5 4l14 16M19 4L5 20" stroke={color || "#111"} strokeWidth="1.8"/></g>,
    fb:     <g><path d="M14 21v-7h2.5l.5-3H14V9c0-1 .3-1.5 1.5-1.5H17V4.5c-.3 0-1.4-.1-2.5-.1-2.5 0-4 1.5-4 4V11H8v3h2.5v7z" fill={color || "#111"}/></g>,
    snap:   <g><circle cx="12" cy="12" r="9" fill={color || "#FFFC00"}/><circle cx="12" cy="12" r="6" fill={color || "#111"} opacity=".15"/></g>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>{g[name] || g.tiktok}</svg>;
};

window.Icon = Icon;
window.Brand = Brand;
