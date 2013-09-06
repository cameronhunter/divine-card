var DivineVideoPlayer = (function(global) {

  // TODO: Select the mp4 instead of just the first source
  function player(el, options, onReady) {

    var self = this;
    if (onReady) {
      global['onReady'] = function() { onReady(self); };
    }

    this.swf = embed(options.swf, el, {
      size: options.size,
      autoplay: override(hasAttribute(el, 'autoplay'), options.autoplay),
      muted: override(hasAttribute(el, 'muted'), options.muted),
      loop: override(hasAttribute(el, 'loop'), options.loop),
      poster: hasAttribute(el, 'poster') ? absolute(el.getAttribute('poster')) : undefined,
      video: absolute(el.getElementsByTagName('source')[0].src),
      onReady: 'onReady'
    });
  }

  player.canPlay = function() {
    try {
      var flash = window.ActiveXObject ?
                    new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version') :
                    navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin.description;
      var match = /(\d+)[,.]\d+/.exec(flash);
      var majorVersion = parseInt(match[1], 10);
      return majorVersion >= 9;
    } catch (e) {/* Ignore */}
    return false;
  };

  player.fn = player.prototype;

  player.fn.play = function() {
    this.swf.divinePlay();
  };

  player.fn.pause = function() {
    this.swf.divinePause();
  };

  player.fn.paused = function() {
    return this.swf.divinePaused();
  };

  player.fn.mute = function() {
    this.swf.divineMute();
  };

  player.fn.unmute = function() {
    this.swf.divineUnmute();
  };

  player.fn.muted = function() {
    return this.swf.divineMuted();
  };

  return player;

  function absolute(url) {
    return (url || '').indexOf('//') === 0 ? document.location.protocol + url : url;
  }

  function attrs(options) {
    return transform(options, function(k, v) {
      return k + '="' + v + '"';
    }, ' ');
  }

  function params(options) {
    return transform(options, function(k, v) {
      return '<param ' + attrs({name: k, value: v}) + ' />';
    }, '\n');
  }

  function flashvars(options) {
    return transform(options, function(k, v) {
      return k + '=' + encodeURIComponent(v);
    }, '&');
  }

  function transform(options, fn, joinWith) {
    var ret = [];
    for (var key in options) if (options.hasOwnProperty(key)) {
      ret.push(fn(key, options[key]));
    }
    return ret.join(joinWith);
  }

 function embed(swf, el, options) {
    var attributes = attrs({
      id: el.id,
      data: swf,
      width: options.size,
      height: options.size,
      type: 'application/x-shockwave-flash'
    });

    var parameters = params({
      movie: swf,
      allowScriptAccess: 'always',
      allowNetworking: 'all',
      wmode: 'opaque',
      quality: 'high',
      bgcolor: '#000000',
      flashvars: flashvars(options)
    });

    el.outerHTML = '<object ' + attributes + '>' + parameters + '</object>';

    return document.getElementById(el.id);
  }

  // IE7 and below doesn't support hasAttribute
  function hasAttribute(el, attribute) {
    return el.getAttribute(attribute) !== undefined;
  }

  function override(original, custom) {
    return custom == null ? original : custom;
  }
}(this));