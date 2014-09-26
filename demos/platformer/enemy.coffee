window.Enemy = ->
	name: "enemy"
	life: 1
	start: ->
		@char = @getComponent 'character'
		@char.walkSpeed = .5
		@char.dirH = 1

	damage: ->
		@life -= 1
		if @life <= 0
			@die()

	die: ->
		el = @getComponent 'element'
		Imagine.destroy @
		Imagine el
			.addComponent Dying()
		


	update: ->
		# console.log @char.sideColl
