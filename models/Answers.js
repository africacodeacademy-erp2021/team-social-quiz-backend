const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const Answers_Schema = new mongoose.Schema(
  {
    is_correct: {
      type: Boolean,
      default: false,
    },

    text: {
      type: String,
      unique: false,
    },

    question_id: {
      type: ObjectId,
      ref: "Question",
    },
  },
  {
    timestamps: true,
  }
);

const Answers = mongoose.model("Answers", Answers_Schema);

module.exports = Answers;
