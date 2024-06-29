import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Username needed"]
    },

    questionId: {
        type: String,
    },

    question: {
        type: String
    },

    answer: {
        type: String,
        required: [true, "Please provide answer"],
    },

    date: {
        type: Date
    }
})

const Answer = mongoose.models.answers || mongoose.model("answers", answerSchema)

export default Answer