const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const QuestionInfoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      
    },
    answers: {
      type: Array,
    },

    points: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", QuestionInfoSchema);

module.exports = Question;
