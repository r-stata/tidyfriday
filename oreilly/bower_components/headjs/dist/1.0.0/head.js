!function(r,o){"use strict";var t=r.document,e=r.navigator,n=r.location,a=t.documentElement,s=[],i={screens:[240,320,480,640,768,800,1024,1280,1440,1680,1920],screensCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!1},browsers:[{ie:{min:6,max:11}}],browserCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!0},html5:!0,page:"-page",section:"-section",head:"head"};if(r.head_conf)for(var c in r.head_conf)r.head_conf[c]!==o&&(i[c]=r.head_conf[c]);function u(e){s[s.length]=e}function l(e){e=new RegExp(" ?\\b"+e+"\\b");a.className=a.className.replace(e,"")}function d(e,t){for(var n=0,r=e.length;n<r;n++)t.call(e,e[n],n)}var f=r[i.head]=function(){f.ready.apply(null,arguments)},e=(f.feature=function(e,t,n){return e?(u(((t="[object Function]"===Object.prototype.toString.call(t)?t.call():t)?"":"no-")+e),f[e]=!!t,n||(l("no-"+e),l(e),f.feature())):(a.className+=" "+s.join(" "),s=[]),f},f.feature("js",!0),e.userAgent.toLowerCase()),h=/mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(e),p=(f.feature("mobile",h,!0),f.feature("desktop",!h,!0),(e=/(chrome|firefox)[ \/]([\w.]+)/.exec(e)||/(iphone|ipad|ipod)(?:.*version)?[ \/]([\w.]+)/.exec(e)||/(android)(?:.*version)?[ \/]([\w.]+)/.exec(e)||/(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||/(trident).+rv:(\w.)+/.exec(e)||[])[1]),m=parseFloat(e[2]);switch(p){case"msie":case"trident":p="ie",m=t.documentMode||m;break;case"firefox":p="ff";break;case"ipod":case"ipad":case"iphone":p="ios";break;case"webkit":p="safari"}f.browser={name:p,version:m},f.browser[p]=!0;for(var g=0,b=i.browsers.length;g<b;g++)for(var v in i.browsers[g])if(p===v){u(v);for(var y=i.browsers[g][v].min,w=i.browsers[g][v].max,x=y;x<=w;x++)x<m?(i.browserCss.gt&&u("gt-"+v+x),i.browserCss.gte&&u("gte-"+v+x)):m<x?(i.browserCss.lt&&u("lt-"+v+x),i.browserCss.lte&&u("lte-"+v+x)):m===x&&(i.browserCss.lte&&u("lte-"+v+x),i.browserCss.eq&&u("eq-"+v+x),i.browserCss.gte&&u("gte-"+v+x))}else u("no-"+v);function C(){a.className=a.className.replace(/ (w-|eq-|gt-|gte-|lt-|lte-|portrait|no-portrait|landscape|no-landscape)\d+/g,"");var t=r.innerWidth||a.clientWidth,e=r.outerWidth||r.screen.width,e=(f.screen.innerWidth=t,f.screen.outerWidth=e,u("w-"+t),d(i.screens,function(e){e<t?(i.screensCss.gt&&u("gt-"+e),i.screensCss.gte&&u("gte-"+e)):t<e?(i.screensCss.lt&&u("lt-"+e),i.screensCss.lte&&u("lte-"+e)):t===e&&(i.screensCss.lte&&u("lte-"+e),i.screensCss.eq&&u("e-q"+e),i.screensCss.gte&&u("gte-"+e))}),r.innerHeight||a.clientHeight),n=r.outerHeight||r.screen.height;f.screen.innerHeight=e,f.screen.outerHeight=n,f.feature("portrait",t<e),f.feature("landscape",e<t)}u(p),u(p+parseInt(m,10)),i.html5&&"ie"===p&&m<9&&d("abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|progress|section|summary|time|video".split("|"),function(e){t.createElement(e)}),d(n.pathname.split("/"),function(e,t){var n;2<this.length&&this[t+1]!==o?t&&u(this.slice(t,t+1).join("-").toLowerCase()+i.section):(0<(n=(e=e||"index").indexOf("."))&&(e=e.substring(0,n)),a.id=e.toLowerCase()+i.page,t||u("root"+i.section))}),f.screen={height:r.screen.height,width:r.screen.width},C();var T=0;function k(){r.clearTimeout(T),T=r.setTimeout(C,50)}r.addEventListener?r.addEventListener("resize",k,!1):r.attachEvent("onresize",k)}(window),function(e,o){"use strict";var t=e.document.createElement("i"),a=t.style,n=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),s="Webkit Moz O ms Khtml".split(" "),r=e.head_conf&&e.head_conf.head||"head",i=e[r];function c(e){var t,n=e.charAt(0).toUpperCase()+e.substr(1),r=(e+" "+s.join(n+" ")+n).split(" ");for(t in r)if(a[r[t]]!==o)return!!1;return!1}var u,l={gradient:function(){var e="background-image:";return a.cssText=(e+n.join("gradient(linear,left top,right bottom,from(#9f9),to(#fff));"+e)+n.join("linear-gradient(left top,#eee,#fff);"+e)).slice(0,-e.length),!!a.backgroundImage},rgba:function(){return a.cssText="background-color:rgba(0,0,0,0.5)",!!a.backgroundColor},opacity:function(){return""===t.style.opacity},textshadow:function(){return""===a.textShadow},multiplebgs:function(){a.cssText="background:url(https://),url(https://),red url(https://)";var e=(a.background||"").match(/url/g);return"[object Array]"===Object.prototype.toString.call(e)&&3===e.length},boxshadow:function(){return c("boxShadow")},borderimage:function(){return c("borderImage")},borderradius:function(){return c("borderRadius")},cssreflections:function(){return c("boxReflect")},csstransforms:function(){return c("transform")},csstransitions:function(){return c("transition")},touch:function(){return"ontouchstart"in e},retina:function(){return 1<e.devicePixelRatio},fontface:function(){var e=i.browser.name,t=i.browser.version;switch(e){case"ie":return 9<=t;case"chrome":return 13<=t;case"ff":return 6<=t;case"ios":return 5<=t;case"android":return!1;case"webkit":return 5.1<=t;case"opera":return 10<=t;default:return!1}}};for(u in l)l[u]&&i.feature(u,l[u].call(),!0);i.feature()}(window),function(s,r){"use strict";var o,i=s.document,a=[],c={},u={},e="async"in i.createElement("script")||"MozAppearance"in i.documentElement.style||s.opera,t=s.head_conf&&s.head_conf.head||"head",l=s[t]=s[t]||function(){l.ready.apply(null,arguments)},n=1,d=2,f=3,h=4;function p(){}function m(e,t){if(e)for(var n=0,r=(e="object"==typeof e?[].slice.call(e):e).length;n<r;n++)t.call(e,e[n],n)}function g(e,t){var n=Object.prototype.toString.call(t).slice(8,-1);return t!==r&&null!==t&&n===e}function b(e){return g("Function",e)}function v(e){return g("Array",e)}function y(e){(e=e||p)._done||(e(),e._done=1)}function w(e){var t,n={};if("object"==typeof e)for(var r in e)e[r]&&(n={name:r,url:e[r]});else n={name:-1!==(o=(t=(t=(t=e).split("/"))[t.length-1]).indexOf("?"))?t.substring(0,o):t,url:e};var o=u[n.name];return o&&o.url===n.url?o:u[n.name]=n}function x(e){for(var t in e=e||u)if(e.hasOwnProperty(t)&&e[t].state!==h)return;return 1}function C(t){t.state===r&&(t.state=n,t.onpreload=[],k({url:t.url,type:"cache"},function(){var e;(e=t).state=d,m(e.onpreload,function(e){e.call()})}))}function T(e,t){t=t||p,e.state===h?t():e.state===f?l.ready(e.name,t):e.state===n?e.onpreload.push(function(){T(e,t)}):(e.state=f,k(e,function(){e.state=h,t(),m(c[e.name],function(e){y(e)}),o&&x()&&m(c.ALL,function(e){y(e)})}))}function k(r,t){function e(e){e=e||s.event,a.onload=a.onreadystatechange=a.onerror=null,t()}function o(e){("load"===(e=e||s.event).type||/loaded|complete/.test(a.readyState)&&(!i.documentMode||i.documentMode<9))&&(s.clearTimeout(r.errorTimeout),s.clearTimeout(r.cssTimeout),a.onload=a.onreadystatechange=a.onerror=null,t())}var a;t=t||p;"css"===(n=(n=(n=r.url)||"").split("?")[0].split("."))[n.length-1].toLowerCase()?((a=i.createElement("link")).type="text/"+(r.type||"css"),a.rel="stylesheet",a.href=r.url,r.cssRetries=0,r.cssTimeout=s.setTimeout(function e(){if(r.state!==h&&r.cssRetries<=20){for(var t=0,n=i.styleSheets.length;t<n;t++)if(i.styleSheets[t].href===a.href)return void o({type:"load"});r.cssRetries++,r.cssTimeout=s.setTimeout(e,250)}},500)):((a=i.createElement("script")).type="text/"+(r.type||"javascript"),a.src=r.url),a.onload=a.onreadystatechange=o,a.onerror=e,a.async=!1,a.defer=!1,r.errorTimeout=s.setTimeout(function(){e({type:"timeout"})},7e3);var n=i.head||i.getElementsByTagName("head")[0];n.insertBefore(a,n.lastChild)}function E(){i.body?o||(o=!0,function(){for(var e=i.getElementsByTagName("script"),t=0,n=e.length;t<n;t++){var r=e[t].getAttribute("data-headjs-load");if(r)return l.load(r)}}(),m(a,function(e){y(e)})):(s.clearTimeout(l.readyTimeout),l.readyTimeout=s.setTimeout(E,50))}function L(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",L,!1),E()):"complete"===i.readyState&&(i.detachEvent("onreadystatechange",L),E())}if("complete"===i.readyState)E();else if(i.addEventListener)i.addEventListener("DOMContentLoaded",L,!1),s.addEventListener("load",E,!1);else{i.attachEvent("onreadystatechange",L),s.attachEvent("onload",E);var j=!1;try{j=!s.frameElement&&i.documentElement}catch(e){}j&&j.doScroll&&!function t(){if(!o){try{j.doScroll("left")}catch(e){return s.clearTimeout(l.readyTimeout),void(l.readyTimeout=s.setTimeout(t,50))}E()}}()}l.load=l.js=e?function(){var e=arguments,n=e[e.length-1],r={};return b(n)||(n=null),v(e[0])?(e[0].push(n),l.load.apply(null,e[0])):(m(e,function(e,t){e!==n&&(e=w(e),r[e.name]=e)}),m(e,function(e,t){e!==n&&T(e=w(e),function(){x(r)&&y(n)})})),l}:function(){var e=arguments,t=e[e.length-1],n=[].slice.call(e,1),r=n[0];return b(t)||(t=null),v(e[0])?(e[0].push(t),l.load.apply(null,e[0])):r?(m(n,function(e){!b(e)&&e&&C(w(e))}),T(w(e[0]),b(r)?r:function(){l.load.apply(null,n)})):T(w(e[0])),l},l.test=function(e,t,n,r){return e="object"==typeof e?e:{test:e,success:!!t&&(v(t)?t:[t]),failure:!!n&&(v(n)?n:[n]),callback:r||p},(t=!!e.test)&&e.success?(e.success.push(e.callback),l.load.apply(null,e.success)):!t&&e.failure?(e.failure.push(e.callback),l.load.apply(null,e.failure)):r(),l},l.ready=function(e,t){var n,r;return e===i?o?y(t):a.push(t):(b(e)&&(t=e,e="ALL"),v(e)?(n={},m(e,function(e){n[e]=u[e],l.ready(e,function(){x(n)&&y(t)})})):"string"==typeof e&&b(t)&&((r=u[e])&&r.state===h||"ALL"===e&&x()&&o?y(t):(r=c[e])?r.push(t):r=c[e]=[t])),l},l.ready(i,function(){x()&&m(c.ALL,function(e){y(e)}),l.feature&&l.feature("domloaded",!0)})}(window);