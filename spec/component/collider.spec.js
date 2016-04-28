var Collider = require('src/component/collider');
var $ = require('jquery');
var _ = require('lodash');
var Imagine = require('src/imagine');
var imagine = new Imagine();

if(jasmine.getFixtures){
	jasmine.getFixtures().fixturesPath = 'spec/fixtures';
}
// console.log(_.keys(window.top).sort());
window.top.hello = "world";
console.info("hello");
// console.log(jasmine.getEnv());
describe("Imagine/component/collider", function(){

	beforeEach(function() {
		// Imagine.engine.reset();
		// if(fixture){
		// 	this.result = fixture.load('collider.html');
		// }else{
		// 	loadFixtures('collider.html');
		// }
		fixture.set(require('spec/fixtures/collider.html'));
  });

  describe("screenshots", function(){
    it('should find driver', function(){

			expect(driver).toBeDefined();
		});
  });

	it("should load fixtures", function(){
		expect($('#square')).toBeDefined();
		expect($('#square').length).toBe(1);
		expect($('#square').width()).toBe(10);
	});

	it("should be defined", function(){
		expect(Collider).toBeDefined();
	});

	it("should be searchable", function(){
		var coll = new Collider();
		expect(coll.type).toBe('collider');
		expect(coll.tags.indexOf('collider')).not.toBe(-1);
	});

	describe("move", function(){

		it("should slide along objects", function(){
			$('#square').css('top', 10);
			expect($('#square').css('left')).toBe('0px');
			expect($('#square').css('top')).toBe('10px');
			coll = imagine.register($('#square')[0]);
			coll.addComponent(new Collider());
			coll = coll.getComponent('collider');
			imagine.register($('#rectangle')[0]).addComponent(new Collider());
			coll.move(20, 0);
			expect($('#square').css('left')).toBe('20px');
		});

		it("should call element.move", function(){
			div = $('#square')[0];
			coll = new Collider();
			im = imagine.register(div).addComponent(coll);
			expect(im.getComponent('collider')).toBe(coll);
			el = im.getComponent('element');
			spyOn(el, "move");
			coll.move(1,1);
			expect(el.move).toHaveBeenCalled();
		});

		it("should be defined", function(){
			expect(new Collider().move).toBeDefined();
		});

		it("should move an object", function(){
			div = $('#square')[0];
			coll = new Collider();
			imagine.register(div).addComponent(coll);
			var origPos = div.getBoundingClientRect();
			coll.move(1,1);
			expect(div.getBoundingClientRect().top).not.toBe(origPos.top);
		});

		it("should move x wide y high", function(){
			var sq = $('#square');
			expect(sq.css("left")).toBe('0px');

			var isq = imagine.register(sq[0]).addComponent(new Collider()).getComponent("collider");
			isq.move(10, 5);
			expect(sq.css("top")).toBe('5px');
			expect(sq.css("left")).toBe('10px');

			isq.move(20, 10);
			expect(sq.css("top")).toBe('15px');
			expect(sq.css("left")).toBe('30px');
		});

		describe("collision", function(){

			var sq, rec, isq, irec;

			beforeEach(function(){
				sq = $('#square');
				rec = $('#rectangle');
				isq = imagine.register(sq[0]).addComponent(new Collider()).getComponent("collider");
				irec = imagine.register(rec[0]).addComponent(new Collider()).getComponent("collider");

				m1 = imagine.register($("#multi1")[0]).addComponent(new Collider());
				m2 = imagine.register($("#multi2")[0]).addComponent(new Collider());
			});

			it("should collide with multiple", function(){
				sq.css("left", 105);
				sq.css("top", 5);

				expect($("#multi1").css("left")).toBe("120px");
				expect($("#multi1").css("top")).toBe("10px");
				expect($("#multi2").css("left")).toBe("110px");
				expect($("#multi2").css("top")).toBe("20px");

				collision = isq.move(10, 10);

				expect(sq.css("top")).toBe("10px");
				expect(sq.css("left")).toBe("110px");
			});

			it("should not have edge issues", function(){
				sq.css("left", 100);
				sq.css("top", 0);
				collision = isq.move(10, 10);
				expect(sq.css("top")).toBe("10px");
				expect(sq.css("left")).toBe("110px");
			});

			//RECTANGLE is x=20 y=20 w=20 h=10 b=30 r=40
			//SQUARE is w&h = 10
			it("should return a collision object", function(){
				sq.css("left", 20);
				sq.css("top", 0);
				collision = isq.move(0, 15);
				expect(collision).toBeDefined();
				expect(collision.collider).toBeDefined();
			});

			it("should hit top", function(){
				sq.css("left", 20);
				sq.css("top", 0);
				var collision = isq.move(0, 15);
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

			it("should do abunch of random stuff", function(){
				expect(sq.css("left")).toBe('0px');
				expect(rec.css("left")).toBe('20px');

				expect(rec.css("top")).toBe('20px');
				expect(rec.width()).toBe(20);
				expect(rec.height()).toBe(10);
				expect(rec.css("left")).toBe('20px');

				isq.move(20, 5); //move over top of rect
				expect(sq.css("left")).toBe('20px');
				expect(sq.css("top")).toBe('5px');

				isq.move(0, 20);//slam into top
				expect(sq.css("left")).toBe('20px');
				expect(sq.css("top")).toBe('10px');

				isq.move(30, -5); // move off to the side
				expect(sq.css("left")).toBe('50px');
				expect(sq.css("top")).toBe('5px');

				isq.move(10, 40);
				expect(sq.css("left")).toBe('60px');
				expect(sq.css("top")).toBe('45px');
			});

			it("should reset between tests", function(){
				expect(sq.css("left")).toBe("0px");
			});

		});

		describe("notify", function(){
			var sq, rec, isq, irec, obj;

			beforeEach(function(){
				sq = $('#square');
				rec = $('#rectangle');

				obj = {type: 'dummy', onCollision:function(){}};
				spyOn(obj, "onCollision").and.callThrough();

				irec = imagine.register(rec[0]).addComponent(new Collider()).getComponent("collider");
				isq = imagine.register(sq[0])
					.addComponent(new Collider())
					.addComponent(obj)
					.getComponent('collider');

				sq.css("left", 20);
				sq.css("top", 0);
			});

			it("should notify a function on collision", function(){
				expect(isq.getComponent('dummy')).toBe(obj);

				collision = isq.move(0, 15);
				expect(collision).toBeDefined();

				expect(obj.onCollision).toHaveBeenCalled();
				args = obj.onCollision.calls.mostRecent().args[0];
				expect(args).toBeDefined();
			});

			it("should notify a component added after the collider", function(){
				var newobj = {name: 'postadd', onCollision:function(){
					// console.log("called");
				}};
				spyOn(newobj, "onCollision").and.callThrough();
				isq.addComponent(newobj);
				collision = isq.move(0, 15);
				expect(newobj.onCollision).toHaveBeenCalled();
				expect(obj.onCollision).toHaveBeenCalled();
			});

			it("should notify both collision objects", function(){
				var obj = {type: 'dummy', onCollision:function(){}};
				spyOn(obj, "onCollision").and.callThrough();

				irec.addComponent(obj);

				collision = isq.move(0, 15);
				expect(collision).toBeDefined();

				expect(obj.onCollision).toHaveBeenCalled();

			});

		});

	});
	describe("ignoreSide", function(){
		var sq, rec, isq, irec;

		describe("should ignore collisions on certain sides", function(){
			beforeEach(function(){
				sq = $('#square');
				rec = $('#rectangle');
				isq = imagine.register(sq[0]).addComponent(new Collider()).getComponent("collider");
				irec = imagine.register(rec[0]).addComponent(new Collider()).getComponent("collider");
			});
			it("like top", function(){
				irec.ignoreSides = ["top"];
				sq.css("left", 20);
				sq.css("top", 0);
				collision = isq.move(0, 15);
				expect(sq.css("top")).toBe("15px");

			});
			it("shouldnt hit bottom", function(){
				irec.ignoreSides = ["bottom"];
				sq.css("left", 20);
				sq.css("top", 40);
				collision = isq.move(0, -15);
				expect(sq.css("top")).toBe("25px");
			});

			it("shouldnt hit left", function(){
				irec.ignoreSides = ["left"];
				sq.css("left", 0);
				sq.css("top", 20);
				collision = isq.move(15, 0);
				expect(sq.css("left")).toBe("15px");
			});

			it("shouldnt hit right", function(){
				irec.ignoreSides = ["right"];
				sq.css("left", 50);
				sq.css("top", 20);
				collision = isq.move(-15, 0);
				expect(sq.css("left")).toBe("35px");
			});
		});
	});

	describe("compareSquares", function(){

		it("should have basic expectations", function(){
			var coll = new Collider();
			expect(coll).toBeDefined();
			expect(coll.compareSquares).toBeDefined();
		});

		it("should return false when squares apart", function(){
			var coll = new Collider();
			var sq1 = {	top:1,	left:1,	bottom:2,	right:2};
			var sq2 = {	top:11,	left:11,bottom:12,	right:12};
			expect(coll.compareSquares(sq1, sq2)).toBe(false);
			expect(coll.compareSquares(sq2, sq1)).toBe(false);

			var sq1 = {	top:1,	left:1,	bottom:2,	right:2};
			var sq2 = {	top:3,	left:0,	bottom:4,	right:3};
			expect(coll.compareSquares(sq1, sq2)).toBe(false);
			expect(coll.compareSquares(sq2, sq1)).toBe(false);
		});

	});

});
