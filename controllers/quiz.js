const bodyParser = require("body-parser");

// Module imports
const Quiz = require("../models/Quiz");

const quizUtils = require("../utils/quizUtils");
const questionUtils = require("../utils/questionUtils");
const { ObjectId } = require("mongodb");

// Functions

exports.createQuiz = async (req, res) => {
  try {

    var  {
      title,
      description,
      questions,
      category,
      score,
    } = req.body;
   
    if (!await quizUtils.doesQuizExist(title)) {
      let newQuiz = await quizUtils.createQuiz(title,description,category,score)

      // add questions
      let quizQuestions = await Promise.all(questions.map(async question => {
        return await questionUtils.createQuestion(question.text, question.answers, question.points)
      }))

      newQuiz["questions"]=quizQuestions.map(question => {return new ObjectId(question._id)})
      newQuiz = await newQuiz.save()

      // repopulate quiz object

      newQuiz = await newQuiz.execPopulate({"path":"questions", model:"Question", populate:{"path":"answers", model:"Answers"}})
      return res.send(newQuiz);
      
    } else {
      return res.send("Quiz of that title already exist");
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).send(error);
  }
};

exports.getAllQuiz = async (req, res) => {
  try {
    let quizList = await quizUtils.getAllQuizzes();

    if (quizList.length > 0) {
      return res.send(quizList);
    } else {
      return res.status(204).send(quizList);
    }
  } catch (error) {
    // console.log(error);
    return res.sendStatus(500);
  }
};

exports.getPublishedQuizes = async (req, res) =>{
  try {
    let quizList = await quizUtils.getPublishedQuizList();

    if (quizList.length > 0) {
      return res.send(quizList);
    } else {
      return res.status(204).send(quizList);
    }
  } catch (error) {
    // console.log(error);
    return res.sendStatus(500);
  }
}

exports.publishQuiz = async (req, res) =>{
  try{
    const {
      quizId
    } = req.body
    let quiz = await quizUtils.publishQuiz(quizId)
    return res.send(quiz)
  }catch(error){
    // console.log(error)
    return res.status(500).send(error)
  }
}

exports.unpublishQuiz = async (req, res) =>{
  try{
    const {
      quizId
    } = req.body
    let quiz = await quizUtils.unpublishQuiz(quizId)
    return res.send(quiz)
  }catch(error){
    // console.log(error)
    return res.status(500).send(error)
  }
}

exports.quizById = async (req, res) =>{
  try{
    const {
      quizId
    } = req.query

    let quiz = await quizUtils.getQuizById(quizId)
    return res.send(quiz)
  }catch(error){
    // console.log(error)
    return res.status(500).send(error)
  }
}

exports.updateQuiz = async (req, res) =>{
  try{
    const {
      quizId,
      updatedInfo
    } = req.body

    let updatedQuiz = await quizUtils.updateQuiz(quizId, updatedInfo)

    return res.send(updatedQuiz)
  }catch(error){
    // console.log(error)
    return res.status(500).send(error)
  }
}

exports.getPopularQuiz = async (req, res) =>{
  try{
    let quiz = await quizUtils.findMostPlayedQuiz()
    res.send(quiz)
  }
  catch(error){
    // console.log(error)
    return res.status(500).send(error)
  }
}

exports.getPopularQuiz2 = async (req, res) =>{
  try{
    let quiz = await quizUtils.findMostPlayedQuizList()
    res.send(quiz)
  }
  catch(error){
    // console.log(error)
    return res.status(500).send(error)
  }
}




