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
                    
                    var schedulePageOption = {
                      hostname: 'en.esl.tv',
                      port: 80,
                      path: schedulePage,
                      method: 'GET'
                    };
                    
                    
                    var req = request("http://en.esl.tv" + schedulePage, function(err2, response2, body2) {
                            var eventNode = select(topNode, 'div.vevent_inner');
                            
                            // parse event name
                            var nameElement = select(eventNode, 'div.schedule_list_title');
                            var eventTitle =  nameElement[0].children[0].raw;
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
                            setTimeout(function(){callback()}, 1000);
                    });
                    

                });
                console.log('done');
            }
        });

        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(body);

});
