import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Answer from "@/models/AnswerModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const myAnswers = await Answer.find({ username: reqBody.username }).sort({
      date: -1,
    });

    return NextResponse.json({ message: "My Answers found", myAnswers });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
