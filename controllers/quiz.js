const { getPlatformUsers } = require("../utils/quizUtils");

exports.createQuiz = async (req, res) => {
  try {
    const existingQuiz = await User.findOne({
      title: req.body.title,
    }).lean(true);
    if (existingQuiz) {
      res.status(403);
      return res.json(errorFunction(true, "Quiz of that title already exists"));
    } else {
      const newQuiz = await Quiz.create({
        title: req.body.title,
        description: req.body.description,
        questions: req.body.questions,
        category_id: req.body.category_id,
        games: req.body.games,
        is_published: req.body.is_published,
        popularity: req.body.popularity,
        total_score: req.body.total_score,
      });
      if (newQuiz) {
        res.status(201);
        console.log("Quiz succefully created");
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
  try{
    let quiz = await Quiz.findOne(req.body.title);
    if (!quiz) {
     throw new Error('Quiz not found');
    }
  else{
    return res.send(quiz)
  }
}catch(error){
  return res.sendStatus(500)
}
  
   }
