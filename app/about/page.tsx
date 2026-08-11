import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "About — AgriAssist AI",
    description:
        "Learn how AgriAssist AI empowers high-altitude farmers in the Kedarnath Valley with multi-modal crop advisory powered by Generative AI.",
};

const milestones = [
    {
        icon: "🔬",
        title: "Research & Discovery",
        description:
            "Fieldwork across 12 villages in the Kedarnath Valley to understand the real pain points of high-altitude farmers and extension officers.",
        tag: "Phase 1",
        tagColor: "#1e88e5",
    },
    {
        icon: "🧠",
        title: "AI Model Training",
        description:
            "Fine-tuning vision and language models on region-specific crop diseases, soil profiles, and micro-climate patterns above 2,000m.",
        tag: "Phase 2",
        tagColor: "#7c4dff",
    },
    {
        icon: "📱",
        title: "Mobile-First Deployment",
        description:
            "Building an offline-capable, 2G-optimized interface so field supervisors can get advisory even without stable internet.",
        tag: "Phase 3",
        tagColor: "#ff9800",
    },
    {
        icon: "🌾",
        title: "Community Rollout",
        description:
            "Partnering with the Mandakini Organic Produce Collective to put the tool in the hands of 200+ farmers across Uttarakhand.",
        tag: "Phase 4",
        tagColor: "#43a047",
    },
];

const teamValues = [
    { icon: "🎯", label: "Mission-Driven" },
    { icon: "🌱", label: "Sustainability First" },
    { icon: "🤝", label: "Community Owned" },
    { icon: "⚡", label: "Offline Capable" },
];

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="flex-1" style={{ paddingTop: "var(--nav-height)" }}>
                {/* Hero section */}
                <section
                    className="relative overflow-hidden px-6 pt-16 pb-20"
                    style={{
                        background:
                            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(76,175,80,0.10) 0%, transparent 70%)",
                    }}
                >
                    {/* Decorative orb */}
                    <div
                        className="absolute animate-float"
                        style={{
                            width: 260,
                            height: 260,
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, rgba(255,152,0,0.08) 0%, transparent 70%)",
                            top: "5%",
                            right: "-3%",
                            filter: "blur(36px)",
                        }}
                    />

                    <div
                        className="relative z-10 animate-fade-in-up"
                        style={{ maxWidth: 720, margin: "0 auto" }}
                    >
                        <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
                            style={{
                                background: "rgba(76,175,80,0.12)",
                                color: "var(--primary-light)",
                                border: "1px solid rgba(76,175,80,0.2)",
                            }}
                        >
                            Our Story
                        </span>
                        <h1
                            className="gradient-text font-bold m-0 leading-tight"
                            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
                        >
                            Bridging AI &amp; Agriculture
                        </h1>
                        <p
                            className="mt-4 mb-0 text-base md:text-lg leading-relaxed"
                            style={{ color: "var(--muted)", maxWidth: 600 }}
                        >
                            AgriAssist AI was born from a simple observation — field
                            supervisors in the Kedarnath Valley spend hours waiting for
                            extension officers who rarely arrive. We&apos;re building an
                            autonomous AI companion that brings expert-grade crop advisory
                            directly to their fingertips, even without internet.
                        </p>
                    </div>
                </section>

                {/* Values strip */}
                <section className="px-6 pb-12" style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div
                        className="flex flex-wrap items-center justify-center gap-4 animate-fade-in"
                        style={{ animationDelay: "0.2s" }}
                    >
                        {teamValues.map((v) => (
                            <div
                                key={v.label}
                                className="glass flex items-center gap-2.5"
                                style={{ padding: "10px 20px", borderRadius: 999 }}
                            >
                                <span style={{ fontSize: 20 }}>{v.icon}</span>
                                <span
                                    className="text-sm font-semibold"
                                    style={{ color: "var(--foreground)" }}
                                >
                                    {v.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Milestones / Roadmap */}
                <section className="px-6 py-16" style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div className="text-center mb-10 animate-fade-in-up">
                        <h2
                            className="gradient-text font-bold m-0"
                            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
                        >
                            Our Roadmap
                        </h2>
                        <p
                            className="mt-3 m-0 text-sm md:text-base"
                            style={{
                                color: "var(--muted)",
                                maxWidth: 480,
                                margin: "12px auto 0",
                            }}
                        >
                            From field research to community-scale deployment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
                        {milestones.map((m) => (
                            <Card key={m.title} {...m} />
                        ))}
                    </div>
                </section>

                {/* Tech stack callout */}
                <section
                    className="px-6 py-16"
                    style={{
                        background:
                            "linear-gradient(180deg, transparent 0%, rgba(76,175,80,0.04) 100%)",
                    }}
                >
                    <div
                        className="glass animate-fade-in-up"
                        style={{
                            maxWidth: 800,
                            margin: "0 auto",
                            padding: "36px 32px",
                            textAlign: "center",
                        }}
                    >
                        <h3
                            className="font-bold m-0 text-lg"
                            style={{ color: "var(--foreground)" }}
                        >
                            Built With Modern Tech
                        </h3>
                        <p
                            className="mt-3 mb-5 text-sm leading-relaxed"
                            style={{ color: "var(--muted)", maxWidth: 520, margin: "12px auto 20px" }}
                        >
                            A production-grade stack designed for performance, resilience, and
                            developer happiness.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {[
                                "React.js",
                                "Next.js",
                                "Tailwind CSS",
                                "PostgreSQL",
                                "Prisma ORM",
                                "Gemini 1.5 Pro",
                                "Clerk Auth",
                                "Vercel",
                            ].map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold"
                                    style={{
                                        background: "rgba(76,175,80,0.08)",
                                        color: "var(--primary)",
                                        border: "1px solid var(--border)",
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
