// AirvanaMaker v2 — Login
// Split screen: left brand stage with Forge / right form (email OTP + Google)

function GoogleGlyph({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.3c-2 1.5-4.5 2.5-7.3 2.5-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.6l6.2 5.3C40 35.6 44 30.3 44 24c0-1.3-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

function Login({ onLogin }) {
  const [step, setStep] = React.useState("email"); // email | code | google-loading
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = React.useState(0);
  const [error, setError] = React.useState("");
  const codeRefs = React.useRef([]);

  // countdown for resend
  React.useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const emailValid = /^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(email.trim());

  const sendCode = () => {
    if (!emailValid) {
      setError("请输入正确的邮箱地址");
      return;
    }
    setError("");
    setStep("code");
    setCountdown(60);
    setTimeout(() => codeRefs.current[0]?.focus(), 50);
  };

  const onCodeChange = (idx, val) => {
    const v = val.replace(/\D/g, "").slice(0, 1);
    const next = [...code];
    next[idx] = v;
    setCode(next);
    setError("");
    if (v && idx < 5) codeRefs.current[idx + 1]?.focus();
    // auto-submit when all filled
    if (idx === 5 && v && next.every(c => c)) {
      setTimeout(() => verify(next.join("")), 100);
    }
  };

  const onCodeKey = (idx, e) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      codeRefs.current[idx - 1]?.focus();
    }
    if (e.key === "Enter") verify(code.join(""));
  };

  const onPaste = (e) => {
    const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!txt) return;
    e.preventDefault();
    const next = txt.split("").concat(["", "", "", "", "", ""]).slice(0, 6);
    setCode(next);
    codeRefs.current[Math.min(txt.length, 5)]?.focus();
    if (txt.length === 6) setTimeout(() => verify(txt), 100);
  };

  const verify = (full) => {
    const c = full || code.join("");
    if (c.length !== 6) {
      setError("请输入完整的 6 位验证码");
      return;
    }
    // simulate
    setError("");
    setTimeout(() => onLogin({ email, method: "email" }), 400);
  };

  const googleLogin = () => {
    setStep("google-loading");
    setTimeout(() => onLogin({ email: "aria@gmail.com", method: "google" }), 1100);
  };

  const backToEmail = () => {
    setStep("email");
    setCode(["", "", "", "", "", ""]);
    setError("");
    setCountdown(0);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1.05fr 1fr",
      background: "var(--bg)",
    }}>
      {/* LEFT — brand stage */}
      <div style={{
        background: "linear-gradient(155deg, #18172a 0%, #2a2240 55%, #3c2fd0 110%)",
        color: "white",
        padding: "56px 60px",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* atmospheric blobs */}
        <div style={{
          position: "absolute", top: -120, right: -100,
          width: 460, height: 460, borderRadius: 99,
          background: "radial-gradient(circle, rgba(255,122,61,.35) 0%, transparent 65%)",
          pointerEvents: "none",
        }}/>
        <div style={{
          position: "absolute", bottom: -160, left: -120,
          width: 520, height: 520, borderRadius: 99,
          background: "radial-gradient(circle, rgba(91,77,255,.45) 0%, transparent 60%)",
          pointerEvents: "none",
        }}/>

        {/* brand mark */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "white", color: "var(--ink-1)",
            display: "grid", placeItems: "center",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800, fontSize: 22,
          }}>A</div>
          <div style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800, fontSize: 22, letterSpacing: "-.01em",
          }}>
            Airvana<em style={{ fontFamily: "Instrument Serif, serif", fontWeight: 400, fontStyle: "italic", color: "var(--warm)" }}>Maker</em>
          </div>
        </div>

        {/* center stage */}
        <div style={{ position: "relative", maxWidth: 460 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 18, marginBottom: 28 }}>
            <Mascot size={72} mood="happy"/>
            <div style={{
              padding: "10px 14px",
              background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: "4px 14px 14px 14px",
              backdropFilter: "blur(8px)",
              fontSize: 13, lineHeight: 1.5,
              maxWidth: 280, marginBottom: 6,
            }}>
              欢迎回来 👋<br/>
              <span style={{ color: "rgba(255,255,255,.65)" }}>
                上次我们在打磨 <em style={{ fontStyle: "normal", color: "var(--warm)", fontWeight: 600 }}>Pump or Dump v1.b</em>，要继续吗？
              </span>
            </div>
          </div>

          <h1 style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 800, fontSize: 44, lineHeight: 1.05,
            letterSpacing: "-.02em",
            margin: "0 0 18px",
          }}>
            你的 <em style={{ fontStyle: "normal", color: "var(--warm)" }}>24 小时</em><br/>
            Agentic Playable<br/>
            <em style={{ fontFamily: "Instrument Serif, serif", fontWeight: 400, fontStyle: "italic", fontSize: 50 }}>搭子</em>
          </h1>

          <p style={{
            fontSize: 14, lineHeight: 1.65,
            color: "rgba(255,255,255,.72)",
            margin: 0, maxWidth: 420,
          }}>
            Forge Agent 替你创作、运营、结算。
            从一句话到 8 平台同步分发，全程不超过 5 分钟。
          </p>
        </div>

        {/* footer */}
        <div style={{
          position: "relative",
          display: "flex", justifyContent: "space-between",
          fontSize: 11.5, color: "rgba(255,255,255,.5)",
          fontFamily: "IBM Plex Mono, monospace",
          letterSpacing: ".06em",
        }}>
          <span>v4.2 · 9 nodes online</span>
          <span style={{ display: "inline-flex", gap: 20 }}>
            <span style={{ cursor: "default" }}>服务条款</span>
            <span style={{ cursor: "default" }}>隐私</span>
            <span style={{ cursor: "default" }}>帮助</span>
          </span>
        </div>
      </div>

      {/* RIGHT — form */}
      <div style={{
        padding: "56px 60px",
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        position: "relative",
      }}>
        <div style={{ maxWidth: 380, width: "100%", margin: "0 auto" }}>

          {step === "email" && (
            <>
              <div className="mono" style={{
                fontSize: 11, letterSpacing: ".12em",
                color: "var(--ink-3)", fontWeight: 700,
                marginBottom: 10,
              }}>· SIGN IN ·</div>
              <h2 style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 800, fontSize: 30, lineHeight: 1.1,
                letterSpacing: "-.015em",
                margin: "0 0 10px",
              }}>登录到 <em style={{ fontStyle: "normal", color: "var(--brand)" }}>AirvanaMaker</em></h2>
              <p style={{
                fontSize: 13, lineHeight: 1.6,
                color: "var(--ink-3)", margin: "0 0 28px",
              }}>用邮箱验证码或 Google 账号登录，无需密码。</p>

              {/* Google */}
              <button
                onClick={googleLogin}
                style={{
                  width: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  padding: "13px 16px",
                  background: "white",
                  border: "1.5px solid var(--border-2)",
                  borderRadius: 12,
                  fontSize: 14, fontWeight: 600,
                  fontFamily: "inherit",
                  color: "var(--ink-1)",
                  cursor: "default",
                  marginBottom: 18,
                  transition: "all .15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--bg-1, #fafaff)";
                  e.currentTarget.style.borderColor = "var(--ink-4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.borderColor = "var(--border-2)";
                }}
              >
                <GoogleGlyph size={18}/>
                <span>使用 Google 一键登录</span>
              </button>

              {/* divider */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                margin: "22px 0",
                color: "var(--ink-4)",
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: 10.5, letterSpacing: ".15em",
                fontWeight: 700,
              }}>
                <span style={{ flex: 1, height: 1, background: "var(--border)" }}/>
                <span>或</span>
                <span style={{ flex: 1, height: 1, background: "var(--border)" }}/>
              </div>

              {/* email */}
              <label style={{
                display: "block",
                fontSize: 12, fontWeight: 700, color: "var(--ink-2)",
                marginBottom: 7,
              }}>邮箱地址</label>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 14px",
                background: "white",
                border: `1.5px solid ${error ? "var(--bad)" : "var(--border-2)"}`,
                borderRadius: 12,
                transition: "border-color .15s",
              }}>
                <Icon name="msg" size={14} color="var(--ink-3)"/>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && sendCode()}
                  autoFocus
                  style={{
                    flex: 1,
                    border: "none", outline: "none",
                    font: "inherit", fontSize: 14,
                    background: "transparent",
                    color: "var(--ink-1)",
                  }}
                />
              </div>
              {error && (
                <div style={{
                  fontSize: 11.5, color: "var(--bad)",
                  marginTop: 6, display: "flex", alignItems: "center", gap: 4,
                }}>
                  <Icon name="x" size={11} color="var(--bad)"/> {error}
                </div>
              )}

              <button
                className="btn brand"
                onClick={sendCode}
                disabled={!emailValid}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "13px 16px",
                  fontSize: 14, fontWeight: 700,
                  marginTop: 18,
                  opacity: emailValid ? 1 : .5,
                }}
              >
                发送验证码 <Icon name="arrow_r" size={13} color="white"/>
              </button>

              <p style={{
                fontSize: 11, color: "var(--ink-3)",
                lineHeight: 1.6, marginTop: 22, textAlign: "center",
              }}>
                登录即表示你同意我们的<span style={{ color: "var(--brand)", borderBottom: "1px solid var(--brand-line)", cursor: "default" }}>服务条款</span>
                与<span style={{ color: "var(--brand)", borderBottom: "1px solid var(--brand-line)", cursor: "default" }}>隐私政策</span>。
              </p>
            </>
          )}

          {step === "code" && (
            <>
              <button
                onClick={backToEmail}
                style={{
                  background: "transparent", border: "none",
                  color: "var(--ink-3)", fontSize: 12, fontWeight: 600,
                  fontFamily: "inherit", padding: 0,
                  display: "inline-flex", alignItems: "center", gap: 5,
                  marginBottom: 18, cursor: "default",
                }}
              >
                <span style={{ transform: "rotate(180deg)", display: "inline-flex" }}>
                  <Icon name="arrow_r" size={12} color="var(--ink-3)"/>
                </span>
                返回
              </button>

              <div className="mono" style={{
                fontSize: 11, letterSpacing: ".12em",
                color: "var(--ink-3)", fontWeight: 700,
                marginBottom: 10,
              }}>· VERIFY ·</div>
              <h2 style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 800, fontSize: 30, lineHeight: 1.1,
                letterSpacing: "-.015em",
                margin: "0 0 10px",
              }}>查收<em style={{ fontStyle: "normal", color: "var(--brand)" }}>验证码</em></h2>
              <p style={{
                fontSize: 13, lineHeight: 1.6,
                color: "var(--ink-3)", margin: "0 0 24px",
              }}>
                我们已经把 6 位验证码发到了<br/>
                <b style={{ color: "var(--ink-1)", fontWeight: 700 }}>{email}</b>
                <span style={{ color: "var(--ink-4)" }}> · 10 分钟内有效</span>
              </p>

              {/* 6-digit input */}
              <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                {code.map((c, i) => (
                  <input
                    key={i}
                    ref={(el) => (codeRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={c}
                    onChange={(e) => onCodeChange(i, e.target.value)}
                    onKeyDown={(e) => onCodeKey(i, e)}
                    onPaste={i === 0 ? onPaste : undefined}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      height: 56,
                      textAlign: "center",
                      fontFamily: "IBM Plex Mono, monospace",
                      fontSize: 24, fontWeight: 700,
                      color: "var(--ink-1)",
                      background: "white",
                      border: `1.5px solid ${error ? "var(--bad)" : c ? "var(--brand)" : "var(--border-2)"}`,
                      borderRadius: 12,
                      outline: "none",
                      transition: "all .12s",
                    }}
                  />
                ))}
              </div>
              {error && (
                <div style={{
                  fontSize: 11.5, color: "var(--bad)",
                  marginTop: 6, display: "flex", alignItems: "center", gap: 4,
                }}>
                  <Icon name="x" size={11} color="var(--bad)"/> {error}
                </div>
              )}

              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                fontSize: 12, marginTop: 16,
              }}>
                <span style={{ color: "var(--ink-3)" }}>没收到验证码？</span>
                {countdown > 0 ? (
                  <span className="mono" style={{ color: "var(--ink-4)" }}>{countdown}s 后可重发</span>
                ) : (
                  <button
                    onClick={sendCode}
                    style={{
                      background: "transparent", border: "none",
                      color: "var(--brand)", fontSize: 12, fontWeight: 700,
                      fontFamily: "inherit", padding: 0, cursor: "default",
                    }}
                  >重新发送</button>
                )}
              </div>

              <button
                className="btn brand"
                onClick={() => verify()}
                disabled={code.some(c => !c)}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "13px 16px",
                  fontSize: 14, fontWeight: 700,
                  marginTop: 22,
                  opacity: code.every(c => c) ? 1 : .5,
                }}
              >
                <Icon name="check" size={13} color="white"/> 登录
              </button>
            </>
          )}

          {step === "google-loading" && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: "white",
                border: "1.5px solid var(--border)",
                display: "grid", placeItems: "center",
                margin: "0 auto 18px",
                boxShadow: "var(--sh-md)",
              }}>
                <GoogleGlyph size={28}/>
              </div>
              <h3 style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 800, fontSize: 18,
                margin: "0 0 8px",
              }}>正在用 Google 登录…</h3>
              <p style={{ fontSize: 12.5, color: "var(--ink-3)", margin: 0 }}>请在弹窗中授权</p>
              <div style={{
                margin: "22px auto 0",
                width: 24, height: 24,
                border: "2.5px solid var(--brand-soft)",
                borderTopColor: "var(--brand)",
                borderRadius: 99,
                animation: "spin .8s linear infinite",
              }}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

window.Login = Login;
