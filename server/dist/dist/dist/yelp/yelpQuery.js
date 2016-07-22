'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseYelpData = exports.requestYelp = exports.generateYelpNewBusParam = undefined;

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

var _yelpconfig = require('../config/yelpconfig');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// Yelp Endpoints
// Required modules to handle Yelp's oAuth requirement
var endpointNewPlace = 'https://api.yelp.com/v2/search';

// Import sercet API keys (All 4 are needed)

var endpointBusID = 'https://api.yelp.com/v2/business/';

// Generate parameters
// New business
var generateYelpNewBusParam = exports.generateYelpNewBusParam = function generateYelpNewBusParam(name, longitude, latitude) {
  return {
    term: name,
    limit: 1,
    ll: latitude + ',' + longitude
  };
};
//
// // Stored business
// export var generateYelpBusIDParam = function (businessId) {
//   return {
//     id: businessId
//   };
// };


// Yelp call
var requestYelp = exports.requestYelp = function requestYelp(setParameters, busId, cb) {
  var httpMethod = 'GET';

  if (busId) {
    var url = endpointBusID + setParameters;
  } else {
    var url = endpointNewPlace;
  }

  var defaultParameters = {};

  var requiredParameters = {
    oauth_consumer_key: _yelpconfig.YELP_CONSUMER_KEY,
    oauth_token: _yelpconfig.YELP_TOKEN,
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

  var consumerSecret = _yelpconfig.YELP_CONSUMER_SECRET;
  var tokenSecret = _yelpconfig.YELP_TOKEN_SECRET;

  // Call Yelp servers for a signature (only good for 300 sec)
  var signature = _oauthSignature2.default.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false });

  parameters.oauth_signature = signature;

  var paramUrl = _querystring2.default.stringify(parameters);

  var apiUrl = url + '?' + paramUrl;

  (0, _request2.default)(apiUrl, function (err, res, body) {
    console.log('**********************************');
    console.log('ERROR', err);
    var data = JSON.parse(body);
    if (busId) {
      cb(parseYelpData(data));
    } else {
      cb(parseYelpData(data.businesses[0]));
    }
  });
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