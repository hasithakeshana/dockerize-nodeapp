const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define the schema of the collections
const HealthSchema = new Schema({
  status: { type: String },
  type: { type: String },
});

//console.log('HealthSchema',HealthSchema);

//create a model using schema
var Health = mongoose.model("Health", HealthSchema);

module.exports = Health;


