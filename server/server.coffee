express = require 'express'

app = express()

app.get '/', (req, res) ->
	res.send 'ohayo'

# console.log __dirname
app.use(express.static(__dirname + '/../'));

app.listen process.env.PORT or 4010#yolo