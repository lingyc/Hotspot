import DB from './queries';
import dbConnection from './dbConnect';

const WishesSchema = {
  columns: {
    username: 'string',
    spotid: 'number',
    status: 'string',
    requestee: 'string'
  },
  tableName: 'wishes'
};

const Wishes = new DB(dbConnection, WishesSchema);

export default Wishes;
