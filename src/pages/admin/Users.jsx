import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useAuth } from "../../context/AuthContext";

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Users() {
  const { authFetch } = useAuth();

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setError(null);

    try {
      const res = await authFetch("/api/users");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to load users.");
      }

      setUsers(data.users ?? []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await authFetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to create account.");
      }

      setUsers(prev => [data.user, ...prev]);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("admin");
      setSuccess(`${data.user.name} was created successfully.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-charcoal mb-1">Users</h1>
        <p className="font-body text-sm text-charcoal/50">
          Create admin accounts and review who can access the dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[24rem,1fr] gap-6">
        <section className="bg-white rounded-lg border border-neutral p-6 shadow-sm h-fit">
          <h2 className="font-heading text-xl text-charcoal mb-2">
            Create account
          </h2>
          <p className="font-body text-sm text-charcoal/55 mb-6">
            Existing admins can create additional admins or writer accounts here.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 font-body text-sm px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-sage/10 border border-sage/20 text-sage-dark font-body text-sm px-4 py-3 rounded-md mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="font-body text-sm text-charcoal/70 block mb-1.5">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-neutral rounded-md px-3 py-2 font-body text-sm text-charcoal focus:outline-none focus:border-sage transition-colors duration-200"
                placeholder="Team member name"
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

            <div>
              <label className="font-body text-sm text-charcoal/70 block mb-1.5">
                Role
              </label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full border border-neutral rounded-md px-3 py-2 font-body text-sm text-charcoal focus:outline-none focus:border-sage transition-colors duration-200 bg-white"
              >
                <option value="admin">Admin</option>
                <option value="writer">Writer</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="font-body text-sm text-charcoal/70 block mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-neutral rounded-md px-3 py-2 font-body text-sm text-charcoal focus:outline-none focus:border-sage transition-colors duration-200"
                  placeholder="Temporary or permanent password"
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
              disabled={submitting}
              className="btn-primary w-full text-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Creating account..." : "Create account"}
            </button>
          </form>
        </section>

        <section className="bg-white rounded-lg border border-neutral overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-neutral bg-cream flex items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-xl text-charcoal">Current users</h2>
              <p className="font-body text-sm text-charcoal/50">
                Accounts with access to publishing and administration tools.
              </p>
            </div>
            <span className="font-body text-xs uppercase tracking-wide text-charcoal/50">
              {users.length} total
            </span>
          </div>

          {loading ? (
            <div className="px-6 py-8">
              <p className="font-body text-sm text-charcoal/50">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="px-6 py-8">
              <p className="font-body text-sm text-charcoal/50">No users found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-neutral">
                    <th className="font-body text-xs uppercase tracking-wide text-charcoal/50 px-6 py-3">
                      Name
                    </th>
                    <th className="font-body text-xs uppercase tracking-wide text-charcoal/50 px-6 py-3">
                      Email
                    </th>
                    <th className="font-body text-xs uppercase tracking-wide text-charcoal/50 px-6 py-3">
                      Role
                    </th>
                    <th className="font-body text-xs uppercase tracking-wide text-charcoal/50 px-6 py-3">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((account) => (
                    <tr
                      key={account.id}
                      className="border-b border-neutral last:border-b-0 hover:bg-cream/40 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <p className="font-body text-sm font-medium text-charcoal">
                          {account.name}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-body text-sm text-charcoal/65">
                          {account.email}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 font-body text-xs capitalize ${
                            account.role === "admin"
                              ? "bg-sage/10 text-sage-dark"
                              : "bg-neutral text-charcoal/60"
                          }`}
                        >
                          {account.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-body text-sm text-charcoal/50">
                          {formatDate(account.created_at)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
