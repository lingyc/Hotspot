import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
//---------------------------Local Strategy-------------------------------------
export default function(db) {
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, username, password, done) {
    console.log('sign them up!');
    process.nextTick(function() {
      if (!req.user) {
        db.findOrCreateUser({
          username: username,
          password: password
        })
          .then((user) => {
            console.log('user to be returned', user);
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
    return db.findUser({username: username})
      .then((user) => {
        console.log('got back', user);
        if (!user || !db.isValidPassword(password, user.id)) {
          console.log('bad password');
          return done(null, false);
        } else {
          console.log('moving onto the next thing');
          return done(null, user);
        }
      })
      .catch((err) => done(err));
  }));
}
