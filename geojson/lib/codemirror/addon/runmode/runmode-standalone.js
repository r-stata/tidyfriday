function splitLines(t){return t.split(/\r?\n|\r/)}function StringStream(t){this.pos=this.start=0,this.string=t}window.CodeMirror={},StringStream.prototype={eol:function(){return this.pos>=this.string.length},sol:function(){return 0==this.pos},peek:function(){return this.string.charAt(this.pos)||null},next:function(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)},eat:function(t){var r=this.string.charAt(this.pos);if("string"==typeof t?r==t:r&&(t.test?t.test(r):t(r)))return++this.pos,r},eatWhile:function(t){for(var r=this.pos;this.eat(t););return this.pos>r},eatSpace:function(){for(var t=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>t},skipToEnd:function(){this.pos=this.string.length},skipTo:function(t){t=this.string.indexOf(t,this.pos);if(-1<t)return this.pos=t,!0},backUp:function(t){this.pos-=t},column:function(){return this.start},indentation:function(){return 0},match:function(t,r,e){var i;return"string"!=typeof t?((i=this.string.slice(this.pos).match(t))&&!1!==r&&(this.pos+=i[0].length),i):(i=function(t){return e?t.toLowerCase():t})(this.string).indexOf(i(t),this.pos)==this.pos?(!1!==r&&(this.pos+=t.length),!0):void 0},current:function(){return this.string.slice(this.start,this.pos)}},CodeMirror.StringStream=StringStream,CodeMirror.startState=function(t,r,e){return!t.startState||t.startState(r,e)};var modes=CodeMirror.modes={},mimeModes=CodeMirror.mimeModes={};CodeMirror.defineMode=function(t,r){modes[t]=r},CodeMirror.defineMIME=function(t,r){mimeModes[t]=r},CodeMirror.getMode=function(t,r){"string"==typeof(r="string"==typeof r&&mimeModes.hasOwnProperty(r)?mimeModes[r]:r)?(i=r,e={}):null!=r&&(i=r.name,e=r);var e,i=modes[i];if(i)return i(t,e||{});throw new Error("Unknown mode: "+r)},CodeMirror.runMode=function(t,r,e,i){for(var h,p,u,n=CodeMirror.getMode({indentUnit:2},r),s=(1==e.nodeType&&(h=i&&i.tabSize||4,u=0,(p=e).innerHTML="",e=function(t,r){if("\n"==t)p.appendChild(document.createElement("br")),u=0;else{for(var e,i="",n=0;;){var s=t.indexOf("\t",n);if(-1==s){i+=t.slice(n),u+=t.length-n;break}u+=s-n,i+=t.slice(n,s);var o=h-u%h;u+=o;for(var a=0;a<o;++a)i+=" ";n=s+1}(r?((e=p.appendChild(document.createElement("span"))).className="cm-"+r.replace(/ +/g," cm-"),e):p).appendChild(document.createTextNode(i))}}),splitLines(t)),o=CodeMirror.startState(n),a=0,c=s.length;a<c;++a){a&&e("\n");for(var d=new CodeMirror.StringStream(s[a]);!d.eol();){var f=n.token(d,o);e(d.current(),f,a,d.start),d.start=d.pos}}};