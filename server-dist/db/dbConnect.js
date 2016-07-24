'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import spotQueries from './spotQueries';
// import userQueries from './userQueries';
var pgp = require('pg-promise')({
  promiseLib: _bluebird2.default
});

var connectionString = 'postgres://localhost:5432/hotspots';

if (process.env.DATABASE_URL) {
  connectionString = process.env.DATABASE_URL;
}

var pg = pgp(connectionString);

exports.default = pg;