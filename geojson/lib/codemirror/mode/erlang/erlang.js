CodeMirror.defineMIME("text/x-erlang","erlang"),CodeMirror.defineMode("erlang",function(i){function o(e,t,n){switch(e.context="record"==n&&"record","whitespace"!=n&&"comment"!=n&&(e.lastToken=t.current()),n){case"atom":return"atom";case"attribute":return"attribute";case"builtin":return"builtin";case"comment":return"comment";case"fun":return"meta";case"function":return"tag";case"guard":return"property";case"keyword":return"keyword";case"macro":return"variable-2";case"number":return"number";case"operator":return"operator";case"record":return"bracket";case"string":return"string";case"type":return"def";case"variable":return"variable";case"error":return"error";default:return null}}var a=["-type","-spec","-export_type","-opaque"],s=["after","begin","catch","case","cond","end","fun","if","let","of","query","receive","try","when"],c=["->",";",":",".",","],l=["and","andalso","band","bnot","bor","bsl","bsr","bxor","div","not","or","orelse","rem","xor"],u=["+","-","*","/",">",">=","<","=<","=:=","==","=/=","/=","||","<-"],_=["<<","(","[","{"],d=["}","]",")",">>"],p=["is_atom","is_binary","is_bitstring","is_boolean","is_float","is_function","is_integer","is_list","is_number","is_pid","is_port","is_record","is_reference","is_tuple","atom","binary","bitstring","boolean","function","integer","list","number","pid","port","record","reference","tuple"],f=["abs","adler32","adler32_combine","alive","apply","atom_to_binary","atom_to_list","binary_to_atom","binary_to_existing_atom","binary_to_list","binary_to_term","bit_size","bitstring_to_list","byte_size","check_process_code","contact_binary","crc32","crc32_combine","date","decode_packet","delete_module","disconnect_node","element","erase","exit","float","float_to_list","garbage_collect","get","get_keys","group_leader","halt","hd","integer_to_list","internal_bif","iolist_size","iolist_to_binary","is_alive","is_atom","is_binary","is_bitstring","is_boolean","is_float","is_function","is_integer","is_list","is_number","is_pid","is_port","is_process_alive","is_record","is_reference","is_tuple","length","link","list_to_atom","list_to_binary","list_to_bitstring","list_to_existing_atom","list_to_float","list_to_integer","list_to_pid","list_to_tuple","load_module","make_ref","module_loaded","monitor_node","node","node_link","node_unlink","nodes","notalive","now","open_port","pid_to_list","port_close","port_command","port_connect","port_control","pre_loaded","process_flag","process_info","processes","purge_module","put","register","registered","round","self","setelement","size","spawn","spawn_link","spawn_monitor","spawn_opt","split_binary","statistics","term_to_binary","time","throw","tl","trunc","tuple_size","tuple_to_list","unlink","unregister","whereis"],b=[",",":","catch","after","of","cond","let","query"],m=/[a-z_]/,g=/[A-Z_]/,k=/[0-9]/,h=/[0-7]/,y=/[a-z_A-Z0-9]/,x=/[\+\-\*\/<>=\|:]/,w=/[<\(\[\{]/,v=/[>\)\]\}]/,W=/[\->\.,:;]/;function z(e,t){return-1<t.indexOf(e)}function S(e,t){var n=e.start,r=t.length;return r<=n&&e.string.slice(n-r,n)==t}function e(e,t){if(e.eatSpace())return o(t,e,"whitespace");if((""==T(t).token||"."==T(t).token)&&"-"==e.peek()){if(e.next(),e.eat(m)&&e.eatWhile(y))return z(e.current(),a)?o(t,e,"type"):o(t,e,"attribute");e.backUp(1)}var n,r=e.next();return"%"==r?(e.skipToEnd(),o(t,e,"comment")):"?"==r?(e.eatWhile(y),o(t,e,"macro")):"#"==r?(e.eatWhile(y),o(t,e,"record")):"$"==r?("\\"!=e.next()||e.eatWhile(h)||e.next(),o(t,e,"string")):"'"==r?q(e,"'","\\")?o(t,e,"atom"):o(t,e,"error"):'"'==r?q(e,'"',"\\")?o(t,e,"string"):o(t,e,"error"):g.test(r)?(e.eatWhile(y),o(t,e,"variable")):m.test(r)?(e.eatWhile(y),"/"==e.peek()?(e.next(),e.eatWhile(k)?o(t,e,"fun"):(e.backUp(1),o(t,e,"atom"))):z(n=e.current(),s)?(A(t,e),o(t,e,"keyword")):"("==e.peek()?!z(n,f)||S(e,":")&&!S(e,"erlang:")?o(t,e,"function"):o(t,e,"builtin"):z(n,p)?o(t,e,"guard"):z(n,l)?o(t,e,"operator"):":"==e.peek()?o(t,e,"erlang"==n?"builtin":"function"):o(t,e,"atom")):k.test(r)?(e.eatWhile(k),e.eat("#")?e.eatWhile(k):(e.eat(".")&&e.eatWhile(k),e.eat(/[eE]/)&&(e.eat(/[-+]/),e.eatWhile(k))),o(t,e,"number")):U(e,w,_)?(A(t,e),o(t,e,"open_paren")):U(e,v,d)?(A(t,e),o(t,e,"close_paren")):M(e,W,c)?(0==t.context&&A(t,e),o(t,e,"separator")):M(e,x,u)?o(t,e,"operator"):o(t,e,null)}function U(e,t,n){if(1==e.current().length&&t.test(e.current())){for(e.backUp(1);t.test(e.peek());)if(e.next(),z(e.current(),n))return 1;e.backUp(e.current().length-1)}}function M(e,t,n){if(1==e.current().length&&t.test(e.current())){for(;t.test(e.peek());)e.next();for(;0<e.current().length;){if(z(e.current(),n))return 1;e.backUp(1)}e.next()}}function q(e,t,n){for(;!e.eol();){var r=e.next();if(r==t)return!0;r==n&&e.next()}return!1}function C(e){this.token=e?e.current():"",this.column=e?e.column():0,this.indent=e?e.indentation():0}function t(e,t){var n=i.indentUnit,r=T(e).token,t=function(e,t){t=e.match(t);return t?e.slice(0,t.index):e}(t,/[^a-z]/);return z(r,_)?T(e).column+r.length:"."==r||""==r?0:"->"==r?"end"==t?T(e,2).column:"fun"==T(e,2).token?T(e,2).column+n:T(e).indent+n:z(t,["after","catch"])?T(e).indent:T(e).column+n}function E(e){e.tokenStack.pop()}function T(e,t){var n=e.tokenStack.length,t=t||1;return n<t?new C:e.tokenStack[n-t]}function A(e,t){var n=t.current(),r=T(e).token;return!z(n,b)&&(function(e,t){switch(e+" "+t){case"( )":case"[ ]":case"{ }":case"<< >>":case"begin end":case"case end":case"fun end":case"if end":case"receive end":case"try end":case"-> ;":return 1;default:return}}(r,n)?(E(e),!1):function(e,t){switch(e+" "+t){case"when ->":case"-> end":case"-> .":case". .":return 1;default:return}}(r,n)?(E(e),A(e,t)):(e.tokenStack.push(new C(t)),!0))}return{startState:function(){return{tokenStack:[],context:!1,lastToken:null}},token:e,indent:t,lineComment:"%"}});