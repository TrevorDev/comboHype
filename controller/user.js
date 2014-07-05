var User = require('./../model/user');

exports.getUsers = function *() {
	var users = yield User.findAll({})
	return this.jsonResp(200,{users: users});
}