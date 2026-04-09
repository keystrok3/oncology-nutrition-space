import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../lib/api";

export default function AdminSetup() {
  const { user, loading: authLoading, startSession } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkingSetup, setCheckingSetup] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/admin", { replace: true });
    }
  }, [authLoading, navigate, user]);

  useEffect(() => {
    let isMounted = true;

    async function loadSetupStatus() {
      try {
        const data = await apiFetch("/api/auth/setup-status");

        if (!isMounted) return;

        if (!data.needsSetup) {
          navigate("/admin/login", { replace: true });
          return;
        }

        setNeedsSetup(true);
      } catch {
        if (isMounted) {
          setError("Failed to check setup status.");
        }
      } finally {
        if (isMounted) {
          setCheckingSetup(false);
        }
      }
    }

    loadSetupStatus();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const data = await apiFetch("/api/auth/setup-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      startSession(data.token, data.user);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <p className="font-heading text-2xl text-charcoal mb-1">
            Oncology Nutrition
          </p>
          <p className="font-body text-sm text-charcoal/50 uppercase tracking-widest">
            First Admin Setup
          </p>
        </div>

        <div className="bg-white rounded-lg border border-neutral p-8 shadow-sm">
          {checkingSetup || authLoading ? (
            <p className="font-body text-sm text-charcoal/50">Loading...</p>
          ) : needsSetup ? (
            <>
              <h1 className="font-heading text-xl text-charcoal mb-3">
                Create the first admin
              </h1>
              <p className="font-body text-sm text-charcoal/60 mb-6">
                This page is available only once, before any user accounts exist.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 font-body text-sm px-4 py-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <div>
                  <label className="font-body text-sm text-charcoal/70 block mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full border border-neutral rounded-md px-3 py-2 font-body text-sm text-charcoal focus:outline-none focus:border-sage transition-colors duration-200"
                    placeholder="Admin name"
                    required
                  />
                </div>

                <div>
                  <label className="font-body text-sm text-charcoal/70 block mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full border border-neutral rounded-md px-3 py-2 font-body text-sm text-charcoal focus:outline-none focus:border-sage transition-colors duration-200"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm text-charcoal/70 block mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full border border-neutral rounded-md px-3 py-2 font-body text-sm text-charcoal focus:outline-none focus:border-sage transition-colors duration-200"
                      placeholder="Choose a password"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-body text-sm text-charcoal/70 block mb-1.5">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="w-full border border-neutral rounded-md px-3 py-2 font-body text-sm text-charcoal focus:outline-none focus:border-sage transition-colors duration-200"
                      placeholder="Repeat password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full text-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating admin..." : "Create admin account"}
                </button>
              </form>
            </>
          ) : error ? (
            <>
              <h1 className="font-heading text-xl text-charcoal mb-3">
                Setup check failed
              </h1>
              <p className="font-body text-sm text-charcoal/60 mb-6">
                {error}
              </p>
              <Link to="/admin/login" className="btn-outline w-full text-center block">
                Back to login
              </Link>
            </>
          ) : (
            <>
              <h1 className="font-heading text-xl text-charcoal mb-3">
                Setup unavailable
              </h1>
              <p className="font-body text-sm text-charcoal/60 mb-6">
                An admin account already exists. Use the regular login page instead.
              </p>
              <Link to="/admin/login" className="btn-outline w-full text-center block">
                Back to login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
