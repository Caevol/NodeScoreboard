var express = require('express');
var router = express.Router();
var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/scores';
var db = pgp(connectionString);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.post('/game', function(req, res, next){
  res.render('game', {username: req.body.username})
});


router.get('/game', function(req, res, next){
  res.render('game', {username: "Anonymous" })
});

router.post('/scores', function(req, res, next){
  console.log(req.body);




  db.any('SELECT * FROM userscores ORDER BY points LIMIT 5')
    .then(function(db){
      return res.render('scores', {db:db});
    })
    .catch(function(err){
      return next(err);
    })
});

router.get('/scores', function(req, res, next){
  db.any('SELECT * FROM userscores ORDER BY points LIMIT 5')
    .then(function(db){
      console.log(db);
      return res.render('scores', {db:db});
    })
    .catch(function(err){
      return next(err);
    })
})

module.exports = router;
