(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{708:function(e,t,a){!function(f){"use strict";f.defineMode("ebnf",function(e){var s=0,i=1,o=0,m=1,u=2,h=null;return e.bracesMode&&(h=f.getMode(e,e.bracesMode)),{startState:function(){return{stringType:null,commentType:null,braced:0,lhs:!0,localState:null,stack:[],inDefinition:!1}},token:function(e,t){if(e){switch(0===t.stack.length&&('"'==e.peek()||"'"==e.peek()?(t.stringType=e.peek(),e.next(),t.stack.unshift(m)):e.match("/*")?(t.stack.unshift(o),t.commentType=s):e.match("(*")&&(t.stack.unshift(o),t.commentType=i)),t.stack[0]){case m:for(;t.stack[0]===m&&!e.eol();)e.peek()===t.stringType?(e.next(),t.stack.shift()):"\\"===e.peek()?(e.next(),e.next()):e.match(/^.[^\\\"\']*/);return t.lhs?"property string":"string";case o:for(;t.stack[0]===o&&!e.eol();)t.commentType===s&&e.match("*/")||t.commentType===i&&e.match("*)")?(t.stack.shift(),t.commentType=null):e.match(/^.[^\*]*/);return"comment";case u:for(;t.stack[0]===u&&!e.eol();)e.match(/^[^\]\\]+/)||e.match(".")||t.stack.shift();return"operator"}var a=e.peek();if(null!==h&&(t.braced||"{"===a)){null===t.localState&&(t.localState=f.startState(h));var c=h.token(e,t.localState),n=e.current();if(!c)for(var r=0;r<n.length;r++)"{"===n[r]?(0===t.braced&&(c="matchingbracket"),t.braced++):"}"===n[r]&&(t.braced--,0===t.braced&&(c="matchingbracket"));return c}switch(a){case"[":return e.next(),t.stack.unshift(u),"bracket";case":":case"|":case";":return e.next(),"operator";case"%":if(e.match("%%"))return"header";if(e.match(/[%][A-Za-z]+/))return"keyword";if(e.match(/[%][}]/))return"matchingbracket";break;case"/":if(e.match(/[\/][A-Za-z]+/))return"keyword";case"\\":if(e.match(/[\][a-z]+/))return"string-2";case".":if(e.match("."))return"atom";case"*":case"-":case"+":case"^":if(e.match(a))return"atom";case"$":if(e.match("$$"))return"builtin";if(e.match(/[$][0-9]+/))return"variable-3";case"<":if(e.match(/<<[a-zA-Z_]+>>/))return"builtin"}return e.match("//")?(e.skipToEnd(),"comment"):e.match("return")?"operator":e.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)?e.match(/(?=[\(.])/)?"variable":e.match(/(?=[\s\n]*[:=])/)?"def":"variable-2":-1!=["[","]","(",")"].indexOf(e.peek())?(e.next(),"bracket"):(e.eatSpace()||e.next(),null)}}}}),f.defineMIME("text/x-ebnf","ebnf")}(a(34))}}]);