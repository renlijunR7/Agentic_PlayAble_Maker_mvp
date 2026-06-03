// AirvanaMaker v2 — Preview Card
// 通用卡：手机预览 + 版本号 + 出处 + 状态徽章 + 统计 + 双按钮
// 用于：我的资产·普通 Playable / 我的资产·模板 / 模板中心

/* ─────────────────────────────────────────────────────
   MINI PHONE — 132×268 黑色机身
   ───────────────────────────────────────────────────── */
function MiniPhone({ children }) {
  return (
    <div style={{
      width: 138, height: 282,
      background: "#0b0d18",
      borderRadius: 22,
      border: "1.5px solid rgba(255,255,255,.06)",
      boxShadow: "0 18px 32px -10px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.08)",
      padding: "12px 10px",
      position: "relative",
      overflow: "hidden",
      color: "white",
    }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   SCENES — 6 种预览
   ───────────────────────────────────────────────────── */

// 1) PREDICT — K 线竞猜
function ScenePredict() {
  const candles = [
    { h: 28, t: 14, c: "down" }, { h: 22, t: 12, c: "down" }, { h: 34, t: 22, c: "up" },
    { h: 26, t: 14, c: "down" }, { h: 44, t: 30, c: "up" },   { h: 38, t: 24, c: "up" },
    { h: 52, t: 36, c: "up" },   { h: 46, t: 28, c: "down" }, { h: 60, t: 42, c: "up" },
    { h: 72, t: 52, c: "up" },   { h: 64, t: 44, c: "down" }, { h: 80, t: 58, c: "up" },
  ];
  return (
    <MiniPhone>
      <div style={{ display: "flex", alignItems: "center", gap: 4, paddingBottom: 6, borderBottom: "1px solid rgba(255,255,255,.05)" }}>
        <div style={{ width: 13, height: 13, borderRadius: 99, background: "#5b4dff", display: "grid", placeItems: "center", color: "white", fontSize: 7, fontWeight: 800 }}>A</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 7.5, fontWeight: 700 }}>Aria's Hunch</div>
          <div style={{ fontSize: 5.5, color: "rgba(255,255,255,.4)", fontFamily: "IBM Plex Mono, monospace", letterSpacing: ".04em" }}>ROUND 83 · BTC/USDT</div>
        </div>
        <div style={{ background: "rgba(255,255,255,.1)", padding: "1px 5px", borderRadius: 3, fontFamily: "IBM Plex Mono, monospace", fontSize: 7, fontWeight: 700 }}>00:42</div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", padding: "6px 2px 2px" }}>
        <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 14, lineHeight: 1 }}>
          $68,420<span style={{ fontSize: 8, color: "rgba(255,255,255,.5)" }}>.50</span>
        </div>
        <div style={{ color: "#7eff7c", fontSize: 7, fontWeight: 700, fontFamily: "IBM Plex Mono, monospace" }}>
          ▲ +2.18% <span style={{ color: "rgba(255,255,255,.4)" }}>24H</span>
        </div>
      </div>
      <div style={{ position: "relative", height: 132, padding: "10px 4px 14px" }}>
        <div style={{ position: "absolute", inset: "10px 4px 14px", display: "flex", alignItems: "flex-end", gap: 2 }}>
          {candles.map((c, i) => (
            <div key={i} style={{ flex: 1, position: "relative", height: "100%" }}>
              <div style={{
                position: "absolute", bottom: c.t, left: "50%", transform: "translateX(-50%)",
                width: 1.2, height: c.h - c.t,
                background: c.c === "up" ? "#7eff7c" : "#ff6c4a",
              }}/>
              <div style={{
                position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
                width: 5, height: c.t,
                background: c.c === "up" ? "#7eff7c" : "#ff6c4a",
              }}/>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 22, left: 4, right: 4, borderTop: "1px dashed rgba(255,255,255,.18)" }}/>
      </div>
      <div style={{
        padding: "4px 6px", background: "rgba(255,108,74,.18)",
        borderRadius: 5, fontSize: 6, fontWeight: 700, color: "#ffa688",
        textAlign: "center", fontFamily: "IBM Plex Mono, monospace", letterSpacing: ".06em",
      }}>ARIA · LIVE · RSI 突破</div>
    </MiniPhone>
  );
}

