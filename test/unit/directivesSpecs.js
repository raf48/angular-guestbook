'use strict';

describe('Guestbook directives', function() {
  
  beforeEach(module('guestBook'));
  beforeEach(module('guestBook.controllers'));
  beforeEach(module('guestBook.directives'));

  describe('message', function() {
    var scope, element;

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
      compileDirective('Author', 'Hello', new Date('2015-12-17T03:24:00').toISOString());
    }));

    it('should produce three paragraphs', function() {
      expect(element.find('p').length).toBe(3);
    });

    it('every paragraph should contain expected text', function() {
      var el = element.find('p').contents();
      expect(el[0].data).toContain('Author');
      expect(el[1].data).toContain('Hello');
      expect(el[2].data).toContain('2015-12-17 03:24:00');
    });
  });
});