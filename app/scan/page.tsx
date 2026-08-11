"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { saveOfflineScan, registerAutoSync } from "@/lib/offlineSync";

export default function ScanPage() {
  const [selectedCrop, setSelectedCrop] = useState("Tomato (Solanum lycopersicum)");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string>("");
  const [mimeType, setMimeType] = useState<string>("image/jpeg");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [geoContext, setGeoContext] = useState({
    latitude: 30.7346,
    longitude: 79.0669,
    altitudeMeters: 2400,
    weatherSummary: "14°C, High Mountain Humidity",
  });

  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Register auto-sync for when connectivity returns
    const cleanupAutoSync = registerAutoSync(
      (result) => console.log(`✅ Auto-synced ${result.syncedScans} scans, ${result.syncedQueries} queries`),
      (error) => console.warn("⚠️ Auto-sync failed:", error)
    );

    // Get browser location if available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGeoContext((prev) => ({
            ...prev,
            latitude: Number(pos.coords.latitude.toFixed(4)),
            longitude: Number(pos.coords.longitude.toFixed(4)),
          }));
        },
        () => console.log("Using default Kedarnath Valley GPS coordinates.")
      );
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      cleanupAutoSync();
    };
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMimeType(file.type || "image/jpeg");
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      // Strip data url prefix for base64
      const base64Clean = result.split(",")[1] || result;
      setImageBase64(base64Clean);
      setDiagnosis(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!imageBase64) {
      setError("Please select or capture a leaf photo first.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    // If offline, save to local queue
    if (isOffline) {
      saveOfflineScan({
        cropName: selectedCrop,
        imageBase64: imageBase64,
        mimeType: mimeType,
        latitude: geoContext.latitude,
        longitude: geoContext.longitude,
        altitudeMeters: geoContext.altitudeMeters,
      });
      setIsAnalyzing(false);
      setDiagnosis({
        cropName: selectedCrop,
        diseaseDetected: "Queued for Offline Sync",
        severity: "Moderate",
        confidence: 0.85,
        treatmentPlan: "Your scan was saved to local device queue and will auto-sync when network connectivity returns.",
        organicOptions: "Maintain standard crop hygiene while offline.",
        disclaimer: "⚠️ Offline Mode: Scans recorded offline will be processed by Gemini AI once online.",
      });
      return;
    }

    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64,
          mimeType,
          cropName: selectedCrop,
          geoContext,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");

      setDiagnosis(data.diagnosis);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to analyze leaf image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <Navbar />
      <main
        className="flex-1 px-6 pb-20"
        style={{
          paddingTop: "calc(var(--nav-height) + 1.5rem)",
          maxWidth: 1000,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Offline Banner */}
        {isOffline && (
          <div
            className="mb-6 p-4 rounded-xl text-xs font-semibold flex items-center justify-between animate-fade-in"
            style={{
              background: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#ef4444",
            }}
          >
            <span>📡 Offline Mode Active: Mountain network drop detected. Scans will save locally and auto-sync when online.</span>
          </div>
        )}

        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2"
            style={{
              background: "rgba(76,175,80,0.12)",
              color: "var(--primary-light)",
              border: "1px solid rgba(76,175,80,0.2)",
            }}
          >
            Multi-Modal Vision AI
          </span>
          <h1 className="gradient-text font-bold m-0 text-2xl sm:text-3xl">
            Leaf Disease Diagnostics
          </h1>
          <p className="mt-2 m-0 text-sm text-[var(--muted)]">
            Upload or capture a leaf photo to diagnose blights, pests, and deficiencies instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input column */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {/* Geospatial Card */}
            <div
              className="glass p-4 rounded-xl flex items-center justify-between text-xs"
              style={{ border: "1px solid var(--border)" }}
            >
              <div>
                <p className="m-0 font-semibold text-[var(--foreground)]">🏔️ Geospatial Location</p>
                <p className="m-0 text-[var(--muted)] mt-0.5">
                  Kedarnath Valley ({geoContext.altitudeMeters}m alt) • {geoContext.latitude}°N, {geoContext.longitude}°E
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[rgba(76,175,80,0.15)] text-[var(--primary)]">
                Active Context
              </span>
            </div>

            {/* Crop selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[var(--muted)]">
                Select Crop Type
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] font-medium"
              >
                <option value="Tomato (Solanum lycopersicum)">🍅 Tomato (Tamatar)</option>
                <option value="Potato (Solanum tuberosum)">🥔 Potato (Aloo)</option>
                <option value="Pea (Pisum sativum)">🫛 Pea (Matar)</option>
                <option value="Apple (Malus domestica)">🍎 Apple (Seb)</option>
                <option value="Rajma / Kidney Bean">🫘 Rajma (Mountain Bean)</option>
                <option value="General High-Altitude Crop">🌿 General Crop</option>
              </select>
            </div>

            {/* Image Dropzone */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[var(--muted)]">
                Leaf Image Capture
              </label>
              <div
                className="glass rounded-2xl p-6 text-center flex flex-col items-center justify-center cursor-pointer relative overflow-hidden transition-all duration-200"
                style={{
                  border: "2px dashed var(--primary-light)",
                  minHeight: 220,
                  background: imagePreview ? "black" : "rgba(76,175,80,0.03)",
                }}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Leaf Preview"
                    className="max-h-64 object-contain rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-4xl mb-3">📸</span>
                    <p className="m-0 font-semibold text-sm text-[var(--foreground)]">
                      Tap to Take Photo or Select File
                    </p>
                    <p className="m-0 text-xs text-[var(--muted)] mt-1">
                      Clear view of leaf symptoms yields highest diagnostic accuracy
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 font-medium m-0 animate-fade-in">{error}</p>
            )}

            {/* Action Button */}
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-300 cursor-pointer border-none"
              style={{
                background: isAnalyzing
                  ? "var(--muted)"
                  : "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                boxShadow: "0 4px 16px rgba(45,122,58,0.3)",
              }}
            >
              {isAnalyzing ? "🔬 Analyzing Visual Symptoms..." : "🌱 Run AI Diagnosis →"}
            </button>
          </div>

          {/* Results column */}
          <div className="lg:col-span-6">
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-[var(--muted)]">
              Diagnostic Report
            </label>

            {!diagnosis && !isAnalyzing && (
              <div
                className="glass rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[340px]"
                style={{ border: "1px dashed var(--border)" }}
              >
                <span className="text-4xl mb-3">🍃</span>
                <p className="font-semibold text-sm m-0 text-[var(--foreground)]">No Scan Data Yet</p>
                <p className="text-xs text-[var(--muted)] mt-1 max-w-xs">
                  Upload a photo on the left to view instant AI recommendations and organic remedies.
                </p>
              </div>
            )}

            {isAnalyzing && (
              <div
                className="glass rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[340px] animate-pulse"
                style={{ border: "1px solid var(--border)" }}
              >
                <div className="w-12 h-12 rounded-full border-4 border-t-[var(--primary)] border-[var(--border)] animate-spin mb-4" />
                <p className="font-semibold text-sm m-0 text-[var(--foreground)]">Evaluating Plant Pathology...</p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Cross-referencing high-altitude Uttarakhand crop conditions
                </p>
              </div>
            )}

            {diagnosis && !isAnalyzing && (
              <div className="glass rounded-2xl p-6 flex flex-col gap-4 animate-fade-in border border-[var(--border)]">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary-light)]">
                      {diagnosis.cropName}
                    </span>
                    <h2 className="text-xl font-bold m-0 mt-0.5 text-[var(--foreground)]">
                      {diagnosis.diseaseDetected}
                    </h2>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{
                      background:
                        diagnosis.severity === "High"
                          ? "rgba(239,68,68,0.15)"
                          : diagnosis.severity === "Moderate"
                          ? "rgba(245,158,11,0.15)"
                          : "rgba(76,175,80,0.15)",
                      color:
                        diagnosis.severity === "High"
                          ? "#ef4444"
                          : diagnosis.severity === "Moderate"
                          ? "#f59e0b"
                          : "var(--primary)",
                    }}
                  >
                    {diagnosis.severity} Severity
                  </span>
                </div>

                {/* Confidence bar */}
                <div className="bg-[rgba(76,175,80,0.06)] p-3 rounded-xl">
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span className="text-[var(--muted)]">AI Identification Confidence</span>
                    <span className="text-[var(--primary)] font-bold">
                      {Math.round((diagnosis.confidence || 0.9) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[var(--border)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--primary)] rounded-full transition-all duration-500"
                      style={{ width: `${Math.round((diagnosis.confidence || 0.9) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Treatment plan */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] m-0 mb-1.5 flex items-center gap-1.5">
                    💊 Recommended Treatment Plan
                  </h3>
                  <p className="text-xs leading-relaxed m-0 text-[var(--muted)] bg-[var(--background)] p-3 rounded-xl border border-[var(--border)]">
                    {diagnosis.treatmentPlan}
                  </p>
                </div>

                {/* Organic options */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] m-0 mb-1.5 flex items-center gap-1.5">
                    🌱 Mountain Organic Options
                  </h3>
                  <p className="text-xs leading-relaxed m-0 text-[var(--muted)] bg-[var(--background)] p-3 rounded-xl border border-[var(--border)]">
                    {diagnosis.organicOptions}
                  </p>
                </div>

                {/* Weather Warning */}
                {diagnosis.weatherWarning && (
                  <div className="p-3 rounded-xl bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.2)] text-xs text-[#b45309]">
                    <span className="font-bold">🏔️ High Altitude Note: </span>
                    {diagnosis.weatherWarning}
                  </div>
                )}

                {/* KVK Disclaimer */}
                <div className="p-3 rounded-xl bg-[rgba(0,0,0,0.2)] border border-[var(--border)] text-[11px] text-[var(--muted)] leading-tight">
                  {diagnosis.disclaimer}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
