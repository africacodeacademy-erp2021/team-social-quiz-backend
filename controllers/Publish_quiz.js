const { Quiz } = require("../models/Quiz");
const express = require("express");
const router = express.Router();

/**
 * find Quiz by id, set its published status to true and return the updated quiz.
 */

exports.QuizPublish = async (req, res) => {
  
    try {
      let is_published = false;
      if (is_published) {
        const QuizToPublish = await Quiz.findByIdAndUpdate(
          _id,
          { $set: { is_published: true } },

          {
            title: req.body.title,
            description: req.body.description,
            question_id: req.body.question_id,
            category_id: req.body.category_id,
            games: req.body.games,
            is_published: req.body.is_published,
            total_score: req.body.total_score,
          }
        ).exec();

        await QuizToPublish.save();

        return res.status(200).json(QuizToPublish);
      } else {
        return res.status(404).json();
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  
};
