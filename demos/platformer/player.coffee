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
		if Imagine.Input.getKey 'up'
			@char.jump()