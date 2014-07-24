describe('Imagine', function(){

	beforeEach(function() {
		Imagine.engine.reset();
	});
	it('should accept an array of objects', function(){
		Imagine([{},{}])
		expect(Imagine.objects.length).toBe(2);
	})
})

describe('Polyfills', function(){
	it('requestAnimationFrame', function(){
		expect(window.requestAnimationFrame).toBeDefined();
	});

	it('console.log', function(){
		expect(console.log).toBeDefined();
	});
})

describe('Engine', function(){

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

describe('Input', function(){
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

	it("should ignore keydowns if the key is down");

	it("should track status of keys", function(){
		Input.keydown(1);
		Input.keydown("left");
		expect(Input.isDown(1)).toBe(true);
		expect(Input.isDown("left")).toBe(true);
		expect(Input.isDown(2)).toBe(false);
		expect(Input.isDown("right")).toBe(false);
		Input.keyup(1);
		Input.keyup("left");
		expect(Input.isDown(1)).toBe(false);
		expect(Input.isDown("left")).toBe(false);
	});

	it("should reset key status on engine reset", function(){
		Input.keydown("left");
		Input.keyup("right");
		Input.keydown(1);
		Input.keyup(2);
		Imagine.engine.reset();
		expect(Input.isDown("left")).toBe(false);
		expect(Input.isDown("right")).toBe(false);
		expect(Input.isDown(1)).toBe(false);
		expect(Input.isDown(2)).toBe(false);
	});

	it("should track the key changes between frames", function(){
		expect(Input.getKeyDown).toBeDefined();
		expect(Input.getKeyUp).toBeDefined();

		expect(Input.getKeyDown("left")).toBe(false);
		expect(Input.getKeyDown(1)).toBe(false);

		expect(Input.getKeyUp("left")).toBe(false);
		expect(Input.getKeyUp(1)).toBe(false);

		Input.keydown("left");
		Input.keydown(1);

		Imagine.engine.forceUpdate();

		expect(Input.getKeyDown("left")).toBe(true);
		expect(Input.getKeyDown(1)).toBe(true);

		Input.keyup("left");
		Input.keyup(1);

		Imagine.engine.forceUpdate();

		expect(Input.getKeyDown("left")).toBe(false);
		expect(Input.getKeyDown(1)).toBe(false);

		expect(Input.getKeyUp("left")).toBe(true);
		expect(Input.getKeyUp(1)).toBe(true);

		Imagine.engine.forceUpdate();

		expect(Input.getKeyUp("left")).toBe(false);
		expect(Input.getKeyUp(1)).toBe(false);
	});

	it("should assign keypressed to axes", function(){
		expect(Input.getAxis).toBeDefined();

		expect(Input.getAxis("Horizontal")).toBe(0);
		
		Input.keydown("left");
		//Imagine.engine.forceUpdate();
		
		expect(Input.getAxis("Horizontal")).toBe(-1);

		Input.keydown("right");
		//Imagine.engine.forceUpdate();

		expect(Input.getAxis("Horizontal")).toBe(0);

		Input.keyup("left");

		expect(Input.getAxis("Horizontal")).toBe(1);

		Input.keyup("right");

		expect(Input.getAxis("Horizontal")).toBe(0);

	});

	it("should expose getButton");


});

describe('Objects', function(){

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
	});

	it("should call start on an object passed to imagine", function(){
		var obj = {start:function(){}};
		spyOn(obj, 'start');
		Imagine(obj);
		expect(obj.start).toHaveBeenCalled();
	});

})

describe('Time', function(){
	beforeEach(function() {
		Imagine.engine.reset();
	});

	it('should reset startTime after reset', function(){
		Imagine.Time.startTime = 123;
		Imagine.engine.reset();
		expect(Imagine.Time.startTime).not.toBe(123);
	});

	it("should set last Time to start Time", function(){
		Imagine.engine.reset();
		expect(Imagine.Time.startTime).toBe(Imagine.Time.lastTime)
	});

	it("should call update", function(){
		var obj = {update:function(){}};
		spyOn(obj, 'update');
		Imagine(obj);
		Imagine.engine.forceUpdate();
		expect(obj.update).toHaveBeenCalled();
	});

	it("should define Time", function(){
		expect(Imagine.Time).toBeDefined();
	});

	it("should set time.currentTime to currentTime", function(){
		var d = new Date();
		expect(Imagine.Time.startTime).toBeGreaterThan(d.getTime()-100);
		expect(Imagine.Time.startTime).toBeLessThan(d.getTime()+100);
	});

	it("should update deltaTime properly", function(done){
		var counter = 0;
		var obj = {
			update: function(){
				counter += Imagine.Time.deltaTime;
			}
		}
		spyOn(obj, "update").and.callThrough();
		Imagine(obj);
		setTimeout(function(){
			expect(Imagine.Time.deltaTime).toBeGreaterThan(0);
			expect(obj.update).toHaveBeenCalled();
			expect(counter).toBeGreaterThan(.4);
			expect(counter).toBeLessThan(.5);
			done();
		}, 500);
	});

	describe('FPS', function(){
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
		});

		it('should use requestanimationframe if fps is 0', function(done){
			var obj = {update:function(){}};

			spyOn(obj, 'update');
			Imagine(obj);
			Imagine.engine.setFPS(0);
			setTimeout(function(){
				expect(obj.update.calls.count()).toBeGreaterThan(0);
				
				done();
			}, 50)
		});
		it('should call requestAnimationFrame', function(){

			spyOn(window, 'requestAnimationFrame');
			Imagine.engine.setFPS(0);
			expect(window.requestAnimationFrame).toHaveBeenCalled();
		})
	});
});