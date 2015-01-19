express = require 'express'
_ = require 'lodash'
app = express()
app.use(express.static(__dirname + '/../'));
app.get '*', (req,res) ->
	res.send JSON.stringify _.keys req
app.listen process.env.PORT or 4010#yolo