window.Turtle = ->
	

	start: ->
		@char = @getComponent 'character'
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