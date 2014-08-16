
Imagine.element = (element) ->

	el = element
	el.name = "element"
	el.tags = ['element']
	el.getLocalRect = ->
		rect = el.getBoundingClientRect()
		parent = el.parentNode
		if parent
			prect = parent.getBoundingClientRect()
			# console.log rect.top, prect.top
			rect.top -= prect.top
			rect.bottom -= prect.top
			rect.left -= prect.left
			rect.right -= prect.left
		rect
	el