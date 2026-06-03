// AirvanaMaker v2 — Wallet · Points · Subscription
// Big dark balance hero · earnings breakdown · transaction stream

/* ─────────────────────────────────────────────────────
   收益明细 TAB
   ───────────────────────────────────────────────────── */
function EarningsTab() {
  const months = [
    { m: "3 月",  v: 2.4 }, { m: "4 月",  v: 3.1 }, { m: "5 月",  v: 4.0 },
    { m: "6 月",  v: 3.6 }, { m: "7 月",  v: 5.2 }, { m: "8 月",  v: 6.4 },
    { m: "9 月",  v: 3.84, hi: true },
  ];
  const maxM = Math.max(...months.map(m => m.v));

  const brands = [
    { n: "Lumière",         logo: "L", c: "#b03a72", earned: 8240, share: 38 },
    { n: "Nova Sneakers",   logo: "N", c: "#5b4dff", earned: 4880, share: 22 },
    { n: "HyperX",          logo: "H", c: "#3c64c5", earned: 3120, share: 14 },
    { n: "Maybelline",      logo: "M", c: "#ff7a3d", earned: 2860, share: 13 },
    { n: "Bybit",           logo: "B", c: "#0a1f3c", earned: 1980, share: 9 },
    { n: "其他",            logo: "·", c: "var(--ink-3)", earned: 840, share: 4 },
  ];

  const playables = [
    { n: "Velvet Lip",       brand: "Lumière",       runs: "248K", earnings: "+$4,820" },
    { n: "Nova Air-Burst",   brand: "Nova Sneakers", runs: "186K", earnings: "+$3,640" },
    { n: "Pump or Dump",     brand: "HyperX",        runs: "164K", earnings: "+$2,880" },
    { n: "Idol Match",       brand: "Lazada",        runs: "98K",  earnings: "+$1,420" },
  ];

  return (
    <div>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <div className="mono" style={{ fontSize: 10.5, letterSpacing: ".1em", fontWeight: 700, color: "var(--ink-3)", marginBottom: 6 }}>过去 7 个月 · USD</div>
          <div style={{ fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 38, lineHeight: 1, color: "var(--ink-1)" }}>
            $28,720<span style={{ color: "var(--ink-3)", fontSize: 18, marginLeft: 6 }}>累计收益</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, padding: 3, background: "var(--bg-2)", borderRadius: 10 }}>
          {["近 30 天", "近 90 天", "本年度"].map((l, i) => (
            <button key={i} style={{
              padding: "5px 12px",
              background: i === 1 ? "var(--surface)" : "transparent",
              color: i === 1 ? "var(--ink-1)" : "var(--ink-3)",
              border: "none", borderRadius: 7,
              fontSize: 12, fontWeight: 700,
              fontFamily: "inherit", cursor: "default",
              boxShadow: i === 1 ? "var(--sh-sm)" : "none",
            }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Monthly bars */}
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 18,
        padding: "22px 26px 18px",
        marginBottom: 22,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 14.5 }}>每月入账趋势</div>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>单位 $K</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160 }}>
          {months.map((m, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div className="mono" style={{ fontSize: 10.5, color: m.hi ? "var(--warm)" : "var(--ink-4)", fontWeight: 700 }}>
                ${m.v}K
              </div>
              <div style={{
                width: "100%",
                height: `${(m.v / maxM) * 120}px`,
                background: m.hi
                  ? "linear-gradient(180deg, #ff7a3d 0%, #ffaa6c 100%)"
                  : "linear-gradient(180deg, var(--ink-1) 0%, var(--ink-2) 100%)",
                borderRadius: "6px 6px 2px 2px",
                opacity: m.hi ? 1 : 0.85,
              }}/>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", fontWeight: 600 }}>{m.m}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-col: brands + playables */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 18, padding: "20px 22px 18px" }}>
          <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 14.5, marginBottom: 18 }}>
            按品牌方 <span style={{ color: "var(--ink-3)", fontWeight: 500, fontSize: 12 }}>· 9 月</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {brands.map((b, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 12, alignItems: "center" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: b.c, color: "white",
                  display: "grid", placeItems: "center",
                  fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 13,
                }}>{b.logo}</div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-1)" }}>{b.n}</div>
                  <div style={{ height: 4, background: "var(--bg-2)", borderRadius: 99, marginTop: 5, overflow: "hidden" }}>
                    <div style={{ width: `${b.share * 2.5}%`, height: "100%", background: b.c, borderRadius: 99 }}/>
                  </div>
                </div>
                <div className="mono" style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-1)", textAlign: "right", minWidth: 60 }}>${b.earned.toLocaleString()}</div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", minWidth: 30, textAlign: "right" }}>{b.share}%</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 18, padding: "20px 22px 18px" }}>
          <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 14.5, marginBottom: 18 }}>
            按 Playable <span style={{ color: "var(--ink-3)", fontWeight: 500, fontSize: 12 }}>· Top 4</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {playables.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: i < playables.length - 1 ? "1px dashed var(--border-2)" : "none" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: i === 0 ? "var(--warm-soft)" : "var(--bg-2)",
                  color: i === 0 ? "var(--warm)" : "var(--ink-3)",
                  display: "grid", placeItems: "center",
                  fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 12,
                }}>{i + 1}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-1)" }}>{p.n}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 2 }}>{p.brand} · {p.runs} 完成局</div>
                </div>
                <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: "var(--warm)" }}>{p.earnings}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   AI 积分 TAB
   ───────────────────────────────────────────────────── */
