'use strict';

/* Controllers */

var app = angular.module('guestBook.controllers', []);

app.controller('mainController', function($scope, $route, messagesAPI) {

// Create newMessage object
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
          $route.reload();
        }, function(reason) {
          console.log('failed to post: ', reason);
      });
      // Hide form validation messages
      $scope.showValidationMessage = false;
    }
  };
  
  $scope.cancelNewMessage = function() {
    $scope.newMessage.show = false;
    $scope.showValidationMessage = false;
  };
});

app.controller('showMessages', function($scope, messagesAPI) {

  $scope.messages = [];
  $scope.orderMessages = '-date';

  // Get messages from server via messagesAPI service
  $scope.getMessages = function() {
    messagesAPI.getData()
      .then(function(data) {
        $scope.messages = data;
      }, function(reason) {
        console.log('failed to get: ', reason);
    });
  };

  $scope.getMessages();
});

app.controller('adminController', function($scope, $route, messagesAPI) {

  var deleteMessage, editMessage;
  
  $scope.promptDelete = function(id) {
    return deleteMessage === id;
  };
  
  $scope.showDelete = function(id) {
    deleteMessage = id;
  };
  
  $scope.cancelDelete = function() {
    deleteMessage = "";
  };

  $scope.delete = function(id) {
    messagesAPI.deleteMessage(id)
      .then(function(data) {
        $route.reload();
      }, function(reason) {
        console.log('failed to delete: ', reason);
      });
    // Clear previous message delete prompts
    $scope.cancelDelete();
  };

  $scope.editMessage = function(id) {
    return editMessage === id;
  };

  $scope.edit = function(id, text) {
    editMessage = id;
  };

  $scope.saveEdit = function(id, text) {
    var postData = { "text": text }
    messagesAPI.editMessage(id, postData)
      .then(function(data) {
        $route.reload();
      }, function(reason) {
        console.log('failed to save edit: ', reason);
      });
    $scope.cancelEdit();
  };
  
  $scope.cancelEdit = function() {
    editMessage = "";
    $route.reload();
  };
});