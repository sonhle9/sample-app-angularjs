'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  factory('socket', function (socketFactory) {
    return socketFactory();
  }).
  value('version', '0.1').
  factory('myInterceptor', ['$log', function($q) {
    return {
      'request': function(config) {
        if (
          localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined'
        ) 
        {
          config.headers.Authorization = `Bearer ${localStorage.getItem('token')} ${localStorage.getItem('remember_token')}`
        }
        else if (
          sessionStorage.getItem('token') && sessionStorage.getItem('token') !== 'undefined'
        ) 
        {
          config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')} ${sessionStorage.getItem('remember_token')}`
        }
        return config;
      },
     'requestError': function(rejection) {
        return Promise.reject(rejection);
      },
      'response': function(response) {
        return response;
      },
     'responseError': function(rejection) {
        return Promise.reject(rejection);
      }
    };
  }]);
