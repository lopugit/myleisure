var MongoClient = require('mongodb');

// mongodb = MongoClient.connect('mongodb://localhost/myleisure');

var mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost/myleisure");

var Schema = mongoose.Schema;

var write = false;

var descriptionSchema = new Schema({
  id: {type: String, default: null},
  url: {type: String, default: null},
  urls: {type: {}, default: null},
  name: {type: String, default: null},
  pages: {type: [], default: null},
  description: {type: String, default: null}
});

// var descriptionsDb = mongoose.model("descriptions", descriptionsDbSchema);
var description = mongoose.model("description", descriptionSchema);


var Default = new description({
  url: "/Home",
  name: "Default",
  description: "My Leisure takes relaxing in the sun to a whole new level with a range of quality sun loungers complete with canopy. Order yours online."
});
var beach = new description({
  url: "/Beach",
  name: "beach",
  description: "Design your own beach chair with My Leisure. Choose from a range of colour and frame designs and enjoy the unique canopy feature."
});
var pool = new description({
  url: "/Pool",
  name: "pool",
  description: "Make life by the poolside even more enjoyable and stylish with pool lounge chairs that can be customised to your tastes. Order online from My Leisure today."
});
var aboutus = new description({
  url: "/AboutUs",
  name: "aboutus",
  description: "Enjoy life by the pool or beach again with premiere design and quality from My Leisure outdoor furniture with our colourful and practical Lettini Sun Lounges with their own sun blocking canopy"
});

if(write)

  console.log("writing descriptions")
  description.remove({}, function(err, descriptions) {

    if(err)
      console.log(err)

    else
      Default.save();
      beach.save();
      pool.save();
      aboutus.save();
  });



module.exports = description;


// console.log("closing connection");
// if(mongoose.connection)
//   mongoose.connection.close();
