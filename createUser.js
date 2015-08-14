var fakeRes = {};
fakeRes.send = function() {};
var fakenext = function() {};


var users = require('./handlers/users');

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)
var tj = {body:{}};
tj.body.name = "Winni";
hash('128635586', function(err, salt, hash){
  if (err) console.log(err);
  // store the salt & hash in the "db"
  tj.body.salt = salt;
  tj.body.hash = hash;
  
});

// Seed a user