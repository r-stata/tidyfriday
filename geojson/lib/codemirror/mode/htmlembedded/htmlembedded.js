CodeMirror.defineMode("htmlembedded",function(t,e){var r,n,i=e.scriptStartRegex||/^<%/i,o=e.scriptEndRegex||/^%>/i;function d(t,e){return t.match(i,!1)?(e.token=a,r.token(t,e.scriptState)):n.token(t,e.htmlState)}function a(t,e){return t.match(o,!1)?(e.token=d,n.token(t,e.htmlState)):r.token(t,e.scriptState)}return{startState:function(){return r=r||CodeMirror.getMode(t,e.scriptingModeSpec),n=n||CodeMirror.getMode(t,"htmlmixed"),{token:e.startOpen?a:d,htmlState:CodeMirror.startState(n),scriptState:CodeMirror.startState(r)}},token:function(t,e){return e.token(t,e)},indent:function(t,e){return t.token==d?n.indent(t.htmlState,e):r.indent?r.indent(t.scriptState,e):void 0},copyState:function(t){return{token:t.token,htmlState:CodeMirror.copyState(n,t.htmlState),scriptState:CodeMirror.copyState(r,t.scriptState)}},electricChars:"/{}:",innerMode:function(t){return t.token==a?{state:t.scriptState,mode:r}:{state:t.htmlState,mode:n}}}},"htmlmixed"),CodeMirror.defineMIME("application/x-ejs",{name:"htmlembedded",scriptingModeSpec:"javascript"}),CodeMirror.defineMIME("application/x-aspx",{name:"htmlembedded",scriptingModeSpec:"text/x-csharp"}),CodeMirror.defineMIME("application/x-jsp",{name:"htmlembedded",scriptingModeSpec:"text/x-java"}),CodeMirror.defineMIME("application/x-erb",{name:"htmlembedded",scriptingModeSpec:"ruby"});