const bodyParser = require("body-parser");

// Module imports
const Quiz = require("../models/Quiz");

const { getPlatformQuiz } = require("../utils/quizUtils");


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

