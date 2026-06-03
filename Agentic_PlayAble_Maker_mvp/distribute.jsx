// AirvanaMaker v2 — 发布 (Distribute)
// Cross-platform distribution status, trend chart, deploy actions.

function Distribute({ goto }) {
  const platforms = [
    { id: "tiktok", nm: "TikTok",     region: "ID / VN / TH",    status: "运营中", plays: 12480, earn: 184.50, ctr: 12.4, share: 18.2, badge: "主战场" },
    { id: "ins",    nm: "Instagram",  region: "US / BR",          status: "运营中", plays: 6240,  earn: 86.20,  ctr: 9.8,  share: 12.4 },
    { id: "yt",     nm: "YouTube",    region: "Global",           status: "运营中", plays: 3820,  earn: 38.60,  ctr: 7.2,  share: 6.8 },
    { id: "x",      nm: "X / Twitter",region: "Crypto Twitter",   status: "运营中", plays: 1620,  earn: 15.20,  ctr: 5.4,  share: 22.4, badge: "高分享" },
    { id: "fb",     nm: "Facebook",   region: "ID",                status: "暂停",   plays: 0,     earn: 0,      ctr: 0,    share: 0 },
    { id: "snap",   nm: "Snapchat",   region: "US",                status: "待审",   plays: 0,     earn: 0,      ctr: 0,    share: 0 },
  ];

  const upcoming = [
    { nm: "Telegram 群组",  region: "印尼币圈 12 群", eta: "1 小时后", action: "等待 Forge 同步素材" },
    { nm: "Mastodon",        region: "Crypto Twitter 镜像", eta: "今晚 22:00",  action: "审核中 · 合规检测" },
    { nm: "Bybit App 嵌入",  region: "全球 KYC 用户",      eta: "需品牌方确认", action: "Bybit 已收到 v1.c 大赛草稿" },
  ];

  return (
    <div className="page">
      <div className="page-h">
        <div>
          <h1>全球<em>分发</em></h1>
        </div>
        <div className="sub">8 个平台 · 实时同步状态。Forge 会按地域选择最佳投放时机，所有违规内容上线前会先经合规复核。</div>
        <div className="right">
          <button className="btn"><Icon name="filter" size={13}/> Pump or Dump</button>
          <button className="btn"><Icon name="refresh" size={13}/> 刷新</button>
          <button className="btn warm"><Icon name="rocket" size={13} color="white"/> 一键扩量</button>
        </div>
      </div>

      {/* KPI ROW */}
      <div className="g g-4">
        {[
          { lbl: "今日完成局",   v: "24,180", u: "",    d: "+38% vs 昨",     ic: "fire",  c: "var(--warm)",  bg: "var(--warm-soft)" },
          { lbl: "今日收入",     v: "$324",   u: ".50", d: "+12% vs 昨",     ic: "coins", c: "var(--ok)",    bg: "var(--ok-soft)" },
          { lbl: "活跃平台",     v: "4",      u: "/8",  d: "2 待审 · 1 暂停", ic: "globe", c: "var(--brand)", bg: "var(--brand-soft)" },
          { lbl: "待扩量地区",   v: "3",      u: "个",  d: "Forge 已规划",   ic: "rocket",c: "#b03a72",       bg: "#fcd1e1" },
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

      {/* MAIN: platforms table + upcoming */}
      <div className="g" style={{ marginTop: 24, gridTemplateColumns: "1.45fr 1fr" }}>
        {/* Platforms table */}
        <div className="card">
          <div className="card-hd">
            <h3>分发到 <em style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, color: "var(--brand)" }}>8</em> 个平台</h3>
            <span className="sub">实时数据 · 30 秒刷新</span>
            <div className="right">
              <button className="btn sm"><Icon name="plus" size={11}/> 新增平台</button>
            </div>
          </div>
          <div className="card-bd" style={{ paddingTop: 0 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
              <thead>
                <tr style={{ color: "var(--ink-3)", fontSize: 10.5, letterSpacing: ".08em" }}>
                  <th style={{ textAlign: "left", padding: "10px 0", fontWeight: 700, fontFamily: "IBM Plex Mono, monospace", textTransform: "uppercase" }}>平台</th>
                  <th style={{ textAlign: "right", padding: "10px 0", fontWeight: 700, fontFamily: "IBM Plex Mono, monospace", textTransform: "uppercase" }}>完成局</th>
                  <th style={{ textAlign: "right", padding: "10px 0", fontWeight: 700, fontFamily: "IBM Plex Mono, monospace", textTransform: "uppercase" }}>收入</th>
                  <th style={{ textAlign: "right", padding: "10px 0", fontWeight: 700, fontFamily: "IBM Plex Mono, monospace", textTransform: "uppercase" }}>CTR</th>
                  <th style={{ textAlign: "right", padding: "10px 0", fontWeight: 700, fontFamily: "IBM Plex Mono, monospace", textTransform: "uppercase" }}>分享</th>
                  <th style={{ width: 30 }}></th>
                </tr>
              </thead>
              <tbody>
                {platforms.map((p) => {
                  const dim = p.status !== "运营中";
                  return (
                    <tr key={p.id} style={{ borderTop: "1px solid var(--border)", opacity: dim ? .55 : 1 }}>
                      <td style={{ padding: "14px 0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: 9,
                            background: "var(--bg-2)",
                            display: "grid", placeItems: "center",
                          }}>
                            <Brand name={p.id} size={18}/>
                          </div>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <span style={{ fontSize: 13, fontWeight: 700 }}>{p.nm}</span>
                              {p.badge && (
                                <span style={{
                                  fontSize: 9.5, fontWeight: 700,
                                  padding: "1px 6px",
                                  borderRadius: 99,
                                  background: p.badge === "主战场" ? "var(--ink-1)" : "var(--brand-soft)",
                                  color: p.badge === "主战场" ? "white" : "var(--brand)",
                                  letterSpacing: ".02em",
                                }}>{p.badge}</span>
                              )}
                            </div>
                            <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", marginTop: 1 }}>{p.region}</div>
                          </div>
                          <span className={`tag ${p.status === "运营中" ? "ok" : "warn"}`} style={{ marginLeft: 6 }}>{p.status}</span>
                        </div>
                      </td>
                      <td className="mono" style={{ textAlign: "right", fontWeight: 700, padding: "14px 0" }}>{p.plays.toLocaleString()}</td>
                      <td className="mono" style={{ textAlign: "right", fontWeight: 700, padding: "14px 0", color: p.earn > 0 ? "var(--warm)" : "var(--ink-4)" }}>
                        {p.earn > 0 ? `$${p.earn.toFixed(2)}` : "—"}
                      </td>
                      <td className="mono" style={{ textAlign: "right", padding: "14px 0" }}>{p.ctr > 0 ? `${p.ctr}%` : "—"}</td>
                      <td className="mono" style={{ textAlign: "right", padding: "14px 0" }}>{p.share > 0 ? `${p.share}%` : "—"}</td>
                      <td style={{ textAlign: "right" }}>
                        <button className="btn sm ghost" style={{ padding: "3px 6px" }}>
                          <Icon name="more" size={12}/>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming distribute */}
        <div className="card">
          <div className="card-hd">
            <h3>即将分发</h3>
            <span className="sub">Forge 规划的下一波</span>
            <div className="right">
              <button className="btn sm ghost"><Icon name="more" size={12}/></button>
            </div>
          </div>
          <div className="card-bd" style={{ paddingTop: 4, display: "flex", flexDirection: "column", gap: 10 }}>
            {upcoming.map((u, i) => (
              <div key={i} style={{
                padding: 14,
                background: "var(--bg-2)",
                borderRadius: 12,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{u.nm}</div>
                  <span className="mono" style={{
                    fontSize: 10, color: "var(--brand)",
                    background: "var(--brand-soft)",
                    padding: "2px 7px", borderRadius: 99, fontWeight: 700,
                  }}>{u.eta}</span>
                </div>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginBottom: 8 }}>{u.region}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--ink-2)" }}>
                  <Icon name="bolt" size={11} color="var(--brand)"/>
                  {u.action}
                </div>
              </div>
            ))}

            <div style={{
              padding: 14,
              border: "1.5px dashed var(--border-2)",
              borderRadius: 12,
              display: "flex", alignItems: "center", gap: 10,
              color: "var(--ink-3)",
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: "var(--brand-soft)", color: "var(--brand)",
                display: "grid", placeItems: "center",
              }}>
                <Icon name="plus" size={14} color="var(--brand)"/>
              </div>
              <div style={{ fontSize: 12.5 }}>
                <div style={{ fontWeight: 700, color: "var(--ink-1)" }}>计划新分发</div>
                <div style={{ fontSize: 10.5, marginTop: 1 }}>选择平台 + 时间 + 变体</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trend chart */}
      <div className="card" style={{ marginTop: 24 }}>
        <div className="card-hd">
          <h3>过去 7 天 — 完成局 / 收入趋势</h3>
          <div className="right" style={{ gap: 8 }}>
            <span className="tag brand"><span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--brand)", display: "inline-block" }}/> 完成局</span>
            <span className="tag warm"><span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--warm)", display: "inline-block" }}/> 收入</span>
            <button className="btn sm">7 日</button>
            <button className="btn sm ghost">30 日</button>
            <button className="btn sm ghost">90 日</button>
          </div>
        </div>
        <div className="card-bd" style={{ height: 220, position: "relative" }}>
          <svg viewBox="0 0 700 180" preserveAspectRatio="none" style={{ width: "100%", height: 180 }}>
            <defs>
              <linearGradient id="dist-plays" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5b4dff" stopOpacity=".25"/>
                <stop offset="100%" stopColor="#5b4dff" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map(i => (
              <line key={i} x1="0" x2="700" y1={45 * i + 15} y2={45 * i + 15} stroke="var(--border)" strokeDasharray="3 4"/>
            ))}
            <path d="M 0 130 L 100 110 L 200 120 L 300 90 L 400 80 L 500 60 L 600 50 L 700 30 L 700 180 L 0 180 Z" fill="url(#dist-plays)"/>
            <path d="M 0 130 L 100 110 L 200 120 L 300 90 L 400 80 L 500 60 L 600 50 L 700 30" fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M 0 150 L 100 140 L 200 145 L 300 120 L 400 115 L 500 95 L 600 85 L 700 65" fill="none" stroke="var(--warm)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            {[[0,130],[100,110],[200,120],[300,90],[400,80],[500,60],[600,50],[700,30]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="white" stroke="var(--brand)" strokeWidth="2"/>
            ))}
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 11, color: "var(--ink-3)", fontFamily: "IBM Plex Mono, monospace" }}>
            {["05/15", "05/16", "05/17", "05/18", "05/19", "05/20", "05/21", "今天"].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

window.Distribute = Distribute;
