'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  // RESTFUl API for retrieving spots from the db
  app.get('/api/spots', function (req, res) {
    _Spots2.default.getAll().then(function (spots) {
      return (0, _queryHelpers.sendBackJSON)(res, spots, 'got all spots');
    }).catch(function (err) {
      return console.log(err);
    });
  });

  app.get('/api/spots/:id', function (req, res) {
    _Spots2.default.getOne(req.params.id).then(function (spot) {
      return (0, _queryHelpers.sendBackJSON)(res, spots, 'got one spot');
    }).catch(function (err) {
      return console.log(err);
    });
  });

  app.post('/api/spots', function (req, res) {
    _Spots2.default.create(req.body).then(function (result) {
      return (0, _queryHelpers.sendBackJSON)(res, result, 'created new spot');
    }).catch(function (err) {
      return (0, _queryHelpers.sendBackJSON)(res, err, 'error');
    });
  });

  app.put('/api/spots/:id', function (req, res) {
    _Spots2.default.update(req.body).then(function (result) {
      return (0, _queryHelpers.sendBackJSON)(res, result, 'updated a spot');
    }).catch(function (err) {
      return (0, _queryHelpers.sendBackJSON)(res, err, 'error');
    });
  });

  app.delete('/api/spots/:id', function (req, res) {
    _Spots2.default.update(req.body).then(function (result) {
      return (0, _queryHelpers.sendBackJSON)(res, result, 'updated a spot');
    }).catch(function (err) {
      return (0, _queryHelpers.sendBackJSON)(res, err, 'error');
    });
  });
};

var _Spots = require('../db/Spots');

var _Spots2 = _interopRequireDefault(_Spots);

var _queryHelpers = require('../db/queryHelpers');

var _yelpQuery = require('../yelp/yelpQuery');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }