import promise from 'bluebird';
const pgp = require('pg-promise')({
  promiseLib: promise
});

const connectionString = 'postgres://localhost:5432/hotspots';
const db = pgp(connectionString);


// add query functions
const getAllSpots = function(req, res, next) {
  query({
    queryString: 'select * from spots',
    res: res,
    next: next,
    message: `Retrieved all spots`
  });
};

const getSingleSpot = function(req, res, next) {
  const id = req.params.id;
  query({
    queryString: `select * from spots where id = ${id}`,
    res: res,
    next: next,
    message: `Retrieved spot with id ${id}`
  });
};

const createSpot = function(req, res, next) {
  const spot = req.body;
  query({
    queryString: `insert into spots (name, description, latitude, longitude, image, spots_users_id) \
                  values (${spot.name}, ${spot.description}, ${spot.latitude}, \
                 ${spot.longitude}, ${spot.image}, ${spot.spots_users_id})`,
    res: res,
    next: next,
    message: 'created a new spot'
  });
};

const updateSpot = function(req, res, next) {
  const spot = getSpotById(req.params.id);
  query({
    queryString: 'update spots \
                  set name = ${name}, \
                  description = ${description}, \
                  latitude = ${latitude}, \
                  longitude = ${longitude}, \
                  image = ${image}, \
                  spots_users_id = ${spots_users_id} \
                  where id = ${id}',
    args: spot,
    res: res,
    next: next,
    message: 'updated a spot'
  });
};



const removeSpot = function(req, res, next) {
  const spot = getSpotById(req.params.id);
  query({
    queryString: 'delete from spots where id = ${spot.id}',
    args: spot,
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

function getSpotById(spotId) {
  return query('select * from spots where id = ${spotId}', {spotId: spotId})
    .then((spot) => {
      return spot;
    });
}

module.exports = {
  getAllSpots: getAllSpots,
  getSingleSpot: getSingleSpot,
  createSpot: createSpot,
  updateSpot: updateSpot,
  removeSpot: removeSpot
};
