define(["../var/support"],function(e){var t,n,i=document.createElement("div");for(t in{submit:!0,change:!0,focusin:!0})(e[t+"Bubbles"]=(n="on"+t)in window)||(i.setAttribute(n,"t"),e[t+"Bubbles"]=!1===i.attributes[n].expando);return e});