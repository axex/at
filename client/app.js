/**
 * Created by trump.wang on 2015/3/7.
 */

 var EventEmitter = require('events').EventEmitter;

global.$ = window.jQuery;
global.atEmitter = window.atEmitter = new EventEmitter();

var At = require('./services/at.js');

var app = new At();
app.init();


angular.module('at', [])
    .filter('accountFilter', function () {
      return function (accounts, query) {
        if (!/^\d+$/.test(query)) {
          return accounts;
        }

        return accounts.filter(function (account) {
          return account.number.indexOf(query) >= 0;
        });
      };
    })

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

      atEmitter.on('dataSource.change', function () {
        $scope.$apply(function () {
          $scope.environments = app.getEnv();
        });
      });

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
      $scope.edit = function () {
        $scope.env.isEditing = true;

        $scope.envPristine = angular.copy($scope.env);
      };

      $scope.cancel = function () {
        $scope.env = $scope.envPristine;
        $scope.env.isEditing = false;
      };

      $scope.save = function () {
        app.updateEnv({
          id: $scope.env.id,
          name: $scope.env.name,
          url: $scope.env.url,
          accountStr: $scope.env.accountStr
        });

        var index = 0;
        $scope.environments.forEach(function (e, i) {
          if (e.id === $scope.env.id) {
            index = i;
          }
        });
        $scope.environments[index] = $scope.env;

        $scope.env.isAuto = false;
        $scope.env.isEditing = false;
      };

      $scope.remove = function () {
        $('#removeConfirmModal-' + $scope.env.id).modal('hide');
        $(document.body).removeClass('modal-open');

        app.removeEnv($scope.env.id);

        var index = 0;
        $scope.environments.forEach(function (e, i) {
          if (e.id === $scope.env.id) {
            index = i;
          }
        });
        $scope.environments.splice(index, 1);
      };

    }])

    .controller('AccountController', ['$scope', function ($scope) {
      $scope.startBrowser = function (event) {
        event.preventDefault();
        var $this = $(event.currentTarget);

        var number = $scope.account.number;
        var url = $scope.env.url;
        var browser = $.trim( $this.attr('title') );

        app.startBrowse(browser, {
          loginName: number,
          password: 'Test!123',
          action: url + '/login/main.asp'
        });
      };
    }])
    ;

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

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
