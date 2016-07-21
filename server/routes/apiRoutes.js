import Spot from '../db/Spots';
import { sendBackJSON } from '../db/queryHelpers';

export default function(app){
  // RESTFUl API for retrieving spots from the db
  app.get('/api/spots', (req, res) => {
    Spot.getAll()
      .then((spots) => sendBackJSON(res, spots, 'got all spots'))
      .catch((err) => console.log(err));
  });

  app.get('/api/spots/:id', (req, res) => {
    Spot.getOne(req.params.id)
      .then((spot) => sendBackJSON(res, spots, 'got one spot'))
      .catch((err) => console.log(err));
  });

  app.post('/api/spots', (req, res) => {
    Spot.create(req.body)
      .then((result) => sendBackJSON(res, result, 'created new spot'))
      .catch((err) => sendBackJSON(res, err, 'error'));
  });

  app.put('/api/spots/:id', (req, res) => {
    Spot.update(req.body)
      .then((result) => sendBackJSON(res, result, 'updated a spot'))
      .catch((err) => sendBackJSON(res, err, 'error'));
  });

  app.delete('/api/spots/:id', (req, res) => {
    Spot.update(req.body)
      .then((result) => sendBackJSON(res, result, 'updated a spot'))
      .catch((err) => sendBackJSON(res, err, 'error'));
  });
}
