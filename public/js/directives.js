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
      '<p>Date: {{ date }}</p>' + 
      '<hr />' + 
    '</div>'
  }
}).directive('editMessage', function() {
  return {
    restrict: 'EA',
    scope: {
      id: '@',
      from: '@',
      text: '=',
      date: '@'
    },
    replace: true,
    template: '<div>' + 
      '<p>From: {{ from }}</p>' + 
      '<textarea ng-model="text"></textarea>' + 
      '<p>Date: {{ date }}</p>' +
      '<hr />' + 
    '</div>'
  }
});