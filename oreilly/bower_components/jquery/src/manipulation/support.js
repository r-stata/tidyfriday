define(["../var/support"],function(e){var t,n;return t=document.createDocumentFragment().appendChild(document.createElement("div")),(n=document.createElement("input")).setAttribute("type","radio"),n.setAttribute("checked","checked"),n.setAttribute("name","t"),t.appendChild(n),e.checkClone=t.cloneNode(!0).cloneNode(!0).lastChild.checked,t.innerHTML="<textarea>x</textarea>",e.noCloneChecked=!!t.cloneNode(!0).lastChild.defaultValue,e});