const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const { omitUserDetails } = require("../utils/ObjectUtils");
const { Role } = require("../utils/Constants");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true
    },

    refreshToken: { type:String },
    accessToken: {  type:String },
    role: {
      type: String,
      default: Role.PLAYER
    },

    status: {
      type: Boolean,
      default: true,
    },
    profile: {
      name: {
        firstname: {
          type: String,
          trim: true
        },
        lastname: {
          type: String,
          trim: true
        },
        facebook: {
          type: String
        }
      },
      gender: String,
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: omitUserDetails
    }
  }
);



const User = mongoose.model("User", userSchema);

module.exports = User;
