var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var e,o=/\blang(?:uage)?-(?!\*)(\w+)\b/i,w=_self.Prism={util:{encode:function(e){return e instanceof i?new i(e.type,w.util.encode(e.content),e.alias):"Array"===w.util.type(e)?e.map(w.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){switch(w.util.type(e)){case"Object":var t,a={};for(t in e)e.hasOwnProperty(t)&&(a[t]=w.util.clone(e[t]));return a;case"Array":return e.map&&e.map(function(e){return w.util.clone(e)})}return e}},languages:{extend:function(e,t){var a,n=w.util.clone(w.languages[e]);for(a in t)n[a]=t[a];return n},insertBefore:function(a,e,t,n){var s=(n=n||w.languages)[a];if(2==arguments.length){for(var r in t=e)t.hasOwnProperty(r)&&(s[r]=t[r]);return s}var i,l={};for(i in s)if(s.hasOwnProperty(i)){if(i==e)for(var r in t)t.hasOwnProperty(r)&&(l[r]=t[r]);l[i]=s[i]}return w.languages.DFS(w.languages,function(e,t){t===n[a]&&e!=a&&(this[e]=l)}),n[a]=l},DFS:function(e,t,a){for(var n in e)e.hasOwnProperty(n)&&(t.call(e,n,e[n],a||n),"Object"===w.util.type(e[n])?w.languages.DFS(e[n],t):"Array"===w.util.type(e[n])&&w.languages.DFS(e[n],t,n))}},plugins:{},highlightAll:function(e,t){for(var a,n=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),s=0;a=n[s++];)w.highlightElement(a,!0===e,t)},highlightElement:function(e,t,a){for(var n,s=e;s&&!o.test(s.className);)s=s.parentNode;s&&(r=(s.className.match(o)||[,""])[1],n=w.languages[r]),e.className=e.className.replace(o,"").replace(/\s+/g," ")+" language-"+r,s=e.parentNode,/pre/i.test(s.nodeName)&&(s.className=s.className.replace(o,"").replace(/\s+/g," ")+" language-"+r);var r,i=e.textContent,l={element:e,language:r,grammar:n,code:i};i&&n?(w.hooks.run("before-highlight",l),t&&_self.Worker?((r=new Worker(w.filename)).onmessage=function(e){l.highlightedCode=e.data,w.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,a&&a.call(l.element),w.hooks.run("after-highlight",l),w.hooks.run("complete",l)},r.postMessage(JSON.stringify({language:l.language,code:l.code,immediateClose:!0}))):(l.highlightedCode=w.highlight(l.code,l.grammar,l.language),w.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,a&&a.call(e),w.hooks.run("after-highlight",l),w.hooks.run("complete",l))):w.hooks.run("complete",l)},highlight:function(e,t,a){e=w.tokenize(e,t);return i.stringify(w.util.encode(e),a)},tokenize:function(e,t,a){var n=w.Token,s=[e],r=t.rest;if(r){for(var i in r)t[i]=r[i];delete t.rest}e:for(var i in t)if(t.hasOwnProperty(i)&&t[i])for(var l=t[i],l="Array"===w.util.type(l)?l:[l],o=0;o<l.length;++o)for(var u=(m=l[o]).inside,g=!!m.lookbehind,c=0,p=m.alias,m=m.pattern||m,d=0;d<s.length;d++){var f,h,y,k=s[d];if(s.length>e.length)break e;k instanceof n||(m.lastIndex=0,(f=m.exec(k))&&(g&&(c=f[1].length),h=(y=f.index-1+c)+(f=f[0].slice(c)).length,y=k.slice(0,y+1),k=k.slice(h+1),h=[d,1],y&&h.push(y),y=new n(i,u?w.tokenize(f,u):f,p),h.push(y),k&&h.push(k),Array.prototype.splice.apply(s,h)))}return s},hooks:{all:{},add:function(e,t){var a=w.hooks.all;a[e]=a[e]||[],a[e].push(t)},run:function(e,t){var a=w.hooks.all[e];if(a&&a.length)for(var n,s=0;n=a[s++];)n(t)}}},i=w.Token=function(e,t,a){this.type=e,this.content=t,this.alias=a};return i.stringify=function(t,a,e){if("string"==typeof t)return t;if("Array"===w.util.type(t))return t.map(function(e){return i.stringify(e,a,t)}).join("");var n,s={type:t.type,content:i.stringify(t.content,a,e),tag:"span",classes:["token",t.type],attributes:{},language:a,parent:e},r=("comment"==s.type&&(s.attributes.spellcheck="true"),t.alias&&(e="Array"===w.util.type(t.alias)?t.alias:[t.alias],Array.prototype.push.apply(s.classes,e)),w.hooks.run("wrap",s),"");for(n in s.attributes)r+=(r?" ":"")+n+'="'+(s.attributes[n]||"")+'"';return"<"+s.tag+' class="'+s.classes.join(" ")+'" '+r+">"+s.content+"</"+s.tag+">"},_self.document?(e=(e=document.getElementsByTagName("script"))[e.length-1])&&(w.filename=e.src,document.addEventListener&&!e.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",w.highlightAll)):_self.addEventListener&&_self.addEventListener("message",function(e){var e=JSON.parse(e.data),t=e.language,a=e.code,e=e.immediateClose;_self.postMessage(w.highlight(a,w.languages[t],t)),e&&_self.close()},!1),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism),Prism.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?[\w\W]+?\?>/,doctype:/<!DOCTYPE[\w\W]+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),Prism.languages.xml=Prism.languages.markup,Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup,Prism.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:/("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},Prism.languages.css.atrule.inside.rest=Prism.util.clone(Prism.languages.css),Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,lookbehind:!0,inside:Prism.languages.css,alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag)),Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:/(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(true|false)\b/,function:/[a-z0-9_]+(?=\()/i,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,function:/[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0}}),Prism.languages.insertBefore("javascript","class-name",{"template-string":{pattern:/`(?:\\`|\\?[^`])*`/,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,lookbehind:!0,inside:Prism.languages.javascript,alias:"language-javascript"}}),Prism.languages.js=Prism.languages.javascript,"undefined"!=typeof self&&self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var o={js:"javascript",html:"markup",svg:"markup",xml:"markup",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell"};Array.prototype.forEach&&Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(e){for(var t,a,n=e.getAttribute("data-src"),s=e,r=/\blang(?:uage)?-(?!\*)(\w+)\b/i;s&&!r.test(s.className);)s=s.parentNode;(a=s?(e.className.match(r)||[,""])[1]:a)||(t=(n.match(/\.(\w+)$/)||[,""])[1],a=o[t]||t);var i=document.createElement("code"),l=(i.className="language-"+a,e.textContent="",i.textContent="Loading…",e.appendChild(i),new XMLHttpRequest);l.open("GET",n,!0),l.onreadystatechange=function(){4==l.readyState&&(l.status<400&&l.responseText?(i.textContent=l.responseText,Prism.highlightElement(i)):400<=l.status?i.textContent="✖ Error "+l.status+" while fetching file: "+l.statusText:i.textContent="✖ Error: File does not exist or is empty")},l.send(null)})},self.Prism.fileHighlight());