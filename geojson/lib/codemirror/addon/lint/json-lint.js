CodeMirror.jsonValidator=function(r){var n=[];jsonlint.parseError=function(r,o){o=o.loc;n.push({from:CodeMirror.Pos(o.first_line-1,o.first_column),to:CodeMirror.Pos(o.last_line-1,o.last_column),message:r})};try{jsonlint.parse(r)}catch(r){}return n};