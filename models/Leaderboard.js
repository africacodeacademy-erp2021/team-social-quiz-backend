const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aca_tsq", { useNewUrlParser: true });
const ObjectId = mongoose.Schema.Types.ObjectId;

const LeaderboardSchema = new mongoose.Schema(
  {

    user_id:{
      type:ObjectId,
      ref: "users",
    },
    
    winning_score:{
        type: ObjectId,
        ref: "Game",
    },

  },
  {
    
    timestamps: true,
    
  }
);

const Leaderboard = mongoose.model("Leaderboard", LeaderboardSchema);

module.exports = Leaderboard;
