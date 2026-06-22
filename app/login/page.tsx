"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <Navbar />
      <main
        className="flex-1 flex items-center justify-center px-6"
        style={{
          paddingTop: "var(--nav-height)",
          minHeight: "100vh",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(76,175,80,0.08) 0%, transparent 70%)",
        }}
      >
        <div
          className="glass animate-fade-in-up w-full"
          style={{ maxWidth: 440, padding: "40px 32px" }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <span style={{ fontSize: 36 }}>🌿</span>
            <h1
              className="gradient-text font-bold m-0 mt-3"
              style={{ fontSize: "1.7rem" }}
            >
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p
              className="mt-2 mb-0 text-sm"
              style={{ color: "var(--muted)" }}
            >
              {isSignUp
                ? "Join the AgriAssist AI community"
                : "Sign in to your crop advisory dashboard"}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            {isSignUp && (
              <div className="animate-fade-in">
                <label
                  htmlFor="login-name"
                  className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "var(--muted)" }}
                >
                  Full Name
                </label>
                <input
                  id="login-name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    background: "var(--background)",
                    border: "1.5px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--primary)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(76,175,80,0.12)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: "var(--muted)" }}
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  background: "var(--background)",
                  border: "1.5px solid var(--border)",
                  color: "var(--foreground)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(76,175,80,0.12)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: "var(--muted)" }}
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  background: "var(--background)",
                  border: "1.5px solid var(--border)",
                  color: "var(--foreground)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(76,175,80,0.12)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <button
              id="login-submit"
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-semibold text-white border-none cursor-pointer transition-all duration-300 mt-2"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                boxShadow: "0 4px 16px rgba(45,122,58,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 24px rgba(45,122,58,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(45,122,58,0.3)";
              }}
            >
              {isSignUp ? "Create Account" : "Sign In"} →
            </button>
          </form>

          {/* Toggle */}
          <p
            className="text-center mt-6 mb-0 text-sm"
            style={{ color: "var(--muted)" }}
          >
            {isSignUp ? "Already have an account?" : "Don\u2019t have an account?"}{" "}
            <button
              id="login-toggle"
              onClick={() => setIsSignUp(!isSignUp)}
              className="bg-transparent border-none cursor-pointer text-sm font-semibold underline p-0"
              style={{ color: "var(--primary)" }}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
