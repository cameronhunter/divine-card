var HTML5VideoPlayer = (function() {
  function player(el, options, onReady) {
    this.el = el;

    if (options.autoplay != null) this.el.autoplay = options.autoplay;
    if (options.controls != null) this.el.controls = options.controls;
    if (options.loop != null) this.el.loop = options.loop;
    if (options.muted != null) this.el.muted = options.muted;

    if (onReady) onReady(this);
  }

  player.canPlay = function(el) {
    try {
      var sources = el.getElementsByTagName('source');
      for (var i=0, l = sources.length; i<l; i++) {
        var type = sources[i].getAttribute('type');
        var canPlayType = el.canPlayType(type);
        if (canPlayType) return true;
      }
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