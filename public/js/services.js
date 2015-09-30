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
    },
    editMessage: function(id, data) {
      var d = $q.defer();
      $http.put('/api/message/' + id, { "text": data }).success(function(data) {
        d.resolve(data);
      });
      
      return d.promise;
    }
  }
});

app.factory('AuthService', function($http, $q, Session) {
  var authService = {};
  
  authService.login = function(credentials) {
    var d = $q.defer();
    $http.post('/api/login', credentials)
      .success(function(data) {
        Session.create(data.id, data.userId);
        d.resolve(data.user);
      }
    ).error(function(err) {
      d.reject(err);
    });

    return d.promise;
  };
  
  authService.isAuthenticated = function() {
    return !!Session.userId;
  };

  authService.logout = function() {
    if (authService.isAuthenticated()) {
      Session.destroy();
    }
  };

  return authService;
});

app.service('Session', function() {
  this.create = function(sessionId, userId) {
    this.id = sessionId;
    this.userId = userId;
  };
  
  this.destroy = function() {
    this.id = null;
    this.userId = null;
    console.log('wooot');
  };
});

app.factory('AuthResolver', function($q, $rootScope, $state) {
  return {
    resolve: function() {
      var d = $q.defer();
      var unwatch = $rootScope.$watch('currentUser', function(currentUser) {
        if (angular.isDefined(currentUser)) {
          if (currentUser) {
            d.resolve(currentUser);
          } else {
            d.reject();
            $state.go('home');
            $rootScope.openModal = true;
          }
          unwatch();
        }
      });
      return d.promise;
    }
  }
});