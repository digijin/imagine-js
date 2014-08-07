describe("Imagine.engine", function(){

	it("should exist", function(){
		expect(Imagine.engine).toBeDefined();
	})


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


	it("should work in the right object scope / context")
	describe('init', function(){
		beforeEach(function() {
			Imagine.engine.reset();
		});
	})
	describe('reset', function(){

		it('should clear objects after reset', function(){
			Imagine({});
			Imagine.engine.reset();
			expect(Imagine.objects.length).toBe(0);
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
	})
	describe('clearUpdate', function(){
		it('sohuld call clearinterval', function(){
			spyOn(window, 'clearInterval');
			Imagine.engine.reset();
		})
	})
})


