import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){
    try {
        const allQuestions = await Question.find();
        return NextResponse.json({ message: "Questions found", data: allQuestions })
    }
    catch (err:any) {
        return NextResponse.json({error: err.message});
    }

}