import { Sequelize } from 'sequelize-typescript';
import type { SequelizeOptions } from 'sequelize-typescript';

import path from 'path';
import { DB, APP, TEST_DB } from '../config/index';

const sequelizeOptions: SequelizeOptions = { dialectOptions: {} };

if (APP.ENV === 'production') {
  sequelizeOptions.dialectOptions = {
    ssl: { rejectUnauthorized: false },
  };
}
const dbConfig = APP.ENV === 'test' ? TEST_DB : DB;
const sequelize = new Sequelize(dbConfig.URL, {
  storage: ':memory:',
  logging: dbConfig.LOGGING,
  modelPaths: [path.join(__dirname, '/**/*.model.*')],
  dialectOptions: sequelizeOptions.dialectOptions as object,
  dialect: dbConfig.DIALECT,
  pool: {
    max: 15,
    min: 0,
    idle: 10000,
    acquire: 60000,
  },
  query: { raw: true },
});

export default sequelize;
