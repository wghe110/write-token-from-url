'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var getTokenInLocalstorage = function getTokenInLocalstorage() {
  var tname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "token";
  var callback = arguments[1];

  var preUrl = location.href.split('?')[0];
  var search = location.href.split('?')[1];
  var searchParams = new URLSearchParams(search);

  var isHasToken = searchParams.has(tname);

  if (isHasToken) {
    var tokenVal = searchParams.get(tname);
    localStorage.setItem(tname, tokenVal);

    searchParams.delete(tname);
    var aQuery = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = searchParams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;

        aQuery.push(item.join('='));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var newUrl = preUrl + '?' + aQuery.join('&');
    window.location.href = newUrl;
    callback && callback();
  }
};

var factoryFn = function factoryFn() {
  return getTokenInLocalstorage;
};

(function (root, factory) {
  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    // commonjs-node
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // amd-requirejs
    define(factory());
  } else if (typeof define === 'function' && define.cmd) {
    // cmd-sea.js
    define(function (require, exports, module) {
      module.exports = factory();
    });
  } else {
    // global or window
    root.getTokenInLocalstorage = factory();
  }
})(window || global, factoryFn);