/**
 * Created by trump.wang on 2015/3/7.
 */
global.$ = window.jQuery;
var util = require('util');
var events = require('events');

function App(){
    this.on('open-brower', function(){

    });
}

util.inherits(App,  events.EventEmitter);

