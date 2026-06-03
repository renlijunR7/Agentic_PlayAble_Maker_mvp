// AirvanaMaker v2 — 运营反馈 (Feedback)
// Forge's reflections on what's working, what's not, and what to do next.

function Feedback({ goto }) {
  const reflections = [
    {
      kind: "warn",
      title: "TikTok ID — 第 38 秒跳出率飙升至 42%",
      hint: "Forge 检测到玩家在 Pump/Dump 选择前 3 秒明显犹豫，建议把 CTA 提前到第 35 秒。已生成 v1.d 草稿。",
      action: "应用建议",
      tag: "完成率 · 急",
      asset: "Pump or Dump",
      gain: "完成率 +4.2pt",
    },
    {
      kind: "ok",
      title: "X / Twitter 分享率 22.4% — 超出预期 4.4 倍",
      hint: "Crypto Twitter 用户截图分享率极高，建议追加 20% 预算到 X 平台并复制变体到 Mastodon。",
      action: "扩量分发",
      tag: "增长 · 机会",
      asset: "Pump or Dump",
      gain: "预计 +$180/日",
    },
    {
      kind: "brand",
      title: "Bybit 询问：能否做 7 日大赛变体？",
      hint: "联名收益分成 30%，预计 7 日内 $1,800~2,400。Forge 已生成 v1.c 大赛草稿，等你拍板。",
      action: "查看草稿",
      tag: "品牌方 · 待响应",
      asset: "Pump or Dump",
      gain: "$1,800~2,400 / 7 日",
    },
    {
      kind: "info",
      title: "分身 Aria · Degen 准备好登场",
      hint: "学习成熟度 34%，可以作为开场解说插入 Pump or Dump TikTok 版本。Forge 已自动适配语速。",
      action: "挂载到 v1",
      tag: "分身 · 就绪",
      asset: "Aria · Degen",
      gain: "预计完成率 +3pt",
    },
    {
      kind: "warn",
      title: "Velvet Lip — US 市场色调偏冷",
      hint: "美东用户对原色饱和度反馈偏低，Forge 已生成 plum 暗紫调变体，建议先小流量测试。",
      action: "A/B 测试",
      tag: "色彩 · 优化",
      asset: "Velvet Lip",
      gain: "预计 CTR +2.4pt",
    },
    {
      kind: "ok",
      title: "Idol Match 评论区 — Lazada 用户高频提到「明星补给箱」",
      hint: "高互动评论 240 条均围绕「明星补给箱」概念，建议派生周边玩法 v2。",
      action: "派生变体",
      tag: "用户洞察",
      asset: "Idol Match",
      gain: "新玩法机会",
    },
  ];

  const [filter, setFilter] = React.useState("all");

  const filtered = filter === "all" ? reflections : reflections.filter(r => r.kind === filter);

  return (
    <div className="page">
      <div className="page-h">
        <div>
          <h1>运营<em>反馈</em></h1>
        </div>
        <div className="sub">Forge 的 24h 反思与判断。所有需要你拍板的地方，AI 已把决策选项摆好。</div>
        <div className="right">
          <button className="btn"><Icon name="refresh" size={13}/> 刷新</button>
          <button className="btn dark"><Icon name="check" size={13} color="white"/> 全部应用</button>
        </div>
      </div>

      {/* TOP KPI */}
      <div className="g g-4">
        {[
          { lbl: "待响应建议",   v: "6",   u: "条",   d: "1 急 · 2 机会", ic: "bolt",  c: "#b03a72",       bg: "#fcd1e1" },
          { lbl: "本周已应用",   v: "14",  u: "条",   d: "采纳率 78%",    ic: "check", c: "var(--ok)",    bg: "var(--ok-soft)" },
          { lbl: "贡献增量收入", v: "$184",u: "/周", d: "建议带来",      ic: "coins", c: "var(--warm)",  bg: "var(--warm-soft)" },
          { lbl: "Forge 命中率", v: "82",  u: "%",   d: "实际 ROI ≥ 预测",ic: "trend", c: "var(--brand)", bg: "var(--brand-soft)" },
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

      {/* CROSS-PLATFORM STAR MAP */}
      <StarMap/>

      {/* FILTER + Mascot */}
      <div style={{
        marginTop: 28, marginBottom: 16,
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <Mascot size={36} mood="thinking"/>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "Manrope, sans-serif", fontWeight: 800,
            fontSize: 22, lineHeight: 1.1, letterSpacing: "-.01em",
          }}>
            Forge 想和你聊 <em style={{ color: "var(--brand)" }}>{reflections.length}</em> 件事
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>
            按优先级排序 · 急事在前
          </div>
        </div>
        <div style={{
          display: "flex", gap: 4, padding: 4,
          background: "var(--bg-2)",
          borderRadius: 99,
        }}>
          {[
            ["all",   "全部",  reflections.length],
            ["warn",  "急",    reflections.filter(r => r.kind === "warn").length],
            ["ok",    "机会",  reflections.filter(r => r.kind === "ok").length],
            ["brand", "品牌方",reflections.filter(r => r.kind === "brand").length],
            ["info",  "提示",  reflections.filter(r => r.kind === "info").length],
          ].map(([k, l, n]) => (
            <button key={k} onClick={() => setFilter(k)} style={{
              padding: "6px 13px",
              background: filter === k ? "var(--surface)" : "transparent",
              borderRadius: 99,
              border: "none",
              fontSize: 12,
              fontWeight: 700,
              color: filter === k ? "var(--ink-1)" : "var(--ink-3)",
              cursor: "default",
              boxShadow: filter === k ? "var(--sh-sm)" : "none",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              {l}
              <span className="mono" style={{
                fontSize: 9.5, fontWeight: 800,
                color: filter === k ? "var(--brand)" : "var(--ink-4)",
              }}>{n}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reflections grid */}
      <div className="g g-2">
        {filtered.map((r, i) => {
          const tone = {
            warn:  { ink: "var(--warm)",  bg: "var(--warm-soft)",  line: "var(--warm-line)"  },
            ok:    { ink: "var(--ok)",    bg: "var(--ok-soft)",    line: "#c9e6d4"           },
            brand: { ink: "#b03a72",      bg: "#fcd1e1",           line: "#f5b8d0"           },
            info:  { ink: "var(--brand)", bg: "var(--brand-soft)", line: "var(--brand-line)" },
          }[r.kind];
          return (
            <div key={i} className="card lift" style={{
              padding: 18,
              borderLeft: `3px solid ${tone.ink}`,
              borderColor: tone.line,
              borderLeftColor: tone.ink,
              background: "var(--surface)",
              display: "flex", flexDirection: "column", gap: 12,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 99,
                  background: tone.bg,
                  color: tone.ink,
                  letterSpacing: ".02em",
                }}>{r.tag}</span>
                <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".05em" }}>
                  · {r.asset}
                </span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.4, color: "var(--ink-1)" }}>{r.title}</div>
              <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.6 }}>{r.hint}</div>

              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 10px",
                background: tone.bg,
                borderRadius: 8,
                fontSize: 11.5, fontWeight: 700,
                color: tone.ink,
              }}>
                <Icon name="trend" size={11} color={tone.ink}/>
                预计收益：{r.gain}
              </div>

              <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                <button className="btn brand sm">
                  <Icon name="check" size={11} color="white"/> {r.action}
                </button>
                <button className="btn sm">看数据</button>
                <button className="btn ghost sm" style={{ marginLeft: "auto" }}>忽略</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* History */}
      <div className="sect" style={{ marginTop: 32 }}>
        <h2>历史<em>采纳</em></h2>
        <div className="sub">最近 7 天 Forge 的建议被采纳后的实际效果</div>
        <div className="right">
          <button className="btn sm">查看全部</button>
        </div>
      </div>
      <div className="card">
        <div className="card-bd" style={{ padding: 0 }}>
          {[
            { d: "05/21", t: "TikTok ID · CTA 前移到 38s",        e: "Pump or Dump",  effect: "完成率 +3.8pt", ok: true },
            { d: "05/20", t: "Velvet Lip · 双倍奖励池 v1.a A/B",   e: "Velvet Lip",    effect: "分享率 +6.2pt", ok: true },
            { d: "05/19", t: "印尼 Telegram 群组扩投",              e: "Pump or Dump",  effect: "完成局 +1,820", ok: true },
            { d: "05/18", t: "ETH Spin · 加入连胜赔率锁定",          e: "ETH Spin",      effect: "未达预期 -0.4pt", ok: false },
            { d: "05/17", t: "Idol Match · 动漫风格变体",            e: "Idol Match",    effect: "完成率 +1.2pt", ok: true },
          ].map((h, i, arr) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 18px",
              borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: ".04em", minWidth: 44 }}>{h.d}</div>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: h.ok ? "var(--ok-soft)" : "var(--bad-soft)",
                color: h.ok ? "var(--ok)" : "var(--bad)",
                display: "grid", placeItems: "center",
                flexShrink: 0,
              }}>
                <Icon name={h.ok ? "check" : "x"} size={13} color={h.ok ? "var(--ok)" : "var(--bad)"} strokeWidth={2.2}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{h.t}</div>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 2 }}>{h.e}</div>
              </div>
              <div style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: 12,
                fontWeight: 700,
                color: h.ok ? "var(--ok)" : "var(--bad)",
              }}>{h.effect}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.Feedback = Feedback;
