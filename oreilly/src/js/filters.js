!function(){"use strict";angular.module("websiteApp").filter("interpolate",["version",function(n){return function(e){return String(e).replace(/\%VERSION\%/gm,n)}}])}();