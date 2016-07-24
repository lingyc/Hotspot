import Spot from '../db/Spots';
import { sendBackJSON } from '../db/queryHelpers';
import {requestMultipleYelp} from '../yelp/yelpQuery';
import _ from 'lodash';

export default function(app){
  // RESTFUl API for retrieving spots from the db
  app.get('/api/spots', (req, res) => {
    let spotsReturn;
    Spot.getAll()
      .then((spots) => {
        console.log(spots);
        if (spots.length === 0) {
          return sendBackJSON(res, null, 'no spots');
        }
        spotsReturn = spots;
        return requestMultipleYelp(spots.map((spot) => spot.yelp_id));
      })
      .then((yelpResults) => {
        console.log('yelpresults looking for busid location', yelpResults);
        return spotsReturn.map((spot) => {
          let match = yelpResults.filter((result) => result.businessId === spot.yelp_id);
          spot.yelpData = match[0];
          return spot;
        });
      })
      .then((augmentedSpots) => sendBackJSON(res, augmentedSpots, 'got all spots'))
      .catch((err) => console.log(err));
  });

  app.get('/api/spots/:id', (req, res) => {
    Spot.getOne(req.params.id)
      .then((spot) => sendBackJSON(res, spot, 'got one spot'))
      .catch((err) => console.log(err));
  });

  app.post('/api/spots', (req, res) => {
    Spot.create(req.body)
      .then((result) => sendBackJSON(res, req.body, 'created new spot'))
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
