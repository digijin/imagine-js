window.Dying = ()->
	name: 'dying'
	dirV:-1
	dirH:0
	timer: 3
	update: ->
		@timer -= Imagine.time.deltaTime
		@dirV += Imagine.time.deltaTime * 10
		@element.move @dirH, @dirV

		if @timer <= 0
			$ @element.raw
				.remove()
			Imagine.destroy @