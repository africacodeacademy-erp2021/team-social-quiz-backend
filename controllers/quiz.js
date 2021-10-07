const bodyParser = require("body-parser");

// Module imports
const Quiz = require("../models/Quiz");
const Questions = require("../models/Quesrions");

const { getPlatformQuiz } = require("../utils/quizUtils");


exports.getAllQs = async (req, res) => {
  try {
    let quiz = await Quiz.find({_id: req.body._id}).exec();

    if (quiz.length === 0) {
      return res.send("Quiz not found");
    } else {
      let Qs = await Questions.find(
        {_id:quiz.question_id},
        { quiestion_text: 1 }
      ).exec();
      return res.send(Qs);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
