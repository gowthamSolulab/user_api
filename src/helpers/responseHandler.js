import { errorStatus } from './errorData';

module.exports = {
  handleResponse: (statusCode, data, res) => {
    res.status(statusCode).json({
      status: 'Success',
      data,
    });
  },
  handleError: (statusCode, res) => {
    const error = errorStatus.find(
      (statusobj) => statusobj.status === statusCode
    );
    res.status(statusCode).json(error);
  },
};
