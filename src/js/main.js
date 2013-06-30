var video = document.getElementById('video');
var container = document.getElementById('container');
var videoSize = Math.max(container['offsetWidth'] || 0, container['clientWidth'] || 0, container['scrollWidth'] || 0);

try {
  var audio = document.getElementById('audio');
  var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));

  var AllVideoPlayers = [HTML5VideoPlayer, DivineVideoPlayer, StaticFallbackPlayer];

  var SupportedVideoPlayers = [];
  for (var i in AllVideoPlayers) if (AllVideoPlayers[i].canPlay(video)) {
    SupportedVideoPlayers.push(AllVideoPlayers[i]);
  }

  var VideoPlayer = SupportedVideoPlayers[0];

  var player = new VideoPlayer(video, {
    size: videoSize
  });

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
} catch(e) {
  // Catch any errors and fallback
  new StaticFallbackPlayer(video, {size: videoSize});
}
