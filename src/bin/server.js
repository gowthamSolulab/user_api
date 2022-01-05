import { config } from 'dotenv';

import db from '../connections/dbMaster';
import { logger } from '../logs/logger';
import app from '../app';

process.on('uncaughtException', (err) => {
  logger.error(`UNCAUGHT EXCEPTION! | ${err.name} | ${err.message}`);
});

config({ path: './config.env' });

const port = process.env.PORT || 3000;

db();

app.listen(port, () => {
  logger.info(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  logger.error(`UNCAUGHT Rejection! | ${err.name} | ${err.message}`);
});
