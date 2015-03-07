/**
 * Created by trump.wang on 2015/3/7.
 */
var EnvServices = require('../services/environments');

var services = new  EnvServices();

descripe("services.environment", function(){
    describe("#getList", function(){
        var envList = services.getList();
    });
})