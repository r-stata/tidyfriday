define(["./core","./var/deletedIds","./data/support","./data/accepts"],function(f,u,c){var o=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,r=/([A-Z])/g;function i(t,e,a){if(void 0===a&&1===t.nodeType){var n="data-"+e.replace(r,"-$1").toLowerCase();if("string"==typeof(a=t.getAttribute(n))){try{a="true"===a||"false"!==a&&("null"===a?null:+a+""===a?+a:o.test(a)?f.parseJSON(a):a)}catch(t){}f.data(t,e,a)}else a=void 0}return a}function s(t){for(var e in t)if(("data"!==e||!f.isEmptyObject(t[e]))&&"toJSON"!==e)return;return 1}function n(t,e,a,n){if(f.acceptData(t)){var o,r=f.expando,d=t.nodeType,i=d?f.cache:t,c=d?t[r]:t[r]&&r;if(c&&i[c]&&(n||i[c].data)||void 0!==a||"string"!=typeof e)return i[c=c||(d?t[r]=u.pop()||f.guid++:r)]||(i[c]=d?{}:{toJSON:f.noop}),"object"!=typeof e&&"function"!=typeof e||(n?i[c]=f.extend(i[c],e):i[c].data=f.extend(i[c].data,e)),t=i[c],n||(t.data||(t.data={}),t=t.data),void 0!==a&&(t[f.camelCase(e)]=a),"string"==typeof e?null==(o=t[e])&&(o=t[f.camelCase(e)]):o=t,o}}function a(t,e,a){if(f.acceptData(t)){var n,o,r=t.nodeType,d=r?f.cache:t,i=r?t[f.expando]:f.expando;if(d[i]){if(e&&(n=a?d[i]:d[i].data)){o=(e=f.isArray(e)?e.concat(f.map(e,f.camelCase)):e in n||(e=f.camelCase(e))in n?[e]:e.split(" ")).length;for(;o--;)delete n[e[o]];if(a?!s(n):!f.isEmptyObject(n))return}(a||(delete d[i].data,s(d[i])))&&(r?f.cleanData([t],!0):c.deleteExpando||d!=d.window?delete d[i]:d[i]=null)}}}return f.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(t){return!!(t=t.nodeType?f.cache[t[f.expando]]:t[f.expando])&&!s(t)},data:function(t,e,a){return n(t,e,a)},removeData:function(t,e){return a(t,e)},_data:function(t,e,a){return n(t,e,a,!0)},_removeData:function(t,e){return a(t,e,!0)}}),f.fn.extend({data:function(t,e){var a,n,o,r=this[0],d=r&&r.attributes;if(void 0!==t)return"object"==typeof t?this.each(function(){f.data(this,t)}):1<arguments.length?this.each(function(){f.data(this,t,e)}):r?i(r,t,f.data(r,t)):void 0;if(this.length&&(o=f.data(r),1===r.nodeType&&!f._data(r,"parsedAttrs"))){for(a=d.length;a--;)d[a]&&0===(n=d[a].name).indexOf("data-")&&i(r,n=f.camelCase(n.slice(5)),o[n]);f._data(r,"parsedAttrs",!0)}return o},removeData:function(t){return this.each(function(){f.removeData(this,t)})}}),f});