var express = require('express');
var router = express.Router();
var database = require('monk')('localhost:27017/test');//connect to bd
var userData = database.get('user-data');// get collection


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My title variable', condition: true, anyArray: [1,2,3] });
});

router.get('/get-data', function(req, res, next){
    //var data = userData.find({});//promise call sets up search querry
 //   var data = userData.find({})
  //  data.on('success', function(docs){
 //   data.then('success', function(docs){
    userData.find({}, function(err, docs) {
        if (err) throw err;
        res.render('index', {items: docs});
    });

/*Hi, i got this error after load data which redirect to [ /get-data ] :
 ( data.on is not a function )
 i checked all code again but nothing changes which appear the same error, so after searching about this i change your code by this new one :

 userData.find({}, function(err, docs) {
 if (err) throw err;
 res.render('index', {items: docs});
 });

 and the error gone ! so why this happened ? also notes :  i'm using this version [ "mongodb": "2.2.5", "monk": "3.1.1" ]  i didn't back to older mongodb version
 ///
 Replace 'removeByID' with just 'remove'
 AND 'updateByID' with 'update' for the newer Monk versions.﻿
 ///
 For monk version 6.0.5 these are the correct operations:
 ...
 var db = require('monk')('localhost:27017/test')
 var monk = require('monk')
 var userData = db.get('user-data')
 ...
 // READ: returns a promise
 ...
 var data = userData.find({}).then(function(docs) {
 res.render('index', {items: docs})
 })
 ...
 // INSERT: yeh is the same xD
 ...
 userData.insert(item)
 ...
 // UPDATE: I use de method id() from the monk module directly
 ...
 var id = req.body.id
 userData.update({"_id": monk.id(id)}, item)
 ...
 // DELETE
 var id = req.body.id
 userData.remove({"_id": monk.id(id)})
 ...
 */
 /*   data.on('success', function(docs){//passing datas to our view
        res.render('index', {items: docs});
    });
    */
});


router.post('/insert', function(req, res, next){
    //extracting parameters from index.hbs: title, author..
    var item={
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };
//    var insert =userData.insert(item); if we want handle error cases
    userData.insert(item);
    //after insertiing-redirect
    res.redirect('/');

});

router.post('/update', function(req, res, next){
    var item={
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };

    var id = req.body.id;//getting id from body

   userData.update({'_id': database.id(id)}, item);// first way to update
//        userData.updateById(id, item);//second way
    res.redirect('/');
});

router.post('/delete', function(req, res, next){
    var id = req.body.id;//getting id from body
//   userData.delete({'_id':database.id(id)});
   userData.remove(id);
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