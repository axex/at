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
    return dataHelper.read();
};

Environment.prototype.getDetail = function(id) {
    return this.getList().filter(function(item){
        return item.id == id;
    });
};

Environment.prototype.saveDetail = function(id, updateObj) {
    var detail = this.getDetail(id)
        , hasData = !!detail;

    if(!hasData){
        detail = new envModel();
        this.getList().push(detail);
    }
    extend(detail, updateObj);
    dataHelper.save();
};

module.exports =  Environment;