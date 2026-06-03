// AirvanaMaker v2 — Agentic Workbench
// Companion-style: left chat with Forge, right live preview + iterations.

function ChatBubble({ role, children, mood }) {
  const isForge = role === "forge";
  return (
    <div style={{
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      flexDirection: isForge ? "row" : "row-reverse",
      marginBottom: 14,
    }}>
      {isForge ? (
        <Mascot size={32} mood={mood || "happy"}/>
      ) : (
        <div style={{
          width: 32, height: 32, borderRadius: 99,
          background: "linear-gradient(135deg, var(--p-peach), var(--warm))",
          color: "white", display: "grid", placeItems: "center",
          fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 16, fontWeight: 700, flexShrink: 0,
        }}>A</div>
      )}
      <div style={{
        maxWidth: "78%",
        background: isForge ? "var(--surface)" : "var(--ink-1)",
        color: isForge ? "var(--ink-1)" : "white",
        padding: "10px 14px",
        borderRadius: isForge ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
        fontSize: 13.5,
        lineHeight: 1.55,
        border: isForge ? "1px solid var(--border)" : "none",
        boxShadow: isForge ? "var(--sh-sm)" : "var(--sh-md)",
      }}>
        {children}
      </div>
    </div>
  );
}

// ─── MOUNT PICKER POPUP ──────────────────────────────
function MountPicker({ kind, selected, onToggle, onClose }) {
  const CONFIG = {
    material: {
      title: "挂载文件", icon: "upload", accent: "var(--brand)",
      hint: "选择代码文件、文件夹或 GitHub 仓库，Forge 会读懂后参考。",
      items: [
        { id: "m1", name: "代码文件",    meta: "单个文件 · .js / .ts / .json …", tone: "p1", ic: "doc" },
        { id: "m2", name: "代码文件夹",  meta: "整个目录 · 递归读取",            tone: "p3", ic: "box" },
        { id: "m3", name: "GitHub 仓库", meta: "粘贴仓库链接 · 自动拉取",        tone: "p5", ic: "globe" },
      ],
      upload: true,
    },
    clone: {
      title: "选择分身", icon: "brain", accent: "var(--warm)",
      hint: "挂上分身后,Forge 会用它的语气、形象与台本来生成内容。",
      items: [
        { id: "c1", name: "Aria · Degen",    meta: "成熟度 34% · 币圈解说",   tone: "p1", mood: "happy" },
        { id: "c2", name: "Aria · Streamer", meta: "成熟度 61% · 试玩直播",   tone: "p3", mood: "wink" },
        { id: "c3", name: "Aria · Guild",    meta: "成熟度 22% · 公会运营",   tone: "p5", mood: "cool" },
        { id: "c4", name: "Nova · 虚拟偶像",  meta: "成熟度 48% · 时尚带货",   tone: "p4", mood: "happy" },
      ],
    },
    template: {
      title: "选择模板", icon: "layers", accent: "var(--ok)",
      hint: "套用一个跑通的局,只需填几个槽位就能开始。",
      grid: true,
      items: [
        { id: "t1", name: "60s 涨跌预言局", meta: "复用 12 次", scene: "predict", ver: "v3.2" },
        { id: "t2", name: "Token Spin 转盘", meta: "复用 8 次",  scene: "wheel",   ver: "v1.4" },
        { id: "t3", name: "7 日预言大赛",    meta: "草稿",       scene: "ladder",  ver: "v0.3" },
        { id: "t4", name: "Memecoin 战神",  meta: "复用 7 次",  scene: "predict", ver: "v2.0" },
        { id: "t5", name: "鲸鱼跟单局",     meta: "复用 6 次",  scene: "whale",   ver: "v1.1" },
        { id: "t6", name: "连胜攀登",       meta: "复用 4 次",  scene: "streak",  ver: "v2.0" },
        { id: "t7", name: "Token 配对消除", meta: "复用 5 次",  scene: "match",   ver: "v1.0" },
        { id: "t8", name: "塔罗排行榜",     meta: "复用 3 次",  scene: "ladder",  ver: "v1.6" },
        { id: "t9", name: "答题闪击 100",   meta: "复用 2 次",  scene: "streak",  ver: "v2.1" },
      ],
    },
  };
  const cfg = CONFIG[kind];
  const multi = kind === "material";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(24,23,42,.32)",
        backdropFilter: "blur(3px)",
        display: "grid", placeItems: "center",
        animation: "fadeIn .14s ease-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: cfg.grid ? 680 : 460, maxWidth: "92vw", maxHeight: "82vh",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 18,
          boxShadow: "0 28px 64px -16px rgba(24,23,42,.3)",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* header */}
        <div style={{ padding: "18px 22px 14px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: cfg.accent, color: "white",
              display: "grid", placeItems: "center",
              boxShadow: `0 6px 16px -6px ${cfg.accent}`,
            }}>
              <Icon name={cfg.icon} size={16} color="white"/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 17, lineHeight: 1.1 }}>{cfg.title}</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 3 }}>{cfg.hint}</div>
            </div>
            <button onClick={onClose} style={{ background: "transparent", border: "none", color: "var(--ink-4)", padding: 4, cursor: "default", display: "inline-flex" }}>
              <Icon name="x" size={15} color="var(--ink-4)"/>
            </button>
          </div>
        </div>

        {/* list / grid */}
        <div style={{
          overflowY: "auto", padding: "14px 16px",
          ...(cfg.grid
            ? { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }
            : { display: "flex", flexDirection: "column", gap: 6 }),
        }}>
          {cfg.upload && (
            <button style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 14px",
              border: "1.5px dashed var(--border-2)",
              borderRadius: 12,
              background: "var(--bg-1, #fafaff)",
              color: cfg.accent,
              fontFamily: "inherit", fontSize: 13, fontWeight: 700,
              cursor: "default", marginBottom: 4,
            }}>
              <Icon name="upload" size={14} color={cfg.accent}/> 上传新文件…
            </button>
          )}

          {/* GRID MODE — template cards with scene preview (九宫格) */}
          {cfg.grid && cfg.items.map((it) => {
            const on = selected.includes(it.id);
            const sc = (window.SCENES || {})[it.scene] || {};
            const SceneRender = sc.render;
            return (
              <div key={it.id}
                onClick={() => onToggle(it.id, multi)}
                style={{
                  borderRadius: 14, overflow: "hidden",
                  border: `2px solid ${on ? cfg.accent : "var(--border)"}`,
                  background: "var(--surface)",
                  cursor: "default",
                  transition: "border-color .12s, transform .1s",
                  position: "relative",
                }}
              >
                {/* preview */}
                <div style={{
                  position: "relative", height: 124, overflow: "hidden",
                  background: sc.bg || "#0e2a47",
                  backgroundImage: `linear-gradient(${sc.grid || "rgba(255,255,255,.08)"} 1px, transparent 1px), linear-gradient(90deg, ${sc.grid || "rgba(255,255,255,.08)"} 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}>
                  {SceneRender && (
                    <div style={{
                      position: "absolute", left: "50%", top: 12,
                      width: 138, height: 282,
                      transform: "translateX(-50%) scale(.52)", transformOrigin: "top center",
                      pointerEvents: "none",
                      filter: "drop-shadow(0 10px 18px rgba(0,0,0,.4))",
                    }}>
                      <SceneRender/>
                    </div>
                  )}
                  {/* version chip */}
                  <span style={{
                    position: "absolute", top: 8, left: 8,
                    padding: "2px 7px", borderRadius: 99,
                    background: "rgba(0,0,0,.45)", color: "rgba(255,255,255,.9)",
                    fontSize: 9.5, fontWeight: 700, fontFamily: "IBM Plex Mono, monospace",
                    border: "1px solid rgba(255,255,255,.1)",
                  }}>{it.ver}</span>
                  {/* check */}
                  <div style={{
                    position: "absolute", top: 8, right: 8,
                    width: 20, height: 20, borderRadius: 99,
                    border: `1.5px solid ${on ? cfg.accent : "rgba(255,255,255,.5)"}`,
                    background: on ? cfg.accent : "rgba(0,0,0,.3)",
                    display: "grid", placeItems: "center",
                  }}>
                    {on && <Icon name="check" size={12} color="white"/>}
                  </div>
                </div>
                {/* meta */}
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-1)", letterSpacing: "-.005em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.name}</div>
                  <div style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 2 }}>{it.meta}</div>
                </div>
              </div>
            );
          })}

          {/* LIST MODE */}
          {!cfg.grid && cfg.items.map((it) => {
            const on = selected.includes(it.id);
            return (
              <div key={it.id}
                onClick={() => onToggle(it.id, multi)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: `1.5px solid ${on ? cfg.accent : "var(--border)"}`,
                  background: on ? `color-mix(in srgb, ${cfg.accent} 7%, var(--surface))` : "var(--surface)",
                  cursor: "default",
                  transition: "border-color .12s, background .12s",
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  {kind === "clone" ? (
                    <Mascot size={34} mood={it.mood}/>
                  ) : (
                    <div className={`tile tile-${it.tone}`} style={{
                      width: 34, height: 34, borderRadius: 9,
                      display: "grid", placeItems: "center",
                    }}>
                      <Icon name={kind === "template" ? "layers" : it.ic} size={15} color="rgba(24,23,42,.6)"/>
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink-1)", letterSpacing: "-.005em" }}>{it.name}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{it.meta}</div>
                </div>
                <div style={{
                  width: 20, height: 20, borderRadius: multi ? 6 : 99,
                  border: `1.5px solid ${on ? cfg.accent : "var(--border-2)"}`,
                  background: on ? cfg.accent : "transparent",
                  display: "grid", placeItems: "center",
                  flexShrink: 0,
                }}>
                  {on && <Icon name="check" size={12} color="white"/>}
                </div>
              </div>
            );
          })}
        </div>

        {/* footer */}
        <div style={{
          padding: "12px 18px",
          borderTop: "1px solid var(--border)",
          background: "var(--bg-1, #fafaff)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 12, color: "var(--ink-3)" }}>
            已选 <b style={{ color: "var(--ink-1)", fontWeight: 700 }}>{selected.length}</b> 项
          </span>
          <button onClick={onClose} style={{
            padding: "8px 18px",
            background: cfg.accent, color: "white",
            border: "none", borderRadius: 10,
            fontSize: 13, fontWeight: 700,
            fontFamily: "inherit", cursor: "default",
          }}>完成</button>
        </div>
      </div>
    </div>
  );
}

const MOUNT_NAMES = {
  m1: "代码文件", m2: "代码文件夹", m3: "GitHub 仓库",
  c1: "Aria · Degen", c2: "Aria · Streamer", c3: "Aria · Guild", c4: "Nova",
  t1: "60s 预言局", t2: "Token Spin", t3: "7 日大赛", t4: "Memecoin 战神",
  t5: "鲸鱼跟单局", t6: "连胜攀登", t7: "Token 配对", t8: "塔罗榜", t9: "答题闪击",
};

function Workbench({ goto }) {
  const [started, setStarted] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");
  const [stage, setStage] = React.useState("intro");
  const [picker, setPicker] = React.useState(null); // "material" | "clone" | "template"
  const [mounts, setMounts] = React.useState({ material: [], clone: [], template: [] });

  const toggleMount = (id, multi) => {
    setMounts((m) => {
      const cur = m[picker];
      let next;
      if (multi) {
        next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
      } else {
        next = cur.includes(id) ? [] : [id];
      }
      return { ...m, [picker]: next };
    });
  };
  React.useEffect(() => {
    if (!started) return;
    const seq = ["intro", "playing", "reward"];
    const i = seq.indexOf(stage);
    const t = setTimeout(() => setStage(seq[(i + 1) % seq.length]), stage === "playing" ? 3800 : 2400);
    return () => clearTimeout(t);
  }, [stage, started]);

  // ─── EMPTY / ENTRY STATE ──────────────────────────────
  if (!started) {
    const suggestions = [
      { ic: "fire",  tone: "p1", title: "60s 涨跌预言局",   ds: "币圈 KOL · USDT 微奖励" },
      { ic: "spark", tone: "p3", title: "新游试玩抢先体验",  ds: "MMORPG · 弹幕互动" },
      { ic: "crown", tone: "p5", title: "7 日大赛 + 联名",   ds: "Bybit / Lazada 套用" },
      { ic: "heart", tone: "p4", title: "穿搭对决",          ds: "美妆 KOL · 投票淘汰" },
      { ic: "bolt",  tone: "p6", title: "答题闪击 100",      ds: "教育 KOL · 限时百题" },
      { ic: "star",  tone: "p2", title: "塔罗抽签",          ds: "玄学 KOL · 分享驱动" },
    ];

    const recents = [
      { nm: "Pump or Dump",     when: "今天 09:14", asset: "Bybit", tone: "p1" },
      { nm: "Velvet Lip v6",    when: "昨 22:32",  asset: "Maybelline", tone: "p4" },
      { nm: "Idol Match · 大赛", when: "05/19",     asset: "Lazada", tone: "p5" },
    ];

    const submit = () => {
      if (!prompt.trim()) return;
      setStarted(true);
    };

    return (
      <div className="page" style={{
        paddingBottom: 32, paddingTop: 16,
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          maxWidth: 920,
          width: "100%",
          margin: "0 auto",
          gap: 24,
        }}>
          {/* MAIN PROMPT CARD */}
          <div style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-xl)",
            padding: 28,
            boxShadow: "var(--sh-md)",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background:
                "radial-gradient(500px 250px at 100% 0%, rgba(91,77,255,.08), transparent 60%)," +
                "radial-gradient(400px 250px at 0% 100%, rgba(255,122,61,.06), transparent 50%)",
              pointerEvents: "none",
            }}/>

            {/* greeting row */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, position: "relative" }}>
              <Mascot size={52} mood="happy"/>
              <div>
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 26, lineHeight: 1.1, letterSpacing: "-.01em" }}>
                  你好 Aria，<em style={{ color: "var(--brand)" }}>今天</em> 想做什么？
                </div>
              </div>
            </div>

            {/* big prompt */}
            <div style={{
              background: "var(--bg-2)",
              border: "1.5px solid var(--border)",
              borderRadius: 16,
              padding: 16,
              position: "relative",
              transition: "border-color .15s",
            }}>
              <textarea
                placeholder="例如：帮我做一个针对币圈 KOL 的 Playable，重点是分享率，60 秒一局……"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
                }}
                rows={4}
                style={{
                  width: "100%",
                  border: "none", background: "transparent",
                  font: "inherit", fontSize: 14, lineHeight: 1.55,
                  resize: "none",
                  color: "var(--ink-1)",
                  outline: "none",
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                <button
                  className={`btn sm ${mounts.template.length ? "" : "ghost"}`}
                  onClick={() => setPicker("template")}
                  style={mounts.template.length ? { borderColor: "var(--ok)", color: "var(--ok)" } : {}}
                >
                  <Icon name="layers" size={12} color={mounts.template.length ? "var(--ok)" : undefined}/> {mounts.template.length ? MOUNT_NAMES[mounts.template[0]] : "选模板"}
                </button>
                <span style={{ flex: 1 }}/>
                <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>⌘ + Enter</span>
                <button
                  className="btn brand"
                  onClick={submit}
                  disabled={!prompt.trim()}
                  style={{ opacity: prompt.trim() ? 1 : .5 }}
                >
                  <Icon name="spark" size={13} color="white"/> 开始创作
                </button>
              </div>
            </div>

            {/* suggestion chips */}
          </div>

          {/* TRY-THESE SUGGESTIONS */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap",
            gap: 8, padding: "0 6px",
          }}>
            <span style={{
              fontSize: 11.5, color: "var(--ink-3)", fontWeight: 600,
              display: "inline-flex", alignItems: "center", gap: 5,
              flexShrink: 0,
            }}>
              试试这些 <Icon name="arrow_r" size={11} color="var(--ink-4)"/>
            </span>
            {[
              "给 Pump or Dump 加一段 3 连胜倍赔率彩蛋",
              "为《Velvet Lip 试用装》接入「自动评论员」智能体",
              "做一个 7 日预言大赛，奖金池 5000 USDT",
            ].map((s, i) => (
              <button
                key={i}
                onClick={() => setPrompt(s)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "6px 12px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 99,
                  fontSize: 11.5, fontWeight: 600,
                  color: "var(--ink-2)",
                  fontFamily: "inherit",
                  cursor: "default",
                  boxShadow: "var(--sh-sm)",
                  transition: "border-color .12s, transform .12s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--brand)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}
              >
                <Icon name="spark" size={11} color="var(--brand)"/> {s}
              </button>
            ))}
          </div>
        </div>

        {picker && (
          <MountPicker
            kind={picker}
            selected={mounts[picker]}
            onToggle={toggleMount}
            onClose={() => setPicker(null)}
          />
        )}
      </div>
    );
  }

  // ─── STARTED / CREATING STATE (3-col) ─────────────────
  return (
    <div className="page">
      <div className="page-h">
        <div>
          <div className="tag brand" style={{ marginBottom: 10 }}>
            <Icon name="spark" size={11} color="var(--brand)"/> AGENTIC 工作台 · 会话 #2308
          </div>
          <h1>正在和 <em>Forge</em> 共同<br/>打磨一段 <span className="warm">Pump or Dump</span></h1>
        </div>
        <div className="right">
          <button className="btn" onClick={() => setStarted(false)}><Icon name="plus" size={13}/> 新会话</button>
          <button className="btn"><Icon name="refresh" size={13}/> 重置</button>
          <button className="btn dark"><Icon name="download" size={13} color="white"/> 导出工程</button>
          <button className="btn brand">
            <Icon name="rocket" size={13} color="white"/> 发布到 8 平台
          </button>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr 1fr",
        gap: 16,
        height: "calc(100vh - 220px)",
        minHeight: 640,
      }}>
        {/* LEFT — chat with Forge */}
        <div className="card" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div className="card-hd">
            <Mascot size={28} mood="happy"/>
            <div>
              <h3>Forge Agent</h3>
              <div className="sub">v4.2 · 学习成熟度 34% · 在线</div>
            </div>
            <div className="right">
              <button className="btn sm ghost"><Icon name="more" size={14}/></button>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "8px 18px" }}>
            <div className="mono" style={{ textAlign: "center", fontSize: 10.5, color: "var(--ink-3)", margin: "10px 0 14px", letterSpacing: ".1em" }}>
              · 11:24 ·
            </div>

            <ChatBubble role="me">
              帮我做一个针对币圈 KOL 的 Playable，要能拉新和留存。
            </ChatBubble>

            <ChatBubble role="forge" mood="thinking">
              收到。我从你过去 30 天的数据里看到 BTC/ETH 短期波动相关内容互动最高，建议做 <b>K 线方向预言</b> + <b>USDT 微奖励</b> 的结构。<br/><br/>
              是要 60 秒短局还是 7 日大赛模式？
            </ChatBubble>

            <ChatBubble role="me">
              先做 60 秒短局，重点是分享率。
            </ChatBubble>

            <ChatBubble role="forge">
              已生成首版 <span className="tag brand" style={{ fontSize: 10 }}>v1</span>。右侧可以试玩。<br/><br/>
              我提了三个差异化变体：
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                {["A · 连胜赔率锁定 (建议)", "B · 限时双倍奖励池", "C · 分身解说员陪伴"].map((v, i) => (
                  <div key={i} style={{
                    padding: "6px 10px",
                    background: i === 0 ? "var(--brand-soft)" : "var(--bg-2)",
                    color: i === 0 ? "var(--brand)" : "var(--ink-2)",
                    borderRadius: 8, fontSize: 12, fontWeight: 600,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <Icon name={i === 0 ? "check" : "arrow_r"} size={11}/> {v}
                  </div>
                ))}
              </div>
            </ChatBubble>

            <ChatBubble role="forge" mood="wink">
              <span className="mono" style={{ fontSize: 11, color: "var(--brand)" }}>[实时] </span>
              你的分身 Aria 已经学会 Pump 套话 28 条，可以挂上去做开场。
            </ChatBubble>
          </div>

          <div style={{ padding: 14, borderTop: "1px solid var(--border)" }}>
            <div style={{
              background: "var(--bg-2)",
              border: "1.5px solid var(--border)",
              borderRadius: 14,
              padding: 12,
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              <textarea
                placeholder="再调一下：让奖励池更刺激一点……"
                rows={2}
                style={{
                  border: "none", background: "transparent",
                  font: "inherit", fontSize: 13, resize: "none",
                  color: "var(--ink-1)",
                }}
              />
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <button className="btn sm ghost"><Icon name="upload" size={12}/> 资料</button>
                <button className="btn sm ghost"><Icon name="brain" size={12}/> 调分身</button>
                <button className="btn sm ghost"><Icon name="spark" size={12}/> 灵感</button>
                <span style={{ flex: 1 }}/>
                <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)" }}>消耗 38 积分</span>
                <button className="btn brand sm">
                  <Icon name="send" size={11} color="white"/> 发送
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE — preview phone */}
        <div className="card" style={{
          display: "flex", flexDirection: "column", overflow: "hidden",
          background: "linear-gradient(180deg, #18172a 0%, #2a2645 100%)",
          color: "white", borderColor: "transparent",
        }}>
          <div className="card-hd" style={{ borderColor: "rgba(255,255,255,.08)" }}>
            <h3 style={{ color: "white" }}>实时预览</h3>
            <span className="sub" style={{ color: "rgba(255,255,255,.5)" }}>v1 · 自动循环</span>
            <div className="right">
              <button className="btn sm" style={{ background: "rgba(255,255,255,.1)", borderColor: "transparent", color: "white" }}>
                <Icon name="play" size={11} color="white"/> 试玩
              </button>
            </div>
          </div>
          <div style={{
            flex: 1, display: "grid", placeItems: "center",
            padding: "20px 0",
            position: "relative",
          }}>
            {/* halos */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(400px 400px at 50% 50%, rgba(91,77,255,.25), transparent 70%)" }}/>

            <div className="phone" style={{ width: 220, transform: "scale(.95)" }}>
              <div className="screen">
                <div className="notch"/>
                <div style={{
                  position: "absolute", inset: 0,
                  background: stage === "intro"
                    ? "linear-gradient(180deg, #ff7a3d 0%, #c44a3a 50%, #2a1410 100%)"
                    : stage === "playing"
                    ? "linear-gradient(180deg, #4a3a2a 0%, #1a1310 60%, #0a0806 100%)"
                    : "linear-gradient(180deg, #2eaa70 0%, #1f8a5b 50%, #0a3a25 100%)",
                  transition: "background .5s ease",
                }}/>
                <div style={{
                  position: "relative", zIndex: 2,
                  width: "100%", height: "100%",
                  padding: "44px 16px 16px",
                  display: "flex", flexDirection: "column",
                  color: "white",
                }}>
                  <div style={{ display: "flex", gap: 6, fontSize: 10, fontWeight: 700 }}>
                    <span style={{ background: "rgba(255,255,255,.16)", padding: "3px 7px", borderRadius: 99, fontFamily: "IBM Plex Mono, monospace" }}>L4</span>
                    <span style={{ alignSelf: "center" }}>Pump or <em style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>Dump</em></span>
                    <span style={{ marginLeft: "auto", background: "var(--warm)", padding: "3px 7px", borderRadius: 99, fontFamily: "IBM Plex Mono, monospace" }}>2.4M</span>
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    {stage === "intro" && (
                      <>
                        <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 22, lineHeight: 1.1, textAlign: "center" }}>
                          猜对方向<br/><em style={{ color: "var(--warm)" }}>赢取 USDT</em>
                        </div>
                        <div className="mono" style={{ fontSize: 9.5, opacity: .55, letterSpacing: ".08em" }}>@aria.kol presents</div>
                      </>
                    )}
                    {stage === "playing" && (
                      <>
                        <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 16, textAlign: "center" }}>
                          下一根 K 线<br/>将是 <em style={{ color: "var(--warm)" }}>?</em>
                        </div>
                        <div className="mono" style={{ fontSize: 9, color: "#ffd9c8" }}>剩余 47s · BTC/USDT</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, width: "100%", marginTop: 6 }}>
                          <div style={{ background: "#2eaa70", color: "#0a3a25", padding: "8px 6px", borderRadius: 9, fontSize: 11, fontWeight: 800, textAlign: "center" }}>PUMP ↑</div>
                          <div style={{ background: "var(--warm)", color: "#2a1410", padding: "8px 6px", borderRadius: 9, fontSize: 11, fontWeight: 800, textAlign: "center" }}>DUMP ↓</div>
                        </div>
                      </>
                    )}
                    {stage === "reward" && (
                      <>
                        <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 18 }}>连胜 +1</div>
                        <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 36 }}>$0.84<span className="mono" style={{ fontSize: 12, color: "rgba(255,255,255,.7)", marginLeft: 4 }}>USDT</span></div>
                        <div className="mono" style={{ fontSize: 9.5, opacity: .65 }}>已入账 KOL · 玩家钱包</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* stage dots */}
            <div style={{ position: "absolute", bottom: 18, display: "flex", gap: 6 }}>
              {["intro", "playing", "reward"].map(s => (
                <span key={s} style={{
                  width: stage === s ? 24 : 6, height: 6,
                  borderRadius: 99,
                  background: stage === s ? "var(--brand)" : "rgba(255,255,255,.2)",
                  transition: "all .3s ease",
                }}/>
              ))}
            </div>
          </div>

          <div style={{
            padding: 14,
            borderTop: "1px solid rgba(255,255,255,.08)",
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8,
          }}>
            {[
              { k: "预计完成率", v: "62%", c: "var(--ok)" },
              { k: "预计分享率", v: "18%", c: "var(--warm)" },
              { k: "每局成本",   v: "$0.06", c: "#a89eff" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,.5)", letterSpacing: ".06em" }}>{s.k}</div>
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 22, color: s.c, marginTop: 2 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — iterations / variants */}
        <div className="card" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div className="card-hd">
            <h3>Forge 提议的<em style={{ color: "var(--brand)", fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>变体</em></h3>
            <span className="sub">3 个</span>
            <div className="right">
              <button className="btn sm">
                <Icon name="plus" size={11}/> 新变体
              </button>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 18px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { name: "v1 · 基础版", tag: "当前", tagC: "var(--ink-1)", desc: "60 秒单局 · 连胜锁定", metrics: [["完成", "62%"], ["分享", "18%"]], tone: "p3" },
              { name: "v1.a · 双倍奖励池", tag: "A/B 中", tagC: "var(--brand)", desc: "前 100 局奖励翻倍 · 增加紧迫感", metrics: [["完成", "—"], ["预估", "+24%"]], tone: "p6" },
              { name: "v1.b · 分身解说", tag: "草稿", tagC: "var(--ink-3)", desc: "Aria 分身全程语音陪伴", metrics: [["完成", "—"], ["新", "•"]], tone: "p4" },
              { name: "v1.c · 大赛 7 日", tag: "草稿", tagC: "var(--ink-3)", desc: "Bybit 联名 7 日榜单", metrics: [["完成", "—"], ["新", "•"]], tone: "p5" },
            ].map((v, i) => (
              <div key={i} className="lift" style={{
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: 12,
                background: "var(--surface)",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
              }}>
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  width: 80, height: 80, borderRadius: "0 14px 0 80px",
                  opacity: .5,
                }} className={`tile-${v.tone}`}/>
                <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700 }}>{v.name}</div>
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    padding: "2px 7px",
                    borderRadius: 99,
                    background: v.tag === "当前" ? "var(--ink-1)" : v.tag === "A/B 中" ? "var(--brand-soft)" : "var(--bg-2)",
                    color: v.tag === "当前" ? "white" : v.tagC,
                  }}>{v.tag}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 10 }}>{v.desc}</div>
                <div style={{ display: "flex", gap: 14, fontSize: 11 }}>
                  {v.metrics.map(([k, val], j) => (
                    <div key={j}>
                      <span className="mono" style={{ color: "var(--ink-3)", letterSpacing: ".05em" }}>{k}</span>{" "}
                      <span style={{ fontWeight: 700, color: "var(--ink-1)" }}>{val}</span>
                    </div>
                  ))}
                  <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
                    <button className="btn sm ghost" style={{ padding: "3px 6px" }}>
                      <Icon name="eye" size={11}/>
                    </button>
                    <button className="btn sm ghost" style={{ padding: "3px 6px" }}>
                      <Icon name="copy" size={11}/>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div style={{
              border: "1.5px dashed var(--border-2)",
              borderRadius: 14,
              padding: 18,
              textAlign: "center",
              color: "var(--ink-3)",
              fontSize: 12.5,
              background: "transparent",
              marginTop: 4,
            }}>
              拖拽一段录音或上传素材<br/>
              <span className="mono" style={{ fontSize: 10.5 }}>Forge 会自动学习并生成新变体</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Workbench = Workbench;
