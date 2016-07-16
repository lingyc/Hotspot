'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serverConfig = require('./server-config');

var _serverConfig2 = _interopRequireDefault(_serverConfig);

var _spotQueries = require('./db/spotQueries');

var _spotQueries2 = _interopRequireDefault(_spotQueries);

var _userQueries = require('./db/userQueries');

var _userQueries2 = _interopRequireDefault(_userQueries);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 8000;

(0, _serverConfig2.default)(app, _express2.default, _auth.passportJwtConfig);

// Render the main splash page upon arrival
app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, './server-test-views/splash.html'));
});

// Route to signup page
app.get('/signup', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, './server-test-views/signup.html'));
});

// create new users
app.post('/signup', function (req, res) {
  // do server-side check of inputs

  // hash the password, store the user, redirect to /spots
  _userQueries2.default.hashPassword(req.body.password).then(function (userToStore) {
    return _userQueries2.default.createUser(userToStore);
  }).then(function (results) {
    return res.redirect('/spots');
  }).catch(function (err) {
    return res.send('error!');
  });
});

// Navigate to login
app.get('/login', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, './server-test-views/login.html'));
});

app.post('/login', _auth2.default.isAuthenticated(), function (req, res) {
  res.redirect('/spots');
});

// Get all of a user's spots.
app.get('/spots', function (req, res) {
  res.render('spots');
});

// Log users out

// RESTFUl API for retrieving spots from the db
app.get('/api/spots', _spotQueries2.default.getAllSpots);
app.get('/api/spots/:id', _spotQueries2.default.getSingleSpot);
app.post('/api/spots', _spotQueries2.default.createSpot);
app.put('/api/spots/:id', _spotQueries2.default.updateSpot);
app.delete('/api/spots/:id', _spotQueries2.default.removeSpot);

