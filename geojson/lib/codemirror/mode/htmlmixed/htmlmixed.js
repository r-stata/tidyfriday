CodeMirror.defineMode("htmlmixed",function(t,e){var c=CodeMirror.getMode(t,{name:"xml",htmlMode:!0}),s=CodeMirror.getMode(t,"css"),i=[],o=e&&e.scriptTypes;if(i.push({matches:/^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^$/i,mode:CodeMirror.getMode(t,"javascript")}),o)for(var a=0;a<o.length;++a){var l=o[a];i.push({matches:l.matches,mode:l.mode&&CodeMirror.getMode(t,l.mode)})}function r(t,e){var o=e.htmlState.tagName,a=c.token(t,e.htmlState);if("script"==o&&/\btag\b/.test(a)&&">"==t.current()){var l=t.string.slice(Math.max(0,t.pos-100),t.pos).match(/\btype\s*=\s*("[^"]+"|'[^']+'|\S+)[^<]*$/i);(l=l?l[1]:"")&&/[\"\']/.test(l.charAt(0))&&(l=l.slice(1,l.length-1));for(var r=0;r<i.length;++r){var n=i[r];if("string"==typeof n.matches?l==n.matches:n.matches.test(l)){n.mode&&(e.token=d,e.localMode=n.mode,e.localState=n.mode.startState&&n.mode.startState(c.indent(e.htmlState,"")));break}}}else"style"==o&&/\btag\b/.test(a)&&">"==t.current()&&(e.token=m,e.localMode=s,e.localState=s.startState(c.indent(e.htmlState,"")));return a}function n(t,e,o){var a=t.current(),l=a.search(e);return-1<l?t.backUp(a.length-l):a.match(/<\/?$/)&&(t.backUp(a.length),t.match(e,!1)||t.match(a[0])),o}function d(t,e){return t.match(/^<\/\s*script\s*>/i,!1)?(e.token=r,e.localState=e.localMode=null,r(t,e)):n(t,/<\/\s*script\s*>/,e.localMode.token(t,e.localState))}function m(t,e){return t.match(/^<\/\s*style\s*>/i,!1)?(e.token=r,e.localState=e.localMode=null,r(t,e)):n(t,/<\/\s*style\s*>/,s.token(t,e.localState))}return i.push({matches:/./,mode:CodeMirror.getMode(t,"text/plain")}),{startState:function(){return{token:r,localMode:null,localState:null,htmlState:c.startState()}},copyState:function(t){var e;return t.localState&&(e=CodeMirror.copyState(t.localMode,t.localState)),{token:t.token,localMode:t.localMode,localState:e,htmlState:CodeMirror.copyState(c,t.htmlState)}},token:function(t,e){return e.token(t,e)},indent:function(t,e){return!t.localMode||/^\s*<\//.test(e)?c.indent(t.htmlState,e):t.localMode.indent?t.localMode.indent(t.localState,e):CodeMirror.Pass},electricChars:"/{}:",innerMode:function(t){return{state:t.localState||t.htmlState,mode:t.localMode||c}}}},"xml","javascript","css"),CodeMirror.defineMIME("text/html","htmlmixed");