!function(){"use strict";var M={},v=/[^\s\u00a0]/,R=CodeMirror.Pos;function s(e){e=e.search(v);return-1==e?0:e}CodeMirror.commands.toggleComment=function(e){var n=e.getCursor("start"),t=e.getCursor("end");e.uncomment(n,t)||e.lineComment(n,t)},CodeMirror.defineExtension("lineComment",function(o,e,l){l=l||M;var r,a,m,c,g=this,n=CodeMirror.innerMode(g.getMode(),g.getTokenAt(o).state).mode,d=l.lineComment||n.lineComment;d?null!=(r=g.getLine(o.line))&&(a=Math.min(0!=e.ch||e.line==o.line?e.line+1:e.line,g.lastLine()+1),m=null==l.padding?" ":l.padding,c=l.commentBlankLines||o.line==e.line,g.operation(function(){if(l.indent)for(var e=r.slice(0,s(r)),n=o.line;n<a;++n){var t=g.getLine(n),i=e.length;(c||v.test(t))&&(t.slice(0,i)!=e&&(i=s(t)),g.replaceRange(e+d+m,R(n,0),R(n,i)))}else for(n=o.line;n<a;++n)(c||v.test(g.getLine(n)))&&g.replaceRange(d+m,R(n,0))})):(l.blockCommentStart||n.blockCommentStart)&&(l.fullLines=!0,g.blockComment(o,e,l))}),CodeMirror.defineExtension("blockComment",function(i,o,l){l=l||M;var r,a,m=this,c=CodeMirror.innerMode(m.getMode(),m.getTokenAt(i).state).mode,g=l.blockCommentStart||c.blockCommentStart,d=l.blockCommentEnd||c.blockCommentEnd;g&&d?(r=Math.min(o.line,m.lastLine()),r!=i.line&&0==o.ch&&v.test(m.getLine(r))&&--r,a=null==l.padding?" ":l.padding,i.line>r||m.operation(function(){if(0!=l.fullLines){var e=v.test(m.getLine(r)),n=(m.replaceRange(a+d,R(r)),m.replaceRange(g+a,R(i.line,0)),l.blockCommentLead||c.blockCommentLead);if(null!=n)for(var t=i.line+1;t<=r;++t)t==r&&!e||m.replaceRange(n+a,R(t,0))}else m.replaceRange(d,o),m.replaceRange(g,i)})):(l.lineComment||c.lineComment)&&0!=l.fullLines&&m.lineComment(i,o,l)}),CodeMirror.defineExtension("uncomment",function(e,n,t){t=t||M;var o,l=this,i=CodeMirror.innerMode(l.getMode(),l.getTokenAt(e).state).mode,r=Math.min(n.line,l.lastLine()),a=Math.min(e.line,r),m=t.lineComment||i.lineComment,c=[],g=null==t.padding?" ":t.padding;e:if(m){for(var d=a;d<=r;++d){var s=l.getLine(d),f=s.indexOf(m);if(-1==f&&(d!=r||d==a)&&v.test(s))break e;if(d!=a&&-1<f&&v.test(s.slice(0,f)))break e;c.push(s)}if(l.operation(function(){for(var e=a;e<=r;++e){var n=c[e-a],t=n.indexOf(m),i=t+m.length;t<0||(n.slice(i,i+g.length)==g&&(i+=g.length),o=!0,l.replaceRange("",R(e,t),R(e,i)))}}),o)return!0}var C,u,h,k,p,L=t.blockCommentStart||i.blockCommentStart,b=t.blockCommentEnd||i.blockCommentEnd;return!(!L||!b)&&(C=t.blockCommentLead||i.blockCommentLead,u=l.getLine(a),h=r==a?u:l.getLine(r),k=u.indexOf(L),-1==(p=h.lastIndexOf(b))&&a!=r&&(h=l.getLine(--r),p=h.lastIndexOf(b)),-1!=k&&-1!=p&&(l.operation(function(){l.replaceRange("",R(r,p-(g&&h.slice(p-g.length,p)==g?g.length:0)),R(r,p+b.length));var e=k+L.length;if(g&&u.slice(e,e+g.length)==g&&(e+=g.length),l.replaceRange("",R(a,k),R(a,e)),C)for(var n=a+1;n<=r;++n){var t,i=l.getLine(n),o=i.indexOf(C);-1==o||v.test(i.slice(0,o))||(t=o+C.length,g&&i.slice(t,t+g.length)==g&&(t+=g.length),l.replaceRange("",R(n,o),R(n,t)))}}),!0))})}();