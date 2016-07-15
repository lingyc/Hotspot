import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CALLBACK } from './auth/fb';

export const facebookAuthConfig = function(findUser, createUser) {
  passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: FACEBOOK_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    findUser({})
    
    createUser({
      facebookId: profile.id,
      facebookAccessToken: accessToken,
      email: profile.emails[0].value
    })
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
  }
));
};