// 2) WHEEL — 转盘
function SceneWheel() {
  const tokens = ["SHIB", "BTC", "ETH", "USDT", "DOGE", "SOL"];
  return (
    <MiniPhone>
      <div style={{ textAlign: "center", padding: "8px 0 2px", fontFamily: "IBM Plex Mono, monospace", fontSize: 6, color: "rgba(255,255,255,.45)", letterSpacing: ".18em" }}>HYPERX × ARIA</div>
      <div style={{ textAlign: "center", marginTop: 4, fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontSize: 22, fontWeight: 400, lineHeight: 1, color: "rgba(255,255,255,.95)" }}>Token <span style={{ color: "#7adcdc" }}>Spin</span></div>
      <div style={{ position: "relative", width: 110, height: 110, margin: "26px auto 0" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 99, border: "1.5px solid rgba(122,220,220,.4)" }}/>
        <div style={{ position: "absolute", inset: 16, borderRadius: 99, border: "1px dashed rgba(122,220,220,.25)" }}/>
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 11, letterSpacing: ".12em", color: "rgba(122,220,220,.95)" }}>SPIN</div>
        </div>
        {tokens.map((tk, i) => {
          const a = (i / tokens.length) * Math.PI * 2 - Math.PI / 2;
          const r = 62;
          const x = 55 + Math.cos(a) * r;
          const y = 55 + Math.sin(a) * r;
          return (
            <div key={i} style={{
              position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)",
              fontSize: 7, fontWeight: 700, color: "rgba(255,255,255,.78)",
              fontFamily: "IBM Plex Mono, monospace", letterSpacing: ".02em",
            }}>{tk}</div>
          );
        })}
        <div style={{
          position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)",
          width: 0, height: 0,
          borderLeft: "4px solid transparent", borderRight: "4px solid transparent",
          borderTop: "6px solid #7adcdc",
        }}/>
      </div>
    </MiniPhone>
  );
}

// 3) WHALE — 鲸鱼追踪
function SceneWhale() {
  return (
    <MiniPhone>
      <div style={{ textAlign: "center", padding: "8px 0 2px", fontFamily: "IBM Plex Mono, monospace", fontSize: 6, color: "rgba(255,255,255,.45)", letterSpacing: ".18em" }}>WHALE WATCH</div>
      <div style={{ textAlign: "center", marginTop: 4, fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 14, lineHeight: 1.05, letterSpacing: "-.01em" }}>跟单 / 鲸鱼地址</div>
      <div style={{ display: "grid", placeItems: "center", padding: "20px 0 14px" }}>
        <svg width="70" height="38" viewBox="0 0 70 38" fill="none">
          <path d="M5 22 Q20 6, 42 12 Q62 18, 64 26 Q44 36, 26 32 Q12 28, 5 22 Z" fill="#3c8cd9"/>
          <circle cx="48" cy="17" r="1.5" fill="#fff"/>
          <path d="M58 24 L68 16 L68 30 Z" fill="#3c8cd9"/>
          <path d="M28 18 Q34 16, 40 18" stroke="rgba(255,255,255,.4)" strokeWidth="0.8" fill="none"/>
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: 6, borderTop: "1px solid rgba(255,255,255,.06)" }}>
        {[
          { addr: "0x4a1..8b3", a: "买入", c: "#7eff7c", amt: "1,240 ETH" },
          { addr: "0xd5f..8c1", a: "卖出", c: "#ff6c4a", amt: "12.8M USDT" },
          { addr: "0x9e2..7a4", a: "转入", c: "rgba(255,255,255,.5)", amt: "85 BTC" },
        ].map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", fontSize: 6.5, fontFamily: "IBM Plex Mono, monospace", gap: 6 }}>
            <span style={{ color: "rgba(255,255,255,.55)" }}>{r.addr}</span>
            <span style={{ color: r.c, fontWeight: 700 }}>▾ {r.a}</span>
            <span style={{ color: "rgba(255,255,255,.85)", fontWeight: 600, textAlign: "right" }}>{r.amt}</span>
          </div>
        ))}
      </div>
    </MiniPhone>
  );
}

// 4) STREAK — 连胜柱
function SceneStreak() {
  return (
    <MiniPhone>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 4px 8px", fontFamily: "IBM Plex Mono, monospace", fontSize: 6, color: "rgba(255,255,255,.45)", letterSpacing: ".12em" }}>
        <span>STREAK CLIMBER</span>
        <span style={{ background: "rgba(126,255,124,.20)", color: "#7eff7c", padding: "1px 5px", borderRadius: 3, fontWeight: 800 }}>×3.2</span>
      </div>
      <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 20, padding: "4px 4px 0", letterSpacing: "-.015em" }}>
        第 <em style={{ fontStyle: "normal", color: "#7eff7c", fontFamily: "Instrument Serif, serif", fontWeight: 400, fontSize: 26 }}>4</em> 连胜
      </div>
      <div style={{ position: "relative", height: 158, marginTop: 24, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 10 }}>
        {[36, 58, 80, 130].map((h, i) => (
          <div key={i} style={{
            width: 18, height: h,
            background: i === 3 ? "linear-gradient(180deg, #7eff7c, #2eaa70)" : "rgba(46, 170, 112, .35)",
            borderRadius: "4px 4px 0 0",
            position: "relative",
            boxShadow: i === 3 ? "0 0 16px rgba(126,255,124,.4)" : "none",
          }}>
            {i === 3 && (
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", fontSize: 14 }}>🔥</div>
            )}
          </div>
        ))}
      </div>
    </MiniPhone>
  );
}

