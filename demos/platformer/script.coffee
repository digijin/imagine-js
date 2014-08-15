
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
			@element = $ @getComponent 'element'
			return 
		update: ->
			@dirV -= @gravity * Imagine.Time.deltaTime
			# hit floor
			if @y<=0 and @dirV <=0
				@dirV = 0
				@y = 0

			@element.css 'left', @x+= @dirH * Imagine.Time.deltaTime * @speed
			@element.css 'bottom', @y+= @dirV * Imagine.Time.deltaTime * @speed

		jump: ->
			if @dirV is 0 then @dirV = @jumpPower



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
		.addComponent character()
		.addComponent player()