/**
 * 判断是否是对象
 */
export function isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

/**
 * 对象是否相等
 */
export function isSameObject(o1, o2) {
  if (!isObject(o1) || !isObject(o2)) return null
  for (const k in o1) {
    if (o1.hasOwnProperty(k)) {
      if (!o2[k] || o2[k] !== o1[k]) return false
    }
  }
  return true
}

/**
 * 判断是否是数组
 */
export function isArray(x) {
  return x && typeof x === 'object' && x.hasOwnProperty('length')
}

/**
 * 时间显示格式化
 */
export function f(t) {
  t = t + ''
  return (t.length === 1) ? '0' + t : t
}

/**
 * 序列化
 * deps: isObject
 */
export function obj2Str(obj) {
  if (!isObject(obj)) return false
  let str = ''
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      const element = obj[k]
      str += '&' + k + '=' + element
    }
  }
  return str
}

/**
 * 反序列化
 */
export function str2Obj(str) {
  if (!str || typeof str !== 'string') return false
  let obj = {}
  str.split('&').map(item => {
    item = item.split('=')
    obj[item[0]] = item[1]
  })
  return obj
}
