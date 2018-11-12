import { f, isObject } from './format'
/**
 * 时间格式化
 */
export function date (d, t) {
  d = new Date()
  var year = d.getFullYear()
  var month = f(d.getMonth() + 1)
  var day = f(d.getDate())
  var hour = f(d.getHours())
  var minutes = f(d.getMinutes())
  var seconds = f(d.getSeconds())
  switch (t) {
    case 'date':
      return year + '-' + month + '-' + day
    case 'time':
      return hour + ':' + minutes + ':' + seconds
    case 'sTime':
      return hour + ':' + minutes
    default:
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
  }
}

/**
 * 获取当月多少天
 * @year {int}
 * @month {int}
 * deps: isLeap
 */
export function getdays(year, month) {
  if (typeof year !== 'number' || typeof month !== 'number') return null
  let days = [31, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  days.splice(1, 0, isLeap(year) ? 29 : 28)
  return days[month - 1]
}

/**
 * 是否是闰年
 */
export function isLeap(y) {
  if (typeof y !== 'number') return null
  return (y % 100 !== 0 && y % 4 === 0) || (y % 400 === 0)
}

/**
 * 获取临近月份
 * @y {int}
 * @m {int}
 * @diff {int}
 */
export function getSiblingsMonth(y, m, diff = 1) {
  if (typeof y !== 'number' || typeof m !== 'number') return null
  var d = new Date(y, m - 1)
  d.setMonth(m - 1 + diff)
  return {
    y: d.getFullYear(),
    m: d.getMonth() + 1
  }
}

/**
 * 倒计时
 * @t {int}
 */
export function setTime(t) {
  if (typeof t !== 'number') return null
  let tt = setInterval(function () {
    if (t <= 0) clearInterval(tt)
    else t--
    console.log(t)
  }, 1000)
}

/**
 * 完整倒计时
 * @d {object}
 * deps: isObject
 */
export function countdown(d) {
  if (!isObject(d)) return false
  const day = d.hasOwnProperty('d')
  const hour = d.hasOwnProperty('h')
  const minute = d.hasOwnProperty('m')
  const second = d.hasOwnProperty('s')
  if (!day && !hour && !minute && !second) return false
  const units = ['d', 'h', 'm', 's']
  d = init(d, [day, hour, minute, second])
  let tt = setInterval(() => {
    timer(d, tt)
    console.log(d)
  }, 1000)
  function timer(d, tt) {
    d.s--
    if (d.s <= 0 && d.m <= 0 && d.h <= 0 && d.d <= 0) clearInterval(tt)
    if (d.s < 0) {
      d.s = 59
      d.m--
    }
    if (d.m < 0) {
      d.m = 59
      d.h--
    }
    if (d.h < 0) {
      d.h = 23
      d.d--
    }
  }
  function init(data, icons) {
    icons.map((item, key) => {
      if (!item) data[units[key]] = 0
    })
    return data
  }
}

/**
 * 计算时间间隔
 * @startDate {string}
 * @endDate {string}
 */
export function getTimeDiff(startDate, endDate) {
  if (typeof startDate !== 'string' || typeof endDate !== 'string') return false
  var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
  var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
  var day = 1000 * 60 * 60 * 24, hour = 1000 * 60 * 60, minute = 1000 * 60;
  var days = Math.floor((endTime - startTime) / day);
  var hours = Math.floor((endTime - startTime - days * day) / hour);
  var minutes = Math.floor((endTime - startTime - days * day - hours * hour) / minute);
  var seconds = Math.floor((endTime - startTime - days * day - hours * hour - minutes * minute) / 1000);
  return { d: days, h: hours, m: minutes, s: seconds }
}

/**
 * 日期是否相等
 */
export function isSame(y, m, d) {
  if (isDate(y)) {
    var dt = y;
    y = dt.getFullYear();
    m = dt.getMonth() + 1;
    d = dt.getDate();
  }
  return this.getFullYear() === y && this.getMonth() + 1 === m && this.getDate() === d;
}