// 5) MATCH — 配色网格
function SceneMatch() {
  const COLORS = ["#ff8c5a", "#5bcfe8", "#7eff7c", "#a08aff", "#ffdc3d", "#ff5c8a"];
  const LETTERS = ["B","E","S","D","U","R"];
  const seed = [3,1,2,0,4,5, 2,3,0,1,5,4, 1,4,3,2,0,5, 5,0,1,4,3,2, 3,2,4,1,5,0, 0,5,2,3,1,4];
  return (
    <MiniPhone>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "2px 4px 6px", fontFamily: "IBM Plex Mono, monospace", fontSize: 6, color: "rgba(255,255,255,.45)", letterSpacing: ".12em" }}>
        <span>TOKEN PAIR · DEX</span>
        <span style={{ background: "rgba(126,255,124,.2)", color: "#7eff7c", padding: "1px 5px", borderRadius: 3, fontWeight: 800 }}>×3 COMBO</span>
      </div>
      <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 18, padding: "4px 4px 10px", letterSpacing: "-.015em" }}>2,480</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 3, padding: "0 2px" }}>
        {seed.map((idx, i) => (
          <div key={i} style={{
            aspectRatio: "1", background: COLORS[idx], borderRadius: 99,
            display: "grid", placeItems: "center",
            color: "rgba(0,0,0,.6)", fontSize: 7, fontWeight: 800, fontFamily: "Manrope, sans-serif",
          }}>{LETTERS[idx]}</div>
        ))}
      </div>
    </MiniPhone>
  );
}

// 6) LADDER — 排行榜
function SceneLadder() {
  const rows = [
    { rank: 1, addr: "0x_4a8b", v: "4820", hi: true,  highlight: false },
    { rank: 2, addr: "Aria.eth", v: "4640", hi: true, highlight: true },
    { rank: 3, addr: "0x_1c2f", v: "4210", hi: true,  highlight: false },
    { rank: 4, addr: "0x_9e1a", v: "3850", hi: false, highlight: false },
    { rank: 5, addr: "0x_0d27", v: "3520", hi: false, highlight: false },
  ];
  return (
    <MiniPhone>
      <div style={{ padding: "4px 4px 4px", fontFamily: "IBM Plex Mono, monospace", fontSize: 6, color: "rgba(255,255,255,.45)", letterSpacing: ".12em" }}>
        7 日预言大赛
      </div>
      <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 16, padding: "2px 4px 14px", letterSpacing: "-.015em" }}>
        排行榜 · <span style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontWeight: 400, fontSize: 19, color: "#a08aff" }}>D5</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {rows.map(r => {
          const medalC = r.rank === 1 ? "#ff7a3d" : r.rank === 2 ? "rgba(255,255,255,.55)" : r.rank === 3 ? "#c97a4a" : "rgba(255,255,255,.18)";
          return (
            <div key={r.rank} style={{
              display: "grid", gridTemplateColumns: "16px 1fr auto",
              padding: "4px 6px",
              background: r.hi ? "rgba(255,255,255,.05)" : "transparent",
              borderRadius: 4,
              alignItems: "center", gap: 8,
            }}>
              <span style={{
                width: 14, height: 14, borderRadius: 99,
                background: medalC, color: r.rank <= 3 ? "white" : "rgba(255,255,255,.55)",
                fontSize: 7, fontWeight: 800, display: "grid", placeItems: "center", fontFamily: "Manrope, sans-serif",
              }}>{r.rank}</span>
              <span style={{ fontSize: 7, fontFamily: "IBM Plex Mono, monospace", color: r.highlight ? "#7eff7c" : "rgba(255,255,255,.8)", fontWeight: r.highlight ? 700 : 500 }}>{r.addr}</span>
              <span style={{ fontSize: 7, fontFamily: "IBM Plex Mono, monospace", color: r.rank === 1 ? "#ff7a3d" : "rgba(255,255,255,.7)", fontWeight: 700 }}>{r.v}</span>
            </div>
          );
        })}
      </div>
    </MiniPhone>
  );
}

const SCENES = {
  predict: { bg: "#0e2a47", grid: "rgba(91,140,200,.10)", render: ScenePredict },
  wheel:   { bg: "#1f1638", grid: "rgba(140,80,180,.10)", render: SceneWheel   },
  whale:   { bg: "#0a1f3c", grid: "rgba(60,100,180,.10)", render: SceneWhale   },
  streak:  { bg: "#0d2d1e", grid: "rgba(70,160,100,.10)", render: SceneStreak  },
  match:   { bg: "#10142a", grid: "rgba(90,100,170,.10)", render: SceneMatch   },
  ladder:  { bg: "#1a142e", grid: "rgba(140,90,200,.10)", render: SceneLadder  },
};

