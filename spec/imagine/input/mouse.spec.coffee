
describe 'imagine.mouse', ->
	beforeEach ->
		Imagine.engine.reset()
		@mouse = Imagine.input.mouse
	it 'should be defined', ->
		expect(Imagine.input.mouse).toBeDefined()

	describe 'delta', ->
		it 'should be defined', ->
			expect(@mouse.delta).toBeDefined()
		it 'should have x', ->
			expect(@mouse.delta.x).toBeDefined()
		it 'should have y', ->
			expect(@mouse.delta.y).toBeDefined()
		it 'should have scroll', ->
			expect(@mouse.delta.scroll).toBeDefined()

	describe 'update', ->
		it 'should be defined', ->
			expect(@mouse.update).toBeDefined()


	describe 'events', ->
		# it 'should fire onmousedown'
		# it 'should fire onmouseup'
		# it 'should fire onmousemove'
		# it 'should fire onmousewheel'

	describe 'getLastPosition', ->
		it 'should be defined', ->
			expect(@mouse.getLastPosition).toBeDefined()
		describe 'returns', ->
			beforeEach ->
				@out = @mouse.getLastPosition()
			it 'an object with x', ->
				expect(@out.x).toBeDefined()
			it 'an object with y', ->
				expect(@out.y).toBeDefined()
	describe 'setLastPosition', ->
		it 'should be defined', ->
			expect(@mouse.setLastPosition).toBeDefined()
		it 'should take chrome style events', ->
			@mouse.setLastPosition {x: 123, y:456}
			expect(@mouse.getLastPosition().x).toBe 123
			expect(@mouse.getLastPosition().y).toBe 456
		it 'should take firefox style events', ->
			@mouse.setLastPosition {clientX: 456, clientY:789}
			expect(@mouse.getLastPosition().x).toBe 456
			expect(@mouse.getLastPosition().y).toBe 789
