var sequelize = require("sequelize");
var config  = require('./config');
var co = require("co")
var emailer = require('../lib/emailer')
var si = new sequelize(config.database.database, config.database.user, config.database.password, {
	//logging: false,
	host: config.database.host
})

exports.getSequelizeInstance = function(){
	return si;
}



require("../model/event");
var email = require("../model/email");


function heartBeat() {
	var x= co(function*(){
		//yield email.create({status: email.STATUS.NOT_SENT, to: "trevorjbaron@gmail.com", text: "yes", timeToSend: new Date()})
		var emails = yield email.findAll({where:{status: email.STATUS.NOT_SENT, timeToSend: {lt: new Date()}}})
		for(var i = 0;i<emails.length;i++){
			var c = emails[i]
			emailer.send(c.to, "comboHype event starting", c.text)
			c.status = email.STATUS.SENT;
			yield c.save();
		}
		console.log(emails.length)
		setTimeout(heartBeat, 300000) //5 min
	}).catch(function(err){
		console.log(err)
	});
}



heartBeat()