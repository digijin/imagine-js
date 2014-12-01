$(document).ready ->

	# Imagine.engine.setFPS 10
	initPlayer = ->
		$ '#wrapper'
			.append '<div id="player"></div><div id="floor"></div>'
		player = Imagine $('#player')[0]
			.addComponent new Imagine.Collider()
			.addComponent Character()
			.addComponent Player()
			.getComponent "player"
		Imagine $('#floor')[0]
			.addComponent new Imagine.Collider()


	

	


	addEnemy = (x, y, enemy) ->
		id = 'enemy' + x + '_' + y
		$ "#wrapper"
			.append '<div class="enemy '+enemy+'" id="'+id+'"></div>'

		en = $ "#"+id
		en.css "left", 100 + (x*60)
			.css "top", y * 60
		im = Imagine en[0]
			.addComponent new Imagine.Collider()
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
			.append '<div class="' + block + '" id="'+id+'"></div>'

		$ "#"+id
			.css "left", 100 + (x*60)
			.css "top", y * 60

		coll = Imagine $("#"+id)[0]
			.addComponent new Imagine.Collider()
			.addComponent Block()
			.getComponent 'collider'
		switch block
			when 'hill'
				coll.ignoreSides = ['left', 'right', 'bottom']
			when 'castle'
				coll.isTrigger = true
				coll.addComponent Castle()
				coll.addTag 'castle'

	initLevel = ->
		for x in [0..level1.length-1]
			for y in [0..level1[x].length-1]
				if level1[x][y]
					# console.log x, y
					switch level1[x][y]
						when 1
							addBlock x, y, 'brick'
						when 2
							addEnemy x, y, 'turtle'
						when 3
							addEnemy x, y, 'bowser'
						when 4
							addBlock x, y, 'mbox'
						when 5
							addBlock x, y, 'hill'
						when 6
							addBlock x, y, 'castle'

	initScene = ->
		scene = Imagine $('#scene')[0]
			.addComponent {
				update: ->
					if Imagine.Input.getKeyDown 'escape'
						initGame()
			}
			.getComponent "element"
		scene.move(-scene.offsetLeft, 0)

	window.initGame = ->
		Imagine.engine.reset()
		$ '#wrapper'
			.html ''
		initPlayer()
		initLevel()
		initScene()
		# Imagine $('#FPS')[0]
		# 	.addComponent FPS()
		

	initGame()
	# initScene()
	# Imagine Announce("SUPER Mi9 BROTHERS<br /><sub>(esc to start)</sub>")

