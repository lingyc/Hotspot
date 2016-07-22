'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.facebookAuthConfig = undefined;

var _passportFacebook = require('passport-facebook');

var _fb = require('../config/fb');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var facebookAuthConfig = exports.facebookAuthConfig = function facebookAuthConfig(User) {
  _passport2.default.use(new _passportFacebook.Strategy({
    clientID: _fb.FACEBOOK_APP_ID,
    clientSecret: _fb.FACEBOOK_APP_SECRET,
    callbackURL: _fb.FACEBOOK_CALLBACK,
    enableProof: true,
    profileFields: ['id', 'emails', 'name']
  }, function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return User.findOrCreate({
        name: profile.name.givenName,
        facebookId: profile.id,
        facebookAccessToken: accessToken
      }).then(function (user) {
        return done(null, user);
      }).catch(function (err) {
        return done(err, null);
      });
    });
  }));
};