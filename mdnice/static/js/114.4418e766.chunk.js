(window.webpackJsonp=window.webpackJsonp||[]).push([[114],{785:function(e,t,n){!function(e){"use strict";e.defineMode("velocity",function(){function e(e){for(var t={},n=e.split(" "),r=0;r<n.length;++r)t[n[r]]=!0;return t}var a=e("#end #else #break #stop #[[ #]] #{end} #{else} #{break} #{stop}"),i=e("#if #elseif #foreach #set #include #parse #macro #define #evaluate #{if} #{elseif} #{foreach} #{set} #{include} #{parse} #{macro} #{define} #{evaluate}"),o=e("$foreach.count $foreach.hasNext $foreach.first $foreach.last $foreach.topmost $foreach.parent.count $foreach.parent.hasNext $foreach.parent.first $foreach.parent.last $foreach.parent $velocityCount $!bodyContent $bodyContent"),s=/[+\-*&%=<>!?:\/|]/;function l(e,t,n){return(t.tokenize=n)(e,t)}function u(e,t){var n=t.beforeParams,r=(t.beforeParams=!1,e.next());if("'"==r&&!t.inString&&t.inParams)return t.lastTokenWasBuiltin=!1,l(e,t,f(r));if('"'==r)return t.lastTokenWasBuiltin=!1,t.inString?(t.inString=!1,"string"):t.inParams?l(e,t,f(r)):void 0;if(/[\[\]{}\(\),;\.]/.test(r))return"("==r&&n?t.inParams=!0:")"==r&&(t.inParams=!1,t.lastTokenWasBuiltin=!0),null;if(/\d/.test(r))return t.lastTokenWasBuiltin=!1,e.eatWhile(/[\w\.]/),"number";if("#"==r&&e.eat("*"))return t.lastTokenWasBuiltin=!1,l(e,t,c);if("#"==r&&e.match(/ *\[ *\[/))return t.lastTokenWasBuiltin=!1,l(e,t,k);if("#"==r&&e.eat("#"))return t.lastTokenWasBuiltin=!1,e.skipToEnd(),"comment";if("$"==r)return e.eat("!"),e.eatWhile(/[\w\d\$_\.{}-]/),o&&o.propertyIsEnumerable(e.current())?"keyword":(t.lastTokenWasBuiltin=!0,t.beforeParams=!0,"builtin");if(s.test(r))return t.lastTokenWasBuiltin=!1,e.eatWhile(s),"operator";e.eatWhile(/[\w\$_{}@]/);n=e.current();return a&&a.propertyIsEnumerable(n)?"keyword":i&&i.propertyIsEnumerable(n)||e.current().match(/^#@?[a-z0-9_]+ *$/i)&&"("==e.peek()&&(!i||!i.propertyIsEnumerable(n.toLowerCase()))?(t.beforeParams=!0,t.lastTokenWasBuiltin=!1,"keyword"):t.inString?(t.lastTokenWasBuiltin=!1,"string"):e.pos>n.length&&"."==e.string.charAt(e.pos-n.length-1)&&t.lastTokenWasBuiltin?"builtin":(t.lastTokenWasBuiltin=!1,null)}function f(i){return function(e,t){for(var n,r=!1,a=!1;null!=(n=e.next());){if(n==i&&!r){a=!0;break}if('"'==i&&"$"==e.peek()&&!r){a=t.inString=!0;break}r=!r&&"\\"==n}return a&&(t.tokenize=u),"string"}}function c(e,t){for(var n,r=!1;n=e.next();){if("#"==n&&r){t.tokenize=u;break}r="*"==n}return"comment"}function k(e,t){for(var n,r=0;n=e.next();){if("#"==n&&2==r){t.tokenize=u;break}"]"==n?r++:" "!=n&&(r=0)}return"meta"}return{startState:function(){return{tokenize:u,beforeParams:!1,inParams:!1,inString:!1,lastTokenWasBuiltin:!1}},token:function(e,t){return e.eatSpace()?null:t.tokenize(e,t)},blockCommentStart:"#*",blockCommentEnd:"*#",lineComment:"##",fold:"velocity"}}),e.defineMIME("text/velocity","velocity")}(n(34))}}]);