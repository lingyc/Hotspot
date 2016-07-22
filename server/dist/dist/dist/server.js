'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serverConfig = require('./server-config');

var _serverConfig2 = _interopRequireDefault(_serverConfig);

var _Spots = require('./db/Spots');

var _Spots2 = _interopRequireDefault(_Spots);

var _Users = require('./db/Users');

var _Users2 = _interopRequireDefault(_Users);

var _fbAuth = require('./auth/fbAuth');

var _localAuth = require('./auth/localAuth');

var _localAuth2 = _interopRequireDefault(_localAuth);

var _primaryRoutes = require('./routes/primaryRoutes');

var _primaryRoutes2 = _interopRequireDefault(_primaryRoutes);

var _authRoutes = require('./routes/authRoutes');

var _authRoutes2 = _interopRequireDefault(_authRoutes);

var _apiRoutes = require('./routes/apiRoutes');

var _apiRoutes2 = _interopRequireDefault(_apiRoutes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express2.default)();
var port = process.env.PORT || 8000;

console.log('User', _Users2.default);
// Server and auth configuration
(0, _localAuth2.default)(_Users2.default);
(0, _fbAuth.facebookAuthConfig)(_Users2.default);
(0, _serverConfig2.default)(app, _Users2.default);

// Render the main splash page upon arrival
(0, _primaryRoutes2.default)(app);

// Wire up routes for authentication
(0, _authRoutes2.default)(app);

// RESTFUL routes for retrieving data from the database
(0, _apiRoutes2.default)(app);

// start the server
app.listen(port, function () {
  console.log('server started on port');
});