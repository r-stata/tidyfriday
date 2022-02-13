var bowser = require('bowser').browser;

if (bowser.android || bowser.iphone || bowser.ipad || bowser.touchpad) {
    var hash = window.location.hash;
    window.location.href = '/geojson/mobile.html' + hash;
}

if (bowser.msie && parseFloat(bowser.version) < 10) {
    window.location.href = '/geojson/unsupported.html';
}
