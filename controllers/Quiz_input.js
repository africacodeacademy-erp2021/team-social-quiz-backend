const { Quiz } = require("../models/Quiz");

module.exports = {
 
    Quiz: (req, res) => {
        const { title, description, questions, category_id, games,is_published,popularity,total_score} = req.body;
        const newUserObj = { title, description, questions, category_id, games,is_published,popularity,total_score};
        const newUser = new User(newUserObj);
        newUser.save((saveErr) => {
            if(saveErr) {
                return res.status(412).send({
                    success: false,
                    message: saveErr
                })
            }
            return res.status(200).json({
                success: true,
                message: " successfully saved quiz"
            });
        });   
    }
}