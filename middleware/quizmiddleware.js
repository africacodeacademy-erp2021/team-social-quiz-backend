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
  
  quiz.pre('save',[
    check('published_state', 'published state should be a boolean').not().isEmpty().isBoolean(),
    check('popularity', 'popularity should be a number').not().isEmpty().isInt(),
    check('category_id', 'category id should be a string').not().isEmpty().isString(),
    check('questions_id', 'questions id should be a string').not().isEmpty().isString(),
  ],
   function (req, res) {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      res.send({});
    }
  });