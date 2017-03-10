var morgan = require('morgan')
var express = require('express')
var app = express()
var bodyParse = require('body-parser')
var nunjucks = require('nunjucks')
var routes = require('./routes')
var path = require('path')
var models = require('./models')


app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '/public')));

var env = nunjucks.configure('view', {noCache: true})
app.set('view-engine', 'html')
app.engine('html', nunjucks.render)



var port = 1337
app.listen(port, function() {
	console.log("Listening on port ", port);
	models.Page.sync()
	modles.User.sync()
})
