import promise from 'bluebird';
console.log(process.env.DATABASE_URL);
const pgp = require('pg-promise')({
  promiseLib: promise
});

let connectionString = 'postgres://inxloxepkkypkj:alOq4htfCdEjNUDGoXqeZ0S8QF@ec2-54-235-254-56.compute-1.amazonaws.com:5432/d1kgfr0gstdck2';
// let connectionString = 'postgres://127.0.0.1:5432/hotspots'; 
if (process.env.DATABASE_URL) {
  connectionString = process.env.DATABASE_URL;
}

const pg = pgp(connectionString);

export default pg;
