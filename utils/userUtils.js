const User = require('../models/User');
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