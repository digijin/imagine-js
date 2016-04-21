var Input = require('../../src/imagine/input');
var input = new Input();

describe('Imagine/Input', function(){

	beforeEach(function() {
		// Imagine.engine.reset();
	});

	it("should expose Imagine.input", function(){
		expect(input).toBeDefined();
	});

	it("should expose Imagine.input.axes", function(){
		expect(input.axes).toBeDefined();
	});
	// it('should use notify function', function(){
	// 	var obj = {onKeyDown:function(){
	//
	// 	}};
	// 	spyOn(obj, "onKeyDown");
	// 	Imagine(obj);
	// 	input.keydown("left");
	// 	expect(obj.onKeyDown).toHaveBeenCalled();
	// });
	//
	//
	describe('constructor', function(){
		describe('listens to', function(){
			describe('chrome', function(){
				it('keydown', function(){
					spyOn(input, 'keydown');
					var event = document.createEvent('Event');
				  event.keyCode = 1;
				  event.initEvent('keydown');
				  document.dispatchEvent(event);
					expect(input.keydown).toHaveBeenCalled();
				});
				it('keyup', function(){
					spyOn(input, 'keyup');
					var event = document.createEvent('Event');
				  event.keyCode = 1;
				  event.initEvent('keyup');
				  document.dispatchEvent(event);
					expect(input.keyup).toHaveBeenCalled();
				});
			});
			describe('firefox', function(){
				it('keydown', function(){
					spyOn(input, 'keydown');
					var event = document.createEvent('Event');
				  event.charCode = 1;
				  event.initEvent('keydown');
				  document.dispatchEvent(event);
					expect(input.keydown).toHaveBeenCalled();
				});
				it('keyup', function(){
					spyOn(input, 'keyup');
					var event = document.createEvent('Event');
				  event.charCode = 1;
				  event.initEvent('keyup');
				  document.dispatchEvent(event);
					expect(input.keyup).toHaveBeenCalled();
				});
			});
		});

	});

	describe('addListener', function(){
		it('should be defined', function(){
			expect(input.addListener).toBeDefined();
			expect(input.listeners).toBeDefined();
		});
		it('should error if not given a function', function(){
			expect(function(){input.addListener(123);}).toThrow();
		});
		it('should add function to listeners', function(){
			var func = function(){};
			input.addListener(func);
			expect(input.listeners.length).toBe(1);
			expect(input.listeners[0]).toBe(func);
		});
	});
	describe('notify', function(){
		it('should notify all listeners of event', function(){
			var spy = jasmine.createSpy('spy');
			input.addListener(spy);
			input.notify(['yolo']);
			expect(spy).toHaveBeenCalled();
			expect(spy.calls.all()[0].args[0]).toBe('yolo');
		});
	});
	describe("getAxis", function(){

		it("should have getAxis", function(){
			expect(input.getAxis).toBeDefined();
		});

		it("should assign keypressed to axes", function(){
			expect(input.getAxis).toBeDefined();
			expect(input.getAxis("Horizontal")).toBe(0);
			input.keydown("left");
			expect(input.getAxis("Horizontal")).toBe(-1);
			input.keydown("right");
			expect(input.getAxis("Horizontal")).toBe(0);
			input.keyup("left");
			expect(input.getAxis("Horizontal")).toBe(1);
			input.keyup("right");
			expect(input.getAxis("Horizontal")).toBe(0);
		});

	});

	describe('getKey', function(){

		it("should be defined", function(){
			expect(input.getKey).toBeDefined();
		});

	});


	describe('keyup keydown', function(){

		// it("should ignore keydowns if the key is down", function(){
		// 	var obj = {
		// 		keydown:function(){}
		// 	};
		// 	spyOn(obj, "keydown");
		// 	Imagine(obj);
		//
		// 	input.keydown(1);
		// 	expect(obj.keydown.calls.count()).toBe(1);
		// 	input.keydown(1);
		// 	expect(obj.keydown.calls.count()).toBe(1);
		// 	input.keydown(1);
		// 	expect(obj.keydown.calls.count()).toBe(1);
		// 	input.keydown(1);
		// 	expect(obj.keydown.calls.count()).toBe(1);
		//
		// });
		// it("should call key function on objects on key events", function(){
		// 	var obj = {
		// 		keydown:function(){},
		// 		keyup:function(){}
		// 	};
		// 	spyOn(obj, "keydown");
		// 	spyOn(obj, "keyup");
		// 	Imagine(obj);
		//
		// 	Imagine.input.keydown(1);
		// 	Imagine.input.keyup(1);
		// 	// console.log(JSON.stringify(obj.keydown.calls));
		// 	expect(obj.keydown).toHaveBeenCalled();
		// 	expect(obj.keyup).toHaveBeenCalled();
		//
		// });

		it("should track status of keys", function(){
			input.keydown(1);
			input.keydown("left");
			expect(input.getKey(1)).toBe(true);
			expect(input.getKey("left")).toBe(true);
			expect(input.getKey(2)).toBe(false);
			expect(input.getKey("right")).toBe(false);
			input.keyup(1);
			input.keyup("left");
			expect(input.getKey(1)).toBe(false);
			expect(input.getKey("left")).toBe(false);
		});

		it("should reset key status on engine reset", function(){
			input.keydown("left");
			input.keyup("right");
			input.keydown(1);
			input.keyup(2);
			input.reset();
			expect(input.getKey("left")).toBe(false);
			expect(input.getKey("right")).toBe(false);
			expect(input.getKey(1)).toBe(false);
			expect(input.getKey(2)).toBe(false);
		});

		it("should track the key changes between frames", function(){
			expect(input.getKeyDown).toBeDefined();
			expect(input.getKeyUp).toBeDefined();
			expect(input.getKeyDown("left")).toBe(false);
			expect(input.getKeyDown(1)).toBe(false);
			expect(input.getKeyUp("left")).toBe(false);
			expect(input.getKeyUp(1)).toBe(false);
			input.keydown("left");
			input.keydown(1);
			input.update();
			expect(input.getKeyDown("left")).toBe(true);
			expect(input.getKeyDown(1)).toBe(true);
			input.keyup("left");
			input.keyup(1);
			input.update();
			expect(input.getKeyDown("left")).toBe(false);
			expect(input.getKeyDown(1)).toBe(false);
			expect(input.getKeyUp("left")).toBe(true);
			expect(input.getKeyUp(1)).toBe(true);
			input.update();
			expect(input.getKeyUp("left")).toBe(false);
			expect(input.getKeyUp(1)).toBe(false);
		});

	});

	describe('map', function(){

		it("should map keycodes to certain keywords", function(){
			expect(input.map(123)).toEqual(123);
			expect(input.map("left")).toEqual(37);
			expect(input.map("up")).toEqual(38);
			expect(input.map("40")).toEqual(40);
		});

	});

	describe('addAxis', function(){

		it("should add stuff given to addAxis to axes", function(){
			expect(input.addAxis).toBeDefined();
			var params = {"abc": 123};
			input.addAxis("test", params);
			expect(input.axes.test).toBeDefined();
			expect(input.axes.test).toEqual(params);
		});

	});

});
