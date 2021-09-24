const { request, response } = require('express');
const express = require('express');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));

/*PASSPORT SETUP START HERE */

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
const GOOGLE_CLIENT_ID = '508493746175-o70vhl81a3mthr36gavt940v6emsr2ra.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET ='PqFbuDz_y6U4bOuJagum9Xu5';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, profile, done){
    userProfile=profile;
    return done(null, userProfile);
}
));

app.get('/auth/google',
    passport.authenticate('google', {scope: ['profile', 'emails']}));

app.get('/auth/google/callback',
passport.authenticate('google', {failureRedirect: '/error'}),
function(request, response){
    //Successful authenticate, redirect success.
    response.redirect('/dashboard');
})

