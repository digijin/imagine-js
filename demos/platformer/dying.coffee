window.Dying = ()->
	dirV:-1
	timer: 3
	update: ->
		@timer -= Imagine.Time.deltaTime
		@dirV += Imagine.Time.deltaTime * 10
		@element.move 0, @dirV

		if @timer <= 0
			$ @element
				.remove()
			Imagine.destroy @