var Mouse = require('src/imagine/input/mouse');
var mouse = new Mouse();
xdescribe('imagine/input/mouse', function(){
	beforeEach(function(){
		// pending();
	});

	it('should be defined', function(){
		expect(mouse).toBeDefined();
	});

	describe('events', () => {
		it('should trigger mousedown', () => {
				spyOn(mouse, 'mousedown');
				mouse.attachListeners();
				var event = document.createEvent('Event');
				event.initEvent('mousedown');
				document.dispatchEvent(event);
				expect(mouse.mousedown).toHaveBeenCalled();
		});
		it('should trigger mouseup', () => {
				spyOn(mouse, 'mouseup');
				mouse.attachListeners();
				var event = document.createEvent('Event');
				event.initEvent('mouseup');
				document.dispatchEvent(event);
				expect(mouse.mouseup).toHaveBeenCalled();
		});
	});

	describe('delta', function(){
		it('should be defined', function(){
			expect(mouse.delta).toBeDefined();
		});
		it('should have x', function(){
			expect(mouse.delta.x).toBeDefined();
		});
		it('should have y', function(){
			expect(mouse.delta.y).toBeDefined();
		});
		it('should have scroll', function(){
			expect(mouse.delta.scroll).toBeDefined();
		});
	});

	describe('update', function(){

		it('should be defined', function(){
			expect(this.mouse.update).toBeDefined();
		});

	});

	describe('getLastPosition', function(){

		it('should be defined', function(){
			expect(mouse.getLastPosition).toBeDefined();
		});
		it('should return x y', function(){
			var out = mouse.getLastPosition();
			expect(out.x).toBeDefined();
			expect(out.y).toBeDefined();
		});

	});

	describe('setLastPosition', function(){

		it('should handle chrome', function(){
			mouse.setLastPosition({x: 123, y:456});
			expect(mouse.getLastPosition().x).toBe(123);
			expect(mouse.getLastPosition().y).toBe(456);
		});
		it('should handle chrome', function(){
			mouse.setLastPosition({clientX: 123, clientY:456});
			expect(mouse.getLastPosition().x).toBe(123);
			expect(mouse.getLastPosition().y).toBe(456);
		});

	});

});
