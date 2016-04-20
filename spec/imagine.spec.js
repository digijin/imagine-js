var Imagine = require('../src/imagine.js');
var imagine = new Imagine();
// import Imagine from '../src/imagine.js'
describe('Imagine', function(){

	it('should exist', function(){
		expect(Imagine).toBeDefined();
	});
	it('should be a class', function(){
		var imagine = new Imagine();
	});
	beforeEach(function() {
		imagine.reset();
	});
	describe('constructor', function(){
		it('should call register if passed params', function(){
			imagine = new Imagine({type:'dummy'});
			expect(imagine.objects.length).toBe(1);

		});
	});

	describe('register', function(){
		it('should take nothing to return an object with no components', function(){
			var obj = imagine.register();
			expect(obj.components.length).toBe(0);
		});
		it('should take what its given and make it a component', function(){
			expect(imagine.register({}).object.components.length).toBe(1);
		});
		it('should accept an array of objects', function(){
			imagine.reset();
			imagine.register([{},{}]);
			expect(imagine.objects.length).toBe(2);
		});

		it("should return the component it made", function(){
			expect(imagine.register({})).toBeDefined();
			expect(imagine.register({test:"string"}).test).toBe("string");
		});
		it("should take a htmlElement and turn it into a generic element for chaining", function(){
			div = document.createElement('div');
			obj = imagine.register(div);
			expect(obj.getComponent('element')).toBeDefined();
			expect(obj.getComponent('element').raw).toBe(div);
		});
		it('should attach functions', function(){
			var obj = imagine.register({});
			expect(obj.addComponent).toBeDefined();
			expect(obj.getComponent).toBeDefined();
			expect(obj.addTag).toBeDefined();
			expect(obj.hasTag).toBeDefined();
			expect(obj.removeTag).toBeDefined();
			expect(obj.notify).toBeDefined();
		});
		// it('should error if passed nothing', function(){
		// 	expect(function(){imagine.register();}).toThrow();
		// });
	});

	describe('reset', function(){
		it('should set objects to an empty array', function(){
			imagine.reset();
			expect(imagine.objects.length).toBe(0);
		});
	});


	describe('destroy', function(){
		it("should exist", function (){
			expect(imagine.destroy).toBeDefined();
		});
		it("should destroy", function(){

			var obj = {};
			imagine.register(obj);
			expect(imagine.objects.length).toBe(1);
			imagine.destroy(obj);
			expect(imagine.objects.length).toBe(0);

		});
	});

	describe("getComponent", function(){
		it("should be defined", function(){
			expect(imagine.getComponent).toBeDefined();
		});
		it("should have a getComponent that searches all objects", function(){
			com = {type:'test'};
			imagine.register({type:'filler'});
			imagine.register({}).addComponent(com);
			expect(imagine.getComponent).toBeDefined();
			expect(imagine.getComponent('test')).toBeDefined();
			expect(imagine.getComponent('test')).toBe(com);
		});
		it("should have a getComponents that searches all objects", function(){
			com1 = {type:'test', unique:"a"};
			com2 = {type:'test', unique:"b"};
			imagine.register({type:'filler'});
			imagine.register(com1);
			imagine.register(com2);
			expect(imagine.getComponents('test')).toBeDefined();
			expect(imagine.getComponents('test').length).toBe(2);
		});
	});

	describe('notify', function(){
		it("should have notify defined", function(){
			expect(imagine.notify).toBeDefined();
		});
		it("should notify all components", function(){
			com1 = {func:function(){}};
			com2 = {func:function(){}};
			spyOn(com1, "func");
			spyOn(com2, "func");
			imagine.register(com1);
			imagine.register(com2);

			imagine.notify('func');
			expect(com1.func).toHaveBeenCalled();
			expect(com2.func).toHaveBeenCalled();

		});
	});

// 	//e.g. Imagine($('#id')).addComponent(ball).addComponent(gravity)
//
// 	it("should turn a object passed into initializer into the first component and return that", function(){
// 		expect(Imagine({name:"test"}).getComponent("test")).toBeDefined()
// 	});
// })
//
	// describe('Tags', function(){
// 	beforeEach(function() {
// 		Imagine.engine.reset();
// 	});
// 	it("should have hasTag", function(){
// 		expect(Imagine({}).hasTag).toBeDefined()
// 	})
// 	it("should allow you to search by tags", function(){
// 		expect(Imagine({}).getTag).toBeDefined();
// 		// expect(Imagine({tags: ["test"]}).getTag("test")).toBeDefined();
// 		var com = Imagine({}).addComponent({tags:["test"]})
// 		expect(com.getTag("test")).toBeDefined()
// 	})
// 	it("should be able to detect tags on objects")
// 	it("should have addTag", function(){
// 		expect(Imagine({}).addTag).toBeDefined();
// 		com = Imagine({}).addComponent({name: "dummy"});
// 		expect(com.getTag("test")).not.toBeDefined();
// 		com.getComponent("dummy").addTag("test");
// 		expect(com.getTag("test")).toBeDefined();
// 	})
// 	it("should have removeTag", function(){
// 		expect(Imagine({}).removeTag).toBeDefined();
// 	})
// 	it("should have working removeTag")
	// });
//



	describe('Objects', function(){
//
// 	beforeEach(function() {
// 		Imagine.engine.reset();
// 	});
//
// 	it("should expose Imagine.objects", function(){
// 		expect(Imagine.objects).toBeDefined();
// 	});
//
// 	it("should reset imagine between tests", function(){
// 		expect(Imagine.objects.length).toBe(0);
// 	});
//
//
// 	it("should call start on an object passed to imagine", function(){
// 		var obj = {start:function(){}};
// 		spyOn(obj, 'start');
// 		Imagine(obj);
// 		expect(obj.start).toHaveBeenCalled();
// 	});
//
// 	it("should have a Notify function that calls a named function on all objects if function existing", function(){
// 		expect(Imagine({}).notify).toBeDefined();
// 		obj = {myfunc:function(){}}
// 		spyOn(obj, "myfunc");
// 		Imagine({}).addComponent(obj).notify("myfunc");
// 		expect(obj.myfunc).toBeDefined();
// 		expect(obj.myfunc).toHaveBeenCalled();
// 	})
// 	it("should be able to pass args through notify")
// 	it("sohuld have a resize event")
//
// 	it("should return a component, not the object", function(){
// 		var comp = {name:"dummy"}
// 		expect(Imagine(comp)).toBe(comp);
	});
});
