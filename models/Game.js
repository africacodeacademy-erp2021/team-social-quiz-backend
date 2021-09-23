const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aca_tsq", { useNewUrlParser: true });
const ObjectId = mongoose.Schema.Types.ObjectId;

const GameSchema = new mongoose.Schema(
  {
    quiz_id: {
      type: ObjectId,
      ref: "Quiz",
    },

    player_answers:{
      type: Array, 
    },

    winner:{
      type:ObjectId,
      ref: "Leaderboard",
    },
    
    winning_score:{
        type: Number,
        default: 0,
    },

    winning_team: {
        type: Object,

    },
    
    leaderboard: {
        type:ObjectId,
        ref: "Leaderboard",
    },

    teams: {
        type: Array,
    },

  },
  {
    
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    
  }
);

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
