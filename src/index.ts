import './loadEnv';
import app from './app';
import { APP, DB } from './config/index';
import sequelize from './models/index';

async function bootstrap() {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log(`🔗  Database connected: ${DB.NAME} ✅`);  
  app.listen(APP.PORT, () => {
    console.log(`🚀 Server is running on http://${APP.HOST}:${APP.PORT} ✅`);
  });
}

bootstrap().catch((error) => {
  console.error('❌  🚨  Bootstrap Error:', error);  
});
