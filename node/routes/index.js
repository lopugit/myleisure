
var express = require('express');
var router = express.Router(),
fs = require('fs'),
path = require('path'),
glob = require('glob');

// glob.sync('./routes/CMS/pages/**/*.js').forEach(function(file) {
// 	var filename = file.replace('.js','');
// 	console.log(file);
// 	console.log(filename);
// 	module.exports[filename] = require(file);
//
// });


module.exports.index = require('./CMS/pages/index/all.js');
module.exports.CMS = require('./CMS/pages/admin/all.js');

console.log('running');
