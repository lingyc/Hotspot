export default function(app){
  // RESTFUl API for retrieving spots from the db
  app.get('/api/spots', db.getAllSpots);
  app.get('/api/spots/:id', db.getSingleSpot);
  app.post('/api/spots', db.createSpot);
  app.put('/api/spots/:id', db.updateSpot);
  app.delete('/api/spots/:id', db.removeSpot);
}
