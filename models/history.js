/*
 * https://github.com/sorokinvanya
 * Copyright (C) 2014 Ivan Sorokin <sorokindev@gmail.com>
 */

var path = require('path');

module.exports = function (mongoose) {

  //Обьявляем схему для Mongoose
  var Schema = new mongoose.Schema({
    name: { type: String, required: true },   
    description: { type: String, required: true },
    date: { type: String, required: true }
  });

  // Инициализируем модель с именем файла, в котором она находится
  return mongoose.model(path.basename(module.filename, '.js'), Schema);
};