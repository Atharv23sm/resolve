import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";
import { pusherServer } from "@/app/lib/pusher";

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

    const allQuestions = await Question.find().sort({ date: -1 });
    pusherServer.trigger("QueChannel", "onQuestionChange", allQuestions);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Something went wrong." });
  }
}
