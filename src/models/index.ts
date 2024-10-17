import { Sequelize } from 'sequelize-typescript';
import { DB, APP, TEST_DB } from '../config/index';

export function createSequelizeInstance() {
  const config = APP.ENV === 'test' ? TEST_DB : DB;
  const sequelizeOptions = {
    storage: ':memory:',
    logging: config.LOGGING,
    modelPaths: [__dirname + '/**/*.model.*'],
    dialectOptions: {},
    dialect: config.DIALECT,
    pool: {
      max: 15,
      min: 0,
      idle: 10000,
      acquire: 60000,
    },
    query: { raw: true },
  };

  if (APP.ENV === 'production') {
    sequelizeOptions.dialectOptions = {
      ssl: { rejectUnauthorized: false },
    };
  }

  return new Sequelize(config.URL, sequelizeOptions);
}

const sequelize = createSequelizeInstance();
export default sequelize;
