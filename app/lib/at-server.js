/**
 * Created by trump.wang on 2015/3/7.
 */
var dataHelper = require('./helpers/data');
var cfg = dataHelper.config;
var EnvService = require('./services/environments');

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var path = require('path');
var cwd = process.cwd();

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(express.static(path.join(cwd, '/app/assets')) );

app.get('/', function(req, response){
    serverStatic(response, path.join(cwd, "/app/proxies/jump.html"));
});

app.get('/dpw', function(req, res) {
  debugger;
    serverStatic(res, path.join(cwd, "/app/proxies/dpw.html"));
});

app.post('/env/update', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    if( req.body ) {
        var envServices = new EnvService();
        if(  req.body.list &&  req.body.list.length ) {
            var list = envServices.getList();
            list && list.forEach(function(item){
                if(item.isAuto) {
                    envServices.remove(item.id, list);
                }
            });

            req.body.list.forEach(function(item ) {
                item.isAuto = true;
                if (item.accountStr.trim().length > 0) {
                  envServices.save(item);
                }
            });

            atEmitter.emit('dataSource.changed');
        }

        res.send(req.body);
    }else{
        res.send(false);
    }
});

app.listen(cfg.port, '0.0.0.0');


function serverStatic(response, filePath){
    var fs = require('fs');
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end( fs.readFileSync(filePath) );
}
