/*
 * https://github.com/sorokinvanya
 * Copyright (C) 2014 Ivan Sorokin <sorokindev@gmail.com>
 */

var path = require('path');

module.exports = function (db) {

  //Обьявляем схему для Mongoose
  var Schema = new db.Schema({
    name: {
	    type: String,
	    unique: true,
	    required: true
	},
	hash: {
	    type: String,
	    required: true
	},
	salt: {
	    type: String,
	    required: true
	}
  });

  // Инициализируем модель с именем файла, в котором она находится
  return db.model(path.basename(module.filename, '.js'), Schema);
};

