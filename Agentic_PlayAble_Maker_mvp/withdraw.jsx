// AirvanaMaker v2 — Withdraw Flow
// 5-step modal: KYC 实名认证 → 绑定收款账户 → 发起提现 → 平台审核 → 提现成功
// Triggered by the wallet withdraw buttons.

function WithdrawFlow({ channel, onClose }) {
  const [step, setStep] = React.useState(0);
  const [kycDone, setKycDone] = React.useState(false);
  const [payout, setPayout] = React.useState(channel === "usdc" ? "usdc" : "bank");
  const [amount, setAmount] = React.useState("1000");
  const [reviewPct, setReviewPct] = React.useState(0);

  const CH = {
    bank:   { label: "银行 / Wise", unit: "USD",  accent: "var(--warm)" },
    usdc:   { label: "USDC",       unit: "USDC", accent: "var(--brand)" },
    points: { label: "AI 积分",     unit: "P",    accent: "var(--ok)" },
  }[channel] || { label: "USDC", unit: "USDC", accent: "var(--brand)" };

  const STEPS = [
    { t: "实名认证",   s: "KYC · 一次性" },
    { t: "绑定收款账户", s: "银行 / 链上 / 第三方" },
    { t: "发起提现",   s: "金额 · 二次确认" },
    { t: "平台审核",   s: "反欺诈 + 风控" },
    { t: "提现成功",   s: "到账通知" },
  ];

  // auto-progress the review step
  React.useEffect(() => {
    if (step !== 3) return;
    setReviewPct(0);
    const iv = setInterval(() => {
      setReviewPct((p) => {
        if (p >= 100) { clearInterval(iv); return 100; }
        return p + 4;
      });
    }, 90);
    return () => clearInterval(iv);
  }, [step]);

  React.useEffect(() => {
    if (step === 3 && reviewPct >= 100) {
      const t = setTimeout(() => setStep(4), 700);
      return () => clearTimeout(t);
    }
  }, [step, reviewPct]);

  const canNext = () => {
    if (step === 0) return kycDone;
    if (step === 2) return parseFloat(amount) > 0 && parseFloat(amount) <= 1284.5;
    return true;
  };
  const next = () => { if (step < 4 && canNext()) setStep(step + 1); };
  const prev = () => { if (step > 0) setStep(step - 1); };

  const fieldCard = (label, value, mono) => (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 14,
      padding: "16px 20px",
    }}>
      <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: ".04em", marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: mono ? "IBM Plex Mono, monospace" : "Manrope, sans-serif", fontWeight: 800, fontSize: 17, color: "var(--ink-1)" }}>{value}</div>
    </div>
  );

  const uploadCard = (label, file, done) => (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 14,
      padding: "14px 18px",
      display: "flex", alignItems: "center", gap: 14,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: "var(--bg-2)", color: "var(--ink-3)",
        display: "grid", placeItems: "center", flexShrink: 0,
      }}>
        <Icon name="upload" size={16} color="var(--ink-3)"/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 14, color: "var(--ink-1)" }}>{label}</div>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 3 }}>{file}</div>
      </div>
      <span style={{
        padding: "4px 11px", borderRadius: 99,
        fontSize: 11, fontWeight: 700,
        background: done ? "var(--ok-soft)" : "var(--bg-2)",
        color: done ? "var(--ok)" : "var(--ink-3)",
        whiteSpace: "nowrap",
      }}>{done ? "已上传" : "待上传"}</span>
    </div>
  );

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(24,23,42,.45)",
      backdropFilter: "blur(4px)",
      display: "grid", placeItems: "center",
      animation: "fadeIn .15s ease-out",
    }}>
      <div style={{
        width: "min(1180px, 94vw)",
        height: "min(820px, 92vh)",
        background: "var(--bg, #faf8f3)",
        borderRadius: 24,
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "300px 1fr",
        boxShadow: "0 40px 100px -20px rgba(24,23,42,.5)",
      }}>
        {/* ─── LEFT PANEL ─── */}
        <div style={{
          borderRight: "1px solid var(--border)",
          background: "var(--surface)",
          padding: "34px 30px 26px",
          display: "flex", flexDirection: "column",
        }}>
          <div className="mono" style={{ fontSize: 11.5, letterSpacing: ".18em", color: "var(--ink-3)", fontWeight: 700, marginBottom: 14 }}>
            WITHDRAW · {CH.unit}
          </div>
          <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 30, lineHeight: 1.1, letterSpacing: "-.02em" }}>
            提现到 <em style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontWeight: 400, color: CH.accent }}>{CH.label}</em>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 8 }}>
            可提现余额 · <b className="mono" style={{ color: "var(--ink-1)", fontWeight: 700 }}>$1,284.50</b>
          </div>

          {/* Stepper */}
          <div style={{ marginTop: 34, display: "flex", flexDirection: "column", position: "relative" }}>
            {STEPS.map((s, i) => {
              const active = i === step;
              const done = i < step;
              return (
                <div key={i} style={{ display: "flex", gap: 14, paddingBottom: i < STEPS.length - 1 ? 26 : 0, position: "relative" }}>
                  {/* connector line */}
                  {i < STEPS.length - 1 && (
                    <div style={{
                      position: "absolute", left: 17, top: 36, bottom: 2,
                      width: 2,
                      background: done ? CH.accent : "var(--border)",
                    }}/>
                  )}
                  <div style={{
                    width: 36, height: 36, borderRadius: 99,
                    background: active ? "var(--ink-1)" : done ? CH.accent : "var(--surface)",
                    border: active || done ? "none" : "1.5px solid var(--border-2)",
                    color: active || done ? "white" : "var(--ink-3)",
                    display: "grid", placeItems: "center",
                    fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 15,
                    flexShrink: 0, position: "relative", zIndex: 2,
                    transition: "all .2s",
                  }}>
                    {done ? <Icon name="check" size={15} color="white"/> : i + 1}
                  </div>
                  <div style={{ paddingTop: 2 }}>
                    <div style={{
                      fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 15,
                      color: active ? "var(--ink-1)" : done ? "var(--ink-2)" : "var(--ink-3)",
                      lineHeight: 1.2,
                    }}>{s.t}</div>
                    <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 3 }}>{s.s}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* footer note */}
          <div style={{
            marginTop: "auto",
            display: "flex", gap: 10, alignItems: "flex-start",
            padding: "14px 16px",
            background: "var(--bg-1, #fafaff)",
            borderRadius: 12,
            border: "1px solid var(--border)",
          }}>
            <Icon name="shield" size={15} color="var(--ok)"/>
            <div style={{ fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.55 }}>
              所有提现走 <b style={{ color: "var(--ink-2)", fontWeight: 700 }}>多签托管 + 风控审计</b>。<br/>
              单笔 &lt; $5,000 通常 24 小时内到账。
            </div>
          </div>
        </div>

        {/* ─── RIGHT MAIN ─── */}
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
          {/* top bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 18,
            padding: "22px 36px 18px",
            borderBottom: "1px solid var(--border)",
          }}>
            <span className="mono" style={{ fontSize: 12.5, letterSpacing: ".14em", color: "var(--ink-3)", fontWeight: 700 }}>
              STEP {step + 1} / 5
            </span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink-1)" }}>{STEPS[step].t}</span>
            <span style={{ flex: 1 }}/>
            <button onClick={onClose} style={{ background: "transparent", border: "none", color: "var(--ink-3)", padding: 4, cursor: "default", display: "inline-flex" }}>
              <Icon name="x" size={20} color="var(--ink-3)"/>
            </button>
          </div>

          {/* scrollable body */}
          <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
            {step === 0 && <KycStep done={kycDone} onSubmit={() => setKycDone(true)} fieldCard={fieldCard} uploadCard={uploadCard}/>}
            {step === 1 && <PayoutStep payout={payout} setPayout={setPayout}/>}
            {step === 2 && <AmountStep amount={amount} setAmount={setAmount} ch={CH} payout={payout}/>}
            {step === 3 && <ReviewStep pct={reviewPct}/>}
            {step === 4 && <SuccessStep amount={amount} ch={CH} onClose={onClose}/>}
          </div>

          {/* bottom nav */}
          {step < 4 && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "16px 40px",
              borderTop: "1px solid var(--border)",
            }}>
              <button
                onClick={prev}
                disabled={step === 0}
                style={{
                  padding: "10px 20px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 11,
                  fontSize: 13, fontWeight: 700,
                  color: "var(--ink-2)",
                  fontFamily: "inherit", cursor: "default",
                  opacity: step === 0 ? .4 : 1,
                  display: "inline-flex", alignItems: "center", gap: 8,
                }}
              >
                <Icon name="arrow_l" size={13}/> 上一步
              </button>

              {/* progress dashes */}
              <div style={{ display: "flex", gap: 8 }}>
                {STEPS.map((_, i) => (
                  <div key={i} style={{
                    width: i === step ? 40 : 28, height: 5, borderRadius: 99,
                    background: i <= step ? "var(--ink-1)" : "var(--border-2)",
                    transition: "all .2s",
                  }}/>
                ))}
              </div>

              <button
                onClick={next}
                disabled={!canNext()}
                style={{
                  padding: "10px 22px",
                  background: "var(--ink-1)", color: "white",
                  border: "none", borderRadius: 11,
                  fontSize: 13, fontWeight: 700,
                  fontFamily: "inherit", cursor: "default",
                  opacity: canNext() ? 1 : .4,
                  display: "inline-flex", alignItems: "center", gap: 8,
                  boxShadow: "0 6px 16px -6px rgba(24,23,42,.4)",
                }}
              >
                {step === 2 ? "提交审核" : "下一步"} <Icon name="arrow_r" size={13} color="white"/>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── STEP 1 · KYC ─── */
