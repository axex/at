/**
 * Created by trump.wang on 2015/3/7.
 */
var dataHelper = require('./dataHelper');
var cfg = dataHelper.config;



var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, response){
    var path = require('path');
    var cwd = process.cwd();
    var url = path.join(cwd, "/statics/jump.html");
    var fs = require('fs');
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end( fs.readFileSync(url) );
});

app.post('/env/update', function(req, res){
    if( req.body ) {
        if(req.body.list && req.body.list.length) {

        }

        res.send(true);
    }else{
        res.send(false);
    }
});

app.listen(cfg.port);
