'use strict';

/* Directives */

angular.module('myApp.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });
  // directive('header', function () {
  //   return {
  //     restrict: 'A',
  //     template: '.../views/partials/header'
  //   };
  // }).
  // directive('footer', function () {
  //   return {
  //     restrict: 'A',
  //     template: '.../views/partials/footer'
  //   };
  // });
