const { ObjectId } = require('mongodb');
const Quiz = require('../models/Quiz');

/**
 * getAllQuizes
 * 
 * returns all platform Quizes
 * @returns Resolved promise with Platform Quizes
 */
exports.getAllQuizes = async () =>{
  try{
    let quiz = await Quiz.find({})
                          .populate({path:"category", model:"Category", select:"text"})
                          .exec()
    return Promise.resolve(quiz)
  }catch(error){
    return Promise.reject(error)
  }
  
}

/**
 * createQuiz
 * creates a quiz object 
 * 
 * @param {String} title 
 * @param {String} description 
 * @param {String} category 
 * @param {Number} score 
 * @param {Array} questions 
 * 
 * @returns Resolved promise with quiz object
 */
 exports.createQuiz = async (title, description, category, score) =>{
  try{
    let newQuiz = await new Quiz({
                                  title:title,
                                  description:description,
                                  category:new ObjectId(category),
                                  totalScore:score,
                                }).save()
    return Promise.resolve(newQuiz)
  }catch(error){
    return Promise.reject(error)
  }
  
}


/**
 * doesQuizExist
 * 
 * checks if there are any quizes with the given title
 * returns true of it exists and false otherwise
 * 
 * @param {String} title 
 * @returns {Boolean}
 */
exports.doesQuizExist = async (title) =>{
  const quiz = await Quiz.findOne({
    title: {$regex:title, $options:"i"},
  }).exec();

  return Promise.resolve(quiz != null)
}


/**
 * getPublishedQuizList
 * 
 * 
 * @returns Resolved promise of a list published quiz objects
 */
exports.getPublishedQuizList = async () =>{
  try{
    let quiz = await Quiz.find({isPublished:true})
                          .populate({path:"category", model:"Category", select:"text"})
                          .exec()
    return Promise.resolve(quiz)
  }catch(error){
    return Promise.reject(error)
  }
}
