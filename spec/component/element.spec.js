jasmine.getFixtures().fixturesPath = 'spec/fixtures';

describe("Imagine/component/element", function(){

	var el;
	beforeEach(function() {
		Imagine.engine.reset();
		loadFixtures('collider.html');
		el = Imagine.element($('#square')[0]);
	});

	it("should be defined", function(){
		expect(Imagine.element).toBeDefined();
	})

	it("should throw an error if passed a non html object", function(){
		expect(function(){Imagine.element({})}).toThrow(new Error("Not a HTML object"))
	})

	it("should attach a name of element", function(){
		var div = document.createElement("DIV");
		var el = Imagine.element(div);
		expect(el.name).toBe('element');
		expect(el.tags.indexOf('element')).toBe(0);
	})

	it("should return itself with extra functions attached", function(){
		var comp = Imagine.element(el);
		expect(comp).toBe(el)
		expect(typeof comp).toBe(typeof el)
	})

	describe("getLocalRect", function(){
		it("should be defined", function(){
			var div = document.createElement("DIV");
			var comp = Imagine.element(div);
			expect(comp.getLocalRect).toBeDefined()

			expect(el.getLocalRect).toBeDefined()

		})
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

		})
	})



	describe("move", function(){
		



		it("should have move", function(){
			expect(el.move).toBeDefined();
		});

		it("should move", function(){
			// expect(el.getLocalRect().top).toBe(1)
			expect(isElement(el)).toBe(true)
		})

	})

})