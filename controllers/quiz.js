// Module imports
const Quiz = require('../models/Quiz');

const { getPlatformQuiz } = require("../utils/quizUtils");

exports.createQuiz = async (req, res) => {
  try {
    const existingQuiz = await Quiz.findOne({
      title: req.body.title,
    })
      .lean(true)
      .exec();
    if (existingQuiz) {
      res.sendStatus(403);
    } else {
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
      } else {
        res.status(403);
        console.log("Quiz not succefully created");
      }
    }
  } catch (error) {
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
    return res.sendStatus(500);
  }
};

exports.getOneQuiz = async (req, res) => {
  try {
    let quiz = await Quiz.findOne(req.body.title);
    if (!quiz) {
      throw new Error("Quiz not found");
    } else {
      return res.send(quiz);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.getAllQs = async (req, res) => {
  try {
    let quiz = await Quiz.findOne(req.body.title);

    if (quiz.questions.length > 0) {
      return res.send(quiz.questions);
    } else {
      return res.status(204);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};
exports.getOneQ = async (req, res) => {
  try {
    let quiz = await Quiz.findOne(req.body.title);

    if (quiz.questions.length > 0) {
      index = Math.floor(Math.random() * questions.length);
      return res.send(quiz.questions[index]);
    } else {
      return res.status(204);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};
exports.updateQuiz = async (req, res) => {
  try {
    let quiz = await Quiz.findOne(req.body.title);

    if (!quiz) {
      throw new Error("Quiz not found");
    } else {
      quiz.updateOne({},
        {
          description: req.body.description,
          questions: req.body.questions,
          category_id: req.body.category_id,
          games: req.body.games,
        }
      );
      return res.send(quiz);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};
