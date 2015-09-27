'use strict';

/* Modules */

angular.module('guestBook', [
  'ui.router',
  'guestBook.controllers',
  'guestBook.directives',
  'guestBook.services'
]).constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
}).config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/index',
      controller: 'showMessages'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/partials/login',
    controller: 'loginController'
  })
  .state('admin', {
    url: '/admin',
    templateUrl: '/partials/admin',
    controller: 'showMessages',
    resolve: {
      auth: function resolveAuthentication(AuthResolver) {
        return AuthResolver.resolve();
      }
    }
  });

  $locationProvider.html5Mode(true);
});