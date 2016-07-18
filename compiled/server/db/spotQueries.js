'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSpot = exports.updateSpot = exports.createSpot = exports.getSingleSpot = exports.getAllSpots = exports.query = exports.db = undefined;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pgp = require('pg-promise')({
  promiseLib: _bluebird2.default
});
var connectionString = 'postgres://localhost:5432/hotspots';
var db = exports.db = pgp(connectionString);

var query = exports.query = function query(params) {
  db.query(params.q, params.args || '').then(function (data) {
    params.res.status(200).json({
      data: data,
      message: params.message || ''
    });
  }).catch(function (err) {
    return params.next(err);
  });
};

// add query functions
var getAllSpots = exports.getAllSpots = function getAllSpots(req, res, next) {
  query({
    q: 'select * from spots',
    res: res,
    next: next,
    message: 'Retrieved all spots'
  });
};

var getSingleSpot = exports.getSingleSpot = function getSingleSpot(req, res, next) {
  var id = req.params.id;
  query({
    q: 'select * from spots where id = ' + id,
    res: res,
    next: next,
    message: 'Retrieved spot with id ' + id
  });
};

var createSpot = exports.createSpot = function createSpot(req, res, next) {
  var spot = req.body;
  query({
    q: 'insert into spots (name, description, latitude, longitude, image, spots_users_id)                   values (' + spot.name + ', ' + spot.description + ', ' + spot.latitude + ',                  ' + spot.longitude + ', ' + spot.image + ', ' + spot.spots_users_id + ');',
    res: res,
    next: next,
    message: 'created a new spot'
  });
};

// updates take an entire spot's worth of data
var updateSpot = exports.updateSpot = function updateSpot(req, res, next) {
  var spot = req.body;
  query({
    q: 'update spots                   set name = \'' + spot.name + '\',                   description = \'' + spot.description + '\',                   latitude = ' + spot.latitude + ',                   longitude = ' + spot.longitude + ',                   image = \'' + spot.image + '\',                   spots_users_id = ' + spot.spots_users_id + '                   where id = ' + req.params.id + ';',
    res: res,
    next: next,
    message: 'updated a spot'
  });
};

