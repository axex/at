/**
 * Created by trump.wang on 2015/3/7.
 */
var fs = require('fs-extra')
    , path = require('path')
    , dataPath = path.join(process.cwd(), 'data')
    , jsonFilePath = path.join(dataPath, 'evn.json')
    , envData = [];

if(fs.existsSync(jsonFilePath)){
    envData = fs.readJSONSync(jsonFilePath, 'utf8');
}

fs.ensureDirSync( dataPath );

module.exports = {
    write: function (data){
        fs.writeJSONSync(jsonFilePath, data, 'utf8' );
    }
    , read: function() {
        return envData;
    }
};