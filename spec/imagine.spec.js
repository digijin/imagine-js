describe('reset', function(){
	it('should clear objects after reset', function(){
		Imagine({});
		Imagine.engine.reset();
		expect(Imagine.objects.length).toBe(0);
	});

	it('should reset startTime after reset', function(){
		Imagine.time.startTime = 123;
		Imagine.engine.reset();
		expect(Imagine.time.startTime).not.toBe(123);
	})
})

describe('basics', function(){
	beforeEach(function() {
		Imagine.engine.reset();
	});

	it("should define Time", function(){
		expect(Imagine.time).toBeDefined();
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

	it("should call start on an object passed to imagine", function(){
		var obj = {start:function(){}};
		spyOn(obj, 'start');
		Imagine(obj);
		expect(obj.start).toHaveBeenCalled();
	});

	it("should call update", function(){
		var obj = {update:function(){}};
		spyOn(obj, 'update');
		Imagine(obj);
		expect(obj.update).toHaveBeenCalled();
	});


});

describe('time', function(){
	beforeEach(function() {
		Imagine.engine.reset();
	});

	it("should set time.currentTime to currentTime", function(){
		var d = new Date();
		expect(Imagine.time.startTime).toBeGreaterThan(d.getTime()-100);
		expect(Imagine.time.startTime).toBeLessThan(d.getTime()+100);
	});

	it("should update deltaTime properly");

})