function PointsTab() {
  const usage = [
    { k: "Forge-V Image",   used: 4200, c: "var(--brand)" },
    { k: "Forge-V Video",   used: 3800, c: "var(--warm)" },
    { k: "Forge-V Voice",   used: 1640, c: "#3c64c5" },
    { k: "Forge-Reasoning", used: 2200, c: "var(--ok)" },
    { k: "其他模型",         used: 840,  c: "var(--ink-3)" },
  ];
  const totalUsed = usage.reduce((s, u) => s + u.used, 0);

  const sources = [
    { ic: "coins", c: "var(--warm)", bg: "var(--warm-soft)", l: "结算自动转换",  v: "+82,400 P", t: "本月" },
    { ic: "crown", c: "var(--brand)", bg: "var(--brand-soft)", l: "Pro Plus 套餐", v: "+6,000 P",  t: "12 日续费" },
    { ic: "bolt",  c: "var(--ok)",   bg: "var(--ok-soft)",   l: "任务奖励",      v: "+1,400 P",  t: "本月" },
    { ic: "send",  c: "#b03a72",     bg: "#fcd1e1",          l: "充值",          v: "+38,600 P", t: "9/12" },
  ];

  return (
    <div>
      {/* Hero balance */}
      <div style={{
        background: "linear-gradient(135deg, #18172a 0%, #2a2240 55%, #3c2fd0 130%)",
        borderRadius: 20,
        padding: "24px 30px",
        color: "white",
        position: "relative",
        overflow: "hidden",
        marginBottom: 22,
        display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, alignItems: "center",
      }}>
        <div style={{
          position: "absolute", right: -60, top: -60,
          width: 280, height: 280, borderRadius: 99,
          background: "radial-gradient(circle, rgba(91,77,255,.4) 0%, transparent 70%)",
          pointerEvents: "none",
        }}/>
        <div style={{ position: "relative" }}>
          <div className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,.55)", letterSpacing: ".12em", marginBottom: 8 }}>
            积分余额 · FORGE POINTS
          </div>
          <div style={{
            fontFamily: "Manrope, sans-serif", fontWeight: 800,
            fontSize: 64, lineHeight: 1, letterSpacing: "-.02em",
            color: "white",
          }}>
            128,400<span style={{ fontSize: 22, color: "var(--warm)", marginLeft: 8, fontWeight: 700 }}>P</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "3px 10px", borderRadius: 99,
              background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)",
              fontSize: 11.5, color: "rgba(255,255,255,.85)", fontWeight: 600,
            }}>
              <Icon name="spark" size={11} color="var(--warm)"/> 还可创作 <b style={{ color: "white" }}>3,210</b> 次 Forge-V Image
            </span>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "3px 10px", borderRadius: 99,
              background: "rgba(46,170,112,.18)", border: "1px solid rgba(46,170,112,.3)",
              fontSize: 11.5, color: "#7eff7c", fontWeight: 600,
            }}>
              ⛽ 按本月用量可续航 <b>~10 个月</b>
            </span>
          </div>
          {/* runway bar */}
          <div style={{ marginTop: 12, maxWidth: 320 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "rgba(255,255,255,.5)", marginBottom: 5, fontFamily: "IBM Plex Mono, monospace" }}>
              <span>本月已消耗 12,680 P</span>
              <span>余额 128,400 P</span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,.1)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ width: "9%", height: "100%", background: "linear-gradient(90deg, var(--warm), #ffaa6c)", borderRadius: 99 }}/>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            <button style={{
              padding: "10px 18px", background: "var(--warm)", color: "white",
              border: "none", borderRadius: 11, fontSize: 13, fontWeight: 700,
              fontFamily: "inherit", cursor: "default",
              boxShadow: "0 8px 20px -6px rgba(255,122,61,.5)",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              <Icon name="plus" size={12} color="white"/> 充值积分
            </button>
            <button style={{
              padding: "10px 18px",
              background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.12)",
              color: "white",
              borderRadius: 11, fontSize: 13, fontWeight: 600,
              fontFamily: "inherit", cursor: "default",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              <Icon name="coins" size={12} color="white"/> 用收益兑换积分
            </button>
          </div>
        </div>

        {/* Usage donut placeholder */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ position: "relative", width: 130, height: 130 }}>
            <svg width="130" height="130" viewBox="0 0 130 130" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="65" cy="65" r="56" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="10"/>
              {(() => {
                let off = 0;
                return usage.map((u, i) => {
                  const frac = u.used / 14000;
                  const dash = 2 * Math.PI * 56 * frac;
                  const result = (
                    <circle key={i} cx="65" cy="65" r="56" fill="none"
                      stroke={u.c} strokeWidth="10"
                      strokeDasharray={`${dash} ${2 * Math.PI * 56}`}
                      strokeDashoffset={-off}
                    />
                  );
                  off += dash;
                  return result;
                });
              })()}
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>
              <div>
                <div className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,.5)", letterSpacing: ".1em" }}>本月用量</div>
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 22, color: "white", lineHeight: 1, marginTop: 4 }}>{totalUsed.toLocaleString()}</div>
                <div className="mono" style={{ fontSize: 9, color: "var(--warm)", marginTop: 2 }}>P</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {usage.slice(0, 4).map((u, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11 }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, background: u.c }}/>
                <span style={{ color: "rgba(255,255,255,.75)", fontWeight: 600 }}>{u.k}</span>
                <span className="mono" style={{ marginLeft: "auto", color: "rgba(255,255,255,.5)", fontSize: 10.5 }}>{u.used.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2-col: sources + usage */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 18, padding: "20px 22px" }}>
          <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 14.5, marginBottom: 16 }}>
            积分来源
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {sources.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 10px", background: "var(--bg-1, #fafaff)", borderRadius: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: s.bg, color: s.c, display: "grid", placeItems: "center" }}>
                  <Icon name={s.ic} size={14} color={s.c}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-1)" }}>{s.l}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 2 }}>{s.t}</div>
                </div>
                <div className="mono" style={{ fontSize: 13.5, fontWeight: 700, color: "var(--warm)" }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 18, padding: "20px 22px" }}>
          <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 14.5, marginBottom: 16 }}>
            消耗明细
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {usage.map((u, i) => (
              <div key={i}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-1)" }}>{u.k}</div>
                  <div className="mono" style={{ fontSize: 12, fontWeight: 700 }}>
                    <span style={{ color: u.c }}>{u.used.toLocaleString()}</span>
                    <span style={{ color: "var(--ink-4)" }}> P</span>
                  </div>
                </div>
                <div style={{ height: 5, background: "var(--bg-2)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ width: `${(u.used / totalUsed) * 100}%`, height: "100%", background: u.c, borderRadius: 99 }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   订阅套餐 TAB
   ───────────────────────────────────────────────────── */
function SubTab() {
  const plans = [
    {
      n: "Free",  p: "$0",  per: "/月",  c: "var(--ink-3)", bg: "var(--bg-1, #fafaff)", isCurrent: false,
      tagline: "试一试 Forge 是什么样",
      features: ["每月 500 积分", "1 个 AI 分身", "Forge-V Image 基础", "无品牌方撮合"],
      cta: "降级", current: false,
    },
    {
      n: "Pro",  p: "$19", per: "/月", c: "var(--brand)", bg: "white",                isCurrent: false,
      tagline: "个人创作者，每月稳定产出",
      features: ["每月 2,000 积分", "2 个 AI 分身", "Forge-V 全模型", "A/B 实验 1 个", "标准撮合"],
      cta: "降级", current: false,
    },
    {
      n: "Pro Plus", p: "$48", per: "/月", c: "var(--warm)", bg: "linear-gradient(180deg, #fff 0%, var(--warm-soft) 100%)",   isCurrent: true,
      tagline: "你现在的套餐 · 适合中重度 KOL",
      features: ["每月 6,000 积分", "3 个 AI 分身", "Forge-V 全模型 + Beta", "A/B 实验 3 个", "品牌方撮合优先", "S 级客服"],
      cta: "续费 $48", current: true,
    },
    {
      n: "Studio", p: "$128", per: "/月", c: "#b03a72", bg: "linear-gradient(180deg, #fff 0%, #fcd1e1 100%)",                  isCurrent: false,
      tagline: "团队协作 + 自动化运营",
      features: ["每月 20,000 积分", "8 个 AI 分身", "Forge-V 全模型 + 自训练", "无限 A/B 实验", "团队协作（5 席）", "品牌方独家撮合", "专属 PM"],
      cta: "升级", current: false,
    },
  ];

  const usage = [
    { k: "本月积分",     used: 1180,  total: 6000, c: "var(--warm)" },
    { k: "AI 分身槽位",   used: 2,     total: 3,    c: "var(--brand)" },
    { k: "A/B 实验",     used: 1,     total: 3,    c: "var(--ok)" },
  ];

  return (
    <div>
      {/* Current usage strip */}
      <div style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 18,
        padding: "20px 24px",
        marginBottom: 22,
        display: "grid", gridTemplateColumns: "auto 1fr", gap: 28, alignItems: "center",
      }}>
        <div>
          <div className="mono" style={{ fontSize: 10.5, letterSpacing: ".1em", color: "var(--ink-3)", fontWeight: 700, marginBottom: 6 }}>当前订阅</div>
          <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 24, lineHeight: 1, letterSpacing: "-.01em" }}>
            Pro <em style={{ fontStyle: "normal", color: "var(--warm)" }}>Plus</em>
          </div>
          <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 6 }}>
            <span className="mono">$48/月</span> · 12 日后续费
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {usage.map((u, i) => (
            <div key={i}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 5 }}>
                <div style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>{u.k}</div>
                <div className="mono" style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink-1)" }}>{u.used.toLocaleString()} / {u.total.toLocaleString()}</div>
              </div>
              <div style={{ height: 6, background: "var(--bg-2)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: `${(u.used / u.total) * 100}%`, height: "100%", background: u.c, borderRadius: 99 }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {plans.map((p, i) => (
          <div key={i} style={{
            background: p.bg,
            border: p.isCurrent ? `2px solid ${p.c}` : "1px solid var(--border)",
            borderRadius: 18,
            padding: "20px 20px 18px",
            position: "relative",
            boxShadow: p.isCurrent ? "0 12px 28px -10px rgba(255,122,61,.25)" : "var(--sh-sm)",
          }}>
            {p.isCurrent && (
              <span style={{
                position: "absolute", top: -10, left: 20,
                padding: "3px 10px",
                background: p.c, color: "white",
                borderRadius: 99, fontSize: 10.5, fontWeight: 700,
                fontFamily: "IBM Plex Mono, monospace", letterSpacing: ".06em",
              }}>当前套餐</span>
            )}
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 18, color: p.c, letterSpacing: "-.005em" }}>
              {p.n}
            </div>
            <div style={{ marginTop: 6, marginBottom: 10 }}>
              <span style={{ fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 36, color: "var(--ink-1)", letterSpacing: "-.02em" }}>{p.p}</span>
              <span style={{ fontSize: 12.5, color: "var(--ink-3)", marginLeft: 4 }}>{p.per}</span>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.5, marginBottom: 14, minHeight: 34 }}>
              {p.tagline}
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: 7 }}>
              {p.features.map((f, j) => (
                <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 12, color: "var(--ink-2)", lineHeight: 1.45 }}>
                  <Icon name="check" size={11} color={p.c} style={{ marginTop: 3, flexShrink: 0 }}/>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button style={{
              width: "100%",
              padding: "10px",
              background: p.current ? p.c : "transparent",
              color: p.current ? "white" : p.c,
              border: p.current ? "none" : `1.5px solid ${p.c}`,
              borderRadius: 10,
              fontSize: 12.5, fontWeight: 700,
              fontFamily: "inherit", cursor: "default",
              boxShadow: p.current ? `0 6px 16px -6px ${p.c}` : "none",
            }}>{p.cta}</button>
          </div>
        ))}
      </div>

      {/* Footnote */}
      <div style={{
        marginTop: 18,
        padding: "14px 18px",
        background: "var(--bg-1, #fafaff)",
        border: "1px dashed var(--border-2)",
        borderRadius: 12,
        display: "flex", alignItems: "center", gap: 12,
        fontSize: 12, color: "var(--ink-3)",
      }}>
        <Icon name="shield" size={14} color="var(--ok)"/>
        <span>所有套餐均按月计费，可随时升级或降级。<b style={{ color: "var(--ink-2)" }}>升级即时生效</b>，降级在当前周期结束后生效。Studio 套餐支持自定义合同与团队席位。</span>
      </div>
    </div>
  );
}

