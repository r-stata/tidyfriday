(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{690:function(e,u,n){!function(e){"use strict";e.defineMode("apl",function(){var r={".":"innerProduct","\\":"scan","/":"reduce","⌿":"reduce1Axis","⍀":"scan1Axis","¨":"each","⍣":"power"},i={"+":["conjugate","add"],"−":["negate","subtract"],"×":["signOf","multiply"],"÷":["reciprocal","divide"],"⌈":["ceiling","greaterOf"],"⌊":["floor","lesserOf"],"∣":["absolute","residue"],"⍳":["indexGenerate","indexOf"],"?":["roll","deal"],"⋆":["exponentiate","toThePowerOf"],"⍟":["naturalLog","logToTheBase"],"○":["piTimes","circularFuncs"],"!":["factorial","binomial"],"⌹":["matrixInverse","matrixDivide"],"<":[null,"lessThan"],"≤":[null,"lessThanOrEqual"],"=":[null,"equals"],">":[null,"greaterThan"],"≥":[null,"greaterThanOrEqual"],"≠":[null,"notEqual"],"≡":["depth","match"],"≢":[null,"notMatch"],"∈":["enlist","membership"],"⍷":[null,"find"],"∪":["unique","union"],"∩":[null,"intersection"],"∼":["not","without"],"∨":[null,"or"],"∧":[null,"and"],"⍱":[null,"nor"],"⍲":[null,"nand"],"⍴":["shapeOf","reshape"],",":["ravel","catenate"],"⍪":[null,"firstAxisCatenate"],"⌽":["reverse","rotate"],"⊖":["axis1Reverse","axis1Rotate"],"⍉":["transpose",null],"↑":["first","take"],"↓":[null,"drop"],"⊂":["enclose","partitionWithAxis"],"⊃":["diclose","pick"],"⌷":[null,"index"],"⍋":["gradeUp",null],"⍒":["gradeDown",null],"⊤":["encode",null],"⊥":["decode",null],"⍕":["format","formatByExample"],"⍎":["execute",null],"⊣":["stop","left"],"⊢":["pass","right"]},o=/[\.\/\u233f\u2340\xa8\u2363]/,s=/\u236c/,c=/[\+\u2212\xd7\xf7\u2308\u230a\u2223\u2373\?\u22c6\u235f\u25cb!\u2339<\u2264=>\u2265\u2260\u2261\u2262\u2208\u2377\u222a\u2229\u223c\u2228\u2227\u2371\u2372\u2374,\u236a\u233d\u2296\u2349\u2191\u2193\u2282\u2283\u2337\u234b\u2352\u22a4\u22a5\u2355\u234e\u22a3\u22a2]/,p=/\u2190/,d=/[\u235d#].*$/;return{startState:function(){return{prev:!1,func:!1,op:!1,string:!1,escape:!1}},token:function(e,u){var n,t,l,a;return e.eatSpace()?null:'"'===(n=e.next())||"'"===n?(e.eatWhile((l=n,function(e){return(a=e)!==l||"\\"===a})),e.next(),u.prev=!0,"string"):/[\[{\(]/.test(n)?(u.prev=!1,null):/[\]}\)]/.test(n)?(u.prev=!0,null):s.test(n)?(u.prev=!1,"niladic"):/[\xaf\d]/.test(n)?(u.func?(u.func=!1,u.prev=!1):u.prev=!0,e.eatWhile(/[\w\.]/),"number"):o.test(n)?"operator apl-"+r[n]:p.test(n)?"apl-arrow":c.test(n)?(t="apl-",null!=i[n]&&(u.prev?t+=i[n][1]:t+=i[n][0]),u.func=!0,u.prev=!1,"function "+t):d.test(n)?(e.skipToEnd(),"comment"):"∘"===n&&"."===e.peek()?(e.next(),"function jot-dot"):(e.eatWhile(/[\w\$_]/),u.prev=!0,"keyword")}}}),e.defineMIME("text/apl","apl")}(n(34))}}]);