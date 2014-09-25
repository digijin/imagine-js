window.Player = ->
	name: "player"
	start: ->
		@char = @getComponent 'character'
		return
	update: ->
		left = @char.element.offsetLeft
		scrLeft = 400 - scene.offsetLeft
		if left > scrLeft  
			scene.move scrLeft - left, 0
		@char.dirH = Imagine.Input.getAxis 'Horizontal'
		if Imagine.Input.getKeyDown 'up'
			@char.jump()
	topColl: (coll) ->
		if coll.collider
			en = coll.collider.getComponent 'enemy'
			if en
				console.log "hit enemy on head"

	bottomColl: (coll) ->
		if coll.collider
			block = coll.collider.getComponent 'block'
