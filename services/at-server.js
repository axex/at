/**
 * Created by trump.wang on 2015/3/7.
 */
var http = require('http');


var server = http.createServer(function (request, response) {
    var path = require('path');
    var cwd = process.cwd();
    var url = path.join(cwd, "/statics/jump.html");
    var fs = require('fs');
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end( fs.readFileSync(url) )
});


server.listen(7890, function(){
    console.log(arguments);
});
