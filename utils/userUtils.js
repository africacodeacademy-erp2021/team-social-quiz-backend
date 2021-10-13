const { ObjectId } = require("mongodb");
const User = require("../models/User");

/**
 * getPlatformUsers
 * 
 * returns all platform users
 * @returns Resolved promise with Platform users
 */
exports.getPlatformUsers = async () =>{
  try{
    let users = await User.find({}).exec()
    return Promise.resolve(users)
  }catch(error){
    return Promise.reject(error)
  }
  
}


/**
 * getAllGames
 *
 * returns all platform Quizes
 * @returns Resolved promise with Platform Quizes
 * @param {objectid} id
 */
exports.getAllGamesByPlayer = async (id) => {
  try {
    let UserHistory = await User.find(
      { _id:id },
      { game_history: 1 }
    ).exec();
    return Promise.resolve(UserHistory);
  } catch (error) {
    return Promise.reject(error);
  }
};