'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $rootScope, socket, $http) {
    socket.on('send:name', function (data) {
      $scope.name = data.name;
    });
    // redux here
    $rootScope.session = {
      loggedIn: false,
      value: {},
      status: 'idle',
      error: ''
    };
    $http.get('http://localhost:3001/api/sessions')
      .success(function(response) {
        if (response.user) {
          $rootScope.session =
            {
              loggedIn: true,
              value: response.user,
              status: 'idle',
              error: ''
            };
        }
      });
  }).
  controller('MyCtrl1', function ($scope, socket, $http) {
    socket.on('send:time', function (data) {
      $scope.time = data.time;
    });
    $scope.feed_items = [];
    $scope.total_count = 1;
    $scope.following = 1;
    $scope.followers = 1;
    $scope.micropost = 1;
    $scope.gravatar = '';
    $scope.currentPage = 1;
    $scope.numPerPage = 5;
    function init() {
      setFeeds();
    };
    init();
    function setFeeds() {
      $http.get('http://localhost:3001/api', {params: { page: 1 }})
        .success(function(response) {
          if (response.feed_items) {
            $scope.feed_items = response.feed_items;
            $scope.total_count = response.total_count;
            $scope.following = response.following;
            $scope.followers = response.followers;
            $scope.micropost = response.micropost;
            $scope.gravatar = response.gravatar;
          } else {
            $scope.feed_items = [];
          }
        });
    };
    $scope.$watch('currentPage + numPerPage', function() {
      var begin = (($scope.currentPage - 1) * $scope.numPerPage)
      , end = begin + $scope.numPerPage;
  
      setFeeds();
    });
    $scope.removeMicropost = function(id) {
      $http.delete('http://localhost:3001/api/microposts/'+id)
        .success(function(response) {
          if (response) {
            setFeeds();
          }
        });
    };
  }).
  controller('SessionsNewCtrl', function ($scope, $http, $location) {
    $scope.form = {
      email: 'example@railstutorial.org',
      password: 'foobar',
      remember_me: false
    };

    $scope.handleSubmit = function(){
      $http.post('http://localhost:3001/api/login', {
        session: {
          email: $scope.form.email,
          password: $scope.form.password,
          remember_me: $scope.form.remember_me ? '1' : '0'
        }
      }, {withCredentials: true})
      .success(function(response) {
        if (response.user) {
          if ($scope.form.remember_me) {
            localStorage.setItem("token", response.jwt)
            localStorage.setItem("remember_token", response.token)
          } else {
            sessionStorage.setItem("token", response.jwt)
            sessionStorage.setItem("remember_token", response.token)
          }
          document.getElementById("inputEl").blur();
          $location.url('/users/'+response.user.id);
        }
        if (response.flash) {
          console.log(response.flash);
        }
      });
    };
  }).
  controller('MyCtrl2', function ($scope, $location) {
    // write Ctrl here
    $scope.path = $location.path();
    $scope.back = function() {
        history.back();
    };
  });
  // controller('PageNotFoundComponent', function ($scope, $location) {
  //   $scope.path = $location.path();
  //   $scope.back = function() {
  //       history.back();
  //   };
  // });
