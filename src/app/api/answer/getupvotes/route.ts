import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Upvote from "@/models/upvoteModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const upv = await Upvote.findOne({ username: reqBody.user.username });
    const upvotedAns = upv.upvotedAnswerIds;

    return NextResponse.json({ success: true, upvotedAns });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
