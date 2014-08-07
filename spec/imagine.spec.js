describe('Imagine', function(){

	beforeEach(function() {
		Imagine.engine.reset();
	});

	it('should exist', function(){
		expect(Imagine).toBeDefined();
	})
	it('should accept an array of objects', function(){
		Imagine.engine.reset();
		Imagine([{},{}])
		expect(Imagine.objects.length).toBe(2);
	})

	it("should return the object it made", function(){
		expect(Imagine({})).toBeDefined()
		expect(Imagine({test:"string"}).test).toBe("string")
	})

	it("should take a htmlElement and turn it into a generic element for chaining", function(){
		div = document.createElement('div')
		obj = Imagine(div)
		expect(obj.getComponent('element')).toBeDefined()
		expect(obj.getComponent('element')).toBe(div)
	})

	it("should have a getComponent that searches all objects", function(){
		com = {name:'test'}
		Imagine({}).addComponent(com)
		expect(Imagine.getComponent).toBeDefined()
		expect(Imagine.getComponent('test')).toBeDefined()
		expect(Imagine.getComponent('test')).toBe(com)
	})
	it("should have a getComponents that searches all objects", function(){
		com1 = {name:'test'}
		com2 = {name:'test'}
		Imagine({}).addComponent(com1)
		Imagine({}).addComponent(com2)
		expect(Imagine.getComponents('test')).toBeDefined()
		expect(Imagine.getComponents('test').length).toBe(2)
	})
	//e.g. Imagine($('#id')).addComponent(ball).addComponent(gravity)

	it("should turn a object passed into initializer into the first component and return that", function(){
		expect(Imagine({name:"test"}).getComponent("test")).toBeDefined()
	});
})

describe('Name', function(){
	beforeEach(function() {
		Imagine.engine.reset();
	});
	it("should allow you to search by name", function(){
		Imagine({}).addComponent({name: 'test'})
		expect(Imagine.getComponent('test')).toBeDefined();
	})
	it("should be able to detect name on objects")
})
describe('Tags', function(){
	beforeEach(function() {
		Imagine.engine.reset();
	});
	it("should allow you to search by tags", function(){
		expect(Imagine({}).getTag).toBeDefined();
		// expect(Imagine({tags: ["test"]}).getTag("test")).toBeDefined();
		var com = Imagine({}).addComponent({tags:["test"]})
		expect(com.getTag("test")).toBeDefined()
	})
	it("should be able to detect tags on objects")
	it("should have addTag", function(){
		expect(Imagine({}).addTag).toBeDefined();
		com = Imagine({}).addComponent({name: "dummy"});
		expect(com.getTag("test")).not.toBeDefined();
		com.getComponent("dummy").addTag("test");
		expect(com.getTag("test")).toBeDefined();
	})
	it("should have removeTag", function(){
		expect(Imagine({}).removeTag).toBeDefined();
	})
	it("should have working removeTag")
})

describe('Polyfills', function(){
	it('requestAnimationFrame', function(){
		expect(window.requestAnimationFrame).toBeDefined();
	});

	it('console.log', function(){
		expect(console.log).toBeDefined();
	});
})

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

	
	it("should call start on an object passed to imagine", function(){
		var obj = {start:function(){}};
		spyOn(obj, 'start');
		Imagine(obj);
		expect(obj.start).toHaveBeenCalled();
	});

	it("should have a Notify function that calls a named function on all objects if function existing", function(){
		expect(Imagine({}).notify).toBeDefined();
		obj = {myfunc:function(){}}
		spyOn(obj, "myfunc");
		Imagine({}).addComponent(obj).notify("myfunc");
		expect(obj.myfunc).toBeDefined();
		expect(obj.myfunc).toHaveBeenCalled();
	})
	it("sohuld have a resize event")

})

describe('Time', function(){
	beforeEach(function() {
		Imagine.engine.reset();
		Imagine.engine.setFPS(0);
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
		expect(Imagine.engine.forceUpdate).toBeDefined()
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

	it("should call requestAnimationFrame if not fps>0", function(){
		spyOn(window, 'requestAnimationFrame');
		Imagine.engine.setFPS(10);
		expect(window.requestAnimationFrame).not.toHaveBeenCalled();
	})

	it('should call requestAnimationFrame if fps=0', function(){

		spyOn(window, 'requestAnimationFrame');
		Imagine.engine.setFPS(0);
		expect(window.requestAnimationFrame).toHaveBeenCalled();
	})

	it("should update deltaTime properly", function(done){
		var counter = 0;
		var obj = {
			update: function(){
				counter += Imagine.Time.deltaTime;
			}
		}
		spyOn(obj, "update").and.callThrough();
		Imagine.engine.setFPS(24);
		Imagine({}).addComponent(obj);
		setTimeout(function(){
			expect(Imagine.Time.deltaTime).toBeGreaterThan(0);
			expect(obj.update).toHaveBeenCalled();
			expect(counter).toBeGreaterThan(.25);
			expect(counter).toBeLessThan(.35);
			done();
		}, 300);
	});

	describe('FPS', function(){
		it('should let you get the fps', function(){
			expect(Imagine.engine).toBeDefined();
			expect(Imagine.engine.getFPS).toBeDefined();
			Imagine.engine.setFPS(1);
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
				expect(obj.update.calls.count()).toBeGreaterThan(0);
				expect(obj.update.calls.count()).toBeLessThan(5);
				done();
			}, 120);
		});

		it('should use requestanimationframe if fps is 0', function(done){
			var obj = {update:function(){}};

			spyOn(obj, 'update');
			Imagine(obj);
			Imagine.engine.setFPS(0);
			setTimeout(function(){
				expect(obj.update.calls.count()).toBeGreaterThan(0);
				
				done();
			}, 300)
		});
	});
});