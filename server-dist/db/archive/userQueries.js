'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (db, pg) {
  db.findUser = function (searchObj) {
    var searchParams = convertToQParams(searchObj);
    return pg.query('select * from users where ' + searchParams);
  };
  // email = ${searchObj.email}
  db.createUser = function (userObj) {
    console.log('attempting to create user with', userObj);
    // if a user wants a local account without fb access, we need to set the fields to null
    _lodash2.default.each(userSchema, function (val, key) {
      if (userObj[key] === undefined) {
        userObj[key] = null;
      }
    });
    if (userObj.password) {
      userObj.password = db.generateHash(userObj.password);
    }
    return pg.one('insert into users (name, username, password, facebookId, facebookAccessToken)       values (\'' + userObj.name + '\', \'' + userObj.username + '\', \'' + userObj.password + '\', ' + userObj.facebookId + ', \'' + userObj.facebookAccessToken + '\')       returning *');
  };

  db.deleteUser = function (email) {
    return pg.query('delete from spots where id = (select id from users where email = ' + email + ')');
  };

  db.findOrCreateUser = function (searchObj, options) {
    return db.findUser(searchObj).then(function (user) {
      if (user.length > 0) {
        return user[0];
      } else {
        var newUser = {};
        if (options && options.fb) {
          var _options$fb = options.fb;
          var profile = _options$fb.profile;
          var accessToken = _options$fb.accessToken;

          _lodash2.default.extend(newUser, {
            facebookId: parseInt(profile.id),
            facebookAccessToken: accessToken,
            name: profile.name.givenName + ' ' + profile.name.familyName
          });
        } else {
          _lodash2.default.extend(newUser, {
            username: searchObj.username,
            password: searchObj.password
          });
        }
        return db.createUser(newUser);
      }
    });
  };

  db.generateHash = function (password) {
    return _bcryptNodejs2.default.hashSync(password, _bcryptNodejs2.default.genSaltSync(10), null);
  };

  db.isValidPassword = function (password, id) {
    return db.findUser({ id: id }).then(function (user) {
      return [_bcryptNodejs2.default.compareSync(password, user[0].password), user];
    }).catch(function (err) {
      return console.log(err);
    });
  };
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// user schema used to validate query information
// if one of these fields is missing, it must be added
var userSchema = {
  id: true,
  name: true,
  username: true,
  password: true,
  facebookId: true,
  facebookAccessToken: true
};

function convertToQParams(searchObj) {
  // look at search params and search by the most specific one given
  var searchParams = '';
  var handleOr = false;
  // build search params based on input
  _lodash2.default.each(searchObj, function (val, key) {
    if (handleOr) {
      searchParams += ' OR ';
    }
    if (userSchema[key]) {
      searchParams += key + ' = ' + JSON.stringify(val).replace(/\"/g, '\'');
      handleOr = true;
    }
  });
  console.log('search params', searchParams);
  return searchParams;
}