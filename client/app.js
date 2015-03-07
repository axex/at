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

$(document).ready(function () {
  $('.account-add-btn').on('click', function () {
    $('.account-add-form').removeClass('hidden');
    $('.env-list').addClass('hidden');
  });

  $('.account-add-save').on('click', function () {
    var $accountAddForm = $(this).parents('.account-add');
    var envName = $accountAddForm.find('.account-add-name input').val();
    var envUrl = $accountAddForm.find('.account-add-url input').val();
    var accounts = $accountAddForm.find('.account-add-accounts').val();

    app.addEnv({
      name: envName,
      url: envUrl,
      accountStr: accounts
    });
  });

  $('.account-add-cancel').on('click', function () {
    $('.account-add-form').addClass('hidden');
    $('.env-list').removeClass('hidden');
  });

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
    })
  });

  $('.btn-danger').on('click', function () {
    var $panel = $(this).parents('.panel');
    $panel.find('.account-list').removeClass('hidden');
    $panel.find('.account-edit').addClass('hidden');
  });
});
