var co = require('co');
var Promise = require('bluebird');
var select = require('soupselect').select,
    htmlparser = require("htmlparser2"),
    request = require("co-request"),
    sys = require('sys')

var schedUrl = "http://en.esl.tv";
co(function *(){
    var resp = yield request(schedUrl+"/schedule")
    var dom = yield getDom(resp.body);
    var eventsSummary = select(dom, 'dt.vevent');
    for(var i = 0;i<eventsSummary.length;i++){
        try{
             var eventObject = {}
            var topNode = eventsSummary[i]
            var eventNode = select(topNode, 'div.vevent_inner');


            var nameElement = select(eventNode, 'div.schedule_list_title');
            eventObject.name =  nameElement[0].children[0].data;
            
            var gameElement = select(eventNode, 'div.schedule_list_game');
            eventObject.gameName =  gameElement[0].children[0].data;

            var dateTimeElement = select(eventNode, 'span.dateLong');
            eventObject.startTime =  dateTimeElement[0].children[0].data;

            var schedulePage = topNode.children[1].attribs.href;
            var resp = yield request(schedUrl + schedulePage)
            var dom = yield getDom(resp.body);
            var channelElement = select(dom, 'div.schedule_detail_channel');
            var eventLink =  channelElement[0].children[1].attribs.href;
            {
                var resp = yield request(eventLink)
                var dom = yield getDom(resp.body);
                var twitchElement = select(dom, '#live_embed_player_flash');
                eventObject.streamUrl =  twitchElement[0].attribs.data;
                eventObject.channelName = eventObject.streamUrl.substring(eventObject.streamUrl.indexOf("channel=") + "channel=".length);
            }
            var gameEvent = new GameEvent(eventObject.name, eventObject.startTime, null, "http://www.twitch.tv/"+ eventObject.channelName, eventObject.gameName, "")
            var addResp = yield request({
                uri: 'http://combohype.com/api/event',
                method: 'POST',
                form: gameEvent
              });
            console.log(gameEvent)
        }catch(e){
            console.log("bad parse"+e)
        }
    }
})()

var getDom = function(html){
    return new Promise(function(resolve, reject) {
        var handler = new htmlparser.DomHandler(function (error, dom) {
            if(error){
                reject(error)
            }else{
                resolve(dom)
            }
        });
        var parser = new htmlparser.Parser(handler);
        parser.write(html);
        parser.done();
      })
}

function GameEvent(name, startTime, endTime, streamUrl, gameName, description){
    this.name = name
    this.startTime = new Date(startTime)
    this.endTime = new Date(endTime)
    this.streamUrl = streamUrl
    this.gameName = gameName
    this.description = description
}