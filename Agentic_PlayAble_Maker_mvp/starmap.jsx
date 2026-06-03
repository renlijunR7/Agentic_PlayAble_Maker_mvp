// AirvanaMaker v2 — Star Map
// 跨平台传播星图：一处创建，七个宇宙同时点亮

// AirvanaMaker v2 — Star Map
// 跨平台传播星图：一处创建，七个宇宙同时点亮

// Platform metadata shared across views
const SM_PLATFORMS = [
  { id: "tt", name: "TikTok",      abbr: "TT", brandBg: "#000",        brandFg: "#fff", followers: "—",   share: "—",    impressions: 1280000, entered: 384000, completed: 248000, shared: 44200, revenue: 1284, status: "hot",  ctr: 30.0 },
  { id: "tg", name: "Telegram",    abbr: "TG", brandBg: "#2ca5e0",                       followers: "284K", share: "0.24", impressions: 580000,  entered: 168000, completed: 96400,  shared: 23200, revenue: 624,  status: "hot",  ctr: 28.9 },
  { id: "x",  name: "X / Twitter", abbr: "X",  brandBg: "#000",        brandFg: "#fff", followers: "192K", share: "0.31", impressions: 420000,  entered: 96000,  completed: 52400,  shared: 16200, revenue: 412,  status: "hot",  ctr: 22.8 },
  { id: "ig", name: "Instagram",   abbr: "IG", brandBg: "linear-gradient(135deg,#f9ce34 0%,#ee2a7b 50%,#6228d7 100%)", followers: "148K", share: "0.18", impressions: 320000, entered: 64000,  completed: 28400,  shared: 5120,  revenue: 248, status: "ok",   ctr: 20.0 },
  { id: "sn", name: "Snapchat",    abbr: "SN", brandBg: "#FFFC00",     brandFg: "#000", followers: "86K",  share: "0.42", impressions: 180000,  entered: 32400,  completed: 14800,  shared: 6216,  revenue: 142,  status: "warn", ctr: 18.0 },
  { id: "rd", name: "Reddit",      abbr: "RD", brandBg: "#FF4500",                      followers: "54K",  share: "0.09", impressions: 120000,  entered: 14400,  completed: 5800,   shared: 522,   revenue: 64,   status: "warn", ctr: 12.0 },
  { id: "yt", name: "YouTube",     abbr: "YT", brandBg: "#FF0000",                      followers: "22K",  share: "0.06", impressions: 48000,   entered: 4800,   completed: 1640,   shared: 98,    revenue: 22,   status: "ok",   ctr: 10.0 },
];

const SM_STATUS = {
  ok:   { c: "var(--ok)",   l: "已连通" },
  warn: { c: "var(--warn)", l: "需关注" },
  off:  { c: "var(--ink-4)",l: "未连接" },
  hot:  { c: "var(--warm)", l: "热点中" },
};

/* ────────────────────────────────────────
   TABLE VIEW — 表格列表
   ──────────────────────────────────────── */
