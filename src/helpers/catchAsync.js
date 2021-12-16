import { logger } from '../logs/logger';
import { handleError } from '../helpers/responseHandler';
export default (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      logger.error(err);
      handleError(500, 'server error', res);
    });
  };
};
