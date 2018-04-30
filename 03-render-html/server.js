var http = require('http'),
fs = require('fs'), // filesystem import-reads files
path = require('path'),
filePath = path.join(__dirname, './index.html');


//1st step-fetching it in our file system

function onRequest(request, response){
  //  response.writeHead(200, {"Content-Type": "text/plain"});
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile(filePath, null, function(error, data){
        if (error){
            response.writeHead(404);
            response.write('File not found');
        }else{
            response.write(data);
        }
        response.end();
    });

}

http.createServer(onRequest).listen(8000);

//    response.write('index.html');//it just show me the string 'index.html'
// response.end(); // should be in onRequest function because callback could
//not be used and not all data could be readen

// was exception 404 that html was not found
//resolution:
/*
// 107
 down vote
 accepted
 Use path.join(__dirname, '/start.html');
//
 var fs = require('fs'),
 path = require('path'),
 filePath = path.join(__dirname, 'start.html');

 fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
 if (!err) {
 console.log('received data: ' + data);
 response.writeHead(200, {'Content-Type': 'text/html'});
 response.write(data);
 response.end();
 } else {
 console.log(err);
 }
 });
 */
