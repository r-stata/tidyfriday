!function(){var e,r={},i=new Promise(function(a){$u.xhr({url:"https://api.github.com/repos/PrismJS/prism/git/trees/gh-pages?recursive=1",callback:function(e){e.status<400&&a(JSON.parse(e.responseText).tree)}})}),l=components.languages;for(e in l)"meta"!==e&&!function(a){var t,n=l[a],s=!1;"default"===n.option&&(s=!0),n.enabled=s,n.path=l.meta.path.replace(/\{id}/g,a)+".js",n.examplesPath=l.meta.examplesPath.replace(/\{id}/g,a)+".html",t=n.examplesPath,i.then(function(e){for(var a=0,n=e.length;a<n;a++)if(e[a].path===t)return!0;return!1}).then(function(e){$u.element.create("label",{attributes:{"data-id":a,title:e?"":"No examples are available for this language."},className:e?"":"unavailable",contents:[{tag:"input",properties:{type:"checkbox",name:"language",value:a,checked:s&&e,disabled:!e,onclick:function(){$$('input[name="'+this.name+'"]').forEach(function(e){l[e.value].enabled=e.checked}),o(a)}}},n.title],inside:"#languages"}),r[a]=$u.element.create("section",{id:"language-"+a,className:"language-"+a,inside:"#examples"}),s&&o(a)})}(e);function o(t){var e,a=l[t];a.enabled?(a.examplesPromise||(a.examplesPromise=(e=a.examplesPath,new Promise(function(a,n){$u.xhr({url:e,callback:function(e){e.status<400&&e.responseText?a(e.responseText):n()}})}))),a.examplesPromise.then(function(e){r[t].innerHTML=e,n(t).then(function(){for(var e,a=r[t].querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'),n=0;e=a[n++];)Prism.highlightElement(e)})})):r[t].innerHTML=""}function n(a){e=a;var e=(components.languages[e]&&components.languages[e].require?"array"===$u.type(components.languages[e].require)?components.languages[e].require:[components.languages[e].require]:[]).map(n);return Promise.all(e).then(function(){if(!Prism.languages[a])return new Promise(function(e){$u.script("components/prism-"+a+".js",e)})})}}();