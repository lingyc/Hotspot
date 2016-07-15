import User from './db/userQueries';
import bcrypt from 'bcrypt-nodejs';
import Promise from 'bluebird';
import passport from 'passport';
import {Strategy} as JwtStrategy from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';

// middleware on protected routes passport.authenticate('jwt', { session: false })
passport.use(new JwtStrategy({
  secretOrKey: 'i like turtles',
  jwtFromRequest: ExtractJwt.fromAuthHeader()},
  function(jwt, done) {

    User.findOne({ id: jwt.sub }).fetch()
    .then((user) => {
      if (user && user.checkPassword(user.attributes.password)) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
  .catch((err) => done(err, false));
}));

const hashPassword = function(user, attrs, options) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(model.attributes.password, salt, null, function(err, hash) {
        model.set('password', hash);
        model.set('salt', salt);
        resolve(hash);
      });
    });
  });

const checkPassword = function(providedPass) {
  const passInTheDB = 'placholder' // TODO fix this
  return new Promise((resolve, reject) => {
    bcrypt.compare(providedPass, passInTheDB, function(err, results) {
      if (err) {
        reject(err);
      }
      if (results) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}
