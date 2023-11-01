const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mainRouter = require("./routes/mainRouter.routes.js");
const cors = require("cors");
const passport = require('passport');

require("./db.js");
require('./middlewares/google.js');
require('./middlewares/nodemailer.js');

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(express.json());
server.use(passport.initialize());

const allowedOrigins = [
  "https://blackgroupdesing.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
server.use(cors(corsOptions));

server.use("/", mainRouter);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
