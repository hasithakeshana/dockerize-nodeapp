const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define the schema of the collection
const VersionSchema = new Schema({

    name: {type:String},
    group : {type:String},
    status : {type:String},

});

//create a model using schema
const Versions = mongoose.model('Versions',VersionSchema);


module.exports = Versions;