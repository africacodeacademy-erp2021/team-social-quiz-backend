const bodyParser = require("body-parser");
const Quiz = require("../models/Quiz")
const Question = require("../models/Question")
const Answer = require("../models/Answers")


exports.submitAnswer =  async (req, res) =>{
    try{
  
      const {
        gameId,
        answer_id,
        question_id,
        quiz_id
      } = req.body
  
      if(!req.body){
        return res.status(400).send({
          message: "Submission Empty"
        })
      }

      let quiz = await Quiz.findOne({
        quiz_id
      })

      let question = await Question.findOne({
        question_id
      })
      
      let answer = await Answer.findOne({
        answer_id
      })

      if(answer.is_correct === true){

        let total_score = question.points + quiz.total_score;

        Quiz.findOneAndUpdate(quiz.id, {
          "total_score": total_score
        }, {useFindAndModify: false})
        .then(data =>{
          if(!data){
            res.status(404).send({
              message: "Error in updating"
            })
          }else{
            //call next question
          }
        })

      }else{
        //call next question

      }
  
    }catch(error){
      console.log(error);
      return res.status(500).send(error);
    }
  }
