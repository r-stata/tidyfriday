(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{734:function(e,n,r){!function(e){"use strict";var n=["From","Sender","Reply-To","To","Cc","Bcc","Message-ID","In-Reply-To","References","Resent-From","Resent-Sender","Resent-To","Resent-Cc","Resent-Bcc","Resent-Message-ID","Return-Path","Received"],r=["Date","Subject","Comments","Keywords","Resent-Date"],a=(e.registerHelper("hintWords","mbox",n.concat(r)),/^[ \t]/),i=/^From /,o=new RegExp("^("+n.join("|")+"): "),d=new RegExp("^("+r.join("|")+"): "),s=/^[^:]+:/,c=/^[^ ]+@[^ ]+/,m=/^.*?(?=[^ ]+?@[^ ]+)/,u=/^<.*?>/,l=/^.*?(?=<.*>)/;function t(e,n){var r;if(e.sol())return n.inSeparator=!1,n.inHeader&&e.match(a)?null:(n.inHeader=!1,n.header=null,e.match(i)?(n.inHeaders=!0,n.inSeparator=!0,"atom"):(t=!1,(r=e.match(d))||(t=!0,r=e.match(o))?(n.inHeaders=!0,n.inHeader=!0,n.emailPermitted=t,n.header=r[1],"atom"):n.inHeaders&&(r=e.match(s))?(n.inHeader=!0,n.emailPermitted=!0,n.header=r[1],"atom"):(n.inHeaders=!1,e.skipToEnd(),null)));if(n.inSeparator)return e.match(c)?"link":(e.match(m)||e.skipToEnd(),"atom");if(n.inHeader){var t="Subject"===n.header?"header":"string";if(n.emailPermitted){if(e.match(u))return t+" link";if(e.match(l))return t}return e.skipToEnd(),t}return e.skipToEnd(),null}e.defineMode("mbox",function(){return{startState:function(){return{inSeparator:!1,inHeader:!1,emailPermitted:!1,header:null,inHeaders:!1}},token:t,blankLine:function(e){e.inHeaders=e.inSeparator=e.inHeader=!1}}}),e.defineMIME("application/mbox","mbox")}(r(34))}}]);