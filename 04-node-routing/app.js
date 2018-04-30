var url = require('url');
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, './index.html');
var loginPath = path.join(__dirname, './login.html');

function renderHTML(path, response){
        fs.readFile(path, null, function(error, data){
            if (error){
                response.writeHead(404);
                response.write('File not found');
            }else{
                response.write(data);
            }
            response.end();
        });
}

module.exports = {
    handleRequest: function(request, response){
        response.writeHead(200, {'Context-Type': "text/html"});
        var path = url.parse(request.url).pathname;
        switch (path){
            case '/':
                renderHTML(filePath, response);
                break;
            case '/login':
                renderHTML(loginPath, response);
                break;
                response.writeHead(404);
                response.write("Route is not defined");
                response.end();
        }
    }
};
