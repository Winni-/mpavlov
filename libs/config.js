/*
 * https://github.com/sorokinvanya
 * Copyright (C) 2014 Ivan Sorokin <sorokindev@gmail.com>
 */

//
//   1. Аргументы командной строки
//   2. Переменные среды
//   3. Наш собственный файл с конфигурацией
//
var nconf = require('nconf');
nconf.argv()
  .env()
  .file({ file: './config/main.json' });

module.exports = nconf;