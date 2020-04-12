
export function setCookie(cName, value, expire) {
  var date = new Date()
  date.setSeconds(date.getSeconds() + expire)
  document.cookie = cName + '=' + escape(value) + '; expires=' + date.toGMTString() + ';path=/'
}

export function getCookie(name) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)
  if (arr) { return (arr[2]) } else { return null }
}

export function delCookie(cName) {
  setCookie(cName, '', -1)
}
