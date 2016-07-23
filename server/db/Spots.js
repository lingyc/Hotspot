import _ from 'lodash';
import DB from './queries';
import dbConnection from './dbConnect';

const spotSchema = {
  columns: {
    name: 'string',
    rating: 'number',
    latitude: 'number',
    longitude: 'number',
    yelp_id: 'string'
  },
  tableName: 'spots'
};

const Spot = new DB(dbConnection, spotSchema);

export default Spot;
