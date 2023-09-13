require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// Swagger UI
const swagger = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = require("./swagger.yaml");

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

// extra packages
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const xss = require("xss-clean");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.get("/", (req, res) => {
  app.send(`
  <h1>JOBS API</h1>
  <a href="/api-docs">Documentation</a>
  `);
});

app.use("/api-docs", swagger.serve, swagger.setup(swaggerDoc));

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
