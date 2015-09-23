'use strict';

/* Directives */

var app = angular.module('guestBook.directives', []);

app.directive('message', function() {
  return {
    restrict: 'EA',
    scope: {
      id: '@',
      from: '@',
      text: '@',
      date: '@'
    },
    replace: true,
    template: '<div>' + 
      '<p>From: {{ from }}</p>' + 
      '<p>{{ text }}</p>' + 
      '<p>Date: {{ date | date : "yyyy-MM-dd HH:mm:ss" }}</p>' + 
      '<hr />' + 
    '</div>'
  }
}).directive('editMessage', function() {

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
      date: '@'
    },
    replace: true,
    template: '<div>' + 
      '<div class="admin_btns">' +
      '  <span ng-show="!showDelete(id) && !showEdit(id)">' +
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
      '<textarea ng-show="showEdit(id)" ng-model="editText"></textarea>' + 
      '<p ng-show="!showEdit(id)">{{ text }}</p>' +
      '<p>Date: {{ date | date : "yyyy-MM-dd HH:mm:ss" }}</p>' +
      '<hr />' + 
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