import { Strategy as FacebookStrategy } from 'passport-facebook';
import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CALLBACK } from '../config/fb';
import passport from 'passport';


const FB = {
  APP_ID: process.env.FACEBOOK_APP_ID || FACEBOOK_APP_ID,
  APP_SECRET: process.env.FACEBOOK_APP_SECRET || FACEBOOK_APP_SECRET,
  CALLBACK: process.env.PORT ? `http://localhost:${process.env.PORT}/auth/facebook/callback` : 'http://localhost:8000/auth/facebook/callback'
};

export const facebookAuthConfig = function(User) {
  passport.use(new FacebookStrategy({
    clientID: FB.APP_ID,
    clientSecret: FB.APP_SECRET,
    callbackURL: FB.CALLBACK,
    enableProof: true,
    profileFields: ['id', 'emails', 'name']
  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      return User.findOrCreate({
        name: profile.name.givenName,
        facebookId: profile.id,
        facebookAccessToken: accessToken
      })
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
    });
  }
  ));
};
