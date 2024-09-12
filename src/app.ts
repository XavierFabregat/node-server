import express from 'express';
import router from './router/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { APP } from './config/index.js';

const app = express();

app.use(
  cors({
    origin: APP.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(router);

export default app;
