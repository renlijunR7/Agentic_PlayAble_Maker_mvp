// AirvanaMaker v2 — 模板中心 (Templates Center)
// Promoted out of "我的资产" tabs into its own top-level destination.
// All reusable Playable templates — sortable, categorized, with usage stats.

function Templates({ goto }) {
  const [cat, setCat] = React.useState("all");
  const [view, setView] = React.useState("grid");  // grid | list

  const templates = [
    { nm: "60s 涨跌预言局",  scene: "predict", kind: "predict", cat: "crypto",  uses: 12, author: "Forge 官方", ver: "v3.2", isDraft: false, updated: "更新 今日 14:20", desc: "BTC/ETH 60 秒方向竞猜，连胜锁定 + USDT 微奖励。",                forks: 4, links: 6, partner: "HyperX",   status: "正在使用", statusTone: "ok",   popular: true },
    { nm: "Token Spin · 主流币", scene: "wheel",   kind: "wheel",   cat: "crypto",  uses: 8,  author: "改编自 Crypto Wheel", ver: "v1.4", isDraft: false, updated: "更新 2 天前",     desc: "转盘随机主流币 + KOL 解说 + 高频小奖。",                          forks: 1, links: 3, partner: "HyperX",   status: "正在使用", statusTone: "ok",   popular: true  },
    { nm: "Whale Watch · 跟单", scene: "whale",   kind: "whale",   cat: "crypto",  uses: 6,  author: "自创模板",            ver: "v0.8", isDraft: true,  updated: "更新 5 天前",     desc: "跟单大鲸鱼地址，预测下一笔买卖，社群分享神器。",                  forks: 0, links: 1, partner: "HyperX",   status: "草稿",     statusTone: "warn", popular: false },
    { nm: "Streak Climber 5",  scene: "streak",  kind: "streak",  cat: "campaign",uses: 4,  author: "改编自 Hot Streak",   ver: "v2.0", isDraft: false, updated: "更新 上周",       desc: "连胜越多奖励指数级放大，强成瘾节奏。",                              forks: 2, links: 2, partner: "HyperX",   status: "归档",     statusTone: "",     popular: false },
    { nm: "Token Pair · DEX",  scene: "match",   kind: "match",   cat: "crypto",  uses: 7,  author: "改编自 Pair Match",   ver: "v1.0", isDraft: false, updated: "更新 10 月 12",    desc: "Token 配对消除 · COMBO 越多越多倍数。",                             forks: 0, links: 1, partner: "HyperX",   status: "正在使用", statusTone: "ok",   popular: true  },
    { nm: "7 日预言大赛",       scene: "ladder",  kind: "ladder",  cat: "campaign",uses: 3,  author: "改编自 Weekly Prophet", ver: "v0.3", isDraft: true, updated: "更新 11 月 02",   desc: "7 日累计积分榜，CPA 分成 30%。",                                  forks: 0, links: 0, partner: "HyperX",   status: "草稿",     statusTone: "warn", popular: false },
    { nm: "AI 分身陪聊房",      scene: "wheel",   kind: "chat",    cat: "social",  uses: 6,  author: "自创模板",            ver: "v1.4", isDraft: false, updated: "更新 5 月 15",    desc: "把你的 Streamer 分身挂上去,自动直播解说 Playable。",              forks: 2, links: 5, partner: "—",        status: "正在使用", statusTone: "ok",   popular: false },
    { nm: "限时穿搭对决",       scene: "match",   kind: "vote",    cat: "social",uses: 4, author: "玖月互娱",            ver: "v1.0", isDraft: false, updated: "更新 5 月 12",    desc: "投票淘汰 + 反转机制,美妆 KOL 转化神器。",                        forks: 1, links: 2, partner: "Maybelline", status: "正在使用", statusTone: "ok", popular: false },
    { nm: "塔罗 + 抽签",        scene: "ladder",  kind: "tarot",   cat: "social",  uses: 3,  author: "Forge 官方",          ver: "v1.6", isDraft: false, updated: "更新 5 月 10",    desc: "玄学竞猜 + 社交分享,高传播性。",                                    forks: 0, links: 1, partner: "—",        status: "正在使用", statusTone: "ok",   popular: false },
    { nm: "答题闪击 100",       scene: "streak",  kind: "quiz",    cat: "edu",     uses: 2,  author: "Forge 官方",          ver: "v2.1", isDraft: false, updated: "更新 5 月 08",    desc: "限时百题答题,适合教育类 KOL 引流。",                                forks: 1, links: 1, partner: "—",        status: "正在使用", statusTone: "ok",   popular: false },
    { nm: "Memecoin 战神",     scene: "predict", kind: "meme",    cat: "crypto",  uses: 7,  author: "自创模板",            ver: "v2.0", isDraft: false, updated: "更新 5 月 06",    desc: "今日 Meme 谁先翻倍 · 投票淘汰制,TG 群组转化神器。",              forks: 3, links: 4, partner: "—",        status: "正在使用", statusTone: "ok",   popular: true },
    { nm: "Bybit 联名套件",    scene: "whale",   kind: "brand",   cat: "campaign",uses: 2,  author: "Bybit",               ver: "v1.0", isDraft: false, updated: "更新 4 月 25",    desc: "Bybit 官方联名模板,品牌方资源包 + 分成机制。",                       forks: 0, links: 2, partner: "Bybit",    status: "正在使用", statusTone: "ok",   popular: false },
  ];

  const catMeta = {
    all:      { l: "全部",      n: templates.length },
    crypto:   { l: "数字货币",  n: templates.filter(t => t.cat === "crypto").length },
    campaign: { l: "品牌联动",  n: templates.filter(t => t.cat === "campaign").length },
    social:   { l: "社群互动",  n: templates.filter(t => t.cat === "social").length },
    edu:      { l: "教育答题",  n: templates.filter(t => t.cat === "edu").length },
  };

  const filtered = cat === "all" ? templates : templates.filter(t => t.cat === cat);

  return (
    <div className="page">
      <div className="page-h">
        <div>
          <h1>模板<em>中心</em></h1>
        </div>
        <div className="sub"></div>
        <div className="right">
          <button className="btn"><Icon name="upload" size={13}/> 上传模板</button>
        </div>
      </div>

      {/* FILTER + VIEW TOGGLE */}
      <div style={{
        marginTop: 28, marginBottom: 16,
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <div style={{
          display: "flex", gap: 4, padding: 4,
          background: "var(--bg-2)",
          borderRadius: 99,
        }}>
          {Object.entries(catMeta).map(([k, m]) => (
            <button key={k} onClick={() => setCat(k)} style={{
              padding: "6px 13px",
              background: cat === k ? "var(--surface)" : "transparent",
              borderRadius: 99,
              border: "none",
              fontSize: 12, fontWeight: 700,
              color: cat === k ? "var(--ink-1)" : "var(--ink-3)",
              cursor: "default",
              boxShadow: cat === k ? "var(--sh-sm)" : "none",
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: "inherit",
            }}>
              {m.l}
              <span className="mono" style={{ fontSize: 9.5, fontWeight: 800, color: cat === k ? "var(--brand)" : "var(--ink-4)" }}>{m.n}</span>
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }}/>

        <div style={{
          display: "flex", gap: 2, padding: 3,
          background: "var(--bg-2)",
          borderRadius: 8,
        }}>
          {[["grid", "layers"], ["list", "filter"]].map(([k, ic]) => (
            <button key={k} onClick={() => setView(k)} style={{
              padding: "5px 8px",
              background: view === k ? "var(--surface)" : "transparent",
              border: "none",
              borderRadius: 6,
              cursor: "default",
              boxShadow: view === k ? "var(--sh-sm)" : "none",
              display: "grid", placeItems: "center",
            }}>
              <Icon name={ic} size={13} color={view === k ? "var(--ink-1)" : "var(--ink-3)"}/>
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      {view === "grid" ? (
        <div className="g g-3">
          {filtered.map((t, i) => (
            <PreviewCard
              key={i}
              type="template"
              scene={t.scene}
              kind={t.kind}
              title={`${t.nm} · ${t.ver}`}
              version={t.ver}
              isDraft={t.isDraft}
              src={t.author}
              updated={t.updated}
              status={t.status || (t.isDraft ? "草稿" : "正在使用")}
              statusTone={t.statusTone}
              stats={[
                { k: "分叉",          v: t.forks },
                { k: "关联 Playable", v: t.links },
                { k: "下次复用",       v: t.partner },
              ]}
              primaryLabel="用此模板创作"
              secondaryLabel="编辑模板"
              onPrimary={() => goto("workbench")}
            />
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="card-bd" style={{ padding: 0 }}>
            {filtered.map((t, i, arr) => (
              <div key={i} className="lift" style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto auto auto",
                gap: 16,
                alignItems: "center",
                padding: "14px 18px",
                borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: (SCENES[t.scene] || SCENES.predict).bg,
                  display: "grid", placeItems: "center",
                  flexShrink: 0,
                  border: "1px solid rgba(255,255,255,.06)",
                }}>
                  <Icon name="layers" size={16} color="rgba(255,255,255,.7)"/>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 700 }}>{t.nm}</span>
                    {t.popular && <span className="tag dark" style={{ fontSize: 9 }}>★ HOT</span>}
                    <span className="mono" style={{ color: "var(--brand)", background: "var(--brand-soft)", padding: "1px 6px", borderRadius: 99, fontSize: 9.5, fontWeight: 700 }}>{t.ver}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.4 }}>{t.desc}</div>
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", minWidth: 80 }}>{t.author}</div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", minWidth: 60, textAlign: "right" }}>复用 <b style={{ color: "var(--ink-1)" }}>{t.uses}</b></div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button className="btn sm"><Icon name="eye" size={11}/> 预览</button>
                  <button className="btn brand sm" onClick={() => goto("workbench")}><Icon name="spark" size={11} color="white"/> 套用</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

window.Templates = Templates;
