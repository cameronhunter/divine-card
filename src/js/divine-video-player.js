var DivineVideoPlayer = (function() {
  function player(el, options) {
    // TODO: Handle volume clicks before flash loads
    this.swf = embed('/swf/divine-player.swf', el, {
      size: options.size,
      autoplay: el.hasAttribute('autoplay'),
      muted: el.hasAttribute('muted'),
      loop: el.hasAttribute('loop'),
      poster: el.hasAttribute('data-poster') ? absolute(el.getAttribute('data-poster')) : undefined,
      video: absolute(el.getElementsByTagName('source')[0].src) // TODO: Select the mp4 instead of just the first source
    });
  }

  player.canPlay = function() {
    try {
      var full = window.ActiveXObject ?
                  new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version") :
                  navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin.description;

      var match = /(\d+)[,.]\d+/.exec(full);
      if (match.length > 1) {
        var majorVersion = parseInt(match[1], 10);
        return majorVersion >= 9;
      }
    } catch (e) {
      /* Ignore */
    }
    return false;
  };

  player.fn = player.prototype;

  player.fn.play = function() {
    this.swf.play();
  };

  player.fn.pause = function() {
    this.swf.pause();
  };

  player.fn.paused = function() {
    return this.swf.paused();
  };

  player.fn.mute = function() {
    this.swf.mute();
  };

  player.fn.unmute = function() {
    this.swf.unmute();
  };

  player.fn.muted = function() {
    return this.swf.muted();
  };

  return player;

  function absolute(url) {
    return (url || '').indexOf('//') === 0 ? document.location.protocol + url : url;
  }
}());