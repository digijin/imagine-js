jasmine.getFixtures().fixturesPath = 'spec/fixtures';

describe("Imagine/component/element", function(){

	var el;
	beforeEach(function() {
		Imagine.engine.reset();
		loadFixtures('offset.html');
		el = Imagine.element($('#square')[0]);
	});

	it("should be defined", function(){
		expect(Imagine.element).toBeDefined();
	})

	it("should throw an error if passed a non html object", function(){
		expect(function(){new Imagine.Element({})}).toThrow(new Error("Not a HTML object"))
	})

	it("should attach a name of element", function(){
		var div = document.createElement("DIV");
		var el = new Imagine.Element(div);
		expect(el.name).toBe('element');
		expect(el.tags.indexOf('element')).toBe(0);
	})

	describe("constructor", function(){
		it("should return an element component", function(){
			var comp = new Imagine.Element(el)
			expect(comp.name).toBe("element")
		})
		it("should copy some functinos to the element", function(){
			var div = $("#square")[0]
			new Imagine.Element(div)
			expect(div.getLocalRect).toBeDefined()
			expect(testshouldntpass).toBe(true)
		})
	})

	describe("raw", function(){
		it("should be the object passed into the constructor", function(){
			
			var comp = new Imagine.Element(el)
			expect(comp.raw).toBe(el);
		})
	})


	describe("getLocalRect", function(){
		it("should work with border")
		it("should work with margin")
		it("should work with padding")
		it("should be defined", function(){
			var div = document.createElement("DIV");
			var comp = new Imagine.Element(div);
			console.log(comp);
			expect(comp.getLocalRect).toBeDefined()


		})
		it("should return a rect object", function(){
			// var div = document.createElement("DIV");
			// var el = Imagine.element(div);
			var rect = el.getLocalRect();
			expect(rect.top).toBeDefined();
			expect(rect.right).toBeDefined();
			expect(rect.bottom).toBeDefined();
			expect(rect.left).toBeDefined();
			expect(rect.height).toBeDefined();
			expect(rect.width).toBeDefined();

		})
	})



	describe("move", function(){

		it('should be precise', function(){
			
			el.move(1,1);//prime it

			start = el.getLocalRect().left

			amnt = 1.2345
			el.move(amnt, 0)
			now = el.getLocalRect().left

			expected = now-start

			diff = Math.abs(expected - amnt)

			expect(diff).toBeLessThan(0.3)//for phantom, 0.0005 for browsers
		})

		it("shuold handle rounding errors")
			//css = 1.5px
			//move(1px)
			//expect css = 2px;

		it("should have move", function(){
			expect(el.move).toBeDefined();
		});
		it("should have moveTo", function(){
			expect(el.moveTo).toBeDefined();

		})
		it("shuold have an alias for moveto to setPosition", function(){
			expect(el.moveTo).toBe(el.setPosition)
		})

		it("sohuld calc right offset parent", function(){
			expect(el.getOffsetParent).toBeDefined()
			expect(el.getOffsetParent()).toBe($('#wrapper')[0])
		})

		it("should move the right amount", function(){

			
			t = el.rect().top
			l = el.rect().left

			expect(isElement(el)).toBe(true)
			el.move(1,2)

			// expect(el.offsetLeft).toBe("")
			// expect(el.style.left).toBe("sometihng")


			expect(el.rect().top).toBe(t+2)
			expect(el.rect().left).toBe(l+1)

			// expect($(el).position().left).toBe(el.rect().left)

			// el.move(1,2)
			// expect(el.rect().top).toBe(t+4)
			// expect(el.rect().left).toBe(l+2)
		})

	})

	describe('position', function(){
		describe('get', function(){
			it("should be defined", function(){
				expect(el.getPosition).toBeDefined()
			})
			it("should detect itself if not set", function(){
				otop = el.offsetTop
				left = el.offsetLeft
				pos = el.getPosition();
				expect(pos.top).toBe(otop);
				expect(pos.left).toBe(left);
			})
		})
		describe('set', function(){
			it("should be defined", function(){
				expect(el.setPosition).toBeDefined()
			})
			it("should return itself for chaining", function(){
				expect(el.setPosition(1,2)).toBe(el)
			})

			it("should set the positions", function(){
				el.setPosition(3,4)
				expect(el.style.left).toBe('3px')
				expect(el.style.top).toBe('4px')
			})
		})

		
		it("should set and return the stored position", function(){
			el.setPosition(5,6);
			pos = el.getPosition();
			expect(pos.left).toBe(5);
			expect(pos.top).toBe(6);
		})
	})

})