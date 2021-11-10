const express = require('express');
const router = express.Router();
const  {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const authUtils = require("../utils/authUtils");

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

        let userToken = await authUtils.generateAccessToken() 
        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          "randomString",
          
          (err) => {
            if (err) throw err;
            res.status(200).json({
              userToken
            });
          }
        );
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
  );

module.exports = router;