"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { saveOfflineQuery, registerAutoSync } from "@/lib/offlineSync";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  disclaimer?: string;
  timestamp: string;
}

const initialPrompts = [
  "टमाटर में अगेती अंगमारी (Early Blight) के जैविक उपचार बताएं।",
  "2400 मीटर ऊंचाई पर राजमा फसल में कीट नियंत्रण कैसे करें?",
  "पहाड़ी क्षेत्रों में आलू झुलसा रोग से बचाव के घरेलू उपाय?",
  "Organic treatment for powdery mildew in peas at high altitude?",
];

export default function ChatPage() {
  const [language, setLanguage] = useState<string>("Hindi");
  const [inputQuery, setInputQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg_1",
      sender: "ai",
      text: "नमस्कार! मैं एग्रीअसिस्ट एआई (AgriAssist AI) हूँ। केदारनाथ घाटी एवं उत्तराखंड के पर्वतीय कृषि हेतु आपका सहायक। आप हिंदी, गढ़वाली या अंग्रेजी में अपनी फसल संबंधी समस्या पूछ सकते हैं।",
      disclaimer: "⚠️ Disclaimer: AgriAssist AI advice is generated for high-altitude advisory.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

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

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      cleanupAutoSync();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery("");
    setLoading(true);

    if (isOffline) {
      saveOfflineQuery({ userQuery: query, language });
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai_${Date.now()}`,
            sender: "ai",
            text: "📡 आपका प्रश्न ऑफ़लाइन कतार में सहेज लिया गया है। नेटवर्क उपलब्ध होने पर एआई उत्तर अपने आप अपडेट हो जाएगा।",
            disclaimer: "⚠️ Offline Sync Active",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        setLoading(false);
      }, 500);
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userQuery: query,
          language,
          geoContext: { altitudeMeters: 2400, weatherSummary: "14°C Mountain Weather" },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch response");

      setMessages((prev) => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          sender: "ai",
          text: data.response,
          disclaimer: data.disclaimer,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          sender: "ai",
          text: "पहाड़ी मौसम या नेटवर्क बाधा के कारण उत्तर प्राप्त नहीं हो सका। कृपया पुनः प्रयास करें।",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main
        className="flex-1 flex flex-col px-4 sm:px-6 pb-6"
        style={{
          paddingTop: "calc(var(--nav-height) + 1rem)",
          maxWidth: 900,
          margin: "0 auto",
          width: "100%",
          height: "calc(100vh - 20px)",
        }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between py-2 border-b border-[var(--border)] mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗣️</span>
            <div>
              <h1 className="text-base font-bold m-0 text-[var(--foreground)]">Vernacular AI Advisory Chat</h1>
              <p className="text-[11px] text-[var(--muted)] m-0">
                Kedarnath Valley Field Advisory (Kedarnath 2,400m)
              </p>
            </div>
          </div>

          {/* Language selector */}
          <div className="flex items-center gap-1.5 bg-[var(--background)] p-1 rounded-xl border border-[var(--border)]">
            {["Hindi", "Garhwali", "English"].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold border-none cursor-pointer transition-all duration-200"
                style={{
                  background: language === lang ? "var(--primary)" : "transparent",
                  color: language === lang ? "#fff" : "var(--muted)",
                }}
              >
                {lang === "Hindi" ? "हिंदी" : lang === "Garhwali" ? "गढ़वाली" : "English"}
              </button>
            ))}
          </div>
        </div>

        {/* Chat message history */}
        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3 py-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col max-w-[85%] ${
                m.sender === "user" ? "self-end items-end" : "self-start items-start"
              } animate-fade-in`}
            >
              <div
                className="p-3.5 rounded-2xl text-xs leading-relaxed"
                style={{
                  background:
                    m.sender === "user"
                      ? "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)"
                      : "var(--surface-glass)",
                  color: m.sender === "user" ? "#ffffff" : "var(--foreground)",
                  border: m.sender === "user" ? "none" : "1px solid var(--border)",
                  boxShadow: m.sender === "user" ? "0 4px 12px rgba(45,122,58,0.2)" : "none",
                  whiteSpace: "pre-line",
                }}
              >
                {m.text}
              </div>
              <div className="flex items-center gap-2 mt-1 px-1">
                <span className="text-[10px] text-[var(--muted)]">{m.timestamp}</span>
                {m.disclaimer && (
                  <span className="text-[10px] text-[var(--primary-light)] font-semibold">
                    • KVK Advisory Guarded
                  </span>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="self-start glass p-3.5 rounded-2xl text-xs text-[var(--muted)] animate-pulse flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-ping" />
              एग्रीअसिस्ट एआई विचार कर रहा है...
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt suggestions */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 border-t border-[var(--border)] no-scrollbar">
          {initialPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="whitespace-nowrap text-[11px] px-3 py-1.5 rounded-full glass border border-[var(--border)] text-[var(--muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] cursor-pointer transition-all duration-200 flex-shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 mt-1"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={
              language === "Hindi"
                ? "अपनी फसल या बीमारी के बारे में सवाल लिखें..."
                : language === "Garhwali"
                ? "आपणि खेती बाड़ी का सवाल पूछ्यां..."
                : "Ask any high-altitude crop advisory question..."
            }
            className="flex-1 px-4 py-3 rounded-xl text-xs outline-none bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)]"
          />
          <button
            type="submit"
            disabled={loading || !inputQuery.trim()}
            className="px-5 py-3 rounded-xl text-xs font-bold text-white transition-all duration-200 border-none cursor-pointer"
            style={{
              background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
              opacity: loading || !inputQuery.trim() ? 0.6 : 1,
            }}
          >
            भेजें →
          </button>
        </form>
      </main>
    </>
  );
}
