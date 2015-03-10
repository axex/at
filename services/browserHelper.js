/**
 * Created by trump.wang on 2015/3/7.
 */

var path = require('path');
var util = require('util');

var dataHelper = require('./dataHelper');
var cfg = dataHelper.config;
var cwd = process.cwd();
var url = "http://localhost:"+cfg.port+"/";

module.exports = {
  ie: {
    cmd: getStartCommand('iexplore', url)
  },
  chrome: {
    cmd: getStartCommand('chrome', url)
  },
  firefox: {
    cmd: getStartCommand('firefox', url)
  },
  /*
  opera: {
    cmd: getStartCommand('opera', url)
  },
  */
  safari: {
    cmd: getStartCommand('safari', url)
  }
};

function getStartCommand (browser, url) {
  return util.format("start %s %s", browser, url);
}
