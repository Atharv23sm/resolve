import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/app/lib/pusher";
import Answer from "@/models/AnswerModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, questionId, question, answer, imagePublicIds } = reqBody;

    const newAnswer = new Answer({
      username,
      questionId,
      question,
      answer,
      date: Date.now(),
      imagePublicIds,
      upvotes: 0,
    });
    await newAnswer.save();

    const allAnswers = await Answer.find({ questionId }).sort({
      upvotes: -1,
    });

    await pusherServer.trigger("AnsChannel", "onAnswerChange", allAnswers);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Something went wrong." });
  }
}
