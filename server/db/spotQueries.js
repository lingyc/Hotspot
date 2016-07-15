import promise from 'bluebird';
const pgp = require('pg-promise')({
  promiseLib: promise
});
const connectionString = 'postgres://localhost:5432/hotspots';
export const db = pgp(connectionString);

export const query = function(params) {
  db.query(params.q, params.args || '')
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
};

// add query functions
export const getAllSpots = function(req, res, next) {
  query({
    q: 'select * from spots',
    res: res,
    next: next,
    message: `Retrieved all spots`
  });
};

export const getSingleSpot = function(req, res, next) {
  const id = req.params.id;
  query({
    q: `select * from spots where id = ${id}`,
    res: res,
    next: next,
    message: `Retrieved spot with id ${id}`
  });
};

export const createSpot = function(req, res, next) {
  const spot = req.body;
  query({
    q: `insert into spots (name, description, latitude, longitude, image, spots_users_id) \
                  values (${spot.name}, ${spot.description}, ${spot.latitude}, \
                 ${spot.longitude}, ${spot.image}, ${spot.spots_users_id});`,
    res: res,
    next: next,
    message: 'created a new spot'
  });
};

// updates take an entire spot's worth of data
export const updateSpot = function(req, res, next) {
  const spot = req.body;
  query({
    q: `update spots \
                  set name = '${spot.name}', \
                  description = '${spot.description}', \
                  latitude = ${spot.latitude}, \
                  longitude = ${spot.longitude}, \
                  image = '${spot.image}', \
                  spots_users_id = ${spot.spots_users_id} \
                  where id = ${req.params.id};`,
    res: res,
    next: next,
    message: 'updated a spot'
  });
};

export const removeSpot = function(req, res, next) {
  query({
    q: `delete from spots where id = ${req.params.id}`,
    res: res,
    next: next,
    message: 'deleted spot'
  });
};
