describe("utils", function(){
	it("should be defined", function(){
		expect(Imagine.utils).toBeDefined();
	});

	describe("typeIsArray", function(){
		it('should be defined', function(){
			expect(Imagine.utils.typeIsArray).toBeDefined();
		});
		it("should detect an array", function(){
			expect(Imagine.utils.typeIsArray([])).toBe(true)
		})
		it("should detect an object", function(){
			expect(Imagine.utils.typeIsArray({})).toBe(false)
		})
	})
})