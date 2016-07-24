'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  // RESTFUl API for retrieving spots from the db
  app.get('/api/spots', function (req, res) {
    var spotsReturn = void 0;
    console.log('user', req.user);
    _Spots2.default.getAll().then(function (spots) {
      if (spots.length === 0) {
        return (0, _queryHelpers.sendBackJSON)(res, null, 'no spots');
      }
      spotsReturn = spots;
      return (0, _yelpQuery.requestMultipleYelp)(spots.map(function (spot) {
        return spot.yelp_id;
      }));
    }).then(function (yelpResults) {
      console.log('yelpresults looking for busid location', yelpResults);
      return spotsReturn.map(function (spot) {
        var match = yelpResults.filter(function (result) {
          return result.businessId === spot.yelp_id;
        });
        spot.yelpData = match[0];
        return spot;
      });
    }).then(function (augmentedSpots) {
      return (0, _queryHelpers.sendBackJSON)(res, augmentedSpots, 'got all spots');
    }).catch(function (err) {
      return console.log(err);
    });
  });

  app.get('/api/spots/:id', function (req, res) {
    _Spots2.default.getOne(req.params.id).then(function (spot) {
      return (0, _queryHelpers.sendBackJSON)(res, spot, 'got one spot');
    }).catch(function (err) {
      return console.log(err);
    });
  });

  app.post('/api/spots', function (req, res) {
    _Spots2.default.create(req.body).then(function (spot) {
      console.log('insert spot ', spot[0], 'with user id', req.user);
      return _spotsUsersJoin2.default.create({ userId: req.user.id, spotId: spot[0].id });
    }).then(function (spotuser) {
      return (0, _queryHelpers.sendBackJSON)(res, req.body, 'created new spot');
    }).catch(function (err) {
      console.log(err);
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

var _spotsUsersJoin = require('../db/spotsUsersJoin');

var _spotsUsersJoin2 = _interopRequireDefault(_spotsUsersJoin);

var _queryHelpers = require('../db/queryHelpers');

var _yelpQuery = require('../yelp/yelpQuery');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }