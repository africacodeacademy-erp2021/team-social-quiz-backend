exports.validateQuiz = async (req, res, next) => {
  try {
    if (req.body.title.isString()) {
      next();
    }
    if (req.body.description.isString()) {
      next();
    }
    if (Array.isArray(req.body.questions)) {
      next();
    }
    if (req.body.category_id.isString()) {
      next();
    }
    if (Array.isArray(req.body.games)) {
      next();
    }
    if (req.body.is_published.isBoolean()) {
      next();
    }
    if (req.body.popularity.isInteger()) {
      next();
    }
    if (req.body.total_score.isInteger()) {
      next();
    } else {
      return res.sendStatus(500);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};
