"function"!=typeof Object.getPrototypeOf&&(Object.getPrototypeOf="".__proto__===String.prototype?function(e){return e.__proto__}:function(e){return e.constructor.prototype});var g="undefined"!=typeof window?window:"undefined"!=typeof global?global:this,Promise=g.adapter.Promise,assert=require("assert");describe("tampering",function(){var e=Promise.resolve;afterEach(function(){Promise.resolve=e}),describe("then assimilation",function(){it("tampered resolved and then",function(){var e=Promise.resolve(1),n=Promise.resolve(2),t=0,o=0;return n.then=function(){return t++,Promise.prototype.then.apply(this,arguments)},Promise.resolve=function(n){return o++,new Promise(function(e){e(n)})},e.then(function(){return n}).then(function(e){assert.equal(t,1,"expected then to be called once"),assert.equal(o,0,"expected resolve to be called once"),assert.equal(e,2,"expected fulfillment value to be 2")})}),it("tampered resolved",function(){var e=Promise.resolve(1),n=Promise.resolve(2),t=0;return Promise.resolve=function(n){return t++,new Promise(function(e){e(n)})},e.then(function(){return n}).then(function(e){assert.equal(t,0,"expected resolve to be called once"),assert.equal(e,2,"expected fulfillment value to be 2")})}),describe("alternative constructor",function(){it("tampered resolved and then",function(){var e=Promise.resolve(1),n=Promise.resolve(2),t=0,o=0,r=0;function i(e){r++;var t=this.followers=[];e(function(n){t.forEach(function(e){e(n)})},function(){throw TypeError("No Rejections supported")})}return n.then=function(){return t++,Promise.prototype.then.apply(this,arguments)},i.resolve=function(n){return o++,new Promise(function(e){e(n)})},i.prototype.then=function(e,n){this.followers.push(e)},i.resolve=function(n){return o++,new Promise(function(e){e(n)})},e.constructor=i,e.then(function(){return n}).then(function(e){assert.equal(r,1,"expected AlternativeConstructor to be invoked once"),assert.equal(t,1,"expected then to be called once"),assert.equal(o,0,"expected resolve to be called once"),assert.equal(e,2,"expected fulfillment value to be 2")})})}),describe("Promise.all",function(){it("tampered resolved and then",function(){var e=Promise.resolve(2),n=0,t=0;return e.then=function(){return n++,Promise.prototype.then.apply(this,arguments)},Promise.resolve=function(n){return t++,new Promise(function(e){e(n)})},Promise.all([e]).then(function(e){assert.equal(n,1),assert.equal(t,1),assert.deepEqual(e,[2])})}),it("alternative constructor and tampered then",function(){var e=Promise.resolve(2),n=0,t=0;function o(e){var t=this.followers=[];e(function(n){t.forEach(function(e){e(n)})},function(){throw TypeError("No Rejections supported")})}return e.then=function(){return n++,Promise.prototype.then.apply(this,arguments)},o.resolve=function(n){return t++,new Promise(function(e){e(n)})},o.prototype.then=function(e,n){this.followers.push(e)},Promise.all.call(o,[e]).then(function(e){assert.equal(n,1),assert.equal(t,1),assert.deepEqual(e,[2])})})}),describe("core-js species test",function(){it("foreign thenable has correct internal slots",function(){var e=Promise.resolve();function n(e){e(function(){},function(){})}e.constructor=n;e=e.then(function(){});assert(e instanceof n)})}),describe("Promise.race",function(){it("tampered resolved and then",function(){var e=Promise.resolve(2),n=0,t=0;return e.then=function(){return n++,Promise.prototype.then.apply(this,arguments)},Promise.resolve=function(n){return t++,new Promise(function(e){e(n)})},Promise.race([e]).then(function(e){assert.equal(n,1),assert.equal(t,1),assert.deepEqual(e,2)})}),it("alternative constructor and tampered then",function(){var e=Promise.resolve(2),n=0,t=0;function o(e){var t=this.followers=[];e(function(n){t.forEach(function(e){e(n)})},function(){throw TypeError("No Rejections supported")})}return e.then=function(){return n++,Promise.prototype.then.apply(this,arguments)},o.resolve=function(n){return t++,new Promise(function(e){e(n)})},o.prototype.then=function(e,n){this.followers.push(e)},Promise.race.call(o,[e]).then(function(e){assert.equal(n,1),assert.equal(t,1),assert.deepEqual(e,2)})})})})}),describe("extensions",function(){function r(e){return e.then(function(){assert(!1,"expected rejection, but got fulfillment")},function(e){assert(e instanceof Error)})}describe("Promise constructor",function(){it("should exist and have length 1",function(){assert(Promise),assert.equal(Promise.length,1)}),it("should fulfill if `resolve` is called with a value",function(n){new Promise(function(e){e("value")}).then(function(e){assert.equal(e,"value"),n()})}),it("should reject if `reject` is called with a reason",function(n){new Promise(function(e,n){n("reason")}).then(function(){assert(!1),n()},function(e){assert.equal(e,"reason"),n()})}),it("should be a constructor",function(){var e=new Promise(function(){});assert.equal(Object.getPrototypeOf(e),Promise.prototype,"[[Prototype]] equals Promise.prototype"),assert.equal(e.constructor,Promise,"constructor property of instances is set correctly"),assert.equal(Promise.prototype.constructor,Promise,"constructor property of prototype is set correctly")}),it("should NOT work without `new`",function(){assert.throws(function(){Promise(function(e){e("value")})},TypeError)}),it("should throw a `TypeError` if not given a function",function(){assert.throws(function(){new Promise},TypeError),assert.throws(function(){new Promise({})},TypeError),assert.throws(function(){new Promise("boo!")},TypeError)}),it("should reject on resolver exception",function(n){new Promise(function(){throw"error"}).then(null,function(e){assert.equal(e,"error"),n()})}),it("should not resolve multiple times",function(e){var t,o,n=0,r=0,i={then:function(e,n){t=e,o=n}};new Promise(function(e){e(1)}).then(function(e){return i}).then(function(e){n++},function(e){r++}),setTimeout(function(){t(1),t(1),o(1),o(1),setTimeout(function(){assert.equal(n,1),assert.equal(r,0),e()},20)},20)}),describe("assimilation",function(){it("should assimilate if `resolve` is called with a fulfilled promise",function(n){var t=new Promise(function(e){e("original value")});new Promise(function(e){e(t)}).then(function(e){assert.equal(e,"original value"),n()})}),it("should assimilate if `resolve` is called with a rejected promise",function(n){var t=new Promise(function(e,n){n("original reason")});new Promise(function(e){e(t)}).then(function(){assert(!1),n()},function(e){assert.equal(e,"original reason"),n()})}),it("should assimilate if `resolve` is called with a fulfilled thenable",function(n){var t={then:function(e){setTimeout(function(){e("original value")},0)}};new Promise(function(e){e(t)}).then(function(e){assert.equal(e,"original value"),n()})}),it("should assimilate if `resolve` is called with a rejected thenable",function(n){var t={then:function(e,n){setTimeout(function(){n("original reason")},0)}};new Promise(function(e){e(t)}).then(function(){assert(!1),n()},function(e){assert.equal(e,"original reason"),n()})}),it("should assimilate two levels deep, for fulfillment of self fulfilling promises",function(n){var t=new Promise(function(e){setTimeout(function(){e(t)},0)});new Promise(function(e){setTimeout(function(){e(t)},0)}).then(function(e){assert(!1),n()}).catch(function(e){assert.equal(e.message,"You cannot resolve a promise with itself"),assert(e instanceof TypeError),n()})}),it("should assimilate two levels deep, for fulfillment",function(n){var t=new Promise(function(e){e("original value")}),o=new Promise(function(e){e(t)});new Promise(function(e){e(o)}).then(function(e){assert.equal(e,"original value"),n()})}),it("should assimilate two levels deep, for rejection",function(n){var t=new Promise(function(e,n){n("original reason")}),o=new Promise(function(e){e(t)});new Promise(function(e){e(o)}).then(function(){assert(!1),n()},function(e){assert.equal(e,"original reason"),n()})}),it("should assimilate three levels deep, mixing thenables and promises (fulfilled case)",function(n){var t=new Promise(function(e){e("original value")}),o={then:function(e){setTimeout(function(){e(t)},0)}};new Promise(function(e){e(o)}).then(function(e){assert.equal(e,"original value"),n()})}),it("should assimilate three levels deep, mixing thenables and promises (rejected case)",function(n){var t=new Promise(function(e,n){n("original reason")}),o={then:function(e){setTimeout(function(){e(t)},0)}};new Promise(function(e){e(o)}).then(function(){assert(!1),n()},function(e){assert.equal(e,"original reason"),n()})})})}),describe("Promise.all",function(){var c;c=function(){return Promise.all.apply(Promise,arguments)},it("should exist",function(){assert(c)}),it("works with plan pojo input",function(n){c([{}]).then(function(e){assert.deepEqual(e,[{}]),n()})}),it("throws when not passed an array",function(e){var n=r(c()),t=r(c("")),o=r(c({}));Promise.all([n,t,o]).then(function(){e()})}),specify("fulfilled only after all of the other promises are fulfilled",function(e){var n,t,o,r,i=new Promise(function(e){o=e}),s=(i.then(function(){n=!0}),new Promise(function(e){r=e}));s.then(function(){t=!0}),setTimeout(function(){o(!0)},0),setTimeout(function(){r(!0)},0),c([i,s]).then(function(){assert(n),assert(t),e()})}),specify("rejected as soon as a promise is rejected",function(e){var t,n,o,r=new Promise(function(e,n){t={resolve:e,reject:n}}),i=new Promise(function(e,n){0});setTimeout(function(){t.reject({})},0),r.catch(function(){n=!0}),i.then(function(){o=!0},function(){o=!0}),c([r,i]).then(function(){assert(!1)},function(){assert(n),assert(!o),e()})}),specify("passes the resolved values of each promise to the callback in the correct order",function(n){var t,o,r,e=new Promise(function(e,n){t={resolve:e,reject:n}}),i=new Promise(function(e,n){o={resolve:e,reject:n}}),s=new Promise(function(e,n){r={resolve:e,reject:n}});r.resolve(3),t.resolve(1),o.resolve(2),c([e,i,s]).then(function(e){assert(3===e.length),assert(1===e[0]),assert(2===e[1]),assert(3===e[2]),n()})}),specify("resolves an empty array passed to all()",function(n){c([]).then(function(e){assert(0===e.length),n()})}),specify("works with null",function(n){c([null]).then(function(e){assert.equal(e[0],null),n()})}),specify("works with a mix of promises and thenables and non-promises",function(n){var e=new Promise(function(e){e(1)});c([e,{then:function(e){e(2)}},{then:function(e){setTimeout(function(){e(3)},0)}},4]).then(function(e){assert.deepEqual(e,[1,2,3,4]),n()}).catch(n)})}),describe("reject",function(){specify("it should exist",function(){assert(Promise.reject)}),describe("it rejects",function(){var n="the reason";Promise.reject(n).then(function(){assert(!1,"should not fulfill")},function(e){assert.equal(n,e)})})}),describe("race",function(){it("should exist",function(){assert(Promise.race)}),it("throws when not passed an array",function(e){var n=r(Promise.race()),t=r(Promise.race("")),o=r(Promise.race({}));Promise.all([n,t,o]).then(function(){e()})}),specify("fulfilled after one of the other promises are fulfilled",function(e){var n,t,o,r,i=new Promise(function(e){o=e}),s=(i.then(function(){n=!0}),new Promise(function(e){r=e}));s.then(function(){t=!0}),setTimeout(function(){o(!0)},100),setTimeout(function(){r(!0)},0),Promise.race([i,s]).then(function(){assert(t),assert.equal(n,void 0),e()})}),specify("the race begins on nextTurn and prioritized by array entry",function(n){var e=new Promise(function(e,n){e(!0)}),t=new Promise(function(e,n){e(!1)});Promise.race([e,t,5]).then(function(e){assert.equal(e,!0),n()})}),specify("rejected as soon as a promise is rejected",function(e){var t,n,o,r=new Promise(function(e,n){t={resolve:e,reject:n}}),i=new Promise(function(e,n){0});setTimeout(function(){t.reject({})},0),r.catch(function(){n=!0}),i.then(function(){o=!0},function(){o=!0}),Promise.race([r,i]).then(function(){assert(!1)},function(){assert(n),assert(!o),e()})}),specify("resolves an empty array to forever pending Promise",function(e){var n=Promise.race([]),t=!1;n.then(function(){t=!0},function(){t=!0}),setTimeout(function(){assert(!t),e()},50)}),specify("works with a mix of promises and thenables",function(n){var e=new Promise(function(e){setTimeout(function(){e(1)},10)});Promise.race([e,{then:function(e){e(2)}}]).then(function(e){assert(e,2),n()})}),specify("works with a mix of thenables and non-promises",function(n){Promise.race([{then:function(e){setTimeout(function(){e(3)},0)}},4]).then(function(e){assert(e,4),n()})})}),describe("resolve",function(){specify("it should exist",function(){assert(Promise.resolve)}),describe("1. If x is a promise, adopt its state ",function(){specify("1.1 If x is pending, promise must remain pending until x is fulfilled or rejected.",function(n){var t,o="the value";Promise.resolve({then:function(e,n){t=e}}).then(function(e){assert(e===o),n()}),setTimeout(function(){t(o)},10)}),specify("1.2 If/when x is fulfilled, fulfill promise with the same value.",function(n){var t="the value";Promise.resolve({then:function(e,n){e(t)}}).then(function(e){assert(e===t),n()})}),specify("1.3 If/when x is rejected, reject promise with the same reason.",function(n){var t=new Error;Promise.resolve({then:function(e,n){n(t)}}).then(null,function(e){assert(e===t),n()})})}),describe("2. Otherwise, if x is an object or function,",function(){specify("2.1 Let then x.then",function(e){var n=0,t={};"function"==typeof Object.defineProperty&&(Object.defineProperty(t,"then",{get:function(){if(1<++n)throw new Error;return function(){}}}),assert(0===n),Promise.resolve(t),assert(1===n)),e()}),specify("2.2 If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.",function(n){var t=new Error,e={};"function"!=typeof Object.defineProperty?n():(Object.defineProperty(e,"then",{get:function(){throw t}}),Promise.resolve(e).then(null,function(e){assert(e===t,"incorrect exception was thrown"),n()}))}),describe("2.3. If then is a function, call it with x as this, first argument resolvePromise, and second argument rejectPromise, where",function(){specify("2.3.1 If/when resolvePromise is called with a value y, run Resolve(promise, y)",function(n){var t,o,r={then:function(e,n){o=this,t=e,0}},i="success";Promise.resolve(r).then(function(e){assert(o===r,"this must be the thenable"),assert(e===i,"rejected promise with x"),n()}),setTimeout(function(){t(i)},20)}),specify("2.3.2 If/when rejectPromise is called with a reason r, reject promise with r.",function(n){var t,e={then:function(e,n){t=n}},o=new Error;Promise.resolve(e).then(null,function(e){assert(e===o,"rejected promise with x"),n()}),setTimeout(function(){t(o)},20)}),specify("2.3.3 If both resolvePromise and rejectPromise are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored",function(e){var t,o,n=0,r=0,i={then:function(e,n){t=e,o=n}},s=new Error;Promise.resolve(i).then(function(){r++},function(e){n++,assert(0===r,"never resolved"),assert(1===n,"rejected only once"),assert(e===s,"rejected promise with x")}),setTimeout(function(){o(s),o(s),o("foo"),t("bar"),t("baz")},20),setTimeout(function(){assert(1===n,"only rejected once"),assert(0===r,"never resolved"),e()},50)}),describe("2.3.4 If calling then throws an exception e",function(){specify("2.3.4.1 If resolvePromise or rejectPromise have been called, ignore it.",function(n){var t="success";Promise.resolve({then:function(e,n){throw e(t),expectedError}}).then(function(e){assert(e===t,"resolved not errored"),n()})}),specify("2.3.4.2 Otherwise, reject promise with e as the reason.",function(n){var t=new Error,o=0;Promise.resolve({then:function(){throw t}}).then(null,function(e){o++,assert(t===e,"expected the correct error to be rejected"),n()}),assert(0===o,"expected async, was sync")})})}),specify("2.4 If then is not a function, fulfill promise with x",function(n){var t={then:3},o=0;Promise.resolve(t).then(function(e){o++,assert(t===e,"fulfilled promise with x"),n()}),assert(0===o,"expected async, was sync")})}),describe("3. If x is not an object or function, ",function(){specify("fulfill promise with x.",function(n){var t=0;Promise.resolve(null).then(function(e){t++,assert(null===e,"fulfilled promise with x"),n()},function(e){assert(!1,"should not also reject")}),assert(0===t,"expected async, was sync")})})}),"undefined"!=typeof Worker&&navigator.userAgent.indexOf("PhantomJS")<1&&describe("web worker",function(){it("should work",function(n){this.timeout(2e3);var t=new Worker("./worker.js");t.addEventListener("error",function(e){n(new Error("Test failed:"+e))}),t.addEventListener("message",function(e){t.terminate(),assert.equal(e.data,"pong"),n()}),t.postMessage("ping")})})}),"undefined"!=typeof module&&module.exports&&describe("using reduce to sum integers using promises",function(){it("should build the promise pipeline without error",function(){for(var e,n=[],t=1;t<=1e3;t++)n.push(t);e=Promise.resolve(0),n.reduce(function(e,n){return e.then(function(e){return Promise.resolve(e+n)})},e)}),it("should get correct answer without blowing the nextTick stack",function(n){for(var e=Promise.resolve(0),t=[],o=1;o<=1e3;o++)t.push(o);t.reduce(function(e,n){return e.then(function(e){return Promise.resolve(e+n)})},e).then(function(e){assert.equal(e,500500),n()})})}),describe("Thenables should not be able to run code during assimilation",function(){specify("resolving to a thenable",function(){var e=!1;Promise.resolve({then:function(){e=!0}}),assert.strictEqual(e,!1)}),specify("resolving to an evil promise",function(){var e=!1,n=Promise.resolve();n.then=function(){e=!0},Promise.resolve(n),assert.strictEqual(e,!1)})}),describe("Promise.prototype.finally",function(){describe("native finally behaviour",function(){describe("no value is passed in",function(){it("does not provide a value to the finally code",function(e){Promise.resolve(1).finally(function(){assert.equal(arguments.length,0),e()})}),it("does not provide a reason to the finally code",function(n){var e=new Error;Promise.reject(e).finally(function(e){assert.equal(arguments.length,0),n()})})}),describe("non-exceptional cases do not affect the result",function(){it("preserves the original fulfillment value even if the finally callback returns a value",function(n){Promise.resolve(1).finally(function(){return 2}).then(function(e){assert.equal(1,e),n()})}),it("preserves the original rejection reason even if the finally callback returns a value",function(n){var t=new Error;Promise.reject(t).finally(function(){return 2}).then(void 0,function(e){assert.equal(t,e),n()})}),it("preserves the original fulfillment value even if a non-callable callback is given",function(n){Promise.resolve(1).finally().then(function(e){assert.equal(1,e),n()})}),it("preserves the original rejection reason even if a non-callable callback is given",function(n){var t=new Error;Promise.reject(t).finally().then(void 0,function(e){assert.equal(t,e),n()})})}),describe("exception cases do propogate the failure",function(){describe("fulfilled promise",function(){it("propagates changes via throw",function(n){var e=Promise.resolve(1),t=new Error;e.finally(function(){throw t}).then(void 0,function(e){assert.deepEqual(t,e),n()})}),it("propagates changes via returned rejected promise",function(n){var e=Promise.resolve(1),t=new Error;e.finally(function(){return Promise.reject(t)}).then(void 0,function(e){assert.deepEqual(t,e),n()})})}),describe("rejected promise",function(){it("propagates changes via throw",function(n){var e=Promise.reject(1),t=new Error;e.finally(function(){throw t}).then(void 0,function(e){assert.deepEqual(t,e),n()})}),it("propagates changes via returned rejected promise",function(n){var e=Promise.reject(1),t=new Error;e.finally(function(){return Promise.reject(t)}).then(void 0,function(e){assert.deepEqual(t,e),n()})})})})}),describe("inheritance",function(){function n(e){this._promise$constructor(e)}((n.prototype=Object.create(Promise.Promise.prototype)).constructor=n).prototype._promise$constructor=Promise.Promise,n.resolve=Promise.Promise.resolve,n.reject=Promise.Promise.reject,n.all=Promise.Promise.all,it("preserves correct subclass when chained",function(){var e=n.resolve().finally();assert.ok(e instanceof n),assert.equal(e.constructor,n)}),it("preserves correct subclass when rejected",function(){var e=n.resolve().finally(function(){throw new Error("OMG")});assert.ok(e instanceof n),assert.equal(e.constructor,n)}),it("preserves correct subclass when someone returns a thenable",function(){var e=n.resolve().finally(function(){return Promise.Promise.resolve(1)});assert.ok(e instanceof n),assert.equal(e.constructor,n)})})});