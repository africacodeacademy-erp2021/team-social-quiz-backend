const { Quiz } = require("../models/Quiz");
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URI);
const express = require("express");
const router = express.Router();

/**
 * find Quiz by id, set its published status to true and return the updated quiz.
 */

exports.QuizPublish = async () => {
  router.put("/Quiz/:_id", async (req, res) => {
    try {
      if (is_published === false) {
        const { title,description,questions,category_id,games,popularity,total_score } = req.body;
        const QuizToPublish = await quizzes
          .findByIdAndUpdate(_id, { $set: { is_published: true } })
          .exec();

        QuizToPublish.title = title;
        QuizToPublish.description = description;
        QuizToPublish.questions = questions;
        QuizToPublish.category_id = category_id;
        QuizToPublish.games = games;
        QuizToPublish.popularity = popularity;
        QuizToPublish.total_score = total_score;

        await QuizToPublish.save();

        return res.status(200).json(QuizToPublish);
      } else {
        return res.status(404).json();
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  });
};
