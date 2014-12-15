Player = () ->
	name: 'player'
	speed: 200
	update: () ->
		@collider.move Imagine.Input.getAxis('Horizontal') * Imagine.Time.deltaTime * @speed, 0
		# console.log Imagine.Input.getAxis('Horizontal'), Imagine.Time.deltaTime, @speed


Ball = () ->
	name: 'ball'
	speed: 200
	dirV: 1
	dirH: 1
	update: () ->
		deltax = @dirH * Imagine.Time.deltaTime * @speed
		deltay = @dirV * Imagine.Time.deltaTime * @speed
		@collider.move deltax, deltay

		# console.log $ @element

		if @element.raw.offsetLeft < 0 
			@dirH = 1
		if @element.raw.offsetLeft >600-10
			@dirH = -1

		if @element.raw.offsetTop < 0 
			@dirV = 1
		if @element.raw.offsetTop > 400-10
			@dirV = -1

	onCollision: (coll) ->
		if 'top' in coll.side
			@dirV = -1
		if 'bottom' in coll.side
			@dirV = 1
		if 'left' in coll.side
			@dirH = -1
		if 'right' in coll.side
			@dirH = 1


Block = () ->
	name: 'block'
	onCollision: (coll) ->
		console.log "?"
		$ @element.remove()
		Imagine.destroy this

$ document
.ready () ->
	# console.log $("#player")
	Imagine $('#player')[0]
	.addComponent new Imagine.Collider()
	.addComponent Player()

	Imagine $('.ball')[0]
	.addComponent new Imagine.Collider()
	.addComponent Ball()

	for x in [0...10]
		for y in [0...3]
			block = $ '<div class="block" />'
			$ '#scene'
			.append block
			block = Imagine block[0]
			.addComponent new Imagine.Collider()
			.addComponent Block()
			block.element.move 10+x*50, 10+y*30