function KycStep({ done, onSubmit, fieldCard, uploadCard }) {
  return (
    <div>
      <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 40, lineHeight: 1.05, letterSpacing: "-.02em", margin: "0 0 14px" }}>
        先完成 <em style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontWeight: 400, color: "var(--warm)" }}>身份验证</em>
      </h2>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink-2)", margin: "0 0 24px", maxWidth: 640 }}>
        为符合反洗钱与税务要求，首次提现需完成一次性 KYC。信息加密存储，仅用于风控与到账。
      </p>

      {/* status banner */}
      <div style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "16px 20px",
        background: done ? "var(--ok-soft)" : "var(--warm-soft)",
        border: `1px solid ${done ? "rgba(46,170,112,.3)" : "var(--warm-line)"}`,
        borderRadius: 14, marginBottom: 22,
      }}>
        <Icon name="shield" size={20} color={done ? "var(--ok)" : "var(--warm)"}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 15, color: "var(--ink-1)" }}>
            {done ? "已完成 · 验证通过" : "未完成 · 需要 3 分钟"}
          </div>
          <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>护照 / 身份证 + 自拍 + 居住国</div>
        </div>
        <span style={{
          padding: "4px 12px", borderRadius: 99,
          fontSize: 12, fontWeight: 700,
          background: done ? "var(--ok)" : "transparent",
          color: done ? "white" : "var(--warm)",
          border: done ? "none" : "1.5px solid var(--warm)",
        }}>{done ? "通过" : "必须"}</span>
      </div>

      {/* fields */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        {fieldCard("姓名", "陈 思博 (Aria Chen)")}
        {fieldCard("国籍 / 居住地", "新加坡 · SG")}
        {fieldCard("证件类型", "护照 · E12345678", true)}
        {fieldCard("出生日期", "1996 / 03 / 12", true)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 26 }}>
        {uploadCard("证件正面", "passport_front.jpg", true)}
        {uploadCard("人脸自拍 · 活体", "selfie_live.mp4", true)}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          onClick={onSubmit}
          disabled={done}
          style={{
            padding: "13px 22px",
            background: done ? "var(--ok)" : "var(--ink-1)", color: "white",
            border: "none", borderRadius: 12,
            fontSize: 14, fontWeight: 700,
            fontFamily: "inherit", cursor: "default",
            display: "inline-flex", alignItems: "center", gap: 8,
            boxShadow: "0 8px 20px -6px rgba(24,23,42,.4)",
          }}
        >
          <Icon name={done ? "check" : "shield"} size={15} color="white"/> {done ? "验证已通过" : "提交并完成验证"}
        </button>
        <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>
          由 <b style={{ color: "var(--ink-2)" }}>SumSub</b> 风控引擎自动审核 · 通常 60 秒
        </span>
      </div>
    </div>
  );
}

