var EventEmitter = require('events').EventEmitter;

global.$ = window.jQuery;
global.atEmitter = window.atEmitter = new EventEmitter();

var At = require('./lib/services/at.js');

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

    .filter('envTypeName', function () {
      return function (typeValue) {
        var types = app.getEnvTypes();
        var name;

        types.forEach(function (t) {
          if (t.value === typeValue) {
            name = t.name;
            return;
          }
        });

        return name || 'Unknown';
      };
    })

    .controller('ATController', ['$scope', '$rootScope', function ($scope, $rootScope) {
      $scope.environments = app.getEnv();
      $scope.environmentTypes = app.getEnvTypes();
      $scope.browsers = app.getBrowsers();

      $scope.addEnv = function () {
        $rootScope.newEnv = {
          name: '',
          type: 'sw',
          url: '',
          accountStr: ''
        };
        $rootScope.isAddingEnv = true;
      };

      atEmitter.on('dataSource.changed', function () {
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
        var envUpdated = app.updateEnv({
          id: $scope.env.id,
          type: $scope.env.type,
          name: $scope.env.name,
          url: $scope.env.url,
          accountStr: $scope.env.accountStr
        });

        if (envUpdated) {
          var index = 0;
          $scope.environments.forEach(function (e, i) {
            if (e.id === envUpdated.id) {
              index = i;
            }
          });
          $scope.environments[index] = envUpdated;
        } else {
          console.log('Update env failed');
        }
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

      $scope.showTooltip = function (event) {
        var $this = $(event.currentTarget);
        $this.tooltip('show');
      };

      $scope.hideTooltip = function (event) {
        var $this = $(event.currentTarget);
        $this.tooltip('hide');
      };

    }])

    .controller('AccountController', ['$scope', function ($scope) {
      $scope.startBrowser = function (event) {
        debugger;

        event.preventDefault();
        var $this = $(event.currentTarget);

        var number = $scope.account.number;
        var type = $scope.env.type || 'sw';
        var url = $scope.env.url;
        var browser = $.trim( $this.data('name') );
        var params;

        switch (type) {
          case 'sw':
            params = {
              loginName: number,
              password: 'Test!123',
              action: url + '/login/main.asp'
            };
            break;
          case 'dpw':
            params = {
              type: type,
              user: number,
              password: 'Test!123',
              action: url + '/api/login',
              redirectTo: url
            };
            break;
        }

        app.startBrowse(browser, params);

      };
    }])
    ;

$(function () {

  var $envList = $('.env-list');
  $envList.on('click', 'tbody tr', function () {
    $envList.find('.selected').removeClass('selected');
    $(this).addClass('selected');
  });

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
