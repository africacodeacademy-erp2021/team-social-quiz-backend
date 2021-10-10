// Module imports

const { ObjectId } = require('mongodb');
const User = require('../models/User');
const { Role } = require('./Constants');

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
 * getPlayers
 * 
 * returns all users with role player
 * @returns Resolved promise with Platform users
 */
 exports.getPlayers = async () =>{
  try{
    let users = await User.find({role:Role.PLAYER}).exec()
    return Promise.resolve(users)
  }catch(error){
    return Promise.reject(error)
  }
  
}

/**
 * getAdmins
 * 
 * returns all users with role player
 * @returns Resolved promise with Platform users
 */
 exports.getAdmins = async () =>{
  try{
    let users = await User.find({role:Role.ADMIN}).exec()
    return Promise.resolve(users)
  }catch(error){
    return Promise.reject(error)
  }
  
}

/**
 * getPlayerById
 * 
 * returns a users with given playerId
 * 
 * @param {String} playerId 
 * @returns Resolved promise with user info
 */
exports.getPlayerById = async (playerId) =>{
try{
  let user = await User.findOne({_id:new ObjectId(playerId)}).exec()

  if(user != null)
    return Promise.resolve(user)
  else
    return Promise.reject("user doesnt exist")
}catch(error){
  return Promise.reject(error)
}

}
