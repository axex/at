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
  this.on(this.events.openBrowser, function (browser) {
    var cmd = bsHelper[browser].cmd;
    console.log('Executing %s', cmd);
    exec(cmd);
  });
};

/**
 * Initialize.
 */
At.prototype.init = function () {
  var env = new Env();
  console.log('env.getList: ', env.getList());
  console.log('env.getDetail: ', env.getDetail());

  this.onOpenBrowser();
};

/**
 * Emit `openBrowser` event.
 */
At.prototype.startBrowse = function (browser) {
  browser = browser || "defaults";
  console.log('Starting browser [%s]...', browser);

  this.emit(this.events.openBrowser, browser);
};

/**
 * Get a list of support browsers, and commands.
 * @returns {Array}
 */
At.prototype.getBrowser = function () {
  return Object.keys(bsHelper);
};

module.exports = At;