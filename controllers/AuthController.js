const User = require('../models/User')


var express = require('express')
var mongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"

mongoClient.connect(url, function (err, db) {
    if(err){
        console.log("ERROR: ",err)
    }

    const dbname = db.db('aca_tsq')

    let user = new User({
        email: "montso.mat",
        role : "player",
        status: "offline",
        profile : {
            name: {
                firstname: "Mat",
                lastname : "hrdy"
            },

            gender : "Male"
        }

    });

    dbname.collection("User").insertOne(user, function (err, res) {
        if(err) throw err
        console.log("SUCCESS", err)
        db.close()
    })
})


const  register = (req, res, next) =>{

        let user = new User({
            email: req.body.email,
            role : req.body.role,
            status: req.body.status,
            profile : {
                name: {
                    firstname: req.body.firstname,
                    lastname : req.body.lastname
                },

                gender : req.body.gender
            }

        });

    user.save()
        .then(user => {
            res.json({
                message : "Registration Suceessfull"
            })
            console.log(res)
        }).catch(error => {
            res.json({
                message: "Registration not successfull"
            })
        console.log(res)
    })


}
module.exports = {
    register
}