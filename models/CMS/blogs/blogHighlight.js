var mongoose = require('mongoose');
dbconf = require('secrets')
dbconf = dbconf.mongodb
let uri = "mongodb://" + (dbconf.auth ? dbconf.username + ":" + dbconf.password + "@" : '') + dbconf.server + ":" + dbconf.port + "/" + dbconf.db + (dbconf.auth ? "?authSource="+dbconf.authDb+"" : '')
let options = { useMongoClient: true }
let db = mongoose.createConnection(uri, options)
var Schema = mongoose.Schema;

var blogHighlightSchema = new Schema({
  ordered: {type: Boolean, default: false},
  order: {type: String, default: "01"},
  title: {
    text: {type: String, default: "A highlight"},
    url: {type: String, default: null}
  },
  subtitle: {
    text: {type: String, default: "Highlight subtitle"},
    url: {type: String, default: null}
  },
  content: {
    paragraphs: {type: [String], default: ["A highlight paragraph"]}
  },
  image: {
    text: {type: String, default: null},
    url: {type: String, default: "/img/CMS/blogs/defaultHighlight.jpg"}
  }

})

var blogHighlight = db.model('blogHighlight', blogHighlightSchema);

// Blog.remove({});
// testBlog.save({});

module.exports = blogHighlight;
