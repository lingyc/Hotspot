export default function(db, pg) {
  db.findUser = function(searchObj) {
    return pg.query(`select * from users \
      where facebookId = ${searchObj.facebookId}`);
  };
  // email = ${searchObj.email}
  db.createUser = function(userObj) {
    console.log('attempting to create user with', userObj);
    return pg.query(`insert into users (name, email, facebookId, facebookAccessToken) \
      values ('${userObj.name}', '${userObj.email}', ${userObj.facebookId}, '${userObj.facebookAccessToken}')`);
  };

  db.deleteUser = function(email) {
    return pg.query(`delete from spots where id = (select id from users where email = ${email})`);
  };

}
