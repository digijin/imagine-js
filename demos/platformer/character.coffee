window.Character = ->
	name: 'character'
	speed: 200
	dirV: 0
	dirH: 0
	jumpPower: 4
	walkSpeed: 2
	gravity: 9
	maxFallSpeed: 4
	coll: undefined
	start: ->
		@element = @getComponent 'element'
		@collider = @getComponent 'collider'
		return
	update: ->
		@dirV += @gravity * Imagine.Time.deltaTime
		x = @dirH * @walkSpeed * Imagine.Time.deltaTime * @speed
		y = @dirV * Imagine.Time.deltaTime * @speed

		# console.log @element.rect()
		@collider.move x, 0

		@coll = @collider.move 0, y
		if @coll and @coll.side
			if "top" in @coll.side
				@dirV = 0
			if "bottom" in @coll.side
				@dirV = 0
	jump: ->
		if @coll and @dirV is 0
			if "top" in @coll.side
				@dirV = -@jumpPower