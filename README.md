# Divine Improvements

## HTML/DOM
* Removed unnecessary container elements
* Moved script block to bottom of DOM (no longer blocking render)
* Using relative protocols instead of hardcoded https for video and poster URLs
* Reduced HTTP roundtrips by inlining stylesheets and javascripts

## Javascript
* Removed jQuery
* Replaced [videojs](http://www.videojs.com/)'s HTML5 implementation with a simplified player API
* Improved efficiency of selectors (using id selectors instead of class selectors)
* Single call to _gaq.push instead of multiple
* No longer adding/removing 'on' and 'off' to volume, we just set the whole classname

## Stylesheet
* Removed videojs.css
* Removed all unnecessary rules from style.css (contained entire vine.co site stylesheet)
* Removed web fonts, reducing payload by ~500KB
* Removed IE6 stylesheet (it didn't contain any matching rules)
* Reduced size of the images, pngcrush-ed and inlined as data URIs
* IE8 and below still uses external images files

## Flash
* Replaced [videojs](http://www.videojs.com/)'s flash implementation with [divine-player](https://github.com/cameronhunter/divine-player) (videojs was too feature-rich)

# TODO
* Add more sources to the video tag to increase browser support without falling back to flash (webm would be a great start)
* Add more codec info to the sources tag, it helps the browser check compatibility
* Is the poster image necessary?
* Is the favicon necessary?
