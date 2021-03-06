'use strict';

/* Directives */

var app = angular.module('guestBook.directives', []);

app.directive('message', function() {
  return {
    restrict: 'EA',
    scope: {
      from: '@',
      text: '@',
      date: '@',
      modDate: '@'
    },
    replace: true,
    template: '<div>' + 
      '<p>From: {{ from }}</p>' + 
      '<p class="messageText">{{ text }}</p>' +
      '<p>' + 
      '  <span>Date: {{ date | date : "yyyy-MM-dd HH:mm:ss" }}</span>' +
      '  <span class="modDate" ng-show="modDate">| ' +
      'Modified by admin: {{ modDate | date : "yyyy-MM-dd HH:mm:ss"}}' +
      '  </span>' +
      '</p>' +
    '</div>'
  }
}).directive('adminMessage', function() {

  var deleteMessageID,
      editMessageID;
  
  function showDelete(id) {
    return id === deleteMessageID;
  }
  
  function showEdit(id) {
    return id === editMessageID;
  }

  function cancelDelete() {
    deleteMessageID = "";
  }
  
  function promptDelete(id) {
    deleteMessageID = id;
  }
  
  function promptEdit(id, text) {
    editMessageID = id;
  }
  
  return {
    restrict: 'EA',
    scope: {
      id: '@',
      from: '@',
      text: '@',
      date: '@',
      modDate: '@'
    },
    replace: true,
    template: '<div class="admin-msg">' + 
      '<div class="admin_btns">' +
      '  <span ng-show="!showDelete(id) && !showEdit(id)"">' +
      '    <a href="#" ng-click="promptDelete(id)">Delete</a> | ' + 
      '    <a href="#" ng-click="promptEdit(id, text)">Edit</a>' +
      '  </span>' +
      '  <span ng-show="showDelete(id)">Are you sure? ' + 
      '    <a href="#" ng-click="delete(id)">Yes</a> | ' +
      '    <a href="#" ng-click="cancelDelete()">No</a>' +
      '  </span>' +  
      '  <span ng-show="showEdit(id)">' +
      '    <a href="#" ng-click="saveEdit()">Save</a> | ' +
      '    <a href="#" ng-click="cancelEdit()">Cancel</a>' +
      '  </span>' +
      '</div>' +
      '<p>From: {{ from }}</p>' + 
      '<textarea class="form-control" rows="3" ng-show="showEdit(id)"' +
      'ng-model="editText"></textarea>' + 
      '<p class="messageText" ng-show="!showEdit(id)">{{ text }}</p>' +
      '<p>' + 
      '  <span>Date: {{ date | date : "yyyy-MM-dd HH:mm:ss" }}</span>' +
      '  <span class="modDate" ng-show="modDate">| ' +
      'Modified by admin: {{ modDate | date : "yyyy-MM-dd HH:mm:ss"}}' +
      '  </span>' +
      '</p>' +
    '</div>',
    link: function(scope, element, attrs) {
      scope.showDelete = showDelete;
      scope.showEdit = showEdit;
      scope.cancelDelete = cancelDelete;
      scope.promptDelete = promptDelete;
      scope.promptEdit = promptEdit;
      
      scope.editText = attrs.text;
      scope.delete = scope.$parent.delete;
      
      scope.cancelEdit = function() {
        scope.editText = attrs.text;
        editMessageID = "";
      };
      
      scope.saveEdit = function() {
        scope.$parent.saveEdit(scope.id, scope.editText);
        editMessageID = "";
      };
    }
  }
});