import { userLogger } from '../logs/logger';
module.exports = {
  handleResponse: (statusCode, data, res) => {
    res.status(statusCode).json({
      status: 'Success',
      data,
    });
  },
  handleError: (statusCode, error, res) => {
    userLogger.info('user signup failed mongoDB error');
    res.status(statusCode).json({
      status: 'fail',
      errorMessage: error,
    });
  },
};
