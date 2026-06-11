# 🌿 AgriAssist AI 
**Autonomous Multi-Modal Crop Advisory for High-Altitude Farming**

> Built for the Mandakini Organic Produce Collective (Kedarnath Valley, Uttarakhand) to bridge the gap between remote grassroots farming and advanced Generative AI.

---

## 🎯 The Vision
Field supervisors in remote, high-altitude regions face a critical bottleneck: immediate access to practical guidance on crop diseases and post-harvest logistics. **AgriAssist AI** is a localized, offline-capable AI companion that uses multi-modal intelligence to deliver real-time agricultural advisory, eliminating the reliance on unavailable extension officers.

## ✨ Core & Breakthrough Features
*   **Plain-Language Vernacular Chat:** A highly responsive, mobile-first interface allowing supervisors to ask complex agricultural questions in simple, regional language.
*   **Multi-Modal Vision Diagnostics:** Take a picture of a diseased leaf and upload it. The AI analyzes the visual data to identify pests or nutrient deficiencies instantly.
*   **Geospatial Context Ingestion:** Automatically appends localized GPS, altitude, and weather data to prompts to ensure the AI's advice is specifically tailored to the mountain terrain.
*   **Strict Domain Guardrails:** Engineered system prompts that safely constrain the LLM strictly to regional crop advisory, complete with an extension officer verification disclaimer.
*   **Offline-First Sync:** Logs visual and text queries during terrain network drops and automatically syncs to the backend when a 2G/3G signal is restored.

## 🛠️ Tech Stack
*   **Frontend:** React.js, Tailwind CSS
*   **Backend:** Express.js (Node.js)
*   **Database:** MongoDB
*   **AI Engine:** Gemini 1.5 Pro / OpenAI API (Text & Vision)
*   **Deployment:** Vercel (Frontend) & Render (Backend)

## 🚀 Setup & Installation
*Setup — coming soon.* 
*(This project is actively being built during the TBI-GEU Summer Internship Program 2026).*

---
*Developed with ❤️ for grassroots MSMEs.*

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
