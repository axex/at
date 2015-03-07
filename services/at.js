var util = require('util');
var EventEmitter = require('events').EventEmitter;
var shell = require('shelljs');
var Env = require('../services/environments');
var bsHelper = require('../services/browserHelper');

var exec = require('child_process').exec;

function At () {
  EventEmitter.call(this);
}
util.inherits(At, EventEmitter);

/**
 * Support events.
 */
At.prototype.events = {
  'openBrowser': 'open.browser'
};

/**
 * Register `open.browser` event.
 */
At.prototype.onOpenBrowser = function () {
  this.on(this.events.openBrowser, function (browser, params) {
    var cmd = bsHelper[browser].cmd;
    var paramsArr = [];

    for (var p in params) {
      if (params.hasOwnProperty(p)) {
        paramsArr.push(p + '=' + encodeURIComponent(params[p]));
      }
    }
    cmd += '#' + paramsArr.join(';');
    console.log('Executing %s', cmd);
    exec(cmd);
  });
};

/**
 * Initialize.
 */
At.prototype.init = function () {
  this.onOpenBrowser();
};

At.prototype.getEnv = function () {
  var env = new Env();
  return env.getList();
};

/**
 * Emit `openBrowser` event.
 */
At.prototype.startBrowse = function (browser, params) {
  browser = browser || "ie";
  console.log('Starting browser [%s]...', browser);

  this.emit(this.events.openBrowser, browser, params);
};

/**
 * Get a list of support browsers, and commands.
 * @returns {Array}
 */
At.prototype.getBrowsers = function () {
  return Object.keys(bsHelper);
};

module.exports = At;