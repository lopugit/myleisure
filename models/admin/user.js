
var mongoose = require('mongoose');
Schema = mongoose.Schema;
let secrets = require('secrets')
dbconf = secrets.mongodb
let uri = secrets.mongodb.uri
let options = {  useNewUrlParser: true, useUnifiedTopology: true }
let db = mongoose.createConnection(uri, options)

var userSchema = new Schema({
  username: {type: String, unique: true},
  firstName: {type: String, default: "John"},
  lastName: {type: String, default: "Doe"},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  luckyNumber: {type: Number, default: 8}
});

var user = db.model('user', userSchema);

module.exports = user;
