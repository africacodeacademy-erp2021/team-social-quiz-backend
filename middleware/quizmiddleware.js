exports.validateQuiz = async (req, res) => {
   try {
      if(!req.body.title.isString()){
         console.error("Value should be only characters");
      }
     else if(!req.body.description.isString()){
         console.error("Value should be only characters");
      }
      else if(!Array.isArray(req.body.questions)){
         console.error("Value should be an array");
      }
      else if(!req.body.category_id.isString()){
         console.error("Value should be only characters");
      }
      else if(!Array.isArray(req.body.games)){
         console.error("Value be an array");
      }
      else if(!req.body.is_published.isBoolean()){
         console.error("Value should be boolean");
      }
      else if(!req.body.popularity.isInteger()){
         console.error("Value should be number");
      }
      else if(!req.body.total_score.isInteger()){
         console.error("Value should be a number");
      }
      else {
       res.send({});
       next();
     }

   } catch (error) {
      return res.sendStatus(500);
    }
   }
