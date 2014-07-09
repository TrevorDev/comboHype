var database = require('./../lib/database');
var sequelize = require('sequelize');
var si = database.getSequelizeInstance();

var Event = si.define('Event', 
	{
	  name: sequelize.STRING(512),
	  startTime: sequelize.DATE,
	  endTime: sequelize.DATE,
	  streamUrl: sequelize.STRING(2048),
	  gameName: sequelize.STRING(2048),
	  description: sequelize.STRING(2048)
	}, {
		classMethods: {

		},
		instanceMethods: {

		}
	}
)

module.exports = Event;