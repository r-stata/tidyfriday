define(["../core","../core/parseHTML","../ajax","../traversing","../manipulation","../selector","../event/alias"],function(s){var c=s.fn.load;s.fn.load=function(e,t,n){var a,i,o,r,l;return"string"!=typeof e&&c?c.apply(this,arguments):(r=this,0<=(l=e.indexOf(" "))&&(a=s.trim(e.slice(l,e.length)),e=e.slice(0,l)),s.isFunction(t)?(n=t,t=void 0):t&&"object"==typeof t&&(o="POST"),0<r.length&&s.ajax({url:e,type:o,dataType:"html",data:t}).done(function(e){i=arguments,r.html(a?s("<div>").append(s.parseHTML(e)).find(a):e)}).complete(n&&function(e,t){r.each(n,i||[e.responseText,t,e])}),this)}});