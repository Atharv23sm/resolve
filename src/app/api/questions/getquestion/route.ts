import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const res = await req.json();

    const question = await Question.findOne({ _id: res.qId });
    return NextResponse.json({ message: "Question found", question });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
