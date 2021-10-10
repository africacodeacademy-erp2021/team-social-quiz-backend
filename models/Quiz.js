const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    description: {
      type: String,
    },

    questions: {
      type: Array,
    },

    category: {
      type: ObjectId,
      ref: "Category",
    },

    games: {
      type: Array,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    popularity: {
      type: Number,
      default: 0,
    },

    totalScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
