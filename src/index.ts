import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import pino from 'pino';
import i18next from 'i18next';
import * as i18nextMiddleware from 'i18next-http-middleware';
import {router as challengesRouter} from './routes/challenges.js';
import {router as healthRouter} from './routes/health.js';

const logger = pino({level: process.env.LOG_LEVEL || 'info'});
const app = express();

// i18n
await i18next.use(i18nextMiddleware.LanguageDetector).init({
  fallbackLng: 'en',
  preload: ['en', 'ar'],
  resources: {
    en: {translation: {ok: 'ok'}},
    ar: {translation: {ok: 'حسناً'}}
  },
  detection: {
    order: ['header', 'cookie', 'querystring'],
    caches: false
  }
});
app.use(i18nextMiddleware.handle(i18next));

// security
app.disable('x-powered-by');
app.use(
  helmet({
    contentSecurityPolicy: false // Frontend will set CSP; API returns JSON
  })
);
app.use(
  cors({
    origin: process.env.WEB_ORIGIN || 'http://localhost:3000',
    credentials: true
  })
);
app.use(cookieParser());
app.use(
  rateLimit({
    windowMs: 60_000,
    limit: 200,
    standardHeaders: true,
    legacyHeaders: false
  })
);
app.use(express.json({limit: '1mb'}));

// routes
app.use('/health', healthRouter);
app.use('/challenges', challengesRouter);

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  logger.error({err}, 'Unhandled error');
  res.status(500).json({error: 'internal_error'});
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  logger.info(`API listening on http://localhost:${port}`);
});


