'use strict';

/* Services */

var app = angular.module('guestBook.services', []);

app.factory('messagesAPI', function($http, $q) {
  return {
    get: function() {
      var d = $q.defer();
      $http.get('/api/getData').success(function(data) {
        d.resolve(data);
      });
      
      return d.promise;
    },
    post: function(data) {
      var d = $q.defer();
      $http.post('/api/postData', data).success(function(data) {
        d.resolve(data);
      });
      
      return d.promise;
    }
  }
});