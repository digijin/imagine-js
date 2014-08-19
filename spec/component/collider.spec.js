jasmine.getFixtures().fixturesPath = 'spec/fixtures';

describe("Imagine.collider", function(){

	beforeEach(function() {
		// Imagine.engine.reset();
        loadFixtures('collider.html');
    });

	it("should load fixtures", function(){
		expect($('#square')).toBeDefined();
		expect($('#square').length).toBe(1);
		expect($('#square').width()).toBe(10);
	})

	it("should be defined", function(){
		expect(Imagine.collider).toBeDefined();

	})
	it("should be searchable", function(){
		var coll = Imagine.collider();
		expect(coll.name).toBe('collider');
		expect(coll.tags.indexOf('collider')).not.toBe(-1);
	})

	describe("start", function(){
		// requires jquery
		// it("should set element", function(){
		// 	div = document.createElement('div')
		// 	coll = Imagine(div).addComponent(Imagine.collider())
		// 	expect(coll.element).toBeDefined();
		// 	//getComponent('element')
		// })
	})

	describe("move", function(){
		it("should be defined", function(){
			expect(Imagine.collider().move).toBeDefined();
		});
		it("should move an object", function(){
			div = $('#square')[0];
			coll = Imagine.collider();
			Imagine(div).addComponent(coll);
			var origPos = div.getBoundingClientRect();
			coll.move(1,1);
			expect(div.getBoundingClientRect().top).not.toBe(origPos.top);

		})
	})

	describe("collidesWith", function(){
		it("should take a html element as an input")
		it("should take a trbl object as input")
		it("should look at obj[0]and use it if it is a html element")//jq assist
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
			expect(coll.compareSquares(sq2, sq1)).toBe(false);

			var sq1 = {	t:1,	l:1,	b:2,	r:2};
			var sq2 = {	t:3,	l:0,	b:4,	r:3};
			expect(coll.compareSquares(sq1, sq2)).toBe(false);
			expect(coll.compareSquares(sq2, sq1)).toBe(false);


		})

		it("should return true when squares together", function(){
			var coll = Imagine.collider();
			var sq1 = {	t:1,	l:1,	b:2,	r:2};
			var sq2 = {	t:1,	l:1,	b:2,	r:2};
			expect(coll.compareSquares(sq1, sq2)).toBe(true);
			expect(coll.compareSquares(sq2, sq1)).toBe(true);

			var sq1 = {	t:1,	l:1,	b:2,	r:2};
			var sq2 = {	t:2,	l:2,	b:3,	r:3};
			expect(coll.compareSquares(sq1, sq2)).toBe(true);
			expect(coll.compareSquares(sq2, sq1)).toBe(true);

			var sq1 = {	t:1,	l:1,	b:5,	r:2};
			var sq2 = {	t:2,	l:2,	b:3,	r:3};
			expect(coll.compareSquares(sq1, sq2)).toBe(true);
			expect(coll.compareSquares(sq2, sq1)).toBe(true);

			var sq1 = {	t:2,	l:2,	b:3,	r:3};
			var sq2 = {	t:1,	l:1,	b:5,	r:2};
			expect(coll.compareSquares(sq1, sq2)).toBe(true);
			expect(coll.compareSquares(sq2, sq1)).toBe(true);

		});
		
			
	})
})