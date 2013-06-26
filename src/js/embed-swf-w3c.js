var embed = (function() {
  function param(name, value) {
    var el = document.createElement('param');
    el.setAttribute('name', name);
    el.setAttribute('value', value);
    return el;
  }

  function flashvars(options) {
    var ret = [];
    for (var key in options) if (options.hasOwnProperty(key)) {
      ret.push(key + '=' + encodeURIComponent(options[key]));
    }
    return ret.join('&');
  }

  // FIXME: Dynamic <object> creation doesn't work in IE8 or below. See http://code.google.com/p/swfobject/source/browse/trunk/swfobject/src/swfobject.js
  // TODO: Add static fallback
  return function(swf, el, options) {
    var object = document.createElement('object');
    object.setAttribute('width', options.size);
    object.setAttribute('height', options.size);

    // object.type = 'application/x-shockwave-flash'; // Causes "The specified module could not be found." in IE8
    object.setAttribute('type', 'application/x-shockwave-flash');

    // // Firefox uses the `data` attribute above, IE/Safari uses the `movie` attribute
    object.setAttribute('data', swf);
    object.appendChild(param('movie', swf));

    object.appendChild(param('allowScriptAccess', 'always'));
    object.appendChild(param('allowNetworking', 'all'));
    object.appendChild(param('wmode', 'opaque'));
    object.appendChild(param('quality', 'high'));
    object.appendChild(param('flashvars', flashvars(options)));

    el.parentNode.replaceChild(object, el);

    return object;
  };
}());