console.log "yolo"

$(document).ready ->
	React.render(
		<h1>Hi</h1>,
		document.getElementById 'example'
		)
	Imagine 
		update: ->
			rand = Math.random()
			React.render(
				<h1> hi {rand}</h1>,
				document.getElementById 'example'
			)
