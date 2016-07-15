export default function(db, pg) {
  db.getAllSpots = function(req, res, next) {
    pg.query('select * from spots')
     .then(function (data) {
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
    query({
      q: `select * from spots where id = ${id}`,
      res: res,
      next: next,
      message: `Retrieved spot with id ${id}`
    });
  };

  db.createSpot = function(req, res, next) {
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
  db.updateSpot = function(req, res, next) {
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

  db.removeSpot = function(req, res, next) {
    query({
      q: `delete from spots where id = ${req.params.id}`,
      res: res,
      next: next,
      message: 'deleted spot'
    });
  };

}
