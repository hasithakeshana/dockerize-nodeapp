//import libraries
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const bodyParser = require('body-parser');
//initialize an express application
const app = express();

//loads the configuration file
require("dotenv").config();

//loads the middleware files
const versionRoutes = require("./controllers/versionRoutes");
const healthRoutes = require("./controllers/healthRoutes");

mongoose.Promise = global.Promise;

// Connect to MongoDB

const dbServer = process.env.DB_NAME;
const dbPort = process.env.MONGODB_PORT;

// "mongodb://mongo:27017/docker-node-mongo"
mongoose

  .connect(
    "mongodb://mongo:"+dbPort+"/"+dbServer,

    { useNewUrlParser: true }
  )

  .then(() => console.log("MongoDB Connected"))

  .catch((err) => console.log(err));

//express middleware that convert request body to JSON
//app.use(express.json());

app.use(bodyParser.json());

//converts request body to JSON, it also carries out some other functionalities like: converting form-data to JSON
app.use(express.urlencoded({ extended: true }));

//enable CORS
app.use(cors());

//mount the router on the app
app.use("/version", versionRoutes);

app.use("/health", healthRoutes);

app.listen(process.env.PORT, () => {
  console.log(`this app listening at portS ${process.env.PORT}`);
  
});
