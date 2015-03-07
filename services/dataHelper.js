/**
 * Created by trump.wang on 2015/3/7.
 */
var fs = require('fs-extra')
    , path = require('path')
    , dataPath = path.join(process.cwd(), 'data')
    , jsonFilePath = path.join(dataPath, 'evn.json')
    , envData = [];



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
};