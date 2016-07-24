'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseYelpData = exports.requestMultipleYelp = exports.requestYelp = exports.generateYelpNewBusParam = undefined;

var _oauthSignature = require('oauth-signature');

var _oauthSignature2 = _interopRequireDefault(_oauthSignature);

var _nonce = require('nonce');

var _nonce2 = _interopRequireDefault(_nonce);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import sercet API keys (All 4 are needed)
// cant import from non existant file in deployment
// import Y from '../config-public/yelpconfig';
// import Y from '../config/yelpconfig';

// Required modules to handle Yelp's oAuth requirement
var YELP_CONSUMER_KEY = process.env.YELP_CONSUMER_KEY || 0;
var YELP_CONSUMER_SECRET = process.env.YELP_CONSUMER_SECRET || 0;
var YELP_TOKEN = process.env.YELP_TOKEN || 0;
var YELP_TOKEN_SECRET = process.env.YELP_TOKEN_SECRET || 0;

// Yelp Endpoints
var endpointNewPlace = 'https://api.yelp.com/v2/search';
var endpointBusID = 'https://api.yelp.com/v2/business/';

// Generate parameters for a new business
var generateYelpNewBusParam = exports.generateYelpNewBusParam = function generateYelpNewBusParam(name, longitude, latitude) {
  return {
    term: name,
    limit: 1,
    ll: latitude + ',' + longitude
  };
};

// Yelp call
var requestYelp = exports.requestYelp = function requestYelp(setParameters, busId) {
  var httpMethod = 'GET';

  if (busId) {
    var url = endpointBusID + setParameters;
  } else {
    var url = endpointNewPlace;
  }

  var defaultParameters = {};

  var requiredParameters = {
    oauth_consumer_key: YELP_CONSUMER_KEY,
    oauth_token: YELP_TOKEN,
    oauth_nonce: (0, _nonce2.default)()(),
    oauth_timestamp: (0, _nonce2.default)()().toString().substr(0, 10),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: '1.0'
  };

  if (busId) {
    var parameters = _lodash2.default.assign(requiredParameters);
  } else {
    var parameters = _lodash2.default.assign(setParameters, requiredParameters);
  }

  var consumerSecret = YELP_CONSUMER_SECRET;
  var tokenSecret = YELP_TOKEN_SECRET;

  // Call Yelp servers for a oAuth signature (only good for 300 sec)
  var signature = _oauthSignature2.default.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false });

  parameters.oauth_signature = signature;

  var paramUrl = _querystring2.default.stringify(parameters);

  var apiUrl = url + '?' + paramUrl;

  return new _bluebird2.default(function (resolve, reject) {
    (0, _request2.default)(apiUrl, function (err, res, body) {
      if (err) {
        console.log('**********************************');
        console.log('ERROR', err);
        reject(err);
      }

      var data = JSON.parse(body);
      // console.log('returning data', data);

      if (busId) {
        resolve(parseYelpData(data));
      } else {
        resolve(parseYelpData(data.businesses[0]));
      }
    });
  });
};

// Multiple requests for businessId array
var requestMultipleYelp = exports.requestMultipleYelp = function requestMultipleYelp(busIds, cb) {
  return _bluebird2.default.all(busIds.map(function (busId) {
    return requestYelp(busId, true);
  }));
  // busIds.forEach(function(busId) {
  //   requestYelp(busId, true)
  //   .then((data) => {
  //     compiledData.push(data);
  //     if (compiledData.length === busIds.length) {
  //       compiledData;
  //     }
  //   });
  // });
};

// Parse required data out of Yelp's response data
var parseYelpData = exports.parseYelpData = function parseYelpData(business) {
  var cuisine = business.categories[0][0];
  var imageUrl = business.image_url;
  var businessId = business.id;
  var parsed = {
    cuisine: cuisine,
    image: imageUrl,
    businessId: businessId
  };

  return parsed;
};