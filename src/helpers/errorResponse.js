const errorResponse = (statusCode, error, res) => {
  res.status(statusCode).json({
    status: "fail",
    errorMessage: error,
  });
};

export default errorResponse;
