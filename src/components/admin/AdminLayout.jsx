import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Nav items — users link is admin only, handled via CSS/conditional
const NAV_ITEMS = [
  { label: "Dashboard",  path: "/admin",            exact: true },
  { label: "Posts",      path: "/admin/posts"                   },
  { label: "Categories", path: "/admin/categories"              },
  { label: "Users",      path: "/admin/users",      adminOnly: true },
];

export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-cream">

      {/* ── Sidebar ──────────────────────────────────────────── */}
      <aside className="w-56 bg-charcoal flex flex-col shrink-0">

        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <p className="font-heading text-sm font-semibold text-white leading-tight">
            Oncology Nutrition
            <span className="block text-xs font-body font-normal text-neutral/60 uppercase tracking-wide mt-0.5">
              Admin
            </span>
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ label, path, exact, adminOnly }) => {
              // Hide admin-only items from writers
              if (adminOnly && user?.role !== "admin") return null;

              return (
                <li key={path}>
                  <NavLink
                    to={path}
                    end={exact}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md font-body text-sm transition-colors duration-200 ${
                        isActive
                          ? "bg-sage text-white"
                          : "text-neutral/70 hover:text-white hover:bg-white/10"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User info + logout */}
        <div className="px-4 py-4 border-t border-white/10">
          <p className="font-body text-xs text-neutral/60 mb-1 truncate">
            {user?.email}
          </p>
          <p className="font-body text-xs text-sage capitalize mb-3">
            {user?.role}
          </p>
          <button
            onClick={handleLogout}
            className="w-full text-left font-body text-xs text-neutral/50 hover:text-white transition-colors duration-200"
          >
            Sign out →
          </button>
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>

    </div>
  );
}