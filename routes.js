/*
 * https://github.com/sorokinvanya
 * Copyright (C) 2014 Ivan Sorokin <sorokindev@gmail.com>
 */

module.exports.setup = function (app, handlers) {
  app.get('/v1/entities', handlers.entities.list);
  app.get('/v1/entities/:id', handlers.entities.get);
  app.post('/v1/entities', handlers.entities.create);
  app.put('/v1/entities/:id', handlers.entities.update);
  app.delete('/v1/entities/:id', handlers.entities.remove);
};