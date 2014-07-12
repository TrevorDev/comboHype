

// playerType determines whether it's Flash or HTML5
// True : HTML5
// False : Flash
function getTopGameStream(playerType, callback) {
  $.ajax({
      url: "https://api.twitch.tv/kraken/games/top?hls=" + playerType,
      type: 'GET',
      contentType: 'application/json',
      dataType: 'jsonp',
  })
  .done(function( data ) {
      var topGame = data.top[0].game.name;
      console.log(topGame);
      getChannelFromGame(playerType, topGame, function(name) {
         callback(buildEmbedPlayer(false, playerType, name));
      });
  })
 .fail(function() {
    console.log( "Twitch api failed getting the most popular games" );
  });
}


function getChannelFromGame(playerType, game, callback) {
  $.ajax({
      url: "https://api.twitch.tv/kraken/streams?game=" + game + "&embeddable=true",
      type: 'GET',
      contentType: 'application/json',
      dataType: 'jsonp',
  })
  .done(function( data ) {
      var channelName = data.streams[0].channel.name;
      callback(channelName);
  })
 .fail(function() {
    console.log( "Twitch api failed getting the channel name for game: " + game );
  });
}

// get the channel name from a stream url
function getChannelName(streamUrl) {
  var splitUrl = streamUrl.split("/");
  return splitUrl[splitUrl.length - 1];
}

// playerType determines whether it's Flash or HTML5
// True : HTML5 (doesn't work? only works with safari?)
// False : Flash
function buildEmbedPlayer(autoplay, playerType, channel) {
  var twitchPlayer;
  if(playerType) {
    // HTML5 player
    twitchPlayer = "<iframe id='player' type='text/html' width='620' height='378' src='http://www.twitch.tv/" + channel + "/hls' frameborder='0'></iframe>"
  }
  else {
    // Flash player
    twitchPlayer = "<object wmode='opaque' type='application/x-shockwave-flash' height='378' width='620' id='live_embed_player_flash' data='http://www.twitch.tv/widgets/live_embed_player.swf?channel=hebo' bgcolor='#000000'><param name='allowFullScreen' value='true' /><param name='allowScriptAccess' value='always' /><param name='allowNetworking' value='all' /><param name='movie' value='http://www.twitch.tv/widgets/live_embed_player.swf' /><param name='flashvars' value='hostname=www.twitch.tv&channel=" + channel + "&auto_play=" + autoplay + "&start_volume=25' /></object>"
  }
  return twitchPlayer;
}
