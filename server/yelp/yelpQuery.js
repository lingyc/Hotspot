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
var endpointNewPlace = 'https://api.yelp.com/v2/search?';
var endpointBusID = 'https://api.yelp.com/v2/business/';

// Generate parameters
// New business
var generateYelpNewBusParam = (name, longitude, latitude) => {
  return {
    term: name,
    cll: latitude + ',' + longitude,
    limit: 1,
    sort: 0
  };
};

// Stored business
var generateYelpBusIDParam = (businessId) => {
  return {
    id: businessId
  };
};


// Yelp call
var requestYelp = (endpoint, parameters, cb) => {
  var httpMethod = 'GET';

  var url = endpoint;

  var defaultParameters = {};

  var requiredParameters = {
    oauth_consumer_key: YELP_CONSUMER_KEY,
    oauth_token: YELP_TOKEN,
    oauth_signature_method: 'hmac-sha1',
    oauth_timestamp: n().toString.substr(0, 10),
    oauth_nonce: n(),
    oauth_version: '1.0'
  };

  var parameters = _.assign(defaultParameters, parameters, requiredParameters);

  var consumerSecret = YELP_CONSUMER_SECRET;
  var tokenSecret = YELP_TOKEN_SECRET;

  // Call Yelp servers for a signature (only good for 300 sec)
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

  var apiUrl = url + paramUrl;

  request(apiUrl, function(err, res, body) {
    console.log('a request!!!');
  });
};
