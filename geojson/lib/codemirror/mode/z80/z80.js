CodeMirror.defineMode("z80",function(){var n=/^(exx?|(ld|cp|in)([di]r?)?|pop|push|ad[cd]|cpl|daa|dec|inc|neg|sbc|sub|and|bit|[cs]cf|x?or|res|set|r[lr]c?a?|r[lr]d|s[lr]a|srl|djnz|nop|rst|[de]i|halt|im|ot[di]r|out[di]?)\b/i,i=/^(call|j[pr]|ret[in]?)\b/i,a=/^b_?(call|jump)\b/i,l=/^(af?|bc?|c|de?|e|hl?|l|i[xy]?|r|sp)\b/i,o=/^(n?[zc]|p[oe]?|m)\b/i,u=/^([hl][xy]|i[xy][hl]|slia|sll)\b/i,c=/^([\da-f]+h|[0-7]+o|[01]+b|\d+)\b/i;return{startState:function(){return{context:0}},token:function(e,t){var r;if(e.column()||(t.context=0),!e.eatSpace())if(e.eatWhile(/\w/)){if(r=e.current(),!e.indentation())return c.test(r)?"number":null;if(1==t.context&&l.test(r))return"variable-2";if(2==t.context&&o.test(r))return"variable-3";if(n.test(r))return t.context=1,"keyword";if(i.test(r))return t.context=2,"keyword";if(a.test(r))return t.context=3,"keyword";if(u.test(r))return"error"}else{if(e.eat(";"))return e.skipToEnd(),"comment";if(e.eat('"')){for(;(r=e.next())&&'"'!=r;)"\\"==r&&e.next();return"string"}if(e.eat("'")){if(e.match(/\\?.'/))return"number"}else if(e.eat(".")||e.sol()&&e.eat("#")){if(t.context=4,e.eatWhile(/\w/))return"def"}else if(e.eat("$")){if(e.eatWhile(/[\da-f]/i))return"number"}else if(e.eat("%")){if(e.eatWhile(/[01]/))return"number"}else e.next()}return null}}}),CodeMirror.defineMIME("text/x-z80","z80");