var StaticFallbackPlayer = (function() {
  function player() {
    document.getElementById('fallback').style.display = 'block';
  }

  player.canPlay = function() {
    return true;
  };

  player.fn = player.prototype;

  player.fn.play = noop;
  player.fn.pause = noop;
  player.fn.paused = noop;
  player.fn.mute = noop;
  player.fn.unmute = noop;
  player.fn.muted = noop;

  return player;

  function noop() {}
}());