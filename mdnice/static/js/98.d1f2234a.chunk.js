(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{768:function(t,e,n){!function(t){"use strict";t.defineMode("sparql",function(t){var r,u=t.indentUnit;function e(t){return new RegExp("^(?:"+t.join("|")+")$","i")}var i=e(["str","lang","langmatches","datatype","bound","sameterm","isiri","isuri","iri","uri","bnode","count","sum","min","max","avg","sample","group_concat","rand","abs","ceil","floor","round","concat","substr","strlen","replace","ucase","lcase","encode_for_uri","contains","strstarts","strends","strbefore","strafter","year","month","day","hours","minutes","seconds","timezone","tz","now","uuid","struuid","md5","sha1","sha256","sha384","sha512","coalesce","if","strlang","strdt","isnumeric","regex","exists","isblank","isliteral","a","bind"]),o=e(["base","prefix","select","distinct","reduced","construct","describe","ask","from","named","where","order","limit","offset","filter","optional","graph","by","asc","desc","as","having","undef","values","group","minus","in","not","service","silent","using","insert","delete","union","true","false","with","data","copy","to","move","add","create","drop","clear","load","into"]),a=/[*+\-<>=&|\^\/!\?]/,c=new RegExp("[A-Za-z]"),s=new RegExp("(([A-Za-z_\\-0-9]|\\.)*([A-Za-z_\\-0-9]))?:");function l(t,e){var u,n=t.next();if(r=null,"$"==n||"?"==n)return"?"==n&&t.match(/\s/,!1)?"operator":(t.match(/^[A-Za-z0-9_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][A-Za-z0-9_\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]*/),"variable-2");if("<"==n&&!t.match(/^[\s\u00a0=]/,!1))return t.match(/^[^\s\u00a0>]*>?/),"atom";if('"'==n||"'"==n)return e.tokenize=(u=n,function(t,e){for(var n,r=!1;null!=(n=t.next());){if(n==u&&!r){e.tokenize=l;break}r=!r&&"\\"==n}return"string"}),e.tokenize(t,e);if(/[{}\(\),\.;\[\]]/.test(n))return r=n,"bracket";if("#"==n)return t.skipToEnd(),"comment";if(a.test(n))return"operator";if(":"==n)return d(t),"atom";if("@"==n)return t.eatWhile(/[a-z\d\-]/i),"meta";if(c.test(n)&&t.match(s))return d(t),"atom";t.eatWhile(/[_\w\d]/);e=t.current();return i.test(e)?"builtin":o.test(e)?"keyword":"variable"}function d(t){t.match(/(\.(?=[\w_\-\\%])|[:\w_-]|\\[-\\_~.!$&'()*+,;=/?#@%]|%[a-f\d][a-f\d])+/i)}function p(t,e,n){t.context={prev:t.context,indent:t.indent,col:n,type:e}}function f(t){t.indent=t.context.indent,t.context=t.context.prev}return{startState:function(){return{tokenize:l,context:null,indent:0,col:0}},token:function(t,e){if(t.sol()&&(e.context&&null==e.context.align&&(e.context.align=!1),e.indent=t.indentation()),t.eatSpace())return null;var n=e.tokenize(t,e);if("comment"!=n&&e.context&&null==e.context.align&&"pattern"!=e.context.type&&(e.context.align=!0),"("==r)p(e,")",t.column());else if("["==r)p(e,"]",t.column());else if("{"==r)p(e,"}",t.column());else if(/[\]\}\)]/.test(r)){for(;e.context&&"pattern"==e.context.type;)f(e);e.context&&r==e.context.type&&(f(e),"}"==r&&e.context&&"pattern"==e.context.type&&f(e))}else"."==r&&e.context&&"pattern"==e.context.type?f(e):/atom|string|variable/.test(n)&&e.context&&(/[\}\]]/.test(e.context.type)?p(e,"pattern",t.column()):"pattern"!=e.context.type||e.context.align||(e.context.align=!0,e.context.col=t.column()));return n},indent:function(t,e){var e=e&&e.charAt(0),n=t.context;if(/[\]\}]/.test(e))for(;n&&"pattern"==n.type;)n=n.prev;t=n&&e==n.type;return n?"pattern"==n.type?n.col:n.align?n.col+(t?0:1):n.indent+(t?0:u):0},lineComment:"#"}}),t.defineMIME("application/sparql-query","sparql")}(n(34))}}]);