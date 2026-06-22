import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

const features = [
  {
    icon: "📸",
    title: "Vision Diagnostics",
    description:
      "Snap a photo of any diseased leaf and get instant AI-driven identification of pests, blights, or nutrient deficiencies.",
    tag: "Core",
    tagColor: "#43a047",
  },
  {
    icon: "💬",
    title: "Vernacular Chat",
    description:
      "Ask complex agricultural questions in simple, regional language and receive expert-grade advice in real-time.",
    tag: "AI",
    tagColor: "#1e88e5",
  },
  {
    icon: "🌍",
    title: "Geospatial Context",
    description:
      "Automatic GPS, altitude, and weather data injection ensures every recommendation is tailored to your specific terrain.",
    tag: "Smart",
    tagColor: "#ff9800",
  },
  {
    icon: "📡",
    title: "Offline-First Sync",
    description:
      "Logs queries during network drops in mountain terrain and auto-syncs when connectivity is restored.",
    tag: "Resilient",
    tagColor: "#e53935",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* Features */}
        <section id="features" className="px-6 py-20" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="gradient-text font-bold m-0" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
              What Makes Us Different
            </h2>
            <p className="mt-3 m-0 text-sm md:text-base" style={{ color: "var(--muted)", maxWidth: 500, margin: "12px auto 0" }}>
              Built specifically for remote, high-altitude agriculture in Uttarakhand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
            {features.map((f) => (
              <Card key={f.title} {...f} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
