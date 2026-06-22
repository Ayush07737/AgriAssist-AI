"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="footer"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--surface-glass)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        className="mx-auto px-6 py-10"
        style={{ maxWidth: 1200 }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 no-underline mb-2">
              <span style={{ fontSize: 22 }}>🌿</span>
              <span className="font-bold text-base"
                style={{ color: "var(--primary)" }}>
                Agri<span style={{ color: "var(--accent)" }}>Assist</span> AI
              </span>
            </Link>
            <p className="m-0 text-xs" style={{ color: "var(--muted)", maxWidth: 300 }}>
              Autonomous multi-modal crop advisory for high-altitude farming in the Kedarnath Valley.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                Navigate
              </span>
              {[
                { label: "Home", href: "/" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "About", href: "/about" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="no-underline text-sm transition-colors duration-200"
                  style={{ color: "var(--foreground)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--foreground)"; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                Project
              </span>
              {[
                { label: "Login", href: "/login" },
                { label: "GitHub", href: "https://github.com" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="no-underline text-sm transition-colors duration-200"
                  style={{ color: "var(--foreground)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--primary)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--foreground)"; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="m-0 text-xs" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} AgriAssist AI · TBI-GEU Summer Internship 2026
          </p>
          <p className="m-0 text-xs" style={{ color: "var(--muted)" }}>
            Built with ❤️ for grassroots MSMEs
          </p>
        </div>
      </div>
    </footer>
  );
}
