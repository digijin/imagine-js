window.Block = ->
	name: 'block'
	die: ->
		el = @getComponent 'element'
		Imagine.destroy @
		Imagine el
			.addComponent Dying()