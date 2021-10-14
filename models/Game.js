const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const GameSchema = new mongoose.Schema(
  {
    quiz: {
      type: ObjectId,
      ref: "Quiz",
    },

    players: {
      type: Array,
    },

    playerAnswers: {
      type: Array,
    },
    host:{
      type:ObjectId,
      ref:"User",
    },

    winner: {
      type: ObjectId,
      ref: "User",
    },

    winningScore: {
      type: Number,
      default: 0,
    },

    winningTeam: {
      type: Object,
    },

    leaderboard: {
      type: ObjectId,
      ref: "Leaderboard",
    },

    gameType:{
      type:String
    },

    teams: {
      type: Array,
    },

    startTime: {
      type: Date,
    },

    endTime: {
      type: Date,
    },
    pin:{
      type:Number
    },
    remainingQuestions:{
      type:Array
    },
    currentQuestion:{
      type:ObjectId,
      ref:"Question"
    }
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
