var mongoose = require('mongoose');
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

var blogHighlight = mongoose.model('blogHighlight', blogHighlightSchema);

// Blog.remove({});
// testBlog.save({});

module.exports = blogHighlight;
