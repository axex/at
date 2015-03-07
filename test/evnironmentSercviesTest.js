/**
 * Created by trump.wang on 2015/3/7.
 */
var EnvServices = require('../services/environments');

var services = new  EnvServices();
var assert = require('assert');

describe("services.environment", function(){
    describe("#getList", function(){
        var envList = services.getList();
        it('list should be instance of array', function(){
            assert.equal(true, envList instanceof  Array);
        })
    });
})