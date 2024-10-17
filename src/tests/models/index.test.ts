import { Sequelize } from 'sequelize-typescript';
import { createSequelizeInstance } from '../../models/index';
import { DB, APP, TEST_DB } from '../../config/index';

jest.mock('sequelize-typescript');
jest.mock('../../config/index');

describe('Sequelize Configuration', () => {
  let mockSequelize: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSequelize = jest.fn();
    (Sequelize as unknown as jest.Mock).mockImplementation(mockSequelize);
  });

  it('should create Sequelize instance with test configuration', () => {
    (APP.ENV as string) = 'test';
    Object.assign(TEST_DB, {
      URL: 'test-db-url',
      LOGGING: false,
      DIALECT: 'sqlite',
    });

    createSequelizeInstance();

    expect(mockSequelize).toHaveBeenCalledWith('test-db-url', {
      storage: ':memory:',
      logging: false,
      modelPaths: expect.any(Array),
      dialectOptions: {},
      dialect: 'sqlite',
      pool: {
        max: 15,
        min: 0,
        idle: 10000,
        acquire: 60000,
      },
      query: { raw: true },
    });
  });

  it('should use production configuration when APP.ENV is production', () => {
    (APP.ENV as string) = 'production';
    Object.assign(DB, {
      URL: 'prod-db-url',
      LOGGING: true,
      DIALECT: 'postgres',
    });

    createSequelizeInstance();

    expect(mockSequelize).toHaveBeenCalledWith('prod-db-url', {
      storage: ':memory:',
      logging: true,
      modelPaths: expect.any(Array),
      dialectOptions: {
        ssl: { rejectUnauthorized: false },
      },
      dialect: 'postgres',
      pool: {
        max: 15,
        min: 0,
        idle: 10000,
        acquire: 60000,
      },
      query: { raw: true },
    });
  });

  it('should set SSL configuration when APP.ENV is production', () => {
    (APP.ENV as string) = 'production';
    Object.assign(DB, {
      URL: 'prod-db-url',
      LOGGING: true,
      DIALECT: 'postgres',
    });

    createSequelizeInstance();

    expect(mockSequelize).toHaveBeenCalledWith(
      'prod-db-url',
      expect.objectContaining({
        dialectOptions: {
          ssl: { rejectUnauthorized: false },
        },
      })
    );
  });

  it('should not set SSL configuration when APP.ENV is not production', () => {
    (APP.ENV as string) = 'development';
    Object.assign(DB, {
      URL: 'dev-db-url',
      LOGGING: true,
      DIALECT: 'postgres',
    });

    createSequelizeInstance();

    expect(mockSequelize).toHaveBeenCalledWith(
      'dev-db-url',
      expect.objectContaining({
        dialectOptions: {},
      })
    );
  });
});
