var morgan = require('morgan')
var express = require('express')
var app = express()
var bodyParse = require('body-parser')
var nunjucks = require('nunjucks')
var routes = require('./routes')
var path = require('path')
var models = require('./models')
//wiki router
var wikiRouter = require('./routes/wiki');
var userRouter = require('./routes/user');

app.use(bodyParse.urlencoded({extended: true}))
app.use(bodyParse.json())

app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '/public')));

var env = nunjucks.configure('views', {noCache: true})
app.set('view engine', 'html')
app.engine('html', nunjucks.render)

//use wiki router
app.use('/wiki', wikiRouter);
//use user router
app.use('/users', userRouter);

var port = 1337
app.listen(port, function() {
	console.log("Listening on port ", port);
	models.Page.sync({force: true})
	models.User.sync({force: true})
})
