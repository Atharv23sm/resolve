import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Answer from "@/models/AnswerModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const a = await Answer.findByIdAndDelete(reqBody.aid);

    if (a)
      return NextResponse.json({ message: "Answer deleted", success: true });
    else throw new Error();
  } catch (err: any) {
    return NextResponse.json({ error: "Something went wrong." });
  }
}
