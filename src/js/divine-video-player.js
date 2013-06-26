var DivineVideoPlayer = (function() {
  function player(el, options) {
    // TODO: Handle volume clicks before flash loads
    this.player = embed('/swf/divine-player.swf', el, {
      size: options.size,
      autoplay: el.hasAttribute('autoplay'),
      muted: el.hasAttribute('muted'),
      loop: el.hasAttribute('loop'),
      poster: el.hasAttribute('data-poster') ? absolute(el.getAttribute('data-poster')) : undefined,
      video: absolute(el.getElementsByTagName('source')[0].src) // TODO: Select the mp4 instead of just the first source
    });
  }

  player.fn = player.prototype;

  player.fn.play = function() {
    this.player.play();
  };

  player.fn.pause = function() {
    this.player.pause();
  };

  player.fn.paused = function() {
    return this.player.paused();
  };

  player.fn.mute = function() {
    this.player.mute();
  };

  player.fn.unmute = function() {
    this.player.unmute();
  };

  player.fn.muted = function() {
    return this.player.muted();
  };

  return player;

  function absolute(url) {
    return (url || '').indexOf('//') === 0 ? document.location.protocol + url : url;
  }
}());