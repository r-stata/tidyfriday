!function(){"use strict";function n(t,e,i){this.cm=t,this.getHints=e,this.options=i,this.widget=this.onClose=null}function M(t){return"string"==typeof t?t:t.text}function a(n,t){this.completion=n,this.data=t;for(var e=this,s=n.cm,i=n.options,c=this.hints=document.createElement("ul"),o=(c.className="CodeMirror-hints",this.selectedHint=0,t.list),l=0;l<o.length;++l){var h=c.appendChild(document.createElement("li")),r=o[l],u="CodeMirror-hint"+(l?"":" CodeMirror-hint-active");null!=r.className&&(u=r.className+" "+u),h.className=u,r.render?r.render(h,t,r):h.appendChild(document.createTextNode(r.displayText||M(r))),h.hintId=l}var f,a=s.cursorCoords(!1!==i.alignWithWord?t.from:null),m=a.left,d=a.bottom,p=!0,g=(c.style.left=m+"px",c.style.top=d+"px",window.innerWidth||Math.max(document.body.offsetWidth,document.documentElement.offsetWidth)),v=window.innerHeight||Math.max(document.body.offsetHeight,document.documentElement.offsetHeight),y=c.getBoundingClientRect(),C=y.right-g,w=y.bottom-v,H=(0<C&&(y.right-y.left>g&&(c.style.width=g-5+"px",C-=y.right-y.left-g),c.style.left=(m=a.left-C)+"px"),0<w&&(g=y.bottom-y.top,0<y.top-(a.bottom-a.top)-g?(w=g+(a.bottom-a.top),p=!1):v<g&&(c.style.height=v-5+"px",w-=g-v),c.style.top=(d=a.bottom-w)+"px"),(i.container||document.body).appendChild(c),s.addKeyMap(this.keyMap=function(t,o){var n={Up:function(){o.moveFocus(-1)},Down:function(){o.moveFocus(1)},PageUp:function(){o.moveFocus(-o.menuSize())},PageDown:function(){o.moveFocus(o.menuSize())},Home:function(){o.setFocus(0)},End:function(){o.setFocus(o.length)},Enter:o.pick,Tab:o.pick,Esc:o.close},s=t.customKeys?{}:n;function e(t,e){var i="string"!=typeof e?function(t){return e(t,o)}:n.hasOwnProperty(e)?n[e]:e;s[t]=i}if(t.customKeys)for(var i in t.customKeys)t.customKeys.hasOwnProperty(i)&&e(i,t.customKeys[i]);if(t.extraKeys)for(var i in t.extraKeys)t.extraKeys.hasOwnProperty(i)&&e(i,t.extraKeys[i]);return s}(i,{moveFocus:function(t){e.changeActive(e.selectedHint+t)},setFocus:function(t){e.changeActive(t)},menuSize:function(){return e.screenAmount()},length:o.length,close:function(){n.close()},pick:function(){e.pick()}})),!1!==i.closeOnUnfocus&&(s.on("blur",this.onBlur=function(){f=setTimeout(function(){n.close()},100)}),s.on("focus",this.onFocus=function(){clearTimeout(f)})),s.getScrollInfo());return s.on("scroll",this.onScroll=function(){var t=s.getScrollInfo(),e=s.getWrapperElement().getBoundingClientRect(),i=d+H.top-t.top,o=i-(window.pageYOffset||(document.documentElement||document.body).scrollTop);if(p||(o+=c.offsetHeight),o<=e.top||o>=e.bottom)return n.close();c.style.top=i+"px",c.style.left=m+H.left-t.left+"px"}),CodeMirror.on(c,"dblclick",function(t){t=t.target||t.srcElement;null!=t.hintId&&(e.changeActive(t.hintId),e.pick())}),CodeMirror.on(c,"click",function(t){t=t.target||t.srcElement;null!=t.hintId&&e.changeActive(t.hintId)}),CodeMirror.on(c,"mousedown",function(){setTimeout(function(){s.focus()},20)}),CodeMirror.signal(t,"select",o[0],c.firstChild),!0}CodeMirror.showHint=function(t,e,i){if(!t.somethingSelected()){t.state.completionActive&&t.state.completionActive.close();var o=t.state.completionActive=new n(t,e,i||{});if(CodeMirror.signal(t,"startCompletion",t),!o.options.async)return o.showHints(e(t,o.options));e(t,function(t){o.showHints(t)},o.options)}},n.prototype={close:function(){this.active()&&(this.widget&&this.widget.close(),this.onClose&&this.onClose(),this.cm.state.completionActive=null,CodeMirror.signal(this.cm,"endCompletion",this.cm))},active:function(){return this.cm.state.completionActive==this},pick:function(t,e){e=t.list[e];e.hint?e.hint(this.cm,t,e):this.cm.replaceRange(M(e),t.from,t.to),this.close()},showHints:function(t){if(!t||!t.list.length||!this.active())return this.close();0!=this.options.completeSingle&&1==t.list.length?this.pick(t,0):this.showWidget(t)},showWidget:function(t){this.widget=new a(this,t),CodeMirror.signal(t,"shown");var e,i=null,o=this,n=this.options.closeCharacters||/[\s()\[\]{};:>,]/,s=this.cm.getCursor(),c=this.cm.getLine(s.line).length;function l(){e||(e=!0,o.close(),o.cm.off("cursorActivity",f),CodeMirror.signal(t,"close"))}function h(){return e||!o.widget&&(l(),1)}function r(){h()||(o.options.async?o.getHints(o.cm,u,o.options):u(o.getHints(o.cm,o.options)))}function u(t){if(!h()){if(!t||!t.list.length)return l();o.widget.close(),o.widget=new a(o,t)}}function f(){clearTimeout(i);var t=o.cm.getCursor(),e=o.cm.getLine(t.line);t.line!=s.line||e.length-t.ch!=c-s.ch||t.ch<s.ch||o.cm.somethingSelected()||t.ch&&n.test(e.charAt(t.ch-1))?o.close():i=setTimeout(r,170)}this.cm.on("cursorActivity",f),this.onClose=l}},a.prototype={close:function(){var t;this.completion.widget==this&&(this.completion.widget=null,this.hints.parentNode.removeChild(this.hints),this.completion.cm.removeKeyMap(this.keyMap),t=this.completion.cm,!1!==this.completion.options.closeOnUnfocus&&(t.off("blur",this.onBlur),t.off("focus",this.onFocus)),t.off("scroll",this.onScroll))},pick:function(){this.completion.pick(this.data,this.selectedHint)},changeActive:function(t){var e;t=Math.max(0,Math.min(t,this.data.list.length-1)),this.selectedHint!=t&&((e=this.hints.childNodes[this.selectedHint]).className=e.className.replace(" CodeMirror-hint-active",""),(e=this.hints.childNodes[this.selectedHint=t]).className+=" CodeMirror-hint-active",e.offsetTop<this.hints.scrollTop?this.hints.scrollTop=e.offsetTop-3:e.offsetTop+e.offsetHeight>this.hints.scrollTop+this.hints.clientHeight&&(this.hints.scrollTop=e.offsetTop+e.offsetHeight-this.hints.clientHeight+3),CodeMirror.signal(this.data,"select",this.data.list[this.selectedHint],e))},screenAmount:function(){return Math.floor(this.hints.clientHeight/this.hints.firstChild.offsetHeight)||1}}}();