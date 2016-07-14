import promise from 'bluebird';
const pgp = require('pg-promise')({
  promiseLib: promise
});

const connectionString = 'postgres://localhost:5432/hotspots';
const db = pgp(connectionString);

// add query functions
const getAllSpots = function(req, res, next) {
  db.query('select * from hotspots')
   .then(function (data) {
     res.status(200)
       .json({
         data: data,
         message: 'Retrieved ALL hotspots'
       });
   })
   .catch(function (err) {
     return next(err);
   });
};

const getSingleSpot = function(req, res, next) {
  db.query(`select * from hotspots where id = ${req.params.id}`)
   .then(function (data) {
     res.status(200)
       .json({
         data: data,
         message: `Retrieved spot with id #{id}`
       });
   })
   .catch(function (err) {
     return next(err);
   });
};

const createSpot = function(req, res, next) {
  const spot = req.body;
  db.query('insert into hotspots (name, description, city, latitude, longitude, image) \
              values (${name}, ${description}, ${city}, ${latitude}, \
                ${longitude}, ${image})', spot)
   .then(function (data) {
     res.status(200)
       .json({
         data: data,
         message: `Created a new spot with #{id}`
       });
   })
   .catch(function (err) {
     return next(err);
   });
};

const updateSpot = function(req, res, next) {
  console.log('update coming soon!');
};

const removeSpot = function(req, res, next) {
  db.query(`delete from hotspots where ${spot.id} = id`)
   .then(function (data) {
     res.status(200)
       .json({
         data: data,
         message: `Deleted spot with #{id}`
       });
   })
   .catch(function (err) {
     return next(err);
   });
};

module.exports = {
  getAllSpots: getAllSpots,
  getSingleSpot: getSingleSpot,
  createSpot: createSpot,
  updateSpot: updateSpot,
  removeSpot: removeSpot
};
