describe('Imagine.time', function(){
	beforeEach(function() {
		Imagine.engine.reset();
		Imagine.engine.setFPS(0);
	});


	it("should define Time", function(){
		expect(Imagine.Time).toBeDefined();
	});

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

	})

})

