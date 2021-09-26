const { Quiz } = require("../models/Quiz");
const express = require("express");
const router = express.Router();

exports.Quiz = async () => {
  /**
   * find Quiz, set its published status to true and return the updated quiz.
   */

  router.get("/Quiz", async (req, res) => {
    try {
      const { title } = req.body;
      const QuizToPublish = await quizzes
        .findByIdAndUpdate(_id, { $set: { is_published: true } })
        .exec();

      QuizToPublish.title = title;

      await QuizToPublish.save();

      return res.status(200).json(QuizToPublish);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });
};
