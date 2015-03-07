var util = require('util');
var EventEmitter = require('events').EventEmitter;
var shell = require('shelljs');
//var Env = require('../services/environments');
//var bsHelper = require('../services/browserHelper');

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
  this.on(this.events.openBrowser, function () {

  });
};

/**
 * Initialize.
 */
At.prototype.init = function () {
  var self = this;
  //var env = new Env();
  //console.log('env.getList: ', env.getList());
  //console.log('env.getDetail: ', env.getDetail());
};

/**
 * Emit `openBrowser` event.
 */
At.prototype.startBrowse = function () {
  console.log('Starting browser...');
  this.emit(this.events.openBrowser);
};

/**
 * Get a list of support browsers, and commands.
 * @returns {Array}
 */
At.prototype.getBrowser = function () {
  //return Object.keys(bsHelper);
};

module.exports = At;