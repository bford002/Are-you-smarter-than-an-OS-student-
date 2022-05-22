const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const findOrCreate = require('mongoose-findorcreate');

const GOOGLE_CLIENT_ID = '1051270624705-s89er0bcl4kmkdfja68f8fvpugihsa38.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const User = require('./db/models/user.model.js');

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/google/callback',
  passReqToCallback: true
},
(request, accessToken, refreshToken, profile, done) => {
  User.findOrCreate({ name: profile.displayName }, {
    name: profile.displayName,
    username: profile.displayName,
    imageUrl: profile.picture
  }, (err, user) =>{
    return done(err, user);
  });
}
));

passport.serializeUser((user, done)=>{
  done(null, user);
});
passport.deserializeUser((user, done)=>{
  done(null, user);
});
