'use strict';

describe('Guestbook controllers', function() {
  
  beforeEach(module('guestBook'));
  beforeEach(module('guestBook.controllers'));
  beforeEach(module('guestBook.services'));
  
  describe('mainController', function() {
    var scope, ctrl, $httpBackend,
        postObj = {"from":"Author", "text":"Some text", "date":"2012-12-23T12:16:00.582Z"};

    beforeEach(inject(function($rootScope, $controller, _$httpBackend_) {
      $httpBackend = _$httpBackend_;

      scope = $rootScope.$new();
      scope.message = { $valid: true };
      ctrl = $controller('mainController', {$scope: scope});
    }));

    it('should post new message', function() {
      $httpBackend.when('POST', '/api/messages', postObj).respond([postObj]);
      $httpBackend.when('GET', '/partials/messages').respond();
      scope.newMessage = {"from":"Author", "text":"Some text", "date":"2012-12-23T12:16:00.582Z"};
      
      scope.postNewMessage();
      $httpBackend.flush();
      expect(scope.messages).toEqual([postObj]);
    });

    it('should hide validations after and before post', function() {
      expect(scope.showValidationMessage).toBe(false);
      scope.postNewMessage();
      expect(scope.showValidationMessage).toBe(false);
    });

    it('new message window inputs should be cleared after post', function() {
      $httpBackend.when('POST', '/api/messages', postObj).respond([postObj]);
      $httpBackend.when('GET', '/partials/messages').respond();
      scope.newMessage = {"from":"Author", "text":"Some text", "date":"2012-12-23T12:16:00.582Z"};
      
      scope.postNewMessage();
      $httpBackend.flush();
      expect(scope.newMessage.from).toBe('');
      expect(scope.newMessage.text).toBe('');
    });

    it('should hide message window on cancel', function() {
      scope.cancelNewMessage();
      expect(scope.newMessage.show).toBe(false);
      expect(scope.showValidationMessage).toBe(false);
    });
  });

  describe('showMessages', function() {
    var scope, ctrl, $httpBackend,
        getObj = {"from":"Author", "text":"Some text", "date":"2012-12-23T12:16:00.582Z"};
    
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      scope = $rootScope.$new();
      ctrl = $controller('showMessages', {$scope: scope});
    }));
    
    it('messages should be empty before fetching data', function() {
      expect(scope.messages).toEqual([]);
    });

    it('messages should be ordered by date descending order', function() {
      expect(scope.orderMessages).toBe('-date');
    });

    it('should fetch message data', function() {
      $httpBackend.expectGET('/api/messages').respond([getObj]);
      $httpBackend.flush();
      
      scope.getMessages();
      expect(scope.messages).toEqual([getObj]);
    });
  });

  describe('adminController', function() {
    var scope, admCtrl, showMsgCtrl, $httpBackend,
        testObj = {"id":"0","from":"Author", "text":"Some text", "date":"2012-12-23T12:16:00.582Z"};

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      scope = $rootScope.$new();
      admCtrl = $controller('adminController', {$scope: scope});
      showMsgCtrl = $controller('showMessages', {$scope: scope});
    }));

    it('should delete message with id 0', function() {
      scope.messages = [testObj];
      $httpBackend.expectDELETE('/api/message/0').respond();
      $httpBackend.when('GET', '/partials/messages').respond();
      $httpBackend.when('GET', '/api/messages').respond([]);

      scope.delete(0);
      $httpBackend.flush();
      expect(scope.messages).toEqual([]);
    });
  });
});