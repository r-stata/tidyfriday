!function(){function f(o,e,r){o=o.getWrapperElement().appendChild(document.createElement("div"));return o.className=r?"CodeMirror-dialog CodeMirror-dialog-bottom":"CodeMirror-dialog CodeMirror-dialog-top",o.innerHTML=e,o}CodeMirror.defineExtension("openDialog",function(o,e,r){var n=f(this,o,r&&r.bottom),i=!1,t=this;function u(){i||(i=!0,n.parentNode.removeChild(n))}var d=n.getElementsByTagName("input")[0];return d?(CodeMirror.on(d,"keydown",function(o){r&&r.onKeyDown&&r.onKeyDown(o,d.value,u)||13!=o.keyCode&&27!=o.keyCode||(CodeMirror.e_stop(o),u(),t.focus(),13==o.keyCode&&e(d.value))}),r&&r.onKeyUp&&CodeMirror.on(d,"keyup",function(o){r.onKeyUp(o,d.value,u)}),r&&r.value&&(d.value=r.value),d.focus(),CodeMirror.on(d,"blur",u)):(o=n.getElementsByTagName("button")[0])&&(CodeMirror.on(o,"click",function(){u(),t.focus()}),o.focus(),CodeMirror.on(o,"blur",u)),u}),CodeMirror.defineExtension("openConfirm",function(o,e,r){var n=f(this,o,r&&r.bottom),i=n.getElementsByTagName("button"),t=!1,u=this,d=1;function a(){t||(t=!0,n.parentNode.removeChild(n),u.focus())}i[0].focus();for(var c=0;c<i.length;++c){var l=i[c];!function(e){CodeMirror.on(l,"click",function(o){CodeMirror.e_preventDefault(o),a(),e&&e(u)})}(e[c]),CodeMirror.on(l,"blur",function(){--d,setTimeout(function(){d<=0&&a()},200)}),CodeMirror.on(l,"focus",function(){++d})}})}();