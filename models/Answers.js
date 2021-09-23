const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aca_tsq", { useNewUrlParser: true });
const ObjectId = mongoose.Schema.Types.ObjectId;

const Answers_Schema = new mongoose.Schema(
  {
    is_correct: {
      type: Boolean,
      default: true,
    },

    answer_Text: {
      type: [],
    },

    question_id: {
      type: ObjectId,
      ref: "QuestionInfo",
    },
  },
  {
    timestamps: true,
  }
);

const Answers_Schema = mongoose.model("Answers", Answers_Schema);

module.exports = Answers_Schema;
