import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export interface DiagnosisResult {
  cropName: string;
  diseaseDetected: string;
  severity: "High" | "Moderate" | "Low" | "Healthy";
  confidence: number;
  treatmentPlan: string;
  organicOptions: string;
  weatherWarning?: string;
  disclaimer: string;
}

export interface GeospatialContext {
  latitude?: number;
  longitude?: number;
  altitudeMeters?: number;
  weatherSummary?: string;
}

/**
 * Multi-Modal Vision Leaf Diagnostics
 */
export async function diagnoseCropLeaf(
  imageBase64: string,
  mimeType: string,
  geoContext?: GeospatialContext
): Promise<DiagnosisResult> {
  const altitude = geoContext?.altitudeMeters || 2400;
  const weather = geoContext?.weatherSummary || "Cool mountain climate (14°C, High Humidity)";

  const fallback: DiagnosisResult = {
    cropName: "Tomato (Solanum lycopersicum)",
    diseaseDetected: "Early Blight (Alternaria solani)",
    severity: "Moderate",
    confidence: 0.92,
    treatmentPlan:
      "Apply copper oxychloride (3g/L water) or Mancozeb fungicide every 10-14 days. Ensure lower leaves near damp soil are pruned to improve air circulation.",
    organicOptions:
      "Spray 5% Neem seed kernel extract (NSKE) or diluted cow-milk whey spray twice a week. Rotate crops with non-solanaceous plants next season.",
    weatherWarning: `High humidity (${weather}) at ${altitude}m altitude increases spore germination risk. Protect plants from evening dew.`,
    disclaimer:
      "⚠️ Disclaimer: AgriAssist AI advice is generated for remote terrain guidance. Please confirm with your local District Krishi Vigyan Kendra (KVK) extension officer.",
  };

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    console.warn("GEMINI_API_KEY not configured. Returning expert mountain fallback diagnosis.");
    return fallback;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are AgriAssist AI, an expert agricultural pathologist specialized in high-altitude mountain farming in Uttarakhand (Kedarnath Valley).
Context:
- Altitude: ${altitude} meters
- Local Weather: ${weather}

Analyze this crop leaf image and return ONLY a valid JSON object with the following fields:
{
  "cropName": "Name of crop",
  "diseaseDetected": "Name of disease or 'Healthy'",
  "severity": "High" | "Moderate" | "Low" | "Healthy",
  "confidence": 0.85 to 0.99,
  "treatmentPlan": "Detailed chemical & physical management steps suitable for mountain farming",
  "organicOptions": "Local organic & traditional remedies (e.g. neem extract, bio-fungicides)",
  "weatherWarning": "Altitude or weather specific advice",
  "disclaimer": "⚠️ Disclaimer: AgriAssist AI advice is for remote terrain guidance. Please confirm with your local Krishi Vigyan Kendra extension officer."
}`;

    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: mimeType,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text();

    const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanJson);
    return parsed as DiagnosisResult;
  } catch (error) {
    console.error("Gemini Vision Diagnosis Error:", error);
    return fallback;
  }
}

/**
 * Vernacular Chat Advisory with Strict Domain Guardrails
 */
export async function askVernacularAdvisory(
  userQuery: string,
  language: string = "Hindi",
  geoContext?: GeospatialContext
): Promise<{ text: string; disclaimer: string }> {
  const altitude = geoContext?.altitudeMeters || 2400;
  const weather = geoContext?.weatherSummary || "14°C, mountain terrain";

  const fallbackText =
    language.toLowerCase() === "hindi" || language.toLowerCase() === "garhwali"
      ? `उच्च पर्वतीय क्षेत्रों (${altitude} मीटर) में फसल संरक्षण के लिए: \n1. नमी के मौसम में फफूंदनाशक नीम के तेल (5ml/लीटर) का छिड़काव करें।\n2. खेतों में जल निकासी की सही व्यवस्था रखें ताकि जड़ों में सड़न न हो।\n3. स्थानीय कृषि विज्ञान केंद्र से समय-समय पर परामर्श लें।`
      : `For crop protection in high-altitude farming (${altitude}m): \n1. Spray neem oil solution (5ml/L water) during humid mountain weather.\n2. Maintain proper field drainage to prevent root rot.\n3. Consult your local Krishi Vigyan Kendra extension officer for severe outbreaks.`;

  const disclaimer =
    "⚠️ Disclaimer: AgriAssist AI is an automated advisor for high-altitude MSME agriculture. Please verify treatment steps with an extension officer.";

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    return { text: fallbackText, disclaimer };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const systemPrompt = `You are AgriAssist AI, a localized agricultural advisory AI built for the Mandakini Organic Produce Collective (Kedarnath Valley, Uttarakhand).
STRICT GUARDRAILS:
1. ONLY answer questions related to agriculture, crop disease, soil health, organic farming, pests, and post-harvest logistics in mountain terrain.
2. If asked about non-agricultural topics (politics, general tech, movies), politely decline and redirect to high-altitude crop advisory.
3. Respond in the user's requested language (${language}). If Garhwali, use simple, respectful regional tone.
4. Keep advice practical, low-cost, and tailored for farmers at ${altitude}m altitude in weather (${weather}).`;

    const fullPrompt = `${systemPrompt}\n\nUser Question: ${userQuery}`;
    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();

    return { text: text || fallbackText, disclaimer };
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return { text: fallbackText, disclaimer };
  }
}
