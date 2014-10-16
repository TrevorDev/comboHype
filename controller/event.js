var Event = require('./../model/event');

exports.where = function * (params) {
	var scope = {}

	scope.status = Event.STATUS.ACTIVE;

	if (params.minDate) {
		scope.startTime = {
			gte: new Date(parseInt(params.minDate))
		}
	}

	if (params.gameName) {
		console.log(params.gameName)
		scope.gameName = {like: '%'+params.gameName+'%'}
	}

	if (params.maxDate) {
		scope.endTime = {
			lte: new Date(parseInt(params.maxDate))
		}
	}

	if (params.liveDuring) {
		scope.startTime = {
			lte: new Date(parseInt(params.liveDuring))
		}
		scope.endTime = {
			gte: new Date(parseInt(params.liveDuring))
		}
	}

	return scope
}

exports.create = function * (params) {
	var dup = yield Event.findAll({where: {name: params.name, startTime: params.startTime}, limit: 1});
	if(dup && dup.length >= 1){
		return {errorStatus: 409, msg: "duplicate event"}
	}
	return params;
}

exports.get = function * (params) {
	var scope = {}

	scope.status = Event.STATUS.ACTIVE

	return scope
}