const validator = require('../utils/validate');

const Quiz = (req, res, next) => {
    const validationRules = {
        "title": "string",
        "description": "string",
        "questions": "required|Array",
        "category_id": "required",
        "games": "Array",
        "is_published": "required|Boolean|default:true",
        "popularity": "Number",
        "total_score": "Number",

    }
    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = { 
    Quiz
}