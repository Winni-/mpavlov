/*
 * https://github.com/sorokinvanya
 * Copyright (C) 2014 Ivan Sorokin <sorokindev@gmail.com>
 */

var db = require('./mongoose');

module.exports = function (modelName) {

  // Список документов
  var list = function (req, res, next) {
    db.model(modelName).find({}, function (err, data) {
      if (err) next(err);
      res.send(data);
    });
  };

  // Один документ
  var get = function (req, res, next) {
    db.model(modelName).find({_id: req.params.id}, function (err, data) {
      if (err) next(err);
      if (data) {
        res.send(data);
      } else {
        res.send(404);
      }
    })
  };

  // Создаем документ
  var create = function (req, res, next) {

    db.model(modelName).create(req.body, function (err, data) {
      if (err) {
        next(err);
      }
      res.send(data);
    });
  };

  // Обновляем документ
  var update = function (req, res, next) {
    db.model(modelName).update({_id: req.params.id}, {$set: req.body}, function (err, numberAffected, data) {
      if (err) next(err);

      if (numberAffected) {
        res.send(200);
      } else {
        res.send(404);
      }

    })
  };

  // Удаляем документ
  var remove = function (req, res, next) {
    db.model(modelName).remove({_id: req.params.id}, function (err, data) {
      if (err) next(err);
      res.send(data ? req.params.id : 404);
    });
  };

  return {
    list  : list,
    get   : get,
    create: create,
    update: update,
    remove: remove
  }
};

