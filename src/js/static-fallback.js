var StaticFallback = (function() {
  function fallback(el, options) {
    el.style.width = options.size + 'px';
    el.style.height = options.size + 'px';
    el.style.display = 'block';
  }

  return fallback;
}());