/* ─── STEP 2 · PAYOUT ─── */
function PayoutStep({ payout, setPayout }) {
  const methods = [
    { id: "bank", ic: "send",  title: "银行 / Wise",  sub: "Wise · USD 多币种账户", meta: "1-2 工作日 · 手续费 0.8%", tag: "已绑定" },
    { id: "usdc", ic: "coins", title: "USDC · 链上",  sub: "Arbitrum · 0x4a1…8b3",  meta: "约 5 分钟 · Gas ≈ $0.4", tag: "已绑定" },
    { id: "okx",  ic: "wallet",title: "OKX Pay",      sub: "第三方钱包 · 实时", meta: "实时到账 · 手续费 0.5%", tag: "未绑定" },
  ];
  return (
    <div>
      <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 40, lineHeight: 1.05, letterSpacing: "-.02em", margin: "0 0 14px" }}>
        钱要打到 <em style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontWeight: 400, color: "var(--warm)" }}>哪里</em>？
      </h2>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink-2)", margin: "0 0 24px", maxWidth: 640 }}>
        选择一个收款账户。链上提现更快、手续费更低；银行通道更适合大额合规入账。
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {methods.map((m) => {
          const on = payout === m.id;
          const bound = m.tag === "已绑定";
          return (
            <div key={m.id}
              onClick={() => bound && setPayout(m.id)}
              style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "18px 22px",
                borderRadius: 16,
                border: `1.5px solid ${on ? "var(--warm)" : "var(--border)"}`,
                background: on ? "var(--warm-soft)" : "var(--surface)",
                cursor: "default",
                opacity: bound ? 1 : .6,
                transition: "all .12s",
              }}
            >
              <div style={{
                width: 46, height: 46, borderRadius: 12,
                background: on ? "var(--warm)" : "var(--bg-2)",
                color: on ? "white" : "var(--ink-2)",
                display: "grid", placeItems: "center", flexShrink: 0,
              }}>
                <Icon name={m.ic} size={20} color={on ? "white" : "var(--ink-2)"}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 16, color: "var(--ink-1)" }}>{m.title}</span>
                  <span style={{
                    padding: "2px 8px", borderRadius: 99, fontSize: 10.5, fontWeight: 700,
                    background: bound ? "var(--ok-soft)" : "var(--bg-2)",
                    color: bound ? "var(--ok)" : "var(--ink-3)",
                  }}>{m.tag}</span>
                </div>
                <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>{m.sub}</div>
              </div>
              <div style={{ textAlign: "right", fontSize: 12, color: "var(--ink-3)" }}>{m.meta}</div>
              <div style={{
                width: 22, height: 22, borderRadius: 99,
                border: `1.5px solid ${on ? "var(--warm)" : "var(--border-2)"}`,
                background: on ? "var(--warm)" : "transparent",
                display: "grid", placeItems: "center", flexShrink: 0,
              }}>
                {on && <Icon name="check" size={13} color="white"/>}
              </div>
            </div>
          );
        })}
      </div>
      <button style={{
        marginTop: 14, padding: "11px 18px",
        background: "transparent", border: "1.5px dashed var(--border-2)",
        borderRadius: 12, color: "var(--ink-3)",
        fontSize: 13, fontWeight: 600, fontFamily: "inherit", cursor: "default",
        display: "inline-flex", alignItems: "center", gap: 8,
      }}>
        <Icon name="plus" size={13}/> 绑定新的收款账户
      </button>
    </div>
  );
}

