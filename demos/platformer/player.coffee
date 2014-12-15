window.Player = ->
	name: "player"
	dirH: 0
	start: ->
		@char = @getComponent 'character'
		return
	update: ->
		left = @char.element.raw.offsetLeft
		scrLeft = 400 - scene.offsetLeft
		scEl = Imagine.getComponent "scene"
			.getComponent "element"
		# console.log scEl
		if left > scrLeft  
			scEl.move scrLeft - left, 0

		# console.log scene.offsetLeft
		if left < scrLeft and scene.offsetLeft < 0
			scEl.move scrLeft - left, 0

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
	die: ->
		Imagine Announce("GAME OVER<br /><sub>(esc to restart)</sub>")
		el = @getComponent 'element'
		Imagine.destroy @
		Imagine el.raw
			.addComponent Dying()

	onCollision: (coll) ->
		# console.log coll
		if coll and coll.side
			# console.log coll.side
			if "bottom" in coll.side
				# console.log "tap"
				block = coll.collider.getComponent 'block'
				if block
					# console.log "yolo"
					block.damage()
				


	topColl: (coll) ->
		if coll.collider
			en = coll.collider.getComponent 'enemy'
			if en
				# console.log "hit enemy on head"
				en.damage()
				
				@char.jump()


	bottomColl: (coll) ->
		# if coll.collider
		# 	block = coll.collider.getComponent 'block'
		# 	if block
		# 		# console.log "yolo"
		# 		block.damage()

	sideColl: (coll) ->
		if coll.collider
			en = coll.collider.getComponent 'enemy'
			if en
				@die()
			if coll.collider.hasTag 'castle'
				Imagine Announce("You Win!")

				for i in [1..3]
					fw = $ '<div class="firework"></div>'
					$ '#wrapper'
						.append fw
					Imagine fw
						.addComponent Firework()

					l = parseInt $(@element.raw).css 'left'
					
					l += (Math.random() - 0.5) * 600

					fw.css 'left', l
					fw.css 'top', Math.random() * 200