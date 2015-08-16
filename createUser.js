
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