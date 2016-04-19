describe("etc", function(){
	it("should be coffeelinted");
	it("should be compatible with AMD or commonJS");
	it("sohuld merge imagine and engine component init thingys");

	it("blah", function(){
		comp = {
			name : "whatevs"
		};
		obj = Imagine(comp);
		expect(obj).toBe(comp);
		expect(obj.name).toBe(comp.name);
	});
});
