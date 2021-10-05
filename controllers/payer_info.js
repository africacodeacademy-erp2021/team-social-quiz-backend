const { User } = require("../models/User");

/**
 * Get User information
 */
exports.GetUserDetails = async () => {
  router.get("/User", async (req, res) => {
    try {
      const { name } = req.body;
      User.findOne({ name: name }, function (err, users) {});
      await User.findOne(
        { name: name },
        "lastname email _id role status gender"
      ).exec();
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  });
};
