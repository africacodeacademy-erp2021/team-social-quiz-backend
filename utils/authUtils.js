// Module imports

const User = require("../models/User")

/**
 * register platform user
 * 
 * @returns Resolved promise with Platform users
 */
exports.registerUser = async (accessToken, refreshToken, email, channel, username) =>{
  try{
    // TODO: ADD USER ACCESS SCOPES

    let newUser = await new User({
      accessToken:accessToken,
      refreshToken: refreshToken,
      email: email,
      channel: channel,
      accessScopes:[],
      "profile.name.screenName":username,
    }).save()

    return Promise.resolve(newUser)
  }catch(error){
    return Promise.reject(error)
  }
  
}

/**
 * register admin user
 * 
 * @returns Resolved promise with Platform users
 */
 exports.registerAdmin = async (password, confirmPassword, email, channel, username) =>{
  try{
    // TODO: confirm if password matches with confirmPassword
    // TODO: use bycrpt to hash the password
    // TODO: Add user access scopes

    let newUser = await new User({
      password:password,
      email: email,
      channel: channel,
      accessScopes:[],
      "profile.name.screenName":username,
    }).save()

    return Promise.resolve(newUser)
  }catch(error){
    return Promise.reject(error)
  }
  
}


// incomplete functions

exports.generateAccessToken = async () =>{

}

exports.generateRefreshToken = async () =>{

}
