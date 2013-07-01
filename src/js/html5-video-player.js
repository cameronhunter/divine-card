var HTML5VideoPlayer = (function() {
  function player(el, options, onReady) {
    if (onReady) onReady(this);
    this.el = el;
    if (el.hasAttribute('data-poster')) {
      this.el.poster = el.getAttribute('data-poster');
    }
  }

  player.canPlay = function(el) {
    try {
      var support = [];
      var sources = el.getElementsByTagName('source');
      for (var i=0, l = sources.length; i<l; i++) {
        var type = sources[i].getAttribute('type');
        var canPlayType = el.canPlayType(type);
        if (canPlayType) support.push([type, canPlayType]);
      }
      return support.length;
    } catch(e) {/* IGNORE */}
    return false;
  };

  player.fn = player.prototype;

  player.fn.play = function() {
    this.el.play();
  };

  player.fn.pause = function() {
    this.el.pause();
  };

  player.fn.paused = function() {
    return this.el.paused;
  };

  player.fn.mute = function() {
    this.el.muted = true;
  };

  player.fn.unmute = function() {
    this.el.muted = false;
  };

  player.fn.muted = function() {
    return this.el.muted;
  };

  return player;
}());