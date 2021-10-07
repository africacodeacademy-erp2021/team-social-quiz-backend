// Module imports

const Quiz = require("../models/Quiz");

/**
 * getPopularQuizzes
 *
 * returns all Popular quizzes
 * @returns Resolved promise with Popular quizzes
 */
exports.getPopularQuizzes = async () => {
  try {
    let popularquizzes = await Quiz.find({}).sort({ popularity: -1 }).exec();
    return Promise.resolve(popularquizzes);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
