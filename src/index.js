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

const oglobal = typeof window !== 'undefined' ? window : global
oglobal && (oglobal.getTokenInLocalstorage = getTokenInLocalstorage)