/* ─── STEP 3 · AMOUNT ─── */
function AmountStep({ amount, setAmount, ch, payout }) {
  const bal = 1284.5;
  const amt = parseFloat(amount) || 0;
  const fee = payout === "bank" ? amt * 0.008 : payout === "usdc" ? 0.4 : amt * 0.005;
  const receive = Math.max(0, amt - fee);
  const over = amt > bal;

  return (
    <div>
      <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 40, lineHeight: 1.05, letterSpacing: "-.02em", margin: "0 0 14px" }}>
        提现 <em style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontWeight: 400, color: "var(--warm)" }}>多少</em>？
      </h2>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink-2)", margin: "0 0 28px", maxWidth: 640 }}>
        输入提现金额。系统会自动扣除通道手续费，到账金额实时显示在下方。
      </p>

      {/* amount input */}
      <div style={{
        background: "var(--surface)", border: `1.5px solid ${over ? "var(--bad)" : "var(--border)"}`,
        borderRadius: 18, padding: "26px 28px", marginBottom: 18,
      }}>
        <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: ".06em", marginBottom: 10 }}>提现金额 · USD</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: "Instrument Serif, serif", fontSize: 48, color: "var(--ink-2)" }}>$</span>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            style={{
              border: "none", background: "transparent", outline: "none",
              fontFamily: "Instrument Serif, serif", fontSize: 56, fontWeight: 400,
              color: "var(--ink-1)", width: 280, letterSpacing: "-.02em",
            }}
          />
          <span style={{ flex: 1 }}/>
          {[0.25, 0.5, 1].map((f) => (
            <button key={f}
              onClick={() => setAmount(String(Math.floor(bal * f)))}
              style={{
                padding: "6px 13px", background: "var(--bg-2)", border: "none",
                borderRadius: 8, fontSize: 12, fontWeight: 700, color: "var(--ink-2)",
                fontFamily: "inherit", cursor: "default",
              }}>{f === 1 ? "全部" : `${f * 100}%`}</button>
          ))}
        </div>
        <div style={{ fontSize: 12.5, color: over ? "var(--bad)" : "var(--ink-3)", marginTop: 10 }}>
          {over ? "超出可提现余额" : <>可提现余额 <b className="mono" style={{ color: "var(--ink-1)" }}>${bal.toLocaleString()}</b></>}
        </div>
      </div>

      {/* breakdown */}
      <div style={{
        background: "var(--bg-1, #fafaff)", border: "1px solid var(--border)",
        borderRadius: 14, padding: "16px 20px", marginBottom: 18,
      }}>
        {[
          ["提现金额", `$${amt.toFixed(2)}`, "var(--ink-1)"],
          [`通道手续费 · ${ch.label}`, `−$${fee.toFixed(2)}`, "var(--ink-3)"],
        ].map(([k, v, c], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13 }}>
            <span style={{ color: "var(--ink-3)" }}>{k}</span>
            <span className="mono" style={{ fontWeight: 700, color: c }}>{v}</span>
          </div>
        ))}
        <div style={{ borderTop: "1px dashed var(--border-2)", margin: "8px 0", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink-1)" }}>实际到账</span>
          <span className="mono" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 22, color: "var(--warm)" }}>${receive.toFixed(2)}</span>
        </div>
      </div>

      <div style={{
        display: "flex", gap: 10, alignItems: "flex-start",
        padding: "12px 16px", background: "var(--warm-soft)", borderRadius: 10,
        fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5,
      }}>
        <Icon name="shield" size={14} color="var(--warm)"/>
        <span>提交后将进入 <b>反欺诈 + 风控审核</b>，单笔 &lt; $5,000 通常 24 小时内到账。审核期间金额冻结。</span>
      </div>
    </div>
  );
}

