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

		if @element.offsetLeft < 0 
			@dirH = 1
		if @element.offsetLeft >600-10
			@dirH = -1

		if @element.offsetTop < 0 
			@dirV = 1
		if @element.offsetTop > 400-10
			@dirV = -1

	onCollision: (coll) ->
		if 'top' in coll.side
			@dirV = -1




$ document
.ready () ->
	# console.log $("#player")
	Imagine $('#player')[0]
	.addComponent Imagine.collider()
	.addComponent Player()

	Imagine $('.ball')[0]
	.addComponent Imagine.collider()
	.addComponent Ball()