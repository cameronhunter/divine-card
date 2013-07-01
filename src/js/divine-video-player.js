var DivineVideoPlayer = (function(global) {
  function player(el, options, onReady) {

    var self = this;
    if (onReady) {
      global['onReady'] = function() { onReady(self); };
    }

    this.swf = embed('/swf/divine-player.swf', el, {
      size: options.size,
      autoplay: hasAttribute(el, 'autoplay'),
      muted: hasAttribute(el, 'muted'),
      loop: hasAttribute(el, 'loop'),
      poster: hasAttribute(el, 'data-poster') ? absolute(el.getAttribute('data-poster')) : undefined,
      video: absolute(el.getElementsByTagName('source')[0].src), // TODO: Select the mp4 instead of just the first source
      onReady: 'onReady'
    });
  }

  player.canPlay = function() {
    try {
      var full = window.ActiveXObject ?
                  new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version') :
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
}(this));