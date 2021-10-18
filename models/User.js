const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const { omitUserDetails } = require("../utils/objectUtils");
const { Role } = require("../utils/constants");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
    },

    refreshToken: { type: String },
    accessToken: { type: String },
    role: {
      type: String,
      default: Role.PLAYER,
    },
    accessScopes:{type:Array},
    gameHistory:{
      type: Array
    },

    channel:{
      type: String,
      
    },

    platformPoints:{
      type: Number,
      default: 0,
    },

    password:{
        type: String,
    },

    status: {
      type: Boolean,
      default: true,
    },

    profile: {
      name: {
        screenName: {
          type: String,
          trim: true,
        },
      },
      
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: omitUserDetails,
    },
  }
);

module.exports = mongoose.model("User", userSchema);
