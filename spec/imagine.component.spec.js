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
