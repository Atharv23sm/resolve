import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Username needed"]
    },

    question: {
        type: String,
        required: [true, "Please ask your question"],
    },

    topic: {
        type: Array,
    },

    date: {
        type: Date
    }

})

const Question = mongoose.models.questions || mongoose.model("questions", questionSchema)

export default Question