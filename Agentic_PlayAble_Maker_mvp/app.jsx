// AirvanaMaker v2 — App shell + router

const NAV_GROUPS = [
  { group: "工作流", items: [
    { id: "workbench",  label: "Agentic 工作台", icon: "spark", badge: "AI" },
    { id: "assets",     label: "我的资产",     icon: "box" },
    { id: "templates",  label: "模板中心",     icon: "layers" },
    { id: "tasks",      label: "历史对话",     icon: "flow", badge: "3" },
  ]},
  { group: "运营", items: [
    { id: "distribute", label: "全球分发",     icon: "send" },
    { id: "feedback",   label: "运营反馈",     icon: "bolt", dot: true },
  ]},
  { group: "钱包", items: [
    { id: "wallet",     label: "钱包 · 资产",   icon: "wallet" },
  ]},
  { group: "代理", items: [
    { id: "world",      label: "Agent 世界",   icon: "globe", badge: "NEW" },
  ]},
];

const CRUMB = {
  workbench:  "Agentic 工作台",
  assets:     "我的资产",
  templates:  "模板中心",
  tasks:      "历史对话",
  world:      "Agent 世界 / 全球节点",
  distribute: "全球分发",
  feedback:   "运营反馈",
  wallet:     "钱包 · 资产",
};

function Sidebar({ page, setPage }) {
  return (
    <div className="sb">
      <div className="sb-brand">
        <Mascot size={32} mood="happy"/>
        <div className="name">Airvana<em>Maker</em></div>
      </div>

      {NAV_GROUPS.map((g, gi) => (
        <div className="sb-group" key={gi}>
          <div className="sb-h">{g.group}</div>
          {g.items.map(it => (
            <div key={it.id} className={`sb-it ${page === it.id ? "on" : ""}`} onClick={() => setPage(it.id)}>
              <Icon name={it.icon} size={15} color={page === it.id ? "white" : "var(--ink-3)"}/>
              <span>{it.label}</span>
              {it.badge && <span className="badge">{it.badge}</span>}
              {it.dot && !it.badge && <span className="dot"/>}
            </div>
          ))}
        </div>
      ))}

      <div className="sb-spacer"/>
    </div>
  );
}

