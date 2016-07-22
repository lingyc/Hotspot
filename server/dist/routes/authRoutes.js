'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  // AUTHENTICATION
  app.route('/login').get(function (req, res) {
    res.render('login', { errMsg: false });
  }).post(_passport2.default.authenticate('local-login', {
    successRedirect: '/spots',
    failureRedirect: '/login'
  }));

  app.route('/signup').get(function (req, res) {
    res.render('signup');
  }).post(_passport2.default.authenticate('local-signup', {
    successRedirect: '/spots',
    failureRedirect: '/signup'
  }));
  // route for facebook authentication and login
  // different scopes while logging in
  app.get('/auth/facebook', _passport2.default.authenticate('facebook', { session: false, scope: 'email' }));

  app.get('/auth/facebook/callback', _passport2.default.authenticate('facebook', { session: false, failureRedirect: '/login' }));

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
  // isAuthenticated,
  console.log(_isAuthenticated2.default);
  // Get all of a user's spots.
  app.get('/spots', _isAuthenticated2.default, function (req, res) {
    console.log('redirected to spots');
    res.sendFile(_path2.default.join(__dirname, '/../../index.html')); // index.html for react app
  });
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _isAuthenticated = require('../auth/isAuthenticated');

var _isAuthenticated2 = _interopRequireDefault(_isAuthenticated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }