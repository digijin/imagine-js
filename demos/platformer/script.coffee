
$(document).ready ->

	character = ->
		name: 'character'
		speed: 200
		x: 0
		y: 0
		dirV: 0
		dirH: 0
		jumpPower: 4
		gravity: 10
		maxFallSpeed: 4
		start: ->
			@element = @getComponent 'element'
			@collider = @getComponent 'collider'
			return
		update: ->
			@dirV += @gravity * Imagine.Time.deltaTime
			# hit floor
			# if @element.rect().top>= 400 and @dirV >=0
			# 	@dirV = 0
			# 	@y = 0

			x = @dirH * Imagine.Time.deltaTime * @speed
			y = @dirV * Imagine.Time.deltaTime * @speed

			# @element[0].move x, y

			coll = @collider.move x, y
			if coll and coll.side
				if coll.side.indexOf "top" >=0
					@dirV = 0


		jump: ->
			if @dirV is 0 then @dirV = -@jumpPower



	player = ->
		start: ->
			@char = @getComponent 'character'
			return
		update: ->
			@char.dirH = Imagine.Input.getAxis 'Horizontal'
			if Imagine.Input.getKey 'up'
				@char.jump()


	console.log "ready"
	Imagine $('#player')[0]
		.addComponent Imagine.collider()
		.addComponent character()
		.addComponent player()

	Imagine $('#block')[0]
		.addComponent Imagine.collider()

	Imagine $('#floor')[0]
		.addComponent Imagine.collider()