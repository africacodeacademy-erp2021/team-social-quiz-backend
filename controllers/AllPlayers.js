const { getPlatformPlayers } = require("../utils/gameUtils");

exports.getAllPlayers = async () => {
  try {
  
    const playersList = await getPlatformPlayers();

    if (usersList.length > 0) {
      return res.send(playersList);
    } else {
      return res.status(204).send(playersList);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
