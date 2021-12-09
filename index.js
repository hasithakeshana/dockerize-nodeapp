//import libraries
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

//initialize an express application
const app = express();

//loads the configuration file
require("dotenv").config();

//loads the middleware files
const versionRoutes = require("./controllers/versionRoutes");
const healthRoutes = require("./controllers/healthRoutes");

mongoose.Promise = global.Promise;

//connect with mongodb cloud version
mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB connected");
  }
);

//express middleware that convert request body to JSON
app.use(express.json());

//converts request body to JSON, it also carries out some other functionalities like: converting form-data to JSON
app.use(express.urlencoded({ extended: true }));

//enable CORS
app.use(cors());

//mount the router on the app
app.use("/version", versionRoutes);

app.use("/health", healthRoutes);


app.listen(process.env.PORT, () => {
  console.log(`this app listening at port ${process.env.PORT}`);
});
