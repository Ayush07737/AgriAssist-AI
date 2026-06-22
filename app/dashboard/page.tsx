import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dashboard — AgriAssist AI",
  description:
    "Monitor crop health, weather conditions, and AI advisory insights for your high-altitude farm.",
};

/* Mock data */
const stats = [
  { icon: "🌱", title: "Active Crops", value: "12", delta: "+2 this week", deltaColor: "#43a047" },
  { icon: "🐛", title: "Disease Alerts", value: "3", delta: "2 resolved", deltaColor: "#ff9800" },
  { icon: "📊", title: "Scans Today", value: "47", delta: "↑ 18%", deltaColor: "#1e88e5" },
  { icon: "☁️", title: "Weather", value: "14°C", delta: "Light rain", deltaColor: "#7c4dff" },
];

const recentScans = [
  {
    icon: "🍅",
    title: "Tomato — Early Blight",
    description: "Detected Alternaria solani on lower leaves. Recommended: copper-based fungicide spray.",
    tag: "Critical",
    tagColor: "#e53935",
  },
  {
    icon: "🥔",
    title: "Potato — Healthy",
    description: "No abnormalities detected. Plants showing strong vegetative growth at 2,400m altitude.",
    tag: "Healthy",
    tagColor: "#43a047",
  },
  {
    icon: "🫛",
    title: "Pea — Powdery Mildew",
    description: "Mild Erysiphe pisi on 15% of crop. Advised: improve air circulation & neem oil treatment.",
    tag: "Warning",
    tagColor: "#ff9800",
  },
];

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ paddingTop: "var(--nav-height)" }}>
        {/* Header */}
        <section
          className="px-6 pt-10 pb-6 animate-fade-in-up"
          style={{ maxWidth: 1200, margin: "0 auto" }}
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
            style={{
              background: "rgba(76,175,80,0.12)",
              color: "var(--primary-light)",
              border: "1px solid rgba(76,175,80,0.2)",
            }}
          >
            Dashboard
          </span>
          <h1 className="gradient-text font-bold m-0" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
            Farm Overview
          </h1>
          <p className="mt-2 mb-0 text-sm md:text-base" style={{ color: "var(--muted)", maxWidth: 540 }}>
            Real-time insights from your AI-powered crop advisory system. Monitor health, weather, and recent scans at a glance.
          </p>
        </section>

        {/* Stat cards */}
        <section className="px-6 pb-6" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
            {stats.map((s) => (
              <div key={s.title} className="glass animate-fade-in-up" style={{ padding: "22px 20px" }}>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="flex items-center justify-center"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "var(--radius-sm)",
                      background: "rgba(76,175,80,0.10)",
                      fontSize: 22,
                    }}
                  >
                    {s.icon}
                  </span>
                  <span className="text-xs font-medium" style={{ color: s.deltaColor }}>
                    {s.delta}
                  </span>
                </div>
                <p className="m-0 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                  {s.title}
                </p>
                <p className="m-0 mt-1 font-bold" style={{ fontSize: 28, color: "var(--foreground)" }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent scans */}
        <section className="px-6 pt-4 pb-16" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 className="font-bold text-xl mb-5" style={{ color: "var(--foreground)" }}>
            Recent Scans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 stagger">
            {recentScans.map((scan) => (
              <Card key={scan.title} {...scan} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