function StarMapTable() {
  const [sortBy, setSortBy] = React.useState("completed");
  const [dir, setDir] = React.useState("desc");

  const sorted = [...SM_PLATFORMS].sort((a, b) => {
    const av = a[sortBy], bv = b[sortBy];
    if (typeof av === "number" && typeof bv === "number") return dir === "desc" ? bv - av : av - bv;
    return dir === "desc" ? String(bv).localeCompare(String(av)) : String(av).localeCompare(String(bv));
  });

  const totalImpr = SM_PLATFORMS.reduce((s, p) => s + p.impressions, 0);
  const totalComp = SM_PLATFORMS.reduce((s, p) => s + p.completed, 0);
  const totalShar = SM_PLATFORMS.reduce((s, p) => s + p.shared, 0);
  const totalRev  = SM_PLATFORMS.reduce((s, p) => s + p.revenue, 0);

  const fmt = (n) => n.toLocaleString();

  const SortH = ({ k, children, align = "right" }) => (
    <th
      onClick={() => { if (sortBy === k) setDir(d => d === "desc" ? "asc" : "desc"); else { setSortBy(k); setDir("desc"); } }}
      style={{
        textAlign: align, padding: "10px 14px",
        fontFamily: "IBM Plex Mono, monospace",
        fontSize: 10.5, letterSpacing: ".08em",
        color: sortBy === k ? "var(--ink-1)" : "var(--ink-3)",
        fontWeight: 700, cursor: "default",
        userSelect: "none",
      }}
    >
      {children}{sortBy === k && <span style={{ marginLeft: 4, color: "var(--brand)" }}>{dir === "desc" ? "↓" : "↑"}</span>}
    </th>
  );

  return (
    <div style={{
      background: "var(--surface)",
      borderRadius: 16,
      border: "1px solid var(--border)",
      overflow: "hidden",
    }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "var(--bg-1, #fafaff)", borderBottom: "1px solid var(--border)" }}>
            <th style={{ textAlign: "left", padding: "10px 18px", fontFamily: "IBM Plex Mono, monospace", fontSize: 10.5, letterSpacing: ".08em", color: "var(--ink-3)", fontWeight: 700 }}>平台</th>
            <th style={{ textAlign: "left", padding: "10px 14px", fontFamily: "IBM Plex Mono, monospace", fontSize: 10.5, letterSpacing: ".08em", color: "var(--ink-3)", fontWeight: 700 }}>状态</th>
            <SortH k="impressions">曝光</SortH>
            <SortH k="completed">完成局</SortH>
            <SortH k="shared">分享数</SortH>
            <SortH k="ctr">CTR</SortH>
            <SortH k="revenue">净收益</SortH>
            <th style={{ padding: "10px 18px", width: 1 }}/>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p, i) => (
            <tr key={p.id} style={{ borderBottom: i < sorted.length - 1 ? "1px solid var(--border)" : "none", transition: "background .12s" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-1, #fafaff)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <td style={{ padding: "14px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: p.brandBg, color: p.brandFg || "white",
                    display: "grid", placeItems: "center",
                    fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 12,
                  }}>{p.abbr}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--ink-1)", fontSize: 13.5 }}>{p.name}</div>
                    <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 1 }}>{p.followers} · share {p.share}</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: "14px" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  padding: "2px 9px", borderRadius: 99,
                  background: SM_STATUS[p.status].c === "var(--warm)" ? "var(--warm-soft)" : SM_STATUS[p.status].c === "var(--ok)" ? "var(--ok-soft)" : SM_STATUS[p.status].c === "var(--warn)" ? "var(--warn-soft)" : "var(--bg-2)",
                  color: SM_STATUS[p.status].c,
                  fontSize: 11, fontWeight: 700,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: 99, background: SM_STATUS[p.status].c, boxShadow: p.status === "hot" ? `0 0 6px ${SM_STATUS[p.status].c}` : "none" }}/>
                  {SM_STATUS[p.status].l}
                </span>
              </td>
              <td style={{ padding: "14px", textAlign: "right" }}>
                <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-1)" }}>{fmt(p.impressions)}</div>
                <div style={{ height: 3, background: "var(--bg-2)", borderRadius: 99, marginTop: 4, marginLeft: "auto", width: 60, overflow: "hidden" }}>
                  <div style={{ width: `${(p.impressions / totalImpr) * 100}%`, height: "100%", background: "var(--brand)", borderRadius: 99 }}/>
                </div>
              </td>
              <td className="mono" style={{ padding: "14px", textAlign: "right", fontSize: 13, fontWeight: 700, color: "var(--ink-1)" }}>{fmt(p.completed)}</td>
              <td className="mono" style={{ padding: "14px", textAlign: "right", fontSize: 13, fontWeight: 700, color: "var(--ink-1)" }}>{fmt(p.shared)}</td>
              <td className="mono" style={{ padding: "14px", textAlign: "right", fontSize: 13, fontWeight: 700, color: p.ctr >= 25 ? "var(--ok)" : p.ctr >= 15 ? "var(--ink-1)" : "var(--warn)" }}>{p.ctr.toFixed(1)}%</td>
              <td className="mono" style={{ padding: "14px", textAlign: "right", fontSize: 14, fontWeight: 800, color: "var(--warm)" }}>${fmt(p.revenue)}</td>
              <td style={{ padding: "14px 18px" }}>
                <button style={{
                  background: "transparent", border: "1px solid var(--border)",
                  color: "var(--ink-2)", padding: "5px 12px", borderRadius: 8,
                  fontSize: 11.5, fontWeight: 600, fontFamily: "inherit", cursor: "default",
                }}>详情</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ background: "var(--bg-1, #fafaff)", borderTop: "1px solid var(--border)" }}>
            <td colSpan="2" style={{ padding: "12px 18px", fontSize: 12.5, fontWeight: 700, color: "var(--ink-2)" }}>合计 <span style={{ color: "var(--ink-3)", fontWeight: 500, marginLeft: 4 }}>7 个平台</span></td>
            <td className="mono" style={{ padding: "12px 14px", textAlign: "right", fontSize: 13, fontWeight: 700, color: "var(--ink-1)" }}>{fmt(totalImpr)}</td>
            <td className="mono" style={{ padding: "12px 14px", textAlign: "right", fontSize: 13, fontWeight: 700, color: "var(--ink-1)" }}>{fmt(totalComp)}</td>
            <td className="mono" style={{ padding: "12px 14px", textAlign: "right", fontSize: 13, fontWeight: 700, color: "var(--ink-1)" }}>{fmt(totalShar)}</td>
            <td className="mono" style={{ padding: "12px 14px", textAlign: "right", fontSize: 13, fontWeight: 700, color: "var(--ink-3)" }}>—</td>
            <td className="mono" style={{ padding: "12px 14px", textAlign: "right", fontSize: 14, fontWeight: 800, color: "var(--warm)" }}>${fmt(totalRev)}</td>
            <td/>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

