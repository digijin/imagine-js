describe('Imagine', function(){

	beforeEach(function() {
		Imagine.engine.reset();
	});


	describe('destroy', function(){
		it("should exist", function (){
			expect(Imagine.destroy).toBeDefined();
		});
		it("should destroy", function(){

			var obj = {}
			Imagine(obj);
			expect(Imagine.objects.length).toBe(1);
			Imagine.destroy(obj);
			expect(Imagine.objects.length).toBe(0);

		})
	})

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
		expect(obj.getComponent('element').raw).toBe(div)
	})

	it("should have a getComponent that searches all objects", function(){
		com = {name:'test'}
		Imagine({}).addComponent(com)
		expect(Imagine.getComponent).toBeDefined()
		expect(Imagine.getComponent('test')).toBeDefined()
		expect(Imagine.getComponent('test')).toBe(com)
	})
	it("should have a getComponents that searches all objects", function(){
		com1 = {name:'test', unique:"a"}
		com2 = {name:'test', unique:"b"}
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
	it("should have hasTag", function(){
		expect(Imagine({}).hasTag).toBeDefined()
	})
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

describe('notify', function(){
	it("shuold have notify defined", function(){
		expect(Imagine.notify).toBeDefined()
	});
	it("sohuld notify all components", function(){
		com1 = {func:function(){}}
		com2 = {func:function(){}}
		spyOn(com1, "func")
		spyOn(com2, "func")
		Imagine(com1);
		Imagine(com2);

		Imagine.notify('func');
		expect(com1.func).toHaveBeenCalled()
		expect(com2.func).toHaveBeenCalled()

	})
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
	it("should be able to pass args through notify")
	it("sohuld have a resize event")

	it("should return a component, not the object", function(){
		var comp = {name:"dummy"}
		expect(Imagine(comp)).toBe(comp);
	})

})
