// Required modules to handle Yelp's oAuth requirement
import oauthSignature from 'oauth-signature';
import n from 'nonce';
import request from 'request';
import qs from 'querystring';
import _ from 'lodash';

// Import sercet API keys (All 4 are needed)
import {
  YELP_CONSUMER_KEY,
  YELP_CONSUMER_SECRET,
  YELP_TOKEN,
  YELP_TOKEN_SECRET
} from '../config/yelpconfig';

// Yelp Endpoints
var endpointNewPlace = 'https://api.yelp.com/v2/search';
var endpointBusID = 'https://api.yelp.com/v2/business/';

// Generate parameters for a new business
export var generateYelpNewBusParam = function (name, longitude, latitude) {
  return {
    term: name,
    limit: 1,
    ll: latitude + ',' + longitude
  };
};

// Yelp call
export var requestYelp = function (setParameters, busId, cb) {
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
    oauth_nonce: n()(),
    oauth_timestamp: n()().toString().substr(0, 10),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: '1.0'
  };

  if (busId) {
    var parameters = _.assign(requiredParameters);
  } else {
    var parameters = _.assign(setParameters, requiredParameters);
  }

  var consumerSecret = YELP_CONSUMER_SECRET;
  var tokenSecret = YELP_TOKEN_SECRET;

  // Call Yelp servers for a oAuth signature (only good for 300 sec)
  var signature = oauthSignature.generate(
    httpMethod,
    url,
    parameters,
    consumerSecret,
    tokenSecret,
    {encodeSignature: false}
  );

  parameters.oauth_signature = signature;

  var paramUrl = qs.stringify(parameters);

  var apiUrl = url + '?' + paramUrl;

  request(apiUrl, function(err, res, body) {
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

// Multiple requests for businessId array
export var requestMultipleYelp = function(busIds, cb) {
  var compiledData = [];

  busIds.forEach(function(busId) {
    requestYelp(busId, true, function(data) {
      compiledData.push(data);

      if (compiledData.length === busIds.length) {
        cb(compiledData);
      }
    });
  });
};

// Parse required data out of Yelp's response data
export var parseYelpData = function (business) {
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
