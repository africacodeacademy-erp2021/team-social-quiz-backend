const { ObjectId } = require('mongodb');
const Answers = require('../models/Answers');
const Question = require('../models/Question');
const Quiz = require('../models/Quiz');



/**
 * createQuestion
 * creates a Question object 
 * 
 * @param {String} title 
 * @param {String} description 
 * @param {String} category 
 * @param {Number} score 
 * @param {Array} questions 
 * 
 * @returns Resolved promise with quiz object
 */
 exports.createQuestion = async (text, answers, points) =>{
  try{
    let newQuestion = await new Question({
                                  text:text,
                                  points:points
                                }).save()

    let newAnswers = await Promise.all(answers.map(async answer => {
                                  return  await this.createAnswer(answer.text, newQuestion._id, answer.isCorrect)
                                }))
    // circular ref to answers
    newQuestion["answers"] = newAnswers.map(answer => {return new ObjectId(answer._id)}) 
    
    newQuestion = await newQuestion.save()

    return newQuestion
  }catch(error){
    return Promise.reject(error)
  }
  
}

/**
 * 
 * @param {String} text 
 * @param {String} questionId 
 * @param {Boolean} isCorrect 
 * @returns 
 */
exports.createAnswer = async (text, questionId, isCorrect) =>{
    let answer = await new Answers({
      text:text,
      isCorrect: isCorrect,
      question: new ObjectId(questionId)
    }).save()

    return answer
}

/**
 * getQuizQuestions
 * 
 * @param {String} quizId 
 * @returns list of question Objects
 */
exports.getQuizQuestions = async (quizId) =>{
  let quiz = await Quiz.findOne({_id: new ObjectId(quizId)})
                 .populate({path:"questions", model:"Question", populate:{path:"answers", model:"Answers"}})
                 .exec()
  if(quiz != null){
    let questions = quiz.questions
    return Promise.resolve(questions)
  }
  else{
    return Promise.reject(`quiz with ID ${quizId} not found`)
  }
}


