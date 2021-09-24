const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const GameSchema = new mongoose.Schema(
  {
    quiz_id: {
      type: ObjectId,
      ref: "Quiz",
    },

    players: {
      type: Array,
    },

    player_answers: {
      type: Array,
    },

    winner: {
      type: ObjectId,
      ref: "users",
    },

    winning_score: {
      type: Number,
      default: 0,
    },

    winning_team: {
      type: Object,
    },

    leaderboard: {
      type: ObjectId,
      ref: "Leaderboard",
    },

    teams: {
      type: Array,
    },

    start_time: {
      type: Date,
    },

    end_time: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
