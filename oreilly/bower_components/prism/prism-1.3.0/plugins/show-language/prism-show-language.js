!function(){var i;"undefined"!=typeof self&&self.Prism&&self.document&&(i={css:"CSS",clike:"C-like",javascript:"JavaScript",abap:"ABAP",actionscript:"ActionScript",apacheconf:"Apache Configuration",apl:"APL",applescript:"AppleScript",asciidoc:"AsciiDoc",aspnet:"ASP.NET (C#)",autoit:"AutoIt",autohotkey:"AutoHotkey",basic:"BASIC",csharp:"C#",cpp:"C++",coffeescript:"CoffeeScript","css-extras":"CSS Extras",fsharp:"F#",glsl:"GLSL",http:"HTTP",inform7:"Inform 7",latex:"LaTeX",lolcode:"LOLCODE",matlab:"MATLAB",mel:"MEL",nasm:"NASM",nginx:"nginx",nsis:"NSIS",objectivec:"Objective-C",ocaml:"OCaml",parigp:"PARI/GP",php:"PHP","php-extras":"PHP Extras",powershell:"PowerShell",jsx:"React JSX",rest:"reST (reStructuredText)",sas:"SAS",sass:"Sass (Sass)",scss:"Sass (Scss)",sql:"SQL",typescript:"TypeScript",vhdl:"VHDL",vim:"vim",wiki:"Wiki markup",yaml:"YAML"},Prism.hooks.add("before-highlight",function(e){var a,s,t=e.element.parentNode;t&&/pre/i.test(t.nodeName)&&(e=i[e.language]||e.language.substring(0,1).toUpperCase()+e.language.substring(1),t.setAttribute("data-language",e),(a=t.previousSibling)&&/\s*\bprism-show-language\b\s*/.test(a.className)&&a.firstChild&&/\s*\bprism-show-language-label\b\s*/.test(a.firstChild.className)?(s=a.firstChild).getAttribute("data-language")!==e&&(s.setAttribute("data-language",e),s.innerHTML=e):(a=document.createElement("div"),(s=document.createElement("div")).className="prism-show-language-label",s.setAttribute("data-language",e),s.innerHTML=e,a.className="prism-show-language",a.appendChild(s),t.parentNode.insertBefore(a,t)))}))}();