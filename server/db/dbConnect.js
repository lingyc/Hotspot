import promise from 'bluebird';
console.log(process.env.DATABASE_URL);
const pgp = require('pg-promise')({
  promiseLib: promise
});

let connectionString = 'postgres://eddjkiejqgentb:SmKRv-lNqBN1O1O_yL_jbCug_Q@ec2-50-17-255-49.compute-1.amazonaws.com:5432/dbcptdm6hun6jj';

if (process.env.DATABASE_URL) {
  connectionString = process.env.DATABASE_URL;
}

const pg = pgp(connectionString);

export default pg;
