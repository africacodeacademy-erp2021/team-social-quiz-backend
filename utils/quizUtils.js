const { ObjectId } = require('mongodb');
const Quiz = require('../models/Quiz');

/**
 * getAllGames
 * 
 * returns all platform Quizes
 * @returns Resolved promise with Platform Quizes
 * @param {String} email 
 */
exports.getAllGamesByPlayer = async () =>{
  try{
    let quiz = await User.find({email},
      { game_history: 1 })
      .exec()
    return Promise.resolve(quiz)
  }catch(error){
    return Promise.reject(error)
  }
  
}