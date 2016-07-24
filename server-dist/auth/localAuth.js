'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (User) {
  _passport2.default.use('local-signup', new _passportLocal.Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, username, password, done) {
    console.log('sign them up!', username, password);
    if (!req.user) {
      User.findOrCreate({
        username: username,
        password: password
      }).then(function (user) {
        return done(null, user);
      }).catch(function (err) {
        return done(err);
      });
    } else {
      //user exists and is logged in
      done(null, false);
    }
  }));
  //---------------------------local login----------------------------------------
  _passport2.default.use('local-login', new _passportLocal.Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, username, password, done) {
    console.log('checking username', username);
    var foundUser = void 0;
    return User.find({ username: username }).then(function (user) {
      console.log('checking username and password for ', user);
      if (user.length === 0) {
        return [false, user[0]];
      } else {
        foundUser = user[0];
        return User.isValidPassword(password, user[0].id);
      }
    }).then(function (match) {
      console.log('match', match, 'user', foundUser);
      if (match) {
        return done(null, foundUser);
      } else {
        return done(null, false);
      }
    }).catch(function (err) {
      return done(err);
    });
  }));
};

var _passportLocal = require('passport-local');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }