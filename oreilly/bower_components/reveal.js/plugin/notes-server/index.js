var http=require("http"),express=require("express"),fs=require("fs"),io=require("socket.io"),_=require("underscore"),Mustache=require("mustache"),app=express(),staticDir=express.static,server=http.createServer(app),io=io(server),opts={port:1947,baseDir:__dirname+"/../../"},brown=(io.on("connection",function(t){t.on("new-subscriber",function(e){t.broadcast.emit("new-subscriber",e)}),t.on("statechanged",function(e){t.broadcast.emit("statechanged",e)}),t.on("statechanged-speaker",function(e){t.broadcast.emit("statechanged-speaker",e)})}),["css","js","images","plugin","lib"].forEach(function(e){app.use("/"+e,staticDir(opts.baseDir+e))}),app.get("/",function(e,t){t.writeHead(200,{"Content-Type":"text/html"}),fs.createReadStream(opts.baseDir+"/index.html").pipe(t)}),app.get("/notes/:socketId",function(s,o){fs.readFile(opts.baseDir+"plugin/notes-server/notes.html",function(e,t){o.send(Mustache.to_html(t.toString(),{socketId:s.params.socketId}))})}),server.listen(opts.port||null),"[33m"),green="[32m",reset="[0m",slidesLocation="http://localhost"+(opts.port?":"+opts.port:"");console.log(brown+"reveal.js - Speaker Notes"+reset),console.log("1. Open the slides at "+green+slidesLocation+reset),console.log("2. Click on the link your JS console to go to the notes page"),console.log("3. Advance through your slides and your notes will advance automatically");