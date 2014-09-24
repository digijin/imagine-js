$(document).ready ->
	Character = ->
		name: 'character'
		speed: 200
		dirV: 0
		dirH: 0
		jumpPower: 4
		walkSpeed: 2
		gravity: 10
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

			@coll = @collider.move x, y
			if @coll and @coll.side
				if "top" in @coll.side
					@dirV = 0
				if "bottom" in @coll.side
					@dirV = 0
		jump: ->
			if @coll and @dirV is 0
				if "top" in @coll.side
					@dirV = -@jumpPower
	Player = ->
		name: "player"
		start: ->
			@char = @getComponent 'character'
			return
		update: ->
			# scene.move 1,1
			left = @char.element.offsetLeft
			scrLeft = 400 - scene.offsetLeft
			# console.log scrLeft, left
			if left > scrLeft  
				scene.move scrLeft - left, 0
			@char.dirH = Imagine.Input.getAxis 'Horizontal'
			if Imagine.Input.getKey 'up'
				@char.jump()
	player = Imagine $('#player')[0]
		.addComponent Imagine.collider()
		.addComponent Character()
		.addComponent Player()
		.getComponent "player"

	Imagine $('#block1')[0]
		.addComponent Imagine.collider()
	Imagine $('#block2')[0]
		.addComponent Imagine.collider()
	hill = Imagine $('#block3')[0]
		.addComponent Imagine.collider()
		.getComponent "collider"

	hill.ignoreSides = ["right", "bottom", "left"]

	Imagine $('#floor')[0]
		.addComponent Imagine.collider()

	scene = Imagine $('#scene')[0]
		.getComponent "element"

	console.log player