'use strict';

describe('Guestbook directives', function() {
  
  beforeEach(module('guestBook'));
  beforeEach(module('guestBook.controllers'));
  beforeEach(module('guestBook.directives'));

  describe('message', function() {
    var scope, element, date = new Date().toISOString();

    function compileDirective(from, text, date) {
      var template = '<message from="' + from + '" text="' + text + 
                            '" date="' + date + '"></message>';
      inject(function($compile) {
        element = $compile(template)(scope);
      });
      scope.$digest();
    }

    beforeEach(inject(function($rootScope, $compile) {
      scope = $rootScope.$new();
      compileDirective('Author', 'Hello', date);
    }));

    it('should produce three paragraphs and a hr', function() {
      expect(element.find('p').length).toBe(3);
      expect(element.find('hr').length).toBe(1);
    });

    it('every paragraph should contain expected text', function() {
      var el = element.find('p').contents();
      expect(el[0].data).toContain('Author');
      expect(el[1].data).toContain('Hello');
      expect(el[2].data).toContain(date);
    });
  });
});