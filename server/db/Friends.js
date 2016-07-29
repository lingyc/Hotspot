import DB from './queries';
import dbConnection from './dbConnect';

const FriendSchema = {
  columns: {
    username: 'string',
    friendname: 'string'
  },
  tableName: 'friends'
};

const Friends = new DB(dbConnection, FriendSchema);

export default Friends;
