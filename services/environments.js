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
    return this.getList().filter(function(item){
        return item.id == id;
    })[0];
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

    extend(true, detail, updateObj);

    dataHelper.write(list);

    return detail;
};

module.exports =  Environment;