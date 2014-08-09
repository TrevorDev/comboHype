var select = require('soupselect').select,
    htmlparser = require("htmlparser"),
    request = require("request"),
    sys = require('sys'),
    util = require('util'),
    async = require('async');

var options = {
  hostname: 'en.esl.tv',
  port: 80,
  path: '/schedule/',
  method: 'GET'
};

var timeBetweenRequests = 2000;
var timeWait = 0;

request("http://en.esl.tv/schedule/", function(error, response, body) {

        var handler = new htmlparser.DefaultHandler(function(err, dom) {
            if (err) {
                sys.debug("Error: " + err);
            } else {
                var eventsSummary = select(dom, 'dt.vevent');
                
                console.log("Events from ESL");
                async.forEach(eventsSummary, function(topNode, callback) {
                    var schedulePage = topNode.children[1].attribs.href;
                    console.log("Schedule Page: " + schedulePage);
                    
                    var eventInfo = {};
                    
                    timeWait = timeWait + timeBetweenRequests;
                    setTimeout(function(){
                        var req = request("http://en.esl.tv" + schedulePage, function(err2, response2, body2) {
                            var handler2 = new htmlparser.DefaultHandler(function(err3, dom2) {
                                var eventNode = select(topNode, 'div.vevent_inner');
                                
                                // parse event name
                                var nameElement = select(eventNode, 'div.schedule_list_title');
                                var eventTitle =  nameElement[0].children[0].raw;
                                eventInfo.name = eventTitle;
                                console.log("Event Name: " + eventTitle);
                                
                                // parse game name
                                var gameElement = select(eventNode, 'div.schedule_list_game');
                                var eventGame =  gameElement[0].children[0].raw;
                                console.log("Game Name: " + eventGame);
                                
                                // parse date time
                                var dateTimeElement = select(eventNode, 'span.dateLong');
                                var eventDateTime =  dateTimeElement[0].children[0].raw;
                                console.log("Date Time: " + eventDateTime);
                                
                                
                                //console.log("- " + util.inspect(nameElement, false, null) + "\n");
                                console.log("\n");
                                
                                var channelElement = select(dom2, 'div.schedule_detail_channel');
                                var eventLink =  channelElement[0].children[1].attribs.href;
                                
                                
                                //console.log("- " + util.inspect(nameElement, false, null) + "\n");
                                console.log("\n");
                                
                                var req = request(eventLink, function(err3, response3, body3) {
                                    var handler3 = new htmlparser.DefaultHandler(function(err4, dom3) {
                                        console.log("Event Link: " + eventLink);
                                        var twitchElement = select(dom3, '#live_embed_player_flash');
                                        console.log("- " + util.inspect(twitchElement, false, null) + "\n");
                                        var twitchLink =  twitchElement[0].attribs.data;
                                        
                                        console.log("twitch Link: " + twitchLink);
                                        
                                        var channelName = twitchLink.substring(twitchLink.indexOf("channel=") + "channel=".length); 
                                        
                                        console.log("Channel name: " + channelName);
                                        callback();
                                    });
                                    var parser3 = new htmlparser.Parser(handler3);
                                    parser3.parseComplete(body3);
                                });
                            });
                            var parser2 = new htmlparser.Parser(handler2);
                            parser2.parseComplete(body2);
                        });
                    }, timeWait);

                });
                console.log('done');
            }
        });
        
        

        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(body);

});

/*

var req = request("http://en.esl.tv" + "/schedule/9611/", function(err2, response2, body2) {
        var handler2 = new htmlparser.DefaultHandler(function(err3, dom2) {
            //console.log("- " + util.inspect(dom2, false, null) + "\n");
            
            var channelElement = select(dom2, 'div.schedule_detail_channel');
            var eventLink =  channelElement[0].children[1].attribs.href;
            console.log("Event Link: " + eventLink);
            
            //console.log("- " + util.inspect(nameElement, false, null) + "\n");
            console.log("\n");
            
            var req = request("http://en.esl.tv/channel/omgimsue/", function(err3, response3, body3) {
                var handler3 = new htmlparser.DefaultHandler(function(err4, dom3) {
                    var twitchElement = select(dom3, '#live_embed_player_flash');
                    var twitchLink =  twitchElement[0].attribs.data;
                    
                    console.log("Event Link: " + twitchLink);
                    
                    var channelName = twitchLink.substring(twitchLink.indexOf("channel=") + "channel=".length); 
                    
                    console.log("Channel name: " + channelName);
                    
                });
                var parser3 = new htmlparser.Parser(handler3);
                parser3.parseComplete(body3);
            });

            
            
        });
        var parser2 = new htmlparser.Parser(handler2);
        parser2.parseComplete(body2);
});
*/

