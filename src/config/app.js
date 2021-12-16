import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { handleError } from '../helpers/responseHandler';
import router from '../routes/user/userRoutes';
import { logger } from '../logs/logger';

const app = express();

// json format
app.use(express.json());

// Development logging
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

//  ROUTES
app.use('/api/v1/users', router);

app.all('*', (req, res) => {
  logger.error(
    `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );
  handleError(404, `Can't find ${req.originalUrl} on this server!`, res);
});

export default app;
