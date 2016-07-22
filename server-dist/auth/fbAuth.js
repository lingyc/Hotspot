'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.facebookAuthConfig = undefined;

var _passportFacebook = require('passport-facebook');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _serverConfig = require('../server-config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// inLocalEnv() && import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CALLBACK } from '../config/fb';

var FB = {
  APP_ID: process.env.FACEBOOK_APP_ID || 0,
  APP_SECRET: process.env.FACEBOOK_APP_SECRET || 0,
  CALLBACK: process.env.PORT ? 'http://localhost:' + process.env.PORT + '/auth/facebook/callback' : 'http://localhost:8000/auth/facebook/callback'
};
console.log(FB);
var facebookAuthConfig = exports.facebookAuthConfig = function facebookAuthConfig(User) {
  _passport2.default.use(new _passportFacebook.Strategy({
    clientID: FB.APP_ID,
    clientSecret: FB.APP_SECRET,
    callbackURL: FB.CALLBACK,
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