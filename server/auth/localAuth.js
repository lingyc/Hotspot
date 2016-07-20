import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

//---------------------------Local Strategy-------------------------------------
export default localConfig = function(User) {
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, username, password, done) {
    process.nextTick(function() {
      if (!req.user) {
        findOrCreateUser({username: username})
          .then((user) => {
            return done(null, user);
          })
          .catch((err) => done(err));
      } else {
        //user exists and is logged in
        done(null, null);
      }
    });
  }));
  //---------------------------local login----------------------------------------
  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, username, password, done) {
    User.findUser({username: username})
      .then((user) => {
        if (user.length === 0 || !User.validPassword(password)) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      })
      .catch((err) => done(err));
  }));

};
