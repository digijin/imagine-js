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


			if "right" in coll.side
				# console.log "hit right"
				@char.dirH = 1

	update: ->
		# console.log @char.sideColl
