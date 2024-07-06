import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";
import Answer from "@/models/AnswerModel";
import { pusherServer } from "@/app/lib/pusher";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { qid } = reqBody;

    const q = await Question.findByIdAndDelete(qid);
    const a = await Answer.deleteMany({ questionId: qid });

    if (q && a) {
      const allQuestions = await Question.find().sort({ date: -1 });
      await pusherServer.trigger("QueChannel", "onQuestionChange", allQuestions);
      return NextResponse.json({ message: "Question deleted", success: true });
    } else throw new Error();
  } catch (err: any) {
    return NextResponse.json({ error: "Something went wrong." });
  }
}
