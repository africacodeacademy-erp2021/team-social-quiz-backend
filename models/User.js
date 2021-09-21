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

    refreshToken: {
      token: { type: String },
      isRevoked: { type: Boolean, default: false },
      revokeTime: { type: String },
      refreshLimit: { type: Number, default: 100 },
      refreshCount: { type: Number, default: 0 },
      tokenLogs: [],//ip, date, accessToken
    },
    accessToken: {
      token: { type: String },
      isRevoked: { type: Boolean, default: false },
      revokeTime: { type: String }
    },
    role: {
      type: String,
      default: Role.ACCOUNT_ADMIN
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
