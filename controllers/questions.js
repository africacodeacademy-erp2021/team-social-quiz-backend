const bodyParser = require("body-parser");

// Module imports

const quizUtils = require("../utils/QuizUtils");
const questionUtils = require("../utils/QuestionUtils");
const { ObjectId } = require("mongodb");


exports.getQuizQuestions = async (req, res) => {
  try {
    const {quizId} = req.query

    let questionsList = await questionUtils.getQuizQuestions(quizId);

    if (questionsList.length > 0) {
      return res.send(questionsList);
    } else {
      return res.status(204).send(questionsList);
    }
  } catch (error) {
    // console.log(error);
    return res.sendStatus(500);
  }
};





