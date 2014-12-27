Game = React.createClass
	getInitialState: ->
		people:[]
	render: ->
		i=0
		peopleNodes = @state.people.map (person) ->
			<Person key={person.key} data={person} />
		<div className="game">
			{peopleNodes}
		</div>

Person = React.createClass
	render: ->
		# console.log @props
		styles = 
			left: @props.data.x + "px"
			top: @props.data.y + "px"
		<div className="person" style={styles}>
		</div>


window.Model = {}
class Model.Person
	name: "person"
	keyIndex = 0
	defaults: 
		key: 0
		x: 0
		y: 0
		firstname: "blank"
		lastname: "blank"
		head: "normal"
	target: {x:0, y:0}
	start: ->
		@newTarget()
	newTarget: ->
		@target = {x:Math.random() * 300, y:Math.random() * 300}
	constructor: (data)->
		unless data
			data = {}
		data.key = keyIndex++
		@data = _.extend {}, @defaults, data
	update: ->
		dx = @data.x - @target.x
		dy = @data.y - @target.y
		dir = [
			if dx < 0 then 1 else -1
			if dy < 0 then 1 else -1
			]
		if Math.abs(@data.x - @target.x) < 1
			dir[0] = 0
		if Math.abs(@data.y - @target.y) < 1
			dir[1] = 0
		if dir[0] is 0 and dir[1] is 0
			@newTarget()
		@data.x += dir[0]
		@data.y += dir[1]
		# @data.x++



class ViewRenderer
	game: null
	start: ->
		@game = React.render(
			<Game />,
			document.getElementById 'content'
			)
	update: ->
		coms = Imagine.getComponents 'person'
		data = coms.map (com) -> com.data
		# @game.setState
		# 	people: data
		# Imagine.destroy @



$(document).ready ->
	Imagine new ViewRenderer()
	addPerson()
	Imagine $('#fps')[0]
		.addComponent new Imagine.FPS()


window.addPerson = (num) ->
	unless num
		num = 1
	for [1..num]
		Imagine new Model.Person()