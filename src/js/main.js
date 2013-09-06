var container = document.getElementById('container');
var videoSize = Math.max(container['offsetWidth'] || 0, container['clientWidth'] || 0, container['scrollWidth'] || 0);

try {
  var video = document.getElementById('video');
  var audio = document.getElementById('audio');
  var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));

  var VideoPlayer = getSupportedPlayer(HTML5Player, FlashPlayer);

  new VideoPlayer(video, {size: videoSize}, function(player) {
    audio.onclick = function() {
      if (player.muted()) {
        player.unmute();
        audio.className = 'on';
      } else {
        player.mute();
        audio.className = '';
      }
      return false;
    };

    container.onclick = function() {
      if (player.paused()) {
        player.play();
      } else {
        player.pause();
      }
      return false;
    };
  });

  function choosePlayer() {
    var players = Array.prototype.slice.call(arguments);
    for (var i=0, l=players.length; i<l; i++) {
      if (players[i].canPlay(video)) return players[i];
    }
  }
} catch(e) {
  // Catch any errors and fallback
  var fallback = document.getElementById('fallback');
  new StaticFallback(fallback, {size: videoSize});
}
