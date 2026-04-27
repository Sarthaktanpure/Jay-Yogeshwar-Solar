import { useState } from "react";
import { LockKeyhole, Mail, ShieldCheck, User } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { useAuth } from "../context/AuthContext";

const initialLogin = { email: "", password: "" };
const initialSignup = { name: "", email: "", password: "" };

function AuthPage() {
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState("login");
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [signupForm, setSignupForm] = useState(initialSignup);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/gallery"} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const nextUser = mode === "login" ? await login(loginForm) : await register(signupForm);
      const destination = location.state?.from || (nextUser.role === "admin" ? "/admin" : "/gallery");
      navigate(destination, { replace: true });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "We could not complete that request. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section-band">
      <div className="page-wrap grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Authorization"
          title="Sign in for project comments, or unlock the admin workspace with the approved email"
          body="The protected dashboard is available only to the two whitelisted admin email addresses. Other users can still create accounts and comment on project videos."
        />

        <div className="panel-strong overflow-hidden p-2">
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#eef3e6] p-2">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                mode === "login" ? "bg-white text-green-900 shadow" : "text-slate-600"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                mode === "signup" ? "bg-white text-green-900 shadow" : "text-slate-600"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-4 p-4 sm:p-6" onSubmit={handleSubmit}>
            {mode === "signup" ? (
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <User className="h-4 w-4" />
                  Full name
                </span>
                <input
                  className="input-field"
                  value={signupForm.name}
                  onChange={(event) => setSignupForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Your name"
                  required
                />
              </label>
            ) : null}

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Mail className="h-4 w-4" />
                Email
              </span>
              <input
                type="email"
                className="input-field"
                value={mode === "login" ? loginForm.email : signupForm.email}
                onChange={(event) =>
                  mode === "login"
                    ? setLoginForm((current) => ({ ...current, email: event.target.value }))
                    : setSignupForm((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="name@example.com"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <LockKeyhole className="h-4 w-4" />
                Password
              </span>
              <input
                type="password"
                minLength={8}
                className="input-field"
                value={mode === "login" ? loginForm.password : signupForm.password}
                onChange={(event) =>
                  mode === "login"
                    ? setLoginForm((current) => ({ ...current, password: event.target.value }))
                    : setSignupForm((current) => ({ ...current, password: event.target.value }))
                }
                placeholder="Minimum 8 characters"
                required
              />
            </label>

            <button type="submit" className="action-primary w-full" disabled={submitting}>
              {submitting ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
            </button>

            {status.message ? (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{status.message}</p>
            ) : null}
          </form>

          <div className="border-t border-green-900/10 bg-[#f9fbf4] p-4 sm:p-6">
            <div className="flex items-start gap-3 rounded-2xl bg-green-50 p-4 text-green-900">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="text-sm leading-7">
                Admin dashboard access is restricted to `yogeshmhase08@gmail.com` and `sarthaktanpure255@gmail.com`.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthPage;
