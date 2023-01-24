const AppError = require("../utils/appError");

//Required fields error from mongoDB
const handleCastError = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

//Duplicate fields error from mongoDB
const handleDupKeyError = (err) => {
  if (err.keyValue.user && err.keyValue.movie) {
    const revMessage = "You only review a movie once!";
    return new AppError(revMessage, 400);
  }

  const message = `"${err.keyValue.name}" name already exist!Please try another`;
  return new AppError(message, 400);
};

//Min length or max length fields error from mongoDB
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data.${errors.join(". ")}`;
  return new AppError(message, 400);
};

//sending error in production //genric error messages
const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    //1) Log error
    console.error("ERROR💥", err);

    //2) send genric message
    return res.status(500).json({
      status: "fail",
      message: "Oops!something went wrong",
    });
  }
};

//sending error to developer
const sendErrorDev = (err, req, res) => {
  //Sending error to the developer with the stack for easy tracking
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (err.name === "CastError") error = handleCastError(err);
    if (err.code === 11000) error = handleDupKeyError(err);
    if (err.name === "ValidationError") error = handleValidationError(err);

    sendErrorProd(error, req, res);
  }
};

module.exports = errorHandler;
