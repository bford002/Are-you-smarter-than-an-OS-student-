const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
 

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const User = require('./db/models/user.model.js');

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.CLIENT_URL}:${process.env.PORT}/auth/google/callback`,
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
