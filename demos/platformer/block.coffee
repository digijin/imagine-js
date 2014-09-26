window.Block = ->
	name: 'block'
	life: 1
	indestructable: false
	
	damage: ->
		@life -= 1
		if @life <= 0
			@die()

	die: ->
		el = @getComponent 'element'
		Imagine.destroy @
		# spawn debris
		for i in [1..4]
			# console.log i
			frag = $ '<div class="brickFrags"></div>'
			$ '#wrapper'
				.append frag

			frag.css 'left', $(el).css 'left'
			frag.css 'top', $(el).css 'top'

			frag = Imagine frag[0]
				.addComponent Dying()
				.getComponent 'dying'
			frag.dirH = (Math.random() - .5) *4
			frag.dirV = (Math.random() - .5) *4



		$(el).remove()