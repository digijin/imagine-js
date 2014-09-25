window.FPS = -> 
	lastFPS: []
	update: ->

		# console.log @

		@lastFPS.push 1/Imagine.Time.deltaTime


		if @lastFPS.length > 10
			fps = 0
			for reading in @lastFPS
				fps += reading
			fps = Math.floor fps / @lastFPS.length

			@lastFPS = []

			$ @element
				.html fps + "FPS"