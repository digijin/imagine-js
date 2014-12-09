describe('Imagine/Input', function(){
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
	it('should use notify function', function(){
		var obj = {onKeyDown:function(){

		}}
		spyOn(obj, "onKeyDown");
		Imagine(obj)
		Input.keydown("left");
		expect(obj.onKeyDown).toHaveBeenCalled();
	})


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
	
	describe('getKey', function(){
		it("should be defined", function(){
			expect(Imagine.Input.getKey).toBeDefined()
		})
	})


	describe('keyup keydown', function(){

		

		it("should ignore keydowns if the key is down", function(){
			var obj = {
				keydown:function(){}
			}
			spyOn(obj, "keydown");
			Imagine(obj);

			Imagine.Input.keydown(1);
			expect(obj.keydown.calls.count()).toBe(1);
			Imagine.Input.keydown(1);
			expect(obj.keydown.calls.count()).toBe(1);
			Imagine.Input.keydown(1);
			expect(obj.keydown.calls.count()).toBe(1);
			Imagine.Input.keydown(1);
			expect(obj.keydown.calls.count()).toBe(1);

		});
		it("should call key function on objects on key events", function(){
			var obj = {
				keydown:function(){},
				keyup:function(){}
			}
			spyOn(obj, "keydown");
			spyOn(obj, "keyup");
			Imagine(obj);

			Imagine.Input.keydown(1);
			Imagine.Input.keyup(1);
			// console.log(JSON.stringify(obj.keydown.calls));
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
