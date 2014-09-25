window.Player = ->
	name: "player"
	dirH: 0
	start: ->
		@char = @getComponent 'character'
		return
	update: ->
		left = @char.element.offsetLeft
		scrLeft = 400 - scene.offsetLeft
		if left > scrLeft  
			scene.move scrLeft - left, 0

		# console.log scene.offsetLeft
		if left < scrLeft and scene.offsetLeft < 0
			scene.move scrLeft - left, 0

		h = Imagine.Input.getAxis 'Horizontal'
		if Imagine.Input.getKey 'shift'
			h*=2
		@dirH = (@dirH+h)/2
		@char.dirH = @dirH
		# if Imagine.Input.getKeyDown 'left'
		if h < 0
		 	@char.faceLeft()
		# if Imagine.Input.getKeyDown 'right'

		if h > 0
			@char.faceRight()



		if Imagine.Input.getKeyDown 'up'
			@char.jump()
	topColl: (coll) ->
		if coll.collider
			en = coll.collider.getComponent 'enemy'
			if en
				# console.log "hit enemy on head"
				en.die()
				
				@char.jump()


	bottomColl: (coll) ->
		if coll.collider
			block = coll.collider.getComponent 'block'
