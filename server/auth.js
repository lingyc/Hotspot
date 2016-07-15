import db from './db/queries';
import bcrypt from 'bcrypt-nodejs';
import Promise from 'bluebird';
import passport from 'passport';

// middleware on protected routes passport.authenticate('jwt', { session: false })
passport.use(new JwtStrategy({
  secretOrKey: 'keyboard cat',
  jwtFromRequest: ExtractJwt.fromAuthHeader()},
  function(jwt, done) {
    User.where({ id: jwt.sub }).fetch()
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



router.get('/create', ,
  function(req, res) {
    res.render('index');
  });




var express = require('express');
var app = express();
var partials = require('express-partials');
var bodyParser = require('body-parser');
