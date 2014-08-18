describe("Imagine.collider", function(){
	it("should be defined", function(){
		expect(Imagine.collider).toBeDefined();

	})
	it("should be searchable", function(){
		var coll = Imagine.collider();
		expect(coll.name).toBe('collider');
		expect(coll.tags.indexOf('collider')).not.toBe(-1);
	})

	describe("start", function(){
		// requires jquery
		// it("should set element", function(){
		// 	div = document.createElement('div')
		// 	coll = Imagine(div).addComponent(Imagine.collider())
		// 	expect(coll.element).toBeDefined();
		// 	//getComponent('element')
		// })
	})

	describe("move", function(){
		it("should be defined", function(){
			expect(Imagine.collider().move).toBeDefined();
		});
		it("should move an object", function(){
			div = document.createElement('div');
			coll = Imagine.collider();
			Imagine(div).addComponent(coll);
			var origPos = div.getBoundingClientRect().top;
			coll.move(1,1);
			expect(div.getBoundingClientRect().top).not.toBe(origPos);

		})
	})

	describe("collidesWith", function(){
		it("should take a html element as an input")
		it("should take a trbl object as input")
		it("should look at obj[0]and use it if it is a html element")//jq assist
	})
	describe("compareSquares", function(){
		it("should have basic expectations", function(){
			var coll = Imagine.collider();
			expect(coll).toBeDefined();
			expect(coll.compareSquares).toBeDefined();
		})

		it("should return false when squares apart", function(){
			var coll = Imagine.collider();
			var sq1 = {	t:1,	l:1,	b:2,	r:2};
			var sq2 = {	t:11,	l:11,	b:12,	r:12};
			expect(coll.compareSquares(sq1, sq2)).toBe(false);
			expect(coll.compareSquares(sq2, sq1)).toBe(false);

			var sq1 = {	t:1,	l:1,	b:2,	r:2};
			var sq2 = {	t:3,	l:0,	b:4,	r:3};
			expect(coll.compareSquares(sq1, sq2)).toBe(false);
			expect(coll.compareSquares(sq2, sq1)).toBe(false);


		})

		it("should return true when squares together", function(){
			var coll = Imagine.collider();
			var sq1 = {	t:1,	l:1,	b:2,	r:2};
			var sq2 = {	t:1,	l:1,	b:2,	r:2};
			expect(coll.compareSquares(sq1, sq2)).toBe(true);
			expect(coll.compareSquares(sq2, sq1)).toBe(true);

			var sq1 = {	t:1,	l:1,	b:2,	r:2};
			var sq2 = {	t:2,	l:2,	b:3,	r:3};
			expect(coll.compareSquares(sq1, sq2)).toBe(true);
			expect(coll.compareSquares(sq2, sq1)).toBe(true);

			var sq1 = {	t:1,	l:1,	b:5,	r:2};
			var sq2 = {	t:2,	l:2,	b:3,	r:3};
			expect(coll.compareSquares(sq1, sq2)).toBe(true);
			expect(coll.compareSquares(sq2, sq1)).toBe(true);

			var sq1 = {	t:2,	l:2,	b:3,	r:3};
			var sq2 = {	t:1,	l:1,	b:5,	r:2};
			expect(coll.compareSquares(sq1, sq2)).toBe(true);
			expect(coll.compareSquares(sq2, sq1)).toBe(true);

		});
		
			
	})
});
describe("Imagine.element", function(){

	it("should be defined", function(){
		expect(Imagine.element).toBeDefined();
	})

	it("should attach a name of element", function(){
		var div = document.createElement("DIV");
		var el = Imagine.element(div);
		expect(el.name).toBe('element');
		expect(el.tags.indexOf('element')).toBe(0);
	})
	describe("getLocalRect", function(){
		it("should be defined", function(){
			var div = document.createElement("DIV");
			var el = Imagine.element(div);
			expect(el.getLocalRect).toBeDefined()
		})
		it("should return a rect object", function(){
			var div = document.createElement("DIV");
			var el = Imagine.element(div);
			var rect = el.getLocalRect();
			expect(rect.top).toBeDefined();
			expect(rect.right).toBeDefined();
			expect(rect.bottom).toBeDefined();
			expect(rect.left).toBeDefined();
			expect(rect.height).toBeDefined();
			expect(rect.width).toBeDefined();

		})
	})

});
describe("etc", function(){
	it("should be coffeelinted")
	it("sohuld merge imagien and engine component init thingys")
});
describe('Component', function(){

	beforeEach(function() {
		Imagine.engine.reset();
	});
	it('should be defined', function(){
		expect(Imagine.component).toBeDefined()
	})
	
	it('should reset components after a reset')
	it('should run the start functions of components', function(){

		var obj = {start:function(){}};
		spyOn(obj, 'start');
		Imagine(
			{
				component:{
					obj: obj
				}
			})
		expect(obj.start).toHaveBeenCalled();
	});

	it('should run update on components', function(done){
		var obj = {update:function(){}};
		spyOn(obj, 'update');
		Imagine.engine.setFPS(0)
		Imagine(
			{
				component:{
					obj: obj
				}
			})
		setTimeout(function(){
			expect(obj.update).toHaveBeenCalled();
			done()
		}, 100)
	})

	
	it('should have getComponent', function(){
		var obj = {start:function(){
			expect(this.getComponent).toBeDefined();
		}};
		Imagine({component:{obj:obj}})
		expect(Imagine({}).getComponent).toBeDefined()
		expect(Imagine({}).addComponent({}).getComponent).toBeDefined()
	});


	it("should get a named component", function(){
		com = {
			name:"testcomponent"
		}
		expect(Imagine({}).addComponent(com).getComponent("testcomponent")).toBeDefined()
		expect(Imagine({}).addComponent(com).getComponent("testcomponent")).toBe(com)
	})

	it("should have getComponent on components", function(){
		var com = {start:function(){
			expect(this.getComponent).toBeDefined()
			expect(this.getComponent("test")).toBeDefined()
		}}
		Imagine({}).addComponent({name:'test'}).addComponent(com)
	})

	describe("addComponent", function(){

	})
})
;
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
;
describe("Imagine.engine", function(){

	beforeEach(function() {
		Imagine.engine.reset();
	});
	it("should exist", function(){
		expect(Imagine.engine).toBeDefined();
	})

	describe('registerObject', function(){
		it("should assign functions");
		it("should init components")
	})

	describe('FPS', function(){
		
		it('should run at the fps you set it to', function(done){
			
			var obj = {update:function(){}};
			spyOn(obj, 'update');
			Imagine(obj);
			Imagine.engine.setFPS(10);
			setTimeout(function(){
				expect(obj.update.calls.count()).toBeGreaterThan(0);
				expect(obj.update.calls.count()).toBeLessThan(3);
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

		it("should return initial object for chaining", function(){
			obj = {test:"abc"}
			com = {component:"test"}
			expect(Imagine(obj).addComponent(com)).toBe(obj)
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


;
describe('Imagine.Input', function(){
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
	it('shuold use notify function')


	describe("getAxis", function(){
		it("should have getAxis", function(){
			expect(Input.getAxis).toBeDefined();
		});

		
		it("should assign keypressed to axes", function(){
			expect(Input.getAxis).toBeDefined();
			expect(Input.getAxis("Horizontal")).toBe(0);
			
			Input.keydown("left");
			
			expect(Input.getAxis("Horizontal")).toBe(-1);

			Input.keydown("right");

			expect(Input.getAxis("Horizontal")).toBe(0);

			Input.keyup("left");

			expect(Input.getAxis("Horizontal")).toBe(1);

			Input.keyup("right");

			expect(Input.getAxis("Horizontal")).toBe(0);

		});

	});
	

	describe('keyup keydown', function(){


		it("should ignore keydowns if the key is down");
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
			console.log(JSON.stringify(obj.keydown.calls));
			expect(obj.keydown).toHaveBeenCalled();
			expect(obj.keyup).toHaveBeenCalled();

		});

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


		it("should expose getButton");
	});
	describe('map', function(){

		it("should map keycodes to certain keywords", function(){
			expect(Input.map(123)).toEqual(123);
			expect(Input.map("left")).toEqual(37);
			expect(Input.map("up")).toEqual(38);
			expect(Input.map("40")).toEqual(40);
		});
	});
	describe('addAxis', function(){

		it("should add stuff given to addAxis to axes", function(){
			expect(Input.addAxis).toBeDefined();
			var params = {"abc": 123};
			Input.addAxis("test", params);
			expect(Input.axes.test).toBeDefined();
			expect(Input.axes.test).toEqual(params);
		});
	})
})
;
describe('Imagine.time', function(){
	beforeEach(function() {
		Imagine.engine.reset();
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

;
describe('Polyfills', function(){
	it('requestAnimationFrame', function(){
		expect(window.requestAnimationFrame).toBeDefined();
	});

	it('console.log', function(){
		expect(console.log).toBeDefined();
	});
})
;
// describe('jasmine', function(){
// 	it("should find 'waits'", function(){
// 		waits(1000);
// 	});
// 	it("should find 'waitsFor'", function(){
// 		waitsFor(function(){}, 1000);
// 	});
// 	it("should find 'runs'", function(){
// 		runs(function(){});
// 	});
// })



// describe("Asynchronous specs", function() {
//   var value;

//   beforeEach(function(done) {
//     setTimeout(function() {
//       value = 0;
//       done();
//     }, 1);
//   });

//     it("should support async execution of test preparation and expectations", function(done) {
//     value++;
//     expect(value).toBeGreaterThan(0);
//     done();
//   });

    

//   describe("long asynchronous specs", function() {
//     var originalTimeout;
//     beforeEach(function() {
//       originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
//       jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
//     });

//     it("takes a long time", function(done) {
//       setTimeout(function() {
//         done();
//       }, 9000);
//     });

//     afterEach(function() {
//       jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
//     });
//   });
// });

