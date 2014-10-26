var parse = require('co-body')

exports.create = function(model, preprocessor) {
	return function * () {
		try {
			var params = yield parse(this)

			if (preprocessor) {
				whereScope = yield preprocessor(params);
				if(whereScope.errorStatus){
					return this.jsonResp(whereScope.errorStatus, {msg: whereScope.msg});
				}
			}

			yield model.create(params)
			return this.jsonResp(200);
		} catch (e) {
			console.log(e)
			return this.jsonResp(500);
		}
	}
}

exports.get = function(model, preprocessor) {
	return function * () {
		try {
			var params = this.params

			var whereScope = {}

			if (preprocessor) {
				whereScope = yield preprocessor(params);
			}

			whereScope.id = params.id

			var scope = {
				where: whereScope
			}
			var ret = yield model.find(scope)
			return this.jsonResp(200, {
				result: ret
			});
		} catch (e) {
			console.log(e)
			return this.jsonResp(500);
		}
	}
}

exports.where = function(model, preprocessor) {
	return function * () {
		try {
			var params = this.query

			var whereScope = {};

			if (preprocessor) {
				whereScope = yield preprocessor(params);
			}


			var order = ""
			if (params.orderBy) {
				params.sortOrder = (params.sortOrder && (params.sortOrder.toUpperCase() == "DESC")) ? "DESC" : "ASC"
				order = params.orderBy + " " + params.sortOrder
			}

			var scope = {
				where: whereScope,
				order: order,
				limit: params.limit ? params.limit : 20
			}
			var ret = yield model.findAll(scope)
			return this.jsonResp(200, {
				results: ret
			});
		} catch (e) {
			console.log(e)
			return this.jsonResp(500);
		}
	}
}

exports.update = function(model, preprocessor) {
	return function * () {
		try {
			console.log("blah")
			var params = yield parse(this)
			console.log(params)
			console.log(this.params["id"])
			scope = {id: this.params["id"]}
			var ret = yield model.find(this.params["id"])
			console.log(ret)
			for(var i in params){
				ret[i] = params[i]
			}
			yield ret.save()
			// if (preprocessor) {
			// 	whereScope = yield preprocessor(params);
			// 	if(whereScope.errorStatus){
			// 		return this.jsonResp(whereScope.errorStatus, {msg: whereScope.msg});
			// 	}
			// }

			// yield model.create(params)
			return this.jsonResp(200);
		} catch (e) {
			console.log(e)
			return this.jsonResp(500);
		}
	}
}