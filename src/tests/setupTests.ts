import '../loadEnv';
import sequelize from '../models';

// Set up any global test configuration here
beforeAll(async () => {
  console.log('Setting up tests...');
  await sequelize.authenticate();

  // Drop all tables and recreate them
  await sequelize.drop();
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // Clean up any global setup here
  await sequelize.close();
});
