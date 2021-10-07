const { Role } = require("../utils/Constants");

exports.ChangeUserRole = async (res, req) => {
  try {
    Role.PLAYER === player;
    if (Role.PLAYER) {
      const userRole = users
        .findByIdAndUpdate(_id, { $set: { role: Role.ADMIN } })
        .exec();
      return res.status(200).json(userRole);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
