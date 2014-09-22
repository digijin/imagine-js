jasmine.getFixtures().fixturesPath = 'spec/fixtures';

describe("Imagine/component/collider", function(){

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

		it("should call element.move", function(){
			div = $('#square')[0];
			coll = Imagine.collider();
			im = Imagine(div).addComponent(coll);

			expect(im.getComponent('collider')).toBe(coll);

			el = im.getComponent('element');
			spyOn(el, "move");

			coll.move(1,1);
			expect(el.move).toHaveBeenCalled();

		})

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
			//debugging tests...
			// expect(sq).toBeDefined();
			// expect(sq[0]).toBeDefined();
			
			// sq.css("left", "1px");
			
			// expect(typeof sq.attr("style")).toBe("string");
			// expect(sq.attr("style")).toBe("left: 1px;");

			// expect(sq.css("left")).toBe('1px');
			// sq.css("left", "0px");

			expect(sq.css("left")).toBe('0px');
			var isq = Imagine(sq[0]).addComponent(Imagine.collider()).getComponent("collider");
			isq.move(10, 5);

			// expect(JSON.stringify(sq[0].getBoundingClientRect())).toBe(1);

			expect(sq.css("top")).toBe('5px');
			expect(sq.css("left")).toBe('10px');

			// expect(sq.attr("style")).toBe("left: 10px;");
			isq.move(20, 10);
			expect(sq.css("top")).toBe('15px');
			expect(sq.css("left")).toBe('30px');
		})

		describe("collision", function(){
			var sq, rec, isq, irec;
			beforeEach(function(){
				sq = $('#square');
				rec = $('#rectangle');
				isq = Imagine(sq[0]).addComponent(Imagine.collider()).getComponent("collider");
				irec = Imagine(rec[0]).addComponent(Imagine.collider()).getComponent("collider");
			});

			//RECTANGLE is x=20 y=20 w=20 h=10 b=30 r=40
			//SQUARE is w&h = 10
			it("should return a collision object", function(){
				sq.css("left", 20);
				sq.css("top", 0);
				collision = isq.move(0, 15);
				expect(collision).toBeDefined();
				expect(collision.collider).toBeDefined();
			})

			it("should hit top", function(){
				sq.css("left", 20);
				sq.css("top", 0);
				collision = isq.move(0, 15);
				expect(sq.css("top")).toBe("10px");
				expect(collision.side[0]).toBe("top");
				collision = isq.move(0, 1);
				expect(sq.css("top")).toBe("10px");
				expect(collision.side[0]).toBe("top");


				expect(sq.css("left")).toBe("20px");
				collision = isq.move(1, 1);
				expect(sq.css("top")).toBe("10px");
				expect(sq.css("left")).toBe("21px");

			});
			it("should hit bottom", function(){
				sq.css("left", 20);
				sq.css("top", 40);
				collision = isq.move(0, -15);
				expect(sq.css("top")).toBe("30px");
				expect(collision.side[0]).toBe("bottom");
				collision = isq.move(1, -1);
				expect(sq.css("top")).toBe("30px");
				expect(sq.css("left")).toBe("21px");
				expect(collision.side[0]).toBe("bottom");
			});

			it("should hit left", function(){
				sq.css("left", 0);
				sq.css("top", 20);
				collision = isq.move(15, 0);
				expect(sq.css("left")).toBe("10px");
				expect(collision.side[0]).toBe("left");
				collision = isq.move(1, 1);
				expect(sq.css("left")).toBe("10px");
				expect(sq.css("top")).toBe("21px");
				expect(collision.side[0]).toBe("left");
			});

			it("should hit right", function(){
				sq.css("left", 50);
				sq.css("top", 20);
				collision = isq.move(-15, 0);
				expect(sq.css("left")).toBe("40px");
				expect(collision.side[0]).toBe("right");
				collision = isq.move(-1, 1);
				expect(sq.css("left")).toBe("40px");
				expect(sq.css("top")).toBe("21px");
				expect(collision.side[0]).toBe("right");
			});


			// it("should detects hits when flush with collider", function(){
			// 	sq.css("left", 10);
			// 	sq.css("top", 20);
			// 	isq.move(15, 0);
			// 	expect(sq.css("left")).toBe("10px");
			// });

			// it("should do abunch of random stuff", function(){
			// 	expect(sq.css("left")).toBe('0px');
			// 	expect(rec.css("left")).toBe('20px');

			// 	expect(rec.css("top")).toBe('20px');
			// 	expect(rec.width()).toBe(20);
			// 	expect(rec.height()).toBe(10);
			// 	expect(rec.css("left")).toBe('20px');

			// 	isq.move(20, 5); //move over top of rect
			// 	expect(sq.css("left")).toBe('20px');
			// 	expect(sq.css("top")).toBe('5px');

			// 	isq.move(0, 20);//slam into top
			// 	expect(sq.css("left")).toBe('20px');
			// 	expect(sq.css("top")).toBe('10px');

			// 	isq.move(30, -5); // move off to the side
			// 	expect(sq.css("left")).toBe('50px');
			// 	expect(sq.css("top")).toBe('5px');

			// 	isq.move(10, 40);
			// 	expect(sq.css("left")).toBe('60px');
			// 	expect(sq.css("top")).toBe('45px');
			// })


			it("should reset between tests", function(){
				expect(sq.css("left")).toBe("0px");
			})

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