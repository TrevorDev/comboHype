var sequelize = require("sequelize");
var config  = require('./config');

var si = new sequelize(config.database.database, config.database.user, config.database.password, {
	//logging: false,
	host: config.database.host
})

exports.getSequelizeInstance = function(){
	return si;
}

function heartBeat() {
	si.query('SELECT 1')
	setTimeout(heartBeat, 300000) //5 min
}

heartBeat()

require("../model/user");