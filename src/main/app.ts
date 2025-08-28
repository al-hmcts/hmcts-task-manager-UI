import * as path from 'path';

import { HTTPError } from './HttpError';
import { Nunjucks } from './modules/nunjucks';

import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from "express-session";
import { glob } from 'glob';
import favicon from 'serve-favicon';
import { attachClients } from './middleware/attachClients';

const { setupDev } = require('./development');

const env = process.env.NODE_ENV || 'development';
const developmentMode = env === 'development';

export const app = express();
app.locals.ENV = env;

new Nunjucks(developmentMode).enableFor(app);

app.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
  next();
});
app.use(session({
  secret: process.env.SESSION_SECRET ?? "dev-secret",
  resave: false,
  saveUninitialized: false,
}));
app.use(attachClients(process.env.API_URL || "http://localhost:4000"));

glob
  .sync(__dirname + '/routes/**/*.+(ts|js)')
  .map(filename => require(filename))
  .forEach(route => route.default(app));

setupDev(app, developmentMode);

// error handler
app.use(
  (err: HTTPError | any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err); // log for debugging

    const message = err?.message || 'Something went wrong';
    const status = err?.status || 500;

    res.locals.message = message;
    res.locals.error = env === 'development' ? err : {};
    res.status(status).render('error');
  }
);
