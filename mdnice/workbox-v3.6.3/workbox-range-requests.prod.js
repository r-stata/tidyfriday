this.workbox=this.workbox||{},this.workbox.rangeRequests=function(e,u){"use strict";try{self.workbox.v["workbox:range-requests:3.6.3"]=1}catch(e){}function t(e,r){return n.apply(this,arguments)}n=babelHelpers.asyncToGenerator(function*(e,r){try{var t,n,s,a,o,i,l=e.headers.get("range");if(l)return t=function(){var e=l.trim().toLowerCase();if(!e.startsWith("bytes="))throw new u.WorkboxError("unit-must-be-bytes",{normalizedRangeHeader:e});if(e.includes(","))throw new u.WorkboxError("single-range-only",{normalizedRangeHeader:e});var r=/(\d*)-(\d*)/.exec(e);if(null===r||!r[1]&&!r[2])throw new u.WorkboxError("invalid-range-values",{normalizedRangeHeader:e});return{start:""===r[1]?null:Number(r[1]),end:""===r[2]?null:Number(r[2])}}(),s=function(e,r,t){e=e.size;if(e<t||r<0)throw new u.WorkboxError("range-not-satisfiable",{size:e,end:t,start:r});let n,s;return s=null===r?(n=e-t,e):null===t?(n=r,e):(n=r,t+1),{start:n,end:s}}(n=yield r.blob(),t.start,t.end),o=(a=n.slice(s.start,s.end)).size,(i=new Response(a,{status:206,statusText:"Partial Content",headers:r.headers})).headers.set("Content-Length",o),i.headers.set("Content-Range",`bytes ${s.start}-${s.end-1}/`+n.size),i;throw new u.WorkboxError("no-range-header")}catch(e){return new Response("",{status:416,statusText:"Range Not Satisfiable"})}});var n;return e.createPartialResponse=t,e.Plugin=class{cachedResponseWillBeUsed({request:e,cachedResponse:r}){return babelHelpers.asyncToGenerator(function*(){return r&&e.headers.has("range")?yield t(e,r):r})()}},e}({},workbox.core._private);