!function(){var s,t,n;function i(e,t){return Array.prototype.slice.call((t||document).querySelectorAll(e))}function u(e,t){return t=" "+t+" ",-1<(" "+e.className+" ").replace(/[\n\t]/g," ").indexOf(t)}function r(e,t,n){for(var i=t.replace(/\s+/g,"").split(","),r=+e.getAttribute("data-line-offset")||0,o=(s()?parseInt:parseFloat)(getComputedStyle(e).lineHeight),l=0;d=i[l++];){var a=+(d=d.split("-"))[0],d=+d[1]||a,c=document.createElement("div");c.textContent=Array(d-a+2).join(" \n"),c.className=(n||"")+" line-highlight",u(e,"line-numbers")||(c.setAttribute("data-start",a),a<d&&c.setAttribute("data-end",d)),c.style.top=(a-r-1)*o+"px",(!u(e,"line-numbers")&&e.querySelector("code")||e).appendChild(c)}}function o(){var e=location.hash.slice(1),t=(i(".temporary.line-highlight").forEach(function(e){e.parentNode.removeChild(e)}),(e.match(/\.([\d,-]+)$/)||[,""])[1]);t&&!document.getElementById(e)&&(e=e.slice(0,e.lastIndexOf(".")),(e=document.getElementById(e))&&(e.hasAttribute("data-line")||e.setAttribute("data-line",""),r(e,t,"temporary "),document.querySelector(".temporary.line-highlight").scrollIntoView()))}"undefined"!=typeof self&&self.Prism&&self.document&&document.querySelector&&(s=function(){var e;return void 0===t&&((e=document.createElement("div")).style.fontSize="13px",e.style.lineHeight="1.5",e.style.padding=0,e.style.border=0,e.innerHTML="&nbsp;<br />&nbsp;",document.body.appendChild(e),t=38===e.offsetHeight,document.body.removeChild(e)),t},n=0,Prism.hooks.add("complete",function(e){var e=e.element.parentNode,t=e&&e.getAttribute("data-line");e&&t&&/pre/i.test(e.nodeName)&&(clearTimeout(n),i(".line-highlight",e).forEach(function(e){e.parentNode.removeChild(e)}),r(e,t),n=setTimeout(o,1))}),window.addEventListener&&window.addEventListener("hashchange",o))}();