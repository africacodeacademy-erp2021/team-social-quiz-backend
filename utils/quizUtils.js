const { ObjectId } = require('mongodb');
const Quiz = require('../models/Quiz');

/**
 * getAllQuizes
 * 
 * returns all platform Quizes
 * @returns Resolved promise with Platform Quizes
 */
exports.getAllQuizzes = async () =>{
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

/**
 * publishQuiz
 * 
 * publish quiz with given quizId
 * @param {String} quizId 
 * @returns published quiz object
 */
exports.publishQuiz = async (quizId) => {
  try{
    let quiz = await Quiz.findOneAndUpdate(
                          {_id: new ObjectId(quizId)},
                          {isPublished:true},
                          {new:true}
                          )
                          .populate({path:"category", model:"Category", select:"text"})
                          .exec()

    return Promise.resolve(quiz)
  }catch(error){
    return Promise.reject(error)
  }
}

/**
 * unpublishQuiz
 * 
 * Remove a quiz from public view
 * 
 * @param {String} quizId 
 * @returns  quiz object
 */
 exports.unpublishQuiz = async (quizId) => {
  try{
    let quiz = await Quiz.findOneAndUpdate(
                          {_id: new ObjectId(quizId)},
                          {isPublished:false},
                          {new:true}
                          )
                          .populate({path:"category", model:"Category", select:"text"})
                          .exec()

    return Promise.resolve(quiz)
  }catch(error){
    return Promise.reject(error)
  }
}


/**
 * getQuizById
 * 
 * fetch a single quiz object given a quizId
 * @param {String} quizId 
 * @returns quiz object
 */
 exports.getQuizById = async (quizId) => {
  try{
    let quiz = await Quiz.findOne({_id: new ObjectId(quizId)})
                          .populate({path:"category", model:"Category", select:"text"})
                          .exec()

    return Promise.resolve(quiz)
  }catch(error){
    return Promise.reject(error)
  }
}

/**
 * updateQuiz
 * 
 * used to update root level elements / attributes of a quiz
 * @param {String} quizId 
 * @param {Json object} newData
 * @returns updated quiz object
 */
 exports.updateQuiz = async (quizId, newData) => {
  try{
    let updatedQiz = await Quiz.findOneAndUpdate(
                            {_id: new ObjectId(quizId)},
                            newData,
                            {new:true}
                            )
                          .populate({path:"category", model:"Category", select:"text"})
                          .exec()

    return Promise.resolve(updatedQiz)
  }catch(error){
    return Promise.reject(error)
  }
}

/**
 * findMostPlayedQuiz
 * 
 * 
 * @returns quiz object
 */
 exports.findMostPlayedQuiz = async () => {
  try{
    let quiz = await Quiz.findOne({})
                          .populate({path:"category", model:"Category", select:"text"})
                          .sort({popularity:-1})
                          .limit(1)
                          .exec()

    return Promise.resolve(quiz)
    
    
  }catch(error){
    return Promise.reject(error)
  }
}

/**
 * findMostPlayedQuizList
 * 
 * 
 * @returns list of quiz objects
 */
 exports.findMostPlayedQuizList = async () => {
  try{
    let quizList = await Quiz.find({})
                          .populate({path:"category", model:"Category", select:"text"})
                          .sort({popularity:-1})
                          .limit(10)
                          .exec()

    return Promise.resolve(quizList)
    
    
  }catch(error){
    return Promise.reject(error)
  }
}

/**
 * updateQuizPopularity
 * 
 * @param {string} quizId
 * @returns quiz object
 */
 exports.updateQuizPopularity = async (quizId) => {
  try{
    let quiz = await Quiz.findOne({_id:ObjectId(quizId)}).exec()

    if(quiz == null)
      return Promise.reject("quiz not found")
      
    quiz['popularity'] = quiz['popularity']+1
    quiz = await quiz.save()

    return Promise.resolve(quiz)
    
    
  }catch(error){
    return Promise.reject(error)
  }
}
