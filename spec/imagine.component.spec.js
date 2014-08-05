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
})
