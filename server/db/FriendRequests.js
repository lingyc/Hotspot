import DB from './queries';
import dbConnection from './dbConnect';

const FriendRequestsSchema = {
  columns: {
    requestor: 'string',
    requestee: 'string',
    response: 'string'
  },
  tableName: 'friendrequests'
};

const FriendRequests = new DB(dbConnection, FriendRequestsSchema);

export default FriendRequests;
