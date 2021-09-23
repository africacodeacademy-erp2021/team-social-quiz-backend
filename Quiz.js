const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aca_tsq", { useNewUrlParser: true });
const ObjectId = mongoose.Schema.Types.ObjectId;

const QuizSchema = new mongoose.Schema(
  {
    published_state: {
      type: Boolean,
      default: true
    },

    popularity: {
      type: Number,
      default: 0
    },
    
    question_id: {
        type: ObjectId,
        ref: "QuestionInfo"
      },
    
  },
  {
    timestamps: true,
    
  }
);

const Quiz = mongoose.model("User_Quiz_History", QuizSchema);

module.exports = Quiz;