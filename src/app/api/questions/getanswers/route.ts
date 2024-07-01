import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Answer from "@/models/AnswerModel";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()

        const allAnswers = await Answer.find({questionId : reqBody.qId}).sort({date:-1});
        return NextResponse.json({ message: "Answers found", data: allAnswers })
    }
    catch (err:any) {
        return NextResponse.json({error: err.message});
    }

}