/// for coffeeify transformation

describe('coffeeify', function(){
	describe('imagine', function(){
		it("should exist", function(){
			expect(Imagine).toBeDefined()
		});
		describe('engine', function(){
			it("should have engine defined", function(){
				expect(Imagine.engine).toBeDefined()
			});
			it('should have reset', function(){
				expect(Imagine.engine.reset).toBeDefined()
			})
		})
		describe('time', function(){
			it("should have time defined", function(){
				expect(Imagine.time).toBeDefined()
				expect(Imagine.time.startTime).toBeDefined()
			});
		})
	})

})