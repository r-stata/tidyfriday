var IN_GLOBAL_SCOPE=!1;!function(){"use strict";var c=window,L=c.setTimeout,u=document,d=u.documentElement,r=u.head||u.getElementsByTagName("head")[0]||d;for(var e="",t=u.scripts,n=t.length;0<=--n;){var a=t[n],s=a.src.match(/^[^?#]*\/run_prettify\.js(\?[^#]*)?(?:#.*)?$/);if(s){e=s[1]||"",a.parentNode.removeChild(a);break}}for(var p=!0,o=[],l=[],f=[],i=(e.replace(/[?&]([^&=]+)=([^&]+)/g,function(e,t,n){n=decodeURIComponent(n),"autorun"==(t=decodeURIComponent(t))?p=!/^[0fn]/i.test(n):"lang"==t?o.push(n):"skin"==t?l.push(n):"callback"==t&&f.push(n)}),"https://google-code-prettify.googlecode.com/svn/loader"),n=0,h=o.length;n<h;++n)!function(){var e=u.createElement("script");e.onload=e.onerror=e.onreadystatechange=function(){!e||e.readyState&&!/loaded|complete/.test(e.readyState)||(e.onerror=e.onload=e.onreadystatechange=null,--g,m(),e.parentNode&&e.parentNode.removeChild(e),e=null)},e.type="text/javascript",e.src=i+"/lang-"+encodeURIComponent(o[n])+".js",r.insertBefore(e,r.firstChild)}();var g=o.length;function m(){g||L(X,0)}for(var y,v,b=[],n=0,h=l.length;n<h;++n)b.push(i+"/skins/"+encodeURIComponent(l[n])+".css");b.push(i+"/prettify.css"),v=(y=b).length,function e(t){var n;t!==v&&((n=u.createElement("link")).rel="stylesheet",n.type="text/css",t+1<v&&(n.error=n.onerror=function(){e(t+1)}),n.href=y[t],r.appendChild(n))}(0);window.PR_SHOULD_USE_CONTINUATION=!0,R=window,V=[x=["break,continue,do,else,for,if,return,while"],"as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"],S=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,C="str",N="com",E="pun",_="pln",k="src",G=/\S/,A=O({keywords:[D=[w=[[x,"auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],z=[j=[w,"abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"],w=[w,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],B="caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",M=[x,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],U=[x,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],x=[x,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"]],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),P={},I(A,["default-code"]),I($([],[[_,/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],[N,/^<\!--[\s\S]*?(?:-\->|$)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],[E,/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]),I($([[_,/^[\s]+/,null," \t\r\n"],["atv",/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,null,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],[E,/^[=<>\/]+/],["lang-js",/^on\w+\s*=\s*\"([^\"]+)\"/i],["lang-js",/^on\w+\s*=\s*\'([^\']+)\'/i],["lang-js",/^on\w+\s*=\s*([^\"\'>\s]+)/i],["lang-css",/^style\s*=\s*\"([^\"]+)\"/i],["lang-css",/^style\s*=\s*\'([^\']+)\'/i],["lang-css",/^style\s*=\s*([^\"\'>\s]+)/i]]),["in.tag"]),I($([],[["atv",/^[\s\S]+/]]),["uq.val"]),I(O({keywords:D,hashComments:!0,cStyleComments:!0,types:S}),["c","cc","cpp","cxx","cyc","m"]),I(O({keywords:"null,true,false"}),["json"]),I(O({keywords:z,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:S}),["cs"]),I(O({keywords:j,cStyleComments:!0}),["java"]),I(O({keywords:x,hashComments:!0,multiLineStrings:!0}),["bash","bsh","csh","sh"]),I(O({keywords:M,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),["cv","py","python"]),I(O({keywords:B,hashComments:!0,multiLineStrings:!0,regexLiterals:2}),["perl","pl","pm"]),I(O({keywords:U,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb","ruby"]),I(O({keywords:w,cStyleComments:!0,regexLiterals:!0}),["javascript","js"]),I(O({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]),I(O({keywords:V,cStyleComments:!0,multilineStrings:!0}),["rc","rs","rust"]),I($([],[[C,/^[\s\S]+/]]),["regex"]),F=R.PR={createSimpleLexer:$,registerLangHandler:I,sourceDecorator:O,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:N,PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",PR_NOCODE:"nocode",PR_PLAIN:_,PR_PUNCTUATION:E,PR_SOURCE:k,PR_STRING:C,PR_TAG:"tag",PR_TYPE:"typ",prettyPrintOne:IN_GLOBAL_SCOPE?R.prettyPrintOne=W:W,prettyPrint:A=IN_GLOBAL_SCOPE?R.prettyPrint=J:J},"function"==typeof define&&define.amd&&define("google-code-prettify",[],function(){return F});var R,x,w,D,j,z,B,M,U,V,S,C,N,E,_,k,G,A,P,F,H=A;function q(e){for(var c=0,u=!1,t=!1,n=0,r=e.length;n<r;++n)if((o=e[n]).ignoreCase)t=!0;else if(/[a-z]/i.test(o.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi,""))){t=!(u=!0);break}var a={b:8,t:9,n:10,v:11,f:12,r:13};function d(e){var t=e.charCodeAt(0);return 92!==t?t:(t=e.charAt(1),a[t]||("0"<=t&&t<="7"?parseInt(e.substring(1),8):"u"===t||"x"===t?parseInt(e.substring(2),16):e.charCodeAt(1)))}function p(e){return e<32?(e<16?"\\x0":"\\x")+e.toString(16):"\\"===(e=String.fromCharCode(e))||"-"===e||"]"===e||"^"===e?"\\"+e:e}function s(e){for(var t=e.source.match(new RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)","g")),n=t.length,r=[],a=0,s=0;a<n;++a)"("===(l=t[a])?++s:"\\"===l.charAt(0)&&(o=+l.substring(1))&&(o<=s?r[o]=-1:t[a]=p(o));for(a=1;a<r.length;++a)-1===r[a]&&(r[a]=++c);for(var o,a=0,s=0;a<n;++a)"("===(l=t[a])?r[++s]||(t[a]="(?:"):"\\"===l.charAt(0)&&(o=+l.substring(1))&&o<=s&&(t[a]="\\"+r[o]);for(a=0;a<n;++a)"^"===t[a]&&"^"!==t[a+1]&&(t[a]="");if(e.ignoreCase&&u)for(a=0;a<n;++a){var l,i=(l=t[a]).charAt(0);2<=l.length&&"["===i?t[a]=function(e){var t=e.substring(1,e.length-1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]","g")),n=[],e="^"===t[0],r=["["];e&&r.push("^");for(var a=e?1:0,s=t.length;a<s;++a){var o,l=t[a];/\\[bdsw]/i.test(l)?r.push(l):(l=d(l),a+2<s&&"-"===t[a+1]?(o=d(t[a+2]),a+=2):o=l,n.push([l,o]),o<65||122<l||(o<65||90<l||n.push([32|Math.max(65,l),32|Math.min(o,90)]),o<97||122<l||n.push([-33&Math.max(97,l),-33&Math.min(o,122)])))}n.sort(function(e,t){return e[0]-t[0]||t[1]-e[1]});for(var i=[],c=[],a=0;a<n.length;++a)(u=n[a])[0]<=c[1]+1?c[1]=Math.max(c[1],u[1]):i.push(c=u);for(a=0;a<i.length;++a){var u=i[a];r.push(p(u[0])),u[1]>u[0]&&(u[1]+1>u[0]&&r.push("-"),r.push(p(u[1])))}return r.push("]"),r.join("")}(l):"\\"!==i&&(t[a]=l.replace(/[a-zA-Z]/g,function(e){e=e.charCodeAt(0);return"["+String.fromCharCode(-33&e,32|e)+"]"}))}return t.join("")}for(var o,l=[],n=0,r=e.length;n<r;++n){if((o=e[n]).global||o.multiline)throw new Error(""+o);l.push("(?:"+s(o)+")")}return new RegExp(l.join("|"),t?"gi":"g")}function Q(e,s){var o=/(?:^|\s)nocode(?:\s|$)/,l=[],i=0,c=[],u=0;return function e(t){var n=t.nodeType;if(1==n){if(!o.test(t.className)){for(var r=t.firstChild;r;r=r.nextSibling)e(r);var a=t.nodeName.toLowerCase();"br"!==a&&"li"!==a||(l[u]="\n",c[u<<1]=i++,c[u++<<1|1]=t)}}else 3!=n&&4!=n||(a=t.nodeValue).length&&(a=s?a.replace(/\r\n?/g,"\n"):a.replace(/[ \t\r\n]+/g," "),l[u]=a,c[u<<1]=i,i+=a.length,c[u++<<1|1]=t)}(e),{sourceCode:l.join("").replace(/\n$/,""),spans:c}}function T(e,t,n,r){t&&(n(n={sourceCode:t,basePos:e}),r.push.apply(r,n.decorations))}function $(e,x){for(var w,S={},t=e.concat(x),n=[],r={},a=0,s=t.length;a<s;++a){var o=t[a],l=o[3];if(l)for(var i=l.length;0<=--i;)S[l.charAt(i)]=o;var c=o[1],u=""+c;r.hasOwnProperty(u)||(n.push(c),r[u]=null)}n.push(/[\0-\uffff]/),w=q(n);function C(e){for(var t=e.sourceCode,n=e.basePos,r=[n,_],a=0,s=t.match(w)||[],o={},l=0,i=s.length;l<i;++l){var c,u=s[l],d=o[u],p=void 0;if("string"==typeof d)c=!1;else{var f=S[u.charAt(0)];if(f)p=u.match(f[1]),d=f[0];else{for(var h=0;h<N;++h)if(f=x[h],p=u.match(f[1])){d=f[0];break}p||(d=_)}!(c=5<=d.length&&"lang-"===d.substring(0,5))||p&&"string"==typeof p[1]||(c=!1,d=k),c||(o[u]=d)}var g,m,y,v,b=a;a+=u.length,c?(g=p[1],y=(m=u.indexOf(g))+g.length,p[2]&&(m=(y=u.length-p[2].length)-g.length),v=d.substring(5),T(n+b,u.substring(0,m),C,r),T(n+b+m,g,Y(v,g),r),T(n+b+y,u.substring(y),C,r)):r.push(n+b,d)}e.decorations=r}var N=x.length;return C}function O(e){var t=[],n=[],r=(e.tripleQuotedStrings?t.push([C,/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,null,"'\""]):e.multiLineStrings?t.push([C,/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,null,"'\"`"]):t.push([C,/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,null,"\"'"]),e.verbatimStrings&&n.push([C,/^@\"(?:[^\"]|\"\")*(?:\"|$)/,null]),e.hashComments),r=(r&&(e.cStyleComments?(t.push(1<r?[N,/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,null,"#"]:[N,/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,null,"#"]),n.push([C,/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,null])):t.push([N,/^#[^\r\n]*/,null,"#"])),e.cStyleComments&&(n.push([N,/^\/\/[^\r\n]*/,null]),n.push([N,/^\/\*[\s\S]*?(?:\*\/|$)/,null])),e.regexLiterals),r=(r&&(a=(r=1<r?"":"\n\r")?".":"[\\S\\s]",n.push(["lang-regex",RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*("+("/(?=[^/*"+r+"])(?:[^/\\x5B\\x5C"+r+"]|\\x5C"+a+"|\\x5B(?:[^\\x5C\\x5D"+r+"]|\\x5C"+a+")*(?:\\x5D|$))+/")+")")])),e.types),a=(r&&n.push(["typ",r]),(""+e.keywords).replace(/^ | $/g,"")),r=(a.length&&n.push(["kwd",new RegExp("^(?:"+a.replace(/[\s,]+/g,"|")+")\\b"),null]),t.push([_,/^\s+/,null," \r\n\t "]),"^.[^\\s\\w.$@'\"`/\\\\]*");return e.regexLiterals&&(r+="(?!s*/)"),n.push(["lit",/^@[a-z_$][a-z_$@0-9]*/i,null],["typ",/^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/,null],[_,/^[a-z_$][a-z_$@0-9]*/i,null],["lit",new RegExp("^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*","i"),null,"0123456789"],[_,/^\\[\s\S]?/,null],[E,new RegExp(r),null]),$(t,n)}function Z(e,t,o){for(var l=/(?:^|\s)nocode(?:\s|$)/,i=/\r\n?|\n/,c=e.ownerDocument,n=c.createElement("li");e.firstChild;)n.appendChild(e.firstChild);var r=[n];function u(e){for(;!e.nextSibling;)if(!(e=e.parentNode))return;for(var t,n=function e(t,n){var n=n?t.cloneNode(!1):t,r=t.parentNode;if(r){var a=e(r,1),s=t.nextSibling;a.appendChild(n);for(var o=s;o;o=s)s=o.nextSibling,a.appendChild(o)}return n}(e.nextSibling,0);(t=n.parentNode)&&1===t.nodeType;)n=t;r.push(n)}for(var a=0;a<r.length;++a)!function e(t){var n,r,a=t.nodeType;if(1!=a||l.test(t.className))3!=a&&4!=a||!o||(n=(a=t.nodeValue).match(i))&&(r=a.substring(0,n.index),t.nodeValue=r,(a=a.substring(n.index+n[0].length))&&t.parentNode.insertBefore(c.createTextNode(a),t.nextSibling),u(t),r||t.parentNode.removeChild(t));else if("br"===t.nodeName)u(t),t.parentNode&&t.parentNode.removeChild(t);else for(var s=t.firstChild;s;s=s.nextSibling)e(s)}(r[a]);t===(0|t)&&r[0].setAttribute("value",t);for(var s=c.createElement("ol"),d=(s.className="linenums",Math.max(0,t-1|0)||0),a=0,p=r.length;a<p;++a)(n=r[a]).className="L"+(a+d)%10,n.firstChild||n.appendChild(c.createTextNode(" ")),s.appendChild(n);e.appendChild(s)}function I(e,t){for(var n=t.length;0<=--n;){var r=t[n];P.hasOwnProperty(r)?R.console&&console.warn("cannot override language handler %s",r):P[r]=e}}function Y(e,t){return e&&P.hasOwnProperty(e)||(e=/^\s*</.test(t)?"default-markup":"default-code"),P[e]}function K(e){var t=e.langExtension;try{var n,r,a=Q(e.sourceNode,e.pre),s=a.sourceCode,o=(e.sourceCode=s,e.spans=a.spans,e.basePos=0,Y(t,s)(e),e),l=(l=/\bMSIE\s(\d+)/.exec(navigator.userAgent))&&+l[1]<=8,i=/\n/g,c=o.sourceCode,u=c.length,d=0,p=o.spans,f=p.length,h=0,g=o.decorations,m=0;for(g[w=g.length]=u,r=n=0;r<w;)g[r]!==g[r+2]?(g[n++]=g[r++],g[n++]=g[r++]):r+=2;for(w=n,r=n=0;r<w;){for(var y=g[r],v=g[r+1],b=r+2;b+2<=w&&g[b+1]===v;)b+=2;g[n++]=y,g[n++]=v,r=b}var x,w=g.length=n;(o=o.sourceNode)&&(x=o.style.display,o.style.display="none");try{for(;h<f;){p[h];var S,C,N,E,_=p[h+2]||u,L=g[m+2]||u,b=Math.min(_,L),k=p[h+1];1!==k.nodeType&&(S=c.substring(d,b))&&(l&&(S=S.replace(i,"\r")),k.nodeValue=S,(N=(C=k.ownerDocument).createElement("span")).className=g[m+1],(E=k.parentNode).replaceChild(N,k),N.appendChild(k),d<_&&(p[h+1]=k=C.createTextNode(c.substring(b,_)),E.insertBefore(k,N.nextSibling))),_<=(d=b)&&(h+=2),L<=d&&(m+=2)}}finally{o&&(o.style.display=x)}}catch(e){R.console&&console.log(e&&e.stack||e)}}function W(e,t,n){var r=document.createElement("div");return r.innerHTML="<pre>"+e+"</pre>",r=r.firstChild,n&&Z(r,n,!0),K({langExtension:t,numberLines:n,sourceNode:r,pre:1}),r.innerHTML}function J(g,e){var t=e||document.body,m=t.ownerDocument||document;function n(e){return t.getElementsByTagName(e)}for(var r=[n("pre"),n("code"),n("xmp")],y=[],a=0;a<r.length;++a)for(var s=0,o=r[a].length;s<o;++s)y.push(r[a][s]);var r=null,v=Date,b=(v.now||(v={now:function(){return+new Date}}),0),x=/\blang(?:uage)?-([\w.]+)(?!\S)/,w=/\bprettyprint\b/,S=/\bprettyprinted\b/,C=/pre|xmp/i,N=/^code$/i,E=/^(?:pre|code|xmp)$/i,_={};!function e(){for(var t=R.PR_SHOULD_USE_CONTINUATION?v.now()+250:1/0;b<y.length&&v.now()<t;b++){for(var n=y[b],r=_,a=n;a=a.previousSibling;){var s=a.nodeType,o=(7===s||8===s)&&a.nodeValue;if(o?!/^\??prettify\b/.test(o):3!==s||/\S/.test(a.nodeValue))break;if(o){r={},o.replace(/\b(\w+)=([\w:.%+-]+)/g,function(e,t,n){r[t]=n});break}}var l=n.className;if((r!==_||w.test(l))&&!S.test(l)){for(var i,c,u,d,p=!1,f=n.parentNode;f;f=f.parentNode){var h=f.tagName;if(E.test(h)&&f.className&&w.test(f.className)){p=!0;break}}p||(n.className+=" prettyprinted",i=(i=r.lang)||(i=!(i=l.match(x))&&(c=function(e){for(var t=void 0,n=e.firstChild;n;n=n.nextSibling)var r=n.nodeType,t=1===r?t?e:n:3===r&&G.test(n.nodeValue)?e:t;return t===e?void 0:t}(n))&&N.test(c.tagName)?c.className.match(x):i)&&i[1],u=C.test(n.tagName)?1:(c=n.currentStyle,u=m.defaultView,(u=c?c.whiteSpace:u&&u.getComputedStyle?u.getComputedStyle(n,null).getPropertyValue("white-space"):0)&&"pre"===u.substring(0,3)),(d=(d="true"===(d=r.linenums)||+d)?d:!!(d=l.match(/\blinenums\b(?::(\d+))?/))&&(!d[1]||!d[1].length||+d[1]))&&Z(n,d,u),K({langExtension:i,sourceNode:n,numberLines:d,pre:u}))}}b<y.length?L(e,250):"function"==typeof g&&g()}()}function X(){if(p){var t=function(){var t=f.length;H(t?function(){for(var e=0;e<t;++e)!function(e){L(function(){c.exports[f[e]].apply(c,arguments)},0)}(e)}:void 0)};function n(){try{d.doScroll("left")}catch(e){return void L(n,50)}i("poll")}var e=u.addEventListener,r=!1,a=!0,s=e?"addEventListener":"attachEvent",o=e?"removeEventListener":"detachEvent",l=e?"":"on",i=function(e){"readystatechange"==e.type&&"complete"!=u.readyState||(("load"==e.type?c:u)[o](l+e.type,i,!1),!r&&(r=!0)&&t.call(c,e.type||e))};if("complete"==u.readyState)t.call(c,"lazy");else{if(u.createEventObject&&d.doScroll){try{a=!c.frameElement}catch(e){}a&&n()}u[s](l+"DOMContentLoaded",i,!1),u[s](l+"readystatechange",i,!1),c[s](l+"load",i,!1)}}}m()}();