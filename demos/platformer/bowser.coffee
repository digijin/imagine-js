window.Bowser = ->
	start: ->
		@char = @getComponent 'character'
		@char.jumpPower = 3
		@en = @getComponent 'enemy'
		@en.life = 3
		@startpos = @element.offsetLeft

		@phase = 0
	update: ->
		switch @phase
			when 0
				@char.dirH = 1
				diff = @element.offsetLeft - @startpos
				# console.log diff, @element.offsetLeft, @startpos
				if diff > 200
					@phase = 1
					@char.jump()
			when 1
				@char.dirH = 0
				if @char.dirV is 0
					@phase = 2
			when 2
				@char.dirH = -1
				diff = @element.offsetLeft - @startpos
				if diff < 0
					@phase = 3
					@char.jump()
			when 3
				@char.dirH = 0
				if @char.dirV is 0
					@phase = 0
