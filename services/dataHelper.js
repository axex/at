/**
 * Created by trump.wang on 2015/3/7.
 */
var fs = require('fs-extra')
    , path = require('path')
    , atDataRoot = '/at-login-helper'
    , dataPath = path.join(atDataRoot, 'data')
    , configPath = path.join(atDataRoot, 'config.json')
    , jsonFilePath = path.join(dataPath, 'evn.json')
    , extend = require('extend');

var config = require('../config.json');

if(fs.existsSync(configPath)){
    extend(true, config, fs.readJSONSync(configPath));
}else{
    fs.writeJSONSync(configPath, config)
}

fs.ensureDirSync( dataPath );

module.exports = {
    write: function (list){
        fs.writeJSONSync(jsonFilePath, list, 'utf8' );
    }
    , read: function() {
        if(fs.existsSync(jsonFilePath)){
            return fs.readJSONSync(jsonFilePath, 'utf8');
        }
        return [];
    }
    , config: config
};