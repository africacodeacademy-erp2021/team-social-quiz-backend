const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;


const QuestionInfoSchema = new mongoose.Schema(
  {
    quiestion_Text: {
      type: String,
      unique: true
    },

    category_id: {
      type: ObjectId,
      ref: "Categories"
    },

    score: {
      type: Number,
      default: 0,
    },
    
    quiz_id: {
      type: String,
      unique: true
      },
    
  },
  {
    timestamps: true,
    
  }
);


const QuestionInfo = mongoose.model("QuestionInfo", QuestionInfoSchema);

module.exports = QuestionInfo;
