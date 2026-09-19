import { FormEvent, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { requestAdminOtp, verifyAdminOtp } from "../api/auth";
import { ApiError } from "../api/errors";
import { useAuth } from "../auth/AuthContext";

type Mode = "password" | "otp";

export function LoginPage() {
  const { account, ready, login, completeLogin } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";
  const [mode, setMode] = useState<Mode>("password");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (ready && account) {
    return <Navigate to={from} replace />;
  }

  async function onPassword(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);
    try {
      await login(identifier, password);
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Sign-in failed.");
    } finally {
      setSubmitting(false);
    }
  }

  async function onRequestOtp(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);
    try {
      await requestAdminOtp(identifier.trim());
      setOtpSent(true);
      setInfo("If this is a registered admin, a code was sent. In local dev, read it from the API console.");
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Could not send a code.");
    } finally {
      setSubmitting(false);
    }
  }

  async function onVerifyOtp(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);
    try {
      completeLogin(await verifyAdminOtp(identifier.trim(), code.trim()));
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : "Could not verify that code.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand">
          <img className="login-logo" src="/logo-mark.svg" alt="" width={56} height={56} />
          <div className="brand-text">
            <div className="brand-name">
              <span className="ay">Ay</span>
              <span className="nera">Nera</span>
            </div>
            <div className="brand-sub">The Era of Togetherness.</div>
          </div>
        </div>
        <h1>Sign in</h1>
        {mode === "password" ? (
          <form className="stack" onSubmit={(event) => void onPassword(event)}>
            {error ? <div className="banner error">{error}</div> : null}
            <div className="field">
              <label htmlFor="identifier">Work email or phone</label>
              <input
                id="identifier"
                name="identifier"
                autoComplete="username"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
              {submitting ? "Signing in…" : "Continue"}
            </button>
            <p className="login-alt">
              <button
                type="button"
                onClick={() => {
                  setMode("otp");
                  setError(null);
                  setInfo(null);
                  setOtpSent(false);
                  setCode("");
                }}
              >
                Sign in with OTP
              </button>
            </p>
          </form>
        ) : (
          <form className="stack" onSubmit={(event) => void (otpSent ? onVerifyOtp(event) : onRequestOtp(event))}>
            {error ? <div className="banner error">{error}</div> : null}
            {info ? <div className="banner info">{info}</div> : null}
            <div className="field">
              <label htmlFor="otp-identifier">Work email or phone</label>
              <input
                id="otp-identifier"
                name="identifier"
                autoComplete="username"
                value={identifier}
                onChange={(event) => {
                  setIdentifier(event.target.value);
                  setOtpSent(false);
                }}
                required
              />
            </div>
            {otpSent ? (
              <div className="field">
                <label htmlFor="code">One-time code</label>
                <input
                  id="code"
                  name="code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  required
                />
              </div>
            ) : null}
            <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
              {submitting ? "Please wait…" : otpSent ? "Verify code" : "Send code"}
            </button>
            <p className="login-alt">
              <button
                type="button"
                onClick={() => {
                  setMode("password");
                  setError(null);
                  setInfo(null);
                  setOtpSent(false);
                  setCode("");
                }}
              >
                Sign in with password
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
