/*
 * https://github.com/sorokinvanya
 * Copyright (C) 2014 Ivan Sorokin <sorokindev@gmail.com>
 */

var express = require('express');
var path = require('path');
var winston = require('winston');
var hash = require('pwd').hash;
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes'); // Файл с роутам
var config = require('./libs/config'); // Используемая конфигурация
var db = require('./libs/mongoose'); // Файл работы с базой MongoDB

var app = express(); // Создаем обьект express

app.use(express.json()); // "Обучаем" наше приложение понимать JSON и urlencoded запросы
app.use(express.urlencoded());
app.use(express.methodOverride()); // Переопределяем PUT и DELETE запросы для работы с WEB формами

app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.static("static"));




// Если произошла ошибка валидации то отдаем 400 Bad Request
app.use(function (err, req, res, next) {
  console.log(err.name);
  if (err.name == "ValidationError") {
    res.send(400, err);
  } else {
    next(err);
  }
})

// Если же произошла иная ошибка то отдаем 500 Internal Server Error
app.use(function (err, req, res, next) {
  res.send(500, err);
});

//Аутентификация
// middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));

// Session-persisted message middleware

app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});






// Authenticate using our plain-object database of doom!

function authenticate(name, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', name, pass);
  var User = {};
  db.model("users").find({name: name}, function (err, data) {
    if (err) console.log(err);
    user = data[0];
    // query the db for the given username
    if (!user) return fn(new Error('cannot find user'));
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user
    
    hash(pass, user.salt, function(err, hash){
      console.log(user.salt);
      if (err) return fn(err);
      if (hash == user.hash) return fn(null, user);
      fn(new Error('invalid password'));
    });
  });  

}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}





// Инициализируем Handlers
var handlers = {
  entities: require('./handlers/entities'),
  project: require('./handlers/project'),
  history: require('./handlers/history'),
  contacts: require('./handlers/contacts')
}

// Метод запуска нашего сервера
function run() {
  routes.setup(app, handlers, express, restrict, authenticate); // Связуем Handlers с Routes
  db.init(path.join(__dirname, "models"), function (err, data) {
    //Выводим сообщение об успешной инициализации базы данных
    winston.info("All the models are initialized");
    app.listen(config.get('port'), function () {
      // Сервер запущен
      winston.info("App running on port:" + config.get('port'));
    });
  });
}

if (module.parent) {
  //Если server.js запущен как модуль то отдаем модуль с методом run
  module.exports.run = run;
} else {
  //Иначе стартуем сервер прямо сейчас
  run();
}




var fakeRes = {};
fakeRes.send = function() {};
var fakenext = function() {};


var users = require('./handlers/users');

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)
var tj = {body:{}};
tj.body.name = "Winni";
var create = function (req, res, next) {
  db.model("users").create(req.body, function (err, data) {
    if (err) {
      console.log(err);
      next(err);
    }
    res.send(data);
  });
};
hash('128635586', function(err, salt, hash){
  if (err) console.log(err);
  // store the salt & hash in the "db"
  tj.body.salt = salt;
  tj.body.hash = hash;
  create(tj, fakeRes, fakenext);
  
});

