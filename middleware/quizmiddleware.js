const mongoose = require("mongoose");
const {check, validationResult} = require('express-validator/check');

const quizSchema = new mongoose.Schema({
    published_state:{
    type: Boolean,  
    required:[true,'Published State required'] 
    }, 
    popularity:{
       type:Number,
       required: [true,'Popularity required'] 
    },
    category_id:{
      type:String,
      required: [true,'Popularity required'] 
   },
    questions_id: {
      type: String,
      unique: true,
      required: [true,'Questions ID required'] 
    },
  });
  
  const Quiz = mongoose.model('Quiz', quizSchema);
  const quiz=new Quiz();
  
  quiz.pre('save',function (next) {
      
   
     if(!this.published_state.isBoolean()){
        console.error("Value not boolean");
     }
    else if(!this.popularity.isInteger()){
        console.error("Value not a number");
     }
     else if(!this.category_id.isString()){
        console.error("Value not characters");
     }
     else if(!this.questions_id.isString()){
        console.error("Value not characters");
     }
     else {
      res.send({});
      next();
    }
  });