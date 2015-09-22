'use strict';

/* Services */

var app = angular.module('guestBook.services', []);

app.factory('messagesAPI', function($http, $q) {
  return {
    getData: function() {
      var d = $q.defer();
      $http.get('/api/messages').success(function(data) {
        d.resolve(data);
      });
      
      return d.promise;
    },
    postData: function(data) {
      var d = $q.defer();
      $http.post('/api/messages', data).success(function(data) {
        d.resolve(data);
      });
      
      return d.promise;
    },
    deleteMessage: function(id) {
      var d = $q.defer();
      $http.delete('/api/message/' + id).success(function(data) {
        d.resolve(data);
      });
      
      return d.promise;
    }
  }
});