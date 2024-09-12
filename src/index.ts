import './loadEnv.js';
import app from './app.js';
import { APP, DB } from './config/index.js';
import sequelize from './models/index.js';

async function bootstrap() {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log(`🔗  Database connected: ${DB.NAME} ✅`); // eslint-disable-line no-console
  app.listen(APP.PORT, () => {
    console.log(`🚀 Server is running on http://${APP.HOST}:${APP.PORT} ✅`);
  });
}

bootstrap().catch((error) => {
  console.error('❌  🚨  Bootstrap Error:', error); // eslint-disable-line no-console
});
