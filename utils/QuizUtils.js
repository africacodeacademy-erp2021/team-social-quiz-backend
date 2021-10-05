// Module imports

const Quiz = require('../models/Quiz');

/**
 * getPopularQuizzes
 * 
 * returns all Popular quizzes
 * @returns Resolved promise with Popular quizzes
 */
exports.getPopularQuizzes = async () =>{
  try{
    let popularity = 0;  
    let percentage  = (50 / 100 ) * popularity 
    let popularquizzes = await Quiz.find({ $where: popularity > percentage}).exec()
    return Promise.resolve(popularquizzes)
  }catch(error){
    return Promise.reject(error)
  }
  
}
