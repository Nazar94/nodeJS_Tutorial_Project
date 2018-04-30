var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test2');
var Schema = mongoose.Schema;//tell mongoose how data looks like

//define how mongoose write data to the database
//creating schema
var userDataSchema = new Schema({       //define schema for user data
    title: {type: String, required:true},    //validation make like javascript object
    content: String,
    author: String
}, {collection: 'user-data'});//additional javascript object in schema construction that contains
//some options

//creating model of the userDataSchema
var UserData = mongoose.model('UserData', userDataSchema);//input name of the model and the schema of the model

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next){
        UserData.find().then(function(doc){
            res.render('index', {items: doc});
            });
});


router.post('/insert', function(req, res, next){
    //extracting parameters from index.hbs: title, author..
    var item={
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };
        var data= new UserData(item);//new data model where passed item
        data.save();
    //after insertiing-redirect
    res.redirect('/');
});

router.post('/update', function(req, res, next){
/*    var item={
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };
*/
    var id = req.body.id;//getting id from body

    UserData.findById(id, function(err, doc){
        if(err){
            console.log.error('error, no entry found');
        }
        doc.title = req.body.title; //updating content
        doc.content = req.body.content;
        doc.author = req.body.author;
        doc.save();//save doc-update data with new information
    });
    res.redirect('/');
});

router.post('/delete', function(req, res, next){
    var id = req.body.id;//getting id from body
    UserData.findByIdAndRemove(id).exec();//execute
    res.redirect('/');
});

module.exports = router;

/*
 MongoClient.connect(uristring, function (err, database) {
 var db=database.db('chatroomApp');
 var collections=db.collection('chats');
 });
 Need to Get the Database first before trying to access the collections.
 */
/*When you run..

 MongoClient.connect(db.url,(err,database) =>{ }
 In mongodb version >= 3.0, That database variable is actually the parent object of the object you are trying to access with database.collection('whatever'). To access the correct object, you need to reference your database name, for me that was by doing

 MongoClient.connect(db.url,(err,database) =>{
 const myAwesomeDB = database.db('myDatabaseNameAsAString')
 myAwesomeDB.collection('theCollectionIwantToAccess')
 }
 This fixed my errors when running my node.js server, hopefully this helps somebody who doesn't just want to downgrade their version.
    */