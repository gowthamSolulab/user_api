import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';

import router from './components/index';

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

// Fetch data from the request
app.use(bodyParser.urlencoded({ extended: false }));

//  ROUTES
app.use('/api/v1', router);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    errorMessage: `Can't find ${req.originalUrl} on this server!`,
  });
});

export default app;
