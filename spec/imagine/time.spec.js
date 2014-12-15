describe('Imagine/time', function(){
	beforeEach(function() {
		Imagine.engine.reset();
	});


	it("should define Time", function(){
		expect(Imagine.Time).toBeDefined();
	});

	describe("pause", function(){
		it("should define paused", function(){
			expect(Imagine.time.paused).toBeDefined()
		})
		it("should stop the flow of time", function(done){
			spyUpdate = jasmine.createSpy("spyUpdate")
			obj = {update: spyUpdate}
			Imagine(obj);
			setTimeout(function(){
				done();
				console.log(spyUpdate);
				expect(spyUpdate).not.toHaveBeenCalled();
				done()
			},100)

		})
		it("should restart on reset", function(){
			Imagine.time.pause();
			expect(Imagine.time.paused).toBe(true);
			Imagine.engine.reset();
			expect(Imagine.time.paused).toBe(false);
		})
	})

	describe('update', function(){
		it("should call update", function(){
			var obj = {update:function(){}};
			spyOn(obj, 'update');
			Imagine(obj);
			expect(Imagine.engine.forceUpdate).toBeDefined()
			Imagine.engine.forceUpdate();
			expect(obj.update).toHaveBeenCalled();
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
			Imagine.engine.setFPS(60);
			Imagine({}).addComponent(obj);
			setTimeout(function(){
				expect(Imagine.Time.deltaTime).toBeGreaterThan(0);
				expect(obj.update).toHaveBeenCalled();
				expect(counter).toBeGreaterThan(.02);
				expect(counter).toBeLessThan(.06);
				done();
			}, 50);
		});

	})

})

