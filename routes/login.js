const express = require('express');
const router = express.Router();
const  {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const User = require('../models/User');

router.post(
    "/login",
    [
        check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
      check("password", "Please enter a valid password").isLength({
        min: 8
      })
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
  
      const { username, password } = req.body;
      try {
        let user = await User.findOne({
          email: username
        });
        
        if (!user)
          return res.status(400).json({
            message: "Sorry!! user not exist"
          });
          const isMatch = await bcrypt.compare(password, user.password);
      

        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });

        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          "randomString",
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token
            });
          }
        );
      } catch (e) {
        // console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
  );

module.exports = router;