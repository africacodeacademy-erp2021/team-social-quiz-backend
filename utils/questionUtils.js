const { ObjectId } = require('mongodb');
const Answers = require('../models/Answers');
const Question = require('../models/Question');



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

exports.createAnswer = async (text, questionId, isCorrect) =>{
    let answer = await new Answers({
      text:text,
      isCorrect: isCorrect,
      question: new ObjectId(questionId)
    }).save()

    return answer
}

