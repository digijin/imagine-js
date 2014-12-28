


class View
	update: ->
		context.clearRect 0, 0, canvas.width, canvas.height

class Person
	x: 0
	y: 0
	start: ->
		@newTarget()
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
		context.strokeStyle = "#ff0000"
		context.strokeRect(@x, @y, 10, 10)





$ document
	.ready ->

		window.canvas = document.getElementById 'stage'
		window.context = canvas.getContext '2d'

		Imagine new View()
		Imagine new Person()


		Imagine $('#fps')[0]
			.addComponent new Imagine.FPS()

window.addPerson = (num) ->
	unless num
		num = 1
	for [1..num]
		Imagine new Person()