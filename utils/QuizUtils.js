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
    let QuizPopularity = 0;  
    let popularityPercentage  = (50 / 100 ) * QuizPopularity 
    let popularquizzes = await Quiz.find({ popularity: popularity > popularityPercentage}).exec()
    return Promise.resolve(popularquizzes)
  }catch(error){
    console.log(error);
    return Promise.reject(error)
  }
  
}
