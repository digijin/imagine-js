describe("Imagine.collider", function(){
	it("should be defined", function(){
		expect(Imagine.collider).toBeDefined();

	})
	it("should be searchable", function(){
		var coll = Imagine.collider();
		expect(coll.name).toBe('collider');
		expect(coll.tags.indexOf('collider')).not.toBe(-1);
	})

	describe("start", function(){
		it("should set element"
		// 	, function(){
		// 	var coll = Imagine.collider();
		// 	var div = document.createElement("DIV");
		// 	expect(coll).toBeDefined();
		// 	com = Imagine({})
		// 		.addComponent({name:"element"})
		// 		.addComponent(coll);
		// 	expect(com).toBeDefined();
		// 	expect(com.element).toBeDefined();
		// }
		)
	})

	describe("collidesWith", function(){
		
	})
	describe("compareSquares", function(){
		it("should have basic expectations", function(){
			var coll = Imagine.collider();
			expect(coll).toBeDefined();
			expect(coll.compareSquares).toBeDefined();
		})

		it("should return false when squares apart", function(){
			var coll = Imagine.collider();
			var sq1 = {	t:1,	l:1,	b:2,	r:2};
			var sq2 = {	t:11,	l:11,	b:12,	r:12};
			expect(coll.compareSquares(sq1, sq2)).toBe(false);
		})

		it("should return true when squares together", function(){
			var coll = Imagine.collider();
			var sq1 = {	t:1,	l:1,	b:2,	r:2};
			var sq2 = {	t:1,	l:1,	b:2,	r:2};
			expect(coll.compareSquares(sq1, sq2)).toBe(true);

			var sq1 = {	t:1,	l:1,	b:2,	r:2};
			var sq2 = {	t:2,	l:2,	b:3,	r:3};
			expect(coll.compareSquares(sq1, sq2)).toBe(true);

			var sq1 = {	t:1,	l:1,	b:5,	r:2};
			var sq2 = {	t:2,	l:2,	b:3,	r:3};
			expect(coll.compareSquares(sq1, sq2)).toBe(true);

			var sq2 = {	t:1,	l:1,	b:5,	r:2};
			var sq1 = {	t:2,	l:2,	b:3,	r:3};
			expect(coll.compareSquares(sq1, sq2)).toBe(true);

		});
		
			
	})
})