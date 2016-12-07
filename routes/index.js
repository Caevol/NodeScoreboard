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

  var finalScore = 0;

  if(req.body.q1 === '25')
  {

    finalScore ++;
  }
  if(req.body.q2 === 'Texas')
  {

    finalScore ++;
  }
  if(req.body.q3 === '3')
  {

    finalScore ++;
  }
  if(req.body.q4a)
  {

    finalScore ++;
  }
  if(req.body.q4b)
  {

    finalScore ++;
  }
  if(req.body.q4c)
  {

    finalScore --;
  }

  var results = {
    'username' : req.body.username,
    'final' : finalScore
  }


  db.none('insert into userscores(username, points)' + 'values(${username}, ${final})', results)
    .then(function(){
      db.any('SELECT * FROM userscores ORDER BY points DESC LIMIT 10')
        .then(function(db){
          return res.render('scores', {db:db});
        })
        .catch(function(err){
          return next(err);
        })
        })

});

router.get('/scores', function(req, res, next){
  db.any('SELECT * FROM userscores ORDER BY points DESC LIMIT 10')
    .then(function(db){
      return res.render('scores', {db:db});
    })
    .catch(function(err){
      return next(err);
    })
})

module.exports = router;
