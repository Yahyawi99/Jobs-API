const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later!",
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors).map((item) => item.message);
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for the ${
      Object.keys(err.keyValue)[0]
    } field, please enter another value.`;
    customError.statusCode = 400;
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ message: customError.msg });
};

module.exports = errorHandlerMiddleware;
