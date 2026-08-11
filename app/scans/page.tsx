"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Scan {
  id: string;
  cropName: string;
  diseaseDetected: string;
  severity: string;
  confidence: number;
  treatmentPlan: string;
  organicOptions: string;
  altitudeMeters: number;
  weatherSummary: string;
  createdAt: string;
}

export default function ScansPage() {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterSeverity, setFilterSeverity] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    try {
      const res = await fetch("/api/scans");
      const data = await res.json();
      setScans(data.scans || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredScans = scans.filter((s) => {
    const matchesFilter = filterSeverity === "All" || s.severity === filterSeverity;
    const matchesSearch = s.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.diseaseDetected.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main
        className="flex-1 px-6 pb-20"
        style={{
          paddingTop: "calc(var(--nav-height) + 1.5rem)",
          maxWidth: 1100,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2"
              style={{
                background: "rgba(76,175,80,0.12)",
                color: "var(--primary-light)",
                border: "1px solid rgba(76,175,80,0.2)",
              }}
            >
              Field Archive
            </span>
            <h1 className="gradient-text font-bold m-0 text-2xl sm:text-3xl">
              Crop Scan History
            </h1>
            <p className="mt-1 m-0 text-sm text-[var(--muted)]">
              Historical diagnostic records & field pathology reports for Kedarnath Valley.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="glass p-4 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[var(--border)]">
          <input
            type="text"
            placeholder="Search crop or disease name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-72 px-4 py-2.5 rounded-xl text-xs outline-none bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)]"
          />

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <span className="text-xs text-[var(--muted)] font-medium mr-1">Severity:</span>
            {["All", "High", "Moderate", "Healthy"].map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold border-none cursor-pointer transition-all duration-200"
                style={{
                  background: filterSeverity === sev ? "var(--primary)" : "transparent",
                  color: filterSeverity === sev ? "#ffffff" : "var(--muted)",
                  border: "1px solid var(--border)",
                }}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Scan List */}
        {loading ? (
          <div className="glass p-8 text-center rounded-2xl text-xs text-[var(--muted)] animate-pulse">
            Loading field diagnostic logs...
          </div>
        ) : filteredScans.length === 0 ? (
          <div className="glass p-12 text-center rounded-2xl">
            <span className="text-3xl mb-2 block">🌿</span>
            <p className="font-semibold text-sm m-0 text-[var(--foreground)]">No Scans Found</p>
            <p className="text-xs text-[var(--muted)] mt-1">Try resetting search filter or run a new scan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScans.map((scan) => (
              <div
                key={scan.id}
                className="glass rounded-2xl p-5 border border-[var(--border)] flex flex-col justify-between hover:border-[var(--primary)] transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-bold text-[var(--primary-light)]">
                      {scan.cropName}
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase"
                      style={{
                        background:
                          scan.severity === "High"
                            ? "rgba(239,68,68,0.15)"
                            : scan.severity === "Moderate"
                            ? "rgba(245,158,11,0.15)"
                            : "rgba(76,175,80,0.15)",
                        color:
                          scan.severity === "High"
                            ? "#ef4444"
                            : scan.severity === "Moderate"
                            ? "#f59e0b"
                            : "var(--primary)",
                      }}
                    >
                      {scan.severity}
                    </span>
                  </div>

                  <h3 className="text-base font-bold m-0 text-[var(--foreground)] mb-2">
                    {scan.diseaseDetected}
                  </h3>

                  <p className="text-xs text-[var(--muted)] m-0 bg-[var(--background)] p-3 rounded-xl border border-[var(--border)] mb-3 leading-relaxed">
                    <strong className="text-[var(--foreground)]">Treatment: </strong>
                    {scan.treatmentPlan}
                  </p>

                  <p className="text-xs text-[var(--muted)] m-0 bg-[var(--background)] p-3 rounded-xl border border-[var(--border)] leading-relaxed">
                    <strong className="text-[var(--primary)]">Organic Option: </strong>
                    {scan.organicOptions}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--muted)]">
                  <span>🏔️ {scan.altitudeMeters || 2400}m Alt</span>
                  <span>{new Date(scan.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