/* ─── STEP 4 · REVIEW ─── */
function ReviewStep({ pct }) {
  const checks = [
    { l: "反欺诈规则引擎", at: 25 },
    { l: "多签托管签名", at: 55 },
    { l: "链上地址风险扫描", at: 80 },
    { l: "合规与税务核验", at: 100 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 440, textAlign: "center" }}>
      {/* ring */}
      <div style={{ position: "relative", width: 150, height: 150, marginBottom: 28 }}>
        <svg width="150" height="150" viewBox="0 0 150 150" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="75" cy="75" r="64" fill="none" stroke="var(--bg-2)" strokeWidth="8"/>
          <circle cx="75" cy="75" r="64" fill="none" stroke="var(--warm)" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 64}
            strokeDashoffset={2 * Math.PI * 64 * (1 - pct / 100)}
            style={{ transition: "stroke-dashoffset .1s linear" }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 32, color: "var(--ink-1)" }}>{pct}<span style={{ fontSize: 16, color: "var(--ink-3)" }}>%</span></div>
        </div>
      </div>
      <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 30, letterSpacing: "-.015em", margin: "0 0 10px" }}>
        平台审核中…
      </h2>
      <p style={{ fontSize: 13.5, color: "var(--ink-3)", margin: "0 0 28px", maxWidth: 420, lineHeight: 1.6 }}>
        Forge 风控正在逐项核验。无需停留，完成后会推送通知到信息中心。
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 320 }}>
        {checks.map((c, i) => {
          const ok = pct >= c.at;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13.5 }}>
              <div style={{
                width: 22, height: 22, borderRadius: 99,
                background: ok ? "var(--ok)" : "var(--bg-2)",
                display: "grid", placeItems: "center", flexShrink: 0,
                transition: "background .2s",
              }}>
                {ok ? <Icon name="check" size={13} color="white"/> : <div style={{ width: 7, height: 7, borderRadius: 99, background: "var(--ink-4)" }}/>}
              </div>
              <span style={{ color: ok ? "var(--ink-1)" : "var(--ink-3)", fontWeight: ok ? 700 : 500 }}>{c.l}</span>
              {ok && <span className="mono" style={{ marginLeft: "auto", fontSize: 11, color: "var(--ok)" }}>已通过</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── STEP 5 · SUCCESS ─── */
function SuccessStep({ amount, ch, onClose }) {
  const amt = parseFloat(amount) || 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 480, textAlign: "center" }}>
      <div style={{
        width: 88, height: 88, borderRadius: 99,
        background: "var(--ok-soft)",
        display: "grid", placeItems: "center", marginBottom: 24,
        position: "relative",
      }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: 99,
          border: "2px solid var(--ok)", opacity: .3,
          animation: "pulse 2s infinite",
        }}/>
        <Icon name="check" size={40} color="var(--ok)"/>
      </div>
      <div className="mono" style={{ fontSize: 11.5, letterSpacing: ".16em", color: "var(--ok)", fontWeight: 700, marginBottom: 12 }}>
        WITHDRAWAL SUBMITTED
      </div>
      <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 36, letterSpacing: "-.02em", margin: "0 0 14px" }}>
        提现已发起 <em style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontWeight: 400, color: "var(--warm)" }}>成功</em>
      </h2>
      <p style={{ fontSize: 14, color: "var(--ink-2)", margin: "0 0 28px", maxWidth: 440, lineHeight: 1.65 }}>
        <b className="mono" style={{ color: "var(--ink-1)" }}>${amt.toFixed(2)}</b> 已进入 {ch.label} 通道，预计 <b style={{ color: "var(--warm)" }}>24 小时内</b>到账。到账后会推送通知。
      </p>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14,
        width: 480, marginBottom: 28,
      }}>
        {[
          ["提现单号", "WD-2308-0917", true],
          ["通道", ch.label, false],
          ["预计到账", "24h 内", false],
        ].map(([k, v, mono], i) => (
          <div key={i} style={{ background: "var(--bg-1, #fafaff)", border: "1px solid var(--border)", borderRadius: 12, padding: "12px 14px" }}>
            <div className="mono" style={{ fontSize: 9.5, color: "var(--ink-4)", letterSpacing: ".06em", fontWeight: 700 }}>{k}</div>
            <div style={{ fontFamily: mono ? "IBM Plex Mono, monospace" : "Manrope, sans-serif", fontWeight: 700, fontSize: 14, color: "var(--ink-1)", marginTop: 4 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onClose} style={{
          padding: "12px 24px", background: "var(--ink-1)", color: "white",
          border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700,
          fontFamily: "inherit", cursor: "default",
          boxShadow: "0 8px 20px -6px rgba(24,23,42,.4)",
        }}>完成</button>
        <button onClick={onClose} style={{
          padding: "12px 24px", background: "var(--surface)",
          border: "1px solid var(--border)", borderRadius: 12,
          fontSize: 14, fontWeight: 700, color: "var(--ink-2)",
          fontFamily: "inherit", cursor: "default",
        }}>查看交易记录</button>
      </div>
    </div>
  );
}

window.WithdrawFlow = WithdrawFlow;

/* ═══════════════════════════════════════════════════════
   抵扣 / 兑换 AI 积分 — compact modal
   余额 → Forge 积分，用于 AI 创作。阶梯加赠。
   ═══════════════════════════════════════════════════════ */
function PointsConvert({ onClose }) {
  const BAL = 1284.5;
  const RATE = 100; // 1 USD = 100 P
  const [usd, setUsd] = React.useState("200");
  const [done, setDone] = React.useState(false);

  const amt = parseFloat(usd) || 0;
  const over = amt > BAL;
  // bonus tiers
  const bonusPct = amt >= 1000 ? 0.12 : amt >= 500 ? 0.06 : amt >= 100 ? 0.02 : 0;
  const base = Math.round(amt * RATE);
  const bonus = Math.round(base * bonusPct);
  const total = base + bonus;

  const tiers = [
    { min: 100,  pct: "+2%" },
    { min: 500,  pct: "+6%" },
    { min: 1000, pct: "+12%" },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(24,23,42,.45)",
        backdropFilter: "blur(4px)",
        display: "grid", placeItems: "center",
        animation: "fadeIn .15s ease-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 500, maxWidth: "92vw",
          background: "var(--surface)",
          borderRadius: 22,
          overflow: "hidden",
          boxShadow: "0 36px 90px -18px rgba(24,23,42,.5)",
        }}
      >
        {/* hero header */}
        <div style={{
          background: "linear-gradient(135deg, #18172a 0%, #2a2240 55%, #3c2fd0 130%)",
          padding: "22px 26px 20px",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", right: -50, top: -50,
            width: 220, height: 220, borderRadius: 99,
            background: "radial-gradient(circle, rgba(91,77,255,.4) 0%, transparent 70%)",
            pointerEvents: "none",
          }}/>
          <div style={{ position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div className="mono" style={{ fontSize: 10.5, letterSpacing: ".14em", color: "rgba(255,255,255,.55)", fontWeight: 700, marginBottom: 8 }}>
                CONVERT · BALANCE → POINTS
              </div>
              <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 24, lineHeight: 1.1 }}>
                抵扣 <em style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontWeight: 400, color: "var(--warm)" }}>AI 积分</em>
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginTop: 6 }}>用可提现余额兑换 Forge 积分，立即用于 AI 创作。</div>
            </div>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,.1)", border: "none", color: "white", padding: 6, borderRadius: 8, cursor: "default", display: "inline-flex" }}>
              <Icon name="x" size={16} color="white"/>
            </button>
          </div>
          {/* balance chips */}
          <div style={{ position: "relative", display: "flex", gap: 10, marginTop: 16 }}>
            <div style={{ flex: 1, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "8px 12px" }}>
              <div className="mono" style={{ fontSize: 9.5, color: "rgba(255,255,255,.5)", letterSpacing: ".06em" }}>可提现余额</div>
              <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 16, marginTop: 2 }}>${BAL.toLocaleString()}</div>
            </div>
            <div style={{ flex: 1, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "8px 12px" }}>
              <div className="mono" style={{ fontSize: 9.5, color: "rgba(255,255,255,.5)", letterSpacing: ".06em" }}>当前积分</div>
              <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 16, marginTop: 2, color: "var(--warm)" }}>128,400 P</div>
            </div>
          </div>
        </div>

        {/* body */}
        {!done ? (
          <div style={{ padding: "22px 26px 24px" }}>
            {/* amount */}
            <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: ".06em", fontWeight: 700, marginBottom: 8 }}>兑换金额 · USD</div>
            <div style={{
              display: "flex", alignItems: "center", gap: 4,
              border: `1.5px solid ${over ? "var(--bad)" : "var(--border)"}`,
              borderRadius: 14, padding: "10px 16px", background: "var(--bg-1, #fafaff)",
            }}>
              <span style={{ fontFamily: "Instrument Serif, serif", fontSize: 34, color: "var(--ink-2)" }}>$</span>
              <input
                value={usd}
                onChange={(e) => setUsd(e.target.value.replace(/[^0-9.]/g, ""))}
                style={{
                  border: "none", background: "transparent", outline: "none",
                  fontFamily: "Instrument Serif, serif", fontSize: 38, fontWeight: 400,
                  color: "var(--ink-1)", width: 160,
                }}
              />
              <span style={{ flex: 1 }}/>
              {[100, 500, 1000].map((v) => (
                <button key={v}
                  onClick={() => setUsd(String(v))}
                  style={{
                    padding: "5px 11px", background: "var(--bg-2)", border: "none",
                    borderRadius: 8, fontSize: 11.5, fontWeight: 700, color: "var(--ink-2)",
                    fontFamily: "inherit", cursor: "default",
                  }}>${v}</button>
              ))}
            </div>
            <div style={{ fontSize: 11.5, color: over ? "var(--bad)" : "var(--ink-3)", marginTop: 7 }}>
              {over ? "超出可提现余额" : <>1 USD = {RATE} P · 兑换不可逆，仅用于消耗</>}
            </div>

            {/* bonus tiers */}
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              {tiers.map((t, i) => {
                const active = amt >= t.min;
                return (
                  <div key={i} style={{
                    flex: 1, textAlign: "center",
                    padding: "10px 6px",
                    borderRadius: 10,
                    border: `1.5px solid ${active ? "var(--warm)" : "var(--border)"}`,
                    background: active ? "var(--warm-soft)" : "var(--surface)",
                  }}>
                    <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 15, color: active ? "var(--warm)" : "var(--ink-3)" }}>{t.pct}</div>
                    <div className="mono" style={{ fontSize: 9.5, color: "var(--ink-4)", marginTop: 2 }}>≥ ${t.min}</div>
                  </div>
                );
              })}
            </div>

            {/* result */}
            <div style={{
              marginTop: 18, padding: "16px 20px",
              background: "var(--bg-1, #fafaff)", border: "1px solid var(--border)",
              borderRadius: 14,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0" }}>
                <span style={{ color: "var(--ink-3)" }}>基础积分</span>
                <span className="mono" style={{ fontWeight: 700, color: "var(--ink-1)" }}>{base.toLocaleString()} P</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0" }}>
                <span style={{ color: "var(--ink-3)" }}>阶梯加赠 {bonusPct > 0 ? `(+${(bonusPct * 100).toFixed(0)}%)` : ""}</span>
                <span className="mono" style={{ fontWeight: 700, color: bonus > 0 ? "var(--warm)" : "var(--ink-3)" }}>+{bonus.toLocaleString()} P</span>
              </div>
              <div style={{ borderTop: "1px dashed var(--border-2)", margin: "8px 0", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink-1)" }}>实际到账</span>
                <span className="mono" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 24, color: "var(--brand)" }}>{total.toLocaleString()} P</span>
              </div>
            </div>

            <button
              onClick={() => !over && amt > 0 && setDone(true)}
              disabled={over || amt <= 0}
              style={{
                width: "100%", marginTop: 18,
                padding: "13px",
                background: "var(--brand)", color: "white",
                border: "none", borderRadius: 12,
                fontSize: 14, fontWeight: 700,
                fontFamily: "inherit", cursor: "default",
                opacity: over || amt <= 0 ? .45 : 1,
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: "0 8px 20px -6px rgba(91,77,255,.5)",
              }}
            >
              <Icon name="spark" size={14} color="white"/> 确认兑换 {total.toLocaleString()} P
            </button>
          </div>
        ) : (
          <div style={{ padding: "32px 26px 30px", textAlign: "center" }}>
            <div style={{
              width: 70, height: 70, borderRadius: 99,
              background: "var(--brand-soft)", margin: "0 auto 18px",
              display: "grid", placeItems: "center", position: "relative",
            }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 99, border: "2px solid var(--brand)", opacity: .3, animation: "pulse 2s infinite" }}/>
              <Icon name="spark" size={32} color="var(--brand)"/>
            </div>
            <h3 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 24, letterSpacing: "-.015em", margin: "0 0 10px" }}>
              兑换成功
            </h3>
            <p style={{ fontSize: 13.5, color: "var(--ink-2)", margin: "0 0 22px", lineHeight: 1.6 }}>
              <b className="mono" style={{ color: "var(--brand)" }}>{total.toLocaleString()} P</b> 已到账,积分余额更新为{" "}
              <b className="mono" style={{ color: "var(--ink-1)" }}>{(128400 + total).toLocaleString()} P</b>。
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={onClose} style={{
                padding: "11px 24px", background: "var(--ink-1)", color: "white",
                border: "none", borderRadius: 11, fontSize: 13.5, fontWeight: 700,
                fontFamily: "inherit", cursor: "default",
              }}>完成</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.PointsConvert = PointsConvert;

