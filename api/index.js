// Main starting point of the application
require("dotenv").config({ path: "../.env" });
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser"); // json parser
const morgan = require("morgan"); // logging framework
const app = express();
const router = require("./routes/");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const dbHost = process.env.DB_HOST || "localhost";
const dbName = process.env.DB_NAME || "default";
const serverPort = process.env.SERVER_PORT || 3090;
const dbUri = `mongodb://${dbHost}/${dbName}`;

// DB Setup
mongoose
  .connect(dbUri, { useMongoClient: true })
  .then(function() {
    console.log(`Database connected at ${dbUri}`);
  })
  .catch(function(err) {
    console.log(`Database connection error: ${err.message}`);
  });

// App Setup
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));

router(app);

// Server Setup
const server = http.createServer(app);
server.listen(serverPort);
console.log("Server Listening on:", serverPort);

module.exports = { dbHost, serverPort, dbUri };
