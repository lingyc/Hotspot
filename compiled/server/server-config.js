'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app, express, passportJwtConfig) {
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json());
  app.use(express.static(_path2.default.join(__dirname, '/../build')));
  app.use(express.static(_path2.default.join(__dirname, '/../node_modules')));
  app.use(express.static(_path2.default.join(__dirname, './server-test')));
  app.use(_passport2.default.initialize());
  passportJwtConfig();
};

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9zZXJ2ZXItY29uZmlnLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztrQkFJZSxVQUFTLEdBQVQsRUFBYyxPQUFkLEVBQXVCLGlCQUF2QixFQUEwQztBQUN2RCxNQUFJLEdBQUosQ0FBUSxxQkFBVyxVQUFYLENBQXNCLEVBQUMsVUFBVSxJQUFYLEVBQXRCLENBQVI7QUFDQSxNQUFJLEdBQUosQ0FBUSxxQkFBVyxJQUFYLEVBQVI7QUFDQSxNQUFJLEdBQUosQ0FBUSxRQUFRLE1BQVIsQ0FBZSxlQUFLLElBQUwsQ0FBVSxTQUFWLEVBQXFCLFdBQXJCLENBQWYsQ0FBUjtBQUNBLE1BQUksR0FBSixDQUFRLFFBQVEsTUFBUixDQUFlLGVBQUssSUFBTCxDQUFVLFNBQVYsRUFBcUIsa0JBQXJCLENBQWYsQ0FBUjtBQUNBLE1BQUksR0FBSixDQUFRLFFBQVEsTUFBUixDQUFlLGVBQUssSUFBTCxDQUFVLFNBQVYsRUFBcUIsZUFBckIsQ0FBZixDQUFSO0FBQ0EsTUFBSSxHQUFKLENBQVEsbUJBQVMsVUFBVCxFQUFSO0FBQ0E7QUFDRCxDOztBQVpEOzs7O0FBQ0E7Ozs7QUFDQSIsImZpbGUiOiJzZXJ2ZXItY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgcGFzc3BvcnQgZnJvbSAncGFzc3BvcnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhcHAsIGV4cHJlc3MsIHBhc3Nwb3J0Snd0Q29uZmlnKSB7XG4gIGFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtleHRlbmRlZDogdHJ1ZX0pKTtcbiAgYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XG4gIGFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJy8uLi9idWlsZCcpKSk7XG4gIGFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJy8uLi9ub2RlX21vZHVsZXMnKSkpO1xuICBhcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3NlcnZlci10ZXN0JykpKTtcbiAgYXBwLnVzZShwYXNzcG9ydC5pbml0aWFsaXplKCkpO1xuICBwYXNzcG9ydEp3dENvbmZpZygpO1xufVxuIl19