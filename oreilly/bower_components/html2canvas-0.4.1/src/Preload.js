_html2canvas.Preload=function(r){var o,t,e,n,c={numLoaded:0,numFailed:0,numTotal:0,cleanupDone:!1},i=_html2canvas.Util,l=0,a=r.elements[0]||document.body,d=a.ownerDocument,m=a.getElementsByTagName("img"),u=m.length,s=d.createElement("a"),g=void 0!==(new Image).crossOrigin;function f(){i.log("html2canvas: start: images: "+c.numLoaded+" / "+c.numTotal+" (failed: "+c.numFailed+")"),!c.firstRun&&c.numLoaded>=c.numTotal&&(i.log("Finished loading images: # "+c.numTotal+" (failed: "+c.numFailed+")"),"function"==typeof r.complete&&r.complete(c))}function p(e,n,a){var o,t,i=r.proxy;s.href=e,e=s.href,o="html2canvas_"+l++,a.callbackname=o,-1<i.indexOf("?")?i+="&":i+="?",i+="url="+encodeURIComponent(e)+"&callback="+o,t=d.createElement("script"),window[o]=function(e){"error:"===e.substring(0,6)?(a.succeeded=!1,c.numLoaded++,c.numFailed++,f()):(b(n,a),n.src=e),window[o]=void 0;try{delete window[o]}catch(e){}t.parentNode.removeChild(t),t=null,delete a.script,delete a.callbackname},t.setAttribute("type","text/javascript"),t.setAttribute("src",i),a.script=t,window.document.body.appendChild(t)}function h(e,n){var n=window.getComputedStyle(e,n),a=n.content;"url"===a.substr(0,3)&&t.loadImage(_html2canvas.Util.parseBackgroundImage(a)[0].args[0]),w(n.backgroundImage,e)}function v(e){return e&&e.method&&e.args&&0<e.args.length}function w(e,a){var o;_html2canvas.Util.parseBackgroundImage(e).filter(v).forEach(function(e){var n;"url"===e.method?t.loadImage(e.args[0]):e.method.match(/\-?gradient$/)&&(void 0===o&&(o=_html2canvas.Util.Bounds(a)),e=e.value,n=o,void 0!==(n=_html2canvas.Generate.Gradient(e,n))&&(c[e]={img:n,succeeded:!0},c.numTotal++,c.numLoaded++,f()))})}function b(n,a){n.onload=function(){void 0!==a.timer&&window.clearTimeout(a.timer),c.numLoaded++,a.succeeded=!0,n.onerror=n.onload=null,f()},n.onerror=function(){var e;if("anonymous"===n.crossOrigin&&(window.clearTimeout(a.timer),r.proxy))return e=n.src,n=new Image,(a.img=n).src=e,void p(n.src,n,a);c.numLoaded++,c.numFailed++,a.succeeded=!1,n.onerror=n.onload=null,f()}}for(s.href=window.location.href,o=s.protocol+s.host,t={loadImage:function(e){var n,a;e&&void 0===c[e]&&(n=new Image,e.match(/data:image\/.*;base64,/i)?(n.src=e.replace(/url\(['"]{0,}|['"]{0,}\)$/gi,""),a=c[e]={img:n},c.numTotal++,b(n,a)):(s.href=e,s.href=s.href,s.protocol+s.host===o||!0===r.allowTaint?(a=c[e]={img:n},c.numTotal++,b(n,a),n.src=e):g&&!r.allowTaint&&r.useCORS?(n.crossOrigin="anonymous",a=c[e]={img:n},c.numTotal++,b(n,a),n.src=e):r.proxy&&(a=c[e]={img:n},c.numTotal++,p(e,n,a))))},cleanupDOM:function(e){var n,a;if(!c.cleanupDone){for(a in e&&"string"==typeof e?i.log("html2canvas: Cleanup because: "+e):i.log("html2canvas: Cleanup after timeout: "+r.timeout+" ms."),c)if(c.hasOwnProperty(a)&&"object"==typeof(n=c[a])&&n.callbackname&&void 0===n.succeeded){window[n.callbackname]=void 0;try{delete window[n.callbackname]}catch(e){}n.script&&n.script.parentNode&&(n.script.setAttribute("src","about:blank"),n.script.parentNode.removeChild(n.script)),c.numLoaded++,c.numFailed++,i.log("html2canvas: Cleaned up failed img: '"+a+"' Steps: "+c.numLoaded+" / "+c.numTotal)}void 0!==window.stop?window.stop():void 0!==document.execCommand&&document.execCommand("Stop",!1),void 0!==document.close&&document.close(),c.cleanupDone=!0,e&&"string"==typeof e||f()}},renderingDone:function(){n&&window.clearTimeout(n)}},0<r.timeout&&(n=window.setTimeout(t.cleanupDOM,r.timeout)),i.log("html2canvas: Preload starts: finding background-images"),c.firstRun=!0,!function e(n){var a=!1;try{i.Children(n).forEach(e)}catch(e){}try{a=n.nodeType}catch(e){a=!1,i.log("html2canvas: failed to access some element's nodeType - Exception: "+e.message)}if(1===a||void 0===a){h(a=n,":before"),h(a,":after");try{w(i.getCSS(n,"backgroundImage"),n)}catch(e){i.log("html2canvas: failed to get background-image - Exception: "+e.message)}w(n)}}(a),i.log("html2canvas: Preload: Finding images"),e=0;e<u;e+=1)t.loadImage(m[e].getAttribute("src"));return c.firstRun=!1,i.log("html2canvas: Preload: Done."),c.numTotal===c.numLoaded&&f(),t};