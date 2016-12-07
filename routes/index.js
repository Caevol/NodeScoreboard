var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.post('/game', function(req, res, next){
  console.log(req.body);
  res.render('game', {username: req.body.username})
});


router.get('/game', function(req, res, next){
  res.render('game', {username: "Anonymous" })
});

module.exports = router;
