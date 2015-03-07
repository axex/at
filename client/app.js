/**
 * Created by trump.wang on 2015/3/7.
 */
global.$ = window.jQuery;
var At = require('./services/at.js');
var app = new At();

app.init();

$('.btn-start').on('click', function () {
  app.startBrowse();
});