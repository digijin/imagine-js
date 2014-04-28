describe('engine', function(){

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

describe('input', function(){
	var Input = Imagine.Input; 
	beforeEach(function() {
		Imagine.engine.reset();
	});

	it("should expose Imagine.Input", function(){
		expect(Imagine.Input).toBeDefined();
	});

	it("should expose Imagine.Input.axes", function(){
		expect(Imagine.Input.axes).toBeDefined();
	});

	it("should add stuff given to addAxis to axes", function(){
		expect(Input.addAxis).toBeDefined();
		var params = {"abc": 123};
		Input.addAxis("test", params);
		expect(Input.axes.test).toBeDefined();
		expect(Input.axes.test).toEqual(params);
	});

	it("should map keycodes to certain keywords", function(){
		expect(Input.map(123)).toEqual(123);
		expect(Input.map("left")).toEqual(37);
		expect(Input.map("up")).toEqual(38);
		expect(Input.map("40")).toEqual(40);
	});

	it("should call key function on objects on key events", function(){
		var obj = {
			keydown:function(){},
			keyup:function(){}
		}
		spyOn(obj, "keydown");
		spyOn(obj, "keyup");
		Imagine(obj);

		Imagine.Input.keydown(1);
		Imagine.Input.keydown(1);
		Imagine.Input.keyup(1);
		expect(obj.keydown).toHaveBeenCalled();
		expect(obj.keyup).toHaveBeenCalled();

	});

	it("should track status of keys", function(){
		Input.keydown(1);
		expect(Input.isDown(1)).toBe(true);
		expect(Input.isDown(2)).toBe(false);
		Input.keyup(1);
		expect(Input.isDown(1)).toBe(false);
	});

	it("should reset key status on engine reset", function(){
		Input.keydown(1);
		Imagine.engine.reset();
		expect(Input.isDown(1)).toBe(false);
	});

});

describe('objects', function(){

	beforeEach(function() {
		Imagine.engine.reset();
	});

	it("should expose Imagine.objects", function(){
		expect(Imagine.objects).toBeDefined();	
	});

	it("should reset imagine between tests", function(){
		expect(Imagine.objects.length).toBe(0);
	});

	it("should add an object passed to Imagine() to engine objects", function(){
		var obj = {test:"test"};
		Imagine(obj);
		expect(Imagine.objects[0]).toBe(obj);
	})

	it("should call start on an object passed to imagine", function(){
		var obj = {start:function(){}};
		spyOn(obj, 'start');
		Imagine(obj);
		expect(obj.start).toHaveBeenCalled();
	});

})

describe('time', function(){
	beforeEach(function() {
		Imagine.engine.reset();
	});

	it('should reset startTime after reset', function(){
		Imagine.time.startTime = 123;
		Imagine.engine.reset();
		expect(Imagine.time.startTime).not.toBe(123);
	});

	it("should set last time to start time", function(){
		Imagine.engine.reset();
		expect(Imagine.time.startTime).toBe(Imagine.time.lastTime)
	})

	it("should call update", function(){
		var obj = {update:function(){}};
		spyOn(obj, 'update');
		Imagine(obj);
		Imagine.engine.forceUpdate();
		expect(obj.update).toHaveBeenCalled();
	});

	it("should define Time", function(){
		expect(Imagine.time).toBeDefined();
	});

	it("should set time.currentTime to currentTime", function(){
		var d = new Date();
		expect(Imagine.time.startTime).toBeGreaterThan(d.getTime()-100);
		expect(Imagine.time.startTime).toBeLessThan(d.getTime()+100);
	});

	it("should update deltaTime properly", function(done){
		var counter = 0;
		var obj = {
			update: function(){
				counter += Imagine.time.deltaTime;
			}
		}
		spyOn(obj, "update").and.callThrough();
		Imagine(obj);
		setTimeout(function(){
			expect(Imagine.time.deltaTime).toBeGreaterThan(0);
			expect(obj.update).toHaveBeenCalled();
			expect(counter).toBeGreaterThan(.4);
			expect(counter).toBeLessThan(.5);
			done();
		}, 500);
	});

	describe('fps', function(){
		it('should let you get the fps', function(){
			expect(Imagine.engine).toBeDefined();
			expect(Imagine.engine.getFPS).toBeDefined();
			expect(Imagine.engine.getFPS()).toBeGreaterThan(0);
		});
		it('should let you set the fps', function(){
			expect(Imagine.engine.setFPS).toBeDefined();
			var fps = 24;
			if(fps === Imagine.engine.getFPS()){
				fps = 12;
			}
			Imagine.engine.setFPS(fps);
			expect(Imagine.engine.getFPS()).toEqual(fps);
		});
		it('should run at the fps you set it to', function(done){
			
			var obj = {update:function(){}};
			spyOn(obj, 'update');
			Imagine(obj);
			Imagine.engine.setFPS(10);
			setTimeout(function(){
				expect(obj.update.calls.count()).toBeGreaterThan(2);
				expect(obj.update.calls.count()).toBeLessThan(5);
				done();
			}, 420);
		})
	});
});