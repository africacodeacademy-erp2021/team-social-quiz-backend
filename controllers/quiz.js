const bodyParser = require("body-parser");

// Module imports
const Quiz = require("../models/Quiz");

const { getPlatformQuiz } = require("../utils/quizUtils");



exports.getOneQuiz = async (req, res) => {
  try {
    let quiz = await Quiz.find({_id: req.body._id }).lean(true).exec();
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

