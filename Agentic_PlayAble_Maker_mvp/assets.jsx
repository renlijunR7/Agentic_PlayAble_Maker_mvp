// AirvanaMaker v2 — My Assets
// Holds three asset types: Playables (生产物), AI Clones (分身), Templates (复用模板)

// Live-ticking number — makes the agentic cards feel like they're earning in real time.
function LiveStat({ base, fmt, color }) {
  const [v, setV] = React.useState(base);
  const [bump, setBump] = React.useState(false);
  React.useEffect(() => {
    let alive = true;
    const tick = () => {
      if (!alive) return;
      setV((p) => p + (fmt === "money" ? (0.04 + Math.random() * 0.55) : Math.ceil(1 + Math.random() * 4)));
      setBump(true);
      setTimeout(() => alive && setBump(false), 360);
    };
    const iv = setInterval(tick, 1500 + Math.random() * 1300);
    return () => { alive = false; clearInterval(iv); };
  }, [fmt]);
  const text = fmt === "money"
    ? "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : Math.floor(v).toLocaleString("en-US");
  return (
    <span style={{
      display: "inline-block",
      transition: "transform .34s cubic-bezier(.2,.9,.3,1), filter .34s",
      transform: bump ? "translateY(-2px)" : "none",
      filter: bump ? "brightness(1.15)" : "none",
    }}>{text}</span>
  );
}

// Lifecycle stages — a single continuous state machine.
// autonomy% drives the fill; the stage label is derived from the same number.
const AGENT_STAGES = [
  { key: "初始化", min: 0,  hint: "样本积累中，几乎所有动作都要你确认" },
  { key: "自进化", min: 34, hint: "已能自己跑实验、提建议，关键动作仍需确认" },
  { key: "自运行", min: 67, hint: "授权范围内自主决策，只在越界时找你" },
];
function stageOf(pct) {
  return AGENT_STAGES.reduce((acc, s) => (pct >= s.min ? s : acc), AGENT_STAGES[0]);
}

// Growth bar — merges 代数 + 状态阶段 + 自主度 into one "it's growing up" story.
function GrowthBar({ gen, autonomy }) {
  const stage = stageOf(autonomy);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="mono" style={{
          fontSize: 9.5, fontWeight: 800, letterSpacing: ".04em",
          padding: "2px 7px", borderRadius: 6,
          background: "var(--ink-1)", color: "white",
        }}>第 {gen} 代</span>
        <span style={{ fontSize: 11, color: "var(--ink-3)" }}>当前阶段</span>
        {AGENT_STAGES.map((s, i) => {
          const on = s.key === stage.key;
          return (
            <span key={i} style={{
              fontSize: 11.5, fontWeight: on ? 800 : 600,
              color: on ? "var(--ink-1)" : "var(--ink-4)",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              {i > 0 && <span style={{ color: "var(--ink-4)", fontWeight: 400 }}>›</span>}
              {on && <span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--ok)", boxShadow: "0 0 6px var(--ok)" }}/>}
              {s.key}
            </span>
          );
        })}
        <span style={{ flex: 1 }}/>
        <span className="mono" title="Forge 被授权自主决策的成熟度" style={{ fontSize: 10.5, fontWeight: 800, color: "var(--brand)" }}>
          自主度 {autonomy}%
        </span>
      </div>
      <div style={{ position: "relative", height: 6, borderRadius: 99, background: "var(--bg-2)", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, width: `${autonomy}%`,
          background: "linear-gradient(90deg, var(--brand), var(--warm))",
          borderRadius: 99,
        }}/>
        {/* stage ticks at 34% / 67% */}
        <span style={{ position: "absolute", left: "34%", top: 0, bottom: 0, width: 1.5, background: "var(--surface)" }}/>
        <span style={{ position: "absolute", left: "67%", top: 0, bottom: 0, width: 1.5, background: "var(--surface)" }}/>
      </div>
    </div>
  );
}

// One row of the decision feed. tone: ok | run | wait | bad
const TL_TONE = {
  ok:   { dot: "var(--ok)",    txt: "var(--ok)",    mark: "▲" },
  run:  { dot: "var(--brand)", txt: "var(--ink-3)", mark: "•" },
  wait: { dot: "var(--warm)",  txt: "var(--warm)",  mark: "◷" },
  bad:  { dot: "#b03a72",      txt: "#b03a72",      mark: "▼" },
};
function DecisionRow({ row }) {
  const t = TL_TONE[row.tone] || TL_TONE.run;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 11.5, lineHeight: 1.4 }}>
      <span style={{ width: 6, height: 6, borderRadius: 99, background: t.dot, flexShrink: 0 }}/>
      <span className="mono" style={{ fontSize: 9.5, color: "var(--ink-4)", width: 38, flexShrink: 0, fontWeight: 700 }}>{row.t}</span>
      <span style={{ color: "var(--ink-2)", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{row.text}</span>
      <span style={{ color: t.txt, fontWeight: 700, flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 3 }}>
        <span style={{ fontSize: 9 }}>{t.mark}</span>{row.delta}
      </span>
    </div>
  );
}

