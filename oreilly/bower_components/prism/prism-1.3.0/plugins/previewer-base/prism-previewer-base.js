!function(){var e,t,s,n;"undefined"!=typeof self&&self.Prism&&self.document&&Function.prototype.bind&&(e=/(?:^|\s)token(?=$|\s)/,t=/(?:^|\s)active(?=$|\s)/g,s=/(?:^|\s)flipped(?=$|\s)/g,(n=function(t,e,s,i){this._elt=null,this._type=t,this._clsRegexp=RegExp("(?:^|\\s)"+t+"(?=$|\\s)"),this._token=null,this.updater=e,this._mouseout=this.mouseout.bind(this),this.initializer=i;var o=this;s=s||["*"],(s="Array"!==Prism.util.type(s)?[s]:s).forEach(function(t){"string"!=typeof t&&(t=t.lang),n.byLanguages[t]||(n.byLanguages[t]=[]),n.byLanguages[t].indexOf(o)<0&&n.byLanguages[t].push(o)}),n.byType[t]=this}).prototype.init=function(){this._elt||(this._elt=document.createElement("div"),this._elt.className="prism-previewer prism-previewer-"+this._type,document.body.appendChild(this._elt),this.initializer&&this.initializer())},n.prototype.check=function(t){do{if(e.test(t.className)&&this._clsRegexp.test(t.className))break}while(t=t.parentNode);t&&t!==this._token&&(this._token=t,this.show())},n.prototype.mouseout=function(){this._token.removeEventListener("mouseout",this._mouseout,!1),this._token=null,this.hide()},n.prototype.show=function(){var t;this._elt||this.init(),this._token&&(this.updater.call(this._elt,this._token.textContent)?(this._token.addEventListener("mouseout",this._mouseout,!1),t=function(t){var e=0,s=0,i=t;if(i.parentNode){for(;e+=i.offsetLeft,s+=i.offsetTop,(i=i.offsetParent)&&i.nodeType<9;);for(i=t;e-=i.scrollLeft,s-=i.scrollTop,(i=i.parentNode)&&!/body/i.test(i.nodeName););}return{top:s,right:innerWidth-e-t.offsetWidth,bottom:innerHeight-s-t.offsetHeight,left:e}}(this._token),this._elt.className+=" active",0<t.top-this._elt.offsetHeight?(this._elt.className=this._elt.className.replace(s,""),this._elt.style.top=t.top+"px",this._elt.style.bottom=""):(this._elt.className+=" flipped",this._elt.style.bottom=t.bottom+"px",this._elt.style.top=""),this._elt.style.left=t.left+Math.min(200,this._token.offsetWidth/2)+"px"):this.hide())},n.prototype.hide=function(){this._elt.className=this._elt.className.replace(t,"")},n.byLanguages={},n.byType={},n.initEvents=function(t,e){var s=[];n.byLanguages[e]&&(s=s.concat(n.byLanguages[e])),n.byLanguages["*"]&&(s=s.concat(n.byLanguages["*"])),t.addEventListener("mouseover",function(t){var e=t.target;s.forEach(function(t){t.check(e)})},!1)},Prism.plugins.Previewer=n,Prism.hooks.add("after-highlight",function(t){(n.byLanguages["*"]||n.byLanguages[t.language])&&n.initEvents(t.element,t.language)}))}();