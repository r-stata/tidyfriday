(window.webpackJsonp=window.webpackJsonp||[]).push([[93],{761:function(e,t,n){!function(s){"use strict";s.defineMode("shell",function(){var i={};function e(e,t){for(var n=0;n<t.length;n++)i[t[n]]=e}var t=["true","false"],n=["if","then","do","else","elif","while","until","for","in","esac","fi","fin","fil","done","exit","set","unset","export","function"],r=["ab","awk","bash","beep","cat","cc","cd","chown","chmod","chroot","clear","cp","curl","cut","diff","echo","find","gawk","gcc","get","git","grep","hg","kill","killall","ln","ls","make","mkdir","openssl","mv","nc","nl","node","npm","ping","ps","restart","rm","rmdir","sed","service","sh","shopt","shred","source","sort","sleep","ssh","start","stop","su","sudo","svn","tee","telnet","top","touch","vi","vim","wall","wc","wget","who","write","yes","zsh"];function u(s,i){var o="("==s?")":"{"==s?"}":s;return function(e,t){for(var n,r=!1;null!=(n=e.next());){if(n===o&&!r){t.tokens.shift();break}if("$"===n&&!r&&"'"!==s&&e.peek()!=o){r=!0,e.backUp(1),t.tokens.unshift(f);break}if(!r&&s!==o&&n===s)return t.tokens.unshift(u(s,i)),l(e,t);if(!r&&/['"]/.test(n)&&!/['"]/.test(s)){t.tokens.unshift(function(n,r){return function(e,t){return t.tokens[0]=u(n,r),e.next(),l(e,t)}}(n,"string")),e.backUp(1);break}r=!r&&"\\"===n}return i}}s.registerHelper("hintWords","shell",t.concat(n,r)),e("atom",t),e("keyword",n),e("builtin",r);var f=function(e,t){1<t.tokens.length&&e.eat("$");var n=e.next();return/['"({]/.test(n)?(t.tokens[0]=u(n,"("==n?"quote":"{"==n?"def":"string"),l(e,t)):(/\d/.test(n)||e.eatWhile(/\w/),t.tokens.shift(),"def")};function l(e,t){return(t.tokens[0]||function(e,t){if(e.eatSpace())return null;var n,r=e.sol(),s=e.next();if("\\"===s)return e.next(),null;if("'"===s||'"'===s||"`"===s)return t.tokens.unshift(u(s,"`"===s?"quote":"string")),l(e,t);if("#"===s)return r&&e.eat("!")?(e.skipToEnd(),"meta"):(e.skipToEnd(),"comment");if("$"===s)return t.tokens.unshift(f),l(e,t);if("+"===s||"="===s)return"operator";if("-"===s)return e.eat("-"),e.eatWhile(/\w/),"attribute";if("<"==s){if(e.match("<<"))return"operator";r=e.match(/^<-?\s*['"]?([^'"]*)['"]?/);if(r)return t.tokens.unshift((n=r[1],function(e,t){return e.sol()&&e.string==n&&t.tokens.shift(),e.skipToEnd(),"string-2"})),"string-2"}if(/\d/.test(s)&&(e.eatWhile(/\d/),e.eol()||!/\w/.test(e.peek())))return"number";e.eatWhile(/[\w-]/);t=e.current();return"="===e.peek()&&/\w+/.test(t)?"def":i.hasOwnProperty(t)?i[t]:null})(e,t)}return{startState:function(){return{tokens:[]}},token:l,closeBrackets:"()[]{}''\"\"``",lineComment:"#",fold:"brace"}}),s.defineMIME("text/x-sh","shell"),s.defineMIME("application/x-sh","shell")}(n(34))}}]);