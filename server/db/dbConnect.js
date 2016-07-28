import promise from 'bluebird';
console.log(process.env.DATABASE_URL);
const pgp = require('pg-promise')({
  promiseLib: promise
});

let connectionString = 'postgres://127.0.0.1:5432/hotspots';
// if (process.env.DATABASE_URL) {
//   connectionString = process.env.DATABASE_URL;
// }

const pg = pgp(connectionString);

export default pg;
