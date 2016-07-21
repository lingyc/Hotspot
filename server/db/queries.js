import _ from 'lodash';
import {createInsertQuery, createUpdateQuery, sendBackJSON} from './queryHelpers';

export default class DB {
  constructor(pgConnection, schema) {
    this.pg = pgConnection;
    this.schema = schema;
  }

  getAll(req, res, next) {
    this.pg.query('select * from ${schema.tableName}')
     .then((data) => sendBackJSON(res, data, 'retrieved all'))
     .catch((err) => next(err));
  }

  getOne(req, res, next) {
    const id = req.params.id;
    this.pg.query(`select * from ${schema.tableName} where id = ${id}`)
     .then((data) => sendBackJSON(res, data, 'retrieved one'))
     .catch((err) => next(err));
  }

  create(req, res, next) {
    this.pg.query(createInsertQuery(schema, req.body))
     .then((data) => sendBackJSON(res, data, 'created a new item'))
     .catch((err) => next(err));
  }

  remove(req, res, next) {
    this.pg.query(`delete from ${schema.tableName} where id = ${req.params.id}`)
     .then((data) => sendBackJSON(res, data, 'deleted'))
     .catch((err) => next(err));
  }
}
