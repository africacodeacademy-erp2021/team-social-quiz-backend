
const  Quiz  = require("../models/Quiz");

exports.RemoveQuiz = async (req, res) => {
    try {

        const QuizToRemove = await Quiz.findOneAndUpdate(
          {_id: req.body._id},
           { is_published: false } ,

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
        return res.status(200).json(QuizToRemove);
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  
};
