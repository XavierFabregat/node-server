import { APP, DB, TEST_DB } from '../../config/index';

describe('Configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('APP configuration', () => {
    it('should use default values when environment variables are not set', () => {
      process.env.NODE_ENV = 'development';
      const config = require('../../config/index').APP;
      expect(config).toEqual({
        PORT: 3000,
        HOST: 'localhost',
        ENV: 'development',
        JWT_SECRET: 'secret',
        CLIENT_URL: 'http://localhost:8080',
        REFRESH_TOKEN_SECRET: 'refresh_secret',
        ACCESS_TOKEN_SECRET: 'access_secret',
        ACCESS_TOKEN_LIFETIME: '1h',
        REFRESH_TOKEN_LIFETIME: '7d',
        JWT_COOKIE_NAME: 'jwt',
      });
    });

    it('should use environment variables when set', () => {
      process.env.PORT = '4000';
      process.env.HOST = 'example.com';
      process.env.NODE_ENV = 'production';
      process.env.JWT_SECRET = 'test_secret';
      process.env.CLIENT_URL = 'https://example.com';
      process.env.REFRESH_TOKEN_SECRET = 'test_refresh_secret';
      process.env.ACCESS_TOKEN_SECRET = 'test_access_secret';
      process.env.ACCESS_TOKEN_LIFETIME = '2h';
      process.env.REFRESH_TOKEN_LIFETIME = '14d';

      const config = require('../../config/index').APP;
      expect(config).toEqual({
        PORT: '4000',
        HOST: 'example.com',
        ENV: 'production',
        JWT_SECRET: 'test_secret',
        CLIENT_URL: 'https://example.com',
        REFRESH_TOKEN_SECRET: 'test_refresh_secret',
        ACCESS_TOKEN_SECRET: 'test_access_secret',
        ACCESS_TOKEN_LIFETIME: '2h',
        REFRESH_TOKEN_LIFETIME: '14d',
        JWT_COOKIE_NAME: 'jwt',
      });
    });
  });

  describe('DB configuration', () => {
    it('should use default values when environment variables are not set', () => {
      const config = require('../../config/index').DB;
      expect(config).toEqual({
        URL: 'sqlite::memory:',
        NAME: 'default',
        LOGGING: console.log,
        USER: 'postgres',
        PASSWORD: '',
        HOST: 'localhost',
        PORT: '5432',
        DIALECT: 'postgres',
      });
    });

    it('should use environment variables when set', () => {
      process.env.DB_URL = 'postgres://user:pass@host:5432/dbname';
      process.env.DB_NAME = 'test_db';
      process.env.DB_USER = 'test_user';
      process.env.DB_PASSWORD = 'test_password';
      process.env.DB_HOST = 'test_host';
      process.env.DB_PORT = '5433';

      const config = require('../../config/index').DB;
      expect(config).toEqual({
        URL: 'postgres://user:pass@host:5432/dbname',
        NAME: 'test_db',
        LOGGING: console.log,
        USER: 'test_user',
        PASSWORD: 'test_password',
        HOST: 'test_host',
        PORT: '5433',
        DIALECT: 'postgres',
      });
    });
  });

  describe('TEST_DB configuration', () => {
    it('should use default values when environment variables are not set', () => {
      const config = require('../../config/index').TEST_DB;
      expect(config).toEqual({
        URL: 'postgres://localhost:5432/test_db',
        NAME: 'test_db',
        LOGGING: false,
        USER: 'postgres',
        PASSWORD: '',
        HOST: 'localhost',
        PORT: '5432',
        DIALECT: 'postgres',
      });
    });

    it('should use environment variables when set', () => {
      process.env.TEST_DB_URL = 'postgres://test:pass@testhost:5432/testdb';
      process.env.TEST_DB_NAME = 'custom_test_db';
      process.env.TEST_DB_USER = 'test_user';
      process.env.TEST_DB_PASSWORD = 'test_password';
      process.env.TEST_DB_HOST = 'test_host';
      process.env.TEST_DB_PORT = '5433';

      const config = require('../../config/index').TEST_DB;
      expect(config).toEqual({
        URL: 'postgres://test:pass@testhost:5432/testdb',
        NAME: 'custom_test_db',
        LOGGING: false,
        USER: 'test_user',
        PASSWORD: 'test_password',
        HOST: 'test_host',
        PORT: '5433',
        DIALECT: 'postgres',
      });
    });
  });
});
