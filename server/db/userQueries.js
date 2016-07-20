import _ from 'lodash';
import bcrypt from 'bcrypt-nodejs';
// user schema used to validate query information
// if one of these fields is missing, it must be added
const userSchema = {
  name: true,
  username: true,
  password: true,
  facebookId: true,
  facebookAccessToken: true
};


export default function(db, pg) {
  db.findUser = function(searchObj) {
    console.log('searchObj', searchObj);
    let searchParams = convertToQParams(searchObj);
    console.log('search params', searchParams);
    return pg.query(`select * from users where ${searchParams}`);
  };
  // email = ${searchObj.email}
  db.createUser = function(userObj) {
    console.log('attempting to create user with', userObj);
    // if a user wants a local account without fb access, we need to set the fields to null
    _.each(userSchema, (val, key) => {
      if (userObj[key] === undefined) {
        userObj[key] = null;
      }
    });
    if (userObj.password) {
      userObj.password = db.generateHash(userObj.password);
    }
    return pg.one(`insert into users (name, username, password, facebookId, facebookAccessToken) \
      values ('${userObj.name}', '${userObj.username}', '${userObj.password}', ${userObj.facebookId}, '${userObj.facebookAccessToken}') \
      returning *`);
  };

  db.deleteUser = function(email) {
    return pg.query(`delete from spots where id = (select id from users where email = ${email})`);
  };

  db.findOrCreateUser = function(searchObj, options) {
    return db.findUser(searchObj)
    .then((user) => {
      if (user.length > 0) {
        return user;
      } else {
        const newUser = {};
        if (options && options.fb) {
          let {profile, accessToken} = options.fb;
          _.extend(newUser, {
            facebookId: parseInt(profile.id),
            facebookAccessToken: accessToken,
            name: `${profile.name.givenName} ${profile.name.familyName}`
          });
        } else {
          _.extend(newUser, {
            username: searchObj.username,
            password: searchObj.password
          });
        }
        return db.createUser(newUser);
      }
    });
  };

  db.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  };

  db.isValidPassword = function(password, id) {
    const pwInDB = db.findUser({id: id})
    .then((user) => {
      return bcrypt.compareSync(password, pwInDB);
    })
    .catch((err) => console.log(err));
  };
}


function convertToQParams(searchObj) {
  // look at search params and search by the most specific one given
  console.log('searchObj', searchObj);
  let searchParams = '';
  let handleOr = false;
  // build search params based on input
  _.each(searchObj, (val, key) => {
    if (handleOr) {
      searchParams += ' OR ';
    }
    if (userSchema[key]) {
      searchParams += `${key} = '${val}'`;
      handleOr = true;
    }
  });
  return searchParams;
  console.log(searchParams);
}
