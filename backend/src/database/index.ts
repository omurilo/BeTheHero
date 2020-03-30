import Knex from 'knex';
import { dbConfig } from 'config';

const dbConnection: Knex = Knex(
  dbConfig[process.env.NODE_ENV || 'development'] as Knex.Config
);

export default dbConnection;
