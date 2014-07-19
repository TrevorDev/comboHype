var database = require('./../lib/database');
var sequelize = require('sequelize');
var si = database.getSequelizeInstance();

var STATUS = {ACTIVE: "ACTIVE", PENDING_APPROVAL: "PENDING_APPROVAL"}

var Event = si.define('Event', 
	{
	  name: sequelize.STRING(512),
	  startTime: sequelize.DATE,
	  endTime: sequelize.DATE,
	  streamUrl: sequelize.STRING(2048),
	  gameName: sequelize.STRING(2048),
	  description: sequelize.STRING(2048),
	  status: {
	    type:   sequelize.ENUM,
	    values: [STATUS.ACTIVE, STATUS.PENDING_APPROVAL],
	    defaultValue: STATUS.PENDING_APPROVAL
	  }
	}, {
		classMethods: {
		},
		instanceMethods: {
		}
	}
)

Event.STATUS = STATUS
module.exports = Event;