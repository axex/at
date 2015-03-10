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

      $scope.cancelEdit = function (env) {
        env.isEditing = false;
      };

      $scope.save = function (env) {
        app.updateEnv({
          id: id,
          name: envName,
          url: envUrl,
          accountStr: accounts
        });
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

$(document).ready(function () {
  $('.btn-edit').on('click', function () {
    var $panel = $(this).parents('.panel');
    $panel.find('.account-edit').removeClass('hidden');
    $panel.find('.account-list').addClass('hidden');
    $panel.find('.env-name').trigger('click');
  });

  $('.bnt-remove').on('click', function () {
    var $panel = $(this).parents('.panel');
    var id = $panel.attr('id');
    app.removeEnv(id);
    $panel.find('.env-name').trigger('click');
  });

  $('.btn-save').on('click', function () {
    var $panel = $(this).parents('.panel');
    var id = $panel.attr('id');
    var envName = $panel.find('.account-edit-name input').val();
    var envUrl = $panel.find('.account-edit-url input').val();
    var accounts = $panel.find('.account-edit-accounts').val();

    app.updateEnv({
      id: id,
      name: envName,
      url: envUrl,
      accountStr: accounts
    });
  });

  $('.btn-danger').on('click', function () {
    var $panel = $(this).parents('.panel');
    $panel.find('.account-list').removeClass('hidden');
    $panel.find('.account-edit').addClass('hidden');
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
