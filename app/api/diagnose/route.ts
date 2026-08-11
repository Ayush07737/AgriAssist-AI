import { NextRequest, NextResponse } from "next/server";
import { diagnoseCropLeaf } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { imageBase64, mimeType, cropName, geoContext } = body;

    if (!imageBase64) {
      return NextResponse.json({ error: "Image data is required" }, { status: 400 });
    }

    // Call AI vision diagnostic engine
    const diagnosis = await diagnoseCropLeaf(
      imageBase64,
      mimeType || "image/jpeg",
      geoContext
    );

    // Save to Database if user is authenticated and DB is connected
    let savedScan = null;
    if (userId) {
      try {
        savedScan = await prisma.cropScan.create({
          data: {
            clerkUserId: userId,
            cropName: cropName || diagnosis.cropName,
            diseaseDetected: diagnosis.diseaseDetected,
            severity: diagnosis.severity,
            confidence: diagnosis.confidence,
            treatmentPlan: diagnosis.treatmentPlan,
            organicOptions: diagnosis.organicOptions,
            imageUrl: `scan_image_${Date.now()}.${(mimeType || "image/jpeg").split("/")[1] || "jpg"}`,
            latitude: geoContext?.latitude || null,
            longitude: geoContext?.longitude || null,
            altitudeMeters: geoContext?.altitudeMeters || 2400,
            weatherSummary: geoContext?.weatherSummary || "Cool high-altitude mountain terrain",
            syncedOffline: false,
          },
        });
      } catch (dbErr) {
        console.warn("DB save skipped (unreachable DB or mock mode):", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      diagnosis,
      scanId: savedScan?.id || `scan_${Date.now()}`,
    });
  } catch (error: any) {
    console.error("Diagnosis API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze leaf image" },
      { status: 500 }
    );
  }
}
