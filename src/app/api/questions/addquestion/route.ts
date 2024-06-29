import { connect } from '@/dbConfig/dbConfig'
import Question from '@/models/questionModel'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { username, question, topic } = reqBody

        const newQuestion = new Question({ username, question, topic, date:Date.now() })
        const savedQuestion = await newQuestion.save()

        return NextResponse.json({ message: "Question added.", success: true, savedQuestion })
    }
    catch (err: any) {
        return NextResponse.json({ error: "Something went wrong." })
    }
}