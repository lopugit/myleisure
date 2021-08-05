var MongoClient = require('mongodb');
var mongoose = require('mongoose');
let secrets = require('secrets')
dbconf = secrets.mongodb
let uri = secrets.mongodb.uri
let options = {  useNewUrlParser: true, useUnifiedTopology: true }
let db = mongoose.createConnection(uri, options)
var simpl = require('simpl-schema');
var fs = require('fs');
var path = require('path');

var generateSchema = require('generate-schema');

var Schema = mongoose.Schema;

var shopify = require('shopify-buy');

var client = shopify.buildClient({
  accessToken: 'b064ae6e618e3677e2a78cce4eb248d6',
  domain: 'myieisure.myshopify.com',
  appId: '6'
});

var write = false;



var productSchema = new Schema({

  productTitle: {type: String, default: "product"},
  id: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},
  property: {type: String, default: null},

});

var product = db.model('product', productSchema);

if(write){
  module.exports = product;
}
