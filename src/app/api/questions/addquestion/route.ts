import { connect } from '@/dbConfig/dbConfig'
import Question from '@/models/questionModel'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { username, question } = reqBody

        const isValidUser = User.findOne({ username })
        if (!isValidUser) {
            return NextResponse.json({ error: "User is not registered", success: false })
        }

        const newQuestion = new Question({ username, question })
        const savedQuestion = await newQuestion.save()

        return NextResponse.json({ message: "Question added.", success: true, savedQuestion })
    }
    catch (err: any) {
        return NextResponse.json({ error: "Something went wrong." })
    }
}