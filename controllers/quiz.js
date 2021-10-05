const bodyParser = require("body-parser");

// Module imports
const Quiz = require("../models/Quiz");

const { getPlatformQuiz } = require("../utils/quizUtils");



exports.getOneQuiz = async (req, res) => {
  try {
    let quiz = await Quiz.find({ title: req.body.title }).lean(true).exec();
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

