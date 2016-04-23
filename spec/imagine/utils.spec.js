var utils = require('../../src/imagine/utils');

describe("utils", function(){

	it("should be defined", function(){
		expect(utils).toBeDefined();
	});

	describe("isArray", function(){

		it('should be defined', function(){
			expect(utils.isArray).toBeDefined();
		});

		it("should detect an array", function(){
			expect(utils.isArray([])).toBe(true);
		});

		it("should detect an object", function(){
			expect(utils.isArray({})).toBe(false);
		});

	});

	describe('isElement', function(){

		it('sohuld be defined', function(){
			expect(utils.isElement).toBeDefined();
		});

		it('should return true if passed an element', function(){
			var div = document.createElement('DIV');
			expect(utils.isElement(div)).toBe(true);
		});

		it('should return false if passed in a nonelement', function(){
			// expect(utils.isElement('')).toBe(false);
			expect(utils.isElement({})).toBe(false);
			expect(utils.isElement(12)).toBe(false);
		});

	});
	
});
