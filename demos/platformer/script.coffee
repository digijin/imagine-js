$(document).ready ->

	# Imagine.engine.setFPS 10
	player = Imagine $('#player')[0]
		.addComponent Imagine.collider()
		.addComponent Character()
		.addComponent Player()
		.getComponent "player"

	# Imagine $('#block1')[0]
	# 	.addComponent Imagine.collider()
	# Imagine $('#block2')[0]
	# 	.addComponent Imagine.collider()
	# hill = Imagine $('#block3')[0]
	# 	.addComponent Imagine.collider()
	# 	.getComponent "collider"
	# hill.ignoreSides = ["right", "bottom", "left"]

	Imagine $('#floor')[0]
		.addComponent Imagine.collider()

	scene = Imagine $('#scene')[0]
		.getComponent "element"


	addEnemy = (x, y, enemy) ->
		id = 'enemy' + x + '_' + y
		$ "#wrapper"
			.append '<div class="enemy '+enemy+'" id="'+id+'"></div>'

		en = $ "#"+id
		en.css "left", 100 + (x*60)
			.css "top", y * 60
		im = Imagine en[0]
			.addComponent Imagine.collider()
			.addComponent Character()
			.addComponent Enemy()

		switch enemy
			when 'turtle'
				im.addComponent Turtle()
			when 'bowser'
				im.addComponent Bowser()

	# addEnemy 8, 1, 1

	addBlock = (x, y, block) ->
		# console.log "adding"
		id = 'autoblock' + x + '_' + y
		$ "#wrapper"
			.append '<div class="brick" id="'+id+'"></div>'

		$ "#"+id
			.css "left", 100 + (x*60)
			.css "top", y * 60

		Imagine $("#"+id)[0]
			.addComponent Imagine.collider()
			.addComponent Block()


	for x in [0..level1.length-1]
		for y in [0..level1[x].length-1]
			# console.log x, y, level1[x][y]
			# console.log level1[x][y] is 1, level1[x][y], 1
			# switch level1[x][y]
			# 	when 1
			# 		console.log "yay", x, y

			if level1[x][y]
				# console.log x, y
				switch level1[x][y]
					when 1
						addBlock x, y, level1[x][y]
					when 2
						addEnemy x, y, 'turtle'
					when 3
						addEnemy x, y, 'bowser'





	Imagine $('#FPS')[0]
		.addComponent FPS()