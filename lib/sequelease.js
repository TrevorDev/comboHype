var parse = require('co-body')

exports.create = function*(model, preprocessor){
	try{
		var params = yield parse(this)
		console.log(params)
		yield model.create(params)
		return this.jsonResp(200);
	}catch(e){
		return this.jsonResp(500);
	}
}