!function(){"use strict";function e(t,e,o){return{request:function(e){o.access_token&&(e.headers["X-Access-Token"]="Bearer "+o.access_token);return e},responseError:function(e){e.status;e.status;return t.reject(e)}}}angular.module("websiteApp").value("version","0.1"),angular.module("websiteApp").factory("commonInterceptor",e),e.$inject=["$q","$location","$localStorage"],angular.module("websiteApp").config(["$httpProvider","$compileProvider",function(e,t){e.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",e.defaults.headers.common.Accept="application/json, text/javascript",e.interceptors.push("commonInterceptor"),t.debugInfoEnabled(!1)}])}();