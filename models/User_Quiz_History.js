const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aca_tsq", { useNewUrlParser: true });
const ObjectId = mongoose.Schema.Types.ObjectId;

const User_Quiz_History_Schema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      ref: "Users"
    },

    quiz_id: {
      type: ObjectId,
      ref: "Quiz"
    },
    
  },
  {
    timestamps: true,
    
  }
);


const User_Quiz_History = mongoose.model("User_Quiz_History", User_Quiz_History_Schema);

module.exports = User_Quiz_History;