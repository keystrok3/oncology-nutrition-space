import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home",                path: "/" },
  { label: "About",               path: "/about" },
  { label: "Programs & Services", path: "/programs" },
  { label: "Gallery",             path: "/gallery" },
  // { label: "Blog",             path: "/blog" },
  // { label: "Testimonials",     path: "/testimonials" },
  // { label: "FAQs",             path: "/faqs" },
  { label: "Contact",             path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return undefined;
    }

    const updateScrollState = () => setScrolled(window.scrollY > 80);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, [isHome]);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-sage border-sage font-medium border-b-2 pb-0.5 whitespace-nowrap"
      : "text-charcoal/85 hover:text-sage transition-colors duration-200 whitespace-nowrap";

  return (
    <header
      className={`${isHome
        ? scrolled
          ? "home-navbar home-navbar-scrolled fixed top-0 left-0 right-0"
          : "home-navbar absolute top-0 left-0 right-0"
        : "bg-cream border-b border-neutral sticky top-0"} z-50`}
    >

      {/* Reduced py-3 from py-4 to bring navbar height down */}
      <nav className="container-wide px-6 md:px-12 lg:px-24 py-3 flex items-center justify-between">

        {/* ── Logo ───────────────────────────────────────────── */}
        {/* ── Logo ───────────────────────────────────────────── */}
        <Link to="/" className="shrink-0">
          <img
            src="/images/logo2.svg"
            alt="Oncology Nutrition Space"
            className="h-16 w-auto"
          />
        </Link>

        {/* ── Desktop Nav Links ──────────────────────────────── */}
        {/* gap-6 gives consistent, even spacing between all items */}
        <ul className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <NavLink to={path} end={path === "/"} className={linkClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ────────────────────────────────────── */}
        <div className="hidden lg:block shrink-0">
          <Link to="/contact" className="btn-primary">
            Get Support
          </Link>
        </div>

        {/* ── Mobile Hamburger ───────────────────────────────── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
        >
          <span className={`block h-0.5 w-6 bg-charcoal transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-charcoal transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-charcoal transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* ── Mobile Dropdown Menu ─────────────────────────────── */}
      {menuOpen && (
        <div className="lg:hidden bg-cream/95 border-t border-neutral px-6 pb-6">
          <ul className="flex flex-col gap-4 pt-4">
            {NAV_LINKS.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === "/"}
                  className={linkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              to="/contact"
              className="btn-primary w-full text-center block"
              onClick={() => setMenuOpen(false)}
            >
              Get Support
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
