// Module imports

const User = require('../models/User');

const { getAllGamesByPlayer } = require("../utils/userUtils")


exports.getAllGames = async (req, res) => {
  try {
    var { email } = req.body;

    let playerHistory = await getAllGamesByPlayer(email);

    if (playerHistory === 0) {
      return res.send("User doesn't exist");
    } else {
      return res.send(playerHistory);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};