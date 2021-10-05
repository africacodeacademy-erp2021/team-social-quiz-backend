const bodyParser = require("body-parser");

// Module imports
const Quiz = require("../models/Quiz");

const { getPlatformQuiz } = require("../utils/quizUtils");


exports.getOneQ = async (req, res) => {
  try {
      let quiz = await Quiz.find({ title: req.body.title }).exec();
  
      if (quiz.length === 0) {
        return res.send("Quiz not found");
      } else {
        let Qs = await Quiz.find(
          { title: req.body.title },
          { questions: 1 }
        ).exec();
        return res.send(Qs);
      }
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
};
