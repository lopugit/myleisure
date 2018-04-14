
var mongoose = require('mongoose');
Schema = mongoose.Schema;
dbconf = require('secrets')
dbconf = dbconf.mongodb
let uri = "mongodb://" + (dbconf.auth ? dbconf.username + ":" + dbconf.password + "@" : '') + dbconf.server + ":" + dbconf.port + "/" + dbconf.db + (dbconf.auth ? "?authSource="+dbconf.authDb+"" : '')
let options = { useMongoClient: true }
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
