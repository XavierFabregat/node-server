export const APP = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'localhost',
  ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:8080',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh_secret',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'access_secret',
  ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || '1h',
  REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || '7d',
  JWT_COOKIE_NAME: 'jwt',
};

export const TEST_DB = {
  URL: process.env.TEST_DB_URL || 'postgres://localhost:5432/test_db',
  NAME: process.env.TEST_DB_NAME || 'test_db',
  LOGGING: false,
  USER: process.env.TEST_DB_USER || 'postgres',
  PASSWORD: process.env.TEST_DB_PASSWORD || '',
  HOST: process.env.TEST_DB_HOST || 'localhost',
  PORT: process.env.TEST_DB_PORT || '5432',
  DIALECT: 'postgres' as const,
};

export const DB = {
  URL: process.env.DB_URL || 'sqlite::memory:',
  NAME: process.env.DB_NAME || 'default',
  LOGGING: console.log,
  USER: process.env.DB_USER || 'postgres',
  PASSWORD: process.env.DB_PASSWORD || '',
  HOST: process.env.DB_HOST || 'localhost',
  PORT: process.env.DB_PORT || '5432',
  DIALECT: 'postgres' as const,
};
