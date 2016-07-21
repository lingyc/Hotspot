import promise from 'bluebird';
// import spotQueries from './spotQueries';
// import userQueries from './userQueries';
const pgp = require('pg-promise')({
  promiseLib: promise
});

const connectionString = 'postgres://localhost:5432/hotspots';
const pg = pgp(connectionString);

export default pg;
