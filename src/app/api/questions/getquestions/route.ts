import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const allQuestions = await Question.find().sort({ date: -1 });
    return NextResponse.json({ message: "Questions found", allQuestions });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
