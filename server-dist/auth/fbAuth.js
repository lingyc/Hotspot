'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.facebookAuthConfig = undefined;

var _passportFacebook = require('passport-facebook');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _inLocalEnv = require('../config-public/inLocalEnv');

var _inLocalEnv2 = _interopRequireDefault(_inLocalEnv);

var _fb = require('../config-public/fb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } from '../config/fb';

//change line 4 to import from '../config/fb'
var cb = 'https://hotspot-app.herokuapp.com:' + process.env.PORT + '/auth/facebook/callback';
// : 'http://localhost:8000/auth/facebook/callback';
var FB = {
  APP_ID: _fb.FACEBOOK_APP_ID || process.env.FACEBOOK_APP_ID || 0,
  APP_SECRET: _fb.FACEBOOK_APP_SECRET || process.env.FACEBOOK_APP_SECRET || 0,
  CALLBACK: cb
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
        console.log('got it!');
        return done(null, user);
      }).catch(function (err) {
        return done(err, null);
      });
    });
  }));
};