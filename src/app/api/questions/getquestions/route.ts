import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";
import { pusherServer } from "@/app/lib/pusher";

connect();

export async function POST(request: NextRequest) {
  try {
    const allQuestions = await Question.find().sort({ date: -1 });

    pusherServer.trigger("QueChannel","onQuestionAdd", allQuestions)

    return NextResponse.json({ message: "Questions found", allQuestions });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
