const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aca_tsq", { useNewUrlParser: true });
const ObjectId = mongoose.Schema.Types.ObjectId;

const Quiz_History_Schema = new mongoose.Schema(
  {
    quiz_id: {
      type: String,
      unique: true,
    },

    category_id: {
      type: ObjectId,
      ref: "Categories",
    },

    score: {
      type: Number,
      default: 0,
    },

    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz_History = mongoose.model("Quiz_History", Quiz_History_Schema);

module.exports = Quiz_History;