function Wallet({ goto }) {
  const [tab, setTab] = React.useState("overview");
  const [withdraw, setWithdraw] = React.useState(null); // "bank" | "usdc" | "points" | null
  const [convert, setConvert] = React.useState(false);

  // Earnings breakdown (this month)
  const breakdown = [
    { lbl: "品牌分成", pct: "(50-70%)", amt: "$2,580", bar: 75, color: "var(--warm)",  bg: "linear-gradient(90deg, var(--warm) 0%, #ff9d6b 100%)" },
    { lbl: "玩家分润", pct: "(20-30%)", amt: "$890",   bar: 30, color: "var(--brand)", bg: "linear-gradient(90deg, var(--brand) 0%, #8a7eff 100%)" },
    { lbl: "平台抽成", pct: "(10%)",    amt: "$370",   bar: 12, color: "var(--ink-3)", bg: "linear-gradient(90deg, var(--ink-3) 0%, var(--ink-4) 100%)" },
  ];

  const txs = [
    {
      ic: "coins", iconBg: "var(--ok-soft)", iconC: "var(--ok)",
      title: "结算 · Lumière Velvet Lip", sub: "Day 5 阶段结算",
      t: "9/18  04:30", amt: "+$1,240", amtC: "var(--warm)",
    },
    {
      ic: "spark", iconBg: "var(--brand-soft)", iconC: "var(--brand)",
      title: "积分兑换 → AI 服务", sub: "1,200 P · Forge-V Image 8 次",
      t: "9/17  22:14", amt: "−12  积分换算", amtC: "var(--brand)",
    },
    {
      ic: "coins", iconBg: "var(--ok-soft)", iconC: "var(--ok)",
      title: "结算 · Nova Sneakers Air-Burst", sub: "Day 3 阶段结算",
      t: "9/17  04:30", amt: "+$640", amtC: "var(--warm)",
    },
    {
      ic: "arrow_u", iconBg: "var(--bg-2)", iconC: "var(--ink-2)",
      title: "提现到 Wise · USD", sub: "Wise · 转入 1-2 工作日",
      t: "9/16  11:08", amt: "−$2,200", amtC: "var(--ink-1)",
    },
    {
      ic: "coins", iconBg: "var(--ok-soft)", iconC: "var(--ok)",
      title: "玩家分润转入", sub: "Velvet Lip · 1,240 名玩家",
      t: "9/16  04:30", amt: "+$220", amtC: "var(--warm)",
    },
    {
      ic: "arrow_u", iconBg: "var(--bg-2)", iconC: "var(--ink-2)",
      title: "订阅扣费 · Pro Plus", sub: "AI 6,000 积分 / 月",
      t: "9/15  00:00", amt: "−$99", amtC: "var(--ink-1)",
    },
  ];

  return (
    <div className="page">
      {/* HEADER */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr auto",
        gap: 24, alignItems: "flex-end",
        marginBottom: 28,
      }}>
        <div>
          <h1 style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800, fontSize: 44, lineHeight: 1.05,
            letterSpacing: "-.02em",
            margin: 0,
          }}>
            钱包<span style={{ color: "var(--ink-4)", fontWeight: 600, margin: "0 4px" }}>·</span>
            <em style={{
              fontFamily: "Instrument Serif, serif",
              fontWeight: 400, fontStyle: "italic",
              color: "var(--warm)",
              fontSize: 50,
            }}>积分</em>
            <span style={{ color: "var(--ink-4)", fontWeight: 600, margin: "0 4px" }}>·</span>
            订阅
          </h1>
          <p style={{
            fontSize: 13.5, lineHeight: 1.65,
            color: "var(--ink-3)", margin: "12px 0 0",
            maxWidth: 540,
          }}>
            玩家与 KOL 参与品牌方营销活动获得收益，统一为平台积分，
            可随时提现或抵扣 AI 创作。
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn"><Icon name="download" size={13}/> 月度对账单</button>
          <button className="btn warm" onClick={() => setWithdraw("bank")}><Icon name="send" size={13} color="white"/> 立即提现</button>
        </div>
      </div>

      {/* TABS */}
      <div style={{
        display: "flex", gap: 4, marginBottom: 22,
        padding: 4,
        background: "var(--bg-2)",
        borderRadius: 12,
        width: "fit-content",
      }}>
        {[
          ["overview", "钱包总览"],
          ["earnings", "收益明细"],
          ["points",   "AI 积分"],
          ["sub",      "订阅套餐"],
        ].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{
            padding: "8px 18px",
            background: tab === k ? "var(--ink-1)" : "transparent",
            color: tab === k ? "white" : "var(--ink-3)",
            border: "none",
            borderRadius: 8,
            fontSize: 13, fontWeight: 700,
            cursor: "default",
            fontFamily: "inherit",
          }}>{l}</button>
        ))}
      </div>

      {/* MAIN GRID */}
      {tab === "overview" && (
      <React.Fragment>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr",
        gap: 20,
        marginBottom: 36,
      }}>
        {/* LEFT: dark balance hero */}
        <div style={{
          background: "linear-gradient(135deg, #1a1726 0%, #2a1f3a 55%, #3a2418 100%)",
          borderRadius: 20,
          padding: "20px 30px 18px",
          color: "white",
          position: "relative",
          overflow: "hidden",
          display: "flex", flexDirection: "column",
        }}>
          {/* atmospheric glow */}
          <div style={{
            position: "absolute", right: -50, top: -50,
            width: 320, height: 320, borderRadius: 99,
            background: "radial-gradient(circle, rgba(255,122,61,.20) 0%, transparent 65%)",
            pointerEvents: "none",
          }}/>
          <div style={{
            position: "absolute", left: "50%", bottom: -80,
            width: 280, height: 200, borderRadius: 99,
            background: "radial-gradient(circle, rgba(91,77,255,.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}/>

          <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column" }}>
            <div className="mono" style={{
              fontSize: 11, letterSpacing: ".12em",
              color: "rgba(255,255,255,.55)",
              fontWeight: 600,
              marginBottom: 10,
            }}>可提现余额 · USD</div>

            <div style={{
              fontFamily: "Instrument Serif, serif",
              fontWeight: 400,
              fontSize: 88, lineHeight: 1,
              letterSpacing: "-.02em",
              color: "white",
              marginBottom: 18,
            }}>
              $1,284<span style={{ fontSize: 44, color: "rgba(255,255,255,.6)" }}>.50</span>
            </div>

            <div style={{
              display: "flex", alignItems: "center",
              gap: 28, fontSize: 12.5,
            }}>
              <div>
                <span style={{ color: "rgba(255,255,255,.5)" }}>本月入账</span>{" "}
                <span className="mono" style={{ color: "white", fontWeight: 600, marginLeft: 2 }}>+$3,840</span>
              </div>
              <div>
                <span style={{ color: "rgba(255,255,255,.5)" }}>本月提现</span>{" "}
                <span className="mono" style={{ color: "white", fontWeight: 600, marginLeft: 2 }}>−$2,556</span>
              </div>
              <div>
                <span style={{ color: "rgba(255,255,255,.5)" }}>积分余额</span>{" "}
                <span className="mono" style={{ color: "var(--warm)", fontWeight: 700, marginLeft: 2 }}>128,400 P</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 22 }}>
              <button onClick={() => setWithdraw("bank")} style={{
                padding: "11px 18px",
                background: "var(--warm)", color: "white",
                border: "none", borderRadius: 12,
                fontSize: 13, fontWeight: 700,
                fontFamily: "inherit",
                cursor: "default",
                boxShadow: "0 8px 20px -6px rgba(255,122,61,.5)",
                display: "inline-flex", alignItems: "center", gap: 6,
              }}>
                <Icon name="send" size={13} color="white"/> 提现到银行 / Wise
              </button>
              <button onClick={() => setWithdraw("usdc")} style={{
                padding: "11px 18px",
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "white",
                borderRadius: 12,
                fontSize: 13, fontWeight: 600,
                fontFamily: "inherit",
                cursor: "default",
              }}>提现到 USDC</button>
              <button onClick={() => setConvert(true)} style={{
                padding: "11px 18px",
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "white",
                borderRadius: 12,
                fontSize: 13, fontWeight: 600,
                fontFamily: "inherit",
                cursor: "default",
                display: "inline-flex", alignItems: "center", gap: 6,
              }}>
                <Icon name="spark" size={12} color="white"/> 抵扣 AI 积分
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: earnings breakdown */}
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          padding: "18px 22px 16px",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 700, fontSize: 14.5,
            color: "var(--ink-1)",
            marginBottom: 18,
          }}>
            收益拆分 <span style={{ color: "var(--ink-4)", fontWeight: 500 }}>·</span> <span style={{ color: "var(--ink-3)", fontWeight: 600 }}>本月</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
            {breakdown.map((b, i) => (
              <div key={i}>
                <div style={{
                  display: "flex", alignItems: "baseline", justifyContent: "space-between",
                  marginBottom: 7,
                }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-1)" }}>
                    {b.lbl}
                    <span style={{ color: "var(--ink-3)", fontWeight: 500, marginLeft: 5, fontSize: 11.5 }}>{b.pct}</span>
                  </div>
                  <div className="mono" style={{
                    fontSize: 14, fontWeight: 700,
                    color: "var(--ink-1)",
                  }}>{b.amt}</div>
                </div>
                <div style={{
                  height: 6,
                  background: "var(--bg-2)",
                  borderRadius: 99,
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: `${b.bar}%`,
                    height: "100%",
                    background: b.bg,
                    borderRadius: 99,
                  }}/>
                </div>
              </div>
            ))}
          </div>

          {/* footnote */}
          <div style={{
            marginTop: 20,
            padding: "12px 14px",
            background: "var(--bg-1, #fafaff)",
            borderRadius: 10,
            fontSize: 11.5, lineHeight: 1.55,
            color: "var(--ink-3)",
          }}>
            <b style={{ color: "var(--ink-2)", fontWeight: 700 }}>玩家分润</b>：参与{" "}
            <b style={{ color: "var(--ink-1)", fontWeight: 700 }}>Velvet Lip</b> 的{" "}
            <b className="mono" style={{ color: "var(--ink-1)", fontWeight: 700, fontFamily: "IBM Plex Mono, monospace" }}>23,840</b>{" "}
            名玩家共同分得{" "}
            <b style={{ color: "var(--warm)", fontWeight: 700 }}>$890</b>，
            按完成度与分享行为加权。
          </div>
        </div>
      </div>

      {/* WITHDRAW TRACKER */}
      <WithdrawTracker/>

      {/* TRANSACTIONS */}
      <div>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          marginBottom: 14,
        }}>
          <div style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800, fontSize: 17,
            color: "var(--ink-1)",
          }}>最近交易</div>
          <div style={{
            padding: "3px 11px",
            background: "var(--bg-2)",
            borderRadius: 99,
            fontSize: 11.5, fontWeight: 600,
            color: "var(--ink-2)",
          }}>9 月</div>
        </div>

        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
        }}>
          {txs.map((t, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto auto auto",
              alignItems: "center",
              gap: 18,
              padding: "16px 22px",
              borderBottom: i < txs.length - 1 ? "1px solid var(--border)" : "none",
              cursor: "default",
              transition: "background .12s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-1, #fafaff)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <div style={{
                width: 34, height: 34, borderRadius: 10,
                background: t.iconBg,
                color: t.iconC,
                display: "grid", placeItems: "center",
                flexShrink: 0,
              }}>
                <Icon name={t.ic} size={15} color={t.iconC}/>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontSize: 13.5, fontWeight: 700,
                  color: "var(--ink-1)",
                  letterSpacing: "-.005em",
                }}>{t.title}</div>
                <div style={{
                  fontSize: 11.5, color: "var(--ink-3)",
                  marginTop: 2,
                }}>{t.sub}</div>
              </div>
              <div className="mono" style={{
                fontSize: 12.5, color: "var(--ink-3)",
                fontWeight: 500,
                letterSpacing: ".02em",
                minWidth: 110,
                textAlign: "left",
              }}>{t.t}</div>
              <div className="mono" style={{
                fontSize: 14.5, fontWeight: 700,
                color: t.amtC,
                letterSpacing: ".01em",
                minWidth: 130,
                textAlign: "right",
              }}>{t.amt}</div>
              <button style={{
                background: "transparent", border: "none",
                color: "var(--ink-3)",
                fontSize: 12, fontWeight: 600,
                fontFamily: "inherit",
                padding: "4px 8px",
                cursor: "default",
              }}>明细</button>
            </div>
          ))}
        </div>
      </div>
      </React.Fragment>
      )}

      {tab === "earnings" && <EarningsTab/>}
      {tab === "points"   && <PointsTab/>}
      {tab === "sub"      && <SubTab/>}

      {withdraw && <WithdrawFlow channel={withdraw} onClose={() => setWithdraw(null)}/>}
      {convert && <PointsConvert onClose={() => setConvert(false)}/>}
    </div>
  );
}

window.Wallet = Wallet;
