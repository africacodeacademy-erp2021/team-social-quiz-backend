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

exports.getAllQuiz = async (req, res) => {
  try {
    let quizList = await getPlatformQuiz();

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

exports.getOneQuiz = async (req, res) => {
  try {
   
    let quiz = await Quiz.find({ _id: req.body._id }).lean(true).exec();
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

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndUpdate(
      {_id: req.body._id },
      {title: req.body.title,
        description: req.body.description,
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
