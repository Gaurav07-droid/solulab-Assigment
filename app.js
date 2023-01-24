const express = require("express");
const morgan = require("morgan");

const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const globalErrorHandler = require("./controller/globalErrorController");
const AppError = require("./utils/appError");
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoutes");

const app = express();

//Body parser
app.use(express.json({ limit: "10kb" }));

//Access-Control-Allow-Origin headers to all
app.use(cors());
app.options("*", cors());

//data sanitization (mongoDB)  for used for email changing to unauthorized login
app.use(mongoSanitize());

// data sanitization for xss
app.use(xss());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);

//For all other request to routes
app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

//Error handler for catching and handling all the errors in the application
app.use(globalErrorHandler);

module.exports = app;