/* ─────────────────────────────────────────────────────
   PREVIEW CARD
   ───────────────────────────────────────────────────── */
function PreviewCard({
  scene, type, kind,
  title, version, isDraft,
  src, updated,
  status, statusTone,
  stats,
  primaryLabel, secondaryLabel,
  onPrimary, onSecondary,
}) {
  const s = SCENES[scene] || SCENES.predict;
  const Render = s.render;

  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 18,
      overflow: "hidden",
      display: "flex", flexDirection: "column",
      boxShadow: "var(--sh-sm)",
      transition: "transform .15s, box-shadow .15s",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--sh-md)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "var(--sh-sm)"; }}
    >
      {/* TOP — colored grid bg */}
      <div style={{
        position: "relative",
        background: s.bg,
        backgroundImage: `linear-gradient(${s.grid} 1px, transparent 1px), linear-gradient(90deg, ${s.grid} 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        padding: "12px 14px 12px",
        minHeight: 360,
        display: "flex", flexDirection: "column",
      }}>
        {/* radial glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(360px 240px at 50% 50%, rgba(255,255,255,.06), transparent 60%)`,
          pointerEvents: "none",
        }}/>

        {/* top row */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "3px 9px",
            background: "rgba(0,0,0,.45)",
            color: "rgba(255,255,255,.85)",
            borderRadius: 99,
            fontSize: 10.5, fontWeight: 700,
            fontFamily: "IBM Plex Mono, monospace",
            letterSpacing: ".03em",
            border: "1px solid rgba(255,255,255,.08)",
          }}>
            <Icon name={type === "template" ? "layers" : "box"} size={10} color="rgba(255,255,255,.85)"/>
            {type === "template" ? "模板" : "Playable"} · {kind}
          </span>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: 10.5, fontWeight: 700,
            color: "rgba(255,255,255,.65)",
            letterSpacing: ".04em",
          }}>
            {version}
            {isDraft && (
              <span style={{ background: "rgba(255,255,255,.1)", padding: "1px 6px", borderRadius: 4, color: "rgba(255,255,255,.85)", fontSize: 9.5 }}>草稿</span>
            )}
          </span>
        </div>

        {/* phone center */}
        <div style={{ position: "relative", flex: 1, display: "grid", placeItems: "center", padding: "10px 0" }}>
          <Render/>
        </div>

        {/* bottom meta */}
        <div style={{
          position: "relative", display: "flex", justifyContent: "space-between",
          marginTop: 4, fontSize: 10.5,
          color: "rgba(255,255,255,.55)",
          fontFamily: "IBM Plex Mono, monospace", letterSpacing: ".03em",
        }}>
          <span>{src}</span>
          <span>{updated}</span>
        </div>
      </div>

      {/* BOTTOM — white */}
      <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <h3 style={{
            margin: 0,
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800, fontSize: 16,
            letterSpacing: "-.005em",
            color: "var(--ink-1)",
          }}>{title}</h3>
          <span style={{
            padding: "3px 11px", borderRadius: 99,
            fontSize: 11, fontWeight: 700,
            background: statusTone === "ok"   ? "var(--ok-soft)"
                      : statusTone === "warn" ? "var(--warm-soft)"
                      : "var(--bg-2)",
            color:      statusTone === "ok"   ? "var(--ok)"
                      : statusTone === "warn" ? "var(--warm)"
                      : "var(--ink-3)",
            whiteSpace: "nowrap",
          }}>{status}</span>
        </div>

        {stats && (
          <div style={{
            display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
            gap: 10,
          }}>
            {stats.map((st, i) => (
              <div key={i}>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-4)", letterSpacing: ".06em", fontWeight: 700 }}>{st.k}</div>
                <div style={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 800, fontSize: 16,
                  marginTop: 3, letterSpacing: "-.005em",
                  color: "var(--ink-1)",
                }}>{st.v}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onSecondary} className="btn" style={{ flex: 1, justifyContent: "center" }}>
            <Icon name="copy" size={11}/> {secondaryLabel || "编辑模板"}
          </button>
          <button onClick={onPrimary} style={{
            flex: 1,
            padding: "9px 14px",
            background: "var(--ink-1)", color: "white",
            border: "none", borderRadius: 10,
            fontSize: 12.5, fontWeight: 700,
            fontFamily: "inherit",
            cursor: "default",
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
            boxShadow: "0 6px 16px -6px rgba(24,23,42,.4)",
          }}>
            <Icon name="spark" size={11} color="white"/> {primaryLabel || "用此模板创作"}
          </button>
        </div>
      </div>
    </div>
  );
}

window.PreviewCard = PreviewCard;
window.SCENES = SCENES;
