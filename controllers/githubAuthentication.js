const express = require('express');
const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const session = require('express-session');
const User = require('../models/User');
const dotenv = require("dotenv");
const app = express();

exports.getGithubUsers = async (request, response) =>{


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

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, cb){
    cb(null, user.id);
})
passport.deserializeUser(function (id, cb){
    cb(null, id);
})
passport.use(
    new GitHubStrategy(
 {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
      try{
          const user = await User.findOne({githubid: profile.id});
          if(user){
              return done(null, user);
          }else{
              const newUser = new User({
                  email: profile.emails,
                  name: profile.displayName,
                  githubid: profile.id,
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
const isAuth = (request, response, next) => {
    if(request.user){
        next();
    }else{
        response.redirect('/login');
    }
}
app.get('/', isAuth, (request, response) => {
    response.send('dashboard');
});

app.get('/', (request, response) => {
    if(request.user){
        return response.redirect('/')
    }
    response.send('login');
});

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }); 

}