function Assets({ goto }) {
  const [tab, setTab] = React.useState("agentic");

  const agentic = [
    {
      name: "Pump or Dump",
      gen: 8,
      autonomy: 72,
      mood: "happy",
      tone: "p3",
      scene: "predict",
      brand: "Bybit 联名",
      status: "自运行",
      uptime: "14 天 6 小时",
      kpis: [
        { k: "完成局",    base: 248134,  fmt: "count", c: "var(--brand)" },
        { k: "净收入",    base: 2847.30, fmt: "money", c: "var(--warm)" },
        { k: "A/B 运行中", v: "3 个", c: "var(--ok)" },
      ],
      experiments: ["双倍奖励池", "分身解说", "7 日大赛"],
      pending: 1,
      guard: {
        auto:    ["改 CTA 时机", "调奖池 ±15%", "A/B 分流"],
        approve: ["扩量预算 > $200/日", "新品牌联名"],
      },
      timeline: [
        { t: "刚刚", text: "TikTok ID · CTA 前移到 35s",   delta: "完成率 +4.2pt", tone: "ok" },
        { t: "2h",  text: "「双倍奖励池」A/B 开跑",          delta: "样本积累中",     tone: "run" },
        { t: "待确认", text: "印尼 TG 扩量预算提到 $260/日", delta: "超授权上限",     tone: "wait" },
      ],
    },
    {
      name: "Velvet Lip",
      gen: 5,
      autonomy: 48,
      mood: "wink",
      tone: "p4",
      scene: "match",
      brand: "Maybelline",
      status: "自进化",
      uptime: "6 天 11 小时",
      kpis: [
        { k: "完成局",    base: 86052,   fmt: "count", c: "var(--brand)" },
        { k: "净收入",    base: 1204.80, fmt: "money", c: "var(--warm)" },
        { k: "A/B 运行中", v: "2 个", c: "var(--ok)" },
      ],
      experiments: ["肤色适配", "人设切换"],
      pending: 2,
      guard: {
        auto:    ["肤色适配", "文案微调"],
        approve: ["切换分身人设", "跨市场分发"],
      },
      timeline: [
        { t: "1h",  text: "US 市场 plum 型变体 v6 已生成", delta: "待你确认上线",      tone: "wait" },
        { t: "5h",  text: "冷调适配实验",                  delta: "-0.4pt · 已自动回滚", tone: "bad" },
        { t: "昨天", text: "双倍奖励池 A/B",                delta: "分享率 +6.2pt",      tone: "ok" },
      ],
    },
    {
      name: "Idol Match",
      gen: 2,
      autonomy: 22,
      mood: "thinking",
      tone: "p5",
      scene: "ladder",
      brand: "Lazada",
      status: "初始化",
      uptime: "1 天 4 小时",
      kpis: [
        { k: "完成局",    base: 4812,  fmt: "count", c: "var(--brand)" },
        { k: "净收入",    base: 68.40, fmt: "money", c: "var(--warm)" },
        { k: "A/B 运行中", v: "1 个", c: "var(--ok)" },
      ],
      experiments: ["动漫风格"],
      pending: 0,
      guard: {
        auto:    ["样本采集"],
        approve: ["全部投放动作"],
      },
      timeline: [
        { t: "3h", text: "样本采集中 · 812 / 1,000", delta: "等首份判断", tone: "run" },
      ],
    },
  ];

  const playables = [
    { name: "Pump or Dump",   scene: "predict", kind: "predict", ver: "v3.2", isDraft: false, src: "自创模板",            updated: "更新 今日 14:20", status: "正在使用", statusTone: "ok",   brand: "Bybit",      variants: 4, runs: "248K" },
    { name: "ETH Spin",       scene: "wheel",   kind: "wheel",   ver: "v2.1", isDraft: false, src: "改编自 Crypto Wheel",  updated: "更新 2 天前",     status: "正在使用", statusTone: "ok",   brand: "HyperX",     variants: 3, runs: "86K"  },
    { name: "Velvet Lip",     scene: "match",   kind: "match",   ver: "v3.0", isDraft: false, src: "自创模板",            updated: "更新 4 天前",     status: "正在使用", statusTone: "ok",   brand: "Maybelline", variants: 6, runs: "42K"  },
    { name: "Spin to Brunch", scene: "streak",  kind: "streak",  ver: "v1.b", isDraft: false, src: "改编自 Streak Climber", updated: "更新 上周",     status: "灰度",     statusTone: "warn", brand: "Bibis Cafe", variants: 2, runs: "9.2K" },
    { name: "Lucky Tarot",    scene: "ladder",  kind: "ladder",  ver: "v0.3", isDraft: true,  src: "自创模板",            updated: "更新 5 天前",     status: "草稿",     statusTone: "warn", brand: "—",          variants: 1, runs: "2.8K" },
    { name: "Idol Match",     scene: "whale",   kind: "match",   ver: "v0.8", isDraft: true,  src: "改编自 Weekly Prophet", updated: "更新 11 月 02",  status: "审核中",   statusTone: "warn", brand: "Lazada",     variants: 2, runs: "4.8K" },
  ];

  const clones = [
    { nm: "Aria · Degen",        role: "主分身 · 币圈",   pct: 34, color: "var(--brand)",  trained: "2.4M tokens", missions: 18, mood: "happy" },
    { nm: "Aria · Soft",         role: "情感版 · 美妆",   pct: 62, color: "var(--warm)",   trained: "4.1M tokens", missions: 24, mood: "wink" },
    { nm: "Aria · Studio",       role: "工作室主持",     pct: 78, color: "var(--ok)",     trained: "5.6M tokens", missions: 31, mood: "happy" },
    { nm: "Aria · Night",        role: "深夜电台",       pct: 18, color: "#b03a72",       trained: "0.8M tokens", missions: 4,  mood: "thinking" },
  ];

  const templates = [
    { nm: "60s 涨跌预言局", cat: "竞猜", scene: "predict", tone: "p1", uses: 12, slots: ["标的", "奖池", "主持口播"], updated: "05/21", best: "Bybit · Pump or Dump", lift: "+18% CTR" },
    { nm: "7 日大赛榜单",   cat: "挑战", scene: "ladder",  tone: "p5", uses: 8,  slots: ["赛季主题", "奖品", "排行字段"],   updated: "05/19", best: "Lazada · Idol Match",  lift: "+12% D7" },
    { nm: "AI 分身陪聊房",   cat: "陪伴", scene: "wheel",   tone: "p3", uses: 6,  slots: ["分身", "主题", "开场白"],       updated: "05/16", best: "HyperX · ETH Spin",     lift: "+9% 停留" },
    { nm: "限时穿搭对决",   cat: "对比", scene: "match",   tone: "p4", uses: 4,  slots: ["品类", "投票项", "奖励"],       updated: "05/13", best: "Maybelline · Velvet Lip", lift: "+22% 互动" },
    { nm: "塔罗 + 抽签",     cat: "占卜", scene: "whale",   tone: "p2", uses: 3,  slots: ["主题牌阵", "分享文案"],            updated: "05/10", best: "Lucky Tarot",            lift: "—" },
    { nm: "答题闪击 100",    cat: "答题", scene: "streak",  tone: "p6", uses: 2,  slots: ["题库", "难度曲线", "奖励"],     updated: "05/06", best: "Bibis · Brunch Quiz",   lift: "+6% 完局" },
  ];

  return (
    <div className="page">
      <div className="page-h">
        <div>
          <h1>我的<em>资产</em></h1>
        </div>
        <div className="right">
          <button className="btn"><Icon name="upload" size={13}/> 导入</button>
        </div>
      </div>

      {/* TABS */}
      <div style={{
        marginTop: 28, marginBottom: 16,
        display: "flex", gap: 4, padding: 4,
        background: "var(--bg-2)",
        borderRadius: 99,
        width: "fit-content",
      }}>
        {[
          ["agentic",   "Agentic Playable", "var(--brand)"],
          ["playables", "普通 Playable",    "var(--ink-1)"],
          ["templates", "模板",             "var(--warm)"],
          ].map(([k, l, c]) => (
          k === "agentic" ? (
            <button key={k} onClick={() => setTab(k)} style={{
              padding: "7px 14px 7px 10px",
              background: tab === k ? "var(--ink-1)" : "transparent",
              borderRadius: 99,
              border: "none",
              fontSize: 12.5,
              fontWeight: 700,
              color: tab === k ? "white" : "var(--ink-3)",
              cursor: "default",
              boxShadow: tab === k ? "var(--sh-md)" : "none",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: tab === k ? "var(--warm)" : "var(--ink-4)", boxShadow: tab === k ? "0 0 8px var(--warm)" : "none" }}/>
              {l}
              <span style={{ fontSize: 9.5, fontFamily: "IBM Plex Mono, monospace", color: tab === k ? "var(--warm)" : "var(--ink-4)", fontWeight: 800 }}>{agentic.length}</span>
            </button>
          ) : (
          <button key={k} onClick={() => setTab(k)} style={{
            padding: "7px 16px",
            background: tab === k ? "var(--surface)" : "transparent",
            borderRadius: 99,
            border: "none",
            fontSize: 12.5,
            fontWeight: 700,
            color: tab === k ? c : "var(--ink-3)",
            cursor: "default",
            boxShadow: tab === k ? "var(--sh-sm)" : "none",
          }}>{l}{k === "templates" && (
              <span style={{ marginLeft: 6, fontSize: 9.5, fontFamily: "IBM Plex Mono, monospace", color: tab === k ? "var(--warm)" : "var(--ink-4)", fontWeight: 800 }}>{templates.length}</span>
            )}{k === "playables" && (
              <span style={{ marginLeft: 6, fontSize: 9.5, fontFamily: "IBM Plex Mono, monospace", color: tab === k ? "var(--brand)" : "var(--ink-4)", fontWeight: 800 }}>{playables.length}</span>
            )}</button>
          )
        ))}
      </div>

      {/* CONTENT */}
      {tab === "agentic" && (
        <div>
          {/* What-is intro strip — explains the upgrade from 普通 Playable */}
          <div className="card" style={{
            padding: "14px 18px",
            marginBottom: 16,
            display: "flex", alignItems: "center", gap: 14,
            background: "linear-gradient(95deg, var(--brand-soft) 0%, #fff 62%)",
            borderColor: "var(--brand-line)",
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "var(--ink-1)", color: "white",
              display: "grid", placeItems: "center", flexShrink: 0,
            }}>
              <Icon name="spark" size={16} color="var(--warm)"/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 14, lineHeight: 1.2 }}>
                Agentic Playable <span style={{ color: "var(--ink-3)", fontWeight: 600 }}>· 会自己跑实验、自己赚钱的数字员工</span>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 3, lineHeight: 1.5 }}>
                普通 Playable 升级而来。你设好<b style={{ color: "var(--ink-2)" }}>授权范围</b>，Forge 就在范围内自主调优、扩量、跑 A/B，越界才来找你确认。
              </div>
            </div>
            <span style={{ fontSize: 11, color: "var(--ink-3)", display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--ok)", boxShadow: "0 0 6px var(--ok)" }}/>
              {agentic.length} 个运行中
            </span>
          </div>

          <div className="g" style={{ gridTemplateColumns: "1fr", gap: 16 }}>
          {agentic.map((a, i) => (
            <div key={i} className="card lift" style={{
              padding: 0,
              overflow: "hidden",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 18,
              color: "var(--ink-1)",
              boxShadow: "var(--sh-sm)",
              display: "grid",
              gridTemplateColumns: "150px 1fr auto",
              gap: 0,
              alignItems: "stretch",
            }}>
              {/* PREVIEW: matching scene */}
              {(() => {
                const sc = (window.SCENES || {})[a.scene] || {};
                const SceneRender = sc.render;
                return (
                  <div style={{
                    position: "relative", overflow: "hidden",
                    borderRight: "1px solid var(--border)",
                    background: sc.bg || "#0e2a47",
                    backgroundImage: `linear-gradient(${sc.grid || "rgba(255,255,255,.08)"} 1px, transparent 1px), linear-gradient(90deg, ${sc.grid || "rgba(255,255,255,.08)"} 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                  }}>
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(220px 160px at 50% 45%, rgba(255,255,255,.06), transparent 60%)", pointerEvents: "none" }}/>
                    {SceneRender && (
                      <div style={{
                        position: "absolute", left: "50%", top: 18,
                        width: 138, height: 282,
                        transform: "translateX(-50%) scale(.66)", transformOrigin: "top center",
                        pointerEvents: "none",
                        filter: "drop-shadow(0 14px 24px rgba(0,0,0,.45))",
                      }}>
                        <SceneRender/>
                      </div>
                    )}
                  </div>
                );
              })()}
              {/* MAIN */}
              <div style={{ padding: "18px 24px", display: "flex", flexDirection: "column", gap: 13, minWidth: 0 }}>
                {/* header row */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Mascot size={32} mood={a.mood}/>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 21, letterSpacing: "-.01em", color: "var(--ink-1)" }}>{a.name}</span>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "3px 9px", background: "var(--ok-soft)", color: "var(--ok)",
                    borderRadius: 99, fontSize: 10.5, fontWeight: 700,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--ok)", boxShadow: "0 0 6px var(--ok)", animation: "pulse 2s ease-in-out infinite" }}/>
                    {a.status}
                  </span>
                  <span style={{ flex: 1 }}/>
                  <span style={{ fontSize: 11.5, color: "var(--ink-3)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <Icon name="crown" size={11} color="var(--warm)"/> {a.brand}
                    <span style={{ width: 3, height: 3, borderRadius: 99, background: "var(--ink-4)" }}/>
                    <span className="mono" style={{ fontSize: 10 }}>连续 {a.uptime}</span>
                  </span>
                </div>

                {/* growth bar — merges 代数 + 阶段 + 自主度 */}
                <GrowthBar gen={a.gen} autonomy={a.autonomy}/>

                {/* hero: net income + secondary stats + experiment chips */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 26, flexWrap: "wrap" }}>
                  <div>
                    <div className="mono" style={{ fontSize: 9.5, color: "var(--ink-4)", letterSpacing: ".06em", fontWeight: 700, marginBottom: 4 }}>净收入 · 累计</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ color: "var(--ok)", fontSize: 15 }}>▲</span>
                      <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 33, lineHeight: 1, letterSpacing: "-.015em", color: "var(--warm)" }}>
                        <LiveStat base={a.kpis[1].base} fmt="money" color="var(--warm)"/>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize: 9.5, color: "var(--ink-4)", letterSpacing: ".06em", fontWeight: 700 }}>完成局</div>
                    <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 17, lineHeight: 1, marginTop: 4, color: "var(--ink-1)" }}>
                      <LiveStat base={a.kpis[0].base} fmt="count" color="var(--ink-1)"/>
                    </div>
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="mono" style={{ fontSize: 9.5, color: "var(--ink-4)", letterSpacing: ".06em", fontWeight: 700, marginBottom: 5 }}>自主实验 · {a.experiments.length}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {a.experiments.map((e, j) => (
                        <span key={j} style={{
                          padding: "2px 8px", borderRadius: 99,
                          background: "var(--bg-2)", border: "1px solid var(--border)",
                          fontSize: 10.5, color: "var(--ink-2)", fontWeight: 600,
                          display: "inline-flex", alignItems: "center", gap: 4,
                        }}>
                          <span style={{ width: 5, height: 5, borderRadius: 99, background: "var(--brand)" }}/>{e}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* guardrails — the trust boundary */}
                <div style={{
                  display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 16px",
                  padding: "9px 12px", borderRadius: 10,
                  background: "var(--bg-1)", border: "1px solid var(--border)",
                }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, color: "var(--ok)", fontWeight: 800 }}>
                    <Icon name="check" size={12} color="var(--ok)" strokeWidth={2.6}/> 可自主
                  </span>
                  {a.guard.auto.map((g, j) => (
                    <span key={j} style={{ fontSize: 10.5, color: "var(--ink-2)" }}>{g}{j < a.guard.auto.length - 1 ? " ·" : ""}</span>
                  ))}
                  <span style={{ width: 1, height: 12, background: "var(--border-2)" }}/>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, color: "var(--warm)", fontWeight: 800 }}>
                    <Icon name="lock" size={11} color="var(--warm)"/> 需我确认
                  </span>
                  {a.guard.approve.map((g, j) => (
                    <span key={j} style={{ fontSize: 10.5, color: "var(--ink-2)" }}>{g}{j < a.guard.approve.length - 1 ? " ·" : ""}</span>
                  ))}
                </div>

                {/* decision feed — recent autonomous actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 1 }}>
                  <div className="mono" style={{ fontSize: 9, color: "var(--ink-4)", letterSpacing: ".08em", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 5 }}>
                    <Icon name="bolt" size={10} color="var(--brand)"/> FORGE 决策流
                  </div>
                  {a.timeline.map((row, j) => <DecisionRow key={j} row={row}/>)}
                </div>
              </div>

              {/* ACTIONS */}
              <div style={{
                padding: "18px 20px",
                borderLeft: "1px solid var(--border)",
                background: "var(--bg-1, #fafaff)",
                display: "flex", flexDirection: "column", gap: 6,
                justifyContent: "center",
                minWidth: 148,
              }}>
                <button className="btn warm sm" style={{ justifyContent: "center" }}>
                  <Icon name="eye" size={11} color="white"/> 进入控制台
                </button>
                {a.pending > 0 && (
                  <button className="btn sm" style={{
                    justifyContent: "center",
                    borderColor: "var(--warm-line, rgba(255,122,61,.4))",
                    color: "var(--warm)", background: "var(--warm-soft)", fontWeight: 700,
                  }}>
                    <Icon name="bell" size={11} color="var(--warm)"/> 待我确认
                    <span style={{
                      marginLeft: 2, minWidth: 16, height: 16, padding: "0 4px",
                      borderRadius: 99, background: "var(--warm)", color: "white",
                      fontSize: 9.5, fontWeight: 800, fontFamily: "IBM Plex Mono, monospace",
                      display: "inline-grid", placeItems: "center",
                    }}>{a.pending}</span>
                  </button>
                )}
                <button className="btn sm" style={{ justifyContent: "center" }}>
                  <Icon name="pause" size={11}/> 暂停
                </button>
                <button className="btn ghost sm" style={{ justifyContent: "center", padding: "5px" }}>
                  <Icon name="more" size={13}/>
                </button>
              </div>
            </div>
          ))}
          </div>
        </div>
      )}

      {tab === "templates" && (
        <div>
          {/* Templates intro strip */}
          <div className="card" style={{
            padding: "14px 18px",
            marginBottom: 16,
            display: "flex", alignItems: "center", gap: 14,
            background: "linear-gradient(95deg, var(--warm-soft) 0%, #fff 60%)",
            borderColor: "rgba(255,122,61,.25)",
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "var(--warm)", color: "white",
              display: "grid", placeItems: "center",
              boxShadow: "var(--sh-warm)",
            }}>
              <Icon name="layers" size={16} color="white"/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 14, lineHeight: 1.2 }}>
                复用模板 <span style={{ color: "var(--ink-3)", fontWeight: 600 }}>· 一键克隆为新 Playable</span>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 3 }}>
                把跑通的局面抽成模板，下次换品牌、换主题、换奖池只填几个槽位就能开局。
              </div>
            </div>
            <button className="btn warm sm"><Icon name="plus" size={11} color="white"/> 把当前局存为模板</button>
          </div>

          <div className="g g-3">
            {templates.map((t, i) => {
              const sc = (window.SCENES || {})[t.scene] || {};
              const SceneRender = sc.render;
              return (
              <div key={i} className="card lift" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{
                  height: 150, padding: "12px 14px",
                  position: "relative",
                  overflow: "hidden",
                  background: sc.bg || "#0e2a47",
                  backgroundImage: `linear-gradient(${sc.grid || "rgba(255,255,255,.08)"} 1px, transparent 1px), linear-gradient(90deg, ${sc.grid || "rgba(255,255,255,.08)"} 1px, transparent 1px)`,
                  backgroundSize: "26px 26px",
                }}>
                  {/* glow */}
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(300px 180px at 30% 40%, rgba(255,255,255,.06), transparent 60%)", pointerEvents: "none" }}/>

                  {/* scaled mini-phone peeking from right */}
                  {SceneRender && (
                    <div style={{
                      position: "absolute", right: 8, top: 18,
                      width: 138, height: 282,
                      transform: "scale(.62)", transformOrigin: "top right",
                      pointerEvents: "none",
                      filter: "drop-shadow(0 12px 22px rgba(0,0,0,.4))",
                    }}>
                      <SceneRender/>
                    </div>
                  )}

                  <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{
                      padding: "2px 8px",
                      background: "rgba(0,0,0,.42)",
                      color: "rgba(255,255,255,.9)",
                      borderRadius: 99,
                      fontSize: 10.5, fontWeight: 700,
                      display: "inline-flex", alignItems: "center", gap: 4,
                      border: "1px solid rgba(255,255,255,.1)",
                    }}>
                      <Icon name="layers" size={10} color="rgba(255,255,255,.9)"/> 模板
                    </span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>· {t.cat}</span>
                  </div>
                  <div style={{
                    position: "absolute", left: 14, bottom: 12,
                    fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 22,
                    lineHeight: 1.1, letterSpacing: "-.01em", color: "white",
                    textShadow: "0 2px 12px rgba(0,0,0,.5)",
                    maxWidth: "60%",
                  }}>
                    {t.nm}
                  </div>
                  <div style={{ position: "absolute", top: 10, right: 10 }}>
                    <button className="btn sm" style={{ background: "rgba(0,0,0,.4)", borderColor: "rgba(255,255,255,.12)", color: "white", padding: "3px 8px" }}>
                      <Icon name="more" size={12} color="white"/>
                    </button>
                  </div>
                </div>
                <div style={{ padding: "14px 16px 16px" }}>
                  {/* Slots */}
                  <div className="mono" style={{ fontSize: 9.5, color: "var(--ink-4)", letterSpacing: ".08em", fontWeight: 700, marginBottom: 6 }}>
                    可填槽位 · {t.slots.length}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
                    {t.slots.map((s, j) => (
                      <span key={j} style={{
                        padding: "2px 7px",
                        background: "var(--bg-2)",
                        border: "1px dashed var(--border-2)",
                        borderRadius: 6,
                        fontSize: 10.5,
                        color: "var(--ink-2)",
                        fontFamily: "IBM Plex Mono, monospace",
                      }}>{`{${s}}`}</span>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                    padding: "8px 10px",
                    background: "var(--bg-1)",
                    borderRadius: 8,
                    marginBottom: 12,
                  }}>
                    <div>
                      <div className="mono" style={{ fontSize: 9.5, color: "var(--ink-4)", letterSpacing: ".06em", fontWeight: 700 }}>已复用</div>
                      <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 16, lineHeight: 1, marginTop: 3 }}>
                        {t.uses}<span style={{ fontSize: 10, color: "var(--ink-3)", marginLeft: 3, fontWeight: 600 }}>次</span>
                      </div>
                    </div>
                    <div>
                      <div className="mono" style={{ fontSize: 9.5, color: "var(--ink-4)", letterSpacing: ".06em", fontWeight: 700 }}>最佳效果</div>
                      <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 13, lineHeight: 1.05, marginTop: 3, color: t.lift === "—" ? "var(--ink-3)" : "var(--ok)" }}>
                        {t.lift}
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: 10.5, color: "var(--ink-3)", marginBottom: 12, display: "flex", alignItems: "center", gap: 5 }}>
                    <Icon name="crown" size={10} color="var(--ink-4)"/>
                    <span style={{ color: "var(--ink-4)" }}>最佳实例</span>
                    <span style={{ color: "var(--ink-2)", fontWeight: 600 }}>{t.best}</span>
                  </div>

                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn sm" style={{ flex: 1, justifyContent: "center" }}>
                      <Icon name="eye" size={11}/> 预览
                    </button>
                    <button className="btn brand sm" style={{ flex: 1.4, justifyContent: "center" }}>
                      <Icon name="plus" size={11} color="white"/> 用此模板开局
                    </button>
                  </div>
                </div>
              </div>
              );
            })}

            {/* Create template card */}
            <div className="card lift" style={{
              padding: 22,
              border: "1.5px dashed var(--border-2)",
              background: "var(--bg-1)",
              display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: 10,
              minHeight: 240,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "var(--warm-soft)", color: "var(--warm)",
                display: "grid", placeItems: "center",
              }}>
                <Icon name="plus" size={18} color="var(--warm)"/>
              </div>
              <div>
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 18, lineHeight: 1.15, marginBottom: 4 }}>
                  抽一个新模板
                </div>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.5 }}>
                  选一个跑得好的 Playable，圈出可变部分，<br/>系统会自动生成槽位和默认副本。
                </div>
              </div>
              <button className="btn warm sm" style={{ marginTop: "auto" }}>
                <Icon name="layers" size={11} color="white"/> 从已有 Playable 抽取
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === "playables" && (
        <div className="g g-3">
          {playables.map((p, i) => (
            <PreviewCard
              key={i}
              type="playable"
              scene={p.scene}
              kind={p.kind}
              title={`${p.name} · ${p.ver}`}
              version={p.ver}
              isDraft={p.isDraft}
              src={p.src}
              updated={p.updated}
              status={p.status}
              statusTone={p.statusTone}
              stats={[
                { k: "变体",     v: p.variants },
                { k: "累计完成", v: p.runs },
                { k: "关联品牌", v: p.brand },
              ]}
              primaryLabel="升级 Agentic"
              secondaryLabel="预览"
            />
          ))}
        </div>
      )}
    </div>
  );
}

window.Assets = Assets;
