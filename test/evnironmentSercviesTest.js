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
        });
    });

    describe('#saveData', function(){
        var envList = services.getList();
        var id;
        it('envList length should add 1', function(){
            var length1 = envList.length;
            var savedResult = services.saveDetail({
                name: 'test env'
                , url: 'http://localhost:9901/login/login.asp'
            });
            var length2 = envList.length;
            assert.equal(length1+1, length2);
            id = savedResult.id;
        });

        it('new data should be update', function(){
            var newData = services.getDetail(id);
            newData.name = 'new name';

            services.saveDetail(newData);

            var newData1 = services.getDetail(id);

            assert(newData.name , newData1.name);
        });

        it('new data should be remove', function(){
            var length1 = envList.length;
            services.remove(id);
            var length2 = envList.length;
            assert.equal(length1-1, length2);
        });
    });
});