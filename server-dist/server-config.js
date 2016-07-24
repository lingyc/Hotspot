'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app, User) {
  app.engine('hbs', (0, _expressHandlebars2.default)({
    extname: 'hbs',
    defaultLayout: 'splash',
    layoutsDir: _path2.default.join(__dirname, './views/templates/'),
    partialsDir: _path2.default.join(__dirname, './views/partials/')
  }));
  app.set('views', _path2.default.join(__dirname, './views'));
  app.set('view engine', 'hbs');

  _passport2.default.serializeUser(function (user, done) {
    var userId = void 0;
    console.log('serialize user', user);
    if (Array.isArray(user)) {
      userId = user[0].id;
    } else {
      userId = user.id;
    }
    return done(null, userId);
  });

  _passport2.default.deserializeUser(function (id, done) {
    console.log('deserialize');
    return User.find({ id: id }).then(function (user) {
      return done(null, user[0]);
    }).catch(function (err) {
      return done(err, null);
    });
  });

  app.use(_bodyParser2.default.urlencoded({
    extended: true
  }));
  app.use(_bodyParser2.default.json());

  // STATIC DIRECTORIES
  app.use(_express2.default.static(_path2.default.join(__dirname, '/../compiled')));
  app.use(_express2.default.static(_path2.default.join(__dirname, '/../index.html')));
  app.use(_express2.default.static(_path2.default.join(__dirname, '/../node_modules')));
  app.use(_express2.default.static(_path2.default.join(__dirname, '/../Client/')));
  app.use(_express2.default.static(_path2.default.join(__dirname, './views')));

  app.use((0, _expressSession2.default)({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true
  }));
  app.use(_passport2.default.initialize());
  app.use(_passport2.default.session());
};

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }