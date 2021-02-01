var MongoClient = require('mongodb');
var mongoose = require('mongoose');
let secrets = require('secrets')
dbconf = secrets.mongodb
let uri = secrets.mongodb.uri
let options = {  useNewUrlParser: true, useUnifiedTopology: true }
let db = mongoose.createConnection(uri, options)
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

var write = true;
//Only uncomment if you want to export hell
// module.exports = function (callback) {
module.exports = function(props) {
    if (!props) var props = {}
    return client.fetchProduct('9540545291').then(function(products) {
            var objects = {};
            if (!props.model) {
                if (props.model) objects.model = model
                objects.schema = generateSchema.mongoose(products.attrs.variants[0]);
                objects.products = products;
                return objects;

            } else {
                objects.products = products
                objects.product = props.model
                return objects
            }
        })
        .then(function(objects) {
            if (!props.model) {
                var productSchema = new Schema(objects.schema);
                productSchema.add({
                    images: { type: [], default: null },
                    thumbnail: { type: String, default: "thumb.jpg" },
                    name: { type: String, default: "lettini" },
                    colour: { type: String, default: null },
                    finish: { type: String, default: null },
                    frame: { type: String, default: null },
                    id: { type: String, default: objects.products.attrs.product_id },
                    variantId: { type: String, default: null }
                });
                var productModel = db.model("productModel", productSchema);
                productModel.remove({});
                objects.product = productModel;
                return objects;
            } else {
                return objects
            }
        }).then(function(objects) {
            if (write) {
                return objects.product.remove({ name: "lettini" }).then(function() {
                    return objects
                });
            } else {
                return objects
            }
        }).then(function(objects) {
            if (write) {
                var productsDir = "./img/shop/lettinis/hq";
                var products = objects.products;
                var product = objects.product;

                fs.readdir(productsDir, (err, skus) => {
                    skus.forEach(sku => {
                        for (var i = 0; i < products.variants.length; i++) {

                            if (products.variants[i].attrs.variant.sku === sku) {

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
            return objects.product;
        }).catch(function(objects) {
            return objects.product;
        });
}