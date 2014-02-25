/*
 * https://github.com/sorokinvanya
 * Copyright (C) 2014 Ivan Sorokin <sorokindev@gmail.com>
 */

var mongoose = require('../libs/mongoose');

// Выставляем modelName
var modelName = 'entities';
// Подгружаем стандартные метода для CRUD документов
var handlers = require('../libs/crudHandler')(modelName);

module.exports = handlers;