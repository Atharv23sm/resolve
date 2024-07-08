import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/app/lib/pusher";
import Answer from "@/models/AnswerModel";
import Upvote from "@/models/upvoteModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { aid, qId, user, isUpvoted } = reqBody;

    if (isUpvoted) {
      await Answer.findByIdAndUpdate(
        aid,
        { $inc: { upvotes: -1 } },
        { new: true }
      );

      await Upvote.updateOne(
        { username: user.username },
        { $pull: { upvotedAnswerIds: aid } }
      );
    } else {
      await Answer.findByIdAndUpdate(
        aid,
        { $inc: { upvotes: 1 } },
        { new: true }
      );

      await Upvote.updateOne(
        { username: user.username },
        { $push: { upvotedAnswerIds: aid } }
      );
    }

    const allAnswers = await Answer.find({ questionId: qId }).sort({
      upvotes: -1,
    });

    await pusherServer.trigger("AnsChannel", "onAnswerChange", allAnswers);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Something went wrong." });
  }
}
