// AirvanaMaker v2 — 我的分身 (Studio metaphor)
// Inspired by Marvis: each clone occupies its own "workstation" in a virtual studio.
// Each clone aligns with the Agentic Playable lifecycle: 创作 / 直播 / 分发 / 复盘.

// ─── Station illustrations (flat isometric) ───────────────
function Station({ kind, mood, glow }) {
  const W = 260, H = 200;
  const renderKind = () => {
    if (kind === "designer") {
      // Playable creation desk: monitor with mockup phone + pen tablet + sticky notes
      return (
        <g>
          <path d="M 30 140 L 230 140 L 240 160 L 20 160 Z" fill="#ffffff" stroke="#e6e1f0" strokeWidth="1"/>
          <path d="M 230 140 L 240 160 L 240 165 L 230 145 Z" fill="#f2eff8"/>
          <rect x="48" y="160" width="6" height="36" fill="#e6e1f0"/>
          <rect x="206" y="160" width="6" height="36" fill="#e6e1f0"/>
          {/* main monitor — Playable mockup */}
          <rect x="92" y="78" width="96" height="56" rx="4" fill="#18172a"/>
          <rect x="95" y="81" width="90" height="44" rx="2" fill={glow}/>
          {/* mockup phone frame */}
          <rect x="125" y="86" width="30" height="36" rx="3" fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.55)" strokeWidth="1"/>
          <rect x="130" y="92" width="20" height="3" rx="1" fill="rgba(255,255,255,.75)"/>
          <rect x="130" y="100" width="20" height="12" rx="2" fill="rgba(255,255,255,.35)"/>
          <rect x="130" y="115" width="9" height="3" rx="1" fill="#ff7a3d"/>
          <rect x="141" y="115" width="9" height="3" rx="1" fill="rgba(255,255,255,.55)"/>
          <rect x="135" y="134" width="10" height="6" fill="#18172a"/>
          {/* pen tablet */}
          <rect x="52" y="124" width="44" height="16" rx="3" fill="#1a1a2e"/>
          <rect x="56" y="127" width="36" height="10" rx="2" fill="#2a2a48"/>
          <line x1="84" y1="119" x2="92" y2="105" stroke="#18172a" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="92" cy="103" r="2.5" fill="#5b4dff"/>
          {/* sticky note */}
          <g transform="rotate(6 209 128)">
            <rect x="198" y="118" width="22" height="20" fill="#ffec9c"/>
            <line x1="202" y1="124" x2="216" y2="124" stroke="#a37b1c" strokeWidth="1"/>
            <line x1="202" y1="130" x2="212" y2="130" stroke="#a37b1c" strokeWidth="1"/>
          </g>
        </g>
      );
    }
    if (kind === "streamer") {
      // Live-streaming desk with camera + ring light + monitor
      return (
        <g>
          <path d="M 30 140 L 230 140 L 240 160 L 20 160 Z" fill="#ffffff" stroke="#e6e1f0" strokeWidth="1"/>
          <path d="M 230 140 L 240 160 L 240 165 L 230 145 Z" fill="#f2eff8"/>
          <rect x="48" y="160" width="6" height="36" fill="#e6e1f0"/>
          <rect x="206" y="160" width="6" height="36" fill="#e6e1f0"/>
          {/* monitor — streaming live view */}
          <rect x="100" y="86" width="80" height="52" rx="4" fill="#18172a"/>
          <rect x="103" y="89" width="74" height="40" rx="2" fill={glow}/>
          {/* live dot */}
          <circle cx="113" cy="98" r="3" fill="#ff3a3a"/>
          <rect x="118" y="96" width="14" height="4" rx="1" fill="rgba(255,255,255,.7)"/>
          {/* monitor stand */}
          <rect x="136" y="138" width="8" height="6" fill="#18172a"/>
          {/* ring light */}
          <circle cx="55" cy="105" r="18" fill="none" stroke="#ffec9c" strokeWidth="4"/>
          <rect x="53" y="123" width="4" height="20" fill="#18172a"/>
          {/* camera */}
          <rect x="195" y="100" width="22" height="14" rx="2" fill="#18172a"/>
          <circle cx="200" cy="107" r="3" fill="#5b4dff"/>
          <rect x="203" y="114" width="6" height="16" fill="#18172a"/>
        </g>
      );
    }
    if (kind === "distributor") {
      // Distribution control: world map wall + platform pings + desk with platform icons
      return (
        <g>
          <rect x="40" y="40" width="180" height="68" rx="6" fill="#0f0e1e"/>
          {[[60,58],[72,52],[80,68],[96,54],[110,76],[124,50],[140,68],[156,56],[172,72],[188,52],[200,68],[210,58]].map(([x,y],i) =>
            <circle key={i} cx={x} cy={y} r="2" fill={i % 3 === 0 ? "#ff7a3d" : "rgba(255,255,255,.5)"}/>
          )}
          {/* world connection arcs */}
          <path d="M 60 58 Q 100 30 156 56 Q 190 70 210 58" stroke="#5b4dff" strokeWidth="1.2" fill="none" strokeDasharray="2 2"/>
          <path d="M 80 68 Q 130 90 200 68" stroke="#ff7a3d" strokeWidth="1.2" fill="none" strokeDasharray="2 2"/>
          {/* ping rings */}
          <circle cx="80" cy="68" r="6" fill="none" stroke="#ff7a3d" strokeWidth="1.5" opacity=".6"/>
          <circle cx="156" cy="56" r="6" fill="none" stroke="#5b4dff" strokeWidth="1.5" opacity=".6"/>
          {/* desk */}
          <path d="M 30 132 L 230 132 L 240 152 L 20 152 Z" fill="#ffffff" stroke="#e6e1f0" strokeWidth="1"/>
          <path d="M 230 132 L 240 152 L 240 158 L 230 137 Z" fill="#f2eff8"/>
          <rect x="48" y="152" width="6" height="36" fill="#e6e1f0"/>
          <rect x="206" y="152" width="6" height="36" fill="#e6e1f0"/>
          {/* keyboard */}
          <rect x="100" y="120" width="60" height="10" rx="2" fill="#18172a"/>
          {/* platform icons on desk */}
          <circle cx="75" cy="126" r="5" fill="#18172a"/>
          <rect x="170" y="121" width="10" height="10" rx="2" fill="#5b4dff"/>
          <rect x="184" y="121" width="10" height="10" rx="2" fill="#ff7a3d"/>
        </g>
      );
    }
    if (kind === "analyst") {
      // Analytics dashboard wall: charts + data feed
      return (
        <g>
          <rect x="40" y="40" width="180" height="72" rx="6" fill="#0f0e1e"/>
          {/* chart 1 — line */}
          <rect x="46" y="46" width="80" height="42" rx="3" fill="#1a1a36"/>
          <polyline points="52,80 64,72 76,76 88,62 100,66 112,50 122,46" fill="none" stroke="#2eaa70" strokeWidth="1.6" strokeLinecap="round"/>
          <polyline points="52,82 64,78 76,82 88,72 100,76 112,64 122,60" fill="none" stroke="#5b4dff" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2"/>
          {/* chart 2 — bars */}
          <rect x="132" y="46" width="82" height="42" rx="3" fill="#1a1a36"/>
          {[[138, 14], [148, 22], [158, 18], [168, 28], [178, 24], [188, 32], [198, 26], [208, 36]].map(([x, h], i) => (
            <rect key={i} x={x} y={84 - h} width="6" height={h} rx="1" fill={i === 7 ? "#ff7a3d" : "#5b4dff"} opacity={i === 7 ? 1 : .6 + i * 0.04}/>
          ))}
          {/* numbers strip */}
          <rect x="46" y="93" width="80" height="14" rx="3" fill="#1a1a36"/>
          <rect x="50" y="97" width="28" height="6" rx="1" fill="#2eaa70" opacity=".7"/>
          <rect x="82" y="97" width="40" height="6" rx="1" fill="rgba(255,255,255,.35)"/>
          <rect x="132" y="93" width="82" height="14" rx="3" fill="#1a1a36"/>
          <rect x="136" y="97" width="20" height="6" rx="1" fill="#ff7a3d" opacity=".8"/>
          <rect x="160" y="97" width="50" height="6" rx="1" fill="rgba(255,255,255,.35)"/>
          {/* desk */}
          <path d="M 30 132 L 230 132 L 240 152 L 20 152 Z" fill="#ffffff" stroke="#e6e1f0" strokeWidth="1"/>
          <path d="M 230 132 L 240 152 L 240 158 L 230 137 Z" fill="#f2eff8"/>
          <rect x="48" y="152" width="6" height="36" fill="#e6e1f0"/>
          <rect x="206" y="152" width="6" height="36" fill="#e6e1f0"/>
          {/* laptop on desk */}
          <rect x="98" y="122" width="64" height="10" rx="2" fill="#18172a"/>
          <rect x="102" y="125" width="56" height="5" rx="1" fill={glow}/>
          {/* coffee */}
          <ellipse cx="186" cy="124" rx="6" ry="2" fill="#6b4e2a"/>
          <rect x="180" y="116" width="12" height="10" rx="2" fill="#ffffff" stroke="#d4cfe0" strokeWidth="1"/>
        </g>
      );
    }
    // Empty slot
    return (
      <g>
        <path d="M 30 140 L 230 140 L 240 160 L 20 160 Z" fill="rgba(255,255,255,.5)" stroke="rgba(180,175,205,.5)" strokeWidth="1" strokeDasharray="4 3"/>
        <rect x="48" y="160" width="6" height="36" fill="rgba(180,175,205,.4)"/>
        <rect x="206" y="160" width="6" height="36" fill="rgba(180,175,205,.4)"/>
      </g>
    );
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="xMidYMid meet">
      <ellipse cx="130" cy="196" rx="120" ry="6" fill="rgba(91,77,255,.06)"/>
      {renderKind()}
    </svg>
  );
}

