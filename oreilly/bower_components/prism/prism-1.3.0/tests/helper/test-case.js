"use strict";var fs=require("fs"),assert=require("chai").assert,PrismLoader=require("./prism-loader"),TokenStreamTransformer=require("./token-stream-transformer");module.exports={runTestCase:function(e,r){r=this.parseTestCaseFile(r),e=this.parseLanguageNames(e);if(null===r)throw new Error("Test case file has invalid format (or the provided token stream is invalid JSON), please read the docs.");var a=PrismLoader.createInstance(e.languages),e=a.languages[e.mainLanguage],a=a.tokenize(r.testSource,e),e=TokenStreamTransformer.simplify(a);assert.deepEqual(e,r.expectedTokenStream,r.comment)},parseLanguageNames:function(e){var e=e.split("+"),r=null;return{languages:e=e.map(function(e){if(-1<e.indexOf("!")){if(r)throw"There are multiple main languages defined.";return r=e.replace("!","")}return e}),mainLanguage:r=r||e[e.length-1]}},parseTestCaseFile:function(e){e=fs.readFileSync(e,"utf8").split(/^-{10,}\w*$/m);try{var r={testSource:e[0].trim(),expectedTokenStream:JSON.parse(e[1]),comment:null};return e[2]&&(r.comment=e[2].trim()),r}catch(e){return null}}};