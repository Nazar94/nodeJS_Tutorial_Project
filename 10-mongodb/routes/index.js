var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');//for testing and checking datas

var url = 'mongodb://localhost:27017/test';//connection to mongodb database 'test'




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My title variable', condition: true, anyArray: [1,2,3] });
});

router.get('/get-data', function(req, res, next){
    //3. return array of values to view
    var resultArray=[];
   //1.getting data from db
    mongo.connect(url, function(err, database){
    assert.equal(null, err);
    var testDBget = database.db();
    var cursor = testDBget.collection('user-data').find();//var cursor-find data in 'user-data' collection by method find()
        //2.get actual data
    cursor.forEach(function(doc, err){
        assert.equal(null, err);
        resultArray.push(doc);
    }, function(){
        database.close();
        res.render('index', {items: resultArray})//render-for sure that we have done the
        //fetching of the data
        //render to index.hbs and send array with items
    });
   });
});


router.post('/insert', function(req, res, next){
    //extracting parameters from index.hbs: title, author..
    var item={
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };
   // inserting item to db
    mongo.connect(url, function(err, database){
        assert.equal(null, err);//checking on error
        //collection-not a database
        var testDBpost = database.db();
        testDBpost.collection('user-data').insertOne(item, function(err, result){
            assert.equal(null, err);
            console.log('item inserted');
            database.close();//closing data base
        });
    });
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

    mongo.connect(url, function(err, database){
        assert.equal(null, err);//checking on error
        //collection-not a database
        var testDBpost = database.db();
        testDBpost.collection('user-data').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result){//updateOne({"_id": id} "_id"-javascript object that i want to identify _id is equals the id from the request
            // objectId(id)-transforming id to id of the object
            //{$set: item} -new data that will replace old
            //{"_id": objectId(id)}-identify data, {$set: item},-specify new data
            assert.equal(null, err);
            console.log('item updated');
            database.close();//closing data base
        });
    });
});

router.post('/delete', function(req, res, next){
    var id = req.body.id;//getting id from body

    mongo.connect(url, function(err, database){
        assert.equal(null, err);//checking on error
        //collection-not a database
        var testDBdelete = database.db();
        testDBdelete.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result){
            //updateOne({"_id": id} "_id"-javascript object that i want to identify _id is equals the id from the request
            // objectId(id)-transforming id to id of the object
            //{$set: item} -new data that will replace old
            //{"_id": objectId(id)}-identify data, {$set: item},-specify new data
            //_id not a string -error appears in that case//error disappear
            assert.equal(null, err);
            console.log('item deleted');
            database.close();//closing data base
        });
    });
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