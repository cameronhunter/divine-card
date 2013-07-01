# Divine Improvements

## HTML/DOM
* Removed the favicon and title tag
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

## Misc
* Added static fallback for browers without flash and/or javascript

# Network Waterfalls

## Current Vine card implementation
```
15 requests | 1.3MB transferred | 7.57s (onload: 7.57s, DOMContentLoaded: 2.91s)
```
![Current Vine card implementation](https://dl.dropboxusercontent.com/u/161487/divine-card/vine-waterfall.png)

## Divine card implementation
```
6 requests | 909KB transferred | 2.85s (onload: 2.85s, DOMContentLoaded: 601ms)
```
![Divine card implementation](https://dl.dropboxusercontent.com/u/161487/divine-card/divine-waterfall.png)

# Recommended Improvements
* Host cards on a cookie-less domain to minimise request size
* Host videos on a CDN rather than streaming from S3 (could use CloudFront)
* Add more sources to the video tag to increase browser support without falling back to flash. WebM looks like the best option (see Mozilla's [supported media formats](https://developer.mozilla.org/en-US/docs/HTML/Supported_media_formats#Browser_compatibility) page)

# Tested Browsers
* Chrome (27 & 29)
* Firefox (21)
* Safari (6.0.5)
* IE6 – 10

# TODO
* Add test coverage for javascript code
* Add more codec info to the sources tag, it helps the browser check compatibility
* Is the poster image necessary?
