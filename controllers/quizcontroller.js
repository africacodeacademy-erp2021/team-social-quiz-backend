const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");
}

const quizSchema = new mongoose.Schema({
  published_state:{
  type: String,  
  required:[true,'Published State required'] 
  }, 
  popularity:{
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

Quiz.path("questions_id").validate(function (value) {
  this.model("Quiz").count({ questions_id: value }, function (error, count) {
    if (error) {
       console.log(error);  
      return error;
     
    }
    else{
        Quiz.save();
    }
  });
});

