const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aca_tsq", { useNewUrlParser: true });
const ObjectId = mongoose.Schema.Types.ObjectId;
const { omitUserDetails } = require("../utils/ObjectUtils");
const { Role } = require("../utils/Constants");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },

    refreshToken: { type: String },
    accessToken: { type: String },
    role: {
      type: String,
      default: Role.PLAYER,
    },

    game_history:{
      type: Boolean, 
    },

    channel:{
      type:ObjectId,
      ref: "Socials",
    },

    platform_points:{
      type: Number,
      default: 0,
    },

    status: {
      type: Boolean,
      default: true,
    },
    profile: {

      name: {
        screen_name: {
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

const User = mongoose.model("Users", userSchema);

module.exports = User;
