const mongoose = require("mongoose");
const dotenv = require("dotenv");

//handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("unhandled expression💥..shutting down");
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const { Server } = require("http");

const port = process.env.PORT || 5000;

const database = process.env.Database.replace(
  "<password>",
  process.env.Database_pass
);

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});

mongoose.connect(database, () => {
  console.log("Databse connected successfully!");
});

//catching any unhandled rejection and closing the server
process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("Unhandled rejection 💥...shutting down!");

  Server.close(() => {
    process.exit(1);
  });
});
