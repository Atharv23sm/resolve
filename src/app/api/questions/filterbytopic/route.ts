import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const filteredQuestions = await Question.find({
      topic: { $regex: reqBody.filterTopic, $options: "i" },
    }).sort({ date: -1 });
    return NextResponse.json({
      message: "Filtered questions found",
      filteredQuestions,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
