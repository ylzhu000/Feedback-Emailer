const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys'); // ./ -> current dir ../ -> go to server dir

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
     done(null, user);
  });
});

// Declare new GoogleStrategy
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: "/auth/google/callback",
  proxy: true
},
  (accessToken, refreshToken, profile, done) => {
     // For testing
     /* console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile: ', profile); */
     User.findOne({ googleId: profile.id }).then(existingUser => {
        if(existingUser){
            // Do nothing since user is already exist
            done(null, existingUser);
         } else {
            // Save new user by making a new model
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
         }
      });
    }
  )
);
