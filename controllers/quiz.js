const bodyParser = require("body-parser");

// Module imports
const Quiz = require("../models/Quiz");

const quizUtils = require("../utils/quizUtils");
const questionUtils = require("../utils/questionUtils");
const { ObjectId } = require("mongodb");
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
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.getAllQuiz = async (req, res) => {
  try {
    let quizList = await quizUtils.getPlatformQuiz();

    if (quizList.length > 0) {
      return res.send(quizList);
    } else {
      return res.status(204).send(quizList);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};




