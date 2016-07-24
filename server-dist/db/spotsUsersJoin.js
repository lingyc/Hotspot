'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

var _dbConnect = require('./dbConnect');

var _dbConnect2 = _interopRequireDefault(_dbConnect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var spotUserSchema = {
  columns: {
    userId: 'number',
    spotId: 'number'
  },
  tableName: 'spots_users'
};

var SpotsUsers = new _queries2.default(_dbConnect2.default, spotUserSchema);

exports.default = SpotsUsers;