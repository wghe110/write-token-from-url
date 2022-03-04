const getTokenInLocalstorage = (tname = "token", callback) => {
  const preUrl = location.href.split('?')[0]
  const search = location.href.split('?')[1]
  const searchParams = new URLSearchParams(search);

  const isHasToken = searchParams.has(tname);

  if (isHasToken) {
    const tokenVal = searchParams.get(tname)
    localStorage.setItem(tname, tokenVal)

    searchParams.delete(tname)
    const aQuery = []
    for (let item of searchParams) {
      aQuery.push(item.join('='))
    }

    const newUrl = preUrl + '?' + aQuery.join('&')
    window.location.href = newUrl
    callback && callback()
  }
}

const factoryFn = () => {
  return getTokenInLocalstorage
}


((root, factory) => {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    // commonjs-node
    module.exports = factory()
  }

  else if (typeof define === 'function' && define.amd) {
    // amd-requirejs
    define(factory())
  }

  else if (typeof define === 'function' && define.cmd) {
    // cmd-sea.js
    define(function (require, exports, module) {
      module.exports = factory()
    })
  }

  else {
    // global or window
    root.getTokenInLocalstorage = factory()
  }
})(window || global, factoryFn)

