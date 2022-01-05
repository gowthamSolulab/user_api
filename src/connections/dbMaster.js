import { connect } from 'mongoose';
import { config } from 'dotenv';

import { logger } from '../logs/logger';

config({ path: './config.env' });

const db = () =>
  connect(process.env.DATABASE).then(() =>
    logger.info('DB connection successful!')
  );

export default db;
