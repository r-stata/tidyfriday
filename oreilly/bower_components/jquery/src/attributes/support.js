define(["../var/support"],function(e){var t,n,a;return t=document.createElement("input"),n=document.createElement("select"),a=n.appendChild(document.createElement("option")),t.type="checkbox",e.checkOn=""!==t.value,e.optSelected=a.selected,n.disabled=!0,e.optDisabled=!a.disabled,(t=document.createElement("input")).value="t",t.type="radio",e.radioValue="t"===t.value,e});