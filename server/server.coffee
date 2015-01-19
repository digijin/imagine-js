express = require 'express'
_ = require 'lodash'
fs = require 'fs'
path = require 'path'
app = express()

data = fs.readFileSync './server/dirindex.html'#, (err, data) ->
dirview = _.template data.toString()

data = fs.readFileSync './server/error.html'#, (err, data) ->
errorview = _.template data.toString()

app.use(express.static(__dirname + '/../'));
app.get '*', (req,res) ->
	rawdir = req.params[0]
	dir = path.resolve rawdir.substr 1
	fs.readdir dir, (err, files) ->
		if err
			res.send errorview({err})
		else
			res.send dirview({dir:rawdir, files})



app.listen process.env.PORT or 4010#yolo