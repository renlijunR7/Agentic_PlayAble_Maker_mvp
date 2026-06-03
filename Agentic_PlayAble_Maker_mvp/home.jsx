// AirvanaMaker v2 — Home / Overview
// Marvis-inspired: warm greeting from Forge, scenario grid, today's pulse.

const KOL = { name: "Aria", handle: "@aria.kol", level: "S 级", followers: "2.4M" };

const SCENARIOS = [
  { tone: "p1", title: "K线预言局",     ds: "BTC / ETH · 涨跌方向猜",         ic: "trend",  meta: "60s × 单局" },
  { tone: "p2", title: "Memecoin 战神", ds: "今日 Meme · 谁先翻倍",            ic: "fire",   meta: "热度 ↑ 高" },
  { tone: "p3", title: "暴富 vs 归零",  ds: "Token 24h · 命运二选一",          ic: "bolt",   meta: "Agentic 推荐" },
  { tone: "p4", title: "解锁押注",       ds: "Token 解锁后涨跌",                ic: "spark",  meta: "高完成率" },
  { tone: "p5", title: "鲸鱼追踪赛",     ds: "跟单大户 · 下一笔买卖",            ic: "eye",    meta: "高分享" },
  { tone: "p6", title: "合约多空局",     ds: "Funding Rate · 永续方向",          ic: "chart",  meta: "新增模板" },
  { tone: "p7", title: "空投撸毛大赛",   ds: "钱包行为 · 谁能拿到空投",          ic: "crown",  meta: "本周新品" },
  { tone: "p8", title: "NFT 地板竞猜",   ds: "24h 内 · 地板价涨/跌",             ic: "star",   meta: "高传播" },
];

function ScenarioTile({ s, onUse }) {
  return (
    <div className={`card lift tile tile-${s.tone}`} style={{
      borderColor: "transparent",
      padding: 18,
      minHeight: 180,
      display: "flex", flexDirection: "column", gap: 12,
      position: "relative", overflow: "hidden",
      cursor: "default",
    }}>
      {/* decorative glyph */}
      <div style={{
        position: "absolute", right: -18, bottom: -18,
        width: 110, height: 110, borderRadius: 99,
        background: "rgba(255,255,255,.4)",
        display: "grid", placeItems: "center",
      }}>
        <Icon name={s.ic} size={48} color="rgba(24, 23, 42, .25)" strokeWidth={1.6}/>
      </div>
      <div className="mono" style={{ fontSize: 10.5, color: "rgba(24,23,42,.55)", fontWeight: 700, letterSpacing: ".08em" }}>
        {s.meta}
      </div>
      <div style={{ marginTop: "auto", position: "relative", zIndex: 2 }}>
        <div style={{
          fontFamily: "Manrope, sans-serif", fontWeight: 800,
          fontSize: 24, lineHeight: 1.1, letterSpacing: "-.01em",
          color: "var(--ink-1)", marginBottom: 4,
        }}>{s.title}</div>
        <div style={{ fontSize: 12, color: "rgba(24, 23, 42, .65)", fontWeight: 500 }}>{s.ds}</div>
      </div>
      <button onClick={onUse} className="btn sm" style={{
        position: "absolute", top: 14, right: 14, zIndex: 3,
        background: "rgba(255,255,255,.85)",
        border: "none",
        backdropFilter: "blur(4px)",
        padding: "4px 10px",
        fontSize: 11,
        fontWeight: 700,
      }}>
        生成 <Icon name="arrow_r" size={11}/>
      </button>
    </div>
  );
}

function FeedItem({ a }) {
  return (
    <div className="lift" style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: "14px 0",
      borderBottom: "1px solid var(--border)",
      cursor: "default",
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10,
        background: a.tint, color: a.ink,
        display: "grid", placeItems: "center",
        flexShrink: 0,
      }}>
        <Icon name={a.ic} size={17} color={a.ink}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink-1)" }}>{a.title}</div>
        <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 2 }}>{a.sub}</div>
      </div>
      <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", flexShrink: 0 }}>{a.t}</div>
    </div>
  );
}

