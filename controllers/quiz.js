const bodyParser = require("body-parser");

// Module imports
const Quiz = require("../models/Quiz");

const { getOnePlatformQuiz } = require("../utils/quizUtils");



exports.getOneQuiz = async (req, res) => {
  try {
    let quiz = await getOnePlatformQuiz(req.body._id);
    if (quiz.length === 0) {
      return res.send("Quiz not found");
    } else {
      return res.send(quiz);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

