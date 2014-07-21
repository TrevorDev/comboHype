//TODO MOVE ALL THE DATE STUFF HERE
var DateHelper = {}

DateHelper.stdTimezoneOffset = function(d) {
	var date = d ? d : new Date()
    var jan = new Date(date.getFullYear(), 0, 1);
    var jul = new Date(date.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

DateHelper.isDaylightTime = function(d){
	var date = d ? d : new Date()
	return date.getTimezoneOffset() < DateHelper.stdTimezoneOffset(date)
}