app.listen(port, function () {
  console.log('server started on port');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9zZXJ2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBR0EsSUFBTSxNQUFNLHdCQUFaO0FBQ0EsSUFBTSxPQUFPLFFBQVEsR0FBUixDQUFZLElBQVosSUFBb0IsSUFBakM7O0FBRUEsNEJBQWEsR0FBYjs7QUFFQTtBQUNBLElBQUksR0FBSixDQUFRLEdBQVIsRUFBYSxVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQWM7QUFDekIsTUFBSSxRQUFKLENBQWEsZUFBSyxJQUFMLENBQVUsU0FBVixFQUFxQixpQ0FBckIsQ0FBYjtBQUNELENBRkQ7O0FBSUE7QUFDQSxJQUFJLEdBQUosQ0FBUSxTQUFSLEVBQW1CLFVBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUI7QUFDcEMsTUFBSSxRQUFKLENBQWEsZUFBSyxJQUFMLENBQVUsU0FBVixFQUFxQixpQ0FBckIsQ0FBYjtBQUNELENBRkQ7O0FBSUE7QUFDQSxJQUFJLElBQUosQ0FBUyxTQUFULEVBQW9CLFVBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUI7QUFDckM7O0FBRUE7QUFDQSx3QkFBSyxZQUFMLENBQWtCLElBQUksSUFBSixDQUFTLFFBQTNCLEVBQ0csSUFESCxDQUNRLFVBQUMsV0FBRDtBQUFBLFdBQWlCLHNCQUFLLFVBQUwsQ0FBZ0IsV0FBaEIsQ0FBakI7QUFBQSxHQURSLEVBRUcsSUFGSCxDQUVRLFVBQUMsT0FBRDtBQUFBLFdBQWEsSUFBSSxRQUFKLENBQWEsUUFBYixDQUFiO0FBQUEsR0FGUixFQUdHLEtBSEgsQ0FHUyxVQUFDLEdBQUQ7QUFBQSxXQUFTLElBQUksSUFBSixDQUFTLFFBQVQsQ0FBVDtBQUFBLEdBSFQ7QUFLRCxDQVREOztBQVdBO0FBQ0EsSUFBSSxHQUFKLENBQVEsUUFBUixFQUFrQixVQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CO0FBQ25DLE1BQUksUUFBSixDQUFhLGVBQUssSUFBTCxDQUFVLFNBQVYsRUFBcUIsZ0NBQXJCLENBQWI7QUFDRCxDQUZEOztBQUlBLElBQUksSUFBSixDQUFTLFFBQVQsRUFBbUIsZUFBSyxlQUFMLEVBQW5CLEVBQTJDLFVBQUMsR0FBRCxFQUFNLEdBQU4sRUFBYztBQUN2RCxNQUFJLFFBQUosQ0FBYSxRQUFiO0FBQ0QsQ0FGRDs7QUFJQTtBQUNBLElBQUksR0FBSixDQUFRLFFBQVIsRUFBa0IsVUFBUyxHQUFULEVBQWMsR0FBZCxFQUFtQjtBQUNuQyxNQUFJLE1BQUosQ0FBVyxPQUFYO0FBQ0QsQ0FGRDs7QUFLQTs7QUFFQTtBQUNBLElBQUksR0FBSixDQUFRLFlBQVIsRUFBc0Isc0JBQUssV0FBM0I7QUFDQSxJQUFJLEdBQUosQ0FBUSxnQkFBUixFQUEwQixzQkFBSyxhQUEvQjtBQUNBLElBQUksSUFBSixDQUFTLFlBQVQsRUFBdUIsc0JBQUssVUFBNUI7QUFDQSxJQUFJLEdBQUosQ0FBUSxnQkFBUixFQUEwQixzQkFBSyxVQUEvQjtBQUNBLElBQUksTUFBSixDQUFXLGdCQUFYLEVBQTZCLHNCQUFLLFVBQWxDOztBQUdBLElBQUksTUFBSixDQUFXLElBQVgsRUFBaUIsWUFBTTtBQUNyQixVQUFRLEdBQVIsQ0FBWSx3QkFBWjtBQUNELENBRkQiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBzZXJ2ZXJDb25maWcgZnJvbSAnLi9zZXJ2ZXItY29uZmlnJztcbmltcG9ydCBTcG90IGZyb20gJy4vZGIvc3BvdFF1ZXJpZXMnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi9kYi91c2VyUXVlcmllcyc7XG5pbXBvcnQgcGFzc3BvcnQgZnJvbSAncGFzc3BvcnQnO1xuaW1wb3J0IHsgcGFzc3BvcnRKd3RDb25maWcgfSBmcm9tICcuL2F1dGgnO1xuaW1wb3J0IGF1dGggZnJvbSAnLi9hdXRoJztcblxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgODAwMDtcblxuc2VydmVyQ29uZmlnKGFwcCwgZXhwcmVzcywgcGFzc3BvcnRKd3RDb25maWcpO1xuXG4vLyBSZW5kZXIgdGhlIG1haW4gc3BsYXNoIHBhZ2UgdXBvbiBhcnJpdmFsXG5hcHAuZ2V0KCcvJywgKHJlcSwgcmVzKSA9PiB7XG4gIHJlcy5zZW5kRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zZXJ2ZXItdGVzdC12aWV3cy9zcGxhc2guaHRtbCcpKTtcbn0pO1xuXG4vLyBSb3V0ZSB0byBzaWdudXAgcGFnZVxuYXBwLmdldCgnL3NpZ251cCcsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gIHJlcy5zZW5kRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zZXJ2ZXItdGVzdC12aWV3cy9zaWdudXAuaHRtbCcpKTtcbn0pO1xuXG4vLyBjcmVhdGUgbmV3IHVzZXJzXG5hcHAucG9zdCgnL3NpZ251cCcsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gIC8vIGRvIHNlcnZlci1zaWRlIGNoZWNrIG9mIGlucHV0c1xuXG4gIC8vIGhhc2ggdGhlIHBhc3N3b3JkLCBzdG9yZSB0aGUgdXNlciwgcmVkaXJlY3QgdG8gL3Nwb3RzXG4gIFVzZXIuaGFzaFBhc3N3b3JkKHJlcS5ib2R5LnBhc3N3b3JkKVxuICAgIC50aGVuKCh1c2VyVG9TdG9yZSkgPT4gVXNlci5jcmVhdGVVc2VyKHVzZXJUb1N0b3JlKSlcbiAgICAudGhlbigocmVzdWx0cykgPT4gcmVzLnJlZGlyZWN0KCcvc3BvdHMnKSlcbiAgICAuY2F0Y2goKGVycikgPT4gcmVzLnNlbmQoJ2Vycm9yIScpKTtcblxufSk7XG5cbi8vIE5hdmlnYXRlIHRvIGxvZ2luXG5hcHAuZ2V0KCcvbG9naW4nLCBmdW5jdGlvbihyZXEsIHJlcykge1xuICByZXMuc2VuZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc2VydmVyLXRlc3Qtdmlld3MvbG9naW4uaHRtbCcpKTtcbn0pO1xuXG5hcHAucG9zdCgnL2xvZ2luJywgYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSwgKHJlcSwgcmVzKSA9PiB7XG4gIHJlcy5yZWRpcmVjdCgnL3Nwb3RzJyk7XG59KTtcblxuLy8gR2V0IGFsbCBvZiBhIHVzZXIncyBzcG90cy5cbmFwcC5nZXQoJy9zcG90cycsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gIHJlcy5yZW5kZXIoJ3Nwb3RzJyk7XG59KTtcblxuXG4vLyBMb2cgdXNlcnMgb3V0XG5cbi8vIFJFU1RGVWwgQVBJIGZvciByZXRyaWV2aW5nIHNwb3RzIGZyb20gdGhlIGRiXG5hcHAuZ2V0KCcvYXBpL3Nwb3RzJywgU3BvdC5nZXRBbGxTcG90cyk7XG5hcHAuZ2V0KCcvYXBpL3Nwb3RzLzppZCcsIFNwb3QuZ2V0U2luZ2xlU3BvdCk7XG5hcHAucG9zdCgnL2FwaS9zcG90cycsIFNwb3QuY3JlYXRlU3BvdCk7XG5hcHAucHV0KCcvYXBpL3Nwb3RzLzppZCcsIFNwb3QudXBkYXRlU3BvdCk7XG5hcHAuZGVsZXRlKCcvYXBpL3Nwb3RzLzppZCcsIFNwb3QucmVtb3ZlU3BvdCk7XG5cblxuYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdzZXJ2ZXIgc3RhcnRlZCBvbiBwb3J0Jyk7XG59KTtcbiJdfQ==