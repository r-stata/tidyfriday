define(["../core"],function(a){return a.access=function(n,c,l,e,i,r,t){var o=0,u=n.length,f=null==l;if("object"===a.type(l))for(o in i=!0,l)a.access(n,c,o,l[o],!0,r,t);else if(void 0!==e&&(i=!0,a.isFunction(e)||(t=!0),c=f?t?(c.call(n,e),null):(f=c,function(n,c,l){return f.call(a(n),l)}):c))for(;o<u;o++)c(n[o],l,t?e:e.call(n[o],o,c(n[o],l)));return i?n:f?c.call(n):u?c(n[0],l):r}});