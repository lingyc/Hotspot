import _ from 'lodash';
import bcrypt from 'bcrypt-nodejs';
import dbConnection from './dbConnect';
import DB from './queries';

const userSchema = {
  columns: {
    name: 'string',
    username: 'string',
    password: 'string',
    facebookId: 'number',
    facebookAccessToken: 'string'
  },
  tableName: 'users'
};

class User extends DB {
  constructor(dbConnection, userSchema) {
    super(dbConnection, userSchema);
  }

  generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  }

  isValidPassword(password, id) {
    return db.findUser({id: id})
    .then((user) => {
      return [bcrypt.compareSync(password, user[0].password), user];
    })
    .catch((err) => console.log(err));
  }
}

export default new User(dbConnection, userSchema);
