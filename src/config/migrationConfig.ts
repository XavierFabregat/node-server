import { DB } from '.';

const settings = {
  username: DB.USER,
  password: DB.PASSWORD,
  database: DB.NAME,
  host: DB.HOST,
  port: DB.PORT,
  dialect: 'postgres',
};

const development = settings;
const production = {
  ...settings,
  dialectOptions: { ssl: { rejectUnauthorized: false } },
};

export { development, production }; // eslint-disable-line import/prefer-default-export
