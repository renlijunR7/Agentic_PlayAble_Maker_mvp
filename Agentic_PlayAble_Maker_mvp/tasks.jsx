// AirvanaMaker v2 — 历史对话 (Conversation History)
// Every Agentic Workbench session you've had with Forge: the intent, what it produced, and where it stands.

function Tasks({ goto }) {
  const [filter, setFilter] = React.useState("all");

  const convos = [
    {
      kind: "active",
      intent: "帮我做一个针对币圈 KOL 的 Playable，重点是分享率，60 秒一局",
      asset: "Pump or Dump · v1.d",
      mood: "happy",
      last: { who: "forge", text: "已把 TikTok ID 的 CTA 前移到 35s，完成率 +4.2pt，要不要再跑一轮 A/B？" },
      rounds: 14, credits: 532, when: "今天 09:14", dur: "活跃 2 小时",
      scene: "predict",
    },
    {
      kind: "review",
      intent: "为 Velvet Lip 生成一个 US 市场的冷调变体",
      asset: "Velvet Lip · v6",
      mood: "wink",
      last: { who: "forge", text: "已生成 plum 暗紫型变体，CTR 预测 +2.4pt，等你审核后即可灰度。" },
      rounds: 8, credits: 304, when: "昨天 22:32", dur: "待你审核",
      scene: "match",
    },
    {
      kind: "active",
      intent: "做一个 7 日预言大赛，奖金池 5000 USDT，要能拉新",
      asset: "7 日大赛 · 草稿",
      mood: "thinking",
      last: { who: "me", text: "排行榜字段加上「连胜天数」，再给前三名特殊奖励。" },
      rounds: 5, credits: 190, when: "前天 16:40", dur: "活跃 1 天前",
      scene: "ladder",
    },
    {
      kind: "published",
      intent: "给 ETH Spin 换一套更刺激的转盘视觉 + 高频小奖",
      asset: "ETH Spin · v2.1",
      mood: "happy",
      last: { who: "forge", text: "已发布到 8 平台，HyperX 联名生效，首日完成局 12K。" },
      rounds: 6, credits: 228, when: "05/16", dur: "已发布 · 运营中",
      scene: "wheel",
    },
    {
      kind: "draft",
      intent: "把塔罗主题做成分享驱动的玄学竞猜局",
      asset: "Lucky Tarot · v0.3",
      mood: "cool",
      last: { who: "forge", text: "已出 3 个主题牌阵方案，等你挑一个继续打磨。" },
      rounds: 3, credits: 114, when: "05/13", dur: "草稿 · 未发布",
      scene: "ladder",
    },
    {
      kind: "archived",
      intent: "孵化一个菲律宾深夜电台风格的塔加洛语分身",
      asset: "Aria · Manila",
      mood: "happy",
      last: { who: "forge", text: "分身已上线首夜电台，首周入账 $228，会话已归档。" },
      rounds: 9, credits: 342, when: "05/06", dur: "已归档",
      scene: "whale",
    },
  ];

  const kindMeta = {
    active:    { ink: "var(--brand)", bg: "var(--brand-soft)", lbl: "进行中" },
    review:    { ink: "var(--warm)",  bg: "var(--warm-soft)",  lbl: "待审核" },
    published: { ink: "var(--ok)",    bg: "var(--ok-soft)",    lbl: "已发布" },
    draft:     { ink: "var(--ink-2)", bg: "var(--bg-2)",       lbl: "草稿" },
    archived:  { ink: "var(--ink-3)", bg: "var(--bg-2)",       lbl: "已归档" },
  };

  const counts = {
    all:       convos.length,
    active:    convos.filter(c => c.kind === "active").length,
    review:    convos.filter(c => c.kind === "review").length,
    published: convos.filter(c => c.kind === "published").length,
    draft:     convos.filter(c => c.kind === "draft").length,
  };
  const totalRounds = convos.reduce((s, c) => s + c.rounds, 0);
  const totalCredits = convos.reduce((s, c) => s + c.credits, 0);

  const filtered = filter === "all" ? convos : convos.filter(c => c.kind === filter);

  return (
    <div className="page">
      <div className="page-h">
        <div>
          <h1>历史<em>对话</em></h1>
        </div>
        <div className="right">
          <button className="btn brand" onClick={() => goto("workbench")}><Icon name="plus" size={13} color="white"/> 新建对话</button>
        </div>
      </div>

      {/* CONVERSATION LIST */}
      <div className="card" style={{ marginTop: 8 }}>
        <div className="card-bd" style={{ padding: 0 }}>
          {filtered.map((c, i) => {
            const km = kindMeta[c.kind];
            const sc = (window.SCENES || {})[c.scene] || {};
            return (
              <div key={i} className="lift" style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: 18,
                alignItems: "center",
                padding: "18px 20px",
                borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none",
                cursor: "default",
                background: c.kind === "review" ? "linear-gradient(90deg, var(--warm-soft) 0%, transparent 60%)" : "transparent",
              }}>
                {/* mascot bubble */}
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: sc.bg || "var(--brand-soft)",
                  display: "grid", placeItems: "center",
                  flexShrink: 0, position: "relative", overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${sc.grid || "rgba(255,255,255,.1)"} 1px, transparent 1px), linear-gradient(90deg, ${sc.grid || "rgba(255,255,255,.1)"} 1px, transparent 1px)`, backgroundSize: "12px 12px" }}/>
                  <div style={{ position: "relative" }}><Mascot size={34} mood={c.mood}/></div>
                </div>

                {/* main */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <span style={{
                      fontSize: 9.5, fontWeight: 800, padding: "2px 7px", borderRadius: 99,
                      background: km.bg, color: km.ink, letterSpacing: ".05em",
                      fontFamily: "IBM Plex Mono, monospace",
                      display: "inline-flex", alignItems: "center", gap: 4,
                    }}>
                      {c.kind === "active" && <span style={{ width: 5, height: 5, borderRadius: 99, background: km.ink, animation: "pulse 2s ease-in-out infinite" }}/>}
                      {km.lbl}
                    </span>
                    <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: ".04em" }}>· {c.asset}</span>
                  </div>
                  {/* intent (the opening message) */}
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink-1)", marginBottom: 6, letterSpacing: "-.005em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    “{c.intent}”
                  </div>
                  {/* last message preview */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.45, marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, color: c.last.who === "forge" ? "var(--brand)" : "var(--ink-2)", flexShrink: 0 }}>
                      {c.last.who === "forge" ? "Forge:" : "你:"}
                    </span>
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.last.text}</span>
                  </div>
                  {/* meta */}
                  <div style={{ display: "flex", gap: 10, fontSize: 11, color: "var(--ink-4)", fontFamily: "IBM Plex Mono, monospace" }}>
                    <span>{c.rounds} 轮对话</span>
                    <span style={{ width: 3, height: 3, borderRadius: 99, background: "var(--ink-4)", alignSelf: "center" }}/>
                    <span>{c.credits} P</span>
                    <span style={{ width: 3, height: 3, borderRadius: 99, background: "var(--ink-4)", alignSelf: "center" }}/>
                    <span>{c.when}</span>
                  </div>
                </div>

                {/* right: status + actions */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, minWidth: 130 }}>
                  <div style={{ fontSize: 11.5, color: km.ink, fontWeight: 700 }}>{c.dur}</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {c.kind === "review" ? (
                      <button className="btn warm sm" onClick={() => goto("workbench")}><Icon name="eye" size={11} color="white"/> 审核</button>
                    ) : c.kind === "archived" ? (
                      <button className="btn sm">查看产出</button>
                    ) : (
                      <button className="btn brand sm" onClick={() => goto("workbench")}><Icon name="spark" size={11} color="white"/> 继续对话</button>
                    )}
                    <button className="btn sm ghost" style={{ padding: "5px 7px" }}><Icon name="more" size={12}/></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

window.Tasks = Tasks;
