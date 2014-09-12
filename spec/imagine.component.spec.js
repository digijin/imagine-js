describe('Imagine.Component', function(){

	beforeEach(function() {
		Imagine.engine.reset();
	});


	describe("_register", function(){
		var com1, com2, obj;
		beforeEach(function(){
			com1 = {
				name: "com1",
				_register: "comp1"
			}
			com2 = {
				name: "com2",
				_register: "comp2",
				
			}
		})

		it("should assign a component as a local var to another component if _register is set", function(){
			
			com2.start = function(){
				expect(this.comp1).toBeDefined();
				expect(this.comp2).toBeDefined();
			}
			obj = Imagine(com1).addComponent(com2);
			

		});
		it("shouldnt overwrite existing vars", function(){
			com2.comp1 = "test"
			com2.start = function(){
				expect(this.comp1).toBe("test");
			}
			obj = Imagine(com1).addComponent(com2);
		})

	})
	



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
		}, 400)
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
