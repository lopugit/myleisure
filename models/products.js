var MongoClient = require('mongodb');

// mongodb = MongoClient.connect('mongodb://localhost/myleisure');

var mongoose = require('mongoose');

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

//Only uncomment if you want to export hell
// module.exports = function (callback) {
module.exports = client.fetchProduct('8461073805').then(function(products) {
  var objects = {};
  objects.schema = generateSchema.mongoose(products.attrs.variants[0]);
  objects.products = products;
  return objects;
})
.then(function(objects){
  var productSchema = new Schema(objects.schema);
  productSchema.add({
    images: {type: [], default: null},
    thumbnail: {type: String, default: "thumb.jpg"},
    name: {type: String, default: "lettini"},
    colour: {type: String, default: null},
    finish: {type: String, default: null},
    frame: {type: String, default: null},
    id: {type: String, default: objects.products.attrs.product_id},
    variantId: {type: String, default: null}
  });
  var productModel = mongoose.model("productModel", productSchema);
  productModel.remove({});
  objects.product = productModel;
  return objects;
}).then(function(objects){
  if(write) {
    console.log("writing products to mongodb");
    return objects.product.remove({name: "lettini"}).then(function(){
      return objects
    });
  }	else {
    return objects
  }
}).then(function(objects){

  if(write) {
    var productsDir = "./img/shop/lettinis/hq";
    var products = objects.products;
    var product = objects.product;

    fs.readdir(productsDir, (err, skus) => {
      skus.forEach(sku => {
        for (var i = 0; i < products.variants.length ; i++) {

          if ( products.variants[i].attrs.variant.sku === sku) {

            var tempProduct = products.variants[i].attrs.variant;
            var newProduct = new product(tempProduct);

            fs.readdir(productsDir + "/" + sku, (err, images) => {
              images.forEach(image => {
                newProduct.colour = tempProduct.option_values[1].value;
                newProduct.finish = tempProduct.option_values[2].value;
                newProduct.frame = tempProduct.option_values[0].value;
                newProduct.id = products.attrs.product_id;
                newProduct.variantId = tempProduct.id;
                newProduct.images.push(image);
              });
              newProduct.save();
            });

          };
        };
      });
    });

    return objects

  } else {
    return objects
  }

}).then(function(objects) {
  // console.log(objects.product);
  return objects.product;
}).catch(function(objects) {
  // console.log(objects.product);
	return objects.product;
});
