
describe('Engine Init', function(){
	it("should exist", function(){
		expect(Imagine.engine).toBeDefined();
	})
})


describe('Engine', function(){

	it("should work in the right object scope / context")

	beforeEach(function() {
		Imagine.engine.reset();
	});

	it('should clear objects after reset', function(){
		Imagine({});
		Imagine.engine.reset();
		expect(Imagine.objects.length).toBe(0);
	});

	it("should define Imagine", function(){
		expect(Imagine).toBeDefined();
	});

	it("should expose Imagine.engine", function(){
		expect(Imagine.engine).toBeDefined();
	});

	

});
