var Time = require('../../src/imagine/time');
var time =  new Time();
describe('Imagine/time', function(){

	beforeEach(function() {
		// Imagine.engine.reset();
		// var time =  new Time();
		time.reset();
	});

	afterEach(function() {
		// jasmine.clock().uninstall();
	});

	it("should define Time", function(){
		expect(time).toBeDefined();
	});

	describe('constructor', function(){

		it('should set starttime and lasttime', function(){
			time = new Time();
			expect(time.startTime>0).toBe(true);
			expect(time.startTime).toBe(time.lastTime);
		});

		it('should work from spinup', function(done){
			var spy = jasmine.createSpy('spy');
			time.addListener(spy);
			setTimeout(function(){
				expect(spy).toHaveBeenCalled();
				done();
			}, 1000);
		});

	});

	describe('reset', function(){

		it('should clear listeners', function(){
			time.addListener(function(){});
			time.reset();
			expect(time.listeners.length).toBe(0);
		});

	});
	describe("pause", function(){

		it("should define paused", function(){
			expect(time.paused).toBeDefined();
		});

		it("should define pause", function(){
			expect(time.pause).toBeDefined();
		});

		it('should be able to take no params', function(){
			var paused = time.paused;
			time.pause();
			expect(paused).not.toBe(time.paused);
		});

		it('should take boolz yo', function(){
			time.pause(true);
			expect(time.paused).toBe(true);
			time.pause(false);
			expect(time.paused).toBe(false);
		});

		it("should stop the flow of time", function(done){
			time.setFPS(60);
			var spy = jasmine.createSpy('spy');
			time.pause();
			// expect(Imagine.time.paused).toBe(true)
			time.addListener(spy);
			setTimeout(function(){
				expect(spy).not.toHaveBeenCalled();
				expect(spy.calls.count()).toBe(0);
				done();
			}, 50);
		});

		it("should restart on reset", function(){
			time.pause();
			expect(time.paused).toBe(true);
			time.reset();
			expect(time.paused).toBe(false);
		});

	});

	describe('update', function(){

		it("should call raf if fps=0", function(){
			spyOn(window, 'requestAnimationFrame');
			time.setFPS(0);
			time.update();
			expect(window.requestAnimationFrame).toHaveBeenCalled();
		});

		it('shouldnt call raf if fps !=0 ', function(){
				spyOn(window, 'requestAnimationFrame');
				time.setFPS(1);
				time.update();
				expect(window.requestAnimationFrame).not.toHaveBeenCalled();
		});

		it('should call listeners', function(){
			spy = jasmine.createSpy('spy');
			time.addListener(spy);
			time.update();
			expect(spy).toHaveBeenCalled();
		});

		it("should set time.currentTime to currentTime", function(){
			var d = new Date();
			expect(time.startTime).toBeGreaterThan(d.getTime()-100);
			expect(time.startTime).toBeLessThan(d.getTime()+100);
		});

		it("should call requestAnimationFrame if not fps>0", function(){
			spyOn(window, 'requestAnimationFrame');
			time.setFPS(10);
			expect(window.requestAnimationFrame).not.toHaveBeenCalled();
		});

		it('should call requestAnimationFrame if fps=0', function(){

			spyOn(window, 'requestAnimationFrame');
			time.setFPS(0);
			expect(window.requestAnimationFrame).toHaveBeenCalled();
		});

		it("should update deltaTime properly", function(done){
			var counter = 0;
			var calls = 0;
			var spy = function(){
				calls++;
				counter += time.deltaTime;
			};

			time.setFPS(60);
			time.update();
			time.addListener(spy);
			// jasmine.clock().tick(100)
			setTimeout(function(){
				expect(time.deltaTime).toBeGreaterThan(0);
				expect(calls).toBeGreaterThan(0);
				expect(counter).toBeGreaterThan(.02);
				// expect(counter).toBeLessThan(.06); //TODO HACK revisit
				done();
			}, 50);
		});

	});

	describe('addListener', function(){

		it('should be defined', function(){
			expect(time.addListener).toBeDefined();
			expect(time.listeners).toBeDefined();
		});

		it('should error if not given a function', function(){
			expect(function(){time.addListener(123);}).toThrow();
		});

		it('should add function to listeners', function(){
			var func = function(){};
			time.addListener(func);
			expect(time.listeners.length).toBe(1);
			expect(time.listeners[0]).toBe(func);
		});

	});

	describe('notify', function(){

		it('should notify all listeners of event', function(){
			var spy = jasmine.createSpy('spy');
			time.addListener(spy);
			time.notify(['yolo']);
			expect(spy).toHaveBeenCalled();
			expect(spy.calls.all()[0].args[0]).toBe('yolo');
		});

	});

	describe('clearUpdate', function(){

		it('should call clearInterval and cancelAnimationFrame', function(){
			spyOn(window, 'clearInterval');
			spyOn(window, 'cancelAnimationFrame');
			time.clearUpdate();
			expect(window.clearInterval).toHaveBeenCalled();
			expect(window.cancelAnimationFrame).toHaveBeenCalled();
		});

	});
	describe('setFPS', function(){

		it('should be defined', function(){
			expect(time.setFPS).toBeDefined();
		});

		it('should set updateId', function(){
			time.setFPS(0);
			var id = time.updateId;
			time.setFPS(0);
			expect(time.updateId).not.toBe(id);
			time.setFPS(60);
			var id = time.updateId;
			time.setFPS(60);
			expect(time.updateId).not.toBe(id);
		});

		it('should run at the fps you set it to', function(done){
			time.setFPS(40);
			var spy = jasmine.createSpy('spy');
			time.addListener(spy);
			setTimeout(function(){
				expect(spy).toHaveBeenCalled();
				expect(spy.calls.count()).toBeGreaterThan(0);
				expect(spy.calls.count()).toBeLessThan(2);
				done();
			}, 30);
		});

		it('should use requestanimationframe if fps is 0', function(){
			spyOn(window, "requestAnimationFrame");
			time.setFPS(0);
			expect(window.requestAnimationFrame.calls.count()).toBe(1);
		});
	});

	describe('getFPS', function(){

		it('should be defined', function(){
			expect(time.getFPS).toBeDefined();
		});

		it('should get the fps prevously set', function(){
			time.setFPS(10);
			expect(time.getFPS()).toBe(10);
			time.setFPS(0);
			expect(time.getFPS()).toBe(0);
		});
	});

});
