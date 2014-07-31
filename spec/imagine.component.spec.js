describe('Component', function(){

	beforeEach(function() {
		Imagine.engine.reset();
	});
	it('should be defined', function(){
		expect(Imagine.component).toBeDefined()
	})
	it('should add a component')
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
	})

	it('should take a single component')
	it('should have GetComponent', function(){
		var obj = {start:function(){
			expect(this.GetComponent).toBeDefined();
		}};
		Imagine({component:{obj:obj}})
	});
	it('should have AddComponent', function(){
		var obj = {start:function(){
			expect(this.AddComponent).toBeDefined();

		}};
		Imagine({component:{obj:obj}})
	});
	it('should actually add compnents')
})
