const express = require('express')
const router = express.Router()
const  {check, validationResult} = require('express-validator/check')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const myUser = require('../models/myUser')

router.get(
        "/signup",

        [
            check("username", "Please Enter a Valid Username")
            .not()
            .isEmpty(),
            check("email", "Please enter a valid email").isEmail(),
            check("password", "Please enter a valid password").isLength({
                min: 6
            })
        ],
   
        async(req, res)=>{

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array()
                })
            }

            const {
                username,email,password
            } = req.body;

            console.log(req.body.username)

            try{
                // let myuser = await myUser.findOne({
                //     email
                // });

                // if(myuser){
                //     return res.status(400).json({
                //         msg: "User Already Exists"
                //     });
                // }

              let myuser = new myUser({
                    username,
                    email, 
                    password
                });

                console.log(req.body)

                await myuser.save();

                const payload = {
                    myuser: {
                        id: myuser.id
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
                console.log(e.message)
                res.status(500).send("Error in Saving")
            }
        }
    );

module.exports = router;