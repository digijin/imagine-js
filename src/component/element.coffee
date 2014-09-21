
Imagine.element = (element) ->

	unless isElement element 
		throw new Error "Not a HTML object"


	el = element
	el.name = "element"
	el.tags = ['element']
	el.rect = el.getBoundingClientRect

	# from jquery
	el.getOffsetParent = ->
		docElem = window.document.documentElement
		# console.log @, @offsetParent
		offsetParent = @offsetParent or docElem
		# offsetParent = offsetParent.offsetParent while offsetParent and (not offsetParent.nodeName is "HTML" and jQuery.css(offsetParent, "position") is "static")
		offsetParent = offsetParent.offsetParent while not isOffsetParent offsetParent
		offsetParent or docElem

	isOffsetParent = (node)->

		# console.log "is offset parent?", node
		unless node 
			return false
		# console.log node.nodeName.toLowerCase()
		if node.nodeName.toLowerCase() is "html"
			return true
		if node.nodeName.toLowerCase() is "body"
			return true
		pos = window.getComputedStyle(node).getPropertyValue('position')
		if pos is ""
			return false
		if pos is "static"
			return false
		# console.log "offset parent", true
		true


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
		rect = el.getBoundingClientRect()
		op = el.getOffsetParent()
		oprect = op.getBoundingClientRect()
		# console.log op, op.getBoundingClientRect()
		@style.top = (y+rect.top-oprect.top)+"px"
		@style.left = (x+rect.left-oprect.left)+"px"
		


	el