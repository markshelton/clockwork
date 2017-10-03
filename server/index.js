// Main starting point of the application
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser"); // json parser
const morgan = require("morgan"); // logging framework
const app = express();
const router = require("./router");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird")

const dbUri = "mongodb://localhost/auth";

// DB Setup
mongoose.connect(dbUri, {useMongoClient: true})
  .then(function() {console.log(`Database connected at ${dbUri}`);})
  .catch(function(err) {console.log(`Database connection error: ${err.message}`);});

// App Setup
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({type: "*/*"}));
router(app);

// Server Setup
const port = process.env.Port || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on:", port);