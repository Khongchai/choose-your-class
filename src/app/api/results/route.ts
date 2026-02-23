import { getDb } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

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
