/* eslint-disable @typescript-eslint/no-require-imports */

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('loadEnv', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  let dotenvMock: { config: jest.Mock };

  beforeEach(() => {
    jest.resetModules();
    dotenvMock = require('dotenv') as { config: jest.Mock };
    dotenvMock.config.mockClear();
  });

  afterAll(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  it('should use .env.test when NODE_ENV is test', () => {
    process.env.NODE_ENV = 'test';
    require('../loadEnv');
    expect(dotenvMock.config).toHaveBeenCalledWith({ path: '.env.test' });
  });

  it('should use .env when NODE_ENV is not test', () => {
    process.env.NODE_ENV = 'development';
    require('../loadEnv');
    expect(dotenvMock.config).toHaveBeenCalledWith({ path: '.env' });
  });

  it('should use .env when NODE_ENV is production', () => {
    process.env.NODE_ENV = 'production';
    require('../loadEnv');
    expect(dotenvMock.config).toHaveBeenCalledWith({ path: '.env' });
  });

  it('should use .env when NODE_ENV is not set', () => {
    delete process.env.NODE_ENV;
    require('../loadEnv');
    expect(dotenvMock.config).toHaveBeenCalledWith({ path: '.env' });
  });
});
