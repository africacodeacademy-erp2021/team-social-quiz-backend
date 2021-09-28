const mongoose = require("mongoose");

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
