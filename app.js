require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// DB
const connect = require("./db/connect");

// Routes
const AuthRouter = require("./routes/auth");
const JobRouter = require("./routes/jobs");

// Auth middleware
const authenticateUser = require("./middleware/authentication");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
// extra packages

// routes
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/jobs", authenticateUser, JobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // mongo
    await connect(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
