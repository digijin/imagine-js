$(document).ready ->

	
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

	# randomblocks
	# for num in [1..40]
	# 	# console.log num
	# 	Math.floor(Math.random() * 7)



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


	for x in [0..level1.length-1]
		for y in [0..level1[x].length-1]
			# console.log x, y, level1[x][y]
			# console.log level1[x][y] is 1, level1[x][y], 1
			# switch level1[x][y]
			# 	when 1
			# 		console.log "yay", x, y

			if level1[x][y]
				# console.log x, y
				addBlock x, y, level1[x][y]





	Imagine $('#FPS')[0]
		.addComponent FPS()