define(["../core","../var/support","../ajax"],function(e,t){e.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var i=0,u={},d={0:200,1223:204},r=e.ajaxSettings.xhr();window.attachEvent&&window.attachEvent("onunload",function(){for(var e in u)u[e]()}),t.cors=!!r&&"withCredentials"in r,t.ajax=r=!!r,e.ajaxTransport(function(a){var s;if(t.cors||r&&!a.crossDomain)return{send:function(e,t){var r,n=a.xhr(),o=++i;if(n.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(r in a.xhrFields)n[r]=a.xhrFields[r];for(r in a.mimeType&&n.overrideMimeType&&n.overrideMimeType(a.mimeType),a.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)n.setRequestHeader(r,e[r]);s=function(e){return function(){s&&(delete u[o],s=n.onload=n.onerror=null,"abort"===e?n.abort():"error"===e?t(n.status,n.statusText):t(d[n.status]||n.status,n.statusText,"string"==typeof n.responseText?{text:n.responseText}:void 0,n.getAllResponseHeaders()))}},n.onload=s(),n.onerror=s("error"),s=u[o]=s("abort");try{n.send(a.hasContent&&a.data||null)}catch(e){if(s)throw e}},abort:function(){s&&s()}}})});