/* ────────────────────────────────────────
   FUNNEL VIEW — 传播漏斗
   ──────────────────────────────────────── */
function StarMapFunnel() {
  const stages = [
    { k: "impressions", l: "曝光",     c: "var(--brand)", g: "linear-gradient(90deg, #5b4dff 0%, #a89eff 100%)" },
    { k: "entered",     l: "进入",     c: "#7d6cff",      g: "linear-gradient(90deg, #6e5dff 0%, #a89eff 100%)" },
    { k: "completed",   l: "完成局",   c: "var(--warm)",  g: "linear-gradient(90deg, #ff7a3d 0%, #ffaa6c 100%)" },
    { k: "shared",      l: "分享",     c: "var(--ok)",    g: "linear-gradient(90deg, #2eaa70 0%, #7eff7c 100%)" },
  ];

  const totals = stages.map(s => SM_PLATFORMS.reduce((sum, p) => sum + p[s.k], 0));
  const maxTotal = totals[0];
  const fmt = (n) => n >= 10000 ? `${(n / 1000).toFixed(0)}K` : n.toLocaleString();

  // sort platforms by impressions for breakdown
  const topPlatforms = [...SM_PLATFORMS].sort((a, b) => b.impressions - a.impressions);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 18 }}>
      {/* LEFT: stacked funnel */}
      <div style={{ background: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)", padding: "24px 28px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <div>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 15 }}>传播漏斗 <span style={{ color: "var(--ink-3)", fontWeight: 500, fontSize: 12 }}>· 7 平台汇总</span></div>
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: ".08em", color: "var(--ink-3)", marginTop: 4 }}>过去 24 小时</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: ".08em", color: "var(--ink-3)", fontWeight: 700 }}>总转化率</div>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 22, color: "var(--warm)", letterSpacing: "-.01em" }}>
              {((totals[totals.length - 1] / totals[0]) * 100).toFixed(2)}<span style={{ fontSize: 13, color: "var(--ink-3)" }}>%</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {stages.map((s, i) => {
            const w = (totals[i] / maxTotal) * 100;
            const stepRate = i === 0 ? null : (totals[i] / totals[i - 1]) * 100;
            return (
              <div key={s.k}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="mono" style={{ fontSize: 10, fontWeight: 700, color: "var(--ink-4)", letterSpacing: ".06em" }}>0{i + 1}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-1)" }}>{s.l}</span>
                    {stepRate !== null && (
                      <span style={{
                        padding: "1px 7px", borderRadius: 6,
                        fontSize: 10.5, fontWeight: 700,
                        background: stepRate >= 40 ? "var(--ok-soft)" : stepRate >= 20 ? "var(--warm-soft)" : "var(--bad-soft)",
                        color:      stepRate >= 40 ? "var(--ok)"      : stepRate >= 20 ? "var(--warm)"      : "var(--bad)",
                        fontFamily: "IBM Plex Mono, monospace",
                      }}>↓ {stepRate.toFixed(1)}%</span>
                    )}
                  </div>
                  <div className="mono" style={{ fontSize: 14, fontWeight: 800, color: "var(--ink-1)" }}>{fmt(totals[i])}</div>
                </div>
                <div style={{ height: 30, background: "var(--bg-2)", borderRadius: 8, overflow: "hidden", position: "relative" }}>
                  <div style={{
                    width: `${w}%`, height: "100%",
                    background: s.g,
                    borderRadius: 8,
                    display: "flex", alignItems: "center",
                    paddingLeft: 10,
                    transition: "width .4s ease",
                  }}>
                    <span style={{ fontSize: 10.5, color: "white", fontWeight: 700, fontFamily: "IBM Plex Mono, monospace", letterSpacing: ".05em" }}>
                      {((totals[i] / totals[0]) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Forge insight */}
        <div style={{
          marginTop: 18,
          padding: "12px 14px",
          background: "var(--brand-soft)",
          border: "1px solid var(--brand-line)",
          borderRadius: 10,
          display: "flex", alignItems: "flex-start", gap: 10,
          fontSize: 12.5, lineHeight: 1.55, color: "var(--ink-2)",
        }}>
          <div style={{ width: 22, height: 22, borderRadius: 99, background: "linear-gradient(135deg, #a89eff, var(--brand))", color: "white", display: "grid", placeItems: "center", fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 11, flexShrink: 0 }}>朔</div>
          <div>
            <b style={{ color: "var(--brand)" }}>朔月洞察：</b>
            <b style={{ color: "var(--ink-1)" }}>进入 → 完成</b> 这一步跳跃最大。建议把 TikTok 的 9 秒 Reels 同步去 Instagram，补上该渠道的完成缺口。
          </div>
        </div>
      </div>

      {/* RIGHT: platform breakdown at first stage */}
      <div style={{ background: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)", padding: "24px 24px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 15 }}>平台拆分</div>
          <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".06em", fontWeight: 700 }}>BY 完成局</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {topPlatforms.map((p, i) => {
            const pct = (p.completed / topPlatforms[0].completed) * 100;
            const convRate = (p.completed / p.impressions) * 100;
            return (
              <div key={p.id}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: 6,
                    background: p.brandBg, color: p.brandFg || "white",
                    display: "grid", placeItems: "center",
                    fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 9.5,
                  }}>{p.abbr}</div>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-1)", flex: 1 }}>{p.name}</span>
                  <span className="mono" style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink-1)" }}>{fmt(p.completed)}</span>
                  <span className="mono" style={{ fontSize: 10.5, color: convRate >= 25 ? "var(--ok)" : "var(--ink-3)", fontWeight: 600, minWidth: 40, textAlign: "right" }}>{convRate.toFixed(0)}%</span>
                </div>
                <div style={{ height: 4, background: "var(--bg-2)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: p.status === "hot" ? "var(--warm)" : "var(--brand)", borderRadius: 99 }}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StarMapPlatform({ p, dim }) {
  const statusColor = {
    ok:    "var(--ok)",
    warn:  "var(--warn)",
    off:   "var(--ink-4)",
    hot:   "var(--warm)",
  }[p.status];

  return (
    <div style={{
      position: "absolute",
      left: `${p.x}px`,
      top: `${p.y}px`,
      width: 220,
      padding: "11px 14px 12px",
      background: "white",
      border: "1px solid var(--border)",
      borderRadius: 14,
      boxShadow: dim ? "var(--sh-sm)" : "0 12px 28px -10px rgba(24,23,42,.18), var(--sh-sm)",
      opacity: dim ? .55 : 1,
      zIndex: 3,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: p.brandBg,
          color: p.brandFg || "white",
          display: "grid", placeItems: "center",
          fontFamily: "Manrope, sans-serif",
          fontWeight: 800, fontSize: 11.5,
          letterSpacing: ".02em",
          flexShrink: 0,
        }}>{p.abbr}</div>
        <div style={{
          fontFamily: "Manrope, sans-serif",
          fontWeight: 700, fontSize: 14,
          color: "var(--ink-1)",
          letterSpacing: "-.005em",
          flex: 1,
        }}>{p.name}</div>
        <span style={{
          width: 8, height: 8, borderRadius: 99,
          background: statusColor,
          boxShadow: p.status === "hot" ? "0 0 8px var(--warm)" : "none",
        }}/>
      </div>

      <div style={{
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        marginTop: 6,
      }}>
        <div style={{
          fontFamily: "Manrope, sans-serif",
          fontWeight: 800, fontSize: 22, lineHeight: 1,
          letterSpacing: "-.01em",
          color: "var(--ink-1)",
        }}>{p.followers}</div>
        <div className="mono" style={{
          fontSize: 11, color: "var(--ink-3)",
          fontWeight: 600,
          letterSpacing: ".02em",
          paddingBottom: 1,
        }}>share {p.share}</div>
      </div>

      {p.status === "hot" && (
        <div style={{
          marginTop: 8,
          display: "inline-flex", alignItems: "center", gap: 4,
          padding: "2px 8px",
          background: "var(--warm-soft)",
          color: "var(--warm)",
          borderRadius: 99,
          fontSize: 10.5, fontWeight: 700,
        }}>
          <Icon name="fire" size={9} color="var(--warm)"/> 热点中
        </div>
      )}
    </div>
  );
}

function StarMap() {
  const [view, setView] = React.useState("star");
  const [tipOpen, setTipOpen] = React.useState(true);
  const stageRef = React.useRef(null);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    if (!stageRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setScale(e.contentRect.width / 1100);
    });
    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  // 7 platforms positioned on a 1100×580 stage
  const PLATFORMS = [
    { id: "tt", name: "TikTok",      abbr: "TT", brandBg: "#000",        brandFg: "#fff", x: 440, y: 30,  followers: "—",     share: "—",    status: "hot" },
    { id: "tg", name: "Telegram",    abbr: "TG", brandBg: "#2ca5e0",                       x: 110, y: 160, followers: "284K", share: "0.24", status: "hot" },
    { id: "x",  name: "X / Twitter", abbr: "X",  brandBg: "#000",        brandFg: "#fff", x: 770, y: 160, followers: "192K", share: "—",    status: "hot" },
    { id: "ig", name: "Instagram",   abbr: "IG", brandBg: "linear-gradient(135deg,#f9ce34 0%,#ee2a7b 50%,#6228d7 100%)", x: 40,  y: 340, followers: "148K", share: "0.18", status: "ok" },
    { id: "sn", name: "Snapchat",    abbr: "SN", brandBg: "#FFFC00",     brandFg: "#000", x: 840, y: 340, followers: "86K",  share: "0.42", status: "warn" },
    { id: "rd", name: "Reddit",      abbr: "RD", brandBg: "#FF4500",                      x: 180, y: 490, followers: "54K",  share: "0.09", status: "warn" },
    { id: "yt", name: "YouTube",     abbr: "YT", brandBg: "#FF0000",                      x: 690, y: 490, followers: "22K",  share: "0.06", status: "ok" },
  ];

  // Central card position (approximate)
  const CENTER = { cx: 555, cy: 295 };

  // Connection endpoints (card centers, approx)
  const lineFor = (p) => {
    const cardCx = p.x + 110;
    const cardCy = p.y + 50;
    return { x1: CENTER.cx, y1: CENTER.cy, x2: cardCx, y2: cardCy };
  };

  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 20,
      padding: "24px 28px 20px",
      boxShadow: "var(--sh-sm)",
      marginTop: 32,
      marginBottom: 28,
      overflow: "hidden",
    }}>
      {/* HEADER */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 24, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <div className="mono" style={{
            fontSize: 10.5, letterSpacing: ".12em", fontWeight: 700,
            color: "var(--ink-3)", marginBottom: 8,
          }}>
            <span style={{ color: "var(--brand)" }}>分发与传播</span> · 跨平台星图
          </div>
          <h2 style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800, fontSize: 30, lineHeight: 1.1,
            letterSpacing: "-.02em",
            margin: "0 0 8px",
          }}>
            一处创建，<em style={{
              fontFamily: "Instrument Serif, serif",
              fontWeight: 400, fontStyle: "italic",
              color: "var(--warm)", fontSize: 34,
              padding: "0 2px",
            }}>七个宇宙</em>同时点亮。
          </h2>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            fontSize: 12.5, color: "var(--ink-3)",
          }}>
            <span><b style={{ color: "var(--ink-1)", fontWeight: 700 }}>Pump or Dump</b> · 传播星图</span>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "3px 9px",
              background: "var(--brand-soft)",
              color: "var(--brand)",
              borderRadius: 99,
              fontSize: 11, fontWeight: 700,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: 99,
                background: "var(--brand)",
                animation: "pulse 1.8s infinite",
              }}/>
              朔月 实时编排
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* segmented */}
          <div style={{
            display: "flex", gap: 2, padding: 3,
            background: "var(--bg-2)",
            borderRadius: 10,
          }}>
            {[
              ["star",   "星图"],
              ["table",  "表格"],
              ["funnel", "漏斗"],
            ].map(([k, l]) => (
              <button key={k} onClick={() => setView(k)} style={{
                padding: "5px 13px",
                background: view === k ? "var(--ink-1)" : "transparent",
                color: view === k ? "white" : "var(--ink-3)",
                border: "none",
                borderRadius: 7,
                fontSize: 12, fontWeight: 700,
                cursor: "default",
                fontFamily: "inherit",
              }}>{l}</button>
            ))}
          </div>
          <button className="btn sm"><Icon name="refresh" size={12}/> 同步</button>
          <button className="btn warm sm">
            <Icon name="rocket" size={11} color="white"/> 立即分发
          </button>
        </div>
      </div>

      {/* STAR STAGE */}
      {view === "star" && (
      <div ref={stageRef} style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1100 / 620",
        background:
          "radial-gradient(900px 500px at 50% 50%, rgba(255,236,225,.45), transparent 60%)," +
          "var(--bg-1, #fafaff)",
        borderRadius: 16,
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0, left: 0,
          width: 1100, height: 620,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}>
        {/* SVG orbits */}
        <svg
          viewBox="0 0 1100 620"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}
        >
          <defs>
            <radialGradient id="sm-orb-gradient" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="rgba(255,122,61,0)"/>
              <stop offset="80%" stopColor="rgba(255,122,61,.12)"/>
              <stop offset="100%" stopColor="rgba(255,122,61,0)"/>
            </radialGradient>
            <linearGradient id="sm-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff7a3d" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#ff7a3d" stopOpacity="0.15"/>
            </linearGradient>
          </defs>

          {/* orbital ellipses */}
          <ellipse cx="555" cy="305" rx="480" ry="210" fill="none" stroke="var(--border-2)" strokeWidth="1" strokeDasharray="2 6"/>
          <ellipse cx="555" cy="305" rx="350" ry="140" fill="none" stroke="var(--border-2)" strokeWidth="1" strokeDasharray="2 6"/>
          <ellipse cx="555" cy="305" rx="200" ry="80" fill="none" stroke="var(--border-2)" strokeWidth="1" strokeDasharray="2 6"/>

          {/* radial connectors */}
          {PLATFORMS.map((p) => {
            const l = lineFor(p);
            return (
              <line key={p.id}
                x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                stroke="url(#sm-line)"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ opacity: p.status === "off" ? .25 : .8 }}
              />
            );
          })}

          {/* star sparkle dots on orbits */}
          {[
            [340, 380], [770, 380], [380, 220], [740, 230], [880, 305], [220, 305],
            [930, 200], [180, 480], [930, 470], [180, 130], [555, 510], [555, 100],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2"
              fill={i % 3 === 0 ? "var(--warm)" : "var(--ink-4)"}
              opacity={i % 2 === 0 ? .55 : .35}
            />
          ))}
        </svg>

        {/* CENTER CARD */}
        <div style={{
          position: "absolute",
          left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          width: 156, height: 248,
          borderRadius: 18,
          background: "linear-gradient(160deg, #ffd0ad 0%, #ff7a3d 60%, #c7421f 100%)",
          boxShadow: "0 24px 50px -16px rgba(255,122,61,.5), 0 8px 18px -6px rgba(199,66,31,.3)",
          padding: "12px 14px",
          display: "flex", flexDirection: "column",
          color: "white",
          zIndex: 2,
        }}>
          <div style={{
            alignSelf: "flex-start",
            padding: "3px 9px",
            background: "rgba(24,23,42,.65)",
            borderRadius: 99,
            fontSize: 10, fontWeight: 700,
            letterSpacing: ".06em",
          }}>母版</div>

          <div style={{ flex: 1 }}/>

          <div style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800, fontSize: 16, lineHeight: 1.15,
            letterSpacing: "-.005em",
          }}>
            Pump or Dump<br/>
            <em style={{
              fontFamily: "Instrument Serif, serif",
              fontWeight: 400, fontStyle: "italic", fontSize: 18,
              opacity: .95,
            }}>· 线索 #07</em>
          </div>
          <div className="mono" style={{
            fontSize: 9.5, color: "rgba(255,255,255,.75)",
            letterSpacing: ".06em", fontWeight: 600,
            marginTop: 6,
          }}>9:16 · 88s · v1.4</div>
        </div>

        {/* platform cards */}
        {PLATFORMS.map((p) => (
          <StarMapPlatform key={p.id} p={p} dim={tipOpen && p.id === "sn"}/>
        ))}

        {/* Forge tooltip */}
        {tipOpen && (
          <div style={{
            position: "absolute",
            left: 870, top: 305,
            width: 280,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "12px 14px 14px",
            boxShadow: "0 20px 44px -12px rgba(24,23,42,.25), 0 6px 14px -4px rgba(24,23,42,.12)",
            zIndex: 4,
          }}>
            {/* pointer */}
            <div style={{
              position: "absolute",
              left: -8, top: 30,
              width: 14, height: 14,
              background: "var(--surface)",
              borderLeft: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              transform: "rotate(45deg)",
            }}/>

            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
              <div style={{
                width: 22, height: 22, borderRadius: 99,
                background: "linear-gradient(135deg, #a89eff, var(--brand))",
                color: "white",
                display: "grid", placeItems: "center",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 800, fontSize: 11,
              }}>朔</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-1)" }}>朔月</div>
              <span style={{
                padding: "2px 7px",
                background: "var(--brand-soft)",
                color: "var(--brand)",
                borderRadius: 99,
                fontSize: 10, fontWeight: 700,
              }}>建议</span>
              <button
                onClick={() => setTipOpen(false)}
                style={{
                  marginLeft: "auto",
                  background: "transparent", border: "none",
                  color: "var(--ink-4)",
                  padding: 0, cursor: "default",
                  display: "inline-flex",
                }}
              ><Icon name="x" size={11} color="var(--ink-4)"/></button>
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.55, color: "var(--ink-2)" }}>
              <b style={{ color: "var(--ink-1)" }}>X</b> 的反转钩子表现优异（分享率 <b style={{ color: "var(--brand)" }}>0.31</b>）。
              建议把「双重身份」结尾剪辑成 <b style={{ color: "var(--warm)" }}>9 秒 Reels</b>，晚 <b className="mono" style={{ fontFamily: "IBM Plex Mono, monospace", color: "var(--ink-1)" }}>21:00</b> 投放。
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
              <button className="btn dark sm" style={{ padding: "4px 11px", fontSize: 11 }}>
                <Icon name="check" size={10} color="white"/> 采用
              </button>
              <button className="btn sm" style={{ padding: "4px 11px", fontSize: 11 }}>查看根据</button>
            </div>
          </div>
        )}
        </div>
      </div>
      )}

      {view === "table"  && <StarMapTable/>}
      {view === "funnel" && <StarMapFunnel/>}

      {/* LEGEND */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        marginTop: 16, padding: "10px 18px",
        background: "var(--bg-1, #fafaff)",
        border: "1px solid var(--border)",
        borderRadius: 99,
        width: "fit-content",
      }}>
        {[
          ["var(--ok)",   "已连通"],
          ["var(--warn)", "需关注"],
          ["var(--ink-4)","未连接"],
          ["var(--warm)", "热点中"],
        ].map(([c, l], i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 12, color: "var(--ink-2)", fontWeight: 600,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: 99, background: c,
              boxShadow: c === "var(--warm)" ? "0 0 6px var(--warm)" : "none",
            }}/>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

window.StarMap = StarMap;
