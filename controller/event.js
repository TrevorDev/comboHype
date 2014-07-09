var Event = require('./../model/event');

exports.where = function *(params) {
	var scope = {}

	if(params.minDate){
		scope.startTime = {gte: new Date(params.minDate)}
	}

	if(params.maxDate){
		console.log(params.maxDate);
		console.log(new Date(params.maxDate))
		var x = new Date();
		console.log(x)
		console.log(x.getTime())
		scope.endTime = {lte: new Date(parseInt(params.maxDate))}
	}

	return scope
}