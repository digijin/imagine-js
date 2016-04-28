var Element = require('src/component/element');
var $ = require('jquery');
var utils = require('src/imagine/utils');

// if(jasmine.getFixtures){
// 	jasmine.getFixtures().fixturesPath = 'spec/fixtures';
// }
describe("Imagine/component/element", function(){

	var el, raw;
	beforeEach(function(){
		// var fix = require('spec/fixtures/offset.html');
		// console.log(fix);
		// if(fixture){
			// fixture.load('offset.html');
		// }else{
		// 	loadFixtures('offset.html');
		// }
		fixture.set(require('spec/fixtures/offset.html'));
		raw = document.getElementById('square');
		el = new Element(raw);
	});

	afterEach(function(){
		fixture.cleanup();
	});

	it('test basics', function(){
		expect(document.getElementById).toBeDefined();
		expect(document.getElementById('square')).toBeDefined();
		expect(raw).toBeDefined();
		expect(el).toBeDefined();
		expect($).toBeDefined();
	});

	it("should be defined", function(){
		expect(Element).toBeDefined();
	});

	it("should throw an error if passed a non html object", function(){
		expect(function(){new Element({});}).toThrow(new Error("Not a HTML object"));
	});

	it("should attach a name of element", function(){
		var div = document.createElement("DIV");
		var el = new Element(div);
		expect(el.type).toBe('element');
		expect(el.tags.indexOf('element')).toBe(0);
	});

	describe("constructor", function(){
		it("should return an element component", function(){
			var comp = new Element(raw);
			expect(comp.type).toBe("element");
		});
		it("should copy some functinos to the element", function(){
			var div = document.createElement("DIV");
			new Element(div);
			expect(div.getLocalRect).toBeDefined();
			expect(div.move).toBeDefined();
			expect(div.moveTo).toBeDefined();
		});
	});

	describe("raw", function(){
		it("should be the object passed into the constructor", function(){
			var comp = new Element(raw);
			expect(comp.raw).toBe(raw);
		});
	});


	describe("getLocalRect", function(){
		// it("should work with border");
		// it("should work with margin");
		// it("should work with padding");
		it("should be defined", function(){
			var div = document.createElement("DIV");
			var comp = new Element(div);
			expect(comp.getLocalRect).toBeDefined();
		});
		it("should return a rect object", function(){
			// var div = document.createElement("DIV");
			// var el = Imagine.element(div);
			var rect = el.getLocalRect();
			expect(rect.top).toBeDefined();
			expect(rect.right).toBeDefined();
			expect(rect.bottom).toBeDefined();
			expect(rect.left).toBeDefined();
			expect(rect.height).toBeDefined();
			expect(rect.width).toBeDefined();
		});
	});

	describe("move", function(){

		it('should be precise', function(){
			el.move(1,1);//prime it
			start = el.getLocalRect().left;
			amnt = 1.2345;
			el.move(amnt, 0);
			now = el.getLocalRect().left;
			expected = now-start;
			diff = Math.abs(expected - amnt);
			expect(diff).toBeLessThan(0.3);//for phantom, 0.0005 for browsers
		});


		// it("shuold handle rounding errors");
			//css = 1.5px
			//move(1px)
			//expect css = 2px;

		it("should have move", function(){
			expect(el.move).toBeDefined();
		});

		it("should have moveTo", function(){
			expect(el.moveTo).toBeDefined();
		});

		it("should move the right amount", function(){
			t = el.getPosition().top;
			l = el.getPosition().left;
			expect(utils.isElement(el.raw)).toBe(true);
			el.move(1,2);
			expect(el.getPosition().top).toBe(t+2);
			expect(el.getPosition().left).toBe(l+1);
		});

	});

	describe('moveTo', function(){

		it('should move', function(){
			el.moveTo(1,2);
			expect(el.getPosition().top).toBe(2);
			expect(el.getPosition().left).toBe(1);
		});

	});

	describe('position', function(){

		describe('get', function(){

			it("should be defined", function(){
				expect(el.getPosition).toBeDefined();
			});

			it("should detect itself if not set", function(){
				otop = el.raw.offsetTop;
				left = el.raw.offsetLeft;
				pos = el.getPosition();
				expect(pos.top).toBe(otop);
				expect(pos.left).toBe(left);
			});

		});

		describe('set', function(){

			it("should be defined", function(){
				expect(el.setPosition).toBeDefined();
			});

			it("should return itself for chaining", function(){
				expect(el.setPosition(1,2)).toBe(el);
			});

			it("should set the positions", function(){
				el.setPosition(3,4);
				expect(el.raw.style.left).toBe('3px');
				expect(el.raw.style.top).toBe('4px');
			});

		});

		it("should set and return the stored position", function(){
			el.setPosition(5,6);
			pos = el.getPosition();
			expect(pos.left).toBe(5);
			expect(pos.top).toBe(6);
		});

	});

});
