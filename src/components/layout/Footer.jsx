import { Link } from "react-router-dom";

const QUICK_LINKS = [
  { label: "Home",                path: "/" },
  { label: "About",               path: "/about" },
  { label: "Programs & Services", path: "/programs" },
  { label: "Blog",                path: "/blog" },
  { label: "Testimonials",        path: "/testimonials" },
  { label: "FAQs",                path: "/faqs" },
  { label: "Contact",             path: "/contact" },
];

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-charcoal text-neutral mt-auto">

      {/* ── Main Footer Grid ───────────────────────────────── */}
      {/* Each column is centered — text, links, and icons all align to center */}
      <div className="container-wide px-6 md:px-12 lg:px-24 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Column 1 — About the Initiative */}
        <div className="flex flex-col items-center text-center">
          <p className="font-heading text-lg font-semibold text-white leading-tight mb-3">
            Oncology Nutrition
            <span className="block text-xs font-body font-normal text-neutral tracking-wide uppercase mt-0.5">
              Nourishing Cancer Care
            </span>
          </p>
          <p className="font-body text-sm text-neutral leading-relaxed">
            Bridging the gap between cancer care and nutrition in Kenya and
            beyond. Evidence-based. Compassionate. Built for patients,
            caregivers, and clinicians.
          </p>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="flex flex-col items-center text-center">
          <h4 className="font-heading text-white text-base font-semibold mb-4">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2">
            {QUICK_LINKS.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="font-body text-sm text-neutral hover:text-white transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Connect */}
        <div className="flex flex-col items-center text-center">
          <h4 className="font-heading text-white text-base font-semibold mb-4">
            Connect With Us
          </h4>

          {/* WhatsApp link — update href with actual number or group link */}
          <a
            href="https://wa.me/yournumberhere"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm text-neutral hover:text-white transition-colors duration-200 mb-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-sage shrink-0"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Join our WhatsApp Community
          </a>

          <p className="font-body text-sm text-neutral mt-4">
            Have a question?{" "}
            <Link
              to="/contact"
              className="text-sage hover:text-white transition-colors duration-200 underline underline-offset-2"
            >
              Get in touch
            </Link>
          </p>
        </div>
      </div>

      {/* ── Bottom Bar ─────────────────────────────────────── */}
      <div className="border-t border-neutral/20 py-4 px-6 md:px-12 lg:px-24">
        <p className="font-body text-xs text-neutral/60 text-center">
          &copy; {YEAR} Oncology Nutrition Space. All rights reserved.
        </p>
      </div>
    </footer>
  );
}