import _ from 'lodash';

const spotSchema = {
  id: true,
  name: true,
  rating: true,
  latitude: true,
  longitude: true,
  image: true
};

export default function(db, pg) {
  db.getAllSpots = function(req, res, next) {
    pg.query('select * from spots')
     .then((data) => {
       params.res.status(200)
         .json({
           data: data,
           message: 'Retrieved all spots!'
         });
     })
     .catch(function (err) {
       return params.next(err);
     });
  };

  db.getSingleSpot = function(req, res, next) {
    const id = req.params.id;
    pg.query(`select * from spots where id = ${id}`)
     .then((data) => {
       params.res.status(200)
         .json({
           data: data,
           message: `Retrieved spot with id ${id}`
         });
     })
     .catch(function (err) {
       return params.next(err);
     });
  };

  db.createSpot = function(req, res, next) {
    const spot = req.body;
    const convertedSpot = createValidSpotQuery(spot);

    pg.query(`insert into spots (name, rating, latitude, longitude, image) \
              values (${convertedSpot.name}, ${convertedSpot.rating}, ${convertedSpot.latitude}, \
              ${convertedSpot.longitude}, ${convertedSpot.image});`)
     .then(function (data) {
       params.res.status(200)
         .json({
           data: data,
           message: 'created a new spot'
         });
     })
     .catch(function (err) {
       return params.next(err);
     });
  };

  // updates take an entire spot's worth of data
  db.updateSpot = function(req, res, next) {
    const spot = req.body;
    const convertedSpot = createValidSpotQuery(spot);
    pg.query(`update spots \
        set name = '${convertedSpot.name}', \
        latitude = ${convertedSpot.latitude}, \
        longitude = ${convertedSpot.longitude}, \
        rating = ${convertedSpot.rating}, \
        image = '${convertedSpot.image}', \
        where id = ${req.params.id};`)
     .then(function (data) {
       params.res.status(200)
         .json({
           data: data,
           message: 'updated a spot'
         });
     })
     .catch(function (err) {
       return params.next(err);
     });
  };

  db.removeSpot = function(req, res, next) {
    pg.query(`delete from spots where id = ${req.params.id}`)
     .then(function (data) {
       params.res.status(200)
         .json({
           data: data,
           message: 'deleted spot'
         });
     })
     .catch(function (err) {
       return params.next(err);
     });
  };
}

function createValidSpotQuery(spot) {
  _.each(spotSchema, (val, key) => {
    if (spot[key] === undefined) {
      spot[key] = null;
    }
    if (typeof spot[key] === 'string') {
      spot[key] = `'${val}'`;
    }
  });
  return spot;
}
