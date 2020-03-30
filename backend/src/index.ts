import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as Sentry from '@sentry/node';
import { sentryConfig } from 'config';
import { ErrorHandler } from 'middlewares';
import routes from 'routes';

const app = express();

app.use(cors());
app.use(express.json());

Sentry.init(sentryConfig);
app.use(Sentry.Handlers.requestHandler());

app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(Sentry.Handlers.errorHandler());
}

app.use(ErrorHandler);

app.disable('x-powered-by');
app.listen(process.env.PORT, () =>
  console.log(
    '\x1b[7m\x1b[5m\x1b[42m\x1b[94m%s\x1b[0m',
    `Application listening on PORT ${process.env.PORT}`
  )
);
