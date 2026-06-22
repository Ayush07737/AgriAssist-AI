"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden flex items-center justify-center text-center"
      style={{
        minHeight: "85vh",
        paddingTop: "var(--nav-height)",
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(76,175,80,0.12) 0%, transparent 70%), var(--background)",
      }}
    >
      {/* Decorative orbs */}
      <div
        className="absolute animate-float"
        style={{
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(76,175,80,0.10) 0%, transparent 70%)",
          top: "10%",
          right: "-5%",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,152,0,0.08) 0%, transparent 70%)",
          bottom: "15%",
          left: "5%",
          filter: "blur(30px)",
          animation: "float 4s ease-in-out infinite 1s",
        }}
      />

      <div className="relative z-10 px-6 animate-fade-in-up" style={{ maxWidth: 740 }}>
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6"
          style={{
            background: "rgba(76,175,80,0.12)",
            color: "var(--primary-light)",
            border: "1px solid rgba(76,175,80,0.2)",
          }}
        >
          🌾 AI-Powered Crop Advisory
        </span>

        <h1 className="gradient-text font-bold leading-tight m-0"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}>
          Smarter Farming for{" "}
          <br className="hidden sm:block" />
          High-Altitude Fields
        </h1>

        <p className="mt-5 text-base md:text-lg leading-relaxed"
          style={{ color: "var(--muted)", maxWidth: 560, margin: "20px auto 0" }}>
          Real-time disease detection, vernacular chat, and geospatial intelligence — built for
          the Kedarnath Valley and beyond.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <a
            id="hero-cta-primary"
            href="/dashboard"
            className="no-underline inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
              boxShadow: "0 4px 16px rgba(45,122,58,0.3)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(1.03)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(45,122,58,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "none";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(45,122,58,0.3)";
            }}
          >
            Open Dashboard →
          </a>
          <a
            id="hero-cta-secondary"
            href="/about"
            className="no-underline inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
            style={{
              color: "var(--primary)",
              border: "1.5px solid var(--border)",
              background: "var(--surface-glass)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
            }}
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
