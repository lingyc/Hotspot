// import User from './db/userQueries';
import bcrypt from 'bcrypt-nodejs';
import Promise from 'bluebird';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

export const hashPassword = function(user) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user, password, salt, null, function(err, hash) {
        user.password = hash;
        user.salt = salt;
        resolve(user);
      });
    });
  });

export const checkPassword = function(user, providedPass) {
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
};

export const passportJwtConfig = function () {
  passport.use(new JwtStrategy({
    secretOrKey: 'i like turtles',
    jwtFromRequest: ExtractJwt.fromAuthHeader()},
    function(jwt, done) {
      User.findOne({ id: jwt.sub })
      .then((user) => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
    .catch((err) => done(err, false));
  }));

  export const isAuthenticated = passport.authenticate('jwt', { session : false });
};
