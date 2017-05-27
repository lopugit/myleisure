
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var nodes = mongoose.createConnection("mongodb://localhost:27017/nodes")

var userSchema = new Schema({
  username: {type: String, unique: true},
  firstName: {type: String, default: "John"},
  lastName: {type: String, default: "Doe"},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  luckyNumber: {type: Number, default: 8}
});

var user = nodes.model('user', userSchema);

module.exports = user;
