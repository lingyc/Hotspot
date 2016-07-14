import promise from 'bluebird';
const pgp = require('pg-promise')({
  promiseLib: promise
});

const connectionString = 'postgres://localhost:5432/hotspots';
const db = pgp(connectionString);

// add query functions
const getAllSpots = function(req, res, next) {
  query({
    queryString: 'select * from hotspots',
    res: res,
    next: next,
    message: `Retrieved all spots`
  });
};

const getSingleSpot = function(req, res, next) {
  query({
    queryString: 'select * from hotspots where id = ${req.params.id}`',
    res: res,
    next: next,
    message: `Retrieved spot with id #{id}`
  });
};

const createSpot = function(req, res, next) {
  const spot = req.body;
  query({
    queryString: 'insert into hotspots (name, description, city, latitude, longitude, image) \
               values (${name}, ${description}, ${city}, ${latitude}, \
                 ${longitude}, ${image})',
    res: res,
    next: next,
    message: 'created a new spot',
    args: spot
  });
};

const updateSpot = function(req, res, next) {
  console.log('update coming soon!');
};

const removeSpot = function(req, res, next) {
  query({
    queryString: `delete from hotspots where ${spot.id} = id`,
    res: res,
    next: next,
    message: 'deleted spot'
  });
};

function query(params) {
  db.query(params.queryString, params.args || '')
   .then(function (data) {
     params.res.status(200)
       .json({
         data: data,
         message: params.message || ''
       });
   })
   .catch(function (err) {
     return params.next(err);
   });
}

module.exports = {
  getAllSpots: getAllSpots,
  getSingleSpot: getSingleSpot,
  createSpot: createSpot,
  updateSpot: updateSpot,
  removeSpot: removeSpot
};
