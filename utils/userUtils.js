// Module imports
const { ObjectId } = require('mongodb');
const User = require("../models/User");

/**
 * getPlatformUsers
 *
 * returns all platform users
 * @returns Resolved promise with Platform users
 */
exports.getPlatformUsers = async () => {
  try {
    let users = await User.find({}).exec
    return Promise.resolve(users);
  } catch (error) {
    console.log(error)
    return Promise.reject(error);
  }
};
/**
 * getPlayerById
 * 
 * returns a user with given playerId
 * 
 * @param {String} Id 
 * @returns Resolved promise with user info
 */

exports.getPlayerInfo = async (Id) => {
  try {
    
    let user = await User.findOne({ _id:new  ObjectId(Id)}).exec();
    return Promise.resolve(user)
    
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

