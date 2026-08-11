import { SignIn } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SignInPage() {
  return (
    <>
      <Navbar />
      <main
        className="flex-1 flex items-center justify-center px-6 py-16"
        style={{
          paddingTop: "calc(var(--nav-height) + 2rem)",
          minHeight: "100vh",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(76,175,80,0.08) 0%, transparent 70%)",
        }}
      >
        <SignIn
          appearance={{
            elements: {
              card: "glass shadow-xl rounded-2xl border border-[var(--border)]",
              headerTitle: "text-xl font-bold text-[var(--foreground)]",
              headerSubtitle: "text-xs text-[var(--muted)]",
              formButtonPrimary:
                "bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white text-sm font-semibold rounded-xl py-2.5",
            },
          }}
        />
      </main>
      <Footer />
    </>
  );
}
