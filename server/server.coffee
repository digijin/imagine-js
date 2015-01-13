express = require 'express'
app = express()
app.use(express.static(__dirname + '/../'));
app.listen process.env.PORT or 4010#yolo