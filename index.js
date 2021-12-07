//import libraries
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const app = express();

//loads the configuration file
const config = require("./config");

// loads the middleware files
const versionRoutes = require("./controllers/versionRoutes");
const healthRoutes = require("./controllers/healthRoutes");

app.use(express.json());

const dbUrl = config.dbUrl;

const port = 3000;

app.use(cors());

mongoose.Promise = global.Promise;

//connect with mongodb cloud version
mongoose.connect(
  dbUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB connected");
  }
);

app.use(express.json()); //  useNewUrlParser: true, useFindAndModify: false

app.use(express.urlencoded({ extended: true }));

//mount the router on the app
app.use("/version", versionRoutes);

app.use("/health", healthRoutes);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
