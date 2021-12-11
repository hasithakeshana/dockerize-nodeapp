const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define the schema of the collections
const HealthSchema = new Schema({
  status: { type: String },
  type: { type: String },
});

//create a model using schema
const Health = mongoose.model("Health", HealthSchema);

module.exports = Health;
