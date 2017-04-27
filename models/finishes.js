var MongoClient = require('mongodb');

// mongodb = MongoClient.connect('mongodb://localhost/myleisure');

var mongoose = require('mongoose');

var fs = require('fs');
var path = require('path');


var write = false;

// mongoose.connect("mongodb://localhost/myleisure");
//
// var db = mongoose.connection;

var Schema = mongoose.Schema;

var finishesDbSchema = new Schema({
  id: {type: String, default: "finishes"},
  name: {type: String, default: "finishes"},
  finishes: {type: [], default: null}
});

var finishSchema = new Schema({
  id: {type: String, default: null},
  name: {type: String, default: null},
  finish: {type: String, default: null},
  finishFamily: {type: String, default: null},
  tags: {type: [], default: ["all"]},
  image: {type: String, default: null},
  url: {type: String, default: null}
});

// var descriptionsDb = mongoose.model("descriptions", descriptionsDbSchema);
var finish = mongoose.model("finish", finishSchema);

var finishes = mongoose.model("finishes", finishesDbSchema);

var finishesDir = "/img/finishes/hq/";

var white = new finish({
  finish: "white",
  image: finishesDir + "white.png",
  url: finishesDir + "white.png",
  tags: ["all", "in stock"]
});

var silver = new finish({
  finish: "silver",
  image: finishesDir + "silver.png",
  url: finishesDir + "silver.png",
  tags: ["all", "in stock"]
});

var bronze = new finish({
  finish: "bronze",
  image: finishesDir + "bronze.png",
  url: finishesDir + "bronze.png",
  tags: ["all", "in stock"]
});

var graphite = new finish({
  finish: "graphite",
  image: finishesDir + "graphite.png",
  url: finishesDir + "graphite.png",
  tags: ["all"]
});

var wooden = new finish({
  finish: "wooden",
  image: finishesDir + "wooden.png",
  url: finishesDir + "wooden.png",
  tags: ["all"]
});


var newFinishesDb = new finishes({
  id: "finishes",
  name: "finishes",
  finishes: [
    silver,
    bronze,
    white,
    graphite,
    wooden
  ]
});




if(write)
  console.log("writing finishes");
  finishes.remove({}, function(err, finishes) {

    if(err)
      console.log(err)

    else
      newFinishesDb.save();
  });


module.exports = finishes;
//
// if(mongoose.connection)
//   mongoose.connection.close();
