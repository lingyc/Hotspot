export default function(db, pg) {
  db.findOne = function(searchObj) {
    return pg.query(`select * from users where id = ${searchObj.id} OR username = ${searchObj.username}`);
  };

  db.createUser = function(userObj) {
    return pg.query(`insert into users (username, password, salt) \
      values (${userObj.username}, ${userObj.password}, ${userObj.salt})`);
  };

  db.deleteUser = function(username) {
    return pg.query(`delete from spots where id = (select id from users where username = ${username})`);
  };

  db.console = function() {
    console.log('it works!');
  };
}
