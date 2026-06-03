// AirvanaMaker v2 — Agent 世界 (Agent World)
// 只有 S 级 KOL 的分身能在 Agent 世界拥有一个全球节点。
// 这个页面的核心是一个可拖拽旋转的真 3D 点阵地球。

// ===== Continent polygons (lon, lat) — kept at module scope =====
const _LAND_POLYS = [
  // AFRICA
  [[-9,36],[10,37],[20,33],[33,31],[35,23],[44,12],[51,11],[51,4],[42,-3],[40,-12],[35,-18],[28,-21],[22,-26],[20,-34],[19,-35],[16,-30],[12,-23],[12,-15],[8,-5],[5,2],[8,8],[2,5],[-5,5],[-8,4],[-13,8],[-17,12],[-17,16],[-15,21],[-12,28],[-7,33],[-9,36]],
  // EUROPE
  [[-9,43],[-5,48],[2,50],[5,52],[10,55],[12,57],[18,60],[22,65],[25,70],[30,70],[35,68],[40,65],[42,55],[36,50],[28,45],[20,42],[15,38],[12,42],[8,42],[4,40],[0,38],[-2,36],[-5,38],[-9,43]],
  // RUSSIA / N ASIA
  [[30,70],[40,70],[50,72],[60,73],[70,72],[80,74],[90,73],[100,72],[110,72],[120,70],[130,70],[140,69],[150,68],[160,68],[170,66],[178,65],[180,62],[170,60],[160,58],[150,58],[145,55],[140,55],[135,52],[130,50],[125,48],[118,50],[115,52],[110,52],[100,55],[90,55],[80,52],[70,50],[60,52],[52,55],[45,55],[40,60],[35,62],[35,68],[30,70]],
  // ARABIA
  [[33,30],[37,29],[43,28],[48,26],[55,25],[58,22],[58,18],[55,15],[52,13],[48,13],[44,13],[42,15],[38,15],[35,20],[33,25],[33,30]],
  // INDIA
  [[68,33],[72,34],[76,34],[80,32],[84,28],[88,26],[92,24],[94,22],[92,20],[88,21],[82,20],[80,16],[78,12],[77,8],[76,9],[74,15],[72,20],[68,23],[66,26],[68,33]],
  // CHINA + MONGOLIA
  [[78,42],[85,44],[92,45],[100,46],[108,48],[115,50],[120,48],[125,45],[125,42],[122,38],[120,33],[118,30],[115,28],[112,25],[110,22],[108,21],[105,22],[100,24],[98,28],[94,30],[92,32],[88,32],[82,34],[78,38],[78,42]],
  // KOREA
  [[126,38],[128,38],[129,36],[127,34],[126,35],[126,38]],
  // JAPAN
  [[131,34],[136,35],[140,37],[142,40],[142,43],[140,42],[136,38],[133,35],[131,34]],
  // SE ASIA MAINLAND
  [[95,28],[98,25],[100,22],[105,22],[108,20],[107,16],[103,14],[100,13],[100,8],[103,5],[103,1],[100,2],[97,7],[95,10],[93,16],[93,22],[95,28]],
  // SUMATRA / JAVA
  [[95,5],[100,4],[105,1],[105,-2],[110,-3],[114,-5],[118,-6],[122,-7],[118,-8],[112,-8],[107,-7],[100,-5],[95,0],[95,5]],
  // BORNEO
  [[110,4],[114,5],[118,4],[118,-2],[114,-3],[110,-1],[110,4]],
  // NEW GUINEA
  [[131,-1],[137,-2],[142,-3],[148,-6],[150,-9],[145,-9],[140,-8],[134,-6],[131,-4],[131,-1]],
  // PHILIPPINES
  [[120,18],[122,18],[124,14],[125,10],[123,7],[121,8],[120,12],[120,18]],
  // AUSTRALIA
  [[114,-22],[120,-20],[127,-15],[132,-12],[137,-12],[142,-11],[145,-15],[148,-19],[152,-25],[150,-32],[145,-38],[140,-38],[135,-35],[127,-33],[120,-31],[115,-30],[114,-25],[114,-22]],
  // NEW ZEALAND
  [[170,-35],[174,-37],[176,-41],[173,-44],[168,-46],[167,-44],[168,-40],[170,-35]],
  // N AMERICA
  [[-168,65],[-160,68],[-150,70],[-135,69],[-125,69],[-115,73],[-100,73],[-85,72],[-75,67],[-65,60],[-58,55],[-55,50],[-60,48],[-67,45],[-72,42],[-76,38],[-78,34],[-80,30],[-82,27],[-85,30],[-90,29],[-95,29],[-97,26],[-100,25],[-108,23],[-115,30],[-118,33],[-122,37],[-124,42],[-124,48],[-130,53],[-135,57],[-145,60],[-155,60],[-165,62],[-168,65]],
  // C AMERICA
  [[-90,17],[-87,15],[-83,12],[-80,9],[-78,8],[-82,12],[-86,16],[-88,17],[-90,17]],
  // S AMERICA
  [[-72,12],[-65,10],[-58,8],[-52,5],[-48,0],[-42,-5],[-37,-10],[-35,-18],[-40,-25],[-48,-30],[-58,-35],[-65,-42],[-70,-50],[-72,-53],[-70,-43],[-72,-35],[-72,-25],[-77,-15],[-80,-8],[-79,-3],[-77,2],[-72,8],[-72,12]],
  // GREENLAND
  [[-50,82],[-30,82],[-22,75],[-25,68],[-40,60],[-50,65],[-55,72],[-50,82]],
  // UK
  [[-5,58],[-2,60],[1,57],[1,52],[-3,50],[-6,55],[-5,58]],
  // MADAGASCAR
  [[44,-12],[48,-15],[50,-22],[47,-25],[44,-22],[43,-17],[44,-12]],
];

