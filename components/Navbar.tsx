"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "📸 Scan Leaf", href: "/scan" },
  { label: "🗣️ AI Chat", href: "/chat" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "History", href: "/scans" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 animate-slide-down"
      style={{
        height: "var(--nav-height)",
        background: "var(--surface-glass)",
        backdropFilter: "blur(18px) saturate(1.8)",
        WebkitBackdropFilter: "blur(18px) saturate(1.8)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto flex items-center justify-between h-full px-6" style={{ maxWidth: 1200 }}>
        {/* Logo */}
        <Link href="/" id="navbar-logo" className="flex items-center gap-2.5 no-underline">
          <span style={{ fontSize: 26, filter: "drop-shadow(0 2px 4px rgba(45,122,58,0.25))" }}>🌿</span>
          <span className="font-bold text-lg tracking-tight" style={{ color: "var(--primary)" }}>
            Agri<span style={{ color: "var(--accent)" }}>Assist</span> <span className="text-xs font-normal text-[var(--muted)]">AI</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          <ul className="flex items-center gap-1 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  id={`nav-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
                  href={link.href}
                  className="no-underline px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200"
                  style={{ color: "var(--foreground)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(76,175,80,0.12)";
                    e.currentTarget.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--foreground)";
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth State */}
          <div className="ml-3 pl-3 border-l border-[var(--border)] flex items-center gap-2">
            {isLoaded && isSignedIn ? (
              <UserButton />
            ) : (
              <Link
                href="/sign-in"
                className="no-underline px-3.5 py-1.5 rounded-lg text-xs font-bold text-white transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                  boxShadow: "0 2px 8px rgba(45,122,58,0.25)",
                }}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-3">
          {isLoaded && isSignedIn && <UserButton />}
          <button
            id="navbar-menu-toggle"
            className="flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-0.5 rounded-full transition-all duration-300"
              style={{
                background: "var(--foreground)",
                transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none",
              }}
            />
            <span
              className="block w-5 h-0.5 rounded-full transition-all duration-300"
              style={{
                background: "var(--foreground)",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-0.5 rounded-full transition-all duration-300"
              style={{
                background: "var(--foreground)",
                transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden animate-slide-down"
          style={{
            background: "var(--surface-glass)",
            backdropFilter: "blur(18px)",
            borderBottom: "1px solid var(--border)",
            padding: "12px 24px 20px",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block no-underline py-2.5 text-sm font-medium"
              style={{
                color: "var(--foreground)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {link.label}
            </Link>
          ))}
          {isLoaded && !isSignedIn && (
            <Link
              href="/sign-in"
              onClick={() => setMenuOpen(false)}
              className="block text-center no-underline mt-4 py-2.5 rounded-xl text-xs font-bold text-white"
              style={{ background: "var(--primary)" }}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
