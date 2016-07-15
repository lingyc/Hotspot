import { db } from './spotQueries';
import { query } from './spotQueries';

// returns a promise
export const findOne = function(searchObj) {
  return db.query(`select * from users where id = ${searchObj.id} OR username = ${searchObj.username}`);
};

export const createUser = function(userObj) {
  return db.query(`insert into users (username, password, salt) \
                    values (${userObj.username}, ${userObj.password}, ${userObj.salt})`);
};
