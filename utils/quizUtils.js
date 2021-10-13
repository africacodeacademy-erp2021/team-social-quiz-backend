const { ObjectId } = require("mongodb");
const User = require("../models/User");

/**
 * getAllGames
 *
 * returns all platform Quizes
 * @returns Resolved promise with Platform Quizes
 * @param {String} email
 */
exports.getAllGamesByPlayer = async (email) => {
  try {
    let UserHistory = await User.find(
      { email:email },
      { game_history: 1 }
    ).exec();
    return Promise.resolve(UserHistory);
  } catch (error) {
    return Promise.reject(error);
  }
};
