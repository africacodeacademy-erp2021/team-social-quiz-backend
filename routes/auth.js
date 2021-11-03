const express = require('express');
const router = express.Router();
const  {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const auth = require('../middleware/auth');

router.post(
        "/signup",

        [
            check("username", "Please Enter a Valid Username")
            .not()
            .isEmpty(),
            check("email", "Please enter a valid email").isEmail()
            ,
            check("password", "Password requires a min of 8 characters")
            .isLength({
                min: 8
            }),
            check("channel", "Specify the Authentication type").not().isEmpty() 
        ],
   
        async (req, res)=>{

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array()
                })
            }

            const {
                username,
                password,
                email,
                channel
            } = req.body;

            // console.log(req.body.username)

            try{
                let user = await User.findOne({
                    email
                });

                if(user){
                    return res.status(400).json({
                        msg: "User Already Exists"
                    });
                }

              user = new User({
                    username,
                    password,
                    email,
                    channel
                });

                // console.log(req.body)
                
                bcrypt.hash(password, 10, (err, hash) =>{
                    user.password = hash
                    user.save();
                    
                });

                // console.log(user.password)
                

                const payload = {
                    user: {
                        id: user.id
                    }
                };
           

                jwt.sign(payload, "SECRETLY",{
                    expiresIn: 10000
                },
                    (err, token)=>{

                    if(err) throw err;
                    res.status(200).json({
                        token
                    });

                    });
            }catch (e) {
                // console.log(e.message)
                res.status(500).send("Error in Saving")
            }
        }
    );


    router.get("/me", auth, async (req, res) => {
        try {
          // request.user is getting fetched from Middleware after token authentication
          const user = await User.findById(req.user.id);
          res.json(user);
        } catch (e) {
          res.send({ message: "Error in Fetching user" });
        }
      });

module.exports = router;