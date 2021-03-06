var extend = require('extend');
var dataHelper = require('../helpers/data');
var envModel = require('../models/environment');

function Environment() {
    if(!(this instanceof  Environment)) {
        return new Environment();
    }
}

Environment.prototype.getTypes = function () {
  return [
    {
      name: 'Service Web',
      value: 'sw'
    },
    {
      name: 'DPW',
      value: 'dpw'
    }
  ];
};

Environment.prototype.getList = function () {
    return dataHelper.read() || [];
};

Environment.prototype.getDetail = function(id, _list) {
    var detail = (_list || this.getList()).filter(function(item){
        return item.id == id;
    })[0];

    if(detail) {
        detail.accountStr = detail.accounts.map(function(o){
            return o.number + ' ' + o.accountType;
        }).join('\r\n');
    }

    return detail;
};

Environment.prototype.remove = function(id, _list) {
    var list = _list || this.getList();
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

Environment.prototype.save = function(updateObj) {
    var list = this.getList()
        , detail = this.getDetail(updateObj.id, list)
        , hasData = !!detail;

    if(!hasData){
        detail = new envModel();
        list.push(detail);
    }else{
        detail.isAuto = false;
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

    debugger;
    extend( detail, updateObj);

    if (updateObj.accounts.length > 0 && updateObj.url) {
      dataHelper.write(list);
      return detail;
    }

    return false;
};

module.exports =  Environment;
