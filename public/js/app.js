'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'ngRoute',

  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',

  // 3rd party dependencies
  'btford.socket-io'
]).
config(function ($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    when('/login', {
      templateUrl: 'partials/sessionsNew',
      controller: 'SessionsNewCtrl'
    }).
    otherwise({
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    });
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.interceptors.push('myInterceptor');

  $locationProvider.html5Mode(true);
});
