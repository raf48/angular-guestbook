'use strict';

/* Modules */

angular.module('guestBook', [
  'ngRoute',
  'guestBook.controllers',
  'guestBook.directives',
  'guestBook.services'
]).config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/messages',
      controller: 'showMessages'
    })
    .otherwise({
      redirectTo: '/'
    });
    
    $locationProvider.html5Mode(true);
});
