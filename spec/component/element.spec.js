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

})