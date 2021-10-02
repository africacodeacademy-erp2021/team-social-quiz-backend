const express = require("express");
const router = express.Router();
const { Role } = require("../utils/Constants");

exports.getAllUsers = async () => {
  try {
    router.get("/User", async (req, res) => {
      try {
        const userList = await User.find();
        return res.status(200).json(userList);
      } catch (error) {
        return res.status(500).json({ error: error });
      }
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.ChangeUserRole = async () => {
  router.put("/User/:_id", async (req, res) => {
    try {
      if (Role.PLAYER === player) {
        const role = users
          .findByIdAndUpdate(_id, { $set: { role: Role.ADMIN } })
          .exec();
        return res.status(200).json(role);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  });
};

/**
 * Get User information
 */
exports.GetUserDetails = async () => {
  router.get("/User", async (req, res) => {
    try {
      const { name } = req.body;
      await User.findOne({ name: name }).exec();
      User.findOne({ name: name }, function (err, users) {});
      await User.findOne(
        { name: name },
        "lastname email _id role status gender"
      ).exec();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  });
};
