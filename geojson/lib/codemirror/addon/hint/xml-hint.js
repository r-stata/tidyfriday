!function(){"use strict";var v=CodeMirror.Pos;CodeMirror.xmlHint=function(t,e){var r=e&&e.schemaInfo,n=e&&e.quoteChar||'"';if(r){var e=t.getCursor(),a=t.getTokenAt(e),i=CodeMirror.innerMode(t.getMode(),a.state);if("xml"==i.mode.name){var s,o=[],g=!1,f="<"==a.string.charAt(0);if(!i.state.tagName||f){f&&(s=a.string.slice(1),g=!0);var f=i.state.context,h=f&&r[f.tagName],l=f?h&&h.children:r["!top"];if(l)for(var u=0;u<l.length;++u)s&&0!=l[u].indexOf(s)||o.push("<"+l[u]);else for(var d in r)!r.hasOwnProperty(d)||"!top"==d||s&&0!=d.indexOf(s)||o.push("<"+d);!f||s&&0!=("/"+f.tagName).indexOf(s)||o.push("</"+f.tagName+">")}else{var p=(h=r[i.state.tagName])&&h.attrs;if(!p)return;if("string"==a.type||"="==a.string){var c,f=t.getRange(v(e.line,Math.max(0,e.ch-60)),v(e.line,"string"==a.type?a.start:a.end)).match(/([^\s\u00a0=<>\"\']+)=$/);if(!f||!p.hasOwnProperty(f[1])||!(c=p[f[1]]))return;"string"==a.type&&(s=a.string,/['"]/.test(a.string.charAt(0))&&(n=a.string.charAt(0),s=a.string.slice(1)),g=!0);for(u=0;u<c.length;++u)s&&0!=c[u].indexOf(s)||o.push(n+c[u]+n)}else for(var m in"attribute"==a.type&&(s=a.string,g=!0),p)!p.hasOwnProperty(m)||s&&0!=m.indexOf(s)||o.push(m)}return{list:o,from:g?v(e.line,a.start):e,to:g?v(e.line,a.end):e}}}}}();