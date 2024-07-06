import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, question, topic } = reqBody;

    const newQuestion = new Question({
      username,
      question,
      topic,
      date: Date.now(),
    });
    await newQuestion.save();

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Something went wrong." });
  }
}
