var container = document.getElementById('container');
var videoSize = Math.max(container['offsetWidth'] || 0, container['clientWidth'] || 0, container['scrollWidth'] || 0);

try {
  var video = document.getElementById('video');
  var audio = document.getElementById('audio');
  var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));

  var VideoPlayer = DivinePlayer.getSupportedPlayer();

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
} catch(e) {
  // Catch any errors and fallback
  var fallback = document.getElementById('fallback');
  new StaticFallback(fallback, {size: videoSize});
}
