var Imagine = require('../src/imagine.js');
var imagine = new Imagine();

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

		it('shuld attach a reference to the engine', function(){
			var obj = imagine.register();
			expect(obj.engine).toBe(imagine);
		})

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

});
