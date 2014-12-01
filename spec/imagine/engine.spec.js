describe("Imagine/engine", function(){

	beforeEach(function() {
		Imagine.engine.reset();
	});
	it("should exist", function(){
		expect(Imagine.engine).toBeDefined();
	})

	describe('registerObject', function(){
		it("should assign functions");
		it("should init components")
		it("should not do crazy recursive self referential shit", function(){///////////////////////////
			// loadFixtures('collider.html');
			// var sq = $('#square');
			// var isq = Imagine(sq[0]).addComponent(new Imagine.Collider());
			// console.log(isq);
			// expect(isq._components[0]._components).not.toBeDefined();
		})
	})


	describe('forceUpdate', function(){
		it("should call update")
		// , function(){
		// 	spyOn(Imagine.engine, "update");
		// 	Imagine.engine.forceUpdate();
		// 	expect(Imagine.engine.update).toHaveBeenCalled();
		// })
		it("should clear the update if fps=0 to avoid multiple requestanimationframes triggering")
	})

	describe('FPS', function(){
		
		it('should run at the fps you set it to', function(done){
			
			Imagine.engine.setFPS(40);
			var obj = {update:function(){
				// console.log("component update");
				// console.log(Imagine.Time.deltaTime);
			}};
			spyOn(obj, 'update').and.callThrough();
			Imagine(obj);
			setTimeout(function(){
				expect(obj.update.calls.count()).toBeGreaterThan(0);
				expect(obj.update.calls.count()).toBeLessThan(2);
				done();
			}, 30);
		});

		it('should use requestanimationframe if fps is 0', function(){
			var obj = {update:function(){}};

			spyOn(obj, 'update');
			spyOn(window, "requestAnimationFrame")

			Imagine(obj);
			Imagine.engine.setFPS(0);
			expect(window.requestAnimationFrame.calls.count()).toBe(1)
			//expect(1).toBe(2)
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

	describe('setFPS', function(){
		
		it('should let you set the fps', function(){
			expect(Imagine.engine.setFPS).toBeDefined();
			var fps = 24;
			if(fps === Imagine.engine.getFPS()){
				fps = 12;
			}
			Imagine.engine.setFPS(fps);
			expect(Imagine.engine.getFPS()).toEqual(fps);
		});
	})
	describe('getFPS', function(){
		it('should let you get the fps', function(){
			expect(Imagine.engine).toBeDefined();
			expect(Imagine.engine.getFPS).toBeDefined();
			Imagine.engine.setFPS(1);
			expect(Imagine.engine.getFPS()).toBeGreaterThan(0);
		});
	})
	describe('addComponent', function(){

		it("should return the component", function(){
			var comp = {name:"dummy"}
			expect(Imagine({}).addComponent(comp)).toBe(comp)
		})

		it('should have addComponent', function(){
			var obj = {start:function(){
				expect(this.addComponent).toBeDefined();

			}};
			expect(Imagine({component:{obj:obj}}).addComponent).toBeDefined()
		});

		it("should call start on a component after adding", function(){
			var obj = {start:function(){}}
			spyOn(obj, 'start');
			Imagine({}).addComponent(obj);
			expect(obj.start).toHaveBeenCalled()
		})

		it('should take a single component')
		it('should take an array of components')

		it('should warn if addComponent is passed nothing', function(){
			spyOn(console, 'log');
			Imagine({}).addComponent();
			expect(console.log).toHaveBeenCalled()
		})

		it("should return last object for chaining", function(){
			obj = {test:"abc"}
			com = {component:"test"}
			expect(Imagine(obj).addComponent(com)).toBe(com)
		})
		it('should actually add compnents', function(){

		})

		it('should work on arrays') //e.g. Imagine([1,2]).addComponent(asd)

		it('should chain properly', function(){
			var obj = {test:"test"}
			expect(Imagine(obj)).toBe(obj)
			expect(Imagine(obj).addComponent(obj)).toBe(obj)
		})

		it("should set _object on components", function(){

			var obj = {obj: "obj"};
			var com = {com: "com"};
			Imagine(obj).addComponent(com);
			expect(com._object).toBeDefined()

		})


		it("if adding a component to a component, should go on the components object")


	})
	describe('getComponent', function(){



		beforeEach(function() {
			Imagine.engine.reset();
		});
		it("should allow you to search by name", function(){
			Imagine({}).addComponent({name: 'test'})
			expect(Imagine.getComponent('test')).toBeDefined();
		})
		it("should be able to detect name on objects")


	})
})


