var http = require('http');
var module = require('./module');
var module2 = require('./module2');


function onRequest(request, response){
    response.writeHead(200, {"Content-Type": "text/plain"});
 //   response.write(module.myString);
//    module.myFunction();
      response.write(module2.myVariable);
      module2.myFunction();
      response.end();
}

http.createServer(onRequest).listen(8000);


/*
http.createServer( function( request, response){
    response.writeHead(200, {"Content-Type": "text/plain"});
//   response.write(module.myString);
//    module.myFunction();
    response.write(module2.myVariable);
    module2.myFunction();
    response.end();
}*/