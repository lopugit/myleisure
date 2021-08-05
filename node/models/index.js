var path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    files = fs.readdirSync(__dirname);
files.forEach(function(file) {
    var name = path.basename(file, '.js');
    if ((name === 'index') || (file.indexOf('.js') == -1))
      return;

    var mod = require('./' + name);
    if (mod.model)
      var promiseType = typeof mod.then == 'function';
      if (promiseType)
        module.exports[name] = mod.then(function(model){
          return model;
        })
      else
        module.exports[name] = mod;

});
