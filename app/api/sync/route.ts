import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { scans, queries } = body;

    let syncedCount = 0;

    if (userId && Array.isArray(scans)) {
      for (const s of scans) {
        try {
          await prisma.cropScan.create({
            data: {
              clerkUserId: userId,
              cropName: s.cropName || "Unknown Crop",
              diseaseDetected: "Pending Analysis (Synced Offline)",
              severity: "Moderate",
              confidence: 0.8,
              treatmentPlan: "Synced offline — queued for field inspection",
              organicOptions: "Neem extract spray",
              imageUrl: s.imageBase64 || "",
              latitude: s.latitude || null,
              longitude: s.longitude || null,
              altitudeMeters: s.altitudeMeters || 2400,
              weatherSummary: "Mountain terrain (Offline sync)",
              syncedOffline: true,
            },
          });
          syncedCount++;
        } catch (err) {
          console.warn("Failed to sync item:", err);
        }
      }
    }

    return NextResponse.json({
      success: true,
      syncedCount,
      message: `Successfully synced ${syncedCount} offline records.`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to sync offline queue" }, { status: 500 });
  }
}
