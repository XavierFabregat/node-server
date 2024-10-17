import express from 'express';
import router from './router/index';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { APP } from './config/index';
import { errorHandler } from './middleware/errorHandler';

const app = express();

const lint = 'unused';

app.use(
  cors({
    origin: APP.CLIENT_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(errorHandler);

export default app;
