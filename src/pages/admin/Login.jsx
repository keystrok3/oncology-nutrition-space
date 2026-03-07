import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const { login }    = useAuth();
  const navigate     = useNavigate();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState(null);
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-heading text-2xl text-charcoal mb-1">
            Oncology Nutrition
          </p>
          <p className="font-body text-sm text-charcoal/50 uppercase tracking-widest">
            Admin Portal
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg border border-neutral p-8 shadow-sm">
          <h1 className="font-heading text-xl text-charcoal mb-6">
            Sign In
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 font-body text-sm px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            {/* Email */}
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

            {/* Password */}
            <div>
              <label className="font-body text-sm text-charcoal/70 block mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border border-neutral rounded-md px-3 py-2 font-body text-sm text-charcoal focus:outline-none focus:border-sage transition-colors duration-200"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary w-full text-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}