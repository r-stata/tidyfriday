function objectOrFunction(t){var n=typeof t;return null!==t&&("object"==n||"function"==n)}function isFunction(t){return"function"==typeof t}function isMaybeThenable(t){return null!==t&&"object"==typeof t}let _isArray;const isArray=_isArray=Array.isArray||(t=>"[object Array]"===Object.prototype.toString.call(t));export{objectOrFunction,isFunction,isMaybeThenable,isArray};