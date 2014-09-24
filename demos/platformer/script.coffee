$(document).ready ->
	character = ->
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
				if @coll.side.indexOf("top") >=0
					@dirV = 0
				if @coll.side.indexOf("bottom") >=0
					@dirV = 0
		jump: ->
			if @coll and @dirV is 0
				if @coll.side.indexOf("top") >= 0
					@dirV = -@jumpPower
	player = ->
		start: ->
			@char = @getComponent 'character'
			return
		update: ->
			@char.dirH = Imagine.Input.getAxis 'Horizontal'
			if Imagine.Input.getKey 'up'
				@char.jump()
	Imagine $('#player')[0]
		.addComponent Imagine.collider()
		.addComponent character()
		.addComponent player()

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