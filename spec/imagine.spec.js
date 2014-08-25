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
