'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

var _dbConnect = require('./dbConnect');

var _dbConnect2 = _interopRequireDefault(_dbConnect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var spotSchema = {
  columns: {
    name: 'string',
    rating: 'number',
    latitude: 'number',
    longitude: 'number',
    yelp_id: 'string'
  },
  tableName: 'spots'
};

var Spot = new _queries2.default(_dbConnect2.default, spotSchema);

exports.default = Spot;