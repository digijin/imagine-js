window.Enemy = ->
	name: "enemy"
	start: ->
		@char = @getComponent 'character'
		@char.walkSpeed = .5
		@char.dirH = 1

	sideColl: (coll)->
		# console.log "sidecoll notified", coll
		if coll



			if "left" in coll.side
				# console.log "hit left"
				@char.dirH = -1
				@char.faceLeft()


			if "right" in coll.side
				# console.log "hit right"
				@char.dirH = 1
				@char.faceRight()

	update: ->
		# console.log @char.sideColl
