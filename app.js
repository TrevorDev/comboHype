var config = require('./lib/config')
var database = require('./lib/database')
var sequelease = require('./lib/sequelease')
var logger = require('koa-logger')
var router = require('koa-router')
var serve = require('koa-static')
var session = require('koa-session')
var views = require('co-views')
var parse = require('co-body')
var jsonResp = require('koa-json-response')
var koa = require('koa')
var swig = require('swig')
var https = require('https')
var http = require('http')
var request = require('request');
var fs = require('fs')
var cors = require('koa-cors')
var app = koa()

//Add database
si = database.getSequelizeInstance()
si.sync()

var eventCtrl = require('./controller/event')
var eventModel = require('./model/event')

//REMOVE IN PRODUCTION??
swig.setDefaults(config.templateOptions)

//ROUTES
app.keys = [config.sessionSecret]
app.use(session())
app.use(jsonResp())
app.use(cors())
app.use(router(app))

//PAGE ROUTES
app.get('/', defaultPageLoad('index'))
app.get('/about', defaultPageLoad('about'))
app.get(/\/public\/*/, serve('.'))

//API ROUTES
app.post('/api/event', sequelease.create(eventModel))
app.get('/api/event/search', sequelease.where(eventModel, eventCtrl.where))
app.get('/api/event/:id', sequelease.get(eventModel, eventCtrl.get))


//PAGE HANDLERS
function defaultPageLoad(pageName, requiresLogin) {
	return function *(){
		/*if(requiresLogin===true && !sessionHelper.isLoggedIn(this.session)){
			this.redirect('/login')
			return
		}*/

		var temp = {};
		this.body = yield render(pageName, temp)
	}
}

function render(page, template){
	return views(__dirname + '/view', config.templateOptions)(page, template)
}

var server = http.createServer(app.callback())

//SOCKETIO
var bonusUsers = 627
function randomizeBonusUsers() {
	si.query('SELECT 1')
	setTimeout(randomizeBonusUsers, 3000000) //50 min
	bonusUsers+=5;
}
randomizeBonusUsers()

var userCount = 0;
var io = require('socket.io').listen(server);
io.on('connection', function(socket){
  userCount++;
  io.emit('updateUserCount', {count: userCount + bonusUsers});
  socket.on('disconnect', function(){
  	userCount--;
  	io.emit('updateUserCount', {count: userCount + bonusUsers});
  });
});

server.listen(config.appPort);
console.log('Started ----------------------------------------------'+config.appPort)
