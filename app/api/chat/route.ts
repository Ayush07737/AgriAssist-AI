import { NextRequest, NextResponse } from "next/server";
import { askVernacularAdvisory } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { userQuery, language, geoContext } = body;

    if (!userQuery) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const { text, disclaimer } = await askVernacularAdvisory(
      userQuery,
      language || "Hindi",
      geoContext
    );

    // Save query to database if authenticated
    if (userId) {
      try {
        await prisma.advisoryQuery.create({
          data: {
            clerkUserId: userId,
            userQuery,
            aiResponse: text,
            language: language || "Hindi",
            disclaimerShown: true,
            altitudeMeters: geoContext?.altitudeMeters || 2400,
          },
        });
      } catch (dbErr) {
        console.warn("DB save skipped for chat query:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      response: text,
      disclaimer,
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process chat query" },
      { status: 500 }
    );
  }
}
