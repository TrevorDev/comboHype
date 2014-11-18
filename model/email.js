var database = require('./../lib/database');
var sequelize = require('sequelize');
var si = database.getSequelizeInstance();

var STATUS = {
	SENT: "SENT",
	DELETED: "DELETED",
	NOT_SENT: "NOT_SENT"
}

var Email = si.define('Email', {
	text: sequelize.STRING(5096),
	to: sequelize.STRING(512),
	timeToSend: sequelize.DATE,
	status: {
		type: sequelize.ENUM,
		values: [STATUS.SENT, STATUS.DELETED, STATUS.NOT_SENT],
		defaultValue: STATUS.NOT_SENT
	}
}, {
	classMethods: {},
	instanceMethods: {}
})

Email.STATUS = STATUS
module.exports = Email;