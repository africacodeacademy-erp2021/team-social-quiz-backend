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

/**
 * updatePlayerRole
 * 
 * returns a users with given playerId
 * 
 * @param {String} userId
 * @param {String} role
 * @returns Resolved promise with user info
 */
exports.updatePlayerRole = async (userId, role) =>{
  try{
    //TODO: Update user access scopes
    let user = await User.findOneAndUpdate(
      {_id:new ObjectId(userId)},
      {role:role}, 
      {new : true}
    ).exec()

    if(user != null)
      return Promise.resolve(user)
    else
      return Promise.reject("user doesnt exist")
  }catch(error){
    return Promise.reject(error)
  }

}

/**
 * suspendPlayer
 * 
 * suspends a player with given userId
 * 
 * @param {String} userId
 * @returns Resolved promise with user info
 */
exports.suspendPlayer = async (userId) =>{
  try{
    //TODO: Update user access scopes
    let user = await User.findOneAndUpdate(
      {_id:new ObjectId(userId)},
      {status:false}, 
      {new : true}
    ).exec()

    if(user != null)
      return Promise.resolve(user)
    else
      return Promise.reject("user doesnt exist")
  }catch(error){
    return Promise.reject(error)
  }

}

/**
 * revivePlayer
 * 
 * suspends a player with given userId
 * 
 * @param {String} userId
 * @returns Resolved promise with user info
 */
 exports.revivePlayer = async (userId) =>{
  try{
    //TODO: Update user access scopes
    let user = await User.findOneAndUpdate(
      {_id:new ObjectId(userId)},
      {status:true}, 
      {new : true}
    ).exec()

    if(user != null)
      return Promise.resolve(user)
    else
      return Promise.reject("user doesnt exist")
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
    let UserHistory = await User.find({ _id:id }).lean()
    .populate('user','game_history').exec(function (err, history){ 
      if (history.user.game_history) {
        return Promise.resolve(UserHistory);
    } else {
      return Promise.reject("user doesnt have game history")
    }
    });
    
  } catch (error) {
    console.log(error)
    return Promise.reject(error);
  }
};