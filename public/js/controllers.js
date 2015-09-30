'use strict';

/* Controllers */

var app = angular.module('guestBook.controllers', []);

app.controller('modalCtrl', function($scope, $rootScope, $modal) {

  $scope.animationsEnabled = true;

  $scope.open = function() {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'loginModalContent',
      controller: 'loginController',
      scope: $scope
    });
  };
  
  if ($rootScope.openModal) {
    $scope.open();
    $rootScope.openModal = false;
  }
});

app.controller('mainController', function($scope, $rootScope, $state, AUTH_EVENTS) {

  $scope.openModal = false;
  $rootScope.currentUser = null;
  $scope.setCurrentUser = function(user) {
    $rootScope.currentUser = user;
  };
  
  $scope.$on(AUTH_EVENTS.loginSuccess, function() {
    $state.go('admin');
  });
});

app.controller('showMessages', function($scope, $state, messagesAPI) {

  $scope.messages = [];
  $scope.orderMessages = '-date';

  $scope.newMessage = {
    show: false
  };
  $scope.showValidationMessage = false;

  $scope.postNewMessage = function() {
    // Show form validation messages
    $scope.showValidationMessage = true;
    // Check if form is valid
    if ($scope.message.$valid) {
      messagesAPI.postData($scope.newMessage)
        .then(function(data) {
          $scope.messages = data;
          // Hide new message window
          $scope.newMessage.show = false;
          // Clear input fields
          $scope.newMessage.text = '';
          $scope.newMessage.from = '';
          // Reload message view
          $state.go($state.current, {}, { reload: true });
        }, function(reason) {
          console.log('failed to post: ', reason);
      });
      // Hide form validation messages
      $scope.showValidationMessage = false;
    }
  };

  // Get messages from server via messagesAPI service
  $scope.getMessages = function() {
    messagesAPI.getData()
      .then(function(data) {
        $scope.messages = data;
      }, function(reason) {
        console.log('failed to get: ', reason);
    });
  };

  $scope.cancelNewMessage = function() {
    $scope.newMessage.show = false;
    $scope.showValidationMessage = false;
  };

  $scope.getMessages();
});

app.controller('adminController', function($scope, $state, messagesAPI, AuthService) {
  
  $scope.logout = function() {
    AuthService.logout();
    $state.go('home');
  };
  
  $scope.delete = function(id) {
    messagesAPI.deleteMessage(id)
      .then(function(data) {
        $state.go($state.current, {}, { reload: true });
      }, function(reason) {
        console.log('failed to delete: ', reason);
    });
  };

  $scope.saveEdit = function(id, text) {
    messagesAPI.editMessage(id, text)
      .then(function(data) {
        $state.go($state.current, {}, { reload: true });
      }, function(reason) {
        console.log('failed to save edit: ', reason);
    });
  };
});

app.controller('loginController', function($scope, $rootScope, AUTH_EVENTS, AuthService) {

  $scope.credentials = {
    username: '',
    password: ''
  };
  
  $scope.login = function(credentials) {
    AuthService.login(credentials)
      .then(function(user) {
        $scope.setCurrentUser(user);
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      }, function() {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    });
  };
});