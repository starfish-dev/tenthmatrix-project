var mongodbRe = require('../tenthmatrix-frontend-controller/node_modules/mongodb')
var MongoClient = mongodbRe.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/jobshout_live';

module.exports = {
   mongodb : mongodbRe,
   MongoClient : MongoClient,
   mongoConnUrl : url,
   port : 3016, //default port
   recipientStr : 'joelle.abejero@starfi.sh',
   system_name : "Tenthmatrix Website",
   websiteUrl : 'https://tenthmatrix.co.uk',
   system_id : "5947ccfb8b69ec720d5814d4"
};
