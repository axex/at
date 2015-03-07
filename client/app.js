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
  var $this = $(event.currentTarget);

  var number = $this.parents('li').find('.account-number').text();
  var url = $this.parents('.panel').find('.env-url').text();
  var browser = $this.text();

  app.startBrowse(browser, {
    loginName: number,
    password: 'Test!123',
    action: url + '/login/main.asp'
  });
}

