var Event = require('./../model/event');

exports.where = function *(params) {
	var scope = {}

	scope.status = Event.STATUS.ACTIVE;

	if(params.minDate){
		scope.startTime = {gte: new Date(parseInt(params.minDate))}
	}

	if(params.maxDate){
		scope.endTime = {lte: new Date(parseInt(params.maxDate))}
	}

	if(params.liveDuring){
		scope.startTime = {lte: new Date(parseInt(params.liveDuring))}
		scope.endTime = {gte: new Date(parseInt(params.liveDuring))}
	}

	return scope
}

exports.get = function *(params) {
	var scope = {}

	scope.status = Event.STATUS.ACTIVE;

	return scope
}