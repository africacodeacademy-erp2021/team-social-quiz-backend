const bodyParser = require("body-parser");

// Module imports
const Quiz = require("../models/Quiz");

const { getPlatformQuiz } = require("../utils/quizUtils");

exports.createQuiz = async (req, res) => {
  try {
    const existingQuiz = await Quiz.findOne({
      title: req.body.title,
    })
      .lean(true)
      .exec();
    if (!existingQuiz) {
      const newQuiz = await Quiz.create({
        title: req.body.title,
        description: req.body.description,
        questions: req.body.questions,
        category_id: req.body.category_id,
        games: req.body.games,
        is_published: req.body.is_published,
        total_score: req.body.total_score,
      });
      if (newQuiz) {
        return res.send(newQuiz);
      }
    } else {
      return res.send("Quiz of that title already exist");
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

