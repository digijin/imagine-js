jasmine.getFixtures().fixturesPath = 'spec/fixtures';

describe("Imagine.collider", function(){

	beforeEach(function() {
		Imagine.engine.reset();
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

		});

		it("should move x wide y high", function(){
			var sq = $('#square');
			expect(sq.css("left")).toBe('0px');
			var isq = Imagine(sq[0]).addComponent(Imagine.collider()).getComponent("collider");
			isq.move(10, 5);
			expect(sq.css("top")).toBe('5px');
			expect(sq.css("left")).toBe('10px');
			isq.move(20, 10);
			expect(sq.css("top")).toBe('15px');
			expect(sq.css("left")).toBe('30px');
		})

		it("should stop when it hits something", function(){
			var sq = $('#square');
			var rec = $('#rectangle');
			expect(sq.css("left")).toBe('0px');
			expect(rec.css("left")).toBe('20px');
			var isq = Imagine(sq[0]).addComponent(Imagine.collider()).getComponent("collider");
			var irec = Imagine(rec[0]).addComponent(Imagine.collider()).getComponent("collider");
			// console.log(isq);
			isq.move(10, 5);
			expect(sq.css("top")).toBe('5px');
			expect(sq.css("left")).toBe('10px');
			expect(rec.css("top")).toBe('20px');
			isq.move(0, 20);
			expect(sq.css("top")).toBe('10px');
		})
		it("should notify a function on collision")
		it("should pass collided objects on collision")
		it("should be able to tell what side it collided with")
	})

	describe("collidesWith", function(){
		it("should take a html element as an input")
		it("should take a rect object as input")
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
			var sq1 = {	top:1,	left:1,	bottom:2,	right:2};
			var sq2 = {	top:11,	left:11,bottom:12,	right:12};
			expect(coll.compareSquares(sq1, sq2)).toBe(false);
			expect(coll.compareSquares(sq2, sq1)).toBe(false);

			var sq1 = {	top:1,	left:1,	bottom:2,	right:2};
			var sq2 = {	top:3,	left:0,	bottom:4,	right:3};
			expect(coll.compareSquares(sq1, sq2)).toBe(false);
			expect(coll.compareSquares(sq2, sq1)).toBe(false);


		})

		it("should return true when squares together", function(){
			var coll = Imagine.collider();
			var sq1 = {	top:1,	left:1,	bottom:2,	right:2};
			var sq2 = {	top:1,	left:1,	bottom:2,	right:2};
			expect(coll.compareSquares(sq1, sq2)).toBe(true);
			expect(coll.compareSquares(sq2, sq1)).toBe(true);

			var sq1 = {	top:1,	left:1,	bottom:2,	right:2};
			var sq2 = {	top:2,	left:2,	bottom:3,	right:3};
			expect(coll.compareSquares(sq1, sq2)).toBe(true);
			expect(coll.compareSquares(sq2, sq1)).toBe(true);

			var sq1 = {	top:1,	left:1,	bottom:5,	right:2};
			var sq2 = {	top:2,	left:2,	bottom:3,	right:3};
			expect(coll.compareSquares(sq1, sq2)).toBe(true);
			expect(coll.compareSquares(sq2, sq1)).toBe(true);

			var sq1 = {	top:2,	left:2,	bottom:3,	right:3};
			var sq2 = {	top:1,	left:1,	bottom:5,	right:2};
			expect(coll.compareSquares(sq1, sq2)).toBe(true);
			expect(coll.compareSquares(sq2, sq1)).toBe(true);

		});
		
			
	})
})