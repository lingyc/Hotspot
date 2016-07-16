export default function(db, pg) {
  db.findUser = function(searchObj) {
    return pg.query(`select * from users where id = ${searchObj.id} \
      OR email = ${searchObj.email} \
      OR facebookId = ${searchObj.facebookId}`);
  };

  db.createUser = function(userObj) {
    console.log('attempting to create user');
    return pg.query(`insert into users (email, facebookId, facebookAccessToken) \
      values (${userObj.email}, ${userObj.facebookId}, ${userObj.facebookAccessToken})`);
  };

  db.deleteUser = function(email) {
    return pg.query(`delete from spots where id = (select id from users where email = ${email})`);
  };

}
