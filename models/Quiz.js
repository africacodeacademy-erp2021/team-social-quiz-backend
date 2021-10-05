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

    category_id: {
      type: ObjectId,
      ref: "Category",
    },

    games: {
      type: Array,
    },

    is_published: {
      type: Boolean,
      default: false,
    },

    popularity: {
      type: Number,
      default: 0,
    },

    total_score: {
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
