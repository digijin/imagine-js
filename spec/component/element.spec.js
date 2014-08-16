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

})