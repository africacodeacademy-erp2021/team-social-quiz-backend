const bodyParser = require("body-parser");
const Quiz = require("../models/Quiz")
const express = require("express")
const router = express.Router()


router.get(
  "/submitAnwser",

  async (req, res) =>{
    try{
  
      const {
        gameId,
        answer,
        question,
        quizId
      } = req.body
  
      if(!req.body){
        return res.status(400).send({
          message: "Submission Empty"
        })
      }

      const quiz_id = quizId;
      

      Quiz.findById(quiz_id).then(data =>{
        if(!data)
        {
          res.status(404).send({
            message: "Quiz not found"
          })
        }else{
          if(answer.is_correct === true){

            res.send({
              message: "Next Question"
            })

          }else{
            let total_score = question.points + data.total_score;
            Quiz.findBiIdAndUpdate(quiz_id,{"total_score": total_score}, {useFindAndModify: false} )
            .then(data =>{
  
              if(!data){
                res.status(404).send({
                  message: "Quiz not found"
                })
              }else{
                res.send({
                  message : "Okay"
                })
              }
            });
          }
        }
      })

      
  
  
  
    }catch(error){
      console.log(error);
      return res.status(500).send(error);
    }
  }

)