function ForgeSuggestions() {
  const SUGGESTIONS = [
    {
      type: "分发扩量", typeColor: "var(--brand)", typeBg: "var(--brand-soft)",
      titleHead: "要不要把", titleEm: "Pump or Dump", titleTail: "推到印尼 TG 群组?",
      desc: "昨天该游戏在 TikTok ID 完成率 48%，与 TG 用户画像高度重合。预计追投后单日入账 +$120~180。",
      roi: "3.4×", roiColor: "var(--brand)",
      risk: "低",  riskColor: "var(--ok)",
      primary: "同意分发",
      timeline: [
        { d: "D1", v: "3 群 · 试水",  c: "var(--brand)" },
        { d: "D3", v: "+9 群 · 扩量", c: "var(--brand)" },
        { d: "D7", v: "TikTok 联投",  c: "var(--warm)" },
      ],
      ref: { kind: "ok", text: "上次 Velvet Lip → 越南 TG", bold: "7 日入账 +$340", suffix: "执行率 92%" },
    },
    {
      type: "节奏优化", typeColor: "var(--warm)", typeBg: "var(--warm-soft)",
      titleHead: "把", titleEm: "Pump or Dump", titleTail: "的 CTA 从 50s 前移到 35s?",
      desc: "TikTok ID 版本在 35s 处出现完播跳出峰值。前移 CTA 预计让分享率从 12% → 16~18%。",
      roi: "1.8×", roiColor: "var(--brand)",
      risk: "极低", riskColor: "var(--ok)",
      primary: "生成 A/B",
      timeline: [
        { d: "30m", v: "生成 2 变体",     c: "var(--brand)" },
        { d: "6h",  v: "灰度 10% 流量",    c: "var(--brand)" },
        { d: "48h", v: "胜出版本全量",      c: "var(--warm)" },
      ],
      ref: { kind: "ok", text: "上次 K线预言 CTA 前移", bold: "分享率 +5.2pt", suffix: "执行率 100%" },
    },
    {
      type: "变体生成", typeColor: "#b03a72", typeBg: "#fcd1e1",
      titleHead: "为", titleEm: "Velvet Lip", titleTail: "生成越南语 + Hindi 双版本?",
      desc: "越南 + 印度市场美妆 KOL 互动峰值上升 24%。Forge 已识别 4 段可复用的口播音轨。",
      roi: "2.4×", roiColor: "var(--brand)",
      risk: "中",  riskColor: "var(--warn)",
      primary: "开始训练",
      timeline: [
        { d: "D1", v: "越南语母版", c: "var(--brand)" },
        { d: "D2", v: "Hindi 母版", c: "var(--brand)" },
        { d: "D4", v: "联合分发",    c: "var(--warm)" },
      ],
      ref: { kind: "warn", text: "上次 Hindi 版变体", bold: "首周 ROI 1.7×", suffix: "略低于预测" },
    },
    {
      type: "节点新增", typeColor: "var(--ok)", typeBg: "var(--ok-soft)",
      titleHead: "在", titleEm: "Manila", titleTail: "开一个新的 Agent 节点?",
      desc: "菲律宾深夜档流量缺口持续 12 天。塔加洛语训练数据已准备 480k tokens，可直接孵化。",
      roi: "3.1×", roiColor: "var(--brand)",
      risk: "低",  riskColor: "var(--ok)",
      primary: "孵化分身",
      timeline: [
        { d: "6h",  v: "训练 v0.1",    c: "var(--brand)" },
        { d: "24h", v: "Forge 体检",    c: "var(--brand)" },
        { d: "36h", v: "首夜电台上线",   c: "var(--warm)" },
      ],
      ref: { kind: "ok", text: "上次 Lagos 节点开通", bold: "首周入账 $228", suffix: "执行率 88%" },
    },
  ];

  const [idx, setIdx] = React.useState(0);
  const s = SUGGESTIONS[idx];
  const prev = () => setIdx(i => (i - 1 + SUGGESTIONS.length) % SUGGESTIONS.length);
  const next = () => setIdx(i => (i + 1) % SUGGESTIONS.length);
  const refBg = s.ref.kind === "ok" ? "var(--ok-soft)" : "var(--warn-soft)";
  const refLine = s.ref.kind === "ok" ? "rgba(46,170,112,.2)" : "rgba(212,155,61,.25)";
  const refFg = s.ref.kind === "ok" ? "var(--ok)" : "var(--warn)";

  return (
    <>
      <div style={{ position: "absolute", top: -20, right: -20, opacity: .8 }}>
        <Mascot size={110} mood="thinking"/>
      </div>
      <div className="card-bd" style={{ padding: "20px 22px" }}>
        {/* Header: tag + counter + pager */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, position: "relative" }}>
          <span className="tag brand">
            <Icon name="bolt" size={11} color="var(--brand)"/> FORGE 建议
          </span>
          <span className="mono" style={{ fontSize: 10, color: "var(--ink-3)", fontWeight: 700, letterSpacing: ".05em" }}>
            {idx + 1} / {SUGGESTIONS.length}
          </span>
          <span style={{ flex: 1 }}/>
          <button className="btn ghost sm" onClick={prev} style={{ padding: "4px 6px" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"/></svg>
          </button>
          <button className="btn ghost sm" onClick={next} style={{ padding: "4px 6px" }}>
            <Icon name="chev_r" size={11}/>
          </button>
        </div>

        {/* Type chip */}
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "3px 8px",
          background: s.typeBg, color: s.typeColor,
          fontSize: 10.5, fontWeight: 800,
          fontFamily: "IBM Plex Mono, monospace",
          letterSpacing: ".06em",
          borderRadius: 6,
          marginBottom: 10,
        }}>{s.type}</span>

        <div style={{
          fontFamily: "Manrope, sans-serif", fontWeight: 800,
          fontSize: 22, lineHeight: 1.25, letterSpacing: "-.01em",
          marginBottom: 10, maxWidth: 290, position: "relative",
        }}>
          {s.titleHead} <em style={{ color: s.typeColor, fontStyle: "italic" }}>{s.titleEm}</em> {s.titleTail}
        </div>

        <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 14 }}>
          {s.desc}
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          <button className="btn brand sm">
            <Icon name="check" size={11} color="white"/> {s.primary}
          </button>
          <button className="btn sm">先看数据</button>
          <button className="btn ghost sm">忽略</button>
        </div>

        <div className="div" style={{ margin: "12px 0" }}/>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div>
            <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".08em" }}>预计 ROI</div>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 24, color: s.roiColor }}>{s.roi}</div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".08em" }}>合规风险</div>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 24, color: s.riskColor }}>{s.risk}</div>
          </div>
        </div>

        <div className="div" style={{ margin: "12px 0" }}/>

        <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".08em", fontWeight: 700, marginBottom: 8 }}>Forge 排程</div>
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {s.timeline.map((t, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={{ height: 3, background: t.c, borderRadius: 99, opacity: 0.85 }}/>
              <div className="mono" style={{ fontSize: 9.5, color: t.c, fontWeight: 800, marginTop: 6, letterSpacing: ".05em" }}>{t.d}</div>
              <div style={{ fontSize: 11, color: "var(--ink-1)", fontWeight: 600, marginTop: 1, lineHeight: 1.3 }}>{t.v}</div>
            </div>
          ))}
        </div>

        <div style={{
          padding: "10px 12px",
          background: refBg,
          border: `1px solid ${refLine}`,
          borderRadius: 10,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <Icon name={s.ref.kind === "ok" ? "check" : "bolt"} size={13} color={refFg} strokeWidth="2.4"/>
          <div style={{ flex: 1, fontSize: 11.5, color: "var(--ink-1)", lineHeight: 1.5 }}>
            {s.ref.text}
            <br/>
            <b style={{ color: refFg }}>{s.ref.bold}</b> · <span style={{ color: "var(--ink-3)" }}>{s.ref.suffix}</span>
          </div>
        </div>

        {/* Other suggestions stack — compact previews */}
        <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", letterSpacing: ".1em", fontWeight: 700, marginTop: 16, marginBottom: 8 }}>
          其他建议 · 待响应
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {SUGGESTIONS.map((o, i) => i !== idx ? (
            <button key={i} onClick={() => setIdx(i)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 10px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                cursor: "pointer",
                font: "inherit",
                textAlign: "left",
                width: "100%",
                transition: "background .15s, transform .08s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--surface-2)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--surface)"}
            >
              <span style={{ width: 6, height: 6, borderRadius: 99, background: o.typeColor, flexShrink: 0 }}/>
              <span style={{
                fontSize: 9.5, fontFamily: "IBM Plex Mono, monospace", fontWeight: 800,
                color: o.typeColor, background: o.typeBg,
                padding: "1px 5px", borderRadius: 4,
                letterSpacing: ".05em",
              }}>{o.type}</span>
              <span style={{ flex: 1, minWidth: 0, fontSize: 12, color: "var(--ink-1)", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {o.titleHead} <b style={{ color: o.typeColor }}>{o.titleEm}</b> {o.titleTail}
              </span>
              <span className="mono" style={{ fontSize: 10.5, color: "var(--brand)", fontWeight: 800, flexShrink: 0 }}>{o.roi}</span>
              <Icon name="chev_r" size={11} color="var(--ink-3)"/>
            </button>
          ) : null)}
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────
   LOOP OVERVIEW — 创作 · 营销 · 结算 闭环
   ───────────────────────────────────────────────────── */
function LoopOverview({ goto }) {
  const stages = [
    {
      key: "create", name: "创作", en: "CREATE", ic: "spark",
      color: "var(--brand)", soft: "var(--brand-soft)", line: "var(--brand-line)",
      big: "23", bigUnit: "在运营",
      sub: "3 草稿待完善",
      attn: 2, attnText: "个变体待你拍板",
      to: "workbench",
    },
    {
      key: "market", name: "营销", en: "MARKET", ic: "send",
      color: "var(--warm)", soft: "var(--warm-soft)", line: "var(--warm-line)",
      big: "8", bigUnit: "平台分发",
      sub: "24,180 完成局 · +38%",
      attn: 2, attnText: "笔分发待审核",
      to: "distribute",
    },
    {
      key: "settle", name: "结算", en: "SETTLE", ic: "coins",
      color: "var(--ok)", soft: "var(--ok-soft)", line: "rgba(46,170,112,.25)",
      big: "$1,284", bigUnit: "可提现",
      sub: "本月入账 +$3,840",
      attn: 1, attnText: "笔提现需补资料",
      to: "wallet",
    },
  ];

  return (
    <div className="card" style={{ marginTop: 24, position: "relative", overflow: "hidden" }}>
      <div className="card-hd">
        <h3>创作 · 营销 · 结算 <em style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontWeight: 400, color: "var(--brand)" }}>闭环</em></h3>
        <span className="sub">·</span>
        <span className="sub">每一段都有 Forge 在替你跑,圆点处需要你拍板</span>
        <div className="right">
          <span className="tag brand"><span className="dot" style={{ background: "var(--brand)" }}/> 实时</span>
        </div>
      </div>
      <div className="card-bd" style={{ paddingTop: 6 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: 0, alignItems: "stretch" }}>
          {stages.map((s, i) => (
            <React.Fragment key={s.key}>
              <div
                onClick={() => goto(s.to)}
                style={{
                  background: s.soft,
                  border: `1px solid ${s.line}`,
                  borderRadius: 16,
                  padding: "18px 20px",
                  display: "flex", flexDirection: "column", gap: 10,
                  cursor: "default",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: s.color, color: "white", display: "grid", placeItems: "center", boxShadow: `0 6px 14px -6px ${s.color}` }}>
                    <Icon name={s.ic} size={16} color="white"/>
                  </div>
                  <div>
                    <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 17, color: "var(--ink-1)", lineHeight: 1 }}>{s.name}</div>
                    <div className="mono" style={{ fontSize: 9, color: "var(--ink-4)", letterSpacing: ".14em", fontWeight: 700, marginTop: 3 }}>{s.en}</div>
                  </div>
                  {s.attn > 0 && (
                    <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 9px", background: s.color, color: "white", borderRadius: 99, fontSize: 11, fontWeight: 800 }}>
                      <span style={{ width: 5, height: 5, borderRadius: 99, background: "white", animation: "pulse 1.6s infinite" }}/> {s.attn}
                    </span>
                  )}
                </div>
                <div>
                  <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 28, lineHeight: 1, letterSpacing: "-.01em", color: "var(--ink-1)" }}>
                    {s.big} <span style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 600 }}>{s.bigUnit}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 5 }}>{s.sub}</div>
                </div>
                {s.attn > 0 && (
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: s.color, display: "flex", alignItems: "center", gap: 5, marginTop: "auto" }}>
                    {s.attn} {s.attnText} <Icon name="arrow_r" size={11} color={s.color}/>
                  </div>
                )}
              </div>
              {i < stages.length - 1 && (
                <div style={{ display: "grid", placeItems: "center", padding: "0 10px" }}>
                  <div style={{ color: "var(--ink-4)" }}>
                    <Icon name="arrow_r" size={18} color="var(--ink-4)"/>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        {/* feedback loop bar */}
        <div style={{
          marginTop: 12,
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 16px",
          background: "var(--bg-1, #fafaff)",
          border: "1px dashed var(--border-2)",
          borderRadius: 12,
        }}>
          <Icon name="refresh" size={14} color="var(--brand)"/>
          <span style={{ fontSize: 12.5, color: "var(--ink-2)" }}>
            <b style={{ color: "var(--brand)" }}>数据回流 →</b> 结算与营销的真实表现回喂工作台,Forge 自进化后给出下一轮建议。
          </span>
          <span style={{ flex: 1 }}/>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>学习成熟度 <b style={{ color: "var(--ink-1)" }}>34%</b></span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   ACTION QUEUE — 待你确认 · 行动清单
   ───────────────────────────────────────────────────── */
function ActionQueue({ goto }) {
  const ALL = [
    { stage: "营销", color: "var(--warm)", soft: "var(--warm-soft)", ic: "send",
      title: "把 Pump or Dump 推到印尼 TG 群组",
      why: "TikTok ID 完成率 48%,与 TG 用户画像高度重合",
      m1: "ROI 3.4×", m2: "风险 低", primary: "同意分发" },
    { stage: "创作", color: "var(--brand)", soft: "var(--brand-soft)", ic: "spark",
      title: "给 Pump or Dump 加 3 连胜倍赔率彩蛋",
      why: "35s 处完播跳出峰值,前移钩子可拉升分享",
      m1: "分享率 +6%", m2: "30 分钟", primary: "生成变体" },
    { stage: "结算", color: "var(--ok)", soft: "var(--ok-soft)", ic: "coins",
      title: "WD-8841 大额提现需补充收入来源",
      why: "$3,200 触发增强风控,补充后即可解冻",
      m1: "解冻 $3,200", m2: "需 2 分钟", primary: "去补充", urgent: true },
    { stage: "创作", color: "var(--brand)", soft: "var(--brand-soft)", ic: "brain",
      title: "为 Velvet Lip 生成越南语 + Hindi 双版本",
      why: "越南/印度美妆 KOL 互动峰值上升 24%",
      m1: "互动 +24%", m2: "ROI 2.4×", primary: "开始训练" },
    { stage: "营销", color: "var(--warm)", soft: "var(--warm-soft)", ic: "chart",
      title: "回复 Bybit 品牌方:加入 7 日大赛变体",
      why: "品牌方愿意追加 $2,400 预算",
      m1: "预算 +$2,400", m2: "今日截止", primary: "回复提案", urgent: true },
  ];

  const [items, setItems] = React.useState(ALL);
  const dismiss = (i) => setItems(items.filter((_, j) => j !== i));

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column" }}>
      <div className="card-hd">
        <h3>待你确认</h3>
        <span className="tag warm">{items.length} 项</span>
        <span className="sub" style={{ marginLeft: 4 }}>Forge 已备好选项,你只需拍板</span>
        <div className="right">
          <button className="btn sm ghost"><Icon name="check" size={12}/> 全部采用</button>
        </div>
      </div>
      <div className="card-bd" style={{ paddingTop: 4, display: "flex", flexDirection: "column", gap: 10 }}>
        {items.length === 0 && (
          <div style={{ padding: "40px 0", textAlign: "center", color: "var(--ink-3)", fontSize: 13 }}>
            <Mascot size={56} mood="happy"/>
            <div style={{ marginTop: 10 }}>都处理完啦,Forge 继续替你盯着 🎉</div>
          </div>
        )}
        {items.map((a, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 14, alignItems: "center",
            padding: "14px 16px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: `3px solid ${a.color}`,
            borderRadius: 12,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: a.soft, color: a.color, display: "grid", placeItems: "center", flexShrink: 0 }}>
              <Icon name={a.ic} size={16} color={a.color}/>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                <span style={{ fontSize: 9.5, fontFamily: "IBM Plex Mono, monospace", fontWeight: 800, color: a.color, background: a.soft, padding: "1px 6px", borderRadius: 5, letterSpacing: ".04em" }}>{a.stage}</span>
                {a.urgent && <span style={{ fontSize: 9.5, fontFamily: "IBM Plex Mono, monospace", fontWeight: 800, color: "var(--bad)", background: "#fde4e4", padding: "1px 6px", borderRadius: 5 }}>急</span>}
                <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.title}</span>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.4, marginBottom: 6 }}>{a.why}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: "var(--brand)", background: "var(--brand-soft)", padding: "2px 7px", borderRadius: 6 }}>{a.m1}</span>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: "var(--ink-3)", background: "var(--bg-2)", padding: "2px 7px", borderRadius: 6 }}>{a.m2}</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
              <button
                onClick={() => { dismiss(i); }}
                style={{
                  padding: "7px 14px", background: a.color, color: "white",
                  border: "none", borderRadius: 9, fontSize: 12, fontWeight: 700,
                  fontFamily: "inherit", cursor: "default", whiteSpace: "nowrap",
                  display: "inline-flex", alignItems: "center", gap: 5,
                }}
              >
                <Icon name="check" size={11} color="white"/> {a.primary}
              </button>
              <button
                onClick={() => dismiss(i)}
                style={{
                  padding: "5px 14px", background: "transparent",
                  border: "1px solid var(--border)", borderRadius: 9,
                  fontSize: 11.5, fontWeight: 600, color: "var(--ink-3)",
                  fontFamily: "inherit", cursor: "default", whiteSpace: "nowrap",
                }}
              >稍后</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   SPARK KPI — KPI card with mini sparkline
   ───────────────────────────────────────────────────── */
