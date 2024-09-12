export const APP = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'localhost',
  ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:8080',
};

export const DB = {
  URL: process.env.DB_URL || 'sqlite::memory:',
  NAME: process.env.DB_NAME || 'default',
  LOGGING: console.log,
};
