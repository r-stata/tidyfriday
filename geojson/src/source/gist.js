var fs=require("fs"),tmpl=fs.readFileSync("data/share.html","utf8"),config=require("../config.js")(location.hostname),githubBase=config.GithubAPI?config.GithubAPI+"/api/v3":"https://api.github.com";function saveBlocks(o,e){d3.json(githubBase+"/gists").on("load",function(o){e(null,o)}).on("error",function(o){o=JSON.parse(o.responseText).message.replace(/(http:\/\/\S*)/g,'<a href="$&">$&</a>');e(o)}).send("POST",JSON.stringify({description:"via:geojson.io",public:!1,files:{"index.html":{content:tmpl},"map.geojson":{content:JSON.stringify(o)}}}))}function save(a,r){var o=a.data.get("source"),l=a.data.get("meta"),u=l&&l.name||"map.geojson",c=a.data.get("map");o&&o.description,o&&o.public;a.user.details(function(o,e){var n="POST",t=a.data.get("source"),s={},i=githubBase+"/gists";!o&&e&&e.login&&l&&t&&t.id&&l.login&&e.login===l.login?(i+="/"+t.id,n="PATCH"):!o&&t&&t.id&&(i+="/"+t.id+"/forks");s[u]={content:JSON.stringify(c,null,2)},a.user.signXHR(d3.json(i)).on("load",function(o){o.type="gist",r(null,o)}).on("error",function(o){var e;try{e=JSON.parse(o.responseText).message.replace(/(http:\/\/\S*)/g,'<a href="$&">$&</a>')}catch(o){e="Sorry, an error occurred"}r(e)}).send(n,JSON.stringify({files:s}))})}function load(o,e,n){e.user.signXHR(d3.json(githubBase+"/gists/"+o)).on("load",function(o){n(null,o)}).on("error",function(o){n(o,null)}).get()}function loadRaw(o,e,n){e.user.signXHR(d3.text(o)).on("load",function(o){n(null,o)}).on("error",function(o){n(o,null)}).get()}module.exports.save=save,module.exports.saveBlocks=saveBlocks,module.exports.load=load,module.exports.loadRaw=loadRaw;