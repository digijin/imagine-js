Person = React.createClass
	getInitialState: ->
		{rand:1}
	componentDidMount: ->
		setInterval( =>
				@setState({rand: Math.random()})
			, 1000)
	render: ->
		<div className="person">
			im a person called {@props.data.name} {@state.rand}
			<PersonHead data={@props.data.head} />
			<PersonBody />
		</div>
PersonHead = React.createClass
	render: ->
		<div className="personHead">
			heres my {@props.data} head
		</div>
PersonBody = React.createClass
	render: ->
		<div className="personBody">
			and heres my body
		</div>


$(document).ready ->
	React.render(
		<h1>Hi</h1>,
		document.getElementById 'example'
		)
	Imagine 
		update: ->
			rand = Imagine.time.deltaTime
			React.render(
				<h1> hi {rand}</h1>,
				document.getElementById 'example'
			)

	data = {
		name: "bob"
		head: "ugly"
	}

	React.render(
		<Person data={data} />,
		document.getElementById 'content'
		)