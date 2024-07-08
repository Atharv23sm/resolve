import mongoose from "mongoose";

const upvoteSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username needed"],
  },

  upvotedAnswerIds: {
    type: Array,
  },
});

const Upvote =
  mongoose.models.upvotes || mongoose.model("upvotes", upvoteSchema);

export default Upvote;
