
Imagine.element = (element) ->

	unless isElement element 
		throw new Error "Not a HTML object"


	el = element
	el.name = "element"
	el.tags = ['element']
	el.rect = el.getBoundingClientRect
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

	el.move = (x, y) ->
		


	el