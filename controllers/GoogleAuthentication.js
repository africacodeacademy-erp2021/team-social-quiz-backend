const { request, response } = require('express');
const express = require('express');
const app = express();
const session = require('express-session');
const User = require('../models/User');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

app.set('view engine', 'ejs');
exports.getGoogleUsers = async (request, response) =>{ 


    dotenv.config({
        path: ".env"
      });

    app.use(session({ 
        resave: false,
        saveUninitialized: false,
        secret: 'keyboad cat',
        cookie: {
            httpOnly:true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        }
    }));
    const isAuth = (request, response, next) => {
        if(request.user){
            next();
        }else{
            response.redirect('/login');
        }
    }
    app.get('/dashboard', isAuth, (request, response) => 
        response.send(userProfile)
    );
    app.get('/', function(request, response){
        if(request.user){
            return response.redirect('/')
        }
         response.render('pages/login'); 
    });
    
    
    const passport = require('passport');
    var userProfile;
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.set('view engine', 'ejs');
    
    
    app.get('/error', (request, response) => response.send("error looging in"));
    
    passport.serializeUser(function(user, cb){
        cb(null, user);
    });
    
    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });
    
    
    /* Google AUTH START HERE */
    
    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        uri: process.env.DATABASE_URI,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        try{
            const user = await User.findOne({googleid: profile.id});
            if(user){
                return done(null, user);
            }else{
                const newUser = new User({
                    email: profile.email,
                    name: profile.displayName,
                    googleid: profile.id,
                    channel: profile.channel,
                });
                const savedUser = await newUser.save();
                done(null, savedUser); 
            }
        }catch(error){
            done(error)
        }
         console.log('accessToken: ', accessToken);
         console.log('refreshToken: ', refreshToken);
    }
    ));
    
    app.get('/auth/google',  
        passport.authenticate('google', {scope: ['googleid', 'email','displayName', 'channel'], 
        accessToken: 'offline', prompt: 'consent'
    }));
    app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/', failureRedirect: '/login'})
    )
    
}
