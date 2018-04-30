var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My title variable', condition: true, anyArray: [1,2,3] });
});

router.get('/test/:id', function(req, res, next){//expecting for id parameter '/test/:id'
    res.render('test', {output: req.params.id}); ///test/:ID === req.params.ID parameters should be the same
});

router.post('/test/submit', function(req, res, next){//post add smth to database and then show it to user need redirection to show
    //post add smth to database redirect user to another page
    // var id = req.params.id;//in post all parameters are send in body
    var id = req.body.id;// here id is the parametr from body that was taken from input field
   // res.redirect('/test/...');
    res.redirect('/test/' + id);
});

///test/:id.params2 ===req.params.id.params2
module.exports = router;

