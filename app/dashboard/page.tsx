"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    activeCrops: 12,
    diseaseAlerts: 3,
    scansToday: 47,
    weather: "14°C Light rain",
    highRiskDisease: "Early Blight in Solanaceous crops",
    altitudeMeters: 2400,
  });

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.activeCrops) setStatsData(data);
      })
      .catch((err) => console.log("Using default mountain dashboard stats", err))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { icon: "🌱", title: "Active Crops", value: String(statsData.activeCrops), delta: "+2 Kedarnath valley", deltaColor: "#43a047" },
    { icon: "🐛", title: "Disease Alerts", value: String(statsData.diseaseAlerts), delta: "2 requiring action", deltaColor: "#ff9800" },
    { icon: "📊", title: "Total Scans", value: String(statsData.scansToday), delta: "↑ 18% this month", deltaColor: "#1e88e5" },
    { icon: "☁️", title: "Microclimate", value: statsData.weather, delta: `${statsData.altitudeMeters}m altitude`, deltaColor: "#7c4dff" },
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
            Kedarnath Valley Field Dashboard
          </span>
          <h1 className="gradient-text font-bold m-0 text-3xl md:text-4xl">
            Farm Advisory & Overview
          </h1>
          <p className="mt-2 mb-0 text-sm md:text-base text-[var(--muted)]" style={{ maxWidth: 580 }}>
            Real-time insights from your AI crop advisory system. Monitor health, weather, and recent diagnostics at 2,400m altitude.
          </p>

          {/* Action Quick Launchers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <Link
              href="/scan"
              className="glass p-4 rounded-xl no-underline flex items-center justify-between border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📸</span>
                <div>
                  <h3 className="text-xs font-bold m-0 text-[var(--foreground)]">Run Leaf Diagnostic</h3>
                  <p className="text-[11px] text-[var(--muted)] m-0">Upload leaf photo for AI diagnosis</p>
                </div>
              </div>
              <span className="text-xs text-[var(--primary)] font-bold">Launch →</span>
            </Link>

            <Link
              href="/chat"
              className="glass p-4 rounded-xl no-underline flex items-center justify-between border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🗣️</span>
                <div>
                  <h3 className="text-xs font-bold m-0 text-[var(--foreground)]">Vernacular AI Chat</h3>
                  <p className="text-[11px] text-[var(--muted)] m-0">Ask in Hindi, Garhwali, or English</p>
                </div>
              </div>
              <span className="text-xs text-[var(--primary)] font-bold">Chat →</span>
            </Link>

            <Link
              href="/scans"
              className="glass p-4 rounded-xl no-underline flex items-center justify-between border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📜</span>
                <div>
                  <h3 className="text-xs font-bold m-0 text-[var(--foreground)]">Scan Archives</h3>
                  <p className="text-[11px] text-[var(--muted)] m-0">View all past field reports</p>
                </div>
              </div>
              <span className="text-xs text-[var(--primary)] font-bold">View →</span>
            </Link>
          </div>
        </section>

        {/* Stat cards */}
        <section className="px-6 pb-6" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="glass animate-pulse p-5 rounded-2xl border border-[var(--border)]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[var(--border)]" />
                      <div className="w-20 h-3 rounded-full bg-[var(--border)]" />
                    </div>
                    <div className="w-24 h-3 rounded-full bg-[var(--border)] mb-2" />
                    <div className="w-16 h-7 rounded-lg bg-[var(--border)]" />
                  </div>
                ))
              : stats.map((s) => (
                  <div key={s.title} className="glass animate-fade-in-up p-5 rounded-2xl border border-[var(--border)]">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="flex items-center justify-center w-10 h-10 rounded-xl"
                        style={{
                          background: "rgba(76,175,80,0.10)",
                          fontSize: 20,
                        }}
                      >
                        {s.icon}
                      </span>
                      <span className="text-xs font-medium" style={{ color: s.deltaColor }}>
                        {s.delta}
                      </span>
                    </div>
                    <p className="m-0 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                      {s.title}
                    </p>
                    <p className="m-0 mt-1 font-bold text-2xl text-[var(--foreground)]">
                      {s.value}
                    </p>
                  </div>
                ))}
          </div>
        </section>

        {/* Recent scans */}
        <section className="px-6 pt-4 pb-16" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-xl m-0 text-[var(--foreground)]">
              Recent Field Diagnostics
            </h2>
            <Link href="/scans" className="text-xs font-bold text-[var(--primary)] no-underline">
              View All Archive →
            </Link>
          </div>
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
