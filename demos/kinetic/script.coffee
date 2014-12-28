
# $ document
# 	.ready ->
# 		# window.stage = new Kinetic.Stage
# 		# 	container: 'stage'
# 		# 	width: 300
# 		# 	height: 300
# 		# window.layer = new Kinetic.Layer()
# 		window.obj = new Kinetic.Rect
# 	        x: 50
# 	        y: 50
# 	        width: 10
# 	        height: 10
# 	        stroke: 'red'
# 	        strokeWidth: 1

# 		# layer.add obj
# 		# stage.add layer

# 		Imagine
# 			update:->
# 				obj.rotate(1)
# 				# obj.move
# 				# 	x: 1
# 				# 	y: 1
# 				layer.draw()
# 		# stage.on 'contentMousemove', ->
# 		# 	obj.rotate(10)
# 		# 	layer.draw()

class View
	update: ->
		# canvas.renderAll()
		layer.draw()

class Person
	x: 0
	y: 0
	start: ->
		@newTarget()
		@rect = new Kinetic.Rect
	        x: 50
	        y: 50
	        width: 10
	        height: 10
	        stroke: 'red'
	        strokeWidth: 0
		layer.add @rect
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
		@rect.position
			x: @x
			y: @y


$ document
	.ready ->

		window.stage = new Kinetic.Stage
			container: 'stage'
			width: 300
			height: 300
		window.layer = new Kinetic.Layer()

		stage.add layer

		Imagine new View()
		Imagine new Person()


		Imagine $('#fps')[0]
			.addComponent new Imagine.FPS()

window.addPerson = (num) ->
	unless num
		num = 1
	for [1..num]
		Imagine new Person()