var MongoClient = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.createConnection("mongodb://localhost:27017/myleisure")
var simpl = require('simpl-schema');
var fs = require('fs');
var path = require('path');

var generateSchema = require('generate-schema');

var Schema = mongoose.Schema;

var shopify = require('shopify-buy');

var client = shopify.buildClient({
  accessToken: '30197388c16741334138de5dd1de3f1a',
  domain: 'my-leisure.myshopify.com',
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
