import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import routes from './routes/index.js';
import { config } from './config/config.js';
import { initializePassport } from './config/passport.config.js';
import { errorHandler } from './middlewares/errors.middleware.js';
import { addLogger } from './middlewares/logger.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.cookies.secret));
app.use(addLogger);

initializePassport();
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.status(200).send('API Ecommerce profesional funcionando');
});

app.use('/api', routes);

app.use(errorHandler);

export default app;