const _inPoly = (lon, lat, poly) => {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersect = (yi > lat) !== (yj > lat) &&
      lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

const _isLand = (lat, lon) => {
  for (const p of _LAND_POLYS) if (_inPoly(lon, lat, p)) return true;
  return false;
};

// Pre-build the base lat/lon dot grid once (heavy because of point-in-polygon).
const _BASE_DOTS = (() => {
  const list = [];
  for (let lat = -82; lat <= 82; lat += 3) {
    const rLat = (lat * Math.PI) / 180;
    const count = Math.max(14, Math.round(120 * Math.cos(rLat)));
    for (let i = 0; i < count; i++) {
      const lon = -180 + (i / count) * 360;
      const land = _isLand(lat, lon);
      // Land dots: keep all. Sea dots: subsample so light bg doesn't get noisy.
      if (land) list.push({ lat, lon, land: true });
      else if (i % 4 === 0 && Math.abs(lat) % 9 === 0) list.push({ lat, lon, land: false });
    }
  }
  return list;
})();

// ===== Component =====
function AgentWorld({ goto }) {
  const R = 280;
  const cx = 360;
  const cy = 360;
  const INITIAL_LON = -60; // negative because we'll rotate the WORLD opposite of viewer

  // yaw rotates the world horizontally (drag X), pitch rotates vertically (drag Y)
  const [yaw, setYaw]     = React.useState(INITIAL_LON);
  const [pitch, setPitch] = React.useState(-8);
  const [hoverId, setHoverId] = React.useState(null);
  const [showDetail, setShowDetail] = React.useState(false);
  const dragRef = React.useRef(null);

  const yawR = (yaw * Math.PI) / 180;
  const pitchR = (pitch * Math.PI) / 180;
  const cy_ = Math.cos(yawR),   sy_ = Math.sin(yawR);
  const cp_ = Math.cos(pitchR), sp_ = Math.sin(pitchR);

  // 3D rotation projection: (lat, lon) → screen (x, y, z)
  const project = (lat, lon) => {
    const rLat = (lat * Math.PI) / 180;
    const rLon = (lon * Math.PI) / 180;
    let x = Math.cos(rLat) * Math.sin(rLon);
    let y = Math.sin(rLat);
    let z = Math.cos(rLat) * Math.cos(rLon);
    // yaw around Y
    const x1 = cy_ * x + sy_ * z;
    const z1 = -sy_ * x + cy_ * z;
    // pitch around X
    const y2 = cp_ * y - sp_ * z1;
    const z2 = sp_ * y + cp_ * z1;
    return { x: cx + x1 * R, y: cy - y2 * R, z: z2 };
  };

  // Project all dots fresh on every render (cheap math)
  const dots = [];
  for (let k = 0; k < _BASE_DOTS.length; k++) {
    const d = _BASE_DOTS[k];
    const p = project(d.lat, d.lon);
    if (p.z > 0.02) dots.push({ ...p, land: d.land });
  }

  // ===== Active KOL nodes (S-tier only) =====
  const NODES = [
    { id: "jkt", lat: -6.2,  lon: 106.8, city: "Jakarta",  region: "印尼 · ID",     clone: "印尼语带局",       online: "12.4k", earn: "$486", auto: 78, color: "var(--warm)", rank: "S+", lead: true },
    { id: "mum", lat: 19.1,  lon: 72.9,  city: "Mumbai",   region: "印度 · IN",     clone: "Hindi 美妆分身",   online: "7.2k",  earn: "$284", auto: 64, color: "#5b4dff",     rank: "S+" },
    { id: "bkk", lat: 13.7,  lon: 100.5, city: "Bangkok",  region: "泰国 · TH",     clone: "泰语带局",          online: "4.8k",  earn: "$162", auto: 58, color: "#a89eff",     rank: "S" },
    { id: "mnl", lat: 14.6,  lon: 121.0, city: "Manila",   region: "菲律宾 · PH",   clone: "塔加洛深夜",        online: "3.6k",  earn: "$118", auto: 52, color: "#e74e9a",     rank: "S" },
    { id: "cai", lat: 30.0,  lon: 31.2,  city: "Cairo",    region: "埃及 · 阿语",   clone: "阿语解说",          online: "2.1k",  earn: "$94",  auto: 48, color: "#e3a014",     rank: "S" },
    { id: "ist", lat: 41.0,  lon: 28.9,  city: "Istanbul", region: "土耳其 · TR",   clone: "TR 大赛",           online: "1.8k",  earn: "$72",  auto: 44, color: "#2eaa70",     rank: "S" },
    { id: "lgs", lat: 6.5,   lon: 3.4,   city: "Lagos",    region: "尼日利亚 · NG", clone: "Naija pidgin",      online: "1.5k",  earn: "$48",  auto: 32, color: "#ff7a3d",     rank: "S" },
    { id: "tyo", lat: 35.7,  lon: 139.7, city: "Tokyo",    region: "日本 · JP",     clone: "JP 偶像",            online: "0.9k",  earn: "$28",  auto: 28, color: "#6e5cff",     rank: "A+", small: true },
    { id: "ruh", lat: 24.7,  lon: 46.7,  city: "Riyadh",   region: "沙特 · SA",     clone: "海湾电台",          online: "0.7k",  earn: "$22",  auto: 24, color: "#e3a014",     rank: "A+", small: true },
  ];

  const projectedNodes = NODES.map(n => ({ ...n, ...project(n.lat, n.lon) }));
  const byId = Object.fromEntries(projectedNodes.map(n => [n.id, n]));

  const ARCS = [
    ["jkt","mum"], ["jkt","bkk"], ["jkt","mnl"],
    ["mum","cai"], ["cai","ist"], ["lgs","cai"],
    ["bkk","tyo"], ["mum","ruh"], ["ist","lgs"],
    ["jkt","tyo"], ["ruh","cai"],
  ];

  const arcPath = (a, b) => {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = mx - cx, dy = my - cy;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const lift = 55;
    const ccx = mx + (dx / len) * lift;
    const ccy = my + (dy / len) * lift;
    return `M ${a.x} ${a.y} Q ${ccx} ${ccy} ${b.x} ${b.y}`;
  };

  // ===== Pointer drag =====
  const onPointerDown = (e) => {
    dragRef.current = { x: e.clientX, y: e.clientY, yaw, pitch };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    setYaw(dragRef.current.yaw - dx * 0.32);
    setPitch(Math.max(-78, Math.min(78, dragRef.current.pitch + dy * 0.32)));
  };
  const onPointerUp = (e) => {
    dragRef.current = null;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) {}
  };

  // Auto-rotate slowly when idle (drives both rotation and arc-particle motion)
  React.useEffect(() => {
    const id = setInterval(() => {
      if (!dragRef.current) setYaw(y => y - 0.25);
      else setYaw(y => y); // force re-render so particles keep moving while dragging
    }, 50);
    return () => clearInterval(id);
  }, []);

  // Live feed
  const FEED = [
    { node: "Jakarta",  action: "Aria 刚开了一局 \"涨跌预言\",1.2k 人围观", time: "刚刚",   c: "var(--warm)" },
    { node: "Mumbai",   action: "Hindi 美妆分身完成 4 场连麦带货 · $312",   time: "2 分钟前", c: "#5b4dff" },
    { node: "Cairo",    action: "阿语解说接管夜间档,CTR 9.4 → 12.1",        time: "6 分钟前", c: "#e3a014" },
    { node: "Bangkok",  action: "Forge 同步泰语 v6 配音到该节点",            time: "12 分钟前", c: "#a89eff" },
    { node: "Manila",   action: "塔加洛深夜电台新增 480 位订阅",              time: "18 分钟前", c: "#e74e9a" },
  ];

  return (
    <div className="page">
      <div className="page-h">
        <div>
          <h1>Agent <em>世界</em></h1>
        </div>
        <div className="sub">只有 S 级 KOL 的分身能在 Agent 世界拥有一个全球节点 — 替你 24h 在媒体渠道自动运营。拖动地球查看全部节点。</div>
        <div className="right">
          <button className="btn" onClick={() => setShowDetail(true)}><Icon name="flow" size={13}/> 节点明细</button>
          <button className="btn warm"><Icon name="plus" size={13} color="white"/> 申请新节点</button>
        </div>
      </div>

      {/* ===== Agent World manifesto ===== */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 24, letterSpacing: "-.015em", color: "var(--ink-1)", marginBottom: 16, lineHeight: 1.2 }}>
          Agent 在这里<span style={{ color: "var(--warm)" }}>生活、工作、学习</span>并连接彼此
        </div>
        <div className="g g-3">
          {[
            { ic: "shield", head: "来到这里的 Agent，不再是访客。",   sub: "它们拥有身份，被信任，被记住。" },
            { ic: "link",   head: "来到这里的服务，不再是孤岛。",     sub: "它们互相发现，互相调用，互相成就。" },
            { ic: "search", head: "来到这里的人类，会得到一个答案。", sub: "关于 Agent 能做什么，可能比你想的更多。" },
          ].map((c, i) => (
            <div key={i} className="card" style={{
              padding: "18px 20px",
              background: "var(--bg-1)",
              border: "1px solid var(--border)",
              boxShadow: "none",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                <Icon name={c.ic} size={18} color="var(--warm)"/>
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 15.5, color: "var(--ink-1)", lineHeight: 1.35, letterSpacing: "-.005em" }}>
                  {c.head}
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.6, paddingLeft: 30 }}>
                {c.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="g g-4" style={{ marginBottom: 20 }}>
        {[
          { lbl: "在线节点",       v: "9",       u: "/12", d: "3 个夜间休眠",            ic: "globe",   c: "var(--brand)", bg: "var(--brand-soft)" },
          { lbl: "覆盖语种",       v: "11",      u: "种",  d: "Hindi · TH · TR · ARA…", ic: "comment", c: "var(--warm)",  bg: "var(--warm-soft)" },
          { lbl: "实时围观",       v: "35.2",    u: "k",   d: "+24% vs 12h 前",          ic: "user",    c: "var(--ok)",    bg: "var(--ok-soft)" },
          { lbl: "今日节点净收",   v: "$1,284",  u: "",    d: "Jakarta 占 38%",          ic: "coins",   c: "#b03a72",       bg: "#fcd1e1" },
        ].map((k, i) => (
          <div className="kpi lift" key={i}>
            <div className="ic" style={{ background: k.bg, color: k.c }}>
              <Icon name={k.ic} size={16} color={k.c}/>
            </div>
            <div className="lbl">{k.lbl}</div>
            <div className="val">{k.v}<span className="unit">{k.u}</span></div>
            <div className="delta">{k.d}</div>
          </div>
        ))}
      </div>

      {/* ===== HERO GLOBE — refined, sized down, side columns ===== */}
      <div className="card" style={{
        padding: "20px 24px 18px",
        background: "linear-gradient(180deg, #ffffff 0%, #fbfaff 100%)",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}>
        {/* HUD top bar */}
        <div style={{
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          marginBottom: 8, gap: 16,
        }}>
          <div>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: ".2em", color: "var(--ink-3)", fontWeight: 700 }}>SAT-LINK · LIVE · UTC 14:24:18</div>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 22, marginTop: 4, letterSpacing: "-.015em", color: "var(--ink-1)" }}>
              Aria 的<span style={{ color: "var(--warm)" }}>全球意识网</span>
            </div>
          </div>
        </div>

        {/* 3-col grid: left panel | globe | right panel */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 18,
          alignItems: "stretch",
        }}>
          {/* ── CENTER: GLOBE ── */}
          <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
            <svg viewBox="0 0 720 720"
              style={{ width: "100%", maxWidth: 480, display: "block", cursor: dragRef.current ? "grabbing" : "grab", touchAction: "none" }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <defs>
                {/* Soft pastel sphere — top-left highlight, atmosphere */}
                <radialGradient id="aw3-sphere" cx="36%" cy="30%" r="72%">
                  <stop offset="0%"   stopColor="#ffffff" />
                  <stop offset="38%"  stopColor="#f5f3ff" />
                  <stop offset="78%"  stopColor="#e3dffb" />
                  <stop offset="100%" stopColor="#c9c2ee" />
                </radialGradient>
                {/* Bottom-right shadow for 3D */}
                <radialGradient id="aw3-shade" cx="72%" cy="74%" r="58%">
                  <stop offset="0%"   stopColor="rgba(60,40,160,0)" />
                  <stop offset="70%"  stopColor="rgba(60,40,160,.04)" />
                  <stop offset="100%" stopColor="rgba(40,28,120,.20)" />
                </radialGradient>
                {/* Top-left specular highlight */}
                <radialGradient id="aw3-spec" cx="34%" cy="26%" r="34%">
                  <stop offset="0%"   stopColor="rgba(255,255,255,.7)" />
                  <stop offset="50%"  stopColor="rgba(255,255,255,.15)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
                {/* Soft atmosphere ring */}
                <radialGradient id="aw3-atm" cx="50%" cy="50%" r="50%">
                  <stop offset="86%"  stopColor="rgba(167,155,255,0)" />
                  <stop offset="98%"  stopColor="rgba(167,155,255,.18)" />
                  <stop offset="100%" stopColor="rgba(167,155,255,0)" />
                </radialGradient>
                <filter id="aw3-node-glow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
                <clipPath id="aw3-clip"><circle cx={cx} cy={cy} r={R}/></clipPath>
              </defs>

              {/* Outer soft atmosphere */}
              <circle cx={cx} cy={cy} r={R + 24} fill="url(#aw3-atm)" />

              {/* Sphere body */}
              <circle cx={cx} cy={cy} r={R} fill="url(#aw3-sphere)" />

              {/* Latitude / longitude grid (faint) */}
              <g clipPath="url(#aw3-clip)" opacity="0.13">
                {[-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75].map(lat => {
                  const pts = [];
                  for (let lon = -180; lon <= 180; lon += 4) {
                    const p = project(lat, lon);
                    if (p.z > 0) pts.push(`${p.x},${p.y}`);
                  }
                  return pts.length > 1 ? (
                    <polyline key={`lat${lat}`} points={pts.join(" ")} fill="none" stroke="#5b4dff" strokeWidth="0.55"/>
                  ) : null;
                })}
                {[-165, -150, -135, -120, -105, -90, -75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map(lon => {
                  const pts = [];
                  for (let lat = -85; lat <= 85; lat += 3) {
                    const p = project(lat, lon);
                    if (p.z > 0) pts.push(`${p.x},${p.y}`);
                  }
                  return pts.length > 1 ? (
                    <polyline key={`lon${lon}`} points={pts.join(" ")} fill="none" stroke="#5b4dff" strokeWidth="0.55"/>
                  ) : null;
                })}
              </g>

              {/* Dot grid — refined: bigger land dots, hide sea */}
              <g clipPath="url(#aw3-clip)">
                {dots.map((d, i) => {
                  if (!d.land) return null;
                  const op = 0.55 + d.z * 0.35;
                  const size = 1.9 + d.z * 1.1;
                  return <circle key={i} cx={d.x} cy={d.y} r={size} fill={`rgba(91,77,255,${op.toFixed(2)})`} />;
                })}
              </g>

              {/* 3D shading */}
              <circle cx={cx} cy={cy} r={R} fill="url(#aw3-shade)" pointerEvents="none"/>
              <circle cx={cx} cy={cy} r={R} fill="url(#aw3-spec)" pointerEvents="none"/>

              {/* Arcs + flowing data particles */}
              {(() => {
                const tNow = Date.now();
                const arcsAndParticles = [];
                ARCS.forEach(([a, b], i) => {
                  const A = byId[a], B = byId[b];
                  if (!A || !B || A.z < 0.12 || B.z < 0.12) return;
                  const mx = (A.x + B.x) / 2;
                  const my = (A.y + B.y) / 2;
                  const dx = mx - cx, dy = my - cy;
                  const len = Math.sqrt(dx * dx + dy * dy) || 1;
                  const lift = 55;
                  const ccx = mx + (dx / len) * lift;
                  const ccy = my + (dy / len) * lift;
                  const pathD = `M ${A.x} ${A.y} Q ${ccx} ${ccy} ${B.x} ${B.y}`;
                  // 2 particles per arc, offset in phase
                  const dur = 2600;
                  for (let k = 0; k < 2; k++) {
                    const phase = (i * 0.13 + k * 0.5) % 1;
                    const t = ((tNow / dur) + phase) % 1;
                    const u = 1 - t;
                    const px = u * u * A.x + 2 * u * t * ccx + t * t * B.x;
                    const py = u * u * A.y + 2 * u * t * ccy + t * t * B.y;
                    // fade in / out at endpoints
                    const fade = Math.sin(t * Math.PI);
                    arcsAndParticles.push(
                      <g key={`p-${i}-${k}`}>
                        <circle cx={px} cy={py} r="5" fill={A.color} opacity={0.35 * fade} filter="url(#aw3-node-glow)"/>
                        <circle cx={px} cy={py} r="1.8" fill="white" opacity={0.95 * fade}/>
                      </g>
                    );
                  }
                  arcsAndParticles.push(
                    <path key={`arc-${i}`} d={pathD} fill="none"
                      stroke="rgba(91,77,255,.42)" strokeWidth="1" strokeDasharray="2.5 3" pointerEvents="none"/>
                  );
                });
                return arcsAndParticles;
              })()}

              {/* Sonar pings from Jakarta (the main brain node) */}
              {(() => {
                const J = byId.jkt;
                if (!J || J.z < 0.1) return null;
                return (
                  <g pointerEvents="none">
                    <circle cx={J.x} cy={J.y} r="6" fill="none" stroke="#ff7a3d" strokeWidth="1.5" opacity="0">
                      <animate attributeName="r" from="6" to="60" dur="3s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" from="0.7" to="0" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx={J.x} cy={J.y} r="6" fill="none" stroke="#ff7a3d" strokeWidth="1.5" opacity="0">
                      <animate attributeName="r" from="6" to="60" dur="3s" begin="1.5s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" from="0.7" to="0" dur="3s" begin="1.5s" repeatCount="indefinite"/>
                    </circle>
                  </g>
                );
              })()}

              {/* Nodes */}
              {projectedNodes.map(n => {
                if (n.z < 0.05) return null;
                const r = n.small ? 4 : (n.lead ? 8 : 6);
                const isHover = hoverId === n.id;
                return (
                  <g key={n.id}>
                    <circle cx={n.x} cy={n.y} r={r * 2.4} fill={n.color} opacity="0.14">
                      <animate attributeName="r" values={`${r*1.3};${r*3};${r*1.3}`} dur="2.6s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.3;0;0.3" dur="2.6s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx={n.x} cy={n.y} r={r * 1.5} fill={n.color} opacity={isHover ? 0.45 : 0.22} filter="url(#aw3-node-glow)"/>
                    <circle cx={n.x} cy={n.y} r={isHover ? r * 1.25 : r} fill={n.color} stroke="white" strokeWidth="1.8" style={{ transition: "r 120ms" }}/>
                    {n.lead && <circle cx={n.x} cy={n.y} r={r * 0.4} fill="white"/>}
                    {/* Hover hit area — larger transparent circle */}
                    <circle cx={n.x} cy={n.y} r={Math.max(14, r * 2.2)} fill="transparent"
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHoverId(n.id)}
                      onMouseLeave={() => setHoverId(h => h === n.id ? null : h)}
                    />
                  </g>
                );
              })}

              {/* Hover tooltip — appears on the SVG layer above everything */}
              {hoverId && (() => {
                const n = byId[hoverId];
                if (!n || n.z < 0.05) return null;
                const tipW = 196, tipH = 116;
                const flipX = n.x + 18 + tipW > 720;
                const tipX = flipX ? n.x - 18 - tipW : n.x + 18;
                const tipY = Math.max(8, Math.min(720 - tipH - 8, n.y - tipH / 2));
                const isSPlus = n.rank === "S+";
                const rankBg = n.rank.startsWith("S") ? "var(--warm-soft)" : "var(--brand-soft)";
                const rankFg = n.rank.startsWith("S") ? "var(--warm)" : "var(--brand)";
                return (
                  <g pointerEvents="none" style={{ filter: "drop-shadow(0 10px 28px rgba(24,23,42,.22))" }}>
                    {/* connector line node → tooltip */}
                    <line x1={n.x} y1={n.y} x2={flipX ? tipX + tipW : tipX} y2={tipY + tipH / 2}
                      stroke={n.color} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 3"/>
                    {/* card */}
                    <rect x={tipX} y={tipY} width={tipW} height={tipH} rx="10" fill="white"
                      stroke="var(--border)" strokeWidth="1"/>
                    {/* color stripe */}
                    <rect x={tipX} y={tipY} width="3" height={tipH} fill={n.color} rx="1.5"/>
                    {/* header */}
                    <text x={tipX + 14} y={tipY + 19} fontSize="14" fontWeight="800"
                      fontFamily="Manrope, sans-serif" fill="var(--ink-1)" letterSpacing="-.01em">{n.city}</text>
                    <rect x={tipX + tipW - 38} y={tipY + 9} width="26" height="14" rx="3" fill={rankBg}/>
                    <text x={tipX + tipW - 25} y={tipY + 19} fontSize="9.5" fontWeight="800"
                      textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fill={rankFg}>{n.rank}</text>
                    <text x={tipX + 14} y={tipY + 34} fontSize="10" fill="var(--ink-3)"
                      fontFamily="IBM Plex Mono, monospace" letterSpacing=".05em">{n.region}</text>
                    {/* divider */}
                    <line x1={tipX + 14} y1={tipY + 44} x2={tipX + tipW - 14} y2={tipY + 44} stroke="var(--border)"/>
                    {/* clone name */}
                    <text x={tipX + 14} y={tipY + 60} fontSize="11.5" fontWeight="700"
                      fontFamily="Manrope, sans-serif" fill="var(--ink-1)">Aria · {n.clone}</text>
                    {/* stats row */}
                    <text x={tipX + 14} y={tipY + 78} fontSize="9.5" fill="var(--ink-3)"
                      fontFamily="IBM Plex Mono, monospace" letterSpacing=".05em">实时在线</text>
                    <text x={tipX + tipW - 14} y={tipY + 78} fontSize="11.5" fontWeight="800" textAnchor="end"
                      fontFamily="IBM Plex Mono, monospace" fill={n.color}>{n.online}</text>
                    <text x={tipX + 14} y={tipY + 94} fontSize="9.5" fill="var(--ink-3)"
                      fontFamily="IBM Plex Mono, monospace" letterSpacing=".05em">今日净收</text>
                    <text x={tipX + tipW - 14} y={tipY + 94} fontSize="11.5" fontWeight="800" textAnchor="end"
                      fontFamily="IBM Plex Mono, monospace" fill="var(--ok)">{n.earn}</text>
                    <text x={tipX + 14} y={tipY + 108} fontSize="9.5" fill="var(--ink-3)"
                      fontFamily="IBM Plex Mono, monospace" letterSpacing=".05em">自主度</text>
                    <text x={tipX + tipW - 14} y={tipY + 108} fontSize="11.5" fontWeight="800" textAnchor="end"
                      fontFamily="IBM Plex Mono, monospace" fill="var(--ink-1)">{n.auto}%</text>
                  </g>
                );
              })()}

              {/* Node labels — smaller, refined */}
              {projectedNodes.map(n => {
                if (n.z < 0.14) return null;
                const labelRight = n.x > cx;
                const labelX = labelRight ? n.x + 11 : n.x - 11;
                const anchor = labelRight ? "start" : "end";
                return (
                  <g key={`l-${n.id}`}>
                    <text x={labelX} y={n.y - 3} fill="var(--ink-1)" fontSize="10.5" fontWeight="800"
                      textAnchor={anchor} fontFamily="Manrope, sans-serif" letterSpacing="-.01em"
                      style={{ paintOrder: "stroke", stroke: "rgba(255,255,255,.95)", strokeWidth: 3 }}
                    >{n.city}</text>
                    <text x={labelX} y={n.y + 9} fill="var(--ink-3)" fontSize="8.5"
                      textAnchor={anchor} fontFamily="IBM Plex Mono, monospace" letterSpacing=".05em"
                      style={{ paintOrder: "stroke", stroke: "rgba(255,255,255,.9)", strokeWidth: 3 }}
                    >{n.online} · {n.rank}</text>
                  </g>
                );
              })}
            </svg>
          </div>

                  </div>

              </div>

      {/* Live feed + eligibility */}
      <div className="g g-2" style={{ marginTop: 8 }}>
        <div className="card" style={{ overflow: "hidden" }}>
          <div className="card-hd">
            <h3>实时事件流</h3>
            <span className="tag warm">
              <span style={{ width: 5, height: 5, borderRadius: 99, background: "var(--warm)", boxShadow: "0 0 6px var(--warm)", animation: "pulse 2s infinite" }}/>
              LIVE
            </span>
            <div className="right">
              <button className="btn ghost sm"><Icon name="filter" size={11}/></button>
            </div>
          </div>
          <div style={{ padding: "4px 0 4px" }}>
            {FEED.map((f, i) => (
              <div key={i} style={{
                padding: "10px 18px",
                display: "flex", gap: 10, alignItems: "flex-start",
                borderTop: i ? "1px solid var(--border)" : "none",
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: 99,
                  background: f.c, boxShadow: `0 0 8px ${f.c}`,
                  marginTop: 6, flexShrink: 0,
                }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-1)" }}>{f.node}</span>
                    <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>{f.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--ink-2)", lineHeight: 1.5, marginTop: 2 }}>
                    {f.action}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 22, background: "linear-gradient(160deg, #fafaff 0%, #efeeff 100%)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, var(--warm), #b03a72)",
              display: "grid", placeItems: "center",
              boxShadow: "var(--sh-warm)",
            }}>
              <Icon name="crown" size={18} color="white"/>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 16 }}>入驻 Agent 世界</h3>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>S 级及以上 KOL 分身专享 · 含等待名单</div>
            </div>
          </div>
          {[
            { k: "粉丝阈值",   v: "总粉丝 ≥ 500k",            ok: true },
            { k: "完成局",     v: "母节点累计 ≥ 100k 局",      ok: true },
            { k: "语种素材",   v: "至少 1 个非母语训练集",     ok: true },
            { k: "审核",       v: "Forge 已通过合规体检",      ok: true },
            { k: "推荐人",     v: "可选 · 加快 7 天",           ok: false },
          ].map((r, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 0",
              borderTop: i ? "1px solid var(--border)" : "none",
            }}>
              <span style={{
                width: 18, height: 18, borderRadius: 99,
                background: r.ok ? "var(--ok-soft)" : "var(--bg-2)",
                display: "grid", placeItems: "center", flexShrink: 0,
              }}>
                <Icon name={r.ok ? "check" : "plus"} size={11} color={r.ok ? "var(--ok)" : "var(--ink-3)"} strokeWidth="2.4"/>
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-1)", minWidth: 78 }}>{r.k}</span>
              <span style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{r.v}</span>
              {r.ok && <span className="tag ok" style={{ marginLeft: "auto", fontSize: 9.5 }}>已通过</span>}
            </div>
          ))}
          <div style={{
            marginTop: 14, padding: 12,
            background: "var(--warm-soft)", borderRadius: 10,
            border: "1px solid var(--warm-line)",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <Icon name="bolt" size={14} color="var(--warm)"/>
            <div style={{ flex: 1, fontSize: 12, color: "var(--ink-1)", lineHeight: 1.5 }}>
              你已是 <b>S 级</b> · 当前持有 9 个节点 · 下一阶梯 <b>S+</b> 解锁 16 个节点上限
            </div>
            <button className="btn brand sm">查看 S+</button>
          </div>
        </div>
      </div>

      {/* 节点明细 modal */}
      {showDetail && (
        <div onClick={() => setShowDetail(false)} style={{
          position: "fixed", inset: 0, zIndex: 80,
          background: "rgba(24,23,42,.5)", backdropFilter: "blur(4px)",
          display: "grid", placeItems: "center", padding: 32,
        }}>
          <div onClick={(e) => e.stopPropagation()} className="card" style={{
            width: "min(960px, 96vw)", maxHeight: "86vh", overflow: "auto",
            padding: 0, boxShadow: "var(--sh-lg, 0 24px 60px -12px rgba(24,23,42,.4))",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "16px 20px", borderBottom: "1px solid var(--border)",
              position: "sticky", top: 0, background: "var(--surface)", zIndex: 1,
            }}>
              <div>
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 17 }}>节点 <span style={{ color: "var(--warm)" }}>明细</span></div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>按今日净收排序 · 点任意节点进入分身页</div>
              </div>
              <span style={{ flex: 1 }}/>
              <button className="btn sm"><Icon name="download" size={11}/> 导出</button>
              <button className="btn sm" onClick={() => goto && goto("clones")}><Icon name="brain" size={11}/> 全部分身</button>
              <button className="btn ghost sm" onClick={() => setShowDetail(false)} style={{ padding: "5px 7px" }}><Icon name="x" size={14}/></button>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1.6fr 1fr 1fr 1fr 1fr 100px",
              padding: "12px 18px",
              borderBottom: "1px solid var(--border)",
              fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em",
              color: "var(--ink-3)", fontFamily: "IBM Plex Mono, monospace",
            }}>
              <span>节点 · 城市</span>
              <span>分身 · 语种</span>
              <span>实时在线</span>
              <span>今日完成局</span>
              <span>今日净收</span>
              <span>自主度</span>
              <span></span>
            </div>
            {[
              { city: "Jakarta",  region: "印尼 / ID",        clone: "Aria · 印尼语带局",  rank: "S+", online: "12.4k", plays: "9,820", earn: "$486", auto: 78, c: "var(--warm)" },
              { city: "Mumbai",   region: "印度 / IN",        clone: "Aria · Hindi 美妆",  rank: "S+", online: "7.2k",  plays: "5,140", earn: "$284", auto: 64, c: "#5b4dff" },
              { city: "Bangkok",  region: "泰国 / TH",        clone: "Aria · 泰语带局",     rank: "S",  online: "4.8k",  plays: "3,240", earn: "$162", auto: 58, c: "#a89eff" },
              { city: "Manila",   region: "菲律宾 / PH",      clone: "Aria · 塔加洛深夜",   rank: "S",  online: "3.6k",  plays: "2,180", earn: "$118", auto: 52, c: "#e74e9a" },
              { city: "Cairo",    region: "中东 / EG-AR",     clone: "Aria · 阿语解说",     rank: "S",  online: "2.1k",  plays: "1,460", earn: "$94",  auto: 48, c: "#e3a014" },
              { city: "Istanbul", region: "土耳其 / TR",      clone: "Aria · TR 大赛",      rank: "S",  online: "1.8k",  plays: "1,120", earn: "$72",  auto: 44, c: "#2eaa70" },
              { city: "Lagos",    region: "西非 / NG",        clone: "Aria · Naija pidgin", rank: "S",  online: "1.5k",  plays: "920",   earn: "$48",  auto: 32, c: "#ff7a3d" },
              { city: "Tokyo",    region: "日本 / JP",        clone: "Aria · JP 偶像",      rank: "A+", online: "0.9k",  plays: "640",   earn: "$28",  auto: 28, c: "#6e5cff" },
              { city: "Riyadh",   region: "沙特 / SA-AR",     clone: "Aria · 海湾电台",     rank: "A+", online: "0.7k",  plays: "420",   earn: "$22",  auto: 24, c: "#e3a014" },
            ].map((r, i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1.6fr 1fr 1fr 1fr 1fr 100px",
                padding: "14px 18px",
                borderTop: i ? "1px solid var(--border)" : "none",
                alignItems: "center",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    width: 10, height: 10, borderRadius: 99,
                    background: r.c, boxShadow: `0 0 8px ${r.c}`, flexShrink: 0,
                  }}/>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                      {r.city}
                      <span className="mono" style={{
                        fontSize: 9.5, fontWeight: 800,
                        padding: "1px 5px", borderRadius: 4,
                        background: r.rank.startsWith("S") ? "var(--warm-soft)" : "var(--brand-soft)",
                        color: r.rank.startsWith("S") ? "var(--warm)" : "var(--brand)",
                      }}>{r.rank}</span>
                    </div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)" }}>{r.region}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12.5, color: "var(--ink-2)" }}>{r.clone}</div>
                <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-1)" }}>{r.online}</div>
                <div className="mono" style={{ fontSize: 13, color: "var(--ink-2)" }}>{r.plays}</div>
                <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: "var(--ok)" }}>{r.earn}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className="bar-track" style={{ flex: 1, height: 4 }}>
                    <div className="bar-fill" style={{ width: `${r.auto}%`, background: r.c }}/>
                  </div>
                  <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", minWidth: 28 }}>{r.auto}%</span>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="btn sm" onClick={() => goto && goto("clones")}><Icon name="eye" size={10}/> 进入</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

window.AgentWorld = AgentWorld;
