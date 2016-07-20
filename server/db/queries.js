import _ from 'lodash';

export default function(db, pg, schema){
  db.getAll = function(req, res, next) {
    pg.query('select * from ${schema.tableName}')
     .then((data) => {
       params.res.status(200)
         .json({
           data: data,
           message: 'Retrieved all ${schema.tableName}!'
         });
     })
     .catch(function (err) {
       return params.next(err);
     });
  };

  db.getOne = function(req, res, next) {
    const id = req.params.id;
    pg.query(`select * from ${schema.tableName} where id = ${id}`)
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

  db.create = function(req, res, next) {
    const spot = req.body;
    const convertedSpot = createValidSpotQuery(spot);

    pg.query(`insert into ${schema.tableName} (name, rating, latitude, longitude, image, yelp_id) \
              values (${convertedSpot.name}, ${convertedSpot.rating}, ${convertedSpot.latitude}, \
              ${convertedSpot.longitude}, ${convertedSpot.image}, ${convertedSpot.yelp_id});`)
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
  db.update = function(req, res, next) {
    const spot = req.body;
    const convertedSpot = createValidSpotQuery(spot);
    pg.query(`update ${schema.tableName} \
        set name = '${convertedSpot.name}', \
        latitude = ${convertedSpot.latitude}, \
        longitude = ${convertedSpot.longitude}, \
        rating = ${convertedSpot.rating}, \
        image = '${convertedSpot.image}', \
        yelp_id = '${convertedSpot.yelp_id}' \
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

  db.remove = function(req, res, next) {
    pg.query(`delete from ${schema.tableName} where id = ${req.params.id}`)
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


function createInsertQuery(schema, objToInsert) {
  let query = `insert into ${schema.tableName}`
  _.each(schema.columns, (val, key) => {
    if (objToInsert[key] === undefined) {
      objToInsert[key] = null;
    }
    if (typeof objToInsert[key] === 'string') {
      objToInsert[key] = `'${val}'`;
    }
  });
}
