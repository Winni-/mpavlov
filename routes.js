/*
 * https://github.com/sorokinvanya
 * Copyright (C) 2014 Ivan Sorokin <sorokindev@gmail.com>
 */

module.exports.setup = function (app, handlers, express, restrict, authenticate) {
  app.get('/v1/entities', handlers.entities.list);
  app.get('/v1/entities/:id', handlers.entities.get);
  app.post('/v1/entities', restrict, handlers.entities.create);
  app.put('/v1/entities/:id', restrict, handlers.entities.update);
  app.delete('/v1/entities/:id', restrict, handlers.entities.remove);

  app.get('/v1/project', handlers.project.list);
  app.get('/v1/project/:id', handlers.project.get);
  app.post('/v1/project', restrict, handlers.project.create);
  app.put('/v1/project/:id', restrict, handlers.project.update);
  app.delete('/v1/project/:id', restrict, handlers.project.remove);


  app.get('/v1/history', handlers.history.list);
  app.get('/v1/history/:id', handlers.history.get);
  app.post('/v1/history', restrict, handlers.history.create);
  app.put('/v1/history/:id', restrict, handlers.history.update);
  app.delete('/v1/history/:id', restrict, handlers.history.remove);


  app.get('/v1/contacts', handlers.contacts.list);
  app.get('/v1/contacts/:id', handlers.contacts.get);
  app.post('/v1/contacts', restrict, handlers.contacts.create);
  app.put('/v1/contacts/:id', restrict, handlers.contacts.update);
  app.delete('/v1/contacts/:id', restrict, handlers.contacts.remove);

  app.get("/",function(req, res) {
    res.render("index");
  });
  app.get("/admin", restrict, function(req, res) {
  	res.render("admin");
  });  

  // app.get('/restricted', restrict, function(req, res){
  //   res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
  // });

  // app.get('/logout', function(req, res){
  //   // destroy the user's session to log them out
  //   // will be re-created next request
  //   req.session.destroy(function(){
  //     res.redirect('/');
  //   });
  // });

  app.get('/login', function(req, res){
    res.render('login');
  });

  app.post('/login', function(req, res){
    authenticate(req.body.username, req.body.password, function(err, user){
      if (user) {
        // Regenerate session when signing in
        // to prevent fixation
        req.session.regenerate(function(){
          // Store the user's primary key
          // in the session store to be retrieved,
          // or in this case the entire user object
          req.session.user = user;
          req.session.success = 'Authenticated as ' + user.name
            + ' click to <a href="/logout">logout</a>. '
            + ' You may now access <a href="/restricted">/restricted</a>.';
          res.redirect('/admin');
        });
      } else {
        req.session.error = 'Authentication failed, please check your '
          + ' username and password.'
          + ' (use "tj" and "foobar")';
        res.redirect('/login');
      }
    });
  });
  // app.get("/:name", function(req, res) {
  //   var name = req.params.name;
  //   console.log("name is: "+name);
  //   res.render(name);
  // });
	app.get("*", function(req, res) {
		res.render("index");
	});
};