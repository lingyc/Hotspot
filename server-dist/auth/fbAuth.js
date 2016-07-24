'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.facebookAuthConfig = undefined;

var _passportFacebook = require('passport-facebook');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//change line 4 to import from '../config/fb'
// : 'http://localhost:8000/auth/facebook/callback';

var FB = {
  APP_ID: process.env.FACEBOOK_APP_ID || 0,
  APP_SECRET: process.env.FACEBOOK_APP_SECRET || 0,
  CALLBACK: 'https://hotspot-app.herokuapp.com/auth/facebook/callback'
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