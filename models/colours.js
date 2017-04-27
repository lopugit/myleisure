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

var coloursDbSchema = new Schema({
  id: {type: String, default: "colours"},
  name: {type: String, default: "colours"},
  colours: {type: [], default: null}
});

var colourSchema = new Schema({
  id: {type: String, default: null},
  name: {type: String, default: null},
  colour: {type: String, default: null},
  colourFamily: {type: String, default: null},
  tags: {type: [], default: ["all"]},
  image: {type: String, default: null}
});

// var descriptionsDb = mongoose.model("descriptions", descriptionsDbSchema);
var colour = mongoose.model("colour", colourSchema);

var colours = mongoose.model("colours", coloursDbSchema);

var newColoursDb = new colours({
  id: "colours",
  name: "colours",
  colours: []
});

var tags = {
  designer: true,
  woven: true,
  square: true,
  gradient: true,
  solid: true
};


var coloursDir = "./img/colours";

if(write) {
  console.log("writing colours to mongodb");
  /// Scan through colours folder to get all colour names
  fs.readdir(coloursDir, (err, files) => {

    files.forEach(group => {

      var groupFilePath = path.join(coloursDir, group);
      var stat = fs.statSync(groupFilePath);

      if (stat.isDirectory() && tags[group]) {

        fs.readdir(coloursDir + '/' + group, (err, files1) => {
          files1.forEach(imagePath => {


            console.log(group);
            console.log(tags[group]);
            console.log("this should be the image path");
            console.log(imagePath);
            var imageurl = path.join(coloursDir, group + '/' + imagePath);
            var stat1 = fs.statSync(imageurl);

            imageurl = "/" + imageurl;

            if (stat1.isFile()) {

              var imageName = imagePath.replace('.jpg','');

              var newColour = new colour({
                id: imageName,
                name: imageName,
                image: imageurl,
                tags: [group,"all"]
              });

              newColoursDb.colours.push(newColour);

            }

          });
        });
      };
    });
    readdircallback();
  });
}


function readdircallback() {

  colours.remove({}, function(err, colours) {

    if(err)
    console.log(err)

    else
      newColoursDb.save();
  });
};







module.exports = colours;
//
// if(mongoose.connection)
//   mongoose.connection.close();
