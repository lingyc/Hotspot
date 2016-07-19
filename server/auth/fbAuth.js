import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CALLBACK } from '../config/fb';

export const facebookAuthConfig = function(findUser, createUser) {
  passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: FACEBOOK_CALLBACK,
    enableProof: true,
    profileFields: ['id', 'emails', 'name']
  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      return findUser({facebookId: profile.id})
      .then((user) => {
        if (user.length > 0) {
          return user;
        } else {
          return createUser({
            facebookId: parseInt(profile.id),
            facebookAccessToken: accessToken,
            email: profile.emails[0].value, 
            name: `${profile.name.givenName} ${profile.name.familyName}`
          });
        }
      })
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
    });
  }
  ));
};
