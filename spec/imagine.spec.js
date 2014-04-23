describe('reset', function(){
	it('should clear objects after reset', function(){
		Imagine({});
		Imagine.reset();
		expect(Imagine.objects.length).toBe(0);
	});
})

describe('basics', function(){
	var foo;
	// it("should run tests", function(){
	// 	expect(1).toEqual(1);
	// });

	beforeEach(function() {
		Imagine.reset();
	});

	it("should define Time", function(){
		expect(Time).toBeDefined();
	});

	it("should define Imagine", function(){
		expect(Imagine).toBeDefined();
	});

	it("should expose Imagine.engine", function(){
		expect(Imagine.engine).toBeDefined();
	});

	it("should expose Imagine.objects", function(){
		expect(Imagine.objects).toBeDefined();	
	});

	it("should add an object passed to Imagine() to engine objects", function(){
		var obj = {test:"test"};
		Imagine(obj);
		expect(Imagine.objects[0]).toBe(obj);
	})

	it("should reset imagine between tests", function(){
		expect(Imagine.objects.length).toBe(0);
	});

})