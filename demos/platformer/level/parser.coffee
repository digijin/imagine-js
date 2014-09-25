window.levelparser = {
	parse: (str) ->
		out = []

		layers = str.split '\n'

		y = 0
		for layer in layers
			# console.log layer
			x = 0
			for block in layer
				# console.log block
				unless out[x]
					out.push []
				out[x].push block

				x++

			y++

		out

}