/* ═══════════════════════════════════════════════════════
   提现审核跟进 — WithdrawTracker
   在途提现的流水线状态：发起 → 风控 → 多签 → 通道 → 到账
   ═══════════════════════════════════════════════════════ */
function WithdrawTracker() {
  const STAGES = ["发起", "风控审核", "多签签名", "通道处理", "到账"];

  const items = [
    {
      id: "WD-2308-0917", ch: "银行 / Wise", chIc: "send", amt: "$2,200", started: "今天 11:08",
      stage: 3, state: "ok",   eta: "预计今天 18:00 到账", note: "Wise 通道处理中，已通过多签托管签名。",
    },
    {
      id: "WD-2308-0912", ch: "USDC · 链上", chIc: "coins", amt: "$480", started: "今天 09:42",
      stage: 2, state: "ok",   eta: "约 5 分钟", note: "等待 2/3 多签签名，预计很快上链。",
    },
    {
      id: "WD-2307-8841", ch: "银行 / Wise", chIc: "send", amt: "$3,200", started: "昨天 21:30",
      stage: 1, state: "warn", eta: "需补充资料", note: "大额触发增强风控，请补充收入来源说明。",
    },
  ];

  const [open, setOpen] = React.useState(items[0].id);

  const stateColor = (s) => s === "warn" ? "var(--warm)" : s === "bad" ? "var(--bad)" : "var(--ok)";

  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 17, color: "var(--ink-1)" }}>提现审核跟进</div>
        <span style={{
          padding: "3px 10px", background: "var(--warm-soft)", color: "var(--warm)",
          borderRadius: 99, fontSize: 11.5, fontWeight: 700,
        }}>{items.length} 笔在途</span>
        <span style={{ flex: 1 }}/>
        <button className="btn sm"><Icon name="refresh" size={12}/> 刷新状态</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((it) => {
          const expanded = open === it.id;
          const sc = stateColor(it.state);
          return (
            <div key={it.id} style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderLeft: `3px solid ${sc}`,
              borderRadius: 14,
              overflow: "hidden",
            }}>
              {/* summary row */}
              <div
                onClick={() => setOpen(expanded ? null : it.id)}
                style={{
                  display: "grid", gridTemplateColumns: "auto 1fr auto auto auto",
                  gap: 18, alignItems: "center",
                  padding: "16px 20px", cursor: "default",
                }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: "var(--bg-2)", color: "var(--ink-2)",
                  display: "grid", placeItems: "center", flexShrink: 0,
                }}>
                  <Icon name={it.chIc} size={16} color="var(--ink-2)"/>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-1)" }}>{it.id}</span>
                    <span style={{ fontSize: 12, color: "var(--ink-3)" }}>· {it.ch}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 3 }}>发起 {it.started}</div>
                </div>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "4px 11px", borderRadius: 99,
                  background: it.state === "warn" ? "var(--warm-soft)" : "var(--ok-soft)",
                  color: sc, fontSize: 11.5, fontWeight: 700,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: 99, background: sc }}/>
                  {it.state === "warn" ? "待处理" : "进行中"}
                </span>
                <div className="mono" style={{ fontSize: 15, fontWeight: 800, color: "var(--ink-1)", minWidth: 80, textAlign: "right" }}>{it.amt}</div>
                <Icon name="chev_d" size={14} color="var(--ink-4)" style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform .15s" }}/>
              </div>

              {/* pipeline */}
              {expanded && (
                <div style={{ padding: "4px 24px 20px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 16 }}>
                    {STAGES.map((s, i) => {
                      const done = i < it.stage;
                      const active = i === it.stage;
                      const isWarn = active && it.state === "warn";
                      const dotC = done ? "var(--ok)" : isWarn ? "var(--warm)" : active ? "var(--ink-1)" : "var(--bg-2)";
                      return (
                        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                          {/* line to next */}
                          {i < STAGES.length - 1 && (
                            <div style={{
                              position: "absolute", top: 13, left: "50%", width: "100%", height: 2,
                              background: done ? "var(--ok)" : "var(--border)",
                            }}/>
                          )}
                          <div style={{
                            width: 28, height: 28, borderRadius: 99,
                            background: dotC,
                            border: active && !isWarn ? "none" : "none",
                            color: (done || active) ? "white" : "var(--ink-4)",
                            display: "grid", placeItems: "center",
                            fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 11,
                            position: "relative", zIndex: 2,
                            boxShadow: active ? `0 0 0 4px ${isWarn ? "var(--warm-soft)" : "rgba(24,23,42,.1)"}` : "none",
                          }}>
                            {done ? <Icon name="check" size={13} color="white"/> : active && it.state !== "warn" ?
                              <span style={{ width: 7, height: 7, borderRadius: 99, background: "white", animation: "pulse 1.4s infinite" }}/>
                              : i + 1}
                          </div>
                          <div style={{
                            fontSize: 11, marginTop: 7, textAlign: "center",
                            color: done ? "var(--ok)" : active ? (isWarn ? "var(--warm)" : "var(--ink-1)") : "var(--ink-4)",
                            fontWeight: (done || active) ? 700 : 500,
                          }}>{s}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* status note */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 16px",
                    background: it.state === "warn" ? "var(--warm-soft)" : "var(--bg-1, #fafaff)",
                    border: `1px solid ${it.state === "warn" ? "var(--warm-line)" : "var(--border)"}`,
                    borderRadius: 10,
                  }}>
                    <Icon name={it.state === "warn" ? "shield" : "bolt"} size={15} color={sc}/>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5 }}>{it.note}</div>
                    </div>
                    <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: sc, whiteSpace: "nowrap" }}>{it.eta}</span>
                    {it.state === "warn" && (
                      <button style={{
                        padding: "6px 14px", background: "var(--warm)", color: "white",
                        border: "none", borderRadius: 9, fontSize: 12, fontWeight: 700,
                        fontFamily: "inherit", cursor: "default",
                      }}>去补充</button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

window.WithdrawTracker = WithdrawTracker;
