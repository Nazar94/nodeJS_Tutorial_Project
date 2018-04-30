var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title:'Hao! Title', condition:true});//index.hbs->layout.hbs(extends index.hbs->routes: here is title)
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
    res.send('respond with a resource');
});

//subroute
router.get('/users/detail', function(req, res, next) {
    res.send('detail');
});

module.exports = router;