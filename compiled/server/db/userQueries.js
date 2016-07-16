'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = exports.findOne = undefined;

var _spotQueries = require('./spotQueries');

// returns a promise
var findOne = exports.findOne = function findOne(searchObj) {
  return _spotQueries.db.query('select * from users where id = ' + searchObj.id + ' OR username = ' + searchObj.username);
};

var createUser = exports.createUser = function createUser(userObj) {
  return _spotQueries.db.query('insert into users (username, password, salt)                     values (' + userObj.username + ', ' + userObj.password + ', ' + userObj.salt + ')');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9kYi91c2VyUXVlcmllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBR0E7QUFDTyxJQUFNLDRCQUFVLFNBQVYsT0FBVSxDQUFTLFNBQVQsRUFBb0I7QUFDekMsU0FBTyxnQkFBRyxLQUFILHFDQUEyQyxVQUFVLEVBQXJELHVCQUF5RSxVQUFVLFFBQW5GLENBQVA7QUFDRCxDQUZNOztBQUlBLElBQU0sa0NBQWEsU0FBYixVQUFhLENBQVMsT0FBVCxFQUFrQjtBQUMxQyxTQUFPLGdCQUFHLEtBQUgsK0VBQ3FCLFFBQVEsUUFEN0IsVUFDMEMsUUFBUSxRQURsRCxVQUMrRCxRQUFRLElBRHZFLE9BQVA7QUFFRCxDQUhNIiwiZmlsZSI6InVzZXJRdWVyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGIgfSBmcm9tICcuL3Nwb3RRdWVyaWVzJztcbmltcG9ydCB7IHF1ZXJ5IH0gZnJvbSAnLi9zcG90UXVlcmllcyc7XG5cbi8vIHJldHVybnMgYSBwcm9taXNlXG5leHBvcnQgY29uc3QgZmluZE9uZSA9IGZ1bmN0aW9uKHNlYXJjaE9iaikge1xuICByZXR1cm4gZGIucXVlcnkoYHNlbGVjdCAqIGZyb20gdXNlcnMgd2hlcmUgaWQgPSAke3NlYXJjaE9iai5pZH0gT1IgdXNlcm5hbWUgPSAke3NlYXJjaE9iai51c2VybmFtZX1gKTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVVc2VyID0gZnVuY3Rpb24odXNlck9iaikge1xuICByZXR1cm4gZGIucXVlcnkoYGluc2VydCBpbnRvIHVzZXJzICh1c2VybmFtZSwgcGFzc3dvcmQsIHNhbHQpIFxcXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcyAoJHt1c2VyT2JqLnVzZXJuYW1lfSwgJHt1c2VyT2JqLnBhc3N3b3JkfSwgJHt1c2VyT2JqLnNhbHR9KWApO1xufTtcbiJdfQ==