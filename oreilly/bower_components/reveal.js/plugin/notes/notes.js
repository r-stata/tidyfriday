var RevealNotes=function(){function t(){var t,e=(e=document.querySelector('script[src$="notes.js"]').src).replace(/notes\.js(\?.*)?$/,""),a=window.open(e+"notes.html","reveal.js - Notes","width=1100,height=700");function n(){var e=Reveal.getCurrentSlide(),t=e.querySelector("aside.notes"),n={namespace:"reveal-notes",type:"state",notes:"",markdown:!1,whitespace:"normal",state:Reveal.getState()};e.hasAttribute("data-notes")&&(n.notes=e.getAttribute("data-notes"),n.whitespace="pre-wrap"),t&&(n.notes=t.innerHTML,n.markdown="string"==typeof t.getAttribute("data-markdown")),a.postMessage(JSON.stringify(n),"*")}t=setInterval(function(){a.postMessage(JSON.stringify({namespace:"reveal-notes",type:"connect",url:window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search,state:Reveal.getState()}),"*")},500),window.addEventListener("message",function(e){e=JSON.parse(e.data);e&&"reveal-notes"===e.namespace&&"connected"===e.type&&(clearInterval(t),Reveal.addEventListener("slidechanged",n),Reveal.addEventListener("fragmentshown",n),Reveal.addEventListener("fragmenthidden",n),Reveal.addEventListener("overviewhidden",n),Reveal.addEventListener("overviewshown",n),Reveal.addEventListener("paused",n),Reveal.addEventListener("resumed",n),n())})}return/receiver/i.test(window.location.search)||(null!==window.location.search.match(/(\?|\&)notes/gi)&&t(),document.addEventListener("keydown",function(e){null!==document.querySelector(":focus")||e.shiftKey||e.altKey||e.ctrlKey||e.metaKey||!1!==Reveal.getConfig().keyboard&&83===e.keyCode&&(e.preventDefault(),t())},!1)),{open:t}}();