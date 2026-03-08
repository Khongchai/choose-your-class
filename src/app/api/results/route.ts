import { getDb } from "@/lib/mongodb";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const geo = await (async () => {
      try {
        const headersList = await headers();
        return {
          ip:
            headersList.get("x-real-ip") ??
            headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
            null,
          country: headersList.get("x-vercel-ip-country") ?? null,
          region: headersList.get("x-vercel-ip-country-region") ?? null,
          city: headersList.get("x-vercel-ip-city")
            ? decodeURIComponent(headersList.get("x-vercel-ip-city")!)
            : null,
          latitude: headersList.get("x-vercel-ip-latitude") ?? null,
          longitude: headersList.get("x-vercel-ip-longitude") ?? null,
          timezone: headersList.get("x-vercel-ip-timezone") ?? null,
        };
      } catch (e) {
        console.error(`Error while trying to obtain geo info`);
        console.error(e);
        return {
          ip: null,
          country: null,
          region: null,
          city: null,
          latitude: null,
          longitude: null,
          timezone: null,
        };
      }
    })();

    const doc = {
      language: body.language,
      nickname: body.nickname,
      gender: body.gender,
      age: body.age,
      instrument: body.instrument,
      musicMajor: body.musicMajor,
      skillLevel: body.skillLevel,
      consentGiven: body.consentGiven,
      selfAssessmentAnswers: body.selfAssessmentAnswers,
      characterClass: body.characterClass,
      geo: {
        ip: geo.ip,
        country: geo.country,
        region: geo.region,
        city: geo.city,
        latitude: geo.latitude,
        longitude: geo.longitude,
        timezone: geo.timezone,
      },
      createdAt: new Date(),
    };

    const db = await getDb();
    const result = await db.collection("results").insertOne(doc);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("Failed to save results:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save results" },
      { status: 500 },
    );
  }
}
