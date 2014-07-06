var parse = require('co-body')

exports.create = function(model, preprocessor){
	return function*(){
		try{
			var params = yield parse(this)
			yield model.create(params)
			return this.jsonResp(200);
		}catch(e){
			console.log(e)
			return this.jsonResp(500);
		}
	}
}

exports.get = function(model, preprocessor){
	return function*(){
		try{
			var params = this.params
			var ret = yield model.find(params.id)
			return this.jsonResp(200, {result: ret});
		}catch(e){
			console.log(e)
			return this.jsonResp(500);
		}
	}
}

exports.where = function(model, preprocessor){
	return function*(){
		try{
			var params = this.query

			var order = ""
			if(params.orderBy){
				params.sortOrder = (params.sortOrder && (params.sortOrder.toUpperCase() == "DESC")) ? "DESC" : "ASC"
				order = params.orderBy+" "+params.sortOrder
			}

			var scope = {where:{}, order: order, limit: params.limit ? params.limit : 20}
			var ret = yield model.findAll(scope)
			return this.jsonResp(200, {results: ret});
		}catch(e){
			console.log(e)
			return this.jsonResp(500);
		}
	}
}