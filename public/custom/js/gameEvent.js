function GameEvent(name, startTime, endTime, streamUrl, gameName, description){
	this.name = name
	this.startTime = new Date(startTime)
	this.endTime = new Date(endTime)
	this.streamUrl = streamUrl
	this.gameName = gameName
	this.description = description
}