var removeSpot = exports.removeSpot = function removeSpot(req, res, next) {
  query({
    q: 'delete from spots where id = ' + req.params.id,
    res: res,
    next: next,
    message: 'deleted spot'
  });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9kYi9zcG90UXVlcmllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7OztBQUNBLElBQU0sTUFBTSxRQUFRLFlBQVIsRUFBc0I7QUFDaEM7QUFEZ0MsQ0FBdEIsQ0FBWjtBQUdBLElBQU0sbUJBQW1CLG9DQUF6QjtBQUNPLElBQU0sa0JBQUssSUFBSSxnQkFBSixDQUFYOztBQUVBLElBQU0sd0JBQVEsU0FBUixLQUFRLENBQVMsTUFBVCxFQUFpQjtBQUNwQyxLQUFHLEtBQUgsQ0FBUyxPQUFPLENBQWhCLEVBQW1CLE9BQU8sSUFBUCxJQUFlLEVBQWxDLEVBQ0UsSUFERixDQUNPLFVBQVUsSUFBVixFQUFnQjtBQUNwQixXQUFPLEdBQVAsQ0FBVyxNQUFYLENBQWtCLEdBQWxCLEVBQ0csSUFESCxDQUNRO0FBQ0osWUFBTSxJQURGO0FBRUosZUFBUyxPQUFPLE9BQVAsSUFBa0I7QUFGdkIsS0FEUjtBQUtELEdBUEYsRUFRRSxLQVJGLENBUVEsVUFBVSxHQUFWLEVBQWU7QUFDcEIsV0FBTyxPQUFPLElBQVAsQ0FBWSxHQUFaLENBQVA7QUFDRCxHQVZGO0FBV0QsQ0FaTTs7QUFjUDtBQUNPLElBQU0sb0NBQWMsU0FBZCxXQUFjLENBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUIsSUFBbkIsRUFBeUI7QUFDbEQsUUFBTTtBQUNKLE9BQUcscUJBREM7QUFFSixTQUFLLEdBRkQ7QUFHSixVQUFNLElBSEY7QUFJSjtBQUpJLEdBQU47QUFNRCxDQVBNOztBQVNBLElBQU0sd0NBQWdCLFNBQWhCLGFBQWdCLENBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUIsSUFBbkIsRUFBeUI7QUFDcEQsTUFBTSxLQUFLLElBQUksTUFBSixDQUFXLEVBQXRCO0FBQ0EsUUFBTTtBQUNKLDJDQUFxQyxFQURqQztBQUVKLFNBQUssR0FGRDtBQUdKLFVBQU0sSUFIRjtBQUlKLHlDQUFtQztBQUovQixHQUFOO0FBTUQsQ0FSTTs7QUFVQSxJQUFNLGtDQUFhLFNBQWIsVUFBYSxDQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLElBQW5CLEVBQXlCO0FBQ2pELE1BQU0sT0FBTyxJQUFJLElBQWpCO0FBQ0EsUUFBTTtBQUNKLHdIQUN3QixLQUFLLElBRDdCLFVBQ3NDLEtBQUssV0FEM0MsVUFDMkQsS0FBSyxRQURoRSwyQkFFZSxLQUFLLFNBRnBCLFVBRWtDLEtBQUssS0FGdkMsVUFFaUQsS0FBSyxjQUZ0RCxPQURJO0FBSUosU0FBSyxHQUpEO0FBS0osVUFBTSxJQUxGO0FBTUosYUFBUztBQU5MLEdBQU47QUFRRCxDQVZNOztBQVlQO0FBQ08sSUFBTSxrQ0FBYSxTQUFiLFVBQWEsQ0FBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixJQUFuQixFQUF5QjtBQUNqRCxNQUFNLE9BQU8sSUFBSSxJQUFqQjtBQUNBLFFBQU07QUFDSix3REFDNEIsS0FBSyxJQURqQyw4Q0FFK0IsS0FBSyxXQUZwQyx5Q0FHMkIsS0FBSyxRQUhoQyx3Q0FJNEIsS0FBSyxTQUpqQyxzQ0FLeUIsS0FBSyxLQUw5QiwrQ0FNaUMsS0FBSyxjQU50QyxzQ0FPMkIsSUFBSSxNQUFKLENBQVcsRUFQdEMsTUFESTtBQVNKLFNBQUssR0FURDtBQVVKLFVBQU0sSUFWRjtBQVdKLGFBQVM7QUFYTCxHQUFOO0FBYUQsQ0FmTTs7QUFpQkEsSUFBTSxrQ0FBYSxTQUFiLFVBQWEsQ0FBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixJQUFuQixFQUF5QjtBQUNqRCxRQUFNO0FBQ0oseUNBQW1DLElBQUksTUFBSixDQUFXLEVBRDFDO0FBRUosU0FBSyxHQUZEO0FBR0osVUFBTSxJQUhGO0FBSUosYUFBUztBQUpMLEdBQU47QUFNRCxDQVBNIiwiZmlsZSI6InNwb3RRdWVyaWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuY29uc3QgcGdwID0gcmVxdWlyZSgncGctcHJvbWlzZScpKHtcbiAgcHJvbWlzZUxpYjogcHJvbWlzZVxufSk7XG5jb25zdCBjb25uZWN0aW9uU3RyaW5nID0gJ3Bvc3RncmVzOi8vbG9jYWxob3N0OjU0MzIvaG90c3BvdHMnO1xuZXhwb3J0IGNvbnN0IGRiID0gcGdwKGNvbm5lY3Rpb25TdHJpbmcpO1xuXG5leHBvcnQgY29uc3QgcXVlcnkgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgZGIucXVlcnkocGFyYW1zLnEsIHBhcmFtcy5hcmdzIHx8ICcnKVxuICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgcGFyYW1zLnJlcy5zdGF0dXMoMjAwKVxuICAgICAgIC5qc29uKHtcbiAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICBtZXNzYWdlOiBwYXJhbXMubWVzc2FnZSB8fCAnJ1xuICAgICAgIH0pO1xuICAgfSlcbiAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgIHJldHVybiBwYXJhbXMubmV4dChlcnIpO1xuICAgfSk7XG59O1xuXG4vLyBhZGQgcXVlcnkgZnVuY3Rpb25zXG5leHBvcnQgY29uc3QgZ2V0QWxsU3BvdHMgPSBmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xuICBxdWVyeSh7XG4gICAgcTogJ3NlbGVjdCAqIGZyb20gc3BvdHMnLFxuICAgIHJlczogcmVzLFxuICAgIG5leHQ6IG5leHQsXG4gICAgbWVzc2FnZTogYFJldHJpZXZlZCBhbGwgc3BvdHNgXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFNpbmdsZVNwb3QgPSBmdW5jdGlvbihyZXEsIHJlcywgbmV4dCkge1xuICBjb25zdCBpZCA9IHJlcS5wYXJhbXMuaWQ7XG4gIHF1ZXJ5KHtcbiAgICBxOiBgc2VsZWN0ICogZnJvbSBzcG90cyB3aGVyZSBpZCA9ICR7aWR9YCxcbiAgICByZXM6IHJlcyxcbiAgICBuZXh0OiBuZXh0LFxuICAgIG1lc3NhZ2U6IGBSZXRyaWV2ZWQgc3BvdCB3aXRoIGlkICR7aWR9YFxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTcG90ID0gZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbiAgY29uc3Qgc3BvdCA9IHJlcS5ib2R5O1xuICBxdWVyeSh7XG4gICAgcTogYGluc2VydCBpbnRvIHNwb3RzIChuYW1lLCBkZXNjcmlwdGlvbiwgbGF0aXR1ZGUsIGxvbmdpdHVkZSwgaW1hZ2UsIHNwb3RzX3VzZXJzX2lkKSBcXFxuICAgICAgICAgICAgICAgICAgdmFsdWVzICgke3Nwb3QubmFtZX0sICR7c3BvdC5kZXNjcmlwdGlvbn0sICR7c3BvdC5sYXRpdHVkZX0sIFxcXG4gICAgICAgICAgICAgICAgICR7c3BvdC5sb25naXR1ZGV9LCAke3Nwb3QuaW1hZ2V9LCAke3Nwb3Quc3BvdHNfdXNlcnNfaWR9KTtgLFxuICAgIHJlczogcmVzLFxuICAgIG5leHQ6IG5leHQsXG4gICAgbWVzc2FnZTogJ2NyZWF0ZWQgYSBuZXcgc3BvdCdcbiAgfSk7XG59O1xuXG4vLyB1cGRhdGVzIHRha2UgYW4gZW50aXJlIHNwb3QncyB3b3J0aCBvZiBkYXRhXG5leHBvcnQgY29uc3QgdXBkYXRlU3BvdCA9IGZ1bmN0aW9uKHJlcSwgcmVzLCBuZXh0KSB7XG4gIGNvbnN0IHNwb3QgPSByZXEuYm9keTtcbiAgcXVlcnkoe1xuICAgIHE6IGB1cGRhdGUgc3BvdHMgXFxcbiAgICAgICAgICAgICAgICAgIHNldCBuYW1lID0gJyR7c3BvdC5uYW1lfScsIFxcXG4gICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9ICcke3Nwb3QuZGVzY3JpcHRpb259JywgXFxcbiAgICAgICAgICAgICAgICAgIGxhdGl0dWRlID0gJHtzcG90LmxhdGl0dWRlfSwgXFxcbiAgICAgICAgICAgICAgICAgIGxvbmdpdHVkZSA9ICR7c3BvdC5sb25naXR1ZGV9LCBcXFxuICAgICAgICAgICAgICAgICAgaW1hZ2UgPSAnJHtzcG90LmltYWdlfScsIFxcXG4gICAgICAgICAgICAgICAgICBzcG90c191c2Vyc19pZCA9ICR7c3BvdC5zcG90c191c2Vyc19pZH0gXFxcbiAgICAgICAgICAgICAgICAgIHdoZXJlIGlkID0gJHtyZXEucGFyYW1zLmlkfTtgLFxuICAgIHJlczogcmVzLFxuICAgIG5leHQ6IG5leHQsXG4gICAgbWVzc2FnZTogJ3VwZGF0ZWQgYSBzcG90J1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVTcG90ID0gZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcbiAgcXVlcnkoe1xuICAgIHE6IGBkZWxldGUgZnJvbSBzcG90cyB3aGVyZSBpZCA9ICR7cmVxLnBhcmFtcy5pZH1gLFxuICAgIHJlczogcmVzLFxuICAgIG5leHQ6IG5leHQsXG4gICAgbWVzc2FnZTogJ2RlbGV0ZWQgc3BvdCdcbiAgfSk7XG59O1xuIl19