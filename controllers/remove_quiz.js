const { Quiz } = require("../models/Quiz");
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URI);
const express = require("express");
const router = express.Router();

/**
 * find and remove Quiz from public view
 */

 exports.QuizDelete = async () => {
    router.delete("/Quiz/:_id", async (req, res) => {
      try {
        
        if (is_published === true) {
          const deleteQuestion = await Quiz
            .findOneAndRemove({ _id })
            .exec()
            .then((Quiz) => res.send(`${Quiz.title}removed from public view`));
  
          if ((deleteQuestion.deleteCount = 0)) {
            return res.status(404).json();
          } else {
            return res.status(204).json();
          }
        }
      } catch (error) {
        return res.status(500).json({ error: error });
      }
    });
  };
  