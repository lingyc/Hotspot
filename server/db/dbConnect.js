import promise from 'bluebird';
// import spotQueries from './spotQueries';
// import userQueries from './userQueries';
const pgp = require('pg-promise')({
  promiseLib: promise
});

let connectionString = 'postgres://localhost:5432/hotspots';
if (process.env.RDS_HOSTNAME) {
  connectionString = `postgres://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/hotspots`;
}

const pg = pgp(connectionString);

export default pg;
