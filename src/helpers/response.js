const response = async (statusCode, data, res) => {
  res.status(statusCode).json({
    status: "Success",
    data,
  });
};

export default response;