function TopBar({ page, setPage, onLogout }) {
  const [openPanel, setOpenPanel] = React.useState(null); // "bell" | "user" | null

  // Close on outside click
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    if (!openPanel) return;
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpenPanel(null);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [openPanel]);

  return (
    <div className="tb" ref={rootRef} style={{ position: "relative" }}>
      <div className="tb-crumb">AirvanaMaker / <b>{CRUMB[page]}</b></div>
      <div className="tb-spacer"/>

      <div style={{ position: "relative" }}>
        <button
          className="btn ghost"
          style={{
            position: "relative", padding: "8px 10px",
            background: openPanel === "bell" ? "var(--bg-2)" : "transparent",
          }}
          onClick={() => setOpenPanel(openPanel === "bell" ? null : "bell")}
        >
          <Icon name="bell" size={15}/>
          <span style={{
            position: "absolute", top: 4, right: 4,
            width: 14, height: 14, borderRadius: 99,
            background: "var(--warm)", color: "white",
            fontSize: 9, fontWeight: 800,
            display: "grid", placeItems: "center",
            border: "2px solid var(--bg)",
            fontFamily: "IBM Plex Mono, monospace",
          }}>4</span>
        </button>
        {openPanel === "bell" && <NotificationCenter onClose={() => setOpenPanel(null)} goto={(p) => { setPage(p); setOpenPanel(null); }}/>}
      </div>

      <div style={{ position: "relative" }}>
        <div
          onClick={() => setOpenPanel(openPanel === "user" ? null : "user")}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "4px 10px 4px 4px",
            background: openPanel === "user" ? "var(--bg-2)" : "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 99,
            boxShadow: openPanel === "user" ? "none" : "var(--sh-sm)",
            cursor: "default",
          }}
        >
          <div style={{
            width: 28, height: 28, borderRadius: 99,
            background: "linear-gradient(135deg, var(--p-peach), var(--warm))",
            display: "grid", placeItems: "center",
            color: "white", fontWeight: 800, fontSize: 13,
            fontFamily: "Manrope, sans-serif",
          }}>A</div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-1)" }}>Aria</div>
            <div className="mono" style={{ fontSize: 9.5, color: "var(--ink-3)" }}>S 级</div>
          </div>
          <Icon name="chev_d" size={12} color="var(--ink-3)" style={{ transform: openPanel === "user" ? "rotate(180deg)" : "none", transition: "transform .15s" }}/>
        </div>
        {openPanel === "user" && <ProfileCenter onClose={() => setOpenPanel(null)} goto={(p) => { setPage(p); setOpenPanel(null); }} onLogout={() => { setOpenPanel(null); onLogout(); }}/>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   NOTIFICATION CENTER — bell dropdown
   ───────────────────────────────────────────────────── */
function NotificationCenter({ onClose, goto }) {
  const [filter, setFilter] = React.useState("all");

  const items = [
    {
      cat: "brand", read: false,
      ic: "msg", tint: "#fcd1e1", ink: "#b03a72",
      title: "Bybit 品牌方对你的提案有响应",
      body: "「想加入 7 日大赛变体，预算上限 $2,400，能聊聊吗？」",
      time: "32 分钟前", action: "回复提案", to: "feedback",
    },
    {
      cat: "forge", read: false,
      ic: "spark", tint: "var(--brand-soft)", ink: "var(--brand)",
      title: "Forge 给出 4 条 A/B 建议",
      body: "Pump or Dump 完成率预估 +18%，包含「双倍奖励池」「分身解说」等。",
      time: "1 小时前", action: "去工作台", to: "workbench",
    },
    {
      cat: "clone", read: false,
      ic: "brain", tint: "#d3e8ff", ink: "#3c64c5",
      title: "分身 Aria · Degen 完成第 3 轮训练",
      body: "学习成熟度 22% → 34%，已掌握 28 条 Pump 套话，可挂载到主线。",
      time: "2 小时前", action: "查看节点", to: "world",
    },
    {
      cat: "money", read: false,
      ic: "coins", tint: "var(--warm-soft)", ink: "var(--warm)",
      title: "结算 $284 已到账",
      body: "Maybelline · Velvet Lip 五月第三周分成，已自动入 USDC 主钱包。",
      time: "今天 09:12", action: "去钱包", to: "wallet",
    },
    {
      cat: "world", read: true,
      ic: "globe", tint: "var(--brand-soft)", ink: "var(--brand)",
      title: "Jakarta 节点完成 9,820 局",
      body: "印尼语带局连续 14 天上榜，建议把同款挂到 Manila。",
      time: "昨天 21:40", action: "查看节点", to: "world",
    },
    {
      cat: "system", read: true,
      ic: "shield", tint: "var(--ok-soft)", ink: "var(--ok)",
      title: "Forge v4.2 已上线",
      body: "新增「品牌语气适配」和「分身情绪标签」，建议重新跑一次品牌简报。",
      time: "昨天 14:08", action: "查看更新", to: null,
    },
    {
      cat: "system", read: true,
      ic: "fire", tint: "#ffe1d6", ink: "#d8511e",
      title: "Lucky Tarot 训练数据不足",
      body: "样本 < 1K，已暂停自进化，等你补充样本素材。",
      time: "前天", action: "去补样本", to: "tasks",
    },
  ];

  const tabs = [
    ["all",    "全部",  items.length],
    ["brand",  "品牌",  items.filter(i => i.cat === "brand").length],
    ["forge",  "Forge", items.filter(i => i.cat === "forge").length],
    ["clone",  "分身",  items.filter(i => i.cat === "clone").length],
    ["money",  "收益",  items.filter(i => i.cat === "money").length],
    ["system", "系统",  items.filter(i => i.cat === "system").length],
  ];
  const filtered = filter === "all" ? items : items.filter(i => i.cat === filter);
  const unread = items.filter(i => !i.read).length;

  return (
    <div style={{
      position: "absolute", top: "calc(100% + 8px)", right: 0,
      width: 440, maxHeight: 600,
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 16,
      boxShadow: "0 24px 60px -12px rgba(24,23,42,.25), 0 8px 20px -8px rgba(24,23,42,.15)",
      zIndex: 1000,
      display: "flex", flexDirection: "column",
      overflow: "hidden",
      animation: "fadeIn .14s ease-out",
    }}>
      {/* Header */}
      <div style={{
        padding: "14px 18px 12px",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 16, lineHeight: 1 }}>信息中心</div>
            <span style={{
              padding: "2px 7px",
              background: "var(--warm)", color: "white",
              borderRadius: 99, fontSize: 10, fontWeight: 800,
              fontFamily: "IBM Plex Mono, monospace",
            }}>{unread} 未读</span>
          </div>
          <button className="btn sm" style={{ padding: "4px 9px", fontSize: 11 }}>
            <Icon name="check" size={11}/> 全部已读
          </button>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {tabs.map(([k, l, n]) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              style={{
                padding: "4px 10px",
                borderRadius: 99,
                border: "none",
                background: filter === k ? "var(--ink-1)" : "var(--bg-2)",
                color: filter === k ? "white" : "var(--ink-2)",
                fontSize: 11, fontWeight: 700,
                cursor: "default",
                display: "inline-flex", alignItems: "center", gap: 5,
                fontFamily: "inherit",
              }}
            >
              {l}
              <span style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: 9.5,
                color: filter === k ? "rgba(255,255,255,.6)" : "var(--ink-4)",
                fontWeight: 800,
              }}>{n}</span>
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div style={{ overflowY: "auto", flex: 1 }}>
        {filtered.map((n, i) => (
          <div key={i} style={{
            padding: "12px 18px",
            borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none",
            display: "flex", gap: 12,
            background: n.read ? "transparent" : "linear-gradient(90deg, rgba(91,77,255,.04) 0%, transparent 60%)",
            position: "relative",
          }}>
            {!n.read && (
              <span style={{
                position: "absolute", left: 6, top: 18,
                width: 6, height: 6, borderRadius: 99,
                background: "var(--brand)",
                boxShadow: "0 0 6px var(--brand)",
              }}/>
            )}
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: n.tint, color: n.ink,
              display: "grid", placeItems: "center",
              flexShrink: 0,
            }}>
              <Icon name={n.ic} size={14} color={n.ink}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 12.5, fontWeight: 700, color: "var(--ink-1)",
                lineHeight: 1.35, marginBottom: 3,
              }}>{n.title}</div>
              <div style={{
                fontSize: 11.5, color: "var(--ink-3)",
                lineHeight: 1.5, marginBottom: 6,
              }}>{n.body}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="mono" style={{ fontSize: 10, color: "var(--ink-4)" }}>{n.time}</span>
                {n.to ? (
                  <button
                    className="btn sm"
                    style={{ padding: "3px 10px", fontSize: 11, color: n.ink, borderColor: n.ink, background: "transparent" }}
                    onClick={() => goto(n.to)}
                  >
                    {n.action} <Icon name="arrow_r" size={10} color={n.ink}/>
                  </button>
                ) : (
                  <span style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>{n.action}</span>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: "40px 18px", textAlign: "center", color: "var(--ink-3)", fontSize: 12 }}>
            这个分类暂时没有新消息
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: "10px 18px",
        borderTop: "1px solid var(--border)",
        background: "var(--bg-1)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 11, color: "var(--ink-3)" }}>
          <Icon name="settings" size={11} color="var(--ink-3)" style={{ verticalAlign: "-1px", marginRight: 4 }}/>
          消息偏好设置
        </span>
        <button className="btn sm" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => goto("feedback")}>
          查看全部 <Icon name="arrow_r" size={10}/>
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   PROFILE CENTER — avatar dropdown
   ───────────────────────────────────────────────────── */
function ProfileCenter({ onClose, goto, onLogout }) {
  const stats = [
    { k: "粉丝",    v: "2.4M",   c: "var(--ink-1)" },
    { k: "Playable", v: "20", c: "var(--brand)" },
    { k: "分身",     v: "9",  c: "var(--warm)" },
    { k: "总收益",   v: "$48.2k", c: "var(--ok)" },
  ];

  const menu = [
    { group: "账户", items: [
      { ic: "user",     l: "个人资料",     sub: "Aria · KOL 实名认证已通过",          c: "var(--ink-1)" },
      { ic: "crown",    l: "等级与权益",   sub: "S 级 · 距 S+ 还差 1.2 个月活跃度",     c: "var(--warm)", badge: "S+ 候选" },
      { ic: "brain",    l: "创作偏好",     sub: "Forge 学习语气 · 内容边界 · 黑名单",   c: "var(--brand)" },
    ]},
    { group: "结算", items: [
      { ic: "wallet",   l: "钱包 · 资产",  sub: "USDC $1,284 · TON $192 · 待结 $632",   c: "var(--ok)", to: "wallet" },
      { ic: "coins",    l: "积分中心",     sub: "Forge 积分 12,480 · 每月领 2,000",     c: "var(--warm)" },
      { ic: "shield",   l: "收款账户",     sub: "Stripe · USDC (主) · OKX Pay",         c: "var(--ink-1)" },
    ]},
    { group: "工作流", items: [
      { ic: "link",     l: "已绑定平台",   sub: "TikTok · IG · YouTube · X · Snap",    c: "var(--brand)" },
      { ic: "globe",    l: "Agent 世界",   sub: "9 / 16 节点已部署",                    c: "var(--warm)", to: "world" },
    ]},
    { group: "支持", items: [
      { ic: "msg",      l: "联系支持",     sub: "S 级专属 · 平均回应 18 分钟",          c: "var(--ink-1)" },
      { ic: "x",        l: "退出登录",     sub: null,                                   c: "#b03a72", danger: true },
    ]},
  ];

  return (
    <div style={{
      position: "absolute", top: "calc(100% + 8px)", right: 0,
      width: 380, maxHeight: 640,
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 16,
      boxShadow: "0 24px 60px -12px rgba(24,23,42,.25), 0 8px 20px -8px rgba(24,23,42,.15)",
      zIndex: 1000,
      display: "flex", flexDirection: "column",
      overflow: "hidden",
      animation: "fadeIn .14s ease-out",
    }}>
      {/* Hero */}
      <div style={{
        padding: "18px 18px 16px",
        background: "linear-gradient(135deg, #18172a 0%, #2a2240 60%, #3c2fd0 130%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", right: -20, top: -20,
          width: 140, height: 140, borderRadius: 99,
          background: "radial-gradient(circle, rgba(255,122,61,.3) 0%, transparent 65%)",
        }}/>
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 99,
            background: "linear-gradient(135deg, var(--p-peach), var(--warm))",
            display: "grid", placeItems: "center",
            color: "white", fontWeight: 800, fontSize: 22,
            fontFamily: "Manrope, sans-serif",
            boxShadow: "0 0 0 3px rgba(255,255,255,.15)",
          }}>A</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 18, lineHeight: 1.1 }}>Aria</div>
              <span style={{
                padding: "2px 7px",
                background: "var(--warm)", color: "white",
                borderRadius: 6, fontSize: 9.5, fontWeight: 800,
                fontFamily: "IBM Plex Mono, monospace",
                display: "inline-flex", alignItems: "center", gap: 3,
              }}>
                <Icon name="crown" size={9} color="white"/> S 级
              </span>
            </div>
            <div className="mono" style={{ fontSize: 10.5, color: "rgba(255,255,255,.55)", marginTop: 3, letterSpacing: ".04em" }}>
              @aria.kol · 2.4M followers · 加入 1 年 2 个月
            </div>
          </div>
          <button style={{
            background: "rgba(255,255,255,.12)",
            border: "1px solid rgba(255,255,255,.18)",
            color: "white",
            padding: "4px 10px", borderRadius: 99,
            fontSize: 11, fontWeight: 600,
            cursor: "default", fontFamily: "inherit",
          }}>编辑</button>
        </div>

        {/* Stats */}
        <div style={{
          position: "relative",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8, marginTop: 14,
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: "8px 8px",
              background: "rgba(255,255,255,.07)",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 8,
            }}>
              <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 15, color: "white", lineHeight: 1 }}>{s.v}</div>
              <div className="mono" style={{ fontSize: 9, color: "rgba(255,255,255,.55)", letterSpacing: ".06em", fontWeight: 700, marginTop: 4 }}>{s.k}</div>
            </div>
          ))}
        </div>

        {/* Level progress */}
        <div style={{ position: "relative", marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 10.5 }}>
            <span style={{ color: "rgba(255,255,255,.75)" }}>下一阶梯 <b style={{ color: "var(--warm)" }}>S+</b> · 解锁 16 个节点</span>
            <span className="mono" style={{ color: "rgba(255,255,255,.6)" }}>72%</span>
          </div>
          <div style={{ height: 5, background: "rgba(255,255,255,.1)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{
              width: "72%", height: "100%",
              background: "linear-gradient(90deg, #ff7a3d 0%, #a89eff 100%)",
              borderRadius: 99,
            }}/>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div style={{ overflowY: "auto", flex: 1, padding: "6px 0" }}>
        {menu.map((g, gi) => (
          <div key={gi} style={{ padding: "8px 0" }}>
            <div className="mono" style={{
              padding: "0 18px 4px",
              fontSize: 9.5, letterSpacing: ".1em",
              color: "var(--ink-4)", fontWeight: 700,
            }}>{g.group}</div>
            {g.items.map((m, mi) => (
              <div key={mi}
                onClick={() => {
                  if (m.danger) onLogout && onLogout();
                  else if (m.to) goto(m.to);
                }}
                style={{
                  padding: "9px 18px",
                  display: "flex", alignItems: "center", gap: 11,
                  cursor: "default",
                  transition: "background .12s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-1)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: m.danger ? "rgba(176,58,114,.1)" : "var(--bg-2)",
                  display: "grid", placeItems: "center",
                  flexShrink: 0,
                }}>
                  <Icon name={m.ic} size={13} color={m.c}/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 12.5, fontWeight: 700,
                    color: m.danger ? "#b03a72" : "var(--ink-1)",
                    lineHeight: 1.2,
                  }}>
                    {m.l}
                    {m.badge && (
                      <span style={{
                        marginLeft: 6,
                        padding: "1px 6px",
                        background: "var(--warm-soft)", color: "var(--warm)",
                        borderRadius: 99,
                        fontSize: 9.5, fontWeight: 800,
                        fontFamily: "IBM Plex Mono, monospace",
                        verticalAlign: "1px",
                      }}>{m.badge}</span>
                    )}
                  </div>
                  {m.sub && (
                    <div style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 2, lineHeight: 1.35 }}>{m.sub}</div>
                  )}
                </div>
                {!m.danger && <Icon name="arrow_r" size={11} color="var(--ink-4)"/>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LogoutConfirm({ onCancel, onConfirm }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onCancel(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(24,23,42,.45)",
      backdropFilter: "blur(6px)",
      display: "grid", placeItems: "center",
      padding: 24,
      animation: "fadeIn .15s ease-out",
    }} onClick={onCancel}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(420px, 100%)",
          background: "var(--surface)",
          borderRadius: 20,
          boxShadow: "0 32px 80px -16px rgba(24,23,42,.4), 0 12px 28px -8px rgba(24,23,42,.2)",
          overflow: "hidden",
        }}
      >
        <div style={{
          padding: "26px 26px 18px",
          textAlign: "center",
          background: "linear-gradient(180deg, #fde4e4 0%, transparent 100%)",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 99,
            background: "white",
            border: "1.5px solid rgba(176,58,114,.2)",
            display: "grid", placeItems: "center",
            margin: "0 auto 14px",
            boxShadow: "0 6px 18px -6px rgba(176,58,114,.3)",
          }}>
            <Icon name="x" size={22} color="#b03a72"/>
          </div>
          <h3 style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800, fontSize: 19,
            margin: "0 0 6px", letterSpacing: "-.01em",
          }}>确认退出登录？</h3>
          <p style={{
            fontSize: 12.5, lineHeight: 1.6,
            color: "var(--ink-3)", margin: 0,
            maxWidth: 320, marginInline: "auto",
          }}>
            你正在打磨的 <b style={{ color: "var(--ink-2)" }}>Pump or Dump v1.b</b> 会被自动保存，下次登录可继续。Forge 仍会在后台帮你跑数据。
          </p>
        </div>

        <div style={{
          padding: "4px 22px 14px",
          display: "grid", gridTemplateColumns: "auto 1fr 1fr",
          gap: 10, alignItems: "center",
        }}>
          <span className="mono" style={{
            fontSize: 9.5, letterSpacing: ".08em",
            color: "var(--ink-4)", fontWeight: 700,
            paddingRight: 4,
          }}>ESC</span>
          <button
            className="btn"
            onClick={onCancel}
            style={{ justifyContent: "center", padding: "11px 12px", fontSize: 13 }}
          >取消</button>
          <button
            onClick={onConfirm}
            autoFocus
            style={{
              justifyContent: "center",
              padding: "11px 12px",
              fontSize: 13, fontWeight: 700,
              background: "#b03a72", color: "white",
              border: "1px solid #b03a72",
              borderRadius: "var(--r-md)",
              display: "inline-flex", alignItems: "center", gap: 6,
              boxShadow: "0 6px 16px -6px rgba(176,58,114,.5)",
              cursor: "default",
              fontFamily: "inherit",
            }}
          >
            <Icon name="x" size={12} color="white"/> 退出登录
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [confirmLogout, setConfirmLogout] = React.useState(false);
  const [page, setPage] = React.useState("workbench");

  if (!loggedIn) {
    return <Login onLogin={() => { setLoggedIn(true); setPage("workbench"); }}/>;
  }

  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage}/>
      <div className="main">
        <TopBar page={page} setPage={setPage} onLogout={() => setConfirmLogout(true)}/>
        {page === "workbench"  && <Workbench goto={setPage}/>}
        {page === "assets"     && <Assets goto={setPage}/>}
        {page === "templates"  && <Templates goto={setPage}/>}
        {page === "tasks"      && <Tasks goto={setPage}/>}
        {page === "world"      && <AgentWorld goto={setPage}/>}
        {page === "distribute" && <Distribute goto={setPage}/>}
        {confirmLogout && (
          <LogoutConfirm
            onCancel={() => setConfirmLogout(false)}
            onConfirm={() => { setConfirmLogout(false); setLoggedIn(false); }}
          />
        )}
        {page === "feedback"   && <Feedback goto={setPage}/>}
        {page === "wallet"     && <Wallet goto={setPage}/>}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
