/**
 * Created by trump.wang on 2015/3/7.
 */
global.$ = window.jQuery;
var At = require('./services/at.js');

var app = new At();
app.init();


angular.module('at', [])
    .controller('ATController', ['$scope', '$rootScope', function ($scope, $rootScope) {
      $scope.environments = app.getEnv();
      $scope.browsers = app.getBrowsers();

      $scope.addEnv = function () {
        $rootScope.newEnv = {
          name: '',
          url: '',
          accountStr: ''
        };
        $rootScope.isAddingEnv = true;
      };

      $scope.startBrowser = startBrowser;
    }])

    .controller('EnvNewController', ['$scope', '$rootScope', function ($scope, $rootScope) {
      $scope.cancel = function () {
        $rootScope.newEnv = {};
        $rootScope.isAddingEnv = false;
      };

      $scope.save = function () {
        var newEnv = $rootScope.newEnv;
        $rootScope.newEnv = {};

        app.addEnv({
          name: newEnv.name,
          url: newEnv.url,
          accountStr: newEnv.accountStr
        });

        $scope.environments.unshift(newEnv);

        $rootScope.isAddingEnv = false;
      };
    }])

    .controller('EnvController', ['$scope', function ($scope) {
      $scope.edit = function (env) {
        env.isEditing = true;
      };

      $scope.cancel = function (env) {
        env.isEditing = false;
      };

      $scope.save = function (env) {
        app.updateEnv({
          id: env.id,
          name: env.name,
          url: env.url,
          accountStr: env.accountStr
        });

        var index = 0;
        $scope.environments.forEach(function (e, i) {
          if (e.id === env.id) {
            index = i;
          }
        });
        $scope.environments[index] = env;

        env.isEditing = false;
      };

      $scope.remove = function (env) {
        app.removeEnv(env.id);

        var index = 0;
        $scope.environments.forEach(function (e, i) {
          if (e.id === env.id) {
            index = i;
          }
        });
        $scope.environments.splice(index, 1);
      };

    }])
    ;

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

$(window).on('keyup', function(e){
  switch (e.keyCode){
    case 123:
          require('nw.gui').Window.get().showDevTools();
          break;
    case 116:
          document.location.reload(true);
          break;
  }
});
