import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/app/lib/pusher";
import Question from "@/models/questionModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, question, topic, imagePublicIds } = reqBody;

    const newQuestion = new Question({
      username,
      question,
      topic,
      date: Date.now(),
      imagePublicIds
    });
    await newQuestion.save();

    const allQuestions = await Question.find().sort({ date: -1 });
    await pusherServer.trigger("QueChannel", "onQuestionChange", allQuestions);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Something went wrong." });
  }
}
