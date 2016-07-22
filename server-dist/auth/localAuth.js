'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
//---------------------------Local Strategy-------------------------------------


exports.default = function (User) {
  _passport2.default.use('local-signup', new _passportLocal.Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, username, password, done) {
    console.log('sign them up!');
    process.nextTick(function () {
      if (!req.user) {
        User.findOrCreate({
          username: username,
          password: password
        }).then(function (user) {
          return done(null, user[0]);
        }).catch(function (err) {
          return done(err);
        });
      } else {
        //user exists and is logged in
        done(null, false);
      }
    });
  }));
  //---------------------------local login----------------------------------------
  _passport2.default.use('local-login', new _passportLocal.Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, username, password, done) {
    return User.find({ username: username }).then(function (user) {
      console.log('checking username and password');
      if (user.length === 0) {
        return done(null, false);
      }
      return [User.isValidPassword(password, user[0].id), user];
    }).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var match = _ref2[0];
      var user = _ref2[1];

      if (match) {
        return done(null, user);
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

var _inLocalEnv = require('../config-public/inLocalEnv');

var _inLocalEnv2 = _interopRequireDefault(_inLocalEnv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }