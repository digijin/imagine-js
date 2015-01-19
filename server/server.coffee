express = require 'express'
_ = require 'lodash'
fs = require 'fs'
path = require 'path'
app = express()

dirview = null
data = fs.readFileSync './server/dirindex.html'#, (err, data) ->

dirview = _.template data.toString()

app.use(express.static(__dirname + '/../'));
app.get '*', (req,res) ->
	rawdir = req.params[0]
	dir = path.resolve rawdir.substr 1
	# console.log dir
	# out = 'output:<br />'
	fs.readdir dir, (err, files) ->
		# console.log err, files
		if err
			res.send "there was an error, probably 404"
		else
			# res.send JSON.stringify files
			# console.log files	
			res.send dirview({dir:rawdir, files})



app.listen process.env.PORT or 4010#yolo