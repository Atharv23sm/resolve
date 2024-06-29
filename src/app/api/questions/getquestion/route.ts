import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(req: NextRequest) {
    try {
        const res = await req.json()

        const question = await Question.findOne({ _id: res.qId });
        return NextResponse.json({ message: "Question found", data: question })
    }
    catch (err: any) {
        return NextResponse.json({ error: err.message });
    }

}