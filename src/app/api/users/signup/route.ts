import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import Upvote from "@/models/upvoteModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return NextResponse.json({ error: "User already registered." });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({ username, email, password: hashPassword });
    const savedUser = await newUser.save();

    const upv = new Upvote({ username, upvotedAnswerIds: [] });
    await upv.save();

    return NextResponse.json({
      message: "User registered.",
      success: true,
      savedUser,
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Something went wrong." });
  }
}
