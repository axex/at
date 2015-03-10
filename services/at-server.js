/**
 * Created by trump.wang on 2015/3/7.
 */
var dataHelper = require('./dataHelper');
var cfg = dataHelper.config;
var EnvService = require('./environments');

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.get('/', function(req, response){
    var path = require('path');
    var cwd = process.cwd();
    var url = path.join(cwd, "/statics/jump.html");
    var fs = require('fs');
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end( fs.readFileSync(url) );
});

app.post('/env/update', function(req, res) {
    if( req.body ) {
        var envServices = new EnvService();
        if( req.body.length ) {
            var list = envServices.getList();
            list && list.forEach(function(item){
                if(item.isAuto) {
                    envServices.remove(item.id, list);
                }
            });
            req.body.list.forEach(function(item ) {
                item.isAuto = true;
                envServices.save(item);
            });
        }
        res.send(req.body);
    }else{
        res.send(false);
    }
});

app.listen(cfg.port);
