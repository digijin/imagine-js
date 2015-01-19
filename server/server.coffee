express = require 'express'
_ = require 'lodash'
fs = require 'fs'
path = require 'path'
app = express()
app.use(express.static(__dirname + '/../'));
app.get '*', (req,res) ->
	dir = req.params[0]
	dir = path.resolve dir.substr 1
	# console.log dir
	fs.readdir dir, (err, files) ->
		# console.log err, files
		if err
			res.send "there was an error, probably 404"
		else
			res.send JSON.stringify files


app.listen process.env.PORT or 4010#yolo