const { getPopularQuizzes } = require("../utils/QuizUtils")

exports.PopularQuizzes = async (req, res) => {

    try {
      let popularquiz = await getPopularQuizzes();

      if(popularquiz.length > 0 ){
        return res.send(popularquiz)
   }else{
       return res.status(204).send(popularquiz)
   }

    } catch (error) {
        console.log(error);
      return res.status(500).json({ error: error });
    }


};
