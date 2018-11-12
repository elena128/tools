import { isObject } from './format'
/**
 * 读取本地存储
 */
export function getStorage(str) {
  let data = localStorage.getItem(str)
  try {
    data = JSON.parse(data)
  } catch (e) {
    return data
  }
  return data
}

/**
 * 存入本地存储
 * deps: getStorage isObject
 */
export function setStorage(name, data) {
  if (!data || !name) return false
  if (typeof data === 'string') return localStorage.setItem(name, data)
  let sendData = getStorage(name)
  if (isObject(sendData) && isObject(data)) sendData = {...sendData, ...data}
  else sendData = data
  localStorage.setItem(name, JSON.stringify(sendData))
}

/**
 * cookie
 */
export function setCookie(c_name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

export function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + '=')
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1
      c_end = document.cookie.indexOf(';', c_start)
      if (c_end == -1) {
        c_end = document.cookie.length
      }
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ''
}
