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
	for num in [1..40]
		# console.log num
		$ "#wrapper"
			.append '<div class="brick" id="autoblock' + num + '"></div>'

		$ "#autoblock"+num
			.css "left", 400 + (num*60)
			.css "top", Math.floor(Math.random() * 7) * 60

		Imagine $("#autoblock"+num)[0]
			.addComponent Imagine.collider()




	Imagine $('#FPS')[0]
		.addComponent FPS()