function sparkPath(pts, w, h, pad) {
  const min = Math.min(...pts), max = Math.max(...pts);
  const range = max - min || 1;
  const step = (w - pad * 2) / (pts.length - 1);
  const xy = pts.map((p, i) => [pad + i * step, h - pad - ((p - min) / range) * (h - pad * 2)]);
  const line = xy.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${xy[xy.length - 1][0].toFixed(1)},${h} L${xy[0][0].toFixed(1)},${h} Z`;
  return { line, area };
}

function SparkKPI({ lbl, val, unit, delta, color, soft, pts }) {
  const W = 220, H = 64, PAD = 6;
  const { line, area } = sparkPath(pts, W, H, PAD);
  const gid = "sk-" + lbl.replace(/[^a-z0-9]/gi, "");
  return (
    <div className="card lift" style={{ padding: "20px 22px 0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ fontSize: 13, color: "var(--ink-3)", fontWeight: 600, marginBottom: 10 }}>{lbl}</div>
      <div style={{
        fontFamily: "Manrope, sans-serif", fontWeight: 800,
        fontSize: 40, lineHeight: 1, letterSpacing: "-.02em", color: "var(--ink-1)",
      }}>
        {val}<span style={{ fontSize: 20, color: "var(--ink-3)", fontWeight: 700 }}>{unit}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 5, margin: "14px 0 0", fontSize: 13, fontWeight: 700, color: "var(--ok)" }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
        {delta}
      </div>
      {/* sparkline */}
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: "100%", height: 56, marginTop: 8, display: "block" }}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22"/>
            <stop offset="100%" stopColor={color} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${gid})`}/>
        <path d={line} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function Home({ goto }) {
  const activity = [
    { ic: "coins",   tint: "var(--ok-soft)",    ink: "var(--ok)",    title: "$324.50 已到账",                          sub: "HyperX Exchange · 11 月结算",       t: "刚刚" },
    { ic: "fire",    tint: "var(--warm-soft)",  ink: "var(--warm)",  title: "Pump or Dump 印尼区 12K 完成局",          sub: "+38% vs 上周 · 趋势向上",            t: "8m" },
    { ic: "brain",   tint: "var(--brand-soft)", ink: "var(--brand)", title: "Forge 给出 4 条 A/B 建议",                sub: "预计完成率 +18% · 立即查看",         t: "32m" },
    { ic: "msg",     tint: "#fcd1e1",           ink: "#b03a72",      title: "Bybit 品牌方对你的提案响应",              sub: "询问能否加入 7 日大赛变体",           t: "1h" },
    { ic: "spark",   tint: "#d3e8ff",           ink: "#3c64c5",      title: "分身 Aria · Degen 模式完成第 3 轮训练",   sub: "学习成熟度 +12% → 34%",              t: "昨天" },
  ];

  return (
    <div className="page">
      {/* HERO GREETING — serif, data-led */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 28,
        alignItems: "flex-end",
        marginBottom: 24,
      }}>
        <div>
          <h1 style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800,
            fontSize: 52,
            lineHeight: 1.05,
            letterSpacing: "-.03em",
            color: "var(--ink-1)",
            margin: 0,
          }}>
            晚上好，<em style={{ fontStyle: "normal", color: "var(--warm)" }}>Aria</em>。
          </h1>
          <p style={{
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--ink-3)",
            margin: "14px 0 0",
            maxWidth: 720,
          }}>
            你有 <b style={{ color: "var(--ink-1)", fontWeight: 700 }}>2 个</b>进行中的 Playable 营销活动，今日全球累计互动{" "}
            <b style={{ color: "var(--ink-1)", fontWeight: 700 }}>184,290</b> 次，待领取收益{" "}
            <b style={{ color: "var(--warm)", fontWeight: 700 }}>$1,284</b>。
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <button className="btn lg" onClick={() => goto("feedback")}>
            <Icon name="calendar" size={15}/> 9 月运营简报
          </button>
          <button className="btn warm lg" onClick={() => goto("workbench")}>
            <Icon name="spark" size={15} color="white"/> 开始新创作
          </button>
        </div>
      </div>

      {/* KPI ROW — with sparklines */}
      <div className="g g-4">
        <SparkKPI lbl="本月收益 (USD)" val="12,480" unit="" delta="+38%"
          color="var(--warm)" pts={[0.2, 0.26, 0.3, 0.27, 0.42, 0.5, 0.72, 0.9]}/>
        <SparkKPI lbl="全球互动" val="184,290" unit="" delta="+12%"
          color="var(--ink-1)" pts={[0.3, 0.34, 0.4, 0.44, 0.5, 0.62, 0.72, 0.82]}/>
        <SparkKPI lbl="平均完成率" val="62" unit="%" delta="+4 pts"
          color="var(--brand)" pts={[0.3, 0.34, 0.46, 0.5, 0.66, 0.72, 0.8, 0.84]}/>
        <SparkKPI lbl="AI 积分余额" val="4,820" unit="" delta="Pro 套餐"
          color="var(--ok)" pts={[0.82, 0.76, 0.6, 0.5, 0.42, 0.38, 0.33, 0.3]}/>
      </div>

      {/* CREATE · MARKET · SETTLE LOOP */}
      <LoopOverview goto={goto}/>
    </div>
  );
}

window.Home = Home;
window.KOL = KOL;
