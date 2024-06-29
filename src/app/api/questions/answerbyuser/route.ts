import { NextRequest, NextResponse } from "next/server";
import Answer from "@/models/AnswerModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const MyAnswers = await Answer.find({username : reqBody.username}).sort({date:-1});

        return NextResponse.json({ message: "My Answers found", data: MyAnswers })
    }
    catch (err:any) {
        return NextResponse.json({error: err.message});
    }

}