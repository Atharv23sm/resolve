import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";
import Answer from "@/models/AnswerModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { qid } = reqBody;

    const q = await Question.findByIdAndDelete(qid);
    const a = await Answer.deleteMany({ questionId: qid });

    if (q && a)
      return NextResponse.json({ message: "Question deleted", success: true });
    else throw new Error();
  } catch (err: any) {
    return NextResponse.json({ error: "Something went wrong." });
  }
}
