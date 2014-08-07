describe("Imagine.collider", function(){
	it("should be defined", function(){
		expect(Imagine.collider).toBeDefined();

	})
	it("should be searchable", function(){
		var coll = Imagine.collider();
		expect(coll.name).toBe('collider');
		expect(coll.tags.indexOf('collider')).not.toBe(-1);
	})
})