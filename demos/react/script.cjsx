Game = React.createClass
	getInitialState: ->
		people:[]
	render: ->
		i=0
		# console.log @state
		peopleNodes = @state.people.map (person) ->
			<Person key={i++} data={person} />
		# console.log @props.data
		# console.log peopleNodes
		<div className="game">
			{peopleNodes}
		</div>

Person = React.createClass
	getInitialState: ->
		{rand:1}
	# componentDidMount: ->
	# 	setInterval( =>
	# 			@setState({rand: Math.random()})
	# 		, 1000)
	render: ->
		<div className="person">
			im a person called {@props.data.firstname} {@state.rand}
			<PersonHead data={@props.data.head} />
		</div>
PersonHead = React.createClass
	render: ->
		<div className="personHead">
			heres my {@props.data} head
		</div>

window.Model = {}
class Model.Person
	name: "person"
	keyIndex: 0
	defaults: 
		key: 0
		x: 0
		y: 0
		firstname: "blank"
		lastname: "blank"
		head: "normal"
	constructor: (data)->
		data.key = @keyIndex++
		@data = _.extend @defaults, data



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
		@game.setState
			people: data
		# Imagine.destroy @



$(document).ready ->

	Imagine new ViewRenderer()

	Imagine new Model.Person
		firstname: "james"

	# data = 
	# 	people:[
	# 		{
	# 			name: "bob"
	# 			head: "ugly"
	# 		}
	# 		{
	# 			name: "james"
	# 			head: "beautiful"
	# 		}
	# 	]
			
	

	
	# game.setState(data)