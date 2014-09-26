window.Announce = (msg) ->
	start: ->
		# console.log msg
		$ '#wrapper'
			.append '<div class="announce">'+msg+'</div>'