var clone=require("clone"),xtend=require("xtend"),config=require("../config.js")(location.hostname),source={gist:require("../source/gist"),github:require("../source/github"),local:require("../source/local")};function _getData(){return{map:{type:"FeatureCollection",features:[]},dirty:!1,source:null,meta:null,type:"local"}}module.exports=function(a){var r=_getData();function u(e){var t,n;for(t in e.files)if(n=e.files[t].content,-1!==t.indexOf(".geojson")&&n)return t;for(t in e.files)if(n=e.files[t].content,-1!==t.indexOf(".json")&&n)return t}var l={hasFeatures:function(){return!!(r.map&&r.map.features&&r.map.features.length)},set:function(e,t){for(var n in e)r[n]="object"==typeof e[n]?clone(e[n],!1):e[n];return!1!==e.dirty&&(l.dirty=!0),a.dispatch.change({obj:e,source:t}),l},clear:function(){l.set(_getData())}};return l.mergeFeatures=function(e,t){return r.map.features=(r.map.features||[]).concat(e.map(function(e){for(var t=e.properties,n=Object.keys(t),r=n.length,o=0;o<r;o++){var a=n[o],i=t[a];e.properties[a]=(a=i,i=void 0,(i=parseFloat(a)).toString()===a?i:a)}return e})),l.set({map:r.map},t)},l.get=function(e){return r[e]},l.all=function(){return clone(r,!1)},l.fetch=function(e,o){switch(e.id.split(":")[0]){case"gist":var t=e.id.split(":")[1].split("/")[1];source.gist.load(t,a,function(e,n){var t,r;return e||void 0===(t=u(n))?o(e,n):!0!==(r=n.files[t]).truncated?o(e,xtend(n,{file:r.filename,content:JSON.parse(r.content)})):void source.gist.loadRaw(r.raw_url,a,function(e,t){return e?o(e):o(e,xtend(n,{file:r.filename,content:JSON.parse(t)}))})});break;case"github":var t=e.id.split("/"),r={user:t[0].split(":")[1],repo:t[1],branch:t[3],path:(t.slice(4)||[]).join("/")};source.github.load(r,a,function(e,n){return e?o(e):source.github.loadRaw(r,n.sha,a,function(e,t){try{return o(e,xtend(n,{content:JSON.parse(t)}))}catch(e){return location.hash="",o(e)}})})}},l.parse=function(e,t){var n,r,o=config.GithubAPI||"https://github.com/",a=(e.files&&(e.type="gist"),(e.length?e[e.length-1]:e).type);switch(a=e.commit?"commit":a){case"commit":l.set({source:e.content});break;case"local":l.set({type:"local",map:e.content,path:e.path});break;case"blob":i=e[0].login,n=e[1].name,r=e[2].name,c=e.slice(3).map(function(e){return e.path}).join("/"),l.set({type:"github",source:e,meta:{login:i,repo:n,branch:r,name:e.path},path:c,route:"github:"+[i,n,"blob",r,c].join("/"),url:[o,i,n,"blob",r,c].join("/")}),e.content&&l.set({map:e.content});break;case"file":i=(s=e.html_url.split("/"))[3],n=s[4],r=s[6],l.set({type:"github",source:e,meta:{login:i,repo:n,branch:r,name:e.name,sha:e.sha},map:e.content,path:e.path,route:"github:"+[i,n,"blob",r,e.path].join("/"),url:e.html_url});break;case"gist":var i,c=[i=e.owner&&e.owner.login||"anonymous",e.id].join("/"),s=u(e);try{e.files[s].content&&l.set({map:JSON.parse(e.files[s].content)})}catch(e){console.error(e)}l.set({type:"gist",source:e,meta:{login:i,name:s},path:c,route:"gist:"+c,url:e.html_url})}},l.save=function(e){var t=a.data.get("type");("github"===t?source.github:"gist"!==t&&"local"===t&&a.data.path?source.local:source.gist).save(a,e)},l};