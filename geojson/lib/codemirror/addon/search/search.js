!function(){function o(){this.posFrom=this.posTo=this.query=null,this.overlay=null}function i(e){return e.state.search||(e.state.search=new o)}function s(e,o,r){return e.getSearchCursor(o,r,"string"==typeof o&&o==o.toLowerCase())}function a(e,o,r,n){e.openDialog?e.openDialog(o,n):n(prompt(r,""))}function c(e){var o=e.match(/^\/(.*)\/([a-z]*)$/);return o?new RegExp(o[1],-1==o[2].indexOf("i")?"":"i"):e}function r(r,n){var t=i(r);if(t.query)return f(r,n);a(r,'Search: <input type="text" style="width: 10em"/> <span style="color: #888">(Use /re/ syntax for regexp search)</span>',"Search for:",function(e){r.operation(function(){var o;e&&!t.query&&(t.query=c(e),r.removeOverlay(t.overlay),t.overlay="string"==typeof(o=t.query)?{token:function(e){if(e.match(o))return"searching";e.next(),e.skipTo(o.charAt(0))||e.skipToEnd()}}:{token:function(e){if(e.match(o))return"searching";for(;!e.eol()&&(e.next(),!e.match(o,!1)););}},r.addOverlay(t.overlay),t.posFrom=t.posTo=r.getCursor(),f(r,n))})})}function f(r,n){r.operation(function(){var e=i(r),o=s(r,e.query,n?e.posFrom:e.posTo);(o.find(n)||(o=s(r,e.query,n?CodeMirror.Pos(r.lastLine()):CodeMirror.Pos(r.firstLine(),0))).find(n))&&(r.setSelection(o.from(),o.to()),e.posFrom=o.from(),e.posTo=o.to())})}function n(o){o.operation(function(){var e=i(o);e.query&&(e.query=null,o.removeOverlay(e.overlay))})}function t(u,e){a(u,'Replace: <input type="text" style="width: 10em"/> <span style="color: #888">(Use /re/ syntax for regexp search)</span>',"Replace:",function(f){f&&(f=c(f),a(u,'With: <input type="text" style="width: 10em"/>',"Replace with:",function(o){var i,a,c;e?u.operation(function(){for(var r,e=s(u,f);e.findNext();)"string"!=typeof f?(r=u.getRange(e.from(),e.to()).match(f),e.replace(o.replace(/\$(\d)/,function(e,o){return r[o]}))):e.replace(o)}):(n(u),i=s(u,f,u.getCursor()),c=function(r){i.replace("string"==typeof f?o:o.replace(/\$(\d)/,function(e,o){return r[o]})),a()},(a=function(){var e,o,r,n,t=i.from();!(e=i.findNext())&&(i=s(u,f),!(e=i.findNext())||t&&i.from().line==t.line&&i.from().ch==t.ch)||(u.setSelection(i.from(),i.to()),t="Replace? <button>Yes</button> <button>No</button> <button>Stop</button>",r="Replace?",n=[function(){c(e)},a],(o=u).openConfirm?o.openConfirm(t,n):confirm(r)&&n[0]())})())}))})}CodeMirror.commands.find=function(e){n(e),r(e)},CodeMirror.commands.findNext=r,CodeMirror.commands.findPrev=function(e){r(e,!0)},CodeMirror.commands.clearSearch=n,CodeMirror.commands.replace=t,CodeMirror.commands.replaceAll=function(e){t(e,!0)}}();