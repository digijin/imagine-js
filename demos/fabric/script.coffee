

class View
	update: ->
		canvas.renderAll()

class Person
	x: 0
	y: 0
	start: ->
		@newTarget()
		@rect = new fabric.Rect
			left: 100
			top: 100
			stroke: 'red'
			fill: 'rgba(0,0,0,0)'
			width: 10
			height: 10
		canvas.add @rect
	newTarget: ->
		@target = {x:Math.random() * 300, y:Math.random() * 300}
	update: ->
		dx = @x - @target.x
		dy = @y - @target.y
		dir = [
			if dx < 0 then 1 else -1
			if dy < 0 then 1 else -1
			]
		if Math.abs(@x - @target.x) < 1
			dir[0] = 0
		if Math.abs(@y - @target.y) < 1
			dir[1] = 0
		if dir[0] is 0 and dir[1] is 0
			@newTarget()
		@x += dir[0]
		@y += dir[1]
		@draw()
	draw: ->
		@rect.left = @x
		@rect.top = @y


$ document
	.ready ->

		window.canvas = new fabric.Canvas 'stage'

		Imagine new View()
		Imagine new Person()


		Imagine $('#fps')[0]
			.addComponent new Imagine.FPS()

window.addPerson = (num) ->
	unless num
		num = 1
	for [1..num]
		Imagine new Person()