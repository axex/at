/**
 * Created by trump.wang on 2015/3/7.
 */

var extend = require('extend');
var dataHelper = require('./dataHelper');
var envModel = require('../models/environment');

function Environment() {
    if(!(this instanceof  Environment)) {
        return new Environment();
    }
}

Environment.prototype.getList = function () {
    return dataHelper.read() || [];
};

Environment.prototype.getDetail = function(id) {
    var detail = this.getList().filter(function(item){
        return item.id == id;
    })[0];

    if(detail) {
        detail.accountStr = detail.accounts.map(function(o){
            return o.number + ' ' + o.accountType;
        }).join('\r\n');
    }

    return detail;
};

Environment.prototype.remove = function(id) {
    var list = this.getList();
    var index = -1;
    list.forEach(function(item, i){
        if(item.id == id){
            index = i;
        }
    });
    if(index >= 0) {
        list.splice(index,1);
        dataHelper.write(list);
    }
};

Environment.prototype.saveDetail = function(updateObj) {
    var detail = this.getDetail(updateObj.id)
        , hasData = !!detail;

    var list = this.getList();

    if(!hasData){
        detail = new envModel();
        list.push(detail);
    }


    updateObj.accounts = [];
    if(updateObj.accountStr) {

        updateObj.accountStr.split('\n').forEach(function(line){
            var numberReg = /\d+[\s|\d]*\d+/;
            var numberExec = numberReg.exec(line);
            if(numberExec){
                updateObj.accounts.push({
                    number: numberExec[0]
                    , type: line.replace(numberExec,'')
                });
            }
        });
    }

    extend( detail, updateObj);

    dataHelper.write(list);

    return detail;
};

module.exports =  Environment;