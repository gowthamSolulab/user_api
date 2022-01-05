import { logger } from './logger';

export default (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => {
    logger.error(err);
    return res.status(400).json({
      err,
    });
  });
};
