var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Form Validation', success: false, errors: req.session.errors });
    res.render('index', { title: 'Form Validation', success: req.session.success, errors: req.session.errors });
    //req.session.success-take true or false from router.post
    /*if(errors) {
     req.session.errors = errors;
     req.session.success = false;
     }else{
     req.session.success=true;
     }*/
  req.session.errors=null;
  //you might want to add 'req.session.success=null here to reset it'
});


router.post('/submit', function(req, res, next){
    //Check validity
    req.check('email', 'Invalid email address').isEmail();// isEmail-validator, may usae others or your own
    req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);

    //equal()-checks if pass and conf pass equals
//    req.check('password', 'Password is invalid').isLength({min: 4}) if the minimum of characters is 4-valid property:value
    var errors= req.validationErrors();
    if(errors) {
        req.session.errors = errors;
        req.session.success = false;
    }else{
        req.session.success=true;
    }
    res.redirect('/');//redirection if validation is not success
    //nedd to passed to name in input field
    //  <input type="text" id="email" name="EMAIL"> req.check('EMAIL')
});

///test/:id.params2 ===req.params.id.params2
module.exports = router;

