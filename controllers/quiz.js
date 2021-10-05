const bodyParser = require("body-parser");

// Module imports
const Quiz = require("../models/Quiz");

const { getPlatformQuiz } = require("../utils/quizUtils");

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndUpdate(
      { title: req.body.title},
      {description: req.body.description,
      questions: req.body.questions,
      category_id: req.body.category_id,
      games: req.body.games,
      is_published: req.body.is_published,
      total_score: req.body.total_score,
      }
    ).exec();
    
    return res.send(quiz);
    
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
