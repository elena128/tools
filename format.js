/**
 * 判断是否是对象
 */
export function isObject(x) {
  // IE8 will treat undefined and null as object if it wasn't for x != null
  return x != null && Object.prototype.toString.call(x) === '[object Object]';
  // return x instanceof Object
  // return x === Object(x)
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
 * 对象是否为空
 */
export function isObjectEmpty(obj) {
  if (!obj) return null
  if (Object.getOwnPropertyNames) {
    return (Object.getOwnPropertyNames(obj).length === 0)
  } else {
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        return false
      }
    }
    return true
  }
}


/**
 * 判断是否是数组
 */
export function isArray(x) {
  return x instanceof Array || Object.prototype.toString.call(x) === '[object Array]'
  // return x instanceof Array
  // return Array.isArray(x)
}

// Array: push(add), pop(delete), shift(delete), unshiift(add), join(transfer), concat, reverse, slice(select将类数组->数组), splice(delete), sort, map, forEach, filter, some, every, reduce, reduceRight, indexOf, lastIndexOf

// String: chatAt, chatCodeAt, concat, slice, substring, substr, indexOf, lastIndexOf, trim, toLowerCase, toUpperCase, match, search, repalce, split

// Number: toFixed, toExponential, toPrecision

// Math: E, LN2, LN10, LOG2E, LOG2E, LOG10E, PI, SQRT1_2, SQRT2, abs, ceil, floor, max, min, pow, sqrt, log, exp, round, random

// Date: now, parse, toLocaleString, toLocaleDateString, toLocaleTimeString, getTime, getDate, getDay, getFullYear, getMonth, getHours, getMinutes, getSeconds

// 原生包装对象: Number, String, Boolean

// 每个对象都具有一个名为__proto__的属性
// 每个构造函数都具有一个名为prototype的方法
export function _instanceof(A, B) {
  const O = B.prototype
  A = A.__proto__
  while (true) {
    if (A === null) return false
    if (O === A) return true
    A = A.__proto__
  }
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

// 浮点数不是精确的值
