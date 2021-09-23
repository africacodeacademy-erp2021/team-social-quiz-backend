const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aca_tsq", { useNewUrlParser: true });
const ObjectId = mongoose.Schema.Types.ObjectId;

const SessionSchema = new mongoose.Schema(
  {
    is_correct: {
      type: Boolean,
      default: true,
    },

    score: {
      type: Number,
      default: 0,
    },

    overall_winner: {
      type: String,
    },

    quiz_id: {
      type: ObjectId,
      ref: "Quiz_History",
    },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session;
