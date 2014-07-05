var database = require('./../lib/database');
var sequelize = require('sequelize');
var si = database.getSequelizeInstance();

var User = si.define('User', 
	{
	  email: {
	  	type:sequelize.STRING,
	  	validate: {
	  		isEmail: true
	  	},
	  	unique: true
	  },
	  password: sequelize.STRING
	}, {
		classMethods: {

		},
		instanceMethods: {

		}
	}
)

module.exports = User;