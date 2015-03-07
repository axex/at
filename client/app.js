/**
 * Created by trump.wang on 2015/3/7.
 */
global.$ = window.jQuery;
var At = require('./services/at.js');

var app = new At();
app.init();


angular.module('at', [])
    .controller('ATController', ['$scope', function ($scope) {
      $scope.environments = app.getEnv();
      $scope.browsers = app.getBrowsers();

      $scope.startBrowser = startBrowser;
    }]);

function startBrowser (event) {
  event.preventDefault();
  var $this = $(this);

  var number = $this.find('.account-number').text();
  var url = $this.parents('.panel').find('.env-url').text();

  app.startBrowse('', {
    loginName: number,
    password: 'Test!123',
    action: url + '/login/main.asp'
  });
}

$(document).ready(function () {
  $('.btn-start').on('click', function () {

    app.startBrowse('', []);
  });
});

