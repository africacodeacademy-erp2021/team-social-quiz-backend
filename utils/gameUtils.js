const Game = require("..models/Game");

exports.getPlatformPlayers = async () => {
  try {

    let currentPlayers = [];
    let Players = await Game.findById( {_id : { players: currentPlayers }}).exec();

    return Promise.resolve(Players);

  } catch (error) {

    console.log(error);
    return Promise.reject(error);
  }
};