function Clones({ goto }) {
  const [active, setActive] = React.useState(1);  // streamer is on air
  const [view, setView] = React.useState("overview");

  const clones = [
    {
      key: "designer",
      nm: "Aria · Designer",
      role: "Playable 创作台",
      mood: "thinking",
      pct: 48, color: "var(--brand)",
      glow: "#5b4dff",
      trained: "3.2M tokens",
      missions: 22,
      tagline: "替你写 Playable 脚本、画原型、设计玩法机制，60 秒出首版。",
      hooks: ["Pump or Dump · v1 起草", "K 线预言局 · 玩法迭代"],
      skills: [
        { k: "玩法构思",   v: 88 },
        { k: "脚本撰写",   v: 76 },
        { k: "原型搭建",   v: 64 },
        { k: "美术指引",   v: 32 },
      ],
    },
    {
      key: "streamer",
      nm: "Aria · Streamer",
      role: "试玩直播间",
      mood: "happy",
      pct: 62, color: "var(--warm)",
      glow: "#ff7a3d",
      trained: "4.1M tokens",
      missions: 24,
      tagline: "替你直播试玩自家 Playable，模仿你的弹幕主语气和招牌口癖。",
      hooks: ["Pump or Dump · 开场试玩", "K 线预言局 · 直播实况"],
      skills: [
        { k: "弹幕互动",   v: 90 },
        { k: "试玩节奏",   v: 84 },
        { k: "招牌口癖库", v: 78 },
        { k: "应急救场",   v: 70 },
      ],
    },
    {
      key: "distributor",
      nm: "Aria · Distributor",
      role: "全球分发台",
      mood: "wink",
      pct: 78, color: "var(--ok)",
      glow: "#2eaa70",
      trained: "5.6M tokens",
      missions: 31,
      tagline: "把你的 Playable 投到合适的平台和地区，做合规适配和扩量。",
      hooks: ["TikTok ID · 自动扩量", "Bybit 联名 · 平台对接"],
      skills: [
        { k: "平台适配", v: 92 },
        { k: "合规话术", v: 88 },
        { k: "扩量策略", v: 84 },
        { k: "时区择优", v: 76 },
      ],
    },
    {
      key: "analyst",
      nm: "Aria · Analyst",
      role: "复盘反思室",
      mood: "thinking",
      pct: 24, color: "#b03a72",
      glow: "#b03a72",
      trained: "1.0M tokens",
      missions: 6,
      tagline: "盯实时数据、写复盘、生成下一版的优化建议，让 Playable 自进化。",
      hooks: ["Pump or Dump · 周报", "Velvet Lip · 实时反思"],
      skills: [
        { k: "数据洞察", v: 42 },
        { k: "反思撰写", v: 36 },
        { k: "优化建议", v: 28 },
        { k: "归因分析", v: 18 },
      ],
    },
  ];

  const c = clones[active];

  const conversations = [
    { t: "正在试玩 Pump or Dump",      nm: "Aria · Streamer",    tokens: "10.2万", time: "15:37 05/22", status: "running" },
    { t: "起草 v1.c 大赛模式",          nm: "Aria · Designer",    tokens: "14.4万", time: "14:58 05/22", status: "done" },
    { t: "TikTok ID 区扩量 +20%",       nm: "Aria · Distributor", tokens: "8.8万",  time: "14:34 05/22", status: "done" },
    { t: "本周完成率反思",              nm: "Aria · Analyst",     tokens: "5.2万",  time: "14:29 05/22", status: "done" },
    { t: "Velvet Lip · plum 变体提案",  nm: "Aria · Designer",    tokens: "3.1万",  time: "14:23 05/22", status: "done" },
    { t: "Mastodon 镜像分发预审",       nm: "Aria · Distributor", tokens: "1.8万",  time: "13:58 05/22", status: "done" },
    { t: "Idol Match 数据归因",         nm: "Aria · Analyst",     tokens: "0.6万",  time: "13:12 05/22", status: "done" },
  ];
  const running = conversations.filter(c => c.status === "running").length;
  const done    = conversations.filter(c => c.status === "done").length;

  const tone = {
    designer:    { bg: "linear-gradient(160deg, #f5f3ff 0%, #e8e3ff 100%)",  hint: "rgba(91, 77, 255, .14)" },
    streamer:    { bg: "linear-gradient(160deg, #fff3eb 0%, #ffdcc7 100%)",  hint: "rgba(255, 122, 61, .14)" },
    distributor: { bg: "linear-gradient(160deg, #ebfaf2 0%, #c8efd9 100%)",  hint: "rgba(46, 170, 112, .14)" },
    analyst:     { bg: "linear-gradient(160deg, #fff1f6 0%, #fcd1e1 100%)",  hint: "rgba(176, 58, 114, .14)" },
  };

  // ─── DETAIL VIEW (二级页面) ────────────────────────────
  if (view === "detail") {
    const t = tone[c.key];
    const cloneConvs = conversations.filter(cv => cv.nm === c.nm);
    const trainingLog = [
      { d: "今 14:58", t: "投喂 480 条公会语料",    delta: "+4.2pt", ok: true },
      { d: "昨 22:12", t: "招牌口癖库扩充 v3",      delta: "+2.8pt", ok: true },
      { d: "05/20",    t: "应急救场场景训练",       delta: "+1.4pt", ok: true },
      { d: "05/19",    t: "弹幕互动微调",          delta: "-0.6pt", ok: false },
    ];

    return (
      <div className="page">
        {/* breadcrumb + back */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <button
            onClick={() => setView("overview")}
            className="btn"
            style={{ padding: "6px 12px", fontSize: 12.5 }}
          >
            <Icon name="arrow_r" size={12} style={{ transform: "scaleX(-1)" }}/> 返回工作室
          </button>
          <div style={{ color: "var(--ink-3)", fontSize: 13 }}>
            我的分身 / <b style={{ color: "var(--ink-1)", fontWeight: 700 }}>{c.nm}</b>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            <button className="btn"><Icon name="upload" size={13}/> 投喂语料</button>
            <button className="btn"><Icon name="brain" size={13}/> 训练</button>
            <button className="btn brand"><Icon name="msg" size={13} color="white"/> 开始对话</button>
          </div>
        </div>

        {/* HERO */}
        <div style={{
          background: t.bg,
          borderRadius: "var(--r-xl)",
          padding: "28px 32px",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: 32,
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* close button (top-right) */}
          <button
            onClick={() => setView("overview")}
            style={{
              position: "absolute", top: 18, right: 22, zIndex: 5,
              background: "transparent",
              border: "none",
              cursor: "default",
              fontFamily: "inherit",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--ink-2)",
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "6px 10px",
              borderRadius: 99,
              transition: "background .12s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,.55)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            关闭 <Icon name="x" size={13} color="var(--ink-2)" strokeWidth={2.2}/>
          </button>
          <div style={{
            position: "absolute", right: -30, bottom: -30,
            width: 200, height: 200, borderRadius: 99,
            background: "rgba(255,255,255,.35)",
          }}/>

          <div style={{
            width: 140, height: 140,
            borderRadius: 24,
            background: "rgba(255,255,255,.7)",
            display: "grid", placeItems: "center",
            position: "relative",
            flexShrink: 0,
          }}>
            <Mascot size={110} mood={c.mood}/>
            <div style={{
              position: "absolute", bottom: -10, right: -10,
              padding: "5px 12px",
              background: c.color,
              color: "white",
              borderRadius: 99,
              fontSize: 12, fontWeight: 800,
              fontFamily: "IBM Plex Mono, monospace",
              boxShadow: "0 6px 16px rgba(0,0,0,.18)",
            }}>{c.pct}%</div>
          </div>

          <div style={{ position: "relative" }}>
            <div className="mono" style={{ fontSize: 10.5, color: "rgba(24, 23, 42, .55)", letterSpacing: ".15em", marginBottom: 8, fontWeight: 700 }}>
              {c.role}
            </div>
            <div style={{
              fontFamily: "Manrope, sans-serif", fontWeight: 800,
              fontSize: 56, lineHeight: 1, letterSpacing: "-.025em",
              marginBottom: 10,
              color: "var(--ink-1)",
            }}>
              {c.nm}
            </div>
            <div style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, maxWidth: 540, marginBottom: 14 }}>
              {c.tagline}
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: 12, color: "rgba(24, 23, 42, .65)" }}>
              <span><span className="mono" style={{ color: "var(--ink-1)", fontWeight: 800 }}>{c.trained}</span> 训练语料</span>
              <span style={{ width: 3, height: 3, borderRadius: 99, background: "rgba(24, 23, 42, .25)", alignSelf: "center" }}/>
              <span><span className="mono" style={{ color: "var(--ink-1)", fontWeight: 800 }}>{c.missions}</span> 个任务</span>
              <span style={{ width: 3, height: 3, borderRadius: 99, background: "rgba(24, 23, 42, .25)", alignSelf: "center" }}/>
              <span><span className="mono" style={{ color: "var(--ink-1)", fontWeight: 800 }}>{cloneConvs.length}</span> 条对话</span>
            </div>
          </div>

          {/* big station illustration */}
          <div style={{ width: 280, opacity: .92, position: "relative" }}>
            <Station kind={c.key} mood={c.mood} glow={c.glow}/>
          </div>
        </div>

        {/* The pasted screenshot panel — preserved as the secondary detail's centerpiece */}
        <div style={{
          marginTop: 20,
          padding: 24,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr 1fr",
          gap: 28,
        }}>
          <div>
            <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".08em", fontWeight: 700, marginBottom: 8 }}>选中</div>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 28, lineHeight: 1, letterSpacing: "-.01em", marginBottom: 10 }}>{c.nm}</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginBottom: 16, lineHeight: 1.55 }}>{c.tagline}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn brand">
                <Icon name="msg" size={12} color="white"/> 对话
              </button>
              <button className="btn">
                <Icon name="brain" size={12}/> 训练
              </button>
            </div>
          </div>

          <div>
            <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".08em", fontWeight: 700, marginBottom: 14 }}>核心能力</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {c.skills.map((s, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 4 }}>
                    <span style={{ color: "var(--ink-2)", fontWeight: 600 }}>{s.k}</span>
                    <span className="mono" style={{ color: c.color, fontWeight: 800 }}>{s.v}%</span>
                  </div>
                  <div className="bar-track" style={{ height: 6 }}>
                    <div className="bar-fill" style={{ width: `${s.v}%`, background: c.color }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".08em", fontWeight: 700, marginBottom: 14 }}>挂载位置</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {c.hooks.map((h, i) => (
                <div key={i} style={{
                  padding: "10px 14px",
                  background: "var(--bg-2)",
                  borderRadius: 10,
                  display: "flex", alignItems: "center", gap: 8,
                  fontSize: 12.5, fontWeight: 600,
                }}>
                  <Icon name="link" size={12} color={c.color}/>
                  <span style={{ flex: 1, color: "var(--ink-1)" }}>{h}</span>
                </div>
              ))}
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 8, fontFamily: "IBM Plex Mono, monospace" }}>
                训练 {c.trained} · 完成 {c.missions} 任务
              </div>
            </div>
          </div>
        </div>

        {/* 2-col: 训练历史 + 对话明细 */}
        <div className="g g-2" style={{ marginTop: 20 }}>
          <div className="card">
            <div className="card-hd">
              <h3>训练历史</h3>
              <span className="sub">最近 4 轮 · Forge 自动评分</span>
              <div className="right">
                <button className="btn sm"><Icon name="plus" size={11}/> 新训练</button>
              </div>
            </div>
            <div className="card-bd" style={{ paddingTop: 4 }}>
              {trainingLog.map((tg, i, arr) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 0",
                  borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: ".04em", minWidth: 60 }}>{tg.d}</div>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: tg.ok ? "var(--ok-soft)" : "var(--bad-soft)",
                    color: tg.ok ? "var(--ok)" : "var(--bad)",
                    display: "grid", placeItems: "center",
                    flexShrink: 0,
                  }}>
                    <Icon name={tg.ok ? "check" : "x"} size={13} color={tg.ok ? "var(--ok)" : "var(--bad)"} strokeWidth={2.2}/>
                  </div>
                  <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{tg.t}</div>
                  <div className="mono" style={{
                    fontSize: 12, fontWeight: 700,
                    color: tg.ok ? "var(--ok)" : "var(--bad)",
                  }}>成熟度 {tg.delta}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-hd">
              <h3>{c.nm} 的对话</h3>
              <span className="sub">{cloneConvs.length} 条</span>
              <div className="right">
                <button className="btn sm ghost">全部 <Icon name="chev_r" size={11}/></button>
              </div>
            </div>
            <div style={{ padding: "4px 18px 18px" }}>
              {cloneConvs.length === 0 ? (
                <div style={{ padding: 24, textAlign: "center", color: "var(--ink-3)", fontSize: 12 }}>暂无对话记录</div>
              ) : cloneConvs.map((cv, i) => (
                <div key={i} style={{
                  padding: "12px 0",
                  borderBottom: i < cloneConvs.length - 1 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-1)", flex: 1 }}>{cv.t}</div>
                    {cv.status === "running" ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 800, color: "var(--ok)" }}>
                        <span style={{ width: 5, height: 5, borderRadius: 99, background: "var(--ok)", animation: "pulse 2s ease-in-out infinite" }}/>
                        进行中
                      </span>
                    ) : (
                      <span style={{ fontSize: 10.5, color: "var(--ink-3)" }}>已完成</span>
                    )}
                  </div>
                  <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>累计 Token {cv.tokens} · {cv.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-h">
        <div>
          <h1>我的<em>分身</em></h1>
        </div>
        <div className="sub">你的 Agentic Playable 工作室。从创作到直播、分发、复盘，每个环节都有专属分身替你跑。</div>
        <div className="right">
          <button className="btn"><Icon name="upload" size={13}/> 上传语料</button>
          <button className="btn brand"><Icon name="plus" size={13} color="white"/> 训练新分身</button>
        </div>
      </div>

      <div className="g" style={{ gridTemplateColumns: "1fr 340px", gap: 20 }}>
        {/* LEFT — studio room */}
        <div style={{
          background: "linear-gradient(180deg, #fcfbfe 0%, #efedf7 100%)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r-xl)",
          padding: 28,
          boxShadow: "var(--sh-sm)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 22 }}>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 28, lineHeight: 1, letterSpacing: "-.01em" }}>
              虚拟<em style={{ color: "var(--brand)" }}>工作室</em>
            </div>
            <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: ".05em" }}>
              <span style={{ color: "var(--ok)", fontWeight: 800 }}>{clones.length}</span>/6 工位 ·
              <span style={{ color: "var(--warm)", fontWeight: 800, marginLeft: 4 }}>{running}</span> 在工作
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
              <button className="btn sm ghost"><Icon name="filter" size={11}/> 视角</button>
            </div>
          </div>

          {/* lifecycle hint strip */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            marginBottom: 16,
            padding: "8px 14px",
            background: "rgba(255,255,255,.7)",
            border: "1px dashed rgba(180,175,205,.55)",
            borderRadius: 99,
            fontSize: 11.5,
            color: "var(--ink-3)",
            fontFamily: "IBM Plex Mono, monospace",
            letterSpacing: ".04em",
            width: "fit-content",
          }}>
            <span style={{ color: "var(--brand)", fontWeight: 800 }}>① 创作</span>
            <Icon name="arrow_r" size={10} color="var(--ink-4)"/>
            <span style={{ color: "var(--ok)", fontWeight: 800 }}>② 分发</span>
            <Icon name="arrow_r" size={10} color="var(--ink-4)"/>
            <span style={{ color: "var(--warm)", fontWeight: 800 }}>③ 运营</span>
            <Icon name="arrow_r" size={10} color="var(--ink-4)"/>
            <span style={{ color: "#b03a72", fontWeight: 800 }}>④ 复盘</span>
            <span style={{ marginLeft: 6 }}>· Agentic Playable 全链路</span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 16,
          }}>
            {clones.map((cl, i) => {
              const isActive = active === i;
              const t = tone[cl.key];
              return (
                <div
                  key={i}
                  onClick={() => { setActive(i); setView("detail"); }}
                  style={{
                    background: t.bg,
                    borderRadius: 18,
                    padding: "10px 12px 14px",
                    cursor: "default",
                    position: "relative",
                    transition: "transform .18s ease, box-shadow .18s ease",
                    transform: isActive ? "translateY(-2px)" : "none",
                    boxShadow: isActive
                      ? `0 16px 36px -10px ${t.hint}, 0 0 0 2px ${cl.color}`
                      : "var(--sh-sm)",
                  }}
                >
                  {/* step number */}
                  <div style={{
                    position: "absolute", top: 8, left: 12,
                    fontFamily: "Manrope, sans-serif", fontWeight: 800,
                    fontSize: 22, lineHeight: 1,
                    color: cl.color,
                    opacity: .55,
                    }}>{["①","②","③","④"][i]}</div>

                  <div style={{ position: "relative", marginBottom: 4 }}>
                    <Station kind={cl.key} mood={cl.mood} glow={cl.glow}/>
                    <div style={{
                      position: "absolute",
                      bottom: "18%", left: "50%",
                      transform: "translateX(-50%)",
                      width: 58, height: 58,
                    }}>
                      <Mascot size={58} mood={cl.mood}/>
                    </div>
                    {cl.key === "streamer" && (
                      <div style={{
                        position: "absolute", top: 6, right: 6,
                        display: "inline-flex", alignItems: "center", gap: 4,
                        padding: "3px 8px",
                        background: "rgba(255,255,255,.95)",
                        borderRadius: 99,
                        fontSize: 9.5, fontWeight: 800,
                        color: "var(--ok)",
                        letterSpacing: ".05em",
                        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
                      }}>
                        <span style={{
                          width: 5, height: 5, borderRadius: 99,
                          background: "var(--ok)",
                          animation: "pulse 2s ease-in-out infinite",
                        }}/>
                        ON AIR
                      </div>
                    )}
                  </div>

                  <div style={{
                    background: "rgba(255,255,255,.85)",
                    borderRadius: 10,
                    padding: "8px 12px",
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 800, color: "var(--ink-1)", lineHeight: 1.2 }}>{cl.nm}</div>
                      <div className="mono" style={{ fontSize: 9.5, color: "var(--ink-3)", marginTop: 1, letterSpacing: ".02em" }}>{cl.role}</div>
                    </div>
                    <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 12, fontWeight: 800, color: cl.color }}>{cl.pct}%</div>
                  </div>
                </div>
              );
            })}

            {/* Empty slots */}
            {[0, 1].map(j => (
              <div key={`empty-${j}`} style={{
                background: "rgba(255,255,255,.4)",
                border: "1.5px dashed var(--border-2)",
                borderRadius: 18,
                padding: "10px 12px 14px",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                minHeight: 200,
                cursor: "default",
              }}>
                <Station kind="empty"/>
                <div style={{
                  marginTop: 8,
                  background: "rgba(255,255,255,.85)",
                  borderRadius: 10,
                  padding: "6px 14px",
                  display: "flex", alignItems: "center", gap: 8,
                  color: "var(--ink-3)",
                  fontSize: 11.5, fontWeight: 700,
                }}>
                  <Icon name="plus" size={12} color="var(--ink-3)"/> 空工位
                </div>
              </div>
            ))}
          </div>

          {/* DETAIL PANEL inline removed — see secondary detail screen */}
        </div>

        {/* RIGHT — Stats + 对话明细 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-xl)",
            padding: "22px 24px",
            boxShadow: "var(--sh-sm)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
          }}>
            {[
              { v: running,              l: "进行中", c: "var(--ok)" },
              { v: done,                 l: "已完成", c: "var(--ink-1)" },
              { v: conversations.length, l: "总计",   c: "var(--ink-1)" },
            ].map((s, i, arr) => (
              <div key={i} style={{
                textAlign: "center", position: "relative",
                paddingRight: i < arr.length - 1 ? 4 : 0,
              }}>
                <div style={{
                  fontFamily: "Manrope, sans-serif", fontWeight: 800,
                  fontSize: 44, lineHeight: 1, letterSpacing: "-.02em",
                  color: s.c,
                }}>{s.v}</div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 6, fontWeight: 600 }}>{s.l}</div>
                {i < arr.length - 1 && (
                  <div style={{ position: "absolute", top: 10, bottom: 10, right: 0, width: 1, background: "var(--border)" }}/>
                )}
              </div>
            ))}
          </div>

          <div className="card" style={{ overflow: "hidden", flex: 1 }}>
            <div className="card-hd">
              <h3>对话明细</h3>
              <div className="right">
                <button className="btn sm ghost" style={{ fontSize: 11 }}>
                  全部 <Icon name="chev_d" size={11}/>
                </button>
              </div>
            </div>
            <div style={{ padding: "4px 18px 18px" }}>
              {conversations.map((cv, i) => (
                <div key={i} className="lift" style={{
                  padding: "12px 0",
                  borderBottom: i < conversations.length - 1 ? "1px solid var(--border)" : "none",
                  cursor: "default",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <div style={{
                      fontSize: 13, fontWeight: 700, color: "var(--ink-1)",
                      flex: 1, minWidth: 0,
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                    }}>{cv.t}</div>
                    {cv.status === "running" ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 800, color: "var(--ok)" }}>
                        <span style={{ width: 5, height: 5, borderRadius: 99, background: "var(--ok)", animation: "pulse 2s ease-in-out infinite" }}/>
                        进行中
                      </span>
                    ) : (
                      <span style={{ fontSize: 10.5, color: "var(--ink-3)", display: "inline-flex", alignItems: "center", gap: 3 }}>
                        已完成 <Icon name="chev_r" size={10} color="var(--ink-3)"/>
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 10.5, color: "var(--ink-3)" }}>
                    <span className="mono">{cv.nm} · 累计 Token {cv.tokens}</span>
                    <span className="mono">{cv.time}</span>
                  </div>
                </div>
              ))}
              <div style={{ textAlign: "center", padding: "16px 0 6px", fontSize: 11.5, color: "var(--ink-4)" }}>
                没有更多了
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Clones = Clones;
