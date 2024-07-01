import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()

        const myQuestions = await Question.find({username:reqBody.username}).sort({date:-1})
        return NextResponse.json({ message: "My questions found", data: myQuestions })
    }
    catch (err:any) {
        return NextResponse.json({error: err.message});
    }

}