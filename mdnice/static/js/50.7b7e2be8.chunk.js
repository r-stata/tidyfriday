(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{712:function(e,t,n){!function(q){"use strict";q.defineMIME("text/x-erlang","erlang"),q.defineMode("erlang",function(c){var o=["-type","-spec","-export_type","-opaque"],a=["after","begin","catch","case","cond","end","fun","if","let","of","query","receive","try","when"],s=/[\->,;]/,u=["->",";",","],l=["and","andalso","band","bnot","bor","bsl","bsr","bxor","div","not","or","orelse","rem","xor"],_=/[\+\-\*\/<>=\|:!]/,f=["=","+","-","*","/",">",">=","<","=<","=:=","==","=/=","/=","||","<-","!"],p=/[<\(\[\{]/,d=["<<","(","[","{"],m=/[>\)\]\}]/,b=["}","]",")",">>"],k=["is_atom","is_binary","is_bitstring","is_boolean","is_float","is_function","is_integer","is_list","is_number","is_pid","is_port","is_record","is_reference","is_tuple","atom","binary","bitstring","boolean","function","integer","list","number","pid","port","record","reference","tuple"],g=["abs","adler32","adler32_combine","alive","apply","atom_to_binary","atom_to_list","binary_to_atom","binary_to_existing_atom","binary_to_list","binary_to_term","bit_size","bitstring_to_list","byte_size","check_process_code","contact_binary","crc32","crc32_combine","date","decode_packet","delete_module","disconnect_node","element","erase","exit","float","float_to_list","garbage_collect","get","get_keys","group_leader","halt","hd","integer_to_list","internal_bif","iolist_size","iolist_to_binary","is_alive","is_atom","is_binary","is_bitstring","is_boolean","is_float","is_function","is_integer","is_list","is_number","is_pid","is_port","is_process_alive","is_record","is_reference","is_tuple","length","link","list_to_atom","list_to_binary","list_to_bitstring","list_to_existing_atom","list_to_float","list_to_integer","list_to_pid","list_to_tuple","load_module","make_ref","module_loaded","monitor_node","node","node_link","node_unlink","nodes","notalive","now","open_port","pid_to_list","port_close","port_command","port_connect","port_control","pre_loaded","process_flag","process_info","processes","purge_module","put","register","registered","round","self","setelement","size","spawn","spawn_link","spawn_monitor","spawn_opt","split_binary","statistics","term_to_binary","time","throw","tl","trunc","tuple_size","tuple_to_list","unlink","unregister","whereis"],h=/[\w@\xd8-\xde\xc0-\xd6\xdf-\xf6\xf8-\xff]/,y=/[0-7]{1,3}|[bdefnrstv\\"']|\^[a-zA-Z]|x[0-9a-zA-Z]{2}|x{[0-9a-zA-Z]+}/;function x(e,t,n){if(1==e.current().length&&t.test(e.current())){for(e.backUp(1);t.test(e.peek());)if(e.next(),z(e.current(),n))return 1;e.backUp(e.current().length-1)}}function w(e,t,n){if(1==e.current().length&&t.test(e.current())){for(;t.test(e.peek());)e.next();for(;0<e.current().length;){if(z(e.current(),n))return 1;e.backUp(1)}e.next()}}function v(e){return t(e,'"',"\\")}function S(e){return t(e,"'","\\")}function t(e,t,n){for(;!e.eol();){var r=e.next();if(r==t)return!0;r==n&&e.next()}return!1}function z(e,t){return-1<t.indexOf(e)}function W(e,t,n){switch(e=e,i=n,"comment"!=(t=U((t=t).current(),t.column(),t.indentation(),i)).type&&"whitespace"!=t.type&&(e.tokenStack=(i=e.tokenStack,t=t,0<(r=i.length-1)&&"record"===i[r].type&&"dot"===t.type?i.pop():(0<r&&"group"===i[r].type&&i.pop(),i.push(t)),i),e.tokenStack=function(e){if(!e.length)return e;var t=e.length-1;if("dot"===e[t].type)return[];if(1<t&&"fun"===e[t].type&&"fun"===e[t-1].token)return e.slice(0,t-1);switch(e[t].token){case"}":return A(e,{g:["{"]});case"]":return A(e,{i:["["]});case")":return A(e,{i:["("]});case">>":return A(e,{i:["<<"]});case"end":return A(e,{i:["begin","case","fun","if","receive","try"]});case",":return A(e,{e:["begin","try","when","->",",","(","[","{","<<"]});case"->":return A(e,{r:["when"],m:["try","if","case","receive"]});case";":return A(e,{E:["case","fun","if","receive","try","when"]});case"catch":return A(e,{e:["try"]});case"of":return A(e,{e:["case"]});case"after":return A(e,{e:["receive","try"]});default:return e}}(e.tokenStack)),n){case"atom":return"atom";case"attribute":return"attribute";case"boolean":return"atom";case"builtin":return"builtin";case"close_paren":case"colon":return null;case"comment":return"comment";case"dot":return null;case"error":return"error";case"fun":return"meta";case"function":return"tag";case"guard":return"property";case"keyword":return"keyword";case"macro":return"variable-2";case"number":return"number";case"open_paren":return null;case"operator":return"operator";case"record":return"bracket";case"separator":return null;case"string":return"string";case"type":return"def";case"variable":return"variable";default:return null}var r,i}function U(e,t,n,r){return{token:e,column:t,indent:n,type:r}}function E(e,t){var n=e.tokenStack.length,t=t||1;return!(n<t)&&e.tokenStack[n-t]}function A(e,t){for(var n in t)for(var r=e.length-1,i=t[n],o=r-1;-1<o;o--)if(z(e[o].token,i)){var a=e.slice(0,o);switch(n){case"m":return a.concat(e[o]).concat(e[r]);case"r":return a.concat(e[r]);case"i":return a;case"g":return a.concat(U(c="group",0,0,c));case"E":case"e":return a.concat(e[o])}}var c;return"E"==n?[]:e}function Z(e,t){e=e.tokenStack,t=M(e,"token",t);return!!P(e[t])&&e[t]}function M(e,t,n){for(var r=e.length-1;-1<r;r--)if(z(e[r][t],n))return r;return!1}function P(e){return!1!==e&&null!=e}return{startState:function(){return{tokenStack:[],in_string:!1,in_atom:!1}},token:function(e,t){if(t.in_string)return t.in_string=!v(e),W(t,e,"string");if(t.in_atom)t.in_atom=!S(e);else{if(e.eatSpace())return W(t,e,"whitespace");if(!E(t)&&e.match(/-\s*[a-z\xdf-\xf6\xf8-\xff][\w\xd8-\xde\xc0-\xd6\xdf-\xf6\xf8-\xff]*/))return z(e.current(),o)?W(t,e,"type"):W(t,e,"attribute");var n,r,i=e.next();if("%"==i)return e.skipToEnd(),W(t,e,"comment");if(":"==i)return W(t,e,"colon");if("?"==i)return e.eatSpace(),e.eatWhile(h),W(t,e,"macro");if("#"==i)return e.eatSpace(),e.eatWhile(h),W(t,e,"record");if("$"==i)return"\\"!=e.next()||e.match(y)?W(t,e,"number"):W(t,e,"error");if("."==i)return W(t,e,"dot");if("'"!=i)return'"'==i?(t.in_string=!v(e),W(t,e,"string")):/[A-Z_\xd8-\xde\xc0-\xd6]/.test(i)?(e.eatWhile(h),W(t,e,"variable")):/[a-z_\xdf-\xf6\xf8-\xff]/.test(i)?(e.eatWhile(h),e.match(/\s*\/\s*[0-9]/,!1)?(e.match(/\s*\/\s*[0-9]/,!0),W(t,e,"fun")):z(n=e.current(),a)?W(t,e,"keyword"):z(n,l)?W(t,e,"operator"):e.match(/\s*\(/,!1)?!z(n,g)||":"==E(t).token&&"erlang"!=E(t,2).token?z(n,k)?W(t,e,"guard"):W(t,e,"function"):W(t,e,"builtin"):":"==((r=e.match(/^\s*([^\s%])/,!1))?r[1]:"")?W(t,e,"erlang"==n?"builtin":"function"):z(n,["true","false"])?W(t,e,"boolean"):W(t,e,"atom")):(r=/[0-9]/).test(i)?(e.eatWhile(r),e.eat("#")?e.eatWhile(/[0-9a-zA-Z]/)||e.backUp(1):e.eat(".")&&(e.eatWhile(r)?e.eat(/[eE]/)&&(e.eat(/[-+]/)?e.eatWhile(r)||e.backUp(2):e.eatWhile(r)||e.backUp(1)):e.backUp(1)),W(t,e,"number")):x(e,p,d)?W(t,e,"open_paren"):x(e,m,b)?W(t,e,"close_paren"):w(e,s,u)?W(t,e,"separator"):w(e,_,f)?W(t,e,"operator"):W(t,e,null);if(!(t.in_atom=!S(e))){if(e.match(/\s*\/\s*[0-9]/,!1))return e.match(/\s*\/\s*[0-9]/,!0),W(t,e,"fun");if(e.match(/\s*\(/,!1)||e.match(/\s*:/,!1))return W(t,e,"function")}}return W(t,e,"atom")},indent:function(e,t){return e=e,t=t,i=c.indentUnit,t=P(t=t.match(/,|[a-z]+|\}|\]|\)|>>|\|+|\(/))&&0===t.index?t[0]:"",o=E(e,1),a=E(e,2),e.in_string||e.in_atom?q.Pass:a?"when"==o.token?o.column+i:"when"===t&&"function"===a.type?a.indent+i:"("===t&&"fun"===o.token?o.column+3:"catch"===t&&(n=Z(e,["try"]))?n.column:z(t,["end","after","of"])?(n=Z(e,["begin","case","fun","if","receive","try"]))?n.column:q.Pass:z(t,b)?(n=Z(e,d))?n.column:q.Pass:z(o.token,[",","|","||"])||z(t,[",","|","||"])?(t=e.tokenStack.slice(0,-1),r=M(t,"type",["open_paren"]),(n=!!P(t[r])&&t[r])?n.column+n.token.length:i):"->"==o.token?z(a.token,["receive","case","if","try"])?a.column+i+i:a.column+i:z(o.token,d)?o.column+o.token.length:(t=e.tokenStack,r=M(t,"type",["open_paren","separator","keyword"]),a=M(t,"type",["operator"]),n=P(r)&&P(a)&&r<a?t[r+1]:!!P(r)&&t[r],P(n)?n.column+i:0):0;var n,r,i,o,a},lineComment:"%"}})}(n(34))}}]);