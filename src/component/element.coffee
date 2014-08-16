
Imagine.element = (element) ->

	el = element
	el.name = "element"
	el.tags = ['element']
	el.getLocalRect = ->
		rect = el.getBoundingClientRect()
		parent = el.parentNode
		if parent
			prect = parent.getBoundingClientRect()
			rect = 
				right: rect.right - prect.left
				bottom: rect.bottom - prect.top
				top: rect.top - prect.top
				left: rect.left - prect.left
				height: rect.bottom - rect.top
				width: rect.right - rect.left
		rect
	el