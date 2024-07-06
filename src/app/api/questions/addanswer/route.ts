import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Answer from "@/models/AnswerModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, questionId, question, answer } = reqBody;

    const newAnswer = new Answer({
      username,
      questionId,
      question,
      answer,
      date: Date.now(),
      upvotes: 0,
      downvotes: 0,
    });
    await newAnswer.save();

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Something went wrong." });
  }
}
